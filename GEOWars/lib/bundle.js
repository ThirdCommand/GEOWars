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

const Game = __webpack_require__(/*! ./game */ "./lib/game.js");
const GameView = __webpack_require__(/*! ./game_view */ "./lib/game_view.js");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx, canvasEl).start();
});



/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Bullet = __webpack_require__(/*! ./game_objects/bullet */ "./lib/game_objects/bullet.js");
const Ship = __webpack_require__(/*! ./game_objects/ship */ "./lib/game_objects/ship.js");
const Util = __webpack_require__(/*! ./game_engine/util */ "./lib/game_engine/util.js");
const Particle = __webpack_require__(/*! ./particles/particle */ "./lib/particles/particle.js");
const EnemySpawn = __webpack_require__(/*! ./particles/enemy_spawn */ "./lib/particles/enemy_spawn.js");
const ParticleExplosion = __webpack_require__(/*! ./particles/particle_explosion */ "./lib/particles/particle_explosion.js");
const BulletWallExplosion = __webpack_require__(/*! ./particles/bullet_wall_explosion */ "./lib/particles/bullet_wall_explosion.js");
const SingularityExplosion = __webpack_require__(/*! ./particles/singularity_explosion */ "./lib/particles/singularity_explosion.js");
const BoxBox = __webpack_require__(/*! ./game_objects/enemies/boxbox */ "./lib/game_objects/enemies/boxbox.js");
const Pinwheel = __webpack_require__(/*! ./game_objects/enemies/pinwheel */ "./lib/game_objects/enemies/pinwheel.js");
const Arrow = __webpack_require__(/*! ./game_objects/enemies/arrow */ "./lib/game_objects/enemies/arrow.js");
const Grunt = __webpack_require__(/*! ./game_objects/enemies/grunt */ "./lib/game_objects/enemies/grunt.js");
const Weaver = __webpack_require__(/*! ./game_objects/enemies/weaver */ "./lib/game_objects/enemies/weaver.js");
const Singularity = __webpack_require__(/*! ./game_objects/enemies/singularity */ "./lib/game_objects/enemies/singularity.js");
const Sound = __webpack_require__(/*! ./game_engine/sound */ "./lib/game_engine/sound.js")

class Game {
  constructor() {
    this.enemies = [];
    this.bullets = [];
    this.ships = [];
    this.particleExplosions = [];
    this.spawningEnemies = [];
    this.singularities = [];
    this.muted = true;
    // this.addEnemies();
    this.gameTime = 0;
    this.spawned = false; // REFACTOR PLEASE
    this.enemyCreatorList = this.createEnemyCreatorList()
    this.deathSound = new Audio("GEOWars/sounds/Enemy_explode.wav")
    this.deathSound.volume = 0.5;
    this.bulletWallhit = new Audio("GEOWars/sounds/bullet_hitwall.wav")
    this.bulletWallhit.volume = 0.5;

    this.intervalTiming = 1;
    this.intervalTime = 0;
    this.hugeSequenceTime = 0;
    this.sequenceCount = 0;
    this.lives = 3;
    this.addEnemies();
    this.soundsToPlay = {}
  }

  

  randomArrowDirection () {
    let angles = [0, Math.PI / 2, Math.PI, Math.PI * 3/2]
    return angles[Math.floor(Math.random() * angles.length) % angles.length]
  }
  createEnemyCreatorList() {
    return {
      BoxBox: (pos) => (new BoxBox({ game: this, pos: pos})),
      Pinwheel: (pos) => (new Pinwheel({ game: this, pos: pos })),
      Arrow: (pos, angle) => (new Arrow({game: this, pos: pos, angle: angle})),
      Grunt: (pos) => (new Grunt({game: this, pos: pos})),
      Weaver: (pos) => (new Weaver({game: this, pos: pos})),
      Singularity: (pos) => (new Singularity({game: this, pos: pos}))
    };
    
  }

