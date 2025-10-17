// Planets and Moons
// Kamran Shirazi
// Oct 17, 2025
// Objets within Objects,Overwriting Variables and basic transfomation


// Global Variables
let myPlanet;

function setup(){
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  myPlanet = new Planet(width/2, height/2);
}

function draw(){
  randomSeed(1);
  background(70);
  myPlanet.display();
}

function mousePressed(){
  // regular click → add a moon
  // shift click → destroy and reset the moon
  if (keyIsPressed && keyCode === SHIFT){
    myPlanet = new Planet(width/2, height/2);
  }
  else{
    myPlanet.createMoon();
  }
}

function keyPressed(){
  if(keyCode !== SHIFT){
    myPlanet.x = mouseX;
    myPlanet.y = mouseY;
   
  }
}

class Planet{
  // 1. constructor
  constructor(x,y){
    this.x = x;   this.y = y;  this.s = 100;
    this.moons = [];
  }

  // 2. class methods

  createMoon(){
    this.moons.push(new Moon(this.x, this.y));
  }

  display(){
    // draw the planet + all of its moons
    noStroke();
    circle(this.x, this.y, this.s);

    // for the moons
    for (let m of this.moons){
      m.update(this.x, this.y);
    }
  }
}

class Moon{
  constructor(){
    this.speed = random(1, 5);
    this.angle = 0;  this.orbitRadius = random(80, 250);
    this.s = random(5, 50);
  }

  display(x , y){
    push();
    translate(x, y);
    rotate(this.angle);
    fill(random(255), random(255), random(255));
    circle(this.orbitRadius, 0, this.s);
    pop();
  }

  move(){
    this.angle += this.speed;
  }

  update(x, y){
    // helper function to handle calling the
    // class methods internally
    this.move();
    this.display(x, y);
  }
}
