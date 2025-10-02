// Image Animation
// Kamran Shirazi
// October 2, 2025

// Global Vaeiable 
let pinImages = []; // array === list
let current = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  loadAssets();
   
}

async function loadAssets(){
  // Load all of our primary images
  for(let i = 0; i < 9; i++){
    pinImages.push(await loadImage("pin-0"+i+".png"));
  }
}

function draw() {
  background(0);
//   aniamteWithFor();

  // manage current imahe to display
  if(frameCount % 4 === 0){
    current = current + 1;
    if(current = 8){
      current = 0;
    }
  
    image(pinImages[current], width/2, height*0.6);
  
  }


}

function aniamteWithFor(){
  // try to make an animation with a FOR loop
  imageMode(CENTER);
  for(let i=0; i < 9; i++){
    image(pinImages[i], width/2, height*0.7);
  }
}