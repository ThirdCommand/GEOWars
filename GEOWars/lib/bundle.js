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
    const centerDist = Util.dist(this.gameObject.transform.absolutePosition(), otherCollider.gameObject.transform.absolutePosition());
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
const Sound = __webpack_require__(/*! ./sound */ "./lib/game_engine/sound.js")
// const Transform = require("./transform")
const Util = __webpack_require__(/*! ./util */ "./lib/game_engine/util.js")

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
    this.checkCollisions()
    this.movePhysicsComponents(delta)
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

  updateLeftControlStickInput(direction){

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

  update() {
    // overwritten by child class for update scripts
  }

  onCollision(objectType){
    // overwritten by child class for handler
  }

  // remove is the issue
  // i need a remove queue!!!
  // ... I think
  remove() {
    this.childObjects.forEach((obj) => {
      this.gameEngine.remove(obj)
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
    // this.drawFunction = draw
    this.transform = transform 
  }

  draw(ctx) {
    pos = this.transform.absolutePosition()
    angle = this.transform.abosluteAngle()
    this.drawFunction(ctx, pos, angle)
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
    // velocity of object is how far it should move in 1/60th of a second or something
    const timeScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    this.transform.pos[0] += this.transform.vel[0] * timeScale + this.transform.acc[0] * (timeScale * timeScale) / 2;
    this.transform.pos[1] += this.transform.vel[1] * timeScale + this.transform.acc[1] * (timeScale * timeScale) / 2;
    this.transform.vel[0] += this.transform.acc[0] * timeScale;
    this.transform.vel[1] += this.transform.acc[1] * timeScale;

    this.transform.acc = [0, 0];

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
  constructor(url, volume = 1){
    this.url = url;
    this.volume = volume;
  }

  play() {
    this.sound = new Audio(this.url);
    this.sound.volume = this.volume;
    this.sound.play();
  }
}

module.exports = Sound;

/***/ }),

/***/ "./lib/game_engine/transform.js":
/*!**************************************!*\
  !*** ./lib/game_engine/transform.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(/*! ./util */ "./lib/game_engine/util.js");
class Transform {
  constructor(pos = [0,0], vel = [0,0], acc = [0,0], angle = 0, parentTransform = null){
    this.parentTransform = parentTransform
    this.angle = angle
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
  }

  addExplosionCollider(){
    let subscribers = ["Grunt", "Pinwheel", "BoxBox", "Arrow", "Singularity", "Weaver"]
    this.addCollider("bulletHit", this, this.radius, subscribers, ["General"])
    this.addCollider("General", this, 3)
  }

  update(deltaTime){
    
    if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition()) && !this.exploded) {
      this.exploded = true
      new BulletWallExplosion(this.gameEngine, this.transform.pos)

      this.gameEngine.queueSound(this.wallhit)
      this.remove();
    }
  }

  onCollision(collider, type){
    if (type === "bulletHit") {
      let hitObjectTransform = collider.gameObject.transform
      let pos = hitObjectTransform.absolutePosition() 
      let vel = hitObjectTransform.absoluteVelocity()
      let explosion = new ParticleExplosion(this.gameEngine, pos, vel)
      collider.gameObject.remove()
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
    this.transform.vel = Util.vectorCartisian(this.transform.angle, this.speed);
    
    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_purple.wav", 0.5);
    this.playSound(this.spawnSound)
    this.addLineSprite(new ArrowSprite(this.transform))
    this.addChildGameObject(new EnemySpawn(this.gameEngine))
    this.exists = false
  }
  
  exist(){
    // leaving off subscriptions means that things will subscribe to it
    this.addCollider("General", this, 3)
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
    this.radius = 3
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
    if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition())) {
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

      if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition())) {
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
    this.transform.pos = pos
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

    if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition())) {
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

/***/ "./lib/game_objects/enemies/Singularity/singularity.js":
/*!*************************************************************!*\
  !*** ./lib/game_objects/enemies/Singularity/singularity.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameObject = __webpack_require__(/*! ../../../game_engine/game_object */ "./lib/game_engine/game_object.js")
const Sound = __webpack_require__(/*! ../../../game_engine/sound */ "./lib/game_engine/sound.js")
const Util = __webpack_require__(/*! ../../../game_engine/util */ "./lib/game_engine/util.js")

