import React from "react";
import Welcome from "../components/Welcome";
import Carousel from "../components/Carousel";
import Category from "../components/Category";

export default function Home() {
  return (
    <div>
      <Welcome />
      <Carousel />
      <Category />
    </div>
  );
}
