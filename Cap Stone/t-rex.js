// Major Project 
// Kamran Shirazi
// 13 Dec

// Global Variables       
let groundHeight = 25; let groundOffset = 0; 
let groundSpeed = 8; let lineSpacing = 4; 
let gameState = false; let run1, run2, idel, ob1, clouds;
let obstacles = []; let nextSpawn = 0;
let player; let cloudsArr = [];

function preload(){
  run1 = loadImage("assets.Tx/run1.png");
  run2 = loadImage("assets.Tx/run2.png");
  idel = loadImage("assets.Tx/idel.png");
  ob1 = loadImage("assets.Tx/ob1.png");
  clouds = loadImage("assets.Tx/clouds.png");
}

function setup(){
  createCanvas(1000, 800);
  player = new Dino(100);
}

function draw(){
  background(245);
  
  if(gameState === true){
    for (let c of cloudsArr) {
    c.move();
    c.display();
    }

    drawGround();
    player.update();
    player.display();
    
    groundSpeed += 0.0003;

    if (frameCount > nextSpawn){
      obstacles.push(new Obstacle(width, groundSpeed, ob1)); 
      nextSpawn = frameCount + random(40, 90);
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
  // Resets Every thing ensuring that the game starts smoothly
  groundSpeed = 8;
  obstacles = [];
  nextSpawn = frameCount + 60;
  player.y = height - groundHeight - player.h;
  player.vy = 0;
  // Create 3-4 clouds at random positions
  for (let i = 0; i < 4; i++) {
    cloudsArr.push(new Cloud(random(width), random(50, 200)));
  }

  let attempts = 0;
  let maxClouds = 5;

  while (cloudsArr.length < maxClouds && attempts < 100){
    let newCloud = new Cloud(random(width, width * 2), random(50, 250), random(1, 2.5));

    let overlapping = false;
    for (let existing of cloudsArr){
      if (newCloud.overlaps(existing)){
        overlapping = true;
        break;
      }
    }

    if (!overlapping) {
      cloudsArr.push(newCloud);
    }
    attempts++; // Safety break to prevent infinite loops
  }


  gameState = true;
  loop(); 
}

function drawGround(){
  stroke(150);
  strokeWeight(2);
  let groundY = height - groundHeight;
  
  // Draw the main solid ground line
  line(0, groundY, width, groundY);
  
  groundOffset -= groundSpeed;
  
  let spacing = 40;
  
  let relativeOffset = groundOffset % spacing;

  for(let x = relativeOffset; x < width + spacing; x += spacing){
    
    let worldX = x - groundOffset;
    let dashId = floor(worldX / spacing);
    
    let fixedYOffset = ((dashId % 5) + 1) * lineSpacing;    
    let dashY = groundY + fixedYOffset;
    
    line(x, dashY, x + 20, dashY);
  }
}

class Dino{
  constructor(x){
    this.x = x;
    this.w = 45; // Hitbox width
    this.h = 50; // Hitbox height
    this.y = height - groundHeight/2 - this.h;
    this.vy = 0;
    this.g = 0.8;
    this.jumpForce = -15;
    this.onGround = true;
  }

  update(){
    this.vy += this.g;
    this.y += this.vy;
    if(this.y >= height - groundHeight/2 - this.h){
      this.y = height - groundHeight/2 - this.h;
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

class Obstacle{
  constructor(x, speed, img){
    this.img = img;
    this.speed = speed;
    this.x = x;
    this.h = 50;
    let aspect = this.img.width / this.img.height;
    this.w = this.h * aspect;
    this.y = height - groundHeight/4 - this.h;
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

class Cloud {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.speed = 1.5;
    this.w = 90; 
    this.h = 50;
  }

  move(){
    this.x -= this.speed;
    if (this.x < -this.w) {
      this.x = width + random(50, 400);
    }
  }

  display(){
    image(clouds, this.x, this.y, this.w, this.h);
  }

  overlaps(other) {
    let padding = 40; 
    return (abs(this.x - other.x) < this.w + padding && 
            abs(this.y - other.y) < this.h + padding);
  }
}