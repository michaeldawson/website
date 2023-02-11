import React from "react";

export default function RecommendationButton() {
  function handleClick() {
    window.location.href = "https://impulse.training/recommend.html";
  }
  return (
    <button style={{ marginTop: 20, fontSize: 20 }} onClick={handleClick}>
      Make a recommendation
    </button>
  );
}
