const axios = require('axios');

const baseUrl = 'http://localhost:8080';

test('endpoint_get_method_api_add_is_defined_and_returns_200_status', async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/add`, {
      params: { num1: 5, num2: 3 }
    });
    expect(response.status).toBe(200);
  } catch (error) {
    throw new Error(`Failed with status: ${error.response.status}`);
  }
});

test('endpoint_get_method_api_add_returns_correct_result', async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/add`, {
      params: { num1: 10, num2: 20 }
    });
    const data = response.data;
    expect(response.status).toBe(200);
    expect(data).toHaveProperty('result', 30);
  } catch (error) {
    throw new Error(`Failed with status: ${error.response.status}`);
  }
});

test('endpoint_get_method_api_add_throws_400_when_num1_is_missing', async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/add`, {
      params: { num2: 5 }
    });
    expect(response.status).toBe(400);
  } catch (error) {
    const response = error.response;
    expect(response.status).toBe(400);
  }
});

test('endpoint_get_method_api_add_throws_400_when_num2_is_missing', async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/add`, {
      params: { num1: 5 }
    });
    expect(response.status).toBe(400);
  } catch (error) {
    const response = error.response;
    expect(response.status).toBe(400);
  }
});

test('endpoint_get_method_api_multiply_is_defined_and_returns_200_status', async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/multiply`, {
      params: { num1: 4, num2: 6 }
    });
    expect(response.status).toBe(200);
  } catch (error) {
    throw new Error(`Failed with status: ${error.response.status}`);
  }
});

test('endpoint_get_method_api_multiply_returns_correct_result', async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/multiply`, {
      params: { num1: 7, num2: 8 }
    });
    const data = response.data;
    expect(response.status).toBe(200);
    expect(data).toHaveProperty('result', 56);
  } catch (error) {
    throw new Error(`Failed with status: ${error.response.status}`);
  }
});

test('endpoint_get_method_api_multiply_throws_400_when_num1_is_missing', async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/multiply`, {
      params: { num2: 5 }
    });
    expect(response.status).toBe(400);
  } catch (error) {
    const response = error.response;
    expect(response.status).toBe(400);
  }
});

test('endpoint_get_method_api_multiply_throws_400_when_num2_is_missing', async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/multiply`, {
      params: { num1: 5 }
    });
    expect(response.status).toBe(400);
  } catch (error) {
    const response = error.response;
    expect(response.status).toBe(400);
  }
});
