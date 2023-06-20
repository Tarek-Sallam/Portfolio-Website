import gsap from "gsap";
function getStarts({ children, direction, viewport, spacing }) {
  const width = children[0].offsetWidth; // width of text
  const remaining = width - viewport; // text minus width of viewport
  const start = direction === 1 ? viewport : -width; // the start depending on direction

  let starts = [];
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
    // set position to the current starting position
    gsap.set(children[i * 2], { x: starts[i] });
    gsap.set(children[i * 2 + 1], { x: starts[i] });
  }
  return starts;
}

export default getStarts;
