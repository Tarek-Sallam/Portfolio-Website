import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

import "./styles/HeroText.css";
import horizontalScroll from "./gsap/horizontalScroll.jsx";
function HeroText(props) {
  const viewport = props.viewport;

  const tlMasterRef = useRef();
  const tlRef1 = useRef();
  const tlRef2 = useRef();

  const heroRef = useRef();

  // animation
  useEffect(() => {
    const firstName1 = heroRef.current
      .querySelector(".hero-text-first")
      .querySelectorAll(".hero-first");
    const firstName2 = heroRef.current
      .querySelector(".hero-text-first")
      .querySelectorAll(".hero-second");

    const lastName1 = heroRef.current
      .querySelector(".hero-text-last")
      .querySelectorAll(".hero-first");
    const lastName2 = heroRef.current
      .querySelector(".hero-text-last")
      .querySelectorAll(".hero-second");

    const ctx = gsap.context(() => {
      tlRef1.current = gsap.timeline();
      tlRef2.current = gsap.timeline();
      const tl1 = tlRef1.current;
      const tl2 = tlRef2.current;
      const params = {
        tl: tl1,
        viewport: viewport,
        duration: 12,
        offset: 0.05,
      };

      gsap.delayedCall(0.01, () => {
        horizontalScroll({
          ...params,
          ...{ first: firstName1, second: firstName2, direction: -1 },
        });
        horizontalScroll({
          ...params,
          ...{ tl: tl2, first: lastName1, second: lastName2, direction: 1 },
        });
      });
    });
    return () => ctx.revert();
  }, [heroRef, tlRef1, tlRef2, viewport]);

  return (
    <div className="hero-text-wrapper" ref={heroRef}>
      <span className="hero-text-first">
        <p className="hero-text static hero-first">TAREK</p>
        <p className="hero-text moving hero-first">TAREK</p>
        <p className="hero-text static hero-second">TAREK</p>
        <p className="hero-text moving hero-second">TAREK</p>
      </span>
      <span className="hero-text-last">
        <p className="hero-text static hero-first">SALLAM</p>
        <p className="hero-text moving hero-first">SALLAM</p>
        <p className="hero-text static hero-second">SALLAM</p>
        <p className="hero-text moving hero-second">SALLAM</p>
      </span>
    </div>
  );
}

export default HeroText;
