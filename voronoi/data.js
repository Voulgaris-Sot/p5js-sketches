var sizeSites = 100;

var sites;

function generateData(){

    sites = d3.range(sizeSites)
    .map(function(d) { return [Math.random() * width, Math.random() * height]; });
    
};