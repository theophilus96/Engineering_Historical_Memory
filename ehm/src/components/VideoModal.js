import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { Modal } from "react-responsive-modal";

export default function VideoModal() {
  const [open, setOpen] = React.useState(false);

  const myRef = React.useRef(null);

  useEffect(() => setOpen(true), []);

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
            maxWidth: "unset",
          },
          overlay: {
            background: "rgba(0, 0, 0, 0.5)",
          },
          closeButton: {
            background: "black",
          },
        }}
      >
        <ReactPlayer url="https://vimeo.com/291715535" playing muted />
      </Modal>
    </>
  );
}
