import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
import { useStateValue } from "../state/StateProvider";

export default function ArticleAdmin() {
  const [{ user }, dispatch] = useStateValue();
  const [userName, setUserName] = useState("");
  const [checked, setChecked] = useState(true);

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
                      <li class="list-item active">
                        <Link class="list-link text-reset" to="/admin/article">
                          Articles
                        </Link>
                      </li>
                    </ul>

                    <h6 class="fw-bold text-uppercase mb-3">Others</h6>

                    <ul class="card-list list text-gray-700 mb-0">
                      <li class="list-item">
                        <a
                          class="list-link text-reset"
                          href="billing-plans-and-payment.html"
                        >
                          Users
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-9">
              <div class="card card-bleed shadow-light-lg mb-6">
                <div class="card-header">
                  <h4 class="mb-0">Add Article</h4>
                </div>
                <div class="card-body">
                  <form>
                    <div class="row">
                      <div class="col-12">
                        <div class="form-group">
                          <label class="form-label" for="name">
                            Name
                          </label>
                          <input
                            class="form-control"
                            id="name"
                            type="text"
                            placeholder="Article name"
                          />
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-group">
                          <label class="form-label">Description</label>
                          <input
                            className="form-control"
                            placeholder="Article description"
                            value=""
                            name="longDesc"
                            type="text"
                            rows="5"
                          ></input>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-group">
                          <label class="form-label">Citation</label>
                          <input
                            className="form-control"
                            placeholder="Cite the source of this article ..."
                            value=""
                            name="longDesc"
                            type="text"
                            rows="5"
                          ></input>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-group">
                          <label class="form-label">Link</label>
                          <input
                            className="form-control"
                            placeholder="https://engineeringhistoricalmemory.com/something.php ..."
                            value=""
                            name="longDesc"
                            type="text"
                            rows="5"
                          ></input>
                        </div>
                      </div>
                      <div class="col-12 mb-4">
                        <div class="list-group">
                          <div class="list-group-item">
                            <div class="row align-items-center">
                              <div class="col-auto">
                                <div class="avatar avatar-xl">
                                  <img
                                    class="avatar-img rounded-circle"
                                    src="assets/img/avatars/avatar-1.jpg"
                                    alt="..."
                                  />
                                </div>
                              </div>
                              <div class="col ms-n5">
                                <p class="mb-0">Category image</p>

                                <small class="text-gray-700">
                                  PNG or JPG no larger than 1000px
                                </small>
                              </div>
                              <div class="col-12 col-md-auto">
                                <button class="btn btn-xs w-100 mt-5 mt-md-0 btn-EasternBlue ">
                                  Upload
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 mb-6">
                        <div class="list-group ">
                          <div class="list-group-item">
                            <div class="row align-items-center">
                              <div class="col">
                                <p class="mb-0">Public Profile</p>

                                <small class="text-gray-700">
                                  Making your profile public means anyone can
                                  see your information.
                                </small>
                              </div>
                              <div class="col-auto">
                                <div class="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="switchOne"
                                    onChange={() => setChecked(!checked)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-12 col-md-auto">
                        <button class="btn w-100 btn-EasternBlue" type="submit">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