const EnemySpawn = __webpack_require__(/*! ../../particles/enemy_spawn */ "./lib/game_objects/particles/enemy_spawn.js")
const SingularitySprite = __webpack_require__(/*! ./singularity_sprite */ "./lib/game_objects/enemies/Singularity/singularity_sprite.js")

class Singularity extends GameObject {
  constructor(engine, pos) {
    super(engine)
    this.transform.pos = pos;
    this.existTime = 0;
    this.gravityWellSize = 500;
    this.gravityConstant = 1000 * 0.5;
    this.radius = 15

    // this.id = options.id
    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_red.wav", 1);
    this.playSound(this.spawnSound)

    this.increasing = true
    this.addLineSprite(new SingularitySprite(this.transform))
    this.addChildGameObject(new EnemySpawn(this.gameEngine))

    this.lineSprite.throbbingScale = 1
  }

  exist() {
    // leaving off subscriptions means that things will subscribe to it
    this.addCollider("General", this, this.radius)
    this.addCollider("GravityWell", this, this.gravityWellSize, ["Grunt", "Pinwheel", "Bullet", "Ship", "BoxBox", "Arrow", "Singularity", "Weaver", "Particle"], ["General"])
    // this.addCollider("GravityAbsorb", this, this.radius, ["Grunt", "Pinwheel", "Bullet", "Ship", "BoxBox", "Arrow", "Singularity", "Weaver"], ["General"])
    // now it will move
    this.addPhysicsComponent()
    this.lineSprite.spawned = true
  }

  onCollision(collider, type){
    if (type === "GravityWell"){
      this.influenceAcceleration(collider.gameObject)
    }
  }

  wallGraze() {
    this.gameEngine.gameScript.wallGraze(this.transform, this.radius)
  }
  

  update(deltaTime) {
    if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition())) {
      this.wallGraze()
    }

    this.throb(deltaTime)
  }

  throb(timeDelta) {
    this.existTime += timeDelta;

    let cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let cycleSpeed = 0.025;
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
      object.transform.acc = [0,0];
    } else {
      let accContribution= [
        unitVector[0] * this.gravityConstant / (r * r),
        unitVector[1] * this.gravityConstant / (r * r)
      ]
      object.transform.acc[0] += accContribution[0];
      object.transform.acc[1] += accContribution[1];
    }
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
    ctx.shadowBlur = 10
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
    this.transform.pos[1] = pos[0]
    this.speed = 2;
    this.shipTransform = shipTransform
    this.weaverCloseHitBox = 35;
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
    this.addCollider("General", this, 3)
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
      let speed = 2
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
  
      if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition())) {
        this.gameEngine.gameScript.bounce(this.transform) 
      }
    }
    
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
    ctx.shadowBlur = 10 * blurFactor
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
    ctx.lineWidth = 7.5
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
    this.drawWeaver(ctx, s)
    ctx.lineWidth = 6
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.6)";
    this.drawWeaver(ctx, s)
    ctx.lineWidth = 4.5;
    this.drawWeaver(ctx, s)
    ctx.lineWidth = 3;
    this.drawWeaver(ctx, s)
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
const ParticleSprite = __webpack_require__(/*! ./particle_sprite */ "./lib/game_objects/particles/Particle/particle_sprite.js")

const Util = __webpack_require__(/*! ../../../game_engine/util */ "./lib/game_engine/util.js")
const GameObject = __webpack_require__(/*! ../../../game_engine/game_object */ "./lib/game_engine/game_object.js")


class Particle extends GameObject{
  constructor(engine, pos, initialSpeed, colors) {
    super(engine)

    this.transform.pos[0] = pos[0]
    this.transform.pos[1] = pos[1]

    this.color = colors[Math.floor(colors.length * Math.random())];
    this.movementAngle = Math.random() * Math.PI * 2;
    this.transform.vel = Util.vectorCartisian(this.movementAngle, initialSpeed)
    this.explosionDeceleration = 0.1; // in the direction the particle is moving
    this.transform.acc = [-this.explosionDeceleration * Math.cos(this.movementAngle), -this.explosionDeceleration * Math.sin(this.movementAngle)]
    this.opacity = Math.random() * 0.5 + 0.5;
    this.hue = Math.random() * 0.3 + 0.6;

    this.addLineSprite(new ParticleSprite(this.transform, this.color, this.hue))
    this.addPhysicsComponent()
    this.addCollider("General", this, 3)

  }

