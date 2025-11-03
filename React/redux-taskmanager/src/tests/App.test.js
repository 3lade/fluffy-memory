import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import taskReducer, { addTask, updateTask, deleteTask } from '../slice/taskSlice';

import App from '../App';
import { store } from '../redux/store';

describe('TodoApp_Integration_Tests', () => {
  const renderTaskManager = () => {
    return render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
  };

  test('renders_the_Task_Manager_heading', () => {
    renderTaskManager();
    const heading = screen.getByText(/task manager/i);
    expect(heading).toBeInTheDocument();
  });

  test('adds_a_new_task_successfully', () => {
    renderTaskManager();

    const titleInput = screen.getByPlaceholderText(/enter title/i);
    const descInput = screen.getByPlaceholderText(/enter description/i);
    const addButton = screen.getByRole('button', { name: /add task/i });

    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(descInput, { target: { value: 'Test Description' } });
    fireEvent.click(addButton);

    expect(screen.getByText(/test task/i)).toBeInTheDocument();
    expect(screen.getByText(/test description/i)).toBeInTheDocument();
  });

  test('does_not_add_task_with_empty_inputs_and_shows_alert', () => {
    window.alert = jest.fn();
    renderTaskManager();

    const addButton = screen.getByRole('button', { name: /add task/i });
    fireEvent.click(addButton);

    expect(window.alert).toHaveBeenCalledWith('Please enter both title and description.');
  });

  test('edits_an_existing_task', () => {
    renderTaskManager();
  
    const titleInput = screen.getByPlaceholderText(/enter title/i);
    const descInput = screen.getByPlaceholderText(/enter description/i);
  
    // Add initial task
    fireEvent.change(titleInput, { target: { value: 'Edit Me' } });
    fireEvent.change(descInput, { target: { value: 'Old Desc' } });
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));
  
    // Find the task list item by title
    const taskItem = screen.getByText(/edit me/i).closest('li');
    expect(taskItem).toBeInTheDocument();
  
    // Click the Edit button within the correct task item
    const editButton = within(taskItem).getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
  
    // Change the title and description
    fireEvent.change(titleInput, { target: { value: 'Edited Task' } });
    fireEvent.change(descInput, { target: { value: 'Updated Desc' } });
    fireEvent.click(screen.getByRole('button', { name: /update task/i }));
  
    // Assert the new values are shown and old ones are gone
    expect(screen.getByText(/edited task/i)).toBeInTheDocument();
    expect(screen.getByText(/updated desc/i)).toBeInTheDocument();
    expect(screen.queryByText(/edit me/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/old desc/i)).not.toBeInTheDocument();
  });
  

  test('deletes_a_task', () => {
    renderTaskManager();
  
    const titleInput = screen.getByPlaceholderText(/enter title/i);
    const descInput = screen.getByPlaceholderText(/enter description/i);
  
    fireEvent.change(titleInput, { target: { value: 'Delete This' } });
    fireEvent.change(descInput, { target: { value: 'Delete Desc' } });
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));
  
    const taskItem = screen.getByText(/delete this/i).closest('li');
    const deleteButton = within(taskItem).getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
  
    expect(screen.queryByText(/delete this/i)).toBeNull();
  });
  

  // test('updates task count correctly', () => {
  //   renderTaskManager();
  
  //   const titleInput = screen.getByPlaceholderText(/enter title/i);
  //   const descInput = screen.getByPlaceholderText(/enter description/i);
  
  //   // Add first task
  //   fireEvent.change(titleInput, { target: { value: 'Count Task 1' } });
  //   fireEvent.change(descInput, { target: { value: 'Desc 1' } });
  //   fireEvent.click(screen.getByRole('button', { name: /add task/i }));
  
  //   // Add second task
  //   fireEvent.change(titleInput, { target: { value: 'Count Task 2' } });
  //   fireEvent.change(descInput, { target: { value: 'Desc 2' } });
  //   fireEvent.click(screen.getByRole('button', { name: /add task/i }));
  
  //   // Assert that total count updates
  //   const taskCount = screen.getByText(/total tasks:/i);
  //   expect(taskCount).toHaveTextContent('Total Tasks: 2');
  // });
  

  test('taskSlice_reducer_should_add_a_task', () => {
    const initialState = [];
    const action = addTask({ title: 'Test', description: 'Desc', status: 'Pending' });
    const newState = taskReducer(initialState, action);

    expect(newState).toHaveLength(1);
    expect(newState[0].title).toBe('Test');
  });

  test('taskSlice_reducer_should_update_a_task', () => {
    const initialState = [{ id: 1, title: 'Old', description: 'Old', status: 'Pending' }];
    const action = updateTask({ id: 1, title: 'New', description: 'New', status: 'Completed' });
    const newState = taskReducer(initialState, action);

    expect(newState[0].title).toBe('New');
    expect(newState[0].status).toBe('Completed');
  });

  test('taskSlice_reducer_should_delete_a_task', () => {
    const initialState = [
      { id: 1, title: 'Task 1', description: 'Desc', status: 'Pending' },
      { id: 2, title: 'Task 2', description: 'Desc', status: 'Pending' },
    ];
    const action = deleteTask(1);
    const newState = taskReducer(initialState, action);

    expect(newState).toHaveLength(1);
    expect(newState[0].id).toBe(2);
  });
  
});
