//Values of the board
const columns = 15;
const rows = 15;
const blockSize = 20;

const board = document.getElementById("board");

board.setAttribute("width", `${columns * blockSize}px`);
board.setAttribute("height", `${rows * blockSize}px`);
board.setAttribute("background-color", "black");

// window.onload = function () {
//   board.setAttribute("style", `width:${columns * blockSize}`);
//   board.setAttribute("height", `height:${rows * blockSize}`);
//   board.setAttribute("style", "background-color: black");
//   console.log(board.getAttribute("width"));
// };
