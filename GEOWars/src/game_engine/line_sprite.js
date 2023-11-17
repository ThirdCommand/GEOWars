class LineSprite {
  constructor(transform) {
    this.transform = transform
    // this.drawFunction = draw
    this.zoomScaling = 1
  }

  draw(ctx) {
    pos = this.transform.absolutePosition()
    angle = this.transform.abosluteAngle()
    this.drawFunction(ctx, pos, angle)
  }
  drawFunction(ctx,pos,angle){
    
  }
}

module.exports = LineSprite;