// Major Project 
// Kamran Shirazi
// 13 Dec to 29 Dec

// Global Variables       
let img;
let tiles = [];
let cols = 3;
let rows = 3;
let w, h;
let emptyTile = { x: 2, y: 2 };

function preload() {
  // You can replace this with any image URL or local file path
  img = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/512px-Cat03.jpg");
}

function setup() {
  createCanvas(512, 512);
  w = width / cols;
  h = height / rows;
  img.resize(width, height);
  
  // Create tiles
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let tile = img.get(x * w, y * h, w, h);
      tiles.push({ img: tile, x: x, y: y });
    }
  }
  
  // Remove last tile (empty space)
  tiles.pop();
  shuffleTiles();
}

function draw() {
  background(200);
  // Draw tiles
  for (let i = 0; i < tiles.length; i++) {
    let tile = tiles[i];
    image(tile.img, tile.x * w, tile.y * h, w, h);
  }
  
  // Draw empty tile border
  noFill();
  stroke(0);
  strokeWeight(3);
  rect(emptyTile.x * w, emptyTile.y * h, w, h);
}

function mousePressed() {
  let x = floor(mouseX / w);
  let y = floor(mouseY / h);
  
  // Find clicked tile
  let clicked = tiles.find(t => t.x === x && t.y === y);
  
  if (clicked && isAdjacent(clicked, emptyTile)) {
    // Swap clicked tile and empty
    let temp = { x: clicked.x, y: clicked.y };
    clicked.x = emptyTile.x;
    clicked.y = emptyTile.y;
    emptyTile = temp;
  }
}

function isAdjacent(a, b) {
  let dx = abs(a.x - b.x);
  let dy = abs(a.y - b.y);
  return (dx + dy === 1);
}

function shuffleTiles() {
  // Random valid moves
  for (let i = 0; i < 200; i++) {
    let neighbors = getNeighbors(emptyTile);
    let choice = random(neighbors);
    let tile = tiles.find(t => t.x === choice.x && t.y === choice.y);
    if (tile) {
      let temp = { x: tile.x, y: tile.y };
      tile.x = emptyTile.x;
      tile.y = emptyTile.y;
      emptyTile = temp;
    }
  }
}

function getNeighbors(pos) {
  let n = [];
  if (pos.x > 0) n.push({ x: pos.x - 1, y: pos.y });
  if (pos.x < cols - 1) n.push({ x: pos.x + 1, y: pos.y });
  if (pos.y > 0) n.push({ x: pos.x, y: pos.y - 1 });
  if (pos.y < rows - 1) n.push({ x: pos.x, y: pos.y + 1 });
  return n;
}
