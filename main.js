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
function getRows () {
  let rowValues = [];
  for (let y = 0; y < 9; y++) {
    rowValues[y] = [];
    for (let x = 0; x < 9; x++) {
      let squareValue = squares[x+"_"+y].innerText;
      rowValues[y].push(squareValue);
    }
  }
  return rowValues;
}

function getColumns () {
  let colValues = [];
  for (let x = 0; x < 9; x++) {
    colValues[x] = [];
      for (let y = 0; y < 9; y++) {
      let squareValue = squares[x+"_"+y].innerText;
      colValues[x].push(squareValue);
    }
  }
  return colValues;
}
function getBlocks () {
  let blockValues = [];
  let blockNumber = 0;
  for (let brs = 0; brs < 3; y++) {
    let blockColStart = Math.floor(brs / 3) * 3;
    for (let x = 0; x < 9; x++) {
  let blockRowStart = Math.floor(x / 3) * 3;
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if((y%3) ==2  || (x%3) == 2) {
        blockNumber = blockNumber+1;
      }
      blockValues[blockNumber] = [];
      // let squareValue = squares[x+"_"+y].innerText;
      // blockValues[x].push(squareValue);
      blockValues[blockNumber].push(blockNumber);
    }
  }
  return blockValues;
}
function checkIfDuplicateValues(w){
  return new Set(w).size !== w.length 
}

function validationRows(rowNumber = null) {
    // let hasDuplicate = checkIfDuplicateValues(rowValues);

    console.log(getBlocks());
}
function validationColumns() {
}
function validationBlocks() {
}
const puzzle = {
  "5_0": 2,
	"6_0": 9,
	"8_0": 4,
	"0_1": 9,
	"4_1": 6,
	"0_2": 7,
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
function solvePuzzle() {
  validationRows();
}
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
solvePuzzle();