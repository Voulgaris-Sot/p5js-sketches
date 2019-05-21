function Segment(xStart, yStart, len, angle, depth){
    //console.log(xStart,yStart,len,angle,depth);
    this.xStart = xStart;
    this.xEnd   = xStart + Math.sin(angle) * len;
    this.yStart = yStart;
    this.yEnd   = yStart - Math.cos(angle) * len;
    
    this.depth = depth;
    this.len = len;
    this.angle = angle;
    
    //console.log(this.xStart,this.xEnd,this.yStart,this.yEnd,this.depth);
    this.display = function(){
        //strokeWeight(this.depth);
        if(this.depth < 2){
            stroke(128, 255, 68);
            line(this.xStart, this.yStart, this.xEnd, this.yEnd);
        }else{
            stroke(255);
            line(this.xStart, this.yStart, this.xEnd, this.yEnd);
        }
    }
}

