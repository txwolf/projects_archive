import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

const Banner = () => {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20"></div>
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        interval={5000}
        showThumbs={false}
      >
        <div>
          <img
            src="https://links.papareact.com/gi1"
            loading="lazy"
            alt=""
          ></img>
        </div>
        <div>
          <img
            src="https://links.papareact.com/6ff"
            loading="lazy"
            alt=""
          ></img>
        </div>
        <div>
          <img
            src="https://links.papareact.com/7ma"
            loading="lazy"
            alt=""
          ></img>
        </div>
      </Carousel>
    </div>
  )
}

export default Banner
