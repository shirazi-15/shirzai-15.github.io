// Libarary Party Multi-player
// Kamran Shirazi
// 27 November, 2025

// Global Variable
let shared = {painting: [], invert: false}
const colors = [
  "#ee6666", 
  "#eeee66", 
  "#66ee66", 
  "#66eeee", 
  "#6666ee", 
  "#ee6666" ];

function preload(){
  partyConnect("wss://demoserver.p5party.org","cs30party");
  shared = partyloadshared("shared", shared)
}

function pickColor(){
  return random(colors);
}

function mousePressed(){
  shared.painting.push([mouseX, mouseY, c]);
  let c = pickColor();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}


function renderpaint(){
  for(let p of shared.painting){
    fill(p[2]);
    circle(p[0], p[1], 30)
  }
}

function draw() {
  background(220);
  renderpaint();
}