  add(object) {
    if (this.enemies.length < 50 || object instanceof Bullet || !(object instanceof EnemySpawn)){
      if (object instanceof BoxBox || object instanceof Pinwheel || object instanceof Arrow || object instanceof Grunt || object instanceof Weaver) {
        this.enemies.push(object)
      } else if (object instanceof Singularity) {
        this.singularities.push(object)
      } else if (object instanceof Bullet) {
        this.bullets.push(object);
      } else if (object instanceof Ship) {
        this.ships.push(object);
      } else if (object instanceof ParticleExplosion || object instanceof BulletWallExplosion || object instanceof SingularityExplosion) {
        this.particleExplosions.push(object);
      } else if (object instanceof EnemySpawn) {
        this.spawningEnemies.push(object);
      } else {
        throw new Error("unknown type of object");
      }
    }
    
  }

  addEnemies() {
    for (let i = 0; i < Game.NUM_BOXES; i++) {
      this.add(new BoxBox({ game: this}));
    }
    for (let i = 0; i < Game.NUM_PINWHEELS; i++) {
      this.add(new Pinwheel({game: this}));
    }
    for (let i = 0; i < Game.NUM_ARROWS; i++) {
      this.add(new Arrow({ game: this }));
    }
    for (let i = 0; i < Game.NUM_GRUNTS; i++) {
      this.add(new Grunt({ game: this }));
    }
    for (let i = 0; i < Game.NUM_WEAVERS; i++) {
      this.add(new Weaver({ game: this }));
    }
    for (let i = 0; i < Game.NUM_SINGULARITIES; i++) {
      this.add(new Singularity({ game: this, id: this.singularities.length, pos: [500,500] }));
    }
  }

  randomSpawnEnemy(enemy){
    if (this.enemies.length < 50) {
      let pos = this.randomPosition();
      let enemyCreators = Object.values(this.enemyCreatorList)
      let spawn = new EnemySpawn(enemyCreators[Math.floor(Math.random() * enemyCreators.length) % enemyCreators.length](), this);
      this.add(spawn)
    }
  }
  
  spawnEnemies(spawnList) {
    if (this.enemies.length < 50 ) {
      spawnList.forEach((enemy) => {
        let spawn = new EnemySpawn(enemy, this)
        this.add(spawn)
      })
    }
  }

