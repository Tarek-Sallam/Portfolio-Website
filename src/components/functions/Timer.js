const Timer = function (callback, delay, state) {
  let timeoutID;
  let start;
  let remaining = delay;

  this.pause = function () {
    window.clearTimeout(timeoutID);
    timeoutID = null;
    remaining -= Date.now() - start;
  };

  this.play = function () {
    if (timeoutID) {
      return;
    }
    start = Date.now();
    timeoutID = setTimeout(callback, remaining);
  };

  this.play();
};

export default Timer;
