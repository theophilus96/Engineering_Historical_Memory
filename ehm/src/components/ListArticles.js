import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { projectFirestore } from "../firebase/config";
import useFirestore from "../hooks/useFirestore";
import { Link } from "react-router-dom";

export default function ListArticles(doc) {
  // console.log("doc for list articles", doc);
  const { CatId } = useParams();
  console.log("list category =>  id = ", CatId);
  console.log("list category => doc = ", doc);
  const { docs } = useFirestore("category/" + CatId + "/Article");
  console.log("list category => ", docs);

  // const [articleList, setarticleList] = useState("");

  // var docRef = projectFirestore.collection("category").doc(id);

  // useEffect(() => {
  //   docRef
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         console.log("Document data:", doc.data());
  //         setarticleList(doc.data());
  //       } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Error getting document:", error);
  //     });
  // }, []);

  // console.log("articleData = ", articleList);
  return (
    <section className="pt-7 pt-md-10">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {docs &&
              docs.map((doc) => (
                <div
                  className="card card-row shadow-light-lg mb-6 lift lift-lg"
                  key={doc.id}
                >
                  <div className="row gx-0">
                    <div className="col-12">
                      {/* <span className="badge rounded-pill bg-light badge-float badge-float-inside">
                          <span className="h6 text-uppercase">Featured</span>
                        </span> */}
                    </div>

                    <Link
                      to={`/category/${CatId}/article/${doc.id}`}
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

                      <div className="shape shape-start shape-fluid-y text-white d-none d-md-block">
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
                        to={`/category/${CatId}/article/${doc.id}`}
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
