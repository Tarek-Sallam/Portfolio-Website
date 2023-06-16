import { useRef, useEffect, useState, useCallback } from "react";

import "./styles/HeroText.css";
import ListItems from "./ListItems";
import useNames from "./hooks/useNames.jsx";
import getStarts from "./functions/gsap/getStarts.js";
import gsap from "gsap";
import { enableScroll, disableScroll } from "./functions/enableScroll.js";
import loopingAnimation from "./functions/gsap/looping.js";
import loopingTransfer from "./functions/gsap/loopingTransfer.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroText = (props) => {
  const firstNRef = useRef();
  const lastNRef = useRef();
  const heroRef = useRef();
  const viewport = props.viewport;
  const spacing = props.spacing;
  const tlLoopingRef = useRef();
  const tlMasterRef = props.tlMasterRef;

  const firstNames = useNames(firstNRef, "TAREK", viewport, spacing);
  const lastNames = useNames(lastNRef, "SALLAM", viewport, spacing);

  useEffect(() => {
    const timersFirst = {};
    const timersLast = {};
    tlLoopingRef.current = gsap.timeline();
    const tlLooping = tlLoopingRef.current;
    const tlMaster = tlMasterRef.current;

    window.scrollTo({ top: 0, behavior: "instant" });

    const firstChildren = firstNRef.current.children;
    const lastChildren = lastNRef.current.children;

    const ctx = gsap.context(() => {
      function pauseLooping(tl1, tl2) {
        disableScroll();
        tl1.pause();
        for (const timer in timersFirst) {
          timersFirst[timer].pause();
        }
        for (const timer in timersLast) {
          timersLast[timer].pause();
        }
        loopingTransfer(tl2, heroRef);
        tl2.play();
      }

      function playLooping(tl1, tl2) {
        disableScroll();
        tl2.call(
          function () {
            tl2.clear();
            tl2.pause();
            tl1.play();
            for (const timer in timersFirst) {
              timersFirst[timer].play();
            }
            for (const timer in timersLast) {
              timersLast[timer].play();
            }
            enableScroll();
          },
          null,
          0
        );
        tl2.reverse();
      }

      function createDefaultTrigger() {
        ScrollTrigger.create({
          start: viewport.height * 0.5,
          onEnter: function () {
            disableScroll();
            pauseLooping(tlLooping, tlMaster);
            window.scrollTo({
              top: viewport.height * 0.6,
              behavior: "instant",
            });
          },
          onLeaveBack: function () {
            disableScroll();
            playLooping(tlLooping, tlMaster);
            window.scrollTo({
              top: viewport.height * 0.4,
              behavior: "instant",
            });
          },
        });
      }

      function start() {
        const firstStarts = getStarts(
          firstChildren,
          1,
          viewport.width,
          spacing
        );
        const lastStarts = getStarts(lastChildren, -1, viewport.width, spacing);

        loopingAnimation({
          tl: tlLooping,
          firstStarts: firstStarts,
          lastStarts: lastStarts,
          firstNRef: firstNRef,
          lastNRef: lastNRef,
          timersFirst: timersFirst,
          timersLast: timersLast,
          viewport: viewport,
          spacing: spacing,
        });
        createDefaultTrigger();
      }
      disableScroll();
      start();
    });

    return () => {
      ctx.revert();
    };
  }, [firstNames, lastNames, viewport, spacing, tlLoopingRef, tlMasterRef]);

  return (
    <div className="hero-text-wrapper" ref={heroRef}>
      <span className="hero-text-first" ref={firstNRef}>
        <p className="hero-text h-text-first difference h-text1">TAREK</p>
        <p className="hero-text h-text-first overlay h-text1">TAREK</p>
        <ListItems items={firstNames} />
      </span>
      <span className="hero-text-last" ref={lastNRef}>
        <p className="hero-text h-text-last difference h-text1">SALLAM</p>
        <p className="hero-text h-text-last overlay h-text1">SALLAM</p>
        <ListItems items={lastNames} />
      </span>
    </div>
  );
};

export default HeroText;
