/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/GEOWars.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/GEOWars.js":
/*!************************!*\
  !*** ./lib/GEOWars.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameScript = __webpack_require__(/*! ./game_script */ "./lib/game_script.js");
const GameView = __webpack_require__(/*! ./game_view */ "./lib/game_view.js");
const GameEngine = __webpack_require__(/*! ./game_engine/game_engine */ "./lib/game_engine/game_engine.js");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = GameScript.DIM_X;
  canvasEl.height = GameScript.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const gameEngine = new GameEngine(ctx);
  new GameView(gameEngine, ctx, canvasEl).start();
});



/***/ }),

/***/ "./lib/game_engine/collider.js":
/*!*************************************!*\
  !*** ./lib/game_engine/collider.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// engine takes in collider with gameobject type as string
// this way subscriptions can be done via string names
// enemy is subscribed to bullets..
// each enemy will check every bullet
// convert gameobject type to string
// colliders can be added without subscriptions
// subscriptions are an array of strings stored with the collider

// collider: object absolute transform
// collider { gameObject gameObject, "subscriptions" ["name", "name"] }
// colliders {"BoxBox" [collider, collider]}

const Util = __webpack_require__(/*! ./util */ "./lib/game_engine/util.js")

class Collider {
  constructor(type, gameObject, radius = 5, subscriptions, subscribedColliderTypes) {
    this.objectType = gameObject.constructor.name
    this.type = type
    this.subscriptions = subscriptions
    this.subscribedColliderTypes = subscribedColliderTypes
    this.radius = radius
    this.gameObject = gameObject
  }
  // wondering if collision should cascade up the parent objects
  // nope not yet anyway

  collisionCheck(otherCollider) {
    const centerDist = Util.dist(this.gameObject.transform.pos, otherCollider.gameObject.transform.pos)
    if (centerDist < (this.radius + otherCollider.radius)){
      this.gameObject.onCollision(otherCollider, this.type)
    }
  } 
}

module.exports = Collider;

// on

// When you add new things that effect other things
// like a new type of bullet, singularity effect, etc
// you just have to add that functionality to the bullet
// add the things it effects as things 
// the collider subscribes to
// this way you don't have to edit every object type
// that is effected

// singularity has two colliders
// outer one for gravity effects 
// inner one for actual hits
// it's subscribed to everything
// on collision it changes that object properties either 
// directly or with a object method... preferably

/***/ }),

/***/ "./lib/game_engine/color.js":
/*!**********************************!*\
  !*** ./lib/game_engine/color.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {


class Color {
  constructor(colorSpec){
    this.colorType = Object.keys(colorSpec)[0]
    this.creationErrorCheck(colorSpec)
    this.extractColorInfo(colorSpec)
  }

  creationErrorCheck(colorSpec){
    if (Object.keys(colorSpec).length !== 1) {
      new Error("Color object accepts one color type")
    }
    if (!Color.COLOR_TYPES.includes(this.colorType)) {
      new Error("Color Object given unsupported color type")
    }
  }

  dup(){
    let dupSpec = {}
    if (this.colorType === "rgb") {
      dupSpec["rgb"]  = [this.r, this.g, this.b]
    } else if (this.colorType === "rgba") {
      dupSpec["rgba"] = [this.r, this.g, this.b, this.a]
    } else if (this.colorType === "hsl") {
      dupSpec["hsl"]  = [this.h, this.s, this.l]
    } else if (this.colorType === "hsla") {
      dupSpec["hsla"] = [this.h, this.s, this.l, this.a]
    }
    let newColor = new Color(dupSpec)
    return newColor
  }

  extractColorInfo(colorSpec){
    if (this.colorType === "rgb"){
      this.r = colorSpec[this.colorType][0]
      this.g = colorSpec[this.colorType][1]
      this.b = colorSpec[this.colorType][2]
    } else if (this.colorType === "rgba"){
      this.r = colorSpec[this.colorType][0]
      this.g = colorSpec[this.colorType][1]
      this.b = colorSpec[this.colorType][2]
      this.a = colorSpec[this.colorType][3]
    } else if (this.colorType === "hsl"){
      this.h = colorSpec[this.colorType][0]
      this.s = colorSpec[this.colorType][1]
      this.l = colorSpec[this.colorType][2]
    } else if (this.colorType === "hsla"){
      this.h = colorSpec[this.colorType][0]
      this.s = colorSpec[this.colorType][1]
      this.l = colorSpec[this.colorType][2]
      this.a = colorSpec[this.colorType][3]
    } 
    colorSpec[this.colorType]
  }

  evaluateColor(){
    if (this.colorType === "rgb"){
      return `rbg(${this.r},${this.g},${this.b},)`
    } else if (this.colorType === "rgba"){
      return `rbg(${this.r},${this.g},${this.b},${this.a})`
    } else if (this.colorType === "hsl"){
      return `hsl(${this.h},${this.s}%,${this.l}%`
    } else if (this.colorType === "hsla") {
      return `hsla(${this.h}, ${this.s}%, ${this.l}%, ${this.a}`
    }
  }
}
Color.COLOR_TYPES = ["rgb", "rgba", "hsl", "hsla"]

module.exports = Color;

/***/ }),

/***/ "./lib/game_engine/game_engine.js":
/*!****************************************!*\
  !*** ./lib/game_engine/game_engine.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameScript = __webpack_require__(/*! ../game_script */ "./lib/game_script.js");
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

/***/ }),

/***/ "./lib/game_engine/game_object.js":
/*!****************************************!*\
  !*** ./lib/game_engine/game_object.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(/*! ./util */ "./lib/game_engine/util.js");
const Sound = __webpack_require__(/*! ./sound */ "./lib/game_engine/sound.js")

const Transform = __webpack_require__( /*! ./transform */ "./lib/game_engine/transform.js")
const PhysicsComponent = __webpack_require__(/*! ./physics_component */ "./lib/game_engine/physics_component.js")
const LineSprite = __webpack_require__(/*! ./line_sprite */ "./lib/game_engine/line_sprite.js")
const Collider = __webpack_require__(/*! ./collider */ "./lib/game_engine/collider.js")

class GameObject {
  constructor(engine) {
    this.gameEngine = engine
    this.gameEngine.addGameObject(this)
    this.transform = new Transform()
    this.childObjects = []
    this.physicsComponent = null 
    this.lineSprite = null
    this.parentObject = null
    this.colliders = []
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

  addRightControlStickListener() {
    this.gameEngine.addRightControlStickListener(this)
  }

  addxButtonListener(){
    this.gameEngine.addxButtonListener(this)
  }
  
  addStartButtonListener() {
    this.gameEngine.addStartButtonListener(this)
  }

  updateRightControlStickInput(direction){

  }

  updateLeftControlStickInput(direction){

  }

  updatexButtonListener(){

  }

  updateStartButtonListener() {

  }

  

  updateMousePos(mousePos){

  }

  addCollider(type, gameObject, radius, subscriptionTypes, subscriptions){
    // game engine checks every collider with it's subscription types
    let newCollider = new Collider(type, gameObject, radius, subscriptionTypes, subscriptions)
    this.colliders.push(newCollider)
    this.gameEngine.addCollider(newCollider)
  }

  // store sound in instance
  playSound(sound){
    this.gameEngine.queueSound(sound)
  }


  // relative motion needs to be fixed... FOR ANOTHER TIME
  addChildGameObject(obj, relative){
    this.childObjects.push(obj)
    if(relative){
      obj.transform.parentTransform = this.transform
    }
    obj.parentObject = this
  }

  update(deltaTime) {
    // overwritten by child class for update scripts
  }

  onCollision(collider, type) {
    // overwritten by child class for handler
  }

  // remove is the issue
  // i need a remove queue!!!
  // ... I think
  remove() {
    this.childObjects.forEach((obj) => {
      obj.remove()
    })
    if(this.parentObject){
      this.parentObject.childObjects.splice(this.parentObject.childObjects.indexOf(this), 1)
    }
    this.gameEngine.remove(this);
  }

}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = GameObject;


/***/ }),

/***/ "./lib/game_engine/line_sprite.js":
/*!****************************************!*\
  !*** ./lib/game_engine/line_sprite.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./lib/game_engine/physics_component.js":
/*!**********************************************!*\
  !*** ./lib/game_engine/physics_component.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(/*! ./util */ "./lib/game_engine/util.js");
const Sound = __webpack_require__(/*! ./sound */ "./lib/game_engine/sound.js")

class PhysicsComponent {
  constructor(transform) {
    this.transform = transform
  }

  move(timeDelta) {
    // timeDelta is number of milliseconds since last move
    // if the computer is busy the time delta will be larger
    // in this case the PhysicsObject should move farther in this frame
    const timeScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    this.transform.pos[0] += this.transform.vel[0] * timeScale + this.transform.acc[0] * (timeScale * timeScale) / 2;
    this.transform.pos[1] += this.transform.vel[1] * timeScale + this.transform.acc[1] * (timeScale * timeScale) / 2;
    this.transform.vel[0] += this.transform.acc[0] * timeScale;
    this.transform.vel[1] += this.transform.acc[1] * timeScale;
    this.transform.angle += this.transform.aVel
    this.transform.aVel += this.transform.aAcc

    this.transform.acc = [0, 0];
    this.transform.aAcc = 0;

  }

}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = PhysicsComponent;


/***/ }),

/***/ "./lib/game_engine/sound.js":
/*!**********************************!*\
  !*** ./lib/game_engine/sound.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {


class Sound {
  constructor(url, volume = 1, muted = false){
    this.url = url;
    this.volume = volume;
    this.muted = muted;
  }

  play() {
    // if (this.sound) {
    //   this.sound.play()
    // } else {
      this.sound = new Audio(this.url);
      this.sound.volume = this.volume;
      this.sound.play();
    // }
  }
  toggleMute(){
    if(this.sound){
      this.muted ? this.unmute() : this.mute()
    }
  }

  unmute(){
    if(this.sound){
      this.muted = false 
      this.sound.volume = this.volume
    }
  }

  mute(){
    if(this.sound){
      this.muted = true
      this.sound.volume = 0
    }
  }

  pause(){
    if(this.sound){
      this.sound.pause()
    } 
  }
  unPause(){
    if (this.sound) {
      this.sound.play()
    }
  }
}

module.exports = Sound;

/***/ }),

/***/ "./lib/game_engine/state_machine.js":
/*!******************************************!*\
  !*** ./lib/game_engine/state_machine.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameObject = __webpack_require__(/*! ./game_object */ "./lib/game_engine/game_object.js")

class StateMachine extends GameObject {
    constructor(engine, {}) {
        super(engine)
        this.stateIndex = options.stateIndex || {i: 0 }
        this.parentState = options.parentState, waitTime = 0, stateQueue = [], event, timesDo = 1, endCondition = true
        this.stateIndex = stateIndex
        this.parentIndex = parentIndex
        this.stateTime = 0

        this.waitTime = waitTime
        this.stateQueue = stateQueue
        this.event = event
        this.timesDo = timesDo
        this.endCondition = endCondition 
        // if not null, it will repeat until the condition is met\
        // but it will meet the repeatcondition first. 
        // end condition returns a bool. default true

        // there is no "break" condition yet

        this.repeatCount = 1 // do something 3 times. 1 index not 0 index

        // first it waits,
        // then it runs through state queue
        // then it runs the event
        //      state queue and event can be empty, 
        //        which means the state was just for waiting
        // then it checks the repeat condition

        // event is something that runs in one frame

    }

    addChilState(state){
        state.parentIndex = this
    }

    // state queue is now done
    onCompletion(){
        this.event()
                // 1 index not 0
        if (this.repeatCount <= this.timesDo){
            this.stateIndex.i = 0;
            this.currentTime = 0;
        } else if (!this.endCondition) {
            this.stateIndex.i = 0;
            this.currentTime = 0;
        } else {
            this.parentIndex += 1
            this.remove()
        }
    }

    // instances vs inheritance
    // instance is built from the ground up, 
    // starting with the lowest level of the sequence
    // inheritance is built from the top down, 
    // allowing each custom class to build thier individual statequeues
    // inheritance gives access to all of the gameobject functions
    // instances are simpler, everything is fed through the constuctor
    // User gets to choose?

    // singularity
    // EasyGroups <-- childState
        // wait: 2500 * timeScale (user can provide timescale functionality)
        // event: spawnEasyGroups 
        // endCondition: x4 // repeats until end condition met
        // parentIndex
    // waitState <--childState
    // EasyGroupsArrows 
        // wait: 2500 * timeScale (user can provide timescale functionality)
        // event: spawnEasyGroupsArrows
        // endCondition: x4 // repeats until end condition met
    // event
    // wait
    // event
    // 

    event(){
        this.eventCondition()
    }
    //spawner
        //easy wave
            //

    updateState(intervalTime){
        if(this.stateIndex > this.stateQueue.length){
            this.onCompletion()
        } else {
            this.stateTime += intervalTime
            if(intervalTime > this.waitTime){
                this.stateQueue[this.stateIndex.i].updateState(intervalTime)
            }
        }
    }

    remove() {
        this.childObjects.forEach((obj) => {
            obj.remove()
        })
        if (this.parentObject) {
            this.parentObject.childObjects.splice(this.parentObject.childObjects.indexOf(this), 1)
        }
        this.stateQueue.forEach((obj) => {
            obj.remove()
        })
        
        this.gameEngine.remove(this);
    }

}
module.exports = StateMachine;

/***/ }),

/***/ "./lib/game_engine/transform.js":
/*!**************************************!*\
  !*** ./lib/game_engine/transform.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(/*! ./util */ "./lib/game_engine/util.js");
class Transform {
  constructor(pos = [0,0], vel = [0,0], acc = [0,0], angle = 0, aVel = 0, aAcc = 0, parentTransform = null){
    this.parentTransform = parentTransform
    this.angle = angle
    this.aVel = aVel
    this.aAcc = aAcc
    this.pos = pos
    this.vel = vel
    this.acc = acc
  }

  // call up the tree of parent transforms until null
  // performing the transformation each step for the absolute
  absoluteAngle() {
    if (this.parentTransform == null) {
      return this.angle
    } else {
      return this.angleAdd(this.angle, this.parentTransform.absoluteAngle())
    }
  }

  absolutePosition() {
    let absPos = []
    if (this.parentTransform == null){
      absPos = this.pos
      return absPos
    } else { 
      return this.vectorAdd(this.pos, this.parentTransform.absolutePosition())
    }
  }

  absoluteVelocity() {
    let absVel = []
    if (this.parentTransform == null) {
      absVel = this.vel
      return absVel
    } else {
      return this.vectorAdd(this.vel, this.parentTransform.absoluteVelocity())
    }
  }

  absoluteAcceleration() {
    let absAcc = []
    if (this.parentTransform == null) {
      absAcc = this.acc
      return absAcc
    } else {
      return this.vectorAdd(this.acc, this.parentTransform.absoluteAcceleration())
    }
  }

  vectorAdd(vector1, vector2) {
    return [vector1[0] + vector1[0], vector1[1] + vector2[1]]
  }

  angleAdd(angle1, angle2) {

    return (angle1 + angle2) % (2 * Math.PI)
  }

}

module.exports = Transform;

/***/ }),

/***/ "./lib/game_engine/util.js":
/*!*********************************!*\
  !*** ./lib/game_engine/util.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {


const Util = {
  // Normalize the length of the vector to 1, maintaining direction.
  dir(vec) {
    const norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },
  vectorCartisian(angle,scale){

    let vector = [];
    vector = [scale * Math.cos(angle), scale * Math.sin(angle)]
    return vector
  },
  // Find distance between two points.
  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },
  // Find the length of the vector.
  norm(vec) {
    return Util.dist([0, 0], vec);
  },
  // Return a randomly oriented vector with the given length.
  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  
 
};

module.exports = Util;


/***/ }),

