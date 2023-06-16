// animation library GSAP
import gsap from "gsap";

// custom pausable timer
import Timer from "../Timer.js";

// FUNCTION FOR THE HORIZONTALLY SCROLLING TEXT
function horizontalScroll({
  // PROPS
  viewport,
  container,
  duration,
  direction,
  spacing,
  classN,
  timerRef,
  starts,
}) {
  const children = container.children; // children of the passed container
  const width = children[0].offsetWidth; // width of text
  const start = direction === 1 ? viewport : -width;
  const distance = width + viewport; // distance needed to travel
  const overflow = width * (children.length / 2 - 1) - viewport; // overflow distance of children and viewport
  const repeatWait = (overflow / distance) * duration; // the delay time between repeating

  const spacingDuration = (spacing / distance) * duration; // duration that takes into account spacing
  const tl = gsap.timeline(); // reference to timeline
  const target = [];

  // delay to change targets
  const changeTargetDuration =
    (viewport / 2 / distance + spacing * 1.25) * duration + spacingDuration;

  // change target function
  function changeTarget(newTarget, newTarget2) {
    if (target.length > 1) {
      target[0].classList.remove("hero-target");
      target[1].classList.remove("hero-target");
      target[0].classList.add("hero-no-target");
      target[1].classList.add("hero-no-target");
    }
    target[0] = newTarget;
    target[1] = newTarget2;
    target[0].classList.add("hero-target");
    target[1].classList.add("hero-target");
    target[0].classList.remove("hero-no-target");
    target[1].classList.remove("hero-no-target");
  }

  // if there isn't more than 1 child
  if (children.length < 4) {
    return;
  }

  // calculate the starts for all of the elements and set the starts
  for (let i = 0; i < children.length / 2; i++) {
    // set the first target
    if (target.length === 0) {
      changeTarget(children[i * 2], children[i * 2 + 1]);
    } else if (
      Math.abs(
        viewport / 2 - (target[0].getBoundingClientRect().x + width / 2)
      ) > Math.abs(viewport / 2 - (starts[i] + width / 2))
    ) {
      changeTarget(children[i * 2], children[i * 2 + 1]);
    }
  }

  const end = direction === 1 ? -width : viewport; // find end point

  // initial for loop (for all the elements before the last one)
  for (let i = 0; i < children.length / 2 - 1; i++) {
    // calculate initial duration
    const initDuration = (Math.abs(end - starts[i]) / distance) * duration;

    // calculate initial delay for changing target on element of loop instance
    const initChangeTargetDuration =
      (Math.abs(viewport / 2 - (starts[i] + width / 2)) / distance) * duration;

    // animation
    const rootFirst = tl.to(
      // select the current iteration items
      container.querySelectorAll("." + classN + (i + 1)),
      {
        x: end, // animate to end
        ease: "none", // no ease for linear animation
        duration: initDuration, // use initial duration

        /* ON START: set a delay using the imported timer function 
         (once delay is completed change the target to current instance) */
        onStart: function () {
          const timer = new Timer(function () {
            delete timerRef[i];
            if (rootFirst.isActive()) {
              changeTarget(children[i * 2], children[i * 2 + 1]);
            }
          }, initChangeTargetDuration);
          timerRef[i] = timer;
        },

        // ON COMPLETE: set the selected elements to the starting position
        onComplete: function () {
          gsap.set(container.querySelectorAll("." + classN + (i + 1)), {
            x: start,
          });
        },
      },
      "<" // start at beginning of previous animation
    );
  }

  // last element animation (starts offscreen)
  const rootSecond = tl.to(
    container.querySelectorAll("." + classN + children.length / 2),
    {
      x: end,
      ease: "none",
      duration: duration,
      repeat: -1, // repeat infinitely

      // calculatethe proper repeat delay including the spacing
      repeatDelay: repeatWait + (children.length / 2) * spacingDuration,
      onStart: function () {
        const timer = new Timer(function () {
          delete timerRef[children.length / 2];
          if (rootSecond.isActive()) {
            changeTarget(
              children[children.length - 2],
              children[children.length - 1]
            );
          }
        }, changeTargetDuration);
        timerRef[children.length / 2] = timer;
      },

      // ON REPEAT: set the timer again for the repeat (same as above )
      onRepeat: function () {
        const timer = new Timer(function () {
          delete timerRef[children.length / 2 - 1];
          if (rootSecond.isActive()) {
            changeTarget(
              children[children.length - 2],
              children[children.length - 1]
            );
          }
        }, changeTargetDuration);
        timerRef[children.length / 2 - 1] = timer;
      },
    },
    "<" + (repeatWait + (children.length / 2 - 1) * spacingDuration) // start after previous animation plus delay and spacing delay
  );

  for (let j = 0; j < children.length / 2 - 1; j++) {
    const rootThird = tl.to(
      container.querySelectorAll("." + classN + (j + 1)),
      {
        x: end,
        ease: "none",
        duration: duration,
        repeat: -1,
        repeatDelay: repeatWait + (children.length / 2) * spacingDuration,
        onStart: function () {
          const timer = new Timer(function () {
            delete timerRef[j];
            if (rootThird.isActive()) {
              changeTarget(children[j * 2], children[j * 2 + 1]);
            }
          }, changeTargetDuration);
          timerRef[j] = timer;
        },
        onRepeat: function () {
          const timer = new Timer(function () {
            delete timerRef[j];
            if (rootThird.isActive()) {
              changeTarget(children[j * 2], children[j * 2 + 1]);
            }
          }, changeTargetDuration);
          timerRef[j] = timer;
        },
      },
      "<" + ((width / distance) * duration + spacingDuration)
    );
  }

  return tl;
}

export default horizontalScroll;
