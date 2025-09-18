// Intractive Scene  
// Kamran Shirazi 
// September 16, 2025
//
//  Global variables
let headSize = 0.5;
let cent_x;
let cent_y;
let bg_state = 0;

function setup() {
  createCanvas(400, 400);
  
  cent_x = width / 2;
  cent_y = height / 2;
}

function draw() {
  bg_decide();
  land();
  Alien();
}


function bg_decide(){
  switch(bg_state){
    case 0:
      print("bg 1")
      bg_day();
      break;
    case 1:
      bg_sunset();
      print("bg 2")
      break;
    case 2:
      bg_night();
      print("bg 3")   
      break;
    case 3:
      bg_sunrise();
      print("bg 4")
      break;
  }
}

function bg_sunset(){
  // Sunset gradient
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    // Gradient from orange at bottom to purple at top
    let sunset = lerpColor(color(255, 94, 0), color(64, 0, 128), inter);
    stroke(sunset);
    line(0, y, width, y);
  }

  // Sun near the horizon
  noStroke();
  fill(255, 204, 0);
  ellipse(width / 2, height * 0.7, 80, 80);
}


function bg_day(){
  // Sunrise gradient
  for (let y = 0; y < height; y++) {
   let inter = map(y, 0, height, 0, 1);
   // Gradient from blue at bottom to white at top
   let sunset = lerpColor(color(80, 216, 250), color(255 , 255, 255), inter);
   stroke(sunset);
   line(0, y, width, y);
 }
 // Sun near the horizon
 noStroke();
 fill(251, 255, 0);
 ellipse(width / 2, height * 0.5, 80, 80);
}

function bg_sunrise(){
   // Sunrise gradient
   for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    // Gradient from blue at bottom to white at top
    let sunset = lerpColor(color(0, 170, 255), color(255 , 255, 255), inter);
    stroke(sunset);
    line(0, y, width, y);
  }
  // Sun near the horizon
  noStroke();
  fill(251, 255, 0);
  ellipse(width / 2, height * 0.5, 80, 80);
}

function bg_night(){
     // night gradient
     for (let y = 0; y < height; y++) {
      let inter = map(y, 0, height, 0, 1);
      // Gradient from black at bottom to blue at top
      let sunset = lerpColor(color(37, 14, 99), color(0, 0, 0), inter);
      stroke(sunset);
      line(0, y, width, y);
    }
    // Moon near the horizon
    noStroke();
    fill(255, 255, 255);
    ellipse(width / 2, height * 0.4, 80, 80);
}

function land(){
  fill(14, 99, 47);
  ellipse(width / 2, height , width * 1.2, height * 0.6);
  fill(30, 141, 166);
  ellipse(width / 4, height / 1.15, width * 0.2, height * 0.18);
}

function Alien(){
  noStroke()
  fill(232, 126, 21);
  rectMode(CENTER);
  rect(cent_x, cent_y, 80 * headSize, 80 * headSize, 50* headSize, 50 * headSize, 0, 0);
  rect(cent_x - 35 * headSize, cent_y + 55 * headSize, 10 * headSize, 30* headSize, 0, 0, 5* headSize, 5* headSize);
  rect(cent_x + 35 * headSize, cent_y + 55 * headSize, 10 * headSize, 30 * headSize, 0, 0, 5 * headSize, 5* headSize);
  fill(0, 0, 0);
  circle(cent_x + 15 * headSize, cent_y - 5 * headSize, 7 * headSize);
  circle(cent_x - 15 * headSize, cent_y - 5 * headSize, 7 * headSize);
  rect(cent_x, cent_y+ 10 * headSize, 20 * headSize, 1 * headSize);
}
