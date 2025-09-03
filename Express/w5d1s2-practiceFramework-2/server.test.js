const axios = require('axios');

const baseUrl = 'http://localhost:8080';

test('endpoint_get_items_returns_all_medical_items', async () => {
  try {
    const response = await axios.get(`${baseUrl}/items`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThanOrEqual(1);
  } catch (error) {
    throw new Error(`Failed with status: ${error.response?.status || 'unknown'}`);
  }
});

test('endpoint_post_add_creates_new_medical_item', async () => {
  try {
    const newItem = { name: 'Ibuprofen', quantity: 150 };
    const response = await axios.post(`${baseUrl}/add`, newItem);
    expect(response.status).toBe(201);
    expect(response.data.name).toBe('Ibuprofen');
    expect(response.data.quantity).toBe(150);
    expect(response.data.id).toBeDefined();
  } catch (error) {
    throw new Error(`Failed with status: ${error.response?.status || 'unknown'}`);
  }
});

test('endpoint_put_update_modifies_existing_item', async () => {
  try {
    // First create an item to update
    const createResponse = await axios.post(`${baseUrl}/add`, { name: 'Item to Update', quantity: 50 });
    const itemId = createResponse.data.id;
    
    const updatedItem = { name: 'Updated Item', quantity: 200 };
    const response = await axios.put(`${baseUrl}/update/${itemId}`, updatedItem);
    expect(response.status).toBe(200);
    expect(response.data.name).toBe('Updated Item');
    expect(response.data.quantity).toBe(200);
    expect(response.data.id).toBe(itemId);
  } catch (error) {
    throw new Error(`Failed with status: ${error.response?.status || 'unknown'}`);
  }
});

test('endpoint_put_update_with_invalid_quantity_returns_400', async () => {
  try {
    // First, create a valid item
    const createResponse = await axios.post(`${baseUrl}/add`, {
      name: 'Invalid Quantity Test',
      quantity: 10,
    });
    const itemId = createResponse.data.id;

    // Now try to update it with an invalid quantity
    const invalidUpdate = { quantity: -5 };
    await axios.put(`${baseUrl}/update/${itemId}`, invalidUpdate);
  } catch (error) {
    const response = error.response;
    expect(response.status).toBe(400);
    expect(response.data).toBe('Invalid quantity. Quantity must be a number >= 0.');
  }
});



test('endpoint_post_add_with_missing_data_returns_400', async () => {
  try {
    const response = await axios.post(`${baseUrl}/add`, { quantity: 100 });
    expect(response.status).toBe(400);
  } catch (error) {
    const response = error.response;
    expect(response.status).toBe(400);
    expect(response.data).toContain('Invalid input');
  }
});