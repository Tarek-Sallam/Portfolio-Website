import "./styles/Sidebar.css";
import React, { useRef, useEffect } from "react";

function Sidebar({ isOpen, setOpen }) {
  const ref = useRef();

  // HOOK FOR WHEN A CLICK HAPPENS OUTSIDE OF MENU
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

  // IF X IS CLICKED
  const handleXClick = () => {
    setOpen(false);
  };

  // JSX RETURN
  return (
    <div
      style={{ width: isOpen ? "50vw" : "0vw" }}
      className="sidebar-container"
      ref={ref}
    >
      <button onClick={handleXClick} className="X-button">
        X
      </button>
      <ul className="side-items-container">
        <li className="side-items">
          <a href="#">About Me</a>
        </li>
        <li className="side-items">
          <a href="#">Link 2</a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
