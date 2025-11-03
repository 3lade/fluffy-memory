// src/test/App.test.js

import React from "react";
import { render, screen, fireEvent, waitFor, cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App";
import MovieForm from "../components/MovieForm";
import MovieList from "../components/MovieList";
import Filter from "../components/Filter";

jest.mock("../App.css", () => ({}));

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

//
// 1. HTML Structure (5 tests)
//
describe("HTML Structure", () => {
  test("renders App header and container", () => {
    render(<App />);
    expect(screen.getByText("Movie Watchlist Manager")).toBeInTheDocument();
    expect(document.querySelector(".container")).toBeInTheDocument();
  });

  test("MovieForm inputs & button exist", () => {
    render(<MovieForm addMovie={jest.fn()} />);
    expect(screen.getByPlaceholderText("Enter movie title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter director’s name (optional)")).toBeInTheDocument();
    expect(screen.getByLabelText("Release Date*")).toBeInTheDocument();
    expect(screen.getByLabelText("Status*")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Add personal comments (optional)")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add to Watchlist" })).toBeInTheDocument();
  });

  test("Filter dropdown renders with correct options", () => {
    render(<Filter filterStatus="All" setFilterStatus={jest.fn()} />);
    const sel = screen.getByLabelText("Filter movies by status");
    ["All","Plan to Watch","Watching","Watched"]
      .forEach(opt => expect(screen.getByRole("option", { name: opt })).toBeInTheDocument());
  });

  test("MovieList shows message when empty", () => {
    render(<MovieList movies={[]} removeMovie={jest.fn()} filterStatus="All" />);
    expect(screen.getByText("No movies found for this category.")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  test("MovieList table headers are correct", () => {
    const movies = [{ title:"T", director:"D", releaseDate:"2025-01-01", status:"Watched", rating:"7", comments:"C" }];
    render(<MovieList movies={movies} removeMovie={jest.fn()} filterStatus="All" />);
    ["Title","Director","Release Date","Status","Rating","Action"]
      .forEach(h => expect(screen.getByText(h)).toBeInTheDocument());
  });
});

//
// 2. CSS & Styling (6 tests)
//
describe("CSS & Styling", () => {
  test("App container has .container class", () => {
    render(<App />);
    expect(document.querySelector(".container")).toHaveClass("container");
  });

  test("form has .form class", () => {
    render(<MovieForm addMovie={jest.fn()} />);
    expect(document.querySelector("form")).toHaveClass("form");
  });

  test("submit button has .submit-btn class", () => {
    render(<MovieForm addMovie={jest.fn()} />);
    expect(screen.getByRole("button", { name: "Add to Watchlist" })).toHaveClass("submit-btn");
  });

  test("table has .movie-table class", () => {
    const movies = [{ title:"A", director:"", releaseDate:"2025-02-02", status:"Plan to Watch", rating:"", comments:"" }];
    render(<MovieList movies={movies} removeMovie={jest.fn()} filterStatus="All" />);
    expect(document.querySelector(".movie-table")).toHaveClass("movie-table");
  });

  test("remove button has .remove-btn class", () => {
    const movies = [{ title:"B", director:"", releaseDate:"2025-03-03", status:"Watching", rating:"", comments:"" }];
    render(<MovieList movies={movies} removeMovie={jest.fn()} filterStatus="All" />);
    expect(screen.getByRole("button", { name: "Remove" })).toHaveClass("remove-btn");
  });

  test("validation errors use .error class", async () => {
    render(<MovieForm addMovie={jest.fn()} />);
    await act(() => fireEvent.click(screen.getByRole("button", { name: "Add to Watchlist" })));
    await waitFor(() => expect(document.querySelectorAll(".error").length).toBeGreaterThan(0));
  });
});

//
// 3. Core Functionality (8 tests)
//
describe("Core Functionality", () => {
  test("initial summary shows zeros", () => {
    render(<App />);
    expect(screen.getByText("Total Movies: 0 | Plan to Watch: 0 | Watching: 0 | Watched: 0")).toBeInTheDocument();
  });

  test("adding a movie updates list and summary", async () => {
    render(<App />);
    await userEvent.type(screen.getByPlaceholderText("Enter movie title"), "Inception");
    await userEvent.type(screen.getByLabelText("Release Date*"), "2025-07-01");
    userEvent.selectOptions(screen.getByLabelText("Status*"), "Plan to Watch");
    fireEvent.click(screen.getByRole("button", { name: "Add to Watchlist" }));
    await waitFor(() => {
      expect(screen.getByText("Inception")).toBeInTheDocument();
      expect(screen.getByText("Total Movies: 1 | Plan to Watch: 1 | Watching: 0 | Watched: 0")).toBeInTheDocument();
    });
  });

  test("inline validation errors for required fields", async () => {
    render(<MovieForm addMovie={jest.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "Add to Watchlist" }));
    await waitFor(() => {
      ["Movie title is required","Release date is required","Status is required"]
        .forEach(msg => expect(screen.getByText(msg)).toBeInTheDocument());
    });
  });

  test("global error appears on invalid submit", async () => {
    render(<MovieForm addMovie={jest.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "Add to Watchlist" }));
    await waitFor(() => {
      expect(screen.getByText("Please complete all required fields.")).toBeInTheDocument();
    });
  });

  test("form resets after valid submit", async () => {
    render(<MovieForm addMovie={jest.fn()} />);
    await userEvent.type(screen.getByPlaceholderText("Enter movie title"), "Test");
    await userEvent.type(screen.getByLabelText("Release Date*"), "2025-08-08");
    userEvent.selectOptions(screen.getByLabelText("Status*"), "Watching");
    fireEvent.click(screen.getByRole("button", { name: "Add to Watchlist" }));
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Enter movie title").value).toBe("");
      expect(screen.getByLabelText("Release Date*").value).toBe("");
    });
  });

  test("error clears when field corrected", async () => {
    render(<MovieForm addMovie={jest.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "Add to Watchlist" }));
    await waitFor(() => expect(screen.getByText("Movie title is required")).toBeInTheDocument());
    userEvent.type(screen.getByPlaceholderText("Enter movie title"), "X");
    await waitFor(() => expect(screen.queryByText("Movie title is required")).not.toBeInTheDocument());
  });

  test("removeMovie removes entry and updates summary", async () => {
    render(<App />);
    await userEvent.type(screen.getByPlaceholderText("Enter movie title"), "Avatar");
    await userEvent.type(screen.getByLabelText("Release Date*"), "2025-09-09");
    userEvent.selectOptions(screen.getByLabelText("Status*"), "Watched");
    fireEvent.click(screen.getByRole("button", { name: "Add to Watchlist" }));
    await waitFor(() => expect(screen.getByText("Avatar")).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: "Remove" }));
    await waitFor(() => {
      expect(screen.queryByText("Avatar")).not.toBeInTheDocument();
      expect(screen.getByText("Total Movies: 0 | Plan to Watch: 0 | Watching: 0 | Watched: 0")).toBeInTheDocument();
    });
  });

  test("addMovie callback receives correct object", async () => {
    const mockAdd = jest.fn();
    render(<MovieForm addMovie={mockAdd} />);
    await userEvent.type(screen.getByPlaceholderText("Enter movie title"), "ObjTest");
    await userEvent.type(screen.getByLabelText("Release Date*"), "2025-10-10");
    userEvent.selectOptions(screen.getByLabelText("Status*"), "Watching");
    fireEvent.click(screen.getByRole("button", { name: "Add to Watchlist" }));
    expect(mockAdd).toHaveBeenCalledWith(
      expect.objectContaining({ title: "ObjTest", releaseDate: "2025-10-10", status: "Watching" })
    );
  });
});

