import React, { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

export default function UseSubcollect2() {
  const [items2, setItems2] = useState([]);
  const [items3, setItems3] = useState([]);

  useEffect(() => {
    (async () => {
      await projectFirestore
        .collection("category")
        .get()
        .then((querySnapshot) => {
          let allItems2 = [];
          let allItems3 = [];

          querySnapshot.forEach((CatDoc) => {
            // console.log(CatDoc.id, " => ", CatDoc.data());
            projectFirestore
              .collection("category")
              .doc(CatDoc.id)
              .collection("Article")
              .get()
              .then((querySnapshot) => {
                const data = querySnapshot.docs.map((ArtDoc) => {
                  allItems2.push({ ...ArtDoc.data(), id: ArtDoc.id });
                  return ArtDoc.data();
                });
                // console.log("data =>", data);
                allItems3.push(data);
              });
          });
          setItems2(allItems2);
          setItems3(allItems3);
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        });
    })();
  }, []);

  return { items2, items3 };
}
