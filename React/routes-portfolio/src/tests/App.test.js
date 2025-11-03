import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../components/NavBar';
import App from '../App'; 
import Contact from '../components/Contact';
import Home from '../components/Home';


const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('App Component', () => {


    test('checks_if_the_App_renders_correctly', () => {
      render(<App />);
      const titleElement = screen.getAllByText(/Portfolio/i); 
      expect(titleElement.length).toBeGreaterThan(0);
    });

  test('renders_the_title_Portfolio_in_navbar', () => {
    renderWithRouter(<NavBar />);
    const titleElement = screen.getByText(/Portfolio/i); // Regex to match the title case-insensitively
    expect(titleElement).toBeInTheDocument(); // Assertion that the title is in the document
  });

  test('renders_all_navigation_links_with_correct_paths', () => {
    renderWithRouter(<NavBar />);

    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();

    const projectsLink = screen.getByText(/Projects/i);
    expect(projectsLink).toBeInTheDocument();
    expect(projectsLink.closest('a')).toHaveAttribute('href', '/projects'); 

    const contactLink = screen.getByText(/Contact/i);
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.closest('a')).toHaveAttribute('href', '/contact'); 
  });

  test('ensures_the_correct_routes_are_rendered_on_clicking_nav_projects', () => {
    render(<App />);
    expect(screen.getByText(/Welcome to My Portfolio/i)).toBeInTheDocument();
    const projectsLink = screen.getByText(/Projects/i);
    userEvent.click(projectsLink);
    expect(screen.getByText(/My Projects/i)).toBeInTheDocument();
  });

  
  test('ensures_the_correct_routes_are_rendered_on_clicking_nav_contact', () => {
    render(<App />);
    const homeLink = screen.getByText(/Home/i);
    userEvent.click(homeLink);
    expect(screen.getByText(/Welcome to My Portfolio/i)).toBeInTheDocument();
    const projectsLink = screen.getByText(/Contact/i);
    userEvent.click(projectsLink);
    expect(screen.getByText(/Contact Me/i)).toBeInTheDocument();
  });

   
  test('ensures_the_correct_routes_are_rendered_on_clicking_for_each_path', () => {
    render(<App />);
    const homeLink = screen.getByText(/Home/i);
    userEvent.click(homeLink);
    expect(screen.getByText(/Welcome to My Portfolio/i)).toBeInTheDocument();
    const projectsLink = screen.getByText(/Projects/i);
    userEvent.click(projectsLink);
    expect(screen.getByText(/My Projects/i)).toBeInTheDocument();
    const contactLink = screen.getByText(/Contact/i);
    userEvent.click(contactLink);
    expect(screen.getByText(/Contact Me/i)).toBeInTheDocument();
  });
});

describe('Contact Component', () => {

  test('contact_renders_the_Contact_Me_heading', () => {
    render(<Contact />);
    const headingElement = screen.getByText(/Contact Me/i);
    expect(headingElement).toBeInTheDocument(); // Verify heading is in the DOM
  });

  test('contact_renders_all_input_fields', () => {
    render(<Contact />);

    // Check if name input exists
    const nameInput = screen.getByPlaceholderText(/Name.../i);
    expect(nameInput).toBeInTheDocument();

    // Check if email input exists
    const emailInput = screen.getByPlaceholderText(/Email.../i);
    expect(emailInput).toBeInTheDocument();

    // Check if message textarea exists
    const messageTextarea = screen.getByPlaceholderText(/Message.../i);
    expect(messageTextarea).toBeInTheDocument();
  });
  test('contact_displays_modal_after_form_submission', () => {
    render(<Contact />);

    // Fill out the form inputs
    const nameInput = screen.getByPlaceholderText(/Name.../i);
    const emailInput = screen.getByPlaceholderText(/Email.../i);
    const messageTextarea = screen.getByPlaceholderText(/Message.../i);
   

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageTextarea, { target: { value: 'This is a message.' } });
    // Submit the form
    const submitButton = screen.getByText(/Send/i);
    fireEvent.click(submitButton);

    // Check if the modal is displayed
    const modalMessage = screen.getByText(/Successfully Sent!!!/i);
    expect(modalMessage).toBeInTheDocument();

    // Close modal
    const closeModalButton = screen.getByText(/Close/i);
    fireEvent.click(closeModalButton);

    // Ensure modal is closed
    expect(modalMessage).not.toBeInTheDocument();
  });

});

describe('Home Component', () => {

  test('home_renders_the_techstack_word', () => {
    render(<Home />);
    const contentelement = screen.getByText(/My Tech Stack/i);
    expect(contentelement).toBeInTheDocument(); 
  });
  
});