import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { projectFirestore } from "../firebase/config";

export default function ListArticles(doc) {
  const [articleData, setarticleData] = useState("");
  const { id } = useParams();
  console.log("id = ", id);
  console.log("doc = ", doc);

  var docRef = projectFirestore.collection("category").doc(id);

  useEffect(() => {
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          setarticleData(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  console.log("articleData = ", articleData);
  return (
    <section className="pt-7 pt-md-10">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card card-row shadow-light-lg mb-6 lift lift-lg">
              <div className="row gx-0">
                <div className="col-12">
                  <span className="badge rounded-pill bg-light badge-float badge-float-inside">
                    <span className="h6 text-uppercase">Featured</span>
                  </span>
                </div>
                <a
                  className="col-12 col-md-6 order-md-2 bg-cover card-img-end"
                  style={{
                    backgroundImage: `url(assets/img/photos/photo-27.jpg)`,
                  }}
                  href="#!"
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
                </a>
                <div className="col-12 col-md-6 order-md-1">
                  <a className="card-body" href="#!">
                    <h3>Travel Can Keep You Creatively Inspired.</h3>

                    <p className="mb-0 text-muted">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Duis nec condimentum quam. Fusce pellentesque faucibus
                      lorem at viverra. Integer at feugiat odio. In placerat
                      euismod risus proin erat purus.
                    </p>
                  </a>

                  <a className="card-meta" href="#!">
                    <hr className="card-meta-divider" />

                    <div className="avatar avatar-sm me-2">
                      <img
                        src="assets/img/avatars/avatar-1.jpg"
                        alt="..."
                        className="avatar-img rounded-circle"
                      />
                    </div>

                    <h6 className="text-uppercase text-muted me-2 mb-0">
                      Ab Hadley
                    </h6>

                    <p className="h6 text-uppercase text-muted mb-0 ms-auto">
                      <time datetime="2019-05-02">May 02</time>
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
