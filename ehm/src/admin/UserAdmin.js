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
      <nav class="bg-Genoa-dark d-md-none">
        <div class="container-md">
          <div class="row align-items-center">
            <div class="col">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <span class="text-white">Account</span>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  <span class="text-white">General</span>
                </li>
              </ol>
            </div>
            <div class="col-auto">
              <div class="navbar-dark">
                <button
                  class="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#sidenavCollapse"
                  aria-controls="sidenavCollapse"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <header class="bg-Genoa-dark pt-9 pb-11 d-none d-md-block">
        <div class="container-md">
          <div class="row align-items-center">
            <div class="col">
              <h1 class="fw-bold text-white mb-2">Admin Settings</h1>

              <p class="fs-lg text-white-75 mb-0">
                Admin{" "}
                <a class="text-reset" href="mailto:dhgamache@gmail.com">
                  {!user ? "" : userName}
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <main class="pb-8 pb-md-11 mt-md-n6">
        <div class="container-md">
          <div class="row">
            <div class="col-12 col-md-3">
              <div class="card card-bleed border-bottom border-bottom-md-0 shadow-light-lg">
                <div class="collapse d-md-block" id="sidenavCollapse">
                  <div class="card-body">
                    <h6 class="fw-bold text-uppercase mb-3">Applications</h6>

                    <ul class="card-list list text-gray-700 mb-6">
                      <li class="list-item">
                        <Link class="list-link text-reset" to="/admin/category">
                          Category
                        </Link>
                      </li>
                      <li class="list-item">
                        <Link class="list-link text-reset" to="/admin/article">
                          Articles
                        </Link>
                      </li>
                    </ul>

                    <h6 class="fw-bold text-uppercase mb-3">Others</h6>

                    <ul class="card-list list text-gray-700 mb-0">
                      <li class="list-item active">
                        <Link class="list-link text-reset" to="/admin/user">
                          Users
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-9">
              <div class="card card-bleed shadow-light-lg">
                <div class="card-header">
                  <div class="row align-items-center">
                    <div class="col">
                      <h4 class="mb-0">All Users</h4>
                    </div>
                    <div class="col-auto">
                      <button class="btn btn-xs btn-EasternBlue">Add</button>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="list-group list-group-flush">
                    {docs &&
                      docs.map((doc) => (
                        <div class="list-group-item" key={doc.id}>
                          <div class="row align-items-center">
                            <div class="col-auto">
                              <div class="avatar avatar-xl">
                                <img
                                  class="avatar-img rounded-circle"
                                  src={
                                    doc.image
                                      ? doc.image
                                      : "https://jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png"
                                  }
                                  alt="..."
                                />
                              </div>
                            </div>
                            <div class="col-6 ms-n5">
                              <p class="mb-0">{doc.name}</p>

                              <a
                                class="d-block small text-truncate text-gray-700"
                                href="mailto:ab.hadley@company.com"
                              >
                                {doc.company}
                              </a>

                              <a
                                class="d-block small text-truncate text-gray-700"
                                href="mailto:ab.hadley@company.com"
                              >
                                {doc.role}
                              </a>
                            </div>
                            {/* <div class="col-auto ms-auto">
                              <select
                                class="form-select form-select-xs"
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
