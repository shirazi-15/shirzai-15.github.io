// Puzzel Game
// Kamran Shirazi
// Nov 4, 2025

// 0 (black)     255 (white)
// Global Variable
let grid = [[],[]];
let squareSize = 60;
let pat = [0, 255];
let rows;
let cols;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = [
    [random(pat), random(pat), random(pat), random(pat), random(pat), random(pat), random(pat), random(pat)],
    [random(pat), random(pat), random(pat), random(pat), random(pat), random(pat), random(pat), random(pat)],
    [random(pat), random(pat), random(pat), random(pat), random(pat), random(pat), random(pat), random(pat)],
    [random(pat), random(pat), random(pat), random(pat), random(pat), random(pat), random(pat), random(pat)],
    [random(pat), random(pat), random(pat), random(pat), random(pat), random(pat), random(pat), random(pat)],
    [random(pat), random(pat), random(pat), random(pat), random(pat), random(pat), random(pat), random(pat)],
    [random(pat), random(pat), random(pat), random(pat), random(pat), random(pat), random(pat), random(pat)],
    [random(pat), random(pat), random(pat), random(pat), random(pat), random(pat), random(pat), random(pat)]
  ];
  rows = grid.length;
  cols = grid[0].length;
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

  // ALWAYS: flip the "focused tile
  // If they Exist:
  // filp our 

  if(keyIsDown(SHIFT)){
    flip(x, y);
  }
  else{
    flip(x, y);
    if(x+1 < cols) flip(x+1, y);
    if(x-1 >= 0) flip(x-1, y);
    if(y+1 < rows) flip(x, y+1);
    if(y-1 >= 0) flip(x, y-1);
  }
}

function youWin(){

}