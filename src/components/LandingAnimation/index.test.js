import { render, screen, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { prettyDOM } from "@testing-library/dom";
import { LandingAnimation } from "./index";

describe("LandingAnimation", () => {
  afterEach(cleanup);
  it("renders the component with the correct text and image", () => {
    const landingAnimation = render(<LandingAnimation />);
    const starImage = landingAnimation.getByAltText("Star");
    const warsImage = landingAnimation.getByAltText("Wars");
    expect(starImage).toBeInTheDocument();
    expect(warsImage).toBeInTheDocument();
    const loginTheForce = landingAnimation.getByText("Log in the Force");
    expect(loginTheForce).toBeInTheDocument();
  });
});