/***/ "./lib/game_objects/Bullet/bullet.js":
/*!*******************************************!*\
  !*** ./lib/game_objects/Bullet/bullet.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameObject = __webpack_require__(/*! ../../game_engine/game_object */ "./lib/game_engine/game_object.js");
const Sound = __webpack_require__(/*! ../../game_engine/sound */ "./lib/game_engine/sound.js")
const BulletWallExplosion = __webpack_require__(/*! ../particles/bullet_wall_explosion */ "./lib/game_objects/particles/bullet_wall_explosion.js")
const BulletSprite = __webpack_require__(/*! ./bullet_sprite */ "./lib/game_objects/Bullet/bullet_sprite.js")
const ParticleExplosion = __webpack_require__(/*! ../particles/particle_explosion */ "./lib/game_objects/particles/particle_explosion.js")
class Bullet extends GameObject {
  constructor(engine, pos, vel, bulletNumber) {
    super(engine);
    this.ID = bulletNumber
    this.transform.pos[0] = pos[0]
    this.transform.pos[1] = pos[1]
    this.transform.vel[0] = vel[0]
    this.transform.vel[1] = vel[1]
    this.length = 12;
    this.radius = this.length / 4;
    this.wrap = false
    this.wallhit = new Sound("GEOWars/sounds/bullet_hitwall.wav", 1)
    this.addExplosionCollider()
    this.addPhysicsComponent()
    this.addLineSprite(new BulletSprite(this.transform))
    this.exploded = false;
    this.lifeTime = 4000;
    this.aliveTime = 0;
  }

  addExplosionCollider(){
    let subscribers = ["Grunt", "Pinwheel", "BoxBox", "Arrow", "Singularity", "Weaver", "AlienShip"]
    this.addCollider("bulletHit", this, this.radius, subscribers, ["General"])
    this.addCollider("General", this, this.radius)
  }

  update(deltaTime){
    this.aliveTime += deltaTime 
    if(this.aliveTime > this.lifeTime){
      this.remove();
    }
    if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition()) && !this.exploded) {
      this.exploded = true
      new BulletWallExplosion(this.gameEngine, this.transform.pos)

      this.gameEngine.queueSound(this.wallhit)
      this.remove();
    }
  }

  onCollision(collider, type){
    if (type === "bulletHit") {
      if (collider.objectType === "Singularity") {
        collider.gameObject.bulletHit()
        this.remove()
      } else {
        let hitObjectTransform = collider.gameObject.transform
        let pos = hitObjectTransform.absolutePosition() 
        let vel = hitObjectTransform.absoluteVelocity()
        let explosion = new ParticleExplosion(this.gameEngine, pos, vel)
        this.gameEngine.gameScript.tallyScore(collider.gameObject)
        collider.gameObject.remove()
        this.remove()
      }
        
    }
    
  }
  
  // move(timeDelta) {

    

  // }
    
}


Bullet.RADIUS = 3;
Bullet.SPEED = 7;

module.exports = Bullet;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

/***/ }),

/***/ "./lib/game_objects/Bullet/bullet_sprite.js":
/*!**************************************************!*\
  !*** ./lib/game_objects/Bullet/bullet_sprite.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const LineSprite = __webpack_require__(/*! ../../game_engine/line_sprite */ "./lib/game_engine/line_sprite.js")

class BulletSprite extends LineSprite {
  constructor(transform, spawningScale = 1) {
    super(transform)
    this.spawningScale = spawningScale
    this.length = 12
  }

  draw(ctx) {

    let l = this.length
    let pos = this.transform.absolutePosition();
    let vel = this.transform.absoluteVelocity();
    
    let w = this.length / 2;
    let movementDirection = Math.atan2(vel[0], -vel[1])
    
    ctx.save();
    ctx.beginPath();
    ctx.translate(pos[0], pos[1]);
    ctx.rotate(movementDirection + 2 * Math.PI);

    ctx.beginPath();
    ctx.strokeStyle = "#FBFBC2";
    ctx.lineWidth = 1;

    ctx.moveTo(-l / 4, l / 2); //1
    ctx.lineTo(0, -l / 2); //2
    ctx.lineTo(l / 4, l / 2); //3

    ctx.closePath();
    ctx.stroke();
    ctx.restore();

  }
}
module.exports = BulletSprite

/***/ }),

/***/ "./lib/game_objects/Overlay/overlay.js":
/*!*********************************************!*\
  !*** ./lib/game_objects/Overlay/overlay.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const OverlaySprite = __webpack_require__(/*! ./overlay_sprite */ "./lib/game_objects/Overlay/overlay_sprite.js")
const GameObject = __webpack_require__(/*! ../../game_engine/game_object */ "./lib/game_engine/game_object.js")

class Overlay extends GameObject {
    constructor(engine, gameScript, shipTransform) {
        super(engine);
        this.gameScript = gameScript
        this.shipTransform = shipTransform
        this.transform.pos = [0, 0]
        this.addLineSprite(new OverlaySprite(this.shipTransform, this.gameScript.DIM_X, this.gameScript.DIM_Y, this.gameEngine))
    }

    update(deltaTime) {
        this.lineSprite.score = this.gameScript.score
        this.lineSprite.lives = this.gameScript.lives
    }
}

module.exports = Overlay

/***/ }),

/***/ "./lib/game_objects/Overlay/overlay_sprite.js":
/*!****************************************************!*\
  !*** ./lib/game_objects/Overlay/overlay_sprite.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const LineSprite = __webpack_require__(/*! ../../game_engine/line_sprite */ "./lib/game_engine/line_sprite.js")
const Color = __webpack_require__(/*! ../../game_engine/color */ "./lib/game_engine/color.js")
class OverlaySprite extends LineSprite {
    constructor(transform, DIM_X, DIM_Y, gameEngine) {
        super(transform)
        this.gameEngine = gameEngine
        this.transform = transform
        this.width = DIM_X
        this.height = DIM_Y
        this.score = 0;
        this.lives = 0;
        this.fontSize = 20;
        this.fontStyle = "Arial"
        this.shadowColor = new Color({
            "hsla": [202, 100, 70, 1]
        });
        this.color = new Color({
            "hsla": [202, 100, 70, 0.5]
        });
    }

    draw(ctx) {
        ctx.save()
        ctx.scale(1 / this.gameEngine.zoomScale, 1 / this.gameEngine.zoomScale)
        let zoomFactor = this.gameEngine.zoomScale / this.gameEngine.defaultZoomScale
        ctx.font = this.fontSize * 1.3 + "px " + this.fontStyle;
        ctx.fillStyle = this.color.evaluateColor();

        ctx.fillText("Score: " + this.score + "      " + "Lives: " + this.lives, (this.transform.pos[0] - 350 / zoomFactor) * this.gameEngine.zoomScale, (this.transform.pos[1] - 150 / zoomFactor )* this.gameEngine.zoomScale);
        ctx.restore()
    }
}
module.exports = OverlaySprite

/***/ }),

/***/ "./lib/game_objects/Walls/walls.js":
/*!*****************************************!*\
  !*** ./lib/game_objects/Walls/walls.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const WallsSprite = __webpack_require__(/*! ./walls_sprite */ "./lib/game_objects/Walls/walls_sprite.js")
const GameObject = __webpack_require__(/*! ../../game_engine/game_object */ "./lib/game_engine/game_object.js")

class Walls extends GameObject {
    constructor(engine, gameScript) {
        super(engine);
        this.gameScript = gameScript
        this.transform.pos = [0,0]
        this.addLineSprite(new WallsSprite(this.transform, this.gameScript.DIM_X, this.gameScript.DIM_Y))
    }

    update(deltaTime) {
        
    }
}

module.exports = Walls

/***/ }),

/***/ "./lib/game_objects/Walls/walls_sprite.js":
/*!************************************************!*\
  !*** ./lib/game_objects/Walls/walls_sprite.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const LineSprite = __webpack_require__(/*! ../../game_engine/line_sprite */ "./lib/game_engine/line_sprite.js")
const Color = __webpack_require__(/*! ../../game_engine/color */ "./lib/game_engine/color.js")
class WallsSprite extends LineSprite {
    constructor(transform, DIM_X, DIM_Y) {
        super(transform)
        this.width = DIM_X
        this.height = DIM_Y
        this.shadowColor = new Color({
            "hsla": [202, 100, 70, 1]
        });
        this.color = new Color({
            "hsla": [202, 100, 70, 0.2]
        });
    }

    draw(ctx) {
        let w = this.width
        let h = this.height
        let pos = this.transform.absolutePosition();

        ctx.save();
        ctx.beginPath();
        ctx.translate(pos[0], pos[1]);

        let blurFactor = 0.5
        ctx.shadowColor = this.shadowColor.evaluateColor();
        ctx.shadowBlur = 10;
        ctx.strokeStyle = this.color.evaluateColor();
        ctx.lineWidth = 7.5 * blurFactor * 2;
        this.drawWalls(ctx, w, h)
        ctx.lineWidth = 6 * 2// * blurFactor;
        this.drawWalls(ctx, w, h)
        ctx.lineWidth = 4.5 * 2 // * blurFactor;
        this.drawWalls(ctx, w, h)
        ctx.lineWidth = 3 * 2// * blurFactor;
        this.drawWalls(ctx, w, h)
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = 1.5 * 2// * blurFactor;
        this.drawWalls(ctx, w, h)

        ctx.restore();
    }

    drawWalls(ctx,w,h){
        let offset = 6
        ctx.beginPath
        ctx.moveTo(-offset, -offset)
        ctx.lineTo(w + offset, -offset);
        ctx.lineTo(w + offset, h + offset); //3
        ctx.lineTo(0 - offset, h + offset);
        ctx.closePath();
        ctx.stroke();
    }
}
module.exports = WallsSprite

/***/ }),

/***/ "./lib/game_objects/enemies/Arrow/arrow.js":
/*!*************************************************!*\
  !*** ./lib/game_objects/enemies/Arrow/arrow.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameObject = __webpack_require__(/*! ../../../game_engine/game_object */ "./lib/game_engine/game_object.js")
const Util = __webpack_require__(/*! ../../../game_engine/util */ "./lib/game_engine/util.js");
const Sound = __webpack_require__(/*! ../../../game_engine/sound */ "./lib/game_engine/sound.js")

const EnemySpawn = __webpack_require__(/*! ../../particles/enemy_spawn */ "./lib/game_objects/particles/enemy_spawn.js")
const ArrowSprite = __webpack_require__(/*! ./arrow_sprite */ "./lib/game_objects/enemies/Arrow/arrow_sprite.js")
 
class Arrow extends GameObject {
  constructor(engine, pos, angle = Math.PI / 3) {
    super(engine)
    this.transform.pos = pos;
    this.transform.angle = angle;
    this.speed = 3;
    this.points = 50
    this.transform.vel = Util.vectorCartisian(this.transform.angle, this.speed);
    this.radius = 6
    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_purple.wav", 0.5);
    this.playSound(this.spawnSound)
    this.addLineSprite(new ArrowSprite(this.transform))
    this.addChildGameObject(new EnemySpawn(this.gameEngine))
    this.exists = false
  }
  
  exist(){
    // leaving off subscriptions means that things will subscribe to it
    this.addCollider("General", this, this.radius)
    // now it will move
    this.addPhysicsComponent()
    this.exists = true
  }

  update(delta) {
      // ADD TO UPDATE FOR THE OBJECTS
    let pos = this.transform.absolutePosition()
    if (this.gameEngine.gameScript.isOutOfBounds(pos)) {
      this.gameEngine.gameScript.redirect(this.transform)
    }
  }
}

module.exports = Arrow;

/***/ }),

/***/ "./lib/game_objects/enemies/Arrow/arrow_sprite.js":
/*!********************************************************!*\
  !*** ./lib/game_objects/enemies/Arrow/arrow_sprite.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const LineSprite = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./lib/game_engine/line_sprite.js")
class ArrowSprite extends LineSprite {
  constructor(transform, spawningScale = 1) {
    super(transform)
    this.spawningScale = spawningScale
  }

  draw(ctx) {
    let pos = this.transform.absolutePosition();
    let spawningScale = this.spawningScale || 1;
    let shipLength = 8 * 2.2 * spawningScale;
    let shipWidth = 6 * 2.2 * spawningScale;
    let l = shipLength;
    let w = shipWidth;
    let movementDirection = Math.atan2(this.transform.vel[0], -this.transform.vel[1])
    
    let r = 255;
    let g = 255;
    let b = 50;

    ctx.save();
    ctx.beginPath();
    ctx.translate(pos[0], pos[1]);
    ctx.rotate(movementDirection + 2 * Math.PI);

    // ctx.strokeStyle = "#f2ff00"; // look up rgb and put here
    ctx.lineWidth = 2;

    let blurFactor = 0.5
    ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
    ctx.shadowBlur = 10 * blurFactor;
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
    ctx.lineWidth = 7.5 * blurFactor;
    this.drawArrow(ctx, l, w);
    ctx.lineWidth = 6 * blurFactor;
    this.drawArrow(ctx, l, w);
    ctx.lineWidth = 4.5;
    this.drawArrow(ctx, l, w);
    ctx.lineWidth = 3;
    this.drawArrow(ctx, l, w);
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth = 1.5;
    this.drawArrow(ctx, l, w);

    ctx.restore();
  }

  drawArrow(ctx, l, w) {
    ctx.beginPath();
    ctx.moveTo(0, -l / 2); //1
    ctx.lineTo(w / 2, l / 4); //2
    ctx.lineTo(w / 6, l / 2); //3
    ctx.lineTo(0, l / 4); //4
    ctx.lineTo(-w / 6, l / 2); //5
    ctx.lineTo(-w / 2, l / 4); //6
    ctx.closePath();
    ctx.stroke();
  }
}

module.exports = ArrowSprite;

/***/ }),

/***/ "./lib/game_objects/enemies/BoxBox/boxbox.js":
/*!***************************************************!*\
  !*** ./lib/game_objects/enemies/BoxBox/boxbox.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameObject = __webpack_require__(/*! ../../../game_engine/game_object */ "./lib/game_engine/game_object.js")
const Util = __webpack_require__(/*! ../../../game_engine/util */ "./lib/game_engine/util.js")
const Sound = __webpack_require__(/*! ../../../game_engine/sound */ "./lib/game_engine/sound.js")

const EnemySpawn = __webpack_require__(/*! ../../particles/enemy_spawn */ "./lib/game_objects/particles/enemy_spawn.js")
const BoxBoxSprite = __webpack_require__(/*! ./boxbox_sprite */ "./lib/game_objects/enemies/BoxBox/boxbox_sprite.js")

class BoxBox extends GameObject {
  constructor(engine, pos) {
    super(engine)
    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_blue.wav", 0.5);
    this.transform.pos = pos
    this.radius = 10
    this.points = 20
    // this.addPhysicsComponent()
    this.addLineSprite(new BoxBoxSprite(this.transform))
    this.addChildGameObject(new EnemySpawn(this.gameEngine))
    this.playSound(this.spawnSound)
  }

  exist() {
    // leaving off subscriptions means that things will subscribe to it
    this.addCollider("General", this, this.radius)
    // now it will move
    this.addPhysicsComponent()
  }
 
  wallGraze(){
    this.gameEngine.gameScript.wallGraze(this.transform, this.radius)
  }

  update(delta){
    if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius * 2)) {
      this.wallGraze() 
    }
  }
}

module.exports = BoxBox;

/***/ }),

