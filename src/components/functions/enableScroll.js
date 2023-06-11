function disableScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  window.onscroll = function () {
    window.scrollTo(
      window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop
    );
  };
}

function enableScroll() {
  window.onscroll = function () {};
}

export { disableScroll, enableScroll };
