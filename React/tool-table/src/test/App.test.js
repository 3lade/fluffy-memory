import React from "react";
import { render, screen, fireEvent, waitFor, cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App";
import ToolForm from "../components/ToolForm";
import ToolList from "../components/ToolList";
 
jest.mock("../App.css", () => ({}));
 
afterEach(() => {
  cleanup();
  localStorage.clear();
  jest.clearAllMocks();
});
 
describe("Tool Lending Tracker - HTML Structure Tests", () => {
  test("verify_html_header_and_container_elements", () => {
    render(<App />);
    const headerElement = screen.getByText(/tool lending tracker/i);
    const containerElement = document.querySelector(".container");
    expect(headerElement).toBeInTheDocument();
    expect(containerElement).toBeInTheDocument();
  });
 
  test("verify_table_structure", () => {
    const mockTools = [
      { borrower: "Alice", toolName: "Hammer", dateLent: "2023-01-01", dueDate: "2023-01-15", notes: "" }
    ];
    render(<ToolList tools={mockTools} removeTool={jest.fn()} />);
    const table = screen.getByRole("table");
    const thead = table.querySelector("thead");
    const tbody = table.querySelector("tbody");
    expect(table).toBeInTheDocument();
    expect(thead).toBeInTheDocument();
    expect(tbody).toBeInTheDocument();
  });
 
  test("verify_html_form_input_elements", () => {
    render(<ToolForm addTool={jest.fn()} />);
    const borrowerInput = screen.getByPlaceholderText(/enter borrower's name/i);
    const toolNameInput = screen.getByPlaceholderText(/enter tool name/i);
    const dateLentInput = screen.getByLabelText(/date lent/i);
    const dueDateInput = screen.getByLabelText(/return due date/i);
    const notesTextarea = screen.getByPlaceholderText(/enter any additional notes \(optional\)/i);
    const submitButton = screen.getByRole("button", { name: /submit record/i });
    expect(borrowerInput).toBeInTheDocument();
    expect(toolNameInput).toBeInTheDocument();
    expect(dateLentInput).toBeInTheDocument();
    expect(dueDateInput).toBeInTheDocument();
    expect(notesTextarea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
 
  test("verify_html_table_header_content", () => {
    const mockTools = [
      { borrower: "Alice", toolName: "Hammer", dateLent: "2023-01-01", dueDate: "2023-01-15", notes: "" }
    ];
    render(<ToolList tools={mockTools} removeTool={jest.fn()} />);
    const expectedHeaders = ["Borrower", "Tool Name", "Date Lent", "Action"];
    expectedHeaders.forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });
});
 
describe("Tool Lending Tracker - CSS/Styling Tests", () => {
  test("verify_css_container_button_classes", () => {
    render(<App />);
    const container = document.querySelector(".container");
    const submitButton = screen.getByRole("button", { name: /submit record/i });
    expect(container).toHaveClass("container");
    expect(submitButton).toHaveAttribute("type", "submit");
  });
 
  test("verify_css_form_class", () => {
    render(<ToolForm addTool={jest.fn()} />);
    const form = document.querySelector(".form");
    expect(form).toBeInTheDocument();
  });
 
  test("verify_css_error_message_styling", async () => {
    render(<ToolForm addTool={jest.fn()} />);
    const submitButton = screen.getByRole("button", { name: /submit record/i });
    await act(async () => {
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      const errors = document.querySelectorAll(".error");
      expect(errors.length).toBeGreaterThan(0);
    });
  });
 
  test("verify_css_table_styling", () => {
    const mockTools = [
      { borrower: "Alice", toolName: "Hammer", dateLent: "2023-01-01", dueDate: "2023-01-15", notes: "" }
    ];
    render(<ToolList tools={mockTools} removeTool={jest.fn()} />);
    const table = document.querySelector(".tool-table");
    expect(table).toHaveClass("tool-table");
  });
 
  test("verify_css_remove_button_styling", () => {
    const mockTools = [
      { borrower: "Alice", toolName: "Hammer", dateLent: "2023-01-01", dueDate: "2023-01-15", notes: "" }
    ];
    render(<ToolList tools={mockTools} removeTool={jest.fn()} />);
    const removeButton = screen.getByRole("button", { name: /remove/i });
    expect(removeButton).toHaveClass("remove-btn");
  });
});
 
describe("Tool Lending Tracker - JavaScript Functionality Tests", () => {
  test("verify_js_form_submission_functionality", async () => {
    render(<App />);
    expect(screen.getByText(/no tools lent yet/i)).toBeInTheDocument();
    expect(screen.getByText(/total lent: 0/i)).toBeInTheDocument();
    const borrowerInput = screen.getByPlaceholderText(/enter borrower's name/i);
    const toolNameInput = screen.getByPlaceholderText(/enter tool name/i);
    const dateLentInput = screen.getByLabelText(/date lent/i);
    const dueDateInput = screen.getByLabelText(/return due date/i);
    const submitButton = screen.getByRole("button", { name: /submit record/i });
    await userEvent.type(borrowerInput, "Alice Smith");
    await userEvent.type(toolNameInput, "Cordless Drill");
    await userEvent.type(dateLentInput, "2023-01-01");
    await userEvent.type(dueDateInput, "2023-01-15");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText("Alice Smith")).toBeInTheDocument();
      expect(screen.getByText("Cordless Drill")).toBeInTheDocument();
      expect(screen.getByText("2023-01-01")).toBeInTheDocument();
      expect(screen.getByText(/total lent: 1/i)).toBeInTheDocument();
    });
  });
 
  test("verify_required_field_validation", async () => {
    render(<ToolForm addTool={jest.fn()} />);
    const submitButton = screen.getByRole("button", { name: /submit record/i });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/^Name is required$/i)).toBeInTheDocument();
      expect(screen.getByText(/^Tool name is required$/i)).toBeInTheDocument();
      expect(screen.getByText(/^Lend date is required$/i)).toBeInTheDocument();
      expect(screen.getByText(/^Due date is required$/i)).toBeInTheDocument();
    });
  });
 
  test("verify_remove_functionality", async () => {
    render(<App />);
    const borrowerInput = screen.getByPlaceholderText(/enter borrower's name/i);
    const toolNameInput = screen.getByPlaceholderText(/enter tool name/i);
    const dateLentInput = screen.getByLabelText(/date lent/i);
    const dueDateInput = screen.getByLabelText(/return due date/i);
    const submitButton = screen.getByRole("button", { name: /submit record/i });
    await userEvent.type(borrowerInput, "Test User");
    await userEvent.type(toolNameInput, "Test Tool");
    await userEvent.type(dateLentInput, "2023-01-01");
    await userEvent.type(dueDateInput, "2023-01-15");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText("Test User")).toBeInTheDocument();
      expect(screen.getByText("Test Tool")).toBeInTheDocument();
    });
    const removeButton = screen.getByRole("button", { name: /remove/i });
    fireEvent.click(removeButton);
    await waitFor(() => {
      expect(screen.queryByText("Test User")).not.toBeInTheDocument();
      expect(screen.queryByText("Test Tool")).not.toBeInTheDocument();
      expect(screen.getByText(/no tools lent yet/i)).toBeInTheDocument();
    });
  });
 
  test("verify_total_count_updates", async () => {
    render(<App />);
    const borrowerInput = screen.getByPlaceholderText(/enter borrower's name/i);
    const toolNameInput = screen.getByPlaceholderText(/enter tool name/i);
    const dateLentInput = screen.getByLabelText(/date lent/i);
    const dueDateInput = screen.getByLabelText(/return due date/i);
    const submitButton = screen.getByRole("button", { name: /submit record/i });
    expect(screen.getByText(/total lent: 0/i)).toBeInTheDocument();
    await userEvent.type(borrowerInput, "User 1");
    await userEvent.type(toolNameInput, "Tool 1");
    await userEvent.type(dateLentInput, "2023-01-01");
    await userEvent.type(dueDateInput, "2023-01-15");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/total lent: 1/i)).toBeInTheDocument();
    });
    await userEvent.clear(borrowerInput);
    await userEvent.clear(toolNameInput);
    await userEvent.clear(dateLentInput);
    await userEvent.clear(dueDateInput);
    await userEvent.type(borrowerInput, "User 2");
    await userEvent.type(toolNameInput, "Tool 2");
    await userEvent.type(dateLentInput, "2023-02-01");
    await userEvent.type(dueDateInput, "2023-02-15");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/total lent: 2/i)).toBeInTheDocument();
    });
  });
 
  test("verify_form_reset", async () => {
    render(<ToolForm addTool={jest.fn()}  />);
    const borrowerInput = screen.getByPlaceholderText(/enter borrower's name/i);
    const toolNameInput = screen.getByPlaceholderText(/enter tool name/i);
    const dateLentInput = screen.getByLabelText(/date lent/i);
    const dueDateInput = screen.getByLabelText(/return due date/i);
    const notesTextarea = screen.getByPlaceholderText(/enter any additional notes \(optional\)/i);
    const submitButton = screen.getByRole("button", { name: /submit record/i });
    await userEvent.type(borrowerInput, "Test User");
    await userEvent.type(toolNameInput, "Test Tool");
    await userEvent.type(dateLentInput, "2023-01-01");
    await userEvent.type(dueDateInput, "2023-01-15");
    await userEvent.type(notesTextarea, "Test notes");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(borrowerInput.value).toBe("");
      expect(toolNameInput.value).toBe("");
      expect(dateLentInput.value).toBe("");
      expect(dueDateInput.value).toBe("");
      expect(notesTextarea.value).toBe("");
    });
  });
 
  test("verify_error_message_clearing", async () => {
    render(<ToolForm addTool={jest.fn()} />);
    const borrowerInput = screen.getByPlaceholderText(/enter borrower's name/i);
    const submitButton = screen.getByRole("button", { name: /submit record/i });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/^Name is required$/i)).toBeInTheDocument();
    });
    await userEvent.type(borrowerInput, "A");
    await waitFor(() => {
      expect(screen.queryByText(/^Name is required$/i)).not.toBeInTheDocument();
    });
  });
});
 
