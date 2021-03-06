import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { Modal } from "react-responsive-modal";
import "../css/reactPlayer.css";

export default function VideoModal() {
  const [open, setOpen] = React.useState(false);

  const myRef = React.useRef(null);

  useEffect(() => {
    setOpen(true);
    setTimeout(() => setOpen(false), 7000);
  }, []);

  const closeIcon = (
    // <svg fill="currentColor" viewBox="0 0 20 20" width={28} height={28}>
    //   <path
    //     fillRule="evenodd"
    //     d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
    //     clipRule="evenodd"
    //   ></path>
    // </svg>
    <a className="btn btn-sm btn-black">skip intro</a>
  );

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
            maxWidth: "none",
            // maxWidth: "1024px",
            // width: "100%",
            width: "100vw",
            height: "100%",
            margin: 0,
            padding: "1px",
            // marginTop: "63px",
            background: "#ffffff00",
          },
          overlay: {
            background: "rgba(0, 0, 0, 0.5)",
          },
          // closeButton: {
          //   background: "gray",
          // },
        }}
        closeIcon={closeIcon}
      >
        <div>
          <ReactPlayer
            url="https://engineeringhistoricalmemory.com/Images/EHMLogo.mp4"
            playing
            muted
            width="100%"
            height="100%"
          />
        </div>
      </Modal>
    </>
  );
}
