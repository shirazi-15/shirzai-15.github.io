// NOise and Object
// Kamran Shirazi
// September 26, 2025

let ball;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = {   //object notation. Inside the brackets
             //set up a bunch of 
             //property:value   pairs
    x: 300,  y: 400,  size: 20,
    c: color(random(255),random(255),random(255)),
    timeX: random(100),  timeY: random(100),
    timeOff: 0.02
  };

  ball2 = {
    x: 500,  y: 200,  size: 12,
    c: color(random(255),random(255),random(255)),
    timeX: random(100),  timeY: random(100),
    timeOff: 0.02
  }
}

function draw() {
  //  TRICK # 1 remove the background
  // background(220);
  fill(255, 10);
  rect(0, 0, width, height);
  moveBall(ball);
  moveBall(ball2);
}

function moveBall(b){
  //b → Ball type object
  //update position and draw provided ball

  //generate random position change (x and y)
  let dx = noise(b.timeX); //0-1
  dx = map(dx, 0, 1, -5, 5);
  let dy = noise(b.timeY);
  dy = map(dy, 0, 1, -5, 5);

  //advance our noise graph "cursors"
  b.timeX += b.timeOff;   b.timeY += b.timeOff;

  b.x += dx;     b.y += dy;

  // handle any "wrap-around" necessary
  if(b.x < 0) b.x += width;
  else if(b.x > width) b.x -= width;

  if(b.y < 0) b.y += height;
  else if(b.y > height) b.y -= height;

  //render the circle
  fill(b.c);
  circle(b.x, b.y, b.size);
}
