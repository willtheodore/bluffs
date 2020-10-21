import React from "react"
import carousel from "../images/carousel1.jpg"

// Main home page for the site
export default function Home() {
  return (
    <div className="carousel">
      <img
        src={carousel}
        alt="Image Carousel" />
    </div>
  )
}
