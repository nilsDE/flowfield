/*******************
* GLOBAL VARIABLES *
*******************/
let cols;
let rows;
let scale = 10;

let increment = 0.1;
let currentFrameRate;
let zOffset = 0;
let particles = [];
let flowfield;

let sliderR;
let sliderG;
let sliderB;
let sliderFlowFieldSpeed;

let flowfieldVisible = false;

/***************
 **** SETUP ****
 **************/
function setup() {
	let canvas = createCanvas(800, 600);
	canvas.parent('sketch-holder');
	if (!flowfieldVisible) {
		background(255);
	}
	sliderR = createSlider(0, 255, 0, 1);
	sliderG = createSlider(0, 255, 0, 1);
	sliderB = createSlider(0, 255, 0, 1);
	sliderFlowFieldSpeed = createSlider(0.00005, 0.005, 0.0005, 0.00001);
  cols = floor(width/scale);
	rows = floor(height/scale);
	currentFrameRate = createP('');
	flowfield = new Array(cols*rows);

	for (let i =0; i < 1500; i++) {
		particles[i] = new Particle();
	}

	//Toggle between particles and flowfield when button is clicked
	document.querySelector(".flowfield-button").onclick = () => {
		clear();
		flowfieldVisible = flowfieldVisible ? false : true;
	 };

	 //Restart the sketch
	 document.querySelector(".clear-canvas").onclick = () => {
		clear();
		particles = [];
		for (let i =0; i < 1500; i++) {
			particles[i] = new Particle();
		}
	 };
}


/**************
 **** DRAW ****
 *************/
function draw() {
	if (flowfieldVisible) {
		background(255);
	}
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
      let xoff = 0;
      for (let x = 0; x < cols; x++) {
          let index = x+y*cols;
					let angle = noise(xoff, yoff, zOffset)*TWO_PI*4;
					let v = p5.Vector.fromAngle(angle);
					v.setMag(0.7);
					flowfield[index] = v;
					xoff += increment; 

					//draw the flowfield depending on whether the button has been clicked
					if (flowfieldVisible) {
						stroke(0, 50);
						push();
						translate(x*scale, y* scale);
						rotate(v.heading());
						strokeWeight(1);
						line(0, 0, scale, 0);
						pop();
					}
      }
			yoff += increment;
			
			zOffset += sliderFlowFieldSpeed.value();
	}

	for (let particle of particles) {
		particle.follow(flowfield);
		particle.update();
		particle.edges();
		particle.show();
	}

currentFrameRate.html(floor(frameRate()));		
}

//Save a jpg of the current canvas by pressing 's'
keyReleased = function() {
	if (key == 's' || key == 'S') save('myCanvas.jpg');
};