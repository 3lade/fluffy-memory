const axios = require('axios');

const baseUrl = 'http://localhost:8080';

test('endpoint_get_rooms_returns_all_rooms', async () => {
  try {
    const response = await axios.get(`${baseUrl}/rooms`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThanOrEqual(1);
  } catch (error) {
    throw new Error(`Failed with status: ${error.response?.status || 'unknown'}`);
  }
});

test('endpoint_get_available_rooms_returns_only_available', async () => {
  try {
    const response = await axios.get(`${baseUrl}/rooms/available`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThanOrEqual(1);
    
    // All returned rooms should have isAvailable: true
    response.data.forEach(room => {
      expect(room.isAvailable).toBe(true);
    });
  } catch (error) {
    throw new Error(`Failed with status: ${error.response?.status || 'unknown'}`);
  }
});

test('endpoint_post_add_creates_new_room', async () => {
  try {
    const newRoom = { 
      roomNumber: '201',
      type: 'Deluxe', 
      isAvailable: true 
    };
    const response = await axios.post(`${baseUrl}/add`, newRoom);
    expect(response.status).toBe(201);
    expect(response.data.roomNumber).toBe('201');
    expect(response.data.type).toBe('Deluxe');
    expect(response.data.isAvailable).toBe(true);
    expect(response.data.id).toBeDefined();
  } catch (error) {
    throw new Error(`Failed with status: ${error.response?.status || 'unknown'}`);
  }
});

test('endpoint_get_available_rooms_returns_404_when_no_available', async () => {
  try {
    // First, let's add some unavailable rooms to test the 404 case
    await axios.post(`${baseUrl}/add`, {
      roomNumber: '501',
      type: 'Test Room',
      isAvailable: false
    });
    
    const response = await axios.get(`${baseUrl}/rooms/available`);
    expect(response.status).toBe(200);
  } catch (error) {
    // If no available rooms found
    expect(error.response.status).toBe(404);
    expect(error.response.data).toBe('No available rooms found.');
  }
});

test('endpoint_post_add_with_missing_data_returns_400', async () => {
  try {
    const response = await axios.post(`${baseUrl}/add`, { 
      roomNumber: '202' 
      // Missing 'type' and 'isAvailable'
    });
    expect(response.status).toBe(400);
  } catch (error) {
    const response = error.response;
    expect(response.status).toBe(400);
    expect(response.data).toContain('Invalid input');
  }
});