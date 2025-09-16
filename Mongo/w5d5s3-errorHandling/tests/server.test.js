const studentController = require('../controllers/studentController');
const Student = require('../models/studentModel');

jest.mock('../models/studentModel');

describe('studentController_CreateStudent_Test', () => {
  test('createStudent_should_save_and_return_student_successfully', async () => {
    const req = {
      body: {
        name: 'Alice',
        age: 21,
        department: 'IT',
        isEnrolled: true
      }
    };
    const savedStudent = { ...req.body, _id: 'mockId123' };

    Student.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(savedStudent)
    }));

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    await studentController.createStudent(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(savedStudent);
    expect(next).not.toHaveBeenCalled();
  });

  test('createStudent_should_return_400_when_required_fields_missing', async () => {
    const req = { body: { name: '', age: '', department: '' } };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    await studentController.createStudent(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Name, age, and department are required'
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('createStudent_should_call_next_on_error', async () => {
    const req = {
      body: {
        name: 'Bob',
        age: 22,
        department: 'Math'
      }
    };

    const mockError = new Error('Database error');
    Student.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(mockError)
    }));

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    await studentController.createStudent(req, res, next);
    expect(next).toHaveBeenCalledWith(mockError);
  });
});

describe('studentController_GetAllStudents_Test', () => {
  test('getAllStudents_should_return_all_students', async () => {
    const mockStudents = [
      { name: 'John', age: 20, department: 'CS' },
      { name: 'Jane', age: 22, department: 'Physics' }
    ];

    Student.find.mockResolvedValue(mockStudents);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    await studentController.getAllStudents(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockStudents);
    expect(next).not.toHaveBeenCalled();
  });

  test('getAllStudents_should_call_next_on_error', async () => {
    const mockError = new Error('Find failed');
    Student.find.mockRejectedValue(mockError);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    await studentController.getAllStudents(req, res, next);
    expect(next).toHaveBeenCalledWith(mockError);
  });
});

describe('studentController_UpdateStudent_Test', () => {
  test('updateStudent_should_update_and_return_student_successfully', async () => {
    const req = {
      params: { id: 'mockId123' },
      body: {
        name: 'Updated Name',
        age: 23,
        department: 'Biology'
      }
    };

    const updatedStudent = { ...req.body, _id: req.params.id };

    Student.findByIdAndUpdate.mockResolvedValue(updatedStudent);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    await studentController.updateStudent(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedStudent);
    expect(next).not.toHaveBeenCalled();
  });

  test('updateStudent_should_return_404_if_student_not_found', async () => {
    const req = {
      params: { id: 'nonExistentId' },
      body: {
        name: 'Someone',
        age: 24,
        department: 'Chemistry'
      }
    };

    Student.findByIdAndUpdate.mockResolvedValue(null);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    await studentController.updateStudent(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Student not found'
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('updateStudent_should_call_next_on_error', async () => {
    const req = {
      params: { id: 'mockId123' },
      body: {
        name: 'Another One',
        age: 25,
        department: 'EEE'
      }
    };

    const mockError = new Error('Update failed');
    Student.findByIdAndUpdate.mockRejectedValue(mockError);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    await studentController.updateStudent(req, res, next);
    expect(next).toHaveBeenCalledWith(mockError);
  });
});

describe('studentController_DeleteStudent_Test', () => {
  test('deleteStudent_should_delete_and_return_success_message', async () => {
    const req = { params: { id: 'mockId123' } };
    const deletedStudent = { _id: req.params.id };

    Student.findByIdAndDelete.mockResolvedValue(deletedStudent);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    await studentController.deleteStudent(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Student deleted successfully'
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('deleteStudent_should_return_404_if_student_not_found', async () => {
    const req = { params: { id: 'nonExistentId' } };

    Student.findByIdAndDelete.mockResolvedValue(null);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    await studentController.deleteStudent(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Student not found'
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('deleteStudent_should_call_next_on_error', async () => {
    const req = { params: { id: 'mockId123' } };
    const mockError = new Error('Delete failed');

    Student.findByIdAndDelete.mockRejectedValue(mockError);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    await studentController.deleteStudent(req, res, next);
    expect(next).toHaveBeenCalledWith(mockError);
  });
});
