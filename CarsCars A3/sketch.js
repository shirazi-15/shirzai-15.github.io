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
  uplift = height*0.14; // variables to adj the vehicals 
  lLift = height*0.08;

  mytrafficLight = new TrafficLight(width/2, height/2);
  // folowing code creates the staring cars on the screen

  for(let i = 0; i < 10; i++){
  e = new Vehicle(random(width), random(height*0.03 + uplift, height/2 - lLift), 0);
  eastbound.push(e);
  }

  for(let i = 0; i < 10; i++){
    w = new Vehicle(random(width), random(height/2 + lLift, height - (height*0.015 + uplift)), 1);
    westbound.push(w);
  }
  // mytrafficLight = new TrafficLight(width/2, height*0.03);
  noStroke();
  
}

function draw(){
  background(50);
  drawRoad();
  mytrafficLight.display();
  mytrafficLight.update();
  for(i of eastbound){
    i.action(mytrafficLight.lightColor);
  }

  for(j of westbound){
    j.action(mytrafficLight.lightColor);
  }
}

function keyPressed(){
  if(keyCode === 32){
    mytrafficLight.turnRed();
  }
}

function mousePressed(){
  // following chunk is use to add more vehicals
  // SHIFT+mouse add a westwords going vehicals, 
  if(keyIsDown(16)){
    w = new Vehicle(mouseX, random(height/2 + lLift, height - (height*0.015 + uplift)), 1);
    westbound.push(w);
  }
  else{
    e = new Vehicle(mouseX, random(height*0.03 + uplift, height/2 - lLift), 0);
    eastbound.push(e);
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
    let fixXC = width/18; // Custom variables 
    rect(this.x, this.y, width*0.015, height*0.08);
    rect(this.x + fixXC, this.y, width*0.015, height*0.08);
    fill(this.c);
    rect(this.x + fixXC/2, this.y, width*0.08, height*0.06);
  }

  truck(){
    fill(0);
    let fixXT = width/15; // Custom variable
    rect(this.x, this.y, width*0.015, height*0.12);
    rect(this.x + fixXT, this.y, width*0.015, height*0.12);
    fill(this.c);
    rect(this.x + fixXT/2, this.y, width*0.1, height*0.08);
    stroke(0);
    // Adj the truck line depending on the direction
    if(this.where === 0){
      strokeWeight(2);
      line(this.x + fixXT, this.y - fixXT*0.4, this.x + fixXT, this.y + fixXT*0.4);
      noStroke();
    }
   else{
      strokeWeight(2);
      line(this.x + fixXT/8, this.y - fixXT/3, this.x + fixXT/8, this.y + fixXT/3);
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

  action(state){ // Para is responsible fro stopping the cars at the red light
    this.display();
    if(state === "green"){
      this.move();

    if(random(1) < 0.01){
      this.speedUp();
      print(this.speedUp);
    }

    if(random(1) < 0.01){
      this.speedDown();
      print(this.speedDown);
    }

    if(random(1) < 0.01){
      this.changeColor();
    }
    }
  }
}


class TrafficLight{
  // 1. Constructor 
  constructor(x, y){
    this.x = x; this.y = y;
    this.lightColor = "green";
    this.trafficTime = 0;
  }

  // 2. methods
  display(){
    if(this.lightColor === "green"){
      fill("green")
    }
    else{
      fill("red")
    }

    circle(this.x, this.y, width*0.05);
  }

  turnRed(){
    if(this.lightColor === "green"){
      this.lightColor = "red";
      this.trafficTime = 0;
    }
  }
  
  update(){
    // Changes the light based on time sorta
    if(this.lightColor === "red"){
      this.trafficTime++;
      if(this.trafficTime === 120){
        this.lightColor = "green";
      }
    }
  }
}