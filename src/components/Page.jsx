// APP COMPONENT (includes everything)
import Header from "./Header.jsx";
import ThreeMain from "./three/ThreeMain.jsx";
import HeroText from "./HeroText.jsx";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import horizontalScroll from "./gsap/horizontalScroll.jsx";
import useNames from "./hooks/useNames.jsx";

function Page(props) {
  const tlMasterRef = useRef();
  const heroRef = useRef();
  const tlRef1 = useRef();
  const tlRef2 = useRef();
  const viewport = props.viewport;
  const spacing = 0.15 * viewport.width;
  const targetFirstRef = useRef([]);
  const targetLastRef = useRef([]);

  // set amount of names with useNames hook
  const firstNames = useNames(heroRef, "firstN", "TAREK", viewport, spacing);
  const lastNames = useNames(heroRef, "lastN", "SALLAM", viewport, spacing);

  // useEffect for animation timeline
  useEffect(() => {
    // name containers
    const firstNContainer = heroRef.current.firstN;
    const lastNContainer = heroRef.current.lastN;

    // context for GSAP
    const ctx = gsap.context(() => {
      // paramaters for scrollHorizontal function
      const scrollParams = {
        tlRef: tlRef1,
        viewport: viewport.width,
        duration: 20,
        classN: "h-text",
        spacing: spacing,
      };

      // delay the call slightly
      gsap.delayedCall(0.05, () => {
        tlMasterRef.current = gsap.timeline();
        const tlMaster = tlMasterRef.current;
        // horizontal scroll function for first names
        tlMaster.add(
          horizontalScroll({
            ...scrollParams,
            ...{
              container: firstNContainer,
              direction: 1,
              target: targetFirstRef,
            },
          })
        );

        // horizontal scroll function for last names
        tlMaster.add(
          horizontalScroll({
            ...scrollParams,
            ...{
              tlRef: tlRef2,
              container: lastNContainer,
              direction: -1,
              target: targetLastRef,
            },
          }),
          "<"
        );

        tlMaster.play();
      });
    });
    return () => ctx.revert();
  }, [heroRef, tlRef1, tlRef2, viewport.width, spacing, firstNames, lastNames]);

  return (
    <>
      <ThreeMain {...props} />
      <Header {...props} />
      <HeroText
        {...props}
        ref={heroRef}
        firstNames={firstNames}
        lastNames={lastNames}
      />
    </>
  );
}

export default Page;