  spawnSequence(delta) {
    this.intervalTime += delta;
    // this.gameTime += delta;
    if (this.intervalTime > (500 * this.intervalTiming) && this.sequenceCount < 10) {
      this.intervalTime = 0;
      this.randomSpawnEnemy();
      this.sequenceCount += 1
    } else if (this.intervalTime > (2500 * this.intervalTiming) && this.sequenceCount === 10 && this.hugeSequenceTime % 2 === 0) {
      this.intervalTime = 0
      this.sequenceCount +=1
      let enemies_to_spawn = []
      let randomPos = this.randomPosition();
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          enemies_to_spawn.push(
            this.enemyCreatorList["BoxBox"]([i * 40 + randomPos[0], j * 40 + randomPos[1]])
          )
        }
      }
      this.spawnEnemies(enemies_to_spawn);

    } else if (this.intervalTime > (2500 * this.intervalTiming) && this.sequenceCount === 10 && this.hugeSequenceTime % 2 === 1) {
      this.intervalTime = 0
      this.sequenceCount += 1
      let enemies_to_spawn = []
      let randomPos = this.randomPosition();
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          enemies_to_spawn.push(
            this.enemyCreatorList["Weaver"]([i * 40 + randomPos[0], j * 40 + randomPos[1]])
          )
        }
      }
      this.spawnEnemies(enemies_to_spawn);
    } else if (this.intervalTime > (5000 * this.intervalTiming) && this.sequenceCount === 11) {
      this.intervalTime = 0;
      this.sequenceCount += 1;
    } else if (this.intervalTime > 250 && this.sequenceCount < (11 + 15) && (this.sequenceCount > 11) && this.hugeSequenceTime % 2 === 0) {
      this.intervalTime = 0;
      this.sequenceCount += 1 ;

      let enemies_to_spawn = [];
      let fourCorners = [
        [40,              40],
        [Game.DIM_X - 40, 40],
        [40, Game.DIM_Y - 40],
        [Game.DIM_X - 40, Game.DIM_Y - 40]
      ]
      fourCorners.forEach((corner) => {
        enemies_to_spawn.push(this.enemyCreatorList["Grunt"]( corner))
      })
      this.spawnEnemies(enemies_to_spawn);
    } else if (this.intervalTime > 250 && this.sequenceCount < (11 + 15) && (this.sequenceCount > 11) && this.hugeSequenceTime % 2 === 1) {
      this.intervalTime = 0;
      this.sequenceCount += 14;

      let enemies_to_spawn = [];
      let arrowWallPositions = []
      let arrowDirection = Math.PI * 3 / 2 + Math.PI
      for (let i = 40; i < Game.DIM_X; i += 40) {
        arrowWallPositions.push([i,50])
      }
  
      arrowWallPositions.forEach((position) => {
        enemies_to_spawn.push(this.enemyCreatorList["Arrow"](position, arrowDirection))
      })

      this.spawnEnemies(enemies_to_spawn);
    } else if( this.sequenceCount >= 26) {
      this.sequenceCount = 0;
      if (!(this.intervalTiming < 0.5)){
        this.intervalTiming *= 0.9;
      }
      this.hugeSequenceTime += 1;
    }
    // if (this.gameTime % 2000 === 0){
    //   this.spawned = false
    // }
    // if( !this.spawned){
    //   this.spawnEnemy()
    //   this.spawned = true
    // }
  }

  addShip() {
    const ship = new Ship({
      pos: this.randomPosition(),
      game: this
    });

    this.add(ship);

    return ship;
  }

  allObjects() {
    return [].concat(this.enemies, this.singularities); //this.singularities);
  }

  //explosions
  particleObjects() {
    return [].concat(this.particleExplosions, this.spawningEnemies);
  }

  allObjects2() {
    return [].concat(this.bullets, this.singularities, this.ships)
  }

  checkCollisions(ctx) {
    const bullets = this.bullets;
    const allObjects = this.allObjects();
    const allObjects2 = this.allObjects2();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects2.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects2[j];
        // if (obj1 instanceof Singularity && obj2 instanceof Singularity){
        //   if (obj1.id === obj2.id){
        //     continue;
        //   }
        // }
        if (obj2 instanceof Singularity) {
          obj2.isCollidedWith(obj1)
          continue
        }
        if (obj1.isCollidedWith(obj2)) {
          const explosionId = this.particleExplosions.length

          if (!this.muted) {
            let death = new Sound("GEOWars/sounds/Enemy_explode.wav", 0.4)
            this.soundsToPlay[death.url] = death
          }
          if (obj1 instanceof Singularity){
            this.add(new SingularityExplosion(obj1.pos[0], obj1.pos[1], ctx, this, explosionId))
            const collision = obj1.collideWith(obj2);
          } else {
            this.add(new ParticleExplosion(obj1.pos[0], obj1.pos[1], ctx, this, explosionId))
            const collision = obj1.collideWith(obj2);
          }
          // if (collision) return;
        }
      }
    }
  }

  die(){
    this.intervalTiming = this.intervalTiming;
    this.intervalTime = 0;
    this.hugeSequenceTime = 0;
    this.sequenceCount = 0;
    this.lives -= 1;
    this.enemies = [];
    if (this.lives === 0){
      this.intervalTiming = 1;
      this.lives = 3;
      location.reload();
    }
  }


  draw(ctx) {

    // var ctx = document.createElement("canvas").getContext("2d");
    // ctx.canvas.width = this.DIM_X;
    // ctx.canvas.height = this.DIM_Y;

    ctx.save()
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.ships.forEach((object) => {
      object.draw(ctx);
    })
    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
    this.bullets.forEach((object) => {
      object.draw(ctx)
    });
    this.particleObjects().forEach((particle) => {
      particle.draw(ctx);
    });
    this.singularities.forEach((object) => {
      object.draw(ctx);
    });
  }
  

  playSounds() {
    Object.values(this.soundsToPlay).forEach((sound) => {
      sound.play();
    })
    this.soundsToPlay = {};
  }


  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }
  // move physics objects
  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
    this.bullets.forEach((object) => {
      object.move(delta);
    });
    this.ships.forEach((object) => {
      object.move(delta);
    });
    this.particleObjects().forEach((object) => {
      object.move(delta)
    });
  }

  randomPosition() {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random(),
      // 500,300
    ];
  }

  remove(object) {
    // object.pos = [-1000,-1000];
    if (object instanceof Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else if (object instanceof ParticleExplosion || object instanceof BulletWallExplosion || object instanceof SingularityExplosion) {
      this.particleObjects.splice(this.particleObjects.indexOf(object), 1);
    } else if (object instanceof Particle){
      object.active = false
    } else if (object instanceof BoxBox) {
      this.enemies.splice(this.enemies.indexOf(object), 1);
    } else if (object instanceof Pinwheel) {
      this.enemies.splice(this.enemies.indexOf(object),1);
    } else if (object instanceof Arrow) {
      this.enemies.splice(this.enemies.indexOf(object), 1);
    } else if (object instanceof Grunt) {
      this.enemies.splice(this.enemies.indexOf(object), 1);
    } else if (object instanceof Weaver) {
      this.enemies.splice(this.enemies.indexOf(object), 1);
    } else if (object instanceof Singularity) {
      this.singularities.splice(this.singularities.indexOf(object), 1)
    } else if (object instanceof EnemySpawn) {
      this.spawningEnemies.splice(this.spawningEnemies.indexOf(object), 1)
    }
    else {
      throw new Error("unknown type of object");
    }
  }

  updateShipFireAngle(){
    this.ships[0].setFireAngle()
  }

  // spawning handled here. checks the delta time, 
  // adds units when appropriate
  step(delta, ctx) {
    this.ctx = ctx
    this.spawnSequence(delta);
    this.checkCollisions(ctx);
    // this.updateObjects(delta);
    this.moveObjects(delta);
    this.updateShipFireAngle();
    this.playSounds();
  }

  wrap(pos) {
    return [
      Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
    ];
  }
}

