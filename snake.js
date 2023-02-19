//Values of the board
const columns = 15;
const rows = 15;
const blockSize = 20;
const updateInterval = 500;
const snake = [];
let score = 0;

let snakeVert = blockSize * 3;
let snakeHor = blockSize * 5;
let foodVert = blockSize * 7;
let foodHor = blockSize * 7;
let moveDirection = 0;
const highScoreList = [];

// board setting, snake head  and food placing
// board
const board = document.getElementById("board");
board.style.width = `${columns * blockSize}px`;
board.style.height = `${rows * blockSize}px`;
// snake head
const snakeHead = document.createElement("div");

snakeHead.style.height = `${blockSize}px`;
snakeHead.style.width = `${blockSize}px`;
snakeHead.style.backgroundColor = "green";
snakeHead.style.position = "absolute";
snakeHead.style.left = `${snakeHor}px`;
snakeHead.style.bottom = `${snakeVert}px`;
snakeHead.style.borderRadius = "50%";
snake.push(snakeHead);
board.appendChild(snakeHead);
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
  //snake segments positiong update
  for (let i = snake.length - 1; i > 0; i--) {
    if (i !== 0) {
      snake[i].style.bottom = snake[i - 1].style.bottom;
      snake[i].style.left = snake[i - 1].style.left;
    }
  }
  // snakeHead new position position
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
  // walls collision check
  wallsCollision();
  //snakeHead position update
  snakeHead.style.left = `${snakeHor}px`;
  snakeHead.style.bottom = `${snakeVert}px`;
  //snake own body colision
  eatingTail();
  //snake growing
  eat();
}

function wallsCollision() {
  if (
    snakeVert === rows * blockSize ||
    snakeHor === columns * blockSize ||
    snakeVert === 0 - blockSize ||
    snakeHor === 0 - blockSize
  ) {
    gameOver();
  }
}

function eatingTail() {
  snake.forEach((snakeSegment, segInx) => {
    if (segInx !== 0) {
      if (
        (snakeHead.style.bottom === snakeSegment.style.bottom) &
        (snakeHead.style.left === snakeSegment.style.left)
      ) {
        gameOver();
      }
    }
  });
}

function gameOver() {
  score = snake.length - 1;

  moveDirection = 0;
  snakeVert = blockSize * 3;
  snakeHor = blockSize * 5;
  foodVert = blockSize * 7;
  foodHor = blockSize * 7;
  food.style.left = `${foodHor}px`;
  food.style.bottom = `${foodVert}px`;
  for (let i = snake.length - 1; i > 0; i--) {
    board.lastChild.remove();
  }
  snake.length = 1;
  alert("Game over!");
  HighScore();
}
function eat() {
  if ((snakeHor === foodHor) & (snakeVert === foodVert)) {
    const segment = document.createElement("div");
    segment.id = `segment_${snake.length + 1}`;
    segment.classList.add("segment");
    segment.style.position = "absolute";
    segment.style.bottom = `${foodVert}px`;
    segment.style.left = `${foodHor}px`;
    segment.style.height = `${blockSize}px`;
    segment.style.width = `${blockSize}px`;
    board.appendChild(segment);
    snake.push(segment);
    foodHor = Math.floor(Math.random() * columns) * blockSize;
    foodVert = Math.floor(Math.random() * rows) * blockSize;
    food.style.left = `${foodHor}px`;
    food.style.bottom = `${foodVert}px`;
    //eaten food counter
    document.getElementById("segmentCounter").innerHTML = `Score: ${
      snake.length - 1
    }`;
  }
}
function HighScore() {
  if (highScoreList.length !== 0) {
    if (score > highScoreList[highScoreList.length]) {
      let highScorer = prompt(
        "Congratulations! New High Score! Enter Your name:",
        ""
      );
      highScoreList.push([highScorer, score]);
      highScoreTable();
    }
  } else {
    let highScorer = prompt(
      "Congratulations! New High Score! Enter Your name:",
      ""
    );
    highScoreList.push([highScorer, score]);
    highScoreTable();
  }
}

function highScoreTable() {
  document.getElementById("highscoreTable").style.visibility = "visible";
  document.getElementById("highscoreTable").style.width = "fit-content";

  const listElement = document.createElement("li");
  listElement.innerText = `${highScoreList[highScoreList.length - 1][0]}: ${
    highScoreList[highScoreList.length - 1][1]
  }`;
  document.getElementById("highscoreTable").appendChild(listElement);
}
