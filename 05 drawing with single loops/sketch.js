// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  gradiantBackground();
  circleLine(height/2, 50);
  circleLine(height * 0.2, 75);
}

function Cdistance(x1, y1, x2, y2){
  // calculate the straight line distance 
  // between (x1, y1) and (x2, y2)
  let a = abs(x1 - x2);
  let b = abs (y1 - y2);
  let c = sqrt(pow(a, 2) + pow(b, 2));
  return c.toFixed(1); // to keep only 1 dec number
}

function circleLine(y, size){
  // use this function to draw a line of circle (loop)
  // y → number the height at which to draw the line
  let xsatrt = width * 0.1;  // 10% position fro, the left
  let xEnd = height * 0.9; // 90% horizontal position from left

  for(let x = xsatrt; x <= xEnd; x = x + size){
    let d = Cdistance(x, y, mouseX, mouseY);
    if (d<= size / 2){
      fill(255, 123, 40);
    }
    else{
      fill(255);
    }
    circle(x, y, size);
    textAlign(CENTER, CENTER);
    fill(0);
    text(d, x, y);
  }
}

function gradiantBackground(){
  let h = 30;
  let y = 0;
  while(y <= height){
    noStroke();
    let mappedY = map(y, 0, height, 0, 255);
    let flippedY = 255 - mappedY;
    let mappedMouseX = map(mouseX, 0, width, 0, 255);
    fill(mappedY, flippedY, mappedMouseX);
    rect(0, y, width, h);
    y += h;
  }
}
