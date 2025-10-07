// Terrain GEN
// Kamran Shirazi
// September 29, 2025

let rectwidth = 1;  // make this wider to see better terrain
let Time = 0;
let TimeKeep = 0.01;  // smaller increment for noise input
let avgY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectwidth = 1;
  totalRec = 0; 
  avgY = 0;
}

function generateTerrain(){
  rectMode(CORNERS);
  noFill();
  background(220);  // clear the background each time you generate terrain
  let totalRec = 0; 
  let heigestRec = Infinity;  // highest point tracker, start from bottom
  let LARGESTX = 0;
  let LARGESTY = height;

  for(let x = 0; x < width; x += rectwidth){
    // Generate noise-based height
    let noiseVal = noise(Time);
    let recHeight = map(noiseVal, 0, 1, height * 0.2, height * 0.9);

    let x2 = x + rectwidth;
    let y2 = height - recHeight;

    // Finds the heightest Rectangle on the frame
    if(y2 < heigestRec){
      heigestRec = y2;
      LARGESTX = x2;
      LARGESTY = y2; 
    }

    avgY += y2;
    rect(x, height, x2, y2);
    Time += TimeKeep;  // increment noise 
    totalRec++;
  }
  avgY = avgY/totalRec;
  avgLine(avgY);
  drawpin(LARGESTX, LARGESTY); // pins the heightest rec
  rectMode(CORNER);
}

function draw() {
  panning();
  background(220);
  generateTerrain();
}

function drawpin(x, y){
  //Pin shape
  line(x, y, x, y - 25);
  fill(255, 0, 0);
  circle(x, y - 25, 7);
}

function avgLine(aY){
  stroke("red");
  line(0, aY, width, aY);
  stroke(0);
}
 
function panning(){
  let pan = frameCount / 25;
  Time = 0 + pan;
}

// Controls the width of the rectangles
function keyPressed(){
 if(keyCode === LEFT_ARROW){
  rectwidth = rectwidth - 0.05;
  if(rectwidth === 0.05){
    return rectwidth = 0.10;
  }
}
 else if(keyCode === RIGHT_ARROW){
  rectwidth = rectwidth + 0.05;
 }
}
