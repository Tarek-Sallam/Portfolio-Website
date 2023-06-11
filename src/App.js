// APP COMPONENT (includes everything)
import "./App.css";
import Page from "./components/Page.jsx";
import gsap from "gsap";

import { useState, useEffect } from "react";
// custom hooks
import useCurrentViewport from "./components/hooks/useCurrentViewport.jsx";
import useMousePosition from "./components/hooks/useMousePosition.jsx";
import useScroll from "./components/hooks/useScroll.jsx";
import useVisibility from "./components/hooks/useVisibility.jsx";
function App() {
  const [isLoading, setLoading] = useState(true);

  function someRequest() {
    return new Promise((resolve) => setTimeout(() => resolve(), 2500));
  }

  const props = {
    viewport: useCurrentViewport(),
    mouse: useMousePosition(),
    scroll: useScroll(),
    visible: useVisibility(),
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
      <Page {...props} />
    </>
  );
}

export default App;
