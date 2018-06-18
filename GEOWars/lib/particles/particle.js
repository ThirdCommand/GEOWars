

class Particle {
  constructor(xpos, ypos, velocity, ctx, game, explosionId, particleID, colors) {
    this.colors = colors;
    this.game = game;
    this.active = true;
    this.hue = this.colors[Math.floor(this.colors.length * Math.random())];
    this.particleId;
    this.explosionId;
    

    this.x = xpos; // x and y position
    this.y = ypos;

    this.rectLength = 20;
    this.rectWidth = 2;
    // this.r = this.rand(200, 10, 0);
    this.initialVelocity = velocity;
    this.movementAngle = Math.random() * Math.PI * 2;
    this.vx = this.initialVelocity * Math.cos(this.movementAngle);
    this.vy = this.initialVelocity * Math.sin(this.movementAngle);
    this.acceleration = -0.1;

    this.opacity = Math.random() + .5;
    this.active = true;

    ctx.fillStyle = this.hue;
    ctx.fillRect(this.x, this.y, this.rectLength, this.rectWidth);
  }




  // private method
  rand(max, min, _int) {
    var max = (max === 0 || max) ? max : 1,
      min = min || 0,
      gen = min + (max - min) * Math.random();

    return (_int) ? Math.round(gen) : gen;
  };

  draw(ctx) {
    this.active = true;
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.acceleration * Math.sin(this.movementAngle);
    this.vx += this.acceleration * Math.cos(this.movementAngle);
    // this.hue -= 0.5;
    if ((Math.abs(this.vx) + Math.abs(this.vy)) < 0.05) {
      // debugger;
      this.remove();
    } else {
      // ctx.save();
      ctx.fillStyle = this.hue;
      ctx.fillRect(this.x, this.y, this.rectLength, this.rectWidth);
      // ctx.restore();
    }
  }

  remove() {
    this.game.remove(this, );
  }
}


module.exports = Particle;