  rand(max, min, _int) {
    var max = (max === 0 || max) ? max : 1,
      min = min || 0,
      gen = min + (max - min) * Math.random();

    return (_int) ? Math.round(gen) : gen;
  };

  update(deltaTime){
    this.rectLength -= 0.25;
    this.hue -= 0.01;
    if (this.hue < 0.1 || this.rectLength < 0.25 || ((Math.abs(this.transform.vel[0]) + Math.abs(this.transform.vel[1])) < 0.25)) {
      this.remove();
    }
    // acc is influenced by singularities, then changed to usual acc
    this.movementAngle = Math.atan2(this.transform.vel[1], this.transform.vel[0])
    this.transform.acc = [-this.explosionDeceleration * Math.cos(this.movementAngle), -this.explosionDeceleration * Math.sin(this.movementAngle)]
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
  constructor(transform, color, hue) {
    super(transform)
    // this.spawningScale = spawningScale
    this.rectLength = 15;
    this.rectWidth = 2;
    this.color = color
    this.hue = hue
  }

  draw(ctx) {
    let pos = this.transform.absolutePosition();
    let vel = this.transform.absoluteVelocity();
    let l = 15;
    let w = 5;
    let movementDirection = Math.atan2(vel[0], -vel[1])

    ctx.save();
    ctx.beginPath();
    ctx.translate(pos[0], pos[1]);
    ctx.rotate(movementDirection + 2 * Math.PI);

    ctx.beginPath();
    ctx.strokeStyle = `${this.color},${this.hue})`;
    ctx.lineWidth = this.rectWidth;

    ctx.moveTo(0, 0); //1
    ctx.lineTo(0, this.rectLength); //2

    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}

module.exports = ParticleSprite;

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

const speeds = [1, 2, 3, 4];

class BulletWallExplosion extends GameObject{
  constructor(engine, pos) {
    super(engine)
    this.transform.pos[0] = pos[0]
    this.transform.pos[1] = pos[1]
    this.COLORS = [
      ["rgba(152,245,23", "rgba(126,185,43", "rgba(189,236,122", "rgba(103,124,74"],
      ["rgba(255,241,44", "rgba(245,236,109", "rgba(165,160,87", "rgba(177,167,28"],
      ["rgba(18,225,252", "rgba(60,198,216", "rgba(113,223,238", "rgba(149,220,230"],
      ["rgba(252,87,224", "rgba(204,72,182", "rgba(170,72,154", "rgba(250,137,231"],
      ["rgba(190,86,250", "rgba(159,96,196", "rgba(87,17,128", "rgba(199,150,228"]
    ]
    this.color = this.COLORS[Math.floor(Math.random() * this.COLORS.length)]
    this.particleNum = 20;
    let bulletWallHit = new Sound("GEOWars/sounds/bullet_hitwall.wav", 0.2)
    this.playSound(bulletWallHit)
    this.createParticles()
  }

  createParticles(){
    for (var i = 0; i < this.particleNum; i++) {
      const speed = speeds[Math.floor(Math.random() * speeds.length)]
      this.addChildGameObject(new Particle(this.gameEngine, this.transform.absolutePosition(), speed, this.color));
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

class ParticleExplosion extends GameObject{
  constructor(engine, pos){
    super(engine)
    this.transform.pos[0] = pos[0]
    this.transform.pos[1] = pos[1]
    this.COLORS = [
      ["rgba(152,245,23", "rgba(126,185,43", "rgba(189,236,122", "rgba(103,124,74"],
      ["rgba(255,241,44", "rgba(245,236,109", "rgba(165,160,87", "rgba(177,167,28"],
      ["rgba(18,225,252", "rgba(60,198,216", "rgba(113,223,238", "rgba(149,220,230"],
      ["rgba(252,87,224", "rgba(204,72,182", "rgba(170,72,154", "rgba(250,137,231"],
      ["rgba(190,86,250", "rgba(159,96,196", "rgba(87,17,128", "rgba(199,150,228"]
    ]
    this.color = this.COLORS[Math.floor(Math.random() * this.COLORS.length)]
    this.particleNum = 80;
    let explosionSound = new Sound("GEOWars/sounds/Enemy_explode.wav", 0.5)
    this.playSound(explosionSound)
    this.createExplosionParticles()
  }

  createExplosionParticles(){
    for (var i = 0; i < this.particleNum; i++) {
      const speed = Math.random() * 3 + 4
      // const speed = speeds[Math.floor(Math.random() * speeds.length)]
      // making the position relative to the world instead of explosion
      this.addChildGameObject(new Particle(this.gameEngine, this.transform.absolutePosition(), speed, this.color));
    }
  }

  update(){
    if(this.childObjects.length === 0){
      this.remove()
    }
  }
    // ANIMATION = requestAnimationFrame(drawScene);
}




module.exports = ParticleExplosion;

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

const Bullet = __webpack_require__(/*! ../Bullet/bullet */ "./lib/game_objects/Bullet/bullet.js");
const ShipSprite = __webpack_require__(/*! ./ship_sprite */ "./lib/game_objects/ship/ship_sprite.js")

class Ship extends GameObject {
  constructor(engine, pos) { 
    super(engine);
    this.transform.pos = pos
    this.addPhysicsComponent()
    this.addMousePosListener()
    this.addLeftControlStickListener()
    this.radius = 5
    this.addCollider("General", this, this.radius)
    this.addLineSprite(new ShipSprite(this.transform))
    this.maxSpeed = 2.5;
    this.mousePos = [0,0];
    this.fireAngle = 0;
    this.bulletSound = new Sound("GEOWars/sounds/Fire_normal.wav", 0.2);
    this.bulletTimeCheck = 0;
    this.bulletInterval = 120;
    this.controlsDirection = [0,0];
    this.powerLevel = 1;
    this.bulletNumber = 0;
    this.speed
    this.shipEngineAcceleration = 0.2;
  }
  
  update(deltaTime){
    this.bulletTimeCheck += deltaTime
    if (this.bulletTimeCheck >= this.bulletInterval ) {
      this.bulletNumber += 1
      this.bulletTimeCheck = 0;
      this.fireBullet();
    } 

    // this.moveInControllerDirection(deltaTime)

    if (this.isOutOfBounds()) {
      // debugger
      this.wallGraze();
    } else {
      this.movementMechanics(deltaTime)
    }
    // if ship is out of x bounds, maintain y speed, keep x at edge value
  }

  // 

  movementMechanics(deltaTime) {
    // get dV
    //    mV => max speed in the direction of the controller
    //    Vo => current velocity
    //    dV~ =  mV - Vo
    // if dv~ > 0.2 (or something)
    //    a = ma~ 
    let movementAngle = Math.atan2(this.controlsDirection[1], this.controlsDirection[0])
    let Vo = this.transform.absoluteVelocity()
    this.transform.angle = movementAngle
    
    let mV = []

    if (this.controlsDirection[0] === 0 && this.controlsDirection[1] === 0){
      mV = [0,0]
    } else {
      mV = [this.maxSpeed * Math.cos(movementAngle), this.maxSpeed * Math.sin(movementAngle)]
    }

    let dV = [mV[0] - Vo[0], mV[1] - Vo[1]]
    let alpha = Math.atan2(dV[1], dV[0])

    this.transform.acc[0] += this.shipEngineAcceleration * Math.cos(alpha)
    this.transform.acc[1] += this.shipEngineAcceleration * Math.sin(alpha)
    
    
  }

  isOutOfBounds(){
    return this.gameEngine.gameScript.isOutOfBounds(this.transform.pos, this.radius * 2)
  }

  updateMousePos(mousePos){
    this.setFireAngle(mousePos)

  }

  updateRightControlStickInput(){

  }

  updateLeftControlStickInput(unitVector, down = true) {
    
    // accelerates to V = [0,0] when not pressed
    if (down) {
      this.controlsDirection = unitVector
    } else if (this.controlsDirection[0] === unitVector[0] && this.controlsDirection[1] === unitVector[1]) {
      this.controlsDirection = [0,0]
    }
  } 

  wallGraze() {
    this.gameEngine.gameScript.wallGraze(this.transform, this.radius)
  }

  // moveInControllerDirection(timeDelta){
  //   let maxSpeed = this.maxSpeed

  //   const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
  // }

  // enginePowerDirection(){
  //   let dVx = this.transform.vel[0] - this.controlsDirection[0]
  //   let dVy = this.transform.vel[1] - this.controlsDirection[1]
  //   if((dVx + dVy) < 0.5){
  //     return Math.atan2(dVy,dVx)
  //   } else {
  //     return false
  //   }
  // }

  setFireAngle(mousePos) {
    
    if (mousePos === undefined){
      mousePos = this.mousePos;
    } else {
      this.mousePos = mousePos
    }
    let dy = mousePos[1] - this.transform.pos[1];
    let dx = mousePos[0] - this.transform.pos[0];
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
  }

  draw(ctx) {
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
const BoxBox = __webpack_require__(/*! ./game_objects/enemies/BoxBox/boxbox */ "./lib/game_objects/enemies/BoxBox/boxbox.js");
const Pinwheel = __webpack_require__(/*! ./game_objects/enemies/Pinwheel/pinwheel */ "./lib/game_objects/enemies/Pinwheel/pinwheel.js");
const Arrow = __webpack_require__(/*! ./game_objects/enemies/Arrow/arrow */ "./lib/game_objects/enemies/Arrow/arrow.js");
const Grunt = __webpack_require__(/*! ./game_objects/enemies/Grunt/grunt */ "./lib/game_objects/enemies/Grunt/grunt.js");
const Weaver = __webpack_require__(/*! ./game_objects/enemies/Weaver/weaver */ "./lib/game_objects/enemies/Weaver/weaver.js");
const Singularity = __webpack_require__(/*! ./game_objects/enemies/Singularity/singularity */ "./lib/game_objects/enemies/Singularity/singularity.js");

const Util = __webpack_require__(/*! ./game_engine/util */ "./lib/game_engine/util.js");
const Sound = __webpack_require__(/*! ./game_engine/sound */ "./lib/game_engine/sound.js")

class GameScript {
  constructor(engine) {
    this.theme = new Sound("GEOWars/sounds/Geometry_OST.mp3", 1)
    this.DIM_X = 1000;
    this.DIM_Y = 600;
    this.BG_COLOR = "#000000";
    this.gameTime = 0;
    this.engine = engine
    this.arrowAdded = false
    this.ship = this.createShip();
    this.enemyCreatorList = this.createEnemyCreatorList()
    // this.deathSound = new Audio("GEOWars/sounds/Enemy_explode.wav")
    // this.deathSound.volume = 0.5;
    
    this.intervalTiming = 1;
    this.intervalTime = 0;
    this.hugeSequenceTime = 0;
    this.sequenceCount = 0;
    this.lives = 3;
    this.soundsToPlay = {}

    this.spawnthing = false;
  }

  update(deltaTime){
    this.spawnSequence(deltaTime)

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
      Singularity: (pos)        => (new Singularity(engine, pos))
    };
  }

  randomSpawnEnemy(enemy) {
    let pos = this.randomPosition();
    let enemyCreators = Object.values(this.enemyCreatorList)
    enemyCreators[Math.floor(Math.random() * enemyCreators.length) % enemyCreators.length](pos);
    // this.enemyCreatorList["Weaver"](pos)
  }

  // spawnEnemies(spawnList) {
  //   if (this.enemies.length < 50) {
  //     spawnList.forEach((enemy) => {
  //       let spawn = new EnemySpawn(enemy, this)
  //       this.add(spawn)
  //     })
  //   }
  // }

  randomPosition() {
    return [
      this.DIM_X * Math.random(),
      this.DIM_Y * Math.random(),
      // 500,300
    ];
  }

  spawnSequence(delta) {
    this.intervalTime += delta;
    
    // if (this.intervalTime > 2000) {
    //   this.randomSpawnEnemy();
    //   this.intervalTime = 0
    //   if (this.firstArrowAdded) {
    //     this.arrowAdded = true
    //   }
    //   this.firstArrowAdded = true 
    // }

    this.gameTime += delta;
    if (this.intervalTime > (500 * this.intervalTiming) && this.sequenceCount < 10) {
      this.intervalTime = 0;
      this.randomSpawnEnemy();
      this.sequenceCount += 1

    } 
    else if (this.intervalTime > (2500 * this.intervalTiming) && this.sequenceCount === 10 && this.hugeSequenceTime % 2 === 0) {
      this.intervalTime = 0
      this.sequenceCount += 1
      let enemies_to_spawn = []
      let randomPos = this.randomPosition();
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          enemies_to_spawn.push(
            this.enemyCreatorList["BoxBox"]([i * 40 + randomPos[0], j * 40 + randomPos[1]])
          )
        }
      }

    } else if (this.intervalTime > (2500 * this.intervalTiming) && this.sequenceCount === 10 && this.hugeSequenceTime % 2 === 1) {
      this.intervalTime = 0
      this.sequenceCount += 1
      let enemies_to_spawn = []
      let randomPos = this.randomPosition();
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          this.enemyCreatorList["Weaver"]([i * 40 + randomPos[0], j * 40 + randomPos[1]])
        }
      }

    } else if (this.intervalTime > (5000 * this.intervalTiming) && this.sequenceCount === 11) {
      this.intervalTime = 0;
      this.sequenceCount += 1;
    } else if (this.intervalTime > 250 && this.sequenceCount < (11 + 15) && (this.sequenceCount > 11) && this.hugeSequenceTime % 2 === 0) {
      this.ship.powerLevel = 2
      this.intervalTime = 0;
      this.sequenceCount += 1;

      let enemies_to_spawn = [];
      let fourCorners = [
        [40, 40],
        [GameScript.DIM_X - 40, 40],
        [40, GameScript.DIM_Y - 40],
        [GameScript.DIM_X - 40, GameScript.DIM_Y - 40]
      ]
      fourCorners.forEach((corner) => {
        this.enemyCreatorList["Grunt"](corner)
      })

    } else if (this.intervalTime > 250 && this.sequenceCount < (11 + 15) && (this.sequenceCount > 11) && this.hugeSequenceTime % 2 === 1) {
      this.intervalTime = 0;
      this.sequenceCount += 14;

      let enemies_to_spawn = [];
      let arrowWallPositions = []
      let arrowDirection = Math.PI * 3 / 2 + Math.PI
      for (let i = 40; i < GameScript.DIM_X; i += 40) {
        arrowWallPositions.push([i, 50])
      }

      arrowWallPositions.forEach((position) => {
        this.enemyCreatorList["Arrow"](position, arrowDirection)
      })

    } else if (this.sequenceCount >= 26) {
      this.sequenceCount = 0;
      if (!(this.intervalTiming < 0.5)) {
        this.intervalTiming *= 0.9;
      }
      this.hugeSequenceTime += 1;
    }





    // if (this.gameTime % 2000 === 0){
    //   this.spawned = false
    // }
  }

  createShip() {
    return new Ship(this.engine, [500, 500])
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > GameScript.DIM_X) || (pos[1] > GameScript.DIM_Y);
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
      let unitVector = GameView.MOVES[e.key]
      if (unitVector) {
        this.updateMovementDirection(unitVector, down)
      }
    }
  }

  bindKeyHandlers() {
    const engine = this.engine
    // Object.keys(GameView.MOVES).forEach((k) => {
    //   const move = GameView.MOVES[k];
    //   // debugger
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
    
    // key("space", () => { ship.fireBullet(); });
  }

  start() {
    this.lastTime = 0;
    this.bindKeyHandlers();
    window.addEventListener('click', (e) => {
      // this.theme = new Audio("GEOWars/sounds/Geometry_OST.mp3");
      // this.theme.id = "OST";
      // this.theme.volume = 1;
      this.bindKeyboardKeys()
      requestAnimationFrame(this.animate.bind(this));
    });
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
  c: [0.70710678118, 0.70710678118],
  x: [0,1],
  z: [-0.70710678118, 0.70710678118],
  a: [-1,0],
  s: [-1,0],
  w: [-0.70710678118, -0.70710678118],
  e: [0,-1],
  r: [0.70710678118, -0.70710678118],
  f: [1,0],
  d: [1,0],
}

module.exports = GameView;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map