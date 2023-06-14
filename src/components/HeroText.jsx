import { forwardRef, useRef, useEffect, useState, useCallback } from "react";

import "./styles/HeroText.css";
import ListItems from "./ListItems";
import useNames from "./hooks/useNames.jsx";

import gsap from "gsap";
import { enableScroll, disableScroll } from "./functions/enableScroll.js";
import horizontalScroll from "./functions/gsap/horizontalScroll.js";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroText = forwardRef((props, ref) => {
  const firstNRef = useRef();
  const lastNRef = useRef();
  const heroRef = useRef();

  const viewport = props.viewport;
  const spacing = props.spacing;
  const tlLoopingRef = props.tlLoopingRef;
  const tlMasterRef = props.tlMasterRef;

  const firstNames = useNames(firstNRef, "TAREK", viewport, spacing);
  const lastNames = useNames(lastNRef, "SALLAM", viewport, spacing);

  const loopingCallback = useCallback(
    (tl, firstNRef, lastNRef, timersFirst, timersLast) => {
      const firstNContainer = firstNRef.current;
      const lastNContainer = lastNRef.current;

      const scrollParams = {
        viewport: viewport.width,
        duration: 20,
        classN: "h-text",
        spacing: spacing,
      };

      const fadeIn = 2;

      tl.to(firstNContainer.children, {
        opacity: 1,
        duration: fadeIn,
        onComplete: function () {
          enableScroll();
        },
      });

      tl.to(
        lastNContainer.children,
        {
          opacity: 1,
          duration: fadeIn,
        },
        "<"
      );

      tl.add(
        horizontalScroll({
          ...scrollParams,
          ...{
            container: firstNContainer,
            direction: 1,
            timerRef: timersFirst,
          },
        }),
        "<"
      );

      tl.add(
        horizontalScroll({
          ...scrollParams,
          ...{
            container: lastNContainer,
            direction: -1,
            timerRef: timersLast,
          },
        }),
        "<"
      );
    },
    [viewport, spacing]
  );

  const loopingTransferCallback = useCallback((tl, heroRef) => {
    const noTargets = heroRef.current.querySelectorAll(".hero-no-target");
    tl.to(noTargets, {
      autoAlpha: 0,
      duration: 1,
    });
  }, []);

  useEffect(() => {
    const timersFirst = {};
    const timersLast = {};

    function pauseLooping(tl1, tl2) {
      tl1.pause();
      for (const timer in timersFirst) {
        timer.pause();
      }
      for (const timer in timersLast) {
        timer.pause();
      }
      loopingTransferCallback(tl2, heroRef);
      tl2.play();
    }

    function playLooping(tl1, tl2) {
      tl2.call(
        function () {
          tl2.clear();
          tl2.pause();
          tl1.play();
          for (const timer in timersFirst) {
            timer.play();
          }
          for (const timer in timersLast) {
            timer.play();
          }
        },
        null,
        0
      );
      tl2.reverse();
    }

    const ctx = gsap.context(() => {
      loopingCallback(
        tlLoopingRef.current,
        firstNRef,
        lastNRef,
        timersFirst,
        timersLast
      );
      ScrollTrigger.create({
        start: viewport.height * 0.5,
        onEnter: function () {
          console.log("enterred");
          pauseLooping(tlLoopingRef.current, tlMasterRef.current);
        },

        onLeaveBack: function () {
          console.log("bacl");
          playLooping(tlLoopingRef.current, tlMasterRef.current);
        },
      });
    });

    return () => ctx.revert();
  }, [
    firstNames,
    lastNames,
    viewport,
    spacing,
    tlLoopingRef,
    loopingCallback,
    loopingTransferCallback,
    tlMasterRef,
  ]);

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
});

export default HeroText;
