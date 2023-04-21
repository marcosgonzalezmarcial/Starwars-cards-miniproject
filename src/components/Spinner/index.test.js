import { render, screen, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { prettyDOM } from "@testing-library/dom";
import { Spinner } from "./index";

describe("Spinner", () => {
  afterEach(cleanup);
  it("spinner-wrapper div has correct class when small prop is true", () => {
    const { container } = render(<Spinner small />);
    const wrapperDiv = container.firstChild;
    expect(wrapperDiv).toHaveClass("spinner-wrapper small");
  });

  it("spinner-wrapper div does not have small class when small prop is not passed", () => {
    const { container } = render(<Spinner />);
    const wrapperDiv = container.firstChild;
    expect(wrapperDiv).not.toHaveClass("small");
  });

  it("loadingio-spinner-eclipse-3z3n0w49pdf div is rendered", () => {
    const { container } = render(<Spinner />);
    const loadingioDiv = container.querySelector(
      ".loadingio-spinner-eclipse-3z3n0w49pdf"
    );
    expect(loadingioDiv).toBeInTheDocument();
  });

  it("spinner contains 3 divs", () => {
    const { container } = render(<Spinner />);
    const divCount = container.firstChild.querySelectorAll("div").length;
    expect(divCount).toBe(3);
  });
});
