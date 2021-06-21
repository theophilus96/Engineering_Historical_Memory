import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/EHMtheme.css";
//state
import { auth, projectFirestore } from "../firebase/config";
import { useStateValue } from "../state/StateProvider";

//hooks
import UseSubcollect2 from "../hooks/UseSubcollect2";
import useFirestore from "../hooks/useFirestore";

export default function Navbar() {
  const [{ user }, dispatch] = useStateValue();
  const [userName, setUserName] = useState("");
  const [navList, setNavList] = useState(null);

  const { docs } = useFirestore("category");

  var person = auth.currentUser;

  console.log("Docs from navbar", docs);

  const { article, categoryData } = UseSubcollect2();

  useEffect(() => {
    if (person != null) {
      setUserName(person.displayName);
    }

    let response = () =>
      categoryData &&
      categoryData.map((doc) => (
        <li className="dropdown-item dropend" key={doc.id}>
          <Link
            className="dropdown-link dropdown-toggle"
            data-bs-toggle="dropdown"
            to="#"
            onClick={onMouseEnter}
          >
            {doc.name}
          </Link>

          {Array.isArray(doc.array) && doc.array.length === 0 ? (
            ""
          ) : (
            <div className="dropdown-menu">
              {doc.array &&
                doc.array.map((articleDoc) => {
                  return (
                    <Link
                      key={articleDoc.id}
                      className={
                        "dropdown-item" + (articleDoc.active ? "" : " disabled")
                      }
                      to={
                        articleDoc.active
                          ? `/category/${doc.id}/article/${articleDoc.id}`
                          : "#"
                      }
                      alt="..."
                    >
                      {articleDoc.name}
                    </Link>
                  );
                })}
            </div>
          )}
        </li>
      ));
    setNavList(response);

    // if (user) {
    //   projectFirestore
    //     .collection("users")
    //     .doc(user.uid)
    //     .onSnapshot(
    //       {
    //         // Listen for document metadata changes
    //         includeMetadataChanges: true,
    //       },
    //       (doc) =>
    //         console.log(
    //           "user documents"
    //           // doc.data().name,
    //           // setUserName(doc.data().name)
    //         )
    //     );
    // }
  }, [categoryData.length]);

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
                <Link
                  className="nav-link dropdown-toggle"
                  id="navbarAccount"
                  data-bs-toggle="dropdown"
                  href="#"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Applications
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarAccount">
                  {navList}
                </ul>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  id="navbarAccount"
                  to="/researchteam"
                >
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
                            {/* <h6 className="dropdown-header"></h6> */}
                            {/* List */}
                            <Link className="dropdown-item" to="/about">
                              About
                            </Link>
                            <Link className="dropdown-item" to="/term">
                              Terms of Use
                            </Link>
                            <Link className="dropdown-item" to="/credits">
                              Credits
                            </Link>
                            <Link className="dropdown-item" to="/contact">
                              Contact us
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
              {/* <li className="nav-item dropdown">
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
                      <div className="ms-4">
                        <h6 className="fw-bold text-uppercase text-primary mb-0">
                          Contact
                        </h6>
                        <p className="fs-sm text-gray-700 mb-0">
                          Let us help you
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to={user ? "#" : "#"}>
                  {!user ? "" : userName}
                </Link>
              </li>
            </ul>

            {/* Button */}

            <a
              className="navbar-btn btn btn-sm btn-EasternBlue lift ms-auto"
              href={!user ? "/login" : "#!"}
              onClick={handleAuthentication}
            >
              {user ? "Sign Out" : "Log In"}
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
