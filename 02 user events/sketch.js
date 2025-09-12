// User Events + Day 1 Challenge 
// Kamran Shirazi
// 11 Spetember, 2025
// - describe what you did to take this project "above and beyond"

// Global variable Here
// can only wrok with "simple" data in this
// section of code

let circleColor = false;
let currentColor = "white";

let x; let y;
let tsize = 50;

function setup() {
  createCanvas(400, 400);  
  x = width/2;        
  y = 300;           
}

function draw() {
  background(220);
  challenge();
  movement();
  rect(x, 300, 60, 30);
  mouseReport();
}

function movement(){
  // check for keyboard presses in each frame
  // and move the rect accordingly
  // if(keyCode === RIGHT_ARROW && keyIsPressed){
  //   x = x + 5
  // }
  // else if(keyCode === LEFT_ARROW && keyIsPressed){
  //   x = x - 5
  // }

  if (keyIsDown(UP_ARROW)) y = y - 5;
  if (keyIsDown(DOWN_ARROW)) y = y + 5;
  if (keyIsDown(RIGHT_ARROW)) x = x + 5;
  if (keyIsDown(LEFT_ARROW)) x = x - 5;
  
}

function mouseReport(){
  // inspect some of thr build_ins
  // for working with some mouse
  let src = mouseX + ", " + mouseY + ", " + mouseIsPressed + ", " + mouseButton;
  text(src, mouseX, mouseY);

  
}

function keyPressed(){
  // this is special EVENT function, gets
  // automatically called anytime a keyboard


  // button is pressed
  print("Key is pressed");
  if(key === "g"){
    currentColor = "green";
  }
  else if(keyCode === CONTROL){
    currentColor = "blue";

  }

  circleColor = !circleColor
}

function challenge(){
  // draw 5 hollow circle, in 4 connners and
  // center position 
  noFill();
  
  if(circleColor === true){
    fill(currentColor);
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