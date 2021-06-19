import React, { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

export default function UseSubcollect2() {
  const [categoryData, setCategoryData] = useState([]);
  const [article, setArticle] = useState([]);

  useEffect(() => {
    // (async () => {
    //   await projectFirestore
    //     .collection("category")
    //     .get()
    //     .then((querySnapshot) => {
    //       let allItems2 = [];
    //       let allItems3 = [];

    //       querySnapshot.forEach((CatDoc) => {
    //         // console.log(CatDoc.id, " => ", CatDoc.data());
    //         projectFirestore
    //           .collection("category")
    //           .doc(CatDoc.id)
    //           .collection("Article")
    //           .get()
    //           .then((querySnapshot) => {
    //             const data = querySnapshot.docs.map((ArtDoc) => {
    //               allItems2.push({ ...ArtDoc.data(), id: ArtDoc.id });
    //               return ArtDoc.data();
    //             });
    //             // console.log("data =>", data);
    //             allItems3.push(data);
    //           });
    //       });
    //       setItems2(allItems2);
    //       setItems3(allItems3);
    //     })
    //     .catch((err) => {
    //       console.log("Error getting documents", err);
    //     });
    // })();

    projectFirestore
      .collection("category")
      .get()
      .then((response) => {
        const fetchCategory = [];
        response.docs.forEach((categoryDoc) => {
          projectFirestore
            .collection("category")
            .doc(categoryDoc.id)
            .collection("Article")
            .get()
            .then((response) => {
              const allitems = [];
              response.forEach((document) => {
                const fetchedArticle = {
                  id: document.id,
                  ...document.data(),
                  CategoryID: categoryDoc.id,
                };
                allitems.push(fetchedArticle);
                // allitems2.push(fetchedArticle);
              });

              setArticle(allitems);

              const category = {
                id: categoryDoc.id,
                ...categoryDoc.data(),
                array: allitems,
              };
              fetchCategory.push(category);
              
            })
            .catch((error) => {
              console.log("error", error);
            });
        });

        setCategoryData(fetchCategory);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return { categoryData, article };
}
