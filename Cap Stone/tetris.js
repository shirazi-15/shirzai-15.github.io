// Major Project 
// Kamran Shirazi
// 

// Global Variables       
let grid = [
    [0, 0, 0, 0, 0, 255, 255, 255, 255],
    [0, 0, 0, 0, 0, 255, 255, 255, 255],
    [0, 0, 0, 0, 0, 255, 255, 255, 255],
    [0, 0, 0, 0, 0, 255, 255, 255, 255],
    [0, 0, 0, 0, 0, 255, 255, 255, 255],
    [0, 0, 0, 0, 0, 255, 255, 255, 255],
    [0, 0, 0, 0, 0, 255, 255, 255, 255],
    [0, 0, 0, 0, 0, 255, 255, 255, 255],
    [0, 0, 0, 0, 0, 255, 255, 255, 255],
    [0, 0, 0, 0, 0, 255, 255, 255, 255],
    [0, 0, 0, 0, 0, 255, 255, 255, 255],
    [0, 0, 0, 0, 0, 255, 255, 255, 255],
    [0, 0, 0, 0, 0, 255, 255, 255, 255]
  ];
  
let squareSize = 40; // Shrunk slightly to fit a 600px canvas
let rows, cols;
let activePiece;
  
function preload() {
    // Ensure the folder path and spelling are correct
    // reset = loadImage("assets/restart.png"); 
}

function setup() {
    createCanvas(600, 520);
    rows = grid.length;
    cols = grid[0].length;

    // FIX 1: You must initialize the piece here!
    activePiece = new Block(); 

    clearGrid();
}

function draw() {
    background(220);
    renderGrid();

    // FIX 2: Check if activePiece exists before calling show()
    if (activePiece) {
        activePiece.show();

        if (frameCount % 30 === 0) {
        activePiece.moveDown();
        }
    }
}

function clearGrid(){
    // gives each square a random color eithwe 0 or 255
    for(let y = 0; y<rows; y++){
        for(let x = 0; x<cols; x++){
        grid[y][x] = 255;
        }
     }    
}

function renderGrid(){
  // Interpret the information in the 2D array, and draw
  // a grid of square on the screen to reflect it.
    for(let y = 0; y < rows; y++){
        for(let x = 0; x < cols; x++){
            let fillClolor = grid[y][x];
            fill(fillClolor);
            square(x*squareSize, y*squareSize, squareSize);
        }
    }
}

function getCurrentX(){
    // determine current col of Mouse position
    let constrainedX = constrain(mouseX, 0, width-1);
    return floor(constrainedX / squareSize);
}

function getCurrentY(){
    // determine current rows of Mouse position
    let constrainedY = constrain(mouseY, 0, height-1);
    return floor(constrainedY / squareSize);
}

function restartGame(){
    image(reset, 450, 450);
}

class Block {
    constructor() {
      this.x = 3; 
      this.y = 0;
      this.shape = [
        [1, 1],
        [1, 1]
      ];
    }
  
    show() {
      fill(255, 0, 0); 
      for (let row = 0; row < this.shape.length; row++) {
        for (let col = 0; col < this.shape[row].length; col++) {
          if (this.shape[row][col] === 1) {
            square((this.x + col) * squareSize, (this.y + row) * squareSize, squareSize);
          }
        }
      }
    }
  
    moveDown() {
      // FIX 3: Basic collision - stop at the bottom of the grid
      if (this.y + this.shape.length < rows) {
         this.y++;
      }
    }
  }