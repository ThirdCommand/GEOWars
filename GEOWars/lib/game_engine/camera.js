const Util = require("./util");

const Transform = require("./transform")
const Collider = require("./collider")
const GameObject = require("./game_object")

class Camera extends GameObject {
  constructor(engine, width, height, currentCamera){
    super(engine)
    this.currentCamera = currentCamera
    this.zoomScale = 1
  }
  
  // contains the transformation info
  // contains the scaling info
  // zooming in and out is possible because of this
  // custom collider
  // contains a list of linesprites to draw
  // If the object is outside of the 
  // 
  


  
}
