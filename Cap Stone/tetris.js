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
  
let squareSize = 45; 
let rows, cols;
let activePiece;
let active = [];
  
function preload(){
    reset = loadImage("assets.Te/restart.png"); 
}

function setup(){
    createCanvas(600, 586);
    rows = grid.length;
    cols = grid[0].length;
    activePiece = new Block(); 

    clearGrid();
}

function draw() {
    background(220);
    renderGrid();

    if(activePiece){
        activePiece.show();
        if(frameCount % 30 === 0){
        activePiece.moveDown();
        }
    }
}

function clearGrid(){
    // makes each square white(255)
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
    image(reset, width, height);
}

class Block{
  constructor(){
    this.x = round(random(0, 8));
    this.y = 0;
    this.shape = [
      [1, 1],
      [1, 1]
    ];
    this.blockColor = color(random(255), random(255), random(255));
  }

  show() {
    fill(this.blockColor);
    for(let row = 0; row < this.shape.length; row++){
      for(let col = 0; col < this.shape[row].length; col++){
        if(this.shape[row][col] === 1){
          square((this.x + col) * squareSize, (this.y + row) * squareSize, squareSize);
        }
      }
    }
  }

  moveDown() {
    if (this.y + this.shape.length < rows) {
      this.y++;
    }
  }
}