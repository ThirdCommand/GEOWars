/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AnimationView.js":
/*!******************************!*\
  !*** ./src/AnimationView.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnimationView: () => (/* binding */ AnimationView)
/* harmony export */ });
/* harmony import */ var _game_objects_enemies_BoxBox_boxbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_objects/enemies/BoxBox/boxbox */ "./src/game_objects/enemies/BoxBox/boxbox.js");
/* harmony import */ var _game_objects_enemies_Pinwheel_pinwheel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_objects/enemies/Pinwheel/pinwheel */ "./src/game_objects/enemies/Pinwheel/pinwheel.js");
/* harmony import */ var _game_objects_enemies_Arrow_arrow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game_objects/enemies/Arrow/arrow */ "./src/game_objects/enemies/Arrow/arrow.js");
/* harmony import */ var _game_objects_enemies_Grunt_grunt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game_objects/enemies/Grunt/grunt */ "./src/game_objects/enemies/Grunt/grunt.js");
/* harmony import */ var _game_objects_enemies_Weaver_weaver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game_objects/enemies/Weaver/weaver */ "./src/game_objects/enemies/Weaver/weaver.js");
/* harmony import */ var _game_objects_enemies_Singularity_singularity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./game_objects/enemies/Singularity/singularity */ "./src/game_objects/enemies/Singularity/singularity.js");
/* harmony import */ var _game_objects_enemies_Singularity_alien_ship__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./game_objects/enemies/Singularity/alien_ship */ "./src/game_objects/enemies/Singularity/alien_ship.js");








class AnimationView {
  constructor(ctx) {
    this.ctx = ctx;
    this.gameObjects = [];
    this.lineSprites = [];
    this.zoomScale = 1;
    this.ship = {
      transform: {
        pos: [],
      },
    };
    this.lastTime = 0;
    this.animate = this.animate.bind(this);
  }

  start() {
    requestAnimationFrame(this.animate);
    this.lastTime = 0;
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    this.lastTime = time;
    this.animateGameObjects(timeDelta);
    this.clearCanvas();
    this.renderLineSprites(this.ctx);
    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }

  animateGameObjects(delta) {
    this.gameObjects.forEach((object) => {
      object.animate(delta);
    });
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, 200, 200);
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, 200, 200);
  }

  clear() {
    const removeList = [...this.gameObjects];
    removeList.forEach((gameObject) => {
      this.remove(gameObject);
    });
  }

  renderLineSprites(ctx) {
    // ctx.scale = gameEngine.currentCamera.zoomScale
    this.ctx.save();

    this.ctx.scale(this.zoomScale, this.zoomScale);
    this.lineSprites.forEach((sprite) => {
      sprite.draw(ctx);
    });
    this.ctx.restore();
    // ctx.scale(1,1)
  }

  addGameObject(gameObject) {
    this.gameObjects.push(gameObject);
  }

  queueSound(sound) {}

  addCollider() {}

  addPhysicsComponent(physicsComponent) {}

  remove(gameObject) {
    if (gameObject.lineSprite) {
      this.lineSprites.splice(
        this.lineSprites.indexOf(gameObject.lineSprite),
        1
      );
    }

    this.gameObjects.splice(this.gameObjects.indexOf(gameObject), 1);
  }

  addLineSprite(lineSprite) {
    this.lineSprites.push(lineSprite);
  }

  addEnemy(type) {
    const enemyMap = {
      BoxBox: (pos) => new _game_objects_enemies_BoxBox_boxbox__WEBPACK_IMPORTED_MODULE_0__.BoxBox(this, pos),
      Pinwheel: (pos) => new _game_objects_enemies_Pinwheel_pinwheel__WEBPACK_IMPORTED_MODULE_1__.Pinwheel(this, pos),
      Arrow: (pos, angle) => new _game_objects_enemies_Arrow_arrow__WEBPACK_IMPORTED_MODULE_2__.Arrow(this, pos, angle),
      Grunt: (pos) => new _game_objects_enemies_Grunt_grunt__WEBPACK_IMPORTED_MODULE_3__.Grunt(this, pos, this.ship.transform),
      Weaver: (pos) => new _game_objects_enemies_Weaver_weaver__WEBPACK_IMPORTED_MODULE_4__.Weaver(this, pos, this.ship.transform),
      Singularity: (pos) => new _game_objects_enemies_Singularity_singularity__WEBPACK_IMPORTED_MODULE_5__.Singularity(this, pos),
      AlienShip: (pos) => new _game_objects_enemies_Singularity_alien_ship__WEBPACK_IMPORTED_MODULE_6__.AlienShip(this, pos, [0, 0], this.ship.transform),
    };
    enemyMap[type]([100, 100]);
  }
}


/***/ }),

/***/ "./src/game_engine/Levels/LevelDesign/EnemyPlacer.js":
/*!***********************************************************!*\
  !*** ./src/game_engine/Levels/LevelDesign/EnemyPlacer.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EnemyPlacer: () => (/* binding */ EnemyPlacer)
/* harmony export */ });
/* harmony import */ var _game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_object */ "./src/game_engine/game_object.js");
/* harmony import */ var _PlacingAnimation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PlacingAnimation */ "./src/game_engine/Levels/LevelDesign/PlacingAnimation.js");
/* harmony import */ var _game_objects_enemies_BoxBox_boxbox_sprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_objects/enemies/BoxBox/boxbox_sprite */ "./src/game_objects/enemies/BoxBox/boxbox_sprite.js");
/* harmony import */ var _game_objects_enemies_Arrow_arrow_sprite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../game_objects/enemies/Arrow/arrow_sprite */ "./src/game_objects/enemies/Arrow/arrow_sprite.js");
/* harmony import */ var _game_objects_enemies_Grunt_grunt_sprite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../game_objects/enemies/Grunt/grunt_sprite */ "./src/game_objects/enemies/Grunt/grunt_sprite.js");
/* harmony import */ var _game_objects_enemies_Pinwheel_pinwheel_sprite__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../game_objects/enemies/Pinwheel/pinwheel_sprite */ "./src/game_objects/enemies/Pinwheel/pinwheel_sprite.js");
/* harmony import */ var _game_objects_enemies_Weaver_weaver_sprite__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../game_objects/enemies/Weaver/weaver_sprite */ "./src/game_objects/enemies/Weaver/weaver_sprite.js");
/* harmony import */ var _game_objects_enemies_Singularity_singularity_sprite__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../game_objects/enemies/Singularity/singularity_sprite */ "./src/game_objects/enemies/Singularity/singularity_sprite.js");
// while placing, could do spawning animation over mouse position
// once placed, draw it at the placed location
// store the location

// maybe I need a nested canvas for the pallet

// load spawn event
// save spawn event
// create spawn event










const spriteMap = {
    BoxBox: (transform) => new _game_objects_enemies_BoxBox_boxbox_sprite__WEBPACK_IMPORTED_MODULE_2__.BoxBoxSprite(transform),
    Arrow: (transform) => new _game_objects_enemies_Arrow_arrow_sprite__WEBPACK_IMPORTED_MODULE_3__.ArrowSprite(transform),
    Grunt: (transform) => new _game_objects_enemies_Grunt_grunt_sprite__WEBPACK_IMPORTED_MODULE_4__.GruntSprite(transform),
    Pinwheel: (transform) => new _game_objects_enemies_Pinwheel_pinwheel_sprite__WEBPACK_IMPORTED_MODULE_5__.PinwheelSprite(transform),
    Weaver: (transform) => new _game_objects_enemies_Weaver_weaver_sprite__WEBPACK_IMPORTED_MODULE_6__.WeaverSprite(transform),
    Singularity: (transform) => new _game_objects_enemies_Singularity_singularity_sprite__WEBPACK_IMPORTED_MODULE_7__.SingularitySprite(transform),
};

// if trying to spawn multiple things on top of each other, I should only grab the first placer that is found in the click colission
const getClickRadius = {
    BoxBox: 10,
    Arrow: 10,
    Grunt: 10,
    Pinwheel: 10,
    Weaver: 10,
    Singularity: 10,
};

class EnemyPlacer extends _game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject {
    constructor(engine, type, levelDesigner) {
        super(engine);
        this.addLineSprite(spriteMap[type](this.transform));
        this.addMousePosListener();
        this.addChildGameObject(new _PlacingAnimation__WEBPACK_IMPORTED_MODULE_1__.PlacingAnimation(this.gameEngine));
        this.levelDesigner = levelDesigner;
        this.clickRadius = getClickRadius[type];
        this.type = type;
    // collider should be added after placed
    }

    place() {
        this.addCollider("General", this, this.clickRadius);
        const spawn = { type: this.type, location: this.transform.pos };
        this.levelDesigner.addSpawnToEvent();
        this.removeMousePosListener();
    }

    followMouse() {
        this.addMousePosListener();
        this.addChildGameObject(new _PlacingAnimation__WEBPACK_IMPORTED_MODULE_1__.PlacingAnimation(this.gameEngine));
    }

    updateMousePos(mousePos) {
        this.transform.pos[0] = mousePos[0];
        this.transform.pos[1] = mousePos[1];
    }
}



/***/ }),

/***/ "./src/game_engine/Levels/LevelDesign/PlacingAnimation.js":
/*!****************************************************************!*\
  !*** ./src/game_engine/Levels/LevelDesign/PlacingAnimation.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlacingAnimation: () => (/* binding */ PlacingAnimation)
/* harmony export */ });
/* harmony import */ var _game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_object */ "./src/game_engine/game_object.js");


class PlacingAnimation extends _game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject {
    constructor(engine) {
        super(engine);
        this.initialSpawningScale = 1.5;
        this.cycleSpeed = 0.1;
        this.addClickListener();
    }

    // Mouse handling should call this I think?
    placeEnemy() {
        this.parentObject.place();
        this.parentObject.lineSprite.spawningScale = 1;
        this.removeClickListener();
        this.remove();
    }

    mouseClicked(mousePos) {
        this.placeEnemy();
    }

    update(timeDelta) {
        const cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;

        if (this.parentObject.lineSprite.spawningScale < 0.7) {
            this.parentObject.lineSprite.spawningScale = this.initialSpawningScale;
        } else {
            this.parentObject.lineSprite.spawningScale -=
        this.cycleSpeed * cycleSpeedScale;
        }
    }
}
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;


/***/ }),

/***/ "./src/game_engine/Levels/levelDesigner.js":
/*!*************************************************!*\
  !*** ./src/game_engine/Levels/levelDesigner.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LevelDesigner: () => (/* binding */ LevelDesigner)
/* harmony export */ });
/* harmony import */ var _game_objects_Walls_walls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_objects/Walls/walls */ "./src/game_objects/Walls/walls.js");
/* harmony import */ var _game_objects_Overlay_overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_objects/Overlay/overlay */ "./src/game_objects/Overlay/overlay.js");
/* harmony import */ var _game_objects_particles_Grid_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game_objects/particles/Grid/grid */ "./src/game_objects/particles/Grid/grid.js");
/* harmony import */ var _LevelDesign_EnemyPlacer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LevelDesign/EnemyPlacer */ "./src/game_engine/Levels/LevelDesign/EnemyPlacer.js");
/* harmony import */ var _game_script__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../game_script */ "./src/game_script.js");
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../transform */ "./src/game_engine/transform.js");
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./scene */ "./src/game_engine/Levels/scene.js");









// I should collect palced enemies

class LevelDesigner {
    constructor(engine, animationView) {
        this.DIM_X = 1000;
        this.DIM_Y = 600;
        this.BG_COLOR = "#000000";
        this.engine = engine;
        this.animationView = animationView;
        // this.walls = this.createWalls();
        // this.grid = this.createGrid();
        this.palletModal = this.getPalletModal();
        this.gameEditorOpened = false;

        const addArrowButton = document.getElementById("Arrow");
        const addBoxBox = document.getElementById("BoxBox");
        const addPinwheel = document.getElementById("Pinwheel");
        const addWeaver = document.getElementById("Weaver");
        const addSingularity = document.getElementById("Singularity");
        const makeGame = document.getElementById("LevelEditor");
        this.gameSequenceDisplay = new _scene__WEBPACK_IMPORTED_MODULE_6__.GameSequenceDisplay();

        addArrowButton.onclick = (e) => {
            e.stopPropagation();
            const type = "Arrow";
            this.addEnemy(type);
            this.animationView.clear();
            this.animationView.addEnemy(type);
        };
        addBoxBox.onclick = (e) => {
            e.stopPropagation();
            const type = "BoxBox";
            this.addEnemy(type);
            this.animationView.clear();
            this.animationView.addEnemy(type);
        };
        addPinwheel.onclick = (e) => {
            e.stopPropagation();
            const type = "Pinwheel";
            this.addEnemy(type);
            this.animationView.clear();
            this.animationView.addEnemy(type);
        };
        addWeaver.onclick = (e) => {
            e.stopPropagation();
            const type = "Weaver";
            this.addEnemy(type);
            this.animationView.clear();
            this.animationView.addEnemy(type);
        };
        addSingularity.onclick = (e) => {
            e.stopPropagation();
            const type = "Singularity";
            this.addEnemy(type);
            this.animationView.clear();
            this.animationView.addEnemy(type);
        };
        makeGame.onclick = (e) => {
            e.stopPropagation();
            console.log("game editor opened clicked");
            this.gameEditorOpened = !this.gameEditorOpened;
            this.engine.gameEditorOpened = this.gameEditorOpened;
            // change text to save or something. accidental click seems bad though
        };

        console.log({
            addSingularity,
            makeGame,
        });
    }

    levelDesigner(time) {
        const timeDelta = time - this.lastTime;
        this.engine;
    }

    getPalletModal() {
        const modal = document.getElementById("pallet");

    // add functions to buttons of the pallet
    }

    addEnemy(type) {
        new _LevelDesign_EnemyPlacer__WEBPACK_IMPORTED_MODULE_3__.EnemyPlacer(this.engine, type, this);
    }

    addSpawnToEvent(spawn) {
        new _scene__WEBPACK_IMPORTED_MODULE_6__.Spawn(this.engine, spawn);
    }

    addNewEvent() {}

    update(deltaTime) {}

    createWalls() {
        return new _game_objects_Walls_walls__WEBPACK_IMPORTED_MODULE_0__.Walls(this.engine, this);
    }

    createGrid(cameraTransform) {
        return new _game_objects_particles_Grid_grid__WEBPACK_IMPORTED_MODULE_2__.Grid(this.engine, this, new _transform__WEBPACK_IMPORTED_MODULE_5__.Transform());
    }

    createOverlay() {
        return new _game_objects_Overlay_overlay__WEBPACK_IMPORTED_MODULE_1__.Overlay(this.engine, this, this.ship.transform);
    }

    isOutOfBounds(pos, radius) {
        const max = [_game_script__WEBPACK_IMPORTED_MODULE_4__.GameScript.DIM_X - radius, _game_script__WEBPACK_IMPORTED_MODULE_4__.GameScript.DIM_Y - radius];
        if (radius) {
            return (
                pos[0] <= radius ||
        pos[0] >= max[0] ||
        pos[1] <= radius ||
        pos[1] >= max[1]
            );
        } else {
            return (
                pos[0] < 0 ||
        pos[1] < 0 ||
        pos[0] > _game_script__WEBPACK_IMPORTED_MODULE_4__.GameScript.DIM_X ||
        pos[1] > _game_script__WEBPACK_IMPORTED_MODULE_4__.GameScript.DIM_Y
            );
        }
    }
}


/***/ }),

/***/ "./src/game_engine/Levels/scene.js":
/*!*****************************************!*\
  !*** ./src/game_engine/Levels/scene.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Event: () => (/* binding */ Event),
/* harmony export */   GameSequence: () => (/* binding */ GameSequence),
/* harmony export */   GameSequenceDisplay: () => (/* binding */ GameSequenceDisplay),
/* harmony export */   Operation: () => (/* binding */ Operation),
/* harmony export */   Scene: () => (/* binding */ Scene),
/* harmony export */   Spawn: () => (/* binding */ Spawn)
/* harmony export */ });
const DIM_X = 1000;
const DIM_Y = 600;
const game = {
    flatOES: [
        {
            name: 'LevelOne-Start',
            __typename: 'Scene'
        },
        {
            name: 'EasySpawns-Start',
            __typename: 'Scene'
        },
        {
            spawns: [
                {
                    type: 'RANDOM', // if random, then possibleTypes exists
                    location: 'RANDOM', 
                    possibleTypes: ['BoxBox','Pinwheel','Arrow'], 
                    numberToGenerate: 10, // if there's a location it will be 1
                    angle: undefined // for arrows
                }
            ],
            __typename: 'Event'
        },
        {
            type: 'WAIT',
            time: 0,
            waitTime: 10,
            __typename: 'Operation'
        },
        {
            name: 'EasySpawns-End',
            __typename: 'Scene'
        },
        {
            type: 'LOOP',
            loop: {
                loopIdx: 0,
                sequenceIndexToLoopTo: 0,
                repeatTimes: 5
            },
            __typename: 'Operation'
        },
        {
            name: 'LevelOne-End',
            __typename: 'Scene'
        }
    ]
};

class GameSequenceDisplay {
    constructor(engine) {
        this.engine = engine;
        this.displaySequence = [];
    }
    

}

class GameSequence{
    constructor (engine, flatOES) {
        this.engine = engine;
        this.sequenceIdx = 0;
        this.flatOES = engine.flatOES;
    }

    loadGame() {

    }
    update(dT) {
        flatOES[sequenceIdx].update(dT);
    }

    nextSequence(i=1) {
        if(typeOf(flatOES[this.sequenceIdx + i]) === 'Scene') { // TODO fix class name
            this.nextSequence(++i);
        }
        this.sequenceIdx += i;
    }

    serialize() {

    }
}

class Scene {
    constructor(gameSequence, name) {
        this.name = name;
    }
}

// loop, wait, 
class Operation {
    constructor(gameSequence, {type,waitTime,loop}) {
        this.gameSequence = gameSequence;
        this.type = type;
        this.waitTime = waitTime;
        this.time = 0;
        this.loop = loop; // {loopIdx, sequenceIndexToLoopTo, repeatTimes} // 
        this.startingValues = {
            type: type,
            time: 0,
            waitTime: waitTime,
            loop: {
                loopIdx: loop.loopIdx,
                sequenceIndexToLoopTo: sequenceIndexToLoopTo,
                repeatTimes: repeatTimes
            }
        };
    }

    update(dT) {
        if(this.type === "WAIT") {
            this.time += dT;
            if(this.time >= this.waitTime) {
                endOperation();
            }
        } else if (this.type === "LOOP") {
            if(this.loop.loopIdx >= this.loop.repeatTimes) { // 3: 0, 1, 2
                endOperation();
            } else {
                gameSequence.sequenceIndex = this.loop.sequenceIndexToLoopTo;
                
            }

        }
    }

    resetStartingValues() {
        this.type = this.startingValues.type;
        this.time = 0,
        this.waitTime = this.startingValues.waitTime,
        this.loop =  {
            loopIdx: this.startingValues.loop.loopIdx,
            sequenceIndexToLoopTo: this.startingValues.sequenceIndexToLoopTo,
            repeatTimes: this.startingValues.repeatTimes
        };
    }

    endOperation() {
        this.resetStartingValues();
        this.gameSequence.nextSequence();
    }
}


class Event {
    constructor(gameSequence, spawns) {
        this.gameSequence = gameSequence;
        this.spawns = spawns; // this is different than the single spawn thing I have in the mock data
    }

    update(dT) {
        spawnEverything();
        endEvent();
    }

    spawnEverything() {
        this.spawns.forEach((spawn) => {
            spawn.spawnEvent();
        });
    }
    endEvent() {
        this.gameSequence.nextSequence();
    }
}

// a single enemy, and location
class Spawn { 
    constructor(gameEngine, spawn) { // spawn: {type, location: [x,y]} 
        this.spawn = spawn;
        this.gameEngine = gameEngine;
    }

    randomPosition() {
        return [
            this.DIM_X * 0.70 * Math.random(),
            this.DIM_Y * 0.70 * Math.random(),
            // 500,300
        ];
    }

    randomMob(possibleSpawns) {
        return possibleSpawns[Math.floor(Math.random() * possibleSpawns.length) % possibleSpawns.length];
    }

    spawnEvent() {
        for(let i = 0; i < this.spawn.numberToGenerate; i++) {
            let mobToSpawn = this.spawn.type;
            let location = this.spawn.location;
            if(this.spawn.type === 'RANDOM') {
                mobToSpawn = randomMob(this.spawn.possibleSpawns);
            } 
            if(this.spawn.location === 'RANDOM') {
                location = randomPosition();
            }
            this.gameEngine.enemyCreatorList[mobToSpawn](location);
        }
    }

    serialize() {

    }
}



// MOB randomly picked from chosen list
// location randomly picked

/***/ }),

/***/ "./src/game_engine/collider.js":
/*!*************************************!*\
  !*** ./src/game_engine/collider.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Collider: () => (/* binding */ Collider)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/game_engine/util.js");
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



class Collider {
    constructor(
        type,
        gameObject,
        radius = 5,
        subscriptions,
        subscribedColliderTypes
    ) {
        this.objectType = gameObject.constructor.name;
        this.type = type;
        this.subscriptions = subscriptions;
        this.subscribedColliderTypes = subscribedColliderTypes;
        this.radius = radius;
        this.gameObject = gameObject;
    }
    // wondering if collision should cascade up the parent objects
    // nope not yet anyway

    collisionCheck(otherCollider) {
        const centerDist = _util__WEBPACK_IMPORTED_MODULE_0__.Util.dist(
            this.gameObject.transform.pos,
            otherCollider.gameObject.transform.pos
        );
        if (centerDist < this.radius + otherCollider.radius) {
            this.gameObject.onCollision(otherCollider, this.type);
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

/***/ "./src/game_engine/color.js":
/*!**********************************!*\
  !*** ./src/game_engine/color.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Color: () => (/* binding */ Color)
/* harmony export */ });

class Color {
    constructor(colorSpec){
        this.colorType = Object.keys(colorSpec)[0];
        this.creationErrorCheck(colorSpec);
        this.extractColorInfo(colorSpec);
    }

    creationErrorCheck(colorSpec){
        if (Object.keys(colorSpec).length !== 1) {
            new Error("Color object accepts one color type");
        }
        if (!Color.COLOR_TYPES.includes(this.colorType)) {
            new Error("Color Object given unsupported color type");
        }
    }

    dup(){
        const dupSpec = {};
        if (this.colorType === "rgb") {
            dupSpec["rgb"]  = [this.r, this.g, this.b];
        } else if (this.colorType === "rgba") {
            dupSpec["rgba"] = [this.r, this.g, this.b, this.a];
        } else if (this.colorType === "hsl") {
            dupSpec["hsl"]  = [this.h, this.s, this.l];
        } else if (this.colorType === "hsla") {
            dupSpec["hsla"] = [this.h, this.s, this.l, this.a];
        }
        const newColor = new Color(dupSpec);
        return newColor;
    }

    extractColorInfo(colorSpec){
        if (this.colorType === "rgb"){
            this.r = colorSpec[this.colorType][0];
            this.g = colorSpec[this.colorType][1];
            this.b = colorSpec[this.colorType][2];
        } else if (this.colorType === "rgba"){
            this.r = colorSpec[this.colorType][0];
            this.g = colorSpec[this.colorType][1];
            this.b = colorSpec[this.colorType][2];
            this.a = colorSpec[this.colorType][3];
        } else if (this.colorType === "hsl"){
            this.h = colorSpec[this.colorType][0];
            this.s = colorSpec[this.colorType][1];
            this.l = colorSpec[this.colorType][2];
        } else if (this.colorType === "hsla"){
            this.h = colorSpec[this.colorType][0];
            this.s = colorSpec[this.colorType][1];
            this.l = colorSpec[this.colorType][2];
            this.a = colorSpec[this.colorType][3];
        } 
        colorSpec[this.colorType];
    }

    evaluateColor(){
        if (this.colorType === "rgb"){
            return `rbg(${this.r},${this.g},${this.b},)`;
        } else if (this.colorType === "rgba"){
            return `rbg(${this.r},${this.g},${this.b},${this.a})`;
        } else if (this.colorType === "hsl"){
            return `hsl(${this.h},${this.s}%,${this.l}%`;
        } else if (this.colorType === "hsla") {
            return `hsla(${this.h}, ${this.s}%, ${this.l}%, ${this.a}`;
        }
    }
}
Color.COLOR_TYPES = ["rgb", "rgba", "hsl", "hsla"];

/***/ }),

/***/ "./src/game_engine/game_engine.js":
/*!****************************************!*\
  !*** ./src/game_engine/game_engine.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameEngine: () => (/* binding */ GameEngine)
/* harmony export */ });
/* harmony import */ var _game_script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game_script */ "./src/game_script.js");


class GameEngine {
    constructor(ctx) {
        this.ctx = ctx;
        this.gameObjects = [];
        this.physicsComponents = [];
        this.lineSprites = [];
        this.soundsToPlay = {};
        this.colliders = {};
        this.subscribers = [];
        this.muted = true;
        this.mouseListeners = [];
        this.clickListeners = [];
        this.leftControlStickListeners = [];
        this.rightControlStickListeners = [];
        this.xButtonListeners = [];
        this.startButtonListeners = [];
        this.gameScript = new _game_script__WEBPACK_IMPORTED_MODULE_0__.GameScript(this);
        this.toRemoveQueue = [];
        this.paused = false;
        this.currentCamera = null;
        this.defaultZoomScale = 1.3;
        this.zoomScale = 1.3;
        this.graphicQuality = 1;
        this.setupController();
        this.setupPerformance();
        window.engine = this;
        this.gameEditorOpened = false;
    }

