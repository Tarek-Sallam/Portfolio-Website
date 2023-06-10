import { useEffect, useState } from "react";

const getScrollY = () => window.scrollY;

function useScroll() {
  const [scrollY, setScrollY] = useState(getScrollY);
  useEffect(() => {
    const scrollListener = () => {
      setScrollY(getScrollY);
    };
    window.addEventListener("scroll", scrollListener);
  });

  return scrollY;
}
export default useScroll;
