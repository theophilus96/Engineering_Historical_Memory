import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectFirestore } from "../firebase/config";
import useFirestore from "../hooks/useFirestore";

export default function BottomList() {

  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");

  const { docs } = useFirestore("category");
  console.log(docs);

  const MapsofAfroEurasia = useFirestore(
    "category/qujoO8JON704I5cm5WYn/Article"
  ).docs;
  const Paint = useFirestore("category/smgggzT906j7oJaPGjTP/Article").docs;

  console.log(MapsofAfroEurasia);
  console.log(Paint);

  const documentID = [];
  //Also a good practice to separate reference instance
  var Catdocument = projectFirestore.collection("category");

  //Get them
  Catdocument.get().then((querySnapshot) => {
    //querySnapshot is "iteratable" itself
    querySnapshot.forEach((CatDoc) => {
      //userDoc contains all metadata of Firestore object, such as reference and id
      //   console.log("category ID", CatDoc.id);

      Catdocument.doc(CatDoc.id)
        .collection("Article")
        .get()
        .then((querySnapshot) => {
          //querySnapshot is "iteratable" itself
          querySnapshot.forEach((ArtDoc) => {
            //userDoc contains all metadata of Firestore object, such as reference and id
            // console.log("Article ID", ArtDoc.id);
            var userDocData = {};
            //If you want to get doc data
            userDocData = ArtDoc.data();
            // console.dir(userDocData);
            documentID[documentID.length] = userDocData;
            setItems([
              ...items,
              userDocData
            ]);
            // documentID.push({
            //   id: ArtDoc.id,
            //   name: ArtDoc.name,
            //   image: ArtDoc.image,
            // });
          });
        });
      //If you want to get doc data
      //   var userDocData = CatDoc.data();
      //   console.dir(userDocData);
    });
  });

  //   for (const x in docs) {
  //     const y = projectFirestore
  //       .collection("category")
  //       .doc(x.id)
  //       .collection("Article")
  //       .get();
  //     console.log("y", y);
  //   }

  console.log("type", typeof documentID);
  //   for (const x in documentID) {
  //     console.log("x", x);
  //   }

  items.forEach(myFunction);

  function myFunction(value, index, array) {
    console.log(value);
    console.log(index);
    console.log(array);
  }
  console.log("document ID ARRAY", documentID);

  documentID.map(function (element, index, array) {
    console.log("element", element);
    console.log(index);
    console.log(array);
    return element;
  });

  documentID.map((doc) => console.log("doc data in documentID", doc.data()));

  //   const [articleData, setarticleData] = useState("");

  //   var docRef = projectFirestore.collection("blog").doc(id);

  //   useEffect(() => {
  //     docRef
  //       .get()
  //       .then((doc) => {
  //         if (doc.exists) {
  //           console.log("Document data:", doc.data());
  //           setarticleData(doc.data());
  //         } else {
  //           // doc.data() will be undefined in this case
  //           console.log("No such document!");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("Error getting document:", error);
  //       });
  //   }, []);

  //   console.log("articleData = ", articleData);

  useEffect(() => {
    async function getMarkers() {
      //   const documents = [];
      //   docs.forEach((doc) => {
      //     documents[doc.id] = doc.data();
      //   });
      //   console.log("documents", documents);
      //   const markers = [];
      //   await projectFirestore
      //     .collection("category")
      //     .get()
      //     .then((querySnapshot) => {
      //       querySnapshot.docs.forEach((doc) => {
      //         markers.push(doc.data());
      //       });
      //     });
      //   console.log("markers", markers);
      //   for (const x in markers) {
      //     const y = projectFirestore
      //       .collection("category")
      //       .doc(x.id)
      //       .collection("Article")
      //       .get();
      //     console.log("y", y);
      //   }
      //   return documents;
    }
    // Get reference to all of the documents
  }, []);

  // "category/qujoO8JON704I5cm5WYn/Article"
  // const [articleList, setarticleList] = useState("");
  // const { id } = useParams();
  // console.log("id = ", id);
  // console.log("doc = ", doc);

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
            {MapsofAfroEurasia &&
              MapsofAfroEurasia.map((doc) => (
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
