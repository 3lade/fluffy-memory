// === src/tests/App.test.js ===
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import App from '../App';

const renderApp = () =>
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

const generateTestData = () => ({
  name: 'Test User',
  email: 'test@example.com',
  interest: 'Coding',
});

describe('ClubMembershipManager_Integration_Tests', () => {
  test('renders_club_membership_manager_heading', async () => {
    renderApp();
    expect(await screen.findByText(/Club Membership Manager/i)).toBeInTheDocument();
  });

  test('does_not_add_member_if_name_or_email_missing_alert', async () => {
    renderApp();
    const joinButton = await screen.findByLabelText('Join Photography Club');
    fireEvent.click(joinButton);

    window.alert = jest.fn();

    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith('Full Name and Email are required');
  });

  test('adds_and_displays_new_member', async () => {
    renderApp();
    const data = generateTestData();

    const joinButton = await screen.findByLabelText('Join Photography Club');
    fireEvent.click(joinButton);

    fireEvent.change(screen.getByPlaceholderText(/full name/i), { target: { value: data.name } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: data.email } });
    fireEvent.change(screen.getByPlaceholderText(/interest/i), { target: { value: data.interest } });

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(screen.getByText(data.name)).toBeInTheDocument();
    });
  });

  test('form_resets_after_submission', async () => {
    renderApp();
    const data = generateTestData();

    const joinButton = await screen.findByLabelText('Join Photography Club');
    fireEvent.click(joinButton);

    fireEvent.change(screen.getByPlaceholderText(/full name/i), { target: { value: data.name } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: data.email } });
    fireEvent.change(screen.getByPlaceholderText(/interest/i), { target: { value: data.interest } });

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(screen.queryByPlaceholderText(/full name/i)).not.toBeInTheDocument();
    });
  });

  test('delete_button_removes_member', async () => {
    renderApp();
    const data = generateTestData();

    const joinButton = await screen.findByLabelText('Join Photography Club');
    fireEvent.click(joinButton);

    fireEvent.change(screen.getByPlaceholderText(/full name/i), { target: { value: data.name } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: data.email } });
    fireEvent.change(screen.getByPlaceholderText(/interest/i), { target: { value: data.interest } });

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(screen.getByText(data.name)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/delete/i));

    await waitFor(() => {
      expect(screen.queryByText(data.name)).not.toBeInTheDocument();
    });
  });

  test('edit_button_prefills_form_and_updates_member', async () => {
    renderApp();
    const data = generateTestData();
    const updatedName = data.name + '_Updated';

    const joinButton = await screen.findByLabelText('Join Photography Club');
    fireEvent.click(joinButton);

    fireEvent.change(screen.getByPlaceholderText(/full name/i), { target: { value: data.name } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: data.email } });
    fireEvent.change(screen.getByPlaceholderText(/interest/i), { target: { value: data.interest } });
    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(screen.getByText(data.name)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/edit/i));
    fireEvent.change(screen.getByPlaceholderText(/full name/i), { target: { value: updatedName } });
    fireEvent.click(screen.getByText(/update/i));

    await waitFor(() => {
      expect(screen.getByText(updatedName)).toBeInTheDocument();
    });
  });

  test('cancel_button_closes_form', async () => {
    renderApp();
    const joinButton = await screen.findByLabelText('Join Photography Club');
    fireEvent.click(joinButton);

    fireEvent.click(screen.getByText(/cancel/i));

    await waitFor(() => {
      expect(screen.queryByText(/New Registration/i)).not.toBeInTheDocument();
    });
  });  
});