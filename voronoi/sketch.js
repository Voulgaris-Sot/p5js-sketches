/*
 Visualization of a voronoi diagramm using the d3 library
 */

var sites;
var voronoi;
var cnv;
function setup() {
    cnv = createCanvas(1000, 600);
    //attach a listener for activity on canvas
    cnv.mouseMoved(recalculate);
    background(255);
    
    generateData();
    sites[0] = [width/2,height/2];
    
    voronoi = d3.voronoi()
    .extent([[-1, -1], [width + 1, height + 1]]);
    
    polygons = voronoi.polygons(sites)

    //finally create the buttons
    button = createButton('Resample Points');
    button.size(100,50);
    button.position(width+10, height/2);
    button.mousePressed(resampleButton);
};

function resampleButton(){

    generateData();
    recalculate();

}

function recalculate(){

    if(mouseX < width && mouseY<height){
        sites[0] = [mouseX, mouseY];    
    }
    polygons = voronoi.polygons(sites)

}
function draw() {
    background(255);
    var r,g,b;
    
    for(var j=0; j < sizeSites; j++){//every polygon corresponds to one site
        //draw the polygons
        strokeWeight(1);
        r = map(polygons[j].data[0], 0, width,  0,   255);
        g = map(polygons[j].data[1], 0, height, 0,   255);
        b = map(polygons[j].data[0], 0, height, 255, 0);
        fill(r,g,b);
        beginShape();
        for(var jj=0; jj < polygons[j].length; jj++){
            vertex(polygons[j][jj][0],polygons[j][jj][1]);
        }
        endShape(CLOSE);
        
        //draw the points
        strokeWeight(4);
        stroke(0);
        point(polygons[j].data[0],polygons[j].data[1]);
    }
    
};
