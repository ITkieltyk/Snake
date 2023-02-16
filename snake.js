//Values of the board
const columns = 15;
const rows = 15;
const blockSize = 20;
const updateInterval = 500;

let snakeVert = blockSize * 3;
let snakeHor = blockSize * 5;
let foodVert = blockSize * 7;
let foodHor = blockSize * 7;
let moveDirection = 0;

const board = document.getElementById("board");

// window.onload = function () {
board.setAttribute("width", `${columns * blockSize}px`);
board.setAttribute("height", `${rows * blockSize}px`);
board.style.backgroundColor = "grey";
board.style.margin = "auto";
board.style.position = "relative";
const snakeHead = document.createElement("div");
board.appendChild(snakeHead);
snakeHead.style.height = `${blockSize}px`;
snakeHead.style.width = `${blockSize}px`;
snakeHead.style.backgroundColor = "green";

snakeHead.style.position = "absolute";
snakeHead.style.left = `${snakeHor}px`;
snakeHead.style.bottom = `${snakeVert}px`;
snakeHead.style.borderRadius = "5px";
const smileContain = document.createElement("img");
smileContain.style.width = `${blockSize}px`;
smileContain.style.height = `${blockSize}px`;
smileContain.src = "assets/snakeface.png";
snakeHead.appendChild(smileContain);

window.addEventListener("keydown", (e) => {
  if (e.key == "w") {
    moveDirection = 1;
  }
  if (e.key == "s") {
    moveDirection = 2;
  }
  if (e.key == "a") {
    moveDirection = 3;
  }
  if (e.key == "d") {
    moveDirection = 4;
  }
});

setTimeout(function () {
  setInterval(update, updateInterval);
}, 3000);

// Direction change

function update() {
  if (moveDirection === 1) {
    snakeVert = snakeVert + blockSize;
  } else if (moveDirection === 2) {
    snakeVert = snakeVert - blockSize;
  } else if (moveDirection === 3) {
    snakeHor = snakeHor - blockSize;
  } else if (moveDirection === 4) {
    snakeHor = snakeHor + blockSize;
  } else if (moveDirection === 0) {
    snakeVert = snakeVert;
    snakeHor = snakeHor;
  }
  snakeHead.style.left = `${snakeHor}px`;
  snakeHead.style.bottom = `${snakeVert}px`;
}
