const axios = require('axios');
const baseUrl = 'http://localhost:8080';

test('endpoint_get_method_api_webseries_is_defined_and_returns_200_status', async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/webseries`);
    expect(response.status).toBe(200);
  } catch (error) {
    throw new Error(`Failed with status: ${error.response.status}`);
  }
});

test('endpoint_get_method_api_webseries_returns_webseries_array_with_200_status', async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/webseries`);
    const data = response.data;
    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  } catch (error) {
    throw new Error(`Failed with status: ${error.response.status}`);
  }
});



test('endpoint_post_method_api_webseries_creates_new_webseries_with_200_status', async () => {
  const newWebSeries = {
    title: 'Breaking Bad',
    genre: 'Drama',
    episodes: 62,
    releaseYear: 2008
  };

  try {
    const response = await axios.post(`${baseUrl}/api/webseries`, newWebSeries);
    expect(response.status).toBe(200);
  } catch (error) {
    throw new Error(`Failed with status: ${error.response.status}`);
  }
});

test('endpoint_post_method_api_webseries_returns_id_with_200_status', async () => {
  const newWebSeries = {
    title: 'Stranger Things',
    genre: 'Sci-Fi',
    episodes: 34,
    releaseYear: 2016
  };

  try {
    const response = await axios.post(`${baseUrl}/api/webseries`, newWebSeries);
    expect(response.status).toBe(200);
    const data = response.data;
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('message');
  } catch (error) {
    throw new Error(`Failed with status: ${error.response.status}`);
  }
});


test('endpoint_post_method_api_webseries_throws_400_status_when_both_title_and_genre_are_missing', async () => {
  const newWebSeries = {
    episodes: 30,
    releaseYear: 2022
  };

  try {
    const response = await axios.post(`${baseUrl}/api/webseries`, newWebSeries);
    expect(response.status).toBe(400);
  } catch (error) {
    const response = error.response;
    expect(response.status).toBe(400);
  }
});
