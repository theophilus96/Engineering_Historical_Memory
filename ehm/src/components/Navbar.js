import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//state
import { auth, projectFirestore } from "../firebase/config";
import { useStateValue } from "../state/StateProvider";
export default function Navbar() {
  const [{ user }, dispatch] = useStateValue();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (user) {
      projectFirestore
        .collection("users")
        .doc(user.uid)
        .onSnapshot(
          {
            // Listen for document metadata changes
            includeMetadataChanges: true,
          },
          (doc) =>
            console.log(
              "user documents",
              doc.data().name,
              setUserName(doc.data().name)
            )
        );
    }
  }, [user]);

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  function onMouseEnter(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white navbar-togglable fixed-top">
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
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarAccount"
                  data-bs-toggle="dropdown"
                  href="#"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Applications
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarAccount">
                  <li className="dropdown-item dropend">
                    <a
                      className="dropdown-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      href="#"
                      onClick={onMouseEnter}
                    >
                      Maps of Afro-Eurasia
                    </a>
                    <div className="dropdown-menu">
                      <a
                        className="dropdown-item"
                        href="./account-general.html"
                      >
                        Fra Mauro’s Map of the World (dated 26 August 1460)
                      </a>
                      <a
                        className="dropdown-item"
                        href="./account-security.html"
                      >
                        Genoese Map of the World 1457 CE
                      </a>
                    </div>
                  </li>
                  <li className="dropdown-item dropend">
                    <a
                      className="dropdown-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      href="#"
                      onClick={onMouseEnter}
                    >
                      Travel Accounts
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="./signin-cover.html">
                        Marco Polo. Le Devisement dou monde
                      </a>
                      <a
                        className="dropdown-item"
                        href="./signin-illustration.html"
                      >
                        Ibn Battuta. Riḥla / The Journey (1325 - 1354 CE)
                      </a>
                    </div>
                  </li>
                  <li className="dropdown-item dropend">
                    <a
                      className="dropdown-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      href="#"
                      onClick={onMouseEnter}
                    >
                      Chronicles
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="./signup-cover.html">
                        The Morosini Codex (1095-1433)
                      </a>
                      <a
                        className="dropdown-item"
                        href="./signup-illustration.html"
                      >
                        Southeast Asia in the Ming Shilu (明實錄, 1368-1644)
                      </a>
                      <a className="dropdown-item" href="./signup.html">
                        The Royal Chronicles of Ayutthaya (Book One, 1169-1548)
                      </a>
                      <a
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        href="#modalSignupHorizontal"
                      >
                        The List of Old-Russian Towns (last quarter of the 14th
                        - early 15th c.)
                      </a>
                    </div>
                  </li>
                  <li className="dropdown-item dropend">
                    <a
                      className="dropdown-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      href="#"
                      onClick={onMouseEnter}
                    >
                      Illuminated Codices
                    </a>
                    <div className="dropdown-menu"></div>
                  </li>
                  <li className="dropdown-item dropend">
                    <a
                      className="dropdown-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      href="#"
                      onClick={onMouseEnter}
                    >
                      Sites
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="./error-cover.html">
                        The Methoni Castle (1207-1500 & 1685-1715)
                      </a>
                      <a
                        className="dropdown-item"
                        href="./error-illustration.html"
                      >
                        Hill Forts of Rajasthan (ca 8th-16th cent. CE)
                      </a>
                    </div>
                  </li>
                  <li className="dropdown-item dropend">
                    <a
                      className="dropdown-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      href="#"
                      onClick={onMouseEnter}
                    >
                      Archival Documents
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="./error-cover.html">
                        Pope Gregory X’s Privilege for the Holy Monastery of St
                        Catherine of Sinai (24 September 1274)
                      </a>
                    </div>
                  </li>
                  <li className="dropdown-item dropend">
                    <a
                      className="dropdown-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      href="#"
                      onClick={onMouseEnter}
                    >
                      Paintings
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="./error-cover.html">
                        The “Wayfarer Triptych” by Jheronimus Bosch (ca
                        1485-1500)
                      </a>
                    </div>
                  </li>
                  <li className="dropdown-item dropend">
                    <a
                      className="dropdown-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      href="#"
                      onClick={onMouseEnter}
                    >
                      History+
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="./error-cover.html">
                        Maps of Afro-Eurasia (1100-1460 CE)
                      </a>
                      <a
                        className="dropdown-item"
                        href="./error-illustration.html"
                      >
                        Information Visualisation for Digital History
                      </a>
                      <a className="dropdown-item" href="./error.html">
                        Chronicles and Travel Accounts of Afro-Eurasia
                        (1205-1533 CE)
                      </a>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" id="navbarAccount" to="/blog">
                  Research Team
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  to="#"
                  className="nav-link dropdown-toggle"
                  id="navbarLandings"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Info
                </Link>

                <div
                  className="dropdown-menu dropdown-menu-md p-0"
                  aria-labelledby="navbarLandings"
                >
                  <div className="row gx-0">
                    <div className="col-6 col-lg-6">
                      <div className="dropdown-body">
                        <div className="row gx-0">
                          <div className="col-6">
                            {/* Heading */}
                            <h6 className="dropdown-header">Types</h6>

                            {/* List */}
                            <Link className="dropdown-item" to="/company">
                              About
                            </Link>
                            <a className="dropdown-item" href="./rental.html">
                              Terms of Use
                            </a>
                            <a className="dropdown-item mb-5" href="./job.html">
                              Credits
                            </a>
                          </div>
                        </div>{" "}
                        {/* / .row */}
                      </div>
                    </div>
                  </div>{" "}
                  {/* / .row */}
                </div>
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
                  {!user ? "Guest" : userName}
                </Link>
              </li>
            </ul>

            {/* Button */}

            <a
              className="navbar-btn btn btn-sm btn-primary-desat lift ms-auto"
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
