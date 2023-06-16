import gsap from "gsap";
import { enableScroll } from "../enableScroll.js";
import horizontalScroll from "../gsap/horizontalScroll.js";

const loopingAnimation = ({
  tl,
  firstStarts,
  lastStarts,
  firstNRef,
  lastNRef,
  timersFirst,
  timersLast,
  viewport,
  spacing,
}) => {
  const firstNContainer = firstNRef.current;
  const lastNContainer = lastNRef.current;

  const scrollParams = {
    viewport: viewport.width,
    duration: 20,
    classN: "h-text",
    spacing: spacing,
  };

  const fadeIn = 2;

  gsap.set(firstNContainer.children, { autoAlpha: 0 });
  gsap.set(lastNContainer.children, { autoAlpha: 0 });

  tl.to(firstNContainer.children, {
    autoAlpha: 1,
    duration: fadeIn,
    onComplete: function () {
      enableScroll();
    },
  });

  tl.to(
    lastNContainer.children,
    {
      autoAlpha: 1,
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
        starts: firstStarts,
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
        starts: lastStarts,
      },
    }),
    "<"
  );
};

export default loopingAnimation;
