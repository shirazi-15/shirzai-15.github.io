// Objects Mini Demo
// Kamran Shirazi
// Oct 10, 2025

// Glabal Section

let myBall;
let ballCollection = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  myBall =  new Ball(100, 100);
}

function draw() {
  background(220);
  // process the single ball
  myBall.move();
  myBall.display();

  // add new objects to Array 
  if(mouseIsPressed){
    ballCollection.push(new Ball(mouseX, mouseY))
  }
  // proceess of COLLECTION
  for(let b of ballCollection){
    b.move();
    b.display();
  }
}


class Ball{
  //1. Constructor
  constructor(x, y){
    this.x = x; this.y = y;
    this.c = color(random(255), random(255), random(255));
    this.size = 15;
    this.speed = random(2, 10);
  }

  //2. Class Method/Function
  display(){
    fill(this.c);
    circle(this.x, this.y, this.size);
  }

  move(){
    // horizontal movement only 
    this.x += this.speed;
    if(this.x > width){
      this.x = 0;
    }
  }
}