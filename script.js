// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize */

let dots, R;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  colorMode(HSB, 360, 100, 100);
  dots = [];
  for (let i = 0; i < 15; i++){
    dots.push(new BouncyDot());
  }
  
  
}

function draw() {
  background(220, 0, 80);
  
  for(let i = 0; i < dots.length; i++){
    dots[i].float();
    dots[i].display();
  }
  
  eatBalls();
  fill (0,70,70);
  
  text ("Click to add more balls and expand your circle!" , 20, 20);
  fill (70,70,70);
  text("Current balls:" + dots.length, 20, 40);
  text("Your circle radius: " + R, 20, 60);
}

function mousePressed() {
  // We'll use this for console log statements only.
  
  dots.push(new BouncyDot());
  console.log(dots);
}

function eatBalls(){
  fill(30,29,89);
  R = 10;
  ellipse(mouseX, mouseY, R);
  for (let i = 0; i < dots.length; i++){
    if (collideCircleCircle(mouseX, mouseY, R, dots[i].x, dots[i].y, dots[i].r * 2)){
      dots[i].r = 0;
      //dots.length
    }
    ellipse(mouseX, mouseY, R += dots[i].r);
  } 
}

class BouncyDot {
  constructor() {
    // Randomly generate position
    this.x = random(width);
    this.y = random(height);
    // Randomly generate radius
    this.r = random(5, 12);
    // Randomly generate color
    this.color = color(random(360), 80, 70);
    // Randomly generate a master velocity (broken into components)...
    this.masterXvelocity = random(0.5, 3);
    this.masterYvelocity = random(0.5, 3);
    // ...and use those as starting velocities.
    this.xVelocity = this.masterXvelocity;
    this.yVelocity = this.masterYvelocity;
  }

  float() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    // Standard bounce code - like the DVD logo, but for spheres.
    if (this.x + this.r > width) {
      this.xVelocity = -1 * this.masterXvelocity;
    }
    if (this.x - this.r < 0) {
      this.xVelocity = this.masterXvelocity;
    }
    if (this.y + this.r > height) {
      this.yVelocity = -1 * this.masterYvelocity;
    }
    if (this.y - this.r < 0) {
      this.yVelocity = this.masterYvelocity;
    }
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
  }
}

