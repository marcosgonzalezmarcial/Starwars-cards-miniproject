import { useEffect, useRef } from 'react'
import './LandingAnimation.css'
export const LandingAnimation = () => {
  // const byline = document.getElementById('byline') // Find the H2
  // const bylineArr = bylineText.split('') // Split content into array
  // byline.innerHTML = '' // Empty current content

  const byline = useRef(null)
  useEffect(() => {
    const bylineText = byline.current.innerHTML // Get the content of the H2
    const bylineArr = bylineText.split('') // Split content into array

    // span = document.createElement('span') // Create a <span> element
    const span = <span></span>
    let letter

    // for (let i = 0; i < bylineArr.length; i++) {
    //   // Loop for every letter
    //   letter = bylineArr[i] // Create the letter
    //   if (bylineArr[i] === ' ') {
    //     // If the letter is a space...
    //     byline.appendChild(letter) // ...Add the space without a span
    //   } else {
    //     span.appendChild(letter) // Add the letter to the span
    //     byline.appendChild(span) // Add the span to the h2
    //   }
    // }
  }, [])
  return (
    <div className="starwars-demo">
      <img
        src="//cssanimation.rocks/demo/starwars/images/star.svg"
        alt="Star"
        className="star"
      />
      <img
        src="//cssanimation.rocks/demo/starwars/images/wars.svg"
        alt="Wars"
        className="wars"
      />
      <h2 ref={byline} className="byline" id="byline">
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
