// tests/productForm.test.js
const axios = require('axios');

const baseUrl = 'http://localhost:8080';

test('endpoint_get_method_product_returns_200_and_html_content', async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('text/html');
  } catch (error) {
    throw new Error(`Failed with status: ${error.response?.status}`);
  }
});

test('endpoint_get_method_product_renders_product_form_heading', async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    console.log(response.data);
    expect(response.status).toBe(200);
    expect(response.data).toContain('Add Product');
  } catch (error) {
    throw new Error(`Failed with status: ${error.response?.status}`);
  }
});

test('endpoint_get_method_product_contains_input_fields', async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    expect(response.status).toBe(200);
    expect(response.data).toContain('Product Name');
    expect(response.data).toContain('Price');
    expect(response.data).toContain('Category');
  } catch (error) {
    throw new Error(`Failed with status: ${error.response?.status}`);
  }
});

test('endpoint_get_method_product_contains_submit_button', async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    expect(response.status).toBe(200);
    expect(response.data).toContain('Submit');
  } catch (error) {
    throw new Error(`Failed with status: ${error.response?.status}`);
  }
});

test('endpoint_get_method_root_contains_proper_html_structure', async () => {
  try {
    const response = await axios.get(`${baseUrl}/`);
    expect(response.status).toBe(200);
    expect(response.data).toContain('<!DOCTYPE html>');
    expect(response.data).toContain('<html>');
    expect(response.data).toContain('<head>');
    expect(response.data).toContain('<body>');
    expect(response.data).toContain('</html>');
  } catch (error) {
    throw new Error(`Failed with status: ${error.response.status}`);
  }
});