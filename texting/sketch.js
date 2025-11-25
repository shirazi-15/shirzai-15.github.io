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
 
  populateGrid();
}

function populateGrid(){
	let fix; let cc; let cr;
	for(let y = 0; y < grid.length/2; y++){
		fix = y % 2;
		if(fix === 0){
			cc = 0;
			cr = 1;
		}
		else{
			cc = 1;
			cr = 0;
		} 
		for(let x = cc; x < grid[y].length; x = x + 2){
			grid[y][x] = 255;
		}
		for(let i = cr; i < grid[y].length; i = i + 2){
			grid[y][i] = 120;
		}
	}
	for(let j = grid.length/2; j < grid.length; j++){
		for(let k = 0; k < grid[j].length; k++){
			grid[j][k] = 0;
		}
	}
} 