import React, { useState } from "react";

interface Props {
  imageUrls: Array<string>;
}

export default function Slider({ imageUrls }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  function incrementSlide() {
    if (currentSlide >= imageUrls.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  }

  return (
    <div
      style={{
        position: "relative",
        textAlign: "center",
      }}
      onClick={incrementSlide}
    >
      {imageUrls.map((imageUrl, index) => (
        <img
          src={imageUrl}
          style={{
            width: "100%",
            display: currentSlide === index ? "block" : "none",
          }}
        />
      ))}
      <button
        style={{
          padding: 40,
          fontSize: 20,
          marginTop: 30,
        }}
      >
        {currentSlide === 0 ? "Break the loop" : "↺"}
      </button>
    </div>
  );
}
