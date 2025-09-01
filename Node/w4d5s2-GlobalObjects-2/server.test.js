const fs = require('fs');
const path = require('path');
const {
  createStudentFile,
  readStudents,
  addStudent,
  updateMarks,
  deleteStudent
} = require('../index'); // adjust path if needed

jest.mock('fs');

describe('Student Record Management', () => {
  const filePath = path.join(__dirname, '../students.json');
  const initialStudents = [
    { id: 1, name: 'Alice', marks: 85 },
    { id: 2, name: 'Bob', marks: 78 }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Exported function checks
  test('createStudentFile_function_should_be_defined', () => {
    expect(typeof createStudentFile).toBe('function');
  });

  test('readStudents_function_should_be_defined', () => {
    expect(typeof readStudents).toBe('function');
  });

  test('addStudent_function_should_be_defined', () => {
    expect(typeof addStudent).toBe('function');
  });

  test('updateMarks_function_should_be_defined', () => {
    expect(typeof updateMarks).toBe('function');
  });

  test('deleteStudent_function_should_be_defined', () => {
    expect(typeof deleteStudent).toBe('function');
  });

  // ✅ createStudentFile
  test('createStudentFile_should_create_json_file_with_initial_data', () => {
    const result = createStudentFile();
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify(initialStudents, null, 2)
    );
    expect(result).toBe('students.json file created with initial records.\n');
  });

  // ✅ readStudents
  test('readStudents_should_return_data_when_file_exists', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify(initialStudents));
    const result = readStudents();
    expect(fs.readFileSync).toHaveBeenCalledWith(expect.any(String), 'utf8');
    expect(result).toBe(
      'Current Student Records:\n' + JSON.stringify(initialStudents, null, 2) + '\n'
    );
  });


  // ✅ addStudent
  test('addStudent_should_append_new_student_to_existing_list', () => {
    const newStudent = { id: 3, name: 'Charlie', marks: 91 };
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify(initialStudents));

    const result = addStudent(newStudent);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify([...initialStudents, newStudent], null, 2)
    );
    expect(result).toBe('Added new student: Charlie\n');
  });

  test('addStudent_should_create_file_with_new_student_if_file_not_exist', () => {
    const newStudent = { id: 3, name: 'Charlie', marks: 91 };
    fs.existsSync.mockReturnValue(false);

    const result = addStudent(newStudent);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify([newStudent], null, 2)
    );
    expect(result).toBe('Added new student: Charlie\n');
  });


  // ✅ deleteStudent
  test('deleteStudent_should_remove_student_from_file', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify(initialStudents));

    const result = deleteStudent(1);
    const expected = [initialStudents[1]]; // Bob remains

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify(expected, null, 2)
    );
    expect(result).toBe('Deleted student with ID 1\n');
  });

});
