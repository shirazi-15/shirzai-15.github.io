// Terrain GEN
// Kamran Shirazi
// September 29, 2025

let rectwidth = 1;  // make this wider to see better terrain
let Time = 0;
let TimeKeep = 0.01;  // smaller increment for noise input

function setup() {
  createCanvas(windowWidth, windowHeight);
  generateTerrain();
}

function generateTerrain(){
  rectMode(CORNERS);
  background(220);  // clear the background each time you generate terrain

  let heigestRec = Infinity;  // highest point tracker, start from bottom
  let LARGESTX = 0;
  let LARGESTY = height;

  for(let x = 0; x < width; x += rectwidth){
    // Generate noise-based height
    let noiseVal = noise(Time);
    // Map noise to desired height range
    let recHeight = map(noiseVal, 0, 1, height * 0.2, height * 0.9);

    let x2 = x + rectwidth;
    let y2 = height - recHeight;

    if(y2 < heigestRec){
      LARGESTX = x2;
      LARGESTY = y2; 
    }

    rect(x, height, x2, y2);
    

    Time += TimeKeep;  // increment noise input smoothly
  }
  drawpin(LARGESTX, LARGESTY);
  rectMode(CORNER);
}

function draw() {
  // background(220);
  // frameRate(1);
  // generateTerrain();
}

function drawpin(x, y){
  line(x, y, x, y - 50);
  fill(255, 0, 0);
  circle(x, y - 50, 7);

}