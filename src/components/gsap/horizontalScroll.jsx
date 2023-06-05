import gsap from "gsap";

function horizontalScroll({
  tl,
  viewport,
  first,
  second,
  duration,
  offset,
  direction,
}) {
  const width = first[0].offsetWidth; // width of text
  const remaining = width - viewport.width; // text - width of viewport
  const start1 = direction === -1 ? -remaining : 0; // find start point 1
  const start2 = direction === -1 ? -width : viewport.width; // find start point 2
  const end = direction === -1 ? viewport.width : -width; // find end point
  const offsetVal = duration * offset;
  const delay = (remaining / width) * duration; // calculate delay
  const duration2 = duration + (viewport.width / width) * duration; // calculate duration 2
  gsap.set(first, { x: start1 });
  gsap.set(second, { x: start2 });

  tl.to(first, {
    x: end,
    ease: "none",
    duration: duration,
    onComplete: function () {
      gsap.set(first, {
        x: start2,
      });
    },
  });
  tl.to(
    second,
    {
      x: end,
      ease: "none",
      duration: duration2,
      repeat: -1,
      repeatDelay: delay + 2 * offsetVal,
    },
    "<" + (delay + offsetVal)
  );
  tl.to(
    first,
    {
      x: end,
      ease: "none",
      duration: duration2,
      repeat: -1,
      repeatDelay: delay + 2 * offsetVal,
    },
    "<" + (duration + offsetVal)
  );
}

export default horizontalScroll;
