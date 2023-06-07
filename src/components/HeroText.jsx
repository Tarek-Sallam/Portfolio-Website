import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

import "./styles/HeroText.css";
import horizontalScroll from "./gsap/horizontalScroll.jsx";
import ListItems from "./ListItems";

function HeroText(props) {
  const viewport = props.viewport;
  const tlRef1 = useRef();
  const tlRef2 = useRef();
  const heroRef = useRef();
  const firstRef = useRef();
  const lastRef = useRef();

  // useNames hook
  const useNames = (widthRef, content, viewport, spacing) => {
    const [names, setNames] = useState([]);
    useEffect(() => {
      setTimeout(() => {
        const namesArr = [];

        if (!widthRef.current) {
          setNames([]);
          return;
        }

        const width = widthRef.current.clientWidth + spacing;
        const amount = Math.ceil(viewport.width / width);
        for (let i = 0; i < amount * 2; ++i) {
          namesArr[i] = {};
          namesArr[i].className = "hero-text";
          namesArr[i].className += i % 2 === 0 ? " difference" : " overlay";
          namesArr[i].className += " h-text" + Math.floor(i / 2 + 2);
          namesArr[i].content = content;
          namesArr[i].id = content + i;
        }

        setNames(namesArr);
      }, 100);
    }, [content, widthRef, viewport.width, spacing]);
    return names;
  };

  // names to render
  const spacing = 0.15 * viewport.width;
  const fNamesToRender = useNames(firstRef, "TAREK", viewport, spacing);
  const lNamesToRender = useNames(lastRef, "SALLAM", viewport, spacing);

  useEffect(() => {
    const firstNContainer = heroRef.current.querySelector(".hero-text-first");
    const lastNContainer = heroRef.current.querySelector(".hero-text-last");

    const ctx = gsap.context(() => {
      tlRef1.current = gsap.timeline();
      tlRef2.current = gsap.timeline();
      const tl1 = tlRef1.current;
      const tl2 = tlRef2.current;
      const params = {
        tl: tl1,
        viewport: viewport.width,
        duration: 12,
        classN: "h-text",
        spacing: spacing,
      };
      gsap.delayedCall(0.05, () => {
        horizontalScroll({
          ...params,
          ...{ container: firstNContainer, direction: 1 },
        });
        horizontalScroll({
          ...params,
          ...{ tl: tl2, container: lastNContainer, direction: -1 },
        });
      });
    });
    return () => ctx.revert();
  }, [heroRef, tlRef1, tlRef2, viewport.width, fNamesToRender, lNamesToRender]);

  return (
    <div className="hero-text-wrapper" ref={heroRef}>
      <span className="hero-text-first" opacity={0}>
        <p className="hero-text difference h-text1" ref={firstRef}>
          TAREK
        </p>
        <p className="hero-text overlay h-text1">TAREK</p>
        <ListItems items={fNamesToRender} />
      </span>
      <span className="hero-text-last" opacity={0}>
        <p className="hero-text difference h-text1" ref={lastRef}>
          SALLAM
        </p>
        <p className="hero-text overlay h-text1">SALLAM</p>
        <ListItems items={lNamesToRender} />
      </span>
    </div>
  );
}

export default HeroText;