/***/ "./lib/game_objects/enemies/BoxBox/boxbox_sprite.js":
/*!**********************************************************!*\
  !*** ./lib/game_objects/enemies/BoxBox/boxbox_sprite.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const LineSprite = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./lib/game_engine/line_sprite.js")
class BoxBoxSprite extends LineSprite{
  constructor(transform, spawningScale = 1) {
    super(transform)
    this.spawningScale = spawningScale
  }

  draw(ctx) {

    let spawningScale = this.spawningScale || 1;
    let pos = this.transform.absolutePosition()
    let boxSize = 10 * spawningScale;

    // ctx.strokeStyle = "#F173BA";

    let r = 210;
    let g = 75;
    let b = 75;
    ctx.save();
    ctx.beginPath();
    ctx.translate(pos[0], pos[1]);
    let blurFactor = 0.5
    ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
    ctx.shadowBlur = 10 * blurFactor;
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
    ctx.lineWidth = 7.5 * blurFactor
    this.drawBox1(ctx, boxSize)
    this.drawBox2(ctx, boxSize)
    ctx.lineWidth = 6 * blurFactor;
    this.drawBox1(ctx, boxSize)
    this.drawBox2(ctx, boxSize)
    ctx.lineWidth = 4.5;
    this.drawBox1(ctx, boxSize)
    this.drawBox2(ctx, boxSize)
    ctx.lineWidth = 3;
    this.drawBox1(ctx, boxSize)
    this.drawBox2(ctx, boxSize)
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth = 1.5;
    this.drawBox1(ctx, boxSize)
    this.drawBox2(ctx, boxSize)
    ctx.restore();
  }

  drawBox1(ctx, boxSize) {
    let w = boxSize
    let slideFactor = 1.125
    ctx.beginPath();
    ctx.moveTo(w  / 4, -w  / 4);
    ctx.lineTo(w  / 4, (3 * w)  / 4);
    ctx.lineTo((-3 * w ) / 4, (3 * w ) / 4);
    ctx.lineTo((-3 * w ) / 4, -w  / 4)
    ctx.closePath();
    ctx.stroke();
  }

  drawBox2(ctx, boxSize) {
    let w = boxSize
    let slideFactor = 1.5
    ctx.beginPath();
    ctx.moveTo(-w  / 4, w  / 4);
    ctx.lineTo(-w  / 4, (-3 * w ) / 4);
    ctx.lineTo((3 * w ) / 4, (-3 * w ) / 4);
    ctx.lineTo((3 * w ) / 4, w  / 4)
    ctx.closePath();
    ctx.stroke();
  }



}

module.exports = BoxBoxSprite;

/***/ }),

/***/ "./lib/game_objects/enemies/Grunt/grunt.js":
/*!*************************************************!*\
  !*** ./lib/game_objects/enemies/Grunt/grunt.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameObject = __webpack_require__(/*! ../../../game_engine/game_object */ "./lib/game_engine/game_object.js")
const Sound = __webpack_require__(/*! ../../../game_engine/sound */ "./lib/game_engine/sound.js")
const Util = __webpack_require__(/*! ../../../game_engine/util */ "./lib/game_engine/util.js")

const EnemySpawn = __webpack_require__(/*! ../../particles/enemy_spawn */ "./lib/game_objects/particles/enemy_spawn.js")
const GruntSprite = __webpack_require__(/*! ./grunt_sprite */ "./lib/game_objects/enemies/Grunt/grunt_sprite.js")

class Grunt extends GameObject {
  constructor(engine, pos, shipTransform) {
    super(engine)
    this.transform.pos = pos
    this.exists = false;
    this.stretchDirection = -1;
    this.shipTransform = shipTransform
    this.radius = 5;
    this.points = 70
    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_blue.wav", 0.5);
    this.playSound(this.spawnSound)
    this.addLineSprite(new GruntSprite(this.transform))
    this.addChildGameObject(new EnemySpawn(this.gameEngine))
  }

  exist() {
    this.exists = true;
    // leaving off subscriptions means that things will subscribe to it
    this.addCollider("General", this, this.radius)
    // now it will move
    this.addPhysicsComponent()
  }

  // ADDING MOVEMENT MECHANICS FOR GRUNT

  chase(timeDelta) {
    let speed = 1.5
    let shipPos = this.shipTransform.absolutePosition();
    let pos = this.transform.absolutePosition()
    let dy = shipPos[1] - pos[1];
    let dx = shipPos[0] - pos[0];

    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let direction = Math.atan2(dy, dx);

    pos[0] += speed * Math.cos(direction) * velocityScale
    pos[1] += speed * Math.sin(direction) * velocityScale
  }

  update(timeDelta) {
    if (this.exists) {
      this.chase(timeDelta)
      let cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
      let cycleSpeed = 0.01;
      if (this.lineSprite.stretchScale_W < 0.7 || this.lineSprite.stretchScale_W > 1) {
        this.stretchDirection *= -1
      }

      this.lineSprite.stretchScale_W = this.lineSprite.stretchScale_W + -this.stretchDirection * cycleSpeed * cycleSpeedScale;
      this.lineSprite.stretchScale_L = this.lineSprite.stretchScale_L + this.stretchDirection * cycleSpeed * cycleSpeedScale;

      if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
        this.wallGraze()
      }
    }
  }

  wallGraze() {
    this.gameEngine.gameScript.wallGraze(this.transform, this.radius)
  }

  
}

module.exports = Grunt;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

/***/ }),

/***/ "./lib/game_objects/enemies/Grunt/grunt_sprite.js":
/*!********************************************************!*\
  !*** ./lib/game_objects/enemies/Grunt/grunt_sprite.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const LineSprite = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./lib/game_engine/line_sprite.js")
class GruntSprite extends LineSprite {
  constructor(transform, spawningScale = 1) {
    super(transform)
    this.spawningScale = spawningScale
    this.stretchScale_L = 1
    this.stretchScale_W = 0.7
  }

  draw(ctx) {
    let pos = this.transform.absolutePosition();
    
    let spawningScale = this.spawningScale;
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

/***/ }),

/***/ "./lib/game_objects/enemies/Pinwheel/pinwheel.js":
/*!*******************************************************!*\
  !*** ./lib/game_objects/enemies/Pinwheel/pinwheel.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Sound = __webpack_require__(/*! ../../../game_engine/sound */ "./lib/game_engine/sound.js")
const Util = __webpack_require__(/*! ../../../game_engine/util */ "./lib/game_engine/util.js")
const GameObject = __webpack_require__(/*! ../../../game_engine/game_object */ "./lib/game_engine/game_object.js")

const EnemySpawn = __webpack_require__(/*! ../../particles/enemy_spawn */ "./lib/game_objects/particles/enemy_spawn.js")
const PinwheelSprite = __webpack_require__(/*! ./pinwheel_sprite */ "./lib/game_objects/enemies/Pinwheel/pinwheel_sprite.js")

class Pinwheel extends GameObject {
  constructor(engine, pos) {
    super(engine)
    this.rotation_speed = 0.05;
    let speed = 1;
    this.points = 20;
    this.transform.pos = pos;
    this.transform.vel = Util.randomVec(speed);
    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_blue.wav", 0.5);
    this.playSound(this.spawnSound)
    this.addLineSprite(new PinwheelSprite(this.transform))
    this.addChildGameObject(new EnemySpawn(this.gameEngine))
    this.radius = 5;
  }
  
  exist() {
    // leaving off subscriptions means that things will subscribe to it
    this.addCollider("General", this, this.radius)
    // now it will move
    this.addPhysicsComponent()
  }

  update(deltaTime){
    let rotationSpeedScale = deltaTime / NORMAL_FRAME_TIME_DELTA;
    this.transform.angle = (this.transform.angle + this.rotation_speed * rotationSpeedScale) % (Math.PI * 2)
    if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
      this.gameEngine.gameScript.bounce(this.transform, this.radius) // HARD CODED
    }
  }

}



const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
module.exports = Pinwheel;

/***/ }),

/***/ "./lib/game_objects/enemies/Pinwheel/pinwheel_sprite.js":
/*!**************************************************************!*\
  !*** ./lib/game_objects/enemies/Pinwheel/pinwheel_sprite.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const LineSprite = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./lib/game_engine/line_sprite.js")
class PinwheelSprite extends LineSprite {
  constructor(transform, spawningScale = 1) {
    super(transform)
    this.spawningScale = spawningScale
  }

  draw(ctx) {
    let spawningScale = this.spawningScale || 1
    let pos = this.transform.absolutePosition()
    let angle = this.transform.absoluteAngle()

    let shipWidth = 12 * spawningScale
    let s = shipWidth / 2

    let r = 59;
    let g = 10;
    let b = 87;

    ctx.save();
    ctx.translate(pos[0], pos[1]);
    ctx.rotate(angle);

    let blurFactor = 0.5
    ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
    ctx.shadowBlur = 10 * blurFactor * blurFactor
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
    ctx.lineWidth = 7.5 * blurFactor * blurFactor
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
    this.drawPinwheel(ctx, s)
    ctx.lineWidth = 6 * blurFactor
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.6)";
    this.drawPinwheel(ctx, s)
    ctx.lineWidth = 4.5;
    this.drawPinwheel(ctx, s)
    ctx.lineWidth = 3;
    this.drawPinwheel(ctx, s)
    ctx.strokeStyle = 'rgb(200, 100, 255)';
    ctx.lineWidth = 1.5;
    this.drawPinwheel(ctx, s)

    // ctx.strokeStyle = "#971adf";
    // ctx.lineWidth = 1.8;

    ctx.restore();
  }

  drawPinwheel(ctx, s) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 0); //1
    ctx.lineTo(-s, -s); //2
    ctx.lineTo(0, -s); //3
    ctx.lineTo(0, 0); //1
    ctx.lineTo(s, -s); //4
    ctx.lineTo(s, 0); //5
    ctx.lineTo(0, 0); //1
    ctx.lineTo(s, s); //6
    ctx.lineTo(0, s); //7
    ctx.lineTo(0, 0); //1
    ctx.lineTo(-s, s); //8
    ctx.lineTo(-s, 0); //9
    // ctx.lineTo(); //1

    ctx.closePath();
    ctx.stroke();
  }




}

module.exports = PinwheelSprite;

/***/ }),

/***/ "./lib/game_objects/enemies/Singularity/alien_ship.js":
/*!************************************************************!*\
  !*** ./lib/game_objects/enemies/Singularity/alien_ship.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameObject = __webpack_require__(/*! ../../../game_engine/game_object */ "./lib/game_engine/game_object.js")
const Sound = __webpack_require__(/*! ../../../game_engine/sound */ "./lib/game_engine/sound.js")
const Util = __webpack_require__(/*! ../../../game_engine/util */ "./lib/game_engine/util.js")

const AlienShipSprite = __webpack_require__(/*! ./alien_ship_sprite */ "./lib/game_objects/enemies/Singularity/alien_ship_sprite.js")

class AlienShip extends GameObject {
    constructor(engine, pos, velocity, shipTransform) {
        super(engine)
        this.transform.pos[0] = pos[0]
        this.transform.pos[1] = pos[1]
        this.transform.vel[0] = velocity[0]
        this.transform.vel[1] = velocity[1]

        this.shipTransform = shipTransform
        this.radius = 4;
        this.points = 120
        this.chaseSpeed = 3.5;
        this.chaseAcceleration = 0.125 / 3
        this.addLineSprite(new AlienShipSprite(this.transform))
        this.addCollider("General", this, this.radius)
        this.addPhysicsComponent()
    }

    // change to acceleration
   

    update(timeDelta) {
        // console.log(this.transform.pos)
        this.chase()

        if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
            this.bounce()
        }
    }

    bounce() {
        this.gameEngine.gameScript.bounce(this.transform, this.radius)
    }

    chase() {
        // take current velocity
        // find ideal velocity using max speed, current position, and ship position
        // get unit vector of current position - ship position
        // take difference
        // apply acceleration in that direction

        // get dV
        //    mV => max speed in the direction it should be moving
        //    Vo => current velocity
        //    dV =  mV - Vo
        //    alpha = dV angle

        let speed = this.chaseSpeed;

        let shipPos = this.shipTransform.absolutePosition();
        let pos = this.transform.absolutePosition()
        let deltaPosition = [shipPos[0] - pos[0], shipPos[1] - pos[1]]
        let chaseDirection = Math.atan2(deltaPosition[1], deltaPosition[0])

        // Math.atan2 was giving me negative numbers.... when it shouldn't
        if (chaseDirection < 0) {
            chaseDirection = 2 * Math.PI + chaseDirection
        }
        // console.log(chaseDirection / (2 * Math.PI) * 360)
        let Vm = [speed * Math.cos(chaseDirection), speed * Math.sin(chaseDirection)]
        let Vo = this.transform.vel

        let dV = [Vm[0] - Vo[0], Vm[1] - Vo[1]]
        let accelerationDirection = Math.atan2(dV[1], dV[0])
        this.transform.acc[0] += this.chaseAcceleration * Math.cos(accelerationDirection)
        this.transform.acc[1] += this.chaseAcceleration * Math.sin(accelerationDirection)
        // console.log(this.transform.acc)
    }

}

module.exports = AlienShip;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

/***/ }),

/***/ "./lib/game_objects/enemies/Singularity/alien_ship_sprite.js":
/*!*******************************************************************!*\
  !*** ./lib/game_objects/enemies/Singularity/alien_ship_sprite.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const LineSprite = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./lib/game_engine/line_sprite.js")

class AlienShipSprite extends LineSprite {
    constructor(transform) {
        super(transform)
        this.radius = 4;
    }

    draw(ctx) {
        ctx.strokeStyle = 'rgb(255, 255, 255)'
        let r = 180;
        let g = 180;
        let b = 255;

        ctx.save();

        // ctx.strokeStyle = "#4286f4";
        // ctx.lineWidth = 4;
        let blurFactor = 0.5

        ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        ctx.lineWidth = 4;
        this.drawAlienShip(ctx, this.radius);
        ctx.lineWidth = 3
        this.drawAlienShip(ctx, this.radius);
        ctx.lineWidth = 2
        this.drawAlienShip(ctx, this.radius);
        ctx.lineWidth = 1
        this.drawAlienShip(ctx, this.radius);
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = 0.75
        this.drawAlienShip(ctx, this.radius);
        ctx.restore();
    }

    drawAlienShip(ctx, radius) {
        ctx.beginPath();
        let pos = this.transform.absolutePosition()
        ctx.arc(pos[0], pos[1], radius, 0, 2 * Math.PI, true);
        ctx.stroke();
    }
}

module.exports = AlienShipSprite

/***/ }),

/***/ "./lib/game_objects/enemies/Singularity/singularity.js":
/*!*************************************************************!*\
  !*** ./lib/game_objects/enemies/Singularity/singularity.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameObject = __webpack_require__(/*! ../../../game_engine/game_object */ "./lib/game_engine/game_object.js")
const Sound = __webpack_require__(/*! ../../../game_engine/sound */ "./lib/game_engine/sound.js")
const Util = __webpack_require__(/*! ../../../game_engine/util */ "./lib/game_engine/util.js")

const ParticleExplosion = __webpack_require__(/*! ../../particles/particle_explosion */ "./lib/game_objects/particles/particle_explosion.js")
const SingularityHitExplosion = __webpack_require__(/*! ../../particles/singularity_hit_explosion */ "./lib/game_objects/particles/singularity_hit_explosion.js")

