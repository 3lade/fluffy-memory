const axios = require('axios');
const tough = require('tough-cookie');
const baseUrl = 'http://localhost:8080';

describe('Visit_Counter_Endpoint_Test', () => {

  test('endpoint_get_method_root_should_return_200_and_count', async () => {
    // First visit
    const firstVisitResponse = await axios.get(`${baseUrl}/`, {
      withCredentials: true
    });

    expect(firstVisitResponse.status).toBe(200);
    expect(firstVisitResponse.data).toMatch(/You have visited this site/);

  });


  test('endpoint_get_method_reset_visits_clears_and_returns_200', async () => {
    const resetResponse = await axios.get(`${baseUrl}/reset-visits`, {
      withCredentials: true
    });

    expect(resetResponse.status).toBe(200);
  });


    
  test('endpoint_get_method_reset_visits_clears_and_returns_message', async () => {
    const resetResponse = await axios.get(`${baseUrl}/reset-visits`, {
      withCredentials: true
    });

    expect(resetResponse.data).toBe('Visit counter has been reset.');
  });

  test('endpoint_get_method_reset_visits_clears_visitCount_cookie_correctly', async () => {
    const resetResponse = await axios.get(`${baseUrl}/reset-visits`, {
      withCredentials: true
    });

    expect(resetResponse.status).toBe(200);
    expect(resetResponse.data).toBe('Visit counter has been reset.');

    // Next visit should reset count to 1
    const afterResetResponse = await axios.get(`${baseUrl}/`, {
      withCredentials: true
    });

    expect(afterResetResponse.status).toBe(200);
    expect(afterResetResponse.data).toMatch(/You have visited this site 1 time/);
  });

});
