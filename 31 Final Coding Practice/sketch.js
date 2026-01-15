// Final Coding Practice 
// Kamran Shirazi
// Jan 13
// Final Coding Review

// --- Globals Variables ---
let gorillaIdle = [];
let gorillaSwipe = [];
let spiralImages = [];

// (Gorilla Related)
let idleIndex = 0;  let swipeIndex = 0;
let gorillaState = 0; //0-idle  1-swipe
let gorillaX = 200;

// (Spiral Related)
let spiralObjects = [];


async function setup(){
  createCanvas(windowWidth, windowHeight);
  await loadAssets();
}

async function loadAssets(){
  // Circles First 
  for(let i = 0; i <= 15; i++){
    if(i<10){
      spiralImages.push(loadImage("assets/Circle/circle0"+i+".png"));
    }
    else{
      spiralImages.push(loadImage("assets/Circle/circle"+i+".png"));
    }
  }

  // Gorilla Next
  for(let i = 1; i <= 6; i++){
    gorillaIdle.push(loadImage("assets/Gorilla/idle"+i+".png"));
    gorillaSwipe.push(loadImage("assets/Gorilla/swipe"+i+".png"));
  }
}

function draw(){
  background(55);
  drawGorrila();
  moveGorilla();

  // Spril Images
  // for(let s of spiralObjects){
  //   s.display();
  // }
  for(let i = 0; i < spiralObjects.length; i++){
    let s = spiralObjects[i];
    s.display();
    if(s.active === false){
      spiralObjects.slice(i, 1)
    }
  }
}

function drawGorrila(){
  // Render the Gorilla at its position, choosing 
  // the correct image for animation playback 
  if(gorillaState === 0){ // idle State 
    image(gorillaIdle[idleIndex], gorillaX, height/2);
    if(frameCount % 10 === 0){
      idleIndex++;
      if(idleIndex > 5) idleIndex = 0;
    }
  }
  else if(gorillaState === 1){ // Swipe State 
    image(gorillaSwipe[swipeIndex], gorillaX, height/2);
    if(frameCount % 10 === 0){
      swipeIndex++;
      if(swipeIndex > 5) swipeIndex = 0;
    }
  }
}

function moveGorilla(){
  // checking for a keypress ONCE per Fram 
  // Is better for a continous detection
  if(keyIsDown(77)){ // 77 = m
    if(mouseX < gorillaX) gorillaX-= 5;
    else gorillaX += 5;
  }
}

function keyPressed(){
  // Triggers auto once per keypressed
  if(keyCode === 32){
    if(gorillaState === 0){
      gorillaState =1;
    }
    else{
      gorillaState = 0;
    }
  }
}

function mousePressed(){
  // triggers Automatically, once per click
  spiralObjects.push(new Spiral(mouseX, mouseY));
}

class Spiral{
  constructor(x, y){
    this.x = x; 
    this.y = y;
    this.currentFrame = 0;
    this.active = true;
  }

  display(){
    if(this.currentFrame > 10){
      this.active = false;
    }
    else{
      image(spiralImages[this.currentFrame], this.x, this.y);
      if(frameCount % 3 === 0) this.currentFrame++;
    }
  }
}