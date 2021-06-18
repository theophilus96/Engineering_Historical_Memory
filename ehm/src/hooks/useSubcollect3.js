import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useSubcollect3 = (collection) => {
  const [items, setItems] = useState([]);
  const [items4, setItems4] = useState([]);

  const fetchAllSub = async () => {
    const categoryData = projectFirestore.collection(collection);
    const data = await categoryData.get();
    let allitems = [];
    data.docs.forEach((doc) => {
      categoryData
        .doc(doc.id)
        .collection("Article")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((ArtDoc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(ArtDoc.id, " => ", ArtDoc.data());

            allitems.push({ ...ArtDoc.data(), id: ArtDoc.id });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    });
    setItems4(allitems);
  };

  useEffect(() => {
    const unsub = projectFirestore.collection(collection).onSnapshot((snap) => {
      let documents = [];
      snap.forEach((doc) => {
        projectFirestore
          .collection(collection)
          .doc(doc.id)
          .collection("Article")
          .onSnapshot((snap) => {
            //querySnapshot is "iteratable" itself
            snap.forEach((ArtDoc) => {
              //userDoc contains all metadata of Firestore object, such as reference and id
              // console.dir(ArtDoc);
              documents.push({ ...ArtDoc.data(), id: ArtDoc.id });
            });
          });
      });
      setItems(documents);
    });

    fetchAllSub();

    return () => unsub();

    // this is a cleanup function that react will run when
    // a component using the hook unmounts
  }, [collection]);

  return { items, items4 };
};

export default useSubcollect3;
