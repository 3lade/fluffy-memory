import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import shoppingReducer from '../redux/shoppingSlice';
import App from '../App';

// Utility: fresh store per test so state never leaks between tests
const renderApp = () => {
  const testStore = configureStore({ reducer: { shopping: shoppingReducer } });
  return render(
    <Provider store={testStore}>
      <App />
    </Provider>
  );
};

const uniqueItem = (prefix = 'Item') =>
  `${prefix} ${Math.random().toString(36).slice(2, 8)}`;

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(msg => {
    if (msg.includes('ReactDOMTestUtils.act')) return;
    console.error(msg);
  });
});
afterAll(() => {
  console.error.mockRestore();
});

describe('ShoppingList_Integration_Tests', () => {
  test('renders_the_app_heading', async () => {
    renderApp();
    expect(await screen.findByText(/My Shopping List/i)).toBeInTheDocument();
  });

  test('shows_empty_state_message', () => {
    renderApp();
    expect(screen.getByText(/No items in your list/i)).toBeInTheDocument();
  });

  test('adds_an_item_via_button_click', async () => {
    renderApp();
    const item = uniqueItem();
    fireEvent.change(screen.getByPlaceholderText(/Enter item/i), {
      target: { value: item },
    });
    fireEvent.click(screen.getByText(/Add/i));
    expect(await screen.findByText(item)).toBeInTheDocument();
  });

  test('adds_item_via_enter_key', async () => {
    renderApp();
    const item = uniqueItem('EnterKey');
    const input = screen.getByPlaceholderText(/Enter item/i);
    fireEvent.change(input, { target: { value: item } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(await screen.findByText(item)).toBeInTheDocument();
  });

  test('prevents_blank_item', () => {
    renderApp();
    const input = screen.getByPlaceholderText(/Enter item/i);
    const initialCount = screen.queryAllByRole('checkbox').length;
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(screen.getByText(/Add/i));
    const currentCount = screen.queryAllByRole('checkbox').length;
    expect(currentCount).toBe(initialCount);
  });



  test('delete_removes_specific_item', async () => {
    renderApp();
    const itemA = uniqueItem('First');
    const itemB = uniqueItem('Second');
    fireEvent.change(screen.getByPlaceholderText(/Enter item/i), { target: { value: itemA } });
    fireEvent.click(screen.getByText(/Add/i));
    fireEvent.change(screen.getByPlaceholderText(/Enter item/i), { target: { value: itemB } });
    fireEvent.click(screen.getByText(/Add/i));
    const row = await screen.findByText(itemA);
    const deleteButton = within(row.closest('div')).getByRole('button', { name: /Delete/i });
    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(screen.queryByText(itemA)).not.toBeInTheDocument();
    });
    expect(screen.getByText(itemB)).toBeInTheDocument();
  });

  test('input_clears_after_adding_item', async () => {
    renderApp();
    const item = uniqueItem('ClearInput');
    const input = screen.getByPlaceholderText(/Enter item/i);
    fireEvent.change(input, { target: { value: item } });
    fireEvent.click(screen.getByText(/Add/i));
    await screen.findByText(item);
    expect(input.value).toBe('');
  });

  test('edit_item_works_and_saves', async () => {
    renderApp();
    const item = uniqueItem('EditMe');
    fireEvent.change(screen.getByPlaceholderText(/Enter item/i), { target: { value: item } });
    fireEvent.click(screen.getByText(/Add/i));
    const itemElement = await screen.findByText(item);
    const row = itemElement.closest('div');
    const editButton = within(row).getByRole('button', { name: /Edit/i });
    fireEvent.click(editButton);
    const editInput = within(row).getByDisplayValue(item);
    const newValue = uniqueItem('Edited');
    fireEvent.change(editInput, { target: { value: newValue } });
    const saveButton = within(row).getByRole('button', { name: /Save/i });
    fireEvent.click(saveButton);
    await screen.findByText(newValue);
    expect(screen.queryByText(item)).not.toBeInTheDocument();
  });

  test('add-delete-cycle_restores_empty_state', async () => {
    renderApp();
    const item = uniqueItem('Cycle');
    fireEvent.change(screen.getByPlaceholderText(/Enter item/i), {
      target: { value: item },
    });
    fireEvent.click(screen.getByText(/Add/i));
    const row = await screen.findByText(item);
    const deleteBtn = within(row.closest('div')).getByRole('button', { name: /Delete/i });
    fireEvent.click(deleteBtn);
    await waitFor(() => {
      expect(screen.queryByText(item)).not.toBeInTheDocument();
    });
    expect(screen.getByText(/No items in your list/i)).toBeInTheDocument();
  });
});
