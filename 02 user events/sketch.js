// User Events + Day 1 Challenge 
// Kamran Shirazi
// 11 Spetember, 2025
// - describe what you did to take this project "above and beyond"

// Global variable Here
let circleColor = false;


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  challenge();
}

function keyPressed(){
  // this is special EVENT function, gets
  // automatically called anytime a keyboard
  // button is pressed
  print("Key is pressed");
  circleColor = !circleColor
}

function challenge(){
  // draw 5 hollow circle, in 4 connners and
  // center position 
  noFill();
  
  if(circleColor === true){
    fill(255, 0, 0);
  }
  // circle 5 
  circle(height, width, 50);
  
  // circle 4
  circle(height / 2, width / 2, 50);

  // circle 3
  circle(0, 0, 50);

  // circle 2
  circle(width, 0, 50);

  // circle 1
  circle(0, height, 50);
  }