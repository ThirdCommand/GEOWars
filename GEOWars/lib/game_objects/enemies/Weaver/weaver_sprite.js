const LineSprite = require("../../../game_engine/line_sprite")

class WeaverSprite extends LineSprite {
  constructor(transform, spawningScale = 1) {
    super(transform)
    this.spawningScale = spawningScale
  }

  draw(ctx) {

    let pos = this.transform.absolutePosition();
    let angle = this.transform.absoluteAngle();
    let spawningScale = this.spawningScale
    let shipLength = 10 * 2.2 * spawningScale
    let shipWidth = 10 * 2.2 * spawningScale
    let s = shipWidth / 2;

    let r = 24;
    let g = 255;
    let b = 4;

    ctx.save();
    ctx.translate(pos[0], pos[1]);
    ctx.rotate(angle);

    let blurFactor = 0.5
    ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
    ctx.shadowBlur = 10 * blurFactor
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
    ctx.lineWidth = 7.5
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
    this.drawWeaver(ctx, s)
    ctx.lineWidth = 6
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.6)";
    this.drawWeaver(ctx, s)
    ctx.lineWidth = 4.5;
    this.drawWeaver(ctx, s)
    ctx.lineWidth = 3;
    this.drawWeaver(ctx, s)
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth = 1.5;
    this.drawWeaver(ctx, s)

    ctx.restore();
  }

  drawWeaver(ctx, s) {

    ctx.beginPath();
    // ctx.strokeStyle = "#3cff0b";
    ctx.lineWidth = 2;
    ctx.moveTo(0, -s); //1
    ctx.lineTo(s, 0); //2
    ctx.lineTo(0, s); //3
    ctx.lineTo(-s, 0); //4
    ctx.lineTo(0, -s); //1
    ctx.lineTo(-s / 2, -s / 2); //5
    ctx.lineTo(s / 2, -s / 2); //6
    ctx.lineTo(s / 2, s / 2); //7
    ctx.lineTo(-s / 2, s / 2); //8
    ctx.lineTo(-s / 2, -s / 2); //5
    // ctx.closePath();
    ctx.stroke();
  }
}

module.exports = WeaverSprite