Game.BG_COLOR = "#000000";

Game.DIM_X = 1000;
Game.DIM_Y = 600;
// Game.FPS = 32;
Game.NUM_BOXES = 10;
Game.NUM_PINWHEELS = 0;
Game.NUM_ARROWS = 0;
Game.NUM_GRUNTS = 0;
Game.NUM_WEAVERS = 0;
Game.NUM_SINGULARITIES = 1;
module.exports = Game;

Game.Spawn1 = {
  BoxBox: 50,
}
  
Game.spawnListList = [
  Game.Spawn1
]

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
  constructor(type, gameObject, radius = 5, subscriptionTypes = [], subscriptions = false) {
    this.objectType = gameObject.constructor.name
    this.type = type
    this.subscriptions = subscriptions
    this.subscriptionTypes = subscriptionTypes
    this.radius = radius
    this.gameObject = gameObject
  }
  // wondering if collision should cascade up the parent objects
  // nope not yet anyway

  collisionCheck(otherCollider) {
    const centerDist = Util.dist(this.gameObject.transform.pos, otherCollider.gameObject.transform.pos);
    if (centerDist < (this.radius + otherCollider.radius)){
      this.gameObject.onCollision(otherCollider, this.type)
    }
  } 
}

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

  addColider(type, gameObject, radius, subscriptionTypes, subscriptions){
    // game engine checks every collider with it's subscription types
    let newCollider = new Collider(type, gameObject, radius, subscriptionTypes, subscriptions)
    this.colliders.append(newCollider)
    this.gameEngine.addCollider(newCollider)
  }

  // store sound in instance
  playSound(sound){
    this.gameEngine.queueSound(sound)
  }

  //hmm. user makes a new game object, then adds it to the parent
  addChildGameObject(obj){
    this.childObjects.append(obj)
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


/***/ }),

