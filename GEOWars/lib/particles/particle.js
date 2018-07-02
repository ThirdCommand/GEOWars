

class Particle {
  constructor(xpos, ypos, initialSpeed, ctx, game, explosionId, particleID, colors) {
    this.game = game;
    this.active = true;
    this.color = colors[Math.floor(colors.length * Math.random())];
    this.particleId;
    this.explosionId;

    this.radial = 0;
    this.x = xpos; // x and y position
    this.y = ypos;

    this.rectLength = 15;
    this.rectWidth = 2;
    // this.r = this.rand(200, 10, 0);
    this.speed = initialSpeed;
    this.movementAngle = Math.random() * Math.PI * 2;
    // this.vx = this.initialSpeed * Math.cos(this.movementAngle);
    // this.vy = this.initialSpeed * Math.sin(this.movementAngle);
    this.acceleration = -0.1;
    
    this.opacity = Math.random() + .5;
    this.active = true;
    this.hue = 0.9;

    ctx.fillStyle = `${this.color},${this.hue})`;

    ctx.fillRect(this.x, this.y, this.rectLength, this.rectWidth);
  }




  // private method
  rand(max, min, _int) {
    var max = (max === 0 || max) ? max : 1,
      min = min || 0,
      gen = min + (max - min) * Math.random();

    return (_int) ? Math.round(gen) : gen;
  };

  move(timeDelta) {
    this.radial += this.speed;
    this.rectLength -= 0.25;
    this.speed += this.acceleration
    this.hue -= 0.007;
  }

  draw(ctx) {

    this.active = true;
    // this.x += this.vx;
    // this.y += this.vy;
    
    if (this.speed < 0.05) {
      this.remove();
    } else {

      ctx.save()
      ctx.translate(this.x, this.y);
      ctx.rotate(this.movementAngle);
      ctx.beginPath();
      ctx.strokeStyle = `${this.color},${this.hue})`;
      ctx.lineWidth = this.rectWidth;
      ctx.moveTo(this.radial, 0);
      ctx.lineTo(this.radial + this.rectLength, 0);
      ctx.stroke();
      ctx.restore();
    }
  }

  remove() {
    this.game.remove(this);
  }
}


module.exports = Particle;