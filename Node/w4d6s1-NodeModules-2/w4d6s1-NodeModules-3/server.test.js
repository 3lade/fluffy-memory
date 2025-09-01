const axios = require('axios');

const baseUrl = 'http://localhost:8080';

test('endpoint_get_items_returns_valid_format', async () => {
  try {
    const response = await axios.get(`${baseUrl}/items`);
    expect(response.status).toBe(200);

    // Check if it either says the list is empty or follows the expected list format
    const data = response.data;

    const isEmptyMessage = data === 'Shopping list is empty.';
    const isListWithTotal = data.includes('Shopping List:') && data.includes('Total: ₹');

    expect(isEmptyMessage || isListWithTotal).toBe(true);
  } catch (error) {
    throw new Error(`Failed with status: ${error.response?.status}`);
  }
});

test('endpoint_get_add_with_valid_item_adds_to_list_and_returns_200', async () => {
  try {
    const response = await axios.get(`${baseUrl}/add?name=Milk&price=30`);
    expect(response.status).toBe(200);
    expect(response.data).toBe('Added item: Milk - ₹30');
  } catch (error) {
    throw new Error(`Failed with status: ${error.response.status}`);
  }
});

test('endpoint_get_items_returns_list_with_total_after_adding_items', async () => {
  try {
    // Add items first
    await axios.get(`${baseUrl}/add?name=Bread&price=20`);
    await axios.get(`${baseUrl}/add?name=Butter&price=50`);
    
    const response = await axios.get(`${baseUrl}/items`);
    expect(response.status).toBe(200);
    expect(response.data).toContain('Shopping List:');
    expect(response.data).toContain('Bread - ₹20');
    expect(response.data).toContain('Butter - ₹50');
    expect(response.data).toContain('Total: ₹');
  } catch (error) {
    throw new Error(`Failed with status: ${error.response.status}`);
  }
});

test('endpoint_get_add_with_invalid_data_returns_400_status', async () => {
  try {
    const response = await axios.get(`${baseUrl}/add?name=Apple`);
    expect(response.status).toBe(400);
  } catch (error) {
    const response = error.response;
    expect(response.status).toBe(400);
    expect(response.data).toContain('Please provide valid name and price');
  }
});

test('endpoint_get_highest_returns_highest_priced_item', async () => {
  try {
    // Add multiple items
    await axios.get(`${baseUrl}/add?name=Rice&price=100`);
    await axios.get(`${baseUrl}/add?name=Oil&price=150`);
    await axios.get(`${baseUrl}/add?name=Sugar&price=80`);

    // Get the highest priced item
    const highestResponse = await axios.get(`${baseUrl}/highest`);
    expect(highestResponse.status).toBe(200);
    expect(highestResponse.data).toContain('Highest Priced Item');
    expect(highestResponse.data).toContain('Oil');
    expect(highestResponse.data).toContain('₹150');
  } catch (error) {
    throw new Error(`Failed with status: ${error.response?.status}`);
  }
});