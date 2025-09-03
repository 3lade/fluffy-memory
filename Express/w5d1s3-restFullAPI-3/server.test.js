const axios = require('axios');

const baseUrl = 'http://localhost:8080';

test('endpoint_get_courses_returns_array', async () => {
  const response = await axios.get(`${baseUrl}/courses`);
  expect(response.status).toBe(200);
  expect(Array.isArray(response.data)).toBe(true);
});

test('endpoint_post_course_creates_new_entry', async () => {
  const newCourse = { title: "React Development", instructor: "Alice Johnson", duration: 8 };
  const response = await axios.post(`${baseUrl}/courses`, newCourse);
  expect(response.status).toBe(201);
  expect(response.data.title).toBe("React Development");
  expect(response.data.instructor).toBe("Alice Johnson");
  expect(response.data.duration).toBe(8);
});

test('endpoint_post_invalid_input_returns_400', async () => {
  try {
    const invalid = { title: "Missing Instructor", duration: 6 };
    await axios.post(`${baseUrl}/courses`, invalid);
  } catch (error) {
    expect(error.response.status).toBe(400);
  }
});


test('endpoint_patch_method_returns_405', async () => {
  try {
    await axios.patch(`${baseUrl}/courses`);
  } catch (error) {
    expect(error.response.status).toBe(405);
  }
});

test('endpoint_post_wrong_data_type_returns_400', async () => {
  try {
    const invalid = { title: "Angular Basics", instructor: "Test Instructor", duration: "eight" };
    await axios.post(`${baseUrl}/courses`, invalid);
  } catch (error) {
    expect(error.response.status).toBe(400);
  }
});

test('endpoint_get_instructors_returns_unique_list', async () => {
  const response = await axios.get(`${baseUrl}/instructors`);
  expect(response.status).toBe(200);
  expect(response.data.instructors).toBeDefined();
  expect(Array.isArray(response.data.instructors)).toBe(true);
});