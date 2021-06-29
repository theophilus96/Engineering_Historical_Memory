import React, { useEffect, useState, useRef } from "react";
import { auth } from "../firebase/config";
import { useStateValue } from "../state/StateProvider";
import { Link } from "react-router-dom";
import useFirestore from "../hooks/useFirestore";
import { projectStorage, projectFirestore } from "../firebase/config";

export default function CategoryAdmin() {
  const [{ user }, dispatch] = useStateValue();
  const [userName, setUserName] = useState("");
  const { docs } = useFirestore("category");

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  //storage
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");
  //If you pass a ref object to React, React will set its current property to the corresponding DOM node whenever that node changes.
  const imageInputRef = useRef();

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  var person = auth.currentUser;

  useEffect(() => {
    if (person != null) {
      setUserName(person.displayName);
    }
  }, [person]);

  const onSubmit = (e) => {
    /* 
    preventDefault is important because it
    prevents the whole page from reloading
    */
    e.preventDefault();
    //remove spaces in the category name
    let str = categoryName.replace(/\s/g, "");

    const storageRef = projectStorage.ref(`images/${str}/` + file.name);
    const collectionRef = projectFirestore.collection("category");

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
        const newCategoryAdded = await collectionRef.add({
          name: categoryName,
          description: categoryDescription,
          image: url,
        });
        console.log("the new category: ", newCategoryAdded);
        console.log("new category: id: ", newCategoryAdded.id);

        // collectionRef.doc(newCategoryAdded.id).collection("project").add({
        //   image: url,
        // });

        setCategoryName("");
        setCategoryDescription("");
        setFile(null);
        setURL("");
        if (imageInputRef) imageInputRef.current.value = null;
      }
    );
  };

  const deleteItem = (id) => {
    projectFirestore
      .collection("category")
      .doc(id)
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
                    <h6 className="fw-bold text-uppercase mb-3">Applications</h6>

                    <ul className="card-list list text-gray-700 mb-6">
                      <li className="list-item active">
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
                  <h4 className="mb-0">Add Category</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={onSubmit}>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label className="form-label" htmlFor="name">
                            Name
                          </label>
                          <input
                            className="form-control"
                            id="Category Name"
                            type="text"
                            placeholder="Category name"
                            value={categoryName}
                            name="Category Name"
                            // onChange takes the event and set it to whatever
                            // is currently in the input. 'e' is equal to the event
                            // happening. currentTarget.value is what is inputted

                            onChange={(e) =>
                              setCategoryName(e.currentTarget.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label className="form-label">Description</label>
                          <div data-quill='{"placeholder": "Quill WYSIWYG"}'></div>
                          <input
                            className="form-control"
                            placeholder="Category description"
                            name="Category Description"
                            type="text"
                            value={categoryDescription}
                            onChange={(e) =>
                              setCategoryDescription(e.currentTarget.value)
                            }
                          ></input>
                        </div>
                      </div>
                      <div className="col-12 mb-6">
                        {/* <div className="list-group list-group-flush"> */}
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
                              {/* <button className="btn btn-xs w-100 mt-5 mt-md-0 btn-EasternBlue ">
                                Upload
                              </button> */}
                              <input
                                type="file"
                                className="form-control"
                                onChange={handleChange}
                                ref={imageInputRef}
                              />
                            </div>
                          </div>
                        </div>
                        {/* </div> */}
                      </div>
                      <div className="col-12 col-md-auto">
                        <button
                          className="btn w-100 btn-EasternBlue"
                          type="submit"
                          disabled={!file}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="card card-bleed shadow-light-lg">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h4 className="mb-0">All Categories</h4>
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
                                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZhrgKO2lgbAtjt5RI_wnpPJQXMQ83S5osa0aVgxoSQQBiK69eX20ViUW2pgAMssDw4hQ&usqp=CAU"
                                  }
                                  alt="..."
                                />
                              </div>
                            </div>
                            <div className="col-6 ms-n5">
                              <p className="mb-0">{doc.name}</p>
                              <p className="d-block small text-gray-700">
                                {doc.description}
                              </p>

                              {/* <a
                                className="d-block small text-truncate text-gray-700"
                                href="mailto:ab.hadley@company.com"
                              >
                                {doc.description}
                              </a> */}
                            </div>
                            <div className="col-auto ms-auto">
                              {user ? (
                                <button
                                  onClick={() => {
                                    deleteItem(doc.id);
                                  }}
                                  className="btn btn-xs btn-rounded-circle btn-danger"
                                >
                                  <i className="fe fe-x"></i>
                                </button>
                              ) : null}
                              {/* <select
                                className="form-select form-select-xs"
                                data-choices
                              >
                                <option selected>Admin</option>
                                <option>Staff</option>
                                <option>Custom</option>
                              </select> */}
                            </div>
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
