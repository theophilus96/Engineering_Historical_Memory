import React from "react";
import ReactPlayer from "react-player";

export default function IntroVideo() {
  return (
    <section class="py-8 py-md-11 border-bottom">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-10 col-lg-8 text-center">
            {/* <h6 class="text-uppercase text-primary" data-aos="fade-up">
              Global financing
            </h6> */}

            <h1
              class="display-1 fw-bold"
              data-aos="fade-up"
              data-aos-delay="50"
            >
              Introduction
            </h1>

            <p
              class="lead text-muted mb-6"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              All about Engineering Historical Memory
            </p>

            {/* <p class="mb-7 mb-md-9" data-aos="fade-up" data-aos-delay="150">
              <a class="btn btn-primary shadow lift" href="#!">
                Open an account <i class="fe fe-arrow-right ms-3"></i>
              </a>
            </p> */}
          </div>
        </div>
        <div class="row">
          <div class="col-12" data-aos="fade-up" data-aos-delay="200">
            <div class="ratio ratio-16x9">
              <ReactPlayer
                class="rounded-lg bg-light shadow-lg"
                url="https://firebasestorage.googleapis.com/v0/b/engineeringhistoricalmem-27d5c.appspot.com/o/video%2F2021%20EHM%20explainer%20video.mp4?alt=media&token=c7f31901-2831-4b45-b54c-53548fe0250a"
                playing
                width="100%"
                height="100%"
                autoplay
                controls="true"
              >
                Sorry, your browser doesn't support embedded videos, but don't
                worry, you can{" "}
                <a href="https://firebasestorage.googleapis.com/v0/b/engineeringhistoricalmem-27d5c.appspot.com/o/video%2F2021%20EHM%20explainer%20video.mp4?alt=media&token=c7f31901-2831-4b45-b54c-53548fe0250a">
                  download it
                </a>
                ˝ and watch it with your favorite video player!
              </ReactPlayer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
