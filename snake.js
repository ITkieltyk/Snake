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
// board setting, snake head  and food placing
// board
const board = document.getElementById("board");
board.style.width = `${columns * blockSize}px`;
board.style.height = `${rows * blockSize}px`;
// snake head
const snakeHead = document.createElement("div");
board.appendChild(snakeHead);
snakeHead.style.height = `${blockSize}px`;
snakeHead.style.width = `${blockSize}px`;
snakeHead.style.backgroundColor = "green";
snakeHead.style.position = "absolute";
snakeHead.style.left = `${snakeHor}px`;
snakeHead.style.bottom = `${snakeVert}px`;
snakeHead.style.borderRadius = "5px";
// snake smile
const smileContain = document.createElement("img");
smileContain.style.width = `${blockSize}px`;
smileContain.style.height = `${blockSize}px`;
smileContain.src = "assets/snakeface.png";
snakeHead.appendChild(smileContain);
// food setting
const food = document.createElement("div");
food.style.width = `${blockSize}px`;
food.style.height = `${blockSize}px`;
food.style.position = "absolute";
food.style.borderRadius = "5px";
food.style.left = `${foodHor}px`;
food.style.bottom = `${foodVert}px`;
food.style.backgroundColor = "red";
board.appendChild(food);

//keyboard eventlisteners
window.addEventListener("keydown", (e) => {
  if (e.key === "w" || e.key === "ArrowUp") {
    moveDirection = 1;
  }
  if (e.key === "s" || e.key === "ArrowDown") {
    moveDirection = 2;
  }
  if (e.key === "a" || e.key === "ArrowLeft") {
    moveDirection = 3;
  }
  if (e.key === "d" || e.key === "ArrowRight") {
    moveDirection = 4;
  }
});

setTimeout(function () {
  setInterval(update, updateInterval);
}, 3000);

function update() {
  // collision check
  wallsCollision();
  // Direction change
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

function wallsCollision() {
  if (
    snakeVert === (rows - 1) * blockSize ||
    snakeHor === (columns - 1) * blockSize ||
    snakeVert === 0 ||
    snakeHor === 0
  ) {
    gameOver();
  }
}

function gameOver() {
  alert("Game over!");
  moveDirection = 0;
  snakeVert = blockSize * 3;
  snakeHor = blockSize * 5;
  foodVert = blockSize * 7;
  foodHor = blockSize * 7;
}
