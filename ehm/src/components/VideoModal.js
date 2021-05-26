import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { Modal } from "react-responsive-modal";

export default function VideoModal() {
  const [open, setOpen] = React.useState(false);

  const myRef = React.useRef(null);

  useEffect(() => {
    setOpen(true);
    setTimeout(() => setOpen(false), 7000);
  }, []);

  return (
    <>
      <div ref={myRef} />
      {/* <button className="button" onClick={() => setOpen(true)}>
        Open modal
      </button> */}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        container={myRef.current}
        styles={{
          modal: {
            // maxWidth: "unset",
            maxWidth: "1024px",
            // background: "black",
            width: "100%",
          },
          overlay: {
            background: "rgba(0, 0, 0, 0.5)",
          },
          closeButton: {
            background: "gray",
          },
        }}
      >
        <ReactPlayer
          url="https://engineeringhistoricalmemory.com/Images/EHMLogo.mp4"
          playing
          muted
          width="100%"
          height="100%"
        />
      </Modal>
    </>
  );
}
