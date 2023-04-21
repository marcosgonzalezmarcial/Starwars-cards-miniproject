import "./LandingAnimation.scss";
export function LandingAnimation() {
  return (
    <div className="starwars-demo">
      <img
        src="https://cssanimation.rocks/demo/starwars/images/star.svg"
        alt="Star"
        className="star"
      />
      <img
        src="https://cssanimation.rocks/demo/starwars/images/wars.svg"
        alt="Wars"
        className="wars"
      />
      <h2 className="byline" id="byline">
        <span>Log in the Force</span>
      </h2>
    </div>
  );
}
