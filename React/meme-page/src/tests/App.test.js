// src/tests/Meme.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import Meme from "../components/Meme";
import "@testing-library/jest-dom";

describe("Meme Component (Basic Tests)", () => {
  test("renders heading", () => {
    render(<Meme />);
    const heading = screen.getByText(/Memes mate/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders button with text "Next Page"', async () => {
    render(<Meme />);
    const button = await screen.findByRole("button", { name: /Next Page/i });
    expect(button).toBeInTheDocument();
  });

  test("renders image if memeData is available", async () => {
    render(<Meme />);
    const image = await screen.findByRole("img");
    expect(image).toBeInTheDocument();
  });

  test("image has correct width and height styles", async () => {
    render(<Meme />);
    const image = await screen.findByRole("img");
    expect(image).toHaveStyle({ width: "500px", height: "500px" });
  });

  test('button has class name "nextBtn"', async () => {
    render(<Meme />);
    const button = await screen.findByRole("button", { name: /Next Page/i });
    expect(button).toHaveClass("nextBtn");
  });

  
});
