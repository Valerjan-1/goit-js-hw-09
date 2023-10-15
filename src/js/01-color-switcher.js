const btnStart = document.querySelector(`[data-start]`);
const btnStop = document.querySelector(`[data-stop]`);
const bodyColor = document.querySelector(`body`);

btnStart.addEventListener(`click`, handlerStart);
btnStop.addEventListener(`click`, handlerStop);

let timerId = null;

function handlerStart() {
  timerId = setInterval(getRandomColor, 1000);

  btnStart.toggleAttribute('disabled');
}
function handlerStop() {
  clearInterval(timerId);

  btnStart.removeAttribute('disabled');
}

function getRandomColor() {
  bodyColor.style.backgroundColor = getRandomHexColor();
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