/***/ "./lib/game_engine/line_sprite.js":
/*!****************************************!*\
  !*** ./lib/game_engine/line_sprite.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

class LineSprite {
  constructor(transform) {
    this.drawFunction = draw
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
  constructor(transform, radius) {
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
      return angleAdd(this.angle, this.parentTransform.absoluteAngle())
    }
  }

  absolutePosition() {
    absPos = []
    if (this.parentTransform == null){
      absPos = this.pos
      return absPos
    } else { 
      return vectorAdd(this.pos, this.parentTransform.absolutePosition())
    }
  }

  absoluteVelocity() {
    absVel = []
    if (this.parentTransform == null) {
      absVel = this.vel
      return absVel
    } else {
      return vectorAdd(this.vel, this.parentTransform.absoluteVelocity())
    }
  }

  absoluteAcceleration() {
    absAcc = []
    if (this.parentTransform == null) {
      absAcc = this.acc
      return absAcc
    } else {
      return vectorAdd(this.acc, this.parentTransform.absoluteAcceleration())
    }
  }

  vectorAdd(vector1, vector2) {
    return [vector1[0] + vector1[0], vector1[1] + vector2[1]]
  }

  angleAdd(angle1, angle2) {

    return (angle1 + angle2) % (2 * Math.PI)
  }

}

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

  wrap(coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  },

  bounce(shape, max){

    if(shape.pos[0] <= 0 || shape.pos[0] >= max[0]){
      shape.vel[0] = -shape.vel[0];
    }
    if( shape.pos[1] <= 0 || shape.pos[1] >= max[1]){
      shape.vel[1] = -shape.vel[1];
    }
  },

  redirect(arrow, max){
    if (arrow.pos[0] <= 0 || arrow.pos[0] >= max[0]) {
      if (arrow.pos[0] <= 0) {
        arrow.pos[0] = 1
      }
      if (arrow.pos[0] >= max[0]) {
        arrow.pos[0] = max[0] - 1
      }

      arrow.vel[0] = -arrow.vel[0];
      arrow.vel[1] = -arrow.vel[1];
    }
    if (arrow.pos[1] <= 0 || arrow.pos[1] >= max[1]) {
      if (arrow.pos[1] <= 0) {
        arrow.pos[1] = 1
      }
      if (arrow.pos[1] >= max[1]) {
        arrow.pos[1] = max[1] - 1
      }


      arrow.vel[0] = -arrow.vel[0];
      arrow.vel[1] = -arrow.vel[1];
    }
  }
 
};

module.exports = Util;


/***/ }),

/***/ "./lib/game_objects/bullet.js":
/*!************************************!*\
  !*** ./lib/game_objects/bullet.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/maxdom/Desktop/projects/Geometry/GEOWars/lib/game_objects/bullet.js'");

/***/ }),

/***/ "./lib/game_objects/enemies/arrow.js":
/*!*******************************************!*\
  !*** ./lib/game_objects/enemies/arrow.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/maxdom/Desktop/projects/Geometry/GEOWars/lib/game_objects/enemies/arrow.js'");

/***/ }),

/***/ "./lib/game_objects/enemies/boxbox.js":
/*!********************************************!*\
  !*** ./lib/game_objects/enemies/boxbox.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/maxdom/Desktop/projects/Geometry/GEOWars/lib/game_objects/enemies/boxbox.js'");

/***/ }),

/***/ "./lib/game_objects/enemies/grunt.js":
/*!*******************************************!*\
  !*** ./lib/game_objects/enemies/grunt.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/maxdom/Desktop/projects/Geometry/GEOWars/lib/game_objects/enemies/grunt.js'");

/***/ }),

/***/ "./lib/game_objects/enemies/pinwheel.js":
/*!**********************************************!*\
  !*** ./lib/game_objects/enemies/pinwheel.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/maxdom/Desktop/projects/Geometry/GEOWars/lib/game_objects/enemies/pinwheel.js'");

/***/ }),

/***/ "./lib/game_objects/enemies/singularity.js":
/*!*************************************************!*\
  !*** ./lib/game_objects/enemies/singularity.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/maxdom/Desktop/projects/Geometry/GEOWars/lib/game_objects/enemies/singularity.js'");

/***/ }),

/***/ "./lib/game_objects/enemies/weaver.js":
/*!********************************************!*\
  !*** ./lib/game_objects/enemies/weaver.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/maxdom/Desktop/projects/Geometry/GEOWars/lib/game_objects/enemies/weaver.js'");

/***/ }),

/***/ "./lib/game_objects/ship.js":
/*!**********************************!*\
  !*** ./lib/game_objects/ship.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/maxdom/Desktop/projects/Geometry/GEOWars/lib/game_objects/ship.js'");

/***/ }),

