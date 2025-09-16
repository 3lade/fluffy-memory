const axios = require('axios');
const baseUrl = 'http://localhost:8080';

describe('Favorites API - Cookie Based', () => {
  let cookie;

  test('endpoint_post_method_add_favorite_should_add_item_to_cookie_returns_200', async () => {
    const response = await axios.post(`${baseUrl}/add-favorite`, { item: 'Pizza' }, {
      withCredentials: true
    });

    expect(response.status).toBe(200);
  });

  
  test('endpoint_post_method_add_favorite_should_add_item_to_cookie_returns_message', async () => {
    const response = await axios.post(`${baseUrl}/add-favorite`, { item: 'Pizza' }, {
      withCredentials: true
    });

    expect(response.data.message).toBe('Item added to favorites');
  });
  test('endpoint_post_method_add_favorite_should_add_item_to_cookie_returns_favorites', async () => {
    const response = await axios.post(`${baseUrl}/add-favorite`, { item: 'Pizza' }, {
      withCredentials: true
    });
    expect(response.data.favorites).toContain('Pizza');
    cookie = response.headers['set-cookie'][0];
  });

  test('endpoint_get_method_favorites_should_return_all_items_in_cookie', async () => {
    const response = await axios.get(`${baseUrl}/favorites`, {
      headers: { Cookie: cookie },
      withCredentials: true
    });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data.favorites)).toBe(true);
    expect(response.data.favorites).toContain('Pizza');
  });

  test('endpoint_delete_method_should_remove_item_from_cookie', async () => {
    const response = await axios.delete(`${baseUrl}/remove-favorite`, {
      data: { item: 'Pizza' },
      headers: { Cookie: cookie },
      withCredentials: true
    });

    expect(response.status).toBe(200);
    expect(response.data.message).toBe('Item removed from favorites');
  });

});