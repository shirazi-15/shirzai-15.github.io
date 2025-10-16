// 16 Object Object 
// Kamran Shirazi
// Oct 16, 2025

// Global Variable 
let nodes = [];
let reach = 150;

function setup() {
  createCanvas(windowWidth, windowHeight);

}

function mousePressed(){
  // create one node per mousePress 
  for(let i = 0; i < 10; i++){
    nodes.push(new csNode(mouseX, mouseY));
  }
}

function draw() {
  background(0);
  // loop bt item is goodd when we don't 
  // plan on deleting objects from array 
  for(let n of nodes){
    n.move();
    n.display();
    n.connect(nodes);
  }
}

class csNode{
  // 1. constructor
  constructor(x, y){
    this.x = x; this.y = y;
    this.size = random(5, 10);
    this.c = color(random(255), random(255), random(255));

    // properties rrelated to movements 
    this.xTime = random(10);
    this.yTime = random(10);
    this.timeShift = 0.01;
    this.maxSpeed = random(5, 10);
  }

  // 2. Class methods
  display(){  // draw our cs node as a circle 
    fill(this.c);
    noStroke();
    circle(this.x, this.y, this.size);
  }

  move(){
    // use perline noise for x/y movement
    let xSpeed = noise(this.xTime);
    xSpeed = map(xSpeed, 0, 1, -this.maxSpeed, this.maxSpeed);
    this.xTime += this.timeShift;

    this.x += xSpeed;
    if(this.x < 0) this.x = width;
    else if(this.x > width) this.x = 0;

    let ySpeed = noise(this.yTime);
    ySpeed = map(ySpeed, 0, 1, -this.maxSpeed,this.maxSpeed);
    this.yTime += this.timeShift;

    this.y += ySpeed;
    if(this.y < 0) this.y = height;
    else if(this.x > height) this.xy = 0;
  }

  connect(nodeArray){
    // check is te currnet point is close to any other
    // points. if so, join witha line
    stroke(this.c);
    for(let n of nodeArray){
      if(n !== this){
        let d = dist(this.x, this.y, n.x, n.y);
        if(d < reach){
          line(this.x, this.y, n.x, n.y);
        }
      }
    }
  }
}