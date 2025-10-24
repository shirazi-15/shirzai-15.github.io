// Local Strorage Demo
// Kamran Shirazi
// Oct 24, 2025

// Global Variable 
let mySquare;
let totalBounces = 0;
let moreSquares = [];
let m;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  let m = new Bouncer(width/2, height/2);
  moreSquares.push(m);
  mySquare = new Bouncer(width/2, height/2);
  textSize(30);
  textAlign(CENTER, CENTER);

  if(localStorage.getItem("numBounces")===null){
    localStorage.setItem("numBounces", 0);
  }
  else{ // implies a stored number of items
    totalBounces = int(localStorage.getItem("numBounces"));
  }
}

function draw() {
  background(220);
  mySquare.display();
  mySquare.move();
  text(totalBounces, width/2, height/2);
}

function keyPressed(){
  if(keyCode === 32){
    for(i of moreSquares){
      m.display();
      m.move();
    }
  }
}

class Bouncer{
  // 1. Constructor
  constructor(x, y){
    this.x = x; this.y = y;
    this.xSpeed = random(-5, 5);
    this.ySpeed = random(-5, 5);
  }
  // 2. Class Methods
  display(){
    fill("blue")
    square(this.x, this.y, 30);
  }

  move(){
    // Calculate new position
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // should we bounce
    if(this.x < 0 || this.x > width){
      this.xSpeed *= -1;
      totalBounces++;
      localStorage.setItem("numBounces" , totalBounces);
    }

    if(this.y < 0 || this.y > height){
      this.ySpeed *= -1;
      totalBounces++;
      localStorage.setItem("numBounces" , totalBounces);
    }    
  }
}