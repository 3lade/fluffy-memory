const axios = require('axios');

const baseUrl = 'http://localhost:8080';

test('endpoint_get_students_returns_200_status', async () => {
  try {
    const response = await axios.get(`${baseUrl}/students`);
    expect(response.status).toBe(200);
  } catch (error) {
    throw new Error(`Failed with status: ${error.response.status}`);
  }
});

test('endpoint_get_students_returns_initial_students_list', async () => {
  try {
    const response = await axios.get(`${baseUrl}/students`);
    expect(response.status).toBe(200);
    expect(response.data).toContain('Alice');
    expect(response.data).toContain('Bob');
  } catch (error) {
    throw new Error(`Failed with status: ${error.response.status}`);
  }
});

test('endpoint_get_add_with_name_adds_student_and_returns_200', async () => {
  try {
    const response = await axios.get(`${baseUrl}/add?name=Charlie`);
    expect(response.status).toBe(200);
    expect(response.data).toBe('Added student: Charlie');
  } catch (error) {
    throw new Error(`Failed with status: ${error.response.status}`);
  }
});

test('endpoint_get_add_without_name_returns_error_message', async () => {
  try {
    const response = await axios.get(`${baseUrl}/add`);
    expect(response.status).toBe(200);
    expect(response.data).toContain('Please provide a name');
  } catch (error) {
    throw new Error(`Failed with status: ${error.response.status}`);
  }
});

test('endpoint_get_root_returns_welcome_message_with_instructions', async () => {
  try {
    const response = await axios.get(`${baseUrl}/`);
    expect(response.status).toBe(200);
    expect(response.data).toContain('Welcome!');
    expect(response.data).toContain('/students');
    expect(response.data).toContain('/add?name=');
  } catch (error) {
    throw new Error(`Failed with status: ${error.response.status}`);
  }
});