const EnemySpawn = __webpack_require__(/*! ../../particles/enemy_spawn */ "./lib/game_objects/particles/enemy_spawn.js")
const SingularitySprite = __webpack_require__(/*! ./singularity_sprite */ "./lib/game_objects/enemies/Singularity/singularity_sprite.js")
const SingularityParticles = __webpack_require__(/*! ../../particles/singularity_particles */ "./lib/game_objects/particles/singularity_particles.js")
const AlienShip = __webpack_require__(/*! ./alien_ship */ "./lib/game_objects/enemies/Singularity/alien_ship.js")
class Singularity extends GameObject {
  constructor(engine, pos) {
    super(engine)
    this.transform.pos = pos;
    this.gravityWellSize = 500;
    this.gravityConstant = 1000 * 0.5;
    this.radius = 15
    this.points = 100
    this.throbbingCycleSpeed = 0.025
    this.numberAbsorbed = 0;
    this.alienSpawnAmount = 10;
    this.alienSpawnSpeed = 1.5;
    this.deathSound = new Sound("GEOWars/sounds/Gravity_well_die.wav")
    this.gravityWellHitSound = new Sound("GEOWars/sounds/Gravity_well_hit.wav", 0.5)
    this.openGateSound = new Sound("GEOWars/sounds/Gravity_well_explode.wav")
    // this.id = options.id
    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_red.wav", 1);
    this.playSound(this.spawnSound)

    this.increasing = true
    this.addLineSprite(new SingularitySprite(this.transform))
    this.addChildGameObject(new EnemySpawn(this.gameEngine))
    this.lineSprite.throbbingScale = 1
    this.lives = 5
  }

  exist() {
    // leaving off subscriptions means that things will subscribe to it
    this.addCollider("General", this, this.radius)
    this.addCollider("GravityWell", this, this.gravityWellSize, ["Grunt", "Pinwheel", "Bullet", "Ship", "BoxBox", "Arrow", "Singularity", "Weaver", "Particle", "SingularityParticle", "GridPoint"],  ["General"])
    this.addCollider("Absorb", this, this.radius, ["Grunt", "Pinwheel", "BoxBox", "Arrow", "Weaver"],  ["General"])
    // now it will move
    this.addPhysicsComponent()
    this.lineSprite.spawned = true
    this.addChildGameObject(new SingularityParticles(this.gameEngine, this.transform))
  }

  onCollision(collider, type){
    if (type === "GravityWell"){
      this.influenceAcceleration(collider.gameObject)
    } else if (type === "Absorb") {
      let hitObjectTransform = collider.gameObject.transform
      let pos = hitObjectTransform.absolutePosition()
      let vel = hitObjectTransform.absoluteVelocity()
      let explosion = new ParticleExplosion(this.gameEngine, pos, vel)
      collider.gameObject.remove()

      this.throbbingCycleSpeed *= 1.2
      this.numberAbsorbed += 1
    }
  }

  bulletHit(){
    this.lives -= 1
    let pos = this.transform.absolutePosition()
    let vel = this.transform.absoluteVelocity()
    if (this.lives <= 0) {
      let explosion = new ParticleExplosion(this.gameEngine, pos, vel)
      this.gameEngine.gameScript.tallyScore(this)
      this.playSound(this.deathSound)
      this.remove()
    } else {
      let explosion = new SingularityHitExplosion(this.gameEngine, pos, vel)
      this.playSound(this.gravityWellHitSound)
      this.throbbingCycleSpeed /= 1.2
      this.numberAbsorbed -= 1
    }
  }

  wallGraze() {
    this.gameEngine.gameScript.wallGraze(this.transform, this.radius)
  }
  

  update(deltaTime) {

    if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
      this.wallGraze()
    }
    if (this.numberAbsorbed === 3) {
      this.soundAlarm(deltaTime)
    }

    this.throb(deltaTime)
    if (this.numberAbsorbed >= 4) {
      this.openGate()
    }
  }

  soundAlarm(deltaTime){

  }

  throb(timeDelta) {

    let cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let cycleSpeed = this.throbbingCycleSpeed;
    // increase scale until 1.2, decrease until 0.8

    if (this.increasing) {
      this.lineSprite.throbbingScale += cycleSpeed * cycleSpeedScale
      if (this.lineSprite.throbbingScale > 1.2) {
        this.increasing = !this.increasing
      }
    } else {
      this.lineSprite.throbbingScale -= cycleSpeed * cycleSpeedScale
      if (this.lineSprite.throbbingScale < 0.8) {
        this.increasing = !this.increasing
      }
    }
  }

  influenceAcceleration(object) {
    let pos = this.transform.absolutePosition()
    let objectPos = object.transform.absolutePosition()
    let dy = pos[1] - objectPos[1];
    let dx = pos[0] - objectPos[0];
    let unitVector = Util.dir([dx, dy]);
    let r = Math.sqrt(dy * dy + dx * dx);
    if (r > this.gravityWellSize * 7 / 8 || r < this.radius * 2){
      // object.transform.acc = [0,0];
    } else {
      let accContribution= [
        unitVector[0] * this.gravityConstant / (r * r),
        unitVector[1] * this.gravityConstant / (r * r)
      ]
      object.transform.acc[0] += accContribution[0];
      object.transform.acc[1] += accContribution[1];
    }
  }

  openGate(){
    this.playSound(this.openGateSound)
    for (let i = 0; i < this.alienSpawnAmount; i++) {
      let angle = Math.random() * Math.PI * 2
      let velocity = [this.alienSpawnSpeed * Math.cos(angle), this.alienSpawnSpeed * Math.sin(angle)]
      new AlienShip(this.gameEngine, this.transform.pos, velocity, this.gameEngine.gameScript.ship.transform)
    }
    this.remove()

  }

}

module.exports = Singularity;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

/***/ }),

/***/ "./lib/game_objects/enemies/Singularity/singularity_sprite.js":
/*!********************************************************************!*\
  !*** ./lib/game_objects/enemies/Singularity/singularity_sprite.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const LineSprite = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./lib/game_engine/line_sprite.js")

class SingularitySprite extends LineSprite {
  constructor(transform, spawningScale = 1) {
    super(transform)
    this.spawningScale = spawningScale
    this.throbbingScale = 1
    this.radius = 15;
    this.spawned = false;
  }

  draw(ctx) {
    let spawningScale = this.spawningScale
    if (this.spawned) {
      spawningScale = this.throbbingScale
    }

    ctx.strokeStyle = "#F173BA"

    let r = 95;
    let g = 45;
    let b = 73;

    ctx.save();
    // ctx.translate(pos[0], pos[1]);

    // ctx.strokeStyle = "#4286f4";
    // ctx.lineWidth = 4;
    let blurFactor = 0.5

    ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
    ctx.lineWidth = 7.5;
    this.drawSingularity(ctx, this.radius * spawningScale);
    ctx.lineWidth = 6
    this.drawSingularity(ctx, this.radius * spawningScale);
    ctx.lineWidth = 4.5
    this.drawSingularity(ctx, this.radius * spawningScale);
    ctx.lineWidth = 3
    this.drawSingularity(ctx, this.radius * spawningScale);
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth = 1.5
    this.drawSingularity(ctx, this.radius * spawningScale);
    ctx.restore();
    // ctx.lineWidth = 2;
    // drawSingularity(ctx, this.radius * spawningScale);
  }

  drawSingularity(ctx, radius) {
    ctx.beginPath();
    let pos = this.transform.absolutePosition()
    ctx.arc(pos[0], pos[1], radius, 0, 2 * Math.PI, true);
    ctx.stroke();
  }
}

module.exports = SingularitySprite

/***/ }),

/***/ "./lib/game_objects/enemies/Weaver/weaver.js":
/*!***************************************************!*\
  !*** ./lib/game_objects/enemies/Weaver/weaver.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameObject = __webpack_require__(/*! ../../../game_engine/game_object */ "./lib/game_engine/game_object.js")
const Sound = __webpack_require__(/*! ../../../game_engine/sound */ "./lib/game_engine/sound.js")
const Util = __webpack_require__(/*! ../../../game_engine/util */ "./lib/game_engine/util.js")

const EnemySpawn = __webpack_require__(/*! ../../particles/enemy_spawn */ "./lib/game_objects/particles/enemy_spawn.js")
const WeaverSprite = __webpack_require__(/*! ./weaver_sprite */ "./lib/game_objects/enemies/Weaver/weaver_sprite.js")

class Weaver extends GameObject {
  constructor(engine, pos, shipTransform) {
    super(engine)
    this.rotation_speed = 0.075;
    this.transform.pos[0] = pos[0]
    this.transform.pos[1] = pos[1]
    this.speed = 3;
    this.points = 80;
    this.radius = 5;
    this.weaverCloseHitBox = 20;
    this.shipTransform = shipTransform
    this.directionInfluenced = false;
    this.influencers = [];
    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_green.wav", 0.5);
    this.playSound(this.spawnSound)
    this.addLineSprite(new WeaverSprite(this.transform))
    this.addChildGameObject(new EnemySpawn(this.gameEngine))
    this.exists = false;
    
  }

  exist() {
    // leaving off subscriptions means that things will subscribe to it
    this.addCollider("General", this, this.radius)
    this.addCollider("BulletDodge", this, this.weaverCloseHitBox, ["Bullet"], ["General"])
    // now it will move
    this.addPhysicsComponent()
    this.exists = true;
  }

  onCollision(collider, type){
    if (type === "BulletDodge") {
      this.acceptBulletDirection(collider.gameObject.transform.pos)
    }
  }

  influenceDirection() {
    let directionVector = [0, 0]

    this.influencers.forEach((influencer) => {
      let dx = directionVector[0] + influencer[0];
      let dy = directionVector[1] + influencer[1];
      let newVector = [dx, dy]
      directionVector = Util.dir(newVector);
    })
    let influencedDirection = Math.atan2(directionVector[1], directionVector[0]);
    return influencedDirection
  }

  acceptBulletDirection(source) {
    this.directionInfluenced = true;
    let dy = this.transform.pos[1] - source[1];
    let dx = this.transform.pos[0] - source[0];
    let unitVector = Util.dir([dx, dy]);
    this.influencers.push(unitVector)
    // first 
  }

  update(timeDelta){
    if(this.exists){
      let speed = this.speed
      const rotationSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
      const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
      this.transform.angle = (this.transform.angle + this.rotation_speed * rotationSpeedScale) % (Math.PI * 2)
      
      if (!this.directionInfluenced) {
        this.chase(timeDelta)
      } else {
        let direction = this.influenceDirection();
        this.transform.pos[0] += speed * Math.cos(direction) * velocityScale
        this.transform.pos[1] += speed * Math.sin(direction) * velocityScale
      }
  
      this.directionInfluenced = false;
  
      if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
        this.wallGraze()
      }
    }
    
  }

  wallGraze() {
    this.gameEngine.gameScript.wallGraze(this.transform, this.radius)
  }

  chase(timeDelta) {
    let speed = 2
    let shipPos = this.shipTransform.pos;
    let dy = shipPos[1] - this.transform.pos[1];
    let dx = shipPos[0] - this.transform.pos[0];

    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let direction = Math.atan2(dy, dx);

    this.transform.pos[0] += speed * Math.cos(direction) * velocityScale
    this.transform.pos[1] += speed * Math.sin(direction) * velocityScale
  }

}

Weaver.BOX_SIZE = 10;
Weaver.COLOR = "#3cff0b"

module.exports = Weaver;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

/***/ }),

/***/ "./lib/game_objects/enemies/Weaver/weaver_sprite.js":
/*!**********************************************************!*\
  !*** ./lib/game_objects/enemies/Weaver/weaver_sprite.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const LineSprite = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./lib/game_engine/line_sprite.js")

class WeaverSprite extends LineSprite {
  constructor(transform, spawningScale = 1) {
    super(transform)
    this.spawningScale = spawningScale
  }

  draw(ctx) {
    // drawing this guy is taking waaay too much time.
    // I took out the blurr factor and it's way better.
    // doesn't look as nice, but it's a starting point
    let pos = this.transform.absolutePosition();
    let angle = this.transform.absoluteAngle();
    let spawningScale = this.spawningScale
    let shipLength = 10 * 2.2 * spawningScale
    let shipWidth = 10 * 2.2 * spawningScale
    let s = shipWidth / 2;

    let r = 24;
    let g = 255;
    let b = 4;

    ctx.save();
    ctx.translate(pos[0], pos[1]);
    ctx.rotate(angle);
    
    let blurFactor = 0.5
    ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
    // ctx.shadowBlur = 10 * blurFactor
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
    ctx.lineWidth = 7.5
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
    this.drawWeaver(ctx, s)
    ctx.lineWidth = 6
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.6)";
    this.drawWeaver(ctx, s)
    // ctx.lineWidth = 4.5;
    // this.drawWeaver(ctx, s)
    // ctx.lineWidth = 3;
    // this.drawWeaver(ctx, s)
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth = 1.5;
    this.drawWeaver(ctx, s)

    ctx.restore();
  }

  drawWeaver(ctx, s) {

    ctx.beginPath();
    // ctx.strokeStyle = "#3cff0b";
    ctx.lineWidth = 2;
    ctx.moveTo(0, -s); //1
    ctx.lineTo(s, 0); //2
    ctx.lineTo(0, s); //3
    ctx.lineTo(-s, 0); //4
    ctx.lineTo(0, -s); //1
    ctx.lineTo(-s / 2, -s / 2); //5
    ctx.lineTo(s / 2, -s / 2); //6
    ctx.lineTo(s / 2, s / 2); //7
    ctx.lineTo(-s / 2, s / 2); //8
    ctx.lineTo(-s / 2, -s / 2); //5
    // ctx.closePath();
    ctx.stroke();
  }
}

module.exports = WeaverSprite

/***/ }),

/***/ "./lib/game_objects/particles/Grid/grid.js":
/*!*************************************************!*\
  !*** ./lib/game_objects/particles/Grid/grid.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(/*! ../../../game_engine/util */ "./lib/game_engine/util.js")
const GameObject = __webpack_require__(/*! ../../../game_engine/game_object */ "./lib/game_engine/game_object.js")

const GridSprite = __webpack_require__(/*! ./grid_sprite */ "./lib/game_objects/particles/Grid/grid_sprite.js")
const GridPoint = __webpack_require__(/*! ./grid_point */ "./lib/game_objects/particles/Grid/grid_point.js")

class Grid extends GameObject {
    constructor(engine, gameScript) {
        super(engine)

        this.transform.pos = [0,0]

        this.arenaDimensions = [gameScript.DIM_X, gameScript.DIM_Y]
        this.elasticity = 0.1; // force provided to pull particle back into place
        this.dampening = 0.1; // force produced from velocity (allows things to eventuall fall to rest)

        this.gridPoints = this.createGridPoints()

        this.addLineSprite(new GridSprite(this.transform, this.gridPoints))
        // this.addPhysicsComponent()
        // this.addCollider("General", this, this.radius)
    }

    Playerdies(location) {
        this.gridPoints.forEach((row) => {
            row.forEach((gridPoint) => {
                this.deathPerterb(gridPoint, location)
            })
        })
    }

    deathPerterb(gridPoint, location){
        // pulls inward upon death. 1/r^2
        const pullConstant = 1250;

        let pos = location
        let objectPos = gridPoint.transform.absolutePosition()
        let dy = pos[1] - objectPos[1];
        let dx = pos[0] - objectPos[0];
        let unitVector = Util.dir([dx, dy]);
        let r = Math.sqrt(dy * dy + dx * dx);
        if ( r < 20 ) {
        } else {
            let velContribution = [
                unitVector[0] * pullConstant / (r ),
                unitVector[1] * pullConstant / (r )
            ]
            gridPoint.transform.vel[0] = velContribution[0];
            gridPoint.transform.vel[1] = velContribution[1];
        }
    }

    createGridPoints(){
        let columnCount = 20
        let rowCount = 12
        let gridPoints = []
        let gridRow = []
        for (let yPosition = 0; yPosition <= this.arenaDimensions[1]; yPosition += this.arenaDimensions[1] / rowCount) {
            for (let xPosition = 0; xPosition <= this.arenaDimensions[0]; xPosition += this.arenaDimensions[0] / columnCount) {
                if(
                   (xPosition === 0 && (yPosition === 0 || yPosition === this.arenaDimensions[1])) || 
                   (xPosition == this.arenaDimensions[0] && (yPosition === 0 || yPosition === this.arenaDimensions[1])) 
                   ){
                    continue
                }
                let position = [xPosition, yPosition]
                gridRow.push(new GridPoint(this.gameEngine, position))
            }
            
            gridPoints.push(gridRow.slice())
            gridRow = []
        }
        return gridPoints
    }

