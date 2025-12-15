// Major Project 
// Kamran Shirazi
// 13 Dec

// Global Variables       
let groundHeight = 20;      
let maxLineLength = 25;     
let brokenLineGap = 40;     
let lineSpacing = 5;   
let groundSpeed = 0.3; // smaller = slower
let groundOffset = 0;

let player; // Dino instance

function setup() {
  createCanvas(1000, 800); 
  player = new Dino(100, height - groundHeight - 50);
}

function draw() {
  background(255); 


  // Draw scrolling ground
  drawGround();

  // Update and display Dino
  player.update();
  player.display();
}

function keyPressed() {
  if (keyCode === 32) { 
    player.jump();
  } 
}

function drawGround() {
  stroke(0);
  strokeWeight(2);

  // Top solid line
  line(0, height - groundHeight, width, height - groundHeight);

  let brokenLineIndex = floor(random(1, 4));
  let y = height - groundHeight + brokenLineIndex * lineSpacing;

  groundOffset += groundSpeed;
  let x = -groundOffset % brokenLineGap;

  while (x < width) {
    let segmentLength = random(10, maxLineLength);
    line(x, y, x + segmentLength, y);
    x += segmentLength + brokenLineGap;
  }
}

// Dino class
class Dino {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = 0;   // vertical velocity
    this.g = 0.6;  // gravity
    this.jumpForce = -12;
    this.onGround = false;
    this.size = 50;
  }

  display() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.size, this.size); // Dino rectangle
  }

  jump() {
    if (this.onGround) {
      this.vy = this.jumpForce;
      this.onGround = false;
    }
  }

  update() {
    this.vy += this.g;
    this.y += this.vy;

    if (this.y + this.size >= height - groundHeight) {
      this.y = height - groundHeight - this.size;
      this.vy = 0;
      this.onGround = true;
    }
  }
}
  
