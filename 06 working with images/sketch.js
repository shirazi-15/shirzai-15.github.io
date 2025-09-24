// 06 Working with images
// and, Random() and, Noise()
// Kamran Shirazi
// Sep 24


let x1, y1 ,x2, y2;
let d1, d2; 
let noiseTime = 5, noiseSpeed = 0.01;
// noiseSpeed controls how connected 
// our random noise() value are:
let minSize = 5; ; let maxSize = 200;
let mX, mY;  // move X and Y

async function setup() {
  createCanvas(windowWidth, windowHeight);
  x1 = width*0.3; y1 = height*0.3;
  x2 = width*0.7; y2 = height*0.5;
  mX = width*0.5; mY = height*0.5;
  //frameRate(10);
}

function noiseMoved(){
  x2 = noise(noiseTime);
  x2 = map(x2, 0, 1, 0, width);
  y2 = noise(noiseTime);
  y2 = map(y2, 0, 1, 0, width);
}

function draw() {
  background(220);
  randomCircle();
  noiseCircle();
  noiseMoved();
}

function noiseCircle(){
  // draw a fixed circle with randomly
  // changing (but smoot, hopefully)
  d2 = noise(noiseTime); // yield value between 0-1
  d2 = map(d2, 0, 1, minSize, maxSize);
  fill(255, 50, 150);
  circle(x2, y2, d2);
  noiseTime += noiseSpeed;
}

function randomCircle(){
  // draw a fixed circle with randomly changing diameter
  fill(50, 150, 250);
  d1 = random(minSize, maxSize);
  circle(x1, y1, d1)
}