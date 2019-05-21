var my_width = 920;
var my_height = 50;

var points = [];
var radius = 5;
var step_x;
var step_y;
var generator;

function setup() {
    createCanvas(my_width, my_height);
    background(255);
  
    Xslider = createSlider(1, 100, radius);
    Xslider.position(20, my_height + 50);
    Yslider = createSlider(1, 50, radius);
    Yslider.position(20, my_height + 80);
    
    generator = new Point(20,my_height/2,"up")
    //generator is a Point with different update rules
    generator.update = updateGen;

    frameRate(20)
    //noLoop();
}

function draw() {
    background(255);
    step_x = Xslider.value();
    step_y = Yslider.value();
    
    //show and update all points
    fill(0)
    for( p in points){
        points[p].draw();
        points[p].update();
    }
    
    //create the new point
    points.push(new Point(generator.x + step_x, generator.y, generator.dir));
    
    //show and update generator
    fill(255, 204, 0);
    generator.draw();
    generator.update();
}