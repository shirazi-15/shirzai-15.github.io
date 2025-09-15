// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// global variables
let cent_x;
let cent_y;
let scale;

function setup() {
  createCanvas(400, 400);
  cent_x = width / 2;
  cent_y = height / 2;
}

function draw() {
  background(220);
  Aline();
}

function Aline(){
  noStroke()
  fill(153, 255, 153);
  rectMode(CENTER);
  rect(cent_x, cent_y, 80, 80, 50, 50, 0, 0)
  rect(cent_x - 35, cent_y + 55, 10, 30, 0, 0, 5, 5)
  rect(cent_x + 35, cent_y + 55, 10, 30, 0, 0, 5, 5)
  fill(0, 0, 0);
  circle(cent_x + 15, cent_y - 5, 7);
  circle(cent_x - 15, cent_y - 5, 7);
  rect(cent_x, cent_y+ 10, 20, 1);
}
