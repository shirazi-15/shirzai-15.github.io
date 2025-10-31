// Inheritance and Code
// Kamran Shirazi
// Oct 30, 2025

// Global Variable 
let objects = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0; i < 200; i++){
    objects.push(new AnimatedObject(random(width), random(height)));
    objects.push(new CircleObject(random(width), random(height)));
    objects.push(new LineObject(random(width), random(height)));

  }
}

function draw() {
  background(220);
  for(let o of objects){
    o.move();
    o.display();
  }
}

