import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
import { useStateValue } from "../state/StateProvider";
import UseSubcollect2 from "../hooks/UseSubcollect2";
import useFirestore from "../hooks/useFirestore";

export default function ArticleAdmin() {
  const { docs } = useFirestore("category");
  const [{ user }, dispatch] = useStateValue();
  const [userName, setUserName] = useState("");
  const [checked, setChecked] = useState(false);
  const [navList, setNavList] = useState(null);
  const [category, setCategory] = useState("");
  const [articleName, setArticleName] = useState("");
  const [articleDescription, setArticleDescription] = useState("");
  const [articleCitation, setArticleCitation] = useState("");
  const [articleLink, setArticleLink] = useState("");

  //storage
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");
  const imageInputRef = useRef();

  const { article, categoryData } = UseSubcollect2();
  var person = auth.currentUser;

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function onMouseEnter(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  useEffect(() => {
    if (person != null) {
      setUserName(person.displayName);
    }

    let response = () =>
      categoryData &&
      categoryData.map((doc) => (
        <div className="accordion-item" key={doc.id}>
          {/* <Link
            className="dropdown-link dropdown-toggle"
            data-bs-toggle="dropdown"
            to="#"
            onClick={onMouseEnter}
          >
            {doc.name}
          </Link> */}
          <h2 class="accordion-header" id={"flush-heading" + doc.id}>
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#flush-collapse" + doc.id}
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              {doc.name}
            </button>
          </h2>
          <div
            id={"flush-collapse" + doc.id}
            class="accordion-collapse collapse"
            aria-labelledby={"flush-heading" + doc.id}
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body">
              {Array.isArray(doc.array) && doc.array.length === 0 ? (
                ""
              ) : (
                <div className="list-group">
                  {doc.array &&
                    doc.array.map((articleDoc) => {
                      return (
                        <div class="list-group-item" key={articleDoc.id}>
                          <div class="row align-items-center">
                            <div class="col-auto">
                              <div class="avatar avatar-xl">
                                <img
                                  class="avatar-img rounded-circle"
                                  src={
                                    articleDoc.image
                                      ? articleDoc.image
                                      : "https://jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png"
                                  }
                                  alt="..."
                                />
                              </div>
                            </div>
                            <div class="col-10 ms-n5">
                              <p class="mb-0">{articleDoc.name}</p>

                              <a
                                class="d-block small text-gray-700"
                                href="mailto:"
                              >
                                Description: {articleDoc.description}
                              </a>

                              <a
                                class="d-block small text-gray-700"
                                href="mailto:"
                              >
                                Citation: {articleDoc.citation}
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
      ));
    setNavList(response);
  }, [person, categoryData.length]);

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
                                    src={
                                      file
                                        ? URL.createObjectURL(file)
                                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSalEj8tnk7AywBgsPErBHh2_8vFwc2yZty-mqmzy3t6pP_lN3WnokkH8ghoeFPZ13cs3g&usqp=CAU"
                                    }
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
                                <input
                                  type="file"
                                  class="form-control"
                                  onChange={handleChange}
                                  ref={imageInputRef}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 mb-4">
                        <div class="list-group ">
                          <div class="list-group-item">
                            <div class="row align-items-center">
                              <div class="col">
                                <p class="mb-0">Status</p>

                                <small class="text-gray-700">
                                  {checked ? "Active" : "Inactive"}
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

                      <div className="col-12 mb-6">
                        <div class="list-group ">
                          <div class="list-group-item">
                            <div class="row align-items-center">
                              <label className="form-label" for="applyEmail">
                                Category
                              </label>
                              {/* <input
                          className="form-control"
                          placeholder="Company"
                          value={company}
                          name="company"
                          onChange={(e) => setCompany(e.currentTarget.value)}
                          type="text"
                        ></input> */}
                              <div class="dropdown me-1 mb-1">
                                <button
                                  class="btn btn-EasternBlue dropdown-toggle"
                                  type="button"
                                  id="dropdownMenuButtonTwo"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  {category ? category : "Select Category"}
                                </button>
                                <div
                                  class="dropdown-menu"
                                  aria-labelledby="dropdownMenuButtonTwo"
                                  style={{ margin: 0 }}
                                >
                                  {docs &&
                                    docs.map((doc) => (
                                      <a
                                        class="dropdown-item"
                                        href="#!"
                                        onClick={(e) => {
                                          setCategory(doc.id);
                                        }}
                                        value={doc.name}
                                      >
                                        {doc.name}
                                      </a>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-12 col-md-auto">
                        <button class="btn w-100 btn-EasternBlue" type="submit">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="card card-bleed shadow-light-lg mb-6">
                <div class="card card-bleed shadow-light-lg mb-6">
                  <div class="card-header">
                    <h4 class="mb-0">Categories and Articles</h4>
                  </div>
                  <ul
                    className="accordion accordion-flush"
                    aria-labelledby="navbarAccount"
                  >
                    {navList}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
