// Cars Cars Cars
// Kamran Shirazi
// Oct 20, 2025

// Global Variable 
let myVehicle; 
let westbound = [];    
let eastbound = [];
let yLine = 150;
let mytrafficLight;
let e; let w;
let uplift;
let lLift;

function setup() {
  createCanvas(windowWidth, windowHeight);
  uplift = height*0.15;
  lLift = height*0.10;
  for(let i = 0; i < 10; i++){
  e = new Vehicle(width/4, random(height*0.03 + uplift, height/2 - lLift), 0);
  eastbound.push(e);
  }

  for(let i = 0; i < 10; i++){
    w = new Vehicle(width/4, random(height/2 + uplift, height - (height*0.03 + lLift)), 1);
    westbound.push(w);
  }
  // mytrafficLight = new TrafficLight(width/2, height*0.03);
  noStroke();
  
}

function draw(){
  background(50);
  drawRoad();
  // mytrafficLight.display();
  for(i of eastbound){
    i.action();
  }

  for(j of westbound){
    j.action();
  }
}

function keyPressed(){
  if(keyCode === 32 ){
    eastbound.push(new Vehicle(width/4, random(height*0.10 - uplift, height/2 - llift), 0));
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
  constructor(x, y, w){
    this.x = x; this.y = y;
    this.c = color(random(255), random(255), random(255));
    this.where = w;
    this.xSpeed = random(1, 8);
    this.vehicleType = round(random(0, 1));
  }
  // 2. Methods
  cars(){
    fill(0);
    let fixXC = width/18;
    rect(this.x, this.y, width*0.015, height*0.08);
    rect(this.x + fixXC, this.y, width*0.015, height*0.08);
    fill(this.c);
    rect(this.x + fixXC/2, this.y, width*0.08, height*0.06);
  }

  truck(){
    fill(0);
    let fixXT = width/15;
    rect(this.x, this.y, width*0.015, height*0.12);
    rect(this.x + fixXT, this.y, width*0.015, height*0.12);
    fill(this.c);
    rect(this.x + fixXT/2, this.y, width*0.1, height*0.08);
    stroke(0);
    if(this.where === 0){
      strokeWeight(2);
      line(this.x + fixXT, this.y - fixXT*0.4, this.x + fixXT, this.y + fixXT*0.4);
      noStroke();
    }
   else{
      strokeWeight(2);
      line(this.x + fixXT/2, this.y - fixXT/2, this.x + fixXT/2, this.y + fixXT/2);
      noStroke();
   }
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

    else if(this.where === 0 && this.xSpeed < -8){
      this.xSpeed -= 0.5;
    }
  }

  speedDown(){
    if(this.where === 1 && this.xSpeed < 1){
      this.xSpeed -= 0.5;
    }

    else if(this.where === 0 && this.xSpeed < -1){
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