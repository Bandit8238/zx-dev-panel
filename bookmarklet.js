javascript:(function(){
  fetch("https://YOUR-USERNAME.github.io/zx-dev-panel/script.js")
    .then(r => r.text())
    .then(eval);
})();
