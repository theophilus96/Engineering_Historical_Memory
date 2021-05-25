import React, { useState } from "react";
import Welcome from "../components/Welcome";
import Carousel from "../components/Carousel";
import Category from "../components/Category";
import VideoModal from "../components/VideoModal";
import VModal from "../components/VModal";
import BottomList from "../components/BottomList";
export default function Home() {
  const [isModalOpen, toggleModal] = useState(false);

  return (
    <div>
      <Welcome />
      <Carousel />
      {/* <Category /> */}
      <VideoModal />
      <BottomList />
    </div>
  );
}
