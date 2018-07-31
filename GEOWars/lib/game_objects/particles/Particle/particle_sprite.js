const LineSprite = require("../../../game_engine/line_sprite")

class ParticleSprite extends LineSprite {
  constructor(transform, color, hue) {
    super(transform)
    // this.spawningScale = spawningScale
    this.rectLength = 15;
    this.rectWidth = 2;
    this.color = color
    this.hue = hue
  }

  draw(ctx) {
    // debugger
    let pos = this.transform.absolutePosition();
    let vel = this.transform.absoluteVelocity();
    let l = 15;
    let w = 5;
    let movementDirection = Math.atan2(vel[0], -vel[1])

    ctx.save();
    ctx.beginPath();
    ctx.translate(pos[0], pos[1]);
    ctx.rotate(movementDirection + 2 * Math.PI);

    ctx.beginPath();
    ctx.strokeStyle = `${this.color},${this.hue})`;
    ctx.lineWidth = this.rectWidth;

    ctx.moveTo(0, 0); //1
    ctx.lineTo(0, this.rectLength); //2

    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}

module.exports = ParticleSprite;