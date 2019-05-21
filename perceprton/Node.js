//N is the number of the back weights that the neuron has
function Neuron(N){

    //simple way to do this
    this.w = [];
    for(var i = 0; i < N ; i++ ){
        this.w.push(getRandomInt(-10,10));
    }
    this.w0 = getRandomInt(-10,10);
    this.InNodes = N;
    
    this.activate = function(x){
        var total = 0;
        for(var i = 0; i < N ; i++ ){
            total += this.w[i] * x[i]
        }
        return (total >= this.w0) | 0 // |0 converts to a number
    };
};