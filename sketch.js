let sound;
let radius = 80; //the radius of the circle in the middle
let numRects = 64; //ensure the number of waves

function preload() {
  sound = loadSound('sample-visualisation.mp3');
}

function setup() {
  createCanvas(400, 400);
  fft = new p5.FFT();
  sound.connect(fft);//create fft
}

function draw() {
  if (getAudioContext().state !== 'running') {
    background(220);
    text('Click here to find you waiting for', 10, 20, width - 20);//the opening words
    return;
  }

  background(0);
  let spectrum = fft.analyze();

  for (let i = 0; i < numRects; i++) {
    let x = map(log(i), 0, log(numRects), 0, width);
    let h = map(spectrum[i], 0, 255, 0, height);
    let rectWidth = map(spectrum[i], 0, 255, 20, 100); //the rect wave must be as long as this
    let rectHeight = 10; // the high of wave

    // calcuate the directon of wave and make it move outside rhe circle
    let angle = (TWO_PI / numRects) * i;
    let centerX = width / 2 + cos(angle) * radius;
    let centerY = height / 2 + sin(angle) * radius;
    let rectX = centerX - rectWidth / 2;
    let rectY = centerY - rectHeight / 2;

    //random color for the wave
    let randomColor = color(random(255), random(255), random(255));
    fill(randomColor);
    
    push();
    translate(centerX, centerY);
    rotate(angle); // let it rotate in a radiorative way
    rect(0, 0, rectWidth, rectHeight);
    pop();
  }
}
// and you should press the mouse before it could be seen
function mousePressed() {
  if (sound.isPlaying()) {
    sound.stop();
    background(255, 0, 0);
  } else {
    sound.play();
    background(0, 255, 0);
  }
}

