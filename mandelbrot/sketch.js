var gridSize;
var columns;
var row;
var MAX_ITERATIONS = 500;

function setup() {
    createCanvas(1200, 800);
 
    background(51);
    
    translate(width/2,height/2);
    
    mandelbrot();
}

function mandelbrot(){
    var x,y;
    var i,j;
    for(i=-width/2; i<width/2; i++){
        for(j=-height/2; j<height/2; j++){
            
            //x_0 = map(i,-width/2,width/2,-2.5,2.5);
            //y_0 = map(j,-width/2,width/2,-2.5,2.5);
            x_0 = i * 0.003;
            y_0 = j * 0.003;
            
            x = y = 0;
            for(ii=0; x*x + y*y < 4 && ii< MAX_ITERATIONS; ii++){
                xtemp = x*x -y*y + x_0;
                y = 2*x*y + y_0;
                x = xtemp;
            }
            if( (x*x + y*y >= 4 )|| ii > MAX_ITERATIONS){//change to ternary
                
                var delta = ii/500;
                var r = Math.min(3 * delta, 1) * 256;
                var g = Math.max(Math.min(3 * delta - 1, 1), 0) * 256;
                var b = Math.max(Math.min(3 * delta - 2, 1), 0) * 256;
                stroke(r,g,b);
                
                //stroke(200); //white
            }else{
                
                var delta = ii/50000;
                var r = Math.min(3 * delta, 1) * 256;
                var g = Math.max(Math.min(3 * delta - 1, 1), 0) * 256;
                var b = Math.max(Math.min(3 * delta - 2, 1), 0) * 256;
                stroke(r,g,b);
                
                //stroke(0); //black
            }
            point(i,j);
        }
        //console.log(i);
    }
    
    
}

function draw() {
    noLoop();
}

