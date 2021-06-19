import React from "react";
import "../css/slick.css";
import "../css/slicktheme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
//hooks
import useFirestore from "../hooks/useFirestore";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{}} onClick={onClick}>
      <button className="btn btn-white btn-rounded-circle mb-1">
        <i className="fe fe-arrow-right"></i>
      </button>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{}} onClick={onClick}>
      <button className="btn btn-white btn-rounded-circle mb-1">
        <i className="fe fe-arrow-left"></i>
      </button>
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
    speed: 3000,
    autoplaySpeed: 3000,
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
    <section id="sectionTwo" className="pt-7 pt-md-10 pb-7 bg-light">
      <div className="container">
        <div className="row">
          <Slider {...settings}>
            {docs &&
              docs.map((doc) => (
                <div key={doc.id}>
                  <Link to={`/category/${doc.id}`}>
                    <div
                      className="col-12 col-md-6 col-lg-4 d-flex"
                      style={{ width: "18rem" }}
                    >
                      <a
                        className="card mb-6 mb-lg-0 shadow-light-sm"
                        href="#!"
                      >
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
                  </Link>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Carousel;
