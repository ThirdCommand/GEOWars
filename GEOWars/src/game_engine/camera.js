const Util = require("./util");

const Transform = require("./transform")
const Collider = require("./collider")
const GameObject = require("./game_object")

class Camera extends GameObject {
  constructor(engine, transform, width, height, currentCamera){
    super(engine)
    this.transform = transform
    this.width = width
    this.height = height
    this.currentCamera = currentCamera
    this.zoomScale = 1;
  }

  update(){
    this.gameEngine.ctx.restore()
    this.gameEngine.ctx.save()
    let xPos = this.transform.pos[0]
    let yPos = this.transform.pos[1]
    let zoomScale = this.zoomScale
    let width = this.width
    let height = this.height

    this.gameEngine.ctx.translate(
      -xPos * zoomScale + width / 2,
      -yPos * zoomScale + height / 2
    )
  }
  
  // contains the transformation info
  // contains the scaling info
  // zooming in and out is possible because of this
  // custom collider
  // contains a list of linesprites to draw
  // If the object is outside of the view it doesn't draw
  // 
}
