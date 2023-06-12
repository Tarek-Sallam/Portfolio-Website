// APP COMPONENT (includes everything)
import Header from "./Header.jsx";
import ThreeMain from "./three/ThreeMain.jsx";
import "./styles/Page.css";
import HeroText from "./HeroText.jsx";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import horizontalScroll from "./gsap/horizontalScroll.jsx";
import useNames from "./hooks/useNames.jsx";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { disableScroll, enableScroll } from "./functions/enableScroll.js";
gsap.registerPlugin(ScrollTrigger);

function Page(props) {
  const tlMasterRef = useRef();
  const tlLoopingRef = useRef();
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

      const timersFirst = {};
      const timersLast = {};
      // delay the call slightly
      gsap.delayedCall(0.05, () => {
        tlLoopingRef.current = gsap.timeline();
        const tlLooping = tlLoopingRef.current;
        const fadeIn = 2;

        disableScroll();
        tlLooping.to(heroRef.current.firstN.children, {
          opacity: 1,
          duration: fadeIn,
          onComplete: function () {
            enableScroll();
          },
        });

        tlLooping.to(
          heroRef.current.lastN.children,
          {
            opacity: 1,
            duration: fadeIn,
          },
          "<"
        );
        // ADD THE ORIGINAL LOOPING TEXT
        tlLooping.add(
          horizontalScroll({
            ...scrollParams,
            ...{
              container: firstNContainer,
              direction: 1,
              target: targetFirstRef,
              timerRef: timersFirst,
            },
          }),
          "<"
        );
        // horizontal scroll function for last names
        tlLooping.add(
          horizontalScroll({
            ...scrollParams,
            ...{
              tlRef: tlRef2,
              container: lastNContainer,
              direction: -1,
              target: targetLastRef,
              timerRef: timersLast,
            },
          }),
          "<"
        );

        // PAUSE AND PLAY FUNCTIONS FOR STARTING LOOP AND REST OF ANIMATION

        const pauseLoop = (tl, tlRef) => {
          tl.pause();
          for (const id in timersFirst) {
            timersFirst[id].pause();
          }
          for (const id in timersLast) {
            timersLast[id].pause();
          }
          playNext(tlRef);
        };

        const playNext = (tlRef) => {
          disableScroll();
          tlRef.current = gsap.timeline();
          const tl = tlRef.current;
          const targets =
            heroRef.current.hero.querySelectorAll(".hero-no-target");
          tl.to(targets, {
            opacity: 0,
            duration: 1,
            onComplete: function () {
              enableScroll();
            },
          });
          tl.play();
        };

        const playLoop = (tl, tlRef) => {
          pauseNext(tlRef);
          tl.play();
          for (const id in timersFirst) {
            timersFirst[id].play();
          }
          for (const id in timersLast) {
            timersLast[id].play();
          }
        };

        const pauseNext = (tlRef) => {
          disableScroll();
          let tl = tlRef.current;
          tl.call(
            () => {
              tl.kill();
              tl = null;
              enableScroll();
            },
            null,
            0
          );
          tl.reverse(1);
        };

        // WHEN TRIGGERED REPLAY THE TIMELINE
        ScrollTrigger.create({
          start: viewport.height * 0.5,
          onEnter: () => pauseLoop(tlLooping, tlMasterRef),
          onLeaveBack: () => playLoop(tlLooping, tlMasterRef),
        });

        tlLooping.play();
      });
    });

    return () => ctx.revert();
  }, [heroRef, tlRef1, tlRef2, viewport, spacing, firstNames, lastNames]);

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
      <section>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            maximus dictum mauris vel ornare. Mauris sollicitudin dolor erat,
            vel finibus sem malesuada sit amet. Phasellus maximus vel enim vitae
            sagittis. Donec convallis odio a eros placerat, nec iaculis ante
            aliquam. Nulla ultrices semper ultrices. Aliquam augue mi, suscipit
            et sem vitae, imperdiet congue nunc. Duis ullamcorper erat quis
            dignissim facilisis. Cras in tempus magna, vel lacinia nisi.
            Maecenas sodales, nunc et luctus egestas, quam felis ultrices orci,
            id posuere nisi nunc in arcu. Aenean at nisi viverra, gravida lectus
            eget, rutrum odio. Suspendisse auctor consequat ligula. Suspendisse
            eget velit convallis, tempor diam at, tristique enim. Etiam quis
            sagittis lorem. Quisque at pellentesque sem. Vestibulum varius
            dapibus arcu. Sed feugiat massa nec risus scelerisque, vitae tempus
            libero aliquet. Nullam at nisi nec dui blandit vestibulum ut nec
            mauris. Pellentesque euismod vehicula massa vitae ultricies. In
            hendrerit pellentesque leo, at auctor augue. Quisque luctus
            condimentum tellus, pretium sollicitudin tortor mollis a. Duis
            dignissim tellus vitae tortor dapibus, in rutrum elit hendrerit.
            Aliquam vitae ipsum vitae enim rutrum gravida et ut lacus. Fusce
            libero dui, eleifend nec mi non, bibendum dictum est. Mauris egestas
            nibh vel dapibus vehicula. Vestibulum ante ipsum primis in faucibus
            orci luctus et ultrices posuere cubilia curae; Aliquam lobortis
            nulla finibus mauris rutrum tempus. Sed dapibus maximus orci nec
            faucibus. Morbi in enim vitae diam vulputate cursus in vel neque.
            Sed ultrices accumsan sapien, a ultrices ligula. Vestibulum non leo
            id lectus aliquet porttitor. Proin vestibulum odio at erat
            efficitur, vel imperdiet lacus dignissim. Phasellus nec imperdiet
            ipsum. Morbi a vestibulum diam. Mauris velit risus, cursus quis
            ullamcorper et, tristique sit amet nisi. Etiam vel tempor velit.
            Integer placerat lorem enim, a malesuada urna venenatis finibus.
            Aenean velit elit, commodo a aliquam ut, tincidunt eu tellus.
            Pellentesque scelerisque tellus et tempus volutpat. Mauris et
            viverra mi, ut scelerisque mi. Maecenas ligula lacus, cursus gravida
            sodales ac, condimentum quis elit. Aenean commodo nibh a lectus
            pharetra, et tempus sem porttitor. Nam eget enim quis justo viverra
            ullamcorper. Phasellus sit amet massa tincidunt, vehicula justo et,
            porta eros. Morbi dictum egestas luctus. Vestibulum vitae viverra
            dui. Etiam vitae nisi non libero finibus posuere. Maecenas et lectus
            in nisl suscipit commodo. Pellentesque tempus diam a mi varius
            laoreet. Sed maximus aliquam suscipit. Donec venenatis tortor lorem,
            sed maximus justo mattis vitae. Nam convallis fringilla mauris, et
            congue dui ullamcorper eu. Class aptent taciti sociosqu ad litora
            torquent per conubia nostra, per inceptos himenaeos. Nulla vehicula
            ullamcorper felis sit amet aliquet. Maecenas congue, dolor in
            faucibus luctus, ante libero suscipit dolor, sit amet sollicitudin
            mi erat vel ligula. Suspendisse potenti. Vestibulum faucibus at erat
            convallis euismod. Sed scelerisque justo sed commodo molestie. Cras
            a ipsum tempor, accumsan neque eu, pellentesque sem. Nulla interdum,
            libero quis rutrum sollicitudin, tellus arcu tempor arcu, sed
            aliquam nulla nisi quis nunc. Donec ante odio, lacinia ac malesuada
            ac, convallis et mi. In ac metus ac nisi tempor aliquam sit amet id
            neque. Vivamus dignissim semper sollicitudin. Aliquam eleifend,
            magna eu suscipit feugiat, turpis nunc venenatis erat, at pulvinar
            erat mi ornare tortor. Aenean convallis dui convallis pretium
            dignissim. Vivamus varius dapibus augue, a consequat diam venenatis
            sit amet. Curabitur congue, eros non euismod fringilla, dui dolor
            luctus lacus, eget pharetra nisi tellus sed ligula.
          </p>
        </div>
      </section>
    </>
  );
}

export default Page;
