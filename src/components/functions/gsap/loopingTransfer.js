import { enableScroll } from "../enableScroll.js";

const loopingTransfer = (tl, heroRef) => {
  const noTargets = heroRef.current.querySelectorAll(".hero-no-target");
  const firstTargets = heroRef.current
    .querySelector(".hero-text-first")
    .querySelectorAll(".hero-target");
  const lastTargets = heroRef.current
    .querySelector(".hero-text-last")
    .querySelectorAll(".hero-target");

  tl.to(noTargets, {
    autoAlpha: 0,
    duration: 1,
  });

  tl.to(
    firstTargets,
    {
      ease: "Power1.inOut",
      scale: 0.5,
      duration: 2,
      x: 0,
      transformOrigin: "0px 0px",
    },
    "<"
  );
  tl.to(
    lastTargets,
    {
      ease: "Power1.inOut",
      scale: 0.5,
      duration: 2,
      x: 0,
      transformOrigin: "0px 0px",
      onComplete: function () {
        enableScroll();
      },
    },
    "<"
  );
};

export default loopingTransfer;
