
class CircleObject extends AnimatedObject{
    // 1. Constructor
    constructor(x, y){
      super(x, y)
    // we can also add-on what was in the parent class
    this.size = random(20, 40); 
    }
  
    // 2. Methods
    // no mention of move() ... it will be same as parent's move()
    
    display(){
      if(dist(this.x, this.y, mouseX, mouseY) < this.size/2){
        fill(0, 255, 0);
      }
      fill(255);
  
      circle(this.x, this.y, this.size)
    }
  }
  