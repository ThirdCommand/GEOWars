const Util = require("./util");
const Sound = require("./sound")

const Transform = require( "./transform")
const PhysicsComponent = require("./physics_component")
const lineRenderer = require("./line_renderer")

class GameObject {
  constructor(engine) {
    this.gameEngine = engine
    this.transform = new Transform()
    this.childObjects = []
    // this.color = options.color;
    // this.game = options.game;
    // this.bounce = true;
    // this.speed = 0;
  }

  addPhysicsComponent() {
    this.physicsComponent = new PhysicsComponent(this.transform)
    this.gameEngine.addPhysicsComponent(this.physicsComponent)
  }

  addLineRenderer(drawFunction) {
    this.lineRenderer = new LineRenderer(drawFunction)
    this.gameEngine.addLineRenderer(this.lineRenderer)
  }

  //hmm. user makes a new game object, then adds it to the parent
  addChildGameObject(obj){
    this.childObjects.append(obj)
    obj.parentTransform = this.transform
  }

  update() {

  }

  remove() {
    this.childObjects.forEach((obj) => {
      this.gameEngine.remove(obj)
    })
    this.gameEngine.remove(this);
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = GameObject;
