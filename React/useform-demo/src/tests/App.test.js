// src/tests/App.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// Utility to render App
const renderApp = () => render(<App />);

// Utility function to fill and submit the form
const fillAndSubmitVisitorForm = async (overrides = {}) => {
  const defaultData = {
    name: 'John Doe',
    contact: '9876543210',
    date: '2025-08-01',
    purpose: 'Business Meeting',
    ...overrides,
  };

  fireEvent.change(screen.getByLabelText(/Visitor Name/i), {
    target: { value: defaultData.name },
  });
  fireEvent.change(screen.getByLabelText(/Contact Number/i), {
    target: { value: defaultData.contact },
  });
  fireEvent.change(screen.getByLabelText(/Visit Date/i), {
    target: { value: defaultData.date },
  });
  fireEvent.change(screen.getByLabelText(/Purpose/i), {
    target: { value: defaultData.purpose },
  });

  fireEvent.click(screen.getByRole('button', { name: /Register Visitor/i }));

  await waitFor(() =>
    expect(screen.getByText(defaultData.name)).toBeInTheDocument()
  );
};

describe('Visitor Form Integration Tests', () => {
  test('1. Renders header and input fields', () => {
    renderApp();

    expect(screen.getByText(/Visitor Entry Form/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Visitor Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Visit Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Purpose/i)).toBeInTheDocument();
  });

  test('2. Shows validation errors when submitting empty form', async () => {
    renderApp();

    fireEvent.click(screen.getByRole('button', { name: /Register Visitor/i }));

    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Contact is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Visit date is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Purpose is required/i)).toBeInTheDocument();
    });
  });

  test('3. Submits form and clears fields', async () => {
    renderApp();

    await fillAndSubmitVisitorForm();

    expect(screen.getByLabelText(/Visitor Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Contact Number/i)).toHaveValue('');
    expect(screen.getByLabelText(/Visit Date/i)).toHaveValue('');
    expect(screen.getByLabelText(/Purpose/i)).toHaveValue('');
  });

  test('4. Allows editing a visitor entry and updates data', async () => {
    renderApp();

    await fillAndSubmitVisitorForm({ name: 'Alice', contact: '1234567890' });

    const editBtn = await screen.findByRole('button', { name: /Edit/i });
    fireEvent.click(editBtn);

    // Change name and resubmit
    fireEvent.change(screen.getByLabelText(/Visitor Name/i), {
      target: { value: 'Alice Updated' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Update Entry/i }));

    await waitFor(() => {
      expect(screen.getByText('Alice Updated')).toBeInTheDocument();
      expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    });
  });

  test('5. Allows deleting a visitor entry', async () => {
    renderApp();

    await fillAndSubmitVisitorForm({ name: 'Temp Visitor' });

    const deleteBtn = await screen.findByRole('button', { name: /Delete/i });
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(screen.queryByText(/Temp Visitor/i)).not.toBeInTheDocument();
    });
  });


  test('6. Submitting form with partial entry shows correct error', async () => {
    renderApp();

    fireEvent.change(screen.getByLabelText(/Visitor Name/i), {
      target: { value: 'Partial User' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Register Visitor/i }));

    await waitFor(() => {
      expect(screen.getByText(/Contact is required/i)).toBeInTheDocument();
    });

    expect(screen.queryByText(/Partial User/i)).not.toBeInTheDocument();
  });



  test('7. Edit mode button label changes to Update Entry', async () => {
  renderApp();

  await fillAndSubmitVisitorForm({ name: 'Edit Test', contact: '12345678', visitDate: '2025-07-22', purpose: 'Testing' });

  const editButton = await screen.findByRole('button', { name: /Edit/i });
  fireEvent.click(editButton);

  await waitFor(() => {
    const updateButton = screen.getByRole('button', { name: /Update Entry/i });
    expect(updateButton).toBeInTheDocument();
  });
});
});
