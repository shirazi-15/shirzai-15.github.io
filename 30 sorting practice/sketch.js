// Sorting Practice
// Kamran Shirazi
// Jan 7, 2025

// Global Variable 
let value = [];
const ARRAY_SIZE = 20

function setup() {
  noCanvas(); 
  populateArray();
  print(value);
  bubbleSort();
  print(value);
}

function bubbleSort(){
  for(let i = 0; i < value.length - 1; i++){
    for(let cc = value.indexOf(1, 2); cc < value.length; cc++){
      let c1 = cc.indexOf(1);
      let c2 = cc.indexOf(2);
      if(c1 > c2){
        
      }
    }
  }
}

function selectSort(){
  // For each index, find the smallest remaining value on right 
  // and loop if it is teh smaller than the item in index
  for(let i = 0; i < value.length - 1; i++){
    let min = value[i];
    let minindex = i;
    for(let search = i+1; search<value.length; search++){
      let cur = value[search];
      if(cur < min){
        min = cur;
        minindex = search;
      }
    }
    let temp = value[i];
    value[i] = value[minindex];
    value[minindex] = temp;
  }
}

function populateArray(){
  // Using loop, to fill our array 
  for(let i = 0; i < ARRAY_SIZE; i++){
    value.push(floor(random(1000)));
  }
}