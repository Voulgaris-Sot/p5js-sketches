function Point(x, y, dir) {
    this.x = x;
    this.y = y;
    this.dir = dir;
}

Point.prototype.draw = function() {
    ellipse(this.x, this.y, radius, radius);
};

Point.prototype.update = function() {
    this.x += step_x;
    if( this.x > my_width ){
        points.splice(p,1);
    }
    /*
     if( points[p].dir == "up"){
     if(points[p].y - step < 0 ){
     points[p].y = step - points[p].y;
     points[p].dir = "down"
     }else{
     points[p].y = points[p].y - step;
     }
     }else{
     if(points[p].y + step > my_height ){
     points[p].dir = "up"
     points[p].y = my_height - (step - (my_height - points[p].y));
     }else{
     points[p].y = points[p].y + step;
     }
     }*/
};

function updateGen(){

    if( this.dir == "up"){
        if(this.y - step_y < 0 ){
            this.y = step_y - this.y;
            this.dir = "down"
        }else{
            this.y = this.y - step_y;
        }
    }else{
        if(this.y + step_y > my_height ){
            this.dir = "up"
            this.y = my_height - (step_y - (my_height - this.y));
        }else{
            this.y = this.y + step_y;
        }
    }

}