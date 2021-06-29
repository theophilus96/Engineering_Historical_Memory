import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
import { useStateValue } from "../state/StateProvider";
import useFirestore from "../hooks/useFirestore";

export default function UserAdmin() {
  const [{ user }, dispatch] = useStateValue();
  const [userName, setUserName] = useState("");
  const { docs } = useFirestore("users");

  var person = auth.currentUser;

  useEffect(() => {
    if (person != null) {
      setUserName(person.displayName);
    }
  }, [person]);
  return (
    <div>
      <nav className="bg-Genoa-dark d-md-none">
        <div className="container-md">
          <div className="row align-items-center">
            <div className="col">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <span className="text-white">Account</span>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <span className="text-white">General</span>
                </li>
              </ol>
            </div>
            <div className="col-auto">
              <div className="navbar-dark">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#sidenavCollapse"
                  aria-controls="sidenavCollapse"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <header className="bg-Genoa-dark pt-9 pb-11 d-none d-md-block">
        <div className="container-md">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="fw-bold text-white mb-2">Admin Settings</h1>

              <p className="fs-lg text-white-75 mb-0">
                Admin{" "}
                <a className="text-reset" href="mailto:dhgamache@gmail.com">
                  {!user ? "" : userName}
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="pb-8 pb-md-11 mt-md-n6">
        <div className="container-md">
          <div className="row">
            <div className="col-12 col-md-3">
              <div className="card card-bleed border-bottom border-bottom-md-0 shadow-light-lg">
                <div className="collapse d-md-block" id="sidenavCollapse">
                  <div className="card-body">
                    <h6 className="fw-bold text-uppercase mb-3">Applications</h6>

                    <ul className="card-list list text-gray-700 mb-6">
                      <li className="list-item">
                        <Link className="list-link text-reset" to="/admin/category">
                          Category
                        </Link>
                      </li>
                      <li className="list-item">
                        <Link className="list-link text-reset" to="/admin/article">
                          Articles
                        </Link>
                      </li>
                    </ul>

                    <h6 className="fw-bold text-uppercase mb-3">Others</h6>

                    <ul className="card-list list text-gray-700 mb-0">
                      <li className="list-item active">
                        <Link className="list-link text-reset" to="/admin/user">
                          Users
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-9">
              <div className="card card-bleed shadow-light-lg">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h4 className="mb-0">All Users</h4>
                    </div>
                    <div className="col-auto">
                      <button className="btn btn-xs btn-EasternBlue">Add</button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="list-group list-group-flush">
                    {docs &&
                      docs.map((doc) => (
                        <div className="list-group-item" key={doc.id}>
                          <div className="row align-items-center">
                            <div className="col-auto">
                              <div className="avatar avatar-xl">
                                <img
                                  className="avatar-img rounded-circle"
                                  src={
                                    doc.image
                                      ? doc.image
                                      : "https://jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png"
                                  }
                                  alt="..."
                                />
                              </div>
                            </div>
                            <div className="col-6 ms-n5">
                              <p className="mb-0">{doc.name}</p>
                              <p className="d-block small text-truncate text-gray-700">
                                {doc.company}
                              </p>

                              <p className="d-block small text-truncate text-gray-700">
                                {doc.role}
                              </p>
                            </div>
                            {/* <div className="col-auto ms-auto">
                              <select
                                className="form-select form-select-xs"
                                data-choices
                              >
                                <option selected>Admin</option>
                                <option>Staff</option>
                                <option>Custom</option>
                              </select>
                            </div> */}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
