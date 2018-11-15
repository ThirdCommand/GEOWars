const GameScript = require("../game_script");
// const GameObject = require("./game_boject");
// const LineRenderer = require("./line_renderer");
// const PhysicsComponent = require("./physics_component")
// const Sound = require("./sound")
// const Transform = require("./transform")
// const Util = require("./util")

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
    this.rightControlStickListeners = [];
    this.xButtonListeners = [];
    this.startButtonListeners = [];
    this.gameScript = new GameScript(this);
    this.toRemoveQueue = []
    this.paused = false;
    this.currentCamera = null;
    this.defaultZoomScale = 1.30;
    this.zoomScale = 1.30;
    this.graphicQuality = 1;
    this.setupController()
    this.setupPerformance()
    window.engine = this

  }

  setupPerformance(){
    this.collisionTime = 0
    this.physicsCalcTime = 0
    this.updateTime = 0
    this.renderTime = 0
    this.scriptTime = 0
    this.timePassed = 0
  }

  setupController(){
     window.addEventListener("gamepadconnected", function (e) {
       window.controller = e.gamepad
       window.engine.controller = e.gamepad
       // Gamepad connected
       console.log("Gamepad connected", e.gamepad);
     });

     window.addEventListener("gamepaddisconnected", function (e) {
       // Gamepad disconnected
       window.engine.controller = null
       console.log("Gamepad disconnected", e.gamepad);
     });
  }

  updateGraphicSetting(delta){
    if (delta > 50) {
      // console.log("worst")
      this.graphicQuality = 3
    }else if(delta > 25){
      this.graphicQuality = 2
    } else {
      this.graphicQuality = 1
    }
  }

  tick(delta) {
    // debugger
    this.updateGraphicSetting(delta)
    if(this.paused){
      this.updateControlListeners()
      return
    }
    // console.log(delta)
    if(delta > 125){
      delta = 125
    }
    let beforeCollisionTime = performance.now()
    this.checkCollisions()
    let beforePhysicsCalcs = performance.now()
    let collisionTime = beforeCollisionTime - beforePhysicsCalcs
    this.movePhysicsComponents(delta)
    let beforeUpdate = performance.now()
    let physicsCalcTime = beforePhysicsCalcs - beforeUpdate
    this.updateGameObjects(delta)
    let beforeRender = performance.now()
    let updateTime = beforeUpdate - beforeRender
    this.clearCanvas()
    this.renderLineSprites(this.ctx)
    let beforeScriptUpdate = performance.now()
    let renderTime = beforeRender - beforeScriptUpdate
    this.updateControlListeners()
    this.updateGameScript(delta)
    let scriptTime = beforeScriptUpdate - performance.now()
    this.playSounds()

    this.collectPerformanceData(delta, collisionTime, physicsCalcTime, updateTime, renderTime, scriptTime)
  }

  collectPerformanceData(delta, collisionTime, physicsCalcTime, updateTime, renderTime, scriptTime) {
    this.collisionTime += collisionTime
    this.physicsCalcTime += physicsCalcTime
    this.updateTime += updateTime
    this.renderTime += renderTime
    this.scriptTime += scriptTime

    this.timePassed += delta
    if (this.timePassed > 1000 * 60) {
      let totalTime = this.collisionTime + this.physicsCalcTime + this.updateTime + this.renderTime + this.scriptTime
      let timeData = {
        "collisionTime": (100 * this.collisionTime / totalTime),
        "physicsCalcTime": (100 * this.physicsCalcTime / totalTime),
        "updateTime": (100 * this.updateTime / totalTime),
        "renderTime": (100 * this.renderTime / totalTime),
        "scriptTime": (100 * this.scriptTime / totalTime),
      }
      console.log(timeData)

      this.setupPerformance()
    }
  }

  pause(){
    this.paused = true
    this.gameScript.onPause()

  }

  unPause(){
    this.paused = false
    this.gameScript.onUnPause()
  }

  togglePause(){
    // console.log("pausetoggle")
    this.paused ? this.unPause() : this.pause()
  }

  clearCanvas(){
    this.ctx.clearRect( -this.gameScript.DIM_X, -this.gameScript.DIM_Y, this.gameScript.DIM_X * this.zoomScale * 4, this.gameScript.DIM_Y * this.zoomScale * 4);
    this.ctx.fillStyle = this.gameScript.BG_COLOR;
    this.ctx.fillRect( -this.gameScript.DIM_X, -this.gameScript.DIM_Y, this.gameScript.DIM_X * this.zoomScale * 4, this.gameScript.DIM_Y * this.zoomScale * 4);
  }

  addLeftControlStickListener(object){
    this.leftControlStickListeners.push(object)
  }

  addRightControlStickListener(object){
    this.rightControlStickListeners.push(object)
  }

  addxButtonListener(object){
    this.xButtonListeners.push(object)
  }

  addStartButtonListener(object) {
    this.startButtonListeners.push(object)
  }

  updateLeftControlStickListeners(unitVector){
    this.leftControlStickListeners.forEach((listener) => {
      listener.updateLeftControlStickInput(unitVector)
    })
  }

  updateRightControlStickListeners(unitVector){
    this.rightControlStickListeners.forEach((listener) => {
      listener.updateRightControlStickInput(unitVector)
    })
  }

  updatexButtonListeners(xButton){
    this.xButtonListeners.forEach((listener) => {
      listener.updatexButtonListener(xButton)
    })
  }

  updateStartButtonListeners(startButton, down){
    // console.log([startButton, down])
    this.startButtonListeners.forEach((listener) => {
      listener.updateStartButtonListener(startButton, down)
    })
  }

  updateMousePos(mousePos){
    this.mouseListeners.forEach((object) => {
      object.updateMousePos(mousePos)
    })
  }

  updateControlListeners(){
    navigator.getGamepads()
    if(this.controller) {
      let leftAxis = [window.controller.axes[0], window.controller.axes[1]]
      let rightAxis = [window.controller.axes[2], window.controller.axes[3]]
      let xButton = [window.controller.buttons[0].pressed]
      let startButton = [window.controller.buttons[9].pressed]
      this.updatexButtonListeners(xButton)
      this.updateLeftControlStickListeners(leftAxis)
      this.updateRightControlStickListeners(rightAxis)
      this.updateStartButtonListeners(startButton)
    }
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
    this.stillCanDie = false;
    // console.log(this.subscribers)
    subscribers.forEach((subscriber) => {
      if (subscriber.type === "ShipDeath") {
        this.stillCanDie = true
        // console.log("CAN DIE")
      }
      subscriber.subscriptions.forEach((subscription) => {
        colliders[subscription] = colliders[subscription] || {}
        subscriber.subscribedColliderTypes.forEach((colliderType) => {
          colliders[subscription][colliderType] = colliders[subscription][colliderType] || []
          colliders[subscription][colliderType].forEach((subscribedCollider) => {
            subscriber.collisionCheck(subscribedCollider)
          })
        })
      })
    })
    if (!this.stillCanDie) {
      // console.log(this.gameScript.ship.collider)
      this.gameScript.ship.addCollider("General", this.gameScript.ship, this.gameScript.ship.radius)
      this.gameScript.ship.addCollider("ShipDeath", this.gameScript.ship, this.gameScript.ship.radius, ["BoxBox", "Singularity", "Weaver", "Grunt", "Arrow", "Pinwheel"], ["General"])
    }
  }

  updateGameObjects(delta) {
    
    this.gameObjects.forEach((object) => {
      object.update(delta)
    })
  }

  toggleMute(){
    this.muted = !this.muted
  }

  playSounds(){
    Object.values(this.soundsToPlay).forEach((sound) => {
      sound.play();
    })
    this.soundsToPlay = {};
  }

  renderLineSprites(ctx) {
    // ctx.scale = gameEngine.currentCamera.zoomScale
    this.ctx.save()
    
    this.ctx.scale(this.zoomScale, this.zoomScale)
    this.lineSprites.forEach((sprite) => {
      sprite.draw(ctx)
    })
    this.ctx.restore()
    // ctx.scale(1,1)
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

      if (collider.subscriptions) {
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