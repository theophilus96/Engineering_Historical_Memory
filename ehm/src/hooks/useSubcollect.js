import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useSubcollect = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    // const Catdocument = projectFirestore.collection(collection);

    // Catdocument.get().then((querySnapshot) => {
    //   let allItems = [];
    //   //querySnapshot is "iteratable" itself
    //   querySnapshot.forEach((CatDoc) => {
    //     //userDoc contains all metadata of Firestore object, such as reference and id
    //     //   console.log("category ID", CatDoc.id);
    //     Catdocument.doc(CatDoc.id)
    //       .collection("Article")
    //       .get()
    //       .then((querySnapshot) => {
    //         //querySnapshot is "iteratable" itself
    //         querySnapshot.forEach((ArtDoc) => {
    //           //userDoc contains all metadata of Firestore object, such as reference and id
    //           // console.dir(ArtDoc);
    //           allItems.push({ ...ArtDoc.data(), id: ArtDoc.id });
    //         });
    //       });
    //   });
    //   setDocs(allItems);
    // });

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
      setDocs(documents);
    });

    return () => unsub();

    // return () => Catdocument();
    // this is a cleanup function that react will run when
    // a component using the hook unmounts
  }, [collection]);

  return { docs };
};

export default useSubcollect;