    update(deltaTime) {

    }

}

module.exports = Grid;

/***/ }),

/***/ "./lib/game_objects/particles/Grid/grid_point.js":
/*!*******************************************************!*\
  !*** ./lib/game_objects/particles/Grid/grid_point.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


const Util = __webpack_require__(/*! ../../../game_engine/util */ "./lib/game_engine/util.js")
const GameObject = __webpack_require__(/*! ../../../game_engine/game_object */ "./lib/game_engine/game_object.js")

class GridPoint extends GameObject {
    constructor(engine, pos) {
        super(engine)
        this.origionalPosition = []
        this.origionalPosition[0] = pos[0]
        this.origionalPosition[1] = pos[1]
        this.transform.pos = pos
        this.radius = 2
        this.elasticity = -0.0035; // force provided to pull particle back into place
        this.dampening = -0.04; // force produced from velocity (allows things to eventuall fall to rest)

        this.addPhysicsComponent()
        this.addCollider("General", this, this.radius)
    }

    update(deltaTime) {
        this.transform.acc[0] += this.transform.vel[0] * this.dampening + (this.transform.pos[0] - this.origionalPosition[0]) * this.elasticity
        this.transform.acc[1] += this.transform.vel[1] * this.dampening + (this.transform.pos[1] - this.origionalPosition[1]) * this.elasticity
    }

}

module.exports = GridPoint;

/***/ }),

/***/ "./lib/game_objects/particles/Grid/grid_sprite.js":
/*!********************************************************!*\
  !*** ./lib/game_objects/particles/Grid/grid_sprite.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const LineSprite = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./lib/game_engine/line_sprite.js")
const Color = __webpack_require__(/*! ../../../game_engine/color */ "./lib/game_engine/color.js")

class GridSprite extends LineSprite {
    constructor(transform, gridPoints) {
        super(transform)
        this.gridPoints = gridPoints

        this.color = new Color({
            "hsla": [202, 100, 70, 0.2]
        });
    }

    draw(ctx) {
        ctx.save();
        ctx.strokeStyle = this.color.evaluateColor();
        ctx.lineWidth = 3
        this.drawRows(ctx)
        this.drawColumns(ctx)
        ctx.restore();
    }

    drawRows(ctx) {
        let gridPoints = this.gridPoints

        for (let i = 1; i < gridPoints.length - 1; i++) {
            ctx.beginPath()
            let firstPosition = gridPoints[i][0].transform.pos
            ctx.moveTo(firstPosition[0], firstPosition[1])
            for (let j = 1; j < gridPoints[i].length; j++) {
                let nextPosition = gridPoints[i][j].transform.pos;
                ctx.lineTo(nextPosition[0], nextPosition[1])
            }

            ctx.stroke()
        }
    }

    drawColumns(ctx) {
        let gridPoints = this.gridPoints
        ctx.beginPath()

        for (let j = 1; j < gridPoints[1].length - 1; j++) {
            ctx.beginPath()
            for (let i = 0; i < gridPoints.length; i++) {
                let nextPosition = []
                if( i === 0 || i === 0) {
                    nextPosition = gridPoints[i][j - 1].transform.pos
                    ctx.moveTo(nextPosition[0], nextPosition[1])
                } else {
                    if ( i === gridPoints.length - 1) {
                        nextPosition = gridPoints[i][j - 1].transform.pos
                    } else {
                        nextPosition = gridPoints[i][j].transform.pos
                    }
                    ctx.lineTo(nextPosition[0], nextPosition[1])
                }

            }
            ctx.stroke()
        }
    }
}
module.exports = GridSprite

/***/ }),

/***/ "./lib/game_objects/particles/Particle/particle.js":
/*!*********************************************************!*\
  !*** ./lib/game_objects/particles/Particle/particle.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// direction of the particle is the direction of the velocity vector
// the direction of the 
// the particle dies when the hue reaches 0 

// random movement angle created
// initial speed (scale)
// vel = Util.vectorCartisian(angle, scale)
//
// 

// because the particle is drawn the correct way now, 
// from position out, the particle's center is located 
// far from the center of the particle
const ParticleSprite = __webpack_require__(/*! ./particle_sprite */ "./lib/game_objects/particles/Particle/particle_sprite.js")

const Util = __webpack_require__(/*! ../../../game_engine/util */ "./lib/game_engine/util.js")
const GameObject = __webpack_require__(/*! ../../../game_engine/game_object */ "./lib/game_engine/game_object.js")


class Particle extends GameObject{
  constructor(engine, pos, initialSpeed, color, wallHit) {
    super(engine)

    this.transform.pos[0] = pos[0]
    this.transform.pos[1] = pos[1]
    this.color = color
    this.movementAngle = this.createMovementAngle(wallHit)
    this.transform.vel = Util.vectorCartisian(this.movementAngle, initialSpeed)
    this.radius = 3
    this.explosionDeceleration = 0.1; // in the direction the particle is moving
    this.transform.acc = [-this.explosionDeceleration * Math.cos(this.movementAngle), -this.explosionDeceleration * Math.sin(this.movementAngle)]
    this.addLineSprite(new ParticleSprite(this.transform, this.color))
    this.addPhysicsComponent()
    
    // this.addCollider("General", this, this.radius)

  }

  createMovementAngle(wallHit) {
    if (!wallHit){ 
      return (Math.random() * Math.PI * 2);
    } else {
      if (wallHit === "BOTTOM") {
        return(Math.random() * Math.PI + Math.PI)
      } else if (wallHit === "RIGHT") {
        return (Math.random() * Math.PI + Math.PI / 2)
      } else if (wallHit === "TOP") {
        return (Math.random() * Math.PI)
      } else if (wallHit === "LEFT") {
        return (Math.random() * Math.PI + 3 * Math.PI / 2)
      }
    }
  }
  

  update(deltaTime){
    this.lineSprite.rectLength -= 0.1;
    this.lineSprite.color.a -= 0.01;
    if (this.lineSprite.hue < 0.06 || this.lineSprite.rectLength < 0.25 || ((Math.abs(this.transform.vel[0]) + Math.abs(this.transform.vel[1])) < 0.15)) {
      
      this.remove();
    }
    this.checkBounds()
    // acc is influenced by singularities, then changed to usual acc
    this.movementAngle = Math.atan2(this.transform.vel[1], this.transform.vel[0])
    this.transform.acc = [-this.explosionDeceleration * Math.cos(this.movementAngle), -this.explosionDeceleration * Math.sin(this.movementAngle)]
  }

  checkBounds() {
    if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), -0.5)) {
      this.remove();
    }
  }

}

module.exports = Particle;

/***/ }),

/***/ "./lib/game_objects/particles/Particle/particle_sprite.js":
/*!****************************************************************!*\
  !*** ./lib/game_objects/particles/Particle/particle_sprite.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const LineSprite = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./lib/game_engine/line_sprite.js")

class ParticleSprite extends LineSprite {
  constructor(transform, color) {
    super(transform)
    this.rectLength = 15;
    this.rectWidth = 2;
    this.color = color
  }

  draw(ctx) {
    let pos = this.transform.absolutePosition();
    let vel = this.transform.absoluteVelocity();
    let l = this.rectLength;
    let w = this.rectWidth;
    let movementDirection = Math.atan2(vel[0], -vel[1])

    ctx.save();
    ctx.translate(pos[0], pos[1]);
    ctx.rotate(movementDirection - Math.PI);

    ctx.beginPath();
    ctx.strokeStyle = this.color.evaluateColor();
    ctx.lineWidth = w;

    ctx.moveTo(0, 0); //1
    ctx.lineTo(0, l); //2

    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}

module.exports = ParticleSprite;

/***/ }),

/***/ "./lib/game_objects/particles/Singularity_Particle/singulairty_particle_sprite.js":
/*!****************************************************************************************!*\
  !*** ./lib/game_objects/particles/Singularity_Particle/singulairty_particle_sprite.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const LineSprite = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./lib/game_engine/line_sprite.js")
const ParticleSprite = __webpack_require__(/*! ../Particle/particle_sprite */ "./lib/game_objects/particles/Particle/particle_sprite.js")

class SingularityParticleSprite extends LineSprite {
  constructor(transform, color) {
    super(transform)
    this.rectLength = 15;
    this.rectWidth = 2;
    this.color = color
  }
 
  draw(ctx) {
    let pos = this.transform.absolutePosition();
    let vel = this.transform.absoluteVelocity();
    let l = this.rectLength;
    let w = this.rectWidth;
    let movementDirection = Math.atan2(vel[0], -vel[1])

    ctx.save();
    ctx.beginPath();
    ctx.translate(pos[0], pos[1]);
    ctx.rotate(movementDirection + 2 * Math.PI);

    ctx.beginPath();
    ctx.strokeStyle = this.color.evaluateColor();
    ctx.lineWidth = w;

    ctx.moveTo(0, 0); //1
    ctx.lineTo(0, l); //2

    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}

module.exports = SingularityParticleSprite;

/***/ }),

/***/ "./lib/game_objects/particles/Singularity_Particle/singularity_particle.js":
/*!*********************************************************************************!*\
  !*** ./lib/game_objects/particles/Singularity_Particle/singularity_particle.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// direction of the particle is the direction of the velocity vector
// the direction of the 
// the particle dies when the hue reaches 0 

// random movement angle created
// initial speed (scale)
// vel = Util.vectorCartisian(angle, scale)
//
// 
const SingularityParticleSprite = __webpack_require__(/*! ./singulairty_particle_sprite */ "./lib/game_objects/particles/Singularity_Particle/singulairty_particle_sprite.js")

const Util = __webpack_require__(/*! ../../../game_engine/util */ "./lib/game_engine/util.js")
const GameObject = __webpack_require__(/*! ../../../game_engine/game_object */ "./lib/game_engine/game_object.js")
const Particle = __webpack_require__(/*! ../Particle/particle */ "./lib/game_objects/particles/Particle/particle.js")

class SingularityParticle extends Particle {
  constructor(engine, pos, vel, color) {
    super(engine, pos, 0, color)

    this.transform.vel[0] = vel[0]
    this.transform.vel[1] = vel[1]

    this.color = color;
    this.addCollider("General", this, this.radius)
    this.checkBounds()
  }

  update(deltaTime) {
    
    this.lineSprite.rectLength -= 0.25;
    this.lineSprite.color.a -= 0.01;
    if (this.lineSprite.color.a < 0.06 || this.lineSprite.rectLength < 0.25) {
      this.parentObject.currentParticleCount -= 1;
      this.remove();
    }
    // acc is influenced by singularities, then changed to usual acc
    this.movementAngle = Math.atan2(this.transform.vel[1], this.transform.vel[0])
    this.transform.acc = [0,0]
    this.checkBounds()
  }
  checkBounds() {
    if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), -0.5)) {
      this.remove();
    }
  }

}

module.exports = SingularityParticle;

/***/ }),

/***/ "./lib/game_objects/particles/bullet_wall_explosion.js":
/*!*************************************************************!*\
  !*** ./lib/game_objects/particles/bullet_wall_explosion.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Particle = __webpack_require__(/*! ./Particle/particle */ "./lib/game_objects/particles/Particle/particle.js")
const GameObject = __webpack_require__(/*! ../../game_engine/game_object */ "./lib/game_engine/game_object.js")
const Sound = __webpack_require__(/*! ../../game_engine/sound */ "./lib/game_engine/sound.js")
const Color = __webpack_require__(/*! ../../game_engine/color */ "./lib/game_engine/color.js")
class BulletWallExplosion extends GameObject{
  constructor(engine, pos) {
    super(engine)
    this.transform.pos[0] = pos[0]
    this.transform.pos[1] = pos[1]
    let startingH = (this.gameEngine.gameScript.explosionColorWheel + 180 + Math.random() * 60) % 360
    let opacity = Math.random() * 0.35 + 0.6
    this.currentColor = new Color({
      "hsla": [startingH, 100, 50, opacity]
    });
    this.particleNum = 20;
    let bulletWallHit = new Sound("GEOWars/sounds/bullet_hitwall.wav", 0.1)
    this.wallHit = this.whichWall()
    this.playSound(bulletWallHit)
    this.createParticles()
  }

  whichWall() {
    let pos = this.transform.pos

    let max = [this.gameEngine.gameScript.DIM_X, this.gameEngine.gameScript.DIM_Y]
    if (pos[0] <= 0) {
      return "LEFT"
    } else if (pos[0] >= max[0]) {
      return "RIGHT"
    } else if (pos[1] <= 0) {
      return "TOP"
    } else if (pos[1] >= max[1]) {
      return "BOTTOM"
    }

  }

  createParticles(){
    for (var i = 0; i < this.particleNum; i++) {
      const colorVarienceDelta = 30
      const speed = 1 + Math.random() * 3
      let colorVarience = colorVarienceDelta * Math.random() - colorVarienceDelta / 2
      let color = this.currentColor.dup()
      color.a = Math.random() * 0.35 + 0.6
      color.h = (color.h + colorVarience) % 360
      
      this.addChildGameObject(new Particle(this.gameEngine, this.transform.absolutePosition(), speed, color, this.wallHit));
    }
  }

  update() {
    
    if (this.childObjects.length === 0) {
      this.remove()
    }
  }
}

module.exports = BulletWallExplosion

/***/ }),

/***/ "./lib/game_objects/particles/enemy_spawn.js":
/*!***************************************************!*\
  !*** ./lib/game_objects/particles/enemy_spawn.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameObject = __webpack_require__(/*! ../../game_engine/game_object */ "./lib/game_engine/game_object.js")

class EnemySpawn extends GameObject{
  constructor(engine){
    super(engine)
    this.initialSpawningScale = 1.5;
    // this.spawningScale = 1.5;
    this.lifeTime = 1000;
    this.existTime = 0;
    // this.gameEngine.queueSound(this.parentObject.spawnSound)
  }

  update(timeDelta) {
    this.existTime += timeDelta;
    if (this.existTime >= this.lifeTime){
      
      this.parentObject.exist()
      this.parentObject.lineSprite.spawningScale = 1;
      this.remove()
    }

    let cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let cycleSpeed = 0.1;
    
    if (this.parentObject.lineSprite.spawningScale < 0.7){
      this.parentObject.lineSprite.spawningScale = this.initialSpawningScale;
    } else {
      this.parentObject.lineSprite.spawningScale -= cycleSpeed * cycleSpeedScale;
    }
  }
}
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
module.exports = EnemySpawn;

/***/ }),

/***/ "./lib/game_objects/particles/particle_explosion.js":
/*!**********************************************************!*\
  !*** ./lib/game_objects/particles/particle_explosion.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


const Particle = __webpack_require__(/*! ./Particle/particle */ "./lib/game_objects/particles/Particle/particle.js")
const GameObject = __webpack_require__(/*! ../../game_engine/game_object */ "./lib/game_engine/game_object.js")
const Sound = __webpack_require__(/*! ../../game_engine/sound */ "./lib/game_engine/sound.js")
const Color = __webpack_require__(/*! ../../game_engine/color */ "./lib/game_engine/color.js")
class ParticleExplosion extends GameObject{
  constructor(engine, pos){
    super(engine)
    this.transform.pos[0] = pos[0]
    this.transform.pos[1] = pos[1]
    let startingH = (this.gameEngine.gameScript.explosionColorWheel + Math.random() * 60)% 360
    let opacity = Math.random() * 0.35 + 0.6
    this.currentColor = new Color({
      "hsla": [startingH, 100, 50, opacity]
    });
    if (engine.graphicQuality === 1) {
      // console.log("best")
      this.particleNum = 80;
    } else if (engine.graphicQuality === 2){
      // console.log("medium")
      this.particleNum = 40
    } else {
      // console.log("potato")
      this.particleNum = 20
    }

    let explosionSound = new Sound("GEOWars/sounds/Enemy_explode.wav", 0.2)
    this.playSound(explosionSound)
    this.createExplosionParticles()
  }

