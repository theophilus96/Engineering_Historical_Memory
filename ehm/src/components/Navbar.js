import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//state
import { auth, projectFirestore } from "../firebase/config";
import { useStateValue } from "../state/StateProvider";
export default function Navbar() {
  const [{ user }, dispatch] = useStateValue();
  const [userName, setUserName] = useState("");

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark navbar-togglable fixed-top border-bottom-dark">
        <div className="container">
          {/* Brand */}
          <Link to="/" className="navbar-brand">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/engineeringhistoricalmem-27d5c.appspot.com/o/images%2Flogo%2Flogo.gif?alt=media&token=eb38ce85-0b6c-4843-8dd2-c785db427956"
              className="navbar-brand-img"
              alt="..."
            />
          </Link>

          {/* Toggler */}
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

          {/* Collapse */}
          <div className="collapse navbar-collapse" id="navbarCollapse">
            {/* Toggler */}
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

            {/* Navigation */}
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <Link
                  to="/company"
                  className="nav-link dropdown-toggle"
                  id="navbarLandings"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Companies
                </Link>

                <div
                  className="dropdown-menu dropdown-menu-md p-0"
                  aria-labelledby="navbarLandings"
                >
                  <div className="row gx-0">
                    {/* <div className="col-12 col-lg-6">
                      <div
                        className="dropdown-img-start"
                        style={{
                          backgroundImage: `url(require("./assets/img/photos/photo-3.jpg"))`,
                        }}
                      >
                        <h4 className="fw-bold text-white mb-0">Overview</h4>

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
                    </div> */}
                    <div className="col-6 col-lg-6">
                      <div className="dropdown-body">
                        <div className="row gx-0">
                          <div className="col-6">
                            {/* Heading */}
                            <h6 className="dropdown-header">Types</h6>

                            {/* List */}
                            <Link className="dropdown-item" to="/company">
                              all
                            </Link>
                          </div>
                        </div>{" "}
                        {/* / .row */}
                      </div>
                    </div>
                  </div>{" "}
                  {/* / .row */}
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="navbarPages"
                  href="https://sandbox-social.web.app/"
                >
                  Social
                </a>
                {/* / .row */}
              </li>
              <li className="nav-item">
                <Link className="nav-link" id="navbarAccount" to="/blog">
                  Blog
                </Link>
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
                  Contacts
                </a>
                <div
                  className="dropdown-menu dropdown-menu-md"
                  aria-labelledby="navbarDocumentation"
                >
                  <div className="list-group list-group-flush">
                    <a className="list-group-item" href="/contact">
                      {/* Icon */}
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="none" fillRule="evenodd">
                          <path d="M0 0h24v24H0z"></path>
                          <path
                            d="M11.915 14.143l2.204-2.204a2 2 0 00.375-2.309l-.125-.25a2 2 0 01.374-2.308l2.733-2.733a.5.5 0 01.8.13l1.105 2.208a4.387 4.387 0 01-.822 5.064l-5.999 6a5.427 5.427 0 01-5.554 1.31l-2.414-.805a.5.5 0 01-.195-.828l2.65-2.65a2 2 0 012.31-.375l.25.124a2 2 0 002.308-.374z"
                            fill="#335EEA"
                          ></path>
                        </g>
                      </svg>

                      {/* Content */}
                      <div className="ms-4">
                        {/* Heading */}
                        <h6 className="fw-bold text-uppercase text-primary mb-0">
                          Contact
                        </h6>

                        {/* Text */}
                        <p className="fs-sm text-gray-700 mb-0">
                          Let us help you
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={user ? "/profile" : "/login"}>
                  Hello {!user ? "Guest" : userName}
                </Link>
              </li>
            </ul>

            {/* Button */}

            <a
              className="navbar-btn btn btn-sm btn-primary lift ms-auto"
              href={!user ? "/login" : "#!"}
              onClick={handleAuthentication}
            >
              {user ? "Sign Out" : "Sign In"}
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
