const fs = require('fs');
const path = require('path');
const FileService = require('../FileService');

jest.mock('fs');

describe('FileService', () => {
  let service;
  const uploadDir = '/mock/uploads';

  beforeEach(() => {
    fs.existsSync.mockImplementation((path) => false);
    fs.mkdirSync.mockClear();
    fs.writeFileSync.mockClear();
    fs.readFileSync.mockClear();
    fs.readdirSync.mockClear();
    fs.unlinkSync.mockClear();

    service = new FileService(uploadDir);
  });

  test('constructor_creates_upload_directory_if_not_exists', () => {
    expect(fs.mkdirSync).toHaveBeenCalledWith(uploadDir, { recursive: true });
  });

  test('uploadFile_writes_file_and_emits_event', () => {
    const spy = jest.spyOn(service, 'emit');
    service.uploadFile('test.txt', 'Hello');
    expect(fs.writeFileSync).toHaveBeenCalledWith(path.join(uploadDir, 'test.txt'), 'Hello');
    expect(spy).toHaveBeenCalledWith('fileUploaded', 'test.txt');
  });

  test('downloadFile_reads_file_and_emits_event', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue('Hello');
    const spy = jest.spyOn(service, 'emit');
    const content = service.downloadFile('test.txt');
    expect(content).toBe('Hello');
    expect(spy).toHaveBeenCalledWith('fileDownloaded', 'test.txt');
  });

  test('deleteFile_removes_file_and_emits_event', () => {
    fs.existsSync.mockReturnValue(true);
    const spy = jest.spyOn(service, 'emit');
    service.deleteFile('test.txt');
    expect(fs.unlinkSync).toHaveBeenCalledWith(path.join(uploadDir, 'test.txt'));
    expect(spy).toHaveBeenCalledWith('fileDeleted', 'test.txt');
  });

  test('listFiles_reads_directory_and_emits_event', () => {
    fs.readdirSync.mockReturnValue(['a.txt', 'b.txt']);
    const spy = jest.spyOn(service, 'emit');
    const result = service.listFiles();
    expect(result).toEqual(['a.txt', 'b.txt']);
    expect(spy).toHaveBeenCalledWith('filesListed', ['a.txt', 'b.txt']);
  });

  test('streamFileContent_pipes_content_to_writableStream', () => {
    const mockReadable = { pipe: jest.fn() };
    fs.existsSync.mockReturnValue(true);
    fs.createReadStream = jest.fn().mockReturnValue(mockReadable);
    const mockWritable = {};
    const spy = jest.spyOn(service, 'emit');

    service.streamFileContent('test.txt', mockWritable);
    expect(fs.createReadStream).toHaveBeenCalledWith(path.join(uploadDir, 'test.txt'));
    expect(mockReadable.pipe).toHaveBeenCalledWith(mockWritable);
    expect(spy).toHaveBeenCalledWith('fileStreamed', 'test.txt');
  });
});
