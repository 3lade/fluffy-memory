import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CourseForm from '../components/CourseForm';
import CourseList from '../components/CourseList';

describe('CourseForm', () => {
  test('validates_required_fields_is_working', () => {
    const mockAddCourse = jest.fn();
    render(<CourseForm addCourse={mockAddCourse} />);

    // Click submit without filling fields
    fireEvent.click(screen.getByText(/add course/i));

    // Check that error messages are displayed
    expect(screen.getByText(/course title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/course description is required/i)).toBeInTheDocument();
    
    // Check that addCourse was not called
    expect(mockAddCourse).not.toHaveBeenCalled();
  });
  
  test('renders_error_messages_is_present', () => {
    const mockAddCourse = jest.fn();
    render(<CourseForm addCourse={mockAddCourse} />);

    // Click submit without filling fields
    fireEvent.click(screen.getByText(/add course/i));

    // Check that error messages are displayed
    expect(screen.getByText(/course title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/course description is required/i)).toBeInTheDocument();
  });

  test('submits_form_with_valid_data', () => {
    const mockAddCourse = jest.fn();
    render(<CourseForm addCourse={mockAddCourse} />);

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/course title/i), {
      target: { value: 'React Basics' }
    });
    fireEvent.change(screen.getByLabelText(/course description/i), {
      target: { value: 'Learn React fundamentals' }
    });

    // Submit the form
    fireEvent.click(screen.getByText(/add course/i));

    // Check that addCourse was called with correct arguments
    expect(mockAddCourse).toHaveBeenCalledWith('React Basics', 'Learn React fundamentals');
  });

  test('clears_form_after_successful_submission', () => {
    const mockAddCourse = jest.fn();
    render(<CourseForm addCourse={mockAddCourse} />);

    const titleInput = screen.getByLabelText(/course title/i);
    const descriptionInput = screen.getByLabelText(/course description/i);

    // Fill in the form fields
    fireEvent.change(titleInput, { target: { value: 'React Basics' } });
    fireEvent.change(descriptionInput, { target: { value: 'Learn React fundamentals' } });

    // Submit the form
    fireEvent.click(screen.getByText(/add course/i));

    // Check that form fields are cleared
    expect(titleInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
  });
});

describe('CourseList', () => {
  test('displays_active_courses', () => {
    const mockToggleCourseStatus = jest.fn();
    const courses = [
      { id: 1, title: 'React Basics', description: 'Learn React', status: 'active' },
      { id: 2, title: 'JavaScript Advanced', description: 'Advanced JS concepts', status: 'active' }
    ];

    render(<CourseList courses={courses} toggleCourseStatus={mockToggleCourseStatus} />);

    expect(screen.getByText('React Basics')).toBeInTheDocument();
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('JavaScript Advanced')).toBeInTheDocument();
    expect(screen.getByText('Advanced JS concepts')).toBeInTheDocument();
  });

  test('displays_completed_courses', () => {
    const mockToggleCourseStatus = jest.fn();
    const courses = [
      { id: 1, title: 'HTML Basics', description: 'Learn HTML', status: 'completed' },
      { id: 2, title: 'CSS Fundamentals', description: 'Learn CSS', status: 'completed' }
    ];

    render(<CourseList courses={courses} toggleCourseStatus={mockToggleCourseStatus} />);

    expect(screen.getByText('HTML Basics')).toBeInTheDocument();
    expect(screen.getByText('Learn HTML')).toBeInTheDocument();
    expect(screen.getByText('CSS Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('Learn CSS')).toBeInTheDocument();
  });

  test('toggles_course_status_from_active_to_completed', () => {
    const mockToggleCourseStatus = jest.fn();
    const courses = [
      { id: 1, title: 'React Basics', description: 'Learn React', status: 'active' }
    ];

    render(<CourseList courses={courses} toggleCourseStatus={mockToggleCourseStatus} />);

    fireEvent.click(screen.getByText(/mark as completed/i));

    expect(mockToggleCourseStatus).toHaveBeenCalledWith(1);
  });

  test('toggles_course_status_from_completed_to_active', () => {
    const mockToggleCourseStatus = jest.fn();
    const courses = [
      { id: 1, title: 'React Basics', description: 'Learn React', status: 'completed' }
    ];

    render(<CourseList courses={courses} toggleCourseStatus={mockToggleCourseStatus} />);

    fireEvent.click(screen.getByText(/mark as active/i));

    expect(mockToggleCourseStatus).toHaveBeenCalledWith(1);
  });

  test('does_not_display_courses_when_list_is_empty_is_present', () => {
    const mockToggleCourseStatus = jest.fn();
    render(<CourseList courses={[]} toggleCourseStatus={mockToggleCourseStatus} />);

    expect(screen.getByText(/no active courses/i)).toBeInTheDocument();
    expect(screen.getByText(/no completed courses yet/i)).toBeInTheDocument();
    expect(screen.queryByText(/react/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/learn react/i)).not.toBeInTheDocument();
  });

  test('separates_active_and_completed_courses', () => {
    const mockToggleCourseStatus = jest.fn();
    const courses = [
      { id: 1, title: 'Active Course', description: 'Active description', status: 'active' },
      { id: 2, title: 'Completed Course', description: 'Completed description', status: 'completed' }
    ];

    render(<CourseList courses={courses} toggleCourseStatus={mockToggleCourseStatus} />);

    // Check that active course appears in active section
    const activeSection = screen.getByText(/active courses/i).closest('div');
    expect(activeSection).toHaveTextContent('Active Course');
    expect(activeSection).toHaveTextContent('Active description');

    // Check that completed course appears in completed section
    const completedSection = screen.getByText(/completed courses/i).closest('div');
    expect(completedSection).toHaveTextContent('Completed Course');
    expect(completedSection).toHaveTextContent('Completed description');
  });
});