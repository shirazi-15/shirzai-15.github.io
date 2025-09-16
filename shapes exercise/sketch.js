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
let headSize;

function setup() {
  createCanvas(400, 400);
  cent_x = width / 2;
  cent_y = height / 2;
  slider = createSlider(1, 3, 0.1);
  slider.position(10, 10);
  slider.size(80);
}

function draw() {
  background(220);
  headSize = slider.value();
  Alien();
}

function Alien(){
  noStroke()
  fill(153, 255, 153);
  rectMode(CENTER);
  rect(cent_x, cent_y, 80 * headSize, 80 * headSize, 50* headSize, 50 * headSize, 0, 0);
  rect(cent_x - 35 * headSize, cent_y + 55 * headSize, 10 * headSize, 30* headSize, 0, 0, 5* headSize, 5* headSize);
  rect(cent_x + 35 * headSize, cent_y + 55 * headSize, 10 * headSize, 30 * headSize, 0, 0, 5 * headSize, 5* headSize);
  fill(0, 0, 0);
  circle(cent_x + 15 * headSize, cent_y - 5 * headSize, 7 * headSize);
  circle(cent_x - 15 * headSize, cent_y - 5 * headSize, 7 * headSize);
  rect(cent_x, cent_y+ 10 * headSize, 20 * headSize, 1 * headSize);
}
