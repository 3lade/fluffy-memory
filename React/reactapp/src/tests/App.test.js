// File: src/__tests__/BookRentalManagement.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import axios from 'axios';

jest.mock('axios');

describe('Book Rental Management Logic Tests', () => {
 test('1. should load rental list correctly', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, genre: 'Fiction', renterName: 'One', rentalDate: '2025-08-01', bookTitle: '', author: '', price: 100 },
        { id: 2, genre: 'Non-Fiction', renterName: 'Two', rentalDate: '2025-08-02', bookTitle: '', author: '', price: 150 },
      ],
    });

    render(<App />);
    fireEvent.click(screen.getByRole('link', { name: /view/i }));
    const rows = await screen.findAllByRole('row');
    expect(rows.length).toBe(3);
  });

  test('2. should filter rentals by genre', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, genre: 'Fiction', renterName: 'A', rentalDate: '2025-08-01', bookTitle: '', author: '', price: 100 },
        { id: 2, genre: 'Biography', renterName: 'B', rentalDate: '2025-08-02', bookTitle: '', author: '', price: 150 },
      ],
    });

    render(<App />);
    fireEvent.click(screen.getByRole('link', { name: /view/i }));
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Fiction' } });

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows.length).toBe(2); // header + one item
    });
  });

  test('3. should filter by search input (case-insensitive)', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, genre: 'Fiction', renterName: 'Chris', rentalDate: '2025-08-01', bookTitle: '', author: '', price: 100 },
        { id: 2, genre: 'Fiction', renterName: 'Sam', rentalDate: '2025-08-02', bookTitle: '', author: '', price: 100 },
      ],
    });

    render(<App />);
    fireEvent.click(screen.getByRole('link', { name: /view/i }));
    fireEvent.change(await screen.findByRole('textbox'), { target: { value: 'ch' } });

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows.length).toBe(2); // header + one filtered
    });
  });

  test('4. should sort by date when checkbox is checked', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, genre: 'Fiction', renterName: 'Late', rentalDate: '2025-08-10', bookTitle: '', author: '', price: 100 },
        { id: 2, genre: 'Fiction', renterName: 'Early', rentalDate: '2025-08-01', bookTitle: '', author: '', price: 100 },
      ],
    });

    render(<App />);
    fireEvent.click(screen.getByRole('link', { name: /view/i }));
    fireEvent.click(await screen.findByRole('checkbox'));

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      const firstRenter = rows[1].querySelectorAll('td')[3].textContent.toLowerCase();
      expect(firstRenter).toContain('early');
    });
  });

  test('5. BookRentalList: filtering logic works correctly', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, genre: 'Fiction', renterName: 'Alice', rentalDate: '2025-08-01', bookTitle: '', author: '', price: 100 },
        { id: 2, genre: 'Non-Fiction', renterName: 'Bob', rentalDate: '2025-08-02', bookTitle: '', author: '', price: 150 },
      ],
    });

    render(<App />);
    fireEvent.click(screen.getByRole('link', { name: /view/i }));
    expect(await screen.findAllByRole('row')).toHaveLength(3); // including header

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Fiction' } });

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows.length).toBe(2); // 1 header + 1 filtered
    });
  });

  test('6. BookRentalList: search logic filters by renter name', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, genre: 'Fiction', renterName: 'Charlie', rentalDate: '2025-08-01', bookTitle: '', author: '', price: 120 },
        { id: 2, genre: 'Biography', renterName: 'David', rentalDate: '2025-08-03', bookTitle: '', author: '', price: 130 },
      ],
    });

    render(<App />);
    fireEvent.click(screen.getByRole('link', { name: /view/i }));
    const input = await screen.findByRole('textbox');
    fireEvent.change(input, { target: { value: 'char' } });

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows.length).toBe(2); // header + one filtered
    });
  });

  test('7. should not crash on duplicate filter values', async () => {
    axios.get.mockResolvedValueOnce({
      data: Array(3).fill({
        id: Math.random(),
        genre: 'Fiction',
        renterName: 'Repeat',
        rentalDate: '2025-08-01',
        bookTitle: '',
        author: '',
        price: 100,
      }),
    });

    render(<App />);
    fireEvent.click(screen.getByRole('link', { name: /view/i }));
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Fiction' } });

    const rows = await screen.findAllByRole('row');
    expect(rows.length).toBe(4); // 3 entries + header
  });
  test('8. BookRentalList shows "No rentals found" when no data', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<App />);
    fireEvent.click(screen.getByRole('link', { name: /view/i }));

    expect(await screen.findByText(/no rentals found/i)).toBeInTheDocument();
  });

  test('9. BookRentalList delete button calls delete API and refreshes', async () => {
    const rentalData = [
      { id: 1, genre: 'Fiction', renterName: 'John', rentalDate: '2025-08-01', bookTitle: 'Book1', author: 'A', price: 100 }
    ];
    axios.get.mockResolvedValueOnce({ data: rentalData });
    axios.delete.mockResolvedValueOnce({});

    render(<App />);
    fireEvent.click(screen.getByRole('link', { name: /view/i }));

    await screen.findByText('Book1');

    fireEvent.click(screen.getByText(/delete/i));
    axios.get.mockResolvedValueOnce({ data: [] });

    await waitFor(() => expect(screen.queryByText('Book1')).not.toBeInTheDocument());
  });

  test('10. BookRentalList handles delete failure shows alert', async () => {
    window.alert = jest.fn();

    const rentalData = [
      { id: 1, genre: 'Fiction', renterName: 'John', rentalDate: '2025-08-01', bookTitle: 'Book1', author: 'A', price: 100 }
    ];
    axios.get.mockResolvedValueOnce({ data: rentalData });
    axios.delete.mockRejectedValueOnce(new Error('Delete error'));

    render(<App />);
    fireEvent.click(screen.getByRole('link', { name: /view/i }));

    await screen.findByText('Book1');

    fireEvent.click(screen.getByText(/delete/i));

    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Delete failed'));
  });
  
  test('11. should show error if required fields are empty', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('link', { name: /add/i }));
    fireEvent.click(await screen.findByRole('button'));
    const errors = await screen.findAllByText((text) => text.toLowerCase().includes('fill'));
    expect(errors.length).toBeGreaterThan(0);
  });
  test('12. AddBookRental shows error on axios.post failure', async () => {
    axios.post.mockRejectedValueOnce(new Error('Network error'));

    render(<App />);
    fireEvent.click(screen.getByRole('link', { name: /add/i }));

    const [title, author, renter, price] = await screen.findAllByRole('textbox');
    fireEvent.change(title, { target: { value: 'Test Book' } });
    fireEvent.change(author, { target: { value: 'Author' } });
    fireEvent.change(renter, { target: { value: 'Renter' } });
    fireEvent.change(price, { target: { value: '200' } });

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Fiction' } });
    fireEvent.change(screen.getByLabelText(/Rental Date/i), { target: { value: '2025-08-05' } });

    fireEvent.click(screen.getByRole('button', { name: /add rental/i }));

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });
  
  describe('Book Rental Management Additional Logic Tests', () => {
    test('13. should show message when no rentals match filter and search', async () => {
      axios.get.mockResolvedValueOnce({
        data: [
          { id: 1, genre: 'Fiction', renterName: 'Anna', rentalDate: '2025-08-01', bookTitle: 'Book A', author: 'Author A', price: 100 },
        ],
      });
  
      render(<App />);
      fireEvent.click(screen.getByRole('link', { name: /view/i }));
  
      await screen.findAllByRole('row');
  
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Biography' } });
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'xyz' } });
  
      expect(await screen.findByText(/no rentals found/i)).toBeInTheDocument();
    });
    
  });
  test('14. BookRentalList should reset filters when cleared', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, genre: 'Fiction', renterName: 'John', rentalDate: '2025-08-01', bookTitle: 'Book 1', author: 'A', price: 100 },
        { id: 2, genre: 'Biography', renterName: 'Doe', rentalDate: '2025-08-02', bookTitle: 'Book 2', author: 'B', price: 150 },
      ]
    });
  
    render(<App />);
    fireEvent.click(screen.getByRole('link', { name: /view/i }));
  
    await screen.findAllByRole('row');
  
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Fiction' } });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'john' } });
  
    // Reset filter
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '' } });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } });
  
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows.length).toBe(3); // Header + 2 items
    });
  });
  test('15. AddBookRental should clear form after successful submit', async () => {
    axios.post.mockResolvedValueOnce({ data: {} });
  
    render(<App />);
    fireEvent.click(screen.getByRole('link', { name: /add/i }));
  
    const [title, author, renter, price] = await screen.findAllByRole('textbox');
    fireEvent.change(title, { target: { value: 'Test Book' } });
    fireEvent.change(author, { target: { value: 'Author' } });
    fireEvent.change(renter, { target: { value: 'Renter' } });
    fireEvent.change(price, { target: { value: '300' } });
  
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Fiction' } });
    fireEvent.change(screen.getByLabelText(/Rental Date/i), { target: { value: '2025-08-06' } });
  
    fireEvent.click(screen.getByRole('button', { name: /add rental/i }));
  
    await waitFor(() => {
      expect(title.value).toBe('');
      expect(author.value).toBe('');
      expect(renter.value).toBe('');
      expect(price.value).toBe('');
    });
  });
  test('16. BookRentalList handles long genre values gracefully', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          genre: 'VeryLongGenreNameThatMightBreakLayout',
          renterName: 'John',
          rentalDate: '2025-08-01',
          bookTitle: 'Long Genre Book',
          author: 'Author X',
          price: 200
        },
      ],
    });
  
    render(<App />);
    fireEvent.click(screen.getByRole('link', { name: /view/i }));
  
    const genreCell = await screen.findByText(/VeryLongGenreName/i);
    expect(genreCell).toBeInTheDocument();
  });
  test('17. BookRentalList should correctly display price with currency', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, genre: 'Fiction', renterName: 'Jane', rentalDate: '2025-08-03', bookTitle: 'Priced Book', author: 'Author Z', price: 250 }
      ]
    });
  
    render(<App />);
    fireEvent.click(screen.getByRole('link', { name: /view/i }));
  
    const priceCell = await screen.findByText(/250/i);
    expect(priceCell.textContent).toMatch(/250/); // You can add ₹, $, etc., if used in UI
  });
  test('18. BookRentalList handles multiple entries with same renter name', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, genre: 'Fiction', renterName: 'Alex', rentalDate: '2025-08-01', bookTitle: 'Book A', author: 'A', price: 100 },
        { id: 2, genre: 'Biography', renterName: 'Alex', rentalDate: '2025-08-02', bookTitle: 'Book B', author: 'B', price: 120 }
      ]
    });
  
    render(<App />);
    fireEvent.click(screen.getByRole('link', { name: /view/i }));
  
    const rows = await screen.findAllByRole('row');
    expect(rows.length).toBe(3); // 2 records + header
  });
  
 });
