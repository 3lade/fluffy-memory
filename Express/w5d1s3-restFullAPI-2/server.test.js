const axios = require('axios');

const baseUrl = 'http://localhost:8080';

test('endpoint_get_workouts_returns_array', async () => {
  const response = await axios.get(`${baseUrl}/workouts`);
  expect(response.status).toBe(200);
  expect(Array.isArray(response.data)).toBe(true);
});

test('endpoint_post_workout_creates_new_entry', async () => {
  const newWorkout = { type: "Cycling", duration: 60, date: "2025-07-25" };
  const response = await axios.post(`${baseUrl}/workouts`, newWorkout);
  expect(response.status).toBe(201);
  expect(response.data.type).toBe("Cycling");
  expect(response.data.duration).toBe(60);
  expect(response.data.date).toBe("2025-07-25");
});

test('endpoint_post_invalid_input_returns_400', async () => {
  try {
    const invalid = { type: "Missing Duration", date: "2025-07-25" };
    await axios.post(`${baseUrl}/workouts`, invalid);
  } catch (error) {
    expect(error.response.status).toBe(400);
  }
});

test('endpoint_patch_method_returns_405', async () => {
  try {
    await axios.patch(`${baseUrl}/workouts`);
  } catch (error) {
    expect(error.response.status).toBe(405);
  }
});

test('endpoint_post_wrong_data_type_returns_400', async () => {
  try {
    const invalid = { type: "Yoga", duration: "forty", date: "2025-07-25" };
    await axios.post(`${baseUrl}/workouts`, invalid);
  } catch (error) {
    expect(error.response.status).toBe(400);
  }
});

test('endpoint_summary_returns_total_duration', async () => {
  const response = await axios.get(`${baseUrl}/summary`);
  expect(response.status).toBe(200);
  expect(typeof response.data.totalMinutes).toBe("number");
});
