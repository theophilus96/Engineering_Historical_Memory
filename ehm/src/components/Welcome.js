import React, { useState, useEffect } from "react";
import TextTransition, { presets } from "react-text-transition";

export default function Welcome() {
  const TEXTS = [
    "INTERACTIVE EXPLORATION OF PRIMARY HISTORICAL SOURCES",
    "VISUALISATION SOLUTIONS FOR DIGITAL HISTORY",
    "SEARCH ENGINE FOR SECONDARY LITERATURE, IMAGES, VIDEOS, NEWS",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <div>
      <section
        className="overlay overlay-dark overlay-40"
        data-jarallax
        data-speed=".8"
        style={{
          backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/engineeringhistoricalmem-27d5c.appspot.com/o/images%2Fhome%2Fehm-background.gif?alt=media&token=ce3856db-511f-4584-bb2c-d2ea1bdc4054")`,
          //   height: "100%",

          /* Center and scale the image nicely */
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="container d-flex flex-column">
          <div className="row align-items-center justify-content-center min-vh-100 py-8 py-md-11">
            <div className="col-12 col-md-8 col-lg-6 mt-auto text-center">
              <div className="img-fluid text-white mb-6">
                {/* <svg
                  viewBox="0 0 222 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M193.541 43.309c-9.826 0-18.127-8.375-18.127-18.287 0-9.913 8.301-18.287 18.127-18.287 9.826 0 18.127 8.374 18.127 18.287h-.001c0 3.76-1.197 7.297-3.216 10.242l-5.522-5.522-4.591 4.591 5.573 5.574c-2.961 2.131-6.548 3.402-10.37 3.402zm25.704 2.749l-5.518-5.518c3.44-4.226 5.477-9.598 5.477-15.518 0-13.946-11.273-24.87-25.663-24.87-14.391 0-25.664 10.924-25.664 24.87 0 13.945 11.273 24.869 25.664 24.869 5.854 0 11.191-1.808 15.464-4.891l5.649 5.649 4.591-4.591zM1.121 48.858V1.182h7.061v41.094H36.98v6.582H1.12zM121.159 26.569h14.874c7.758 0 10.51-5.064 10.51-9.402 0-4.337-2.752-9.401-10.51-9.401h-14.874v18.803zm23.303 22.29L134.07 33.152h-12.911v15.705h-7.061V1.182h22.649c10.083 0 16.858 6.423 16.858 15.985 0 6.435-4.282 11.92-10.908 13.97l-1.403.435 12.117 17.286h-8.949zM60.404 48.858l14.831-36.43 14.7 36.43h7.874L79.089 4.661a5.703 5.703 0 00-5.252-3.48H58.769v1.234a4.875 4.875 0 004.875 4.874h7.113L52.592 48.86h7.812z"
                    fill="currentColor"
                  />
                </svg>{" "} */}
              </div>
              <h1 className="display-3 text-center text-white">
                ENGINEERING HISTORICAL MEMORY
              </h1>
              <span className="text-white text-center">
                <TextTransition
                  text={TEXTS[index % TEXTS.length]}
                  springConfig={presets.wobbly}
                />
              </span>
              {/* <p className="lead text-white">
                <TextTransition
                  text={TEXTS[index % TEXTS.length]}
                  springConfig={presets.wobbly}
                />
              </p> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
