const LineSprite = require("../../../game_engine/line_sprite")

class SingularitySprite extends LineSprite {
  constructor(transform, spawningScale = 1) {
    super(transform)
    this.spawningScale = spawningScale
    this.throbbingScale = 1
    this.radius = 15;
  }

  draw(ctx) {
    let spawningScale = this.spawningScale
    if (!this.spawningScale) {
      spawningScale = this.throbbingScale
    }

    ctx.strokeStyle = "#F173BA"

    let r = 95;
    let g = 45;
    let b = 73;

    ctx.save();
    // ctx.translate(pos[0], pos[1]);

    // ctx.strokeStyle = "#4286f4";
    // ctx.lineWidth = 4;
    let blurFactor = 0.5

    ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
    ctx.shadowBlur = 10
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
    ctx.lineWidth = 7.5;
    this.drawSingularity(ctx, this.radius * spawningScale);
    ctx.lineWidth = 6
    this.drawSingularity(ctx, this.radius * spawningScale);
    ctx.lineWidth = 4.5
    this.drawSingularity(ctx, this.radius * spawningScale);
    ctx.lineWidth = 3
    this.drawSingularity(ctx, this.radius * spawningScale);
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth = 1.5
    this.drawSingularity(ctx, this.radius * spawningScale);
    ctx.restore();
    // ctx.lineWidth = 2;
    // drawSingularity(ctx, this.radius * spawningScale);
  }

  drawSingularity(ctx, radius) {
    ctx.beginPath();
    let pos = this.transform.absolutePosition()
    ctx.arc(pos[0], pos[1], radius, 0, 2 * Math.PI, true);
    ctx.stroke();
  }
}

module.exports = SingularitySprite