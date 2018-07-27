
class BoxBoxSprite extends LinSprite{
  constructor(transform, spawningScale = 1) {
    this.super(transform)
    this.spawningScale = spawningScale
  }

  draw(ctx) {

    spawningScale = this.spawningScale || 1;
    let pos = this.transform.pos
    let boxsize = 10 * spawningScale;

    // ctx.strokeStyle = "#F173BA";

    let r = 230;
    let g = 30;
    let b = 30;

    let blurFactor = 0.5
    ctx.save();
    ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
    ctx.shadowBlur = 10
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
    ctx.restore();
    ctx.lineWidth = 2;

    // drawRect()

    // ctx.rect(pos[0] - (6 / 8 * boxsize), pos[1] - (2 / 8 * boxsize), boxsize, boxsize);
    // ctx.rect(pos[0] - (2 / 8 * boxsize), pos[1] - (6 / 8 * boxsize), boxsize, boxsize);
    // ctx.stroke();
    // ctx.lineWidth = 6 // * blurFactor;
    // ctx.rect(pos[0] - (6 / 8 * boxsize), pos[1] - (2 / 8 * boxsize), boxsize, boxsize);
    // ctx.rect(pos[0] - (2 / 8 * boxsize), pos[1] - (6 / 8 * boxsize), boxsize, boxsize);
    // ctx.stroke();
    // ctx.lineWidth = 4.5 // * blurFactor;
    // ctx.rect(pos[0] - (6 / 8 * boxsize), pos[1] - (2 / 8 * boxsize), boxsize, boxsize);
    // ctx.rect(pos[0] - (2 / 8 * boxsize), pos[1] - (6 / 8 * boxsize), boxsize, boxsize);
    // ctx.stroke();
    // ctx.lineWidth = 3 // * blurFactor;
    // ctx.rect(pos[0] - (6 / 8 * boxsize), pos[1] - (2 / 8 * boxsize), boxsize, boxsize);
    // ctx.rect(pos[0] - (2 / 8 * boxsize), pos[1] - (6 / 8 * boxsize), boxsize, boxsize);
    // ctx.stroke();
    // ctx.strokeStyle = 'rgb(255, 255, 255)';
    // ctx.lineWidth = 1.5 // * blurFactor;
    // ctx.rect(pos[0] - (6 / 8 * boxsize), pos[1] - (2 / 8 * boxsize), boxsize, boxsize);
    // ctx.rect(pos[0] - (2 / 8 * boxsize), pos[1] - (6 / 8 * boxsize), boxsize, boxsize);
    // ctx.stroke();

    ctx.restore();
  }

  drawRect(ctx, boxsize) {

  }



}

module.exports = BoxBoxSprite;