    setupPerformance() {
        this.collisionTime = 0;
        this.physicsCalcTime = 0;
        this.updateTime = 0;
        this.renderTime = 0;
        this.scriptTime = 0;
        this.timePassed = 0;
    }

    setupController() {
        window.addEventListener("gamepadconnected", function (e) {
            window.controller = e.gamepad;
            window.engine.controller = e.gamepad;
            // Gamepad connected
            console.log("Gamepad connected", e.gamepad);
        });

        window.addEventListener("gamepaddisconnected", function (e) {
            // Gamepad disconnected
            window.engine.controller = null;
            console.log("Gamepad disconnected", e.gamepad);
        });
    }

    updateGraphicSetting(delta) {
        if (delta > 50) {
            // console.log("worst")
            this.graphicQuality = 3;
        } else if (delta > 25) {
            this.graphicQuality = 2;
        } else {
            this.graphicQuality = 1;
        }
    }

    tick(delta) {
    // debugger
        this.updateGraphicSetting(delta);
        if (this.paused) {
            this.updateControlListeners();
            return;
        }
        // console.log(delta)
        // if(delta > 125){
        //   delta = 125
        // }
        const beforeCollisionTime = performance.now();
        this.checkCollisions();
        const beforePhysicsCalcs = performance.now();
        const collisionTime = beforeCollisionTime - beforePhysicsCalcs;
        this.movePhysicsComponents(delta);
        const beforeUpdate = performance.now();
        const physicsCalcTime = beforePhysicsCalcs - beforeUpdate;
        this.updateGameObjects(delta);
        const beforeRender = performance.now();
        const updateTime = beforeUpdate - beforeRender;
        this.clearCanvas();
        this.renderLineSprites(this.ctx);
        const beforeScriptUpdate = performance.now();
        const renderTime = beforeRender - beforeScriptUpdate;
        this.updateControlListeners();
        if (!this.gameEditorOpened) {
            this.updateGameScript(delta);
        }
        const scriptTime = beforeScriptUpdate - performance.now();
        this.playSounds();

        this.collectPerformanceData(
            delta,
            collisionTime,
            physicsCalcTime,
            updateTime,
            renderTime,
            scriptTime
        );
    }

    collectPerformanceData(
        delta,
        collisionTime,
        physicsCalcTime,
        updateTime,
        renderTime,
        scriptTime
    ) {
        this.collisionTime += collisionTime;
        this.physicsCalcTime += physicsCalcTime;
        this.updateTime += updateTime;
        this.renderTime += renderTime;
        this.scriptTime += scriptTime;

        this.timePassed += delta;
        if (this.timePassed > 1000 * 60) {
            const totalTime =
        this.collisionTime +
        this.physicsCalcTime +
        this.updateTime +
        this.renderTime +
        this.scriptTime;
            const timeData = {
                collisionTime: (100 * this.collisionTime) / totalTime,
                physicsCalcTime: (100 * this.physicsCalcTime) / totalTime,
                updateTime: (100 * this.updateTime) / totalTime,
                renderTime: (100 * this.renderTime) / totalTime,
                scriptTime: (100 * this.scriptTime) / totalTime,
            };
            console.log(timeData);

            this.setupPerformance();
        }
    }

    pause() {
        this.paused = true;
        this.gameScript.onPause();
    }

    unPause() {
        this.paused = false;
        this.gameScript.onUnPause();
    }

    togglePause() {
    // console.log("pausetoggle")
        this.paused ? this.unPause() : this.pause();
    }

    clearCanvas() {
        this.ctx.clearRect(
            -this.gameScript.DIM_X,
            -this.gameScript.DIM_Y,
            this.gameScript.DIM_X * this.zoomScale * 4,
            this.gameScript.DIM_Y * this.zoomScale * 4
        );
        this.ctx.fillStyle = this.gameScript.BG_COLOR;
        this.ctx.fillRect(
            -this.gameScript.DIM_X,
            -this.gameScript.DIM_Y,
            this.gameScript.DIM_X * this.zoomScale * 4,
            this.gameScript.DIM_Y * this.zoomScale * 4
        );
    }

    addLeftControlStickListener(object) {
        this.leftControlStickListeners.push(object);
    }

    addRightControlStickListener(object) {
        this.rightControlStickListeners.push(object);
    }

    addxButtonListener(object) {
        this.xButtonListeners.push(object);
    }

    addStartButtonListener(object) {
        this.startButtonListeners.push(object);
    }

    addClickListener(object) {
        this.clickListeners.push(object);
    }

    mouseClicked(position) {
        this.clickListeners.forEach((object) => {
            object.mouseClicked(position);
        });
    }

    removeClickListener(object) {
        this.clickListeners.splice(this.clickListeners.indexOf(object), 1);
    }

    updateLeftControlStickListeners(unitVector) {
        this.leftControlStickListeners.forEach((listener) => {
            listener.updateLeftControlStickInput(unitVector);
        });
    }

    updateRightControlStickListeners(unitVector) {
        this.rightControlStickListeners.forEach((listener) => {
            listener.updateRightControlStickInput(unitVector);
        });
    }

    updatexButtonListeners(xButton) {
        this.xButtonListeners.forEach((listener) => {
            listener.updatexButtonListener(xButton);
        });
    }

    updateStartButtonListeners(startButton, down) {
    // console.log([startButton, down])
        this.startButtonListeners.forEach((listener) => {
            listener.updateStartButtonListener(startButton, down);
        });
    }

    updateMousePos(mousePos) {
        this.mouseListeners.forEach((object) => {
            object.updateMousePos(mousePos);
        });
    }

    removeMouseListener(object) {
        this.mouseListeners.splice(this.mouseListeners.indexOf(object), 1);
    }

    updateControlListeners() {
        navigator.getGamepads();
        if (this.controller) {
            const leftAxis = [window.controller.axes[0], window.controller.axes[1]];
            const rightAxis = [window.controller.axes[2], window.controller.axes[3]];
            const xButton = [window.controller.buttons[0].pressed];
            const startButton = [window.controller.buttons[9].pressed];
            this.updatexButtonListeners(xButton);
            this.updateLeftControlStickListeners(leftAxis);
            this.updateRightControlStickListeners(rightAxis);
            this.updateStartButtonListeners(startButton);
        }
    }

    movePhysicsComponents(delta) {
        this.physicsComponents.forEach((component) => {
            component.move(delta);
        });
    }

    addCollider(collider) {
        if (collider.subscriptions) {
            this.subscribers.push(collider);
        }
        const colliders = this.colliders;
        // collider: object absolute transform
        // collider {"objectType": "Bullet", "type": "general", "subscriptions": ["BoxBox", "Arrow"], "subscribedColliderTypes": ["General"]}
        // colliders {"Singularity": {"General": [collider, collider], "GravityWell": [collider, collider]}}
        if (!colliders[collider.objectType]) {
            const collidersSameTypeAndObject = {};
            collidersSameTypeAndObject[collider.type] = [collider];
            colliders[collider.objectType] = collidersSameTypeAndObject;
        } else {
            if (!colliders[collider.objectType][collider.type]) {
                colliders[collider.objectType][collider.type] = [collider];
            } else {
                colliders[collider.objectType][collider.type].push(collider);
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
        const subscribers = this.subscribers;
        const colliders = this.colliders;
        this.stillCanDie = false;
        // console.log(this.subscribers)
        subscribers.forEach((subscriber) => {
            if (subscriber.type === "ShipDeath") {
                this.stillCanDie = true;
                // console.log("CAN DIE")
            }
            subscriber.subscriptions.forEach((subscription) => {
                colliders[subscription] = colliders[subscription] || {};
                subscriber.subscribedColliderTypes.forEach((colliderType) => {
                    colliders[subscription][colliderType] =
            colliders[subscription][colliderType] || [];
                    colliders[subscription][colliderType].forEach(
                        (subscribedCollider) => {
                            subscriber.collisionCheck(subscribedCollider);
                        }
                    );
                });
            });
        });
        if (!this.stillCanDie) {
            // console.log(this.gameScript.ship.collider)
            this.gameScript.ship.addCollider(
                "General",
                this.gameScript.ship,
                this.gameScript.ship.radius
            );
            this.gameScript.ship.addCollider(
                "ShipDeath",
                this.gameScript.ship,
                this.gameScript.ship.radius,
                ["BoxBox", "Singularity", "Weaver", "Grunt", "Arrow", "Pinwheel"],
                ["General"]
            );
        }
    }

    updateGameObjects(delta) {
        this.gameObjects.forEach((object) => {
            object.update(delta);
        });
    }

    toggleMute() {
        this.muted = !this.muted;
    }

    playSounds() {
        Object.values(this.soundsToPlay).forEach((sound) => {
            sound.play();
        });
        this.soundsToPlay = {};
    }

    renderLineSprites(ctx) {
        // ctx.scale = gameEngine.currentCamera.zoomScale
        this.ctx.save();

        // this belongs in the camera #camera
        this.ctx.scale(this.zoomScale, this.zoomScale);
        this.lineSprites.forEach((sprite) => {
            sprite.draw(ctx);
        });
        this.ctx.restore();
    // ctx.scale(1,1)
    }

    addMouseListener(object) {
        console.log("hello, game engine");
        this.mouseListeners.push(object);
    }

    updateGameScript(delta) {
        this.gameScript.update(delta);
    }

    addGameObject(object) {
        this.gameObjects.push(object);
    }

    addPhysicsComponent(physicsComponent) {
        this.physicsComponents.push(physicsComponent);
    }

    addLineSprite(lineSprite) {
        this.lineSprites.push(lineSprite);
    }

    queueSound(sound) {
        if (!this.muted) {
            this.soundsToPlay[sound.url] = sound;
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
            this.physicsComponents.splice(
                this.physicsComponents.indexOf(gameObject.physicsComponent),
                1
            );
        }
        if (gameObject.lineSprite) {
            this.lineSprites.splice(
                this.lineSprites.indexOf(gameObject.lineSprite),
                1
            );
        }
        this.removeColliders(gameObject.colliders);

        this.gameObjects.splice(this.gameObjects.indexOf(gameObject), 1);
    }

    removeColliders(colliders) {
        colliders.forEach((collider) => {
            if (collider.subscriptions) {
                this.subscribers.splice(this.subscribers.indexOf(collider), 1);
            }

            const objectAndColliderTypeList =
        this.colliders[collider.objectType][collider.type];
            objectAndColliderTypeList.splice(
                objectAndColliderTypeList.indexOf(collider),
                1
            );
        });
    }
}

// the idea:
// engine takes in collider with gameobject type as string
// this way subscriptions can be done via string names
// enemy is subscribed to bullets..
// each enemy will check every bullet
// convert gameobject type to string
// colliders can be added without subscriptions
// subscriptions are an array of strings stored with the collider


/***/ }),

/***/ "./src/game_engine/game_object.js":
/*!****************************************!*\
  !*** ./src/game_engine/game_object.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameObject: () => (/* binding */ GameObject)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/game_engine/util.js");
/* harmony import */ var _sound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sound */ "./src/game_engine/sound.js");
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transform */ "./src/game_engine/transform.js");
/* harmony import */ var _physics_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./physics_component */ "./src/game_engine/physics_component.js");
/* harmony import */ var _line_sprite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./line_sprite */ "./src/game_engine/line_sprite.js");
/* harmony import */ var _collider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./collider */ "./src/game_engine/collider.js");








class GameObject {
    constructor(engine) {
        this.gameEngine = engine;
        this.gameEngine.addGameObject(this);
        this.transform = new _transform__WEBPACK_IMPORTED_MODULE_2__.Transform();
        this.childObjects = [];
        this.physicsComponent = null;
        this.lineSprite = null;
        this.parentObject = null;
        this.colliders = [];
    }

    animate() {
    // put animation stuffs here
    }

    addPhysicsComponent() {
        this.physicsComponent = new _physics_component__WEBPACK_IMPORTED_MODULE_3__.PhysicsComponent(this.transform);
        this.gameEngine.addPhysicsComponent(this.physicsComponent);
    }

    addLineSprite(lineSprite) {
        this.lineSprite = lineSprite;
        this.gameEngine.addLineSprite(this.lineSprite);
    }

    addMousePosListener() {
        this.gameEngine.addMouseListener(this);
    }

    removeMousePosListener() {
        this.gameEngine.removeMouseListener(this);
    }

    addLeftControlStickListener() {
        this.gameEngine.addLeftControlStickListener(this);
    }

    addRightControlStickListener() {
        this.gameEngine.addRightControlStickListener(this);
    }

    addxButtonListener() {
        this.gameEngine.addxButtonListener(this);
    }

    addStartButtonListener() {
        this.gameEngine.addStartButtonListener(this);
    }

    updateRightControlStickInput(direction) {}

    updateLeftControlStickInput(direction) {}

    updatexButtonListener() {}

    updateStartButtonListener() {}

    updateMousePos(mousePos) {}

    addClickListener() {
        this.gameEngine.addClickListener(this);
    }

    removeClickListener() {
        this.gameEngine.removeClickListener(this);
    }

    mouseClicked(mousePos) {}

    addCollider(type, gameObject, radius, subscriptionTypes, subscriptions) {
    // game engine checks every collider with it's subscription types
        const newCollider = new _collider__WEBPACK_IMPORTED_MODULE_5__.Collider(
            type,
            gameObject,
            radius,
            subscriptionTypes,
            subscriptions
        );
        this.colliders.push(newCollider);
        this.gameEngine.addCollider(newCollider);
    }

    playSound(sound) {
        this.gameEngine.queueSound(sound);
    }

    // relative motion needs to be fixed... FOR ANOTHER TIME
    addChildGameObject(obj, relative) {
        this.childObjects.push(obj);
        if (relative) {
            obj.transform.parentTransform = this.transform;
        }
        obj.parentObject = this;
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
            obj.remove();
        });
        if (this.parentObject) {
            this.parentObject.childObjects.splice(
                this.parentObject.childObjects.indexOf(this),
                1
            );
        }
        this.gameEngine.remove(this);
    }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;


/***/ }),

/***/ "./src/game_engine/line_sprite.js":
/*!****************************************!*\
  !*** ./src/game_engine/line_sprite.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LineSprite: () => (/* binding */ LineSprite)
/* harmony export */ });
class LineSprite {
    constructor(transform) {
        this.transform = transform;
        // this.drawFunction = draw
        this.zoomScaling = 1;
    }
    // abstract functions
    draw(ctx) {
        const pos = this.transform.absolutePosition();
        const angle = this.transform.abosluteAngle();
        this.drawFunction(ctx, pos, angle);
    }
    drawFunction(ctx, pos, angle) {

    }
}


/***/ }),

/***/ "./src/game_engine/physics_component.js":
/*!**********************************************!*\
  !*** ./src/game_engine/physics_component.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PhysicsComponent: () => (/* binding */ PhysicsComponent)
/* harmony export */ });
class PhysicsComponent {
    constructor(transform) {
        this.transform = transform;
    }

    move(timeDelta) {
    // timeDelta is number of milliseconds since last move
    // if the computer is busy the time delta will be larger
    // in this case the PhysicsObject should move farther in this frame
        const timeScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        this.transform.pos[0] += this.transform.vel[0] * timeScale + (this.transform.acc[0] * (timeScale * timeScale)) / 2;
        this.transform.pos[1] += this.transform.vel[1] * timeScale + (this.transform.acc[1] * (timeScale * timeScale)) / 2;
        this.transform.pos[2] += this.transform.vel[2] * timeScale + (this.transform.acc[2] * (timeScale * timeScale)) / 2;
        
        this.transform.vel[0] += this.transform.acc[0] * timeScale;
        this.transform.vel[1] += this.transform.acc[1] * timeScale;
        this.transform.vel[2] += this.transform.acc[2] * timeScale;

        this.transform.angle += this.transform.aVel;
        this.transform.aVel += this.transform.aAcc;

        this.transform.acc = [0, 0, 0];
        this.transform.aAcc = 0;
    }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;


/***/ }),

/***/ "./src/game_engine/sound.js":
/*!**********************************!*\
  !*** ./src/game_engine/sound.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sound: () => (/* binding */ Sound)
/* harmony export */ });

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
            this.muted ? this.unmute() : this.mute();
        }
    }

    unmute(){
        if(this.sound){
            this.muted = false; 
            this.sound.volume = this.volume;
        }
    }

    mute(){
        if(this.sound){
            this.muted = true;
            this.sound.volume = 0;
        }
    }

    pause(){
        if(this.sound){
            this.sound.pause();
        } 
    }
    unPause(){
        if (this.sound) {
            this.sound.play();
        }
    }
}


/***/ }),

/***/ "./src/game_engine/state_machine.js":
/*!******************************************!*\
  !*** ./src/game_engine/state_machine.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StateMachine: () => (/* binding */ StateMachine)
/* harmony export */ });
/* harmony import */ var _game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_object */ "./src/game_engine/game_object.js");


class StateMachine extends _game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject {
    constructor(engine, {}) {
        super(engine);
        this.stateIndex = options.stateIndex || { i: 0 };
        (this.parentState = options.parentState),
        (waitTime = 0),
        (stateQueue = []),
        event,
        (timesDo = 1),
        (endCondition = true);
        this.stateIndex = stateIndex;
        this.parentIndex = parentIndex;
        this.stateTime = 0;

        this.waitTime = waitTime;
        this.stateQueue = stateQueue;
        this.event = event;
        this.timesDo = timesDo;
        this.endCondition = endCondition;
        // if not null, it will repeat until the condition is met\
        // but it will meet the repeatcondition first.
        // end condition returns a bool. default true

        // there is no "break" condition yet

        this.repeatCount = 1; // do something 3 times. 1 index not 0 index

        // first it waits,
        // then it runs through state queue
        // then it runs the event
        //      state queue and event can be empty,
        //        which means the state was just for waiting
        // then it checks the repeat condition

    // event is something that runs in one frame
    }

    addChilState(state) {
        state.parentIndex = this;
    }

    // state queue is now done
    onCompletion() {
        this.event();
        // 1 index not 0
        if (this.repeatCount <= this.timesDo) {
            this.stateIndex.i = 0;
            this.currentTime = 0;
        } else if (!this.endCondition) {
            this.stateIndex.i = 0;
            this.currentTime = 0;
        } else {
            this.parentIndex += 1;
            this.remove();
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

    event() {
        this.eventCondition();
    }
    //spawner
    //easy wave
    //

    updateState(intervalTime) {
        if (this.stateIndex > this.stateQueue.length) {
            this.onCompletion();
        } else {
            this.stateTime += intervalTime;
            if (intervalTime > this.waitTime) {
                this.stateQueue[this.stateIndex.i].updateState(intervalTime);
            }
        }
    }

    remove() {
        this.childObjects.forEach((obj) => {
            obj.remove();
        });
        if (this.parentObject) {
            this.parentObject.childObjects.splice(
                this.parentObject.childObjects.indexOf(this),
                1
            );
        }
        this.stateQueue.forEach((obj) => {
            obj.remove();
        });

        this.gameEngine.remove(this);
    }
}

/***/ }),

/***/ "./src/game_engine/transform.js":
/*!**************************************!*\
  !*** ./src/game_engine/transform.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Transform: () => (/* binding */ Transform)
/* harmony export */ });
class Transform {
    constructor(
        cameraTransform = null,
        pos = [0, 0, 0],
        vel = [0, 0, 0],
        acc = [0, 0, 0],
        angle = 0,
        aVel = 0,
        aAcc = 0,
        parentTransform = null
    ) {
        this.cameraTransform = cameraTransform;
        this.parentTransform = parentTransform;
        this.angle = angle;
        this.aVel = aVel;
        this.aAcc = aAcc;
        this.pos = pos;
        this.vel = vel;
        this.acc = acc;
    }

    // object will have a render position projected on to the field based on where the camera is and the object's position (z)

    getRenderPosition() {
        // takes in the camera position and the object's position
        // returns the render position (position projected on to the field)
        
        //Yp = -Zc(Ys - Yc)/(-Zc + Zs)
        //Xp = -Zc(Xs - Xc)/(-Zc + Zs)


    }

    // call up the tree of parent transforms until null
    // performing the transformation each step for the absolute
    absoluteAngle() {
        if (this.parentTransform == null) {
            return this.angle;
        } else {
            return this.angleAdd(this.angle, this.parentTransform.absoluteAngle());
        }
    }

    absolutePosition() {
        let absPos = [];
       
        if (this.parentTransform == null) {
            if (this.cameraTransform) {
                const Xc = this.cameraTransform.pos[0];
                const Yc = this.cameraTransform.pos[1];
                const Zc = this.cameraTransform.pos[2];
                const Xs = this.pos[0];
                const Ys = this.pos[1];
                const Zs = this.pos[2];

                const Yp = Yc + (Ys-Yc)/(Zs-Zc) * (0 - Zc);
                const Xp = Xc + (Xs-Xc)/(Zs-Zc) * (0 - Zc);
                absPos = [Xp, Yp];
            } else {
                absPos = [this.pos[0], this.pos[1]];
            }
            

            return absPos;
        } else {
            return this.vectorAdd(this.pos, this.parentTransform.absolutePosition());
        }
    }

    absoluteLength(length, relativePosition = [0,0,0]) {
        // doesn't care about line orientation
        // center of the line is current position, or adjusted by relative position
        // assuming camera is on top of the line
        const linePosition = this.vectorAdd(relativePosition, this.pos);
        const Zc = this.cameraTransform.pos[2];
        const pointOne = length / 2;
        const pointTwo = -length / 2;
        const Zs = linePosition[2];
        const absPointOne = (pointOne)/(Zs-Zc) * (0 - Zc);
        const absPointTwo = (pointTwo)/(Zs-Zc) * (0 - Zc);
        return absPointOne - absPointTwo;
    }

    absoluteVelocity() {
        let absVel = [];
        if (this.parentTransform == null) {
            absVel = this.vel;
            return absVel;
        } else {
            return this.vectorAdd(this.vel, this.parentTransform.absoluteVelocity());
        }
    }

    absoluteAcceleration() {
        let absAcc = [];
        if (this.parentTransform == null) {
            absAcc = this.acc;
            return absAcc;
        } else {
            return this.vectorAdd(
                this.acc,
                this.parentTransform.absoluteAcceleration()
            );
        }
    }

    vectorAdd(vector1, vector2) {
        return vector1.length === 3 && vector2.length === 3 ? 
            [vector1[0] + vector2[0], vector1[1] + vector2[1], vector1[2] + vector2[2]] : 
            [vector1[0] + vector2[0], vector1[1] + vector2[1]];
    }

    angleAdd(angle1, angle2) {
        return (angle1 + angle2) % (2 * Math.PI);
    }
}


/***/ }),

/***/ "./src/game_engine/util.js":
/*!*********************************!*\
  !*** ./src/game_engine/util.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Util: () => (/* binding */ Util)
/* harmony export */ });
const Util = {
    // Normalize the length of the vector to 1, maintaining direction.
    dir(vec) {
        const norm = Util.norm(vec);
        return Util.scale(vec, 1 / norm);
    },
    vectorCartesian(angle,scale){
        let vector = [];
        vector = [scale * Math.cos(angle), scale * Math.sin(angle)];
        return vector;
    },
    vector3Cartesian(angle,scale){ // angle is [plane, out of plane]
        return [scale * Math.cos(angle[0]) * Math.cos(angle[1]), scale * Math.sin(angle[0]) * Math.cos(angle[1]), scale * Math.sin(angle[1])];
    },
    vector3Add(vec1, vec2){
        return [vec1[0] + vec2[0], vec1[1] + vec2[1], vec1[2] + vec2[2]];
    },
    // Find distance between two points.
    dist(pos1, pos2) {
        let answer;
        if(isNaN(pos1[2])) pos1[2] = 0;
        if(isNaN(pos2[2])) pos2[2] = 0;
        if(pos1.length === 3 && pos2.length === 3) {

            answer =  Math.sqrt(
                (pos1[0] - pos2[0]) ** 2 + (pos1[1] - pos2[1]) ** 2 + (pos1[2] - pos2[2]) ** 2
            );
            if(isNaN(answer)) {
                console.log("NaN");
            }
            return answer;
        }
        answer =  Math.sqrt(
            (pos1[0] - pos2[0]) ** 2 + (pos1[1] - pos2[1]) ** 2
        );
        if(isNaN(answer)) {
            console.log("NaN");
        }
        return answer;
    },
    // Find the length of the vector.
    norm(vec) {
        return Util.dist([0, 0, 0], vec);
    },
    // Return a randomly oriented vector with the given length.
    randomVec(length) {
        const deg = 2 * Math.PI * Math.random();
        return Util.scale([Math.sin(deg), Math.cos(deg)], length);
    },
    // Scale the length of a vector by the given amount.
    scale(vec, m) {
        if(vec.length === 3) {
            return [vec[0] * m, vec[1] * m, vec[2] * m];
        }
        return [vec[0] * m, vec[1] * m];
    },

  
 
};


/***/ }),

