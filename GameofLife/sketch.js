var gridSize;
var columns;
var row;
var board;
var next;
var start;
var fps;
function setup() {
    createCanvas(600, 600);
    gridSize = 10;
    start = false;
    
    //draw the grid
    for(var i=0;i<width;i +=gridSize){
        line(i,0,i,height);
        line(0,i,width,i);
    }
 
    //create a 2d empty array
    columns = floor(width/gridSize);
    rows = floor(height/gridSize);
    // Wacky way to make a 2D array in JS
    board = new Array(columns);
    for (var i = 0; i < columns; i++) {
        board[i] = new Array(rows);
    }
    // Going to use multiple 2D arrays and swap them
    next = new Array(columns);
    for (i = 0; i < columns; i++) {
        next[i] = new Array(rows);
    }
    
    init();
    
    //create the Slider for the FrameRate
    frameSlider = createSlider(1, 60, 30);
    frameSlider.position(width+2*gridSize, height/2-30);
    
    //finally create the buttons
    button = createButton('Start');
    button.size(100,25);
    button.position(width+2*gridSize, height/2);
    button.mousePressed(startButton);
    
    button = createButton('Stop');
    button.size(100,25);
    button.position(width+2*gridSize, height/2+30);
    button.mousePressed(stopButton);
    
    button = createButton('Clear');
    button.size(100,25);
    button.position(width+2*gridSize, height/2+60);
    button.mousePressed(clearButton);
    
    button = createButton('Random');
    button.size(100,25);
    button.position(width+2*gridSize, height/2+90);
    button.mousePressed(randomButton);
}

// Fill board with zeroes
function init() {
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            board[i][j] = 0;
            //next[i][j] = 0;
        }
    }
}

function fillRect(x,y,color){
    fill(color);
    rect(y*gridSize,x*gridSize,gridSize,gridSize);
}

function draw() {
    //update the frame Rate
    frameRate(frameSlider.value());
    
    if( !start ){
        if(mouseIsPressed){
            var newX = Math.floor(mouseX/gridSize);
            var newY = Math.floor(mouseY/gridSize);
            //Attention: x and y are reversed!
            board[newY][newX]=1;
        }
    }else{
        generate();
    }
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            if(board[i][j] == 1){
                fillRect(i,j,0);
            }else{
                fillRect(i,j,255);
            }
        }
    }
    //console.log(frameRate());
}

function countNeighbors(x,y){
    var num=0;
    // Add up all the states in a 3x3 surrounding grid
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (x+i < 0 || x+i >= rows || y+j < 0 || y+j >= columns) {
                continue;//console.log("Out of bounds",x+i,y+j);
            }else{
                num += board[x+i][y+j];
            }
        }
    }
    return num;
}

function generate(){
    var num;
    
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            num = countNeighbors(i,j);
            if( board[i][j] == 1 ){//if it was alive
                num--; //we counted this as a neighbour
                if( num == 2 || num ==3 )
                    next[i][j]=1;
                else
                    next[i][j]=0;
            }else{//if it was dead
                if( num == 3)
                    next[i][j]=1;
                else
                    next[i][j]=0;//not needded but ok
            }
        }
    }
    var temp = board;
    board = next;
    next = temp;
}

function startButton(){
    start = true;
}

function stopButton(){
    start = false;
}

function clearButton(){
    start = false;
    init();
}

function randomButton(){
    start = false;
    init();
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            board[i][j] = floor(random(2));
            //next[i][j] = 0;
        }
    }
    
}

