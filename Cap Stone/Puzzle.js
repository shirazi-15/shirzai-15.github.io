// Major Project 
// Kamran Shirazi
// 8 jan to 19 jan

// Global Variables       
let cats = []; 
let img; 
let tiles = [];
let cols = 3; 
let rows = 3; 
let w, h;
let emptyTile = { x: 2, y: 2 };
let moveCount = 0;
let level = 1;
let isWon = false;
let gameFinished = false; // New state for the trophy screen

function preload(){
  cats.push(loadImage("assets.Pu/cat1.png"));
  cats.push(loadImage("assets.Pu/cat2.png"));
  cats.push(loadImage("assets.Pu/cat3.png"));
  cats.push(loadImage("assets.Pu/cat4.png"));
}

function setup(){
  createCanvas(512, 512);
  img = cats[0]; 
  initLevel();
}

function initLevel(){
  tiles = [];
  w = width / cols;
  h = height / rows;
  img.resize(width, height);
  emptyTile = { x: cols - 1, y: rows - 1 };

  for(let y = 0; y < rows; y++){
    for (let x = 0; x < cols; x++){
      if(!(x === cols - 1 && y === rows - 1)){
        let tileImg = img.get(x * w, y * h, w, h);
        tiles.push({ img: tileImg, x: x, y: y, originX: x, originY: y });
      }
    }
  }
  shuffleTiles();
}

function draw(){
  background(220);

  if(gameFinished){
    drawTrophyScreen();
    return;
  }

  for(let i = 0; i < tiles.length; i++){
    let tile = tiles[i];
    image(tile.img, tile.x * w, tile.y * h, w, h);
    noFill();
    stroke(255, 100);
    rect(tile.x * w, tile.y * h, w, h);
  }
  
  fill(40, 40, 40, 180);
  rect(emptyTile.x * w, emptyTile.y * h, w, h);

  fill(0);
  noStroke();
  textSize(18);
  textAlign(LEFT, TOP);
  text("Cat Level: " + level + "/4", 10, 10);
  text("Moves: " + moveCount, 10, 30);

  if(isWon) drawVictoryScreen();
}

function nextLevel(){
  if(level < 4){
    level++;
    moveCount = 0;
    isWon = false;
    img = cats[level - 1];
    initLevel();
  } 
  else{
    gameFinished = true; // Trigger trophy!
  }
}

function drawTrophyScreen(){
  fill(0, 200);
  rect(0, 0, width, height);
  
  // Draw Trophy
  push();
  translate(width / 2, height / 2);
  fill(255, 215, 0); // Gold
  stroke(218, 165, 32);
  strokeWeight(2);
  
  // Cup
  rect(-40, -60, 80, 60, 0, 0, 20, 20);
  // Base
  rect(-30, 0, 60, 10);
  rect(-50, 10, 100, 20);
  // Handles
  noFill();
  strokeWeight(6);
  arc(-40, -40, 40, 40, HALF_PI, PI + HALF_PI);
  arc(40, -40, 40, 40, PI + HALF_PI, HALF_PI);
  pop();

  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(32);
  text("GRAND CHAMPION!", width / 2, height / 2 - 100);
  textSize(20);
  text("You solved all 4 Cat Puzzles!", width / 2, height / 2 + 80);
  textSize(14);
  text("Press 'R' to Restart", width / 2, height / 2 + 110);
}

// --- CONTROLS ---

function mousePressed(){
  if(gameFinished) return;
  if(isWon){ 
    nextLevel();
    return;
  }
  // controls 
  let x = floor(mouseX / w);
  let y = floor(mouseY / h);
  let clicked = tiles.find(t => t.x === x && t.y === y);
  if(clicked && isAdjacent(clicked, emptyTile)){
    let temp = { x: clicked.x, y: clicked.y };
    clicked.x = emptyTile.x;
    clicked.y = emptyTile.y;
    emptyTile = temp;
    moveCount++;
    checkWin();
  }
}

function keyPressed(){
  if(key === 'r' || key === 'R'){
    level = 1;
    moveCount = 0;
    isWon = false;
    gameFinished = false;
    img = cats[0];
    initLevel();
  }
  if(gameFinished) return;
  if(keyIsDown(SHIFT) && keyCode === 32) nextLevel();
  else if(keyCode === SHIFT) autoSolve();
}

function autoSolve(){
  // So people can actually mnove forward 
  for(let t of tiles){ t.x = t.originX; t.y = t.originY; }
  emptyTile.x = cols - 1;
  emptyTile.y = rows - 1;
  checkWin();
}

function isAdjacent(a, b){
  return (abs(a.x - b.x) + abs(a.y - b.y) === 1);
}

function checkWin(){ // win detection
  let match = true;
  for(let t of tiles){
    if (t.x !== t.originX || t.y !== t.originY) { match = false; break; }
  }
  if(match) isWon = true;
}

function drawVictoryScreen(){
  // you win
  fill(0, 220);
  rect(0, 0, width, height);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("CAT " + level + " SOLVED!", width/2, height/2 - 10);
  textSize(18);
  text("Click for the next challenge", width/2, height/2 + 30);
}

function shuffleTiles(){
  // shuffles the img make the game 
  for(let i = 0; i < 150; i++){
    let neighbors = getNeighbors(emptyTile);
    let choice = random(neighbors);
    let tile = tiles.find(t => t.x === choice.x && t.y === choice.y);
    if(tile){
      let temp = { x: tile.x, y: tile.y };
      tile.x = emptyTile.x;
      tile.y = emptyTile.y;
      emptyTile = temp;
    }
  }
}

function getNeighbors(pos){
  // position
  let n = [];
  if(pos.x > 0) n.push({ x: pos.x - 1, y: pos.y });
  if(pos.x < cols - 1) n.push({ x: pos.x + 1, y: pos.y });
  if(pos.y > 0) n.push({ x: pos.x, y: pos.y - 1 });
  if(pos.y < rows - 1) n.push({ x: pos.x, y: pos.y + 1 });
  return n;
}