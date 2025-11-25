// Recursive Imagery 
// Kamran Shirazi
// 25 November, 2025


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function centerCirle(x, y, d){
  // recursively draw concrntric circles 
  // base case...implicit
  if(d > 10){
    // recursive case
    circle(x, y, d);
    centerCirle(x, y, d * 0.9);
  }

  // if we skip the recursive case, we 
  // unravel one level...base case
}

function circleFractal(x, y, d){
  // this better be good
  if(d > 10){
    circle(x, y, d);
    circleFractal(x - d/2, y, d/2);
    circleFractal(x + d/2, y, d/2);
    circleFractal(x, y + d/2, d/2);
    circleFractal(x, y - d/2, d/2);
  }
}

function luckySquare(x, y, s){
  if(s > 3){
    push();
    translate(x, y);
    rotate(radians(frameCount));
    square(0 , 0, s);
    pop();
    luckySquare(x+s/2, y+s/2, s*0.5);
    luckySquare(x-s/2, y+s/2, s*0.5);
    luckySquare(x+s/2, y-s/2, s*0.5);
    luckySquare(x-s/2, y-s/2, s*0.5);

  }
}

function draw() {
  rectMode(CENTER);
  background(0);
  noFill();
  stroke(255);
  // centerCirle(width/2, height/2, width);
  // circleFractal(width/2, height/2, width/2);
  luckySquare(width/2, height/2, width/2);
}