/***/ "./lib/game_view.js":
/*!**************************!*\
  !*** ./lib/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {


class GameView {
  constructor(game, ctx, canvasEl) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
    this.canvasEl = canvasEl;
  }

  bindKeyHandlers() {
    const ship = this.ship;
    Object.keys(GameView.MOREMOVES).forEach((k) => {
      const move = GameView.MOREMOVES[k];
      key(k, () => { ship.power(move); });
    });

    key("m", () => {
      this.game.muted = !this.game.muted;
      if (this.game.muted) {
        this.theme.pause();
      } else {
        this.theme.play();
      }
    })

    window.addEventListener('mousemove', (e) => {
      const x = {x: e.layerX};
      const y = {y: e.layerY};
      const mousePos = [e.layerX, e.layerY];
      
      ship.setFireAngle(mousePos);
      
    });
    
    // key("space", () => { ship.fireBullet(); });
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    window.addEventListener('click', (e) => {
      this.theme = new Audio("GEOWars/sounds/Geometry_OST.mp3");
      this.theme.id = "OST";

      this.game.ships[0].start();
      requestAnimationFrame(this.animate.bind(this));
    });
  }
  
  animate(time) {
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta, this.ctx);
    this.game.draw(this.ctx);
    this.lastTime = time;
    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.MOVES = {
  w: [0, -1],
  a: [-1, 0],
  s: [0, 1],
  d: [1, 0],
};

GameView.MOREMOVES = {
  c: [0.70710678118, 0.70710678118],
  x: [0,1],
  z: [-0.70710678118, 0.70710678118],
  a: [-1,0],
  s: [-1,0],
  w: [-0.70710678118, -0.70710678118],
  e: [0,-1],
  r: [0.70710678118, -0.70710678118],
  f: [1,0],
  d: [1,0]
}

module.exports = GameView;


/***/ }),

/***/ "./lib/particles/bullet_wall_explosion.js":
/*!************************************************!*\
  !*** ./lib/particles/bullet_wall_explosion.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

 const Particle = __webpack_require__(/*! ./particle */ "./lib/particles/particle.js")


const speeds = [1, 2, 3, 4];


class BulletWallExplosion{
  constructor(xpos, ypos, ctx, game, explosionId) {
    this.COLORS = [
      ["rgba(152,245,23", "rgba(126,185,43", "rgba(189,236,122", "rgba(103,124,74"],
      ["rgba(255,241,44", "rgba(245,236,109", "rgba(165,160,87", "rgba(177,167,28"],
      ["rgba(18,225,252", "rgba(60,198,216", "rgba(113,223,238", "rgba(149,220,230"],
      ["rgba(252,87,224", "rgba(204,72,182", "rgba(170,72,154", "rgba(250,137,231"],
      ["rgba(190,86,250", "rgba(159,96,196", "rgba(87,17,128", "rgba(199,150,228"]
    ]
    this.color = this.COLORS[Math.floor(Math.random() * this.COLORS.length)]
    this.game = game;
    this.particleNum = 20;
    this.particles = [];
    this.explosionId;


    for (var i = 0; i < this.particleNum; i++) {
      const particleId = i;

      const speed = speeds[Math.floor(Math.random() * speeds.length)]
      this.particles.push(new Particle(xpos, ypos, speed, ctx, game, game.particleExplosions.length, particleId, this.color));
    }
  }

  move(deltaTime) {
    for (let i = 0; i < this.particles.length; i++) {
      if (this.particles[i].active === true) {
        this.particles[i].move(deltaTime);
      }
    }
  }
  draw(ctx) {
    for (let i = 0; i < this.particles.length; i++) {
      if (this.particles[i].active === true) {
        this.particles[i].draw(ctx);

      }
    }

    // ANIMATION = requestAnimationFrame(drawScene);
  }

}




  module.exports = BulletWallExplosion;

/***/ }),

/***/ "./lib/particles/enemy_spawn.js":
/*!**************************************!*\
  !*** ./lib/particles/enemy_spawn.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameObject = __webpack_require__(/*! ../game_engine/game_object */ "./lib/game_engine/game_object.js")

