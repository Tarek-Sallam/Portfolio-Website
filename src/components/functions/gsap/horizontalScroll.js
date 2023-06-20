// animation library GSAP
import gsap from "gsap";

// FUNCTION FOR THE HORIZONTALLY SCROLLING TEXT
function horizontalScroll({
  // PROPS
  viewport,
  container,
  duration,
  direction,
  spacing,
  classN,
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

  // if there isn't more than 1 child
  if (children.length < 4) {
    return;
  }

  const end = direction === 1 ? -width : viewport; // find end point

  // initial for loop (for all the elements before the last one)
  for (let i = 0; i < children.length / 2 - 1; i++) {
    // calculate initial duration
    const initDuration = (Math.abs(end - starts[i]) / distance) * duration;

    // animation
    tl.to(
      // select the current iteration items
      container.querySelectorAll("." + classN + (i + 1)),
      {
        x: end, // animate to end
        ease: "none", // no ease for linear animation
        duration: initDuration, // use initial duration

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
  tl.to(
    container.querySelectorAll("." + classN + children.length / 2),
    {
      x: end,
      ease: "none",
      duration: duration,
      repeat: -1, // repeat infinitely

      // calculatethe proper repeat delay including the spacing
      repeatDelay: repeatWait + (children.length / 2) * spacingDuration,
    },
    "<" + (repeatWait + (children.length / 2 - 1) * spacingDuration) // start after previous animation plus delay and spacing delay
  );

  for (let j = 0; j < children.length / 2 - 1; j++) {
    tl.to(
      container.querySelectorAll("." + classN + (j + 1)),
      {
        x: end,
        ease: "none",
        duration: duration,
        repeat: -1,
        repeatDelay: repeatWait + (children.length / 2) * spacingDuration,
      },
      "<" + ((width / distance) * duration + spacingDuration)
    );
  }

  return tl;
}

export default horizontalScroll;