/***/ "./src/game_objects/Bullet/bullet.js":
/*!*******************************************!*\
  !*** ./src/game_objects/Bullet/bullet.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bullet: () => (/* binding */ Bullet)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.js");
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/sound */ "./src/game_engine/sound.js");
/* harmony import */ var _particles_bullet_wall_explosion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../particles/bullet_wall_explosion */ "./src/game_objects/particles/bullet_wall_explosion.js");
/* harmony import */ var _bullet_sprite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bullet_sprite */ "./src/game_objects/Bullet/bullet_sprite.js");
/* harmony import */ var _particles_particle_explosion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../particles/particle_explosion */ "./src/game_objects/particles/particle_explosion.js");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../game_engine/util */ "./src/game_engine/util.js");






class Bullet extends _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject {
    constructor(engine, pos, vel, bulletNumber, powerUpSide, powerLevel) {
        super(engine);
        this.ID = bulletNumber;
        this.transform.pos[0] = pos[0];
        this.transform.pos[1] = pos[1];
        this.transform.pos[2] = 0;
        this.transform.vel[0] = vel[0];
        this.transform.vel[1] = vel[1];
        this.transform.vel[2] = 0;
        this.length = 12;
        this.radius = this.length / 4;
        this.wrap = false;
        this.wallhit = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__.Sound("GEOWars/sounds/bullet_hitwall.wav", 1);
        this.addExplosionCollider();
        this.addPhysicsComponent();
        this.addLineSprite(new _bullet_sprite__WEBPACK_IMPORTED_MODULE_3__.BulletSprite(this.transform));
        this.exploded = false;
        this.lifeTime = 4000;
        this.aliveTime = 0;
        this.powerUpSide = powerUpSide;
        this.bending = true;
        this.bendTime = 0;
        this.timeToBend = 1000;
        this.powerLevel = 1; 
        if (!powerUpSide) {
            this.bending = false;
        }
    }

    addExplosionCollider() {
        const subscribers = [
            "Grunt",
            "Pinwheel",
            "BoxBox",
            "Arrow",
            "Singularity",
            "Weaver",
            "AlienShip",
        ];
        this.addCollider("bulletHit", this, this.radius, subscribers, ["General"]);
        this.addCollider("General", this, this.radius);
    }

    update(deltaTime) {
        this.aliveTime += deltaTime;
        if (this.aliveTime > this.lifeTime) {
            this.remove();
        }

        if (this.bending) {
            this.bend(deltaTime);
        } 
        if (
            this.gameEngine.gameScript.isOutOfBounds(
                this.transform.absolutePosition()
            ) &&
            !this.exploded
        ) {
            this.exploded = true;
            new _particles_bullet_wall_explosion__WEBPACK_IMPORTED_MODULE_2__.BulletWallExplosion(this.gameEngine, this.transform.pos);

            this.gameEngine.queueSound(this.wallhit);
            this.remove();
        }
    }

    bend(deltaTime) {  
        this.bendTime += deltaTime;
        if (this.bendTime > this.timeToBend) {
            this.bending = false;
        } else {
            const speed = _game_engine_util__WEBPACK_IMPORTED_MODULE_5__.Util.norm(this.transform.vel);
            const velDir = Math.atan2(this.transform.vel[1], this.transform.vel[0]);
            let bendSpeed;
            if(this.powerLevel > 2){
                // maybe I control the speed with trigger pressure
                bendSpeed = this.powerUpSide === 'left' ? -0.0098 * deltaTime : 0.0098 * deltaTime;// (pi/32) / 1000 radians per milisecond
            } else {
                bendSpeed = this.powerUpSide === 'left' ? -0.000098 * deltaTime : 0.000098 * deltaTime;// (pi/32) / 1000 radians per milisecond
            }
            

            this.transform.vel[0] = Math.cos(velDir + bendSpeed) * speed;
            this.transform.vel[1] = Math.sin(velDir + bendSpeed) * speed;
        }
        // take speed, take velocity direction, change direction with bend speed, apply speed to that direction 
    }

    onCollision(collider, type) {
        if (type === "bulletHit") {
            if (collider.objectType === "Singularity") {
                collider.gameObject.bulletHit();
                this.remove();
            } else {
                const hitObjectTransform = collider.gameObject.transform;
                const pos = hitObjectTransform.absolutePosition();
                const explosion = new _particles_particle_explosion__WEBPACK_IMPORTED_MODULE_4__.ParticleExplosion(this.gameEngine, pos);
                this.gameEngine.gameScript.tallyScore(collider.gameObject);
                collider.gameObject.remove();
                this.remove();
            }
        }
    }

    // move(timeDelta) {

    // }
}

Bullet.RADIUS = 3;
Bullet.SPEED = 7;
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;


/***/ }),

/***/ "./src/game_objects/Bullet/bullet_sprite.js":
/*!**************************************************!*\
  !*** ./src/game_objects/Bullet/bullet_sprite.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BulletSprite: () => (/* binding */ BulletSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/line_sprite */ "./src/game_engine/line_sprite.js");


class BulletSprite extends _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__.LineSprite {
    constructor(transform, spawningScale = 1) {
        super(transform);
        this.spawningScale = spawningScale;
        this.length = 12;
    }

    draw(ctx) {
        const l = this.length;
        const pos = this.transform.absolutePosition();
        const vel = this.transform.absoluteVelocity();

        const w = this.length / 2;
        const movementDirection = Math.atan2(vel[0], -vel[1]);

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


/***/ }),

/***/ "./src/game_objects/Overlay/overlay.js":
/*!*********************************************!*\
  !*** ./src/game_objects/Overlay/overlay.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Overlay: () => (/* binding */ Overlay)
/* harmony export */ });
/* harmony import */ var _overlay_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./overlay_sprite */ "./src/game_objects/Overlay/overlay_sprite.js");
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.js");





class Overlay extends _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__.GameObject {
    constructor(engine, gameScript, shipTransform) {
        super(engine);
        this.gameScript = gameScript;
        this.shipTransform = shipTransform;
        this.transform.pos = [0, 0];
        this.addLineSprite(new _overlay_sprite__WEBPACK_IMPORTED_MODULE_0__.OverlaySprite(this.shipTransform, this.gameScript.DIM_X, this.gameScript.DIM_Y, this.gameEngine));
    }

    update(deltaTime) {
        this.lineSprite.score = this.gameScript.score;
        this.lineSprite.lives = this.gameScript.lives;
    }
}


/***/ }),

/***/ "./src/game_objects/Overlay/overlay_sprite.js":
/*!****************************************************!*\
  !*** ./src/game_objects/Overlay/overlay_sprite.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OverlaySprite: () => (/* binding */ OverlaySprite)
/* harmony export */ });
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/line_sprite */ "./src/game_engine/line_sprite.js");
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/color */ "./src/game_engine/color.js");


class OverlaySprite extends _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__.LineSprite {
    constructor(transform, DIM_X, DIM_Y, gameEngine) {
        super(transform);
        this.gameEngine = gameEngine;
        this.transform = transform;
        this.width = DIM_X;
        this.height = DIM_Y;
        this.score = 0;
        this.lives = 0;
        this.fontSize = 20;
        this.fontStyle = "Arial";
        this.shadowColor = new _game_engine_color__WEBPACK_IMPORTED_MODULE_1__.Color({
            "hsla": [202, 100, 70, 1]
        });
        this.color = new _game_engine_color__WEBPACK_IMPORTED_MODULE_1__.Color({
            "hsla": [202, 100, 70, 0.5]
        });
    }

    draw(ctx) {
        ctx.save();
        ctx.scale(1 / this.gameEngine.zoomScale, 1 / this.gameEngine.zoomScale);
        const zoomFactor = this.gameEngine.zoomScale / this.gameEngine.defaultZoomScale;
        ctx.font = this.fontSize * 1.3 + "px " + this.fontStyle;
        ctx.fillStyle = this.color.evaluateColor();

        ctx.fillText("Score: " + this.score + "      " + "Lives: " + this.lives, (this.transform.pos[0] - 350 / zoomFactor) * this.gameEngine.zoomScale, (this.transform.pos[1] - 150 / zoomFactor )* this.gameEngine.zoomScale);
        ctx.restore();
    }
}

/***/ }),

/***/ "./src/game_objects/Walls/walls.js":
/*!*****************************************!*\
  !*** ./src/game_objects/Walls/walls.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Walls: () => (/* binding */ Walls)
/* harmony export */ });
/* harmony import */ var _walls_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./walls_sprite */ "./src/game_objects/Walls/walls_sprite.js");
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.js");



class Walls extends _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__.GameObject {
    constructor(engine, gameScript) {
        super(engine);
        this.gameScript = gameScript;
        this.transform.pos = [0,0];
        this.addLineSprite(new _walls_sprite__WEBPACK_IMPORTED_MODULE_0__.WallsSprite(this.transform, this.gameScript.DIM_X, this.gameScript.DIM_Y));
    }

    update(deltaTime) {
        
    }
}

/***/ }),

/***/ "./src/game_objects/Walls/walls_sprite.js":
/*!************************************************!*\
  !*** ./src/game_objects/Walls/walls_sprite.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WallsSprite: () => (/* binding */ WallsSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/line_sprite */ "./src/game_engine/line_sprite.js");
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/color */ "./src/game_engine/color.js");


class WallsSprite extends _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__.LineSprite {
    constructor(transform, DIM_X, DIM_Y) {
        super(transform);
        this.width = DIM_X;
        this.height = DIM_Y;
        this.shadowColor = new _game_engine_color__WEBPACK_IMPORTED_MODULE_1__.Color({
            "hsla": [202, 100, 70, 1]
        });
        this.color = new _game_engine_color__WEBPACK_IMPORTED_MODULE_1__.Color({
            "hsla": [202, 100, 70, 0.2]
        });
    }

    draw(ctx) {
        const w = this.width;
        const h = this.height;
        const pos = this.transform.absolutePosition();

        ctx.save();
        ctx.beginPath();
        ctx.translate(pos[0], pos[1]);

        const blurFactor = 0.5;
        ctx.shadowColor = this.shadowColor.evaluateColor();
        ctx.shadowBlur = 10;
        ctx.strokeStyle = this.color.evaluateColor();
        ctx.lineWidth = 7.5 * blurFactor * 2;
        this.drawWalls(ctx, w, h);
        ctx.lineWidth = 6 * 2;// * blurFactor;
        this.drawWalls(ctx, w, h);
        ctx.lineWidth = 4.5 * 2; // * blurFactor;
        this.drawWalls(ctx, w, h);
        ctx.lineWidth = 3 * 2;// * blurFactor;
        this.drawWalls(ctx, w, h);
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = 1.5 * 2;// * blurFactor;
        this.drawWalls(ctx, w, h);

        ctx.restore();
    }

    drawWalls(ctx,w,h){
        const offset = 6;
        ctx.beginPath;
        ctx.moveTo(-offset, -offset);
        ctx.lineTo(w + offset, -offset);
        ctx.lineTo(w + offset, h + offset); //3
        ctx.lineTo(0 - offset, h + offset);
        ctx.closePath();
        ctx.stroke();
    }
}

/***/ }),

/***/ "./src/game_objects/enemies/Arrow/arrow.js":
/*!*************************************************!*\
  !*** ./src/game_objects/enemies/Arrow/arrow.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Arrow: () => (/* binding */ Arrow)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.js");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/util */ "./src/game_engine/util.js");
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_engine/sound */ "./src/game_engine/sound.js");
/* harmony import */ var _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../particles/enemy_spawn */ "./src/game_objects/particles/enemy_spawn.js");
/* harmony import */ var _arrow_sprite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./arrow_sprite */ "./src/game_objects/enemies/Arrow/arrow_sprite.js");






class Arrow extends _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject {
    constructor(engine, pos, angle = Math.PI / 3) {
        super(engine);
        this.transform.pos = pos;
        this.transform.angle = angle;
        this.speed = 3;
        this.points = 50;
        this.transform.vel = _game_engine_util__WEBPACK_IMPORTED_MODULE_1__.Util.vectorCartesian(this.transform.angle, this.speed);
        this.radius = 6;
        this.spawnSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_2__.Sound("GEOWars/sounds/Enemy_spawn_purple.wav", 0.5);
        this.playSound(this.spawnSound);
        this.addLineSprite(new _arrow_sprite__WEBPACK_IMPORTED_MODULE_4__.ArrowSprite(this.transform));
        this.addChildGameObject(new _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_3__.EnemySpawn(this.gameEngine));
        this.exists = false;
        this.time = 0;
    }

    exist() {
    // leaving off subscriptions means that things will subscribe to it
        this.addCollider("General", this, this.radius);
        // now it will move
        this.addPhysicsComponent();
        this.exists = true;
    }

    animate(delta) {
        this.time += delta;
        const cycleSpeedScale = delta / NORMAL_FRAME_TIME_DELTA;
        const cycleSpeed = 0.004;
        const widthRotate = Math.sin(this.time * cycleSpeedScale * cycleSpeed);
        const twoFullRotationCheck = this.time * cycleSpeedScale * cycleSpeed;

        if (twoFullRotationCheck >= Math.PI * 2 * 4) {
            this.time = 0;
        }
        this.lineSprite.yRotation = this.time * cycleSpeedScale * cycleSpeed;
        this.lineSprite.widthScaleForRotation = Math.sin(
            this.time * cycleSpeedScale * cycleSpeed
        );
        this.lineSprite.zScaleForRotation = Math.sin(
            this.time * cycleSpeedScale * cycleSpeed + Math.PI / 2
        );
    }

    update(delta) {
    // ADD TO UPDATE FOR THE OBJECTS
        this.animate(delta);

        const pos = this.transform.absolutePosition();
        if (this.gameEngine.gameScript.isOutOfBounds(pos)) {
            this.gameEngine.gameScript.redirect(this.transform);
        }
    }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;


/***/ }),

/***/ "./src/game_objects/enemies/Arrow/arrow_sprite.js":
/*!********************************************************!*\
  !*** ./src/game_objects/enemies/Arrow/arrow_sprite.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArrowSprite: () => (/* binding */ ArrowSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.js");

class ArrowSprite extends _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__.LineSprite {
    constructor(transform, spawningScale = 1) {
        super(transform);
        this.spawningScale = spawningScale;
        this.widthScaleForRotation = 1;
        this.zScaleForRotation = 0;
        this.yRotation = 0;
    }

    draw(ctx) {
        const pos = this.transform.absolutePosition();
        const spawningScale = this.spawningScale || 1;
        const shipLength = 10.5 * 2.2 * spawningScale;
        const shipWidth = 9 * 2.2 * spawningScale;
        const l = shipLength;
        const w = shipWidth * this.widthScaleForRotation;
        const z = shipWidth * this.zScaleForRotation;
        const movementDirection = Math.atan2(
            this.transform.vel[0],
            -this.transform.vel[1]
        );

        const r = 255;
        const g = 255;
        const b = 50;

        ctx.save();
        ctx.beginPath();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(movementDirection + 1 * Math.PI);

        // ctx.strokeStyle = "#f2ff00"; // look up rgb and put here
        // ctx.lineWidth = 2 / 2;

        ctx.shadowColor = "rgb(255,255,255)";
        ctx.shadowBlur = 1.5;
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        const lineWidth = 2;

        const rightLineWidth =
      lineWidth + 2.5 * Math.sin(this.yRotation + Math.PI / 2);
        const leftLineWidth =
      lineWidth - 2.5 * Math.sin(this.yRotation + Math.PI / 2);
        const topLineWidth = lineWidth + 2.5 * Math.sin(this.yRotation);
        const bottomLineWidth = lineWidth - 2.5 * Math.sin(this.yRotation);

        // this.drawArrow(
        //   ctx,
        //   l,
        //   w,
        //   z,
        //   rightLineWidth,
        //   leftLineWidth,
        //   topLineWidth,
        //   bottomLineWidth
        // );

        this.drawArrow(
            ctx,
            l,
            w,
            z,
            rightLineWidth * 0.75,
            leftLineWidth * 0.75,
            topLineWidth * 0.75,
            bottomLineWidth * 0.75
        );

        this.drawArrow(
            ctx,
            l,
            w,
            z,
            rightLineWidth * 0.6,
            leftLineWidth * 0.6,
            topLineWidth * 0.6,
            bottomLineWidth * 0.6
        );

        this.drawArrow(
            ctx,
            l,
            w,
            z,
            rightLineWidth * 0.45,
            leftLineWidth * 0.45,
            topLineWidth * 0.45,
            bottomLineWidth * 0.45
        );

        this.drawArrow(
            ctx,
            l,
            w,
            z,
            rightLineWidth * 0.3,
            leftLineWidth * 0.3,
            topLineWidth * 0.3,
            bottomLineWidth * 0.3
        );

        ctx.strokeStyle = "rgb(255, 255, 255)";
        // this should be half the other line width for the effect, even after adding sin
        this.drawArrow(
            ctx,
            l,
            w,
            z,
            rightLineWidth * 0.15,
            leftLineWidth * 0.15,
            topLineWidth * 0.15,
            bottomLineWidth * 0.15
        );

        ctx.restore();
    }

    drawArrow(
        ctx,
        l,
        w,
        z,
        rightLineWidth,
        leftLineWidth,
        topLineWidth,
        bottomLineWidth
    ) {
        ctx.lineWidth = rightLineWidth;
        ctx.beginPath();
        ctx.moveTo(0, 0.4762 * l); //1
        ctx.lineTo(0.5 * w, -0.2381 * l); //2
        ctx.lineTo(0.25 * w, -0.5238 * l); //3
        ctx.lineTo(0.1666 * w, -0.2381 * l); //4
        ctx.lineTo(0, -0.2381 * l); //4.5
        ctx.stroke();

        ctx.lineWidth = leftLineWidth;
        ctx.beginPath();
        ctx.lineTo(0, -0.2381 * l); //4.5
        ctx.lineTo(-0.1666 * w, -0.2381 * l); //5
        ctx.lineTo(-0.25 * w, -0.5238 * l); //6
        ctx.lineTo(-0.5 * w, -0.2381 * l); //7
        ctx.lineTo(0, 0.4762 * l); //1
        ctx.stroke();

        ctx.lineWidth = topLineWidth;
        ctx.beginPath();
        ctx.moveTo(-0.1666 * z, -0.0952 * l); //1
        ctx.lineTo(-0.3333 * z, -0.2381 * l); //2
        ctx.lineTo(-0.25 * z, -0.381 * l); //3
        ctx.closePath();
        ctx.stroke();

        ctx.lineWidth = bottomLineWidth;
        ctx.beginPath();
        ctx.moveTo(0.1666 * z, -0.0952 * l); //1
        ctx.lineTo(0.3333 * z, -0.2381 * l); //2
        ctx.lineTo(0.25 * z, -0.381 * l); //3
        ctx.closePath();
        ctx.stroke();

    // ctx.lineWidth = lineWidth / 2;
    // ctx.beginPath();
    // ctx.moveTo(0.2083 * z, -0.2381 * l); //1
    // ctx.lineTo(-0.2083 * z, -0.2381 * l); //2
    // ctx.stroke();
    }
}
/*
// OG
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
*/


/***/ }),

/***/ "./src/game_objects/enemies/BoxBox/boxbox.js":
/*!***************************************************!*\
  !*** ./src/game_objects/enemies/BoxBox/boxbox.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BoxBox: () => (/* binding */ BoxBox)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.js");
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/sound */ "./src/game_engine/sound.js");
/* harmony import */ var _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../particles/enemy_spawn */ "./src/game_objects/particles/enemy_spawn.js");
/* harmony import */ var _boxbox_sprite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./boxbox_sprite */ "./src/game_objects/enemies/BoxBox/boxbox_sprite.js");





