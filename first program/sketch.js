// Coordinate Systems and User Events
// Kamran Shirazi
// September 10, 2025
// A first look at interactive 


function setup() {
  createCanvas(400, 400);
  print(windowHeight, windowWidth, width, height);

}

function draw() { // runs OVER and OVER
  // trageting 60 frams per second

  background(220); // draws a big solid rectanglw (kinda grey)
  fill(0, 155, 175);
  circle(mouseX, mouseY, 30);

}

function drawTwoCircles() {
  // draws two circle, one at a fixed location
  // and one at the mouse location
  background(220);
  fill(0, 155, 175);
  circle(mouseX, mouseY, 30);


  fill(255, 0, 255);
  circle(width / 2, height / 2, 100)
}
drawTwoCircles();