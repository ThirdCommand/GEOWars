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
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/asteroids.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/asteroid.js":
/*!*************************!*\
  !*** ./lib/asteroid.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(/*! ./util */ "./lib/util.js");
const MovingObject = __webpack_require__(/*! ./moving_object */ "./lib/moving_object.js");
const Ship = __webpack_require__(/*! ./ship */ "./lib/ship.js");
const Bullet = __webpack_require__(/*! ./bullet */ "./lib/bullet.js");

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 2,
  SPEED: 1
};

class Asteroid extends MovingObject {
  constructor(options = {}) {
    options.color = DEFAULTS.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
    super(options);
  }

  collideWith(otherObject) {
    if (otherObject instanceof Ship) {
      otherObject.relocate();
      return true;
    } else if (otherObject instanceof Bullet) {
      this.remove();
      otherObject.remove();
      return true;
    }

    return false;
  }
}

module.exports = Asteroid;


/***/ }),

/***/ "./lib/asteroids.js":
/*!**************************!*\
  !*** ./lib/asteroids.js ***!
  \**************************/
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

/***/ "./lib/bullet.js":
/*!***********************!*\
  !*** ./lib/bullet.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(/*! ./moving_object */ "./lib/moving_object.js");

class Bullet extends MovingObject {
  constructor(options) {
    options.radius = Bullet.RADIUS;
    super(options);
    this.isWrappable = false;
  }
}

Bullet.RADIUS = 2;
Bullet.SPEED = 5;

module.exports = Bullet;


/***/ }),

/***/ "./lib/enemies/boxbox.js":
/*!*******************************!*\
  !*** ./lib/enemies/boxbox.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(/*! ../moving_object */ "./lib/moving_object.js")

class BoxBox extends MovingObject {
  constructor(options) {
    super(options)
    this.pos = options.game.randomPosition();
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(pos[0] - (7/8 * this.BOX_SIZE), pos[1] - (1/8 * this.BOX_SIZE), this.BOX_SIZE, this.BOX_SIZE);
    ctx.lineWidth = 2;
    ctx.strokeStyle = BoxBox.COLOR;
    ctx.stroke;
    
    ctx.beginPath();
    ctx.rect(pos[0] - (1/8 * this.BOX_SIZE), pos[1] - (7/8 * this.BOX_SIZE), this.BOX_SIZE, this.BOX_SIZE);
    ctx.lineWidth = 2;
    ctx.strokeStyle = BoxBox.COLOR;
    ctx.stroke;

  }
}

BoxBox.BOX_SIZE = 10;
BoxBox.COLOR = "#f00745"

module.exports = BoxBox;

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Asteroid = __webpack_require__(/*! ./asteroid */ "./lib/asteroid.js");
const Bullet = __webpack_require__(/*! ./bullet */ "./lib/bullet.js");
const Ship = __webpack_require__(/*! ./ship */ "./lib/ship.js");
const Util = __webpack_require__(/*! ./util */ "./lib/util.js");
const ParticleExplosion = __webpack_require__(/*! ./particles/particle_explosion */ "./lib/particles/particle_explosion.js");
const Particle = __webpack_require__(/*! ./particles/particle */ "./lib/particles/particle.js");
const BoxBox = __webpack_require__(/*! ./enemies/boxbox */ "./lib/enemies/boxbox.js");
class Game {
  constructor() {
    this.asteroids = [];
    this.enemies = [];
    this.bullets = [];
    this.ships = [];
    this.particleExplosions = [];
    
    this.addAsteroids();
  }

  add(object) {
    if (object instanceof Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof BoxBox) {
      this.enemies.push(object)
    } else if (object instanceof Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Ship) {
      this.ships.push(object);
    } else if (object instanceof ParticleExplosion) {
      this.particleExplosions.push(object)
    } else {
      throw new Error("unknown type of object");
    }
  }