  createExplosionParticles(){
    for (var i = 0; i < this.particleNum; i++) {
      const speed = Math.random() * 3 + 4
      
      const colorVarienceDelta = 30
      let colorVarience = colorVarienceDelta * Math.random() - colorVarienceDelta / 2
      let color = this.currentColor.dup()
      color.a = Math.random() * 0.35 + 0.6
      color.h = (color.h + colorVarience) % 360
      
      this.addChildGameObject(new Particle(this.gameEngine, this.transform.absolutePosition(), speed, color));
    }
  }

  update(){
    if (this.childObjects.length === 0){
      this.remove()
    }
  }
    // ANIMATION = requestAnimationFrame(drawScene);
}




module.exports = ParticleExplosion;

/***/ }),

/***/ "./lib/game_objects/particles/ship_explosion.js":
/*!******************************************************!*\
  !*** ./lib/game_objects/particles/ship_explosion.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Particle = __webpack_require__(/*! ./Particle/particle */ "./lib/game_objects/particles/Particle/particle.js")
const GameObject = __webpack_require__(/*! ../../game_engine/game_object */ "./lib/game_engine/game_object.js")
const Sound = __webpack_require__(/*! ../../game_engine/sound */ "./lib/game_engine/sound.js")
const Color = __webpack_require__(/*! ../../game_engine/color */ "./lib/game_engine/color.js")
class ShipExplosion extends GameObject {
    constructor(engine, pos) {
        super(engine)
        this.transform.pos[0] = pos[0]
        this.transform.pos[1] = pos[1]
        let startingH = (this.gameEngine.gameScript.explosionColorWheel + Math.random() * 60) % 360
        let opacity = Math.random() * 0.35 + 0.6
        this.currentColor = new Color({
            "hsla": [startingH, 100, 50, opacity]
        });
        this.particleNum = 400;
        let explosionSound = new Sound("GEOWars/sounds/Enemy_explode.wav", 0.2)
        this.playSound(explosionSound)
        this.createExplosionParticles()
    }

    createExplosionParticles() {
        for (var i = 0; i < this.particleNum; i++) {
            const speed = Math.random() * 10 + 4

            const colorVarienceDelta = 30
            let colorVarience = colorVarienceDelta * Math.random() - colorVarienceDelta / 2
            let color = this.currentColor.dup()
            // color.a = Math.random() * 0.35 + 0.6
            // color.h = (color.h + colorVarience) % 360

            this.addChildGameObject(new Particle(this.gameEngine, this.transform.absolutePosition(), speed, color));
        }
    }

    update() {
        if (this.childObjects.length === 0) {
            this.remove()
        }
    }
    // ANIMATION = requestAnimationFrame(drawScene);
}




module.exports = ShipExplosion;

/***/ }),

/***/ "./lib/game_objects/particles/singularity_hit_explosion.js":
/*!*****************************************************************!*\
  !*** ./lib/game_objects/particles/singularity_hit_explosion.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Particle = __webpack_require__(/*! ./Particle/particle */ "./lib/game_objects/particles/Particle/particle.js")
const GameObject = __webpack_require__(/*! ../../game_engine/game_object */ "./lib/game_engine/game_object.js")
const Sound = __webpack_require__(/*! ../../game_engine/sound */ "./lib/game_engine/sound.js")
const Color = __webpack_require__(/*! ../../game_engine/color */ "./lib/game_engine/color.js")
class SingularityHitExplosion extends GameObject {
    constructor(engine, pos) {
        super(engine)
        this.transform.pos[0] = pos[0]
        this.transform.pos[1] = pos[1]
        let startingH = (this.gameEngine.gameScript.explosionColorWheel + Math.random() * 60 + 180) % 360
        let opacity = Math.random() * 0.35 + 0.3
        this.currentColor = new Color({
            "hsla": [startingH, 100, 50, opacity]
        });
        if (engine.graphicQuality === 1) {
            // console.log("best")
            this.particleNum = 50;
        } else if (engine.graphicQuality === 2) {
            // console.log("medium")
            this.particleNum = 30
        } else {
            // console.log("potato")
            this.particleNum = 15
        }
        // find singularity hit sound
        let explosionSound = new Sound("GEOWars/sounds/Enemy_explode.wav", 0.2)
        this.playSound(explosionSound)
        this.createExplosionParticles()
    }

    createExplosionParticles() {
        for (var i = 0; i < this.particleNum; i++) {
            // adjust speed
            const speed = Math.random() * 3 + 2.5

            const colorVarienceDelta = 30
            let colorVarience = colorVarienceDelta * Math.random() - colorVarienceDelta / 2
            let color = this.currentColor.dup()
            color.a = Math.random() * 0.35 + 0.6
            color.h = (color.h + colorVarience) % 360

            this.addChildGameObject(new Particle(this.gameEngine, this.transform.absolutePosition(), speed, color));
        }
    }

    update() {
        if (this.childObjects.length === 0) {
            this.remove()
        }
    }
    // ANIMATION = requestAnimationFrame(drawScene);
}




module.exports = SingularityHitExplosion;

/***/ }),

/***/ "./lib/game_objects/particles/singularity_particles.js":
/*!*************************************************************!*\
  !*** ./lib/game_objects/particles/singularity_particles.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameObject = __webpack_require__(/*! ../../game_engine/game_object */ "./lib/game_engine/game_object.js")
const Util = __webpack_require__(/*! ../../game_engine/util */ "./lib/game_engine/util.js")
const SingularityParticle = __webpack_require__(/*! ./Singularity_Particle/singularity_particle */ "./lib/game_objects/particles/Singularity_Particle/singularity_particle.js")
const Color = __webpack_require__(/*! ../../game_engine/color */ "./lib/game_engine/color.js")

class SingularityParticles extends GameObject {
  constructor(engine, transform) {
    super(engine)
    this.transform = transform
    let startingH = Math.random() * 360
    let opacity = Math.random() * 0.35 + 0.6
    this.frequencyParticleCreation = 10;
    this.particleCreationTime = 0;
    this.currentColor = new Color({
      "hsla": [startingH, 100, 50, opacity]
    });

    this.particleNum = 80;
    this.currentParticleCount = 0;
    // let explosionSound = new Sound("GEOWars/sounds/Enemy_explode.wav", 0.2)
    this.createSingularityParticles()
    
  }

  createSingularityParticles() {
    
    for (var i = 0; i < this.particleNum; i++) {
      this.addSingularityParticle()
      this.currentParticleCount++
    }
  }

  addSingularityParticle(){
    const L = 70
    const length = 0
    const baseSpeed = 3

    const distanceVarienceDelta = 15
    const colorVarienceDelta = 10
    const angleVarienceDelta = Math.PI / 4
    const speedVarienceDelta = 2

    let distanceVarience = distanceVarienceDelta * Math.random() - distanceVarienceDelta / 2
    let colorVarience = colorVarienceDelta * Math.random() - colorVarienceDelta / 2
    let angleVarience = angleVarienceDelta * Math.random() - angleVarienceDelta / 2
    let speedVarience = speedVarienceDelta * Math.random() - speedVarienceDelta / 2

    let r = L + distanceVarience
    let theta = Math.random() * 2 * Math.PI
    let alpha = theta + Math.PI / 2 +  angleVarience
    let speed = baseSpeed + speedVarience

    let pos = [r * Math.cos(theta) + this.transform.pos[0], r * Math.sin(theta) + this.transform.pos[1]]
    let vel = [speed * Math.cos(alpha) + this.transform.vel[0], speed * Math.sin(alpha) + this.transform.vel[1]]
    let color = this.currentColor.dup()

    color.a = Math.random() * 0.19 + 0.8
    color.h = (color.h + colorVarience) % 360

    this.addChildGameObject(new SingularityParticle(this.gameEngine, pos, vel, color));
  }

  changeCurrentColor(){
    this.currentColor.h += 1 / 2
    this.currentColor.h = this.currentColor.h % 360
  }

  update(timeDelta) {
    this.particleCreationTime += timeDelta
    if (this.particleCreationTime > this.frequencyParticleCreation){
      this.particleCreationTime = 0
      if (this.currentParticleCount < 60){
        this.addSingularityParticle()
      }
    }
    this.changeCurrentColor()
  }
  // ANIMATION = requestAnimationFrame(drawScene);
}




module.exports = SingularityParticles;

/***/ }),

/***/ "./lib/game_objects/ship/ship.js":
/*!***************************************!*\
  !*** ./lib/game_objects/ship/ship.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameObject = __webpack_require__(/*! ../../game_engine/game_object */ "./lib/game_engine/game_object.js");
const Util = __webpack_require__(/*! ../../game_engine/util */ "./lib/game_engine/util.js");
const Sound = __webpack_require__(/*! ../../game_engine/sound */ "./lib/game_engine/sound.js");

// const Camera = require("../Camera/camera")
const Bullet = __webpack_require__(/*! ../Bullet/bullet */ "./lib/game_objects/Bullet/bullet.js");
const ShipSprite = __webpack_require__(/*! ./ship_sprite */ "./lib/game_objects/ship/ship_sprite.js")

class Ship extends GameObject {
  constructor(engine, pos, gameScript) { 
    super(engine);
    this.transform.pos = pos
    this.addPhysicsComponent()
    this.addMousePosListener()
    this.addLeftControlStickListener()
    this.addRightControlStickListener()
    this.addStartButtonListener()
    this.radius = 10
    this.addCollider("General", this, this.radius)
    this.addCollider("ShipDeath", this, this.radius, ["BoxBox", "Singularity", "Weaver", "Grunt", "Arrow", "Pinwheel", "AlienShip"], ["General"])
    this.addLineSprite(new ShipSprite(this.transform))
    this.maxSpeed = 2.5;
    this.mousePos = [0,0];
    this.fireAngle = 0;
    this.bulletSound = new Sound("GEOWars/sounds/Fire_normal.wav", 0.2);
    this.upgradeBulletsSound = new Sound("GEOWars/sounds/Hi_Score_achieved.wav")
    this.bulletTimeCheck = 0;
    this.bulletInterval = 120;
    this.controlsDirection = [0,0];
    this.powerLevel = 1;
    this.bulletNumber = 0;
    this.controlsPointing = true;
    this.speed
    this.shipEngineAcceleration = 0.125;
    this.dontShoot = false

    this.keysPressed = []
    this.pauseKeyedUp = true
    this.zooming = true

    this.spawning = true
    this.spawningTime = 0;
    this.flashingTime = 0;
    this.flashTime = 1000 / 8
    this.flashing = true;
    this.flashIntervalTime = 0;
    this.flashInterval = 250 - 1000 / 8
    this.spawnTime = 2500
    this.lineSprite.flashHide = true;
    this.controllerInUse = false;
    // 1/8 of a second flash every half second
  }
  
  update(deltaTime){
    this.bulletTimeCheck += deltaTime

    if (this.bulletTimeCheck >= this.bulletInterval && !this.spawning && this.controlsPointing && !this.dontShoot) {
      this.bulletNumber += 1;
      this.bulletTimeCheck = 0;
      this.fireBullet();
    } 

    if (this.spawning){

      this.spawningTime += deltaTime
      if (this.flashing) {
        this.flashingTime += deltaTime
        if (this.flashingTime > this.flashTime) {
          this.flashingTime = 0
          this.flashing = false
          this.lineSprite.flashHide = false
        } 
      } else {
        this.flashIntervalTime += deltaTime
        if (this.flashIntervalTime > this.flashInterval) {
          this.flashIntervalTime = 0
          this.flashing = true
          this.lineSprite.flashHide = true;
        } 
      }

      if (this.spawningTime > this.spawnTime) {
        this.spawning = false
        this.flashing = false
        this.lineSprite.flashHide = false
        this.spawningTime = 0;
        this.flashIntervalTime = 0;
        this.flashingTime = 0;
      }
      
    }

    // this.moveInControllerDirection(deltaTime)

    if (this.isOutOfBounds()) {
      this.wallGraze();
    } else {
      this.movementMechanics(deltaTime)
      // ship camera stuffs
      
    }
    // if ship is out of x bounds, maintain y speed, keep x at edge value

    this.updateZoomScale()

    this.gameEngine.ctx.restore()
    this.gameEngine.ctx.save()
    let shipXPos = this.transform.pos[0]
    let shipYPos = this.transform.pos[1]
    let zoomScale = this.gameEngine.zoomScale
    let width = this.gameEngine.gameScript.DIM_X
    let height = this.gameEngine.gameScript.DIM_Y

    this.gameEngine.ctx.translate(
      -shipXPos * zoomScale + width / 2,
      -shipYPos * zoomScale + height / 2
    )
  }

  upgradeBullets() {
    if (this.powerLevel != 2) {
      this.powerLevel = 2
      this.playSound(this.upgradeBulletsSound)
    }
  }
  
  findSmallestDistanceToAWall(){
    let pos = this.transform.pos
    let leftDistance = pos[0] - 0
    let rightDistance = this.gameEngine.gameScript.DIM_X - pos[0]
    let upDistance = pos[1] - 0
    let downDistance = this.gameEngine.gameScript.DIM_Y - pos[1]
    let distances = [leftDistance, rightDistance, upDistance, downDistance]
    return Math.min.apply(null, distances) 
  }

  updateZoomScale(){
    let distanceToZoomChange = 100
    let smallestZoomScale = 0.75 // of the origional zoomscale
    let smallest = this.findSmallestDistanceToAWall()
    if (smallest < distanceToZoomChange) {
      this.gameEngine.zoomScale = this.gameEngine.defaultZoomScale * (smallest / distanceToZoomChange * (1 - smallestZoomScale) + smallestZoomScale)
    } else {
      this.gameEngine.zoomScale = this.gameEngine.defaultZoomScale
    }
  }

  // 
  calcControlsDirection(){
    
    this.controlsDirection = [0,0]
    this.keysPressed.forEach((key) => {
      this.controlsDirection[0] += Ship.MOVES[key][0]
      this.controlsDirection[1] += Ship.MOVES[key][1]
    })
  }

  movementMechanics(deltaTime) {
    // get dV
    //    mV => max speed in the direction of the controller
    //    Vo => current velocity
    //    dV~ =  mV - Vo
    // if dv~ > 0.2 (or something)
    //    a = ma~ 
    if (!this.controllerInUse) {
      this.calcControlsDirection()
    }

    let movementAngle = Math.atan2(this.controlsDirection[1], this.controlsDirection[0])
    let Vo = this.transform.absoluteVelocity()
    let mV = []

    if(this.controlsDirection[0] == 0 && this.controlsDirection[1] == 0){
      mV = [0, 0]
    } else {
      mV = [this.maxSpeed * Math.cos(movementAngle), this.maxSpeed * Math.sin(movementAngle)]
      this.transform.angle = movementAngle
    }

    let dV = [mV[0] - Vo[0], mV[1] - Vo[1]]
    let alpha = Math.atan2(dV[1], dV[0])

    this.transform.acc[0] += this.shipEngineAcceleration * Math.cos(alpha)
    this.transform.acc[1] += this.shipEngineAcceleration * Math.sin(alpha)
  }

  isOutOfBounds(){
    return this.gameEngine.gameScript.isOutOfBounds(this.transform.pos, this.radius)
  }

  updateMousePos(mousePos){
    this.setFireAngle(mousePos)
  }

  updateRightControlStickInput(vector) {
    if (Math.abs(vector[0]) + Math.abs(vector[1]) > 0.10) {
      this.dontShoot = false
      this.fireAngle = Math.atan2(vector[1], vector[0])
    } else {
      this.dontShoot = true
    }
  }

