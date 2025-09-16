// Intractive Scene  
// Kamran Shirazi 
// September 16, 2025
//
//  

function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  bg_sunset();
}

function bg_sunset(){
  // Draw sunset gradient
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    // Gradient from orange at bottom to purple at top
    let sunset = lerpColor(color(255, 94, 0), color(64, 0, 128), inter);
    stroke(sunset);
    line(0, y, width, y);
  }

  // Optionally, add a sun near the horizon
  noStroke();
  fill(255, 204, 0);
  ellipse(width / 2, height * 0.8, 80, 80);
}
