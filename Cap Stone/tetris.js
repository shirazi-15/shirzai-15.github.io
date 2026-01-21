// Major Project 
// Kamran Shirazi
// Dec 29 to Jan 9

// Global Variables       
let grid = [];
let squareSize = 45; 
let rows = 15;
let cols = 12;
let activePiece;
let score = 0;
let isGameOver = false;
let highscore_TT;

// All 7 Tetromino shapes defined as matrices
const SHAPES = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[0, 1, 0], [1, 1, 1]], // T
  [[1, 1, 0], [0, 1, 1]], // S
  [[0, 1, 1], [1, 1, 0]], // Z
  [[1, 0, 0], [1, 1, 1]], // J
  [[0, 0, 1], [1, 1, 1]]  // L
];

function setup(){
  createCanvas(squareSize * cols, squareSize * rows);
  clearGrid();
  activePiece = new Block(); 

  // local Storage
  if(localStorage.getItem("highscore_TT")===null){
    localStorage.setItem("highscore_TT", 0);
  }
  else{ // implies a stored number of items
    highscore_TT = int(localStorage.getItem("highscore_TT"));
  }
}

function draw(){
  background(220);
  renderGrid();

  if(isGameOver){
    displayGameOver();
    return; 
  }

  if(activePiece){  
    let targetX = floor(mouseX / squareSize);
    let maxCol = cols - activePiece.shape[0].length;
    targetX = constrain(targetX, 0, maxCol);
    activePiece.moveToMouse(targetX);
    
    activePiece.show();

    if(frameCount % 30 === 0){
      if(!activePiece.moveDown()){
        lockPiece();
        checkLines();
        activePiece = new Block(); 
      }
    }
  }
  
  drawScore();
}

// INPUT HANDLING
function mousePressed(){
  if(activePiece && !isGameOver){
    activePiece.rotate();
  }
}

function keyPressed(){
  // If Space is pressed (keyCode 32)
  if(keyCode === 32){
    score = 0;
    isGameOver = false;
    clearGrid();
    activePiece = new Block();
    
    loop(); 
    
    console.log("Game Reset!");
  }
}

// --- GAME LOGIC FUNCTIONS ---
function clearGrid(){
  // Initialize grid with 255 (white)
  grid = Array.from({ length: rows }, () => Array(cols).fill(255));
}

function renderGrid(){
  for(let y = 0; y < rows; y++) {
    for(let x = 0; x < cols; x++) {
      fill(grid[y][x]);
      stroke(200);
      square(x * squareSize, y * squareSize, squareSize);
    }
  }
}

function lockPiece(){
  // No block going down 
  for(let r = 0; r < activePiece.shape.length; r++){
    for(let c = 0; c < activePiece.shape[r].length; c++){
      if(activePiece.shape[r][c] === 1){
        let gridY = activePiece.y + r;
        let gridX = activePiece.x + c;
        if(gridY >= 0 && gridY < rows){
          grid[gridY][gridX] = activePiece.blockColor;
        }
      }
    }
  }
}

function checkLines(){
  // score and line claer 
  for(let y = rows - 1; y >= 0; y--){
    let isFull = true;
    for(let x = 0; x < cols; x++){
      if(grid[y][x] === 255){
        isFull = false;
        break;
      }
    }
    if (isFull) {
      grid.splice(y, 1);
      grid.unshift(new Array(cols).fill(255));
      score += 10;
      y++;
    }
  }
}

function drawScore(){
  // high score will only be shown on the end screen 
  fill(0);
  noStroke();
  textSize(20);
  textAlign(LEFT);
  text("Score: " + score, 15, 30);

  if(highscore_TT < score){
    highscore_TT = score;
    localStorage.setItem("highscore_TT" , highscore_TT);
  }

}

function displayGameOver(){
  // dispalys high score
  fill(0, 180); 
  rect(0, 0, width, height);
  textAlign(CENTER, CENTER);
  noStroke();
  fill(255, 50, 50); 
  textSize(50);
  text("GAME OVER", width / 2, height / 2 - 60);
  fill(255);
  textSize(32);
  text("HIgh Score: " + highscore_TT, width / 2, height / 2 + 10);
  textSize(16);
  fill(200);
  text("Press SPACE to Play Again", width / 2, height / 2 + 70);
}

// --- THE BLOCK CLASS ---
class Block {
  constructor() {
    this.shape = random(SHAPES);
    this.x = floor(cols / 2) - floor(this.shape[0].length / 2);
    this.y = 0;
    this.blockColor = color(random(100, 255), random(100, 255), random(100, 255));
    if (this.collision(0, 0)) {
      isGameOver = true; 
    }
  }

  show() {
    fill(this.blockColor);
    stroke(255);
    for (let r = 0; r < this.shape.length; r++) {
      for (let c = 0; c < this.shape[r].length; c++) {
        if (this.shape[r][c] === 1) {
          square((this.x + c) * squareSize, (this.y + r) * squareSize, squareSize);
        }
      }
    }
  }

  moveDown() {
    if (!this.collision(0, 1)) {
      this.y++;
      return true;
    }
    return false;
  }

  moveToMouse(targetX) {
    let diff = targetX - this.x;
    let step = (diff > 0) ? 1 : -1;
    while (this.x !== targetX) {
      if (!this.collision(step, 0)) {
        this.x += step;
      } else {
        break;
      }
    }
  }

  rotate() {
    let newShape = Array.from({ length: this.shape[0].length }, () => 
      Array(this.shape.length).fill(0)
    );
    for (let r = 0; r < this.shape.length; r++) {
      for (let c = 0; c < this.shape[r].length; c++) {
        newShape[c][r] = this.shape[r][c];
      }
    }
    newShape.forEach(row => row.reverse());

    let oldShape = this.shape;
    this.shape = newShape;
    if (this.collision(0, 0)) {
      this.shape = oldShape;
    }
  }

  collision(dx, dy) {
    for (let r = 0; r < this.shape.length; r++) {
      for (let c = 0; c < this.shape[r].length; c++) {
        if (this.shape[r][c] === 1) {
          let nextX = this.x + c + dx;
          let nextY = this.y + r + dy;
          if (nextX < 0 || nextX >= cols || nextY >= rows) return true;
          if (nextY >= 0 && grid[nextY][nextX] !== 255) return true;
        }
      }
    }
    return false;
  }
}