  addAsteroids() {
    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroid({ game: this }));
    }
    for (let i = 0; i < Game.NUM_BOXES; i++) {
        this.add(new BoxBox({ game: this}));
    }
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
    return [].concat(this.asteroids); //this.bullets);
  }

  //explosions
  particleObjects() {
    return [].concat(this.particleExplosions);
  }

  allObjects2() {
    return [].concat(this.bullets)
  }

  checkCollisions(ctx) {
    const asteroids = this.asteroids;
    const bullets = this.bullets;
    const allObjects = this.allObjects();
    const allObjects2 = this.allObjects2();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects2.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects2[j];
        if (obj1.isCollidedWith(obj2)) {
          const explosionId = this.particleExplosions.length 
          this.add(new ParticleExplosion(obj1.pos[0], obj1.pos[1], ctx, this, explosionId))
          const collision = obj1.collideWith(obj2);
          if (collision) return;
        }
      }
    }
  }


  draw(ctx) {
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
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

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
  }

  randomPosition() {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random(),
      // 500,300
    ];
  }

  remove(object) {
    if (object instanceof Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
    } else if (object instanceof Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else if (object instanceof ParticleExplosion) {
      this.particleObjects.splice(this.particleObjects.indexOf(object), 1);
    } else if (object instanceof Particle){
      object.active = false
      // explosionId = object.explosionId;
      // particleId = object.particleId;
      // this.particleExplosions[explosionId].particles
    } else {
      throw new Error("unknown type of object");
    }
  }
  updateShipFireAngle(){
    this.ships[0].setFireAngle()
  }

  step(delta, ctx) {
    this.moveObjects(delta);
    this.updateShipFireAngle();
    this.checkCollisions(ctx);
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
Game.NUM_ASTEROIDS = 100;
Game.NUM_BOXES = 100;
module.exports = Game;


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
    // this.canvasEl.onclick = function (e) {
    //   // debugger
    //   this.ship.fireBullet();
    // };
  }

  

  bindKeyHandlers() {
    const ship = this.ship;

    Object.keys(GameView.MOVES).forEach((k) => {
      const move = GameView.MOVES[k];
      key(k, () => { ship.power(move); });
    });

    window.addEventListener('mousemove', (e) => {
      const x = {x: e.layerX};
      const y = {y: e.layerY};
      // console.log(x);
      // console.log(y);
      // debugger
      const mousePos = [e.layerX, e.layerY];

      ship.setFireAngle(mousePos);
      
    });
    
    key("space", () => { ship.fireBullet(); });
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    // start the animation
    requestAnimationFrame(this.animate.bind(this));
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

module.exports = GameView;


/***/ }),

/***/ "./lib/moving_object.js":
/*!******************************!*\
  !*** ./lib/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(/*! ./util */ "./lib/util.js");

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    this.isWrappable = true;
  }
  
  collideWith(otherObject) {
    // default do nothing
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  isCollidedWith(otherObject) {
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

  move(timeDelta) {
    // timeDelta is number of milliseconds since last move
    // if the computer is busy the time delta will be larger
    // in this case the MovingObject should move farther in this frame
    // velocity of object is how far it should move in 1/60th of a second
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
        offsetX = this.vel[0] * velocityScale,
        offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.remove();
      }
    }
  }

  remove() {
    this.game.remove(this);
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = MovingObject;


/***/ }),

/***/ "./lib/particles/particle.js":
/*!***********************************!*\
  !*** ./lib/particles/particle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {



class Particle {
  constructor(xpos, ypos, velocity, ctx, game, explosionId, particleID, colors) {
    this.colors = colors;
    this.game = game;
    this.active = true;
    this.hue = this.colors[Math.floor(this.colors.length * Math.random())];
    this.particleId;
    this.explosionId;
    

    this.x = xpos; // x and y position
    this.y = ypos;

    this.rectLength = 20;
    this.rectWidth = 2;
    // this.r = this.rand(200, 10, 0);
    this.initialVelocity = velocity;
    this.movementAngle = Math.random() * Math.PI * 2;
    this.vx = this.initialVelocity * Math.cos(this.movementAngle);
    this.vy = this.initialVelocity * Math.sin(this.movementAngle);
    this.acceleration = -0.1;

    this.opacity = Math.random() + .5;
    this.active = true;

    ctx.fillStyle = this.hue;
    ctx.fillRect(this.x, this.y, this.rectLength, this.rectWidth);
  }




  // private method
  rand(max, min, _int) {
    var max = (max === 0 || max) ? max : 1,
      min = min || 0,
      gen = min + (max - min) * Math.random();

    return (_int) ? Math.round(gen) : gen;
  };

  draw(ctx) {
    this.active = true;
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.acceleration * Math.sin(this.movementAngle);
    this.vx += this.acceleration * Math.cos(this.movementAngle);
    // this.hue -= 0.5;
    if ((Math.abs(this.vx) + Math.abs(this.vy)) < 0.05) {
      // debugger;
      this.remove();
    } else {
      // ctx.save();
      ctx.fillStyle = this.hue;
      ctx.fillRect(this.x, this.y, this.rectLength, this.rectWidth);
      // ctx.restore();
    }
  }

  remove() {
    this.game.remove(this, );
  }
}


module.exports = Particle;

/***/ }),

