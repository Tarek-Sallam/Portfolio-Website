import { useState, useEffect } from "react";
// useNames hook
const useNames = (widthRef, content, viewport, spacing) => {
  const [names, setNames] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      let widthEl = widthRef.current;

      const namesArr = [];
      if (!widthEl) {
        setNames([]);
        return;
      }
      const width = widthEl.clientWidth + spacing;
      const amount = Math.ceil(viewport.width / width);
      for (let i = 0; i < amount * 2; i++) {
        namesArr[i] = {};
        namesArr[i].className = "hero-text";

        if (content === "TAREK") {
          namesArr[i].className += " h-text-first";
        } else {
          namesArr[i].className += " h-text-last";
        }

        namesArr[i].className += " hero-no-target";

        namesArr[i].className += i % 2 === 0 ? " difference" : " overlay";
        namesArr[i].className += " h-text" + Math.floor(i / 2 + 2);
        namesArr[i].content = content;
        namesArr[i].id = content + i;
      }
      setNames(namesArr);
    }, 50);
  }, [content, widthRef, viewport.width, spacing]);
  return names;
};

export default useNames;
