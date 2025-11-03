import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import App from "./App";


// Create the mock store
const mockStore = configureMockStore();

// Test 1: Renders app component with crop management heading
test("renders_app_component_with_crop_management_heading", () => {
  const store = mockStore({ crops: [] });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByText("Crop Management")).toBeInTheDocument();
});

// Test 2: Renders app component with input field crop name
test("renders_app_component_with_input_field_crop_name", () => {
  const store = mockStore({ crops: [] });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByPlaceholderText("Crop Name")).toBeInTheDocument();
});

// Test 3: Renders app component with input field crop type
test("renders_app_component_with_input_field_crop_type", () => {
  const store = mockStore({ crops: [] });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByPlaceholderText("Crop Type")).toBeInTheDocument();
});

// Test 4: Renders app component with input field quantity
test("renders_app_component_with_input_field_quantity", () => {
  const store = mockStore({ crops: [] });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByPlaceholderText("Quantity")).toBeInTheDocument();
});

// Test 5: Displays validation errors when fields are empty
test("displays_validation_errors_when_fields_are_empty", async () => {
  const store = mockStore({ crops: [] });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Ensure validation messages are not present initially
  expect(screen.queryByText("Crop Name is required")).not.toBeInTheDocument();
  expect(screen.queryByText("Crop Type is required")).not.toBeInTheDocument();
  expect(screen.queryByText("Quantity is required")).not.toBeInTheDocument();

  fireEvent.click(screen.getByText("Add Crop"));

  // Ensure validation messages appear after form submission
  expect(await screen.findByText("Crop Name is required")).toBeInTheDocument();
  expect(await screen.findByText("Crop Type is required")).toBeInTheDocument();
  expect(await screen.findByText("Quantity is required")).toBeInTheDocument();
});

// Test 6: Renders add crop button
test("renders_add_crop_button", () => {
  const store = mockStore({ crops: [] });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByText("Add Crop")).toBeInTheDocument();
});

// Test 7: Dispatches addCrop action when form is submitted with valid data
test("dispatches_addCrop_action_when_form_submitted_with_valid_data", async () => {
  const store = mockStore({ crops: [] });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Fill in the form
  fireEvent.change(screen.getByPlaceholderText("Crop Name"), {
    target: { value: "Wheat" }
  });
  fireEvent.change(screen.getByPlaceholderText("Crop Type"), {
    target: { value: "Cereal" }
  });
  fireEvent.change(screen.getByPlaceholderText("Quantity"), {
    target: { value: "100" }
  });

  fireEvent.click(screen.getByText("Add Crop"));

  await waitFor(() => {
    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toBe("crops/addCrop");
    expect(actions[0].payload.name).toBe("Wheat");
    expect(actions[0].payload.type).toBe("Cereal");
    expect(actions[0].payload.quantity).toBe(100);
    expect(actions[0].payload.id).toBeDefined();
  });
});

// Test 8: Displays "No crops added yet" message when crops list is empty
test("displays_no_crops_message_when_list_is_empty", () => {
  const store = mockStore({ crops: [] });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByText("No crops added yet.")).toBeInTheDocument();
});

// Test 9: Displays crops in the list when crops exist
test("displays_crops_in_list_when_crops_exist", () => {
  const store = mockStore({
    crops: [
      { id: "1", name: "Rice", type: "Cereal", quantity: 50 },
      { id: "2", name: "Tomato", type: "Vegetable", quantity: 25 }
    ]
  });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByText("Rice - Cereal - 50")).toBeInTheDocument();
  expect(screen.getByText("Tomato - Vegetable - 25")).toBeInTheDocument();
});

// Test 10: Renders edit buttons for each crop in the list
test("renders_edit_buttons_for_each_crop", () => {
  const store = mockStore({
    crops: [
      { id: "1", name: "Rice", type: "Cereal", quantity: 50 },
      { id: "2", name: "Tomato", type: "Vegetable", quantity: 25 }
    ]
  });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const editButtons = screen.getAllByText("Edit");
  expect(editButtons).toHaveLength(2);
});

