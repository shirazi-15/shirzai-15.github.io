// 2D Array Basics
// Kamran Shirazi
// Nov 3, 2025

// 0 (black)     255 (white)
// Global Variable
let grid = [
  [0,     0, 0,   255,   0],
  [255,   0, 255,   0, 255],
  [255, 255,   0, 255, 255],
  [0,   255,   0,   0,   0],
]

let rows = grid.length;
let cols = grid[0].length;
let squareSize = 60;

function setup() {
  createCanvas(cols*squareSize, rows*squareSize);
}

function draw() {
  background(220);
  renderGrid();
  print(getCurrentX(), getCurrentY());

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

function flip(x, y){
  // takes a tile @ x, y nand inert color
  if(grid[y][x] === 0) grid[y][x] = 255;
  else grid[y][x] = 0;
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

function mousePressed(){
  // flip current tile
  // upgrade : only do this if the mouse is on the canvas 

  let x = getCurrentX();
  let y = getCurrentY();

  // ALWAYS: flip the "focused tile"
  flip(x, y);
}