let cols;
let rows;
let scl = 10;
let inc = 0.1;
let fr;

function setup() {
    createCanvas(200, 200);
    background(100);
    cols = floor(width/scl);
		rows = floor(height/scl);
		fr = createP('');
}

function draw() {
    let yoff = 0;
    for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
            let index = (x+y*width)*4;
            let r = noise(xoff, yoff)*255;
            xoff += inc; 
            fill(r);
            rect(x*scl, y*scl,scl,scl);
        }
        yoff += inc;
		}
fr.html(floor(frameRate()));		
}