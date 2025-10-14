// Objects Mini Demo
// Kamran Shirazi
// Oct 10, 2025

// Glabal Section

let myRect;
let rectCollection = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  myRect =  new Rect(0, 0);
}

function draw() {
  background(0);
  noStroke();
  // process the single ball
  myRect.display();

  if(mouseIsPressed){
    rectCollection.push(new Rect(random(700), random(500))); 
  }

  // proceess of COLLECTION
  for(let r of rectCollection){
    r.display();
  }
}


class Rect{
  //1. Constructor
  constructor(x, y){
    this.x = x; this.y = y;
    this.c = color("orange");
    this.s = random(50);
  }

  //2. Class Method/Function
  display(){
    fill(this.c);
    rect(this.x, this.y, this.s, this.s)
  }
}