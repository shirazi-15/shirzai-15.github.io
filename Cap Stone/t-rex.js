// Major Project 
// Kamran Shirazi
// 13 Dec to 29 Dec

// Global Variables       
let groundHeight = 25; 
let groundOffset = 0; 
let groundSpeed = 8; 
let lineSpacing = 4; 
let gameState = false; 
let score = 0;
let highScore = 0;
let run1, run2, idel, ob1, clouds, pd, ob2, ob3;
let obstacles = []; 
let cloudsArr = []; 
let nextSpawn = 0; 
let player;

function preload(){
  run1 = loadImage("assets.Tx/run1.png");
  run2 = loadImage("assets.Tx/run2.png");
  idel = loadImage("assets.Tx/idel.png");
  ob1 = loadImage("assets.Tx/ob1.png");
  clouds = loadImage("assets.Tx/clouds.png");
  pd = loadImage("assets.Tx/p_dead.png");
  ob2 = loadImage("assets.Tx/ob2.png");
  ob3 = loadImage("assets.Tx/ob3.png");
}

function setup(){
  createCanvas(1000, 800);
  player = new Dino(100);
  
  // Initialize Clouds
  for(let i = 0; i < 5; i++){
    cloudsArr.push(new Cloud(random(width), random(50, 200)));
  }

  // local Storage
  if(localStorage.getItem("highscore")===null){
    localStorage.setItem("highscore", 0);
  }
  else{ // implies a stored number of items
    highScore = int(localStorage.getItem("highscore"));
  }
}

function draw(){
  background(245);
  
  // Draw clouds
  for(let c of cloudsArr){
    c.move();
    c.display();
  }

  if(gameState === true){
    drawGround();

    // the chunck that controls the ob spawn 
    if(frameCount > nextSpawn){
      let obImages = [ob1, ob2, ob3];
      let randomImg = random(obImages);
      obstacles.push(new Obstacle(width, groundSpeed, randomImg)); 
      nextSpawn = frameCount + random(40, 90); // Calculates the didtance between each ob
    }

    // Update obstacles
    for(let i = obstacles.length - 1; i >= 0; i--){
      obstacles[i].move();
      obstacles[i].display();
      if(obstacles[i].offScreen()){
        obstacles.splice(i, 1);
      }
    }

    player.update();
    player.display();
    
    // Increase difficulty and score
    if(frameCount % 5 === 0) score++;
    groundSpeed += 0.0003;
    drawScore();
    
    handleCollisions();
  }

  else{
    // Initial screen 
    let idelY = height - groundHeight - 40;
    let imgToShow = (score > 0) ? pd : idel;
    image(imgToShow, 100, idelY, 60, 60);
    
    textAlign(CENTER);
    textSize(25);
    fill(100);
    if(score === 0){
      text("Press SPACE to Start", width/2, height/2);
    }

    else{
     
    }
  }
}

function drawScore(){
  // Calculates the score based on time
  push();
  textAlign(RIGHT);
  fill(83);
  textSize(20);
  textFont('Courier New');
  text("HI " + nf(highScore, 5) + "  " + nf(score, 5), width - 50, 50);
  pop();
}

function scoreKeeping(){
  if(highScore < score){
    highScore = score;
    localStorage.setItem("highscore" , highScore);
  }   
}

function handleCollisions(){
  for(let obs of obstacles){
    if(obs.hits(player)){
      scoreKeeping(); // Save the high score right at the moment of impact
      gameState = false;
      text("GAME OVER", width/2, height/2);
      drawScore();
      noLoop(); 
    }
  }
}

function restartGame() {
  // 1. Reset Game State
  score = 0;
  groundSpeed = 8;
  obstacles = [];
  nextSpawn = frameCount + 60;
  
  // 2. Reset Player Position
  player.y = height - groundHeight/2 - player.h;
  player.vy = 0;
  player.onGround = true;
  
  // 3. Re-activate the loop
  gameState = true;
  loop(); 
}

function keyPressed() {
  if (keyCode === 32) { // Space bar
    if (gameState === false) {
      // If we are on the Game Over screen or Start screen
      restartGame(); 
    } else {
      // If the game is already running
      player.jump();
    }
  }
}

function drawGround(){
  stroke(150);
  strokeWeight(2);
  let groundY = height - groundHeight;
  line(0, groundY, width, groundY);
  
  // Upper ground layer
  if(gameState) groundOffset -= groundSpeed;
  let spacing = 40;
  let relativeOffset = groundOffset % spacing;

  // Lower dashes (moving ground)
  for(let x = relativeOffset; x < width + spacing; x += spacing){
    let worldX = x - groundOffset;
    let dashId = floor(worldX / spacing);
    let fixedYOffset = ((dashId % 5) + 1) * lineSpacing;    
    line(x, groundY + fixedYOffset, x + 20, groundY + fixedYOffset);
  }
}

// Player Class: Controls the player animation, jump and other basics functions
class Dino{
  constructor(x){
    this.x = x;
    this.w = 45;
    this.h = 50;
    this.y = height - groundHeight/2 - this.h;
    this.vy = 0;
    this.g = 0.8; // g force 
    this.jumpForce = -15; // jump force 
    this.onGround = true;
  }

  update(){
    this.vy += this.g;
    this.y += this.vy;
    let floorY = height - groundHeight/2 - this.h;
    if(this.y >= floorY){
      this.y = floorY;
      this.vy = 0;
      this.onGround = true;
    }
  }

  jump(){
    if(this.onGround){
      this.vy = this.jumpForce;
      this.onGround = false;
    }
  }

  display(){
    // Animation of the dino because of the frame rate
    let img;
    if(!gameState && score > 0) img = pd;
    else if(this.onGround) img = (frameCount % 20 < 10) ? run1 : run2;
    else img = run1;
    image(img, this.x, this.y, this.w, this.h);
  }
}

class Obstacle{
  constructor(x, speed, img){
    this.img = img;
    this.speed = speed;
    this.x = x;
    this.h = (img === ob2 || img === ob3) ? 65 : 50; // ob2, 3 are widde the ob1 hence diff settings 
    let aspect = this.img.width / this.img.height;
    this.w = this.h * aspect;
    this.y = height - groundHeight/4 - this.h;
  }
  
  move(){
     this.x -= this.speed;
  }

  display(){ 
    image(this.img, this.x, this.y, this.w, this.h); // display Ob 
  }

  offScreen(){
     return this.x < -this.w;
  }
  
  hits(dino){
    // Controls the collision in the game
    return collideRectRect(
      this.x + 4, this.y + 4, this.w - 8, this.h - 8,
      dino.x + 4, dino.y + 4, dino.w - 8, dino.h - 8
    );
  }
}

class Cloud{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.speed = 1.5;
    this.w = 90;
    this.h = 50;
  }

  move(){
    // fixed speed 
    this.x -= this.speed;
    if (this.x < -this.w) this.x = width + random(50, 400);
  }

  display(){ 
    image(clouds, this.x, this.y, this.w, this.h);
   }

  overlaps(other){
    // Prevents overlap of clouds 
    let padding = 40; 
    return abs(this.x - other.x) < this.w + padding && abs(this.y - other.y) < this.h + padding;
  }
}