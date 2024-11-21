import React, { useEffect, useState } from "react";

import img1 from "../../assets/home/homeImgOne.jpg";
import img2 from "../../assets/home/homeImgTwo.jpg";
import img3 from "../../assets/home/homeImgThree.png";

import "./Slider.css";

export default function Slider() {
  const images = [img1, img2, img3];
  const [index, setIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(2);

  const handleSlideClick = (slideNumber) => {
    setCurrentSlide(slideNumber);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
      const nextSlide = currentSlide === 3 ? 1 : currentSlide + 1;
      setCurrentSlide(nextSlide);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length, currentSlide]);
  return (
    <div data-aos="fade-up" data-aos-delay="250">
      <div className="slider pt-3" id="slider">
        <input
          type="radio"
          name="slide"
          id="s1"
          onClick={() => handleSlideClick(1)}
          checked={currentSlide === 1}
        />
        <input
          type="radio"
          name="slide"
          id="s2"
          onClick={() => handleSlideClick(2)}
          checked={currentSlide === 2}
        />
        <input
          type="radio"
          name="slide"
          id="s3"
          onClick={() => handleSlideClick(3)}
          checked={currentSlide === 3}
        />

        <label htmlFor="s1" id="slide1" style={{ borderRadius: "10px" }}>
          <img
            src={img1}
            style={{ borderRadius: "10px" }}
            className="cardImg"
            height="100%"
            width="100%"
          />
        </label>
        <label htmlFor="s2" id="slide2" style={{ borderRadius: "10px" }}>
          <img
            src={img2}
            style={{ borderRadius: "10px" }}
            className="cardImg"
            height="100%"
            width="100%"
          />
        </label>
        <label htmlFor="s3" id="slide3" style={{ borderRadius: "10px" }}>
          <img
            src={img3}
            style={{ borderRadius: "10px" }}
            className="cardImg"
            height="100%"
            width="100%"
          />
        </label>
      </div>
    </div>
  );
}