class EnemySpawn extends GameObject{
  constructor(parent, game){
    this.enemy = parent;
    this.game = game;
    this.initialSpawningScale = 1.5;
    this.spawningScale = 1.5;
    this.lifeTime = 1000;
    this.existTime = 0;
    
    if (!this.game.muted){
      this.game.soundsToPlay[this.enemy.spawnSound.url] = this.enemy.spawnSound;
    }

  }
  move(timeDelta) {
    
    this.existTime += timeDelta;

    if (this.existTime >= this.lifeTime){
      this.spawn(this.enemy)
      this.game.remove(this)
    }

    let cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let cycleSpeed = 0.1;

    if (this.spawningScale < 0.7){
      this.spawningScale = this.initialSpawningScale
    } else {
      this.spawningScale -= cycleSpeed * cycleSpeedScale;
    }
  }

  draw (ctx) {

    let pos = this.pos
    this.enemy.draw(ctx, this.spawningScale)
  }

  spawn(enemy){
    this.game.add(enemy)
  }

  remove(){
    this.game.remove(this)
  }

}
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
module.exports = EnemySpawn;

/***/ }),

/***/ "./lib/particles/particle.js":
/*!***********************************!*\
  !*** ./lib/particles/particle.js ***!
  \***********************************/
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

const Util = __webpack_require__(/*! ../game_engine/util */ "./lib/game_engine/util.js");

class Particle {
  constructor(xpos, ypos, initialSpeed, ctx, game, explosionId, particleID, colors) {
    this.game = game;
    this.active = true;
    this.color = colors[Math.floor(colors.length * Math.random())];
    this.particleId;
    this.explosionId;

    this.pos = [xpos, ypos]; // x and y position

    this.rectLength = 15;
    this.rectWidth = 2;
    // this.r = this.rand(200, 10, 0);
    this.speed = initialSpeed;
    this.movementAngle = Math.random() * Math.PI * 2;
    // this.vx = this.initialSpeed * Math.cos(this.movementAngle);
    // this.vy = this.initialSpeed * Math.sin(this.movementAngle);
    this.vel = Util.vectorCartisian(this.movementAngle, this.speed)
    this.explosionDeceleration = 0.1; // in the direction the particle is moving
    this.acc = [-this.explosionDeceleration * Math.cos(this.movementAngle), -this.explosionDeceleration * Math.sin(this.movementAngle)]

    this.opacity = Math.random() * 0.5 + 0.5;
    this.active = true;
    this.hue = Math.random() * 0.3 + 0.6;
  }

  // private method
  rand(max, min, _int) {
    var max = (max === 0 || max) ? max : 1,
      min = min || 0,
      gen = min + (max - min) * Math.random();

    return (_int) ? Math.round(gen) : gen;
  };

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    this.updateAcceleration()
    this.movementAngle = Math.atan2(this.vel[1], this.vel[0])
    this.pos[0] += this.vel[0] * velocityScale + (this.acc[0] - this.explosionDeceleration * Math.cos(this.movementAngle)) * (velocityScale * velocityScale) / 2;
    this.pos[1] += this.vel[1] * velocityScale + (this.acc[1] - this.explosionDeceleration * Math.sin(this.movementAngle)) * (velocityScale * velocityScale) / 2;
    this.vel[0] += this.acc[0] * velocityScale;
    this.vel[1] += this.acc[1] * velocityScale;
    this.acc = [-this.explosionDeceleration * Math.cos(this.movementAngle), -this.explosionDeceleration * Math.sin(this.movementAngle)]
    this.rectLength -= 0.25;
    this.hue -= 0.01;
  }

  updateAcceleration() {
    for (let i = 0; i < this.game.singularities.length; i++) {
      const singularity = this.game.singularities[i];
      singularity.influenceAcceleration(this)
    }
  }

  draw(ctx) {

    this.active = true;
    // this.x += this.vx;
    // this.y += this.vy;

    if (this.hue < 0.1 || this.rectLength < 0.25 || ((Math.abs(this.vel[0]) + Math.abs(this.vel[1])) < 0.25)) {
      this.remove();
    } else {
      let pos = this.pos;

      let l = 15;
      let w = 5;
      let movementDirection = Math.atan2(this.vel[0], -this.vel[1])

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

  remove() {
    this.game.remove(this);
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
module.exports = Particle;

/***/ }),

/***/ "./lib/particles/particle_explosion.js":
/*!*********************************************!*\
  !*** ./lib/particles/particle_explosion.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Particle = __webpack_require__(/*! ./particle */ "./lib/particles/particle.js")



