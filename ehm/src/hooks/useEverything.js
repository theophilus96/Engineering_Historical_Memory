import React, { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

export default function useEverything() {
  useEffect(() => {
    async function getMarkers() {
      const markers = [];
      await projectFirestore
        .collection("events")
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            markers.push(doc.data());
          });
        });
      return markers;
    }
  });
}
