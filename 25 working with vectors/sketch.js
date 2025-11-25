// Working with Vectors
// Kamran Shirazi
// 25 Nov, 2025

// Gloable Variables
let objects = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  if(mouseIsPressed){
    objects.push(new Ball(mouseX, mouseY))
  }

  for(let o of objects){
  
    //o.clacMouse();
    o.display();
    o.move();
  }
}

class Ball{
  constructor(x, y){
    this.pos = createVector(x, y);
    this.vel = createVector(-5, -  5);
    this.grav = createVector(0, 0.2);
  }

  clacMouse(){
    // mouse vector thing
    this.grav = createVector(mouseX, mouseY);
    this.grav.sub(this.pos);
    this.grav.normalize() 
    this.grav.mult(4);
  }

  move(){
    // Update the velocity abd poxition 
    this.vel.add(this.grav);
    this.vel.limit(20);
    this.pos.add(this.vel);

    if(this.pos.x < 0 || this.pos.x > width){
      this.vel.x *=-1;
    }

    if(this.pos.y > height){
      this.vel.y *= -1;
    }
  }

  display(){
    // display Ball 
    circle(this.pos.x, this.pos.y, 20);

    // dispaly vector next
    if(true){
      stroke(255, 0, 0);
      line(0, 0, this.pos.x, this.pos.y);

      let endX = this.pos.x + this.vel.x;
      let endY = this.pos.y + this.vel.y

      stroke(0, 0, 255);
      line(this.pos.x, this.pos.y, endX, endY)

      stroke(0, 255, 0);
      line(endX, endY, endX + this.grav.x, endY + this.grav.y);
    }
  }
}