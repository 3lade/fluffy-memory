const Book = require('../models/Book');
const axios = require('axios');
const baseUrl = 'http://localhost:8080';

describe('Book_Model_Field_Existence_Test', () => {

  test('book_Model_should_have_field_title', () => {
    const book = new Book();
    expect(book.schema.path('title')).toBeDefined();
  });

  test('book_Model_should_have_field_author', () => {
    const book = new Book();
    expect(book.schema.path('author')).toBeDefined();
  });

  test('book_Model_should_have_field_publishedYear', () => {
    const book = new Book();
    expect(book.schema.path('publishedYear')).toBeDefined();
  });

});

describe('Book_Endpoint_CRUD_Test', () => {

  test('endpoint_post_method_books_creates_new_book_with_201_status', async () => {
    const newBook = {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      publishedYear: 2008
    };

    const response = await axios.post(`${baseUrl}/books`, newBook);
    expect(response.status).toBe(201);
    expect(response.data.book).toHaveProperty('_id');
  });

  test('endpoint_put_method_books_updates_all_books_with_200_status', async () => {
    const updateData = {
      publishedYear: 2020
    };

    const response = await axios.put(`${baseUrl}/books`, updateData);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('message', 'All books updated successfully');
  });

  test('endpoint_get_method_books_fetches_all_books_with_200_status', async () => {
    const response = await axios.get(`${baseUrl}/books`);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('books');
    expect(Array.isArray(response.data.books)).toBe(true);
  });

});
