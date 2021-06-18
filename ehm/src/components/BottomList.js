import React from "react";
import UseSubcollect3 from "../hooks/UseSubcollect3";
import { Link } from "react-router-dom";

export default function BottomList() {
  const { items } = UseSubcollect3();

  // useEffect(() => {
  //   const categoryData = (id) => {
  //     projectFirestore
  //       .collection("category")
  //       .doc(id)
  //       .collection("Article")
  //       .get()
  //       .then((response) => {
  //         const allitems5 = [];
  //         response.forEach((document) => {
  //           const fetchedArticle = {
  //             id: document.id,
  //             ...document.data(),
  //           };
  //           allitems5.push(fetchedArticle);
  //         });
  //         setItems5(allitems5);
  //       })
  //       .catch((error) => {
  //         console.log("error", error);
  //       });
  //   };

  //   projectFirestore
  //     .collection("category")
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((CatDoc) => {
  //         categoryData(CatDoc.id);
  //       });
  //     });
  // }, []);

  console.log("type items", typeof items);
  console.log("items array", items);

  return (
    <section className="pt-7 pt-md-10 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {items &&
              items.map((doc) => (
                <div
                  className={
                    "card card-row shadow-light-lg mb-6 lift lift-lg " +
                    (doc.active ? "" : "special-card")
                  }
                  key={doc.id}
                >
                  <div className="row gx-0">
                    <div className="col-12">
                      {/* <span className="badge rounded-pill bg-light badge-float badge-float-inside">
                          <span className="h6 text-uppercase">Featured</span>
                        </span> */}
                    </div>

                    <Link
                      to={doc.active ? `${doc.CategoryID}` : "#"}
                      className="col-12 col-md-6 order-md-2 bg-cover card-img-end"
                      style={{
                        backgroundImage: `url(${doc.image})`,
                      }}
                    >
                      <img
                        src="assets/img/photos/photo-27.jpg"
                        alt="..."
                        className="img-fluid d-md-none invisible"
                      />

                      <div
                        className={
                          "shape shape-start shape-fluid-y " +
                          (doc.active ? "text-white" : "text-special-opacity") +
                          " d-none d-md-block"
                        }
                      >
                        <svg
                          viewBox="0 0 112 690"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 0h62.759v172C38.62 384 112 517 112 517v173H0V0z"
                            fill="currentColor"
                          />
                        </svg>{" "}
                      </div>
                    </Link>
                    <div className="col-12 col-md-6 order-md-1">
                      <Link
                        className="card-body"
                        to={doc.active ? `${doc.CategoryID}` : "#"}
                      >
                        <h3>{doc.name}</h3>

                        <p className="mb-0 text-muted">{doc.description}</p>
                      </Link>

                      <a className="card-meta" href="#!">
                        <hr className="card-meta-divider" />

                        {/* <div className="avatar avatar-sm me-2">
                            <img
                              src="assets/img/avatars/avatar-1.jpg"
                              alt="..."
                              className="avatar-img rounded-circle"
                            />
                          </div> */}

                        <h6 className="text-uppercase text-muted me-2 mb-0">
                          {doc.citation}
                        </h6>

                        {/* <p className="h6 text-uppercase text-muted mb-0 ms-auto">
                            <time datetime="2019-05-02">May 02</time>
                          </p> */}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
