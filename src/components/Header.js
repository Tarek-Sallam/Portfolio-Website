import logo from "./img/logoWhite.svg";
import icon from "./img/barIconWhite.svg";
import "./styles/Header.css";

function Header() {
  return (
    <div className="head-container">
      <img src={logo} alt="Logo" className="icons" />
      <img src={icon} alt="Links" className="icons" />
    </div>
  );
}

export default Header;
