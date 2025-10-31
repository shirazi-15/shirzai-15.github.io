
// Parent Class ("Super Class")
    // ----- if all in one file, should occur first -----
    
class AnimatedObject{
    // 1. construuctor
    constructor(x, y){
      this.x = x; this.y = y;
      this.size = 6;
    }
  
    // 2. Methods
    move(){
      this.x += random(-2, 2);
      this.y += random(-2, 2);
    }
  
    display(){
      strokeWeight(this.size);
      point(this.x, this.y);
    }
  }