  updateLeftControlStickInput(key, down = true) {
    if(typeof key === "string"){
      // accelerates to V = [0,0] when not pressed
      if (down) {
        if (!this.keysPressed.includes(key)) {
          this.keysPressed.push(key)
        }

        // this.controlsDirection[0] += unitVector[0]
        // this.controlsDirection[1] += unitVector[1]
      } else {
        if (this.keysPressed.includes(key)) {
          this.keysPressed.splice(this.keysPressed.indexOf(key), 1)
        }

        // this.controlsDirection[0] -= unitVector[0]
        // this.controlsDirection[1] -= initVector[1]
      }
    } else {
      this.controllerInUse = true
      if (Math.abs(key[0]) + Math.abs(key[1]) > 0.10) {
        this.controlsDirection = key
      } else {
        this.controlsDirection = [0,0]
      }
    }
  } 
 // Refactor into game engine and game script
  updateStartButtonListener(key, down){
    if (typeof key === "string"){
      if(down){
        if(this.pauseKeyedUp){
          this.pauseKeyedUp = false
          if (this.gameEngine.paused && !this.gameEngine.muted) {
            this.gameEngine.gameScript.theme.play()
          }
          this.gameEngine.togglePause()
        }
      } else {
        this.pauseKeyedUp = true
      }
    } else if(key[0]) {
      if (this.pauseKeyedUp){
        this.pauseKeyedUp = false
        if (this.gameEngine.paused && !this.gameEngine.muted) {
          this.gameEngine.gameScript.theme.play()
        }
        this.gameEngine.togglePause()
      }
    } else {
      this.pauseKeyedUp = true
    }
  }

  wallGraze() {
    this.gameEngine.gameScript.wallGraze(this.transform, this.radius * 2)
  }

  onCollision(collider, type) {
    if (type === "ShipDeath") {
  
      this.gameEngine.gameScript.death()
      this.deathflash()
    }
  }

  deathflash() {
    this.spawning = true;
    this.flashing = true;
  }

  setFireAngle(mousePos) {
    
    if (mousePos === undefined){
      mousePos = this.mousePos;
    } else {
      this.mousePos = mousePos
    }
    let shipXPos = this.transform.pos[0]
    let shipYPos = this.transform.pos[1]
    let zoomScale = this.gameEngine.zoomScale
    let width = this.gameEngine.gameScript.DIM_X
    let height = this.gameEngine.gameScript.DIM_Y

    let mouseX = mousePos[0] / zoomScale + shipXPos  - width / (2 * zoomScale)
    let mouseY = mousePos[1] / zoomScale + shipYPos  - height / (2 * zoomScale)
    // SCALE NUMBER
    let dy =  mouseY - this.transform.pos[1];
    let dx =  mouseX - this.transform.pos[0];
    this.fireAngle =  Math.atan2(dy, dx)
  }

  fireBullet() {
    
    this.gameEngine.queueSound(this.bulletSound)
    let shipvx = this.transform.vel[0];
    let shipvy = this.transform.vel[1];

    let relBulletVelX1 = Bullet.SPEED * Math.cos(this.fireAngle);
    let relBulletVelY1 = Bullet.SPEED * Math.sin(this.fireAngle);

    const bulletVel1 = [shipvx + relBulletVelX1, shipvy + relBulletVelY1];
    this.addChildGameObject(new Bullet(this.gameEngine, this.transform.pos, bulletVel1, this.bulletNumber))

    if (this.powerLevel === 2) {

      let relBulletVelX2 = (Bullet.SPEED - 0.5) * Math.cos(this.fireAngle + Math.PI / 32);
      let relBulletVelY2 = (Bullet.SPEED - 0.5) * Math.sin(this.fireAngle + Math.PI / 32);
      let relBulletVelX3 = (Bullet.SPEED - 0.5) * Math.cos(this.fireAngle - Math.PI / 32);
      let relBulletVelY3 = (Bullet.SPEED - 0.5) * Math.sin(this.fireAngle - Math.PI / 32);

      const bulletVel2 = [shipvx + relBulletVelX2, shipvy + relBulletVelY2];
      const bulletVel3 = [shipvx + relBulletVelX3, shipvy + relBulletVelY3];
      // doesn't support parent transformations... yet
      this.addChildGameObject(new Bullet(this.gameEngine, this.transform.pos, bulletVel2))
      this.addChildGameObject(new Bullet(this.gameEngine, this.transform.pos, bulletVel3))
    }
  }


  // implement threshold so it's not too sensitive

  

  relocate() {
    // this.GameScript.die();
    // this.transform.pos = this.game.randomPosition();
    // this.vel = [0, 0];
    // this.acc = [0, 0];
  }
}

module.exports = Ship;
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

Ship.MOVES = {
  s: [0, 1],
  a: [-1, 0],
  w: [0, -1],
  d: [1, 0],
}

/***/ }),

/***/ "./lib/game_objects/ship/ship_sprite.js":
/*!**********************************************!*\
  !*** ./lib/game_objects/ship/ship_sprite.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const LineSprite = __webpack_require__(/*! ../../game_engine/line_sprite */ "./lib/game_engine/line_sprite.js")

class ShipSprite extends LineSprite {
  constructor(transform, spawningScale = 1) {
    super(transform)
    this.spawningScale = spawningScale
    this.flashHide = false
  }

  draw(ctx) {
    if (this.flashHide) {
      
    } else {
      let pos = this.transform.absolutePosition()
      let shipWidth = 10
      let vel = this.transform.absoluteVelocity()
      // let movementDirection = Math.atan2(vel[0], -vel[1])
      ctx.save();
      ctx.beginPath();
      ctx.translate(pos[0], pos[1]);
      ctx.rotate(this.transform.angle + Math.PI / 4);
      ctx.translate(-shipWidth / 2, shipWidth / 2);

      ctx.strokeStyle = "#ffffff";
      let r = 255;
      let g = 255;
      let b = 255;

      let blurFactor = 0.5
      ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
      ctx.shadowBlur = 10 * blurFactor * blurFactor
      ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.1)";
      ctx.lineWidth = 7.5 * blurFactor * blurFactor
      ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.1)";
      this.drawShip(ctx, shipWidth)
      ctx.lineWidth = 6 * blurFactor
      ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.1)";
      this.drawShip(ctx, shipWidth)
      ctx.lineWidth = 4.5;
      this.drawShip(ctx, shipWidth)
      ctx.lineWidth = 3;
      this.drawShip(ctx, shipWidth)
      ctx.strokeStyle = 'rgb(255, 255, 255)';
      ctx.lineWidth = 1.5;
      this.drawShip(ctx, shipWidth)

      ctx.restore();
    }
    
  }

  drawShip(ctx, shipWidth) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -shipWidth);
    ctx.lineTo(2 / 3 * shipWidth, -(1 + 1 / 6) * shipWidth); //1
    ctx.lineTo(1 / 3 * shipWidth, -5 / 6 * shipWidth) // 2
    ctx.lineTo(1 / 3 * shipWidth, -1 / 3 * shipWidth) // 2.5
    ctx.lineTo(5 / 6 * shipWidth, -1 / 3 * shipWidth) // 3
    ctx.lineTo((1 + 1 / 6) * shipWidth, -2 / 3 * shipWidth) // 4
    ctx.lineTo(shipWidth, 0) // 5
    ctx.closePath();
    ctx.stroke();
  }
}

module.exports = ShipSprite;

/***/ }),

/***/ "./lib/game_script.js":
/*!****************************!*\
  !*** ./lib/game_script.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Ship = __webpack_require__(/*! ./game_objects/ship/ship */ "./lib/game_objects/ship/ship.js");
const Walls = __webpack_require__(/*! ./game_objects/Walls/walls */ "./lib/game_objects/Walls/walls.js")
const Overlay = __webpack_require__(/*! ./game_objects/Overlay/overlay */ "./lib/game_objects/Overlay/overlay.js")
const Grid = __webpack_require__(/*! ./game_objects/particles/Grid/grid */ "./lib/game_objects/particles/Grid/grid.js")
const BoxBox = __webpack_require__(/*! ./game_objects/enemies/BoxBox/boxbox */ "./lib/game_objects/enemies/BoxBox/boxbox.js");
const Pinwheel = __webpack_require__(/*! ./game_objects/enemies/Pinwheel/pinwheel */ "./lib/game_objects/enemies/Pinwheel/pinwheel.js");
const Arrow = __webpack_require__(/*! ./game_objects/enemies/Arrow/arrow */ "./lib/game_objects/enemies/Arrow/arrow.js");
const Grunt = __webpack_require__(/*! ./game_objects/enemies/Grunt/grunt */ "./lib/game_objects/enemies/Grunt/grunt.js");
const Weaver = __webpack_require__(/*! ./game_objects/enemies/Weaver/weaver */ "./lib/game_objects/enemies/Weaver/weaver.js");
const Singularity = __webpack_require__(/*! ./game_objects/enemies/Singularity/singularity */ "./lib/game_objects/enemies/Singularity/singularity.js");
const AlienShip = __webpack_require__(/*! ./game_objects/enemies/Singularity/alien_ship */ "./lib/game_objects/enemies/Singularity/alien_ship.js")
const ParticleExplosion = __webpack_require__(/*! ./game_objects/particles/particle_explosion */ "./lib/game_objects/particles/particle_explosion.js")
const ShipExplosion = __webpack_require__(/*! ./game_objects/particles/ship_explosion */ "./lib/game_objects/particles/ship_explosion.js")

const Util = __webpack_require__(/*! ./game_engine/util */ "./lib/game_engine/util.js");
const Sound = __webpack_require__(/*! ./game_engine/sound */ "./lib/game_engine/sound.js")
const StateMachine = __webpack_require__(/*! ./game_engine/state_machine */ "./lib/game_engine/state_machine.js")

class GameScript {
  constructor(engine) {
    this.theme = new Sound("GEOWars/sounds/Geometry_OST.mp3", 1)
    this.gameOverSound = new Sound("GEOWars/sounds/Game_over.wav")
    this.gameStartSound = new Sound("GEOWars/sounds/Game_start.wav")
    this.shipDeathSound = new Sound("GEOWars/sounds/Ship_explode.wav")
    this.DIM_X = 1000;
    this.DIM_Y = 600;
    this.BG_COLOR = "#000000";
    this.gameTime = 0;
    this.score = 0;
    this.engine = engine
    this.arrowAdded = false
    this.startPosition = [500,300]
    this.ship = this.createShip();
    this.walls = this.createWalls();
    this.grid = this.createGrid();
    this.overlay = this.createOverlay();
    this.enemyCreatorList = this.createEnemyCreatorList()
    this.engine.addxButtonListener(this)
    this.aliveEnemies = [];
    this.sequenceTypes = this.addSequenceTypes()
    this.spawnStateMachine = this.createSpawnStateMachine()
    this.deathPausedTime = 0;
    this.deathPaused = true;
    this.deathPauseTime = 2500;
    // this.deathSound = new Audio("GEOWars/sounds/Enemy_explode.wav")
    // this.deathSound.volume = 0.5;
    
    this.intervalTiming = 1;
    this.intervalTime = 0;
    this.hugeSequenceTime = 0;
    this.sequenceCount = 0;
    this.lives = 3;
    this.soundsToPlay = {}
    this.scoreMultiplier = 1

    this.spawnthing = false;
    this.explosionColorWheel = 0;
  }

  updatexButtonListener(xButton) {
    if(xButton[0]){

      if(this.engine.paused){
        var modal = document.getElementById('endModal');

        modal.style.display = "none";
        this.engine.paused = false;
        if (!this.engine.muted) {
          this.engine.gameScript.theme.play()
        }
      }
    }
  }

  update(deltaTime) {

    this.spawnSequence(deltaTime)
    this.changeExplosionColor()
  }

  changeExplosionColor() {
    this.explosionColorWheel += 1 / 2
    this.explosionColorWheel = this.explosionColorWheel % 360
  }

  tallyScore(gameObject) {
    this.score += gameObject.points * this.scoreMultiplier
    if (this.score){
    }
  }

  resetGame() {
    this.deathPaused = true
    this.desplayEndScore = this.score
    this.score = 0
    this.lives = 3
    this.ship.transform.pos = this.startPosition
    this.sequenceCount = 0
    this.deathPauseTime = 2500;
    this.ship.powerLevel = 1;
    this.intervalTiming = 1;
    this.intervalTime = 0;
    this.hugeSequenceTime = 0;
    this.lives = 3;
    this.scoreMultiplier = 1
    this.spawnthing = false;
    this.engine.paused = true;
    var modal = document.getElementById('endModal');
    modal.style.display = "block";
    var scoreDisplay = document.getElementById('score');
    scoreDisplay.innerHTML = `score: ${this.desplayEndScore}`;


    // Get the button that opens the modal
    // var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var xclose = document.getElementsByClassName("endClose")[0];

    // When the user clicks on <span> (x), close the modal
    xclose.onclick = (e) => {
      e.stopPropagation()
      modal.style.display = "none";
      this.engine.paused = false;
      window.removeEventListener('click', closeModalWithClick, false)
      if (!this.engine.muted) {
        this.engine.gameScript.theme.play()
        this.engine.gameScript.gameStartSound.play()
      }
    }

    let closeModalWithClick = (e) => {
      if (event.target == modal) {
        this.engine.paused = false;
        if (!this.engine.muted) {
          this.engine.gameScript.theme.play()
          this.engine.gameScript.gameStartSound.play()
        }
        modal.style.display = "none";
        window.removeEventListener('click', closeModalWithClick, false)
      }
    }

    // When the user clicks anywhere outside of the modal, close it
     window.addEventListener('click', closeModalWithClick, false)

  }

  death() { 

    this.lives -= 1
    this.deathPaused = true
    this.explodeEverything()
    this.deathPauseTime = 4000;
    if (!this.engine.muted) {
      this.engine.gameScript.shipDeathSound.play()
    }
    this.grid.Playerdies(this.ship.transform.absolutePosition())
    if(this.lives === 0){
      try {
        this.theme.pause()

      } catch(err) {

      }
      if (!this.engine.muted) {
        this.engine.gameScript.gameOverSound.play()
      }
      // this.playSoundthis.gameOverSound
      window.setTimeout(this.resetGame.bind(this), 2000)
    }

  }

  gameOver() {
    // end the game here
  }

  explodeEverything(){
    let removeList = []
    let typesToRemove = ["Grunt", "Pinwheel", "BoxBox", "Arrow", "Singularity", "Weaver", "AlienShip"]
    this.engine.gameObjects.forEach((object) => {
      if (object.constructor.name === "Ship") {
        let objectTransform = object.transform
        let pos = objectTransform.absolutePosition()
        let explosion = new ShipExplosion(this.engine, pos, [0,0])
      } else if (object.constructor.name === "Bullet") {
        removeList.push(object)
      }
      else if (typesToRemove.includes(object.constructor.name)) {
        let objectTransform = object.transform
        let pos = objectTransform.absolutePosition()
        let vel = objectTransform.absoluteVelocity()
        let explosion = new ParticleExplosion(this.engine, pos, vel)
        removeList.push(object)
      }
    })
    removeList.forEach((removeThis) => {
      removeThis.remove()
    })

  }

  onPause(){
    try {
      this.theme.pause()
    } catch (error) {
    }
    
    var modal = document.getElementById('pauseModal');
    modal.style.display = "block";
  }

  onUnPause(){
    try {
      this.theme.unPause()
    } catch (error) {}
    
    var modal = document.getElementById('pauseModal');
    modal.style.display = "none";
  }

  randomArrowDirection() {
    let angles = [0, Math.PI / 2, Math.PI, Math.PI * 3 / 2]
    return angles[Math.floor(Math.random() * angles.length) % angles.length]
  }

