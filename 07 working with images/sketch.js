// Working with images
// KAmran Shirazi
// sep 9, 2025

let lionL, lionR;
let facing_right = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  LoadAsstes();
}

async function LoadAsstes(){
  // hedel all image loading
  lionL = await loadImage("assets/lion-left.png");
  lionR = await loadImage("assets/lion-right.png");
}

function draw() {
  background(220);
  // update our direction 
  if(pmouseX < mouseX){
    facing_right = true;
  }
  else if(pmouseX > mouseX){
    facing_right = false;
  }

  if(facing_right){
    image(lionL, mouseX, mouseY, lionL.width/2, lionL.height/2);
  }
  else{
    image(lionR, mouseX, mouseY, lionL.width/2, lionL.height/2);
  }
}