class BoxBox extends _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject {
    constructor(engine, pos) {
        super(engine);
        this.spawnSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__.Sound("GEOWars/sounds/Enemy_spawn_blue.wav", 0.5);
        this.transform.pos = pos;
        this.radius = 10;
        this.points = 20;
        // this.addPhysicsComponent()
        this.projectedDrawCoordinates = {};
        
        this.boxWidth = 10;
        this.boxDepth = this.boxWidth;

        // there's only two versions of this coordate object
        // 1. bottom left, top right
        // 2. top left, bottom right


        // bottom left:
        const w = this.boxWidth;
        const d = this.boxDepth;
        // the axis of rotation determines the length of the line for the _ coordinates

        // This one is done
        const drawCoordinatesTopLeft = {
            // try making y negativified

            BottomSquareBL: [-3/4 * w, 3/4 * w],
            BottomSquareBR: [1/4 * w, 3/4 * w],
            BottomSquareTL: [-3/4 * w, -1/4 * w],
            BottomSquareTR: [1/4 * w, -1/4 * w],
            TopSquareBL: [-1/4 * w, 1/4 * w],
            TopSquareBR: [3/4 * w, 1/4 * w],
            TopSquareTL: [-1/4 * w, -3/4 * w],
            TopSquareTR: [3/4 * w, -3/4 * w],
            Left: { // distances to axis of rotation, [x, y, angleOffset], y is the same, x requires pythag;
                // take these distances to the axis of rotation, and then multiply them by cos(angle) of rotation
                _BottomSquareBL: [d,  3/4 * w, Math.PI/2], // angle starts 90 degrees 
                _BottomSquareBR: [Math.sqrt(w**2 + d**2), 3/4 * w, Math.atan(d/w)], // scaled length is distance from axis of rotation
                _BottomSquareTL: [d, -1/4 * w, Math.PI/2],
                _BottomSquareTR: [Math.sqrt(w**2 + d**2), -1/4 * w, Math.atan(d/w)],
                _TopSquareBL: [Math.sqrt((w / 2)**2 + d**2), 1/4 * w, Math.atan(d/(w/2))],
                _TopSquareBR: [Math.sqrt((3/2 * w)**2 + d**2), 1/4 * w, Math.atan(d/(3/2 * w))],
                _TopSquareTL: [Math.sqrt((w / 2)**2 + d**2), -3/4 * w, Math.atan(d/(w/2))],
                _TopSquareTR: [Math.sqrt((3/2 * w)**2 + d**2), -3/4 * w, Math.atan(d/(3/2 * w))]
            },
            Right: {
                _BottomSquareBL: [Math.sqrt((3/2 * w)**2 + d**2), 3/4 * w, Math.atan(d/(3/2 * w))], // angle starts 90 degrees 
                _BottomSquareBR: [Math.sqrt((w / 2)**2 + d**2), 3/4 * w, Math.atan(d/(w/2))],
                _BottomSquareTL: [Math.sqrt((3/2 * w)**2 + d**2), -1/4 * w, Math.atan(d/(3/2 * w))],
                _BottomSquareTR: [Math.sqrt((w / 2)**2 + d**2), -1/4 * w, Math.atan(d/(w/2))],
                _TopSquareBL: [Math.sqrt(w**2 + d**2), 1/4 * w, Math.atan(d/w)],
                _TopSquareBR: [d, 1/4 * w, Math.PI/2], 
                _TopSquareTL: [Math.sqrt(w**2 + d**2), -3/4 * w, Math.atan(d/w)],
                _TopSquareTR: [d, -3/4 * w, Math.PI/2] 
            },
            Top: { // X stays the same, Y scales
                _BottomSquareBL: [-3/4 * w, d, -Math.PI/2],
                _BottomSquareBR: [1/4 * w, d, -Math.PI/2],
                _BottomSquareTL: [-3/4 * w, -Math.sqrt(w**2 + d**2), Math.atan(d/ w)],
                _BottomSquareTR: [1/4 * w, -Math.sqrt(w**2 + d**2), Math.atan(d/ w)],
                _TopSquareBL: [-1/4 * w, -Math.sqrt((w / 2)**2 + d**2), Math.atan(d/(w/2))],
                _TopSquareBR: [3/4 * w, -Math.sqrt((w / 2)**2 + d**2), Math.atan(d/(w/2))],
                _TopSquareTL: [-1/4 * w, -Math.sqrt((3/2 * w)**2 + d**2),  Math.atan(d/(3/2 * w))],
                _TopSquareTR: [3/4 * w, -Math.sqrt((3/2 * w)**2 + d**2),  Math.atan(d/(3/2 * w))],
            },
            Bottom: { // X stays the same, Y scales
                // BL <=> TR, TL <=> BR
                _BottomSquareBL: [-3/4 * w, Math.sqrt((3/2 * w)**2 + d**2),  Math.atan(d/(3/2 * w))],
                _BottomSquareBR: [1/4 * w, Math.sqrt((3/2 * w)**2 + d**2),  Math.atan(d/(3/2 * w))],
                _BottomSquareTL: [-3/4 * w, Math.sqrt((w / 2)**2 + d**2), Math.atan(d/(w/2))],
                _BottomSquareTR: [1/4 * w, Math.sqrt((w / 2)**2 + d**2), Math.atan(d/(w/2))],
                _TopSquareBL: [-1/4 * w, Math.sqrt(w**2 + d**2), Math.atan(d/ w)],
                _TopSquareBR: [3/4 * w, Math.sqrt(w**2 + d**2), Math.atan(d/ w)],
                _TopSquareTL: [-1/4 * w, d, Math.PI/2],
                _TopSquareTR: [3/4 * w, d, Math.PI/2],
            },
            _BottomSquareBL: [-3/4 * w, 3/4 * w],
            _BottomSquareBR: [1/4 * w, 3/4 * w],
            _BottomSquareTL: [-3/4 * w, -1/4 * w],
            _BottomSquareTR: [1/4 * w, -1/4 * w],
            _TopSquareBL: [-1/4 * w, 1/4 * w],
            _TopSquareBR: [3/4 * w, 1/4 * w],
            _TopSquareTL: [-1/4 * w, -3/4 * w],
            _TopSquareTR: [3/4 * w, -3/4 * w],
        };
        
        const drawCoordinatesBottomLeft = {
            // I think 
            // flip Y coordinates for this shape


            BottomSquareBL: [-3/4 * w, 1/4 * w],
            BottomSquareBR: [1/4 * w, 1/4 * w],
            BottomSquareTL: [-3/4 * w, -3/4 * w],
            BottomSquareTR: [1/4 * w, -3/4 * w],
            TopSquareBL: [-1/4 * w, 3/4 * w],
            TopSquareBR: [3/4 * w, 3/4 * w],
            TopSquareTL: [-1/4 * w, -1/4 * w],
            TopSquareTR: [3/4 * w, -1/4 * w],

            // top and bottom are correct
            // left and right are wrong
           
            Left: { // distances to axis of rotation, [x, y, angleOffset], y is the same, x requires pythag;
                // take these distances to the axis of rotation, and then multiply them by cos(angle) of rotation
                //BL <=> TL, BR <=> TR
                _BottomSquareBL: [d, 1/4 * w, Math.PI/2],
                _BottomSquareBR:  [Math.sqrt(w**2 + d**2), 1/4 * w, Math.atan(d/w)],
                _BottomSquareTL: [d,  -3/4 * w, Math.PI/2], 
                _BottomSquareTR: [Math.sqrt(w**2 + d**2), -3/4 * w, Math.atan(d/w)],
                _TopSquareBL: [Math.sqrt((w / 2)**2 + d**2), 3/4 * w, Math.atan(d/(w/2))],
                _TopSquareBR: [Math.sqrt((3/2 * w)**2 + d**2), 3/4 * w, Math.atan(d/(3/2 * w))],
                _TopSquareTL: [Math.sqrt((w / 2)**2 + d**2), -1/4 * w, Math.atan(d/(w/2))],
                _TopSquareTR: [Math.sqrt((3/2 * w)**2 + d**2), -1/4 * w, Math.atan(d/(3/2 * w))],
            },
            Right: { // BL <=> TL, BR <=> TR
                _BottomSquareBL: [Math.sqrt((3/2 * w)**2 + d**2), 1/4 * w, Math.atan(d/(3/2 * w))],// angle starts 90 degrees 
                _BottomSquareBR: [Math.sqrt((w / 2)**2 + d**2), 1/4 * w, Math.atan(d/(w/2))],
                _BottomSquareTL: [Math.sqrt((3/2 * w)**2 + d**2), -3/4 * w, Math.atan(d/(3/2 * w))], 
                _BottomSquareTR: [Math.sqrt((w / 2)**2 + d**2), -3/4 * w, Math.atan(d/(w/2))],
                _TopSquareBL: [Math.sqrt(w**2 + d**2), 3/4 * w, Math.atan(d/w)],
                _TopSquareBR: [d, 3/4 * w, Math.PI/2],
                _TopSquareTL: [Math.sqrt(w**2 + d**2), -1/4 * w, Math.atan(d/w)],
                _TopSquareTR:  [d, -1/4 * w, Math.PI/2], 
            },
            Top: { // X stays the same, Y scales 
                _BottomSquareBL: [-3/4 * w, -Math.sqrt((3/2 * w)**2 + d**2),  Math.atan(d/(3/2 * w))],//[d,  -3/4 * w, Math.PI/2], // angle starts 90 degrees
                _BottomSquareBR: [1/4 * w, -Math.sqrt((3/2 * w)**2 + d**2),  Math.atan(d/(3/2 * w))],
                _BottomSquareTL: [-3/4 * w, -Math.sqrt((w / 2)**2 + d**2), Math.atan(d/(w/2))],
                _BottomSquareTR: [1/4 * w, -Math.sqrt((w / 2)**2 + d**2), Math.atan(d/(w/2))],
                _TopSquareBL: [-1/4 * w, -Math.sqrt(w**2 + d**2), Math.atan(d/w)],
                _TopSquareBR: [3/4 * w, -Math.sqrt(w**2 + d**2), Math.atan(d/ w)],
                _TopSquareTL: [-1/4 * w, -d, Math.PI/2],
                _TopSquareTR: [3/4 * w, -d, Math.PI/2]
            },
            Bottom: { // X stays the same, Y scales
                _BottomSquareBL: [-3/4 * w, d, Math.PI/2],
                _BottomSquareBR: [1/4 * w, d, Math.PI/2],
                _BottomSquareTL: [-3/4 * w, Math.sqrt(w**2 + d**2), Math.atan(d/ w)],
                _BottomSquareTR: [1/4 * w, Math.sqrt(w**2 + d**2), Math.atan(d/ w)],
                _TopSquareBL: [-1/4 * w, Math.sqrt((w / 2)**2 + d**2), Math.atan(d/(w/2))],
                _TopSquareBR: [3/4 * w, Math.sqrt((w / 2)**2 + d**2), Math.atan(d/(w/2))],
                _TopSquareTL: [-1/4 * w, Math.sqrt((3/2 * w)**2 + d**2),  Math.atan(d/(3/2 * w))],
                _TopSquareTR: [3/4 * w,  Math.sqrt((3/2 * w)**2 + d**2),  Math.atan(d/(3/2 * w))]
            },
            _BottomSquareBL: [-3/4 * w, 1/4 * w],
            _BottomSquareBR: [1/4 * w, 1/4 * w],
            _BottomSquareTL: [-3/4 * w, -3/4 * w],
            _BottomSquareTR: [1/4 * w, -3/4 * w],
            _TopSquareBL: [-1/4 * w, 3/4 * w],
            _TopSquareBR: [3/4 * w, 3/4 * w],
            _TopSquareTL: [-1/4 * w, -1/4 * w],
            _TopSquareTR: [3/4 * w, -1/4 * w],
        };

        const projectedDrawCoordinates = {
            BottomSquareBL: [...drawCoordinatesBottomLeft.BottomSquareBL],
            BottomSquareBR: [...drawCoordinatesBottomLeft.BottomSquareBR],
            BottomSquareTL: [...drawCoordinatesBottomLeft.BottomSquareTL],
            BottomSquareTR: [...drawCoordinatesBottomLeft.BottomSquareTR],
            TopSquareBL: [...drawCoordinatesBottomLeft.TopSquareBL],
            TopSquareBR: [...drawCoordinatesBottomLeft.TopSquareBR],
            TopSquareTL: [...drawCoordinatesBottomLeft.TopSquareTL],
            TopSquareTR: [...drawCoordinatesBottomLeft.TopSquareTR],
            _BottomSquareBL: [...drawCoordinatesBottomLeft._BottomSquareBL],
            _BottomSquareBR: [...drawCoordinatesBottomLeft._BottomSquareBR],
            _BottomSquareTL: [...drawCoordinatesBottomLeft._BottomSquareTL],
            _BottomSquareTR: [...drawCoordinatesBottomLeft._BottomSquareTR],
            _TopSquareBL: [...drawCoordinatesBottomLeft._TopSquareBL],
            _TopSquareBR: [...drawCoordinatesBottomLeft._TopSquareBR],
            _TopSquareTL: [...drawCoordinatesBottomLeft._TopSquareTL],
            _TopSquareTR: [...drawCoordinatesBottomLeft._TopSquareTR],
        };
        
        this.animationStates = ["Paused", "Rotating", "MidPaused", "CompletingRotation"];
        this.rotationDirections = ["Bottom", "Top", "Left", "Right"];
        this.shapeStates = ["BottomLeft", "TopLeft"];
        this.rotationState = {
            animationState: "Paused",
            rotationDirection: "Left",
            coordinateShift: [3/4 * w,0],
            rotationAngle: 0,
            stateTime: 0,
            shapeState: "TopLeft",
            drawCoordinatesBottomLeft,
            drawCoordinatesTopLeft,
            projectedDrawCoordinates, // change to projectedDrawCoordinates
            midPauseTime: 200,
            pauseTime: 1000,
        };
        this.addLineSprite(new _boxbox_sprite__WEBPACK_IMPORTED_MODULE_3__.BoxBoxSprite(this.transform, this.rotationState));
        this.addChildGameObject(new _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_2__.EnemySpawn(this.gameEngine));
        this.playSound(this.spawnSound);
    }

    // the radius will have to change as it spins
    // maybe I should store relative coordinates of each point, and update them here
    // I can make the further away line smaller width too

    // I only care about the projected x and y coordinates as it rotates
    // it will rotate a random direction, then pause

    // directions it can rotate: Top, Bottom, Left, Right
    // Bottom means x shift will be 0, y shift will be - 3/4 * w
    // Top means x shift will be 0, y shift will be 3/4 * w
    // Left means x shift will be - 3/4 * w, y shift will be 0
    // Right means x shift will be 3/4 * w, y shift will be 0

    // coordinates: BottomSquareBL, BottomSquareBR, BottomSquareTL, BottomSquareTR, TopSquareBL, TopSquareBR, TopSquareTL, TopSquareTR
    // zCoordinates: _BottomSquareBL, _BottomSquareBR, _BottomSquareTL, _BottomSquareTR, _TopSquareBL, _TopSquareBR, _TopSquareTL, _TopSquareTR

    // rotating next to the edge of the map is complicated... let's worry about it later

    // tells the sprite which state it's in
    // rotating, midPaused, completingRotation, paused

    // lines parallel to the axis of rotation will be the same length
    // coordinate perpendicular to the axis of rotation will be cosine of the angle of rotation

    // let's just do flat boxbox rotation for now
    // Bottom rotation first
    // rotate until 90 degrees, pause, then unrotate until 0 degrees
    animate(deltaTime) {
        const animationState = this.rotationState.animationState;
        let rotationAngle = this.rotationState.rotationAngle;
        
        const coordinateShift = this.rotationState.coordinateShift;
        const projectedDrawCoordinates = this.rotationState.projectedDrawCoordinates;
        const midPauseTime = this.rotationState.midPauseTime;
        const pauseTime = this.rotationState.pauseTime;
        if(animationState === "Rotating") {
            if(rotationAngle < Math.PI / 2) {
                rotationAngle += Math.PI / 2 * deltaTime / 1000;
            } else {
                rotationAngle = Math.PI / 2;
                this.rotationState.animationState = "MidPaused";
                // next rotation axis will be grabbed
            }
        } else if (animationState === "MidPaused") {
            this.rotationState.stateTime += deltaTime;
            if(this.rotationState.stateTime > midPauseTime) {
                this.rotationState.stateTime = 0;
                this.rotationState.animationState = "CompletingRotation";
            }
        } else if(animationState === "CompletingRotation") {
            // after the mid pause, we should continue the rotation
            if(rotationAngle > 0) { 
                // this isn't general yet, since we can rotate up to 2 pi.. 
                // but that won't work since it could change to an orthogonal
                // direction of rotation
                rotationAngle -= Math.PI / 2 * deltaTime / 1000;
            } else {
                rotationAngle = 0;
                this.rotationState.animationState = "Paused";
            }
        } else if(animationState === "Paused") {
            this.rotationState.stateTime += deltaTime;
            if(this.rotationState.stateTime > pauseTime) {
                this.rotationState.stateTime = 0;
                this.rotationState.animationState = "Rotating";
                this.startRotation();
            }
        }
        const rotationDirection = this.rotationState.rotationDirection;
        this.rotationState.rotationAngle = rotationAngle;
        // apply rotation angle to coordinates
        const projectedWidthScale = [1, 1];
        if(rotationDirection === "Top"  || rotationDirection === "Bottom") { 
            projectedWidthScale[1] = Math.cos(rotationAngle);
        } else if (rotationDirection === "Left" || rotationDirection === "Right") {
            projectedWidthScale[0] = Math.cos(rotationAngle);
        }

        // might be faster to do this as an array we map over and then draw with
        // I can use the hard coded values directly when not rotating

        // I think BottomLeft vs TopLeft will be no longer needed if we can continue to rotate past 90 degrees
        // except theres issues there since it can rotate in any direction after getting to 180 degrees
        // I think I'll have to then swap points to the reversed version
        const drawCoordinates = this.rotationState.shapeState === "BottomLeft" ? this.rotationState.drawCoordinatesBottomLeft : this.rotationState.drawCoordinatesTopLeft;
        if(this.rotationState.shapeState === "BottomLeft" || this.rotationState.shapeState === "TopLeft") {
            let [x, y, angleOffset] = drawCoordinates.BottomSquareBL;
            projectedDrawCoordinates.BottomSquareBL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
            [x, y, angleOffset] = drawCoordinates.BottomSquareBR;
            projectedDrawCoordinates.BottomSquareBR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
            [x, y, angleOffset] = drawCoordinates.BottomSquareTL;
            projectedDrawCoordinates.BottomSquareTL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
            [x, y, angleOffset] = drawCoordinates.BottomSquareTR;
            projectedDrawCoordinates.BottomSquareTR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
            [x, y, angleOffset] = drawCoordinates.TopSquareBL;
            projectedDrawCoordinates.TopSquareBL    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
            [x, y, angleOffset] = drawCoordinates.TopSquareBR;
            projectedDrawCoordinates.TopSquareBR    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
            [x, y, angleOffset] = drawCoordinates.TopSquareTL;
            projectedDrawCoordinates.TopSquareTL    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
            [x, y, angleOffset] = drawCoordinates.TopSquareTR;
            projectedDrawCoordinates.TopSquareTR    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
            if(rotationDirection === "Left") {
                const drawCoordinatesLeft = drawCoordinates.Left; 
                // rotationAngle += Math.PI;
                // distances to axis of rotation, [x, y, angleOffset], y is the same, x requires pythag;
                [x,y,angleOffset] = drawCoordinatesLeft._BottomSquareBL;
                projectedDrawCoordinates._BottomSquareBL = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
                [x, y, angleOffset] = drawCoordinatesLeft._BottomSquareBR;
                projectedDrawCoordinates._BottomSquareBR = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
                [x, y, angleOffset] = drawCoordinatesLeft._BottomSquareTL;
                projectedDrawCoordinates._BottomSquareTL = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
                [x, y, angleOffset] = drawCoordinatesLeft._BottomSquareTR;
                projectedDrawCoordinates._BottomSquareTR = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
                [x, y, angleOffset] = drawCoordinatesLeft._TopSquareBL;
                projectedDrawCoordinates._TopSquareBL    = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
                [x, y, angleOffset] = drawCoordinatesLeft._TopSquareBR;
                projectedDrawCoordinates._TopSquareBR    = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
                [x, y, angleOffset] = drawCoordinatesLeft._TopSquareTL;
                projectedDrawCoordinates._TopSquareTL    = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];

                [x, y, angleOffset] = drawCoordinatesLeft._TopSquareTR;
                projectedDrawCoordinates._TopSquareTR    = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
            }
            if(rotationDirection === "Right") {
                const drawCoordinatesRight = drawCoordinates.Right; 
                rotationAngle += Math.PI;
                // distances to axis of rotation, [x, y, angleOffset], y is the same, x requires pythag;
                [x, y, angleOffset] = drawCoordinatesRight._BottomSquareBL;
                projectedDrawCoordinates._BottomSquareBL = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
                [x, y, angleOffset] = drawCoordinatesRight._BottomSquareBR;
                projectedDrawCoordinates._BottomSquareBR = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
                [x, y, angleOffset] = drawCoordinatesRight._BottomSquareTL;
                projectedDrawCoordinates._BottomSquareTL = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
                [x, y, angleOffset] = drawCoordinatesRight._BottomSquareTR;
                projectedDrawCoordinates._BottomSquareTR = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
                [x, y, angleOffset] = drawCoordinatesRight._TopSquareBL;
                projectedDrawCoordinates._TopSquareBL    = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
                [x, y, angleOffset] = drawCoordinatesRight._TopSquareBR;
                projectedDrawCoordinates._TopSquareBR    = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
                [x, y, angleOffset] = drawCoordinatesRight._TopSquareTL;
                projectedDrawCoordinates._TopSquareTL    = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];

                [x, y, angleOffset] = drawCoordinatesRight._TopSquareTR;
                projectedDrawCoordinates._TopSquareTR    = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
            }
            if(rotationDirection === "Top") {
                const drawCoordinatesTop = drawCoordinates.Top; 
                // rotationAngle += Math.PI;
                // distances to axis of rotation, [x, y, angleOffset], x is the same, y requires pythag;
                [x,y,angleOffset] = drawCoordinatesTop._BottomSquareBL;
                projectedDrawCoordinates._BottomSquareBL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
                [x, y, angleOffset] = drawCoordinatesTop._BottomSquareBR;
                projectedDrawCoordinates._BottomSquareBR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
                [x, y, angleOffset] = drawCoordinatesTop._BottomSquareTL;
                projectedDrawCoordinates._BottomSquareTL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
                [x, y, angleOffset] = drawCoordinatesTop._BottomSquareTR;
                projectedDrawCoordinates._BottomSquareTR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
                [x, y, angleOffset] = drawCoordinatesTop._TopSquareBL;
                projectedDrawCoordinates._TopSquareBL    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
                [x, y, angleOffset] = drawCoordinatesTop._TopSquareBR;
                projectedDrawCoordinates._TopSquareBR    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
                [x, y, angleOffset] = drawCoordinatesTop._TopSquareTL;
                projectedDrawCoordinates._TopSquareTL    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];

                [x, y, angleOffset] = drawCoordinatesTop._TopSquareTR;
                projectedDrawCoordinates._TopSquareTR    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
            } 
            if(rotationDirection === "Bottom") {
                const drawCoordinatesBottom = drawCoordinates.Bottom; 
                // rotationAngle += Math.PI;
                // distances to axis of rotation, [x, y, angleOffset], x is the same, y requires pythag;
                [x,y,angleOffset] = drawCoordinatesBottom._BottomSquareBL;
                projectedDrawCoordinates._BottomSquareBL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
                [x, y, angleOffset] = drawCoordinatesBottom._BottomSquareBR;
                projectedDrawCoordinates._BottomSquareBR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
                [x, y, angleOffset] = drawCoordinatesBottom._BottomSquareTL;
                projectedDrawCoordinates._BottomSquareTL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
                [x, y, angleOffset] = drawCoordinatesBottom._BottomSquareTR;
                projectedDrawCoordinates._BottomSquareTR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
                [x, y, angleOffset] = drawCoordinatesBottom._TopSquareBL;
                projectedDrawCoordinates._TopSquareBL    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
                [x, y, angleOffset] = drawCoordinatesBottom._TopSquareBR;
                projectedDrawCoordinates._TopSquareBR    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
                [x, y, angleOffset] = drawCoordinatesBottom._TopSquareTL;
                projectedDrawCoordinates._TopSquareTL    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];

                [x, y, angleOffset] = drawCoordinatesBottom._TopSquareTR;
                projectedDrawCoordinates._TopSquareTR    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
            }
        }
        // I do not need to consider the coordinate shift for the prime coordinates
        // I do for the non-primes because they are drawn from the center of the BoxBox, and are more general
    }

    startRotation() {
        // pick rotation direction
        const w = this.boxWidth;
        const coordinateShift = this.rotationState.coordinateShift;
        if (this.rotationState.rotationDirection === "Bottom") {
            this.rotationState.shapeState = this.rotationState.shapeState === "TopLeft" ? "BottomLeft" : "TopLeft";
        }
        const directionsMap = {Top: "Right", Right: "Bottom", Bottom: "Left", Left: "Top"};
        const rotationDirection = directionsMap[this.rotationState.rotationDirection];
        
        if(rotationDirection === "Top") {
            coordinateShift[0] = 0;
            coordinateShift[1] = 3/4 * w;
        } else if (rotationDirection === "Bottom") {
            coordinateShift[0] = 0;
            coordinateShift[1] =  -3/4 * w;
        } else if (rotationDirection === "Left") {
            coordinateShift[0] = 3/4 * w;
            coordinateShift[1] = 0;
        } else if (rotationDirection === "Right") {
            coordinateShift[0] = -3/4 * w;
            coordinateShift[1] = 0;
        }
        this.rotationState.rotationDirection = rotationDirection;
    }

    continueRotation() {
        // swap points, change coordinate shift
    }

    exist() {
    // leaving off subscriptions means that things will subscribe to it
        this.addCollider("General", this, this.radius);
        // now it will move
        this.addPhysicsComponent();
    }
 
    wallGraze(){
        this.gameEngine.gameScript.wallGraze(this.transform, this.radius);
    }

    update(delta){
        this.animate(delta);
        if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius * 2)) {
            this.wallGraze(); 
        }
    }
}


/***/ }),

/***/ "./src/game_objects/enemies/BoxBox/boxbox_sprite.js":
/*!**********************************************************!*\
  !*** ./src/game_objects/enemies/BoxBox/boxbox_sprite.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BoxBoxSprite: () => (/* binding */ BoxBoxSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.js");


class BoxBoxSprite extends _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__.LineSprite {
    constructor(transform, rotationState) {
        super(transform);
        this.spawningScale = 1;
        this.rotationState = rotationState;
    }

    draw(ctx) {
        const spawningScale = this.spawningScale || 1;
        const pos = this.transform.absolutePosition();
        const boxSize = 10 * spawningScale;

        // ctx.strokeStyle = "#F173BA";

        const r = 210;
        const g = 75;
        const b = 75;
        ctx.save();
        ctx.beginPath();
        ctx.translate(pos[0] - this.rotationState.coordinateShift[0], pos[1] - this.rotationState.coordinateShift[1]);
        const blurFactor = 0.5;
        ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
        ctx.shadowBlur = 10 * blurFactor;
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        ctx.lineWidth = 7.5 * blurFactor;
        this.drawBox1(ctx, boxSize);
        this.drawBox2(ctx, boxSize);
        ctx.lineWidth = 6 * blurFactor;
        this.drawBox1(ctx, boxSize);
        this.drawBox2(ctx, boxSize);
        ctx.lineWidth = 4.5;
        this.drawBox1(ctx, boxSize);
        this.drawBox2(ctx, boxSize);
        ctx.lineWidth = 3;
        this.drawBox1(ctx, boxSize);
        this.drawBox2(ctx, boxSize);
        ctx.strokeStyle = "rgb(255, 255, 255)";
        ctx.lineWidth = 1.5;
        this.drawBox1(ctx, boxSize);
        this.drawBox2(ctx, boxSize);
        ctx.restore();
    }

    drawBox1(ctx) {
        // need to rethink spawn scaling. 
        // I might have to bring back the original draw methods for spawn animation
        
        const projectedCoordinates = this.rotationState.projectedDrawCoordinates;
        
        const point1 = projectedCoordinates.BottomSquareBL;
        const point2 = projectedCoordinates.BottomSquareBR;
        const point3 = projectedCoordinates.BottomSquareTR;
        const point4 = projectedCoordinates.BottomSquareTL;

        ctx.beginPath();
        ctx.moveTo(point1[0], point1[1]);
        ctx.lineTo(point2[0], point2[1]);
        ctx.lineTo(point3[0], point3[1]);
        ctx.lineTo(point4[0], point4[1]);
        ctx.closePath();
        ctx.stroke();

        const _point1 = projectedCoordinates._BottomSquareBL;
        const _point2 = projectedCoordinates._BottomSquareBR;
        const _point3 = projectedCoordinates._BottomSquareTR;
        const _point4 = projectedCoordinates._BottomSquareTL;

        ctx.beginPath();
        ctx.moveTo(_point1[0], _point1[1]);
        ctx.lineTo(_point2[0], _point2[1]);
        ctx.lineTo(_point3[0], _point3[1]);
        ctx.lineTo(_point4[0], _point4[1]);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(point1[0], point1[1]);
        ctx.lineTo(_point1[0], _point1[1]);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(point2[0], point2[1]);
        ctx.lineTo(_point2[0], _point2[1]);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(point3[0], point3[1]);
        ctx.lineTo(_point3[0], _point3[1]);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(point4[0], point4[1]);
        ctx.lineTo(_point4[0], _point4[1]);
        ctx.stroke();

            
    }

    drawBox2(ctx) {
        
        const projectedCoordinates = this.rotationState.projectedDrawCoordinates;
        const point1 = projectedCoordinates.TopSquareBL;
        const point2 = projectedCoordinates.TopSquareBR;
        const point3 = projectedCoordinates.TopSquareTR;
        const point4 = projectedCoordinates.TopSquareTL;

        ctx.beginPath();
        ctx.moveTo(point1[0], point1[1]);
        ctx.lineTo(point2[0], point2[1]);
        ctx.lineTo(point3[0], point3[1]);
        ctx.lineTo(point4[0], point4[1]);
        ctx.closePath();
        ctx.stroke();

        const _point1 = projectedCoordinates._TopSquareBL;
        const _point2 = projectedCoordinates._TopSquareBR;
        const _point3 = projectedCoordinates._TopSquareTR;
        const _point4 = projectedCoordinates._TopSquareTL;

        ctx.beginPath();
        ctx.moveTo(_point1[0], _point1[1]);
        ctx.lineTo(_point2[0], _point2[1]);
        ctx.lineTo(_point3[0], _point3[1]);
        ctx.lineTo(_point4[0], _point4[1]);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(point1[0], point1[1]);
        ctx.lineTo(_point1[0], _point1[1]);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(point2[0], point2[1]);
        ctx.lineTo(_point2[0], _point2[1]);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(point3[0], point3[1]);
        ctx.lineTo(_point3[0], _point3[1]);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(point4[0], point4[1]);
        ctx.lineTo(_point4[0], _point4[1]);
        ctx.stroke();
    }

