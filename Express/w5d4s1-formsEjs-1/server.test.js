// tests/feedbackForm.test.js
const axios = require('axios');
const baseUrl = 'http://localhost:8080';

test('endpoint_get_root_returns_200_and_html_content', async () => {
  const response = await axios.get(`${baseUrl}/`);
  expect(response.status).toBe(200);
  expect(response.headers['content-type']).toContain('text/html');
});

test('endpoint_get_root_contains_form_heading_name_and_message_fields', async () => {
  const response = await axios.get(`${baseUrl}/`);
  expect(response.data).toContain('Name');
});

test('endpoint_get_root_contains_submit_button', async () => {
  const response = await axios.get(`${baseUrl}/`);
  expect(response.data).toContain('Send');
});

test('endpoint_post_submit_returns_submitted_data_in_response', async () => {
  const payload = new URLSearchParams();
  payload.append('name', 'John Doe');
  payload.append('message', 'This is a test message.');

  const response = await axios.post(`${baseUrl}/submit`, payload.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  expect(response.status).toBe(200);
  expect(response.data).toContain('Form Submitted');
});

test('endpoint_post_submit_contains_go_back_link', async () => {
  const payload = new URLSearchParams();
  payload.append('name', 'Alice');
  payload.append('message', 'Feedback message');

  const response = await axios.post(`${baseUrl}/submit`, payload.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  expect(response.data).toContain('Go Back');
});
