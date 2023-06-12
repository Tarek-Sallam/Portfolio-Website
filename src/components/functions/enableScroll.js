function disableScroll() {
  document.body.classList.add("no-scroll");
}

function enableScroll() {
  document.body.classList.remove("no-scroll");
}

export { disableScroll, enableScroll };
