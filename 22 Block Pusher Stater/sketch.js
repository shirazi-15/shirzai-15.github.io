// Block Pusher
// Kamran Shirazi
// Nov 7, 2025

// Global Variable

tiles = []; // 0.png → grass, 1.png → chicken, 2.png → cow, 3.png → star
let level = [
  [0, 1, 0, 3, 0],
  [1, 0, 0, 1, 0],
  [0, 1, 1, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0],
]

let playerX = 3; let playerY = 4;
let rows = level.length;
let cols = level[0].length;
let tileSize = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  loadAssets();
  level[playerY][playerX] = 2;
}

async function loadAssets(){
  // load our four (or more) tile images
  for(let i = 0; i < 4; i++){
    tiles.push(await loadImage("assets/"+i+".png"));
  }
}

function draw() {
  background(220);
  renderBoard();

}

function swap(x1, y1, x2, y2){
  // modify the gameboard: switch 2 tiles
  let temp = level[y1][x1];
  level[y1][x1] = level[y2][x2];
  level[y2][x2] = temp;
}

function keyPressed(){
  //encat a single action per keypress

  if(keyCode === LEFT_ARROW){
    if(playerX > 0){ // make sure not on the left side
      if(level[playerY][playerX - 1] === 0){
        swap(playerX, playerY, playerX - 1, playerY);
        playerX--;
      }
      else if(level[playerY][playerX - 1] === 1){
        // check to see if there is room for it to be pushed
        // check to see if there is grass beyond te chicken
        if(playerX > 1 && level[playerY][playerX -2] === 0){
          // Swap grass-chicken
          // Swap grass-cow
          swap(playerX-1, playerY, playerX-2, playerY);
          swap(playerX, playerY, playerX-1, playerY);
          playerX--;
        }
      }
    }
  }
  if(keyCode === RIGHT_ARROW){
    swap(playerX, playerY, playerX + 1, playerY);
    playerX++;

  }
  if(keyCode === UP_ARROW){
    swap(playerX, playerY, playerX, playerY - 1);
    playerY--;
  }
  if(keyCode === DOWN_ARROW){
    swap(playerX, playerY, playerX, playerY + 1);
    playerY++;
  }
}

function renderBoard(){
  // interpret the data in our 2D array, place
  // images on the canvas
  for(let x = 0; x < cols; x++){
    for(let y = 0; y < rows; y++){
      let imgIndex  = level[y][x];
      let currentImage = tiles[imgIndex];
      image(currentImage, x*tileSize, y*tileSize);
    }
  }
}