const speeds = [7,6,5.5,5,4];

class ParticleExplosion{
  constructor(xpos, ypos, ctx, game, explosionId){
    this.COLORS = [
      ["rgba(152,245,23", "rgba(126,185,43", "rgba(189,236,122", "rgba(103,124,74"],
      ["rgba(255,241,44", "rgba(245,236,109", "rgba(165,160,87", "rgba(177,167,28"],
      ["rgba(18,225,252", "rgba(60,198,216", "rgba(113,223,238", "rgba(149,220,230"],
      ["rgba(252,87,224", "rgba(204,72,182", "rgba(170,72,154", "rgba(250,137,231"],
      ["rgba(190,86,250", "rgba(159,96,196", "rgba(87,17,128", "rgba(199,150,228"]
    ]
    this.color = this.COLORS[Math.floor(Math.random() * this.COLORS.length)]
    this.game = game;
    this.particleNum = 80;
    this.particles = [];
    this.explosionId;
    for (var i = 0; i < this.particleNum; i++) {
      const particleId = i;
      
      const speed = Math.random() * 3 + 4
      // const speed = speeds[Math.floor(Math.random() * speeds.length)]
      this.particles.push(new Particle(xpos, ypos, speed, ctx, game, this.explosionId, particleId, this.color));
    }
  }
  
  move(deltaTime) {
    for (let i = 0; i < this.particles.length; i++) {
      if (this.particles[i].active === true) {
        this.particles[i].move(deltaTime);
      }
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.particles.length; i++) {
      if (this.particles[i].active === true) {
        this.particles[i].draw(ctx);
      }
    }

    // ANIMATION = requestAnimationFrame(drawScene);
  }

}




module.exports = ParticleExplosion;

/***/ }),

/***/ "./lib/particles/singularity_explosion.js":
/*!************************************************!*\
  !*** ./lib/particles/singularity_explosion.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Particle = __webpack_require__(/*! ./particle */ "./lib/particles/particle.js")



const speeds = [21,19,17,15,13,11,9,7, 6, 5, 4];

class SingularityExplosion {
  constructor(xpos, ypos, ctx, game, explosionId) {
    this.COLORS = [
      ["rgba(152,245,23", "rgba(126,185,43", "rgba(189,236,122", "rgba(103,124,74"],
      ["rgba(255,241,44", "rgba(245,236,109", "rgba(165,160,87", "rgba(177,167,28"],
      ["rgba(18,225,252", "rgba(60,198,216", "rgba(113,223,238", "rgba(149,220,230"],
      ["rgba(252,87,224", "rgba(204,72,182", "rgba(170,72,154", "rgba(250,137,231"],
      ["rgba(190,86,250", "rgba(159,96,196", "rgba(87,17,128", "rgba(199,150,228"]
    ]
    this.color = this.COLORS[Math.floor(Math.random() * this.COLORS.length)]
    this.game = game;
    this.particleNum = 400;
    this.particles = [];
    this.explosionId;

    for (var i = 0; i < this.particleNum; i++) {
      const particleId = i;
      const speed = Math.random() * (21 - 4) + 4
      // const speed = speeds[Math.floor(Math.random() * speeds.length)]
      this.particles.push(new Particle(xpos, ypos, speed, ctx, game, this.explosionId, particleId, this.color));
    }
  }

  move(deltaTime) {
    for (let i = 0; i < this.particles.length; i++) {
      if (this.particles[i].active === true) {
        this.particles[i].move(deltaTime);
      }
    }
  }
  draw(ctx) {

    for (let i = 0; i < this.particles.length; i++) {
      if (this.particles[i].active === true) {
        this.particles[i].draw(ctx);
      }
    }

    // ANIMATION = requestAnimationFrame(drawScene);
  }

}




module.exports = SingularityExplosion;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map