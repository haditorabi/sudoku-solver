var board = document.getElementById("board");
var squares = {};
var solveStack = [];

for (var x = 0; x < 9; x++) {
  for (var y = 0; y < 9; y++) {
    var square = document.createElement("div");
    
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