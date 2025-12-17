// Major Project 
// Kamran Shirazi
// 13 Dec

// Global Variables       
let groundHeight = 20; ;let brokenLineGap = 40;
let groundOffset = 0; let groundSpeed = 1.5;  
let lineSpacing = 4; let dashLength = 18; 
let dashGap = 42; let gameState = false;
let run1; let run2;
let player; // Dino instance

function setup(){
  createCanvas(1000, 800);
  player = new Dino(100);
}

function preload(){
  run1 = loadImage("assets.Tx/run1.png");
  run2 = loadImage("assets.Tx/run2.png");
  idel = loadImage("assets.Tx/idel.png");
  ob1 = loadImage("assets.Tx/ob1.png");
}

function draw(){
  background(255);
  
  if(gameState === true){
    // Draw scrolling ground
    drawGround();

    // Update and display Dino
    player.update();
    player.display();
    groundSpeed += 0.0003;
  }
  else{
    image(idel, 100, 705);
  }

}

function keyPressed(){
  if (keyCode === 32) {
    player.jump();
    if(gameState === false) gameState = true;
  }
}

function mousePressed(){
  if(gameState === false){
    gameState = true;
  }
}
function drawGround(){
  stroke(0);
  strokeWeight(2);

  let groundY = height - groundHeight;

  // solid top line
  line(0, groundY, width, groundY);

  // move ground
  groundOffset -= groundSpeed;
  if (groundOffset <= -width) {
    groundOffset = 0;
  }

  let dashLength = 20;
  let dashGap = 40;

  randomSeed(1); // keeps height pattern fixed

  for (let x = groundOffset; x < width; x += dashLength + dashGap) {
    // choose ONE height per segment
    let yOffset = floor(random(1, 4)) * lineSpacing;
    let dashY = groundY + yOffset;

    line(x, dashY, x + dashLength, dashY);
  }
}

class Dino {
  constructor(x){
    this.x = x;

    this.w = run1.width;
    this.h = run1.height*0.85;

    // PERFECT ground placement
    this.y = height - groundHeight - this.h;

    this.vy = 0;
    this.g = 0.8;
    this.jumpForce = -15;
    this.onGround = true;
    this.animSpeed = 50;
  }

  update(){
    this.vy += this.g;
    this.y += this.vy;

    if (this.y >= height - groundHeight - this.h) {
      this.y = height - groundHeight - this.h;
      this.vy = 0;
      this.onGround = true;
    }
  }

  jump(){
    if (this.onGround) {
      this.vy = this.jumpForce;
      this.onGround = false;
    }
  }

  display(){
    if (frameCount % this.animSpeed < this.animSpeed / 2) {
      image(run1, this.x, this.y);
    } else {
      image(run2, this.x, this.y);
    }
  }
}

class Cbstacle{
  constructor(x){
    this.x = x;
    this.choice = [1, 2, 3];
    this.ob = random(this.choice);
  }
  display(){
    if(this.ob === 1){
      image(ob1, this.x, this.y);
    }
  }
}