    // drawBox2(ctx, boxSize) {
    //     const w = boxSize;
    //     const slideFactor = 1.5;
    //     ctx.beginPath();
    //     ctx.moveTo(-w / 4, w / 4);
    //     ctx.lineTo(-w / 4, (-3 * w) / 4);
    //     ctx.lineTo((3 * w) / 4, (-3 * w) / 4);
    //     ctx.lineTo((3 * w) / 4, w / 4);
    //     ctx.closePath();
    //     ctx.stroke();
    // }
}


/***/ }),

/***/ "./src/game_objects/enemies/Grunt/grunt.js":
/*!*************************************************!*\
  !*** ./src/game_objects/enemies/Grunt/grunt.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Grunt: () => (/* binding */ Grunt)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.js");
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/sound */ "./src/game_engine/sound.js");
/* harmony import */ var _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../particles/enemy_spawn */ "./src/game_objects/particles/enemy_spawn.js");
/* harmony import */ var _grunt_sprite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./grunt_sprite */ "./src/game_objects/enemies/Grunt/grunt_sprite.js");




class Grunt extends _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject {
    constructor(engine, pos, shipTransform) {
        super(engine);
        this.transform.pos = pos;
        this.exists = false;
        this.stretchDirection = -1;
        this.shipTransform = shipTransform;
        this.radius = 5;
        this.points = 70;
        this.spawnSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__.Sound("GEOWars/sounds/Enemy_spawn_blue.wav", 0.5);
        this.playSound(this.spawnSound);
        this.addLineSprite(new _grunt_sprite__WEBPACK_IMPORTED_MODULE_3__.GruntSprite(this.transform));
        this.addChildGameObject(new _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_2__.EnemySpawn(this.gameEngine));
    }

    exist() {
        this.exists = true;
        // leaving off subscriptions means that things will subscribe to it
        this.addCollider("General", this, this.radius);
        // now it will move
        this.addPhysicsComponent();
    }

    // ADDING MOVEMENT MECHANICS FOR GRUNT

    chase(timeDelta) {
        const speed = 1.5;
        const shipPos = this.shipTransform.pos;
        const pos = this.transform.pos;
        const dy = shipPos[1] - pos[1];
        const dx = shipPos[0] - pos[0];

        const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        const direction = Math.atan2(dy, dx);

        this.transform.pos[0] += speed * Math.cos(direction) * velocityScale;
        this.transform.pos[1] += speed * Math.sin(direction) * velocityScale;
    }

    animate(timeDelta) {
        const cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        const cycleSpeed = 0.01;
        if (this.lineSprite.stretchScale_W < 0.7 || this.lineSprite.stretchScale_W > 1) {
            this.stretchDirection *= -1;
        }

        this.lineSprite.stretchScale_W = this.lineSprite.stretchScale_W + -this.stretchDirection * cycleSpeed * cycleSpeedScale;
        this.lineSprite.stretchScale_L = this.lineSprite.stretchScale_L + this.stretchDirection * cycleSpeed * cycleSpeedScale;

    }

    update(timeDelta) {
        if (this.exists) {
            this.chase(timeDelta);
            this.animate(timeDelta);
      
            if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
                this.wallGraze();
            }
        }
    }

    wallGraze() {
        this.gameEngine.gameScript.wallGraze(this.transform, this.radius);
    }

  
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

/***/ }),

/***/ "./src/game_objects/enemies/Grunt/grunt_sprite.js":
/*!********************************************************!*\
  !*** ./src/game_objects/enemies/Grunt/grunt_sprite.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GruntSprite: () => (/* binding */ GruntSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.js");

class GruntSprite extends _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__.LineSprite {
    constructor(transform, spawningScale = 1) {
        super(transform)
        this.spawningScale = spawningScale
        this.stretchScale_L = 1
        this.stretchScale_W = 0.7
    }

    draw(ctx) {
        const pos = this.transform.absolutePosition();
    
        const spawningScale = this.spawningScale;
        const shipLength = 10 * 2.2 * spawningScale * this.stretchScale_L;
        const shipWidth = 10 * 2.2 * spawningScale * this.stretchScale_W;
        const l = shipLength;
        const w = shipWidth;

        const r = 0;
        const g = 57;
        const b = 230;

        ctx.save();
        ctx.translate(pos[0], pos[1]);

        const blurFactor = 0.5

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


/***/ }),

/***/ "./src/game_objects/enemies/Pinwheel/pinwheel.js":
/*!*******************************************************!*\
  !*** ./src/game_objects/enemies/Pinwheel/pinwheel.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Pinwheel: () => (/* binding */ Pinwheel)
/* harmony export */ });
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/sound */ "./src/game_engine/sound.js");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/util */ "./src/game_engine/util.js");
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.js");
/* harmony import */ var _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../particles/enemy_spawn */ "./src/game_objects/particles/enemy_spawn.js");
/* harmony import */ var _pinwheel_sprite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pinwheel_sprite */ "./src/game_objects/enemies/Pinwheel/pinwheel_sprite.js");






class Pinwheel extends _game_engine_game_object__WEBPACK_IMPORTED_MODULE_2__.GameObject {
    constructor(engine, pos) {
        super(engine);
        this.rotation_speed = 0.05;
        const speed = 1;
        this.points = 20;
        this.transform.pos = pos;
        this.transform.vel = _game_engine_util__WEBPACK_IMPORTED_MODULE_1__.Util.randomVec(speed);
        this.spawnSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_0__.Sound("GEOWars/sounds/Enemy_spawn_blue.wav", 0.5);
        this.playSound(this.spawnSound);
        this.addLineSprite(new _pinwheel_sprite__WEBPACK_IMPORTED_MODULE_4__.PinwheelSprite(this.transform));
        this.addChildGameObject(new _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_3__.EnemySpawn(this.gameEngine));
        this.radius = 5;
    }
  
    exist() {
    // leaving off subscriptions means that things will subscribe to it
        this.addCollider("General", this, this.radius);
        // now it will move
        this.addPhysicsComponent();
    }

    animate(deltaTime) {
        const rotationSpeedScale = deltaTime / NORMAL_FRAME_TIME_DELTA;
        this.transform.angle = (this.transform.angle + this.rotation_speed * rotationSpeedScale) % (Math.PI * 2);
    }

    update(deltaTime){
        this.animate(deltaTime);
        if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
            this.gameEngine.gameScript.bounce(this.transform, this.radius); // HARD CODED
        }
    }

}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

/***/ }),

/***/ "./src/game_objects/enemies/Pinwheel/pinwheel_sprite.js":
/*!**************************************************************!*\
  !*** ./src/game_objects/enemies/Pinwheel/pinwheel_sprite.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PinwheelSprite: () => (/* binding */ PinwheelSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.js");

class PinwheelSprite extends _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__.LineSprite {
    constructor(transform, spawningScale = 1) {
        super(transform);
        this.spawningScale = spawningScale;
    }

    draw(ctx) {
        const spawningScale = this.spawningScale || 1;
        const pos = this.transform.absolutePosition();
        const angle = this.transform.absoluteAngle();

        const shipWidth = 12 * spawningScale;
        const s = shipWidth / 2;

        const r = 59;
        const g = 10;
        const b = 87;

        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(angle);

        const blurFactor = 0.5;
        ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
        ctx.shadowBlur = 10 * blurFactor * blurFactor;
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        ctx.lineWidth = 7.5 * blurFactor * blurFactor;
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        this.drawPinwheel(ctx, s);
        ctx.lineWidth = 6 * blurFactor;
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.6)";
        this.drawPinwheel(ctx, s);
        ctx.lineWidth = 4.5;
        this.drawPinwheel(ctx, s);
        ctx.lineWidth = 3;
        this.drawPinwheel(ctx, s);
        ctx.strokeStyle = 'rgb(200, 100, 255)';
        ctx.lineWidth = 1.5;
        this.drawPinwheel(ctx, s);

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


/***/ }),

/***/ "./src/game_objects/enemies/Singularity/alien_ship.js":
/*!************************************************************!*\
  !*** ./src/game_objects/enemies/Singularity/alien_ship.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlienShip: () => (/* binding */ AlienShip)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.js");
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/sound */ "./src/game_engine/sound.js");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_engine/util */ "./src/game_engine/util.js");
/* harmony import */ var _alien_ship_sprite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./alien_ship_sprite */ "./src/game_objects/enemies/Singularity/alien_ship_sprite.js");





class AlienShip extends _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject {
    constructor(engine, pos, velocity, shipTransform) {
        super(engine);
        this.transform.pos[0] = pos[0];
        this.transform.pos[1] = pos[1];
        this.transform.vel[0] = velocity[0];
        this.transform.vel[1] = velocity[1];

        this.shipTransform = shipTransform;
        this.radius = 4;
        this.points = 120;
        this.chaseSpeed = 3.5;
        this.chaseAcceleration = 0.125 / 3;
        this.addLineSprite(new _alien_ship_sprite__WEBPACK_IMPORTED_MODULE_3__.AlienShipSprite(this.transform));
        this.addCollider("General", this, this.radius);
        this.addPhysicsComponent();
    }

    // change to acceleration
   

    update(timeDelta) {
        // console.log(this.transform.pos)
        this.chase();

        if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
            this.bounce();
        }
    }

    bounce() {
        this.gameEngine.gameScript.bounce(this.transform, this.radius);
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

        const speed = this.chaseSpeed;

        const shipPos = this.shipTransform.absolutePosition();
        const pos = this.transform.absolutePosition();
        const deltaPosition = [shipPos[0] - pos[0], shipPos[1] - pos[1]];
        let chaseDirection = Math.atan2(deltaPosition[1], deltaPosition[0]);

        // Math.atan2 was giving me negative numbers.... when it shouldn't
        if (chaseDirection < 0) {
            chaseDirection = 2 * Math.PI + chaseDirection;
        }
        // console.log(chaseDirection / (2 * Math.PI) * 360)
        const Vm = [speed * Math.cos(chaseDirection), speed * Math.sin(chaseDirection)];
        const Vo = this.transform.vel;

        const dV = [Vm[0] - Vo[0], Vm[1] - Vo[1]];
        const accelerationDirection = Math.atan2(dV[1], dV[0]);
        this.transform.acc[0] += this.chaseAcceleration * Math.cos(accelerationDirection);
        this.transform.acc[1] += this.chaseAcceleration * Math.sin(accelerationDirection);
        // console.log(this.transform.acc)
    }

}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

/***/ }),

/***/ "./src/game_objects/enemies/Singularity/alien_ship_sprite.js":
/*!*******************************************************************!*\
  !*** ./src/game_objects/enemies/Singularity/alien_ship_sprite.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlienShipSprite: () => (/* binding */ AlienShipSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.js");


class AlienShipSprite extends _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__.LineSprite {
    constructor(transform) {
        super(transform);
        this.radius = 4;
    }

    draw(ctx) {
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        const r = 180;
        const g = 180;
        const b = 255;

        ctx.save();

        // ctx.strokeStyle = "#4286f4";
        // ctx.lineWidth = 4;
        const blurFactor = 0.5;

        ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        ctx.lineWidth = 4;
        this.drawAlienShip(ctx, this.radius);
        ctx.lineWidth = 3;
        this.drawAlienShip(ctx, this.radius);
        ctx.lineWidth = 2;
        this.drawAlienShip(ctx, this.radius);
        ctx.lineWidth = 1;
        this.drawAlienShip(ctx, this.radius);
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = 0.75;
        this.drawAlienShip(ctx, this.radius);
        ctx.restore();
    }

    drawAlienShip(ctx, radius) {
        ctx.beginPath();
        const pos = this.transform.absolutePosition();
        ctx.arc(pos[0], pos[1], radius, 0, 2 * Math.PI, true);
        ctx.stroke();
    }
}

/***/ }),

/***/ "./src/game_objects/enemies/Singularity/singularity.js":
/*!*************************************************************!*\
  !*** ./src/game_objects/enemies/Singularity/singularity.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Singularity: () => (/* binding */ Singularity)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.js");
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/sound */ "./src/game_engine/sound.js");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_engine/util */ "./src/game_engine/util.js");
/* harmony import */ var _particles_particle_explosion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../particles/particle_explosion */ "./src/game_objects/particles/particle_explosion.js");
/* harmony import */ var _particles_singularity_hit_explosion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../particles/singularity_hit_explosion */ "./src/game_objects/particles/singularity_hit_explosion.js");
/* harmony import */ var _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../particles/enemy_spawn */ "./src/game_objects/particles/enemy_spawn.js");
/* harmony import */ var _singularity_sprite__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./singularity_sprite */ "./src/game_objects/enemies/Singularity/singularity_sprite.js");
/* harmony import */ var _particles_singularity_particles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../particles/singularity_particles */ "./src/game_objects/particles/singularity_particles.js");
/* harmony import */ var _alien_ship__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./alien_ship */ "./src/game_objects/enemies/Singularity/alien_ship.js");
/* harmony import */ var _particles_Grid_grid_point__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../particles/Grid/grid_point */ "./src/game_objects/particles/Grid/grid_point.js");










class Singularity extends _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject {
    constructor(engine, pos) {
        super(engine);
        this.transform.pos = pos;
        this.transform.pos[2] = 0;
        this.gravityWellSize = 1000;
        this.gravityConstant = 1000 * 0.5;
        this.radius = 15;
        this.points = 100;
        this.throbbingCycleSpeed = 0.002;
        this.numberAbsorbed = 0;
        this.alienSpawnAmount = 10;
        this.alienSpawnSpeed = 1.5;
        this.gravityPulsateScale = 1;
        this.deathSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__.Sound("GEOWars/sounds/Gravity_well_die.wav");
        this.gravityWellHitSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__.Sound("GEOWars/sounds/Gravity_well_hit.wav", 0.5);
        this.openGateSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__.Sound("GEOWars/sounds/Gravity_well_explode.wav");
        // this.id = options.id
        this.spawnSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__.Sound("GEOWars/sounds/Enemy_spawn_red.wav", 1);
        this.playSound(this.spawnSound);

        this.increasing = true;
        this.addLineSprite(new _singularity_sprite__WEBPACK_IMPORTED_MODULE_6__.SingularitySprite(this.transform));
        this.addChildGameObject(new _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_5__.EnemySpawn(this.gameEngine));
        this.lineSprite.throbbingScale = 1;
        this.lives = 5;
    }

    exist() {
    // leaving off subscriptions means that things will subscribe to it
        this.addCollider("General", this, this.radius);
        this.addCollider("GravityWell", this, this.gravityWellSize, ["Grunt", "Pinwheel", "Bullet", "Ship", "BoxBox", "Arrow", "Singularity", "Weaver", "Particle", "SingularityParticle", "GridPoint"],  ["General"]);
        this.addCollider("Absorb", this, this.radius, ["Grunt", "Pinwheel", "BoxBox", "Arrow", "Weaver"],  ["General"]);
        // now it will move
        this.addPhysicsComponent();
        this.lineSprite.spawned = true;
        this.addChildGameObject(new _particles_singularity_particles__WEBPACK_IMPORTED_MODULE_7__.SingularityParticles(this.gameEngine, this.transform));
    }

    onCollision(collider, type){
        if (type === "GravityWell"){
            this.influenceAcceleration(collider.gameObject);
        } else if (type === "Absorb") {
            const hitObjectTransform = collider.gameObject.transform;
            const pos = hitObjectTransform.absolutePosition();
            const vel = hitObjectTransform.absoluteVelocity();
            const explosion = new _particles_particle_explosion__WEBPACK_IMPORTED_MODULE_3__.ParticleExplosion(this.gameEngine, pos);
            collider.gameObject.remove();

            this.throbbingCycleSpeed *= 1.2;
            this.numberAbsorbed += 1; // put back to 1 
        }
    }

    bulletHit(){
        this.lives -= 1;
        const pos = this.transform.absolutePosition();
        const vel = this.transform.absoluteVelocity();
        if (this.lives <= 0) {
            const explosion = new _particles_particle_explosion__WEBPACK_IMPORTED_MODULE_3__.ParticleExplosion(this.gameEngine, pos);
            this.gameEngine.gameScript.tallyScore(this);
            this.playSound(this.deathSound);
            this.remove();
        } else {
            const explosion = new _particles_singularity_hit_explosion__WEBPACK_IMPORTED_MODULE_4__.SingularityHitExplosion(this.gameEngine, pos);
            this.playSound(this.gravityWellHitSound);
            this.throbbingCycleSpeed /= 1.2;
            this.numberAbsorbed -= 1;
        }
    }

    wallGraze() {
        this.gameEngine.gameScript.wallGraze(this.transform, this.radius);
    }
  

    update(deltaTime) {

        if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
            this.wallGraze();
        }
        if (this.numberAbsorbed === 5) {
            this.soundAlarm(deltaTime);
        }

        this.animate(deltaTime);
        if (this.numberAbsorbed >= 6) {
            this.openGate();
        }
    }

    soundAlarm(deltaTime){

    }

    animate(timeDelta) {

        const cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        const cycleSpeed = this.throbbingCycleSpeed;
        // increase scale until 1.2, decrease until 0.8

        if (this.increasing) {
            this.lineSprite.throbbingScale += cycleSpeed * cycleSpeedScale;
            this.gravityPulsateScale += cycleSpeed * 2 * cycleSpeedScale;
            if (this.lineSprite.throbbingScale > 1.2) {
                this.increasing = !this.increasing;
            }
        } else {
            this.lineSprite.throbbingScale -= cycleSpeed * cycleSpeedScale;
            this.gravityPulsateScale -= cycleSpeed * 2 * cycleSpeedScale;
            if (this.lineSprite.throbbingScale < 0.8) {
                this.increasing = !this.increasing;
            }
        }
    }

    influenceAcceleration(object) {
        const pos = this.transform.absolutePosition();

        if(object instanceof _particles_Grid_grid_point__WEBPACK_IMPORTED_MODULE_9__.GridPoint) {
            // let's try moving their original position in the z direction 
            // depending on strength of gravity influence
            const objectPos3D = [object.transform.pos[0], object.transform.pos[1], object.transform.pos[2]];
            const dVector = [pos[0] - objectPos3D[0], pos[1] - objectPos3D[1], -200 - objectPos3D[2]]; // -200 is the z position of the gravity well for the grid
            const dVectorZOrigin = [pos[0] - objectPos3D[0], pos[1] - objectPos3D[1],0]; // -200 is the z position of the gravity well for the grid
            let r = _game_engine_util__WEBPACK_IMPORTED_MODULE_2__.Util.dist([0,0,0], dVector);
            let rZOrigin = _game_engine_util__WEBPACK_IMPORTED_MODULE_2__.Util.dist([0,0,0], dVectorZOrigin);
            
            if(r < 25) r = 25;
            if(rZOrigin < 25) rZOrigin = 25;
            // I think I can use both effects, but this one should be a lot smaller
            // and then tuning it would be harder
                
            // I really like the wave effect that happens with z acceleration being 25, and the spring -0.0025 + dampening -0.04
            // but Z's effect distends too far
            const unitVector3D = _game_engine_util__WEBPACK_IMPORTED_MODULE_2__.Util.scale(dVector, 1/r);
            const accContribution= [
                unitVector3D[0] * this.gravityConstant * 20 * this.gravityPulsateScale / (r * r),
                unitVector3D[1] * this.gravityConstant * 20 * this.gravityPulsateScale / (r * r),
                unitVector3D[2] * this.gravityConstant * 10 * this.gravityPulsateScale / (r * r)
            ];

            // *************
            // will need to multiply this a good amount
            // if(r < 25) r=25;
            const zContribution = this.gravityConstant * 20 * this.gravityPulsateScale / (rZOrigin ** 2) * 150;
            //// ************

            object.transform.acc[0] += accContribution[0];
            object.transform.acc[1] += accContribution[1];
            object.transform.acc[2] += accContribution[2];
            object.originalPosition[2] += zContribution;
        } else {
            const objectPos = object.transform.absolutePosition();
            const dVector2D = [pos[0] - objectPos[0], pos[1] - objectPos[1]];
            const r = _game_engine_util__WEBPACK_IMPORTED_MODULE_2__.Util.dist([0,0], dVector2D);
            if (!(r > this.gravityWellSize * 7 / 8 || r < this.radius * 2)){
                const unitVector = _game_engine_util__WEBPACK_IMPORTED_MODULE_2__.Util.scale(dVector2D, 1/r);
                const accContribution= [
                    unitVector[0] * this.gravityConstant / (r * r),
                    unitVector[1] * this.gravityConstant / (r * r)
                ];
                object.transform.acc[0] += accContribution[0];
                object.transform.acc[1] += accContribution[1];
            }
        }
        
    }

    openGate(){
        this.playSound(this.openGateSound);
        for (let i = 0; i < this.alienSpawnAmount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = [this.alienSpawnSpeed * Math.cos(angle), this.alienSpawnSpeed * Math.sin(angle)];
            new _alien_ship__WEBPACK_IMPORTED_MODULE_8__.AlienShip(this.gameEngine, this.transform.pos, velocity, this.gameEngine.gameScript.ship.transform);
        }
        this.remove();

    }

}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

/***/ }),

/***/ "./src/game_objects/enemies/Singularity/singularity_sprite.js":
/*!********************************************************************!*\
  !*** ./src/game_objects/enemies/Singularity/singularity_sprite.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SingularitySprite: () => (/* binding */ SingularitySprite)
/* harmony export */ });
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.js");


class SingularitySprite extends _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__.LineSprite {
    constructor(transform, spawningScale = 1) {
        super(transform);
        this.spawningScale = spawningScale;
        this.throbbingScale = 1;
        this.radius = 15;
        this.spawned = false;
    }

    draw(ctx) {
        let spawningScale = this.spawningScale;
        if (this.spawned) {
            spawningScale = this.throbbingScale;
        }

        ctx.strokeStyle = "#F173BA";

        const r = 95;
        const g = 45;
        const b = 73;

        ctx.save();
        // ctx.translate(pos[0], pos[1]);

        // ctx.strokeStyle = "#4286f4";
        // ctx.lineWidth = 4;
        const blurFactor = 0.5;

        ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        ctx.lineWidth = 7.5;
        this.drawSingularity(ctx, this.radius * spawningScale);
        ctx.lineWidth = 6;
        this.drawSingularity(ctx, this.radius * spawningScale);
        ctx.lineWidth = 4.5;
        this.drawSingularity(ctx, this.radius * spawningScale);
        ctx.lineWidth = 3;
        this.drawSingularity(ctx, this.radius * spawningScale);
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = 1.5;
        this.drawSingularity(ctx, this.radius * spawningScale);
        ctx.restore();
    // ctx.lineWidth = 2;
    // drawSingularity(ctx, this.radius * spawningScale);
    }

    drawSingularity(ctx, radius) {
        ctx.beginPath();
        const pos = this.transform.absolutePosition();
        ctx.arc(pos[0], pos[1], radius, 0, 2 * Math.PI, true);
        ctx.stroke();
    }
}

/***/ }),

/***/ "./src/game_objects/enemies/Weaver/weaver.js":
/*!***************************************************!*\
  !*** ./src/game_objects/enemies/Weaver/weaver.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Weaver: () => (/* binding */ Weaver)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.js");
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/sound */ "./src/game_engine/sound.js");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_engine/util */ "./src/game_engine/util.js");
/* harmony import */ var _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../particles/enemy_spawn */ "./src/game_objects/particles/enemy_spawn.js");
/* harmony import */ var _weaver_sprite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./weaver_sprite */ "./src/game_objects/enemies/Weaver/weaver_sprite.js");








class Weaver extends _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject {
    constructor(engine, pos, shipTransform) {
        super(engine);
        this.rotation_speed = 0.075;
        this.transform.pos[0] = pos[0];
        this.transform.pos[1] = pos[1];
        this.speed = 3;
        this.points = 80;
        this.radius = 5;
        this.weaverCloseHitBox = 20;
        this.shipTransform = shipTransform;
        this.directionInfluenced = false;
        this.influencers = [];
        this.spawnSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__.Sound("GEOWars/sounds/Enemy_spawn_green.wav", 0.5);
        this.playSound(this.spawnSound);
        this.addLineSprite(new _weaver_sprite__WEBPACK_IMPORTED_MODULE_4__.WeaverSprite(this.transform));
        this.addChildGameObject(new _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_3__.EnemySpawn(this.gameEngine));
        this.exists = false;
    
    }

    exist() {
    // leaving off subscriptions means that things will subscribe to it
        this.addCollider("General", this, this.radius);
        this.addCollider("BulletDodge", this, this.weaverCloseHitBox, ["Bullet"], ["General"]);
        // now it will move
        this.addPhysicsComponent();
        this.exists = true;
    }

    onCollision(collider, type){
        if (type === "BulletDodge") {
            this.acceptBulletDirection(collider.gameObject.transform.pos);
        }
    }

    influenceDirection() {
        let directionVector = [0, 0];

        this.influencers.forEach((influencer) => {
            const dx = directionVector[0] + influencer[0];
            const dy = directionVector[1] + influencer[1];
            const newVector = [dx, dy];
            directionVector = _game_engine_util__WEBPACK_IMPORTED_MODULE_2__.Util.dir(newVector);
        });
        const influencedDirection = Math.atan2(directionVector[1], directionVector[0]);
        return influencedDirection;
    }

