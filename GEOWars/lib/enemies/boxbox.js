BoxBox.boxSize = 10;

class BoxBox{
  constructor() {

  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(pos[0] - (7/8 * this.boxSize), pos[1] - (1/8 * this.boxSize), this.boxSize, this.boxSize);
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;
    ctx.stroke;
    
    ctx.beginPath();
    ctx.rect(pos[0] - (1/8 * this.boxSize), pos[1] - (7/8 * this.boxSize), this.boxSize, this.boxSize);
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;
    ctx.stroke;

  }
}
