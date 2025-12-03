// Major Project 
// Kamran Shirazi
// 2 Dec to 

// Global Varible
let bg; let pUp; let pDw;
let b1; let b2;

async function setup() {
  bg = await loadImage("assets.FB/background.png");
  b1 = await loadImage("assets.FB/bird.png");
  b2 = await loadImage("assets.FB/bird2.png");
  pUp = await loadImage("assets.FB/pipe1.png");
  pDw = await loadImage("assets.FB/pipe2.png");

  createCanvas(windowWidth, windowHeight);
}

function draw(){
  background(bg);
}

function player(){
  switch(ani){
    case 0:
      b1;
      break;

    case 1:
      b2;
      break;
  }
}