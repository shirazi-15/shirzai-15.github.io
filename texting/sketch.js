// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//Build your solution here.
let grid = [ [255, 255, 255, 255, 255, 255],
			 [255, 255, 255, 255, 255, 255],
			 [255, 255, 255, 255, 255, 255],
		    [255, 255, 255, 255, 255, 255],
			 [255, 255, 255, 255, 255, 255],
			 [255, 255, 255, 255, 255, 255], ];



function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
 
  find33("33333")
}

function find33(str){
	if(str.indexOf("33") === -1){
	return 0;
	}
	else{
	if(str.slice(1, 2) === "33"){
	return 1 + find33(str.slice(1));
	}
	else return find33(str.slice(1));
	}
	}