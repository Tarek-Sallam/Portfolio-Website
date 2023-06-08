import { forwardRef, useRef, useImperativeHandle } from "react";

import "./styles/HeroText.css";
import ListItems from "./ListItems";

const HeroText = forwardRef((props, ref) => {
  const firstNRef = useRef();
  const lastNRef = useRef();
  const heroRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      get hero() {
        return heroRef.current;
      },
      get lastN() {
        return lastNRef.current;
      },
      get firstN() {
        return firstNRef.current;
      },
    };
  });
  return (
    <div className="hero-text-wrapper" ref={heroRef}>
      <span className="hero-text-first" opacity={0} ref={firstNRef}>
        <p className="hero-text difference h-text1">TAREK</p>
        <p className="hero-text overlay h-text1">TAREK</p>
        <ListItems items={props.firstNames} />
      </span>
      <span className="hero-text-last" opacity={0} ref={lastNRef}>
        <p className="hero-text difference h-text1">SALLAM</p>
        <p className="hero-text overlay h-text1">SALLAM</p>
        <ListItems items={props.lastNames} />
      </span>
    </div>
  );
});

export default HeroText;
