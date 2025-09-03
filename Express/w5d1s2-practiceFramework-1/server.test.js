const axios = require('axios');

const baseUrl = 'http://localhost:8080';

test('endpoint_get_products_returns_initial_products', async () => {
  try {
    const response = await axios.get(`${baseUrl}/products`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThanOrEqual(2);
    
    // Check that the initial products are present (they should be the first 2)
    const initialProducts = response.data.slice(0, 2);
    expect(initialProducts[0]).toEqual({ id: 1, name: 'Product A', price: 100 });
    expect(initialProducts[1]).toEqual({ id: 2, name: 'Product B', price: 200 });
  } catch (error) {
    if (error.response) {
      throw new Error(`Failed with status: ${error.response.status}`);
    } else {
      throw error;
    }
  }
});

test('endpoint_post_products_with_valid_data_creates_product_and_returns_201', async () => {
  try {
    const newProduct = { name: 'Product C', price: 150 };
    const response = await axios.post(`${baseUrl}/products`, newProduct);
    expect(response.status).toBe(201);
    expect(response.data).toEqual({
      id: expect.any(Number),
      name: 'Product C',
      price: 150
    });
    expect(response.data.id).toBeGreaterThan(2);
  } catch (error) {
    if (error.response) {
      throw new Error(`Failed with status: ${error.response.status}`);
    } else {
      throw error;
    }
  }
});

test('endpoint_get_products_returns_all_products_after_creating_new_ones', async () => {
  try {
    // Add a new product first
    await axios.post(`${baseUrl}/products`, { name: 'Product D', price: 300 });
    await axios.post(`${baseUrl}/products`, { name: 'Product E', price: 250 });
    
    const response = await axios.get(`${baseUrl}/products`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThanOrEqual(4);
    
    // Check that new products are included
    const productNames = response.data.map(p => p.name);
    expect(productNames).toContain('Product D');
    expect(productNames).toContain('Product E');
  } catch (error) {
    if (error.response) {
      throw new Error(`Failed with status: ${error.response.status}`);
    } else {
      throw error;
    }
  }
});

test('endpoint_post_products_with_missing_name_returns_400_status', async () => {
  try {
    const response = await axios.post(`${baseUrl}/products`, { price: 100 });
    expect(response.status).toBe(400);
  } catch (error) {
    if (error.response) {
      const response = error.response;
      expect(response.status).toBe(400);
      expect(response.data).toContain('Name and price are required');
    } else {
      throw error;
    }
  }
});

test('endpoint_post_products_with_missing_price_returns_400_status', async () => {
  try {
    const response = await axios.post(`${baseUrl}/products`, { name: 'Test Product' });
    expect(response.status).toBe(400);
  } catch (error) {
    if (error.response) {
      const response = error.response;
      expect(response.status).toBe(400);
      expect(response.data).toContain('Name and price are required');
    } else {
      throw error;
    }
  }
});

test('endpoint_get_product_by_id_returns_correct_product', async () => {
  try {
    // First, create a product to ensure we have a known ID
    const createResponse = await axios.post(`${baseUrl}/products`, { 
      name: 'Test Product for ID', 
      price: 99 
    });
    const createdProduct = createResponse.data;
    
    // Now get the product by ID
    const response = await axios.get(`${baseUrl}/products/${createdProduct.id}`);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(createdProduct);
  } catch (error) {
    if (error.response) {
      throw new Error(`Failed with status: ${error.response.status}`);
    } else {
      throw error;
    }
  }
});

test('endpoint_get_product_by_nonexistent_id_returns_404_status', async () => {
  try {
    const response = await axios.get(`${baseUrl}/products/99999`);
    expect(response.status).toBe(404);
  } catch (error) {
    if (error.response) {
      const response = error.response;
      expect(response.status).toBe(404);
      expect(response.data).toBe('Product not found');
    } else {
      throw error;
    }
  }
});