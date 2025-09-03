const axios = require('axios');

const baseUrl = 'http://localhost:8080';

test('endpoint_get_method_api_registrations_returns_200', async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/registrations`);
    expect(response.status).toBe(200);
  } catch (error) {
    throw new Error(`GET failed with status: ${error.response?.status}`);
  }
});

test('endpoint_get_method_api_registrations_returns_200_and_array_with_registeredAt', async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/registrations`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);

    response.data.forEach(item => {
      expect(item).toHaveProperty('registeredAt');
    });
  } catch (error) {
    throw new Error(`GET failed with status: ${error.response?.status}`);
  }
});


test('endpoint_post_method_api_registrations_creates_registration_and_returns_200_with_id', async () => {
  const newRegistration = {
    name: 'Alice',
    email: 'alice@example.com'
  };

  try {
    const response = await axios.post(`${baseUrl}/api/registrations`, newRegistration);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id');
  } catch (error) {
    throw new Error(`POST failed with status: ${error.response?.status}`);
  }
});

test('endpoint_post_method_api_registrations_returns_400_when_name_is_missing', async () => {
  const newRegistration = {
    email: 'missingname@example.com'
  };

  try {
    const response = await axios.post(`${baseUrl}/api/registrations`, newRegistration);
    expect(response.status).toBe(400);
  } catch (error) {
    expect(error.response.status).toBe(400);
  }
});

test('endpoint_post_method_api_registrations_returns_400_when_email_is_missing', async () => {
  const newRegistration = {
    name: 'Missing Email'
  };

  try {
    const response = await axios.post(`${baseUrl}/api/registrations`, newRegistration);
    expect(response.status).toBe(400);
  } catch (error) {
    expect(error.response.status).toBe(400);
  }
});

test('endpoint_delete_method_api_registrations_deletes_registration_and_returns_success_message', async () => {
  const registration = {
    name: 'Delete Me',
    email: 'deleteme@example.com'
  };

  // First create
  const createResponse = await axios.post(`${baseUrl}/api/registrations`, registration);
  const idToDelete = createResponse.data.id;

  // Then delete
  const deleteResponse = await axios.delete(`${baseUrl}/api/registrations/${idToDelete}`);
  expect(deleteResponse.status).toBe(200);
  expect(deleteResponse.data).toHaveProperty('message', 'Registration deleted successfully');
});

