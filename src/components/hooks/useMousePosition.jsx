// Hook that finds the current mouse X and Y positions

import { useState, useEffect } from "react";

function useMousePosition() {
  // use state and set to object with x and y
  let [mouse, setMouse] = useState({ x: 0, y: 0 });

  // use effect
  useEffect(() => {
    // update position function (using element, get element x and y and set state)
    const updatePosition = (e) => setMouse({ x: e.x, y: e.y });

    // add the event listener for mousemove and call updatePosition callback
    window.addEventListener("mousemove", updatePosition);

    // cleanup
    return () => {
      // remove the event listener on cleanup
      window.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  // return the mouse state
  return mouse;
}

export default useMousePosition;
