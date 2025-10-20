// Cars Cars Cars
// Kamran Shirazi
// Oct 20, 2025

// Global Variable 
let myVehicle; 
let westbound = [];    
let eastbound = [];
let yLine = 150;

function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  background(50);
  drawRoad();
}

function drawRoad(){
  // the yellow trafic deviding line 
  rectMode(CENTER);
  fill("yellow")
  rect(0, height/2, yLine, height*0.05);
  for(let r = 100; r < width; r = r + 100){
    rect(r + r, height/2, yLine, height*0.05);
  }

  fill(23, 115, 18);
  rect(0, 0, width*2, height*0.30)
  rect(0, height, width*2, -height*0.30)

}

class Vehicle{
  // 1. constructor
  constructor(x, y){
    this.x = x; this.y = y;
  }
  // 2. Methods
  display(){
    
  }
}