import React, { useState } from "react";
import { projectFirestore } from "../firebase/config";
import { useStateValue } from "../state/StateProvider";

export default function Contact() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div>
      <section
        class="py-10 py-md-14 overlay overlay-black overlay-60 bg-cover"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=706&q=80")`,
        }}
      >
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8 text-center">
              <h1 class="display-2 fw-bold text-white">Contact Us</h1>

              <p class="lead text-white-75 mb-0">
                We always want to hear from you! Let us know how we can best
                help you and we'll do our very best.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div class="position-relative">
        <div class="shape shape-bottom shape-fluid-x text-light">
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
      </div>

      <section class="py-7 py-md-9 border-bottom border-gray-300" id="info">
        <div class="container">
          <div class="row">
            <div class="col-12 text-center">
              <a
                href="#info"
                class="btn btn-white btn-rounded-circle shadow mt-n11 mt-md-n13"
                data-scroll
              >
                <i class="fe fe-arrow-down" style={{ color: "#22a6a7" }}></i>
              </a>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-4 text-center border-end border-gray-300">
              <h6 class="text-uppercase text-gray-700 mb-1">Message us</h6>

              <div class="mb-5 mb-md-0">
                <a href="#!" class="h4 text-EasternBlue">
                  Start a chat! (further implementation)
                </a>
              </div>
            </div>
            <div class="col-12 col-md-4 text-center border-end border-gray-300">
              <h6 class="text-uppercase text-gray-700 mb-1">Call anytime</h6>

              <div class="mb-5 mb-md-0">
                <a href="#!" class="h4 text-EasternBlue">
                  (+65 ) 6513 8250
                </a>
              </div>
            </div>
            <div class="col-12 col-md-4 text-center">
              <h6 class="text-uppercase text-gray-700 mb-1">Email us</h6>

              <a href="#!" class="h4 text-EasternBlue">
                andrea.nanetti@ntu.edu.sg
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="pt-8 pt-md-11 pb-8 pb-md-14">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8 text-center">
              <h2 class="fw-bold">Let us hear from you directly!</h2>

              <p class="fs-lg text-muted mb-7 mb-md-9">
                We always want to hear from you! Let us know how we can best
                help you and we'll do our very best.
              </p>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-12 col-md-12 col-lg-10">
              <form>
                <div class="row">
                  <div class="col-12 col-md-6">
                    <div class="form-group mb-5">
                      <label class="form-label" for="contactName">
                        Full name
                      </label>

                      <input
                        class="form-control"
                        id="fullName"
                        type="text"
                        placeholder="Full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="form-group mb-5">
                      <label class="form-label" for="contactEmail">
                        Email
                      </label>

                      <input
                        class="form-control"
                        id="contactEmail"
                        type="email"
                        placeholder="hello@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <div class="form-group mb-7 mb-md-9">
                      <label class="form-label" for="contactMessage">
                        What can we help you with?
                      </label>

                      <textarea
                        class="form-control"
                        id="contactMessage"
                        rows="5"
                        placeholder="Tell us what we can help you with!"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="row justify-content-center">
                  <div class="col-auto">
                    <button type="submit" class="btn btn-EasternBlue lift">
                      Send message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
