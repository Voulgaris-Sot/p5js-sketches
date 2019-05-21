/* Fractal tree
 Make it wave a little bit
 */

var stack = [];
var len;
var constAngle;
var maxDepth;
var initial;
var lenMult ;

function setup() {
    createCanvas(700, 700);
 
    background(51);
    strokeWeight(1);
    len = 200;
    maxDepth = 12;
    //frameRate(5);


    angleSlider = createSlider(0 , 180 , 90, 0.5  );
    angleSlider.position(10,10);
    
    lenSlider = createSlider(50 , 500 , 100, 1  );
    lenSlider.position(10,30);
    
    lenMultSlider = createSlider(1 , 100, 67, 1  );
    lenMultSlider.position(10,50);
    
}

function draw() {
 
    background(51);
    
    //get the sliders values
    constAngle = angleSlider.value() * Math.PI / 180;
    len = lenSlider.value();
    lenMult = lenMultSlider.value()/100;

    //push initial and start from there
    initial = new Segment(width/2, height, len, 0, maxDepth);
    initial.display();
    stack.push(initial);
    
    dfs();
    
}

function dfs(){
    var s;
    while( stack.length > 0){
        s = stack.pop();
        makeTree(s);
    }

}

function makeTree( segment ){
    if( segment.depth === 0){
        return ;
    }
    var Rsegment = new Segment(segment.xEnd, segment.yEnd,
                               segment.len * lenMult, segment.angle + constAngle + Math.sin(frameCount/100)*0.2, segment.depth -1);
    Rsegment.display();
    stack.push(Rsegment);
    
    var Lsegment = new Segment(segment.xEnd, segment.yEnd,
                               segment.len * lenMult, segment.angle - constAngle + Math.sin(frameCount/100)*0.2, segment.depth -1);
    Lsegment.display();
    stack.push(Lsegment);
}
