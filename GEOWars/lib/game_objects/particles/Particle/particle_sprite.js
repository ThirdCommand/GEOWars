
class ParticleSprite extends LinSprite {
  constructor(transform, spawningScale = 1) {
    this.super(transform)
    this.spawningScale = spawningScale
    this.rectLength = 15;
    this.rectWidth = 2;
    this.hue
  }

  draw(ctx) {
    
    let pos = this.transform.pos;
    let l = 15;
    let w = 5;
    let movementDirection = Math.atan2(this.vel[0], -this.vel[1])

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

module.exports = ArrowSprite;