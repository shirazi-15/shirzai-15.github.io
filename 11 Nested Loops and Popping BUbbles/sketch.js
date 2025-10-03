// Nested Loops and Pooping Bubbles
// Kamran Shirazi
// Oct 3, 2025

let bubbles = [];
let bubblesSize = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // draw_with_grid();
  populateArray();
  showBubbles();
}

function draw() {
  background(220);
  showBubbles();
}

function populateArray(){
  // Use a nested loop to generate x, y position fpr
  // all our bubbles.
  for (let x = 0; x < width; x += bubblesSize){
    for(let y = 0; y < height; y += bubblesSize){
      let b = {
        x: x, y: y
      }
      bubbles.push(b);
    }
  }
}

function showBubbles(){
  // Tranverse the array , and display a bubble at
  // each (x, y)
  for(let i = 0; i < bubbles.length; i++){
    let b = bubbles[i];
    circle(b.x, b.y, bubblesSize);
    // point-in-circle distance check (pop):
    if(dist(b.x, b.y, mouseX, mouseY) < bubblesSize){
      // to delete an item: use .splice()
      // .splice(pos, #ofItemsToDEL, [])
      bubbles.splice(i, 1);
    }
  }
}



























function draw_with_grid(){
  noFill();
  for(let x = 0; x <= width; x += 30){
    for(let y = 0; y <= height; y += 30){
      circle(x, y, 20)
    }
  }
}