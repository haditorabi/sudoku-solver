const board = document.getElementById("board");
const squares = {};
const solveStack = [];

for (let x = 0; x < 9; x++) {
  for (let y = 0; y < 9; y++) {
    let square = document.createElement("div");
    
    square.contentEditable = true;
    square.className = "square";
    
    if (x % 3 == 2) {
      square.className += " right-border";
    }
    if (y % 3 == 2) {
      square.className += " bottom-border";
    }
    
    board.appendChild(square);
    
    squares[x+"_"+y] = square;
  }
}
const puzzle = {
	"5_0": 2,
	"6_0": 9,
	"8_0": 4,
	"0_1": 9,
	"4_1": 6,
	"0_2": 6,
	"1_2": 2,
	"5_2": 7,
	"0_3": 7,
	"2_3": 6,
	"5_3": 9,
	"6_3": 5,
	"0_4": 4,
	"8_4": 9,
	"2_5": 8,
	"3_5": 5,
	"6_5": 6,
	"8_5": 2,
	"3_6": 3,
	"7_6": 8,
	"8_6": 7,
	"4_7": 4,
	"8_7": 5,
	"0_8": 3,
	"2_8": 1,
	"3_8": 2,
}

for (let key in puzzle) {
  let square = squares[key]
  square.innerText = puzzle[key];
  square.solved = true
}
// console.log(squares);
var solveButton = document.getElementById("solve-button");
var resetButton = document.getElementById("reset-button");
var validateButton = document.getElementById("validate-button");

solveButton.onclick = function() {
  console.time("solve");
  solvePuzzle();
  console.timeEnd("solve");
}
resetButton.onclick = function() {
  console.time("reset");
  resetPuzzle();
  console.timeEnd("reset");
}
validateButton.onclick = function() {
  console.time("validate");
  validatePuzzle();
  console.timeEnd("validate");
}