// Growing trees
// Kamran Shirazi
// 26 November

// Global Variable
let angle;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  angle = random(50);
}

function draw() {
  background(220);
  // angle = map(mouseX, 0, width, 0, 180);
  translate(width/2, height);
  branch(220);
}

function branch(len){
  let t = map(len, 2, 220, 5, 25);
  strokeWeight(t);
  line(0, 0, 0, -len);
  translate(0, -len);

  if(len > 2){ // recursive case
    push();
      rotate(angle);
      branch(len * 0.66);
    pop();
    push();
      rotate(-angle);
      branch(len * 0.66);
    pop();
  }
}
