class GruntSprite extends LinSprite {
  constructor(transform, spawningScale = 1) {
    this.super(transform)
    this.spawningScale = spawningScale
    this.stretchScale_L = 
    this.stretchScale_W = 
  }

  draw(ctx) {
    let pos = this.transform.absolutePosition();
    
    spawningScale = this.spawningScale;
    let shipLength = 10 * 2.2 * spawningScale * this.stretchScale_L;
    let shipWidth = 10 * 2.2 * spawningScale * this.stretchScale_W;
    let l = shipLength;
    let w = shipWidth;

    let r = 0;
    let g = 57;
    let b = 230;

    ctx.save();
    ctx.translate(pos[0], pos[1]);

    let blurFactor = 0.5

    ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
    ctx.shadowBlur = 10
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
    ctx.lineWidth = 7.5 * blurFactor;
    this.drawDiamond(ctx, l, w);
    ctx.lineWidth = 6 // * blurFactor;
    this.drawDiamond(ctx, l, w);
    ctx.lineWidth = 4.5 // * blurFactor;
    this.drawDiamond(ctx, l, w);
    ctx.lineWidth = 3 // * blurFactor;
    this.drawDiamond(ctx, l, w);
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth = 1.5 // * blurFactor;
    this.drawDiamond(ctx, l, w);
    
    ctx.restore();
  }

  drawDiamond(ctx, l, w) {
    ctx.beginPath();
    ctx.moveTo(0, -l / 2); //1
    ctx.lineTo(w / 2, 0); //2
    ctx.lineTo(0, l / 2); //3
    ctx.lineTo(-w / 2, -0); //4
    ctx.closePath();
    ctx.stroke();
  }




}

module.exports = GruntSprite;