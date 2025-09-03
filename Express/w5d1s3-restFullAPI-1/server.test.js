const axios = require('axios');

const baseUrl = 'http://localhost:8080';

test('endpoint_get_books_returns_books_array', async () => {
  try {
    const response = await axios.get(`${baseUrl}/books`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  } catch (error) {
    throw new Error(`Failed with status: ${error.response.status}`);
  }
});

test('endpoint_post_books_creates_new_book', async () => {
  try {
    const newBook = { title: "Test Book", author: "Test Author", available: true };
    const response = await axios.post(`${baseUrl}/books`, newBook);
    expect(response.status).toBe(201);
    expect(response.data.title).toBe("Test Book");
    expect(response.data.author).toBe("Test Author");
    expect(response.data.available).toBe(true);
  } catch (error) {
    throw new Error(`Failed with status: ${error.response.status}`);
  }
});

test('endpoint_delete_books_removes_book', async () => {
  try {
    // First create a book to delete
    const createResponse = await axios.post(`${baseUrl}/books`, { 
      title: "Book to Delete", 
      author: "Test Author", 
      available: true 
    });
    const bookId = createResponse.data.id;
    
    // Now delete it
    const response = await axios.delete(`${baseUrl}/books/${bookId}`);
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(bookId);
  } catch (error) {
    throw new Error(`Failed with status: ${error.response.status}`);
  }
});

test('endpoint_post_invalid_data_returns_400', async () => {
  try {
    const invalidBook = { title: "No Author" };
    const response = await axios.post(`${baseUrl}/books`, invalidBook);
    expect(response.status).toBe(400);
  } catch (error) {
    expect(error.response.status).toBe(400);
  }
});

test('endpoint_delete_nonexistent_book_returns_404', async () => {
  try {
    const response = await axios.delete(`${baseUrl}/books/999`);
    expect(response.status).toBe(404);
  } catch (error) {
    expect(error.response.status).toBe(404);
  }
});

test('endpoint_invalid_method_returns_405', async () => {
  try {
    const response = await axios.patch(`${baseUrl}/books`);
    expect(response.status).toBe(405);
  } catch (error) {
    expect(error.response.status).toBe(405);
  }
});

test('endpoint_post_wrong_data_type_returns_400', async () => {
  try {
    const invalidBook = { title: "Test", author: "Test", available: "yes" };
    const response = await axios.post(`${baseUrl}/books`, invalidBook);
    expect(response.status).toBe(400);
  } catch (error) {
    expect(error.response.status).toBe(400);
  }
});