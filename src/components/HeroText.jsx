import { useRef, useEffect, useState, useCallback } from "react";

import "./styles/HeroText.css";
import ListItems from "./ListItems";
import useNames from "./hooks/useNames.jsx";
import getStarts from "./functions/gsap/getStarts.js";
import horizontalScroll from "./functions/gsap/horizontalScroll.js";
import gsap from "gsap";
import { enableScroll, disableScroll } from "./functions/enableScroll.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroText = (props) => {
  const firstNRef = useRef();
  const lastNRef = useRef();
  const underTextRef = useRef();
  const heroRef = useRef();
  const descriptionRef = useRef();
  const viewport = props.viewport;
  const spacing = props.spacing;
  const tlLoopingRef = useRef();
  const tlMasterRef = props.tlMasterRef;

  const firstNames = useNames(firstNRef, "TAREK", viewport, spacing);
  const lastNames = useNames(lastNRef, "SALLAM", viewport, spacing);

  // LOOPING ANIMATION EFFECT
  useEffect(() => {
    const firstChildren = firstNRef.current.children;
    const lastChildren = lastNRef.current.children;

    const ctx = gsap.context(() => {
      tlLoopingRef.current = gsap.timeline();
      const tlLooping = tlLoopingRef.current;

      const firstStarts = getStarts({
        children: firstChildren,
        direction: 1,
        viewport: viewport.width,
        spacing: spacing,
      });

      const lastStarts = getStarts({
        children: lastChildren,
        direction: -1,
        viewport: viewport.width,
        spacing: spacing,
      });

      const scrollParams = {
        viewport: viewport.width,
        duration: 20,
        spacing: spacing,
        classN: "h-text",
      };

      tlLooping.to(
        firstChildren,
        {
          autoAlpha: 1,
          duration: 2,
          ease: "none",
          onStart: function () {
            disableScroll();
          },
          onComplete: function () {
            enableScroll();
          },
        },
        "<"
      );
      tlLooping.to(
        lastChildren,
        { autoAlpha: 1, duration: 2, ease: "none" },
        "<"
      );
      tlLooping.add(
        horizontalScroll({
          ...scrollParams,
          ...{
            container: firstNRef.current,
            direction: 1,
            starts: firstStarts,
          },
        }),
        "<"
      );

      tlLooping.add(
        horizontalScroll({
          ...scrollParams,
          ...{
            container: lastNRef.current,
            direction: -1,
            starts: lastStarts,
          },
        }),
        "<"
      );
    });

    return () => {
      ctx.revert();
    };
  }, [tlMasterRef, viewport, firstNames, lastNames, spacing]);

  // MASTER TIMELINE EFFECT
  useEffect(() => {
    const firstChildren = firstNRef.current.children;
    const lastChildren = lastNRef.current.children;
    const underChildren = underTextRef.current.children;
    const description = descriptionRef.current;
    const tlMaster = tlMasterRef.current;

    const ctx = gsap.context(() => {
      tlMaster.to(
        firstChildren,
        {
          autoAlpha: 0,
          duration: 1,
          ease: "none",
        },
        "0"
      );
      tlMaster.to(
        lastChildren,
        { autoAlpha: 0, duration: 1, ease: "none" },
        "0"
      );
      tlMaster.to(
        underChildren,
        {
          autoAlpha: 1,
          duration: 2,
          ease: "none",
        },
        0.5
      );
      tlMaster.to(
        description,
        {
          autoAlpha: 1,
          duration: 2,
          ease: "none",
        },
        0.5
      );
    });

    return () => {
      ctx.revert();
    };
  }, [tlMasterRef, lastNames, firstNames]);

  // SCROLL TRIGGER TO KILL LOOPING ANIMATION
  useEffect(() => {
    const tlMaster = tlMasterRef.current;
    const tlLooping = tlLoopingRef.current;
    function handleEnter() {
      window.scrollTo({ top: 0.6 * viewport.height });
      disableScroll();
      tlLooping.pause();
      tlMaster.play();
      tlMaster.call(
        () => {
          enableScroll();
        },
        null,
        2.5
      );
    }

    function handleLeaveBack() {
      window.scrollTo({ top: 0.4 * viewport.height });
      disableScroll();
      tlLooping.play();
      tlMaster.reverse(2.5);
      gsap.delayedCall(2.5, () => {
        enableScroll();
      });
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0.5 * viewport.height,
        onEnter: function () {
          handleEnter();
        },
        onLeaveBack: function () {
          handleLeaveBack();
        },
      });
    });

    return () => ctx.revert();
  }, [tlMasterRef, viewport.height]);

  return (
    <div className="hero-text-wrapper" ref={heroRef}>
      <span className="hero-text-first hero-text-container" ref={firstNRef}>
        <p className="hero-text h-text-first difference h-text1">TAREK</p>
        <p className="hero-text h-text-first overlay h-text1">TAREK</p>
        <ListItems items={firstNames} />
      </span>
      <span className="hero-text-last hero-text-container" ref={lastNRef}>
        <p className="hero-text h-text-last difference h-text1">SALLAM</p>
        <p className="hero-text h-text-last overlay h-text1">SALLAM</p>
        <ListItems items={lastNames} />
      </span>
      <span className="hero-text-under hero-text-container" ref={underTextRef}>
        <p className="hero-text h-text-first difference">TAREK</p>
        <p className="hero-text h-text-first overlay">TAREK</p>
        <p className="hero-text h-text-last difference">SALLAM</p>
        <p className="hero-text h-text-last overlay">SALLAM</p>
      </span>
      <span className="hero-description-container" ref={descriptionRef}>
        <p>Front End Web Developer and Designer | VFX Artist </p>
        <p>
          Hello! I'm Tarek! I am a passionate web developer who loves to build
          awesome projects! I also enjoy applying technical skills for visual
          effects in Houdini.
        </p>
      </span>
    </div>
  );
};

export default HeroText;
