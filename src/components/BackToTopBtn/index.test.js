import React from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { prettyDOM } from "@testing-library/dom";
// import { toHaveStyle } from "@testing-library/jest-dom";

import { BackToTopBtn } from "./index";

describe("BackToTopBtn component", () => {
  let backToTopBtn;
  beforeEach(() => {
    const { getByRole } = render(<BackToTopBtn />);
    backToTopBtn = getByRole("button");
  });
  afterEach(cleanup);

  // Tests that the BackToTopBtn component is rendered with the correct class and image.
  it("should render with correct class and image", () => {
    expect(backToTopBtn).toHaveClass("back-to-top-btn");
    expect(backToTopBtn).not.toHaveClass("show");
    expect(backToTopBtn.firstChild).toContainHTML(
      '<img class="back-to-top-btn__img" src="up-chevron-btn.svg" alt="search icon">'
    );
  });

  // Tests that the BackToTopBtn component is visible when the user scrolls past 300px.
  it("should be visible when the user scrolls past 300px", () => {
    expect(backToTopBtn).not.toHaveClass("show");
    window.scrollY = 400;
    fireEvent.scroll(window);
    expect(backToTopBtn).toHaveClass("show");
    // expect(backToTopBtn).toBeInTheDocument();
  });

  // Tests that clicking the BackToTopBtn scrolls the window to the top smoothly and the button is hidden.
  it("should scroll the window to the top smoothly and the hide the button ", () => {
    window.scrollTo = jest.fn();
    fireEvent.click(backToTopBtn);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
    expect(backToTopBtn).not.toHaveClass("show");
  });
});