    acceptBulletDirection(source) {
        this.directionInfluenced = true;
        const dy = this.transform.pos[1] - source[1];
        const dx = this.transform.pos[0] - source[0];
        const unitVector = _game_engine_util__WEBPACK_IMPORTED_MODULE_2__.Util.dir([dx, dy]);
        this.influencers.push(unitVector);
    // first 
    }

    animate(timeDelta) {
        const rotationSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        this.transform.angle = (this.transform.angle + this.rotation_speed * rotationSpeedScale) % (Math.PI * 2);
    }

    update(timeDelta){
        if(this.exists){
            const speed = this.speed;
            const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;

            this.animate(timeDelta);
      
      
            if (!this.directionInfluenced) {
                this.chase(timeDelta);
            } else {
                const direction = this.influenceDirection();
                this.transform.pos[0] += speed * Math.cos(direction) * velocityScale;
                this.transform.pos[1] += speed * Math.sin(direction) * velocityScale;
            }
  
            this.directionInfluenced = false;
  
            if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
                this.wallGraze();
            }
        }
    
    }

    wallGraze() {
        this.gameEngine.gameScript.wallGraze(this.transform, this.radius);
    }

    chase(timeDelta) {
        const speed = 2;
        const shipPos = this.shipTransform.pos;
        const dy = shipPos[1] - this.transform.pos[1];
        const dx = shipPos[0] - this.transform.pos[0];

        const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        const direction = Math.atan2(dy, dx);

        this.transform.pos[0] += speed * Math.cos(direction) * velocityScale;
        this.transform.pos[1] += speed * Math.sin(direction) * velocityScale;
    }

}

Weaver.BOX_SIZE = 10;
Weaver.COLOR = "#3cff0b";

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

/***/ }),

/***/ "./src/game_objects/enemies/Weaver/weaver_sprite.js":
/*!**********************************************************!*\
  !*** ./src/game_objects/enemies/Weaver/weaver_sprite.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WeaverSprite: () => (/* binding */ WeaverSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.js");


class WeaverSprite extends _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__.LineSprite {
    constructor(transform, spawningScale = 1) {
        super(transform);
        this.spawningScale = spawningScale;
    }

    draw(ctx) {
    // drawing this guy is taking waaay too much time.
    // I took out the blurr factor and it's way better.
    // doesn't look as nice, but it's a starting point
        const pos = this.transform.absolutePosition();
        const angle = this.transform.absoluteAngle();
        const spawningScale = this.spawningScale;
        const shipLength = 10 * 2.2 * spawningScale;
        const shipWidth = 10 * 2.2 * spawningScale;
        const s = shipWidth / 2;

        const r = 24;
        const g = 255;
        const b = 4;

        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(angle);
    
        const blurFactor = 0.5;
        ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
        // ctx.shadowBlur = 10 * blurFactor
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        ctx.lineWidth = 7.5;
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        this.drawWeaver(ctx, s);
        ctx.lineWidth = 6;
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.6)";
        this.drawWeaver(ctx, s);
        // ctx.lineWidth = 4.5;
        // this.drawWeaver(ctx, s)
        // ctx.lineWidth = 3;
        // this.drawWeaver(ctx, s)
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = 1.5;
        this.drawWeaver(ctx, s);

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

/***/ }),

/***/ "./src/game_objects/particles/Grid/grid.js":
/*!*************************************************!*\
  !*** ./src/game_objects/particles/Grid/grid.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Grid: () => (/* binding */ Grid)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.js");
/* harmony import */ var _grid_point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grid_point */ "./src/game_objects/particles/Grid/grid_point.js");
/* harmony import */ var _grid_sprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./grid_sprite */ "./src/game_objects/particles/Grid/grid_sprite.js");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../game_engine/util */ "./src/game_engine/util.js");





class Grid extends _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject {
    constructor(engine, gameScript, cameraTransform) {
        super(engine);

        this.transform.pos = [0,0];

        this.arenaDimensions = [gameScript.DIM_X, gameScript.DIM_Y];
        this.elasticity = 0.1; // force provided to pull particle back into place
        this.dampening = 0.1; // force produced from velocity (allows things to eventuall fall to rest)

        this.gridPoints = this.createGridPoints(cameraTransform);

        this.addLineSprite(new _grid_sprite__WEBPACK_IMPORTED_MODULE_2__.GridSprite(this.transform, this.gridPoints, cameraTransform));
        // this.addPhysicsComponent()
        // this.addCollider("General", this, this.radius)
    }

    Playerdies(location) {
        this.gridPoints.forEach((row) => {
            row.forEach((gridPoint) => {
                this.deathPerterb(gridPoint, location);
            });
        });
    }

    Explosion(location) {
        this.gridPoints.forEach((row) => {
            row.forEach((gridPoint) => {
                this.explosionPerterb(gridPoint, location);
            });
        });
    }

    explosionPerterb(gridPoint, location){
        // pushes outward upon explosion. 1/r^2
        const pushConstant = 1250 / 2;

        const pos = location;
        const objectPos = gridPoint.transform.absolutePosition();
        const dy = pos[1] - objectPos[1];
        const dx = pos[0] - objectPos[0];
        const unitVector = _game_engine_util__WEBPACK_IMPORTED_MODULE_3__.Util.dir([dx, dy]);
        let r = Math.sqrt(dy * dy + dx * dx);
        if ( r < 15 ) r = 15; // I think I need a bit more dampening for this to work
        gridPoint.transform.vel[0] += -unitVector[0] * pushConstant / (r * r * 2);
        gridPoint.transform.vel[1] += -unitVector[1] * pushConstant / (r * r * 2);
        gridPoint.transform.vel[2] += +pushConstant * 5 / (r * r);
    }


    deathPerterb(gridPoint, location){
        // pulls inward upon death. 1/r^2
        const pullConstant = 1250 * 5;

        const pos = location;
        const objectPos = gridPoint.transform.absolutePosition();
        const dy = pos[1] - objectPos[1];
        const dx = pos[0] - objectPos[0];
        const unitVector = _game_engine_util__WEBPACK_IMPORTED_MODULE_3__.Util.dir([dx, dy]);
        let r = Math.sqrt(dy * dy + dx * dx);
        if ( r < 20 ) r = 20; // I think I need a bit more dampening for this to work
        const velContribution = [
            unitVector[0] * pullConstant / (r),
            unitVector[1] * pullConstant / (r)
        ];
        // const velContribution = [
        //     0,0, pullConstant * 50 / (r ** 2)
        // ];
        gridPoint.transform.vel[0] = velContribution[0];
        gridPoint.transform.vel[1] = velContribution[1];
        // gridPoint.transform.vel[2] = velContribution[2];
    }

    createGridPoints(cameraTransform){
        const columnCount = 90; // 40
        const rowCount = 45; // 24
        const gridPoints = [];
        let gridRow = [];
        for (let yPosition = 0; yPosition <= this.arenaDimensions[1]; yPosition += this.arenaDimensions[1] / rowCount) {
            for (let xPosition = 0; xPosition <= this.arenaDimensions[0]; xPosition += this.arenaDimensions[0] / columnCount) {
                if(
                    (xPosition === 0 && (yPosition === 0 || yPosition === this.arenaDimensions[1])) || 
                   (xPosition == this.arenaDimensions[0] && (yPosition === 0 || yPosition === this.arenaDimensions[1])) 
                ){
                    continue;
                }
                const position = [xPosition, yPosition, 0];
                gridRow.push(new _grid_point__WEBPACK_IMPORTED_MODULE_1__.GridPoint(this.gameEngine, position, cameraTransform));
            }
            
            gridPoints.push(gridRow.slice());
            gridRow = [];
        }
        return gridPoints;
    }

    update(deltaTime) {

    }

}

/***/ }),

/***/ "./src/game_objects/particles/Grid/grid_point.js":
/*!*******************************************************!*\
  !*** ./src/game_objects/particles/Grid/grid_point.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GridPoint: () => (/* binding */ GridPoint)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.js");



class GridPoint extends _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject {
    constructor(engine, pos, cameraTransform) {
        super(engine);
        this.originalPosition = [];
        this.originalPosition[0] = pos[0];
        this.originalPosition[1] = pos[1];
        this.originalPosition[2] = pos[2];
        this.transform.pos = pos;
        this.transform.cameraTransform = cameraTransform;
        this.radius = 2;
        this.elasticity = -0.0025; // force provided to pull particle back into place
        this.dampening = -0.04; // force produced from velocity (allows things to eventuall fall to rest)

        this.addPhysicsComponent();
        this.addCollider("General", this, this.radius);
    }

    // let's try moving their original position in the z direction 
    // depending on strength of gravity influence

    // will need to reset z position to 0 after each update... not sure how yet
    // ...maybe just set it to 0 after each update lolz

    update(deltaTime) {
        this.transform.acc[0] += this.transform.vel[0] * this.dampening + (this.transform.pos[0] - this.originalPosition[0]) * this.elasticity;
        this.transform.acc[1] += this.transform.vel[1] * this.dampening + (this.transform.pos[1] - this.originalPosition[1]) * this.elasticity;
        this.transform.acc[2] += this.transform.vel[2] * this.dampening + (this.transform.pos[2] - this.originalPosition[2]) * this.elasticity;

        this.originalPosition[2] = 0;
    }

}


/***/ }),

/***/ "./src/game_objects/particles/Grid/grid_sprite.js":
/*!********************************************************!*\
  !*** ./src/game_objects/particles/Grid/grid_sprite.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GridSprite: () => (/* binding */ GridSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.js");
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/color */ "./src/game_engine/color.js");



class GridSprite extends _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__.LineSprite {
    constructor(transform, gridPoints, cameraTransform) {
        super(transform);
        this.gridPoints = gridPoints;
        this.cameraTransform = cameraTransform;

        this.color = new _game_engine_color__WEBPACK_IMPORTED_MODULE_1__.Color({
            "hsla": [202, 100, 70, 0.2]
        });
    }

    draw(ctx) {
        ctx.save();
        ctx.strokeStyle = this.color.evaluateColor();
        ctx.lineWidth = 2;
        this.drawRows(ctx);
        this.drawColumns(ctx);
        ctx.restore();
    }

    drawRows(ctx) {
        const gridPoints = this.gridPoints;

        for (let i = 1; i < gridPoints.length - 1; i++) {
            ctx.beginPath();
            const firstPosition = gridPoints[i][0].transform.absolutePosition();
            ctx.moveTo(firstPosition[0], firstPosition[1]);
            for (let j = 1; j < gridPoints[i].length; j++) {
                const nextPosition = gridPoints[i][j].transform.absolutePosition();
                ctx.lineTo(nextPosition[0], nextPosition[1]);
            }

            ctx.stroke();
        }
    }

    drawColumns(ctx) {
        const gridPoints = this.gridPoints;
        ctx.beginPath();

        for (let j = 1; j < gridPoints[1].length - 1; j++) {
            ctx.beginPath();
            for (let i = 0; i < gridPoints.length; i++) {
                let nextPosition = [];
                if( i === 0 || i === 0) {
                    nextPosition = gridPoints[i][j - 1].transform.absolutePosition();
                    ctx.moveTo(nextPosition[0], nextPosition[1]);
                } else {
                    if ( i === gridPoints.length - 1) {
                        nextPosition = gridPoints[i][j - 1].transform.absolutePosition();
                    } else {
                        nextPosition = gridPoints[i][j].transform.absolutePosition();
                    }
                    ctx.lineTo(nextPosition[0], nextPosition[1]);
                }

            }
            ctx.stroke();
        }
    }
}

/***/ }),

/***/ "./src/game_objects/particles/Particle/particle.js":
/*!*********************************************************!*\
  !*** ./src/game_objects/particles/Particle/particle.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Particle: () => (/* binding */ Particle)
/* harmony export */ });
/* harmony import */ var _particle_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./particle_sprite */ "./src/game_objects/particles/Particle/particle_sprite.js");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/util */ "./src/game_engine/util.js");
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.js");
// direction of the particle is the direction of the velocity vector
// the direction of the 
// the particle dies when the hue reaches 0 

// random movement angle created
// initial speed (scale)
// vel = Util.vectorCartesian(angle, scale)
//
// 

// because the particle is drawn the correct way now, 
// from position out, the particle's center is located 
// far from the center of the particle







class Particle extends _game_engine_game_object__WEBPACK_IMPORTED_MODULE_2__.GameObject{
    constructor(engine, pos, initialSpeed, color, wallHit) {
        super(engine);
        this.transform.pos[0] = pos[0];
        this.transform.pos[1] = pos[1];
        this.transform.pos[2] = pos[2];
        this.transform.cameraTransform = engine.gameScript.ship.cameraTransform;
        this.color = color;
        this.movementAngle = this.createMovementAngle(wallHit); // [plane, out of plane]
        this.transform.movementAngle = this.movementAngle;
        this.transform.vel = _game_engine_util__WEBPACK_IMPORTED_MODULE_1__.Util.vector3Cartesian(this.movementAngle, initialSpeed);
        this.radius = 3;
        this.explosionDeceleration = -0.004; // in the direction the particle is moving
        this.transform.acc = _game_engine_util__WEBPACK_IMPORTED_MODULE_1__.Util.vector3Cartesian(this.movementAngle, -this.explosionDeceleration);
        this.addLineSprite(new _particle_sprite__WEBPACK_IMPORTED_MODULE_0__.ParticleSprite(this.transform, this.color));
        this.addPhysicsComponent();
        this.dampening = -0.045;
        // this.addCollider("General", this, this.radius)
    }

    createMovementAngle(wallHit) {
        if (!wallHit){ 
            return [(Math.random() * Math.PI * 2), Math.random() * Math.PI * 2];
        } else {
            if (wallHit === "BOTTOM") {
                // need to give second angle still
                return [Math.random() * Math.PI + Math.PI, Math.random() * Math.PI * 2];
            } else if (wallHit === "RIGHT") {
                return [Math.random() * Math.PI + Math.PI / 2, Math.random() * Math.PI * 2];
            } else if (wallHit === "TOP") {
                return [Math.random() * Math.PI, Math.random() * Math.PI * 2];
            } else if (wallHit === "LEFT") {
                return [Math.random() * Math.PI + 3 * Math.PI / 2, Math.random() * Math.PI * 2];
            }
        }
    }
  

    update(deltaTime){
        // this.lineSprite.rectLength -= 0.01 * deltaTime;
        this.lineSprite.color.a -= 0.0005 * deltaTime;
        if (this.lineSprite.hue < 0.06 || this.lineSprite.rectLength < 0.25 || ((Math.abs(this.transform.vel[0]) + Math.abs(this.transform.vel[1]) + Math.abs(this.transform.vel[2])) < 0.15)) {
            this.remove();
        }
        this.checkBounds();
        // acc is influenced by singularities, then changed to usual acc
        this.movementAngle = [Math.atan2(this.transform.vel[1], this.transform.vel[0]), Math.atan2(this.transform.vel[2], Math.sqrt(this.transform.vel[0] ** 2 + this.transform.vel[1] ** 2)/this.transform.vel[2])];
        // this.transform.acc = Util.vector3Cartesian(this.movementAngle, -this.explosionDeceleration);
        this.transform.acc[0] += this.transform.vel[0] * this.dampening
        this.transform.acc[1] += this.transform.vel[1] * this.dampening
        this.transform.acc[2] += this.transform.vel[2] * this.dampening
    }

    checkBounds() {
        if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), -0.5)) {
            this.remove();
        }
    }

}

/***/ }),

/***/ "./src/game_objects/particles/Particle/particle_sprite.js":
/*!****************************************************************!*\
  !*** ./src/game_objects/particles/Particle/particle_sprite.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ParticleSprite: () => (/* binding */ ParticleSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.js");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/util */ "./src/game_engine/util.js");



class ParticleSprite extends _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__.LineSprite {
    constructor(transform, color) {
        super(transform);
        this.rectLength = 15;
        this.rectWidth = 2;
        this.color = color;
        // test
    }

    drawTwoDimensionNoParallax(ctx) {
        const pos = this.transform.absolutePosition();
        const vel = this.transform.absoluteVelocity();
        const l = this.rectLength;
        const w = this.rectWidth;
        const movementDirection = Math.atan2(vel[0], -vel[1]);

        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(movementDirection - Math.PI);

        ctx.beginPath();
        ctx.strokeStyle = this.color.evaluateColor();
        ctx.lineWidth = w;

        ctx.moveTo(0, 0); //1
        // ctx.lineTo(0, l * Math.cos(this.transform.movementAngle[1])); //2
        ctx.beginPath();
        const r = 1;
        ctx.arc(0, 0, r, 0, 2 * Math.PI, true);
        ctx.fill();
        // 
        ctx.closePath();
        // ctx.stroke();
        ctx.restore();
    }

    draw(ctx) {
        const pos = this.transform.absolutePosition();
        const r = this.transform.absoluteLength(3);
        const vel = this.transform.absoluteVelocity();
        const l = this.rectLength;
        const w = this.transform.absoluteLength(this.rectWidth);

        const movementDirection = Math.atan2(vel[0], -vel[1]);

        // calculate x, y, z of second point of line
        // use same calc, then add to current pos to get second point
        // const point2Position = Util.vector3Add(this.transform.pos, Util.vector3Cartesian(this.transform.movementAngle, l));

        // const Xc = this.transform.cameraTransform.pos[0];
        // const Yc = this.transform.cameraTransform.pos[1];
        // const Zc = this.transform.cameraTransform.pos[2];
        // const X1 = this.transform.pos[0];
        // const Y1 = this.transform.pos[1];
        // const Z1 = this.transform.pos[2];

        // const X2 = point2Position[0];
        // const Y2 = point2Position[1];
        // const Z2 = point2Position[2];

        // const Yp1 = Yc + (Y1-Yc)/(Z1-Zc) * (0 - Zc);
        // const Xp1 = Xc + (X1-Xc)/(Z1-Zc) * (0 - Zc);

        // const Yp2 = Yc + (Y2-Yc)/(Z2-Zc) * (0 - Zc);
        // const Xp2 = Xc + (X2-Xc)/(Z2-Zc) * (0 - Zc);

        

        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(movementDirection - Math.PI);
        ctx.strokeStyle  = this.color.evaluateColor();
        ctx.fillStyle = this.color.evaluateColor();

        // the length and width should be closer as the particle gets closer to the camera
        
        ctx.fillRect(0,0,r, r*3);
        // ctx.beginPath();
        // ctx.arc(0, 0, r, 0, 2 * Math.PI, true);
        // ctx.fill();
        // ctx.strokeStyle = this.color.evaluateColor();
        // ctx.lineWidth = w;

        // ctx.moveTo(Xp1, Yp1); //1
        // ctx.lineTo(Xp2, Yp2); //2
        // ctx.stroke();

        ctx.restore();
    }
}


/***/ }),

/***/ "./src/game_objects/particles/Singularity_Particle/singularity_particle.js":
/*!*********************************************************************************!*\
  !*** ./src/game_objects/particles/Singularity_Particle/singularity_particle.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SingularityParticle: () => (/* binding */ SingularityParticle)
/* harmony export */ });
/* harmony import */ var _Particle_particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Particle/particle */ "./src/game_objects/particles/Particle/particle.js");
// direction of the particle is the direction of the velocity vector
// the direction of the 
// the particle dies when the hue reaches 0 

// random movement angle created
// initial speed (scale)
// vel = Util.vectorCartesian(angle, scale)
//



class SingularityParticle extends _Particle_particle__WEBPACK_IMPORTED_MODULE_0__.Particle {
    constructor(engine, pos, vel, color) {
        super(engine, pos, 0, color);

        this.transform.vel[0] = vel[0];
        this.transform.vel[1] = vel[1];
        this.transform.vel[2] = 0;

        this.color = color;
        this.addCollider("General", this, this.radius);
        this.checkBounds();
    }

    update(deltaTime) {
    
        this.lineSprite.rectLength -= 0.25;
        this.lineSprite.color.a -= 0.01;
        if (this.lineSprite.color.a < 0.06 || this.lineSprite.rectLength < 0.25) {
            this.parentObject.currentParticleCount -= 1;
            this.remove();
        }
        // acc is influenced by singularities, then changed to usual acc
        this.movementAngle = Math.atan2(this.transform.vel[1], this.transform.vel[0]);
        this.transform.acc = [0,0,0];
        this.checkBounds();
    }
    checkBounds() {
        if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), -0.5)) {
            this.remove();
        }
    }

}


/***/ }),

/***/ "./src/game_objects/particles/bullet_wall_explosion.js":
/*!*************************************************************!*\
  !*** ./src/game_objects/particles/bullet_wall_explosion.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BulletWallExplosion: () => (/* binding */ BulletWallExplosion)
/* harmony export */ });
/* harmony import */ var _Particle_particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Particle/particle */ "./src/game_objects/particles/Particle/particle.js");
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.js");
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game_engine/sound */ "./src/game_engine/sound.js");
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../game_engine/color */ "./src/game_engine/color.js");






class BulletWallExplosion extends _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__.GameObject{
    constructor(engine, pos) {
        super(engine);
        this.transform.pos[0] = pos[0];
        this.transform.pos[1] = pos[1];
        const startingH = (this.gameEngine.gameScript.explosionColorWheel + 180 + Math.random() * 60) % 360;
        const opacity = Math.random() * 0.35 + 0.6;
        this.currentColor = new _game_engine_color__WEBPACK_IMPORTED_MODULE_3__.Color({
            "hsla": [startingH, 100, 50, opacity]
        });
        this.particleNum = 20;
        const bulletWallHit = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_2__.Sound("GEOWars/sounds/bullet_hitwall.wav", 0.1);
        this.wallHit = this.whichWall();
        this.playSound(bulletWallHit);
        this.createParticles();
    }

    whichWall() {
        const pos = this.transform.pos;

        const max = [this.gameEngine.gameScript.DIM_X, this.gameEngine.gameScript.DIM_Y];
        if (pos[0] <= 0) {
            return "LEFT";
        } else if (pos[0] >= max[0]) {
            return "RIGHT";
        } else if (pos[1] <= 0) {
            return "TOP";
        } else if (pos[1] >= max[1]) {
            return "BOTTOM";
        }

    }

    createParticles(){
        for (var i = 0; i < this.particleNum; i++) {
            const colorVarienceDelta = 30;
            const speed = 1 + Math.random() * 3;
            const colorVarience = colorVarienceDelta * Math.random() - colorVarienceDelta / 2;
            const color = this.currentColor.dup();
            color.a = Math.random() * 0.35 + 0.6;
            color.h = (color.h + colorVarience) % 360;

            const x = this.transform.absolutePosition()[0];
            const y = this.transform.absolutePosition()[1];
            const z = 0;
      
            this.addChildGameObject(new _Particle_particle__WEBPACK_IMPORTED_MODULE_0__.Particle(this.gameEngine, [x,y,z], speed, color, this.wallHit));
        }
    }

    update() {
    
        if (this.childObjects.length === 0) {
            this.remove();
        }
    }
}


/***/ }),

/***/ "./src/game_objects/particles/enemy_spawn.js":
/*!***************************************************!*\
  !*** ./src/game_objects/particles/enemy_spawn.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EnemySpawn: () => (/* binding */ EnemySpawn)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.js");


class EnemySpawn extends _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject{
    constructor(engine){
        super(engine);
        this.initialSpawningScale = 1.5;
        // this.spawningScale = 1.5;
        this.lifeTime = 1000;
        this.existTime = 0;
    // this.gameEngine.queueSound(this.parentObject.spawnSound)
    }

    update(timeDelta) {
        this.existTime += timeDelta;
        if (this.existTime >= this.lifeTime){
      
            this.parentObject.exist();
            this.parentObject.lineSprite.spawningScale = 1;
            this.remove();
        }

        const cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        const cycleSpeed = 0.1;
    
        if (this.parentObject.lineSprite.spawningScale < 0.7){
            this.parentObject.lineSprite.spawningScale = this.initialSpawningScale;
        } else {
            this.parentObject.lineSprite.spawningScale -= cycleSpeed * cycleSpeedScale;
        }
    }
}
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

/***/ }),

/***/ "./src/game_objects/particles/particle_explosion.js":
/*!**********************************************************!*\
  !*** ./src/game_objects/particles/particle_explosion.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ParticleExplosion: () => (/* binding */ ParticleExplosion)
/* harmony export */ });
/* harmony import */ var _Particle_particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Particle/particle */ "./src/game_objects/particles/Particle/particle.js");
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.js");
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game_engine/sound */ "./src/game_engine/sound.js");
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../game_engine/color */ "./src/game_engine/color.js");





class ParticleExplosion extends _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__.GameObject{
    constructor(engine, pos){
        super(engine);
        this.transform.pos[0] = pos[0];
        this.transform.pos[1] = pos[1];
        this.cameraTransform = engine.gameScript.ship.cameraTransform;
        const startingH = (this.gameEngine.gameScript.explosionColorWheel + Math.random() * 60)% 360;
        const opacity = Math.random() * 0.35 + 0.6;
        this.currentColor = new _game_engine_color__WEBPACK_IMPORTED_MODULE_3__.Color({
            "hsla": [startingH, 100, 50, opacity]
        });
        if (engine.graphicQuality === 1) {
            // console.log("best")
            this.particleNum = 120; // was 80
        } else if (engine.graphicQuality === 2){
            // console.log("medium")
            this.particleNum = 40;
        } else {
            // console.log("potato")
            this.particleNum = 20;
        }

        const explosionSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_2__.Sound("GEOWars/sounds/Enemy_explode.wav", 0.2);
        this.playSound(explosionSound);
        this.createExplosionParticles();
        engine.gameScript.grid.Explosion(pos);
    }

