// Major Project 
// Kamran Shirazi
// 2 Dec to 9 Dec

// Global Varible
let bg1; let bg2; let pUp; let pDw;
let bird1; let bird2; let player; 
let pipes = []; let score = 0; 
let gameState = false; let high_Score = 0;
let gOver; let gameSign; let ready; 
let tap;

function setup(){
  preLoad();
  createCanvas(1000, 800);
  player = new Player(width/4.5, height/2);
  pipes.push(new Pipe()); 
  
  // local Storage
  if(localStorage.getItem("highscore")===null){
    localStorage.setItem("highscore", 0);
  }
  else{ // implies a stored number of items
    high_Score = int(localStorage.getItem("highscore"));
  }
}

async function preLoad(){
  bg1 = await loadImage("assets.FB/background.png");
  bg2 = await loadImage("assets.FB/background2.png");
  bird1 = await loadImage("assets.FB/bird.png");
  bird2 = await loadImage("assets.FB/bird2.png");
  pUp = await loadImage("assets.FB/pipe1.png");
  pDw = await loadImage("assets.FB/pipe2.png");
  gOver = await loadImage("assets.FB/GameOver.png");
  gameSign =  await loadImage("assets.FB/sign.png");
  ready = await loadImage("assets.FB/ready.png");
  tap = await loadImage("assets.FB/taptap.png"); 
}     

function draw(){
  background(bg1);

  if(gameState === true){
    // Pipes
    pipeloop();

    // PLAYER 
    player.update();   
    player.display();

    // Main logic 
    scoreKeeper();
    highScore();
    checkCollisions();
  }
  else{
    image(gameSign, width/3.2, height/3);
    image(tap, width/2.7, height/2);
  }
}

function mousePressed(){
  gameState = true;
  restartGame();
}

function keyPressed(){
  if (keyCode === 32) {
    if(gameState === false) restartGame();
    player.jump();
  } 
} 

function scoreKeeper(){
  for (let i = 0; i < pipes.length; i++) {
    let pipe = pipes[i];

    if (!pipe.scored && pipe.x + pUp.width < player.x*1.5){
      score++;
      pipe.scored = true;
    }
  }

  // Draw score on screen
  textSize(48);
  fill(255);
  stroke(0);
  strokeWeight(4);
  textAlign(LEFT, TOP);
  text("Score: " + score, 20, 20);
}

function highScore(){
  if(high_Score < score){
    high_Score = score;
    localStorage.setItem("highscore" , high_Score);
  }

  // Draw score on screen
  textSize(48);
  fill(255);
  stroke(0);
  strokeWeight(4);
  textAlign(LEFT, TOP);
  text("High Score: " + high_Score, 20, 75);
}

function pipeloop(){
   // PIPE LOGIC
   if (frameCount % 180 === 0) pipes.push(new Pipe());
   for (let i = pipes.length - 1; i >= 0; i--){
     pipes[i].update();
     pipes[i].display();
     if (pipes[i].offscreen()) pipes.splice(i, 1);
   }  
}

function checkCollisions() {
  // p5.collision2D library
  for (let i = 0; i < pipes.length; i++) {
    let pipe = pipes[i];

    // Bird hitbox
    let bw = bird1.width;
    let bh = bird1.height;

    // TOP PIPE hitbox
   let hitTop = collideRectRect(
    player.x, player.y, bw, bh,           
    pipe.x, pipe.top - pUp.height,        
    pDw.width, pDw.height
    );

    // BOTTOM PIPE hitbox
    let hitBottom = collideRectRect(
      player.x, player.y, bw, bh,
      pipe.x, pipe.bottom,
      pUp.width, pUp.height
    );

    if (hitTop || hitBottom) {
      gameOver();
      return;
    }
  }

  // Ground + ceiling collision
  if (player.y <= 0 || player.y >= height - 50) {
    gameOver();
  }
}   

function gameOver(){
  gameState = false;
  noLoop(); // stops the game

  image(gOver, width/3.2, height/2 - 50);
}

function restartGame(){ 
  pipes = [];
  player = new Player(width/4.5, height/2);
  score = 0;
  gameState = true;

  // spawn first pipe instantly
  frameCount = 0;
  pipes.push(new Pipe());
  loop();  // resume the draw loop
}


class Player{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.vy = 0;   // vertical velocity
    this.g = 0.5;  // gravity
    this.jumpForce = -10;
    this.onGround = true;
    this.animSpeed = 70;  // how many frames before switching image
    this.currentFrame = 0;
  }
 
  display(){
    // pick which image to show
    if (frameCount % this.animSpeed < this.animSpeed / 2) {
      image(bird1, this.x, this.y);
    } else {
      image(bird2, this.x, this.y);
    }
  }

  jump(){
    if (this.onGround) {
      this.vy = this.jumpForce; 
      this.onGround = true;
    }
  }

  update(){
    // gravity
    this.vy += this.g;
    this.y += this.vy;

    // simple ground check
    if (this.y > height - 50) {
      this.y = height - 50;
      this.vy = 0;
      this.onGround = true;
    }
  }
}

class Pipe {
  constructor() {
    this.x = width;
    this.speed = 2;
    this.gap = 200;  // opening between pipes
    this.top = random(100, height - 500);
    this.bottom = this.top + this.gap;
    this.score = false;
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return this.x < -pUp.width;
  }

  display(){
    // TOP PIPE
    image(pDw, this.x, this.top - pUp.height);

    // BOTTOM PIPE
    image(pUp, this.x, this.bottom);
  }
}