import logo from "./img/logoWhite.svg";
import icon from "./img/barIconWhite.svg";
import "./styles/Header.css";
import { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";

function Header() {
  const [sidebarState, setSidebarState] = useState(false);

  // IF HAMBURGER MENU IS CLICKED
  const handleHBClick = () => {
    setSidebarState(true);
  };

  // JSX RETURN
  return (
    <>
      <div className="head-container">
        <a href="">
          <img src={logo} alt="Logo" className="icons" />
        </a>
        <button onClick={handleHBClick}>
          <img src={icon} alt="Links" className="icons" />
        </button>
      </div>

      <Sidebar isOpen={sidebarState} setOpen={setSidebarState} />
    </>
  );
}

export default Header;