describe("Tool Lending Tracker - Negative Tests", () => {
  test("verify_empty_form_error_handling", async () => {
    const mockAddTool = jest.fn();
    render(<ToolForm addTool={mockAddTool} />);
    const submitButton = screen.getByRole("button", { name: /submit record/i });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/^Name is required$/i)).toBeInTheDocument();
      expect(screen.getByText(/^Tool name is required$/i)).toBeInTheDocument();
      expect(screen.getByText(/^Lend date is required$/i)).toBeInTheDocument();
      expect(screen.getByText(/^Due date is required$/i)).toBeInTheDocument();
      expect(screen.getByText(/^Please fill all the required details$/i)).toBeInTheDocument();
      expect(mockAddTool).not.toHaveBeenCalled();
    });
  });
 
  test("verify_partial_form_validation", async () => {
    const mockAddTool = jest.fn();
    render(<ToolForm addTool={mockAddTool} />);
    const borrowerInput = screen.getByPlaceholderText(/enter borrower's name/i);
    const submitButton = screen.getByRole("button", { name: /submit record/i });
    await userEvent.type(borrowerInput, "Test User");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.queryByText(/^Name is required$/i)).not.toBeInTheDocument();
      expect(screen.getByText(/^Tool name is required$/i)).toBeInTheDocument();
      expect(screen.getByText(/^Lend date is required$/i)).toBeInTheDocument();
      expect(screen.getByText(/^Due date is required$/i)).toBeInTheDocument();
      expect(mockAddTool).not.toHaveBeenCalled();
    });
  });
 
  test("verify_empty_list_display", () => {
    render(<ToolList tools={[]} removeTool={jest.fn()} />);
    expect(screen.getByText(/no tools lent yet/i)).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });
});