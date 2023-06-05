import { useState, useEffect } from "react";

function useDimensions(props) {
  const ref = props.ref;
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!ref?.current) {
      return;
    }
    setDimensions({
      width: ref?.current?.offsetWidth,
      height: ref?.current?.offsetHeight,
    });
  }, [ref]);

  return dimensions;
}

export default useDimensions;
