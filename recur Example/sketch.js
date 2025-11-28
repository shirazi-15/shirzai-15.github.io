
let d = 500

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  noFill();
  background(220);
  funnyCircle();
}

function funnyCircle(){
  if(d > 10){
    circle(width/2, height/2, d);
    circle(width/2 - d/4, height/2, d/2);
    circle(width/2 + d/4, height/2, d/2);
  }
}