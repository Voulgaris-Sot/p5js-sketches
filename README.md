# p5.js Sketches

Mostly fractal and geometry related sketches in p5.js.

### Overview

1. **Fractal Tree**  
6 versions of a simple fractal tree. The sliders control the angle, the length of the branch and the multiplying   factor for the length.  
V1 is the basic form where the branches split into 2 new.  
V2 changes the angles depending on the frame count.  
V3 and V4 splits the branch into 4 instead of 2.  
V5 and V6 are like V1 and V2 but the branch width depends on the depth. More realistic looking trees  
2. **Mandelbrot**  
Naive, grid-based visualization of the mandelbrot set with fancy colors.  
3. **L-System**  
L systems for the sierpinski triangle, dragon curve and a tree like form.  
L systems are based on a grammar and the symbols are instructions to a drawing turtle.  
TODO: Make it more general and accept random grammar and production rules  
4. **Game of Life**   
A naive implementation of Conway's Game of Life.  
You can fill the board randomly or with the mouse and control the speed via the framerate.  
The rules are the original and hardcoded.  
5. **Voronoi diagrams**  
Visualization of a Voronoi diagramm with the Delaunay triangulation using the d3 library.  
6. **Connected Particles**  
2-d Particles with constant speed are connected when they get close to each other.  
The connection strength depends on the {Euclidean,Manhattan} distance.  
7. **Wave**  
A bouncing generator produces wave like animations.  
8. **Perceptron**   
Visualization of a percepton with linearly separable classes on 2d.  


If you want to run it, the html page expect the libraries to be located in the previous folders. Alternatively use cdnjs.  
Tested on p5.js v0.6.1 and p5.dom.js v0.3.4  

To Add:  
IFS, Julia Set
