import gsap from "gsap";

function horizontalScroll({
  tlRef,
  viewport,
  container,
  duration,
  direction,
  spacing,
  classN,
  target,
}) {
  const children = container.children;
  const width = children[0].offsetWidth; // width of text
  const remaining = width - viewport; // text - width of viewport
  const distance = width + viewport;
  const overflow = width * (children.length / 2 - 1) - viewport;
  const repeatWait = (overflow / distance) * duration;
  const start = direction === 1 ? viewport : -width;
  const spacingDuration = (spacing / distance) * duration;
  tlRef.current = gsap.timeline();
  const tl = tlRef.current;
  const changeTargetDuration =
    (viewport / 2 / distance + spacing * 1.5) * duration + spacingDuration;

  let starts = [];
  function changeTarget(newTarget, newTarget2) {
    if (target.current.length !== 0) {
      target.current[0].style.backgroundColor = "transparent";
    }
    target.current[0] = newTarget;
    target.current[1] = newTarget2;
    target.current[0].style.backgroundColor = "red";
  }

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

    if (target.current.length === 0) {
      changeTarget(children[i * 2], children[i * 2 + 1]);
    } else if (
      Math.abs(
        viewport / 2 - (target.current[0].getBoundingClientRect().x + width / 2)
      ) > Math.abs(viewport / 2 - (starts[i] + width / 2))
    ) {
      changeTarget(children[i * 2], children[i * 2 + 1]);
    }
  }
  const end = direction === 1 ? -width : viewport; // find end point

  for (let i = 0; i < children.length / 2; i++) {
    if (starts[i] === start) {
      break;
    }

    let initDuration = (Math.abs(end - starts[i]) / distance) * duration;
    let initChangeTargetDuration =
      (Math.abs(viewport / 2 - (starts[i] + width / 2)) / distance) * duration;

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
        onStart: function () {
          setTimeout(() => {
            changeTarget(children[i * 2], children[i * 2 + 1]);
          }, initChangeTargetDuration);
        },
      },
      "<"
    );
  }

  tl.to(
    container.querySelectorAll("." + classN + children.length / 2),
    {
      x: end,
      ease: "none",
      duration: duration,
      repeat: -1,
      repeatDelay: repeatWait + (children.length / 2) * spacingDuration,
      onStart: function () {
        setTimeout(() => {
          changeTarget(
            children[children.length - 2],
            children[children.length - 1]
          );
        }, changeTargetDuration);
      },
      onRepeat: function () {
        setTimeout(() => {
          changeTarget(
            children[children.length - 2],
            children[children.length - 1]
          );
        }, changeTargetDuration);
      },
    },
    "<" + (repeatWait + (children.length / 2 - 1) * spacingDuration)
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
        repeatDelay: repeatWait + (children.length / 2) * spacingDuration,
        onStart: function () {
          setTimeout(() => {
            changeTarget(children[j * 2], children[j * 2 + 1]);
          }, changeTargetDuration);
        },
        onRepeat: function () {
          setTimeout(() => {
            changeTarget(children[j * 2], children[j * 2 + 1]);
          }, changeTargetDuration);
        },
      },
      "<" + ((width / distance) * duration + spacingDuration)
    );
  }

  return tl;
}

export default horizontalScroll;