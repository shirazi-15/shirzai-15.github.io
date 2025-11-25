// Image Manipulation EXERCISES 
// Kamran Shirazi
// Nov 14, 2025

// Global Variable
let myImg1; let myImg2;

 async function setup() {
  pixelDensity(1);
  myImg1 = await loadImage("Assets/chip.jpg");
  myImg2 = await loadImage("Assets/race.jpg");
  myImg3 = await loadImage("Assets/nuit.jpg");
  myImg4 = await loadImage("Assets/hand.jpg");
 
  imgNo = 3;
  currfilter = 3;
  createCanvas(600, 600);
}

let started = false;

function mousePressed(){
  started = true;
  imgNo++;
  if(imgNo > 3) imgNo = 0;
  currfilter++;
  if(currfilter > 3) currfilter = 0;
  resizeCanvas(myImg1.width, myImg1.height, false);
  myImg1.loop();
}

function keyPressed(){
  if(keyCode === 32){
    imgNo++;
    if(imgNo < 4){
      imgNo = 0;
    }
  }
}
 
function draw() {
  background(220);
  if(started){
    imageChanger()
    loadPixels();
    
    filterChanger()

    // clearGreen();
    // majorColor();
    // fcPosterize();
    // mirrorImage();
    
    updatePixels();
  }
  else{
    text("Click to Start", width/2, height/2)
  }
  
}

function clearGreen(){
  // use trge single loop strategy
  for(let i = 0; i< pixels.length; i+=4){
    let pixelIndex = (i /4) % width;
    if(pixelIndex > width/2){
      pixels[i+1] = 0;
    }
  }
}

function majorColor(){
 
  for(let i= 0; i < pixels.length; i+=4){
    let r; let g; let b;
    r = pixels[i];
    g = pixels[i+1];
    b = pixels[i+2];

    if(r > g && r > b){
      pixels[i] = 255;
      pixels[i+1] = 0;
      pixels[i+2] = 0;
    }

    else if(g > r && g > b){
      pixels[i] = 0;
      pixels[i+1] = 255;
      pixels[i+2] = 0;
    }
    
    else if(b > g && b > r){
      pixels[i] = 0;
      pixels[i+1] = 0;
      pixels[i+2] = 255;
    }
    else if(r === g && r === b){
      pixels[i] = 255;
      pixels[i+1] = 0;
      pixels[i+2] = 0;
    }
  }
}

function fcPosterize(){
  for(let i= 0; i < pixels.length; i+=4){
    let r; let g; let b;
    r = pixels[i];
    g = pixels[i+1];
    b = pixels[i+2];

    let avg = (r+g+b) / 3;

    if(avg > 0 && avg < 54){
      pixels[i] = 90;
      pixels[i+1] = 10;
      pixels[i+2] = 50;
    }
    else if(avg >= 55 && avg <= 104){
      pixels[i] = 130;
      pixels[i+1] = 30;
      pixels[i+2] = 130;
    }
    else if(avg >= 105 && avg <= 154){
      pixels[i] = 120;
      pixels[i+1] = 180;
      pixels[i+2] = 60;
    }
    else if(avg >= 155 && avg <= 204){
      pixels[i] = 105;
      pixels[i+1] = 150;
      pixels[i+2] = 210;
    }
    else if(avg >= 205 && avg <= 255){
      pixels[i] = 170;
      pixels[i+1] = 230;
      pixels[i+2] = 220;
    }
  }
}

function mirrorImage(){
  for(let y = 0; y < height; y++){
    for(let x = width/2; x < width; x++){
      let i = (y * width + x) * 4;

      let mirrorX = width - 1 - x;
      let mirrorPixle = (y * width + mirrorX) * 4;

      pixels[mirrorPixle] = pixels[i];
      pixels[mirrorPixle+1] = pixels[i+1];
      pixels[mirrorPixle+2] = pixels[i+2];
      pixels[mirrorPixle+3] = pixels[i+3];

    }
  }
}

function textImage(){
  // render an Iamge using characters
  fill(255);
  for(let x = 0; x < width; x+=10){
    for(let y = 0; y < height; y+=10){
      let avg = getAvg(x, y);
      if(avg > 220)  text("&", x, y);
      else if(avg > 180) text("O", x, y);
      else if(avg > 140) text("/", x, y);
      else if(avg > 100) text("=", x, y);
      else if(avg > 40) text(",", x, y);
    }
  }
}

function getAvg(x, y){
  // return the average pixel density of gray
  let i = (width*y + x) * 4;
  let r = pixels[i];
  let g = pixels[i+1];
  let b = pixels[i+2];
  return (r+g+b)/3;
}

function grayScale(){
  // use the average value of each pixel to turn gray
  for(let x = 0; x < width; x++){
    for(let y = 0; y< height; y++){
      let avg = getAvg(x, y);
      setPixel(x, y, avg, avg, avg)
    }
  }
}

function imageChanger(){
  switch(imgNo){
    case 0:
      image(myImg1, 0, 0);
      break;
    case 1:
      image(myImg2, 0, 0);
      break;
    case 2:
      image(myImg3, 0, 0);
      break;
    case 3:
      image(myImg4, 0, 0);
      break;      
  }
}

function filterChanger(){
  switch(currfilter){
    case 0:
      majorColor();
      break;
    case 1:
      clearGreen();
      break;
    case 2:
      fcPosterize();
      break;
    case 3:
      mirrorImage();
      break;        
  }
}


