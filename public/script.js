(function () {
  var info = console.info;
  console.info = function (message) {
    if (!/Download the React DevTools/.test(message))
      info.apply(console, arguments);
  };
})();

// disable tab focus
document.addEventListener("keydown", function (e) {
  if ([9, 27].includes(e.keyCode)) {
    e.preventDefault();
    document.activeElement.blur();
  }
});
