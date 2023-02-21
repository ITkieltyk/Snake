//Values of the board
const columns = 15;
const rows = 15;
const blockSize = 20;
const updateInterval = 500;
const snake = [];
let score = 0;
let intervalCount = 0;

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

const gameInterval = setInterval(update, updateInterval);
console.log(gameInterval);
intervalCount++;

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
  clearInterval(intervalCount);
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
  if (highScoreList.length > 4) {
    if (score > highScoreList[highScoreList.length - 1][1]) {
      PopupInput();
    }
  } else {
    PopupInput();
  }
}

function highScoreTable() {
  const highScoretable = document.getElementById("highscoreTable");
  highScoretable.style.visibility = "visible";
  highScoretable.style.width = "fit-content";
  highScoretable.innerHTML = "<h4>Hall of Fame</h4>";
  highScoreList.forEach((el) => {
    const listElement = document.createElement("li");
    listElement.innerText = `${el[0]}: ${el[1]}`;
    highScoretable.appendChild(listElement);
  });
}

function PopupInput() {
  const popupForHighscore = document.createElement("div");
  popupForHighscore.id = "popupForHighscore";
  popupForHighscore.innerHTML = `<div class="popupWrapper">
      <h3>Congratulations!</h3>
      <h4>You have achieved highscore!</h4>
      <label for="highscorerName">Please write your name:</label>
      <input type="text" name="highscorerName" id="highscorerName" autofocus />
      <button onclick="highScoreSave()" id="highScoreSave">Save</button>
    <button id="highscorePopupClose" onclick = "event.target.parentElement.remove(); setInterval(update, updateInterval);
  intervalCount++;
  moveDirection = 0; ">X</button>
  </div>`;

  board.appendChild(popupForHighscore);
}
function highScoreSave() {
  //push data to table
  highScoreList.push([document.getElementById("highscorerName").value, score]);
  highScoreList.sort((a, b) => b[1] - a[1]);
  if (highScoreList.length === 6) {
    highScoreList.length = 5;
  }
  highScoreTable();
  console.log(highScoreList);
  setInterval(update, updateInterval);
  intervalCount++;
  moveDirection = 0;
  document.getElementById("popupForHighscore").remove();
}
