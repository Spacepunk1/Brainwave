document.querySelector(".start-button").addEventListener("click", function () {
  window.location.href = "game.html";
});
function startGame() {
  const body = document.querySelector("body");
  body.classList.add("fade-in");

  setTimeout(function () {
    window.location.href = "game.html";
  }, 500);
}
