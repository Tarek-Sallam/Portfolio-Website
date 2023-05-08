import "./styles/Sidebar.css";
import React, { useRef, useEffect } from "react";

function Sidebar({ isOpen, setOpen }) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (!ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    console.log("Listening for click");
    document.addEventListener("click", (e) => handleClick(e), true);

    return () =>
      document.removeEventListener("click", (e) => handleClick(e), true);
  }, [isOpen, setOpen]);

  return (
    <div
      style={{ width: isOpen ? "50vw" : "0vw" }}
      className="sidebar-container"
      ref={ref}
    >
      <h1>testttingggg</h1>
    </div>
  );
}

export default Sidebar;
