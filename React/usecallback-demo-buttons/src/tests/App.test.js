import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FlashcardApp from '../components/FlashcardApp';

describe('FlashcardApp Component Tests', () => {

  test('renders_heading_correctly', () => {
    render(<FlashcardApp />);
    expect(screen.getByText('Book Flashcard App')).toBeInTheDocument();
  });

  test('displays_first_card_initially', () => {
    render(<FlashcardApp />);
    expect(screen.getByText('Card 1 of 5')).toBeInTheDocument();
    expect(screen.getByText('To Kill a Mockingbird')).toBeInTheDocument();
    expect(screen.getByText('A novel about the serious issues of rape and racial inequality.')).toBeInTheDocument();
    expect(screen.getByText(/Harper Lee/)).toBeInTheDocument();
  });

  test('navigates_to_next_card_on_next_button_click', () => {
    render(<FlashcardApp />);
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Card 2 of 5')).toBeInTheDocument();
    expect(screen.getByText('1984')).toBeInTheDocument();
    expect(screen.getByText(/George Orwell/)).toBeInTheDocument();
  });

  test('navigates_to_previous_card_on_prev_button_click', () => {
    render(<FlashcardApp />);
    fireEvent.click(screen.getByText('Next')); // go to card 2
    fireEvent.click(screen.getByText('Prev')); // back to card 1
    expect(screen.getByText('Card 1 of 5')).toBeInTheDocument();
    expect(screen.getByText('To Kill a Mockingbird')).toBeInTheDocument();
  });

  test('loops_back_to_last_card_when_prev_clicked_on_first', () => {
    render(<FlashcardApp />);
    fireEvent.click(screen.getByText('Prev')); // from card 1 to last card
    expect(screen.getByText('Card 5 of 5')).toBeInTheDocument();
    expect(screen.getByText('The Hobbit')).toBeInTheDocument();
    expect(screen.getByText(/J.R.R. Tolkien/)).toBeInTheDocument();
  });

  test('loops_back_to_first_card_when_next_clicked_on_last', () => {
    render(<FlashcardApp />);
    // Move to last card
    for (let i = 0; i < 4; i++) {
      fireEvent.click(screen.getByText('Next'));
    }
    expect(screen.getByText('Card 5 of 5')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next')); // should loop to first
    expect(screen.getByText('Card 1 of 5')).toBeInTheDocument();
    expect(screen.getByText('To Kill a Mockingbird')).toBeInTheDocument();
  });

});
