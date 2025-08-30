const fs = require('fs');
const path = require('path');
const util = require('util');

const {
  readInputFile,
  countWords,
  saveWordCount,
} = require('../index'); 

jest.mock('fs');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

describe('Word Count Text Processor', () => {
  const inputPath = path.join(__dirname, '../input.txt');
  const outputPath = path.join(__dirname, '../output.json');
  const sampleText = 'Hello world! Hello again.';

  beforeEach(() => {
    jest.clearAllMocks();
  });


  test('readInputFile_function_should_be_defined', () => {
    expect(typeof readInputFile).toBe('function');
  });

  test('countWords_function_should_be_defined', () => {
    expect(typeof countWords).toBe('function');
  });

  test('saveWordCount_function_should_be_defined', () => {
    expect(typeof saveWordCount).toBe('function');
  });


  test('readInputFile_should_return_file_content', async () => {
    fs.readFile.mockImplementation((path, encoding, cb) => {
      cb(null, sampleText);
    });

    const result = await readInputFile();
    expect(result).toBe(sampleText);
    expect(fs.readFile).toHaveBeenCalledWith(inputPath, 'utf-8', expect.any(Function));
  });


  test('countWords_should_return_correct_word_count', () => {
    const result = countWords(sampleText);
    expect(result).toEqual({ hello: 2, world: 1, again: 1 });
  });

  test('countWords_should_return_empty_object_for_empty_text', () => {
    const result = countWords('');
    expect(result).toEqual({});
  });


  test('saveWordCount_should_write_output_to_json_file', async () => {
    fs.writeFile.mockImplementation((path, data, encoding, cb) => cb(null));

    const dataToWrite = { test: 3, case: 1 };
    await saveWordCount(dataToWrite);

    expect(fs.writeFile).toHaveBeenCalledWith(
      outputPath,
      JSON.stringify(dataToWrite, null, 2),
      'utf-8',
      expect.any(Function)
    );
  });
});