    createExplosionParticles(){
        for (var i = 0; i < this.particleNum; i++) {
            const speed = Math.random() * 4 + 15;
      
            const colorVarienceDelta = 40;
            const colorVarience = colorVarienceDelta * Math.random() - colorVarienceDelta / 2;
            const color = this.currentColor.dup();
            color.a = Math.random() * 0.15 + 0.80;
            color.h = (color.h + colorVarience) % 360;

            const x = this.transform.absolutePosition()[0];
            const y = this.transform.absolutePosition()[1];
            const z = 0;
            this.addChildGameObject(new _Particle_particle__WEBPACK_IMPORTED_MODULE_0__.Particle(this.gameEngine, [x,y,z], speed, color));
        }
    }

    update(){
        if (this.childObjects.length === 0){
            this.remove();
        }
    }
    // ANIMATION = requestAnimationFrame(drawScene);
}


/***/ }),

/***/ "./src/game_objects/particles/ship_explosion.js":
/*!******************************************************!*\
  !*** ./src/game_objects/particles/ship_explosion.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShipExplosion: () => (/* binding */ ShipExplosion)
/* harmony export */ });
/* harmony import */ var _Particle_particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Particle/particle */ "./src/game_objects/particles/Particle/particle.js");
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.js");
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game_engine/sound */ "./src/game_engine/sound.js");
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../game_engine/color */ "./src/game_engine/color.js");




class ShipExplosion extends _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__.GameObject {
    constructor(engine, pos) {
        super(engine);
        this.transform.pos[0] = pos[0];
        this.transform.pos[1] = pos[1];
        const startingH = (this.gameEngine.gameScript.explosionColorWheel + Math.random() * 60) % 360;
        const opacity = Math.random() * 0.35 + 0.6;
        this.currentColor = new _game_engine_color__WEBPACK_IMPORTED_MODULE_3__.Color({
            "hsla": [startingH, 100, 50, opacity]
        });
        this.particleNum = 400;
        const explosionSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_2__.Sound("GEOWars/sounds/Enemy_explode.wav", 0.2);
        this.playSound(explosionSound);
        this.createExplosionParticles();
    }

    createExplosionParticles() {
        for (var i = 0; i < this.particleNum; i++) {
            const speed = Math.random() * 10 + 4;

            const colorVarienceDelta = 30;
            const colorVarience = colorVarienceDelta * Math.random() - colorVarienceDelta / 2;
            const color = this.currentColor.dup();
            // color.a = Math.random() * 0.35 + 0.6
            // color.h = (color.h + colorVarience) % 360

            this.addChildGameObject(new _Particle_particle__WEBPACK_IMPORTED_MODULE_0__.Particle(this.gameEngine, this.transform.absolutePosition(), speed, color));
        }
    }

    update() {
        if (this.childObjects.length === 0) {
            this.remove();
        }
    }
    // ANIMATION = requestAnimationFrame(drawScene);
}


/***/ }),

/***/ "./src/game_objects/particles/singularity_hit_explosion.js":
/*!*****************************************************************!*\
  !*** ./src/game_objects/particles/singularity_hit_explosion.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SingularityHitExplosion: () => (/* binding */ SingularityHitExplosion)
/* harmony export */ });
/* harmony import */ var _Particle_particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Particle/particle */ "./src/game_objects/particles/Particle/particle.js");
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.js");
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game_engine/sound */ "./src/game_engine/sound.js");
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../game_engine/color */ "./src/game_engine/color.js");




class SingularityHitExplosion extends _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__.GameObject {
    constructor(engine, pos) {
        super(engine);
        this.transform.pos[0] = pos[0];
        this.transform.pos[1] = pos[1];
        const startingH = (this.gameEngine.gameScript.explosionColorWheel + Math.random() * 60 + 180) % 360;
        const opacity = Math.random() * 0.35 + 0.3;
        this.currentColor = new _game_engine_color__WEBPACK_IMPORTED_MODULE_3__.Color({
            "hsla": [startingH, 100, 50, opacity]
        });
        if (engine.graphicQuality === 1) {
            // console.log("best")
            this.particleNum = 50;
        } else if (engine.graphicQuality === 2) {
            // console.log("medium")
            this.particleNum = 30;
        } else {
            // console.log("potato")
            this.particleNum = 15;
        }
        // find singularity hit sound
        const explosionSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_2__.Sound("GEOWars/sounds/Enemy_explode.wav", 0.2);
        this.playSound(explosionSound);
        this.createExplosionParticles();
    }

    createExplosionParticles() {
        for (var i = 0; i < this.particleNum; i++) {
            // adjust speed
            const speed = Math.random() * 3 + 2.5;

            const colorVarienceDelta = 30;
            const colorVarience = colorVarienceDelta * Math.random() - colorVarienceDelta / 2;
            const color = this.currentColor.dup();
            color.a = Math.random() * 0.35 + 0.6;
            color.h = (color.h + colorVarience) % 360;

            this.addChildGameObject(new _Particle_particle__WEBPACK_IMPORTED_MODULE_0__.Particle(this.gameEngine, this.transform.absolutePosition(), speed, color));
        }
    }

    update() {
        if (this.childObjects.length === 0) {
            this.remove();
        }
    }
    // ANIMATION = requestAnimationFrame(drawScene);
}


/***/ }),

/***/ "./src/game_objects/particles/singularity_particles.js":
/*!*************************************************************!*\
  !*** ./src/game_objects/particles/singularity_particles.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SingularityParticles: () => (/* binding */ SingularityParticles)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.js");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/util */ "./src/game_engine/util.js");
/* harmony import */ var _Singularity_Particle_singularity_particle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Singularity_Particle/singularity_particle */ "./src/game_objects/particles/Singularity_Particle/singularity_particle.js");
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../game_engine/color */ "./src/game_engine/color.js");





class SingularityParticles extends _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject {
    constructor(engine, transform) {
        super(engine);
        this.transform = transform;
        const startingH = Math.random() * 360;
        const opacity = Math.random() * 0.35 + 0.6;
        this.frequencyParticleCreation = 10;
        this.particleCreationTime = 0;
        this.currentColor = new _game_engine_color__WEBPACK_IMPORTED_MODULE_3__.Color({
            "hsla": [startingH, 100, 50, opacity]
        });

        this.particleNum = 80;
        this.currentParticleCount = 0;
        // let explosionSound = new Sound("GEOWars/sounds/Enemy_explode.wav", 0.2)
        this.createSingularityParticles();
    
    }

    createSingularityParticles() {
    
        for (var i = 0; i < this.particleNum; i++) {
            this.addSingularityParticle();
            this.currentParticleCount++;
        }
    }

    addSingularityParticle(){
        const L = 70;
        const length = 0;
        const baseSpeed = 3;

        const distanceVarienceDelta = 15;
        const colorVarienceDelta = 10;
        const angleVarienceDelta = Math.PI / 4;
        const speedVarienceDelta = 2;

        const distanceVarience = distanceVarienceDelta * Math.random() - distanceVarienceDelta / 2;
        const colorVarience = colorVarienceDelta * Math.random() - colorVarienceDelta / 2;
        const angleVarience = angleVarienceDelta * Math.random() - angleVarienceDelta / 2;
        const speedVarience = speedVarienceDelta * Math.random() - speedVarienceDelta / 2;

        const r = L + distanceVarience;
        const theta = Math.random() * 2 * Math.PI;
        const alpha = theta + Math.PI / 2 +  angleVarience;
        const speed = baseSpeed + speedVarience;

        const pos = [r * Math.cos(theta) + this.transform.pos[0], r * Math.sin(theta) + this.transform.pos[1]];
        const vel = [speed * Math.cos(alpha) + this.transform.vel[0], speed * Math.sin(alpha) + this.transform.vel[1]];
        const color = this.currentColor.dup();

        color.a = Math.random() * 0.19 + 0.8;
        color.h = (color.h + colorVarience) % 360;

        this.addChildGameObject(new _Singularity_Particle_singularity_particle__WEBPACK_IMPORTED_MODULE_2__.SingularityParticle(this.gameEngine, pos, vel, color));
    }

    changeCurrentColor(){
        this.currentColor.h += 1 / 2;
        this.currentColor.h = this.currentColor.h % 360;
    }

    update(timeDelta) {
        this.particleCreationTime += timeDelta;
        if (this.particleCreationTime > this.frequencyParticleCreation){
            this.particleCreationTime = 0;
            if (this.currentParticleCount < 60){
                this.addSingularityParticle();
            }
        }
        this.changeCurrentColor();
    }
    // ANIMATION = requestAnimationFrame(drawScene);
}


/***/ }),

/***/ "./src/game_objects/particles/star.js":
/*!********************************************!*\
  !*** ./src/game_objects/particles/star.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Star: () => (/* binding */ Star),
/* harmony export */   StarSprite: () => (/* binding */ StarSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.js");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/line_sprite */ "./src/game_engine/line_sprite.js");



class Star extends _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject {
    constructor(engine, pos = [0,0,0], cameraTransform) {
        super(engine);
        this.transform.pos[0] = pos[0];
        this.transform.pos[1] = pos[1];
        this.transform.pos[2] = pos[2];
        this.transform.cameraTransform = cameraTransform;
        this.addLineSprite(new StarSprite(this.transform));
        // add random good colors
    }
}

class StarSprite extends _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__.LineSprite {
    constructor(transform) {
        super(transform);
        this.radius = Math.random() * 2 + 0.25; // 1 - 3
    }
    draw(ctx) {
        const pos = this.transform.absolutePosition();
        const radius = this.transform.absoluteLength(this.radius);
        const r = 255;
        const g = 255;
        const b = 255;
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.strokeStyle = "rgb(255, 255, 255)";
        ctx.fillStyle = "rgb(255, 255, 255)";
        this.drawStar(ctx, radius, pos);
        ctx.restore();
    }
    drawStar(ctx, radius, pos) {
        const r = radius;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(pos[0], pos[1], r, 0, 2 * Math.PI, true);
        ctx.fill();
    }
}

/***/ }),

/***/ "./src/game_objects/ship/ship.js":
/*!***************************************!*\
  !*** ./src/game_objects/ship/ship.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ship: () => (/* binding */ Ship)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.js");
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/sound */ "./src/game_engine/sound.js");
/* harmony import */ var _ship_sprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship_sprite */ "./src/game_objects/ship/ship_sprite.js");
/* harmony import */ var _Bullet_bullet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Bullet/bullet */ "./src/game_objects/Bullet/bullet.js");
/* harmony import */ var _game_engine_transform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../game_engine/transform */ "./src/game_engine/transform.js");






class Ship extends _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject {
    constructor(engine, pos, initialCameraZPos) { 
        super(engine);
        this.transform.pos = pos;
        this.transform.pos[2] = [0];
        this.cameraTransform = new _game_engine_transform__WEBPACK_IMPORTED_MODULE_4__.Transform();
        this.cameraTransform.pos = [pos[0], pos[1], initialCameraZPos];
        this.addPhysicsComponent();
        this.addMousePosListener();
        this.addLeftControlStickListener();
        this.addRightControlStickListener();
        this.addStartButtonListener();
        this.radius = 10;
        this.addCollider("General", this, this.radius);
        this.addCollider("ShipDeath", this, this.radius, ["BoxBox", "Singularity", "Weaver", "Grunt", "Arrow", "Pinwheel", "AlienShip"], ["General"]);
        this.addLineSprite(new _ship_sprite__WEBPACK_IMPORTED_MODULE_2__.ShipSprite(this.transform));
        this.maxSpeed = 2.5; // 2.5
        this.mousePos = [0,0];
        this.fireAngle = 0;
        this.bulletSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__.Sound("GEOWars/sounds/Fire_normal.wav", 0.2);
        this.upgradeBulletsSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__.Sound("GEOWars/sounds/Hi_Score_achieved.wav");
        this.bulletTimeCheck = 0;
        this.bulletInterval = 120;
        this.controlsDirection = [0,0];
        this.powerLevel = 1;
        this.bulletNumber = 0;
        this.controlsPointing = true;
        this.speed;
        this.shipEngineAcceleration = 0.5; // 0.125
        this.dontShoot = false;

        this.keysPressed = [];
        this.pauseKeyedUp = true;
        this.zooming = true;

        this.spawning = true;
        this.spawningTime = 0;
        this.flashingTime = 0;
        this.flashTime = 1000 / 8;
        this.flashing = true;
        this.flashIntervalTime = 0;
        this.flashInterval = 250 - 1000 / 8;
        this.spawnTime = 2500;
        this.lineSprite.flashHide = true;
        this.controllerInUse = false;
        this.gameEditorHasBeenOpened = false;
    // 1/8 of a second flash every half second
    }

  
    update(deltaTime){
        if(this.gameEngine.gameEditorOpened) {
            if(!this.gameEditorHasBeenOpened) {
                const _width = this.gameEngine.gameScript.DIM_X;
                const _height = this.gameEngine.gameScript.DIM_Y;
                const _zoomScale = this.gameEngine.zoomScale;
                const _yPosition = this.transform.pos[1];
                const _xPosition = this.transform.pos[0];
                console.log({_width, _height, _zoomScale, _xPosition, _yPosition});
                this.gameEngine.ctx.translate(
                    ((_xPosition*_zoomScale - _width/(2))) ,
                    ((_yPosition*_zoomScale - _height/(2)))
                );
                this.gameEngine.zoomScale = 1;
            }
            this.gameEditorHasBeenOpened = true;
            return;
        } else {
            this.gameEditorHasBeenOpened = false;
        }
        this.bulletTimeCheck += deltaTime;

        // game state stuff that doesn't belong in the ship #gamestate
        if (this.bulletTimeCheck >= this.bulletInterval && !this.spawning && this.controlsPointing && !this.dontShoot) {
            this.bulletNumber += 1;
            this.bulletTimeCheck = 0;
            this.fireBullet();
        } 

        if (this.spawning){

            this.spawningTime += deltaTime;
            if (this.flashing) {
                this.flashingTime += deltaTime;
                if (this.flashingTime > this.flashTime) {
                    this.flashingTime = 0;
                    this.flashing = false;
                    this.lineSprite.flashHide = false;
                } 
            } else {
                this.flashIntervalTime += deltaTime;
                if (this.flashIntervalTime > this.flashInterval) {
                    this.flashIntervalTime = 0;
                    this.flashing = true;
                    this.lineSprite.flashHide = true;
                } 
            }

            if (this.spawningTime > this.spawnTime) {
                this.spawning = false;
                this.flashing = false;
                this.lineSprite.flashHide = false;
                this.spawningTime = 0;
                this.flashIntervalTime = 0;
                this.flashingTime = 0;
            }
      
        }

        // this.moveInControllerDirection(deltaTime)

        if (this.isOutOfBounds()) {
            this.wallGraze();
        } else {
            this.movementMechanics(deltaTime);
      
        }
        // if ship is out of x bounds, maintain y speed, keep x at edge value

        this.updateZoomScale();

        // stuff that belongs in camera #camera
        this.gameEngine.ctx.restore();
        this.gameEngine.ctx.save();
        const shipXPos = this.transform.pos[0];
        const shipYPos = this.transform.pos[1];
        const zoomScale = this.gameEngine.zoomScale;
        const width = this.gameEngine.gameScript.DIM_X;
        const height = this.gameEngine.gameScript.DIM_Y;

        this.cameraTransform.pos[0] = shipXPos;
        this.cameraTransform.pos[1] = shipYPos;
        // this.cameraTransform.pos[2] = based on zoomScale

        this.gameEngine.ctx.translate(
            -shipXPos * zoomScale + width / 2,
            -shipYPos * zoomScale + height / 2
        );
    }

    upgradeBullets() {
        this.powerLevel += 1;
        this.playSound(this.upgradeBulletsSound);
    }
  
    findSmallestDistanceToAWall(){
        const pos = this.transform.pos;
        const leftDistance = pos[0] - 0;
        const rightDistance = this.gameEngine.gameScript.DIM_X - pos[0];
        const upDistance = pos[1] - 0;
        const downDistance = this.gameEngine.gameScript.DIM_Y - pos[1];
        const distances = [leftDistance, rightDistance, upDistance, downDistance];
        return Math.min.apply(null, distances); 
    }

    updateZoomScale(){
        const distanceToZoomChange = 100;
        const smallestZoomScale = 0.75; // of the origional zoomscale
        const smallest = this.findSmallestDistanceToAWall();
        if (smallest < distanceToZoomChange) {
            this.gameEngine.zoomScale = this.gameEngine.defaultZoomScale * (smallest / distanceToZoomChange * (1 - smallestZoomScale) + smallestZoomScale);
        } else {
            this.gameEngine.zoomScale = this.gameEngine.defaultZoomScale;
        }

        // this should also update the camera's Z position
    }

    // 
    calcControlsDirection(){
    
        this.controlsDirection = [0,0];
        this.keysPressed.forEach((key) => {
            this.controlsDirection[0] += Ship.MOVES[key][0];
            this.controlsDirection[1] += Ship.MOVES[key][1];
        });
    }

    movementMechanics(deltaTime) {
    // get dV
    //    mV => max speed in the direction of the controller
    //    Vo => current velocity
    //    dV~ =  mV - Vo
    // if dv~ > 0.2 (or something)
    //    a = ma~ 
        if (!this.controllerInUse) {
            this.calcControlsDirection();
        }

        const movementAngle = Math.atan2(this.controlsDirection[1], this.controlsDirection[0]);
        const Vo = this.transform.absoluteVelocity();
        let mV = [];

        if(this.controlsDirection[0] == 0 && this.controlsDirection[1] == 0){
            mV = [0, 0];
        } else {
            mV = [this.maxSpeed * Math.cos(movementAngle), this.maxSpeed * Math.sin(movementAngle)];
            this.transform.angle = movementAngle;
        }

        const dV = [mV[0] - Vo[0], mV[1] - Vo[1]];
        const alpha = Math.atan2(dV[1], dV[0]);

        this.transform.acc[0] += this.shipEngineAcceleration * Math.cos(alpha);
        this.transform.acc[1] += this.shipEngineAcceleration * Math.sin(alpha);
    }

    isOutOfBounds(){
        return this.gameEngine.gameScript.isOutOfBounds(this.transform.pos, this.radius);
    }

    updateMousePos(mousePos){
        this.setFireAngle(mousePos);
    }

    updateRightControlStickInput(vector) {
        if (Math.abs(vector[0]) + Math.abs(vector[1]) > 0.10) {
            this.dontShoot = false;
            this.fireAngle = Math.atan2(vector[1], vector[0]);
        } else {
            this.dontShoot = true;
        }
    }

    updateLeftControlStickInput(key, down = true) {
        if(typeof key === "string"){
            // accelerates to V = [0,0] when not pressed
            if (down) {
                if (!this.keysPressed.includes(key)) {
                    this.keysPressed.push(key);
                }

                // this.controlsDirection[0] += unitVector[0]
                // this.controlsDirection[1] += unitVector[1]
            } else {
                if (this.keysPressed.includes(key)) {
                    this.keysPressed.splice(this.keysPressed.indexOf(key), 1);
                }

                // this.controlsDirection[0] -= unitVector[0]
                // this.controlsDirection[1] -= initVector[1]
            }
        } else {
            this.controllerInUse = true;
            if (Math.abs(key[0]) + Math.abs(key[1]) > 0.10) {
                this.controlsDirection = key;
            } else {
                this.controlsDirection = [0,0];
            }
        }
    } 
    // Refactor into game engine and game script
    updateStartButtonListener(key, down){
        if (typeof key === "string"){
            if(down){
                if(this.pauseKeyedUp){
                    this.pauseKeyedUp = false;
                    if (this.gameEngine.paused && !this.gameEngine.muted) {
                        this.gameEngine.gameScript.theme.play();
                    }
                    this.gameEngine.togglePause();
                }
            } else {
                this.pauseKeyedUp = true;
            }
        } else if(key[0]) {
            if (this.pauseKeyedUp){
                this.pauseKeyedUp = false;
                if (this.gameEngine.paused && !this.gameEngine.muted) {
                    this.gameEngine.gameScript.theme.play();
                }
                this.gameEngine.togglePause();
            }
        } else {
            this.pauseKeyedUp = true;
        }
    }

    wallGraze() {
        this.gameEngine.gameScript.wallGraze(this.transform, this.radius * 2);
    }

    onCollision(collider, type) {
        if (type === "ShipDeath") {
  
            this.gameEngine.gameScript.death();
            this.deathflash();
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
            this.mousePos = mousePos;
        }
        const shipXPos = this.transform.pos[0];
        const shipYPos = this.transform.pos[1];
        const zoomScale = this.gameEngine.zoomScale;
        const width = this.gameEngine.gameScript.DIM_X;
        const height = this.gameEngine.gameScript.DIM_Y;

        const mouseX = mousePos[0] / zoomScale + shipXPos  - width / (2 * zoomScale);
        const mouseY = mousePos[1] / zoomScale + shipYPos  - height / (2 * zoomScale);
        // SCALE NUMBER
        const dy =  mouseY - this.transform.pos[1];
        const dx =  mouseX - this.transform.pos[0];
        this.fireAngle =  Math.atan2(dy, dx);
    }

    fireBullet() {
    
        this.gameEngine.queueSound(this.bulletSound);
        const shipvx = this.transform.vel[0];
        const shipvy = this.transform.vel[1];

        const relBulletVelX1 = _Bullet_bullet__WEBPACK_IMPORTED_MODULE_3__.Bullet.SPEED * Math.cos(this.fireAngle);
        const relBulletVelY1 = _Bullet_bullet__WEBPACK_IMPORTED_MODULE_3__.Bullet.SPEED * Math.sin(this.fireAngle);

        const bulletVel1 = [shipvx + relBulletVelX1, shipvy + relBulletVelY1];
        this.addChildGameObject(new _Bullet_bullet__WEBPACK_IMPORTED_MODULE_3__.Bullet(this.gameEngine, this.transform.pos, bulletVel1, this.bulletNumber));

        if (this.powerLevel >= 2) {
            const relBulletVelX2 = (_Bullet_bullet__WEBPACK_IMPORTED_MODULE_3__.Bullet.SPEED - 0.5) * Math.cos(this.fireAngle + Math.PI / 32);
            const relBulletVelY2 = (_Bullet_bullet__WEBPACK_IMPORTED_MODULE_3__.Bullet.SPEED - 0.5) * Math.sin(this.fireAngle + Math.PI / 32);
            const relBulletVelX3 = (_Bullet_bullet__WEBPACK_IMPORTED_MODULE_3__.Bullet.SPEED - 0.5) * Math.cos(this.fireAngle - Math.PI / 32);
            const relBulletVelY3 = (_Bullet_bullet__WEBPACK_IMPORTED_MODULE_3__.Bullet.SPEED - 0.5) * Math.sin(this.fireAngle - Math.PI / 32);

            const bulletVel2 = [shipvx + relBulletVelX2, shipvy + relBulletVelY2];
            const bulletVel3 = [shipvx + relBulletVelX3, shipvy + relBulletVelY3];
            // doesn't support parent transformations... yet
            this.addChildGameObject(new _Bullet_bullet__WEBPACK_IMPORTED_MODULE_3__.Bullet(this.gameEngine, this.transform.pos, bulletVel2, this.bulletNumber, 'left', this.powerLevel));
            this.addChildGameObject(new _Bullet_bullet__WEBPACK_IMPORTED_MODULE_3__.Bullet(this.gameEngine, this.transform.pos, bulletVel3, this.bulletNumber,  'right', this.powerLevel));
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

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

Ship.MOVES = {
    s: [0, 1],
    a: [-1, 0],
    w: [0, -1],
    d: [1, 0],
};



/***/ }),

/***/ "./src/game_objects/ship/ship_sprite.js":
/*!**********************************************!*\
  !*** ./src/game_objects/ship/ship_sprite.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShipSprite: () => (/* binding */ ShipSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/line_sprite */ "./src/game_engine/line_sprite.js");


class ShipSprite extends _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__.LineSprite {
    constructor(transform, spawningScale = 1) {
        super(transform);
        this.spawningScale = spawningScale;
        this.flashHide = false;
    }

    draw(ctx) {
        if (!this.flashHide) {
            const pos = this.transform.absolutePosition();
            const shipWidth = 10;
            const vel = this.transform.absoluteVelocity();
            // let movementDirection = Math.atan2(vel[0], -vel[1])
            ctx.save();
            ctx.beginPath();
            ctx.translate(pos[0], pos[1]);
            ctx.rotate(this.transform.angle + Math.PI / 4);
            ctx.translate(-shipWidth / 2, shipWidth / 2);

            ctx.strokeStyle = "#ffffff";
            const r = 255;
            const g = 255;
            const b = 255;

            const blurFactor = 0.5;
            ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
            ctx.shadowBlur = 10 * blurFactor * blurFactor;
            ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.1)";
            ctx.lineWidth = 7.5 * blurFactor * blurFactor;
            ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.1)";
            this.drawShip(ctx, shipWidth);
            ctx.lineWidth = 6 * blurFactor;
            ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.1)";
            this.drawShip(ctx, shipWidth);
            ctx.lineWidth = 4.5;
            this.drawShip(ctx, shipWidth);
            ctx.lineWidth = 3;
            this.drawShip(ctx, shipWidth);
            ctx.strokeStyle = 'rgb(255, 255, 255)';
            ctx.lineWidth = 1.5;
            this.drawShip(ctx, shipWidth);

            ctx.restore();
        }
    
    }

    drawShip(ctx, shipWidth) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -shipWidth);
        ctx.lineTo(2 / 3 * shipWidth, -(1 + 1 / 6) * shipWidth); //1
        ctx.lineTo(1 / 3 * shipWidth, -5 / 6 * shipWidth); // 2
        ctx.lineTo(1 / 3 * shipWidth, -1 / 3 * shipWidth); // 2.5
        ctx.lineTo(5 / 6 * shipWidth, -1 / 3 * shipWidth); // 3
        ctx.lineTo((1 + 1 / 6) * shipWidth, -2 / 3 * shipWidth); // 4
        ctx.lineTo(shipWidth, 0); // 5
        ctx.closePath();
        ctx.stroke();
    }
}

