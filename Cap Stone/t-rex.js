// Major Project 
// Kamran Shirazi
// 9 Dec to

// Global Varible
let bg; let gameState;

function setup(){
  preLoad();
  createCanvas(1000, 800);

  
  // local Storage
  if(localStorage.getItem("highscore")===null){
    localStorage.setItem("highscore", 0);
  }
  else{ // implies a stored number of items
    totalBounces = int(localStorage.getItem("highscore"));
  }
}

async function preLoad(){
  bg = await loadImage("assets.Tx/platform.png")

}     

function draw(){
  background();
  platform();
}

function platform(){
  image(bg, 50, 50);
}

function keyPressed(){
  if (keyCode === 32) {
    if(gameState === false) restartGame();
    player.jump();
  } 
} 


class Dino{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.vy = 0;   // vertical velocity
    this.g = 0.5;  // gravity
    this.jumpForce = -10;
    this.onGround = false;
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
