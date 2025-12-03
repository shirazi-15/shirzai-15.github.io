// Major Project 
// Kamran Shirazi
// 2 Dec to 

// Global Varible
let bg; let pUp; let pDw;
let bird1; let bird2; let player; 
let pipes = [];

function setup(){
  preLoad();
  createCanvas(windowWidth, windowHeight);
  player = new Player(width/4.5, height/2);
  pipes.push(new Pipe()); // first pipe appears instantly
}

async function preLoad(){
  bg = await loadImage("assets.FB/background.png");
  bird1 = await loadImage("assets.FB/bird.png");
  bird2 = await loadImage("assets.FB/bird2.png");
  pUp = await loadImage("assets.FB/pipe1.png");
  pDw = await loadImage("assets.FB/pipe2.png");
}     

function draw(){
  background(bg);

  // PIPE LOGIC
  if (frameCount % 180 === 0) pipes.push(new Pipe());
  for (let i = pipes.length - 1; i >= 0; i--){
    pipes[i].update();
    pipes[i].display();
    if (pipes[i].offscreen()) pipes.splice(i, 1);
  }

  // PLAYER
  player.update();
  player.display();
}
  

function keyPressed(){
  if (keyCode === 32) { // space
    player.jump();
  }
} 

class Player{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.vy = 0;   // vertical velocity
    this.g = 0.5;  // gravity
    this.jumpForce = -10;
    this.onGround = true;
    this.animSpeed = 80;  // how many frames before switching image
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
      this.vy = this.jumpForce;  // apply upward velocity
      this.onGround = true;
    }
  }

  update(){
    // gravity
    this.vy += this.g;
    this.y += this.vy;

    // simple ground check
    if (this.y > height - 50) {   // adjust for sprite height
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
    this.top = random(50, height - 200);
    this.bottom = this.top + this.gap;
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return this.x < -pUp.width;
  }

  display() {
    // TOP PIPE (open downward)
    image(pDw, this.x, this.top - pUp.height);

    // BOTTOM PIPE (open upward)
    image(pUp, this.x, this.bottom);
  }
}