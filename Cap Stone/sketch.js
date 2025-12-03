// Major Project 
// Kamran Shirazi
// 2 Dec to 

// Global Varible
let bg; let pUp; let pDw;
let b1; let b2; let player; 

function setup() {
  preLoad();
  createCanvas(windowWidth, windowHeight);
  player = new Player(width/4.5, height/2);

}

async function preLoad(){
  bg = await loadImage("assets.FB/background.png");
  b1 = await loadImage("assets.FB/bird.png");
  b2 = await loadImage("assets.FB/bird2.png");
  pUp = await loadImage("assets.FB/pipe1.png");
  pDw = await loadImage("assets.FB/pipe2.png");
}

function draw(){
  background(bg);
  player.display();

  player.gravity();
}

class Player{
  constructor(x, y){
    this.x = x; this.y = y;
    this.vy = 0; // velocity y
    this.g = 0.5; // gravity
  }
  display(){
    image(b1, this.x, this.y);
  }
  jumpingJacks(){
    
  }
  gravity(){
    this.y += this.vy;
    this.vy += this.g;
  }
}

