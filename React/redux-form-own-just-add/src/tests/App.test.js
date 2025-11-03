import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import  store  from '../redux/store';

describe('DailyWellnessTracker_Integration_Tests', () => {
  const renderApp = () => {
    return render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  };

  test('renders_daily_wellness_tracker_heading', () => {
    renderApp();
    const heading = screen.getByText(/daily wellness tracker/i);
    expect(heading).toBeInTheDocument();
  });



  test('does_not_add_entry_if_required_fields_missing', () => {
    window.alert = jest.fn();
    renderApp();

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith('Please fill Name, Mood, and Screen Time.');
  });

  test('clears_all_entries_successfully', () => {
    renderApp();

    const nameInput = screen.getByPlaceholderText(/enter name/i);
    const moodRadio = screen.getByLabelText(/happy/i);
    const screenTimeInput = screen.getByLabelText(/screen time/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(nameInput, { target: { value: 'Bob' } });
    fireEvent.click(moodRadio);
    fireEvent.change(screenTimeInput, { target: { value: '3' } });
    fireEvent.click(submitButton);

    const clearButton = screen.getByRole('button', { name: /clear all/i });
    fireEvent.click(clearButton);

    expect(screen.getByText(/no wellness data submitted/i)).toBeInTheDocument();
  });

  test('can_add_multiple_entries', () => {
    renderApp();

    const nameInput = screen.getByPlaceholderText(/enter name/i);
    const moodRadio = screen.getByLabelText(/happy/i);
    const screenTimeInput = screen.getByLabelText(/screen time/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(nameInput, { target: { value: 'User1' } });
    fireEvent.click(moodRadio);
    fireEvent.change(screenTimeInput, { target: { value: '3' } });
    fireEvent.click(submitButton);

    fireEvent.change(nameInput, { target: { value: 'User2' } });
    fireEvent.click(moodRadio);
    fireEvent.change(screenTimeInput, { target: { value: '4' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/user1/i)).toBeInTheDocument();
    expect(screen.getByText(/user2/i)).toBeInTheDocument();
  });

  test('sleep_hours_slider_works_correctly', () => {
    renderApp();
    const slider = screen.getByLabelText(/sleep hours/i);
    fireEvent.change(slider, { target: { value: 8 } });
    expect(slider.value).toBe("8");
  });

  test('hydration_checkboxes_can_be_selected_and_displayed', () => {
    renderApp();
    const nameInput = screen.getByPlaceholderText(/enter name/i);
    const screenTimeInput = screen.getByLabelText(/screen time/i);
    const moodRadio = screen.getByLabelText(/neutral/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(nameInput, { target: { value: 'Sam' } });
    fireEvent.change(screenTimeInput, { target: { value: '2' } });
    fireEvent.click(moodRadio);
    fireEvent.click(screen.getByLabelText(/water/i));
    fireEvent.click(screen.getByLabelText(/juice/i));
    fireEvent.click(submitButton);

    expect(screen.getByText(/water, juice/i)).toBeInTheDocument();
  });

  

  test('form_resets_after_submission', () => {
    renderApp();
    const nameInput = screen.getByPlaceholderText(/enter name/i);
    const moodRadio = screen.getByLabelText(/happy/i);
    const screenTimeInput = screen.getByLabelText(/screen time/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(nameInput, { target: { value: 'ResetUser' } });
    fireEvent.click(moodRadio);
    fireEvent.change(screenTimeInput, { target: { value: '3' } });
    fireEvent.click(submitButton);

    expect(nameInput.value).toBe('');
    expect(screenTimeInput.value).toBe('');
  });

  test('submit_button_is_enabled_after_clear', () => {
    renderApp();

    const nameInput = screen.getByPlaceholderText(/enter name/i);
    const screenTimeInput = screen.getByLabelText(/screen time/i);
    const moodRadio = screen.getByLabelText(/neutral/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(nameInput, { target: { value: 'Tom' } });
    fireEvent.change(screenTimeInput, { target: { value: '1' } });
    fireEvent.click(moodRadio);
    fireEvent.click(submitButton);

    const clearButton = screen.getByRole('button', { name: /clear all/i });
    fireEvent.click(clearButton);

    expect(submitButton).not.toBeDisabled();
  });
});
