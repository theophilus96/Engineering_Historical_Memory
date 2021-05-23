import React from "react";
import "../css/slick.css";
import "../css/slicktheme.css";
import { useScript } from "../hooks/useScript";
import $ from "jquery";
import Slider from "react-slick";
//hooks
import useFirestore from "../hooks/useFirestore";
import { projectFirestore } from "../firebase/config";
import { useStateValue } from "../state/StateProvider";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className + "flickity-button"} onClick={onClick}>
      <button
        className="flickity-button flickity-prev-next-button previous"
        type="button"
        aria-label="Previous"
      ></button>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className + "flickity-button"} onClick={onClick}>
      <button
        className="flickity-button flickity-prev-next-button next"
        type="button"
        aria-label="Previous"
      ></button>
    </div>
  );
}

function Carousel() {
  // useScript("https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
  // useScript(
  //   "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.9/slick.min.js"
  // );

  const { docs } = useFirestore("category");
  console.log(docs);

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
    <section className="pt-7 pt-md-10 bg-light">
      <div className="container">
        <div className="row">
          <h2>Auto Play</h2>
          <Slider {...settings}>
            {docs &&
              docs.map((doc) => (
                <div key={doc.id}>
                  <div
                    className="col-12 col-md-6 col-lg-4 d-flex"
                    style={{ width: "18rem" }}
                  >
                    <a className="card mb-6 mb-lg-0 shadow-light-lg" href="#!">
                      <div className="card-zoom">
                        <img
                          className="card-img-top"
                          src={doc.image}
                          alt="..."
                          style={{ height: 162 }}
                        />
                      </div>

                      <div className="card-body">
                        <div className="shape shape-bottom-100 shape-fluid-x text-white">
                          <svg
                            viewBox="0 0 2880 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z"
                              fill="currentColor"
                            />
                          </svg>{" "}
                        </div>

                        <h4 className="mb-0">{doc.name}</h4>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            {/* <div>
              <div
                className="col-12 col-md-6 col-lg-4 d-flex"
                style={{ width: "18rem" }}
              >
                <a className="card mb-6 mb-lg-0 shadow-light-lg" href="#!">
                  <div className="card-zoom">
                    <img
                      className="card-img-top"
                      src="https://engineeringhistoricalmemory.com/Images/apps/Afro-eurasia.png"
                      alt="..."
                      style={{ height: 162 }}
                    />
                  </div>

                  <div className="card-body">
                    <div className="shape shape-bottom-100 shape-fluid-x text-white">
                      <svg
                        viewBox="0 0 2880 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z"
                          fill="currentColor"
                        />
                      </svg>{" "}
                    </div>

                    <h4 className="mb-0">Maps of Afro Eurasia</h4>
                  </div>
                </a>
              </div>
            </div>
            <div>
              <div
                className="col-12 col-md-6 col-lg-4 d-flex"
                style={{ width: "18rem" }}
              >
                <a className="card mb-6 mb-lg-0 shadow-light-lg" href="#!">
                  <div className="card-zoom">
                    <img
                      className="card-img-top"
                      src="https://engineeringhistoricalmemory.com/Images/apps/Travels.jpg"
                      alt="..."
                      style={{ height: 162 }}
                    />
                  </div>

                  <div className="card-body">
                    <div className="shape shape-bottom-100 shape-fluid-x text-white">
                      <svg
                        viewBox="0 0 2880 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z"
                          fill="currentColor"
                        />
                      </svg>{" "}
                    </div>

                    <h4 className="mb-0">Travel Accounts</h4>
                  </div>
                </a>
              </div>
            </div>
            <div>
              <div
                className="col-12 col-md-6 col-lg-4 d-flex"
                style={{ width: "18rem" }}
              >
                <a className="card mb-6 mb-lg-0 shadow-light-lg" href="#!">
                  <div className="card-zoom">
                    <img
                      className="card-img-top"
                      src="https://engineeringhistoricalmemory.com/Images/apps/Chronicles.jpg"
                      alt="..."
                      style={{ height: 162 }}
                    />
                  </div>

                  <div className="card-body">
                    <div className="shape shape-bottom-100 shape-fluid-x text-white">
                      <svg
                        viewBox="0 0 2880 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z"
                          fill="currentColor"
                        />
                      </svg>{" "}
                    </div>

                    <h4 className="mb-0">Chronicles</h4>
                  </div>
                </a>
              </div>
            </div>
            <div>
              <div
                className="col-12 col-md-6 col-lg-4 d-flex"
                style={{ width: "18rem" }}
              >
                <a className="card mb-6 mb-lg-0 shadow-light-lg" href="#!">
                  <div className="card-zoom">
                    <img
                      className="card-img-top"
                      src="https://engineeringhistoricalmemory.com/Images/apps/ST.png"
                      alt="..."
                      style={{ height: 162 }}
                    />
                  </div>

                  <div className="card-body">
                    <div className="shape shape-bottom-100 shape-fluid-x text-white">
                      <svg
                        viewBox="0 0 2880 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z"
                          fill="currentColor"
                        />
                      </svg>{" "}
                    </div>

                    <h4 className="mb-0">Illuminated Codices</h4>
                  </div>
                </a>
              </div>
            </div>
            <div>
              <div
                className="col-12 col-md-6 col-lg-4 d-flex"
                style={{ width: "18rem" }}
              >
                <a className="card mb-6 mb-lg-0 shadow-light-lg" href="#!">
                  <div className="card-zoom">
                    <img
                      className="card-img-top"
                      src="https://engineeringhistoricalmemory.com/Images/apps/Sites.jfif"
                      alt="..."
                      style={{ height: 162 }}
                    />
                  </div>

                  <div className="card-body">
                    <div className="shape shape-bottom-100 shape-fluid-x text-white">
                      <svg
                        viewBox="0 0 2880 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z"
                          fill="currentColor"
                        />
                      </svg>{" "}
                    </div>

                    <h4 className="mb-0">Sites</h4>
                  </div>
                </a>
              </div>
            </div>
            <div>
              <div
                className="col-12 col-md-6 col-lg-4 d-flex"
                style={{ width: "18rem" }}
              >
                <a className="card mb-6 mb-lg-0 shadow-light-lg" href="#!">
                  <div className="card-zoom">
                    <img
                      className="card-img-top"
                      src="https://engineeringhistoricalmemory.com/Images/apps/Archival%20docs.jpg"
                      alt="..."
                      style={{ height: 162 }}
                    />
                  </div>

                  <div className="card-body">
                    <div className="shape shape-bottom-100 shape-fluid-x text-white">
                      <svg
                        viewBox="0 0 2880 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z"
                          fill="currentColor"
                        />
                      </svg>{" "}
                    </div>


                    <h4 className="mb-0">Archival Documents</h4>
                  </div>
                </a>
              </div>
            </div>
            <div>
              <div
                className="col-12 col-md-6 col-lg-4 d-flex"
                style={{ width: "18rem" }}
              >
                <a className="card mb-6 mb-lg-0 shadow-light-lg" href="#!">
                  <div className="card-zoom">
                    <img
                      className="card-img-top"
                      src="https://engineeringhistoricalmemory.com/Images/apps/paintings.jpg"
                      alt="..."
                      style={{ height: 162 }}
                    />
                  </div>

                  <div className="card-body">
                    <div className="shape shape-bottom-100 shape-fluid-x text-white">
                      <svg
                        viewBox="0 0 2880 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z"
                          fill="currentColor"
                        />
                      </svg>{" "}
                    </div>


                    <h4 className="mb-0">Paintings</h4>
                  </div>
                </a>
              </div>
            </div>
            <div>
              <div
                className="col-12 col-md-6 col-lg-4 d-flex"
                style={{ width: "18rem" }}
              >
                <a className="card mb-6 mb-lg-0 shadow-light-lg" href="#!">
                  <div className="card-zoom">
                    <img
                      className="card-img-top"
                      src="https://engineeringhistoricalmemory.com/Images/apps/Aggregator.png"
                      alt="..."
                      style={{ height: 162 }}
                    />
                  </div>

                  <div className="card-body">
                    <div className="shape shape-bottom-100 shape-fluid-x text-white">
                      <svg
                        viewBox="0 0 2880 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z"
                          fill="currentColor"
                        />
                      </svg>{" "}
                    </div>

                    <h4 className="mb-0">History+</h4>
                  </div>
                </a>
              </div>
            </div> */}
          </Slider>
        </div>
      </div>
    </section>
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