// Test 11: Renders delete buttons for each crop in the list
test("renders_delete_buttons_for_each_crop", () => {
  const store = mockStore({
    crops: [
      { id: "1", name: "Rice", type: "Cereal", quantity: 50 },
      { id: "2", name: "Tomato", type: "Vegetable", quantity: 25 }
    ]
  });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const deleteButtons = screen.getAllByText("Delete");
  expect(deleteButtons).toHaveLength(2);
});

// Test 12: Dispatches deleteCrop action when delete button is clicked
test("dispatches_deleteCrop_action_when_delete_button_clicked", async () => {
  const store = mockStore({
    crops: [
      { id: "1", name: "Rice", type: "Cereal", quantity: 50 }
    ]
  });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  fireEvent.click(screen.getByText("Delete"));

  await waitFor(() => {
    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toBe("crops/deleteCrop");
    expect(actions[0].payload).toBe("1");
  });
});

// Test 13: Button text changes to "Update Crop" when editing
test("button_text_changes_to_update_crop_when_editing", async () => {
  const store = mockStore({
    crops: [
      { id: "1", name: "Rice", type: "Cereal", quantity: 50 }
    ]
  });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  fireEvent.click(screen.getByText("Edit"));

  await waitFor(() => {
    expect(screen.getByText("Update Crop")).toBeInTheDocument();
    expect(screen.queryByText("Add Crop")).not.toBeInTheDocument();
  });
});

// Test 14: Form fields are populated when edit button is clicked
test("form_fields_populated_when_edit_button_clicked", async () => {
  const store = mockStore({
    crops: [
      { id: "1", name: "Rice", type: "Cereal", quantity: 50 }
    ]
  });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  fireEvent.click(screen.getByText("Edit"));

  await waitFor(() => {
    expect(screen.getByDisplayValue("Rice")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Cereal")).toBeInTheDocument();
    expect(screen.getByDisplayValue("50")).toBeInTheDocument();
  });
});

// Test 15: Dispatches updateCrop action when update form is submitted
test("dispatches_updateCrop_action_when_update_form_submitted", async () => {
  const store = mockStore({
    crops: [
      { id: "1", name: "Rice", type: "Cereal", quantity: 50 }
    ]
  });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Click edit to populate form
  fireEvent.click(screen.getByText("Edit"));

  await waitFor(() => {
    expect(screen.getByDisplayValue("Rice")).toBeInTheDocument();
  });

  // Modify the crop name
  fireEvent.change(screen.getByDisplayValue("Rice"), {
    target: { value: "Brown Rice" }
  });

  fireEvent.click(screen.getByText("Update Crop"));

  await waitFor(() => {
    const actions = store.getActions();
    const updateAction = actions.find(action => action.type === "crops/updateCrop");
    expect(updateAction).toBeDefined();
    expect(updateAction.payload.id).toBe("1");
    expect(updateAction.payload.name).toBe("Brown Rice");
    expect(updateAction.payload.type).toBe("Cereal");
    expect(updateAction.payload.quantity).toBe(50);
  });
});

// Test 16: Form clears after successful submission
test("form_clears_after_successful_submission", async () => {
  const store = mockStore({ crops: [] });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Fill in the form
  const nameInput = screen.getByPlaceholderText("Crop Name");
  const typeInput = screen.getByPlaceholderText("Crop Type");
  const quantityInput = screen.getByPlaceholderText("Quantity");

  fireEvent.change(nameInput, { target: { value: "Corn" } });
  fireEvent.change(typeInput, { target: { value: "Cereal" } });
  fireEvent.change(quantityInput, { target: { value: "75" } });

  fireEvent.click(screen.getByText("Add Crop"));

  await waitFor(() => {
    expect(nameInput.value).toBe("");
    expect(typeInput.value).toBe("");
    expect(quantityInput.value).toBe("");
  });
});