/***/ }),

/***/ "./src/game_script.js":
/*!****************************!*\
  !*** ./src/game_script.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameScript: () => (/* binding */ GameScript)
/* harmony export */ });
/* harmony import */ var _game_objects_ship_ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_objects/ship/ship */ "./src/game_objects/ship/ship.js");
/* harmony import */ var _game_objects_Walls_walls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_objects/Walls/walls */ "./src/game_objects/Walls/walls.js");
/* harmony import */ var _game_objects_Overlay_overlay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game_objects/Overlay/overlay */ "./src/game_objects/Overlay/overlay.js");
/* harmony import */ var _game_objects_particles_Grid_grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game_objects/particles/Grid/grid */ "./src/game_objects/particles/Grid/grid.js");
/* harmony import */ var _game_objects_enemies_BoxBox_boxbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game_objects/enemies/BoxBox/boxbox */ "./src/game_objects/enemies/BoxBox/boxbox.js");
/* harmony import */ var _game_objects_enemies_Pinwheel_pinwheel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./game_objects/enemies/Pinwheel/pinwheel */ "./src/game_objects/enemies/Pinwheel/pinwheel.js");
/* harmony import */ var _game_objects_enemies_Arrow_arrow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./game_objects/enemies/Arrow/arrow */ "./src/game_objects/enemies/Arrow/arrow.js");
/* harmony import */ var _game_objects_enemies_Grunt_grunt__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./game_objects/enemies/Grunt/grunt */ "./src/game_objects/enemies/Grunt/grunt.js");
/* harmony import */ var _game_objects_enemies_Weaver_weaver__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./game_objects/enemies/Weaver/weaver */ "./src/game_objects/enemies/Weaver/weaver.js");
/* harmony import */ var _game_objects_enemies_Singularity_singularity__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./game_objects/enemies/Singularity/singularity */ "./src/game_objects/enemies/Singularity/singularity.js");
/* harmony import */ var _game_objects_enemies_Singularity_alien_ship__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./game_objects/enemies/Singularity/alien_ship */ "./src/game_objects/enemies/Singularity/alien_ship.js");
/* harmony import */ var _game_objects_particles_particle_explosion__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./game_objects/particles/particle_explosion */ "./src/game_objects/particles/particle_explosion.js");
/* harmony import */ var _game_objects_particles_ship_explosion__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./game_objects/particles/ship_explosion */ "./src/game_objects/particles/ship_explosion.js");
/* harmony import */ var _game_objects_particles_star__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./game_objects/particles/star */ "./src/game_objects/particles/star.js");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./game_engine/util */ "./src/game_engine/util.js");
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./game_engine/sound */ "./src/game_engine/sound.js");
/* harmony import */ var _game_engine_state_machine__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./game_engine/state_machine */ "./src/game_engine/state_machine.js");



















class GameScript {
    constructor(engine) {
        this.theme = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_15__.Sound("GEOWars/sounds/Geometry_OST.mp3", 1);
        this.gameOverSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_15__.Sound("GEOWars/sounds/Game_over.wav");
        this.gameStartSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_15__.Sound("GEOWars/sounds/Game_start.wav");
        this.shipDeathSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_15__.Sound("GEOWars/sounds/Ship_explode.wav");
        this.DIM_X = 1000;
        this.DIM_Y = 600;
        this.BG_COLOR = "#000000";
        this.gameTime = 0;
        this.score = 0;
        this.engine = engine;
        this.arrowAdded = false;
        this.startPosition = [500, 300, 0];
        this.initialCameraZPos = -1000;
        this.ship = this.createShip();
        this.createStars();
        this.walls = this.createWalls();
        this.grid = this.createGrid(this.ship.cameraTransform);
        this.overlay = this.createOverlay();
        this.enemyCreatorList = this.createEnemyCreatorList();
        this.engine.addxButtonListener(this);
        this.aliveEnemies = [];
        this.sequenceTypes = this.addSequenceTypes();
        this.spawnStateMachine = this.createSpawnStateMachine();
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
        this.soundsToPlay = {};
        this.scoreMultiplier = 1;

        this.spawnthing = false;
        this.explosionColorWheel = 0;
    }

    createStars() {
        console.log(this.ship);
        const runoffFactor = 1.5;
        for(let i = 0; i < 400; i++) {
            const X = (runoffFactor * Math.random() - runoffFactor/2) * this.DIM_X; // based on zoom scale and eventually camera position
            const Y = (runoffFactor * Math.random() - runoffFactor/2) * this.DIM_Y;
            // const Z = -this.initialCameraZPos * 0.25 + -this.initialCameraZPos * 2 * Math.random();
            const Z = -this.initialCameraZPos * (0.5 + 0.75 * Math.random());
            new _game_objects_particles_star__WEBPACK_IMPORTED_MODULE_13__.Star(this.engine, [X, Y, Z], this.ship.cameraTransform);
        }
    }

    updatexButtonListener(xButton) {
        if (xButton[0]) {
            if (this.engine.paused) {
                var modal = document.getElementById("endModal");

                modal.style.display = "none";
                this.engine.paused = false;
                if (!this.engine.muted) {
                    this.engine.gameScript.theme.play();
                }
            }
        }
    }

    update(deltaTime) {
        this.spawnSequence(deltaTime);
        this.changeExplosionColor();
    }

    changeExplosionColor() {
        this.explosionColorWheel += 1 / 2;
        this.explosionColorWheel = this.explosionColorWheel % 360;
    }

    tallyScore(gameObject) {
        this.score += gameObject.points * this.scoreMultiplier;
        if (this.score) {
        }
    }

    resetGame() {
        this.deathPaused = true;
        this.desplayEndScore = this.score;
        this.score = 0;
        this.lives = 3;
        this.ship.transform.pos = this.startPosition;
        this.sequenceCount = 0;
        this.deathPauseTime = 2500;
        this.ship.powerLevel = 1;
        this.intervalTiming = 1;
        this.intervalTime = 0;
        this.hugeSequenceTime = 0;
        this.lives = 3;
        this.scoreMultiplier = 1;
        this.spawnthing = false;
        this.engine.paused = true;
        var modal = document.getElementById("endModal");
        modal.style.display = "block";
        var scoreDisplay = document.getElementById("score");
        scoreDisplay.innerHTML = `score: ${this.desplayEndScore}`;

        // Get the button that opens the modal
        // var btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        var xclose = document.getElementsByClassName("endClose")[0];

        // When the user clicks on <span> (x), close the modal
        xclose.onclick = (e) => {
            e.stopPropagation();
            modal.style.display = "none";
            this.engine.paused = false;
            window.removeEventListener("click", closeModalWithClick, false);
            if (!this.engine.muted) {
                this.engine.gameScript.theme.play();
                this.engine.gameScript.gameStartSound.play();
            }
        };

        const closeModalWithClick = (e) => {
            if (e.target == modal) {
                this.engine.paused = false;
                if (!this.engine.muted) {
                    this.engine.gameScript.theme.play();
                    this.engine.gameScript.gameStartSound.play();
                }
                modal.style.display = "none";
                window.removeEventListener("click", closeModalWithClick, false);
            }
        };

        // When the user clicks anywhere outside of the modal, close it
        window.addEventListener("click", closeModalWithClick, false);
    }

    death() {
        this.lives -= 1;
        this.deathPaused = true;
        this.explodeEverything();
        this.deathPauseTime = 4000;
        if (!this.engine.muted) {
            this.engine.gameScript.shipDeathSound.play();
        }
        this.grid.Playerdies(this.ship.transform.absolutePosition());
        if (this.lives === 0) {
            try {
                this.theme.pause();
            } catch (err) {}
            if (!this.engine.muted) {
                this.engine.gameScript.gameOverSound.play();
            }
            // this.playSoundthis.gameOverSound
            window.setTimeout(this.resetGame.bind(this), 2000);
        }
    }

    gameOver() {
    // end the game here
    }

    explodeEverything() {
        const removeList = [];
        const typesToRemove = [
            "Grunt",
            "Pinwheel",
            "BoxBox",
            "Arrow",
            "Singularity",
            "Weaver",
            "AlienShip",
        ];
        this.engine.gameObjects.forEach((object) => {
            if (object.constructor.name === "Ship") {
                const objectTransform = object.transform;
                const pos = objectTransform.absolutePosition();
                new _game_objects_particles_ship_explosion__WEBPACK_IMPORTED_MODULE_12__.ShipExplosion(this.engine, pos, [0, 0]);
            } else if (object.constructor.name === "Bullet") {
                removeList.push(object);
            } else if (typesToRemove.includes(object.constructor.name)) {
                const objectTransform = object.transform;
                const pos = objectTransform.absolutePosition();
                const vel = objectTransform.absoluteVelocity();
                new _game_objects_particles_particle_explosion__WEBPACK_IMPORTED_MODULE_11__.ParticleExplosion(this.engine, pos);
                removeList.push(object);
            }
        });
        removeList.forEach((removeThis) => {
            removeThis.remove();
        });
    }

    levelDesigner() {
        const modal = document.getElementById("levelDesignerModal");
    }

    onPause() {
        try {
            this.theme.pause();
        } catch (error) {}

        var modal = document.getElementById("pauseModal");
        modal.style.display = "block";
    }

    onUnPause() {
        try {
            this.theme.unPause();
        } catch (error) {}

        var modal = document.getElementById("pauseModal");
        modal.style.display = "none";
    }

    randomArrowDirection() {
        const angles = [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2];
        return angles[Math.floor(Math.random() * angles.length) % angles.length];
    }

    createEnemyCreatorList() {
        const engine = this.engine;
        return {
            BoxBox: (pos) => new _game_objects_enemies_BoxBox_boxbox__WEBPACK_IMPORTED_MODULE_4__.BoxBox(engine, pos),
            Pinwheel: (pos) => new _game_objects_enemies_Pinwheel_pinwheel__WEBPACK_IMPORTED_MODULE_5__.Pinwheel(engine, pos),
            Arrow: (pos, angle) => new _game_objects_enemies_Arrow_arrow__WEBPACK_IMPORTED_MODULE_6__.Arrow(engine, pos, angle),
            Grunt: (pos) => new _game_objects_enemies_Grunt_grunt__WEBPACK_IMPORTED_MODULE_7__.Grunt(engine, pos, this.ship.transform),
            Weaver: (pos) => new _game_objects_enemies_Weaver_weaver__WEBPACK_IMPORTED_MODULE_8__.Weaver(engine, pos, this.ship.transform),
            Singularity: (pos) => new _game_objects_enemies_Singularity_singularity__WEBPACK_IMPORTED_MODULE_9__.Singularity(engine, pos),
            AlienShip: (pos) =>
                new _game_objects_enemies_Singularity_alien_ship__WEBPACK_IMPORTED_MODULE_10__.AlienShip(engine, pos, [0, 0], this.ship.transform),
        };
    }

    randomSpawnEnemy(enemy) {
        const pos = this.randomPosition();
        const enemyCreators = Object.values(this.enemyCreatorList);
        enemyCreators[
            Math.floor(Math.random() * enemyCreators.length) % enemyCreators.length
        ](pos);
    // this.enemyCreatorList["BoxBox"](pos)
    }

    addSequenceTypes() {
        return {
            Singularity: () => {
                this.enemyCreatorList["Singularity"]([700, 300]);
            },
            EasyGroups: () => {
                const randomPositions = [];
                for (let i = 0; i < 5; i++) {
                    const pos = this.randomPosition();
                    randomPositions.push(pos);
                }
                randomPositions.forEach((pos) => {
                    const possibleSpawns = ["BoxBox", "Pinwheel"]; //, "Singularity"]
                    this.enemyCreatorList[
                        possibleSpawns[
                            Math.floor(Math.random() * possibleSpawns.length) %
                possibleSpawns.length
                        ]
                    ](pos);
                });
            },
            EasyGroupsArrows: () => {
                const randomPositions = [];
                for (let i = 0; i < 5; i++) {
                    const pos = this.randomPosition();
                    randomPositions.push(pos);
                }
                randomPositions.forEach((pos) => {
                    const possibleSpawns = ["BoxBox", "Pinwheel", "Arrow", "Singularity"];
                    this.enemyCreatorList[
                        possibleSpawns[
                            Math.floor(Math.random() * possibleSpawns.length) %
                possibleSpawns.length
                        ]
                    ](pos);
                });
            },
            ArrowsAttack: () => {
                const somePositions = [
                    [200, 300],
                    [1000, 300],
                    [600, 100],
                ];
                const pos =
          somePositions[
              Math.floor(Math.random() * somePositions.length) %
              somePositions.length
          ];
                for (let i = 0; i < 5; i++) {
                    pos[1] += i * 80;
                    this.enemyCreatorList["Arrow"](pos);
                }
            },
            GruntGroups: () => {
                const randomPos = this.randomPosition();
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        this.enemyCreatorList["Grunt"]([
                            i * 40 + randomPos[0],
                            j * 40 + randomPos[1],
                        ]);
                    }
                }
            },
            GreenGroups: () => {
                const randomPos = this.randomPosition();
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        this.enemyCreatorList["Weaver"]([
                            i * 40 + randomPos[0],
                            j * 40 + randomPos[1],
                        ]);
                    }
                }
            },
        };
    }

    createSpawnStateMachine() {
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
            this.DIM_X * 0.7 * Math.random(),
            this.DIM_Y * 0.7 * Math.random(),
            // 500,300
        ];
    }

    spawnSequence(delta) {
        if (this.deathPaused) {
            this.deathPausedTime += delta;
            if (this.deathPausedTime > this.deathPauseTime) {
                this.deathPausedTime = 0;
                this.deathPaused = false;
            }
        } else {
            this.intervalTime += delta;
        }

        this.testing = false;
        if (this.testing) {
            if (this.sequenceCount === 0) {
                this.enemyCreatorList["AlienShip"]([500, 100]);
                this.sequenceCount += 1;
            }
        } else {
            this.gameTime += delta;
            if (this.sequenceCount === 1) {
                this.enemyCreatorList["Singularity"]([700, 300]);
                this.sequenceCount += 1;
            }
            // wait time              //parentIndex   // repeat count
            if (
                this.intervalTime > 2500 * this.intervalTiming &&
        this.sequenceCount < 5
            ) {
                this.intervalTime = 0;
                this.sequenceTypes["EasyGroups"](); // event
                // this.randomSpawnEnemy();
                this.sequenceCount += 1;
            } else if (this.sequenceCount === 5 && this.intervalTime > 5000) {
                this.sequenceCount += 1;
            } else if (
                this.intervalTime > 2500 * this.intervalTiming &&
        this.sequenceCount > 5 &&
        this.sequenceCount < 10
            ) {
                this.sequenceCount += 1;
                this.intervalTime = 0;
                this.sequenceTypes["EasyGroupsArrows"]();
            } else if (this.sequenceCount === 10 && this.intervalTime > 5000) {
                this.sequenceCount += 1;
            } else if (
                this.intervalTime > 1500 * this.intervalTiming &&
        this.sequenceCount > 10 &&
        this.sequenceCount < 15
            ) {
                this.sequenceCount += 1;
                this.intervalTime = 0;
                this.sequenceTypes["GruntGroups"]();
            } else if (this.sequenceCount === 15 && this.intervalTime > 2000) {
                this.sequenceCount += 1;
            } else if (
                this.intervalTime > 2000 * this.intervalTiming &&
        this.sequenceCount > 15 &&
        this.sequenceCount < 20
            ) {
                this.sequenceCount += 1;
                this.intervalTime = 0;
                this.sequenceTypes["GreenGroups"]();
            } else if (this.sequenceCount === 20 && this.intervalTime > 3000) {
                this.sequenceCount += 1;
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
            else if (
                this.intervalTime > 375 &&
        this.sequenceCount > 20 &&
        this.sequenceCount < 30 &&
        this.hugeSequenceTime % 2 === 0
            ) {
                this.ship.upgradeBullets();
                this.intervalTime = 0;
                this.sequenceCount += 1;

                const fourCorners = [
                    [40, 40],
                    [GameScript.DIM_X - 40, 40],
                    [40, GameScript.DIM_Y - 40],
                    [GameScript.DIM_X - 40, GameScript.DIM_Y - 40],
                ];
                fourCorners.forEach((corner) => {
                    this.enemyCreatorList["Grunt"](corner);
                });
            } else if (
                this.intervalTime > 375 &&
        this.sequenceCount > 20 &&
        this.sequenceCount < 30 &&
        this.hugeSequenceTime % 2 === 1
            ) {
                this.intervalTime = 0;
                this.sequenceCount += 10;
                const arrowWallPositions = [];
                const arrowDirection = (Math.PI * 3) / 2 + Math.PI;
                for (let i = 40; i < GameScript.DIM_X; i += 40) {
                    arrowWallPositions.push([i, 50]);
                }

                arrowWallPositions.forEach((position) => {
                    this.enemyCreatorList["Arrow"](position, arrowDirection);
                });
            }
            // this is the spawner event.
            // it runs through all the child states
            // for the event to be triggered
            else if (this.sequenceCount >= 30) {
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
        return new _game_objects_ship_ship__WEBPACK_IMPORTED_MODULE_0__.Ship(this.engine, this.startPosition, this.initialCameraZPos);
    }

    createWalls() {
        return new _game_objects_Walls_walls__WEBPACK_IMPORTED_MODULE_1__.Walls(this.engine, this);
    }

    createGrid(cameraTransform) {
        return new _game_objects_particles_Grid_grid__WEBPACK_IMPORTED_MODULE_3__.Grid(this.engine, this, cameraTransform);
    }

    createOverlay() {
        return new _game_objects_Overlay_overlay__WEBPACK_IMPORTED_MODULE_2__.Overlay(this.engine, this, this.ship.transform);
    }

    isOutOfBounds(pos, radius) {
        const max = [GameScript.DIM_X - radius, GameScript.DIM_Y - radius];
        if (radius) {
            return (
                pos[0] <= radius ||
        pos[0] >= max[0] ||
        pos[1] <= radius ||
        pos[1] >= max[1]
            );
        } else {
            return (
                pos[0] < 0 ||
        pos[1] < 0 ||
        pos[0] > GameScript.DIM_X ||
        pos[1] > GameScript.DIM_Y
            );
        }
    }

    updateShipFireAngle() {
        this.ships[0].setFireAngle();
    }

    // bounce(pos){
    //   return [
    //     Util.bounce(pos[0], GameScript.DIM_X), Util.bounce(pos[1], GameScript.DIM_Y)
    //   ];
    // }

    bounce(transform, radius = 0) {
        const max = [this.DIM_X - radius, this.DIM_Y - radius];
        const pos = transform.absolutePosition();
        if (pos[0] <= radius || pos[0] >= max[0]) {
            transform.vel[0] = -transform.vel[0];
        }
        if (pos[1] <= radius || pos[1] >= max[1]) {
            transform.vel[1] = -transform.vel[1];
        }
    }

    wallGraze(transform, radius = 0) {
        const max = [this.DIM_X - radius, this.DIM_Y - radius];
        const pos = transform.absolutePosition();
        const vel = transform.absoluteVelocity();

        // X bounds, left right
        if (pos[0] <= radius && vel[0] < 0) {
            transform.vel[0] = 0.1;
        } else if (pos[0] >= max[0] && vel[0] > 0) {
            transform.vel[0] = -0.1;
        }

        // Y bounds, top bottom
        if (pos[1] <= radius && vel[1] < 0) {
            transform.vel[1] = 0.1;
        } else if (pos[1] >= max[1] && vel[1] > 0) {
            transform.vel[1] = -0.1;
        }
    }

    redirect(transform) {
        const max = [this.DIM_X, this.DIM_Y];
        const pos = transform.absolutePosition();

        if (pos[0] <= 0 || pos[0] >= max[0]) {
            if (pos[0] <= 0) {
                pos[0] = 1;
            }
            if (pos[0] >= max[0]) {
                pos[0] = max[0] - 1;
            }
        }
        if (pos[1] <= 0 || pos[1] >= max[1]) {
            if (pos[1] <= 0) {
                pos[1] = 1;
            }
            if (pos[1] >= max[1]) {
                pos[1] = max[1] - 1;
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

GameScript.Spawn1 = {
    BoxBox: 50,
};

GameScript.spawnListList = [GameScript.Spawn1];


/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameView: () => (/* binding */ GameView)
/* harmony export */ });
class GameView {
    constructor(engine, ctx, canvasEl) {
        this.ctx = ctx;
        this.engine = engine;
        // this.ship = this.game.addShip(); belongs in game script
        this.canvasEl = canvasEl;
        this.initialUnmute = true;
        this.gameStarted = false;
        this.modelClosed = false;
        this.bindKeyboardKeys = this.bindKeyboardKeys.bind(this);
        this.animate = this.animate.bind(this);
        this.gameEditorOpened = false;
    }

    bindKeyboardKeys() {
        window.addEventListener("keydown", this.doKeyEvent(true), true);
        window.addEventListener("keyup", this.doKeyEvent(false), true);
    }

    updateMovementDirection(move, down) {
        if (!this.gameEditorOpened) {
            this.engine.gameScript.ship.updateLeftControlStickInput(move, down);
        }
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
                this.initialUnmute = false;
                this.engine.gameScript.theme.play();
            }

            if (e.key === "m" && down) {
                this.engine.toggleMute();
                if (this.engine.muted) {
                    this.engine.gameScript.theme.mute();
                } else {
                    this.engine.gameScript.theme.unmute();
                }
            }

            const unitVector = GameView.MOVES[e.key];
            if (unitVector) {
                this.updateMovementDirection(e.key, down);
            }
            if (e.key === "p") {
                this.engine.updateStartButtonListeners(e.key, down);
            }
        };
    }

    bindKeyHandlers() {
        const engine = this.engine;
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

        window.addEventListener("mousemove", (e) => {
            const x = { x: e.layerX };
            const y = { y: e.layerY };
            const mousePos = [e.layerX, e.layerY];
            this.engine.updateMousePos(mousePos);
            // ship.setFireAngle(mousePos); add to game script event listener thing
        });

        window.addEventListener("click", (e) => {
            this.engine.mouseClicked([e.layerX, e.layerY]);
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

    end() {
        var endModal = document.getElementById("endModal");
    }

    start() {
        this.lastTime = 0;
        this.bindKeyHandlers();

        // Get the modal
        const modal = document.getElementById("myModal");

        // Get the button that opens the modal
        // var btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        const xclose = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        xclose.onclick = (e) => {
            e.stopPropagation();
            modal.style.display = "none";
            this.modelClosed = true;
        };

        // When the user clicks anywhere outside of the modal, close it
        //  window.addEventListener('click', (e) => {
        window.onclick = (event) => {
            if (this.modelClosed && !this.gameStarted) {
                this.gameStarted = true;
                this.bindKeyboardKeys();
                requestAnimationFrame(this.animate);
            }
            if (event.target == modal) {
                this.modelClosed = true;
                modal.style.display = "none";
            }
        };
    }

    animate(time) {
        const timeDelta = time - this.lastTime;
        this.engine.tick(timeDelta);
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
};

GameView.MOVES = {
    s: [0, 1],
    a: [-1, 0],
    w: [0, -1],
    d: [1, 0],
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/GEOWars.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_script */ "./src/game_script.js");
/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_view */ "./src/game_view.js");
/* harmony import */ var _game_engine_game_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game_engine/game_engine */ "./src/game_engine/game_engine.js");
/* harmony import */ var _game_engine_Levels_levelDesigner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game_engine/Levels/levelDesigner */ "./src/game_engine/Levels/levelDesigner.js");
/* harmony import */ var _AnimationView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AnimationView */ "./src/AnimationView.js");






document.addEventListener("DOMContentLoaded", () => {
    const canvasEl = document.getElementsByTagName("canvas")[0];
    canvasEl.width = _game_script__WEBPACK_IMPORTED_MODULE_0__.GameScript.DIM_X;
    canvasEl.height = _game_script__WEBPACK_IMPORTED_MODULE_0__.GameScript.DIM_Y;

    const ctx = canvasEl.getContext("2d");
    const gameEngine = new _game_engine_game_engine__WEBPACK_IMPORTED_MODULE_2__.GameEngine(ctx);
    const animationWindow = document.getElementsByTagName("canvas")[1];
    const animationView = new _AnimationView__WEBPACK_IMPORTED_MODULE_4__.AnimationView(animationWindow.getContext("2d"));
    new _game_engine_Levels_levelDesigner__WEBPACK_IMPORTED_MODULE_3__.LevelDesigner(gameEngine, animationView);

    animationView.start();
    new _game_view__WEBPACK_IMPORTED_MODULE_1__.GameView(gameEngine, ctx, canvasEl).start();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map