// Terrain GEN
// Kamran Shirazi
// September 29, 2025

let rectwidth = 1;
let Time = 0.01;
let TimeKeep = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function generateTerrain(){
  // Use a Loop to generate and draw
  // rectangle side to side to look 2D
  // terrain
  rectMode(CORNERS);

  for(let x = 0; x < width; x+=rectwidth){
    // Generate random height
    // NOTE!!! change thus from random() to noise()
    let recHeight = noise(Time);
    recHeight = map(rectwidth, 0, 1, height*0.2, height*0.9);

    // calculate the upper-right corner of rect
    let x2 = x + rectwidth;
    let y2 = height - recHeight;

    rect(x, height, x2, y2);
    Time += TimeKeep;
  }

  rectMode(CORNER)  
}

function draw() {
  // dont need to draw UNTIL
  // animating the terrain once
  background(220);
  frameRate(2);
  generateTerrain();
}
