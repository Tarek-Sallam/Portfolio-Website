import "./styles/Hero.css";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import ListItems from "./ListItems.jsx";

function Hero() {
  // refs of children
  const itemRefs = useRef([]);

  // GSAP timeline ref
  const tlRef = useRef([]);

  // item list
  const list = [
    { content: "FIRST", className: "bolded", id: 1 },
    { content: "D", className: "bolded", id: 2 },
    { content: "THIRD", className: "bolded", id: 3 },
  ];

  // GSAP function
  useEffect(() => {
    let ctx = gsap.context(() => {
      tlRef.current = gsap.timeline();
      const tl = tlRef.current;

      const duration = 1;
      const pause = 1;
      const stagger = duration + pause;
      const repeatDelay = stagger * (itemRefs.current.length - 1) + pause;

      console.log(itemRefs.current);
      console.log(itemRefs.current.length);

      tl.from(itemRefs.current, {
        yPercent: 30,
        duration: duration,
        opacity: 0,
        rotateX: 90,
        stagger: {
          each: stagger,
          repeat: -1,
          repeatDelay: repeatDelay,
          onStart: function () {
            this.targets()[0].classList.add("active");
            console.log("unhigdene");
          },
          onRepeat: function () {
            this.targets()[0].classList.add("active");
          },
        },
      }).to(
        itemRefs.current,
        {
          yPercent: -30,
          duration: duration,
          rotateX: -90,
          opacity: 0,
          yoyo: true,
          stagger: {
            each: stagger,
            repeat: -1,
            repeatDelay: repeatDelay,
            onStart: function () {
              setTimeout(() => {
                this.targets()[0].classList.remove("active");
              }, duration * 1000);
            },
            onRepeat: function () {
              setTimeout(() => {
                this.targets()[0].classList.remove("active");
              }, duration * 1000);
            },
          },
        },
        stagger
      );
    });

    return () => ctx.revert();
  }, []);

  // JSX
  return (
    <main className="hero-container">
      <div className="text-wrapper">
        <h1 className="hero-header"> Test: </h1>
      </div>
      <div className="text-wrapper stack">
        <ListItems items={list} ref={itemRefs} />
      </div>
    </main>
  );
}

export default Hero;
