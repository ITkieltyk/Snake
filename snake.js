//Values of the board
const columns = 15;
const rows = 15;
const blockSize = 20;
const updateInterval = 500;

let snakeVert = blockSize * 3;
let snakeHor = blockSize * 5;

const board = document.getElementById("board");

window.onload = function () {
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
  // snakeHead.style.backgroundImage = "url('assets/snakesface.jpg')";

  snakeHead.style.position = "absolute";
  snakeHead.style.left = `${snakeHor}px`;
  snakeHead.style.bottom = `${snakeVert}px`;
  snakeHead.style.borderRadius = "5px";

  update();
};

function move() {
  const moveStep = 5;
}

function update() {}
