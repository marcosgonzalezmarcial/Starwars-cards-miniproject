import React from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BackToTopBtn } from "./index";

describe("BackToTopBtn component", () => {
  afterEach(cleanup);

  it("renders without errors", () => {
    render(<BackToTopBtn />);
  });

  it("has the correct title and role attributes", () => {
    const { getByRole } = render(<BackToTopBtn />);
    const backToTopBtn = getByRole("button");
    expect(backToTopBtn).toHaveAttribute("title", "Back to top button");
    expect(backToTopBtn).toHaveAttribute("role", "button");
  });

  it("is hidden when the page first loads", () => {
    const { queryByRole } = render(<BackToTopBtn />);
    const backToTopBtn = queryByRole("button");
    expect(backToTopBtn).not.toHaveClass("show");
  });

  it("scrolls the page to the top when clicked", () => {
    window.scrollTo = jest.fn();
    const { getByRole } = render(<BackToTopBtn />);
    const backToTopBtn = getByRole("button");
    fireEvent.click(backToTopBtn);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
