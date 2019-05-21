/*
 Data0 :x <-- [-10,0), y <- [0,10)
 Data1 :x <-- [0,10), y <- [0,10)
 There are in total 20 data inputs with half of them belonging to each category
 The data are linearly seperable, although it may take some time to converge
 Buttons to generate new data, to iterate one epoch and reset the line(weight of the neuron)
 The slider controls the learning rate: lr <-- [0,1] with step 0.01
 The training rule is the simplest rule for the perceptron:
    w(i) = w(i) + (d - y)*lr*x(i)
 Activation function: Heavyside
 */

var epochs = 0;
var n; //the neuron of the perceptron

function iterateButton(){
    
    var dim = n.InNodes;
    var misses = 0;
    var lr = lrSlider.value() / 100;
    
    epochs++;
    //shuffle the data
    shuffle(data)
    
    //and iterate over all of them
    for(i in data){
        var x1 = data[i][0][0];//first dimension of input
        var x2 = data[i][0][1];//second dimension of input
        var d = data[i][1];//the desired output
        
        var y = n.activate([x1, x2]);//the output of the neuron

        if( d != y ){
            misses++;
            //update weights
            for(var j = 0; j < dim; j++){
                n.w[j] += lr*(d - y)*data[i][0][j];
            }
            n.w0 += lr*(d - y)*(-1);//the input for the threshold is -1
        }
    }
    console.log("Epoch = ", epochs);
    console.log("Learning Rate = ", lr);
    input.value("y = x*(" + printableNumber(- n.w[1]/n.w[0])+ ")" + printableNumber(n.w0/n.w[0]));
    //console.log("y = x*" + (- n.w[1]/n.w[0]) + " " + n.w0/n.w[0]);
    
    //finally draw the next line
    drawLine();
    return misses;
};

function resetButton(){

    //clear the screen
    background(255);
    input.value("");
    drawData();

    //and reset
    epochs = 0;
    n = new Neuron( 2 );

    drawLine();
};

function generateButton(){
    resetButton();
    generateData();
    drawData();
    drawLine();
}

function setup() {
    createCanvas(1000, 600);
    background(255);

    lrSlider = createSlider(0 , 100 , 5, 1  );
    lrSlider.position(width + 20 , height/2 - 30);
    
    button = createButton('Iterate');
    button.size(100,25);
    button.position(width + 20, height/2);
    button.mousePressed(iterateButton);
    
    button = createButton('Reset');
    button.size(100,25);
    button.position(width + 20, height/2+30);
    button.mousePressed(resetButton);
    
    button = createButton('New Data');
    button.size(100,25);
    button.position(width + 20, height/2-60);
    button.mousePressed(generateButton);
    
    //the input holds the equation of the line
    input = createInput();
    input.position(width + 20, height/2+60);
    
    //create the node
    n = new Neuron( 2 );
    
    drawData();
    drawLine();
};

function draw() {
    noLoop();
};

function drawData(){
    //clear the background
    background(255);
    
    push();
    translate(width/2,height);
    rotate(Math.PI);
    
    drawGrid();
    
    for(i in data){
        strokeWeight(4);
        if(data[i][1] == 1){
            stroke(255,0,0);
        }else{
            stroke(0,0,255);
        }
        var x = data[i][0][0];
        var y = data[i][0][1];
        x = map(x,-10,10,-width/2,width/2);
        y = map(y,0,10,0,height);
        point(-x,y); //-x because it is reversed
    }
    pop();
}

function drawLine(){

    push();
    translate(width/2,height);
    rotate(Math.PI);
    
    //calculate 2 points of the line
    var x1 = n.w0/n.w[0];
    var y1 = 0;
    x1 = map(x1,-10,10,-width/2,width/2);
    y1 = map(y1,0,10,0,height);
    
    var x2 = n.w0/n.w[0] - 10*n.w[1]/n.w[0];
    var y2 = 10;
    x2 = map(x2,-10,10,-width/2,width/2);
    y2 = map(y2,0,10,0,height);
    
    //and finally draw it
    stroke(0);
    strokeWeight(1);
    line(-x1,y1,-x2,y2);//-x because it is reversed

    pop();
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
};

function printableNumber(n){
    return (n > 0) ? "+" + Number(n).toFixed(2) : Number(n).toFixed(2);
};

//http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(array) {
    let counter = array.length;
    
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);
        
        // Decrease counter by 1
        counter--;
        
        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
};

function drawGrid(){
    stroke(0);
    strokeWeight(1);
    //the positions are translated
    line(0, 0, 0, height);
    line(-width/2, 0, width/2, 0);
};
