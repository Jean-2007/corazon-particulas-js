let particles = [];
let maxParticles = 1000;

function setup() {
  createCanvas(800, 1000);
  background(0);
  noStroke();
}

function draw() {
  background(0, 50); // Desvanece lentamente

  if (particles.length < maxParticles) {
    for (let i = 0; i < 10; i++) {
      let t = PI - 2 * PI * random();
      let p = pointOnHeart(t);
      let speed = random(2, 5);
      let vx = p.x * speed * 0.05;
      let vy = -p.y * speed * 0.05;
      particles.push(new Particle(width/2 + p.x, height/2 - p.y, vx, vy));
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
}

function pointOnHeart(t) {
  let x = 160 * pow(sin(t), 3);
  let y = 130 * cos(t) - 50 * cos(2 * t) - 20 * cos(3 * t) - 10 * cos(4 * t) + 25;
  return createVector(x, y);
}

class Particle {
  constructor(x, y, vx, vy) {
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);
    this.acc = this.vel.copy().mult(-0.05);
    this.lifetime = 255;
    this.size = 10;
    this.color = color(234, 128, 176, this.lifetime);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifetime -= 4;
    this.color.setAlpha(this.lifetime);
  }

  draw() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  isDead() {
    return this.lifetime <= 0;
  }
}
