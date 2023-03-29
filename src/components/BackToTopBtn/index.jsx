import { useEffect, useRef } from "react";
import "./BackToTopBtn.scss";
import upChevronBtn from "assets/icons/up-chevron-btn.svg";

export function BackToTopBtn() {
  const BackToTopBtnRef = useRef(null);

  useEffect(() => {
    const backToTop = () => {
      if (window.scrollY > 300) {
        BackToTopBtnRef.current.classList.add("show");
      } else {
        BackToTopBtnRef.current.classList.remove("show");
      }
    };
    if (BackToTopBtnRef.current) {
      window.addEventListener("scroll", backToTop);
    }
    return () => window.removeEventListener("scroll", backToTop);
  }, []);

  return (
    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      ref={BackToTopBtnRef}
      className="back-to-top-btn"
    >
      <img
        className="back-to-top-btn__img"
        src={upChevronBtn}
        alt="search icon"
      />
    </button>
  );
}
