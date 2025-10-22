// Cars Cars Cars
// Kamran Shirazi
// Oct 20, 2025

// Global Variable 
let myVehicle; 
let westbound = [];    
let eastbound = [];
let yLine = 150;
let mytrafficLight;

function setup() {
  createCanvas(windowWidth, windowHeight);
  myVehicle = new Vehicle(width/4, height/4);
  // mytrafficLight = new TrafficLight(width/2, height*0.03);
  noStroke();
}

function draw(){
  randomSeed(1);
  background(50);
  drawRoad();
  myVehicle.action();
  // mytrafficLight.display();
}

function mouseIsPressed(){
  if(keyCode === " " ){
    
  }
}

function drawRoad(){
  // the yellow traffic dividing line 
  rectMode(CENTER);
  fill("yellow")
  rect(0, height/2, yLine, height*0.03);
  for(let r = 100; r < width; r = r + 100){
    rect(r + r, height/2, yLine, height*0.03);
  }

  // Background Greensss
  fill(23, 115, 18);
  rect(0, 0, width*2, height*0.18)
  rect(0, height, width*2, -height*0.18)

}

class Vehicle{
  // 1. constructor
  constructor(x, y){
    this.x = x; this.y = y;
    this.c = color(random(255), random(255), random(255));
    this.where = round(random(0, 1));
    this.xSpeed = random(1, 8);
    this.vehicleType = round(random(0, 1));
  }
  // 2. Methods
  cars(){
    fill(0);
    let fixXC = width/12;
    rect(this.x, this.y, width*0.02, height*0.12);
    rect(this.x + fixXC, this.y, width*0.02, height*0.12);
    fill(this.c);
    rect(this.x + fixXC/2, this.y, width*0.11, height*0.08);
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
    if(this.vehicleType === 1){
      this.cars();
    }
    else{
      this.truck();
    }
  }

  move(){
    // moves the cars in selected directions 
    if(this.where === 0){
      this.x += this.xSpeed;
    }
    else{
      this.x -= this.xSpeed;
      if(this.x < 0){
        this.x = width;
      } 
    }

    // cars loop around back in the screen 
    if(this.x < 0) this.x = width;
    else if(this.x > width) this.x = 0;
  }

  speedUp(){
    if(this.where === 1 && this.xSpeed < 8){
      this.xSpeed += 0.5;
    }

    if(this.where === 0 && this.xSpeed < -8){
      this.xSpeed -= 0.5;
    }
  }

  speedDown(){
    if(this.where === 1 && this.xSpeed < 1){
      this.xSpeed -= 0.5;
    }

    if(this.where === 0 && this.xSpeed < -1){
      this.xSpeed += 0.5;
    }
  }
  changeColor(){
    this.c = color(random(255), random(255), random(255));
  }

  action(){
    this.display();
    this.move();

    if(random(1) < 0.01){
      this.speedUp();
    }
    if(random(1) < 0.01){
      this.speedDown();
    }
    if(random(1) < 0.01){
      this.changeColor();
    }
  }
}


class TrafficLight{
  // 1. Constructor 
  constructor(x, y){
    this.x = x; this.y = y;
    this.lightColor;
    this.trafficTime = 0;
  }

  // 2. methods
  display(){
    fill(0);
    rect(this.x, this.y + 5, width*0.15, height*0.11);
    let ficCx = width*0.04;
    let fixCy = height*0.02;
    fill()
    fill(this.lightColor)
    circle(this.x + ficCx, this.y + fixCy, width*0.04);
   

  }

  redLight(){

  }

  greenLight(){

  }
  
  update(){
    if(keyCode === ' '){
      this.lightColor = "red"
    }
    else{
      this.lightColor = "green"
    }
  }
}