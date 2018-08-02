const GameScript = require("../game_script");
// const GameObject = require("./game_boject");
// const LineRenderer = require("./line_renderer");
// const PhysicsComponent = require("./physics_component")
const Sound = require("./sound")
// const Transform = require("./transform")
const Util = require("./util")

class GameEngine {
  constructor(ctx) {
    this.ctx = ctx
    this.gameObjects = [];
    this.physicsComponents = [];
    this.lineSprites = [];
    this.soundsToPlay = {};
    this.colliders = {};
    this.subscribers = [];
    this.muted = true;
    this.mouseListeners = [];
    this.leftControlStickListeners = [];
    this.gameScript = new GameScript(this);
    this.toRemoveQueue = []
  }

  tick(delta) {
    this.movePhysicsComponents(delta)
    this.checkCollisions()
    this.updateGameObjects(delta)
    this.clearCanvas()
    this.renderLineSprites(this.ctx)
    this.updateGameScript(delta)
    this.playSounds()
  }

  clearCanvas(){

    this.ctx.clearRect(0, 0, this.gameScript.DIM_X, this.gameScript.DIM_Y);
    this.ctx.fillStyle = this.gameScript.BG_COLOR;
    this.ctx.fillRect(0, 0, this.gameScript.DIM_X, this.gameScript.DIM_Y);
  }

  addLeftControlStickListener(object){
    this.leftControlStickListeners.push(object)
  }

  updateLeftControlStickListeners(unitVector){
    this.leftControllStickListeners.forEach((listener) => {
      listener.updateLeftControlStickInput(unitVector)
    })
  }

  updateMousePos(mousePos){
    this.mouseListeners.forEach((object) => {
      object.updateMousePos(mousePos)
    })
  }

  movePhysicsComponents(delta) {
    this.physicsComponents.forEach((component) => {
      component.move(delta)
    })
  }

  addCollider(collider){
    if (collider.subscriptions) {
      this.subscribers.push(collider)
    }
    let colliders = this.colliders
    // collider: object absolute transform
    // collider {"objectType": "Bullet", "type": "general", "subscriptions": ["BoxBox", "Arrow"], "subscribedColliderTypes": ["General"]}
    // colliders {"Singularity": {"General": [collider, collider], "GravityWell": [collider, collider]}}
    if (!colliders[collider.objectType]) {
      let collidersSameTypeAndObject = {}
      collidersSameTypeAndObject[collider.type] = [collider]
      colliders[collider.objectType] = collidersSameTypeAndObject
    } else {
      if (!colliders[collider.objectType][collider.type]){
        colliders[collider.objectType][collider.type] = [collider]
      } else {
        colliders[collider.objectType][collider.type].push(collider)
      }
    }
  }

  // must be a way to only retrieve 
  // the data for subscribed colliders once

  checkCollisions() {
// colliders{
// "Arrow": [collider, collider]
// }

// collider {
//   "objectType": "Bullet",
//   "type": "general",
//   "subscriptions": ["BoxBox", "Arrow"],
//   "subscribedColliderTypes": ["general"]
// }

    let subscribers = this.subscribers
    let colliders = this.colliders
    subscribers.forEach((subscriber) => {
      subscriber.subscriptions.forEach((subscription) => {
        colliders[subscription] = colliders[subscription] || {}
        subscriber.subscribedColliderTypes.forEach((colliderType) => {
          colliders[subscription][colliderType] = colliders[subscription][colliderType] || []
          colliders[subscription][colliderType].forEach((subscribedCollider) => {
            // debugger
            subscriber.collisionCheck(subscribedCollider)
          })
        })
      })
    })
  }

  updateGameObjects(delta) {
    
    this.gameObjects.forEach((object) => {
      object.update(delta)
    })
  }

  playSounds(){
    Object.values(this.soundsToPlay).forEach((sound) => {
      sound.play();
    })
    this.soundsToPlay = {};
  }

  renderLineSprites(ctx) {
    
    this.lineSprites.forEach((sprite) => {
      sprite.draw(ctx)
    })
  }

  addMouseListener(object){
    this.mouseListeners.push(object)
  }
  

  updateGameScript(delta) {
    this.gameScript.update(delta)
  }

  addGameObject(object) {
    this.gameObjects.push(object)
  }

  addPhysicsComponent(physicsComponent){
    this.physicsComponents.push(physicsComponent)
  }

  addLineSprite(lineSprite) {
    this.lineSprites.push(lineSprite)
  }

  queueSound(sound){
    if (!this.muted){
      this.soundsToPlay[sound.url] = sound
    }
  }

  // remove(gameObject){
  //   this.toRemoveQueue.push(gameObject)
  // }

  // emptyRemoveQueue(){
  //   this.toRemoveQueue.forEach((gameObject) => {
  //     this.removeAction(gameObject)
  //   })
  // }

  remove(gameObject) {
    if (gameObject.physicsComponent) {
      this.physicsComponents.splice(this.physicsComponents.indexOf(gameObject.physicsComponent), 1)
    }
    if (gameObject.lineSprite){
      this.lineSprites.splice(this.lineSprites.indexOf(gameObject.lineSprite), 1)
    }
    this.removeColliders(gameObject.colliders)

    this.gameObjects.splice(this.gameObjects.indexOf(gameObject), 1);
  }

  removeColliders(colliders){
    colliders.forEach((collider) => {
      if (collider.subscribers) {
        this.subscribers.splice(this.subscribers.indexOf(collider), 1)
      }

      let objectAndColliderTypeList = this.colliders[collider.objectType][collider.type]
      objectAndColliderTypeList.splice(objectAndColliderTypeList.indexOf(collider), 1)


    })
  }
}

module.exports = GameEngine;

    // the idea:
    // engine takes in collider with gameobject type as string
    // this way subscriptions can be done via string names
    // enemy is subscribed to bullets..
    // each enemy will check every bullet
    // convert gameobject type to string
    // colliders can be added without subscriptions
    // subscriptions are an array of strings stored with the collider