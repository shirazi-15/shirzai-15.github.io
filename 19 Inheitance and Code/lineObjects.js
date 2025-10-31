// Child class number 2
class LineObject extends AnimatedObject{
    constructor(){
      super(random(width), random(width));
    }
  
    move(){
      super.move()
      this.x -= 5;
      if(this.x < 0) this.x = width;
    }
  
    display(){
      if(mouseIsPressed){
        strokeWeight(12)
      }
      else{
        strokeWeight(2)
      }
      line(this.x, this.y, this.x + random(15, -15), this.y + random(15, -15));
    }
  }