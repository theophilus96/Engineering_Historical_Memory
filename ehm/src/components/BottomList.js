import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectFirestore } from "../firebase/config";
import useFirestore from "../hooks/useFirestore";
import useSubcollect from "../hooks/useSubcollect";

export default function BottomList() {
  const [items, setItems] = useState([]);

  // const { docs } = useFirestore("category");
  const { docs } = useSubcollect("category");

  // console.log("use sub collect ", docs);

  const MapsofAfroEurasia = useFirestore(
    "category/qujoO8JON704I5cm5WYn/Article"
  ).docs;
  const Paint = useFirestore("category/smgggzT906j7oJaPGjTP/Article").docs;

  // console.log(MapsofAfroEurasia);
  // console.log(Paint);

  const documentID = [];
  //Also a good practice to separate reference instance

  // useEffect(() => {
  //   const Catdocument = projectFirestore
  //     .collection("category")
  //     .onSnapshot((querySnapshot) => {
  //       let allItems = [];
  //       //querySnapshot is "iteratable" itself
  //       querySnapshot.forEach((CatDoc) => {
  //         //userDoc contains all metadata of Firestore object, such as reference and id
  //         //   console.log("category ID", CatDoc.id);
  //         projectFirestore
  //           .collection("category")
  //           .doc(CatDoc.id)
  //           .collection("Article")
  //           .get()
  //           .then((querySnapshot) => {
  //             //querySnapshot is "iteratable" itself
  //             querySnapshot.forEach((ArtDoc) => {
  //               //userDoc contains all metadata of Firestore object, such as reference and id
  //               // console.dir(ArtDoc);
  //               allItems.push({ ...ArtDoc.data(), id: ArtDoc.id });
  //             });
  //           });
  //       });
  //       setItems(allItems);
  //     });

  //   return () => Catdocument();
  // }, []);
  //Get them

  useEffect(() => {
    (async () => {
      await projectFirestore
        .collection("category")
        .get()
        .then((querySnapshot) => {
          let allItems = [];
          querySnapshot.forEach((CatDoc) => {
            console.log(CatDoc.id, " => ", CatDoc.data());
            console.log(
              CatDoc.id,
              " => ",
              projectFirestore
                .collection("category")
                .doc(CatDoc.id)
                .collection("Article")
                .get()
                .then((querySnapshot) => {
                  const data = querySnapshot.docs.map((ArtDoc) => {
                    return ArtDoc.data();
                  });
                  console.log("data =>", data);
                  allItems.push(data);
                })
            );
          });
          setItems(allItems);
        });
    })();
  }, []);

  console.log("type", typeof items);
  console.log("items array", items);
  console.log("documentID[0] ", items[0]);
  console.log("type of documentID[0]", typeof items[0]);

  //   for (const x in documentID) {
  //     console.log("x", x);
  //   }

  // items.forEach(myFunction);

  // function myFunction(value, index, array) {
  //   console.log(value);
  //   console.log(index);
  //   console.log(array);
  // }

  // items.map(function (element, index, array) {
  //   console.log("element ", element);
  //   console.log("index ", index);
  //   console.log("array ", array);
  //   return element;
  // });

  // docs.map((doc) => {
  //   console.log("docs ID in items", doc.id);
  //   console.log("docs name in items", doc.name);
  // });

  items.map((doc) => {
    console.log("items ID in items", doc.id);
    console.log("items name in items", doc.name);
  });

  return (
    <section className="pt-7 pt-md-10 bg-light">
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
                    <a
                      className="col-12 col-md-6 order-md-2 bg-cover card-img-end"
                      style={{
                        backgroundImage: `url(${doc.image})`,
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
                        <h3>{doc.name}</h3>

                        <p className="mb-0 text-muted">{doc.description}</p>
                      </a>

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
