class ArrowSprite extends LinSprite {
  constructor(transform, spawningScale = 1) {
    this.super(transform)
    this.spawningScale = spawningScale
  }

  draw(ctx) {
    let pos = this.transform.absolutePosition();
    spawningScale = this.spawningScale || 1;
    let shipLength = 8 * 2.2 * spawningScale;
    let shipWidth = 6 * 2.2 * spawningScale;
    let l = shipLength;
    let w = shipWidth;
    let movementDirection = Math.atan2(this.vel[0], -this.vel[1])

    let r = 255;
    let g = 255;
    let b = 50;

    ctx.save();
    ctx.beginPath();
    ctx.translate(pos[0], pos[1]);
    ctx.rotate(movementDirection + 2 * Math.PI);

    // ctx.strokeStyle = "#f2ff00"; // look up rgb and put here
    ctx.lineWidth = 2;

    let blurFactor = 0.5
    ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
    ctx.shadowBlur = 10 * blurFactor;
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
    ctx.lineWidth = 7.5 * blurFactor;
    this.drawArrow(ctx, l, w);
    ctx.lineWidth = 6 * blurFactor;
    this.drawArrow(ctx, l, w);
    ctx.lineWidth = 4.5;
    this.drawArrow(ctx, l, w);
    ctx.lineWidth = 3;
    this.drawArrow(ctx, l, w);
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth = 1.5;
    this.drawArrow(ctx, l, w);

    // drawArraw(ctx)
    ctx.restore();
  }

  drawArrow(ctx, l, w) {
    ctx.beginPath();
    ctx.moveTo(0, -l / 2); //1
    ctx.lineTo(w / 2, l / 4); //2
    ctx.lineTo(w / 6, l / 2); //3
    ctx.lineTo(0, l / 4); //4
    ctx.lineTo(-w / 6, l / 2); //5
    ctx.lineTo(-w / 2, l / 4); //6
    ctx.closePath();
    ctx.stroke();
  }
}

module.exports = ArrowSprite;