// Transformation Challenge 
// Kamran Shirazi
// Oct 9, 2025

// Global Variable 
let xPos = width/2;
let yPos = height/2;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawBasicGrid(200)
  clock();
  Egyptians();
}

function clock(){
  push();
  // Cirle 
  translate(width/2, height/2);
  angleMode(DEGREES);
  strokeWeight(2);
  circle(0, 0, 150);
  for(let i = 0; i < 12; i++){
    strokeWeight(2);
    line(0, -70, 0, -60);
    rotate(30);
    strokeWeight(1);
  }
  for(let i = 0; i < 360; i = i = i + 6){
    line(0, -70, 0, -65);
    rotate(6);
  }
  pop();
}

function Egyptians(){
  // Fun fact time wsa discovered by the Egyptians
  // Calculate angle for each hand
  let s = second();
  let m = minute();
  let h = hour();
  let secondAngle = map(s, 0, 60, 0, 360);
  let minuteAngle = map(m, 0, 60, 0, 360);
  let hourAngle = map(h, 0, 12, 0, 360);
 
  stroke(2);
 
  // Second hand
  push();
  rotate(secondAngle);
  strokeWeight(1);
  line(0, 0, 0, -secondsRadius);
  pop();
 
  // Minute hand
  push();
  strokeWeight(2);
  rotate(minuteAngle);
  line(0, 0, 0, -minutesRadius);
  pop();
 
  // Hour hand
  push();
  strokeWeight(4);
  rotate(hourAngle);
  line(0, 0, 0, -hoursRadius);
  pop();

}

function drawBasicGrid(shade) {
  //draw the normal cartesian Coordinate Grid, in a light color. Spaced at 20 px by default
  stroke(shade);
  for (let x = 0; x < width; x += 20) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += 20) {
    line(0, y, width, y);
  }

  //Draw "X" at the origin
  strokeWeight(3);
  stroke(0);
  line(-5,0,5,0);
  line(0,5,0,-5);
  strokeWeight(1);
}