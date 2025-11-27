// Working with libarary  (GUI)
// Kamran Shirazi
//  27 November, 2025

// Global VAriable
let d = 100;
let gui; let s;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gui = createGui();
  s = createSlider("Diameter", width/2, height*0.8, 128, 32, 40, 100);
}

function draw() {
  background(220);
  drawGui();
  circle(width/2, height/2, s.val)
}
