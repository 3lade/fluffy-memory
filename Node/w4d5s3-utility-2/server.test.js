const fs = require('fs');
const path = require('path');

jest.mock('fs');

const {
  saveSummary,
  calculateAverages,
  readGrades
} = require('../index'); // Adjust path if needed

const inputPath = path.join(__dirname, '../grades.txt');
const outputPath = path.join(__dirname, '../summary.json');

describe('Grade Summary Processor', () => {
  const sampleText = `
    Alice: 90, 85, 92
    Bob: 70, 75, 80
    Charlie: 88, 78, 82
  `.trim();

  beforeEach(() => {
    jest.clearAllMocks();
  });


  test('readGrades_function_should_be_defined', () => {
    expect(typeof readGrades).toBe('function');
  });

  test('calculateAverages_function_should_be_defined', () => {
    expect(typeof calculateAverages).toBe('function');
  });

  test('saveSummary_function_should_be_defined', () => {
    expect(typeof saveSummary).toBe('function');
  });


  test('readGrades_should_return_file_content', async () => {
    fs.readFile.mockImplementation((filePath, encoding, cb) => {
      cb(null, sampleText);
    });

    const result = await readGrades();
    expect(result).toBe(sampleText);
    expect(fs.readFile).toHaveBeenCalledWith(inputPath, 'utf-8', expect.any(Function));
  });


  test('calculateAverages_should_return_correct_averages', () => {
    const result = calculateAverages(sampleText);
    expect(result).toEqual({
      Alice: 89,
      Bob: 75,
      Charlie: 82.67
    });
  });


  test('saveSummary_should_write_output_to_json_file', async () => {
    fs.writeFile.mockImplementation((filePath, data, cb) => cb(null));

    const summary = { Alice: 90, Bob: 80 };
    await saveSummary(summary);

    expect(fs.writeFile).toHaveBeenCalledWith(
      outputPath,
      JSON.stringify(summary, null, 2),
      expect.any(Function)
    );
  });

});
