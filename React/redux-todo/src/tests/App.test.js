import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import store from '../components/store';
import todoReducer, { addTodo, deleteTodo, toggleTodo } from '../components/todoSlice';

import App from '../App';

describe('TodoApp Integration Tests', () => {
  const renderTodoApp = () => {
    return render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
  };

  test('todo_app_renders_with_heading', () => {
    renderTodoApp();
    const heading = screen.getByText(/todo list/i);
    expect(heading).toBeInTheDocument();
  });

  test('todo_app_adds_new_todo', () => {
    renderTodoApp();

    const input = screen.getByPlaceholderText(/enter todo/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);

    const newTodo = screen.getByText('Test Todo');
    expect(newTodo).toBeInTheDocument();
  });

  test('todo_app_toggles_todo_completion', () => {
    renderTodoApp();

    const input = screen.getByPlaceholderText(/enter todo/i);
    fireEvent.change(input, { target: { value: 'Toggle Task' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    const checkbox = screen.getAllByRole('checkbox')[0];
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  test('todo_app_deletes_todo', () => {
    renderTodoApp();

    const input = screen.getByPlaceholderText(/enter todo/i);
    fireEvent.change(input, { target: { value: 'Delete Me' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
  
    // Find all todo texts
    const todoTexts = screen.getAllByText(/delete me/i);
    expect(todoTexts.length).toBeGreaterThan(0); 
  
    // Get all delete buttons
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
  
    // Assumption: "Delete Me" is the last added, so use the last Delete button
    fireEvent.click(deleteButtons[deleteButtons.length - 1]);
  
    // Verify it's removed
    expect(screen.queryByText('Delete Me')).toBeNull();
  });
  

  test('todo_app_disables_add_button_for_empty_input', () => {
    renderTodoApp();
    const addButton = screen.getByRole('button', { name: /add/i });
    expect(addButton).toBeDisabled();
  });

  test('todo_slice_adds_todo', () => {
    const initialState = [];
    const action = addTodo('Test Reducer Todo');
    const newState = todoReducer(initialState, action);

    expect(newState.length).toBe(1);
    expect(newState[0].text).toBe('Test Reducer Todo');
    expect(newState[0].completed).toBe(false);
  });

  test('todo_slice_deletes_todo', () => {
    const initialState = [
      { id: 1, text: 'First Todo', completed: false },
      { id: 2, text: 'Second Todo', completed: true },
    ];

    const action = deleteTodo(1);
    const newState = todoReducer(initialState, action);

    expect(newState.length).toBe(1);
    expect(newState[0].id).toBe(2);
  });

  
});
