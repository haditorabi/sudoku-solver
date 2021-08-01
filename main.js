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
function getRows (rowNumber = null) {
  let rowValues = [];
  for (let y = 0; y < 9; y++) {
    rowValues[y] = [];
    for (let x = 0; x < 9; x++) {
      let squareValue = squares[x+"_"+y].innerText;
      rowValues[y].push(squareValue);
    }
  }
  if(rowNumber !== undefined && rowNumber !== null) {
    return rowValues[rowNumber];
  } else {
    return rowValues;
  }
}

function getColumns (colNumber = null) {
  let colValues = [];
  for (let x = 0; x < 9; x++) {
    colValues[x] = [];
      for (let y = 0; y < 9; y++) {
      let squareValue = squares[x+"_"+y].innerText;
      colValues[x].push(squareValue);
    }
  }
  if(colNumber !== undefined && colNumber !== null) {
    // console.log(colValues[colNumber]);
    return colValues[colNumber];
  } else {
    return colValues;
  }
}
function getBlocks (bloNumber = null) {
  let blockValues = [];
  let blockNumber = 0;
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      let squareValue = "";
      blockNumber = (Math.floor(y/3)*3)+Math.floor(x/3);
      if(!Array.isArray(blockValues[blockNumber])) {
        blockValues[blockNumber] = [];
      }
      squareValue = squares[x+"_"+y].innerText;
      blockValues[blockNumber].push(squareValue);
    }
  }
  if(bloNumber !== undefined && bloNumber !== null) {
    return blockValues[bloNumber];
  } else {
    return blockValues;
  }
}

function removeEmptyElements (set) {
  return set.filter(Number);
}
function removeDuplicateElements (set) {
  return [...new Set(set)];
  ;
}

function hasDuplicateValues(sets) {
  let checkSet = [];
  sets.forEach((set) => {
    let filteredSet = removeEmptyElements(set);
    hasDuplicate =  new Set(filteredSet).size !== filteredSet.length
    checkSet.push(hasDuplicate);
  })
  let result = checkSet.includes(true);
  return result;
}

function areValidRows() {
  return !hasDuplicateValues(getRows());
}
function areValidColumns() {
  return !hasDuplicateValues(getColumns());
}
function areValidBlocks() {
  return !hasDuplicateValues(getBlocks());
}
function isValidPuzzle () {
  return areValidBlocks() && areValidColumns() && areValidRows;
}
function getCellsPossibleValues () {
  let cellPossibilities = [];
  for(i = 0; i < 81; i++) {
    cellPossibilities.push(getCellPossibleValues(i));
  }
  return cellPossibilities;
}
function getPossibleValues (rows, cols, blos) {
  let validValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let currentNeighbors = removeDuplicateElements([...rows, ...cols, ...blos])
  let possibleValues = validValues.filter(x => !currentNeighbors.includes(x));
  return possibleValues;
}
function getRowNumByCellNumber (cellNumber) {
  return Math.floor(cellNumber/9);
}
function getColNumByCellNumber (cellNumber) {
  return Math.floor(cellNumber%9);
}
function getBloNumByCellNumber (cellNumber) {
  return (Math.floor(Math.floor(cellNumber/9) / 3) * 3) + Math.floor((cellNumber%9)/3);
}
function getCellPossibleValues (cellNumber) {
  let rowNumber = getRowNumByCellNumber(cellNumber);
  let colNumber = getColNumByCellNumber(cellNumber);
  let bloNumber = getBloNumByCellNumber(cellNumber);
  return getPossibleValues(
    removeEmptyElements( getRows(rowNumber)), 
    removeEmptyElements( getColumns(colNumber)), 
    removeEmptyElements( getBlocks(bloNumber))
  );
}

const invalidPuzzle = {
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
	"2_8": 6,
	"3_8": 2,
}
var validPuzzle = {
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

for (let key in validPuzzle) {
  let square = squares[key]
  square.innerText = validPuzzle[key];
  square.solved = true
}

function solvePuzzle() {
  if(isValidPuzzle()) {
    let cellPossibilities = getCellsPossibleValues();
    for(i = 1; i < 9; i++) {
      for(j = 1; j < cellPossibilities.length; j++) {
        if(cellPossibilities[j].length == i) {
          let square = squares[getRowNumByCellNumber(j)+"_"+getColNumByCellNumber(j)];
          // square.innerText = validPuzzle[cellPossibilities[j][0]];
          if (isValidPuzzle()) {
          square.solved = true;
          } else {

          // console.log(cellPossibilities[j]);

          return;
        }
        }
      }
    }
  } else {
    const invalidPuzzleDiv = document.getElementById("invalid-puzzle");
    invalidPuzzleDiv.classList.remove("hide");
  }
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