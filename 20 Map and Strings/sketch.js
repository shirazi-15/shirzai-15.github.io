// Map Data structures and Reading Files
// Kamran Shirazi
// Oct 31, 2025

// global Variable
let textFile;
let imgText, rows, cols, colorMap;

function preload(){
  textFile = loadStrings("assets/info.txt")
  imgText = loadStrings("assets/colorimage.txt")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // procressText();


  // Determin the # of rows and columns
  rows = imgText.length;
  cols = imgText[0].length;

  // Construct the Map of Color
  colorMap = new Map([
    ["b", "black"],
    ["w", color(255)],
    ["r", "red"],
    ["l", "lime"],
    ["p", "purple"]
  ]);
  drawImage();
}

function procressText(){
  // look at 3 different ways to split up a larger
  // string into words or individual characters
  // split() and ....spread syntax

  print("SPLIT INTO WORDS");
  let splitWords = textFile[0].split(" ");
  print(splitWords);

  print("SPLIT INTO CHARACTER");
  let splitChar = textFile[1].split(" ");
  print(splitChar);

  print("SPREAD INTO CHARACTERS");
  let spreadChars = [...textFile[2]];
  print(spreadChars);
}

function drawImage(){
  // read through our text info
  // and construct an image
  let pixelSize = 50;
  for(let y = 0; y < rows; y++){
    let currentRow = imgText[y];

    for(let x = 0; x < cols; x++){
     let currentkey = currentRow[x];
     fill(colorMap.get(currentkey))
     rect(x*pixelSize, y*pixelSize, pixelSize, pixelSize)
    }
  }
}

function draw() {
  // background(220);
}
