import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { auth, projectFirestore, projectStorage } from "../firebase/config";
import { useStateValue } from "../state/StateProvider";
import UseSubcollect2 from "../hooks/UseSubcollect2";
import useFirestore from "../hooks/useFirestore";

export default function ArticleAdmin() {
  const { docs } = useFirestore("category");
  const [{ user }, dispatch] = useStateValue();
  const [userName, setUserName] = useState("");
  const [checked, setChecked] = useState(false);
  const [navList, setNavList] = useState(null);
  const [categoryID, setCategoryID] = useState("");
  const [categoryName, setCategoryName] = useState("");

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
        <div
          className="accordion-item panel-turquoise"
          key={doc.id}
        >
          <h2 className="accordion-header" id={"flush-heading" + doc.id}>
            <button
              className="accordion-button collapsed"
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
            className="accordion-collapse collapse"
            aria-labelledby={"flush-heading" + doc.id}
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              {Array.isArray(doc.array) && doc.array.length === 0 ? (
                ""
              ) : (
                <div className="list-group">
                  {doc.array &&
                    doc.array.map((articleDoc) => {
                      return (
                        <div className="list-group-item" key={articleDoc.id}>
                          <div className="row align-items-center">
                            <div className="col-auto">
                              <div
                                className={
                                  "avatar avatar-xxl " +
                                  (articleDoc.active
                                    ? "avatar-online"
                                    : "avatar-offline")
                                }
                              >
                                <Link
                                  to={`/category/${doc.id}/article/${articleDoc.id}`}
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src={
                                      articleDoc.image
                                        ? articleDoc.image
                                        : "https://jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png"
                                    }
                                    alt="..."
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="col-8 ms-n5">
                              <p className="mb-0">{articleDoc.name}</p>
                              <p className="d-block small text-gray-700">
                                Description: {articleDoc.description}
                              </p>
                              <p
                                className="d-block small text-gray-700"
                                href="mailto:"
                              >
                                Citation: {articleDoc.citation}
                              </p>
                            </div>

                            <div className="col-auto ms-auto">
                              {user ? (
                                <button
                                  onClick={() => {
                                    deleteItem(doc.id, articleDoc.id);
                                  }}
                                  className="btn btn-xs btn-rounded-circle btn-danger"
                                >
                                  <i className="fe fe-x"></i>
                                </button>
                              ) : null}
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

  const onSubmit = (e) => {
    /* 
    preventDefault is important because it
    prevents the whole page from reloading
    */
    e.preventDefault();
    //remove spaces in the category name
    let categoryString = categoryName.replace(/\s/g, "");
    let articleString = articleName.replace(/\s/g, "");

    const storageRef = projectStorage.ref(
      `images/${categoryString}/${articleString}/` + file.name
    );
    const collectionRef = projectFirestore
      .collection("category")
      .doc(categoryID)
      .collection("Article");

    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        console.log("progress bar", percentage);
      },
      (err) => {
        console.log(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        //   const createdAt = timestamp();
        const newArticleAdded = await collectionRef.add({
          name: articleName,
          description: articleDescription,
          citation: articleCitation,
          link: articleLink,
          image: url,
          active: checked,
        });
        console.log("New article: ", newArticleAdded);

        // collectionRef.doc(newCategoryAdded.id).collection("project").add({
        //   image: url,
        // });
        setArticleName("");
        setArticleDescription("");
        setArticleCitation("");
        setArticleLink("");
        setChecked(false);
        setCategoryName("");
        setFile(null);
        setURL("");
        if (imageInputRef) imageInputRef.current.value = null;
      }
    );
  };

  const deleteItem = (catID, articleID) => {
    projectFirestore
      .collection("category")
      .doc(catID)
      .collection("Article")
      .doc(articleID)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

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
                    <h6 className="fw-bold text-uppercase mb-3">
                      Applications
                    </h6>

                    <ul className="card-list list text-gray-700 mb-6">
                      <li className="list-item">
                        <Link
                          className="list-link text-reset"
                          to="/admin/category"
                        >
                          Category
                        </Link>
                      </li>
                      <li className="list-item active">
                        <Link
                          className="list-link text-reset"
                          to="/admin/article"
                        >
                          Articles
                        </Link>
                      </li>
                    </ul>

                    <h6 className="fw-bold text-uppercase mb-3">Others</h6>

                    <ul className="card-list list text-gray-700 mb-0">
                      <li className="list-item">
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
              <div className="card card-bleed shadow-light-lg mb-6">
                <div className="card-header">
                  <h4 className="mb-0">Add Article</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={onSubmit}>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label className="form-label" for="name">
                            Name
                          </label>
                          <input
                            className="form-control"
                            id="name"
                            type="text"
                            placeholder="Article name"
                            value={articleName}
                            name="Article Name"
                            onChange={(e) =>
                              setArticleName(e.currentTarget.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label className="form-label">Description</label>
                          <input
                            className="form-control"
                            placeholder="Article description"
                            type="text"
                            rows="5"
                            value={articleDescription}
                            name="Article Description"
                            onChange={(e) =>
                              setArticleDescription(e.currentTarget.value)
                            }
                          ></input>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label className="form-label">Citation</label>
                          <input
                            className="form-control"
                            placeholder="Cite the source of this article ..."
                            type="text"
                            rows="5"
                            value={articleCitation}
                            name="Article citation"
                            onChange={(e) =>
                              setArticleCitation(e.currentTarget.value)
                            }
                          ></input>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label className="form-label">Link</label>
                          <input
                            className="form-control"
                            placeholder="https://engineeringhistoricalmemory.com/something.php ..."
                            type="text"
                            rows="5"
                            value={articleLink}
                            name="Article link"
                            onChange={(e) =>
                              setArticleLink(e.currentTarget.value)
                            }
                          ></input>
                        </div>
                      </div>
                      <div className="col-12 mb-4">
                        <div className="list-group">
                          <div className="list-group-item">
                            <div className="row align-items-center">
                              <div className="col-auto">
                                <div className="avatar avatar-xl">
                                  <img
                                    className="avatar-img rounded-circle"
                                    src={
                                      file
                                        ? URL.createObjectURL(file)
                                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSalEj8tnk7AywBgsPErBHh2_8vFwc2yZty-mqmzy3t6pP_lN3WnokkH8ghoeFPZ13cs3g&usqp=CAU"
                                    }
                                    alt="..."
                                  />
                                </div>
                              </div>
                              <div className="col ms-n5">
                                <p className="mb-0">Category image</p>

                                <small className="text-gray-700">
                                  PNG or JPG no larger than 1000px
                                </small>
                              </div>
                              <div className="col-12 col-md-auto">
                                <input
                                  type="file"
                                  className="form-control"
                                  onChange={handleChange}
                                  ref={imageInputRef}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mb-4">
                        <div className="list-group ">
                          <div className="list-group-item">
                            <div className="row align-items-center">
                              <div className="col">
                                <p className="mb-0">Status</p>

                                <small className="text-gray-700">
                                  {checked ? "Active" : "Inactive"}
                                </small>
                              </div>
                              <div className="col-auto">
                                <div className="form-check form-switch">
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
                        <div className="list-group ">
                          <div className="list-group-item">
                            <div className="row align-items-center">
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
                              <div className="dropdown me-1 mb-1">
                                <button
                                  className="btn btn-EasternBlue dropdown-toggle"
                                  type="button"
                                  id="dropdownMenuButtonTwo"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  {categoryName
                                    ? categoryName
                                    : "Select Category"}
                                </button>
                                <div
                                  className="dropdown-menu"
                                  aria-labelledby="dropdownMenuButtonTwo"
                                  style={{ margin: 0 }}
                                >
                                  {docs &&
                                    docs.map((doc) => (
                                      <a
                                        className="dropdown-item"
                                        href="#!"
                                        onClick={(e) => {
                                          setCategoryID(doc.id);
                                          setCategoryName(doc.name);
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

                      <div className="col-12 col-md-auto">
                        <button
                          className="btn w-100 btn-EasternBlue"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="card card-bleed shadow-light-lg mb-6">
                <div className="card card-bleed shadow-light-lg mb-6">
                  <div className="card-header">
                    <h4 className="mb-0">Categories and Articles</h4>
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