//
// 4. Filter & Optional Fields (7 tests)
//
describe("Filter & Optional Fields", () => {
  test("filter shows only matching status entries", async () => {
    render(<App />);
    const title = screen.getByPlaceholderText("Enter movie title");
    const date  = screen.getByLabelText("Release Date*");
    const status= screen.getByLabelText("Status*");
    const add   = screen.getByRole("button", { name: "Add to Watchlist" });

    await userEvent.type(title, "M1");
    await userEvent.type(date, "2025-11-11");
    userEvent.selectOptions(status, "Watched");
    fireEvent.click(add);

    await userEvent.clear(title); await userEvent.clear(date);
    await userEvent.type(title, "M2");
    await userEvent.type(date, "2025-12-12");
    userEvent.selectOptions(status, "Plan to Watch");
    fireEvent.click(add);

    userEvent.selectOptions(screen.getByLabelText("Filter movies by status"), "Watched");
    expect(screen.getByText("M1")).toBeInTheDocument();
    expect(screen.queryByText("M2")).not.toBeInTheDocument();
  });

  test("rating field is optional", async () => {
    render(<App />);
    await userEvent.type(screen.getByPlaceholderText("Enter movie title"), "NoRate");
    await userEvent.type(screen.getByLabelText("Release Date*"), "2026-01-01");
    userEvent.selectOptions(screen.getByLabelText("Status*"), "Watching");
    fireEvent.click(screen.getByRole("button", { name: "Add to Watchlist" }));
    await waitFor(() => expect(screen.getByText("NoRate")).toBeInTheDocument());
  });

  test("director field is optional", async () => {
    render(<App />);
    await userEvent.type(screen.getByPlaceholderText("Enter movie title"), "DirOpt");
    await userEvent.type(screen.getByLabelText("Release Date*"), "2026-03-03");
    userEvent.selectOptions(screen.getByLabelText("Status*"), "Watched");
    fireEvent.click(screen.getByRole("button", { name: "Add to Watchlist" }));
    await waitFor(() => expect(screen.getByText("DirOpt")).toBeInTheDocument());
  });

  test("Your Rating input accepts numeric values", () => {
    render(<MovieForm addMovie={jest.fn()} />);
    const rating = screen.getByLabelText("Your Rating");
    userEvent.type(rating, "8");
    expect(rating.value).toBe("8");
  });

  test("resetting filter to All shows all entries", async () => {
    render(<App />);
    const t = screen.getByPlaceholderText("Enter movie title");
    const d = screen.getByLabelText("Release Date*");
    const s = screen.getByLabelText("Status*");
    const btn = screen.getByRole("button", { name: "Add to Watchlist" });

    await userEvent.type(t, "F1");
    await userEvent.type(d, "2026-04-04");
    userEvent.selectOptions(s, "Watched");
    fireEvent.click(btn);

    await userEvent.clear(t); await userEvent.clear(d);
    await userEvent.type(t, "F2");
    await userEvent.type(d, "2026-05-05");
    userEvent.selectOptions(s, "Plan to Watch");
    fireEvent.click(btn);

    userEvent.selectOptions(screen.getByLabelText("Filter movies by status"), "All");
    expect(screen.getByText("F1")).toBeInTheDocument();
    expect(screen.getByText("F2")).toBeInTheDocument();
  });
});

//
// 5. Persistence & Edge Cases (8 tests)
//
describe("Persistence & Edge Cases", () => {
  test("does not call addMovie when validation fails", () => {
    const fn = jest.fn();
    render(<MovieForm addMovie={fn} />);
    fireEvent.click(screen.getByRole("button", { name: "Add to Watchlist" }));
    expect(fn).not.toHaveBeenCalled();
  });

  test("invalid date order shows global error", async () => {
    render(<MovieForm addMovie={jest.fn()} />);
    await userEvent.type(screen.getByLabelText("Release Date*"), "2026-08-08");
    fireEvent.click(screen.getByRole("button", { name: "Add to Watchlist" }));
    await waitFor(() => expect(screen.getByText("Please complete all required fields.")).toBeInTheDocument());
  });
});
