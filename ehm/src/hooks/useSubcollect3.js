import React, { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

export default function UseSubcollect3() {
  const [items, setItems] = useState([]);
  const [items2, setItems2] = useState([]);

  useEffect(() => {
    // const categoryData = (id) => {
    //   projectFirestore
    //     .collection("category")
    //     .doc(id)
    //     .collection("Article")
    //     .get()
    //     .then((response) => {
    //       const allitems = [];
    //       response.forEach((document) => {
    //         const fetchedArticle = {
    //           id: document.id,
    //           ...document.data(),
    //           CategoryID: id,
    //         };
    //         allitems.push(fetchedArticle);
    //         // allitems2.push(fetchedArticle);
    //       });
    //       setItems(allitems);
    //     })
    //     .catch((error) => {
    //       console.log("error", error);
    //     });
    // };

    // projectFirestore
    //   .collection("category")
    //   .get()
    //   .then((querySnapshot) => {
    //     const allitems2 = [];

    //     querySnapshot.forEach((CatDoc) => {
    //       categoryData(CatDoc.id);
    //     });
    //     setItems2(allitems2);
    //   });

    // return () => categoryData();
    const unsub = projectFirestore
      .collection("category")
      .get()
      .then((querySnapshot) => {
        const allitems2 = [];

        querySnapshot.forEach((CatDoc) => {
          projectFirestore
            .collection("category")
            .doc(CatDoc.id)
            .collection("Article")
            .get()
            .then((response) => {
              const allitems = [];
              response.forEach((document) => {
                const fetchedArticle = {
                  id: document.id,
                  ...document.data(),
                  CategoryID: CatDoc.id,
                };
                allitems.push(fetchedArticle);
                allitems2.push(fetchedArticle);
              });
              setItems(allitems);
            })
            .catch((error) => {
              console.log("error", error);
            });
        });
        setItems2(allitems2);
      });

    return () => unsub();
    // this is a cleanup function that react will run when
    // a component using the hook unmounts
  }, []);

  return { items, items2 };
}
