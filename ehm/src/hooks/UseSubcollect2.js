import React, { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

export default function UseSubcollect2() {
  const [categoryData, setCategoryData] = useState([]);
  const [article, setArticle] = useState([]);

  const unsub = () => {
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
        setCategoryData(fetchCategory)
      })
      .catch((error) => {
        console.log(error);
      });

    // return Promise.all(fetchCategory)
  };

  useEffect(() => {
    unsub();
  }, []);

  return { categoryData, article };
}
