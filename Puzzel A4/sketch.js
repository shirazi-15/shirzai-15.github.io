// Puzzel Game
// Kamran Shirazi
// Nov 4, 2025

// 0 (black)     255 (white)
// Global Variable
let grid = [];
let squareSize = 60;
let pat = [0, 255];
let rows; let cols;
let maxSq;
let isSquare;


function setup() {
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
  maxSq = rows*cols;
  isSquare = 0;
  createCanvas(cols*squareSize, rows*squareSize);
}
function draw() {
  background(220);
  renderGrid();
  Overlay();
  youWin();
  print(isSquare )
  
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
  else
    if(isSquare === 0){
      flip(x, y);
      if(x+1 < cols) flip(x+1, y);
      if(x-1 >= 0) flip(x-1, y);    
      if(y+1 < rows) flip(x, y+1);
      if(y-1 >= 0) flip(x, y-1);
    }
    else if(isSquare === 1){
      flip(x, y);
      if(x+1 < cols) flip(x+1, y);
      if(y+1 >= 0) flip(x, y+1);
      if(x+1 < cols && y+1 >= 0) flip(x+1, y+1);
   }
}

function youWin(){
  let winStateA = 0;
  let winStateB = 0;
  for(let c = 0; c < grid.length; c++){
    for(let r = 0; r < grid[c].length; r++){
      if(grid[c][r] === 0){
        winStateA++;
      }
      else if(grid[c][r] === 255){
        winStateB++;
      }
    }
  }
  if(winStateA === maxSq || winStateB === maxSq){
    fill("lime");
    textSize(50);
    text("You Won", width/2, height/2);
  }
}

function Overlay(){
  let x = getCurrentX();
  let y = getCurrentY();

  fill(0,0,255,100);
  // if(isSquare === 0 && keyIsDown(SHIFT)){
  //   square(x*squareSize,y*squareSize,squareSize);     
  // }

  // else if(isSquare === 0 && key === ' '){
  // square(x*squareSize,y*squareSize,squareSize);
  // if(x+1 < cols)square((x+1)*squareSize, y*squareSize, squareSize);
  // if(y+1 < rows)square(x*squareSize,(y+1)*squareSize,squareSize);
  // if(y+1 < rows && x + 1 < cols)square((x+1)*squareSize,(y+1)*squareSize,squareSize);
  // }
  // el     
  switch(isSquare){
    case 0:
      square(x*squareSize ,y*squareSize,squareSize);
      if(x+1 < cols)square((x+1)*squareSize, y*squareSize, squareSize);
      if(x>= 0)square((x-1)*squareSize,y*squareSize,squareSize);
      if(y+1 < rows)square(x*squareSize,(y+1)*squareSize,squareSize);
      if(y-1 >= 0)square(x*squareSize,(y-1)*squareSize,squareSize);
      break;
      
    case 1:
      square(x*squareSize,y*squareSize,squareSize);
      if(x+1 < cols)square((x+1)*squareSize, y*squareSize, squareSize);
      if(y+1 < rows)square(x*squareSize,(y+1)*squareSize,squareSize);
      if(y+1 < rows && x + 1 < cols)square((x+1)*squareSize,(y+1)*squareSize,squareSize);
      break;
    
    case 2:
      square(x*squareSize,y*squareSize,squareSize); 
      break;
  }
}

function keyPressed(){
  if(keyIsDown(SHIFT)){
    isSquare = 2;
  }
  else{
    if(keyCode === 32){
      if(isSquare === 0) isSquare = 1;  
      else isSquare = 0;
    }
  }
}
