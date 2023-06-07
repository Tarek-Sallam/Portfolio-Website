import gsap from "gsap";

function horizontalScroll({
  tl,
  viewport,
  container,
  duration,
  direction,
  spacing,
  classN,
}) {
  const children = container.children;
  const width = children[0].offsetWidth; // width of text
  const remaining = width - viewport; // text - width of viewport
  const distance = width + viewport;
  const overflow = width * (children.length / 2 - 1) - viewport;
  const repeatWait = (overflow / distance) * duration;
  const start = direction === 1 ? viewport : -width;
  const spacingDuration = (spacing / distance) * duration;

  let starts = [];

  if (children.length < 4) {
    return;
  }
  gsap.to(children, { opacity: 1, duration: 5 });
  // calculate the starts for all of the elements and set the starts
  for (let i = 0; i < children.length / 2; i++) {
    if (i === 0) {
      starts[i] = direction === 1 ? 0 : -remaining;
    } else if (direction === 1) {
      if (starts[i - 1] + width + spacing < viewport) {
        starts[i] = starts[i - 1] + width + spacing;
      } else {
        starts[i] = start;
      }
    } else if (direction === -1) {
      if (starts[i - 1] - spacing > 0) {
        starts[i] = starts[i - 1] - width - spacing;
      } else {
        starts[i] = start;
      }
    }
    gsap.set(children[i * 2], { x: starts[i] });
    gsap.set(children[i * 2 + 1], { x: starts[i] });
  }
  const end = direction === 1 ? -width : viewport; // find end point

  for (let i = 0; i < children.length / 2; i++) {
    if (starts[i] === start) {
      break;
    }

    let initDuration = (Math.abs(end - starts[i]) / distance) * duration;
    tl.to(
      container.querySelectorAll("." + classN + (i + 1)),
      {
        x: end,
        ease: "none",
        duration: initDuration,
        onComplete: function () {
          gsap.set(container.querySelectorAll("." + classN + (i + 1)), {
            x: start,
          });
        },
      },
      "<" + (i === 0 ? "" : spacingDuration)
    );
  }

  tl.to(
    container.querySelectorAll("." + classN + children.length / 2),
    {
      x: end,
      ease: "none",
      duration: duration,
      repeat: -1,
      repeatDelay: repeatWait + 2 * spacingDuration,
    },
    "<" + (repeatWait + spacingDuration)
  );

  for (let j = 0; j < children.length / 2; j++) {
    if (starts[j] === start) {
      break;
    }
    tl.to(
      container.querySelectorAll("." + classN + (j + 1)),
      {
        x: end,
        ease: "none",
        duration: duration,
        repeat: -1,
        repeatDelay: repeatWait + 2 * spacingDuration,
      },
      "<" + ((width / distance) * duration + spacingDuration)
    );
  }
}

export default horizontalScroll;
