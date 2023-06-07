// APP COMPONENT (includes everything)
import "./App.css";
import Header from "./components/Header.jsx";
import ThreeMain from "./components/three/ThreeMain.jsx";
import HeroText from "./components/HeroText.jsx";
import gsap from "gsap";

import { useState, useEffect, useRef } from "react";
// custom hooks
import useCurrentViewport from "./components/hooks/useCurrentViewport.jsx";
import useMousePosition from "./components/hooks/useMousePosition.jsx";

function App() {
  const [isLoading, setLoading] = useState(true);

  function someRequest() {
    return new Promise((resolve) => setTimeout(() => resolve(), 2500));
  }

  const props = {
    viewport: useCurrentViewport(),
    mouse: useMousePosition(),
  };

  useEffect(() => {
    someRequest().then(() => {
      const loaderElement = document.querySelector(".loader");
      if (loaderElement) {
        gsap.to(loaderElement, {
          autoAlpha: 0,
          duration: 2,
        });
        setLoading(!isLoading);
      }
    });
  }, []);

  if (isLoading) {
    //
    return null;
  }

  return (
    <>
      <ThreeMain {...props} />
      <Header {...props} />
      <HeroText {...props} />
    </>
  );
}

export default App;