  createEnemyCreatorList() {
    let engine = this.engine 
    return {
      BoxBox:      (pos)        => (new BoxBox(engine, pos)),
      Pinwheel:    (pos)        => (new Pinwheel(engine, pos)),
      Arrow:       (pos, angle) => (new Arrow(engine, pos, angle)),
      Grunt:       (pos)        => (new Grunt(engine, pos, this.ship.transform)),
      Weaver:      (pos)        => (new Weaver(engine, pos, this.ship.transform)),
      Singularity: (pos)        => (new Singularity(engine, pos)),
      AlienShip:   (pos)        => (new AlienShip(engine, pos, [0,0], this.ship.transform)),
    };
  }



  randomSpawnEnemy(enemy) {
    let pos = this.randomPosition();
    let enemyCreators = Object.values(this.enemyCreatorList)
    enemyCreators[Math.floor(Math.random() * enemyCreators.length) % enemyCreators.length](pos);
    // this.enemyCreatorList["BoxBox"](pos)
  }

  addSequenceTypes() {
    return {
      Singularity: () => {
        this.enemyCreatorList["Singularity"]([700, 300])
      },
      EasyGroups: () => {
        let randomPositions = []
        for (let i = 0; i < 5; i++) {
          let pos = this.randomPosition();
          randomPositions.push(pos)
        }
        randomPositions.forEach((pos) => {
          let possibleSpawns = ["BoxBox", "Pinwheel"] //, "Singularity"]
          this.enemyCreatorList[possibleSpawns[Math.floor(Math.random() * possibleSpawns.length) % possibleSpawns.length]](pos)
        })
      },
      EasyGroupsArrows: () => {
        let randomPositions = []
        for (let i = 0; i < 5; i++) {
          let pos = this.randomPosition();
          randomPositions.push(pos)
        }
        randomPositions.forEach((pos) => {
          let possibleSpawns = ["BoxBox", "Pinwheel", "Arrow", "Singularity"]
          this.enemyCreatorList[possibleSpawns[Math.floor(Math.random() * possibleSpawns.length) % possibleSpawns.length]](pos)
        })
      },
      ArrowsAttack: () => {
        let somePositions = [[200,300], [1000, 300], [600, 100]]
        let pos = somePositions[Math.floor(Math.random() * somePositions.length) % somePositions.length]
        for (let i = 0; i < 5; i++) {
          pos[1] += i * 80
          this.enemyCreatorList["Arrow"](pos)
        }
      },
      GruntGroups: () => {
        let randomPos = this.randomPosition();
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
              this.enemyCreatorList["Grunt"]([i * 40 + randomPos[0], j * 40 + randomPos[1]])
          }
        }
      },
      GreenGroups: () => {
        let randomPos = this.randomPosition();
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            this.enemyCreatorList["Weaver"]([i * 40 + randomPos[0], j * 40 + randomPos[1]])
          }
        }
      }

    }
  }

  createSpawnStateMachine(){
    // let events = this.sequenceTypes 
    // let stateIndex = {i: 0}
    // // these are the events
    // // times will be hard coded for each state in the queue
    // let spawnQueue = []
    // let singularityState = new StateMachine(this.engine, {stateIndex, event: events.Singularity})
    // let easyGroupsState = new StateMachine(this.engine, undefined)
  }

  randomPosition() {
    return [
      this.DIM_X * 0.70 * Math.random(),
      this.DIM_Y * 0.70 * Math.random(),
      // 500,300
    ];
  }

  spawnSequence(delta) {

    if (this.deathPaused) {
      this.deathPausedTime += delta
      if (this.deathPausedTime > this.deathPauseTime){
        this.deathPausedTime = 0
        this.deathPaused = false
      }
    } else {
      this.intervalTime += delta;
    }




    this.testing = false
    if (this.testing) {
      if (this.sequenceCount === 0){
        this.enemyCreatorList["AlienShip"]([500,100])
        this.sequenceCount += 1
      }
    } else {
      
    
    this.gameTime += delta;
    if(this.sequenceCount === 1) {
      this.enemyCreatorList["Singularity"]([700,300])
      this.sequenceCount += 1
    }
                                   // wait time              //parentIndex   // repeat count
    if (this.intervalTime > (2500 * this.intervalTiming) && this.sequenceCount < 5) {
      this.intervalTime = 0;
      this.sequenceTypes["EasyGroups"]() // event
      // this.randomSpawnEnemy();
      this.sequenceCount += 1

    } else if ( this.sequenceCount === 5 && this.intervalTime > 5000 ) {
      this.sequenceCount += 1
    } else if (this.intervalTime > (2500 * this.intervalTiming) && this.sequenceCount > 5 && this.sequenceCount < 10) {
      this.sequenceCount += 1
      this.intervalTime = 0;
      this.sequenceTypes["EasyGroupsArrows"]()
    } else if (this.sequenceCount === 10 && this.intervalTime > 5000) {
      this.sequenceCount += 1
    } else if (this.intervalTime > (1500 * this.intervalTiming) && this.sequenceCount > 10 && this.sequenceCount < 15) {
      this.sequenceCount += 1;
      this.intervalTime = 0;
      this.sequenceTypes["GruntGroups"]()
    } else if (this.sequenceCount === 15 && this.intervalTime > 2000) {
      this.sequenceCount += 1
    } else if (this.intervalTime > (2000 * this.intervalTiming) && this.sequenceCount > 15 && this.sequenceCount < 20) {
      this.sequenceCount += 1;
      this.intervalTime = 0;
      this.sequenceTypes["GreenGroups"]()
    } else if (this.sequenceCount === 20 && this.intervalTime > 3000) {
      this.sequenceCount += 1
    } 
    // else if (this.intervalTime > (2500 * this.intervalTiming) && this.sequenceCount === 10 && this.hugeSequenceTime % 2 === 1) {
    //   this.intervalTime = 0
    //   this.sequenceCount += 1
    //   let enemies_to_spawn = []
    //   let randomPos = this.randomPosition();
    //   for (let i = 0; i < 2; i++) {
    //     for (let j = 0; j < 2; j++) {
    //       this.enemyCreatorList["Weaver"]([i * 40 + randomPos[0], j * 40 + randomPos[1]])
    //     }
    //   }

    // } else if (this.intervalTime > (5000 * this.intervalTiming) && this.sequenceCount === 11) {
    //   this.intervalTime = 0;
    //   this.sequenceCount += 1;
    //}
    else if (this.intervalTime > 375 && this.sequenceCount > 20 && this.sequenceCount < 30 && this.hugeSequenceTime % 2 === 0) {
        this.ship.upgradeBullets()
        this.intervalTime = 0;
        this.sequenceCount += 1;

      let fourCorners = [
        [40, 40],
        [GameScript.DIM_X - 40, 40],
        [40, GameScript.DIM_Y - 40],
        [GameScript.DIM_X - 40, GameScript.DIM_Y - 40]
      ]
      fourCorners.forEach((corner) => {
        this.enemyCreatorList["Grunt"](corner)
      })
    } else if (this.intervalTime > 375 && this.sequenceCount > 20 && this.sequenceCount < 30 && this.hugeSequenceTime % 2 === 1) {
      this.intervalTime = 0;
      this.sequenceCount += 10;
      let arrowWallPositions = []
      let arrowDirection = Math.PI * 3 / 2 + Math.PI
      for (let i = 40; i < GameScript.DIM_X; i += 40) {
        arrowWallPositions.push([i, 50])
      }

      arrowWallPositions.forEach((position) => {
        this.enemyCreatorList["Arrow"](position, arrowDirection)
      })

    } 
              // this is the spawner event. 
              // it runs through all the child states
              // for the event to be triggered
    else if  (this.sequenceCount >= 30) {
      this.sequenceCount = 0;
      if (!(this.intervalTiming < 0.5)) {
        this.intervalTiming *= 0.9;
      }
      this.hugeSequenceTime += 1;
    }
  
    }




    // if (this.gameTime % 2000 === 0){
    //   this.spawned = false
    // }
  }

  createShip() {
    return new Ship(this.engine, this.startPosition)
  }

  createWalls(){
    return new Walls(this.engine, this)
  }
  
  createGrid(){
    return new Grid(this.engine, this)
  }

  createOverlay(){
    return new Overlay(this.engine, this, this.ship.transform)
  }

  isOutOfBounds(pos, radius) {
    let max = [GameScript.DIM_X - radius, GameScript.DIM_Y - radius]
    if (radius) {
      return(
        (pos[0] <= radius || pos[0] >= max[0]) || 
        (pos[1] <= radius || pos[1] >= max[1]) 
      )
    } else {
      return (pos[0] < 0) || (pos[1] < 0) ||
        (pos[0] > GameScript.DIM_X) || (pos[1] > GameScript.DIM_Y);
    }
    
  }

  updateShipFireAngle() {
    this.ships[0].setFireAngle()
  }

  // bounce(pos){
  //   return [
  //     Util.bounce(pos[0], GameScript.DIM_X), Util.bounce(pos[1], GameScript.DIM_Y)
  //   ];
  // }

  bounce(transform, radius = 0) {
    let max = [this.DIM_X - radius, this.DIM_Y - radius]
    let pos = transform.absolutePosition()
    if (pos[0] <= radius || pos[0] >= max[0]) {
      transform.vel[0] = -transform.vel[0];
    }
    if (pos[1] <= radius || pos[1] >= max[1]) {
      transform.vel[1] = -transform.vel[1];
    }
  }

  wallGraze(transform, radius = 0){
    let max = [this.DIM_X - radius, this.DIM_Y - radius]
    let pos = transform.absolutePosition()
    let vel = transform.absoluteVelocity()

    // X bounds, left right
    if (pos[0] <= radius && vel[0] < 0){
      transform.vel[0] = 0.1;
    } else if (pos[0] >= max[0] && vel[0] > 0){
      transform.vel[0] = -0.1;
    }

    // Y bounds, top bottom
    if(pos[1] <= radius && vel[1] < 0) {
      transform.vel[1] = 0.1
    } else if (pos[1] >= max[1] && vel[1] > 0){
      transform.vel[1] = -0.1
    }

  }

  redirect(transform) {
    let max = [this.DIM_X, this.DIM_Y]
    let pos = transform.absolutePosition()
    
    if (pos[0] <= 0 || pos[0] >= max[0]) {
      if (pos[0] <= 0) {
        pos[0] = 1

        
      }
      if (pos[0] >= max[0]) {
        pos[0] = max[0] - 1

      }
    }
    if (pos[1] <= 0 || pos[1] >= max[1]) {
      if (pos[1] <= 0) {
        pos[1] = 1

      }
      if (pos[1] >= max[1]) {
        pos[1] = max[1] - 1

      }
    }

    transform.vel[0] = -transform.vel[0];
    transform.vel[1] = -transform.vel[1];
  }

}

GameScript.BG_COLOR = "#000000";

GameScript.DIM_X = 1000;
GameScript.DIM_Y = 600;
// GameScript.FPS = 32;
// GameScript.NUM_BOXES = 10;
// GameScript.NUM_PINWHEELS = 0;
// GameScript.NUM_ARROWS = 0;
// GameScript.NUM_GRUNTS = 0;
// GameScript.NUM_WEAVERS = 0;
// GameScript.NUM_SINGULARITIES = 1;
module.exports = GameScript;

GameScript.Spawn1 = {
  BoxBox: 50,
}

GameScript.spawnListList = [
  GameScript.Spawn1
]

/***/ }),

/***/ "./lib/game_view.js":
/*!**************************!*\
  !*** ./lib/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

class GameView {
  constructor(engine, ctx, canvasEl) {
    this.ctx = ctx; 
    this.engine = engine;
    // this.ship = this.game.addShip(); belongs in game script
    this.canvasEl = canvasEl;
    this.initialUnmute = true;
    this.gameStarted = false;
    this.modelClosed = false;
    this.bindKeyboardKeys = this.bindKeyboardKeys.bind(this)
    this.animate = this.animate.bind(this)
  }

  bindKeyboardKeys(){
    window.addEventListener('keydown', this.doKeyEvent(true), true);
    window.addEventListener('keyup', this.doKeyEvent(false), true);
  }

  updateMovementDirection(move, down){
    this.engine.gameScript.ship.updateLeftControlStickInput(move, down);
  }

  /*
    if true, change movement direction to the direction
    if false, remove movement direction if it's the 
    same as the current movement direction
  */

  doKeyEvent(down) {
    return (e) => {
      // if (e.key === "p"){
      //   this.engine.togglePause()
      // }
      if (e.key === "m" && this.initialUnmute) {
        this.initialUnmute = false
        this.engine.gameScript.theme.play()
      }

      if(e.key === "m" && down){
        this.engine.toggleMute()
        if (this.engine.muted){
          this.engine.gameScript.theme.mute()
        } else{
          this.engine.gameScript.theme.unmute()
        }
        
      }

      let unitVector = GameView.MOVES[e.key]
      if (unitVector) {
        this.updateMovementDirection(e.key, down)
      }
      if (e.key === "p") {
        this.engine.updateStartButtonListeners(e.key, down)
      }
    }
  }

  bindKeyHandlers() {
    const engine = this.engine
    // Object.keys(GameView.MOVES).forEach((k) => {
    //   const move = GameView.MOVES[k];
    //   key(k, () => {
    //     this.engine.gameScript.ship.updateLeftControlStickInput(move);
    //   });
    // });

    // key("m", () => {
    //   engine.muted = !engine.muted;
    //   if (engine.muted) {
    //     this.theme.pause();
    //   } else {
    //     this.theme.play();
    //   }
    // })

    window.addEventListener('mousemove', (e) => {
      const x = {x: e.layerX};
      const y = {y: e.layerY};
      const mousePos = [e.layerX, e.layerY];
      this.engine.updateMousePos(mousePos)
      // ship.setFireAngle(mousePos); add to game script event listener thing
    });

    // function preventDefault(e) {
    //   e = e || window.event;
    //   if (e.preventDefault)
    //     e.preventDefault();
    //   e.returnValue = false;
    // }


    // function disableScroll() {
    //   if (window.addEventListener) // older FF
    //     window.addEventListener('DOMMouseScroll', preventDefault, false);
    //   // window.onwheel = preventDefault; // modern standard
    //   // window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    //   // window.ontouchmove = preventDefault; // mobile
    //   // document.onkeydown = preventDefaultForScrollKeys;
    // }

   

    


    // if (window.addEventListener) // older FF
    //   window.addEventListener('DOMMouseScroll', preventDefault, false);
    // window.onwheel = preventDefault; // modern standard
    // window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    // window.ontouchmove = preventDefault; // mobile
   
  }

  end(){
    var endModal = document.getElementById('endModal')
  }

  start() {
    this.lastTime = 0;
    this.bindKeyHandlers();

     // Get the modal
     var modal = document.getElementById('myModal');

     // Get the button that opens the modal
     // var btn = document.getElementById("myBtn");

     // Get the <span> element that closes the modal
     var xclose = document.getElementsByClassName("close")[0];

     // When the user clicks on <span> (x), close the modal
     xclose.onclick = (e) => {
       e.stopPropagation()
       modal.style.display = "none";
       this.modelClosed = true
     }

     // When the user clicks anywhere outside of the modal, close it
    //  window.addEventListener('click', (e) => {
     window.onclick = (event) => {
       if (this.modelClosed && !this.gameStarted) {
         this.gameStarted = true
         this.bindKeyboardKeys()
         requestAnimationFrame(this.animate);
       }
       if (event.target == modal) {
         this.modelClosed = true
         modal.style.display = "none";
       }
     }
  }
  
  animate(time) {
    const timeDelta = time - this.lastTime;
    this.engine.tick(timeDelta, this.ctx);
    this.lastTime = time;
    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

const KEYMAP = {
  87: "W",
  82: "R",
  90: "Z",
  88: "X",
  67: "C",
  70: "F",
  83: "S",
  69: "E",
  65: "D",
  68: "A",
}

GameView.MOVES = {
  s: [0,1],
  a: [-1,0],
  w: [0,-1],
  d: [1,0],
}

module.exports = GameView;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map