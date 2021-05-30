import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { projectFirestore } from "../firebase/config";

export default function ListWelcome(doc) {
  const [categoryData, setacategoryData] = useState("");
  const { CatId } = useParams();
  console.log("id = ", CatId);
  console.log("doc = ", doc);

  var docRef = projectFirestore.collection("category").doc(CatId);

  useEffect(() => {
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          setacategoryData(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  return (
    <div>
      <section
        data-jarallax
        data-speed=".8"
        className="py-10 py-md-14 overlay overlay-black overlay-60 bg-cover jarallax"
        style={{ backgroundImage: `url(${categoryData.image})` }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-7 text-center">
              <h1 className="display-2 fw-bold text-white">
                {categoryData.name}
              </h1>

              <p className="lead mb-0 text-white-75">Some words on {categoryData.name}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ListShape() {
  return (
    <div>
      <div className="position-relative">
        <div className="shape shape-bottom shape-fluid-x text-light">
          <svg
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z"
              fill="currentColor"
            />
          </svg>{" "}
        </div>
      </div>
    </div>
  );
}
