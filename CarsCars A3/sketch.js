// Cars Cars Cars
// Kamran Shirazi
// Oct 20, 2025

// Global Variable 
let myVehicle; 
let westbound = [];    
let eastbound = [];
let yLine = 150;
let xSpeed = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  myVehicle = new Vehicle(width/4, height/4);
  noStroke();
}

function draw(){
  randomSeed(1);
  background(50);
  drawRoad();
  myVehicle.display();
  myVehicle.move();
}

function drawRoad(){
  // the yellow trafic deviding line 
  rectMode(CENTER);
  fill("yellow")
  rect(0, height/2, yLine, height*0.05);
  for(let r = 100; r < width; r = r + 100){
    rect(r + r, height/2, yLine, height*0.05);
  }

  // Background Greensss
  fill(23, 115, 18);
  rect(0, 0, width*2, height*0.30)
  rect(0, height, width*2, -height*0.30)

}

class Vehicle{
  // 1. constructor
  constructor(x, y){
    this.x = x; this.y = y;
    this.c = color(random(255), random(255), random(255));
    this.where = round(random(0, 1));
  }
  // 2. Methods
  cars(){
    fill(0);
    let fixXC = width/12;
    rect(this.x, this.y, width*0.02, height*0.12);
    rect(this.x + fixXC, this.y, width*0.02, height*0.12);
    fill(this.c);
    rect(this.x + fixXC/2, this.y, width*0.11, height*0.08);s
  }

  truck(){
    fill(0);
    let fixXT = width/8;
    rect(this.x, this.y, width*0.02, height*0.12);
    rect(this.x + fixXT, this.y, width*0.02, height*0.12);
    fill(this.c);
    rect(this.x + fixXT/2, this.y, width*0.15, height*0.102);
    stroke(0);
    strokeWeight(2);
    line(this.x + fixXT/4, this.y - fixXT/4, this.x + fixXT/4, this.y + fixXT/4);
    noStroke();
  }

  display(){
    this.cars()
  }

  move(){
    // moves the cars in selected directions 
    if(this.where === 0){
      this.x += xSpeed;
    }
    else{
      this.x -= xSpeed;
      if(this.x < 0){
        this.x = width;
      } 
    }

    // carsr loop around back in trhe screen 
    if(this.x < 0) this.x = width;
    else if(this.x > width) this.x = 0;

  }
}