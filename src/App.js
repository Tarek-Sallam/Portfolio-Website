// APP COMPONENT (includes everything)
import "./App.css";
import Header from "./components/Header.jsx";
import ThreeMain from "./components/three/ThreeMain.jsx";
import HeroText from "./components/HeroText.jsx";

import { useRef } from "react";
// custom hooks
import useCurrentViewport from "./components/hooks/useCurrentViewport.jsx";
import useMousePosition from "./components/hooks/useMousePosition.jsx";

function App() {
  const props = {
    viewport: useCurrentViewport(),
    mouse: useMousePosition(),
  };

  const threeRef = useRef();
  const headerRef = useRef();

  return (
    <>
      <ThreeMain {...props} />
      <Header {...props} />
      <HeroText {...props} />
    </>
  );
}

export default App;
