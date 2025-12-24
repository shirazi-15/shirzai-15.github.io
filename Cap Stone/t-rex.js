// Major Project 
// Kamran Shirazi
// 13 Dec

// Global Variables       
let groundHeight = 20; let groundOffset = 0; 
let groundSpeed = 8; let lineSpacing = 4; 
let gameState = false; let run1, run2, idel, ob1;
let obstacles = []; let nextSpawn = 0;
let player; 

function preload(){
  run1 = loadImage("assets.Tx/run1.png");
  run2 = loadImage("assets.Tx/run2.png");
  idel = loadImage("assets.Tx/idel.png");
  ob1 = loadImage("assets.Tx/ob1.png");
}

function setup(){
  createCanvas(1000, 800);
  player = new Dino(100);
}

function draw(){
  background(255);
  
  if(gameState === true){
    drawGround();
    player.update();
    player.display();
    
    groundSpeed += 0.0003;

    if (frameCount > nextSpawn){
      obstacles.push(new Obstacle(width, groundSpeed, ob1)); 
      nextSpawn = frameCount + random(60, 120);
    }

    for (let i = obstacles.length - 1; i >= 0; i--){
      obstacles[i].move();
      obstacles[i].display();

      if (obstacles[i].offScreen()){
        obstacles.splice(i, 1);
      }
    }

    handleCollisions();
  }
  else{
    let idelY = height - groundHeight - 60;
    image(idel, 100, idelY, 60, 60);
    
    textAlign(CENTER);
    textSize(25);
    fill(100);
    text("Press SPACE to Start", width/2, height/2);
  }
}

function handleCollisions() {
  for (let obs of obstacles) {
    if (obs.hits(player)) {
      gameState = false;
      gameOver();
    }
  }
}

function gameOver() {
  noLoop(); 
  push();
  textAlign(CENTER);
  textSize(40);
  text("GAME OVER", width/2, height/2);
  pop();
}

function keyPressed(){
  if (keyCode === 32) {
    if(gameState === false){
      restartGame(); 
    } else {
      player.jump();
    }
  }
}

function restartGame(){
  groundSpeed = 8;
  obstacles = [];
  nextSpawn = frameCount + 60;
  player.y = height - groundHeight - player.h;
  player.vy = 0;
  gameState = true;
  loop(); 
}

function drawGround(){
  stroke(150);
  strokeWeight(2);
  let groundY = height - groundHeight;
  line(0, groundY, width, groundY);
  
  groundOffset -= groundSpeed;
  if(groundOffset <= -width) groundOffset = 0;
  
  randomSeed(1); 
  for(let x = groundOffset; x < width + 100; x += 60){
    let yOffset = floor(random(1, 4)) * lineSpacing;
    let dashY = groundY + yOffset;
    line(x, dashY, x + 20, dashY);
  }
}

class Dino {
  constructor(x){
    this.x = x;
    this.w = 45; // Hitbox width
    this.h = 50; // Hitbox height
    this.y = height - groundHeight - this.h;
    this.vy = 0;
    this.g = 0.8;
    this.jumpForce = -15;
    this.onGround = true;
  }

  update(){
    this.vy += this.g;
    this.y += this.vy;
    if(this.y >= height - groundHeight - this.h){
      this.y = height - groundHeight - this.h;
      this.vy = 0;
      this.onGround = true;
    }
  }

  jump(){
    if(this.onGround){
      this.vy = this.jumpForce;
      this.onGround = false;
    }
  }

  display(){
    let img = (frameCount % 20 < 10) ? run1 : run2;
    image(img, this.x, this.y, this.w, this.h);
  }
}

class Obstacle {
  constructor(x, speed, img){
    this.img = img;
    this.speed = speed;
    this.x = x;
    this.h = 50;
    let aspect = this.img.width / this.img.height;
    this.w = this.h * aspect;
    this.y = height - groundHeight - this.h;
  }

  move(){
    this.x -= this.speed;
  }

  display(){
    image(this.img, this.x, this.y, this.w, this.h);
  }

  offScreen(){
    return this.x < -this.w;
  }
  
  hits(dino){
    return collideRectRect(
      this.x + 4, this.y + 4, this.w - 8, this.h - 8,
      dino.x + 4, dino.y + 4, dino.w - 8, dino.h - 8
    );
  }
}