const Course = require('../models/courseModel');
const courseController = require('../controllers/courseController');

// Mock mongoose model
jest.mock('../models/courseModel');

describe('Course_Model_Test', () => {
  test('coursemodel_should_have_title_instructor_description_fields_defined', () => {
    const course = new Course();
    expect(course.schema.obj).toHaveProperty('title');
    expect(course.schema.obj).toHaveProperty('instructor');
    expect(course.schema.obj).toHaveProperty('description');
  });

  test('coursemodel_fields_should_be_required', () => {
    const schema = new Course().schema.obj;
    expect(schema.title.required).toBeTruthy();
    expect(schema.instructor.required).toBeTruthy();
    expect(schema.description.required).toBeTruthy();
  });
});

describe('courseController_Home_Test', () => {
  test('home_should_return_200_with_welcome_message', () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    courseController.home(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Welcome to the Course Management System!' });
  });
});

describe('getAllCourses_Test', () => {
  beforeEach(() => jest.clearAllMocks());

  test('should_return_200_with_all_courses', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Course.find.mockResolvedValue([{ title: 'Course1' }, { title: 'Course2' }]);

    await courseController.getAllCourses(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ title: 'Course1' }, { title: 'Course2' }]);
  });

  test('should_call_next_on_error', async () => {
    const req = {};
    const res = {};
    const next = jest.fn();

    Course.find.mockRejectedValue(new Error('DB Error'));

    await courseController.getAllCourses(req, res, next);

    expect(next).toHaveBeenCalledWith(new Error('DB Error'));
  });
});

describe('getCourseById_Test', () => {
  beforeEach(() => jest.clearAllMocks());

  test('should_return_200_with_course_if_found', async () => {
    const req = { params: { id: '123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Course.findById.mockResolvedValue({ title: 'React Basics' });

    await courseController.getCourseById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ title: 'React Basics' });
  });

  test('should_return_404_if_not_found', async () => {
    const req = { params: { id: '123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Course.findById.mockResolvedValue(null);

    await courseController.getCourseById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Course not found' });
  });
});

describe('createCourse_Test', () => {
  beforeEach(() => jest.clearAllMocks());

  test('should_return_201_when_course_created', async () => {
    const req = {
      body: {
        title: 'New Course',
        instructor: 'Jane',
        description: 'Basics of React'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Course.create.mockResolvedValue(req.body);

    await courseController.createCourse(req, res);

    expect(Course.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  test('should_return_400_if_fields_missing', async () => {
    const req = {
      body: {
        title: 'Incomplete Course',
        instructor: 'Jane'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await courseController.createCourse(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required' });
  });
});

describe('updateCourse_Test', () => {
  beforeEach(() => jest.clearAllMocks());

  test('should_return_200_with_updated_course', async () => {
    const req = {
      params: { id: '123' },
      body: {
        title: 'Updated Course',
        instructor: 'John',
        description: 'Updated Desc'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Course.findByIdAndUpdate.mockResolvedValue(req.body);

    await courseController.updateCourse(req, res);

    expect(Course.findByIdAndUpdate).toHaveBeenCalledWith('123', req.body, {
      new: true,
      runValidators: true
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  test('should_return_404_if_course_not_found', async () => {
    const req = {
      params: { id: '123' },
      body: {
        title: 'Updated',
        instructor: 'Anyone',
        description: 'Some description'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Course.findByIdAndUpdate.mockResolvedValue(null);

    await courseController.updateCourse(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Course not found' });
  });
});

describe('deleteCourse_Test', () => {
  beforeEach(() => jest.clearAllMocks());

  test('should_return_200_when_deleted_successfully', async () => {
    const req = { params: { id: '123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Course.findByIdAndDelete.mockResolvedValue({ title: 'Deleted Course' });

    await courseController.deleteCourse(req, res);

    expect(Course.findByIdAndDelete).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Course deleted successfully' });
  });

  test('should_return_404_if_course_not_found', async () => {
    const req = { params: { id: '123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Course.findByIdAndDelete.mockResolvedValue(null);

    await courseController.deleteCourse(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Course not found' });
  });
});
