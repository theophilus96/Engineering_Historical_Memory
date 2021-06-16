import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import "../css/reactPlayer.css";

export default function FSmodal() {
  const [open, setOpen] = useState(false);

  const myRef = useRef(null);

  useEffect(() => {
    setOpen(true);
    setTimeout(() => setOpen(false), 7000);
  }, []);

  const closeIcon = (
    <button className="btn btn-sm btn-black">skip intro</button>
  );

  return (
    // Full screen modal
    <div
      class="modal-fullscreen-sm-down"
      open={open}
      onClose={() => setOpen(false)}
    >
      <ReactPlayer
        url="https://engineeringhistoricalmemory.com/Images/EHMLogo.mp4"
        playing
        muted
        width="100%"
        height="100%"
      />

      <div class="modal-footer">
        <button
          className="btn btn-sm btn-black"
          type="button"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => setOpen(false)}
        >
          skip intro
        </button>
      </div>
    </div>
  );
}
