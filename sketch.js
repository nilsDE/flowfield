let cols;
let rows;
let scl = 10;
let inc = 0.1;
let fr;
let zoff = 0;
let particles = [];
let flowfield;

let sliderR;
let sliderG;
let sliderB;

function setup() {
  createCanvas(800, 600);
	background(255);
	sliderR = createSlider(0, 255, 0, 1);
	sliderG = createSlider(0, 255, 0, 1);
	sliderB = createSlider(0, 255, 0, 1);
  cols = floor(width/scl);
	rows = floor(height/scl);
	fr = createP('');
	flowfield = new Array(cols*rows);

	for (let i =0; i < 1500; i++) {
		particles[i] = new Particle();
	}
}

function draw() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
      let xoff = 0;
      for (let x = 0; x < cols; x++) {
          let index = x+y*cols;
					let angle = noise(xoff, yoff, zoff)*TWO_PI*4;
					let v = p5.Vector.fromAngle(angle);
					v.setMag(0.7);
					flowfield[index] = v;
          xoff += inc; 
//					stroke(0, 50);
//					push();
//					translate(x*scl, y* scl);
//					rotate(v.heading());
//					strokeWeight(1);
//					line(0, 0, scl, 0);
//					pop();
      }
			yoff += inc;
			
			zoff += 0.0005;
	}

	for (let particle of particles) {
		particle.follow(flowfield);
		particle.update();
		particle.edges();
		particle.show();
	}

fr.html(floor(frameRate()));		
}