/***/ "./lib/particles/particle_explosion.js":
/*!*********************************************!*\
  !*** ./lib/particles/particle_explosion.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Particle = __webpack_require__(/*! ./particle */ "./lib/particles/particle.js")



const velocities = [7,6,5,4];

class ParticleExplosion{
  constructor(xpos, ypos, ctx, game, explosionId){
    this.COLORS = [
      ["#98f517", "#7eb92b", "#bdec7a", "#677c4a"],
      ["#fff12c", "#f5ec6d", "#a5a057", "#b1a71c"],
      ["#12e1fc", "#3cc6d8", "#71dfee", "#95dce6"],
      ["#fc57e0", "#cc48b6", "#aa489a", "#fa89e7"],
      ["#be56fa", "#9f60c4", "#571180", "#c796e4"]
    ]
    this.color = this.COLORS[Math.floor(Math.random() * this.COLORS.length)]
    this.game = game;
    this.particleNum = 80;
    this.particles = [];
    this.explosionId;

    for (var i = 0; i < this.particleNum; i++) {
      const particleId = i;
      
      const velocity = velocities[Math.floor(Math.random() * velocities.length)]
      this.particles.push(new Particle(xpos, ypos, velocity, ctx, game, this.explosionId, particleId, this.color));
    }
  }

  draw(ctx) {
    
    for (var i = 0; i < this.particles.length; i++) {
      if (this.particles[i].active === true) {
        this.particles[i].draw(ctx);
      }
    }

    // ANIMATION = requestAnimationFrame(drawScene);
  }

}




module.exports = ParticleExplosion;

/***/ }),

/***/ "./lib/ship.js":
/*!*********************!*\
  !*** ./lib/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(/*! ./moving_object */ "./lib/moving_object.js");
const Bullet = __webpack_require__(/*! ./bullet */ "./lib/bullet.js");
const Util = __webpack_require__(/*! ./util */ "./lib/util.js");

function randomColor() {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return color;
}

class Ship extends MovingObject {
  constructor(options) {
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || randomColor();
    super(options);
    this.mousePos = [0,0];
    this.fireAngle = 0; // might have to make it null
    setInterval(
      () => this.fireBullet(),
      1000 * 60 / (340 * 1.5)  )
    //  setInterval(
    //    () => this.fireBullet(),
    //    1000)
  }


  setFireAngle(mousePos) {
    if (mousePos === undefined){
      mousePos = this.mousePos;
    } else {
      this.mousePos = mousePos
    }
    let dy = mousePos[1] - this.pos[1];
    let dx = mousePos[0] - this.pos[0];
    this.fireAngle =  Math.atan2(dy, dx)

  }

  // draw(ctx) {
  //   ctx.fillStyle = this.color;

  //   ctx.beginPath();
  //   ctx.arc(
  //     this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  //   );
  //   ctx.fill();
  // }

  fireBullet(e) {
    // const norm = Util.norm(this.vel);

    // if (norm === 0) {
    //   // Can't fire unless moving.
    //   return;
    // }

    // const relVel = Util.scale(
    //   Util.dir(this.vel),
    //   Bullet.SPEED
    // );
    let shipvx = this.vel[0];
    let shipvy = this.vel[1];
    let relBulletVelX = Bullet.SPEED * Math.cos(this.fireAngle);
    let relBulletVelY = Bullet.SPEED * Math.sin(this.fireAngle);

    const bulletVel = [shipvx + relBulletVelX, shipvy + relBulletVelY];
    // const bulletVel = [
    //   relVel[0] + this.vel[0], relVel[1] + this.vel[1]
    // ];

    const bullet = new Bullet({
      pos: this.pos,
      vel: bulletVel,
      color: this.color,
      game: this.game
    });

    this.game.add(bullet);
  }

  power(impulse) {
    // this.vel[0] + 
    //check if the new speed is faster than limit because of the contribution
    // if it is, don't add that contribution
    // 
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  relocate() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  }
}

Ship.RADIUS = 4;
module.exports = Ship;


/***/ }),

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

const Util = {
  // Normalize the length of the vector to 1, maintaining direction.
  dir(vec) {
    const norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
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
  }
};

module.exports = Util;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map