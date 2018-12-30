let cols;
let rows;
let scl = 10;
let inc = 0.1;
let fr;
let zoff = 0;

function setup() {
    createCanvas(200, 200);
    cols = floor(width/scl);
		rows = floor(height/scl);
		fr = createP('');
}

function draw() {
	background(255);
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
      let xoff = 0;
      for (let x = 0; x < cols; x++) {
          let index = (x+y*width)*4;
					let angle = noise(xoff, yoff, zoff)*TWO_PI;
					let v = p5.Vector.fromAngle(angle);
          xoff += inc; 
					stroke(0);
					push();
					translate(x*scl, y* scl);
					rotate(v.heading());
					line(0, 0, scl, 0);
					pop();
      }
			yoff += inc;
			
			zoff += 0.001;
	}
fr.html(floor(frameRate()));		
}