import React from "react";
import Slider from "react-slick";
import style from "./MainSlider.module.css";
import slide1 from "../../assets/slider-image-1.jpeg";
import slide2 from "../../assets/slider-image-2.jpeg";
import slide3 from "../../assets/slider-image-3.jpeg";
import slide4 from "../../assets/grocery-banner.png";
import slide5 from "../../assets/grocery-banner-2.jpeg";

export default function MainSlider() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2000
      };



  return (
    <>
      <div className="row">
        <div className="w-3/4">
          <Slider {...settings}>
            <img
              src={slide2}
              alt=""
              className="w-full object-cover h-[400px]"
            />
            <img
              src={slide4}
              alt=""
              className="w-full object-cover h-[400px]"
            />
            <img
              src={slide5}
              alt=""
              className="w-full object-cover h-[400px]"
            />
          </Slider>
        </div>
        <div className="w-1/4">
          <img src={slide1} alt="" className="w-full  h-[200px]" />
          <img src={slide3} alt="" className="w-full  h-[200px]" />
        </div>
      </div>
    </>
  );
}
