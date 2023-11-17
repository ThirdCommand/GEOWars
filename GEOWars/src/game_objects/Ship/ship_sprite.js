const LineSprite = require("../../game_engine/line_sprite")

class ShipSprite extends LineSprite {
  constructor(transform, spawningScale = 1) {
    super(transform)
    this.spawningScale = spawningScale
    this.flashHide = false
  }

  draw(ctx) {
    if (this.flashHide) {
      
    } else {
      let pos = this.transform.absolutePosition()
      let shipWidth = 10
      let vel = this.transform.absoluteVelocity()
      // let movementDirection = Math.atan2(vel[0], -vel[1])
      ctx.save();
      ctx.beginPath();
      ctx.translate(pos[0], pos[1]);
      ctx.rotate(this.transform.angle + Math.PI / 4);
      ctx.translate(-shipWidth / 2, shipWidth / 2);

      ctx.strokeStyle = "#ffffff";
      let r = 255;
      let g = 255;
      let b = 255;

      let blurFactor = 0.5
      ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
      ctx.shadowBlur = 10 * blurFactor * blurFactor
      ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.1)";
      ctx.lineWidth = 7.5 * blurFactor * blurFactor
      ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.1)";
      this.drawShip(ctx, shipWidth)
      ctx.lineWidth = 6 * blurFactor
      ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.1)";
      this.drawShip(ctx, shipWidth)
      ctx.lineWidth = 4.5;
      this.drawShip(ctx, shipWidth)
      ctx.lineWidth = 3;
      this.drawShip(ctx, shipWidth)
      ctx.strokeStyle = 'rgb(255, 255, 255)';
      ctx.lineWidth = 1.5;
      this.drawShip(ctx, shipWidth)

      ctx.restore();
    }
    
  }

  drawShip(ctx, shipWidth) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -shipWidth);
    ctx.lineTo(2 / 3 * shipWidth, -(1 + 1 / 6) * shipWidth); //1
    ctx.lineTo(1 / 3 * shipWidth, -5 / 6 * shipWidth) // 2
    ctx.lineTo(1 / 3 * shipWidth, -1 / 3 * shipWidth) // 2.5
    ctx.lineTo(5 / 6 * shipWidth, -1 / 3 * shipWidth) // 3
    ctx.lineTo((1 + 1 / 6) * shipWidth, -2 / 3 * shipWidth) // 4
    ctx.lineTo(shipWidth, 0) // 5
    ctx.closePath();
    ctx.stroke();
  }
}

module.exports = ShipSprite;