const Util = require("./util");
const Sound = require("./sound")

const Transform = require( "./transform")
const PhysicsComponent = require("./physics_component")
const LineSprite = require("./line_sprite")
const Collider = require("./collider")

class GameObject {
  constructor(engine) {
    // debugger
    this.gameEngine = engine
    this.gameEngine.addGameObject(this)
    this.transform = new Transform()
    this.childObjects = []
    this.physicsComponent = null 
    this.lineSprite = null
    this.parentObject = null
    this.colliders = []
    // this.color = options.color;
    // this.game = options.game;
    // this.bounce = true;
    // this.speed = 0;
  }

  addPhysicsComponent() {
    this.physicsComponent = new PhysicsComponent(this.transform)
    this.gameEngine.addPhysicsComponent(this.physicsComponent)
  }

  addLineSprite(lineSprite) {
    this.lineSprite = lineSprite
    this.gameEngine.addLineSprite(this.lineSprite)
  }

  addMousePosListener(){
    this.gameEngine.addMouseListener(this)
  }


  addLeftControlStickListener() {
    this.gameEngine.addLeftControlStickListener(this)
  }

  updateLeftControlStickInput(direction){

  }

  updateMousePos(mousePos){

  }

  addColider(type, gameObject, radius, subscriptionTypes, subscriptions){
    // game engine checks every collider with it's subscription types
    let newCollider = new Collider(type, gameObject, radius, subscriptionTypes, subscriptions)
    this.colliders.push(newCollider)
    this.gameEngine.addCollider(newCollider)
  }

  // store sound in instance
  playSound(sound){
    this.gameEngine.queueSound(sound)
  }

  //hmm. user makes a new game object, then adds it to the parent
  addChildGameObject(obj){
    this.childObjects.push(obj)
    obj.parentTransform = this.transform
    obj.parentObject = this
  }

  update() {
    // overwritten by child class for update scripts
  }

  onCollision(objectType){
    // overwritten by child class for handler
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
