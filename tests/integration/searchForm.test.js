import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
const { MemoryRouter, Route, Routes } = require("react-router-dom");
import Home from "../../src/Home";
import SearchResult from "../../src/SearchResult";

describe("Search Integration", () => {
  test("submits valid input and navigates to result page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<SearchResult />} />
        </Routes>
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/enter search term/i);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "weather" } });
    fireEvent.click(button);

    expect(screen.getByText(/you searched for:/i)).toBeInTheDocument();
    expect(screen.getByText(/weather/i)).toBeInTheDocument();
  });

  test("shows error for SQL injection", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/enter search term/i), {
      target: { value: "SELECT * FROM users;" },
    });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(screen.getByText(/sql injection detected/i)).toBeInTheDocument();
  });
});
