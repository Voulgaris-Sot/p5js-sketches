/*
 a simple grid of points interconnecting when they get 'R' close of each other
 the connections grows stronger the closer they get
 no attractors or anything, the speed is constant
 inspired by an old background: https://pusher.com

 Manhattan distance has less noise
 when the number of points grows
 Maybe it is becauce euclidean < manhattan
 so the connections are more for the euclidean and brighter
*/

var points = [];
var speed = [];
var numPoints;
var gridSize;
var R;
var showBackground;
var showColor;
var my_dist;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawGrid(){
    for (var x = 0; x <= width; x += gridSize) {
        for (var y = 0; y <= height; y += gridSize) {
            strokeWeight(1);
            fill(51);
            ellipse(x, y, 1, 1);
        }
        stroke(255, 50);
        line(x, 0, x, height);
        line(0, x, width, x);
    }
}

function initPoints(){
    for(var i = 0; i < numPoints; i++){
        var p = createVector( getRandomInt(0, width), getRandomInt(0, height) );
        do{
            var pspeed = createVector( getRandomInt(-1, 1), getRandomInt(-1, 1));
        }while( pspeed.x == 0 || pspeed.y ==0 );
        
        points.push( p );
        speed.push( pspeed );
        
        //Finally draw the Point
        stroke(255, 80);
        strokeWeight(3);
        point(p.x , p.y);
    }
}

function updateAndDrawPoints(){
    for(var i = 0; i < numPoints; i++){
        points[i].x += speed[i].x;
        points[i].y += speed[i].y;
        
        //check boundaries
        if( points[i].x > width){
            points[i].x = width;
            speed[i].x *= -1;
        }
        if( points[i].x < 0){
            points[i].x = 0;
            speed[i].x *= -1;
        }
        if( points[i].y < 0){
            points[i].y = 0;
            speed[i].y *= -1;
        }
        if( points[i].y > height){
            points[i].y = height;
            speed[i].y *= -1;
        }
        
        //Finally draw the Point
        stroke(255, 80);
        strokeWeight(3);
        point(points[i].x, points[i].y);
    }
}

//I don't use dist for perfomance
function distance(x, y, cx, cy) {
    if(my_dist === 'euclidean'){
        return Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
    }else{        
        return Math.abs(x - cx) + Math.abs(y - cy);
    }
}


//from p5js source code, to improve perfomance
function myMap(n, start1, stop1, start2, stop2) {
    return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
}

//spawn 10 new points in the grid
function spawnButton(){
    numPoints += 10;
    for(var i = 0; i < 10; i++){
        var p = createVector( getRandomInt(0, width), getRandomInt(0, height) );
        do{
            var pspeed = createVector( getRandomInt(-1, 1), getRandomInt(-1, 1));
        }while( pspeed.x == 0 || pspeed.y ==0 );
        
        points.push( p );
        speed.push( pspeed );
        
        //Finally draw the Point
        stroke(255, 80);
        strokeWeight(3);
        point(p.x , p.y);
    }
}

//remove 10 points from the grid
function removeButton(){
    numPoints -= 10;
    for(var i = 0; i < 10; i++){
        points.pop();
        speed.pop();
    }
}

function backgroundButton(){;
    showBackground = !showBackground;
}

function colorButton(){;
    showColor = !showColor;
}

function euclideanButton(){;
    my_dist = 'euclidean';
}

function manhattanButton(){;
    my_dist = 'manhattan';
}

function setup() {
    createCanvas(1000, 600);
    numPoints = 100;
    gridSize = 35;
    R = 200;
    showBackground = true;
    showColor = false;
    my_dist = 'euclidean'
    
    background(30);
    //noStroke();
    
    frameRate(18);
    
    
    drawGrid();
    initPoints();
    
    RSlider = createSlider(1, 300, 100);
    RSlider.position(width + 20, height/2-30);
    
    button = createButton('Spawn');
    button.size(100,25);
    button.position(width + 20, height/2+30);
    button.mousePressed(spawnButton);
    
    button = createButton('Remove');
    button.size(100,25);
    button.position(width + 20, height/2+60);
    button.mousePressed(removeButton);
    
    button = createButton('Background');
    button.size(100,25);
    button.position(width + 20, height/2+90);
    button.mousePressed(backgroundButton);
    
    button = createButton('Color');
    button.size(100,25);
    button.position(width + 20, height/2+120);
    button.mousePressed(colorButton);

    button = createButton('Euclidean');
    button.size(100,25);
    button.position(width + 20, height/2+150);
    button.mousePressed(euclideanButton);

    button = createButton('Manhattan');
    button.size(100,25);
    button.position(width + 20, height/2+180);
    button.mousePressed(manhattanButton);
}

function draw() {
    
    var dist,r,g,b;
    
    //draw grid
    background(30);
    if( showBackground )
        drawGrid();
    
    updateAndDrawPoints();

    R = RSlider.value();
    

    for(var i = 0; i < numPoints; i++){
        //do not iterate over the first i point's because of symmetry
        for(var j = i; j < numPoints; j++){
            dist = distance(points[j].x, points[j].y, points[i].x, points[i].y);
            if( dist <= R ){
                my_alpha = myMap(dist,0, R, 255, 0);
                if( showColor ){
                    r = myMap(points[i].x, 0, width,  0,   255);
                    g = myMap(points[i].y, 0, height, 0,   255);
                    b = myMap(points[i].x, 0, height, 255, 0);
                    stroke(r,g,b,my_alpha);
                }else{
                    stroke(255, my_alpha);
                }
                strokeWeight(1);
                line(points[j].x, points[j].y, points[i].x, points[i].y);
            }
        }
    }
}
