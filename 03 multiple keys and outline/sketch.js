// Multiple keys and outlines
// Kamran Shirazi
// September 15, 2025

// keyIsDown() → return Boolean 

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  checkMulti();
}

function checkMulti(){
  strokeWeight(mouseX / 10);
  stroke(255, 255, 255);
  let a = keyIsDown(65); // "a"
  let b = keyIsDown(66);
  let c = keyIsDown(67);
  text("a:" + a + "\tb:" + b + "\tc:" + c, 100, 100)
}
