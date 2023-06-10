// CURRENT WIDTH OF WINDOW HOOK
// WRITTEN BY VITALIE MALDUR
// FROM https://dev.to/vitaliemaldur/resize-event-listener-using-react-hooks-1k0c

// extended for height by Tarek Sallam
import { useState, useEffect } from "react";

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

const getHeight = () =>
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

function useCurrentViewport() {
  // save current window width in the state object
  const [viewport, setViewport] = useState({
    width: getWidth(),
    height: getHeight(),
  });

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    // timeoutId for debounce mechanism
    let timeoutId = null;

    const resizeListener = () => {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      // change width from the state object after 150 milliseconds
      timeoutId = setTimeout(
        () => setViewport({ width: getWidth(), height: getHeight() }),
        100
      );
    };
    // set resize listener
    window.addEventListener("resize", resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return viewport;
}

export default useCurrentViewport;
