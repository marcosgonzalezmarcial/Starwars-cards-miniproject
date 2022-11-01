import './LandingAnimation.css'
export const LandingAnimation = () => {
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
				<span>L</span>
				<span>o</span>
				<span>g</span>
				<span>i</span>
				<span>n</span> <span>t</span>
				<span>h</span>
				<span>e</span> <span>F</span>
				<span>o</span>
				<span>r</span>
				<span>c</span>
				<span>e</span>
			</h2>
		</div>
	)
}
