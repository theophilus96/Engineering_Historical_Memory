import React from "react";
import "../css/Carousel.css";
import { useScript } from "../hooks/useScript";
import $ from "jquery";
import Slider from "react-slick";

function Carousel() {
  // useScript("https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
  // useScript(
  //   "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.9/slick.min.js"
  // );
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  // $("#carousel").slick({
  //   slidesToShow: 3,
  //   autoplay: true,
  //   autoplaySpeed: 0,
  //   speed: 2000,
  //   cssEase: "linear",
  //   infinite: true,
  //   focusOnSelect: false,
  //   responsive: [
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         arrows: false,
  //         slidesToShow: 3,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         arrows: false,
  //         slidesToShow: 1,
  //       },
  //     },
  //   ],
  // });

  return (
    <div>
      {/* <div>
          <a href="#">
            <img
              src="https://engineeringhistoricalmemory.com/Images/apps/Afro-eurasia.png"
              alt=""
            />
          </a>
        </div>
        <div>
          <a href="#">
            <img
              src="https://engineeringhistoricalmemory.com/Images/apps/Aggregator.png"
              alt=""
            />
          </a>
        </div>
        <div>
          <a href="#">
            <img
              src="https://engineeringhistoricalmemory.com/Images/apps/Bosch.jpg"
              alt=""
            />
          </a>
        </div>
        <div>
          <a href="#">
            <img
              src="https://engineeringhistoricalmemory.com/Images/apps/Chronicles.jpg"
              alt=""
            />
          </a>
        </div>
        <div>
          <a href="#">
            <img src="http://placehold.it/205x105/f00/fff" alt="" />
          </a>
        </div>
        <div>
          <a href="#">
            <img src="http://placehold.it/205x105/00f/fff" alt="" />
          </a>
        </div> */}

      <div>
        <h2>Auto Play</h2>
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default Carousel;

// import React, { Component } from 'react'

// export class Carousel extends Component {
//   render() {

//     var settings = {
//       dots: true,
//       infinite: true,
//       slidesToShow: 3,
//       slidesToScroll: 1,
//       autoplay: true,
//       speed: 2000,
//       autoplaySpeed: 2000,
//       cssEase: "linear",
//       focusOnSelect: true,
//     };
//     return (
//       <div>
//         <Slider {...settings}>
//           <div>
//             <h3>1</h3>
//           </div>
//           <div>
//             <h3>2</h3>
//           </div>
//           <div>
//             <h3>3</h3>
//           </div>
//           <div>
//             <h3>4</h3>
//           </div>
//           <div>
//             <h3>5</h3>
//           </div>
//           <div>
//             <h3>6</h3>
//           </div>
//         </Slider>
//       </div>
//     )
//   }
// }

// export default Carousel
