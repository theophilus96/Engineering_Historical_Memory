import React, { useState } from "react";
// import "../js/dropdown";
import $ from "jquery";

export default function NavBar1() {
  function onMouseEnter(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-togglable fixed-top">
        <div className="container">
          <a className="navbar-brand" href="./index.html">
            <img
              src="./assets/img/brand.svg"
              className="navbar-brand-img"
              alt="..."
            />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fe fe-x"></i>
            </button>

            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarLandings"
                  data-bs-toggle="dropdown"
                  href="#"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Landings
                </a>
                <div
                  className="dropdown-menu dropdown-menu-xl p-0"
                  aria-labelledby="navbarLandings"
                >
                  <div className="row gx-0">
                    <div className="col-12 col-lg-6">
                      <div
                        className="dropdown-img-start"
                        style={{ backgroundImage: `url()` }}
                      >
                        <h4 className="fw-bold text-white mb-0">
                          Want to see an overview?
                        </h4>

                        <p className="fs-sm text-white">
                          See all the pages at once.
                        </p>

                        <a
                          href="./overview.html"
                          className="btn btn-sm btn-white shadow-dark fonFt-size-sm"
                        >
                          View all pages
                        </a>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="dropdown-body">
                        <div className="row gx-0">
                          <div className="col-6">
                            <h6 className="dropdown-header">Services</h6>

                            <a
                              className="dropdown-item"
                              href="./coworking.html"
                            >
                              Coworking
                            </a>
                            <a className="dropdown-item" href="./rental.html">
                              Rental
                            </a>
                            <a className="dropdown-item mb-5" href="./job.html">
                              Job Listing
                            </a>

                            <h6 className="dropdown-header">Apps</h6>

                            <a
                              className="dropdown-item"
                              href="./desktop-app.html"
                            >
                              Desktop
                            </a>
                            <a
                              className="dropdown-item"
                              href="./mobile-app.html"
                            >
                              Mobile
                            </a>
                          </div>
                          <div className="col-6">
                            <h6 className="dropdown-header">Web</h6>

                            <a className="dropdown-item" href="./index.html">
                              Basic
                            </a>
                            <a className="dropdown-item" href="./startup.html">
                              Startup
                            </a>
                            <a
                              className="dropdown-item"
                              href="./enterprise.html"
                            >
                              Enterprise
                            </a>
                            <a className="dropdown-item" href="./service.html">
                              Service
                            </a>
                            <a className="dropdown-item" href="./cloud.html">
                              Cloud Hosting
                            </a>
                            <a className="dropdown-item" href="./agency.html">
                              Agency
                            </a>
                            <a
                              className="dropdown-item"
                              href="./framework.html"
                            >
                              Framework{" "}
                              <span className="h6 text-uppercase text-primary">
                                (new)
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarPages"
                  data-bs-toggle="dropdown"
                  href="#"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Pages
                </a>
                <div
                  className="dropdown-menu dropdown-menu-lg"
                  aria-labelledby="navbarPages"
                >
                  <div className="row gx-0">
                    <div className="col-6">
                      <div className="row gx-0">
                        <div className="col-12 col-lg-6">
                          <h6 className="dropdown-header">Career</h6>

                          <a className="dropdown-item" href="./careers.html">
                            Listing
                          </a>
                          <a
                            className="dropdown-item mb-5"
                            href="./career-single.html"
                          >
                            Opening
                          </a>

                          <h6 className="dropdown-header">Company</h6>

                          <a className="dropdown-item" href="./about.html">
                            About
                          </a>
                          <a className="dropdown-item" href="./pricing.html">
                            Pricing
                          </a>
                          <a
                            className="dropdown-item mb-5 mb-lg-0"
                            href="./terms-of-service.html"
                          >
                            Terms
                          </a>
                        </div>
                        <div className="col-12 col-lg-6">
                          <h6 className="dropdown-header">Help center</h6>

                          <a
                            className="dropdown-item"
                            href="./help-center.html"
                          >
                            Overview
                          </a>
                          <a
                            className="dropdown-item mb-5"
                            href="./help-center-article.html"
                          >
                            Article
                          </a>

                          <h6 className="dropdown-header">Contact</h6>

                          <a className="dropdown-item" href="./contact.html">
                            Basic
                          </a>
                          <a
                            className="dropdown-item"
                            href="./contact-alt.html"
                          >
                            Cover
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row gx-0">
                        <div className="col-12 col-lg-6">
                          <h6 className="dropdown-header">Blog</h6>

                          <a className="dropdown-item" href="./blog.html">
                            Rich View
                          </a>
                          <a className="dropdown-item" href="./blog-post.html">
                            Article
                          </a>
                          <a
                            className="dropdown-item"
                            href="./blog-showcase.html"
                          >
                            Showcase
                          </a>
                          <a
                            className="dropdown-item mb-5 mb-lg-0"
                            href="./blog-search.html"
                          >
                            Search
                          </a>
                        </div>
                        <div className="col-12 col-lg-6">
                          <h6 className="dropdown-header">Portfolio</h6>

                          <a
                            className="dropdown-item"
                            href="./portfolio-masonry.html"
                          >
                            Masonry
                          </a>
                          <a
                            className="dropdown-item"
                            href="./portfolio-grid-rows.html"
                          >
                            Grid Rows
                          </a>
                          <a
                            className="dropdown-item"
                            href="./portfolio-parallax.html"
                          >
                            Parallax
                          </a>
                          <a
                            className="dropdown-item"
                            href="./portfolio-case-study.html"
                          >
                            Case Study
                          </a>
                          <a
                            className="dropdown-item"
                            href="./portfolio-sidebar.html"
                          >
                            Sidebar
                          </a>
                          <a
                            className="dropdown-item"
                            href="./portfolio-sidebar-fluid.html"
                          >
                            Sidebar: Fluid
                          </a>
                          <a
                            className="dropdown-item"
                            href="./portfolio-grid.html"
                          >
                            Basic Grid
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarAccount"
                  data-bs-toggle="dropdown"
                  href="#"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Account
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarAccount">
                  <li className="dropdown-item dropend">
                    <a
                      className="dropdown-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      href="#"
                      aria-haspopup="true"
                      aria-expanded="false"
                      onClick={onMouseEnter}
                    >
                      Sign In
                    </a>
                    <ul className="dropdown-menu">
                      <a className="dropdown-item" href="./signin-cover.html">
                        Side Cover
                      </a>
                      <a
                        className="dropdown-item"
                        href="./signin-illustration.html"
                      >
                        Illustration
                      </a>
                      <a className="dropdown-item" href="./signin.html">
                        Basic
                      </a>
                      <a
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        href="#modalSigninHorizontal"
                      >
                        Modal Horizontal
                      </a>
                      <a
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        href="#modalSigninVertical"
                      >
                        Modal Vertical
                      </a>
                    </ul>
                  </li>
                  <li className="dropdown-item dropend">
                    <a
                      className="dropdown-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      href="#"
                    >
                      Sign Up
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="./signup-cover.html">
                        Side Cover
                      </a>
                      <a
                        className="dropdown-item"
                        href="./signup-illustration.html"
                      >
                        Illustration
                      </a>
                      <a className="dropdown-item" href="./signup.html">
                        Basic
                      </a>
                      <a
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        href="#modalSignupHorizontal"
                      >
                        Modal Horizontal
                      </a>
                      <a
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        href="#modalSignupVertical"
                      >
                        Modal Vertical
                      </a>
                    </div>
                  </li>
                  <li className="dropdown-item dropend">
                    <a
                      className="dropdown-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      href="#"
                    >
                      Password Reset
                    </a>
                    <div className="dropdown-menu">
                      <a
                        className="dropdown-item"
                        href="./password-reset-cover.html"
                      >
                        Side Cover
                      </a>
                      <a
                        className="dropdown-item"
                        href="./password-reset-illustration.html"
                      >
                        Illustration
                      </a>
                      <a className="dropdown-item" href="./password-reset.html">
                        Basic
                      </a>
                    </div>
                  </li>
                  <li className="dropdown-item dropend">
                    <a
                      className="dropdown-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      href="#"
                    >
                      Error
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="./error-cover.html">
                        Side Cover
                      </a>
                      <a
                        className="dropdown-item"
                        href="./error-illustration.html"
                      >
                        Illustration
                      </a>
                      <a className="dropdown-item" href="./error.html">
                        Basic
                      </a>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDocumentation"
                  data-bs-toggle="dropdown"
                  href="#"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Documentation
                </a>
                <div
                  className="dropdown-menu dropdown-menu-md"
                  aria-labelledby="navbarDocumentation"
                >
                  <div className="list-group list-group-flush">
                    <a className="list-group-item" href="./docs/index.html">
                      <div className="icon icon-sm text-primary">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fill="none" fillRule="evenodd">
                            <path d="M0 0h24v24H0z" />
                            <path
                              d="M8 3v.5A1.5 1.5 0 009.5 5h5A1.5 1.5 0 0016 3.5V3h2a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2h2z"
                              fill="#335EEA"
                              opacity=".3"
                            />
                            <path
                              d="M11 2a1 1 0 012 0h1.5a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-5a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5H11z"
                              fill="#335EEA"
                            />
                            <rect
                              fill="#335EEA"
                              opacity=".3"
                              x="7"
                              y="10"
                              width="5"
                              height="2"
                              rx="1"
                            />
                            <rect
                              fill="#335EEA"
                              opacity=".3"
                              x="7"
                              y="14"
                              width="9"
                              height="2"
                              rx="1"
                            />
                          </g>
                        </svg>{" "}
                      </div>

                      <div className="ms-4">
                        <h6 className="fw-bold text-uppercase text-primary mb-0">
                          Documentation
                        </h6>

                        <p className="fs-sm text-gray-700 mb-0">
                          Customizing and building
                        </p>
                      </div>
                    </a>
                    <a className="list-group-item" href="./docs/alerts.html">
                      <div className="icon icon-sm text-primary">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fill="none" fillRule="evenodd">
                            <path d="M0 0h24v24H0z" />
                            <rect
                              fill="#335EEA"
                              x="4"
                              y="4"
                              width="7"
                              height="7"
                              rx="1.5"
                            />
                            <path
                              d="M5.5 13h4a1.5 1.5 0 011.5 1.5v4A1.5 1.5 0 019.5 20h-4A1.5 1.5 0 014 18.5v-4A1.5 1.5 0 015.5 13zm9-9h4A1.5 1.5 0 0120 5.5v4a1.5 1.5 0 01-1.5 1.5h-4A1.5 1.5 0 0113 9.5v-4A1.5 1.5 0 0114.5 4zm0 9h4a1.5 1.5 0 011.5 1.5v4a1.5 1.5 0 01-1.5 1.5h-4a1.5 1.5 0 01-1.5-1.5v-4a1.5 1.5 0 011.5-1.5z"
                              fill="#335EEA"
                              opacity=".3"
                            />
                          </g>
                        </svg>{" "}
                      </div>

                      <div className="ms-4">
                        <h6 className="fw-bold text-uppercase text-primary mb-0">
                          Components
                        </h6>

                        <p className="fs-sm text-gray-700 mb-0">
                          Full list of components
                        </p>
                      </div>
                    </a>
                    <a className="list-group-item" href="./docs/changelog.html">
                      <div className="icon icon-sm text-primary">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fill="none" fillRule="evenodd">
                            <path d="M0 0h24v24H0z" />
                            <path
                              d="M5.857 2h7.88a1.5 1.5 0 01.968.355l4.764 4.029A1.5 1.5 0 0120 7.529v12.554c0 1.79-.02 1.917-1.857 1.917H5.857C4.02 22 4 21.874 4 20.083V3.917C4 2.127 4.02 2 5.857 2z"
                              fill="#335EEA"
                              opacity=".3"
                            />
                            <rect
                              fill="#335EEA"
                              x="6"
                              y="11"
                              width="9"
                              height="2"
                              rx="1"
                            />
                            <rect
                              fill="#335EEA"
                              x="6"
                              y="15"
                              width="5"
                              height="2"
                              rx="1"
                            />
                          </g>
                        </svg>{" "}
                      </div>

                      <div className="ms-4">
                        <h6 className="fw-bold text-uppercase text-primary mb-0">
                          Changelog
                        </h6>

                        <p className="fs-sm text-gray-700 mb-0">
                          Keep track of changes
                        </p>
                      </div>

                      <span className="badge rounded-pill bg-primary-soft ms-auto">
                        2.0.0
                      </span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            <a
              className="navbar-btn btn btn-sm btn-primary lift ms-auto"
              href="https://themes.getbootstrap.com/product/landkit/"
              target="_blank"
            >
              Buy now
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
