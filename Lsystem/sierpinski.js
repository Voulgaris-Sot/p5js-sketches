/*
 L system for the sierpinski traingle
 F,G = forward and angle = 120
 */

var axiom = "F-G-G";

var rules = {
    F : "F-G+F+G-F",
    G : "GG",
    
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
    var x = 0 , y = height/2;//start in the middle
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
            case "G" :
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

    angle = Math.PI/6;
    length = 10;
    depth = 3;
    constAngle = Math.PI*4/3;
    
    generate( depth );
    turtle(sentence);
        
    depthSlider = createSlider(1 , 7 , 3, 1  );
    depthSlider.position(10,50);
}


function draw() {
    if(mouseIsPressed){//redraw only if the mouse if pressed
        background(51);
        
        angle = Math.PI/6; //got to reset the angle or else it's spins
        constAngle = Math.PI*4/3;
        depth = depthSlider.value();
 
        generate(depth);
        turtle(sentence);
    }
}