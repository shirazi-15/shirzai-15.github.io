// State Variable and Real Time demo
// Kamran Shirazi
// September 18, 2025

// Global variable
let shapeState = 0; // 0 → circle, 1 → square, 2 → tringle, 3 → transistion
let startTime,elasedTime;

function setup() {
  createCanvas(windowWidth, windowHeight);
  startTime = millis();
}

function draw() {
  background(220);
  drawShape();
  manageTimer();
}

function manageTimer(){
  // update elap
  // print(millis());
  elasedTime = millis() - startTime;
  text((elasedTime/1000).toFixed(2), width*0.3,height*0.75);
  if(shapeState === 3 && elasedTime > 2000){
    shapeState = 0;
  }
}


function keyPressed(){
  // automatically called on any keyboard button press
  // state var: 0 → 1   1 → 2
  //            2 → 3(for 2 second) → 0
  if(shapeState < 3){
    shapeState++;
    if(shapeState === 3){
      startTime = millis();
    }
  }
}

function drawShape(){
  switch(shapeState){
    case 0:
      circle(width/2, height/2, 150);
      break;
    case 1:
      square(width/2, height/2, 150);
      break;
    case 2:
      let x = width/2;   let y = height/2
      triangle(x-50, y+50, x+50, y-50, x, y-25);
      break;    
    case 3:
      for(let i = 0; i < 20; i++){
        let x = random(width*0.4, width*0.6);
        let y = random(width*0.4, width*0.6);
        line (x, y, x + 25, y);
      }
  }
}