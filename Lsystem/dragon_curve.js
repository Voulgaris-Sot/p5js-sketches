/*
 L system for the dragon curve
 F = forward and angle = 90
 Everything else is ignored
 
 */

var axiom = "FX";

var rules = {
    X : "X+YF+",
    Y : "-FX-Y",
    F : ""
};

var sentence;
var angle; //the angle that the next forward should have
var constAngle;
var length;
var depth;

var stack = [];

function addcell(xPos, yPos, angle){
    stack.push({x : xPos, y : yPos, a : angle});
}

function removecell(xPos, yPos, angle){
    return stack.pop({x : xPos, y : yPos, a : angle});
}

function generate( n ){
    var nextSentence;

    sentence = axiom;
    for(var ii = 0; ii < n; ii++) {
        nextSentence = "";
        for (var i = 0, len = sentence.length; i < len; i++) {
            if( sentence.charAt(i) in rules){
                nextSentence += rules[sentence.charAt(i)];
            }else{
                nextSentence += sentence.charAt(i);
            }
        }
        sentence = nextSentence;
    }
    console.log(sentence);
}

function turtle( sentence ){
    var x = width/2 , y = height/2;//start in the middle
    var temp;
    for (var i = 0, len = sentence.length; i < len; i++) {
        switch( sentence.charAt(i)){
            case "F" :
                dx = Math.sin( angle ) * length;
                dy = Math.cos( angle ) * length;
                line(x, y, x + dx, y - dy);
                x += dx;
                y -= dy;
                break;
            case "+" :
                angle += constAngle;
                break;
            case "-" :
                angle -= constAngle;
                break;
            case "[" :
                addcell(x,y,angle);
                break;
            case "]" :
                temp = removecell(x,y,angle);
                x = temp.x;
                y = temp.y;
                angle = temp.a;
                break;
            default :
                ;//do nothing
        }
    }
}

function setup() {
    createCanvas(1200, 1200);
    background(51);

    angle = 0;
    length = 10;
    depth = 9;
    constAngle = Math.PI/2;
    
    generate( depth );
    turtle(sentence);
    
    angleSlider = createSlider(0 , 180 , 90, 0.5  );
    angleSlider.position(10, 10);
    
    lengthSlider = createSlider(1 , 50 , 10, 0.1  );
    lengthSlider.position(10,30);
    
    depthSlider = createSlider(1 , 18 , 9, 1  );
    depthSlider.position(10,50);
}


function draw() {
    if(mouseIsPressed){//redraw only if the mouse if pressed
        background(51);
        
        angle = 0; //got to reset the angle or else it's spins
        constAngle = angleSlider.value() * Math.PI / 180;
        length = lengthSlider.value();
        depth = depthSlider.value();
 
        generate(depth);
        turtle(sentence);
    }
}