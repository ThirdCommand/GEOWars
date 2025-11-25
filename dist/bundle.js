/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AnimationView.ts":
/*!******************************!*\
  !*** ./src/AnimationView.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnimationView: () => (/* binding */ AnimationView)
/* harmony export */ });
/* harmony import */ var _game_objects_enemies_BoxBox_boxbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_objects/enemies/BoxBox/boxbox */ "./src/game_objects/enemies/BoxBox/boxbox.ts");
/* harmony import */ var _game_objects_enemies_Pinwheel_pinwheel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_objects/enemies/Pinwheel/pinwheel */ "./src/game_objects/enemies/Pinwheel/pinwheel.ts");
/* harmony import */ var _game_objects_enemies_Arrow_arrow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game_objects/enemies/Arrow/arrow */ "./src/game_objects/enemies/Arrow/arrow.ts");
/* harmony import */ var _game_objects_enemies_Grunt_grunt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game_objects/enemies/Grunt/grunt */ "./src/game_objects/enemies/Grunt/grunt.ts");
/* harmony import */ var _game_objects_enemies_Weaver_weaver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game_objects/enemies/Weaver/weaver */ "./src/game_objects/enemies/Weaver/weaver.ts");
/* harmony import */ var _game_objects_enemies_Singularity_singularity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./game_objects/enemies/Singularity/singularity */ "./src/game_objects/enemies/Singularity/singularity.ts");
/* harmony import */ var _game_objects_enemies_Singularity_alien_ship__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./game_objects/enemies/Singularity/alien_ship */ "./src/game_objects/enemies/Singularity/alien_ship.ts");
/* harmony import */ var _game_objects_Tree_Tree__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./game_objects/Tree/Tree */ "./src/game_objects/Tree/Tree.ts");
/* harmony import */ var _game_objects_enemies_RandomRandom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./game_objects/enemies/RandomRandom */ "./src/game_objects/enemies/RandomRandom.ts");
/* harmony import */ var _game_objects_ClockworkGames_Entity_Entity__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./game_objects/ClockworkGames/Entity/Entity */ "./src/game_objects/ClockworkGames/Entity/Entity.ts");
/* harmony import */ var _game_objects_ClockworkGames_Bed__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./game_objects/ClockworkGames/Bed */ "./src/game_objects/ClockworkGames/Bed.ts");
/* harmony import */ var _game_objects_ClockworkGames_Plate__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./game_objects/ClockworkGames/Plate */ "./src/game_objects/ClockworkGames/Plate.ts");
/* harmony import */ var _game_engine_transform__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./game_engine/transform */ "./src/game_engine/transform.ts");
/* harmony import */ var _game_objects_ClockworkGames_Machine__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./game_objects/ClockworkGames/Machine */ "./src/game_objects/ClockworkGames/Machine.ts");
/* harmony import */ var _game_objects_ClockworkGames_SawMachine_TreeGrip__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./game_objects/ClockworkGames/SawMachine/TreeGrip */ "./src/game_objects/ClockworkGames/SawMachine/TreeGrip.ts");
/* harmony import */ var _game_objects_StrikeTime_Enemies_Missile__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./game_objects/StrikeTime/Enemies/Missile */ "./src/game_objects/StrikeTime/Enemies/Missile.ts");
/* harmony import */ var _game_objects_StrikeTime__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./game_objects/StrikeTime */ "./src/game_objects/StrikeTime/index.ts");
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};











// import {LeftSandwich, RightSandwich} from "./game_objects/ClockworkGames/Sandwich";






var AnimationView = /** @class */ (function () {
    function AnimationView(ctx) {
        this.ctx = ctx;
        this.graphicQuality = 1;
        this.gameObjects = [];
        this.lineSprites = [];
        this.paused = false;
        this.focusPaused = false;
        this.muted = false;
        this.gameScript = {
            tallyScore: function () { },
            ship: {
                transform: new _game_engine_transform__WEBPACK_IMPORTED_MODULE_12__.Transform(),
                cameraTransform: new _game_engine_transform__WEBPACK_IMPORTED_MODULE_12__.Transform()
            },
            explosionColorWheel: 0,
            grid: {
                Explosion: function () { }
            },
            theme: {
                play: function () { }
            },
            death: function () { }
        };
        this.zoomScale = 2;
        this.ship = {
            transform: new _game_engine_transform__WEBPACK_IMPORTED_MODULE_12__.Transform()
        };
        this.lastTime = 0;
        this.animate = this.animate.bind(this);
        this.overlayText = {
            Location: [0, 0].toString(),
            Time: 0,
            Type: "",
            StartingAngle: 0,
        };
        this.overlayTextCleared = true;
        // this.addEnemy("Grunt");
    }
    AnimationView.prototype.enemyPlacerSelected = function (enemyPlacer) {
        this.clear();
        this.addEnemy(enemyPlacer.type);
        this.addOverlayText(enemyPlacer.serializedSpawn);
    };
    AnimationView.prototype.addOverlayText = function (_a) {
        var type = _a.type, location = _a.location, numberToGenerate = _a.numberToGenerate, possibleSpawns = _a.possibleSpawns, angle = _a.angle;
        possibleSpawns = possibleSpawns || [];
        this.overlayTextCleared = false;
        var locationText = typeof location === 'string' ?
            location :
            [
                Math.trunc(location[0]).toString(),
                Math.trunc(location[1]).toString()
            ].toString();
        this.overlayText = {
            Location: locationText,
            Time: 0,
            Type: type,
            StartingAngle: angle,
            RandomCount: numberToGenerate,
            RandomSelection: __spreadArray([], possibleSpawns, true).toString()
        };
    };
    AnimationView.prototype.animate = function (timeDelta) {
        if (this.paused || this.focusPaused) {
            return;
        }
        this.animateGameObjects(timeDelta);
        this.clearCanvas();
        this.renderLineSprites(this.ctx);
        this.renderOverlayText();
    };
    AnimationView.prototype.renderOverlayText = function () {
        if (this.overlayTextCleared)
            return;
        this.ctx.save();
        this.ctx.font = 18 + "px " + "Arial";
        this.ctx.fillStyle = "white";
        var typeText = "Type: " + this.overlayText.Type;
        var positionText = "Location: " + this.overlayText.Location;
        var angleText = "Starting Angle: " + Math.round(this.overlayText.StartingAngle * 360 / (2 * Math.PI));
        var randomCountText = "";
        var randomSelectionText = "";
        if (this.overlayText.RandomCount) {
            randomCountText = "Random Count: " + this.overlayText.RandomCount;
            randomSelectionText = "Random Selections: ";
        }
        this.ctx.fillText(typeText, 10, 20);
        this.ctx.fillText(positionText, 10, 38);
        this.ctx.fillText(angleText, 10, 56);
        if (randomCountText) {
            this.ctx.fillText(randomCountText, 10, 125);
            this.ctx.font = "7px Arial";
            this.ctx.fillText(randomSelectionText, 10, 143);
            for (var i = 0; i < this.overlayText.RandomSelection.length; i++) {
                this.ctx.fillText(this.overlayText.RandomSelection[i].toString(), 10, 150 + i * 7);
            }
        }
        this.ctx.restore();
    };
    AnimationView.prototype.animateGameObjects = function (delta) {
        this.gameObjects.forEach(function (object) {
            object.animate(delta);
        });
    };
    AnimationView.prototype.clearCanvas = function () {
        this.ctx.clearRect(0, 0, 200, 200);
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, 200, 200);
    };
    AnimationView.prototype.clear = function () {
        var _this = this;
        var removeList = __spreadArray([], this.gameObjects, true);
        removeList.forEach(function (gameObject) {
            _this.remove(gameObject);
        });
        this.overlayTextCleared = true;
    };
    AnimationView.prototype.renderLineSprites = function (ctx) {
        // ctx.scale = gameEngine.currentCamera.zoomScale
        this.ctx.save();
        this.ctx.scale(this.zoomScale, this.zoomScale);
        this.lineSprites.forEach(function (sprite) {
            sprite.draw(ctx);
        });
        this.ctx.restore();
        // ctx.scale(1,1)
    };
    AnimationView.prototype.focusUnPause = function () {
        this.focusPaused = false;
    };
    AnimationView.prototype.focusPause = function () {
        this.focusPaused = true;
    };
    AnimationView.prototype.addGameObject = function (gameObject) {
        this.gameObjects.push(gameObject);
    };
    AnimationView.prototype.queueSound = function () {
    };
    AnimationView.prototype.togglePause = function () {
        // console.log("pausetoggle")
        this.paused ? this.unPause() : this.pause();
    };
    AnimationView.prototype.pause = function () {
        this.paused = true;
        // this.gameScript.onPause();
    };
    AnimationView.prototype.unPause = function () {
        this.paused = false;
        // this.gameScript.onUnPause();
    };
    AnimationView.prototype.addCollider = function () { };
    AnimationView.prototype.addPhysicsComponent = function () { };
    AnimationView.prototype.addReplayablePhysicsComponent = function () { };
    AnimationView.prototype.remove = function (gameObject) {
        if (gameObject.lineSprite) {
            var lineSpriteIndex = this.lineSprites.indexOf(gameObject.lineSprite);
            if (lineSpriteIndex !== -1)
                this.lineSprites.splice(lineSpriteIndex, 1);
        }
        var index = this.gameObjects.indexOf(gameObject);
        if (index !== -1)
            this.gameObjects.splice(index, 1);
    };
    AnimationView.prototype.addLineSprite = function (lineSprite) {
        this.lineSprites.push(lineSprite);
    };
    AnimationView.prototype.addEnemy = function (type) {
        var _this = this;
        var enemyMap = {
            BoxBox: function (pos) { return new _game_objects_enemies_BoxBox_boxbox__WEBPACK_IMPORTED_MODULE_0__.BoxBox(_this, pos); },
            Pinwheel: function (pos) { return new _game_objects_enemies_Pinwheel_pinwheel__WEBPACK_IMPORTED_MODULE_1__.Pinwheel(_this, pos); },
            Arrow: function (pos, angle) { return new _game_objects_enemies_Arrow_arrow__WEBPACK_IMPORTED_MODULE_2__.Arrow(_this, pos, angle); },
            Grunt: function (pos) { return new _game_objects_enemies_Grunt_grunt__WEBPACK_IMPORTED_MODULE_3__.Grunt(_this, pos, _this.ship.transform); },
            Weaver: function (pos) { return new _game_objects_enemies_Weaver_weaver__WEBPACK_IMPORTED_MODULE_4__.Weaver(_this, pos, _this.ship.transform); },
            Singularity: function (pos) { return new _game_objects_enemies_Singularity_singularity__WEBPACK_IMPORTED_MODULE_5__.Singularity(_this, pos); },
            AlienShip: function (pos) { return new _game_objects_enemies_Singularity_alien_ship__WEBPACK_IMPORTED_MODULE_6__.AlienShip(_this, pos, [0, 0]); },
            RANDOM: function (pos) { return new _game_objects_enemies_RandomRandom__WEBPACK_IMPORTED_MODULE_8__.RandomRandom(_this, pos); },
            Tree: function (pos) { return new _game_objects_Tree_Tree__WEBPACK_IMPORTED_MODULE_7__.Tree(_this, pos, new _game_objects_ClockworkGames_Entity_Entity__WEBPACK_IMPORTED_MODULE_9__.Entity(_this, pos)); },
            Entity: function (pos) { return new _game_objects_ClockworkGames_Entity_Entity__WEBPACK_IMPORTED_MODULE_9__.Entity(_this, pos); },
            Bed: function (pos) { return new _game_objects_ClockworkGames_Bed__WEBPACK_IMPORTED_MODULE_10__.Bed(_this, pos, new _game_objects_ClockworkGames_Entity_Entity__WEBPACK_IMPORTED_MODULE_9__.Entity(_this, pos)); },
            LeftSandwich: function () {
                // new LeftSandwich(this, [100,80]);
                // new RightSandwich(this, [130,80]);
                // new LeftSandwich(this, [110,107]);
                // new RightSandwich(this, [140,107]);
                // new Plate(this, [120, 95]);
                // const entity = new Entity(this, [100, 90]);
                // new Bed(this, [100, 100], entity);
                // new Tree(this, [100,100]);
            },
            Plate: function (pos) { return new _game_objects_ClockworkGames_Plate__WEBPACK_IMPORTED_MODULE_11__.Plate(_this, pos); },
            Machine: function (pos) { return new _game_objects_ClockworkGames_Machine__WEBPACK_IMPORTED_MODULE_13__.Machinery(_this, pos); },
            Grabber: function (pos) { return new _game_objects_ClockworkGames_SawMachine_TreeGrip__WEBPACK_IMPORTED_MODULE_14__.TreeGrip(_this, pos); },
            Missile: function (pos) { return new _game_objects_StrikeTime_Enemies_Missile__WEBPACK_IMPORTED_MODULE_15__.Missile(_this, pos, [0, 0], new _game_engine_transform__WEBPACK_IMPORTED_MODULE_12__.Transform()); },
            Aurora: function (pos) { return new _game_objects_StrikeTime__WEBPACK_IMPORTED_MODULE_16__.Aurora(_this, pos, 0); },
            PatriotMissileSite: function (pos) { return new _game_objects_StrikeTime__WEBPACK_IMPORTED_MODULE_16__.PatriotMissileSite(_this, pos); },
            Building1: function (pos) { return new _game_objects_StrikeTime__WEBPACK_IMPORTED_MODULE_16__.Building1(_this, pos); },
            TargetBuilding: function (pos) { return new _game_objects_StrikeTime__WEBPACK_IMPORTED_MODULE_16__.TargetBuilding(_this, pos); },
            Airport: function (pos) { return new _game_objects_StrikeTime__WEBPACK_IMPORTED_MODULE_16__.Airport(_this, pos); },
            EndingLine: function (pos) { return new _game_objects_StrikeTime__WEBPACK_IMPORTED_MODULE_16__.EndingLine(_this, pos[0]); }
        };
        enemyMap[type]([100 / this.zoomScale, 100 / this.zoomScale]);
    };
    return AnimationView;
}());



/***/ }),

/***/ "./src/GEOWarsScript.ts":
/*!******************************!*\
  !*** ./src/GEOWarsScript.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DIM_X: () => (/* binding */ DIM_X),
/* harmony export */   DIM_Y: () => (/* binding */ DIM_Y),
/* harmony export */   GEOWarsScript: () => (/* binding */ GEOWarsScript)
/* harmony export */ });
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_engine/sound */ "./src/game_engine/sound.ts");
/* harmony import */ var _game_objects_Ship_ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_objects/Ship/ship */ "./src/game_objects/Ship/ship.ts");
/* harmony import */ var _game_objects_walls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game_objects/walls */ "./src/game_objects/walls.ts");
/* harmony import */ var _game_objects_Overlay_overlay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game_objects/Overlay/overlay */ "./src/game_objects/Overlay/overlay.ts");
/* harmony import */ var _game_objects_particles_Grid_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game_objects/particles/Grid/grid */ "./src/game_objects/particles/Grid/grid.ts");
/* harmony import */ var _game_objects_enemies_BoxBox_boxbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./game_objects/enemies/BoxBox/boxbox */ "./src/game_objects/enemies/BoxBox/boxbox.ts");
/* harmony import */ var _game_objects_enemies_Pinwheel_pinwheel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./game_objects/enemies/Pinwheel/pinwheel */ "./src/game_objects/enemies/Pinwheel/pinwheel.ts");
/* harmony import */ var _game_objects_enemies_Arrow_arrow__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./game_objects/enemies/Arrow/arrow */ "./src/game_objects/enemies/Arrow/arrow.ts");
/* harmony import */ var _game_objects_enemies_Grunt_grunt__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./game_objects/enemies/Grunt/grunt */ "./src/game_objects/enemies/Grunt/grunt.ts");
/* harmony import */ var _game_objects_enemies_Weaver_weaver__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./game_objects/enemies/Weaver/weaver */ "./src/game_objects/enemies/Weaver/weaver.ts");
/* harmony import */ var _game_objects_enemies_Singularity_singularity__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./game_objects/enemies/Singularity/singularity */ "./src/game_objects/enemies/Singularity/singularity.ts");
/* harmony import */ var _game_objects_enemies_Singularity_alien_ship__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./game_objects/enemies/Singularity/alien_ship */ "./src/game_objects/enemies/Singularity/alien_ship.ts");
/* harmony import */ var _game_objects_particles_particle_explosion__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./game_objects/particles/particle_explosion */ "./src/game_objects/particles/particle_explosion.ts");
/* harmony import */ var _game_objects_particles_singularity_explosion__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./game_objects/particles/singularity_explosion */ "./src/game_objects/particles/singularity_explosion.ts");
/* harmony import */ var _game_objects_particles_ship_explosion__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./game_objects/particles/ship_explosion */ "./src/game_objects/particles/ship_explosion.ts");
/* harmony import */ var _game_objects_particles_star__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./game_objects/particles/star */ "./src/game_objects/particles/star.ts");
/* harmony import */ var _game_engine_Levels_DesignElements_Scene__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./game_engine/Levels/DesignElements/Scene */ "./src/game_engine/Levels/DesignElements/Scene.ts");
/* harmony import */ var _game_engine_Levels_DesignElements_Event__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./game_engine/Levels/DesignElements/Event */ "./src/game_engine/Levels/DesignElements/Event.ts");
/* harmony import */ var _game_engine_Levels_DesignElements_Time__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./game_engine/Levels/DesignElements/Time */ "./src/game_engine/Levels/DesignElements/Time.ts");
/* harmony import */ var _game_engine_Levels_DesignElements_Loop__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./game_engine/Levels/DesignElements/Loop */ "./src/game_engine/Levels/DesignElements/Loop.ts");
/* harmony import */ var _game_engine_Levels_DesignElements_Operation__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./game_engine/Levels/DesignElements/Operation */ "./src/game_engine/Levels/DesignElements/Operation.ts");
/* harmony import */ var _game_objects_particles_bullet_wall_explosion__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./game_objects/particles/bullet_wall_explosion */ "./src/game_objects/particles/bullet_wall_explosion.ts");
/* harmony import */ var _game_objects_particles_singularity_hit_explosion__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./game_objects/particles/singularity_hit_explosion */ "./src/game_objects/particles/singularity_hit_explosion.ts");























// type Enemies = 'BoxBox' | 'Pinwheel' | 'Arrow' | 'Grunt' | 'Weaver' | 'Singularity' | 'AlienShip';
var DIM_X = 1000;
var DIM_Y = 600;
var GEOWarsScript = /** @class */ (function () {
    function GEOWarsScript(engine) {
        this.engine = engine;
        this.serializedGame = "";
        this.gameOverSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_0__.Sound("sounds/Game_over.wav", 1);
        this.gameStartSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_0__.Sound("sounds/Game_start.wav", 1);
        this.gameTime = 0;
        this.score = 0;
        this.arrowAdded = false;
        this.startPosition = [500, 300, 0];
        this.initialCameraZPos = -1000;
        this.loadSounds();
        this.theme = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_0__.Sound("sounds/Geometry_OST.mp3", 1);
        this.shipDeathSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_0__.Sound("sounds/Ship_explode.wav", 1);
        this.ship = this.createShip();
        this.createStars();
        this.walls = this.createWalls();
        this.grid = this.createGrid();
        this.overlay = this.createOverlay();
        this.gameObjectCreatorMap = this.createEnemyCreators();
        this.engine.addXButtonListener(this);
        this.engine.addBButtonListener(this);
        this.sequenceTypes = this.addSequenceTypes();
        this.deathPausedTime = 0;
        this.deathPaused = true;
        this.deathPauseTime = 2500;
        // this.deathSound = new Audio("sounds/Enemy_explode.wav")
        // this.deathSound.volume = 0.5;
        this.intervalTiming = 1;
        this.intervalTime = 0;
        this.hugeSequenceTime = 0;
        this.sequenceCount = 0; // START GAME HERE
        this.lives = 3;
        this.scoreMultiplier = 1;
        this.displayEndScore = 0;
        this.spawnthing = false;
        this.explosionColorWheel = 0;
        this.playFromRootScene = false;
    }
    GEOWarsScript.prototype.loadSounds = function () {
        // const types = 'BoxBox' | 'Pinwheel' | 'Arrow' | 'Grunt' | 'Weaver' | 'Singularity' | 'AlienShip';
        var soundMagazineMap = {};
        soundMagazineMap[_game_objects_enemies_Arrow_arrow__WEBPACK_IMPORTED_MODULE_7__.Arrow.SPAWN_SOUND_URL] = this.loadSoundMagazine(_game_objects_enemies_Arrow_arrow__WEBPACK_IMPORTED_MODULE_7__.Arrow.SPAWN_SOUND_URL, 0.5);
        soundMagazineMap[_game_objects_enemies_BoxBox_boxbox__WEBPACK_IMPORTED_MODULE_5__.BoxBox.SPAWN_SOUND_URL] = this.loadSoundMagazine(_game_objects_enemies_BoxBox_boxbox__WEBPACK_IMPORTED_MODULE_5__.BoxBox.SPAWN_SOUND_URL, 0.5);
        soundMagazineMap[_game_objects_enemies_Pinwheel_pinwheel__WEBPACK_IMPORTED_MODULE_6__.Pinwheel.SPAWN_SOUND_URL] = this.loadSoundMagazine(_game_objects_enemies_Pinwheel_pinwheel__WEBPACK_IMPORTED_MODULE_6__.Pinwheel.SPAWN_SOUND_URL, 0.5);
        soundMagazineMap[_game_objects_enemies_Grunt_grunt__WEBPACK_IMPORTED_MODULE_8__.Grunt.SPAWN_SOUND_URL] = this.loadSoundMagazine(_game_objects_enemies_Grunt_grunt__WEBPACK_IMPORTED_MODULE_8__.Grunt.SPAWN_SOUND_URL, 0.5);
        soundMagazineMap[_game_objects_enemies_Weaver_weaver__WEBPACK_IMPORTED_MODULE_9__.Weaver.SPAWN_SOUND_URL] = this.loadSoundMagazine(_game_objects_enemies_Weaver_weaver__WEBPACK_IMPORTED_MODULE_9__.Weaver.SPAWN_SOUND_URL, 0.5);
        soundMagazineMap[_game_objects_enemies_Singularity_singularity__WEBPACK_IMPORTED_MODULE_10__.Singularity.SPAWN_SOUND_URL] = this.loadSoundMagazine(_game_objects_enemies_Singularity_singularity__WEBPACK_IMPORTED_MODULE_10__.Singularity.SPAWN_SOUND_URL, 1);
        soundMagazineMap[_game_objects_particles_bullet_wall_explosion__WEBPACK_IMPORTED_MODULE_21__.BulletWallExplosion.BULLET_WALL_HIT_SOUND_URL] = this.loadSoundMagazine(_game_objects_particles_bullet_wall_explosion__WEBPACK_IMPORTED_MODULE_21__.BulletWallExplosion.BULLET_WALL_HIT_SOUND_URL, 0.1);
        soundMagazineMap[_game_objects_particles_particle_explosion__WEBPACK_IMPORTED_MODULE_12__.ParticleExplosion.EXPLOSION_SOUND_URL] = this.loadSoundMagazine(_game_objects_particles_particle_explosion__WEBPACK_IMPORTED_MODULE_12__.ParticleExplosion.EXPLOSION_SOUND_URL, 0.1);
        soundMagazineMap[_game_objects_particles_ship_explosion__WEBPACK_IMPORTED_MODULE_14__.ShipExplosion.EXPLOSION_SOUND_URL] = this.loadSoundMagazine(_game_objects_particles_ship_explosion__WEBPACK_IMPORTED_MODULE_14__.ShipExplosion.EXPLOSION_SOUND_URL, 0.1);
        soundMagazineMap[_game_objects_particles_singularity_explosion__WEBPACK_IMPORTED_MODULE_13__.SingularityParticleExplosion.EXPLOSION_SOUND_URL] = this.loadSoundMagazine(_game_objects_particles_singularity_explosion__WEBPACK_IMPORTED_MODULE_13__.SingularityParticleExplosion.EXPLOSION_SOUND_URL, 0.1);
        soundMagazineMap[_game_objects_particles_singularity_hit_explosion__WEBPACK_IMPORTED_MODULE_22__.SingularityHitExplosion.EXPLOSION_SOUND_URL] = this.loadSoundMagazine(_game_objects_particles_singularity_hit_explosion__WEBPACK_IMPORTED_MODULE_22__.SingularityHitExplosion.EXPLOSION_SOUND_URL, 0.01);
        soundMagazineMap[_game_objects_Ship_ship__WEBPACK_IMPORTED_MODULE_1__.Ship.BULLET_SOUND_URL] = this.loadSoundMagazine(_game_objects_Ship_ship__WEBPACK_IMPORTED_MODULE_1__.Ship.BULLET_SOUND_URL, 0.2);
        soundMagazineMap[_game_objects_Ship_ship__WEBPACK_IMPORTED_MODULE_1__.Ship.UPGRADE_BULLET_SOUND_URL] = this.loadSoundMagazine(_game_objects_Ship_ship__WEBPACK_IMPORTED_MODULE_1__.Ship.UPGRADE_BULLET_SOUND_URL, 1);
        soundMagazineMap[_game_objects_enemies_Singularity_singularity__WEBPACK_IMPORTED_MODULE_10__.Singularity.DEATH_SOUND_URL] = this.loadSoundMagazine(_game_objects_enemies_Singularity_singularity__WEBPACK_IMPORTED_MODULE_10__.Singularity.DEATH_SOUND_URL, 1);
        soundMagazineMap[_game_objects_enemies_Singularity_singularity__WEBPACK_IMPORTED_MODULE_10__.Singularity.GRAVITY_WELL_HIT_SOUND_URL] = this.loadSoundMagazine(_game_objects_enemies_Singularity_singularity__WEBPACK_IMPORTED_MODULE_10__.Singularity.GRAVITY_WELL_HIT_SOUND_URL, 0.5);
        soundMagazineMap[_game_objects_enemies_Singularity_singularity__WEBPACK_IMPORTED_MODULE_10__.Singularity.OPEN_GATE_SOUND_URL] = this.loadSoundMagazine(_game_objects_enemies_Singularity_singularity__WEBPACK_IMPORTED_MODULE_10__.Singularity.OPEN_GATE_SOUND_URL, 1);
        this.engine.loadSounds(soundMagazineMap);
    };
    GEOWarsScript.prototype.loadSoundMagazine = function (url, volume) {
        var sounds = [];
        for (var i = 0; i < 50; i++) {
            sounds.push(new _game_engine_sound__WEBPACK_IMPORTED_MODULE_0__.Sound(url, volume));
        }
        return sounds;
    };
    GEOWarsScript.prototype.nextElement = function () {
        this.rootScene.currentElementIndex = 0;
    };
    GEOWarsScript.prototype.startGame = function (serializedGame) {
        this.serializedGame = serializedGame;
        var game = JSON.parse(serializedGame);
        if (game.serializedGameElements.length > 0) {
            this.rootScene = new _game_engine_Levels_DesignElements_Scene__WEBPACK_IMPORTED_MODULE_16__.Scene('root');
            this.rootScene.gameElements = this.loadGameElements(game.serializedGameElements, this.rootScene);
            this.playFromRootScene = true;
        }
        this.intervalTime = 0;
        this.ship.transform.pos = [this.startPosition[0], this.startPosition[1], this.startPosition[2]];
    };
    GEOWarsScript.prototype.loadGameElements = function (serializedGameElements, parentScene) {
        var _this = this;
        return serializedGameElements.map(function (element) {
            if (element.type === "Scene") {
                var newScene = new _game_engine_Levels_DesignElements_Scene__WEBPACK_IMPORTED_MODULE_16__.Scene(element.name, parentScene);
                newScene.gameElements = _this.loadGameElements(element.serializedGameElements, newScene) || [];
                return newScene;
            }
            else if (element.type === "Event") {
                return new _game_engine_Levels_DesignElements_Event__WEBPACK_IMPORTED_MODULE_17__.Event(element.spawns, parentScene, element.isShipRelative, _this.engine);
            }
            else if (element.type === "Time") {
                return new _game_engine_Levels_DesignElements_Time__WEBPACK_IMPORTED_MODULE_18__.Time(parentScene, element.waitTime);
            }
            else if (element.type === "LoopBeginning") {
                return new _game_engine_Levels_DesignElements_Loop__WEBPACK_IMPORTED_MODULE_19__.LoopBeginning(parentScene);
            }
            else if (element.type === "LoopEnd") {
                return new _game_engine_Levels_DesignElements_Loop__WEBPACK_IMPORTED_MODULE_19__.LoopEnd({ loopIdx: element.loopIdx || 0, repeatTimes: element.repeatTimes }, parentScene);
            }
            else if (element.type === "Operation") {
                return new _game_engine_Levels_DesignElements_Operation__WEBPACK_IMPORTED_MODULE_20__.Operation(element.operand, parentScene, _this.engine, _this);
            }
        });
    };
    GEOWarsScript.prototype.createStars = function () {
        var runoffFactor = 1.5;
        for (var i = 0; i < 900; i++) {
            var X = (runoffFactor * Math.random() - runoffFactor / 2) * DIM_X; // based on zoom scale and eventually camera position
            var Y = (runoffFactor * Math.random() - runoffFactor / 2) * DIM_Y;
            // const Z = -this.initialCameraZPos * 0.25 + -this.initialCameraZPos * 2 * Math.random();
            var Z = -this.initialCameraZPos * (0.5 + 2 * Math.random());
            new _game_objects_particles_star__WEBPACK_IMPORTED_MODULE_15__.Star(this.engine, [X, Y, Z]);
        }
    };
    GEOWarsScript.prototype.updateXButtonListener = function (pressed) {
        // if (pressed) {
        //     if (this.engine.paused) {
        //         const modal = document.getElementById("endModal");
        //         modal.style.display = "none";
        //         this.engine.paused = false;
        //         if (!this.engine.muted) {
        //             this.theme.play();
        //         }
        //     }
        // }
    };
    GEOWarsScript.prototype.updateBButtonListener = function (pressed) {
        // if (pressed) {
        //     if (this.engine.paused) {
        //         const modal = document.getElementById("endModal");
        //         modal.style.display = "none";
        //         this.engine.paused = false;
        //         if (!this.engine.muted) {
        //             this.theme.play();
        //         }
        //     }
        // }
    };
    GEOWarsScript.prototype.update = function (deltaTime) {
        if (this.deathPaused) {
            this.deathPausedTime += deltaTime;
            if (this.deathPausedTime > this.deathPauseTime) {
                this.deathPausedTime = 0;
                this.deathPaused = false;
            }
            else {
                deltaTime = 0;
            }
        }
        if (this.playFromRootScene) {
            this.rootScene.update(deltaTime);
        }
        else {
            this.gameTime += deltaTime;
            this.spawnSequence(deltaTime);
        }
        this.changeExplosionColor();
    };
    GEOWarsScript.prototype.changeExplosionColor = function () {
        this.explosionColorWheel += 1 / 2;
        this.explosionColorWheel = this.explosionColorWheel % 360;
    };
    GEOWarsScript.prototype.tallyScore = function (gameObject) {
        this.score += gameObject.points * this.scoreMultiplier;
        // if (this.score) {
        // }
    };
    GEOWarsScript.prototype.resetGame = function () {
        var _this = this;
        this.deathPaused = true;
        this.displayEndScore = this.score;
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
        scoreDisplay.innerHTML = "score: ".concat(this.displayEndScore);
        // Get the button that opens the modal
        // var btn = document.getElementById("myBtn");
        // Get the <span> element that closes the modal
        var xclose = document.getElementsByClassName("endClose")[0];
        // When the user clicks on <span> (x), close the modal
        xclose.onclick = function (e) {
            e.stopPropagation();
            modal.style.display = "none";
            _this.engine.paused = false;
            window.removeEventListener("click", closeModalWithClick, false);
            if (!_this.engine.muted) {
                _this.theme.play();
                _this.gameStartSound.play();
            }
        };
        var closeModalWithClick = function (e) {
            if (e.target == modal) {
                _this.engine.paused = false;
                if (!_this.engine.muted) {
                    _this.theme.play();
                    _this.gameStartSound.play();
                }
                modal.style.display = "none";
                window.removeEventListener("click", closeModalWithClick, false);
            }
        };
        // When the user clicks anywhere outside of the modal, close it
        window.addEventListener("click", closeModalWithClick, false);
    };
    GEOWarsScript.prototype.death = function () {
        this.lives -= 1;
        this.deathPaused = true;
        this.explodeEverything();
        this.deathPauseTime = 4000;
        if (!this.engine.muted) {
            this.shipDeathSound.play();
        }
        this.grid.Playerdies(this.ship.transform.pos);
        if (this.lives === 0) {
            try {
                this.theme.pause();
            }
            catch (err) {
                console.log('theme failed to play');
            }
            if (!this.engine.muted) {
                this.gameOverSound.play();
            }
            // this.playSound(this.gameOverSound)
            window.setTimeout(this.resetGame.bind(this), 2000);
        }
    };
    GEOWarsScript.prototype.gameOver = function () {
        // end the game here
    };
    GEOWarsScript.prototype.explodeEverything = function () {
        var _this = this;
        var removeList = [];
        var typesToRemove = [
            "Grunt",
            "Pinwheel",
            "BoxBox",
            "Arrow",
            "Singularity",
            "Weaver",
            "AlienShip",
        ];
        this.engine.gameObjects.forEach(function (object) {
            if (object.constructor.name === "Ship") {
                var objectTransform = object.transform;
                var pos = objectTransform.absolutePosition();
                new _game_objects_particles_ship_explosion__WEBPACK_IMPORTED_MODULE_14__.ShipExplosion(_this.engine, pos);
            }
            else if (object.constructor.name === "Bullet") {
                removeList.push(object);
            }
            else if (typesToRemove.includes(object.constructor.name)) {
                var objectTransform = object.transform;
                var pos = objectTransform.absolutePosition();
                new _game_objects_particles_particle_explosion__WEBPACK_IMPORTED_MODULE_12__.ParticleExplosion(_this.engine, pos);
                removeList.push(object);
            }
        });
        removeList.forEach(function (removeThis) {
            removeThis.remove();
        });
    };
    // levelDesigner() {
    //     const modal = document.getElementById("levelDesignerModal");
    // }
    GEOWarsScript.prototype.onPause = function () {
        try {
            this.theme.pause();
        }
        catch (error) {
            console.log('failed to pause theme music');
        }
        var modal = document.getElementById("pauseModal");
        modal.style.display = "block";
    };
    GEOWarsScript.prototype.onUnPause = function () {
        try {
            this.theme.unPause();
        }
        catch (error) {
            console.log('failed to unpause theme music');
        }
        var modal = document.getElementById("pauseModal");
        modal.style.display = "none";
    };
    GEOWarsScript.prototype.randomArrowDirection = function () {
        var angles = [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2];
        return angles[Math.floor(Math.random() * angles.length) % angles.length];
    };
    GEOWarsScript.prototype.createEnemyCreators = function () {
        var _this = this;
        var engine = this.engine;
        var gameObjectCreatorMap = new Map();
        gameObjectCreatorMap.set('BoxBox', function (pos) { return new _game_objects_enemies_BoxBox_boxbox__WEBPACK_IMPORTED_MODULE_5__.BoxBox(engine, pos); });
        gameObjectCreatorMap.set('BoxBox', function (pos) { return new _game_objects_enemies_BoxBox_boxbox__WEBPACK_IMPORTED_MODULE_5__.BoxBox(engine, pos); });
        gameObjectCreatorMap.set('Pinwheel', function (pos) { return new _game_objects_enemies_Pinwheel_pinwheel__WEBPACK_IMPORTED_MODULE_6__.Pinwheel(engine, pos); });
        gameObjectCreatorMap.set('Arrow', function (pos, angle) { return new _game_objects_enemies_Arrow_arrow__WEBPACK_IMPORTED_MODULE_7__.Arrow(engine, pos, angle); });
        gameObjectCreatorMap.set('Grunt', function (pos) { return new _game_objects_enemies_Grunt_grunt__WEBPACK_IMPORTED_MODULE_8__.Grunt(engine, pos, _this.ship.transform); });
        gameObjectCreatorMap.set('Weaver', function (pos) { return new _game_objects_enemies_Weaver_weaver__WEBPACK_IMPORTED_MODULE_9__.Weaver(engine, pos, _this.ship.transform); });
        gameObjectCreatorMap.set('Singularity', function (pos) { return new _game_objects_enemies_Singularity_singularity__WEBPACK_IMPORTED_MODULE_10__.Singularity(engine, pos); });
        gameObjectCreatorMap.set('AlienShip', function (pos) { return new _game_objects_enemies_Singularity_alien_ship__WEBPACK_IMPORTED_MODULE_11__.AlienShip(engine, pos, [0, 0]); });
        return gameObjectCreatorMap;
    };
    GEOWarsScript.prototype.randomSpawnEnemy = function () {
        var pos = this.randomPosition();
        var enemyCreators = Array.from(this.gameObjectCreatorMap.values());
        enemyCreators[Math.floor(Math.random() * enemyCreators.length) % enemyCreators.length](pos);
    };
    GEOWarsScript.prototype.addSequenceTypes = function () {
        var _this = this;
        return {
            BoxBoxesEverywhere: function () {
                var randomPositions = [];
                for (var i = 0; i < 50; i++) {
                    var pos = _this.randomPosition(10);
                    randomPositions.push(pos);
                }
                randomPositions.forEach(function (pos) {
                    _this.gameObjectCreatorMap.get("BoxBox")(pos);
                });
            },
            Singularity: function () {
                _this.gameObjectCreatorMap.get("Singularity")([700, 300]);
            },
            EasyGroups: function () {
                var randomPositions = [];
                for (var i = 0; i < 5; i++) {
                    var pos = _this.randomPosition();
                    randomPositions.push(pos);
                }
                randomPositions.forEach(function (pos) {
                    var possibleSpawns = ["BoxBox", "Pinwheel"]; //, "Singularity"]
                    _this.gameObjectCreatorMap.get(possibleSpawns[Math.floor(Math.random() * possibleSpawns.length) % possibleSpawns.length])(pos);
                });
            },
            EasyGroupsArrows: function () {
                var randomPositions = [];
                for (var i = 0; i < 5; i++) {
                    var pos = _this.randomPosition();
                    randomPositions.push(pos);
                }
                randomPositions.forEach(function (pos) {
                    var possibleSpawns = ["BoxBox", "Pinwheel", "Arrow", "Singularity"];
                    _this.gameObjectCreatorMap.get(possibleSpawns[Math.floor(Math.random() * possibleSpawns.length) % possibleSpawns.length])(pos);
                });
            },
            ArrowsAttack: function () {
                var somePositions = [
                    [200, 300],
                    [1000, 300],
                    [600, 100],
                ];
                var pos = somePositions[Math.floor(Math.random() * somePositions.length) %
                    somePositions.length];
                for (var i = 0; i < 5; i++) {
                    pos[1] += i * 80;
                    _this.gameObjectCreatorMap.get("Arrow")(pos);
                }
            },
            GruntGroups: function () {
                var randomPos = _this.randomPosition(50);
                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < 3; j++) {
                        _this.gameObjectCreatorMap.get("Grunt")([
                            i * 40 + randomPos[0],
                            j * 40 + randomPos[1],
                        ]);
                    }
                }
            },
            GreenGroups: function () {
                var randomPos = _this.randomPosition(50);
                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < 3; j++) {
                        _this.gameObjectCreatorMap.get("Weaver")([
                            i * 40 + randomPos[0],
                            j * 40 + randomPos[1] - 50,
                        ]);
                    }
                }
            },
        };
    };
    // createSpawnStateMachine() {
    // let events = this.sequenceTypes
    // let stateIndex = {i: 0}
    // // these are the events
    // // times will be hard coded for each state in the queue
    // let spawnQueue = []
    // let singularityState = new StateMachine(this.engine, {stateIndex, event: events.Singularity})
    // let easyGroupsState = new StateMachine(this.engine, undefined)
    // }
    GEOWarsScript.prototype.randomPosition = function (radius) {
        if (!radius) {
            radius = 40;
        }
        return [
            (DIM_X - radius * 4) * Math.random() + radius * 4,
            (DIM_Y - radius * 4) * Math.random() + radius * 4,
            // 1000,600
        ];
    };
    GEOWarsScript.prototype.spawnSequence = function (delta) {
        var _this = this;
        this.intervalTime += delta;
        if (this.sequenceCount === 1) {
            this.gameObjectCreatorMap.get("Singularity")([700, 300]);
            this.sequenceCount += 1;
        }
        // wait time              //parentIndex   // repeat count
        if (this.intervalTime > 2500 * this.intervalTiming &&
            this.sequenceCount < 5) {
            this.intervalTime = 0;
            this.sequenceTypes["EasyGroups"](); // event
            // this.randomSpawnEnemy();
            this.sequenceCount += 1;
        }
        else if (this.sequenceCount === 5 && this.intervalTime > 5000) {
            this.sequenceCount += 1;
        }
        else if (this.intervalTime > 2500 * this.intervalTiming &&
            this.sequenceCount > 5 &&
            this.sequenceCount < 10) {
            this.sequenceCount += 1;
            this.intervalTime = 0;
            this.sequenceTypes["EasyGroupsArrows"]();
        }
        else if (this.sequenceCount === 10 && this.intervalTime > 5000) {
            this.sequenceCount += 1;
        }
        else if (this.intervalTime > 1500 * this.intervalTiming &&
            this.sequenceCount > 10 &&
            this.sequenceCount < 15) {
            this.sequenceCount += 1;
            this.intervalTime = 0;
            this.sequenceTypes["GruntGroups"]();
        }
        else if (this.sequenceCount === 15 && this.intervalTime > 2000) {
            this.sequenceCount += 1;
        }
        else if (this.intervalTime > 2000 * this.intervalTiming &&
            this.sequenceCount > 15 &&
            this.sequenceCount < 20) {
            this.sequenceCount += 1;
            this.intervalTime = 0;
            this.sequenceTypes["GreenGroups"]();
        }
        else if (this.sequenceCount === 20 && this.intervalTime > 3000) {
            this.sequenceCount += 1;
        }
        // else if (this.intervalTime > (2500 * this.intervalTiming) && this.sequenceCount === 10 && this.hugeSequenceTime % 2 === 1) {
        //   this.intervalTime = 0
        //   this.sequenceCount += 1
        //   let enemies_to_spawn = []
        //   let randomPos = this.randomPosition();
        //   for (let i = 0; i < 2; i++) {
        //     for (let j = 0; j < 2; j++) {
        //       this.gameObjectCreatorMap["Weaver"]([i * 40 + randomPos[0], j * 40 + randomPos[1]])
        //     }
        //   }
        // } else if (this.intervalTime > (5000 * this.intervalTiming) && this.sequenceCount === 11) {
        //   this.intervalTime = 0;
        //   this.sequenceCount += 1;
        //}
        else if (this.intervalTime > 375 &&
            this.sequenceCount > 20 &&
            this.sequenceCount < 30 &&
            this.hugeSequenceTime % 2 === 0) {
            this.ship.upgradeBullets();
            this.intervalTime = 0;
            this.sequenceCount += 1;
            var fourCorners = [
                [40, 40],
                [DIM_X - 40, 40],
                [40, DIM_Y - 40],
                [DIM_X - 40, DIM_Y - 40],
            ];
            fourCorners.forEach(function (corner) {
                _this.gameObjectCreatorMap.get("Grunt")(corner);
            });
        }
        else if (this.intervalTime > 375 &&
            this.sequenceCount > 20 &&
            this.sequenceCount < 30 &&
            this.hugeSequenceTime % 2 === 1) {
            this.intervalTime = 0;
            this.sequenceCount += 10;
            var arrowWallPositions = [];
            var arrowDirection_1 = (Math.PI * 3) / 2 + Math.PI;
            for (var i = 40; i < DIM_X; i += 40) {
                arrowWallPositions.push([i, 50]);
            }
            arrowWallPositions.forEach(function (position) {
                _this.gameObjectCreatorMap.get("Arrow")(position, arrowDirection_1);
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
        // if (this.gameTime % 2000 === 0){
        //   this.spawned = false
        // }
    };
    GEOWarsScript.prototype.createShip = function () {
        return new _game_objects_Ship_ship__WEBPACK_IMPORTED_MODULE_1__.Ship(this.engine, this.startPosition);
    };
    GEOWarsScript.prototype.createWalls = function () {
        return new _game_objects_walls__WEBPACK_IMPORTED_MODULE_2__.Walls(this.engine);
    };
    GEOWarsScript.prototype.createGrid = function () {
        return new _game_objects_particles_Grid_grid__WEBPACK_IMPORTED_MODULE_4__.Grid(this.engine);
    };
    GEOWarsScript.prototype.createOverlay = function () {
        return new _game_objects_Overlay_overlay__WEBPACK_IMPORTED_MODULE_3__.Overlay(this.engine, this);
    };
    GEOWarsScript.isOutOfBounds = function (pos, radius) {
        var max = [DIM_X - radius, DIM_Y - radius];
        if (radius) {
            return (pos[0] <= radius ||
                pos[0] >= max[0] ||
                pos[1] <= radius ||
                pos[1] >= max[1]);
        }
        else {
            return (pos[0] < 0 ||
                pos[1] < 0 ||
                pos[0] > DIM_X ||
                pos[1] > DIM_Y);
        }
    };
    // bounce(pos){
    //   return [
    //     Util.bounce(pos[0], DIM_X), Util.bounce(pos[1], DIM_Y)
    //   ];
    // }
    GEOWarsScript.bounce = function (transform, radius) {
        if (radius === void 0) { radius = 0; }
        var max = [DIM_X - radius, DIM_Y - radius];
        var pos = transform.absolutePosition();
        if (pos[0] <= radius || pos[0] >= max[0]) {
            transform.vel[0] = -transform.vel[0];
        }
        if (pos[1] <= radius || pos[1] >= max[1]) {
            transform.vel[1] = -transform.vel[1];
        }
    };
    GEOWarsScript.wallGraze = function (transform, radius) {
        if (radius === void 0) { radius = 0; }
        var max = [DIM_X - radius, DIM_Y - radius];
        var pos = transform.absolutePosition();
        var vel = transform.absoluteVelocity();
        // X bounds, left right
        if (pos[0] <= radius && vel[0] < 0) {
            transform.vel[0] = 0.1;
        }
        else if (pos[0] >= max[0] && vel[0] > 0) {
            transform.vel[0] = -0.1;
        }
        // Y bounds, top bottom
        if (pos[1] <= radius && vel[1] < 0) {
            transform.vel[1] = 0.1;
        }
        else if (pos[1] >= max[1] && vel[1] > 0) {
            transform.vel[1] = -0.1;
        }
    };
    GEOWarsScript.redirect = function (transform) {
        var max = [DIM_X, DIM_Y];
        var pos = transform.absolutePosition();
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
    };
    GEOWarsScript.BG_COLOR = '#000000';
    return GEOWarsScript;
}());

// GameScript.BG_COLOR = "#000000";
// DIM_X = 1000;
// DIM_Y = 600;
// GameScript.FPS = 32;
// GameScript.NUM_BOXES = 10;
// GameScript.NUM_PINWHEELS = 0;
// GameScript.NUM_ARROWS = 0;
// GameScript.NUM_GRUNTS = 0;
// GameScript.NUM_WEAVERS = 0;
// GameScript.NUM_SINGULARITIES = 1;
// GameScript.Spawn1 = {
//     BoxBox: 50,
// };
// GameScript.spawnListList = [GameScript.Spawn1];
// 2D 
// const performance2D = {
//     collisionTime: 0.12846034227596656,
//     frameRate: 117.86903385504282,
//     physicsCalcTime: 0.2529761062793578,
//     renderTime: 0.9149865687913138,
//     scriptTime: 0.00835571889659564,
//     updateTime: 0.1869786510739892,
// };
// 3D
// const performance3D = {
//     collisionTime: 0.0705062137856271,
//     frameRate: 54.9810552849427,
//     physicsCalcTime: 0.16501970291499046,
//     renderTime: 1.1280691114636254,
//     scriptTime: 0.008426796002401008,
//     updateTime: 0.177841770708579,
// };


/***/ }),

/***/ "./src/SpriteEditorScript.ts":
/*!***********************************!*\
  !*** ./src/SpriteEditorScript.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DIM_X: () => (/* binding */ DIM_X),
/* harmony export */   DIM_Y: () => (/* binding */ DIM_Y),
/* harmony export */   SpriteEditorScript: () => (/* binding */ SpriteEditorScript)
/* harmony export */ });
/* harmony import */ var _game_engine_transform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_engine/transform */ "./src/game_engine/transform.ts");
/* harmony import */ var _game_engine_SpriteEditor_DrawingGridSprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_engine/SpriteEditor/DrawingGridSprite */ "./src/game_engine/SpriteEditor/DrawingGridSprite.ts");
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game_engine/sound */ "./src/game_engine/sound.ts");



var DIM_X = 1000;
var DIM_Y = 600;
var SpriteEditorScript = /** @class */ (function () {
    function SpriteEditorScript(engine) {
        this.gameTime = 0;
        this.engine = engine;
        this.spriteCreatorOpened = true;
        this.theme = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_2__.Sound("sounds/Geometry_OST.mp3", 0.1);
        engine.gameObjects = [];
        engine.lineSprites = [];
        engine.activeCamera.zoomScale = 1;
        engine.activeCamera.transform.pos = [DIM_X / 2, DIM_Y / 2, engine.activeCamera.transform.pos[2]];
        engine.addLineSprite(new _game_engine_SpriteEditor_DrawingGridSprite__WEBPACK_IMPORTED_MODULE_1__.DrawingGridSprite(new _game_engine_transform__WEBPACK_IMPORTED_MODULE_0__.Transform()));
    }
    SpriteEditorScript.prototype.update = function (deltaTime) {
    };
    SpriteEditorScript.prototype.onPause = function () {
        var modal = document.getElementById("pauseModal");
        modal.style.display = "block";
    };
    SpriteEditorScript.prototype.onUnPause = function () {
        var modal = document.getElementById("pauseModal");
        modal.style.display = "none";
    };
    SpriteEditorScript.BG_COLOR = '#000000';
    return SpriteEditorScript;
}());



/***/ }),

/***/ "./src/StrikeTimeScript.ts":
/*!*********************************!*\
  !*** ./src/StrikeTimeScript.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DIM_X: () => (/* binding */ DIM_X),
/* harmony export */   DIM_Y: () => (/* binding */ DIM_Y),
/* harmony export */   StrikeTimeScript: () => (/* binding */ StrikeTimeScript)
/* harmony export */ });
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_engine/sound */ "./src/game_engine/sound.ts");
/* harmony import */ var _game_objects_particles_StrikeTimeParticleExplosion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_objects/particles/StrikeTimeParticleExplosion */ "./src/game_objects/particles/StrikeTimeParticleExplosion.ts");
/* harmony import */ var _game_engine_Levels_DesignElements_Scene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game_engine/Levels/DesignElements/Scene */ "./src/game_engine/Levels/DesignElements/Scene.ts");
/* harmony import */ var _game_engine_Levels_DesignElements_Event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game_engine/Levels/DesignElements/Event */ "./src/game_engine/Levels/DesignElements/Event.ts");
/* harmony import */ var _game_engine_Levels_DesignElements_Time__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game_engine/Levels/DesignElements/Time */ "./src/game_engine/Levels/DesignElements/Time.ts");
/* harmony import */ var _game_engine_Levels_DesignElements_Loop__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./game_engine/Levels/DesignElements/Loop */ "./src/game_engine/Levels/DesignElements/Loop.ts");
/* harmony import */ var _game_engine_Levels_DesignElements_Operation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./game_engine/Levels/DesignElements/Operation */ "./src/game_engine/Levels/DesignElements/Operation.ts");
/* harmony import */ var _game_objects_StrikeTime_Aurora_Aurora__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./game_objects/StrikeTime/Aurora/Aurora */ "./src/game_objects/StrikeTime/Aurora/Aurora.ts");
/* harmony import */ var _game_objects_StrikeTime_Enemies_PatriotMissileSite__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./game_objects/StrikeTime/Enemies/PatriotMissileSite */ "./src/game_objects/StrikeTime/Enemies/PatriotMissileSite.ts");
/* harmony import */ var _game_objects_StrikeTime_Buildings_Building1__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./game_objects/StrikeTime/Buildings/Building1 */ "./src/game_objects/StrikeTime/Buildings/Building1.ts");
/* harmony import */ var _game_objects_StrikeTime_Airport_Airport__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./game_objects/StrikeTime/Airport/Airport */ "./src/game_objects/StrikeTime/Airport/Airport.ts");
/* harmony import */ var _game_objects_StrikeTime_Buildings_TargetBuilding__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./game_objects/StrikeTime/Buildings/TargetBuilding */ "./src/game_objects/StrikeTime/Buildings/TargetBuilding.ts");
/* harmony import */ var _game_objects_StrikeTime_Levels_LevelPrototype__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./game_objects/StrikeTime/Levels/LevelPrototype */ "./src/game_objects/StrikeTime/Levels/LevelPrototype.ts");
/* harmony import */ var _game_objects_StrikeTime_Levels_LoadedLevel__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./game_objects/StrikeTime/Levels/LoadedLevel */ "./src/game_objects/StrikeTime/Levels/LoadedLevel.ts");














// type Enemies = 'BoxBox' | 'Pinwheel' | 'Arrow' | 'Grunt' | 'Weaver' | 'Singularity' | 'AlienShip';
var DIM_X = 1000;
var DIM_Y = 600;
var StrikeTimeScript = /** @class */ (function () {
    function StrikeTimeScript(engine) {
        this.serializedGame = "";
        this.gameTime = 0;
        this.engine = engine;
        this.startPosition = [500, 300, 0];
        this.initialCameraZPos = -1000;
        this.score = 0;
        this.theme = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_0__.Sound("", 1);
        this.gameObjectCreatorMap = this.createEnemyCreators();
        this.explosionColorWheel = 0;
        // not sure if this is a loaded level or a hardcoded one
        this.playFromRootScene = false;
    }
    StrikeTimeScript.prototype.nextElement = function () {
        // add loops if you want it to repeat, but it seems kind of silly for this game
        // this.rootScene.currentElementIndex = 0;
    };
    StrikeTimeScript.prototype.loadSounds = function () {
        // const types = 'BoxBox' | 'Pinwheel' | 'Arrow' | 'Grunt' | 'Weaver' | 'Singularity' | 'AlienShip';
        var particleExplosionSoundMagazine = this.loadSoundMagazine(_game_objects_particles_StrikeTimeParticleExplosion__WEBPACK_IMPORTED_MODULE_1__.ParticleExplosion.EXPLOSION_SOUND_URL, 0.2);
    };
    StrikeTimeScript.prototype.loadSoundMagazine = function (url, volume) {
        var sounds = [];
        for (var i = 0; i < 10; i++) {
            sounds.push(new _game_engine_sound__WEBPACK_IMPORTED_MODULE_0__.Sound(url, volume));
        }
        return sounds;
    };
    StrikeTimeScript.prototype.loadLevelContents = function (serializedGame) {
        var game = JSON.parse(serializedGame);
        this.rootScene = new _game_engine_Levels_DesignElements_Scene__WEBPACK_IMPORTED_MODULE_2__.Scene('root');
        this.rootScene.gameElements = this.loadGameElements(game.serializedGameElements, this.rootScene);
        this.playFromRootScene = true;
    };
    StrikeTimeScript.prototype.startGame = function (serializedGame) {
        // this decides if we're loading a level or playing the hard coded one
        this.serializedGame = serializedGame;
        this.currentLevel = this.serializedGame ? new _game_objects_StrikeTime_Levels_LoadedLevel__WEBPACK_IMPORTED_MODULE_13__.LoadedLevel(this.engine, this, this.serializedGame) : new _game_objects_StrikeTime_Levels_LevelPrototype__WEBPACK_IMPORTED_MODULE_12__.LevelPrototype(this.engine, this);
        this.currentLevel.createLevel();
    };
    StrikeTimeScript.prototype.loadGameElements = function (serializedGameElements, parentScene) {
        var _this = this;
        return serializedGameElements.map(function (element) {
            if (element.type === "Scene") {
                var newScene = new _game_engine_Levels_DesignElements_Scene__WEBPACK_IMPORTED_MODULE_2__.Scene(element.name, parentScene);
                newScene.gameElements = _this.loadGameElements(element.serializedGameElements, newScene) || [];
                return newScene;
            }
            else if (element.type === "Event") {
                return new _game_engine_Levels_DesignElements_Event__WEBPACK_IMPORTED_MODULE_3__.Event(element.spawns, parentScene, element.isShipRelative, _this.engine);
            }
            else if (element.type === "Time") {
                return new _game_engine_Levels_DesignElements_Time__WEBPACK_IMPORTED_MODULE_4__.Time(parentScene, element.waitTime);
            }
            else if (element.type === "LoopBeginning") {
                return new _game_engine_Levels_DesignElements_Loop__WEBPACK_IMPORTED_MODULE_5__.LoopBeginning(parentScene);
            }
            else if (element.type === "LoopEnd") {
                return new _game_engine_Levels_DesignElements_Loop__WEBPACK_IMPORTED_MODULE_5__.LoopEnd({ loopIdx: element.loopIdx || 0, repeatTimes: element.repeatTimes }, parentScene);
            }
            else if (element.type === "Operation") {
                // TODO some of these are GEOWars specific but don't have to be
                // or maybe it should since operation could do things specific to the game
                return new _game_engine_Levels_DesignElements_Operation__WEBPACK_IMPORTED_MODULE_6__.Operation(element.operand, parentScene, _this.engine, _this);
            }
        });
    };
    // TODO: I'll need a pause screen
    // updateXButtonListener(pressed: boolean) {
    //     // if (pressed) {
    //     //     if (this.engine.paused) {
    //     //         const modal = document.getElementById("endModal");
    //     //         modal.style.display = "none";
    //     //         this.engine.paused = false;
    //     //         if (!this.engine.muted) {
    //     //             this.theme.play();
    //     //         }
    //     //     }
    //     // }
    // }
    // updateBButtonListener(pressed: boolean) {
    //     // if (pressed) {
    //     //     if (this.engine.paused) {
    //     //         const modal = document.getElementById("endModal");
    //     //         modal.style.display = "none";
    //     //         this.engine.paused = false;
    //     //         if (!this.engine.muted) {
    //     //             this.theme.play();
    //     //         }
    //     //     }
    //     // }
    // }
    StrikeTimeScript.prototype.update = function (deltaTime) {
        var _a;
        // TODO: I think this will still be useful in the future
        // but I don't have my head wrapped around it yet
        this.gameTime += deltaTime;
        if (this.playFromRootScene) {
            this.rootScene.update(deltaTime);
        }
        if (this.currentLevel) {
            this.currentLevel.update(deltaTime);
        }
        this.changeExplosionColor();
        if ((_a = this.currentLevel) === null || _a === void 0 ? void 0 : _a.runWinCondition()) {
            this.winGame();
        }
    };
    StrikeTimeScript.prototype.changeExplosionColor = function () {
        this.explosionColorWheel += 1 / 2;
        this.explosionColorWheel = this.explosionColorWheel % 360;
    };
    StrikeTimeScript.prototype.tallyScore = function (gameObject) {
        // might not be generic enough to keep here
        this.score += gameObject.points;
        // if (this.score) {
        // }
    };
    StrikeTimeScript.prototype.startLevelAgain = function () {
        this.currentLevel.createLevel();
    };
    StrikeTimeScript.prototype.loseLevel = function () {
        var _this = this;
        // should mostly be defined by the level
        var modal = document.getElementById("endOfStrikeTimeModalLost");
        this.currentLevel.loseLevel();
        setTimeout(function () { return _this.explodeEverything(); }, 1000);
        setTimeout(function () { return (modal.style.display = "block"); }, 1800);
        // Get the button that opens the modal
        // var btn = document.getElementById("myBtn");
        // Get the <span> element that closes the modal
        var xclose = document.getElementsByClassName("endClose")[0];
        // When the user clicks on <span> (x), close the modal
        xclose.onclick = function (e) {
            var _a;
            e.stopPropagation();
            modal.style.display = "none";
            _this.engine.paused = false;
            window.removeEventListener("click", closeModalWithClick, false);
            if (!_this.engine.muted) {
                (_a = _this.theme) === null || _a === void 0 ? void 0 : _a.play();
            }
            _this.startLevelAgain();
        };
        var closeModalWithClick = function (e) {
            var _a;
            if (e.target == modal) {
                _this.engine.paused = false;
                if (!_this.engine.muted) {
                    (_a = _this.theme) === null || _a === void 0 ? void 0 : _a.play();
                }
                modal.style.display = "none";
                window.removeEventListener("click", closeModalWithClick, false);
                _this.startLevelAgain();
            }
        };
        // When the user clicks anywhere outside of the modal, close it
        window.addEventListener("click", closeModalWithClick, false);
    };
    StrikeTimeScript.prototype.explodeEverything = function () {
        var _this = this;
        // should be defined by the level
        var removeList = [];
        var typesToRemove = [
            "Aurora",
            "Airport",
            "EndingLine",
            "Building1",
            "TargetBuilding",
            "PatriotMissileSite",
            "AuroraDeathAnimationObject",
            "Missile"
        ];
        this.engine.gameObjects.forEach(function (object) {
            if (typesToRemove.includes(object.constructor.name)) {
                var objectTransform = object.transform;
                var pos = objectTransform.absolutePosition();
                new _game_objects_particles_StrikeTimeParticleExplosion__WEBPACK_IMPORTED_MODULE_1__.ParticleExplosion(_this.engine, pos);
                removeList.push(object);
            }
        });
        removeList.forEach(function (removeThis) {
            removeThis.remove();
        });
    };
    StrikeTimeScript.prototype.winGame = function () {
        var _this = this;
        this.engine.paused = true;
        var modal = document.getElementById("endOfStrikeTimeModal");
        modal.style.display = "block";
        // Get the button that opens the modal
        // var btn = document.getElementById("myBtn");
        // Get the <span> element that closes the modal
        var xclose = document.getElementsByClassName("endClose")[0];
        // When the user clicks on <span> (x), close the modal
        xclose.onclick = function (e) {
            var _a;
            e.stopPropagation();
            modal.style.display = "none";
            _this.engine.paused = false;
            window.removeEventListener("click", closeModalWithClick, false);
            if (!_this.engine.muted) {
                (_a = _this.theme) === null || _a === void 0 ? void 0 : _a.play();
            }
        };
        var closeModalWithClick = function (e) {
            var _a;
            if (e.target == modal) {
                _this.engine.paused = false;
                if (!_this.engine.muted) {
                    (_a = _this.theme) === null || _a === void 0 ? void 0 : _a.play();
                }
                modal.style.display = "none";
                window.removeEventListener("click", closeModalWithClick, false);
            }
        };
        // When the user clicks anywhere outside of the modal, close it
        window.addEventListener("click", closeModalWithClick, false);
    };
    StrikeTimeScript.prototype.death = function () {
    };
    StrikeTimeScript.prototype.gameOver = function () {
        // end the game here
    };
    // levelDesigner() {
    //     const modal = document.getElementById("levelDesignerModal");
    // }
    StrikeTimeScript.prototype.onPause = function () {
        try {
            this.theme.pause();
        }
        catch (error) {
            console.log('failed to pause theme music');
        }
        var modal = document.getElementById("pauseModal");
        modal.style.display = "block";
    };
    StrikeTimeScript.prototype.onUnPause = function () {
        try {
            this.theme.unPause();
        }
        catch (error) {
            console.log('failed to unpause theme music');
        }
        var modal = document.getElementById("pauseModal");
        modal.style.display = "none";
    };
    StrikeTimeScript.prototype.randomDirection = function () {
        var angles = [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2];
        return angles[Math.floor(Math.random() * angles.length) % angles.length];
    };
    StrikeTimeScript.prototype.createEnemyCreators = function () {
        var engine = this.engine;
        var gameObjectCreatorMap = new Map();
        gameObjectCreatorMap.set('Aurora', function (pos) { return new _game_objects_StrikeTime_Aurora_Aurora__WEBPACK_IMPORTED_MODULE_7__.Aurora(engine, pos); });
        gameObjectCreatorMap.set('Building1', function (pos) { return new _game_objects_StrikeTime_Buildings_Building1__WEBPACK_IMPORTED_MODULE_9__.Building1(engine, pos); });
        gameObjectCreatorMap.set('TargetBuilding', function (pos) { return new _game_objects_StrikeTime_Buildings_TargetBuilding__WEBPACK_IMPORTED_MODULE_11__.TargetBuilding(engine, pos); });
        gameObjectCreatorMap.set('Airport', function (pos) { return new _game_objects_StrikeTime_Airport_Airport__WEBPACK_IMPORTED_MODULE_10__.Airport(engine, pos); });
        gameObjectCreatorMap.set('PatriotMissileSite', function (pos, angle) { return new _game_objects_StrikeTime_Enemies_PatriotMissileSite__WEBPACK_IMPORTED_MODULE_8__.PatriotMissileSite(engine, pos); });
        return gameObjectCreatorMap;
    };
    StrikeTimeScript.prototype.randomSpawnEnemy = function () {
        var pos = this.randomPosition();
        var enemyCreators = Array.from(this.gameObjectCreatorMap.values());
        enemyCreators[Math.floor(Math.random() * enemyCreators.length) % enemyCreators.length](pos);
    };
    StrikeTimeScript.prototype.randomPosition = function (radius) {
        if (!radius) {
            radius = 40;
        }
        return [
            (DIM_X - radius * 4) * Math.random() + radius * 4,
            (DIM_Y - radius * 4) * Math.random() + radius * 4,
            // 1000,600
        ];
    };
    StrikeTimeScript.isOutOfBounds = function (pos, radius) {
        var max = [DIM_X - radius, DIM_Y - radius];
        if (radius) {
            return (pos[0] <= radius ||
                pos[0] >= max[0] ||
                pos[1] <= radius ||
                pos[1] >= max[1]);
        }
        else {
            return (pos[0] < 0 ||
                pos[1] < 0 ||
                pos[0] > DIM_X ||
                pos[1] > DIM_Y);
        }
    };
    StrikeTimeScript.BG_COLOR = '#000000';
    return StrikeTimeScript;
}());



/***/ }),

/***/ "./src/game_engine/EntityState/Activity.ts":
/*!*************************************************!*\
  !*** ./src/game_engine/EntityState/Activity.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Activity: () => (/* binding */ Activity),
/* harmony export */   ParentActivity: () => (/* binding */ ParentActivity)
/* harmony export */ });
var Activity = /** @class */ (function () {
    function Activity(name, activityState, activator, onActivityStart, onActivityEnd) {
        this.onActivityStart = onActivityStart;
        this.onActivityEnd = onActivityEnd;
        this.name = name;
        this.activityState = activityState;
        this.runActivity = activator;
        this.activityStarted = false;
    }
    // return true if completed
    Activity.prototype.doActivity = function (dT) {
        if (!this.activityStarted) {
            this.activityStarted = true;
            this.onActivityStart(this.activityState);
        }
        if (this.runActivity(dT, this.activityState)) {
            this.onActivityEnd(dT, this.activityState);
            return true;
        }
        return false;
    };
    return Activity;
}());

// might need to store the activity data at the parent level to allow introspection
// or I can have references to the data that's in the activity queue so I don't have 
// to loop through an array
var ParentActivity = /** @class */ (function () {
    function ParentActivity(name, subActivities, parentActivity, currentActivityIndex) {
        this.name = name;
        this.parentActivity = parentActivity;
        this.currentActivityIndex = currentActivityIndex || 0;
        this.subActivities = subActivities || [];
    }
    // returns true if this parent activity is done
    ParentActivity.prototype.doActivity = function (dT) {
        if (!this.activityStarted) {
            this.activityStarted = true;
        }
        var currentActivity = this.subActivities[this.currentActivityIndex];
        var currentActivityCompleted = currentActivity.doActivity(dT);
        if (currentActivityCompleted) {
            currentActivity.activityStarted = false;
            if (this.currentActivityIndex < this.subActivities.length - 1) {
                this.currentActivityIndex++;
                return false;
            }
            else {
                this.currentActivityIndex = 0;
                return true;
            }
        }
        return false;
    };
    return ParentActivity;
}());



/***/ }),

/***/ "./src/game_engine/EntityState/Animate.ts":
/*!************************************************!*\
  !*** ./src/game_engine/EntityState/Animate.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Animation: () => (/* binding */ Animation),
/* harmony export */   ParentAnimation: () => (/* binding */ ParentAnimation)
/* harmony export */ });
// I could contain two entity sprite parameters and or transforms in one animation
// that could be nice
var Animation = /** @class */ (function () {
    function Animation(name, animationState, animator, onAnimationEnd, spriteParameters, parentAnimation) {
        this.name = name;
        this.spriteParameters = spriteParameters;
        this.parentAnimation = parentAnimation;
        this.animationState = animationState;
        this.runAnimation = animator;
        this.onAnimationEnd = onAnimationEnd;
    }
    ;
    Animation.prototype.animate = function (dT) {
        if (this.runAnimation(dT, this.animationState, this.spriteParameters)) {
            this.endAnimation();
            return true;
        }
        return false;
    };
    Animation.prototype.endAnimation = function () {
        this.onAnimationEnd(this.animationState, this.spriteParameters);
    };
    return Animation;
}());

// Last animation decides whether to clear out the current animation with onAnimationEnd
// has to be done in onAnimationEnd otherwise the parent animation will loop
var ParentAnimation = /** @class */ (function () {
    function ParentAnimation(name, animations, parentAnimation, currentAnimationIndex) {
        this.name = name;
        this.parentAnimation = parentAnimation;
        this.animations = animations || [];
        this.currentAnimationIndex = currentAnimationIndex || 0;
        this.animationInterrupted = false;
    }
    ParentAnimation.prototype.endAnimation = function () {
        this.animations[this.currentAnimationIndex].endAnimation();
    };
    ParentAnimation.prototype.interruptAnimation = function () {
        this.animationInterrupted = true;
    };
    ParentAnimation.prototype.animate = function (dT) {
        var currentAnimation = this.animations[this.currentAnimationIndex];
        if (this.animationInterrupted) {
            this.endAnimation();
            return true;
        }
        var currentAnimationStateComplete = currentAnimation.animate(dT);
        if (currentAnimationStateComplete) {
            if (this.currentAnimationIndex < this.animations.length - 1) {
                this.currentAnimationIndex++;
                return false;
            }
            else {
                this.currentAnimationIndex = 0;
                return true;
            }
        }
        return false;
    };
    return ParentAnimation;
}());



/***/ }),

/***/ "./src/game_engine/Levels/DesignElements/Event.ts":
/*!********************************************************!*\
  !*** ./src/game_engine/Levels/DesignElements/Event.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Event: () => (/* binding */ Event),
/* harmony export */   EventObject: () => (/* binding */ EventObject),
/* harmony export */   GEOEventObjectSprite: () => (/* binding */ GEOEventObjectSprite),
/* harmony export */   StrikeTimeEventObjectSprite: () => (/* binding */ StrikeTimeEventObjectSprite),
/* harmony export */   spriteMap: () => (/* binding */ spriteMap)
/* harmony export */ });
/* harmony import */ var _UI_Element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../UI_Element */ "./src/game_engine/UI_Element.ts");
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../transform */ "./src/game_engine/transform.ts");
/* harmony import */ var _LevelDesign_EnemyPlacer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../LevelDesign/EnemyPlacer */ "./src/game_engine/Levels/LevelDesign/EnemyPlacer.ts");
/* harmony import */ var _Spawn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Spawn */ "./src/game_engine/Levels/DesignElements/Spawn.ts");
/* harmony import */ var _line_sprite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../line_sprite */ "./src/game_engine/line_sprite.ts");
/* harmony import */ var _game_objects_enemies_BoxBox_boxbox_sprite__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../game_objects/enemies/BoxBox/boxbox_sprite */ "./src/game_objects/enemies/BoxBox/boxbox_sprite.ts");
/* harmony import */ var _game_objects_enemies_Arrow_arrow_sprite__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../game_objects/enemies/Arrow/arrow_sprite */ "./src/game_objects/enemies/Arrow/arrow_sprite.ts");
/* harmony import */ var _game_objects_enemies_Grunt_grunt__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../game_objects/enemies/Grunt/grunt */ "./src/game_objects/enemies/Grunt/grunt.ts");
/* harmony import */ var _game_objects_enemies_Pinwheel_pinwheel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../game_objects/enemies/Pinwheel/pinwheel */ "./src/game_objects/enemies/Pinwheel/pinwheel.ts");
/* harmony import */ var _game_objects_enemies_Weaver_weaver__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../game_objects/enemies/Weaver/weaver */ "./src/game_objects/enemies/Weaver/weaver.ts");
/* harmony import */ var _game_objects_enemies_Singularity_singularity_sprite__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../game_objects/enemies/Singularity/singularity_sprite */ "./src/game_objects/enemies/Singularity/singularity_sprite.ts");
/* harmony import */ var _game_objects_enemies_RandomRandom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../game_objects/enemies/RandomRandom */ "./src/game_objects/enemies/RandomRandom.ts");
/* harmony import */ var _game_objects_enemies_Singularity_alien_ship__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../game_objects/enemies/Singularity/alien_ship */ "./src/game_objects/enemies/Singularity/alien_ship.ts");
/* harmony import */ var _game_objects_StrikeTime_Aurora_Aurora__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../game_objects/StrikeTime/Aurora/Aurora */ "./src/game_objects/StrikeTime/Aurora/Aurora.ts");
/* harmony import */ var _game_objects_StrikeTime_Buildings_Building1__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../game_objects/StrikeTime/Buildings/Building1 */ "./src/game_objects/StrikeTime/Buildings/Building1.ts");
/* harmony import */ var _game_objects_StrikeTime_Buildings_TargetBuilding__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../game_objects/StrikeTime/Buildings/TargetBuilding */ "./src/game_objects/StrikeTime/Buildings/TargetBuilding.ts");
/* harmony import */ var _game_objects_StrikeTime_Enemies_PatriotMissileSite__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../game_objects/StrikeTime/Enemies/PatriotMissileSite */ "./src/game_objects/StrikeTime/Enemies/PatriotMissileSite.ts");
/* harmony import */ var _game_objects_StrikeTime_Airport_Airport__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../game_objects/StrikeTime/Airport/Airport */ "./src/game_objects/StrikeTime/Airport/Airport.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


















// should add Alien too
var spriteMap = {
    BoxBox: function (transform) {
        var _BoxBoxSprite = new _game_objects_enemies_BoxBox_boxbox_sprite__WEBPACK_IMPORTED_MODULE_5__.BoxBoxSprite(transform);
        _BoxBoxSprite.spawning = true;
        return _BoxBoxSprite;
    },
    Arrow: function (transform) { return new _game_objects_enemies_Arrow_arrow_sprite__WEBPACK_IMPORTED_MODULE_6__.ArrowSprite(transform); },
    Grunt: function (transform) { return new _game_objects_enemies_Grunt_grunt__WEBPACK_IMPORTED_MODULE_7__.GruntSprite(transform); },
    Pinwheel: function (transform) { return new _game_objects_enemies_Pinwheel_pinwheel__WEBPACK_IMPORTED_MODULE_8__.PinwheelSprite(transform); },
    Weaver: function (transform) { return new _game_objects_enemies_Weaver_weaver__WEBPACK_IMPORTED_MODULE_9__.WeaverSprite(transform); },
    AlienShip: function (transform) { return new _game_objects_enemies_Singularity_alien_ship__WEBPACK_IMPORTED_MODULE_12__.AlienShipSprite(transform); },
    Singularity: function (transform) { return new _game_objects_enemies_Singularity_singularity_sprite__WEBPACK_IMPORTED_MODULE_10__.SingularitySprite(transform); },
    Aurora: function (transform) { return new _game_objects_StrikeTime_Aurora_Aurora__WEBPACK_IMPORTED_MODULE_13__.AuroraSprite(transform); },
    Building1: function (transform) { return new _game_objects_StrikeTime_Buildings_Building1__WEBPACK_IMPORTED_MODULE_14__.Building1Sprite(transform); },
    TargetBuilding: function (transform) { return new _game_objects_StrikeTime_Buildings_TargetBuilding__WEBPACK_IMPORTED_MODULE_15__.TargetBuildingSprite(transform); },
    PatriotMissileSite: function (transform) { return new _game_objects_StrikeTime_Enemies_PatriotMissileSite__WEBPACK_IMPORTED_MODULE_16__.PatriotMissileSiteSprite(transform); },
    Airport: function (transform) { return new _game_objects_StrikeTime_Airport_Airport__WEBPACK_IMPORTED_MODULE_17__.AirportSprite(transform); },
    RANDOM: function (transform) { return new _game_objects_enemies_RandomRandom__WEBPACK_IMPORTED_MODULE_11__.RandomRandomSprite(transform); },
};
// maybe this is what is created from the serialized version
var Event = /** @class */ (function () {
    function Event(spawns, parentScene, isShipRelative, gameEngine) {
        // not sure what the type is for spawns here
        this.type = 'Event';
        this.parentScene = parentScene;
        this.numberFactor = 1;
        this.isShipRelative = isShipRelative;
        // I think I'll have to create the spawns from the serialized data given here
        this.spawns = spawns.map(function (spawn) { return new _Spawn__WEBPACK_IMPORTED_MODULE_3__.Spawn(spawn, gameEngine); }); // this is different than the single spawn thing I have in the mock data
        // okay now I'm thoroughly confused. I think I have a plain javascript object as spawns, and also
    }
    Event.prototype.update = function () {
        this.spawnEverything();
        this.endEvent();
    };
    Event.prototype.spawnEverything = function () {
        var _this = this;
        this.spawns.forEach(function (spawn) {
            spawn.spawnEvent(_this.numberFactor, _this.isShipRelative);
        });
    };
    Event.prototype.endEvent = function () {
        this.parentScene.nextElement();
    };
    Event.prototype.resetToStartingValues = function () {
        this.numberFactor = 1;
    };
    return Event;
}());

// this is what is created by the UI
// but it will also have to be created by the serialized data
var EventObject = /** @class */ (function (_super) {
    __extends(EventObject, _super);
    function EventObject(levelDesigner, eventToLoad, position, parentScene) {
        var _this = _super.call(this, levelDesigner, position, parentScene) || this;
        _this.spawns = [];
        _this.enemyPlacers = [];
        _this.selectedSpawns = [];
        // TODO: make this more automatically extendable
        _this.spawnSprites = new Map();
        _this.widthHeight = [80, 40];
        _this.clickRadius = 20;
        _this.addMouseClickListener();
        _this.isShipRelative = false;
        if (eventToLoad) {
            eventToLoad.spawns.forEach(function (spawn) { return _this.addSpawn(spawn); });
            _this.isShipRelative = eventToLoad.isShipRelative;
        }
        _this.addUIElementSprite(new GEOEventObjectSprite(_this.transform, _this.spawnSprites, _this.widthHeight));
        _this.levelDesigner.eventLoadShipRelative(_this.isShipRelative);
        return _this;
    }
    EventObject.prototype.enemyPlaced = function (spawn, enemyPlacer) {
        this.addSpawn(new _Spawn__WEBPACK_IMPORTED_MODULE_3__.Spawn(spawn, this.levelDesigner.engine));
        this.addEnemyPlacer(enemyPlacer);
        this.levelDesigner.addingAnotherEnemy(this.createEnemyPlacer(spawn.type));
    };
    EventObject.prototype.removePlacer = function (enemyPlacer) {
        this.spawns = this.spawns.filter(function (spawn) { return spawn !== enemyPlacer.serializedSpawn; });
        this.enemyPlacers = this.enemyPlacers.filter(function (placer) { return placer !== enemyPlacer; });
    };
    // copy and paste should be supported
    // see scene for description on how to do it
    // copy() {
    //     return this.levelDesigner.addToClipBoard(new EventObject(this.levelDesigner, this.serialize()));
    // }
    EventObject.prototype.copySelectedSpawns = function () {
        // I imagine shift click and then copy, and past
    };
    EventObject.prototype.copyLineSpriteForDragging = function () {
        var draggingSpriteTransform = new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform(null, [this.transform.pos[0], this.transform.pos[1]]);
        return new GEOEventObjectSprite(draggingSpriteTransform, this.spawnSprites, this.widthHeight);
    };
    // this shit needs work
    EventObject.prototype.deleteSelectedSpawns = function () {
        var _this = this;
        this.selectedSpawns.forEach(function (spawn) {
            _this.deleteSpawn(spawn);
        });
    };
    EventObject.prototype.deleteYourShit = function () {
        this.spawns = [];
        this.enemyPlacers.forEach(function (placer) { return (placer.remove()); });
        this.enemyPlacers = [];
    };
    EventObject.prototype.deleteSelectedEnemyPlacers = function () {
    };
    EventObject.prototype.makeCoordinatesShipRelative = function () {
        this.isShipRelative = true;
    };
    EventObject.prototype.makeCoordinatesArenaRelative = function () {
        this.isShipRelative = false;
    };
    EventObject.prototype.loadSpawns = function () {
        var _this = this;
        this.spawns.forEach(function (spawn) {
            var enemyPlacer = new _LevelDesign_EnemyPlacer__WEBPACK_IMPORTED_MODULE_2__.EnemyPlacer(_this.levelDesigner.engine, spawn, _this, true);
            enemyPlacer.addMouseClickListener();
            _this.enemyPlacers.push(enemyPlacer);
        });
    };
    // copied into engine's clipboard
    // pasteCopiedSpawns(spawns) {
    //     spawns.forEach((spawn) => (this.addSpawn(spawn)));
    // }
    EventObject.prototype.serialize = function () {
        return {
            type: 'Event',
            spawns: this.spawns.map(function (spawn) { return spawn.serialize(); }),
            isShipRelative: this.isShipRelative
        };
    };
    // loadEvent(event) {
    //     event.spawns.forEach((spawn) => this.addSpawn({spawn}));
    // }
    EventObject.prototype.addSpawn = function (spawnSerialized) {
        this.spawns.push(new _Spawn__WEBPACK_IMPORTED_MODULE_3__.Spawn(spawnSerialized, this.levelDesigner.engine));
        var currentNumber = this.spawnSprites.get(spawnSerialized.type);
        currentNumber ? this.spawnSprites.set(spawnSerialized.type, 1) : this.spawnSprites.set(spawnSerialized.type, currentNumber + 1);
    };
    EventObject.prototype.enemyPlacerClicked = function (enemyPlacer) {
        this.levelDesigner.enemyPlacerClicked(enemyPlacer);
    };
    EventObject.prototype.addRandomRandom = function (serializedSpawn) {
        var randomRandomAdded = this.spawns.find(function (spawny) { return spawny.type === 'RANDOM'; });
        if (randomRandomAdded) {
            randomRandomAdded.possibleSpawns = serializedSpawn.possibleSpawns;
            randomRandomAdded.numberToGenerate = serializedSpawn.numberToGenerate;
            var enemyPlacer = this.enemyPlacers.find(function (enemyPlacer) { return (enemyPlacer.type === 'RANDOM'); });
            enemyPlacer.serializedSpawn.numberToGenerate = serializedSpawn.numberToGenerate;
            enemyPlacer.serializedSpawn.possibleSpawns = serializedSpawn.possibleSpawns;
        }
        else {
            var enemyPlacer = new _LevelDesign_EnemyPlacer__WEBPACK_IMPORTED_MODULE_2__.EnemyPlacer(this.levelDesigner.engine, {
                location: 'RANDOM',
                type: 'RANDOM',
                numberToGenerate: serializedSpawn.numberToGenerate,
                possibleSpawns: serializedSpawn.possibleSpawns
            }, this, true);
            this.addSpawn(serializedSpawn);
            this.addEnemyPlacer(enemyPlacer);
        }
    };
    EventObject.prototype.createEnemyPlacer = function (type) {
        return new _LevelDesign_EnemyPlacer__WEBPACK_IMPORTED_MODULE_2__.EnemyPlacer(this.levelDesigner.engine, { type: type }, this);
    };
    EventObject.prototype.addEnemyPlacer = function (enemyPlacer) {
        this.enemyPlacers.push(enemyPlacer);
    };
    EventObject.prototype.deleteSpawn = function (spawn) {
        var index = this.spawns.indexOf(spawn);
        if (index !== -1) {
            this.spawns.splice(index, 1);
            var currentNumber = this.spawnSprites.get(spawn.type);
            this.spawnSprites.set(spawn.type, currentNumber - 1);
        }
    };
    EventObject.prototype.deleteEnemyPlacer = function (enemyPlacer) {
        var index = this.enemyPlacers.indexOf(enemyPlacer);
        if (index !== -1) {
            this.enemyPlacers.splice(index, 1);
        }
    };
    EventObject.prototype.onMouseClick = function () {
        console.log('event object mouse click');
        this.levelDesigner.eventSelected(this);
        this.loadSpawns();
        this.UILineSprite.selected = true;
    };
    EventObject.prototype.unSelected = function () {
        this.enemyPlacers.forEach(function (enemyPlacer) { return enemyPlacer.eventUnselected(); });
        this.levelDesigner.eventUnselected();
        this.UILineSprite.selected = false;
    };
    EventObject.prototype.onMouseDoubleClick = function () {
        console.log('yay mouse double clicked here');
    };
    EventObject.prototype.update = function () {
    };
    return EventObject;
}(_UI_Element__WEBPACK_IMPORTED_MODULE_0__.UIElement));

var GEOEventObjectSprite = /** @class */ (function (_super) {
    __extends(GEOEventObjectSprite, _super);
    function GEOEventObjectSprite(transform, spawnSprites, widthHeight) {
        var _this = _super.call(this, transform) || this;
        _this.selected = true;
        _this.expanded = true;
        _this.spawnSprites = spawnSprites;
        _this.widthHeight = widthHeight;
        // change the sprites to have spawning scale be 0.5
        Object.keys(GEOEventObjectSprite.spawnSpriteCreator).forEach(function (key) {
            GEOEventObjectSprite.spawnSpriteCreator[key].spawningScale = 0.5;
        });
        return _this;
    }
    GEOEventObjectSprite.prototype.draw = function (ctx) {
        var pos = this.transform.pos;
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        this.drawFunction(ctx);
        ctx.restore();
    };
    GEOEventObjectSprite.prototype.drawFunction = function (ctx) {
        var h = this.widthHeight[1];
        var w = this.widthHeight[0];
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, w, h);
        ctx.lineWidth = this.selected ? 3 : 1;
        ctx.strokeStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(w, 0);
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.stroke();
        // should add Alien too
        // BoxBox, then Pinwheel, then Grunt, then Arrow, then Weaver, then Singularity
        // BoxBox location: 5,5
        // Grunt location: 10,5
        // Arrow location: 15,5
        var BoxBoxSprite = GEOEventObjectSprite.spawnSpriteCreator['BoxBox'];
        var ArrowSprite = GEOEventObjectSprite.spawnSpriteCreator['Arrow'];
        var GruntSprite = GEOEventObjectSprite.spawnSpriteCreator['Grunt'];
        var PinwheelSprite = GEOEventObjectSprite.spawnSpriteCreator['Pinwheel'];
        var WeaverSprite = GEOEventObjectSprite.spawnSpriteCreator['Weaver'];
        var SingularitySprite = GEOEventObjectSprite.spawnSpriteCreator['Singularity'];
        var RandomRandomSprite = GEOEventObjectSprite.spawnSpriteCreator['RANDOM'];
        this.spawnSprites.get('BoxBox') > 0 ? BoxBoxSprite.makeVisible() : BoxBoxSprite.makeInvisible();
        this.spawnSprites.get('Arrow') > 0 ? ArrowSprite.makeVisible() : ArrowSprite.makeInvisible();
        this.spawnSprites.get('Grunt') > 0 ? GruntSprite.makeVisible() : GruntSprite.makeInvisible();
        this.spawnSprites.get('Pinwheel') > 0 ? PinwheelSprite.makeVisible() : PinwheelSprite.makeInvisible();
        this.spawnSprites.get('Weaver') > 0 ? WeaverSprite.makeVisible() : WeaverSprite.makeInvisible();
        this.spawnSprites.get('Singularity') > 0 ? SingularitySprite.makeVisible() : SingularitySprite.makeInvisible();
        this.spawnSprites.get('RANDOM') > 0 ? RandomRandomSprite.makeVisible() : RandomRandomSprite.makeInvisible();
        BoxBoxSprite.draw(ctx);
        ArrowSprite.draw(ctx);
        GruntSprite.draw(ctx);
        PinwheelSprite.draw(ctx);
        WeaverSprite.draw(ctx);
        SingularitySprite.draw(ctx);
        RandomRandomSprite.draw(ctx);
    };
    GEOEventObjectSprite.firstPosition = [10, 10];
    GEOEventObjectSprite.secondPosition = [30, 10];
    GEOEventObjectSprite.thirdPosition = [50, 10];
    GEOEventObjectSprite.fourthPosition = [10, 30];
    GEOEventObjectSprite.fifthPosition = [30, 30];
    GEOEventObjectSprite.sixthPosition = [50, 30];
    GEOEventObjectSprite.seventhPosition = [70, 10];
    GEOEventObjectSprite.spawnSpriteCreator = {
        BoxBox: spriteMap['BoxBox'](new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform(null, GEOEventObjectSprite.firstPosition)),
        Arrow: spriteMap['Arrow'](new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform(null, GEOEventObjectSprite.secondPosition)),
        Grunt: spriteMap['Grunt'](new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform(null, GEOEventObjectSprite.thirdPosition)),
        Pinwheel: spriteMap['Pinwheel'](new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform(null, GEOEventObjectSprite.fourthPosition)),
        Weaver: spriteMap['Weaver'](new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform(null, GEOEventObjectSprite.fifthPosition)),
        Singularity: spriteMap['Singularity'](new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform(null, GEOEventObjectSprite.sixthPosition)),
        RANDOM: spriteMap['RANDOM'](new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform(null, GEOEventObjectSprite.seventhPosition)),
    };
    return GEOEventObjectSprite;
}(_line_sprite__WEBPACK_IMPORTED_MODULE_4__.LineSprite));

var StrikeTimeEventObjectSprite = /** @class */ (function (_super) {
    __extends(StrikeTimeEventObjectSprite, _super);
    function StrikeTimeEventObjectSprite(transform, spawnSprites, widthHeight) {
        var _this = _super.call(this, transform) || this;
        _this.selected = true;
        _this.expanded = true;
        _this.spawnSprites = spawnSprites;
        _this.widthHeight = widthHeight;
        // change the sprites to have spawning scale be 0.5
        Object.keys(GEOEventObjectSprite.spawnSpriteCreator).forEach(function (key) {
            GEOEventObjectSprite.spawnSpriteCreator[key].spawningScale = 0.5;
        });
        return _this;
    }
    StrikeTimeEventObjectSprite.prototype.draw = function (ctx) {
        var pos = this.transform.pos;
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        this.drawFunction(ctx);
        ctx.restore();
    };
    StrikeTimeEventObjectSprite.prototype.drawFunction = function (ctx) {
        var h = this.widthHeight[1];
        var w = this.widthHeight[0];
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, w, h);
        ctx.lineWidth = this.selected ? 3 : 1;
        ctx.strokeStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(w, 0);
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.stroke();
        var AuroraSprite = StrikeTimeEventObjectSprite.spawnSpriteCreator['Aurora'];
        var BuildingSprite = StrikeTimeEventObjectSprite.spawnSpriteCreator['Building'];
        var TargetBuildingSprite = StrikeTimeEventObjectSprite.spawnSpriteCreator['TargetBuilding'];
        var PatriotSiteSprite = StrikeTimeEventObjectSprite.spawnSpriteCreator['PatriotSite'];
        var RandomRandomSprite = StrikeTimeEventObjectSprite.spawnSpriteCreator['RANDOM'];
        this.spawnSprites.get('Aurora') > 0 ? AuroraSprite.makeVisible() : AuroraSprite.makeInvisible();
        this.spawnSprites.get('Building1') > 0 ? BuildingSprite.makeVisible() : BuildingSprite.makeInvisible();
        this.spawnSprites.get('TargetBuilding') > 0 ? TargetBuildingSprite.makeVisible() : TargetBuildingSprite.makeInvisible();
        this.spawnSprites.get('PatriotMissileSite') > 0 ? PatriotSiteSprite.makeVisible() : PatriotSiteSprite.makeInvisible();
        this.spawnSprites.get('RANDOM') > 0 ? RandomRandomSprite.makeVisible() : RandomRandomSprite.makeInvisible();
        AuroraSprite.draw(ctx);
        BuildingSprite.draw(ctx);
        TargetBuildingSprite.draw(ctx);
        PatriotSiteSprite.draw(ctx);
        RandomRandomSprite.draw(ctx);
    };
    StrikeTimeEventObjectSprite.firstPosition = [10, 10];
    StrikeTimeEventObjectSprite.secondPosition = [30, 10];
    StrikeTimeEventObjectSprite.thirdPosition = [50, 10];
    StrikeTimeEventObjectSprite.fourthPosition = [10, 30];
    StrikeTimeEventObjectSprite.fifthPosition = [30, 30];
    StrikeTimeEventObjectSprite.sixthPosition = [50, 30];
    StrikeTimeEventObjectSprite.seventhPosition = [70, 10];
    StrikeTimeEventObjectSprite.spawnSpriteCreator = {
        Aurora: spriteMap['Aurora'](new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform(null, StrikeTimeEventObjectSprite.firstPosition)),
        Building: spriteMap['Building1'](new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform(null, StrikeTimeEventObjectSprite.secondPosition)),
        TargetBuilding: spriteMap['TargetBuilding'](new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform(null, StrikeTimeEventObjectSprite.thirdPosition)),
        PatriotSite: spriteMap['PatriotMissileSite'](new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform(null, StrikeTimeEventObjectSprite.fourthPosition)),
        RANDOM: spriteMap['RANDOM'](new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform(null, StrikeTimeEventObjectSprite.seventhPosition)),
    };
    return StrikeTimeEventObjectSprite;
}(_line_sprite__WEBPACK_IMPORTED_MODULE_4__.LineSprite));



/***/ }),

/***/ "./src/game_engine/Levels/DesignElements/Loop.ts":
/*!*******************************************************!*\
  !*** ./src/game_engine/Levels/DesignElements/Loop.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoopBeginning: () => (/* binding */ LoopBeginning),
/* harmony export */   LoopBeginningObject: () => (/* binding */ LoopBeginningObject),
/* harmony export */   LoopBeginningObjectSprite: () => (/* binding */ LoopBeginningObjectSprite),
/* harmony export */   LoopEnd: () => (/* binding */ LoopEnd),
/* harmony export */   LoopEndObject: () => (/* binding */ LoopEndObject),
/* harmony export */   LoopEndingObjectSprite: () => (/* binding */ LoopEndingObjectSprite)
/* harmony export */ });
/* harmony import */ var _UI_Element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../UI_Element */ "./src/game_engine/UI_Element.ts");
/* harmony import */ var _line_sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../line_sprite */ "./src/game_engine/line_sprite.ts");
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../transform */ "./src/game_engine/transform.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



// maybe when the game sequence comes across the beginning of a loop it will store that loop
// and then when it comes across the end of the loop it will check if the loop is done
// if it is it will move on, if not it will go back to the beginning of the loop
var LoopEnd = /** @class */ (function () {
    function LoopEnd(loop, parentScene) {
        this.type === "LoopEnd";
        this.parentScene = parentScene; // scene the loop is in
        this.startingLoopValues = {
            loopIdx: loop.loopIdx || 0, // could probably default to 0. this is how many times it's looped
            // during the level edit process, whenever a loop is added
            // it will increment the loopId. This way beginning loops and end loops will always 
            // have matching loopIds without collision
            loopId: parentScene.getLoopId(),
            repeatTimes: loop.repeatTimes
        };
        this.loopData = {
            loopIdx: this.startingLoopValues.loopIdx,
            loopId: this.startingLoopValues.loopId,
            repeatTimes: this.startingLoopValues.repeatTimes
        };
    }
    LoopEnd.prototype.update = function () {
        if (this.loopData.loopIdx >= this.loopData.repeatTimes) { // 3: 0, 1, 2
            this.endLoop();
        }
        else {
            this.loopData.loopIdx++;
            this.parentScene.goToLoopId(this.loopData.loopId);
        }
    };
    LoopEnd.prototype.resetToStartingValues = function () {
        this.loopData = {
            loopIdx: this.startingLoopValues.loopIdx,
            loopId: this.startingLoopValues.loopId,
            repeatTimes: this.startingLoopValues.repeatTimes
        };
    };
    LoopEnd.prototype.endLoop = function () {
        this.resetToStartingValues();
        this.parentScene.nextElement();
    };
    return LoopEnd;
}());

var LoopBeginning = /** @class */ (function () {
    function LoopBeginning(parentScene) {
        this.type = "LoopBeginning";
        this.parentScene = parentScene;
        this.loopId = this.parentScene.createLoopId();
    }
    LoopBeginning.prototype.update = function () {
        this.parentScene.nextElement();
        // this means the next step will be delayed by a frame waiting
        // for the next update call
    };
    LoopBeginning.prototype.resetToStartingValues = function () { };
    return LoopBeginning;
}());

// UIElement
var LoopBeginningObject = /** @class */ (function (_super) {
    __extends(LoopBeginningObject, _super);
    function LoopBeginningObject(levelDesigner, position, parentScene) {
        var _this = _super.call(this, levelDesigner, position, parentScene) || this;
        _this.widthHeight = [10, 40];
        _this.clickRadius = 5;
        _this.addMouseClickListener();
        _this.addUIElementSprite(new LoopBeginningObjectSprite(_this.transform, _this.widthHeight));
        _this.endLoopObject = undefined;
        return _this;
    }
    LoopBeginningObject.prototype.onMouseDoubleClick = function (mousePos) {
        console.log('notImplemented', mousePos);
    };
    LoopBeginningObject.prototype.moveLeft = function () {
        this.levelDesigner.moveLeft(this);
    };
    LoopBeginningObject.prototype.moveRight = function () {
        this.levelDesigner.moveRight(this);
    };
    // copy() {
    // not sure how to create a new loop id if I'm copying a loop
    //     return this.levelDesigner.addToClipBoard(new LoopBeginningObject(this.levelDesigner, this.serialize()));
    // }
    LoopBeginningObject.prototype.copyLineSpriteForDragging = function () {
        var draggingSpriteTransform = new _transform__WEBPACK_IMPORTED_MODULE_2__.Transform(null, [this.transform.pos[0], this.transform.pos[1]]);
        return new LoopBeginningObjectSprite(draggingSpriteTransform, this.widthHeight);
    };
    LoopBeginningObject.prototype.serialize = function () {
        return {
            type: "LoopBeginning"
        };
    };
    LoopBeginningObject.prototype.onMouseClick = function () {
        console.log('loop beginning clicked');
        this.levelDesigner.loopSelected(this);
        this.UILineSprite.selected = true;
    };
    LoopBeginningObject.prototype.unSelected = function () {
        this.UILineSprite.selected = false;
    };
    LoopBeginningObject.prototype.deleteYourShit = function () {
        var endObject = this.endLoopObject;
        this.endLoopObject = undefined;
        endObject === null || endObject === void 0 ? void 0 : endObject.delete();
    };
    return LoopBeginningObject;
}(_UI_Element__WEBPACK_IMPORTED_MODULE_0__.UIElement));

var LoopEndObject = /** @class */ (function (_super) {
    __extends(LoopEndObject, _super);
    function LoopEndObject(levelDesigner, loop, position, parentScene) {
        var _this = _super.call(this, levelDesigner, position, parentScene) || this;
        _this.loopData = loop;
        _this.widthHeight = [30, 40];
        _this.clickRadius = 15;
        _this.addMouseClickListener();
        _this.addUIElementSprite(new LoopEndingObjectSprite(_this.transform, _this.widthHeight, _this.loopData.repeatTimes));
        _this.beginningLoopObject = undefined;
        return _this;
    }
    LoopEndObject.prototype.onMouseDoubleClick = function (mousePos) {
        console.log('notImplemented', mousePos);
    };
    // maybe I can have a button that moves it left or right for now
    // until I get drag and drop going
    LoopEndObject.prototype.changeRepeatTimes = function (newRepeatTimes) {
        this.loopData.repeatTimes = newRepeatTimes;
    };
    // not sure what this was about.. it's not used though
    // changeStartingRepeatIndex(newRepeatIndex: number) {
    //     this.loopData.repeatIndex = newRepeatIndex;
    // }
    // copy() {
    /// ohhhhh we don't care about the ids yet since they are 
    // made in runtime
    // okay maybe we do because we might want to have matching colors
    // another time
    //     return this.levelDesigner.addToClipBoard(new LoopEndObject(this.levelDesigner, this.serialize()));
    // }
    LoopEndObject.prototype.copyLineSpriteForDragging = function () {
        var draggingSpriteTransform = new _transform__WEBPACK_IMPORTED_MODULE_2__.Transform(null, [this.transform.pos[0], this.transform.pos[1]]);
        return new LoopEndingObjectSprite(draggingSpriteTransform, this.widthHeight, this.loopData.repeatTimes);
    };
    LoopEndObject.prototype.serialize = function () {
        return {
            type: "LoopEnd",
            loopIdx: this.loopData.loopIdx,
            repeatTimes: this.loopData.repeatTimes
        };
    };
    LoopEndObject.prototype.onMouseClick = function () {
        console.log('loop end clicked');
        this.levelDesigner.loopSelected(this);
        this.UILineSprite.selected = true;
    };
    LoopEndObject.prototype.unSelected = function () {
        this.UILineSprite.selected = false;
    };
    LoopEndObject.prototype.deleteYourShit = function () {
        var beginningObject = this.beginningLoopObject;
        this.beginningLoopObject = undefined;
        beginningObject === null || beginningObject === void 0 ? void 0 : beginningObject.delete();
    };
    return LoopEndObject;
}(_UI_Element__WEBPACK_IMPORTED_MODULE_0__.UIElement));

var LoopBeginningObjectSprite = /** @class */ (function (_super) {
    __extends(LoopBeginningObjectSprite, _super);
    function LoopBeginningObjectSprite(transform, widthHeight) {
        var _this = _super.call(this, transform) || this;
        _this.selected = false;
        _this.widthHeight = widthHeight;
        return _this;
    }
    LoopBeginningObjectSprite.prototype.draw = function (ctx) {
        var pos = this.transform.pos;
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        this.drawFunction(ctx);
        ctx.restore();
    };
    LoopBeginningObjectSprite.prototype.drawFunction = function (ctx) {
        var h = this.widthHeight[1];
        var w = this.widthHeight[0];
        ctx.fillStyle = "#FFD700";
        ctx.fillRect(0, 0, w, h);
        var lineWidth = this.selected ? 3 : 1;
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = "#FFFFFF";
        ctx.strokeRect(0 + lineWidth / 2, 0 + lineWidth / 2, w - lineWidth / 2, h - lineWidth / 2);
    };
    return LoopBeginningObjectSprite;
}(_line_sprite__WEBPACK_IMPORTED_MODULE_1__.LineSprite));

var LoopEndingObjectSprite = /** @class */ (function (_super) {
    __extends(LoopEndingObjectSprite, _super);
    function LoopEndingObjectSprite(transform, widthHeight, repeatTimes) {
        var _this = _super.call(this, transform) || this;
        _this.widthHeight = widthHeight;
        _this.repeatTimes = repeatTimes;
        _this.selected = false;
        return _this;
    }
    LoopEndingObjectSprite.prototype.draw = function (ctx) {
        var pos = this.transform.pos;
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        this.drawFunction(ctx);
        ctx.restore();
    };
    LoopEndingObjectSprite.prototype.drawFunction = function (ctx) {
        var h = this.widthHeight[1];
        var w = this.widthHeight[0];
        ctx.fillStyle = "#FFD700";
        ctx.fillRect(0, 0, w, h);
        ctx.lineWidth = this.selected ? 3 : 1;
        ctx.strokeStyle = "#FFFFFF";
        ctx.strokeRect(0, 0, w, h);
        ctx.fillStyle = "#000000";
        ctx.font = "10px Arial";
        ctx.fillText(String(this.repeatTimes), 2, this.widthHeight[1] / 2);
    };
    return LoopEndingObjectSprite;
}(_line_sprite__WEBPACK_IMPORTED_MODULE_1__.LineSprite));



/***/ }),

/***/ "./src/game_engine/Levels/DesignElements/Operation.ts":
/*!************************************************************!*\
  !*** ./src/game_engine/Levels/DesignElements/Operation.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Operation: () => (/* binding */ Operation),
/* harmony export */   OperationObject: () => (/* binding */ OperationObject),
/* harmony export */   OperationObjectSprite: () => (/* binding */ OperationObjectSprite)
/* harmony export */ });
/* harmony import */ var _UI_Element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../UI_Element */ "./src/game_engine/UI_Element.ts");
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../transform */ "./src/game_engine/transform.ts");
/* harmony import */ var _Scene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Scene */ "./src/game_engine/Levels/DesignElements/Scene.ts");
/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Event */ "./src/game_engine/Levels/DesignElements/Event.ts");
/* harmony import */ var _Time__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Time */ "./src/game_engine/Levels/DesignElements/Time.ts");
/* harmony import */ var _Loop__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Loop */ "./src/game_engine/Levels/DesignElements/Loop.ts");
/* harmony import */ var _line_sprite__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../line_sprite */ "./src/game_engine/line_sprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







var Operation = /** @class */ (function () {
    function Operation(operand, parentScene, gameEngine, gameScript) {
        this.operand = operand;
        this.parentScene = parentScene;
        this.gameEngine = gameEngine;
        this.gameScript = gameScript;
    }
    Operation.prototype.update = function () {
        this.doOperation();
    };
    Operation.prototype.doOperation = function () {
        var _this = this;
        if (this.operand.type === "SceneTimeFactor") {
            this.parentScene.gameElements.forEach(function (element) {
                _this.applyTimeFactor(element);
            });
        }
        else if (this.operand.type === "SceneNumberFactor") {
            this.parentScene.gameElements.forEach(function (element) {
                _this.applyNumberFactor(element);
            });
        }
        else if (this.operand.type === "ResetToStartingValues") {
            this.parentScene.gameElements.forEach(function (element) {
                _this.applyResetToStartingValues(element);
            });
        }
        else if (this.operand.type === "UpgradeBullets") {
            this.gameScript.ship.upgradeBullets();
        }
        this.parentScene.nextElement();
    };
    Operation.prototype.applyNumberFactor = function (element) {
        var _this = this;
        if (element instanceof _Event__WEBPACK_IMPORTED_MODULE_3__.Event) {
            element.numberFactor *= this.operand.factor;
        }
        if (element instanceof _Scene__WEBPACK_IMPORTED_MODULE_2__.Scene) {
            element.gameElements.forEach(function (element) {
                _this.applyNumberFactor(element);
            });
        }
    };
    Operation.prototype.applyTimeFactor = function (element) {
        var _this = this;
        if (element instanceof _Time__WEBPACK_IMPORTED_MODULE_4__.Time) {
            element.applyNewTimeFactor(this.operand.factor);
        }
        if (element instanceof _Scene__WEBPACK_IMPORTED_MODULE_2__.Scene) {
            element.gameElements.forEach(function (element) {
                _this.applyTimeFactor(element);
            });
        }
    };
    Operation.prototype.applyResetToStartingValues = function (element) {
        var _this = this;
        if (element instanceof _Scene__WEBPACK_IMPORTED_MODULE_2__.Scene) {
            element.gameElements.forEach(function (element) {
                _this.applyResetToStartingValues(element);
            });
        }
        if (element instanceof _Time__WEBPACK_IMPORTED_MODULE_4__.Time || element instanceof _Event__WEBPACK_IMPORTED_MODULE_3__.Event || element instanceof _Loop__WEBPACK_IMPORTED_MODULE_5__.LoopEnd || element instanceof _Loop__WEBPACK_IMPORTED_MODULE_5__.LoopBeginning || element instanceof Operation) {
            element.resetToStartingValues();
        }
    };
    Operation.prototype.resetToStartingValues = function () {
    };
    return Operation;
}());

var OperationObject = /** @class */ (function (_super) {
    __extends(OperationObject, _super);
    function OperationObject(levelDesigner, operationToLoad, position, parentScene) {
        var _this = _super.call(this, levelDesigner, position, parentScene) || this;
        _this.operand = operationToLoad;
        _this.widthHeight = [50, 40];
        _this.clickRadius = 20;
        _this.addMouseClickListener();
        _this.addUIElementSprite(new OperationObjectSprite(_this.transform, _this.widthHeight, _this.operand));
        return _this;
    }
    OperationObject.prototype.onMouseDoubleClick = function (mousePos) {
        return console.log(mousePos, 'implement operation object mouse double click');
    };
    OperationObject.prototype.unSelected = function () {
        this.UILineSprite.selected = false;
    };
    // should be serialized, and then created on paste. see Scene
    // copy() {
    //     return this.levelDesigner.addToClipBoard(new OperationObject(this.levelDesigner, this.serialize()));
    // }
    OperationObject.prototype.copyLineSpriteForDragging = function () {
        var draggingSpriteTransform = new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform(null, [this.transform.pos[0], this.transform.pos[1]]);
        return new OperationObjectSprite(draggingSpriteTransform, this.widthHeight, this.operand);
    };
    OperationObject.prototype.serialize = function () {
        return {
            type: "Operation",
            operand: {
                type: this.operand.type,
                factor: this.operand.factor
            }
        };
    };
    OperationObject.prototype.changeOperation = function (newOperand) {
        this.operand = {
            type: newOperand.type,
            factor: newOperand.factor
        };
        this.UILineSprite.operand = this.operand;
    };
    OperationObject.prototype.onMouseClick = function () {
        this.levelDesigner.operationSelected(this);
        this.UILineSprite.selected = true;
    };
    return OperationObject;
}(_UI_Element__WEBPACK_IMPORTED_MODULE_0__.UIElement));

var OperationObjectSprite = /** @class */ (function (_super) {
    __extends(OperationObjectSprite, _super);
    function OperationObjectSprite(transform, widthHeight, operand) {
        var _this = _super.call(this, transform) || this;
        _this.operand = operand;
        _this.widthHeight = widthHeight;
        _this.selected = false;
        return _this;
    }
    OperationObjectSprite.prototype.draw = function (ctx) {
        var pos = this.transform.pos;
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        this.drawFunction(ctx);
        ctx.restore();
    };
    OperationObjectSprite.prototype.drawFunction = function (ctx) {
        var h = this.widthHeight[1];
        var w = this.widthHeight[0];
        ctx.fillStyle = "tomato";
        if (this.selected)
            ctx.fillStyle = "#419ef0";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.font = "10px Arial";
        ctx.fillText(this.operand.type, 2, h / 2);
        ctx.fillText(String(this.operand.factor), 2, 4 * h / 4);
    };
    return OperationObjectSprite;
}(_line_sprite__WEBPACK_IMPORTED_MODULE_6__.LineSprite));



/***/ }),

/***/ "./src/game_engine/Levels/DesignElements/Scene.ts":
/*!********************************************************!*\
  !*** ./src/game_engine/Levels/DesignElements/Scene.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Scene: () => (/* binding */ Scene),
/* harmony export */   SceneObject: () => (/* binding */ SceneObject),
/* harmony export */   SceneSprite: () => (/* binding */ SceneSprite)
/* harmony export */ });
/* harmony import */ var _UI_Element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../UI_Element */ "./src/game_engine/UI_Element.ts");
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../transform */ "./src/game_engine/transform.ts");
/* harmony import */ var _Loop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Loop */ "./src/game_engine/Levels/DesignElements/Loop.ts");
/* harmony import */ var _line_sprite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../line_sprite */ "./src/game_engine/line_sprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




// there will have to be an ancestor scene that holds all the scenes and stuffs
var Scene = /** @class */ (function () {
    function Scene(name, parentScene, gameElements, currentElementIndex) {
        this.parentScene = parentScene;
        this.type = "Scene";
        this.name = name || "";
        this.gameElements = gameElements || [];
        this.currentElementIndex = currentElementIndex || 0;
        this.maxLoopId = 0;
        this.loopsToClose = [];
    }
    Scene.prototype.update = function (dT) {
        var _a;
        if (!this.isOnlySceneAndCompleted)
            (_a = this.gameElements[this.currentElementIndex]) === null || _a === void 0 ? void 0 : _a.update(dT);
    };
    /*
    stack works I believe
    1 2 2 1 3 4 4 3
    [ [ ] ] [ [ ] ]
    */
    Scene.prototype.createLoopId = function () {
        this.maxLoopId++;
        this.loopsToClose.push(this.maxLoopId);
        return this.maxLoopId;
    };
    Scene.prototype.getLoopId = function () {
        return this.loopsToClose.pop();
    };
    Scene.prototype.goToLoopId = function (loopId) {
        var _this = this;
        this.gameElements.forEach(function (element, idx) {
            if (element instanceof _Loop__WEBPACK_IMPORTED_MODULE_2__.LoopBeginning && loopId === element.loopId) {
                _this.currentElementIndex = idx;
            }
        });
    };
    Scene.prototype.nextElement = function () {
        if (this.currentElementIndex < this.gameElements.length - 1) {
            this.currentElementIndex++;
        }
        else {
            // to get it to loop indefinitely, add a flag in the future.. 
            // but I can't think of a case where I would want that since I can use loops instead
            if (this.parentScene) {
                this.currentElementIndex = 0;
                this.parentScene.nextElement();
            }
            else {
                this.isOnlySceneAndCompleted = true;
            }
        }
    };
    return Scene;
}());

var SceneObject = /** @class */ (function (_super) {
    __extends(SceneObject, _super);
    function SceneObject(levelDesigner, name, parentScene, position) {
        var _this = _super.call(this, levelDesigner, position, parentScene) || this;
        // i'll have to create the game elements from the serialized data
        _this.gameElementObjects = [];
        _this.expanded = false;
        _this.widthHeight = [40, 40];
        _this.name = name || "Scene";
        _this.addUIElementSprite(new SceneSprite(name, _this.transform, _this.widthHeight));
        _this.clickRadius = 20;
        _this.addMouseClickListener();
        _this.addMouseDoubleClickListener();
        return _this;
    }
    SceneObject.prototype.expandScene = function () {
        this.expanded = true;
        this.UILineSprite.expanded = true;
        this.levelDesigner.expandScene(this);
    };
    SceneObject.prototype.unExpandScene = function () {
        this.levelDesigner.unExpandScene(this);
    };
    SceneObject.prototype.copyLineSpriteForDragging = function () {
        var draggingSpriteTransform = new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform(null, [this.transform.pos[0], this.transform.pos[1]]);
        return new SceneSprite(this.name, draggingSpriteTransform, this.widthHeight);
    };
    // copy() {
    // which scene will be the parent?
    // where will it be when you copy? same spot?
    // maybe I serialize it for copying, then on Paste I actually instantiate the new scene
    // where it belongs?
    //     return this.levelDesigner.addToClipBoard(new SceneObject(this.levelDesigner, ...this.serialize()));
    // }
    SceneObject.prototype.loadGameElements = function (serializedGameElements) {
        this.gameElementObjects = this.levelDesigner.loadGameElements(serializedGameElements, this);
    };
    SceneObject.prototype.serialize = function () {
        return {
            type: "Scene",
            name: this.name,
            serializedGameElements: this.gameElementObjects.map(function (element) { return element.serialize(); }),
        };
    };
    SceneObject.prototype.onMouseClick = function () {
        this.levelDesigner.sceneSelected(this);
        this.UILineSprite.selected = true;
    };
    SceneObject.prototype.onMouseDoubleClick = function () {
        this.expanded ? this.unExpandScene() : this.expandScene();
    };
    SceneObject.prototype.selected = function () {
        this.UILineSprite.selected = true;
    };
    SceneObject.prototype.unSelected = function () {
        this.UILineSprite.selected = false;
    };
    SceneObject.prototype.deleteYourShit = function () {
        this.gameElementObjects.forEach(function (element) {
            element.delete();
        });
    };
    SceneObject.prototype.removeGameElement = function (element) {
        var index = this.gameElementObjects.indexOf(element);
        if (index !== -1)
            this.gameElementObjects.splice(index, 1);
    };
    return SceneObject;
}(_UI_Element__WEBPACK_IMPORTED_MODULE_0__.UIElement));

var SceneSprite = /** @class */ (function (_super) {
    __extends(SceneSprite, _super);
    function SceneSprite(name, transform, widthHeight) {
        var _this = _super.call(this, transform) || this;
        _this.name = name;
        _this.widthHeight = widthHeight;
        _this.selected = false;
        _this.expanded = false;
        return _this;
    }
    SceneSprite.prototype.draw = function (ctx) {
        var pos = this.transform.pos;
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        this.drawFunction(ctx);
        ctx.restore();
    };
    SceneSprite.prototype.drawFunction = function (ctx) {
        var h = this.widthHeight[1];
        var w = this.widthHeight[0];
        ctx.fillStyle = "#d3d3d3";
        if (this.selected)
            ctx.fillStyle = "#419ef0";
        if (this.expanded)
            ctx.fillStyle = "#A020F0";
        // I can add lines to the top and sides to show that it's expanded
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.font = "10px Arial";
        ctx.fillText(this.name, 2, h / 2);
        if (this.expanded) {
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#FFFFFF";
            ctx.beginPath();
            ctx.moveTo(0, h);
            ctx.lineTo(0, 0);
            ctx.lineTo(w, 0);
            ctx.lineTo(w, h);
            ctx.stroke();
        }
    };
    return SceneSprite;
}(_line_sprite__WEBPACK_IMPORTED_MODULE_3__.LineSprite));



/***/ }),

/***/ "./src/game_engine/Levels/DesignElements/Spawn.ts":
/*!********************************************************!*\
  !*** ./src/game_engine/Levels/DesignElements/Spawn.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Spawn: () => (/* binding */ Spawn),
/* harmony export */   isEnemyType: () => (/* binding */ isEnemyType)
/* harmony export */ });
/* harmony import */ var _GEOWarsScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../GEOWarsScript */ "./src/GEOWarsScript.ts");
/* harmony import */ var _StrikeTimeScript__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../StrikeTimeScript */ "./src/StrikeTimeScript.ts");


function isEnemyType(value) {
    return ['BoxBox', 'Arrow', 'Grunt', 'Pinwheel', 'Weaver', 'Singularity', 'RANDOM'].includes(value);
}
var Spawn = /** @class */ (function () {
    function Spawn(spawnData, gameEngine) {
        this.type = spawnData.type;
        this.location = spawnData.location;
        this.gameEngine = gameEngine;
        this.numberToGenerate = spawnData.numberToGenerate;
        //  spawn: {
        //     type: 'RANDOM',
        //     location: 'RANDOM',
        //     possibleSpawns: ['Weaver', 'Grunt']
        //     angle: 'PI/3'
        // }
    }
    // start with known positions entered first, 
    // then we can easily add random and the buttons needed for that
    // these random functions should be in the Event class I think
    Spawn.prototype.randomPosition = function () {
        return [
            _GEOWarsScript__WEBPACK_IMPORTED_MODULE_0__.DIM_X * 0.95 * Math.random(),
            _GEOWarsScript__WEBPACK_IMPORTED_MODULE_0__.DIM_Y * 0.90 * Math.random(),
        ];
    };
    Spawn.prototype.randomMob = function () {
        return this.possibleSpawns[Math.floor(Math.random() * this.possibleSpawns.length) % this.possibleSpawns.length];
    };
    Spawn.prototype.spawnEvent = function (numberFactor, isShipRelative) {
        var numberToGenerate = Math.trunc(this.numberToGenerate * numberFactor) || 1;
        for (var i = 0; i < numberToGenerate; i++) {
            var mobToSpawn = this.type;
            var location_1 = void 0;
            if (mobToSpawn === 'RANDOM') {
                mobToSpawn = this.randomMob();
            }
            if (this.location === 'RANDOM') {
                location_1 = this.randomPosition();
            }
            else {
                location_1 = [Number(this.location[0]), Number(this.location[1])];
                if (isShipRelative) {
                    location_1[0] += this.gameEngine.activeCamera.transform.pos[0] - _GEOWarsScript__WEBPACK_IMPORTED_MODULE_0__.DIM_X / 2;
                    location_1[1] += this.gameEngine.activeCamera.transform.pos[1] - _GEOWarsScript__WEBPACK_IMPORTED_MODULE_0__.DIM_Y / 2;
                    // check if off edge of map
                    if (location_1[0] > _GEOWarsScript__WEBPACK_IMPORTED_MODULE_0__.DIM_X - 100) {
                        location_1[0] = _GEOWarsScript__WEBPACK_IMPORTED_MODULE_0__.DIM_X - 100;
                    }
                    else if (location_1[0] < 100) {
                        location_1[0] = 100;
                    }
                    if (location_1[1] > _GEOWarsScript__WEBPACK_IMPORTED_MODULE_0__.DIM_Y - 100) {
                        location_1[1] = _GEOWarsScript__WEBPACK_IMPORTED_MODULE_0__.DIM_Y - 100;
                    }
                    else if (location_1[1] < 0 + 100) {
                        location_1[1] = 0 + 100;
                    }
                }
            }
            // TODO: maybe get this to work without casting
            // but likely not worth the effort
            if (this.gameEngine.gameScript instanceof _GEOWarsScript__WEBPACK_IMPORTED_MODULE_0__.GEOWarsScript)
                this.gameEngine.gameScript.gameObjectCreatorMap.get(mobToSpawn)(location_1);
            if (this.gameEngine.gameScript instanceof _StrikeTimeScript__WEBPACK_IMPORTED_MODULE_1__.StrikeTimeScript)
                this.gameEngine.gameScript.gameObjectCreatorMap.get(mobToSpawn)(location_1);
        }
    };
    Spawn.prototype.serialize = function () {
        return {
            type: this.type,
            angle: this.angle,
            location: this.location,
            possibleSpawns: this.possibleSpawns,
            numberToGenerate: this.numberToGenerate,
        };
    };
    return Spawn;
}());



/***/ }),

/***/ "./src/game_engine/Levels/DesignElements/Time.ts":
/*!*******************************************************!*\
  !*** ./src/game_engine/Levels/DesignElements/Time.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Time: () => (/* binding */ Time),
/* harmony export */   TimeObject: () => (/* binding */ TimeObject),
/* harmony export */   TimeObjectSprite: () => (/* binding */ TimeObjectSprite)
/* harmony export */ });
/* harmony import */ var _UI_Element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../UI_Element */ "./src/game_engine/UI_Element.ts");
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../transform */ "./src/game_engine/transform.ts");
/* harmony import */ var _line_sprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../line_sprite */ "./src/game_engine/line_sprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



// wait times
var Time = /** @class */ (function () {
    function Time(parentScene, waitTime) {
        this.type = "Time";
        this.parentScene = parentScene;
        this.waitTime = waitTime;
        this.timeFactor = 1;
        this.time = 0;
        this.startingValues = {
            time: 0,
            waitTime: waitTime,
            timeFactor: 1,
        };
    }
    // I'll have to make sure pausing doesn't fuck this up
    Time.prototype.update = function (dT) {
        // maybe I just check if it's paused?
        this.time += dT;
        if (this.time >= this.waitTime * this.timeFactor) {
            this.endOperation();
        }
    };
    Time.prototype.applyNewTimeFactor = function (factor) {
        this.timeFactor *= factor;
    };
    Time.prototype.resetToStartingValues = function () {
        this.time = this.startingValues.time;
        this.waitTime = this.startingValues.waitTime;
        this.timeFactor = this.startingValues.timeFactor;
    };
    Time.prototype.endOperationReset = function () {
        this.time = this.startingValues.time;
        this.waitTime = this.startingValues.waitTime;
        // keep time factor
    };
    Time.prototype.endOperation = function () {
        this.endOperationReset();
        // this will have to be the scene it's in I think
        this.parentScene.nextElement();
    };
    return Time;
}());

// UIElement
var TimeObject = /** @class */ (function (_super) {
    __extends(TimeObject, _super);
    function TimeObject(levelDesigner, waitTime, position, parentScene) {
        var _this = _super.call(this, levelDesigner, position, parentScene) || this;
        _this.waitTime = waitTime;
        _this.widthHeight = [50, 40];
        _this.clickRadius = 20;
        _this.addMouseClickListener();
        _this.addUIElementSprite(new TimeObjectSprite(_this.transform, _this.waitTime, _this.widthHeight));
        return _this;
    }
    TimeObject.prototype.onMouseDoubleClick = function () { };
    TimeObject.prototype.unSelected = function () {
        this.UILineSprite.selected = false;
    };
    TimeObject.prototype.copy = function () {
        // this stuff is wrong anyway
        // return this.levelDesigner.addToClipBoard(new TimeObject(this.levelDesigner, this.serialize()));
    };
    TimeObject.prototype.copyLineSpriteForDragging = function () {
        var draggingSpriteTransform = new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform(null, [this.transform.pos[0], this.transform.pos[1]]);
        return new TimeObjectSprite(draggingSpriteTransform, this.waitTime, this.widthHeight);
    };
    TimeObject.prototype.serialize = function () {
        return {
            type: "Time",
            waitTime: this.waitTime,
        };
    };
    TimeObject.prototype.changeTime = function (newTime) {
        this.waitTime = newTime;
        this.UILineSprite.waitTime = newTime;
    };
    TimeObject.prototype.onMouseClick = function () {
        this.levelDesigner.timeSelected(this);
        this.UILineSprite.selected = true;
    };
    return TimeObject;
}(_UI_Element__WEBPACK_IMPORTED_MODULE_0__.UIElement));

var TimeObjectSprite = /** @class */ (function (_super) {
    __extends(TimeObjectSprite, _super);
    function TimeObjectSprite(transform, waitTime, widthHeight) {
        var _this = _super.call(this, transform) || this;
        _this.waitTime = waitTime;
        _this.widthHeight = widthHeight;
        _this.selected = false;
        return _this;
    }
    TimeObjectSprite.prototype.draw = function (ctx) {
        var pos = this.transform.pos;
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        this.drawFunction(ctx);
        ctx.restore();
    };
    TimeObjectSprite.prototype.drawFunction = function (ctx) {
        var h = this.widthHeight[1];
        var w = this.widthHeight[0];
        ctx.fillStyle = "#A020F0";
        if (this.selected)
            ctx.fillStyle = "#419ef0";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.font = "10px Arial";
        ctx.fillText(this.waitTime.toString(), 2, h / 2);
    };
    return TimeObjectSprite;
}(_line_sprite__WEBPACK_IMPORTED_MODULE_2__.LineSprite));



/***/ }),

/***/ "./src/game_engine/Levels/GEOLevelDesigner.ts":
/*!****************************************************!*\
  !*** ./src/game_engine/Levels/GEOLevelDesigner.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GEOLevelDesigner: () => (/* binding */ GEOLevelDesigner),
/* harmony export */   isEnemyTypeArray: () => (/* binding */ isEnemyTypeArray)
/* harmony export */ });
/* harmony import */ var _game_objects_walls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_objects/walls */ "./src/game_objects/walls.ts");
/* harmony import */ var _LevelDesign_EnemyPlacer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LevelDesign/EnemyPlacer */ "./src/game_engine/Levels/LevelDesign/EnemyPlacer.ts");
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../transform */ "./src/game_engine/transform.ts");
/* harmony import */ var _DesignElements_Spawn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DesignElements/Spawn */ "./src/game_engine/Levels/DesignElements/Spawn.ts");
/* harmony import */ var _GEOWarsScript__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../GEOWarsScript */ "./src/GEOWarsScript.ts");
/* harmony import */ var _LevelDesigner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LevelDesigner */ "./src/game_engine/Levels/LevelDesigner.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

// import { Grid } from "../../game_objects/particles/Grid/grid";





// I should collect placed enemies
// check if array of enemyType
function isEnemyTypeArray(value) {
    return !value.some(function (type) { return (!(0,_DesignElements_Spawn__WEBPACK_IMPORTED_MODULE_3__.isEnemyType)(type)); });
}
// Perhaps level designer should be an extension of game script with connection to the
// timeline UI and the animation window
// for a tracker I can highlight the current game element
// just like selecting it... but maybe the same color for 
// all of them 
var GEOLevelDesigner = /** @class */ (function (_super) {
    __extends(GEOLevelDesigner, _super);
    function GEOLevelDesigner(engine, animationView, levelDesignerCtx, serializedGame) {
        var _this = _super.call(this, engine, animationView, levelDesignerCtx, serializedGame) || this;
        _this.transform = new _transform__WEBPACK_IMPORTED_MODULE_2__.Transform();
        _this.transform = new _transform__WEBPACK_IMPORTED_MODULE_2__.Transform();
        // might not need the ship now that I'm using cameras
        _this.ship = {
            transform: new _transform__WEBPACK_IMPORTED_MODULE_2__.Transform()
        };
        _this.lastTime = 0;
        return _this;
    }
    GEOLevelDesigner.prototype.openLevelDesigner = function () {
        var _this = this;
        this.engine.addMouseEventListener(this);
        this.engine.activeCamera.transform.pos[0] = _GEOWarsScript__WEBPACK_IMPORTED_MODULE_4__.DIM_X / 2;
        this.engine.activeCamera.transform.pos[1] = _GEOWarsScript__WEBPACK_IMPORTED_MODULE_4__.DIM_Y / 2;
        var addArrowButton = document.getElementById("Arrow");
        var addGruntButton = document.getElementById("Grunt");
        var addBoxBox = document.getElementById("BoxBox");
        var addPinwheel = document.getElementById("Pinwheel");
        var addWeaver = document.getElementById("Weaver");
        var addSingularity = document.getElementById("Singularity");
        // const makeGame = document.getElementById("LevelEditor");
        var makeEventObject = document.getElementById("MakeEvent");
        var addTime = document.getElementById("TimeSubmit");
        var addLoop = document.getElementById("LoopSubmit");
        var addOperation = document.getElementById("OperationSubmit");
        var sceneNameSubmit = document.getElementById("sceneNameSubmit");
        var shipRelative = document.getElementById("shipRelative");
        this.shipRelative = shipRelative;
        var setCoordinate = document.getElementById("changeCoordinates");
        var setRandomCoordinates = document.getElementById("setRandomCoordinates");
        var randomSpawnCoordinate = document.getElementById("randomSpawnCoordinate");
        var saveGameDesign = document.getElementById("saveGameDesign");
        // const loadGameDesign = document.getElementById("loadGameDesign");
        shipRelative.onclick = function (e) {
            e.stopPropagation();
            var value = shipRelative.value;
            console.log(value);
            if (value === "on") {
                shipRelative.value = "off";
                _this.makeCoordinatesShipRelative();
            }
            else {
                shipRelative.value = "on";
                _this.makeCoordinatesArenaRelative();
            }
        };
        setCoordinate.onclick = function (e) {
            var _a;
            e.stopPropagation();
            var x = Number(document.getElementById("xCoordinate").value);
            var y = Number(document.getElementById("yCoordinate").value);
            var angle = Number(document.getElementById("angle").value);
            console.log({ x: x, y: y, angle: angle });
            (_a = _this.currentEnemyPlacer) === null || _a === void 0 ? void 0 : _a.setCoordinates(x, y, angle);
        };
        setRandomCoordinates.onclick = function (e) {
            var _a;
            e.stopPropagation();
            (_a = _this.currentEnemyPlacer) === null || _a === void 0 ? void 0 : _a.setRandomCoordinates();
        };
        randomSpawnCoordinate.onclick = function (e) {
            var _a;
            // should make it so you can only make one
            // this would allow me to find the spawn and change it's value here as well
            e.stopPropagation();
            ((_a = _this.currentEnemyPlacer) === null || _a === void 0 ? void 0 : _a.type) === "RANDOM";
            var selectedEnemies = Array.from(document.getElementById('possibleSpawns').selectedOptions).map(function (_a) {
                var value = _a.value;
                return value;
            });
            if (isEnemyTypeArray(selectedEnemies)) {
                var numberToGenerate = document.getElementById('numberToGenerate').value;
                var newSpawn = {
                    location: 'RANDOM',
                    type: 'RANDOM',
                    possibleSpawns: selectedEnemies,
                    numberToGenerate: Number(numberToGenerate),
                };
                _this.addRandomRandomSpawnToEvent(newSpawn);
            }
        };
        addGruntButton.onclick = function (e) {
            e.stopPropagation();
            var type = "Grunt";
            _this.addLevelGameObject(type);
        };
        addArrowButton.onclick = function (e) {
            e.stopPropagation();
            var type = "Arrow";
            _this.addLevelGameObject(type);
        };
        addBoxBox.onclick = function (e) {
            e.stopPropagation();
            var type = "BoxBox";
            _this.addLevelGameObject(type);
        };
        addPinwheel.onclick = function (e) {
            e.stopPropagation();
            var type = "Pinwheel";
            _this.addLevelGameObject(type);
        };
        addWeaver.onclick = function (e) {
            e.stopPropagation();
            var type = "Weaver";
            _this.addLevelGameObject(type);
        };
        addSingularity.onclick = function (e) {
            e.stopPropagation();
            var type = "Singularity";
            _this.addLevelGameObject(type);
        };
        // makeGame.onclick = (e) => {
        //     e.stopPropagation();
        //     console.log("game editor opened clicked");
        //     this.isLevelDesignerOpened = !this.isLevelDesignerOpened;
        //     this.engine.isLevelDesignerOpened = this.isLevelDesignerOpened;
        // };
        makeEventObject.onclick = function (e) {
            e.stopPropagation();
            _this.UIActionsToRun.push(function () { return _this.makeEventObject(); });
        };
        saveGameDesign.onclick = function (e) {
            e.stopPropagation();
            _this.saveGameDesign('GEOWars', '01');
        };
        sceneNameSubmit.onclick = function (e) {
            e.stopPropagation();
            var name = document.getElementById("sceneName").value;
            _this.UIActionsToRun.push(function () { return _this.makeSceneObject(name); });
        };
        // loadGameDesign.onclick = (e) => {
        //     e.stopPropagation();
        //     const json = document.getElementById("loadGameDesignInput").value;
        //     this.loadGameDesign(json);
        // };
        addTime.onclick = function (e) {
            e.stopPropagation();
            var time = document.getElementById("Time").value;
            _this.UIActionsToRun.push(function () { return _this.makeTime(Number(time)); });
        };
        addOperation.onclick = function (e) {
            e.stopPropagation();
            var operationType = document.getElementById("OperationType").value;
            var operationValue = document.getElementById("OperationFactor").value;
            var operand = {
                type: operationType,
                factor: Number(operationValue),
            };
            _this.UIActionsToRun.push(function () { return _this.makeOperation(operand); });
        };
        // should add a loop next to the currently selected element
        // once I have elements nested under scenes, I'm not sure how this will work
        // maybe it will make one next to the selected scene if nothing else is selected
        addLoop.onclick = function (e) {
            e.stopPropagation();
            var loop = {
                repeatTimes: Number(document.getElementById("Repeats").value),
                // loopIdx: Number(document.getElementById("StartingIndex").value),
            };
            _this.UIActionsToRun.push(function () { return _this.makeLoop(loop); });
        };
        // window.addEventListener("scroll", (e) => {
        //     // get the current mouse position to know if it is within the 
        //     // level editor
        //     // then move the level editor up or down 
        // });
        window.addEventListener("keydown", function (e) {
            var _a;
            e.stopPropagation();
            if (e.key === "Escape") {
                _this.escapePressed();
            }
            if (e.key === "Backspace") {
                if (_this.currentMousePos) {
                    (_a = _this.selectedGameElement) === null || _a === void 0 ? void 0 : _a.delete();
                    _this.leftJustifyGameElements();
                }
                else if (_this.currentEnemyPlacer) {
                    _this.currentEnemyPlacer.removeFromEvent();
                    _this.animationView.clear();
                }
            }
        });
        // this.levelDesignerCtx.addEventListener("dblclick", (e) => {
        //     e.stopPropagation();
        //     console.log("double clicked");
        //     const pos = [e.offsetX, e.offsetY];
        //     this.mouseDoubleClicked(pos);
        // });
    };
    // addToClipBoard(uiElement: UIElement) {
    // }
    GEOLevelDesigner.prototype.startGame = function (GEOWarsScript) {
        this.serializedGame = {
            type: 'Scene',
            name: "Game",
            serializedGameElements: this.baseScene.gameElementObjects.map(function (element) { return element.serialize(); } // set up proper return here
            ),
        };
        this.clearLevelDesignElements();
        var serializedGameString = JSON.stringify(this.serializedGame);
        // I should unselect whatever is selected.
        // events being the main issue since they have things
        // on the game 
        this.clear();
        GEOWarsScript.startGame(serializedGameString);
        this.engine.isLevelDesignerOpened = false;
    };
    GEOLevelDesigner.prototype.clearLevelDesignElements = function () {
        this.engine.gameObjects.filter(function (object) { return object instanceof _LevelDesign_EnemyPlacer__WEBPACK_IMPORTED_MODULE_1__.EnemyPlacer; }).forEach(function (enemyPlacer) { return enemyPlacer.remove(); });
    };
    GEOLevelDesigner.prototype.queueSound = function () { };
    GEOLevelDesigner.prototype.addCollider = function () { };
    GEOLevelDesigner.prototype.addPhysicsComponent = function () { };
    GEOLevelDesigner.prototype.isOutOfBounds = function (pos, radius) {
        var max = [_GEOWarsScript__WEBPACK_IMPORTED_MODULE_4__.DIM_X - radius, _GEOWarsScript__WEBPACK_IMPORTED_MODULE_4__.DIM_Y - radius];
        if (radius) {
            return (pos[0] <= radius ||
                pos[0] >= max[0] ||
                pos[1] <= radius ||
                pos[1] >= max[1]);
        }
        else {
            return (pos[0] < 0 ||
                pos[1] < 0 ||
                pos[0] > _GEOWarsScript__WEBPACK_IMPORTED_MODULE_4__.DIM_X ||
                pos[1] > _GEOWarsScript__WEBPACK_IMPORTED_MODULE_4__.DIM_Y);
        }
    };
    GEOLevelDesigner.prototype.createWalls = function () {
        return new _game_objects_walls__WEBPACK_IMPORTED_MODULE_0__.Walls(this.engine);
    };
    return GEOLevelDesigner;
}(_LevelDesigner__WEBPACK_IMPORTED_MODULE_5__.LevelDesigner));



/***/ }),

/***/ "./src/game_engine/Levels/LevelDesign/EnemyPlacer.ts":
/*!***********************************************************!*\
  !*** ./src/game_engine/Levels/LevelDesign/EnemyPlacer.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EnemyPlacer: () => (/* binding */ EnemyPlacer)
/* harmony export */ });
/* harmony import */ var _game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _PlacingAnimation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PlacingAnimation */ "./src/game_engine/Levels/LevelDesign/PlacingAnimation.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/game_engine/util.ts");
/* harmony import */ var _DesignElements_Event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../DesignElements/Event */ "./src/game_engine/Levels/DesignElements/Event.ts");
/* harmony import */ var _GEOWarsScript__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../GEOWarsScript */ "./src/GEOWarsScript.ts");
// while placing, could do spawning animation over mouse position
// once placed, draw it at the placed location
// store the location
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// maybe I need a nested canvas for the pallet
// load spawn event
// save spawn event
// create spawn event





// if trying to spawn multiple things on top of each other, I should only grab the first placer that is found in the click colission
var getClickRadius = {
    Airport: 10,
    BoxBox: 10,
    Arrow: 10,
    Grunt: 10,
    Pinwheel: 10,
    Weaver: 10,
    Singularity: 10,
    RANDOM: 10,
    AlienShip: 10,
    Aurora: 10,
    Building1: 20,
    TargetBuilding: 20,
    PatriotMissileSite: 20
};
// I can make this generic and include the spawn serialized as the parameter
var EnemyPlacer = /** @class */ (function (_super) {
    __extends(EnemyPlacer, _super);
    function EnemyPlacer(engine, spawnData, event, isLoadingEvent) {
        if (isLoadingEvent === void 0) { isLoadingEvent = false; }
        var _this = _super.call(this, engine) || this;
        var type = spawnData.type, location = spawnData.location, numberToGenerate = spawnData.numberToGenerate, possibleSpawns = spawnData.possibleSpawns, angle = spawnData.angle;
        _this.addLineSprite(_DesignElements_Event__WEBPACK_IMPORTED_MODULE_3__.spriteMap[type](_this.transform));
        _this.event = event;
        _this.clickRadius = getClickRadius[type];
        _this.type = type;
        _this.isPlaced = false;
        if (isLoadingEvent) {
            _this.isPlaced = true;
            if (location === "RANDOM") {
                _this.transform.pos[0] = 500;
                _this.transform.pos[1] = 500;
                _this.serializedSpawn = { type: "RANDOM", location: "RANDOM", numberToGenerate: numberToGenerate, possibleSpawns: possibleSpawns };
                _this.addMouseClickListener();
            }
            else {
                _this.transform.pos[0] = location[0];
                _this.transform.pos[1] = location[1];
                _this.transform.angle = angle;
                _this.serializedSpawn = spawnData;
            }
        }
        else {
            _this.addChildGameObject(new _PlacingAnimation__WEBPACK_IMPORTED_MODULE_1__.PlacingAnimation(engine));
        }
        return _this;
    }
    EnemyPlacer.prototype.place = function () {
        if (this.isPlaced)
            return;
        this.serializedSpawn = {
            type: this.type,
            location: [
                this.transform.pos[0],
                this.transform.pos[1]
            ]
        };
        // this.lineSprite.spawningScale = 1; dont think this does anything
        this.isPlaced = true;
        this.event.enemyPlaced(this.serializedSpawn, this);
        this.removeMousePosListener();
        this.addMouseClickListener();
    };
    EnemyPlacer.prototype.animate = function () { };
    EnemyPlacer.prototype.update = function () { };
    EnemyPlacer.prototype.setCoordinates = function (x, y, angle) {
        var radiansAngle = angle * Math.PI / 180;
        this.transform.pos[0] = x || this.transform.pos[0];
        this.transform.pos[1] = y || this.transform.pos[1];
        this.transform.angle = radiansAngle || this.transform.angle;
        this.serializedSpawn.angle = radiansAngle || this.serializedSpawn.angle;
        this.event.levelDesigner.updateAnimationViewAngle(radiansAngle);
    };
    EnemyPlacer.prototype.setRandomCoordinates = function () {
        this.transform.pos[0] = _GEOWarsScript__WEBPACK_IMPORTED_MODULE_4__.DIM_X * 0.85 * Math.random();
        this.transform.pos[1] = _GEOWarsScript__WEBPACK_IMPORTED_MODULE_4__.DIM_Y * 0.85 * Math.random();
        this.transform.angle = Math.random() * Math.PI * 2;
        this.serializedSpawn.angle = this.transform.angle;
    };
    EnemyPlacer.prototype.eventUnselected = function () {
        this.remove();
    };
    EnemyPlacer.prototype.removeFromEvent = function () {
        if (this.event) {
            this.event.removePlacer(this);
        }
        this.remove();
    };
    EnemyPlacer.prototype.addMouseClickListener = function () {
        this.addClickListener();
    };
    EnemyPlacer.prototype.mouseClicked = function (mousePos) {
        var centerDist = _util__WEBPACK_IMPORTED_MODULE_2__.VectorMath.dist(this.transform.pos, mousePos);
        if (centerDist < this.clickRadius) {
            this.onMouseClick();
        }
    };
    EnemyPlacer.prototype.onMouseClick = function () {
        this.event.enemyPlacerClicked(this);
    };
    return EnemyPlacer;
}(_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));



/***/ }),

/***/ "./src/game_engine/Levels/LevelDesign/PlacingAnimation.ts":
/*!****************************************************************!*\
  !*** ./src/game_engine/Levels/LevelDesign/PlacingAnimation.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlacingAnimation: () => (/* binding */ PlacingAnimation)
/* harmony export */ });
/* harmony import */ var _game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_object */ "./src/game_engine/game_object.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var PlacingAnimation = /** @class */ (function (_super) {
    __extends(PlacingAnimation, _super);
    function PlacingAnimation(engine) {
        var _this = _super.call(this, engine) || this;
        _this.initialSpawningScale = 1.5;
        _this.cycleSpeed = 0.1;
        _this.addClickListener();
        _this.addMousePosListener();
        return _this;
    }
    // Mouse handling should call this I think?
    PlacingAnimation.prototype.placeEnemy = function () {
        this.parentObject.lineSprite.spawningScale = 1;
        this.removeMouseListeners();
        this.parentObject.place();
        this.remove();
    };
    // why is the position not mapping right
    PlacingAnimation.prototype.updateMousePos = function (mousePos) {
        this.parentObject.transform.pos[0] = mousePos[0] + this.gameEngine.activeCamera.transform.pos[0];
        this.parentObject.transform.pos[1] = mousePos[1] + this.gameEngine.activeCamera.transform.pos[1];
    };
    PlacingAnimation.prototype.mouseDoubleClicked = function () {
    };
    PlacingAnimation.prototype.mouseClicked = function () {
        this.placeEnemy();
    };
    PlacingAnimation.prototype.update = function (timeDelta) {
        var cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        if (this.parentObject.lineSprite.spawningScale < 0.7) {
            this.parentObject.lineSprite.spawningScale = this.initialSpawningScale;
        }
        else {
            this.parentObject.lineSprite.spawningScale -=
                this.cycleSpeed * cycleSpeedScale;
        }
    };
    PlacingAnimation.prototype.animate = function () {
    };
    return PlacingAnimation;
}(_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var NORMAL_FRAME_TIME_DELTA = 1000 / 60;


/***/ }),

/***/ "./src/game_engine/Levels/LevelDesigner.ts":
/*!*************************************************!*\
  !*** ./src/game_engine/Levels/LevelDesigner.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LevelDesigner: () => (/* binding */ LevelDesigner)
/* harmony export */ });
/* harmony import */ var _DesignElements_Scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DesignElements/Scene */ "./src/game_engine/Levels/DesignElements/Scene.ts");
/* harmony import */ var _DesignElements_Operation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DesignElements/Operation */ "./src/game_engine/Levels/DesignElements/Operation.ts");
/* harmony import */ var _DesignElements_Time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DesignElements/Time */ "./src/game_engine/Levels/DesignElements/Time.ts");
/* harmony import */ var _DesignElements_Event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DesignElements/Event */ "./src/game_engine/Levels/DesignElements/Event.ts");
/* harmony import */ var _DesignElements_Loop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DesignElements/Loop */ "./src/game_engine/Levels/DesignElements/Loop.ts");
/* harmony import */ var _game_objects_Overlay_overlay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../game_objects/Overlay/overlay */ "./src/game_objects/Overlay/overlay.ts");
/* harmony import */ var _DesignElements_Spawn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DesignElements/Spawn */ "./src/game_engine/Levels/DesignElements/Spawn.ts");
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};







// export interface LevelDesigner extends GameScript {
//     UIElementMouseFollower: GameElementObject;
//     isLevelDesignerOpened: boolean;
//     engine: GameEngine
//     timeSelected: (time: TimeObject) => void;
//     sceneSelected: (sceneObject: SceneObject) => void;
//     expandScene: (sceneObject: SceneObject) => void;
//     openLevelDesigner: () => void;
//     unExpandScene: (sceneObject: SceneObject) => void;
//     operationSelected: (operation: OperationObject) => void;
//     moveLeft: (gameElement: GameElementObject) => void;
//     moveRight: (gameElement: GameElementObject) => void;
//     loopSelected: (gameElement: GameElementObject) => void;
//     addUIElement: (gameElement: GameElementObject) => void;
//     addUIElementSprite: (lineSprite: LineSprite) => void;
//     addMouseClickListener: (uiElement: UIElement) => void;
//     addMouseDoubleClickListener: (uiElement: UIElement) => void;
//     removeMouseClickListener: (uiElement: UIElement) => void;
//     removeMouseDoubleClickListener: (uiElement: UIElement) => void;
//     removeUIElementSprite: (lineSprite: LineSprite) => void;
//     eventLoadShipRelative: (isShipRelative: boolean) => void;
//     // make more generic in the future
//     addingAnotherEnemy: (gameObjectPlacer: EnemyPlacer) => void;
//     enemyPlacerClicked: (gameObjectPlacer: EnemyPlacer) => void;
//     eventSelected: (event: EventObject) => void;
//     eventUnselected: () => void;
//     // what this do?
//     updateAnimationViewAngle: (angle: number) => void;
//     animate: (timeDelta: number) => void;
//     loadGameElements: (serializedGameElements: SerializedGameElement[], sceneObject: SceneObject) => GameElementObject[];
//     downClick: () => void;
//     unClicked: () => void;
//     updateMouseMoveEvent: (e: MouseEvent) => void;
// }
// I can make a new type that adds more fields as needed for genericizing
var LevelDesigner = /** @class */ (function () {
    function LevelDesigner(engine, animationView, levelDesignerCtx, serializedGame) {
        this.DIM_X = 1200;
        this.DIM_Y = 300;
        this.BG_COLOR = "#000000";
        this.overlayText = {
            Location: [0, 0],
            Time: 0,
            Type: "",
            StartingAngle: 0,
        };
        this.overlayTextCleared = true;
        this.isLevelDesignerOpened = false;
        this.engine = engine;
        this.animationView = animationView;
        // I think I need one for the animation window too
        this.ctx = this.engine.ctx;
        this.levelDesignerCtx = levelDesignerCtx;
        this.serializedGame = serializedGame;
        this.UIElementSprites = [];
        // duck typing for scene
        this.expandedScenes = [];
        // this is added to expanded Scenes off the bat. Check addUIElement
        this.baseScene = new _DesignElements_Scene__WEBPACK_IMPORTED_MODULE_0__.SceneObject(this, 'main'); // top level list of game elements
        this.widthHeight = [0, 0];
        this.loopBeginningObjectStackForLoading = [];
        this.animationView = animationView;
        this.levelDesignerCtx = levelDesignerCtx;
        this.UIActionsToRun = [];
        this.gameObjects = [];
        this.lineSprites = [];
        // might not need this:
        this.zoomScale = 1;
        this.lastTime = 0;
        this.animate = this.animate.bind(this);
        this.overlayText = {
            Location: [0, 0],
            Time: 0,
            Type: "",
            StartingAngle: 0,
        };
        this.overlayTextCleared = true;
        // can be scene, time, event, or loo
        this.selectedGameElement;
        this.currentEnemyPlacer;
        this.isLevelDesignerOpened = false;
    }
    LevelDesigner.prototype.startGame = function (gameScript) { console.log('this should be overrided'); };
    LevelDesigner.prototype.openLevelDesigner = function () { console.log('overwrite openLevelDesigner'); };
    LevelDesigner.prototype.makeTime = function (time, parentScene) {
        if (parentScene === void 0) { parentScene = this.expandedScenes[this.expandedScenes.length - 1]; }
        var newElementPosition = this.getNewDrawPosition();
        var timeObject = new _DesignElements_Time__WEBPACK_IMPORTED_MODULE_2__.TimeObject(this, time, newElementPosition, parentScene);
        this.selectedGameElement = timeObject;
        return timeObject;
    };
    LevelDesigner.prototype.makeOperation = function (operand, parentScene) {
        if (parentScene === void 0) { parentScene = this.expandedScenes[this.expandedScenes.length - 1]; }
        var newElementPosition = this.getNewDrawPosition();
        var operationObject = new _DesignElements_Operation__WEBPACK_IMPORTED_MODULE_1__.OperationObject(this, operand, newElementPosition, parentScene);
        operationObject.onMouseClick();
        this.selectedGameElement = operationObject;
        return operationObject;
    };
    LevelDesigner.prototype.mouseDoubleClicked = function (pos) {
        console.log(pos);
    };
    LevelDesigner.prototype.expandScene = function (scene) {
        var _this = this;
        var _a, _b;
        (_a = this.selectedGameElement) === null || _a === void 0 ? void 0 : _a.unSelected();
        this.selectedGameElement = undefined;
        var parentIndex = this.expandedScenes.indexOf(scene.parentScene);
        if (parentIndex !== -1)
            (_b = this.expandedScenes[parentIndex + 1]) === null || _b === void 0 ? void 0 : _b.unExpandScene();
        scene.gameElementObjects.forEach(function (element) {
            element.parentSceneExpanded();
            _this.addUIElementSprite(element.UILineSprite);
        });
        this.expandedScenes.push(scene);
    };
    LevelDesigner.prototype.unExpandScene = function (scene) {
        var expandedIndex = this.expandedScenes.indexOf(scene);
        if (expandedIndex === 0)
            return console.log("can't unexpand the base scene");
        if (expandedIndex === -1)
            return console.log("scene not expanded");
        scene.expanded = false;
        scene.UILineSprite.expanded = false;
        var bottomExpandedScene = this.expandedScenes.pop();
        this.removeExpandedElements(bottomExpandedScene);
        bottomExpandedScene.expanded = false;
        bottomExpandedScene.UILineSprite.expanded = false;
        if (scene !== bottomExpandedScene)
            bottomExpandedScene.parentScene.unExpandScene();
    };
    LevelDesigner.prototype.updateMouseMoveEvent = function (e) {
        if (e.target instanceof HTMLElement && e.target.classList[0] === "level-editor-canvas") {
            this.currentMousePos = [e.offsetX, e.offsetY];
            if (this.UIElementMouseFollower) {
                var moveToPosition = [
                    e.offsetX - this.UIElementMouseFollower.draggingLineSprite.widthHeight[0] / 2,
                    e.offsetY - this.UIElementMouseFollower.draggingLineSprite.widthHeight[1] / 2
                ];
                this.UIElementMouseFollower.draggingLineSprite.transform.pos = __spreadArray([], moveToPosition, true);
                // check if the element is overlapping with another element
                var bottomExpandedScene = this.expandedScenes[this.expandedScenes.length - 1];
                var draggedElementSceneIndex = bottomExpandedScene.gameElementObjects.indexOf(this.UIElementMouseFollower);
                if (draggedElementSceneIndex === -1)
                    return;
                var leftElementIndex = draggedElementSceneIndex - 1;
                var rightElementIndex = draggedElementSceneIndex + 1;
                var draggedElementXPosition = this.UIElementMouseFollower.draggingLineSprite.transform.pos[0];
                var draggedElementWidth = this.UIElementMouseFollower.draggingLineSprite.widthHeight[0];
                // check left element:
                var moved = false;
                if (leftElementIndex >= 0) {
                    var leftElement = bottomExpandedScene.gameElementObjects[leftElementIndex];
                    var leftElementWidth = leftElement.widthHeight[0];
                    var leftElementX = leftElement.transform.pos[0];
                    var leftElementMiddlePosition = leftElementX + leftElementWidth / 2;
                    if (draggedElementXPosition < leftElementMiddlePosition &&
                        draggedElementXPosition + draggedElementWidth > leftElementMiddlePosition) {
                        this.moveLeft(this.UIElementMouseFollower);
                        moved = true;
                        // swap position of ghost element and 
                    }
                }
                // check right:
                if (rightElementIndex < bottomExpandedScene.gameElementObjects.length && moved === false) {
                    var rightElement = bottomExpandedScene.gameElementObjects[rightElementIndex];
                    var rightElementWidth = rightElement.widthHeight[0];
                    var rightElementX = rightElement.transform.pos[0];
                    var rightElementMiddlePosition = rightElementX + rightElementWidth / 2;
                    if (draggedElementXPosition < rightElementMiddlePosition &&
                        draggedElementXPosition + draggedElementWidth > rightElementMiddlePosition) {
                        this.moveRight(this.UIElementMouseFollower);
                        // swap position of ghost element and 
                    }
                }
            }
        }
        else {
            this.currentMousePos = undefined;
        }
    };
    LevelDesigner.prototype.getExpandedScenePosition = function () {
        // expands into next row
    };
    LevelDesigner.prototype.leftJustifyGameElements = function () {
        var _this = this;
        var bottomExpandedScene = this.expandedScenes[this.expandedScenes.length - 1];
        var expandedElements = bottomExpandedScene.gameElementObjects;
        bottomExpandedScene.gameElementObjects = [];
        expandedElements.forEach(function (element) {
            var newPos = _this.getNewDrawPosition();
            element.transform.pos = newPos;
            bottomExpandedScene.gameElementObjects.push(element);
        });
    };
    LevelDesigner.prototype.makeLoop = function (loop, parentScene) {
        if (parentScene === void 0) { parentScene = this.expandedScenes[this.expandedScenes.length - 1]; }
        var beginningObject = new _DesignElements_Loop__WEBPACK_IMPORTED_MODULE_4__.LoopBeginningObject(this, this.getNewDrawPosition(), parentScene);
        var endObject = new _DesignElements_Loop__WEBPACK_IMPORTED_MODULE_4__.LoopEndObject(this, loop, this.getNewDrawPosition(), parentScene);
        beginningObject.endLoopObject = endObject;
        endObject.beginningLoopObject = beginningObject;
    };
    LevelDesigner.prototype.makeLoopBeginning = function (parentScene) {
        var loopBeginning = new _DesignElements_Loop__WEBPACK_IMPORTED_MODULE_4__.LoopBeginningObject(this, this.getNewDrawPosition(), parentScene);
        this.loopBeginningObjectStackForLoading.push(loopBeginning);
        return loopBeginning;
    };
    LevelDesigner.prototype.makeLoopEnding = function (loop, parentScene) {
        var loopEndObject = new _DesignElements_Loop__WEBPACK_IMPORTED_MODULE_4__.LoopEndObject(this, loop, this.getNewDrawPosition(), parentScene);
        var matchingBeginning = this.loopBeginningObjectStackForLoading.pop();
        matchingBeginning.endLoopObject = loopEndObject;
        loopEndObject.beginningLoopObject = matchingBeginning;
        return loopEndObject;
    };
    LevelDesigner.prototype.moveLeft = function (UIElement) {
        var gameElements = this.expandedScenes[this.expandedScenes.length - 1].gameElementObjects;
        for (var i = 0; i < gameElements.length; i++) {
            var element = gameElements[i];
            if (element === UIElement) {
                if (i === 0)
                    return;
                var temp = gameElements[i - 1];
                gameElements[i - 1] = UIElement;
                gameElements[i] = temp;
                this.swapAdjacentPositions(temp, UIElement);
            }
        }
    };
    LevelDesigner.prototype.moveRight = function (UIElement) {
        var gameElements = this.expandedScenes[this.expandedScenes.length - 1].gameElementObjects;
        for (var i = 0; i < gameElements.length; i++) {
            var currentElement = gameElements[i];
            if (currentElement === UIElement) {
                if (i === gameElements.length - 1)
                    return;
                var temp = gameElements[i + 1];
                gameElements[i + 1] = UIElement;
                gameElements[i] = temp;
                this.swapAdjacentPositions(UIElement, temp);
                return;
            }
        }
    };
    LevelDesigner.prototype.saveGameDesign = function (game, levelName) {
        var serializedGameElements = this.baseScene.gameElementObjects.map(function (element) { return element.serialize(); });
        // TODO
        // I should name it after the game itself, that way both games can load this way
        // might as well add a level name too
        this.serializedGame = {
            type: "Scene",
            name: "".concat(game, ": ").concat(levelName),
            serializedGameElements: serializedGameElements,
        };
        console.log(JSON.stringify(this.serializedGame));
    };
    LevelDesigner.prototype.loadGameDesign = function (json) {
        var serializedGame = JSON.parse(json);
        this.serializedGame = serializedGame;
        this.baseScene = new _DesignElements_Scene__WEBPACK_IMPORTED_MODULE_0__.SceneObject(this, 'main');
        this.expandedScenes = [this.baseScene];
        this.baseScene.gameElementObjects = this.loadGameElements(serializedGame.serializedGameElements, this.baseScene);
    };
    LevelDesigner.prototype.loadGameElements = function (serializedGameElements, parentScene) {
        var _this = this;
        return serializedGameElements.map(function (serializedElement) {
            if (serializedElement.type === "Scene") {
                // might be broken, not sure if should be visible or not
                var newScene = _this.makeSceneObject(serializedElement.name, true, parentScene);
                _this.expandedScenes.push(newScene);
                newScene.gameElementObjects = _this.loadGameElements(serializedElement.serializedGameElements, newScene) || [];
                newScene.unExpandScene();
                return newScene;
            }
            else if (serializedElement.type === "Event") {
                return _this.makeEventObject(serializedElement, parentScene);
            }
            else if (serializedElement.type === "Time") {
                return _this.makeTime(serializedElement.waitTime, parentScene);
            }
            else if (serializedElement.type === "LoopBeginning") {
                return _this.makeLoopBeginning(parentScene);
            }
            else if (serializedElement.type === "LoopEnd") {
                return _this.makeLoopEnding(serializedElement, parentScene);
            }
            else if (serializedElement.type === "Operation") {
                return _this.makeOperation(serializedElement.operand, parentScene);
            }
        });
    };
    LevelDesigner.prototype.makeEventObject = function (eventToLoad, parentScene) {
        var _a;
        if (parentScene === void 0) { parentScene = this.expandedScenes[this.expandedScenes.length - 1]; }
        // should provide this the current scene to know which array of elements to use
        var newElementPosition = this.getNewDrawPosition();
        var event = new _DesignElements_Event__WEBPACK_IMPORTED_MODULE_3__.EventObject(this, eventToLoad, newElementPosition, parentScene);
        (_a = this.selectedGameElement) === null || _a === void 0 ? void 0 : _a.unSelected();
        this.selectedGameElement = event;
        return event;
    };
    LevelDesigner.prototype.swapAdjacentPositions = function (leftUIElement, rightUIElement) {
        var _a;
        var newLeftX = ((_a = leftUIElement === null || leftUIElement === void 0 ? void 0 : leftUIElement.transform) === null || _a === void 0 ? void 0 : _a.pos[0]) || 0;
        var newRightX = newLeftX + (rightUIElement === null || rightUIElement === void 0 ? void 0 : rightUIElement.widthHeight[0]) + 4;
        leftUIElement.transform.pos[0] = newRightX;
        rightUIElement.transform.pos[0] = newLeftX;
    };
    LevelDesigner.prototype.getNewDrawPosition = function () {
        var _a, _b;
        var bottomExpandedScene = this.expandedScenes[this.expandedScenes.length - 1];
        var expandedElements = bottomExpandedScene.gameElementObjects;
        var lastElement = expandedElements[expandedElements.length - 1];
        var lastXPosition = ((_a = lastElement === null || lastElement === void 0 ? void 0 : lastElement.transform) === null || _a === void 0 ? void 0 : _a.pos[0]) || 0;
        var lastYPosition = ((_b = lastElement === null || lastElement === void 0 ? void 0 : lastElement.transform) === null || _b === void 0 ? void 0 : _b.pos[1]) || bottomExpandedScene.widthHeight[1] + bottomExpandedScene.transform.pos[1] + 4;
        var lastWidth = (lastElement === null || lastElement === void 0 ? void 0 : lastElement.widthHeight[0]) || 0;
        return [lastXPosition + lastWidth + 4, lastYPosition];
    };
    LevelDesigner.prototype.makeSceneObject = function (name, visible, parentScene) {
        if (visible === void 0) { visible = true; }
        if (parentScene === void 0) { parentScene = this.expandedScenes[this.expandedScenes.length - 1]; }
        // this should add a box inside either the game sequence as a whole,
        // or inside the current scene
        var newElementPosition;
        if (visible) {
            newElementPosition = this.getNewDrawPosition();
        }
        // sprites are made and added automatically
        return (new _DesignElements_Scene__WEBPACK_IMPORTED_MODULE_0__.SceneObject(this, name, parentScene, newElementPosition));
    };
    LevelDesigner.prototype.loopSelected = function (loop) {
        var _a;
        (_a = this.selectedGameElement) === null || _a === void 0 ? void 0 : _a.unSelected();
        this.selectedGameElement = loop;
    };
    LevelDesigner.prototype.timeSelected = function (time) {
        var _a;
        (_a = this.selectedGameElement) === null || _a === void 0 ? void 0 : _a.unSelected();
        this.selectedGameElement = time;
    };
    LevelDesigner.prototype.operationSelected = function (operation) {
        var _a;
        (_a = this.selectedGameElement) === null || _a === void 0 ? void 0 : _a.unSelected();
        this.selectedGameElement = operation;
    };
    LevelDesigner.prototype.eventSelected = function (event) {
        var _a;
        (_a = this.selectedGameElement) === null || _a === void 0 ? void 0 : _a.unSelected();
        this.selectedGameElement = event;
        this.shipRelative.value = event.isShipRelative.toString();
    };
    LevelDesigner.prototype.eventUnselected = function () {
        var _a;
        (_a = this.currentEnemyPlacer) === null || _a === void 0 ? void 0 : _a.remove();
        this.currentEnemyPlacer = undefined;
    };
    LevelDesigner.prototype.enemyPlacerClicked = function (enemyPlacer) {
        this.animationView.enemyPlacerSelected(enemyPlacer);
        this.currentEnemyPlacer = enemyPlacer;
    };
    LevelDesigner.prototype.sceneDoubleClicked = function (scene) {
        // this should open the array of elements in the scene
        console.log("scene double clicked: ", scene);
        // should move this into scene object
        // this.selectedScene.UILineSprite.selected = false;
        // this.selectedScene = scene;
        // scene.UILineSprite.selected = true;
    };
    LevelDesigner.prototype.sceneSelected = function (scene) {
        var _a;
        (_a = this.selectedGameElement) === null || _a === void 0 ? void 0 : _a.unSelected();
        this.selectedGameElement = scene;
    };
    // getPalletModal() {
    //     const modal = document.getElementById("pallet");
    //     // add functions to buttons of the pallet
    // }
    // enemyPlaced(spawn) {
    //     this.animationView.enemyPlaced(spawn);
    // }
    LevelDesigner.prototype.escapePressed = function () {
        var _a;
        if (this.currentEnemyPlacer && !this.currentEnemyPlacer.isPlaced) {
            (_a = this.currentEnemyPlacer) === null || _a === void 0 ? void 0 : _a.remove();
        }
        this.UIElementSprites.forEach(function (sprite) { return sprite.selected = false; });
        this.animationView.clear();
        this.currentEnemyPlacer = undefined;
    };
    LevelDesigner.prototype.addLevelGameObject = function (type) {
        var _a;
        this.animationView.clear();
        this.animationView.addEnemy(type);
        (_a = this.currentEnemyPlacer) === null || _a === void 0 ? void 0 : _a.remove();
        if (this.selectedGameElement instanceof _DesignElements_Event__WEBPACK_IMPORTED_MODULE_3__.EventObject) {
            this.currentEnemyPlacer = this.selectedGameElement.createEnemyPlacer(type);
        }
        else {
            throw Error('event should be selected to add an enemy');
        }
    };
    LevelDesigner.prototype.updateAnimationViewAngle = function (radiansAngle) {
        this.animationView.gameObjects[0].transform.angle = radiansAngle;
    };
    LevelDesigner.prototype.addingAnotherEnemy = function (enemyPlacer) {
        this.currentEnemyPlacer = enemyPlacer;
    };
    // might be redundent and useless TODO
    LevelDesigner.prototype.downClick = function () {
        this.clickedDown = true;
    };
    LevelDesigner.prototype.unClicked = function () {
        if (this.UIElementMouseFollower) {
            this.UIElementMouseFollower.elementLetGo();
            this.removeUIElementSprite(this.UIElementMouseFollower.draggingLineSprite);
            this.UIElementMouseFollower = null;
        }
        this.clickedDown = false;
    };
    LevelDesigner.prototype.addMouseClickListener = function (object) {
        this.engine.addLevelDesignerClickListener(object);
    };
    LevelDesigner.prototype.addMouseDoubleClickListener = function (object) {
        this.engine.addLevelDesignerDoubleClickListener(object);
    };
    LevelDesigner.prototype.removeMouseClickListener = function (object) {
        this.engine.removeLevelDesignerClickListener(object);
    };
    LevelDesigner.prototype.removeMouseDoubleClickListener = function (object) {
        this.engine.removeLevelDesignerDoubleClickListener(object);
    };
    LevelDesigner.prototype.createOverlay = function () {
        return new _game_objects_Overlay_overlay__WEBPACK_IMPORTED_MODULE_5__.Overlay(this.engine, this);
    };
    LevelDesigner.prototype.animate = function (timeDelta) {
        // it might be cool to animate the tiny enemies in the spawn card
        // this.animateGameObjects(timeDelta);
        this.clearCanvas();
        this.runUIActions();
        this.renderLineSprites(this.levelDesignerCtx);
        this.renderUILineSprites(this.levelDesignerCtx);
        this.renderOverlayText();
    };
    LevelDesigner.prototype.animateGameObjects = function () {
        // this.gameObjects.forEach((object) => {
        //     object.animate(delta);
        // });
    };
    // addToClipBoard(uiElement: UIElement) {
    // }
    LevelDesigner.prototype.clearCanvas = function () {
        this.levelDesignerCtx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
        this.levelDesignerCtx.fillStyle = "#000000";
        this.levelDesignerCtx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
    };
    LevelDesigner.prototype.clear = function () {
        var _this = this;
        var removeList = __spreadArray([], this.gameObjects, true);
        removeList.forEach(function (gameObject) {
            _this.remove(gameObject);
        });
        this.overlayTextCleared = true;
    };
    LevelDesigner.prototype.runUIActions = function () {
        this.UIActionsToRun.forEach(function (action) { return action(); });
        this.UIActionsToRun = [];
    };
    LevelDesigner.prototype.renderLineSprites = function (ctx) {
        ctx.save();
        ctx.scale(this.zoomScale, this.zoomScale);
        this.lineSprites.forEach(function (sprite) {
            sprite.draw(ctx);
        });
        ctx.restore();
    };
    LevelDesigner.prototype.renderUILineSprites = function (ctx) {
        ctx.save();
        this.UIElementSprites.forEach(function (sprite) {
            sprite.draw(ctx);
        });
        ctx.restore();
    };
    LevelDesigner.prototype.addGameObject = function (gameObject) {
        this.gameObjects.push(gameObject);
    };
    LevelDesigner.prototype.renderOverlayText = function () {
        // if(this.overlayTextCleared) return;
        // this.ctx.save();
        // this.ctx.font = 18 + "px " + "Arial";
        // this.ctx.fillStyle = "white";
        // const typeText = "Type: " + this.overlayText.Type;
        // const positionText = "Location: " + this.overlayText.Location;
        // this.ctx.fillText(
        //     typeText,
        //     10,
        //     20
        // );
        // this.ctx.fillText(
        //     positionText,
        //     10,
        //     38
        // );
        // this.ctx.restore();
    };
    LevelDesigner.prototype.remove = function (gameObject) {
        if (gameObject.lineSprite) {
            var lineSpriteIndex = this.lineSprites.indexOf(gameObject.lineSprite);
            if (lineSpriteIndex > -1)
                this.lineSprites.splice(lineSpriteIndex, 1);
        }
        var index = this.gameObjects.indexOf(gameObject);
        if (index !== -1)
            this.gameObjects.splice(index, 1);
    };
    LevelDesigner.prototype.removeExpandedElements = function (expandedScene) {
        var _this = this;
        var UIElements = expandedScene.gameElementObjects;
        UIElements.forEach(function (UIElement) {
            UIElement.parentSceneUnexpanded();
            if (UIElement.UILineSprite) {
                var index = _this.UIElementSprites.indexOf(UIElement.UILineSprite);
                if (index !== -1)
                    _this.UIElementSprites.splice(index, 1);
            }
        });
    };
    LevelDesigner.prototype.removeUIElementSprite = function (UILineSprite) {
        var index = this.UIElementSprites.indexOf(UILineSprite);
        if (index !== -1)
            this.UIElementSprites.splice(index, 1);
    };
    LevelDesigner.prototype.removeUIElement = function (element) {
        var index = this.baseScene.gameElementObjects.indexOf(element);
        if (index !== -1)
            this.baseScene.gameElementObjects.splice(index, 1);
    };
    LevelDesigner.prototype.addUIElementSprite = function (UILineSprite) {
        console.log(UILineSprite);
        this.UIElementSprites.push(UILineSprite);
    };
    LevelDesigner.prototype.addUIElement = function (UIElement) {
        var bottomExpandedScene = this.expandedScenes[this.expandedScenes.length - 1];
        if (!bottomExpandedScene && UIElement instanceof _DesignElements_Scene__WEBPACK_IMPORTED_MODULE_0__.SceneObject) {
            setTimeout(function () { return UIElement.expandScene(); });
            // this.expandedScenes.push(UIElement);
        }
        else {
            bottomExpandedScene.gameElementObjects.push(UIElement);
        }
    };
    LevelDesigner.prototype.addLineSprite = function (lineSprite) {
        this.lineSprites.push(lineSprite);
    };
    LevelDesigner.prototype.makeCoordinatesShipRelative = function () {
        if (this.selectedGameElement instanceof _DesignElements_Event__WEBPACK_IMPORTED_MODULE_3__.EventObject)
            this.selectedGameElement.makeCoordinatesShipRelative();
    };
    LevelDesigner.prototype.eventLoadShipRelative = function (isRelative) {
        if (this.shipRelative) {
            this.shipRelative.checked = isRelative;
        }
    };
    LevelDesigner.prototype.makeCoordinatesArenaRelative = function () {
        var _a;
        if (this.selectedGameElement instanceof _DesignElements_Event__WEBPACK_IMPORTED_MODULE_3__.EventObject)
            (_a = this.selectedGameElement) === null || _a === void 0 ? void 0 : _a.makeCoordinatesArenaRelative();
    };
    // this needs to be generalized. GEOWars adds a spawner, striketime doesn't
    LevelDesigner.prototype.addRandomRandomSpawnToEvent = function (spawnData) {
        var _a;
        if (this.selectedGameElement instanceof _DesignElements_Event__WEBPACK_IMPORTED_MODULE_3__.EventObject) {
            (_a = this.selectedGameElement) === null || _a === void 0 ? void 0 : _a.addRandomRandom(new _DesignElements_Spawn__WEBPACK_IMPORTED_MODULE_6__.Spawn(spawnData, this.engine));
        }
    };
    LevelDesigner.prototype.update = function (deltaTime) { };
    ;
    return LevelDesigner;
}());



/***/ }),

/***/ "./src/game_engine/Levels/StrikeTimeLevelDesigner.ts":
/*!***********************************************************!*\
  !*** ./src/game_engine/Levels/StrikeTimeLevelDesigner.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StrikeTimeLevelDesigner: () => (/* binding */ StrikeTimeLevelDesigner),
/* harmony export */   isEnemyTypeArray: () => (/* binding */ isEnemyTypeArray)
/* harmony export */ });
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transform */ "./src/game_engine/transform.ts");
/* harmony import */ var _DesignElements_Spawn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DesignElements/Spawn */ "./src/game_engine/Levels/DesignElements/Spawn.ts");
/* harmony import */ var _LevelDesign_EnemyPlacer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LevelDesign/EnemyPlacer */ "./src/game_engine/Levels/LevelDesign/EnemyPlacer.ts");
/* harmony import */ var _StrikeTimeScript__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../StrikeTimeScript */ "./src/StrikeTimeScript.ts");
/* harmony import */ var _LevelDesigner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LevelDesigner */ "./src/game_engine/Levels/LevelDesigner.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





// I should collect placed enemies
// check if array of enemyType
function isEnemyTypeArray(value) {
    return !value.some(function (type) { return (!(0,_DesignElements_Spawn__WEBPACK_IMPORTED_MODULE_1__.isEnemyType)(type)); });
}
// Perhaps level designer should be an extension of game script with connection to the
// timeline UI and the animation window
// for a tracker I can highlight the current game element
// just like selecting it... but maybe the same color for 
// all of them 
var StrikeTimeLevelDesigner = /** @class */ (function (_super) {
    __extends(StrikeTimeLevelDesigner, _super);
    function StrikeTimeLevelDesigner(engine, animationView, levelDesignerCtx, serializedGame) {
        var _this = _super.call(this, engine, animationView, levelDesignerCtx, serializedGame) || this;
        _this.transform = new _transform__WEBPACK_IMPORTED_MODULE_0__.Transform();
        return _this;
    }
    StrikeTimeLevelDesigner.prototype.openLevelDesigner = function () {
        var _this = this;
        this.engine.activeCamera.transform.pos[0] = _StrikeTimeScript__WEBPACK_IMPORTED_MODULE_3__.DIM_X / 2;
        this.engine.activeCamera.transform.pos[1] = _StrikeTimeScript__WEBPACK_IMPORTED_MODULE_3__.DIM_Y / 2;
        this.addArrowListeners();
        this.engine.addMouseEventListener(this);
        this.isLevelDesignerOpened = true;
        var makeEventObject = document.getElementById("MakeStrikeEvent");
        var addTime = document.getElementById("TimeSubmitStrikeTime");
        var addLoop = document.getElementById("LoopSubmitStrikeTime");
        var addOperation = document.getElementById("OperationSubmitStrikeTime");
        var sceneNameSubmit = document.getElementById("sceneNameSubmitStrikeTime");
        var shipRelative = document.getElementById("shipRelative");
        var targetBuildingSwitch = document.getElementById("targetBuildingSwitch");
        this.shipRelative = shipRelative;
        var setCoordinate = document.getElementById("changeStrikeTimeCoordinates");
        var addAuroraButton = document.getElementById("Aurora");
        var addPatriotSite = document.getElementById("PatriotSite");
        var addBuilding = document.getElementById("Building");
        var addTargetBuilding = document.getElementById("TargetBuilding");
        var addAirport = document.getElementById("Airport");
        addAuroraButton.onclick = function (e) {
            e.stopPropagation();
            var type = "Aurora";
            _this.addLevelGameObject(type);
        };
        addPatriotSite.onclick = function (e) {
            e.stopPropagation();
            var type = "PatriotMissileSite";
            _this.addLevelGameObject(type);
        };
        addBuilding.onclick = function (e) {
            e.stopPropagation();
            var type = "Building1";
            _this.addLevelGameObject(type);
        };
        addTargetBuilding.onclick = function (e) {
            e.stopPropagation();
            var type = "TargetBuilding";
            _this.addLevelGameObject(type);
        };
        addAirport.onclick = function (e) {
            e.stopPropagation();
            var type = "Airport";
            _this.addLevelGameObject(type);
        };
        var saveGameDesign = document.getElementById("saveGameDesignStrikeTime");
        // const loadGameDesign = document.getElementById("loadGameDesign");
        // we deal with this in the GameView right now because this doesn't have access to the game script
        // const startGame = document.getElementById("startStrikeTimeGame");
        shipRelative.onclick = function (e) {
            e.stopPropagation();
            var value = shipRelative.value;
            console.log(value);
            if (value === "on") {
                shipRelative.value = "off";
                _this.makeCoordinatesShipRelative();
            }
            else {
                shipRelative.value = "on";
                _this.makeCoordinatesArenaRelative();
            }
        };
        targetBuildingSwitch.onclick = function (e) {
            e.stopPropagation();
            var value = shipRelative.value;
            console.log(value);
            if (value === "on") {
                shipRelative.value = "off";
                _this.selectedGameElement;
            }
            else {
                shipRelative.value = "on";
                _this.makeCoordinatesArenaRelative();
            }
        };
        // new BoxBox(this.engine, [300,150]);
        setCoordinate.onclick = function (e) {
            var _a;
            e.stopPropagation();
            var x = Number(document.getElementById("xCoordinateStrikeTime").value);
            var y = Number(document.getElementById("yCoordinateStrikeTime").value);
            var angle = Number(document.getElementById("angleStrikeTime").value);
            console.log({ x: x, y: y, angle: angle });
            (_a = _this.currentEnemyPlacer) === null || _a === void 0 ? void 0 : _a.setCoordinates(x, y, angle);
        };
        // makeGame.onclick = (e) => {
        //     e.stopPropagation();
        //     console.log("game editor opened clicked");
        //     this.isLevelDesignerOpened = !this.isLevelDesignerOpened;
        //     this.engine.isLevelDesignerOpened = this.isLevelDesignerOpened;
        // };
        makeEventObject.onclick = function (e) {
            e.stopPropagation();
            _this.UIActionsToRun.push(function () { return _this.makeEventObject(); });
        };
        saveGameDesign.onclick = function (e) {
            e.stopPropagation();
            // will need text box for this in the future
            _this.saveGameDesign('StrikeTime', '01');
        };
        sceneNameSubmit.onclick = function (e) {
            e.stopPropagation();
            var name = document.getElementById("sceneName").value;
            _this.UIActionsToRun.push(function () { return _this.makeSceneObject(name); });
        };
        // loadGameDesign.onclick = (e) => {
        //     e.stopPropagation();
        //     const json = document.getElementById("loadGameDesignInput").value;
        //     this.loadGameDesign(json);
        // };
        addTime.onclick = function (e) {
            e.stopPropagation();
            var time = document.getElementById("Time").value;
            _this.UIActionsToRun.push(function () { return _this.makeTime(Number(time)); });
        };
        addOperation.onclick = function (e) {
            e.stopPropagation();
            var operationType = document.getElementById("OperationType").value;
            var operationValue = document.getElementById("OperationFactor").value;
            var operand = {
                type: operationType,
                factor: Number(operationValue),
            };
            _this.UIActionsToRun.push(function () { return _this.makeOperation(operand); });
        };
        // should add a loop next to the currently selected element
        // once I have elements nested under scenes, I'm not sure how this will work
        // maybe it will make one next to the selected scene if nothing else is selected
        addLoop.onclick = function (e) {
            e.stopPropagation();
            var loop = {
                repeatTimes: Number(document.getElementById("Repeats").value),
                // loopIdx: Number(document.getElementById("StartingIndex").value),
            };
            _this.UIActionsToRun.push(function () { return _this.makeLoop(loop); });
        };
        // window.addEventListener("scroll", (e) => {
        //     // get the current mouse position to know if it is within the 
        //     // level editor
        //     // then move the level editor up or down 
        // });
        window.addEventListener("keydown", function (e) {
            var _a;
            e.stopPropagation();
            if (e.key === "Escape") {
                _this.escapePressed();
            }
            if (e.key === "Backspace") {
                if (_this.currentMousePos) {
                    (_a = _this.selectedGameElement) === null || _a === void 0 ? void 0 : _a.delete();
                    _this.leftJustifyGameElements();
                }
                else if (_this.currentEnemyPlacer) {
                    _this.currentEnemyPlacer.removeFromEvent();
                    _this.animationView.clear();
                }
            }
        });
    };
    StrikeTimeLevelDesigner.prototype.addArrowListeners = function () {
        this.engine.addLeftArrowListener(this);
        this.engine.addRightArrowListener(this);
        this.engine.addDownArrowListener(this);
        this.engine.addUpArrowListener(this);
    };
    StrikeTimeLevelDesigner.prototype.updateLeftArrowListener = function (pressed) {
        this.engine.activeCamera.transform.pos[0] -= 15;
    };
    StrikeTimeLevelDesigner.prototype.updateUpArrowListener = function (pressed) {
        this.engine.activeCamera.transform.pos[1] -= 15;
    };
    StrikeTimeLevelDesigner.prototype.updateRightArrowListener = function (pressed) {
        this.engine.activeCamera.transform.pos[0] += 15;
    };
    StrikeTimeLevelDesigner.prototype.updateDownArrowListener = function (pressed) {
        this.engine.activeCamera.transform.pos[1] += 15;
    };
    // there's two start buttons
    // one directly from the first modal
    // the second within the level editor
    StrikeTimeLevelDesigner.prototype.startGame = function (strikeTimeGameScript) {
        this.serializedGame = {
            type: 'Scene',
            name: "Game",
            serializedGameElements: this.baseScene.gameElementObjects.map(function (element) { return element.serialize(); }),
        };
        this.clearLevelDesignElements();
        var serializedGameString = JSON.stringify(this.serializedGame);
        this.clear();
        // I should unselect whatever is selected.
        // events being the main issue since they have things
        // on the game 
        strikeTimeGameScript.startGame(serializedGameString);
        this.engine.isLevelDesignerOpened = false;
        var strikeTimeLevelCreator = document.getElementById("StrikeTimeLevelEditor");
        var geoWarsLevelCreator = document.getElementById('GEOWarsLevelEditor');
        var levelEditorCanvas = document.getElementById('LevelEditorCanvas');
        geoWarsLevelCreator.style.display = "none";
        strikeTimeLevelCreator.style.display = "none";
        levelEditorCanvas.style.display = "none";
    };
    StrikeTimeLevelDesigner.prototype.clearLevelDesignElements = function () {
        this.engine.gameObjects.filter(function (object) { return object instanceof _LevelDesign_EnemyPlacer__WEBPACK_IMPORTED_MODULE_2__.EnemyPlacer; }).forEach(function (enemyPlacer) { return enemyPlacer.remove(); });
    };
    return StrikeTimeLevelDesigner;
}(_LevelDesigner__WEBPACK_IMPORTED_MODULE_4__.LevelDesigner));



/***/ }),

/***/ "./src/game_engine/SpriteEditor/DrawingGridSprite.ts":
/*!***********************************************************!*\
  !*** ./src/game_engine/SpriteEditor/DrawingGridSprite.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DrawingGridSprite: () => (/* binding */ DrawingGridSprite)
/* harmony export */ });
/* harmony import */ var _SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../SpriteEditorScript */ "./src/SpriteEditorScript.ts");
/* harmony import */ var _line_sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../line_sprite */ "./src/game_engine/line_sprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var DrawingGridSprite = /** @class */ (function (_super) {
    __extends(DrawingGridSprite, _super);
    function DrawingGridSprite(transform) {
        return _super.call(this, transform) || this;
    }
    DrawingGridSprite.prototype.draw = function (ctx) {
        var pos = this.transform.absolutePosition();
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        var blurFactor = 0.5;
        this.drawXLines(ctx);
        this.drawYLines(ctx);
        ctx.restore();
    };
    DrawingGridSprite.prototype.drawXLines = function (ctx) {
        _SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__.DIM_X;
        _SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__.DIM_Y;
        var xLineCount = 36;
        var xLineIncrement = _SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__.DIM_Y / xLineCount;
        for (var i = 0; i < xLineCount; i++) {
            ctx.beginPath();
            if (i % 3 === 0) {
                ctx.strokeStyle = "#606060";
                if (i === 18) {
                    ctx.strokeStyle = "#808080";
                }
                ctx.setLineDash([]);
            }
            else {
                ctx.strokeStyle = "#808080";
                ctx.setLineDash([1, (_SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__.DIM_X - 121) / 120]);
            }
            ctx.moveTo(0, 0 + i * xLineIncrement);
            ctx.lineTo(_SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__.DIM_X, 0 + i * xLineIncrement);
            ctx.stroke();
        }
    };
    DrawingGridSprite.prototype.drawYLines = function (ctx) {
        _SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__.DIM_X;
        _SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__.DIM_Y;
        var yLineCount = 20;
        var yLineIncrement = _SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__.DIM_X / yLineCount;
        for (var i = 0; i < yLineCount; i++) {
            if (i === 10) {
                ctx.strokeStyle = "#FFFFFF";
                ctx.beginPath();
                ctx.setLineDash([1, (_SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__.DIM_Y - 73) / 72]);
                ctx.moveTo(0 + i * yLineIncrement, 0);
                ctx.lineTo(0 + i * yLineIncrement, _SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__.DIM_X);
                ctx.stroke();
            }
            else {
                ctx.strokeStyle = "#808080";
                ctx.beginPath();
                ctx.setLineDash([1, (_SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__.DIM_Y - 73) / 72]);
                ctx.moveTo(0 + i * yLineIncrement, 0);
                ctx.lineTo(0 + i * yLineIncrement, _SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__.DIM_X);
                ctx.stroke();
            }
        }
    };
    return DrawingGridSprite;
}(_line_sprite__WEBPACK_IMPORTED_MODULE_1__.LineSprite));



/***/ }),

/***/ "./src/game_engine/SpriteEditor/Point.ts":
/*!***********************************************!*\
  !*** ./src/game_engine/SpriteEditor/Point.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Arc: () => (/* binding */ Arc),
/* harmony export */   ArcData: () => (/* binding */ ArcData),
/* harmony export */   BezierCurve: () => (/* binding */ BezierCurve),
/* harmony export */   BezierCurveData: () => (/* binding */ BezierCurveData),
/* harmony export */   Circle: () => (/* binding */ Circle),
/* harmony export */   CircleData: () => (/* binding */ CircleData),
/* harmony export */   PlacingPoint: () => (/* binding */ PlacingPoint),
/* harmony export */   Point: () => (/* binding */ Point),
/* harmony export */   PointData: () => (/* binding */ PointData)
/* harmony export */ });
/* harmony import */ var _SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../SpriteEditorScript */ "./src/SpriteEditorScript.ts");
/* harmony import */ var _game_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _line_sprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../line_sprite */ "./src/game_engine/line_sprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var PlacingPoint = /** @class */ (function (_super) {
    __extends(PlacingPoint, _super);
    function PlacingPoint(engine) {
        var _this = _super.call(this, engine) || this;
        _this.addLineSprite(new PlacingPointSprite(_this.transform));
        _this.addClickListener();
        _this.addMousePosListener();
        return _this;
    }
    PlacingPoint.prototype.updateMousePos = function (mousePos) {
        var distancePerIncrement = _SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__.DIM_Y / 72;
        var xPosIncremented = Math.round((mousePos[0] + _SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__.DIM_X / 2) / distancePerIncrement) * distancePerIncrement;
        var yPosIncremented = Math.round((mousePos[1] + _SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__.DIM_Y / 2) / distancePerIncrement) * distancePerIncrement;
        this.transform.pos[0] = xPosIncremented;
        this.transform.pos[1] = yPosIncremented;
    };
    PlacingPoint.prototype.mouseDoubleClicked = function () {
    };
    PlacingPoint.prototype.update = function (timeDelta) {
    };
    PlacingPoint.prototype.animate = function () {
    };
    return PlacingPoint;
}(_game_object__WEBPACK_IMPORTED_MODULE_1__.GameObject));

var PlacingPointSprite = /** @class */ (function (_super) {
    __extends(PlacingPointSprite, _super);
    function PlacingPointSprite(transform) {
        return _super.call(this, transform) || this;
    }
    PlacingPointSprite.prototype.draw = function (ctx) {
        var pos = this.transform.absolutePosition();
        ctx.save();
        this.drawPlacingPoint(ctx, [pos[0], pos[1]]);
        ctx.restore();
    };
    PlacingPointSprite.prototype.drawPlacingPoint = function (ctx, pos) {
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#702963";
        ctx.beginPath();
        ctx.arc(pos[0], pos[1], 3, 0, 2 * Math.PI);
        ctx.stroke();
    };
    return PlacingPointSprite;
}(_line_sprite__WEBPACK_IMPORTED_MODULE_2__.LineSprite));
var Point = /** @class */ (function () {
    function Point(pos) {
        this.pos = [pos[0], pos[1]];
    }
    return Point;
}());

var BezierCurve = /** @class */ (function () {
    function BezierCurve(pos) {
        this.isBeingPlaced = true;
        this.startPos = pos ? [pos[0], pos[1]] : null;
        this.placingWhichPoint = pos ? 'end' : 'start';
    }
    BezierCurve.prototype.isDrawable = function () {
        return Boolean(this.startPos && this.endPos && this.controlPoint1 && this.controlPoint2);
    };
    BezierCurve.prototype.placePoint = function (pos) {
        switch (this.placingWhichPoint) {
            case "start":
                this.startPos = [pos[0], pos[1]];
                this.placingWhichPoint = 'end';
                break;
            case "end": // start is entered on creation, so end is next
                this.endPos = [pos[0], pos[1]];
                this.placingWhichPoint = 'controlPoint1';
                break;
            case "controlPoint1":
                // I should also place the mirrored point
                this.controlPoint1 = [pos[0], pos[1]];
                this.placingWhichPoint = 'controlPoint2';
                break;
            case "controlPoint2":
                this.controlPoint2 = [pos[0], pos[1]];
                this.placingWhichPoint = 'controlPoint1';
                break;
        }
    };
    return BezierCurve;
}());

var Arc = /** @class */ (function () {
    function Arc(pos) {
        this.isBeingPlaced = true;
        this.counterClockwise = true;
        this.startPos = pos ? [pos[0], pos[1]] : null;
        this.placingWhichPoint = pos ? 'end' : 'start';
    }
    Arc.prototype.flip = function () {
        this.arcDrawData.counterClockwise = !this.arcDrawData.counterClockwise;
    };
    Arc.prototype.isDrawable = function () {
        return Boolean(this.startPos && this.endPos && this.centerPoint);
    };
    Arc.prototype.placePoint = function (pos) {
        switch (this.placingWhichPoint) {
            case "start":
                this.startPos = [pos[0], pos[1]];
                this.placingWhichPoint = 'end';
                break;
            case "end": // start is entered on creation, so end is next
                this.endPos = [pos[0], pos[1]];
                this.placingWhichPoint = 'centerPoint';
                break;
            case "centerPoint":
                var phantomPointPosition = [pos[0], pos[1]];
                var startPos = this.startPos;
                var endPos = this.endPos;
                var midPoint = [
                    (startPos[0] + endPos[0]) / 2, (startPos[1] + endPos[1]) / 2
                ];
                var inverseSlope = -(endPos[0] - startPos[0]) / (endPos[1] - startPos[1]);
                var y_position = void 0;
                var centerPoint = void 0;
                if (inverseSlope === Number.NEGATIVE_INFINITY || inverseSlope === Number.POSITIVE_INFINITY) {
                    centerPoint = [midPoint[0], phantomPointPosition[1]];
                }
                else {
                    y_position = inverseSlope * (phantomPointPosition[0] - midPoint[0]) + midPoint[1];
                    centerPoint = [phantomPointPosition[0], y_position];
                }
                // y = slope * (x - x1) + y1
                // distance from start point to center point
                // Ah right, I need the point along the line that goes through the center point
                var radius = Math.sqrt(Math.pow((startPos[0] - centerPoint[0]), 2) + Math.pow((startPos[1] - centerPoint[1]), 2));
                var startAngle = Math.atan2((startPos[1] - centerPoint[1]), startPos[0] - centerPoint[0]);
                var endAngle = Math.atan2((endPos[1] - centerPoint[1]), endPos[0] - centerPoint[0]);
                this.arcDrawData = {
                    counterClockwise: this.counterClockwise,
                    centerPoint: centerPoint,
                    radius: radius,
                    startAngle: startAngle,
                    endAngle: endAngle,
                };
                this.placingWhichPoint = 'start';
                break;
        }
    };
    return Arc;
}());

var Circle = /** @class */ (function () {
    function Circle(centerPoint, radius) {
        this.isBeingPlaced = true;
        this.pointBeingPlaced = 'center';
        if (centerPoint && radius) {
            this.centerPoint = [centerPoint[0], centerPoint[1]];
            this.radius = radius;
        }
    }
    Circle.prototype.getRadius = function (pos) {
        if (!this.centerPoint)
            throw Error('should have center already');
        var _a = this.centerPoint, c_x = _a[0], c_y = _a[1];
        var p_x = pos[0], p_y = pos[1];
        return Math.sqrt(Math.pow((c_x - p_x), 2) + Math.pow((c_y - p_y), 2));
    };
    Circle.prototype.placingPoint = function (pos) {
        switch (this.pointBeingPlaced) {
            case "center":
                this.centerPoint = [pos[0], pos[1]];
                this.pointBeingPlaced = 'radius';
                break;
            case "radius":
                this.radius = this.getRadius(pos);
                this.pointBeingPlaced = 'done';
                this.isBeingPlaced = false;
                break;
        }
    };
    return Circle;
}());

var CircleData = /** @class */ (function () {
    function CircleData(centerPoint, radius) {
        this.centerPoint = [centerPoint[0], -centerPoint[1]];
        this.radius = radius;
    }
    return CircleData;
}());

var BezierCurveData = /** @class */ (function () {
    function BezierCurveData(startPos, endPos, controlPoint1, controlPoint2) {
        this.startPos = [startPos[0], -startPos[1]];
        this.endPos = [endPos[0], -endPos[1]];
        this.controlPoint1 = [controlPoint1[0], -controlPoint1[1]];
        this.controlPoint2 = [controlPoint2[0], -controlPoint2[1]];
    }
    return BezierCurveData;
}());

var ArcData = /** @class */ (function () {
    function ArcData(arcData) {
        var startAngle = arcData.startAngle, endAngle = arcData.endAngle, centerPoint = arcData.centerPoint, counterClockwise = arcData.counterClockwise, radius = arcData.radius, startPos = arcData.startPos, endPos = arcData.endPos;
        this.startPos = [startPos[0], -startPos[1]];
        this.endPos = [endPos[0], -endPos[1]];
        this.centerPoint = [centerPoint[0], -centerPoint[1]];
        this.radius = radius;
        this.counterClockwise = counterClockwise;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }
    return ArcData;
}());

var PointData = /** @class */ (function () {
    function PointData(point) {
        this.point = [point[0], -point[1]];
    }
    return PointData;
}());



/***/ }),

/***/ "./src/game_engine/SpriteEditor/SpriteEditor.ts":
/*!******************************************************!*\
  !*** ./src/game_engine/SpriteEditor/SpriteEditor.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SpriteEditor: () => (/* binding */ SpriteEditor)
/* harmony export */ });
/* harmony import */ var _SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../SpriteEditorScript */ "./src/SpriteEditorScript.ts");
/* harmony import */ var _game_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _line_sprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../line_sprite */ "./src/game_engine/line_sprite.ts");
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../transform */ "./src/game_engine/transform.ts");
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Point */ "./src/game_engine/SpriteEditor/Point.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





// place points until loop completed or escape selected
// then complete the line 
// this should keep track of what's on the screen I guess?
var SpriteEditor = /** @class */ (function (_super) {
    __extends(SpriteEditor, _super);
    function SpriteEditor(engine) {
        var _this = _super.call(this, engine) || this;
        _this.points = [];
        _this.currentMousePos = [0, 0];
        _this.pointGroupsForLines = [];
        _this.addLineSprite(new SpriteEditorSprite(new _transform__WEBPACK_IMPORTED_MODULE_3__.Transform(), _this.pointGroupsForLines, _this.currentMousePos, _this));
        _this.addLKeyListener();
        _this.addKKeyListener();
        _this.addJKeyListener();
        _this.addFKeyListener();
        _this.addSKeyListener();
        _this.addBKeyListener();
        _this.addMKeyListener();
        _this.addCKeyListener();
        _this.addOKeyListener();
        _this.addClickListener();
        return _this;
    }
    // L to start placing new line, will end current line and start new one
    // K to remove last added point. If last point in line, the line is removed and point placing is ended
    // J to end point placing
    // M to choose the mirrored version of control point1 for control point2
    // O to start adding a circle. Ends the line currently being entered
    // C to start placing or end placing an Arc.
    // B to start placing or end placing Bezier curve. 
    // L to start placing new line, will end current line and start new one
    SpriteEditor.prototype.updateLKeyListener = function (pressed) {
        if (pressed) {
            if (this.isPlacingPoint) {
                // in case there is any more cleanup work needed
                // in the future I guess
                this.endPointPlacement();
            }
            this.isPlacingPoint = true;
            this.placingPoint = new _Point__WEBPACK_IMPORTED_MODULE_4__.PlacingPoint(this.gameEngine);
            this.currentLineGroup = [];
            this.pointGroupsForLines.push(this.currentLineGroup);
        }
    };
    // O to start adding a circle. Ends the line currently being entered
    SpriteEditor.prototype.updateOKeyListener = function (pressed) {
        if (pressed) {
            if (this.isPlacingPoint)
                this.endPointPlacement();
            this.isPlacingPoint = true;
            this.isPlacingCircle = true;
            this.placingPoint = new _Point__WEBPACK_IMPORTED_MODULE_4__.PlacingPoint(this.gameEngine);
            this.currentLineGroup = [];
            this.pointGroupsForLines.push(this.currentLineGroup);
            this.circleBeingPlaced = new _Point__WEBPACK_IMPORTED_MODULE_4__.Circle();
            this.currentLineGroup.push(this.circleBeingPlaced);
        }
    };
    SpriteEditor.prototype.updateFKeyListener = function (pressed) {
        if (pressed) {
            if (this.isPlacingArc) {
                this.arcBeingPlaced.counterClockwise = !this.arcBeingPlaced.counterClockwise;
            }
        }
    };
    // K to remove last added point. If last point in line, the line is removed and point placing is ended
    SpriteEditor.prototype.updateKKeyListener = function (pressed) {
        if (pressed) {
            this.isPlacingPoint = true;
            var lastPlacedPoint = this.currentLineGroup.pop();
            if (lastPlacedPoint instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.BezierCurve) {
                this.isPlacingBezierCurve = false;
                this.bezierCurveBeingPlaced = null;
            }
            if (this.currentLineGroup.length === 0) {
                this.endPointPlacement();
            }
        }
    };
    // M to choose the mirrored version of control point1 for control point2
    SpriteEditor.prototype.updateMKeyListener = function (pressed) {
        if (pressed && this.isPlacingBezierCurve && this.bezierCurveBeingPlaced.placingWhichPoint === 'controlPoint2' && this.bezierCurveBeingPlaced.mirroredValue) {
            this.bezierCurveBeingPlaced.controlPoint2 = [this.bezierCurveBeingPlaced.mirroredValue[0], this.bezierCurveBeingPlaced.mirroredValue[1]];
            this.updateBKeyListener(pressed);
        }
    };
    // B to start placing or end placing Bezier curve. 
    SpriteEditor.prototype.updateBKeyListener = function (pressed) {
        var _this = this;
        if (pressed && !this.isPlacingPoint) {
        }
        else if (pressed && !this.isPlacingBezierCurve) {
            if (!this.isPlacingPoint) {
                // this should never happen... must be old code
                this.placingPoint = new _Point__WEBPACK_IMPORTED_MODULE_4__.PlacingPoint(this.gameEngine);
                this.currentLineGroup = [];
                this.pointGroupsForLines.push(this.currentLineGroup);
            }
            this.isPlacingPoint = true;
            this.isPlacingBezierCurve = true;
            var lastEnteredPoint = this.currentLineGroup[this.currentLineGroup.length - 1];
            var startPosition = void 0;
            if (lastEnteredPoint instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Point) {
                startPosition = [lastEnteredPoint.pos[0], lastEnteredPoint.pos[1]];
            }
            else if (lastEnteredPoint instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.BezierCurve || lastEnteredPoint instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Arc) {
                startPosition = [lastEnteredPoint.endPos[0], lastEnteredPoint.endPos[1]];
            }
            this.bezierCurveBeingPlaced = new _Point__WEBPACK_IMPORTED_MODULE_4__.BezierCurve(startPosition);
            this.currentLineGroup.push(this.bezierCurveBeingPlaced);
        }
        else if (pressed && this.isPlacingBezierCurve && this.bezierCurveBeingPlaced.isDrawable()) {
            this.isPlacingBezierCurve = false;
            this.bezierCurveBeingPlaced.isBeingPlaced = false;
            if (this.currentLineGroup.slice(0, this.currentLineGroup.length - 1).find(function (point) { return ((point instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Point &&
                point.pos[0] === _this.bezierCurveBeingPlaced.endPos[0] &&
                point.pos[1] === _this.bezierCurveBeingPlaced.endPos[1]) || (point instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.BezierCurve || point instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Arc) && ((point.startPos[0] === _this.bezierCurveBeingPlaced.endPos[0] &&
                point.startPos[1] === _this.bezierCurveBeingPlaced.endPos[1]) || (
            // on second thought, it should never be the end position.. but maybe that's fine
            point.endPos[0] === _this.bezierCurveBeingPlaced.endPos[0] &&
                point.endPos[1] === _this.bezierCurveBeingPlaced.endPos[1]))); })) {
                this.endPointPlacement();
            }
            this.bezierCurveBeingPlaced = null;
        }
    };
    // C to start placing or end placing an Arc.
    SpriteEditor.prototype.updateCKeyListener = function (pressed) {
        var _this = this;
        if (pressed && !this.isPlacingPoint) {
        }
        else if (pressed && !this.isPlacingArc) {
            if (!this.isPlacingPoint) {
                // this should never happen... must be old code
                this.placingPoint = new _Point__WEBPACK_IMPORTED_MODULE_4__.PlacingPoint(this.gameEngine);
                this.currentLineGroup = [];
                this.pointGroupsForLines.push(this.currentLineGroup);
            }
            this.isPlacingPoint = true;
            this.isPlacingArc = true;
            var lastEnteredPoint = this.currentLineGroup[this.currentLineGroup.length - 1];
            var startPosition = void 0;
            if (lastEnteredPoint instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Point) {
                startPosition = [lastEnteredPoint.pos[0], lastEnteredPoint.pos[1]];
            }
            else if (lastEnteredPoint instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.BezierCurve || lastEnteredPoint instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Arc) {
                startPosition = [lastEnteredPoint.endPos[0], lastEnteredPoint.endPos[1]];
            }
            this.arcBeingPlaced = new _Point__WEBPACK_IMPORTED_MODULE_4__.Arc(startPosition);
            this.currentLineGroup.push(this.arcBeingPlaced);
        }
        else if (pressed && this.isPlacingArc && this.arcBeingPlaced.isDrawable()) {
            this.isPlacingArc = false;
            this.arcBeingPlaced.isBeingPlaced = false;
            if (this.currentLineGroup.slice(0, this.currentLineGroup.length - 1).find(function (point) { return ((point instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Point &&
                point.pos[0] === _this.arcBeingPlaced.endPos[0] &&
                point.pos[1] === _this.arcBeingPlaced.endPos[1]) || (point instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.BezierCurve || point instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Arc) && ((point.startPos[0] === _this.arcBeingPlaced.endPos[0] &&
                point.startPos[1] === _this.arcBeingPlaced.endPos[1]) || (
            // on second thought, it should never be the end position.. but maybe that's fine
            point.endPos[0] === _this.arcBeingPlaced.endPos[0] &&
                point.endPos[1] === _this.arcBeingPlaced.endPos[1]))); })) {
                this.endPointPlacement();
            }
            this.arcBeingPlaced = null;
        }
    };
    // J to end point placing
    SpriteEditor.prototype.updateJKeyListener = function (pressed) {
        if (pressed) {
            this.endPointPlacement();
        }
    };
    SpriteEditor.prototype.pointTransformation = function (pos) {
        return [
            Math.round((pos[0] - _SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__.DIM_X / 2) / (_SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__.DIM_X / 120)),
            Math.round((pos[1] - _SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__.DIM_Y / 2) / (_SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__.DIM_Y / 72))
        ];
    };
    // left and right arrow to move between the line groups
    // backspace to delete them
    // when saved, each line group gets a placeholder for a name
    SpriteEditor.prototype.updateSKeyListener = function (pressed) {
        var _this = this;
        // maybe I don't need to parameterize by width and height
        // like... what exactly has that done for me so far
        // if it was just to make it easier to enter... this will be easier anyway
        // okay on third thought, I think I do need a scaling parameter, 
        // but only one for the entire thing to make it easier to size later
        var mappedPoints = this.pointGroupsForLines.map(function (pointGroup) { return pointGroup.map(function (point) {
            if (point instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Point) {
                return new _Point__WEBPACK_IMPORTED_MODULE_4__.PointData(_this.pointTransformation(point.pos));
            }
            else if (point instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.BezierCurve) {
                var dataToPutIn = {
                    startPos: _this.pointTransformation(point.startPos),
                    endPos: _this.pointTransformation(point.endPos),
                    controlPoint1: _this.pointTransformation(point.controlPoint1),
                    controlPoint2: _this.pointTransformation(point.controlPoint2),
                };
                return new _Point__WEBPACK_IMPORTED_MODULE_4__.BezierCurveData(dataToPutIn.startPos, dataToPutIn.endPos, dataToPutIn.controlPoint1, dataToPutIn.controlPoint2);
            }
            else if (point instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Circle) {
                var centerPoint = _this.pointTransformation(point.centerPoint);
                var radius = Math.round((point.radius) / (_SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__.DIM_X / 120));
                return new _Point__WEBPACK_IMPORTED_MODULE_4__.CircleData(centerPoint, radius);
            }
            else if (point instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Arc) {
                var _a = point.arcDrawData, startAngle = _a.startAngle, endAngle = _a.endAngle, centerPoint = _a.centerPoint, counterClockwise = _a.counterClockwise, radius = _a.radius;
                var startPos = point.startPos, endPos = point.endPos;
                return new _Point__WEBPACK_IMPORTED_MODULE_4__.ArcData({
                    startPos: _this.pointTransformation(startPos),
                    endPos: _this.pointTransformation(endPos),
                    startAngle: -startAngle,
                    endAngle: -endAngle,
                    centerPoint: _this.pointTransformation(centerPoint),
                    counterClockwise: counterClockwise,
                    radius: Math.round((radius) / (_SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__.DIM_X / 120)),
                });
            }
        }); });
        if (pressed && this.pointGroupsForLines.length > 0) {
            // put save logic here
            var stringToSave_1 = '(ctx: CanvasRenderingContext2D) { \n\tctx.strokeStyle = "";\n\tctx.lineWidth = 2;\n\tconst s = 1;\n\tconst pos = this.transform.absolutePosition();\n\tctx.translate(pos[0], pos[1]);\n\n';
            // find biggest X value
            // find smallest X value
            // find difference to get width
            // same with height for Y
            var pointPairsForLines_1 = [];
            mappedPoints.forEach(function (pointGroup, idx) {
                var stringStart = "";
                var firstPointInFirstLine;
                var firstPoint = pointGroup[0];
                if (firstPoint instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.PointData) {
                    stringStart =
                        "\t// Piece ".concat(idx + 1, ": \n\tctx.beginPath();\n\tctx.moveTo(").concat(firstPoint.point[0], " * s, ").concat(firstPoint.point[1], " * s);\n");
                    firstPointInFirstLine = [firstPoint.point[0], firstPoint.point[1]];
                }
                else if (firstPoint instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.CircleData) {
                    stringStart =
                        "\t// Piece ".concat(idx + 1, ": \n\tctx.beginPath();\n\tctx.arc(").concat(firstPoint.centerPoint[0], " * s, ").concat(firstPoint.centerPoint[1], " * s, ").concat(firstPoint.radius, " * s, 0,2*Math.PI);\n");
                }
                else if (firstPoint instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.BezierCurveData) {
                    stringStart =
                        "\t// Piece ".concat(idx + 1, ": \n\tctx.beginPath();\n\tctx.moveTo(").concat(firstPoint.startPos[0], " * s, ").concat(firstPoint.startPos[1], " * s);\n\tctx.bezierCurveto(\n\t\t").concat(firstPoint.controlPoint1[0], " * s, ").concat(firstPoint.controlPoint1[1], " * s,\n\t\t").concat(firstPoint.controlPoint2[0], " * s, ").concat(firstPoint.controlPoint2[1], " * s,\n\t\t").concat(firstPoint.endPos[0], " * s, ").concat(firstPoint.endPos[1], " * s\n\t);\n");
                    firstPointInFirstLine = [firstPoint.endPos[0], firstPoint.endPos[1]];
                }
                else if (firstPoint instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.ArcData) {
                    stringStart =
                        "\t// Piece ".concat(idx + 1, ": \n\tctx.beginPath();\n\tctx.arc(").concat(firstPoint.centerPoint[0], " * s, ").concat(firstPoint.centerPoint[1], " * s, ").concat(firstPoint.radius, " * s, ").concat(firstPoint.startAngle, ", ").concat(firstPoint.endAngle, ", ").concat(firstPoint.counterClockwise, ");\n");
                }
                // I should create the point pairs here... assuming they are lines
                // I should grab the start point of bezier curve and have that be the end
                // point of a line if it is
                // and I should grab the end point of a bezier curve if it is the start point
                // of a new line 
                var restOfPoints = pointGroup.slice(1);
                var destructedLinesSection;
                // this will be true when the first point is a point or a bezier curve
                // i need to account for the case where there's two bezier curves... okay
                // I think I should just handle bezier curves at this point lol
                // it shouldn't be too ridiculous
                if (firstPointInFirstLine) {
                    destructedLinesSection = 'createDeathAnimationObjects() {\n\tconst color = "rgb(255, 255, 255)"\n\tconst lineWidth = 1.5;\n';
                    destructedLinesSection += "\tnew DeathAnimationLineObject(\n\t\tthis.gameEngine,\n\t\t[this.transform.pos[0], this.transform.pos[1]],\n\t\tthis.transform.angle,\n\t\t[line1Point1,\n";
                    "line1Point2], color, lineWidth);";
                }
                var lines = restOfPoints.reduce(function (acc, point) {
                    var newLine = '';
                    if (point instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.PointData) {
                        newLine =
                            "\tctx.lineTo(".concat(point.point[0], " * s, ").concat(point.point[1], " * s);\n");
                        if (firstPointInFirstLine) {
                            pointPairsForLines_1.push([
                                [firstPointInFirstLine[0], firstPointInFirstLine[1]],
                                [point.point[0], point.point[1]]
                            ]);
                            firstPointInFirstLine = null;
                        }
                        else if (true) {
                        }
                    }
                    else if (point instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.CircleData) {
                        console.error('there shouldnt be a circle here, since circles are their own part');
                    }
                    else if (point instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.BezierCurveData) {
                        // start of the curve should be the last point
                        newLine =
                            "\tctx.bezierCurveto(\n\t\t".concat(point.controlPoint1[0], " * s, ").concat(point.controlPoint1[1], " * s,\n\t\t").concat(point.controlPoint2[0], " * s, ").concat(point.controlPoint2[1], " * s,\n\t\t").concat(point.endPos[0], " * s, ").concat(point.endPos[1], " * s\n\t);\n");
                    }
                    else if (point instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.ArcData) {
                        newLine =
                            "\tctx.arc(".concat(point.centerPoint[0], " * s, ").concat(point.centerPoint[1], " * s, ").concat(point.radius, " * s, ").concat(point.startAngle, ", ").concat(point.endAngle, ", ").concat(point.counterClockwise, ");\n");
                    }
                    return acc.concat(newLine);
                }, '');
                var stringEnd = "\tctx.stroke();\n";
                stringToSave_1 += stringStart + lines + stringEnd;
            });
            stringToSave_1 += '}';
            pointPairsForLines_1.forEach(function () {
            });
            console.log(stringToSave_1);
            // will have to transform all the points to the correct coordinates
            // add all the instructions
        }
    };
    SpriteEditor.prototype.mouseClicked = function (mousePos) {
        if (this.isPlacingPoint) {
            var distancePerIncrement = _SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__.DIM_Y / 72;
            var xPosIncremented = Math.round(mousePos[0] / distancePerIncrement) * distancePerIncrement;
            var yPosIncremented = Math.round(mousePos[1] / distancePerIncrement) * distancePerIncrement;
            this.placePoint([xPosIncremented, yPosIncremented]);
        }
    };
    SpriteEditor.prototype.endPointPlacement = function () {
        this.placingPoint.remove();
        if (this.isPlacingBezierCurve)
            this.currentLineGroup.pop();
        if (this.isPlacingArc)
            this.currentLineGroup.pop();
        if (this.isPlacingCircle)
            this.currentLineGroup.pop();
        this.bezierCurveBeingPlaced = null;
        this.circleBeingPlaced = null;
        this.arcBeingPlaced = null;
        this.placingPoint = null;
        this.isPlacingPoint = false;
        this.isPlacingCircle = false;
        this.isPlacingBezierCurve = false;
        this.isPlacingArc = false;
        this.currentLineGroup = [];
    };
    SpriteEditor.prototype.placePoint = function (pointPosition) {
        var _this = this;
        if (this.isPlacingCircle) {
            this.circleBeingPlaced.placingPoint(pointPosition);
            if (this.circleBeingPlaced.pointBeingPlaced === 'done') {
                // this should move to where the bezier curve does the same thing?
                this.isPlacingCircle = false;
                this.endPointPlacement();
            }
        }
        else if (this.isPlacingBezierCurve) {
            this.bezierCurveBeingPlaced.placePoint(pointPosition);
        }
        else if (this.isPlacingArc) {
            this.arcBeingPlaced.placePoint(pointPosition);
            if (this.arcBeingPlaced.placingWhichPoint === 'start') {
                this.isPlacingArc = false;
                this.arcBeingPlaced.isBeingPlaced = false;
                if (this.currentLineGroup.slice(0, this.currentLineGroup.length - 1).find(function (point) { return ((point instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Point &&
                    point.pos[0] === _this.arcBeingPlaced.endPos[0] &&
                    point.pos[1] === _this.arcBeingPlaced.endPos[1]) || (point instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.BezierCurve || point instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Arc) && ((point.startPos[0] === _this.arcBeingPlaced.endPos[0] &&
                    point.startPos[1] === _this.arcBeingPlaced.endPos[1]) || (
                // on second thought, it should never be the end position.. but maybe that's fine
                point.endPos[0] === _this.arcBeingPlaced.endPos[0] &&
                    point.endPos[1] === _this.arcBeingPlaced.endPos[1]))); })) {
                    this.endPointPlacement();
                }
                this.arcBeingPlaced = null;
            }
        }
        else if (this.currentLineGroup.find(function (point) { return ((point instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Point &&
            point.pos[0] === pointPosition[0] &&
            point.pos[1] === pointPosition[1]) || (point instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.BezierCurve || point instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Arc) && ((point.startPos[0] === pointPosition[0] &&
            point.startPos[1] === pointPosition[1]) || (
        // on second thought, it should never be the end position.. but maybe that's fine
        point.endPos[0] === pointPosition[0] &&
            point.endPos[1] === pointPosition[1]))); })) {
            this.currentLineGroup.push(new _Point__WEBPACK_IMPORTED_MODULE_4__.Point(pointPosition));
            this.endPointPlacement();
        }
        else {
            this.currentLineGroup.push(new _Point__WEBPACK_IMPORTED_MODULE_4__.Point(pointPosition));
        }
    };
    SpriteEditor.prototype.updateMousePos = function (mousePos) {
        this.currentMousePos[0] = mousePos[0];
        this.currentMousePos[1] = mousePos[1];
    };
    SpriteEditor.prototype.update = function () {
    };
    SpriteEditor.prototype.animate = function () {
    };
    return SpriteEditor;
}(_game_object__WEBPACK_IMPORTED_MODULE_1__.GameObject));

var SpriteEditorSprite = /** @class */ (function (_super) {
    __extends(SpriteEditorSprite, _super);
    function SpriteEditorSprite(transform, pointGroupsForLines, currentMousePos, spriteEditor) {
        var _this = _super.call(this, transform) || this;
        _this.pointGroupsForLines = pointGroupsForLines;
        _this.mousePosition = currentMousePos;
        _this.spriteEditor = spriteEditor;
        return _this;
    }
    SpriteEditorSprite.prototype.draw = function (ctx) {
        ctx.save();
        this.drawLines(ctx);
        ctx.restore();
    };
    SpriteEditorSprite.prototype.drawLines = function (ctx) {
        var _a, _b, _c;
        var currentLineGroup = this.spriteEditor.currentLineGroup;
        var phantomPointPosition = (_c = (_b = (_a = this.spriteEditor) === null || _a === void 0 ? void 0 : _a.placingPoint) === null || _b === void 0 ? void 0 : _b.transform) === null || _c === void 0 ? void 0 : _c.pos;
        this.pointGroupsForLines.forEach(function (points) {
            if (points.length <= 1 && points[0] instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Point) {
            }
            else {
                ctx.strokeStyle = '#00FFFF';
                ctx.lineWidth = 2;
                ctx.beginPath();
                if (points[0] instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Point) {
                    ctx.moveTo(points[0].pos[0], points[0].pos[1]);
                }
                if (points[0] instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.BezierCurve) {
                    if (!points[0].isBeingPlaced) {
                        ctx.moveTo(points[0].startPos[0], points[0].startPos[1]);
                        ctx.bezierCurveTo(points[0].controlPoint1[0], points[0].controlPoint1[1], points[0].controlPoint2[0], points[0].controlPoint2[1], points[0].endPos[0], points[0].endPos[1]);
                    }
                }
                if (points[0] instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Arc) {
                    if (!points[0].isBeingPlaced) {
                        var _a = points[0].arcDrawData, centerPoint = _a.centerPoint, radius = _a.radius, startAngle = _a.startAngle, endAngle = _a.endAngle, counterClockwise = _a.counterClockwise;
                        var counterClockwiseGaurenteed = counterClockwise || points[0].counterClockwise;
                        ctx.arc(centerPoint[0], centerPoint[1], radius, startAngle, endAngle, counterClockwiseGaurenteed);
                    }
                }
                if (points[0] instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Circle) {
                    var circle = points[0];
                    if (circle.centerPoint) {
                        if (!circle.isBeingPlaced) {
                            ctx.arc(circle.centerPoint[0], circle.centerPoint[1], circle.radius, 0, 2 * Math.PI);
                            ctx.stroke();
                            ctx.beginPath();
                        }
                        else {
                            ctx.moveTo(circle.centerPoint[0], circle.centerPoint[1]);
                            ctx.strokeStyle = '#a4fcfcff';
                            ctx.setLineDash([3, 8]);
                            ctx.arc(circle.centerPoint[0], circle.centerPoint[1], circle.getRadius([phantomPointPosition[0], phantomPointPosition[1]]), 0, 2 * Math.PI);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.setLineDash([]);
                            ctx.strokeStyle = '#00FFFF';
                        }
                    }
                }
                points.slice(1).forEach(function (point) {
                    if (point instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Point) {
                        ctx.lineTo(point.pos[0], point.pos[1]);
                    }
                    if (point instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.BezierCurve) {
                        if (!point.isBeingPlaced) {
                            ctx.moveTo(point.startPos[0], point.startPos[1]);
                            ctx.bezierCurveTo(point.controlPoint1[0], point.controlPoint1[1], point.controlPoint2[0], point.controlPoint2[1], point.endPos[0], point.endPos[1]);
                        }
                    }
                    else if (point instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Arc) {
                        if (!point.isBeingPlaced) {
                            var _a = point.arcDrawData, centerPoint = _a.centerPoint, radius = _a.radius, startAngle = _a.startAngle, endAngle = _a.endAngle, counterClockwise = _a.counterClockwise;
                            ctx.arc(centerPoint[0], centerPoint[1], radius, startAngle, endAngle, counterClockwise);
                        }
                    }
                });
                ctx.stroke();
            }
        });
        if (this.spriteEditor.isPlacingPoint &&
            !this.spriteEditor.isPlacingBezierCurve &&
            !this.spriteEditor.isPlacingArc &&
            this.pointGroupsForLines.length >= 1 &&
            this.pointGroupsForLines[this.pointGroupsForLines.length - 1].length > 0) {
            var lastPlacedPointPosition = this.pointGroupsForLines[this.pointGroupsForLines.length - 1][this.pointGroupsForLines[this.pointGroupsForLines.length - 1].length - 1];
            ctx.strokeStyle = '#a4fcfcff';
            ctx.setLineDash([3, 8]);
            ctx.lineWidth = 2;
            ctx.beginPath();
            if (lastPlacedPointPosition instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Point) {
                ctx.moveTo(lastPlacedPointPosition.pos[0], lastPlacedPointPosition.pos[1]);
            }
            else if (lastPlacedPointPosition instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.BezierCurve || lastPlacedPointPosition instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Arc) {
                ctx.moveTo(lastPlacedPointPosition.endPos[0], lastPlacedPointPosition.endPos[1]);
            }
            ctx.lineTo(phantomPointPosition[0], phantomPointPosition[1]);
            ctx.stroke();
            ctx.setLineDash([]);
        }
        if (this.spriteEditor.isPlacingBezierCurve &&
            this.pointGroupsForLines.length >= 1 &&
            currentLineGroup.length > 0) {
            // there's a state where the curve is displayed and user
            // can move the control points around
            // solidifying it requires another B click
            // should be BezierCurve because isPlacingBezierCurve is true (as long as I'm managing that right)
            var lastPlacedPointPosition = currentLineGroup[currentLineGroup.length - 1];
            ctx.strokeStyle = '#a4fcfcff';
            ctx.setLineDash([3, 8]);
            ctx.lineWidth = 2;
            ctx.beginPath();
            // this should never be true:
            if (lastPlacedPointPosition instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Point) {
                console.error('Last placed point should be BezierCurve if isPlacingBezierCurve is true. something went wrong');
                ctx.moveTo(lastPlacedPointPosition.pos[0], lastPlacedPointPosition.pos[1]);
                ctx.lineTo(phantomPointPosition[0], phantomPointPosition[1]);
                ctx.stroke();
                ctx.setLineDash([]);
            }
            else if (lastPlacedPointPosition instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.BezierCurve && lastPlacedPointPosition.isBeingPlaced) {
                if (lastPlacedPointPosition.placingWhichPoint === 'start') {
                    // I think we don't draw anything since this must be the first point being added
                }
                else if (lastPlacedPointPosition.placingWhichPoint === 'end') {
                    if (lastPlacedPointPosition.controlPoint1 && lastPlacedPointPosition.controlPoint2) {
                        // everything is placed but we're adjusting the end point
                        var cp1 = lastPlacedPointPosition.controlPoint1, cp2 = lastPlacedPointPosition.controlPoint2;
                        ctx.moveTo(lastPlacedPointPosition.startPos[0], lastPlacedPointPosition.startPos[1]);
                        ctx.bezierCurveTo(cp1[0], cp1[1], cp2[0], cp2[1], phantomPointPosition[0], phantomPointPosition[1]);
                        ctx.stroke();
                        ctx.setLineDash([]);
                    }
                    else {
                        // control points aren't chosen yet and placing end point so make a line from start to phantom
                        ctx.moveTo(lastPlacedPointPosition.startPos[0], lastPlacedPointPosition.startPos[1]);
                        ctx.lineTo(phantomPointPosition[0], phantomPointPosition[1]);
                        ctx.stroke();
                        ctx.setLineDash([]);
                    }
                }
                else if (lastPlacedPointPosition.placingWhichPoint === 'controlPoint1') {
                    // end point must exist
                    // if controlPoint2 exists that means we're adjusting controlPoint1 again
                    if (lastPlacedPointPosition.controlPoint2) {
                        var cp2 = lastPlacedPointPosition.controlPoint2, endPos = lastPlacedPointPosition.endPos;
                        ctx.moveTo(lastPlacedPointPosition.startPos[0], lastPlacedPointPosition.startPos[1]);
                        ctx.bezierCurveTo(phantomPointPosition[0], phantomPointPosition[1], cp2[0], cp2[1], endPos[0], endPos[1]);
                        ctx.stroke();
                        ctx.setLineDash([]);
                    }
                    else {
                        // mirror controlPoint2 over it over
                        // get negative inverse slope of the start and end points
                        var _d = lastPlacedPointPosition.startPos, x_start = _d[0], y_start = _d[1];
                        var _e = lastPlacedPointPosition.endPos, x_end = _e[0], y_end = _e[1];
                        // I need to account for the case where slope is infinite
                        var m = (x_end - x_start) * -1 / (y_end - y_start);
                        var x_mid = (x_start + x_end) / 2;
                        var y_mid = (y_start + y_end) / 2;
                        var x_p = phantomPointPosition[0], y_p = phantomPointPosition[1];
                        var b = -1;
                        var a = m;
                        var c = (y_mid - x_mid) * m;
                        var q = x_mid * m + y_mid;
                        var theta = Math.atan2(-1 * (x_end - x_start), (y_end - y_start)) - Math.PI / 2;
                        var p_x_prime = (x_p - x_mid) * Math.cos(theta) + (y_p - y_mid) * Math.sin(theta);
                        var p_y_prime = (-1 * (x_p - x_mid) * Math.sin(theta) + (y_p - y_mid) * Math.cos(theta));
                        var p_x_prime_mirrored = -p_x_prime;
                        var x_mir = p_x_prime_mirrored * Math.cos(theta) - p_y_prime * Math.sin(theta) + x_mid;
                        var y_mir = p_x_prime_mirrored * Math.sin(theta) + p_y_prime * Math.cos(theta) + y_mid;
                        // oh! I should draw the mirrored point after this is picked so it can be chosen.
                        // then I can hit "m" to mirror it and boom I'm done
                        ctx.setLineDash([]);
                        ctx.beginPath();
                        ctx.moveTo(x_mir, y_mir);
                        ctx.arc(x_mir, y_mir, 4, 0, 2 * Math.PI);
                        ctx.stroke();
                        ctx.setLineDash([3, 8]);
                        ctx.moveTo(x_start, y_start);
                        ctx.lineTo(x_end, y_end);
                        ctx.stroke();
                        ctx.setLineDash([]);
                        ctx.beginPath();
                        ctx.moveTo(x_mid, y_mid);
                        ctx.arc(x_mid, y_mid, 4, 0, 2 * Math.PI);
                        ctx.stroke();
                        ctx.setLineDash([3, 8]);
                        ctx.strokeStyle = '#12cf5aff';
                        ctx.beginPath();
                        ctx.moveTo(0, m * (0 - x_mid) + y_mid);
                        ctx.lineTo(1400, m * (1400 - x_mid) + y_mid);
                        ctx.stroke();
                        ctx.strokeStyle = '#a4fcfcff';
                        ctx.beginPath();
                        // const y_mirrored = y_p + (x_mid * m + y_mid) * -2 * (m * x_p + x_mid * m + y_mid + -1) / (m ** 2 + (x_mid * m + y_mid)**2)
                        // const x_mirrored = x_p + m * -2 * (m * x_p + x_mid * m + y_mid + -1) / (m ** 2 + (x_mid * m + y_mid)**2)
                        // numbers arent right here
                        // const y_mir = (y_p * (m ** 2 - 1) + 2 * m * (x_p + y_mid - x_mid)) / (m ** 2 + 1)
                        // const x_mir = (x_p * (1 - m ** 2) - 2 * m * (-1 * y_p + m * (y_mid - x_mid))) / (1 + m **2)
                        // const y_mir = y_p + ((b**2 - a**2) - 2 * a * (b * x_p + c)) / (a **2 + b ** 2);
                        // const x_mir = x_p + ((a**2 - b**2) - 2 * b * (a * y_p + c)) / (a **2 + b ** 2);
                        // const y_mir = -2 * b * (a * x_p + b * y_p + c) / (a **2 + b ** 2) + y_p
                        // const x_mir = -2 * a * (a * x_p + b * y_p + c) / (a **2 + b ** 2) + x_p
                        // const y_mir = (2*m*x_p - (1 - m**2)*y_p + 2*q) / (1 + m**2);
                        // const x_mir = ((1 - m**2) * x_p + 2 * m * y_p - 2 * m * q) / (1 + m**2);
                        // const A = m;
                        // const B = 1;
                        // const C = m * (y_mid - x_mid);
                        // const M = Math.sqrt(A * A + B * B);
                        // const A_prime = A / M;
                        // const B_prime = B / M;
                        // const C_prime = C / M;
                        // const D = A_prime * x_p + B_prime * y_p + C_prime;
                        // const x_mir = x_p - 2 * A_prime * D;
                        // const y_mir = y_p - 2 * B_prime * D;
                        ctx.strokeStyle = '#a4fcfcff';
                        ctx.moveTo(x_start, y_start);
                        ctx.bezierCurveTo(x_p, y_p, x_mir, y_mir, x_end, y_end);
                        ctx.stroke();
                        ctx.setLineDash([]);
                        this.spriteEditor.bezierCurveBeingPlaced.mirroredValue = [x_mir, y_mir];
                    }
                }
                else if (lastPlacedPointPosition.placingWhichPoint === 'controlPoint2') {
                    var cp1 = lastPlacedPointPosition.controlPoint1, endPos = lastPlacedPointPosition.endPos;
                    ctx.moveTo(lastPlacedPointPosition.startPos[0], lastPlacedPointPosition.startPos[1]);
                    ctx.bezierCurveTo(cp1[0], cp1[1], phantomPointPosition[0], phantomPointPosition[1], endPos[0], endPos[1]);
                    ctx.stroke();
                    ctx.setLineDash([]);
                }
            }
            else {
                // if last placed point is completed and a bezier curve, then it should already have been drawn
            }
        }
        if (this.spriteEditor.isPlacingArc &&
            this.pointGroupsForLines.length >= 1 &&
            currentLineGroup.length > 0) {
            // should be arc because isPlacingArc is true (as long as I'm managing that right)
            var lastPlacedPointPosition = currentLineGroup[currentLineGroup.length - 1];
            ctx.strokeStyle = '#a4fcfcff';
            ctx.setLineDash([3, 8]);
            ctx.lineWidth = 2;
            ctx.beginPath();
            // this should never be true:
            if (lastPlacedPointPosition instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Point) {
                console.error('Last placed point should be Arc if isPlacingArc is true. something went wrong');
                ctx.moveTo(lastPlacedPointPosition.pos[0], lastPlacedPointPosition.pos[1]);
                ctx.lineTo(phantomPointPosition[0], phantomPointPosition[1]);
                ctx.stroke();
                ctx.setLineDash([]);
                // this should always be true:
            }
            else if (lastPlacedPointPosition instanceof _Point__WEBPACK_IMPORTED_MODULE_4__.Arc && lastPlacedPointPosition.isBeingPlaced) {
                if (lastPlacedPointPosition.placingWhichPoint === 'start') {
                    console.log('placingStartPoint');
                    // I think we don't draw anything since this must be the first point being added
                }
                else if (lastPlacedPointPosition.placingWhichPoint === 'end') {
                    console.log('placingEndPoint');
                    // only start has been placed.
                    // display phantom position of end position
                    // maybe display the arc assuming the center point is the midpoint of start and end
                    var startPos = lastPlacedPointPosition.startPos;
                    var midPoint = [
                        (startPos[0] + phantomPointPosition[0]) / 2, (startPos[1] + phantomPointPosition[1]) / 2
                    ];
                    var radius = Math.sqrt(Math.pow((startPos[0] - midPoint[0]), 2) + Math.pow((startPos[1] - midPoint[1]), 2));
                    var startAngle = Math.atan2((startPos[1] - midPoint[1]), startPos[0] - midPoint[0]);
                    var endAngle = Math.atan2((phantomPointPosition[1] - midPoint[1]), phantomPointPosition[0] - midPoint[0]);
                    console.log({
                        startPos: startPos,
                        phantomPointPosition: phantomPointPosition,
                        midPoint: midPoint,
                        radius: radius,
                        startAngle: startAngle,
                        endAngle: endAngle
                    });
                    // I might need another key listener to flip the rotation direction over for the arc
                    // press F for respect
                    // ctx.arc(midPoint[0], midPoint[1], 2, 0, 2*Math.PI);
                    ctx.arc(midPoint[0], midPoint[1], radius, startAngle, endAngle, !!(lastPlacedPointPosition === null || lastPlacedPointPosition === void 0 ? void 0 : lastPlacedPointPosition.counterClockwise));
                    ctx.stroke();
                    ctx.setLineDash([]);
                }
                else { // placing center point
                    console.log('placing Center Point');
                    var startPos = lastPlacedPointPosition.startPos, endPos = lastPlacedPointPosition.endPos;
                    // center point is the phantom point. this determines the start and end angle
                    // the point can only exist on the line perpendicular to the start end line and intersecting the midpoint
                    // when the slope is infinite, just use the y value of the phantom point
                    var midPoint = [
                        (startPos[0] + endPos[0]) / 2, (startPos[1] + endPos[1]) / 2
                    ];
                    var inverseSlope = -(endPos[0] - startPos[0]) / (endPos[1] - startPos[1]);
                    var y_position = void 0;
                    var centerPoint = void 0;
                    if (inverseSlope === Number.NEGATIVE_INFINITY || inverseSlope === Number.POSITIVE_INFINITY) {
                        centerPoint = [midPoint[0], phantomPointPosition[1]];
                    }
                    else {
                        y_position = inverseSlope * (phantomPointPosition[0] - midPoint[0]) + midPoint[1];
                        centerPoint = [phantomPointPosition[0], y_position];
                    }
                    // y = slope * (x - x1) + y1
                    // distance from start point to center point
                    // Ah right, I need the point along the line that goes through the center point
                    var radius = Math.sqrt(Math.pow((startPos[0] - centerPoint[0]), 2) + Math.pow((startPos[1] - centerPoint[1]), 2));
                    var startAngle = Math.atan2((startPos[1] - centerPoint[1]), startPos[0] - centerPoint[0]);
                    var endAngle = Math.atan2((endPos[1] - centerPoint[1]), endPos[0] - centerPoint[0]);
                    // ctx.arc(endPos[0], endPos[1], 2, 0, 2* Math.PI);
                    // ctx.stroke();
                    // I need to make the point snap at the midpoint even though it's off grid
                    ctx.arc(midPoint[0], midPoint[1], 2, 0, 2 * Math.PI);
                    ctx.arc(centerPoint[0], centerPoint[1], radius, startAngle, endAngle, !!(lastPlacedPointPosition === null || lastPlacedPointPosition === void 0 ? void 0 : lastPlacedPointPosition.counterClockwise));
                    ctx.stroke();
                    ctx.setLineDash([]);
                }
            }
        }
    };
    return SpriteEditorSprite;
}(_line_sprite__WEBPACK_IMPORTED_MODULE_2__.LineSprite));


/***/ }),

/***/ "./src/game_engine/UI_Element.ts":
/*!***************************************!*\
  !*** ./src/game_engine/UI_Element.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UIElement: () => (/* binding */ UIElement)
/* harmony export */ });
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transform */ "./src/game_engine/transform.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/game_engine/util.ts");


var UIElement = /** @class */ (function () {
    function UIElement(levelDesigner, position, parentScene) {
        this.parentScene = parentScene;
        this.transform = new _transform__WEBPACK_IMPORTED_MODULE_0__.Transform(null, position);
        this.levelDesigner = levelDesigner; // this is level designer not the game engine
        this.levelDesigner.addUIElement(this);
        this.inExpandedScene = true;
    }
    UIElement.prototype.addUIElementSprite = function (UILineSprite) {
        this.UILineSprite = UILineSprite;
        this.levelDesigner.addUIElementSprite(UILineSprite);
    };
    UIElement.prototype.addMouseClickListener = function () {
        this.levelDesigner.addMouseClickListener(this);
    };
    UIElement.prototype.addMouseDoubleClickListener = function () {
        this.levelDesigner.addMouseDoubleClickListener(this);
    };
    UIElement.prototype.removeMouseClickListener = function () {
        this.levelDesigner.removeMouseClickListener(this);
    };
    UIElement.prototype.removeMouseDoubleClickListener = function () {
        this.levelDesigner.removeMouseDoubleClickListener(this);
    };
    UIElement.prototype.parentSceneUnexpanded = function () {
        this.inExpandedScene = false;
        this.removeMouseClickListener();
        this.removeMouseDoubleClickListener();
    };
    UIElement.prototype.parentSceneExpanded = function () {
        this.inExpandedScene = true;
        this.addMouseClickListener();
        this.addMouseDoubleClickListener();
    };
    UIElement.prototype.mouseDoubleClicked = function (mousePos) {
        if (!this.inExpandedScene)
            return;
        var centerPosition = [
            this.transform.pos[0] + this.widthHeight[0] / 2,
            this.transform.pos[1] + this.widthHeight[1] / 2
        ];
        var centerDist = _util__WEBPACK_IMPORTED_MODULE_1__.VectorMath.dist(centerPosition, mousePos);
        if (centerDist < this.clickRadius) {
            this.onMouseDoubleClick(mousePos);
        }
    };
    UIElement.prototype.mouseClicked = function (mousePos) {
        if (!this.inExpandedScene)
            return;
        var centerPosition = [
            this.transform.pos[0] + this.widthHeight[0] / 2,
            this.transform.pos[1] + this.widthHeight[1] / 2
        ];
        var centerDist = _util__WEBPACK_IMPORTED_MODULE_1__.VectorMath.dist(centerPosition, mousePos);
        if (centerDist < this.clickRadius) {
            this.onMouseClick(mousePos);
        }
    };
    UIElement.prototype.mouseDowned = function (mousePos) {
        if (!this.inExpandedScene)
            return;
        var centerPosition = [
            this.transform.pos[0] + this.widthHeight[0] / 2,
            this.transform.pos[1] + this.widthHeight[1] / 2
        ];
        var centerDist = _util__WEBPACK_IMPORTED_MODULE_1__.VectorMath.dist(centerPosition, mousePos);
        if (centerDist < this.clickRadius) {
            this.draggingElement = true;
            this.followMouse();
        }
    };
    UIElement.prototype.elementLetGo = function () {
        this.draggingElement = false;
        // send to ghost position
    };
    UIElement.prototype.followMouse = function () {
        this.levelDesigner.UIElementMouseFollower = this;
        this.levelDesigner.UIElementMouseFollower.draggingLineSprite = this.copyLineSpriteForDragging();
        this.levelDesigner.addUIElementSprite(this.levelDesigner.UIElementMouseFollower.draggingLineSprite);
    };
    UIElement.prototype.delete = function () {
        this.removeMouseClickListener();
        this.removeMouseDoubleClickListener();
        this.levelDesigner.removeUIElementSprite(this.UILineSprite);
        this.parentScene.removeGameElement(this);
        this.deleteYourShit();
    };
    UIElement.prototype.deleteYourShit = function () {
        // Abstract for event I guess
    };
    return UIElement;
}());



/***/ }),

/***/ "./src/game_engine/camera.ts":
/*!***********************************!*\
  !*** ./src/game_engine/camera.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Camera: () => (/* binding */ Camera)
/* harmony export */ });
var Camera = /** @class */ (function () {
    // it's like a game object, but it gets updated last
    function Camera(gameEngine, transform, name, gameObjectToFollow) {
        if (gameObjectToFollow === void 0) { gameObjectToFollow = null; }
        this.name = name;
        this.gameEngine = gameEngine;
        this.gameEngine.addCamera(this);
        this.gameObjectToFollow = gameObjectToFollow;
        this.initialCameraZPos = -1000;
        this.cameraHeight = 600;
        this.cameraWidth = 1000;
        this.defaultZoomScale = 1;
        this.transform = transform;
        this.transform.pos[2] = this.initialCameraZPos;
        this.zoomScale = 1;
    }
    Camera.prototype.makeActiveCamera = function () {
        this.gameEngine.setActiveCamera(this);
        this.isActive = true;
    };
    Camera.prototype.update = function (ctx) {
        ctx.restore();
        ctx.save();
        var xPos = this.transform.pos[0];
        var yPos = this.transform.pos[1];
        var zoomScale = this.zoomScale;
        var width = this.cameraWidth;
        var height = this.cameraHeight;
        ctx.translate(-xPos * zoomScale + width / 2, -yPos * zoomScale + height / 2);
    };
    Camera.prototype.clearView = function (ctx) {
        var xPos = this.transform.pos[0];
        var yPos = this.transform.pos[1];
        var zoomScale = this.zoomScale;
        var width = this.cameraWidth;
        var height = this.cameraHeight;
        ctx.clearRect(xPos * zoomScale - width / 2, yPos * zoomScale - height / 2, this.cameraWidth, this.cameraHeight);
        ctx.fillStyle = '#000000';
        ctx.fillRect(xPos * zoomScale - width / 2, yPos * zoomScale - height / 2, this.cameraWidth, this.cameraHeight);
    };
    Camera.prototype.setZoomScale = function (ctx) {
        this.gameEngine.ctx.scale(this.zoomScale, this.zoomScale);
    };
    return Camera;
}());



/***/ }),

/***/ "./src/game_engine/collider.ts":
/*!*************************************!*\
  !*** ./src/game_engine/collider.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Collider: () => (/* binding */ Collider)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/game_engine/util.ts");
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

var Collider = /** @class */ (function () {
    function Collider(type, gameObject, radius, subscriptions, // the things this collider effects
    subscribedColliderTypes // the things that effect this collider?
    ) {
        if (radius === void 0) { radius = 5; }
        this.objectType = gameObject.constructor.name;
        this.type = type;
        this.subscriptions = subscriptions;
        this.subscribedColliderTypes = subscribedColliderTypes;
        this.radius = radius;
        this.gameObject = gameObject;
    }
    // wondering if collision should cascade up the parent objects
    // nope not yet anyway
    Collider.prototype.collisionCheck = function (otherCollider) {
        var centerDist = _util__WEBPACK_IMPORTED_MODULE_0__.VectorMath.dist(this.gameObject.transform.pos, otherCollider.gameObject.transform.pos);
        if (centerDist < this.radius + otherCollider.radius) {
            this.gameObject.onCollision(otherCollider, this.type);
        }
    };
    return Collider;
}());

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

/***/ "./src/game_engine/color.ts":
/*!**********************************!*\
  !*** ./src/game_engine/color.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Color: () => (/* binding */ Color)
/* harmony export */ });
var Color = /** @class */ (function () {
    function Color(colorType, colorNumbers) {
        if (!Color.COLOR_TYPES.includes(colorType)) {
            new Error("Color Object given unsupported color type");
        }
        this.colorType = colorType;
        this.extractColorInfo(colorType, colorNumbers);
    }
    Color.GetColorRange = function (baseHue, hueRange) {
        return baseHue - hueRange / 2 + hueRange * Math.random();
    };
    Color.prototype.dup = function () {
        var dupColors;
        var dupColorType = this.colorType;
        if (this.colorType === "rgb") {
            dupColors = [this.r, this.g, this.b];
        }
        else if (this.colorType === "rgba") {
            dupColors = [this.r, this.g, this.b, this.a];
        }
        else if (this.colorType === "hsl") {
            dupColors = [this.h, this.s, this.l];
        }
        else if (this.colorType === "hsla") {
            dupColors = [this.h, this.s, this.l, this.a];
        }
        var newColor = new Color(dupColorType, dupColors);
        return newColor;
    };
    Color.prototype.extractColorInfo = function (colorType, colorNumbers) {
        if (this.colorType === "rgb") {
            this.r = colorNumbers[0];
            this.g = colorNumbers[1];
            this.b = colorNumbers[2];
        }
        else if (this.colorType === "rgba") {
            this.r = colorNumbers[0];
            this.g = colorNumbers[1];
            this.b = colorNumbers[2];
            this.a = colorNumbers[3];
        }
        else if (this.colorType === "hsl") {
            this.h = colorNumbers[0];
            this.s = colorNumbers[1];
            this.l = colorNumbers[2];
        }
        else if (this.colorType === "hsla") {
            this.h = colorNumbers[0];
            this.s = colorNumbers[1];
            this.l = colorNumbers[2];
            this.a = colorNumbers[3];
        }
    };
    Color.prototype.evaluateColor = function () {
        if (this.colorType === "rgb") {
            return "rbg(".concat(this.r, ",").concat(this.g, ",").concat(this.b, ",)");
        }
        else if (this.colorType === "rgba") {
            return "rbg(".concat(this.r, ",").concat(this.g, ",").concat(this.b, ",").concat(this.a, ")");
        }
        else if (this.colorType === "hsl") {
            return "hsl(".concat(this.h, ",").concat(this.s, "%,").concat(this.l, "%");
        }
        else if (this.colorType === "hsla") {
            return "hsla(".concat(this.h, ", ").concat(this.s, "%, ").concat(this.l, "%, ").concat(this.a);
        }
    };
    Color.COLOR_TYPES = ["rgb", "rgba", "hsl", "hsla"];
    return Color;
}());



/***/ }),

/***/ "./src/game_engine/game_engine.ts":
/*!****************************************!*\
  !*** ./src/game_engine/game_engine.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameEngine: () => (/* binding */ GameEngine)
/* harmony export */ });
/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./camera */ "./src/game_engine/camera.ts");
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform */ "./src/game_engine/transform.ts");
/* harmony import */ var _SpriteEditor_DrawingGridSprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SpriteEditor/DrawingGridSprite */ "./src/game_engine/SpriteEditor/DrawingGridSprite.ts");



var GameEngine = /** @class */ (function () {
    function GameEngine(ctx) {
        this.isControllerConnected = false;
        this.replayablePhysicsComponents = [];
        this.isPerformanceCheckOn = false;
        this.ctx = ctx;
        window.engine = this;
        this.buttonState = {
            aButtonPressed: false,
            xButtonPressed: false,
            bButtonPressed: false,
            startButtonPressed: false,
        };
        this.gameScriptAdded = false;
        this.lineSprites = [];
        this.cameras = [];
        this.controllableGameObjects = [];
        this.controlledGameObject = null;
        this.gameObjects = [];
        this.physicsComponents = [];
        this.soundsToPlay = new Set;
        this.colliders = {};
        this.subscribers = [];
        this.muted = true;
        this.mouseListeners = [];
        this.mouseEventListeners = [];
        this.mouseFocussedListeners = [];
        this.backgroundSounds = [];
        this.overlappingSoundMap = {};
        this.gameClickListeners = [];
        this.gameClickListenersToAdd = [];
        this.gameClickListenersToRemove = [];
        this.gameDoubleClickListeners = [];
        this.gameDoubleClickListenersToAdd = [];
        this.gameDoubleClickListenersToRemove = [];
        this.levelDesignerClickListeners = [];
        this.levelDesignerDoubleClickListeners = [];
        this.leftControlStickListeners = [];
        this.rightControlStickListeners = [];
        this.lKeyListeners = [];
        this.kKeyListeners = [];
        this.fKeyListeners = [];
        this.bKeyListeners = [];
        this.mKeyListeners = [];
        this.jKeyListeners = [];
        this.oKeyListeners = [];
        this.cKeyListeners = [];
        this.sKeyListeners = [];
        this.xButtonListeners = [];
        this.bButtonListeners = [];
        this.aButtonListeners = [];
        this.startButtonListeners = [];
        this.leftArrowListeners = [];
        this.rightArrowListeners = [];
        this.upArrowListeners = [];
        this.downArrowListeners = [];
        // this.toRemoveQueue = [];
        this.paused = false;
        // this.currentCamera = null;
        this.graphicQuality = 1;
        this.setupController();
        this.setupPerformance();
        this.isLevelDesignerOpened = false;
        this.frameCountForPerformance = 0;
        this.levelDesigner = null;
        this.spriteCreatorOpened = false;
        this.addCamera(new _camera__WEBPACK_IMPORTED_MODULE_0__.Camera(this, new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform(), 'first camera'));
    }
    GameEngine.prototype.loadSounds = function (soundMap) {
        this.overlappingSoundMap = soundMap;
    };
    GameEngine.prototype.addGameScript = function (gameScriptToAdd) {
        this.gameScript = gameScriptToAdd;
        this.gameScriptAdded = true;
    };
    GameEngine.prototype.addSpriteEditorOverlay = function () {
        this.addLineSprite(new _SpriteEditor_DrawingGridSprite__WEBPACK_IMPORTED_MODULE_2__.DrawingGridSprite(new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform()));
    };
    GameEngine.prototype.addControllableGameObject = function (gameObject) {
        this.controllableGameObjects.push(gameObject);
    };
    GameEngine.prototype.focusControllableGameObject = function (gameObject) {
        // will want to be able to control multiple at same time 
        // in the future
        if (this.controllableGameObjects.includes(gameObject)) {
            if (this.controlledGameObject) {
                this.controlledGameObject.isFocussedGameObject = false;
                this.controlledGameObject = null;
            }
            this.controlledGameObject = gameObject;
            gameObject.isFocussedGameObject = true;
            this.setActiveCamera(gameObject.camera);
        }
        else {
            console.error("GameObject is not controllable");
        }
    };
    GameEngine.prototype.setupPerformance = function () {
        this.frameCountForPerformance = 0;
        this.collisionTime = 0;
        this.physicsCalcTime = 0;
        this.updateTime = 0;
        this.renderTime = 0;
        this.scriptTime = 0;
        this.timePassed = 0;
    };
    GameEngine.prototype.setupController = function () {
        window.addEventListener("gamepadconnected", function (e) {
            window.controller = e.gamepad;
            window.engine.isControllerConnected = true;
            // Gamepad connected
            console.log("Gamepad connected", e.gamepad);
        });
        window.addEventListener("gamepaddisconnected", function (e) {
            // Gamepad disconnected
            window.engine.isControllerConnected = false;
            console.log("Gamepad disconnected", e.gamepad);
        });
    };
    GameEngine.prototype.updateGraphicSetting = function (delta) {
        if (delta > 50) {
            // console.log("worst")
            this.graphicQuality = 3;
        }
        else if (delta > 25) {
            this.graphicQuality = 2;
        }
        else {
            this.graphicQuality = 1;
        }
    };
    GameEngine.prototype.tick = function (delta) {
        this.updateGraphicSetting(delta);
        if (this.paused || this.focusPaused) {
            this.updateControlListeners();
            return;
        }
        if (delta === 0)
            throw ('delta is zero implying a second requestAnimation call. check gameView');
        if (!this.gameScriptAdded)
            return;
        if (this.isPerformanceCheckOn) {
            var beforeCollisionTime = performance.now();
            this.checkCollisions();
            var beforePhysicsCalcs = performance.now();
            var collisionTime = beforePhysicsCalcs - beforeCollisionTime;
            this.movePhysicsComponents(delta);
            this.moveReplayablePhysicsComponents(delta, this.gameScript.gameTime);
            var beforeUpdate = performance.now();
            var physicsCalcTime = beforeUpdate - beforePhysicsCalcs;
            this.updateGameObjects(delta);
            var beforeRender = performance.now();
            var updateTime = beforeRender - beforeUpdate;
            this.renderLineSprites(this.ctx);
            var beforeScriptUpdate = performance.now();
            var renderTime = beforeScriptUpdate - beforeRender;
            this.updateControlListeners();
            this.updateGameScript(delta);
            var scriptTime = performance.now() - beforeScriptUpdate;
            this.playSounds();
            this.collectPerformanceData(delta, collisionTime, physicsCalcTime, updateTime, renderTime, scriptTime);
        }
        else {
            this.checkCollisions();
            this.movePhysicsComponents(delta);
            this.moveReplayablePhysicsComponents(delta, this.gameScript.gameTime);
            this.updateGameObjects(delta);
            this.renderLineSprites(this.ctx);
            this.updateControlListeners();
            this.updateGameScript(delta);
            this.playSounds();
        }
        this.addClickListenersAfterTick();
        this.addDoubleClickListenersAfterTick();
        this.removeClickListenersAfterTick();
        this.removeDoubleClickListenerAfterTick();
    };
    GameEngine.prototype.collectPerformanceData = function (delta, collisionTime, physicsCalcTime, updateTime, renderTime, scriptTime) {
        this.frameCountForPerformance += 1;
        this.collisionTime += collisionTime;
        this.physicsCalcTime += physicsCalcTime;
        this.updateTime += updateTime;
        this.renderTime += renderTime;
        this.scriptTime += scriptTime;
        this.timePassed += delta;
        if (this.timePassed > 1000 * 60) {
            var timeData = {
                frameRate: this.frameCountForPerformance / (this.timePassed / 1000),
                collisionTime: (this.collisionTime) / this.frameCountForPerformance,
                physicsCalcTime: (this.physicsCalcTime) / this.frameCountForPerformance,
                updateTime: (this.updateTime) / this.frameCountForPerformance,
                renderTime: (this.renderTime) / this.frameCountForPerformance,
                scriptTime: (this.scriptTime) / this.frameCountForPerformance
            };
            console.log(timeData);
            this.setupPerformance();
        }
    };
    GameEngine.prototype.pause = function () {
        this.paused = true;
        this.gameScript.onPause();
    };
    GameEngine.prototype.unPause = function () {
        this.paused = false;
        this.gameScript.onUnPause();
    };
    GameEngine.prototype.togglePause = function () {
        // console.log("pausetoggle")
        this.paused ? this.unPause() : this.pause();
    };
    GameEngine.prototype.addLeftControlStickListener = function (object) {
        this.leftControlStickListeners.push(object);
    };
    GameEngine.prototype.addLeftControlStickFocussedListener = function (object) {
        this.leftControlStickFocussedListeners.push(object);
    };
    GameEngine.prototype.addLKeyListener = function (object) {
        this.lKeyListeners.push(object);
    };
    GameEngine.prototype.addKKeyListener = function (object) {
        this.kKeyListeners.push(object);
    };
    GameEngine.prototype.addOKeyListener = function (object) {
        this.oKeyListeners.push(object);
    };
    GameEngine.prototype.addCKeyListener = function (object) {
        this.cKeyListeners.push(object);
    };
    GameEngine.prototype.addJKeyListener = function (object) {
        this.jKeyListeners.push(object);
    };
    GameEngine.prototype.addFKeyListener = function (object) {
        this.fKeyListeners.push(object);
    };
    GameEngine.prototype.addBKeyListener = function (object) {
        this.bKeyListeners.push(object);
    };
    GameEngine.prototype.addMKeyListener = function (object) {
        this.mKeyListeners.push(object);
    };
    GameEngine.prototype.addSKeyListener = function (object) {
        this.sKeyListeners.push(object);
    };
    GameEngine.prototype.addRightControlStickListener = function (object) {
        this.rightControlStickListeners.push(object);
    };
    GameEngine.prototype.addXButtonListener = function (object) {
        this.xButtonListeners.push(object);
    };
    GameEngine.prototype.addBButtonListener = function (object) {
        this.bButtonListeners.push(object);
    };
    GameEngine.prototype.addStartButtonListener = function (object) {
        this.startButtonListeners.push(object);
    };
    // ******** mouse stuff *******
    GameEngine.prototype.addClickListener = function (object) {
        this.gameClickListenersToAdd.push(object);
    };
    GameEngine.prototype.addClickListenersAfterTick = function () {
        var _this = this;
        this.gameClickListenersToAdd.forEach(function (object) {
            _this.gameClickListeners.push(object);
        });
        this.gameClickListenersToAdd = [];
    };
    GameEngine.prototype.addDoubleClickListener = function (object) {
        this.gameDoubleClickListenersToAdd.push(object);
    };
    GameEngine.prototype.addDoubleClickListenersAfterTick = function () {
        var _this = this;
        this.gameDoubleClickListenersToAdd.forEach(function (object) {
            _this.gameDoubleClickListeners.push(object);
        });
        this.gameDoubleClickListenersToAdd = [];
    };
    GameEngine.prototype.addLevelDesignerClickListener = function (object) {
        this.levelDesignerClickListeners.push(object);
    };
    GameEngine.prototype.addLevelDesignerDoubleClickListener = function (object) {
        this.levelDesignerDoubleClickListeners.push(object);
    };
    GameEngine.prototype.addLeftArrowListener = function (object) {
        this.leftArrowListeners.push(object);
    };
    GameEngine.prototype.addRightArrowListener = function (object) {
        this.rightArrowListeners.push(object);
    };
    GameEngine.prototype.addUpArrowListener = function (object) {
        this.upArrowListeners.push(object);
    };
    GameEngine.prototype.addDownArrowListener = function (object) {
        this.downArrowListeners.push(object);
    };
    GameEngine.prototype.mouseDown = function (e) {
        if (e.target instanceof HTMLElement) {
            if (e.target.classList[0] === "level-editor-canvas") {
                this.levelDesigner.downClick();
                this.levelDesignerClickListeners.forEach(function (object) {
                    object.mouseDowned([e.offsetX, e.offsetY]);
                });
            }
            else if (e.target.classList[0] === "gameCanvas") {
                // const position = [e.layerX, e.layerY];
                // this.gameClickListeners.forEach((object) => {
                //     object.mouseClicked(position);
                // });
            }
        }
    };
    GameEngine.prototype.mouseClicked = function (e) {
        if (e.target instanceof HTMLElement) {
            if (e.target.classList[0] === "level-editor-canvas") {
                this.levelDesignerClickListeners.forEach(function (object) {
                    object.mouseClicked([e.offsetX, e.offsetY]);
                });
            }
            else if (e.target.classList[0] === "gameCanvas") {
                // const position = [e.layerX, e.layerY];
                var position_1 = [e.offsetX, e.offsetY]; // TODO
                this.gameClickListeners.forEach(function (object) {
                    object.mouseClicked(position_1);
                });
            }
        }
    };
    // this belongs in the ship. we should call the listeners here, including the ship
    GameEngine.prototype.updateFKeyListener = function (pressed) {
        if (pressed) {
            // focus on next controllable game object
            if (this.controllableGameObjects.length > 0) {
                var currentIndex = this.controllableGameObjects.indexOf(this.controlledGameObject);
                var nextIndex = (currentIndex + 1) % this.controllableGameObjects.length;
                this.focusControllableGameObject(this.controllableGameObjects[nextIndex]);
            }
            else {
                console.log("No controllable game objects to focus on.");
            }
        }
    };
    GameEngine.prototype.mouseUnClicked = function (e) {
        if (e.target instanceof HTMLElement) {
            if (e.target.classList[0] === "level-editor-canvas") {
                this.levelDesigner.unClicked();
            }
        }
    };
    GameEngine.prototype.mouseDoubleClicked = function (e) {
        if (e.target instanceof HTMLElement) {
            if (e.target.classList[0] === "level-editor-canvas") {
                this.levelDesignerDoubleClickListeners.forEach(function (object) {
                    object.mouseDoubleClicked([e.offsetX, e.offsetY]);
                });
            }
            else if (e.target.classList[0] === "game-canvas") {
                var position_2 = [e.offsetX, e.offsetY]; // TODO
                // const position: [number, number] = [e.layerX, e.layerY];
                this.gameDoubleClickListeners.forEach(function (object) {
                    object.mouseDoubleClicked(position_2);
                });
            }
        }
    };
    GameEngine.prototype.removeClickListener = function (object) {
        this.gameClickListenersToRemove.push(object);
    };
    GameEngine.prototype.removeClickListenersAfterTick = function () {
        var _this = this;
        this.gameClickListenersToRemove.forEach(function (object) {
            var index = _this.gameClickListeners.indexOf(object);
            if (index !== -1)
                _this.gameClickListeners.splice(index, 1);
        });
        this.gameClickListenersToRemove = [];
    };
    GameEngine.prototype.removeDoubleClickListener = function (object) {
        this.gameDoubleClickListenersToRemove.push(object);
    };
    GameEngine.prototype.removeDoubleClickListenerAfterTick = function () {
        var _this = this;
        this.gameDoubleClickListenersToRemove.forEach(function (object) {
            var index = _this.gameDoubleClickListeners.indexOf(object);
            if (index !== -1)
                _this.gameDoubleClickListeners.splice(index, 1);
        });
        this.gameDoubleClickListenersToRemove = [];
    };
    GameEngine.prototype.removeLevelDesignerClickListener = function (object) {
        var index = this.levelDesignerClickListeners.indexOf(object);
        if (index !== -1)
            this.levelDesignerClickListeners.splice(index, 1);
    };
    GameEngine.prototype.removeLevelDesignerDoubleClickListener = function (object) {
        var index = this.levelDesignerDoubleClickListeners.indexOf(object);
        if (index !== -1)
            this.levelDesignerDoubleClickListeners.splice(index, 1);
    };
    // ******** end of mouse stuff *******
    GameEngine.prototype.updateLeftControlStickListeners = function (unitVector, down) {
        var _a;
        this.leftControlStickListeners.forEach(function (listener) {
            listener.updateLeftControlStickInput(unitVector, down);
        });
        (_a = this.controlledGameObject) === null || _a === void 0 ? void 0 : _a.updateLeftControlFocussedStickInput(unitVector, down);
    };
    GameEngine.prototype.updateLKeyListeners = function (down) {
        this.lKeyListeners.forEach(function (listener) {
            listener.updateLKeyListener(down);
        });
    };
    GameEngine.prototype.updateKKeyListeners = function (down) {
        this.kKeyListeners.forEach(function (listener) {
            listener.updateKKeyListener(down);
        });
    };
    GameEngine.prototype.updateBKeyListeners = function (down) {
        this.bKeyListeners.forEach(function (listener) {
            listener.updateBKeyListener(down);
        });
    };
    GameEngine.prototype.updateMKeyListeners = function (down) {
        this.mKeyListeners.forEach(function (listener) {
            listener.updateMKeyListener(down);
        });
    };
    GameEngine.prototype.updateSKeyListeners = function (down) {
        this.sKeyListeners.forEach(function (listener) {
            listener.updateSKeyListener(down);
        });
    };
    GameEngine.prototype.updateJKeyListeners = function (down) {
        this.jKeyListeners.forEach(function (listener) {
            listener.updateJKeyListener(down);
        });
    };
    GameEngine.prototype.updateOKeyListeners = function (down) {
        this.oKeyListeners.forEach(function (listener) {
            listener.updateOKeyListener(down);
        });
    };
    GameEngine.prototype.updateCKeyListeners = function (down) {
        this.cKeyListeners.forEach(function (listener) {
            listener.updateCKeyListener(down);
        });
    };
    GameEngine.prototype.updateFKeyListeners = function (down) {
        this.fKeyListeners.forEach(function (listener) {
            listener.updateFKeyListener(down);
        });
    };
    GameEngine.prototype.updateRightControlStickListeners = function (unitVector) {
        this.rightControlStickListeners.forEach(function (listener) {
            listener.updateRightControlStickInput(unitVector);
        });
        this.controlledGameObject.updateRightControlFocussedStickInput(unitVector);
    };
    GameEngine.prototype.updateXButtonListeners = function (xButton) {
        this.xButtonListeners.forEach(function (listener) {
            listener.updateXButtonListener(xButton);
        });
    };
    GameEngine.prototype.updateBButtonListeners = function (bButton) {
        console.log('B button pressed');
        this.bButtonListeners.forEach(function (listener) {
            listener.updateBButtonListener(bButton);
        });
    };
    GameEngine.prototype.updateAButtonListeners = function (aButton) {
        this.aButtonListeners.forEach(function (listener) {
            listener.updateAButtonListener(aButton);
        });
        // this.updateFKeyListener(aButton); // TODO this is a hacky way to do this
    };
    GameEngine.prototype.updateStartButtonListeners = function (pressed) {
        // console.log([startButton, down])
        this.startButtonListeners.forEach(function (listener) {
            listener.updateStartButtonListener(pressed);
        });
    };
    GameEngine.prototype.updateLeftArrowListeners = function (pressed) {
        this.leftArrowListeners.forEach(function (listener) {
            listener.updateLeftArrowListener(pressed);
        });
    };
    GameEngine.prototype.updateUpArrowListeners = function (pressed) {
        this.upArrowListeners.forEach(function (listener) {
            listener.updateUpArrowListener(pressed);
        });
    };
    GameEngine.prototype.updateRightArrowListeners = function (pressed) {
        this.rightArrowListeners.forEach(function (listener) {
            listener.updateRightArrowListener(pressed);
        });
    };
    GameEngine.prototype.updateDownArrowListeners = function (pressed) {
        this.downArrowListeners.forEach(function (listener) {
            listener.updateDownArrowListener(pressed);
        });
    };
    GameEngine.prototype.focusUnPause = function () {
        this.focusPaused = false;
    };
    GameEngine.prototype.focusPause = function () {
        this.focusPaused = true;
    };
    // called by game view
    GameEngine.prototype.updateMousePos = function (mousePos, e) {
        var _a;
        // I need to check if it's supposed to be directly controlled, or just listening 
        // not sure if I need to fix this for an actual game being played
        var xPosition = mousePos[0] - this.activeCamera.cameraWidth / 2;
        var yPosition = mousePos[1] - this.activeCamera.cameraHeight / 2;
        this.mouseListeners.forEach(function (object) {
            object.updateMousePos([xPosition, yPosition]);
        });
        this.mouseEventListeners.forEach(function (object) {
            object.updateMouseMoveEvent(e);
        });
        (_a = this.controlledGameObject) === null || _a === void 0 ? void 0 : _a.updateFocussedMousePos(mousePos);
    };
    GameEngine.prototype.removeMouseListener = function (object) {
        var index = this.mouseListeners.indexOf(object);
        if (index !== -1)
            this.mouseListeners.splice(index, 1);
    };
    GameEngine.prototype.updateControlListeners = function () {
        this.controller = navigator.getGamepads()[0];
        // should only update button listeners when the state changes. 
        // I should keep track of the state of the buttons
        if (this.isControllerConnected) {
            var leftAxis = [this.controller.axes[0], this.controller.axes[1]];
            var rightAxis = [this.controller.axes[2], this.controller.axes[3]];
            var aButton = this.controller.buttons[0].pressed;
            var bButton = this.controller.buttons[1].pressed; // this was 3 some time ago... why did it change??
            // const xButton: boolean = this.controller.buttons[0].pressed;
            if (this.buttonState.aButtonPressed !== aButton) {
                this.buttonState.aButtonPressed = aButton;
                this.updateAButtonListeners(aButton);
            }
            if (this.buttonState.bButtonPressed !== bButton) {
                this.buttonState.bButtonPressed = bButton;
                this.updateBButtonListeners(bButton);
            }
            var startButton = this.controller.buttons[9].pressed;
            // this.updateStartButtonListeners(aButton);
            // this.updateXButtonListeners(xButton);
            this.updateLeftControlStickListeners(leftAxis, null);
            this.updateRightControlStickListeners(rightAxis);
            this.updateStartButtonListeners(startButton);
        }
    };
    GameEngine.prototype.movePhysicsComponents = function (delta) {
        this.physicsComponents.forEach(function (component) {
            component.move(delta);
        });
    };
    GameEngine.prototype.moveReplayablePhysicsComponents = function (delta, gameTime) {
        this.replayablePhysicsComponents.forEach(function (component) {
            component.move(delta, gameTime);
        });
    };
    GameEngine.prototype.addCollider = function (collider) {
        if (collider.subscriptions) {
            this.subscribers.push(collider);
        }
        var colliders = this.colliders;
        // collider: object absolute transform
        // collider {"objectType": "Bullet", "type": "general", "subscriptions": ["BoxBox", "Arrow"], "subscribedColliderTypes": ["General"]}
        // colliders {"Singularity": {"General": [collider, collider], "GravityWell": [collider, collider]}}
        if (!colliders[collider.objectType]) {
            var collidersSameTypeAndObject = {};
            collidersSameTypeAndObject[collider.type] = [collider];
            colliders[collider.objectType] = collidersSameTypeAndObject;
        }
        else {
            if (!colliders[collider.objectType][collider.type]) {
                colliders[collider.objectType][collider.type] = [collider];
            }
            else {
                colliders[collider.objectType][collider.type].push(collider);
            }
        }
    };
    // must be a way to only retrieve
    // the data for subscribed colliders once
    GameEngine.prototype.checkCollisions = function () {
        // colliders{
        // "Arrow": [collider, collider]
        // }
        // collider {
        //   "objectType": "Bullet",
        //   "type": "general",
        //   "subscriptions": ["BoxBox", "Arrow"],
        //   "subscribedColliderTypes": ["general"]
        // }
        var subscribers = this.subscribers;
        var colliders = this.colliders;
        // console.log(this.subscribers)
        subscribers.forEach(function (subscriber) {
            subscriber.subscriptions.forEach(function (subscription) {
                colliders[subscription] = colliders[subscription] || {};
                subscriber.subscribedColliderTypes.forEach(function (colliderType) {
                    colliders[subscription][colliderType] =
                        colliders[subscription][colliderType] || [];
                    colliders[subscription][colliderType].forEach(function (subscribedCollider) {
                        subscriber.collisionCheck(subscribedCollider);
                    });
                });
            });
        });
    };
    GameEngine.prototype.updateGameObjects = function (delta) {
        this.gameObjects.forEach(function (object) {
            object.update(delta);
        });
    };
    GameEngine.prototype.toggleMute = function () {
        this.muted = !this.muted;
        this.muted ? this.backgroundSounds.forEach(function (sound) { return sound.mute(); }) : this.backgroundSounds.forEach(function (sound) { return sound.unmute(); });
    };
    GameEngine.prototype.playSounds = function () {
        // use magazine of sounds, each with a counter so it knows which song is next
        var _this = this;
        this.soundsToPlay.forEach(function (soundURL) {
            if (soundURL === "sounds/Hi_Score_achieved.wav")
                console.log(_this.soundsToPlay);
            var sound = _this.overlappingSoundMap[soundURL].find(function (sound) { return sound.sound.currentTime === 0 || sound.sound.ended; });
            sound === null || sound === void 0 ? void 0 : sound.play();
        });
        this.soundsToPlay = new Set();
    };
    GameEngine.prototype.addCamera = function (camera) {
        this.cameras.push(camera);
        if (this.cameras.length === 1) {
            camera.makeActiveCamera();
        }
    };
    GameEngine.prototype.setActiveCamera = function (camera) {
        if (this.activeCamera)
            this.activeCamera.isActive = false;
        camera.isActive = true;
        this.activeCamera = camera;
        this.lineSprites.forEach(function (sprite) {
            sprite.transform.cameraTransform = camera.transform;
        });
    };
    GameEngine.prototype.renderLineSprites = function (ctx) {
        // ctx.scale = gameEngine.currentCamera.zoomScale
        this.activeCamera.clearView(ctx);
        this.ctx.save();
        this.activeCamera.setZoomScale(ctx);
        // this belongs in the camera #camera
        this.lineSprites.forEach(function (sprite) {
            sprite.draw(ctx);
        });
        this.ctx.restore();
        this.activeCamera.update(ctx);
        // ctx.scale(1,1)
    };
    GameEngine.prototype.addMouseListener = function (object) {
        this.mouseListeners.push(object);
    };
    GameEngine.prototype.addMouseEventListener = function (object) {
        this.mouseEventListeners.push(object);
    };
    GameEngine.prototype.updateGameScript = function (delta) {
        if (this.gameScript)
            this.gameScript.update(delta);
    };
    GameEngine.prototype.addGameObject = function (object) {
        this.gameObjects.push(object);
    };
    GameEngine.prototype.addReplayablePhysicsComponent = function (replayablePhysicsComponent) {
        this.replayablePhysicsComponents.push(replayablePhysicsComponent);
    };
    GameEngine.prototype.addPhysicsComponent = function (physicsComponent) {
        this.physicsComponents.push(physicsComponent);
    };
    GameEngine.prototype.addLineSprite = function (lineSprite) {
        lineSprite.transform.cameraTransform = this.activeCamera.transform;
        this.lineSprites.push(lineSprite);
    };
    GameEngine.prototype.queueSound = function (soundURL) {
        if (!this.muted) {
            this.soundsToPlay.add(soundURL);
        }
    };
    GameEngine.prototype.playBackgroundSound = function (sound) {
        sound.play();
        if (this.muted) {
            sound.sound.volume = 0;
        }
        this.backgroundSounds.push(sound);
    };
    // remove(gameObject){
    //   this.toRemoveQueue.push(gameObject)
    // }
    // emptyRemoveQueue(){
    //   this.toRemoveQueue.forEach((gameObject) => {
    //     this.removeAction(gameObject)
    //   })
    // }
    GameEngine.prototype.remove = function (gameObject) {
        if (gameObject.physicsComponent) {
            var physicsComponentIndex = this.physicsComponents.indexOf(gameObject.physicsComponent);
            if (physicsComponentIndex !== -1)
                this.physicsComponents.splice(physicsComponentIndex, 1);
        }
        if (gameObject.lineSprite) {
            var lineSpriteIndex = this.lineSprites.indexOf(gameObject.lineSprite);
            if (lineSpriteIndex !== -1)
                this.lineSprites.splice(lineSpriteIndex, 1);
        }
        this.removeMouseListeners(gameObject);
        this.removeColliders(gameObject.colliders);
        var gameObjectIndex = this.gameObjects.indexOf(gameObject);
        if (gameObjectIndex !== -1)
            this.gameObjects.splice(gameObjectIndex, 1);
    };
    GameEngine.prototype.removeMouseListeners = function (gameObject) {
        this.removeMouseListener(gameObject);
        this.removeClickListener(gameObject);
        this.removeDoubleClickListener(gameObject);
    };
    GameEngine.prototype.removeColliders = function (colliders) {
        var _this = this;
        colliders.forEach(function (collider) {
            if (collider.subscriptions) {
                var colliderSubscriptionsIndex = _this.subscribers.indexOf(collider);
                if (colliderSubscriptionsIndex !== -1)
                    _this.subscribers.splice(colliderSubscriptionsIndex, 1);
            }
            var objectAndColliderTypeList = _this.colliders[collider.objectType][collider.type];
            var colliderIndex = objectAndColliderTypeList.indexOf(collider);
            if (colliderIndex !== -1)
                objectAndColliderTypeList.splice(colliderIndex, 1);
        });
    };
    return GameEngine;
}());

// the idea:
// engine takes in collider with gameobject type as string
// this way subscriptions can be done via string names
// enemy is subscribed to bullets..
// each enemy will check every bullet
// convert gameobject type to string
// colliders can be added without subscriptions
// subscriptions are an array of strings stored with the collider


/***/ }),

/***/ "./src/game_engine/game_object.ts":
/*!****************************************!*\
  !*** ./src/game_engine/game_object.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameObject: () => (/* binding */ GameObject)
/* harmony export */ });
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transform */ "./src/game_engine/transform.ts");
/* harmony import */ var _physics_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./physics_component */ "./src/game_engine/physics_component.ts");
/* harmony import */ var _collider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./collider */ "./src/game_engine/collider.ts");
/* harmony import */ var _game_engine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game_engine */ "./src/game_engine/game_engine.ts");
// import { Util } from "./util";
// import { Sound } from "./sound";




var GameObject = /** @class */ (function () {
    function GameObject(engine) {
        this.isControllable = false;
        this.isFocussedGameObject = false;
        this.replayablePhysicsComponent = null;
        this.gameEngine = engine;
        this.gameEngine.addGameObject(this);
        this.transform = new _transform__WEBPACK_IMPORTED_MODULE_0__.Transform();
        this.childObjects = [];
        this.physicsComponent = null;
        this.lineSprite = null;
        this.parentObject = null;
        this.colliders = [];
    }
    GameObject.prototype.addPhysicsComponent = function () {
        this.physicsComponent = new _physics_component__WEBPACK_IMPORTED_MODULE_1__.PhysicsComponent(this.transform);
        this.gameEngine.addPhysicsComponent(this.physicsComponent);
    };
    GameObject.prototype.addReplayablePhysicsComponent = function () {
        this.replayablePhysicsComponent = new _physics_component__WEBPACK_IMPORTED_MODULE_1__.ReplayablePhysicsComponent(this.transform);
        this.gameEngine.addReplayablePhysicsComponent(this.replayablePhysicsComponent);
    };
    GameObject.prototype.setAsControllableGameObject = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine) {
            this.isControllable = true;
            this.gameEngine.addControllableGameObject(this);
        }
    };
    GameObject.prototype.makeFocussedGameObject = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine) {
            this.isFocussedGameObject = true;
            this.gameEngine.focusControllableGameObject(this);
        }
    };
    GameObject.prototype.addLineSprite = function (lineSprite) {
        this.lineSprite = lineSprite;
        this.gameEngine.addLineSprite(this.lineSprite);
    };
    GameObject.prototype.addMousePosListener = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.addMouseListener(this);
    };
    GameObject.prototype.removeMousePosListener = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.removeMouseListener(this);
    };
    GameObject.prototype.addLeftControlStickListener = function (isControllableGameObject) {
        if (isControllableGameObject === void 0) { isControllableGameObject = true; }
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.addLeftControlStickListener(this);
    };
    GameObject.prototype.addLeftControlStickFocussedListener = function () {
        // only listens when focussed on
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.addLeftControlStickFocussedListener(this);
    };
    GameObject.prototype.addRightControlStickListener = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.addRightControlStickListener(this);
    };
    GameObject.prototype.addXButtonListener = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.addXButtonListener(this);
    };
    GameObject.prototype.addBButtonListener = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.addBButtonListener(this);
    };
    GameObject.prototype.addLKeyListener = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.addLKeyListener(this);
    };
    GameObject.prototype.addKKeyListener = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.addKKeyListener(this);
    };
    GameObject.prototype.addCKeyListener = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.addCKeyListener(this);
    };
    GameObject.prototype.addOKeyListener = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.addOKeyListener(this);
    };
    GameObject.prototype.addBKeyListener = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.addBKeyListener(this);
    };
    GameObject.prototype.addMKeyListener = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.addMKeyListener(this);
    };
    GameObject.prototype.addJKeyListener = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.addJKeyListener(this);
    };
    GameObject.prototype.addFKeyListener = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.addFKeyListener(this);
    };
    GameObject.prototype.addSKeyListener = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.addSKeyListener(this);
    };
    GameObject.prototype.addStartButtonListener = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.addStartButtonListener(this);
    };
    GameObject.prototype.updateKKeyListener = function (pressed) { console.log('overwrite updateKKeyListener'); };
    GameObject.prototype.updateFKeyListener = function (pressed) { console.log('overwrite updateFKeyListener'); };
    GameObject.prototype.updateCKeyListener = function (pressed) { console.log('overwrite updateCKeyListener'); };
    GameObject.prototype.updateOKeyListener = function (pressed) { console.log('overwrite updateOKeyListener'); };
    GameObject.prototype.updateJKeyListener = function (pressed) { console.log('overwrite updateJKeyListener'); };
    GameObject.prototype.updateSKeyListener = function (pressed) { console.log('overwrite updateSKeyListener'); };
    GameObject.prototype.updateLKeyListener = function (pressed) { console.log('overwrite updateLKeyListener'); };
    GameObject.prototype.updateBKeyListener = function (pressed) { console.log('overwrite updateBKeyListener'); };
    GameObject.prototype.updateMKeyListener = function (pressed) { console.log('overwrite updateMKeyListener'); };
    GameObject.prototype.updateBButtonListener = function (pressed) { console.log('overwrite updateBButtonListener for functionality'); };
    GameObject.prototype.updateRightControlFocussedStickInput = function (direction) { console.log(direction, 'overwrite updateRightControlFocussedStickInput'); }; // TODO include object name
    GameObject.prototype.updateLeftControlFocussedStickInput = function (direction, pressed) { console.log(direction, pressed, 'overwrite updateLeftControlFocussedStickInput'); }; // TODO include object name;
    GameObject.prototype.updateRightControlStickInput = function (direction) { return console.log(direction, 'overwrite updateRightControlStickInput'); }; // TODO include object name
    GameObject.prototype.updateLeftControlStickInput = function (direction, pressed) { return console.log(direction, pressed, 'overwrite updateLeftControlStickInput'); }; // TODO include object name
    GameObject.prototype.updateXButtonListener = function (pressed) { return console.log(pressed, "overwrite updateXButtonListener"); }; // TODO include object name
    GameObject.prototype.updateStartButtonListener = function (pressed) { return console.log(pressed, 'overwrite updateStartButtonListener'); }; // TODO include object name
    GameObject.prototype.updateMousePos = function (mousePos) { return console.log(mousePos, 'overwrite updateMousePos'); }; // TODO include object name
    GameObject.prototype.updateFocussedMousePos = function (mousePos) { return console.log(mousePos, 'overwrite updateFocussedMousePos'); }; // TODO include object name
    GameObject.prototype.addClickListener = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.addClickListener(this);
    };
    GameObject.prototype.removeClickListener = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.removeClickListener(this);
    };
    GameObject.prototype.mouseClicked = function (mousePos) { return console.log(mousePos, 'overwrite mouseClicked'); }; // TODO include object name
    GameObject.prototype.mouseDowned = function (mousePos) { return console.log(mousePos, 'overwrite mouseDowned'); }; // TODO include object name
    GameObject.prototype.mouseDoubleClicked = function (mousePos) { return console.log(mousePos, 'overwrite mouseDoubleClicked'); }; // TODO include object name
    GameObject.prototype.addCollider = function (type, gameObject, radius, subscriptionTypes, subscriptions) {
        // game engine checks every collider with it's subscription types
        var newCollider = new _collider__WEBPACK_IMPORTED_MODULE_2__.Collider(type, gameObject, radius, subscriptionTypes, subscriptions);
        this.colliders.push(newCollider);
        this.gameEngine.addCollider(newCollider);
    };
    GameObject.prototype.playSound = function (soundURL) {
        this.gameEngine.queueSound(soundURL);
    };
    // relative motion needs to be fixed... FOR ANOTHER TIME
    GameObject.prototype.addChildGameObject = function (obj) {
        this.childObjects.push(obj);
        // if (relative) {
        //     obj.transform.parentTransform = this.transform;
        // }
        obj.parentObject = this;
    };
    GameObject.prototype.removeMouseListeners = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine) {
            this.gameEngine.removeMouseListener(this);
            this.gameEngine.removeClickListener(this);
            this.gameEngine.removeDoubleClickListener(this);
        }
    };
    GameObject.prototype.remove = function (singularRemove) {
        if (singularRemove === void 0) { singularRemove = true; }
        this.childObjects.forEach(function (obj) {
            obj.remove(false);
        });
        if (singularRemove && this.parentObject) {
            var index = this.parentObject.childObjects.indexOf(this);
            if (index !== -1)
                this.parentObject.childObjects.splice(index, 1);
        }
        this.gameEngine.remove(this);
    };
    return GameObject;
}());



/***/ }),

/***/ "./src/game_engine/line_sprite.ts":
/*!****************************************!*\
  !*** ./src/game_engine/line_sprite.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LineSprite: () => (/* binding */ LineSprite)
/* harmony export */ });
var LineSprite = /** @class */ (function () {
    function LineSprite(transform) {
        this.transform = transform;
        this.zoomScaling = 1;
        this.visible = true;
    }
    LineSprite.prototype.makeVisible = function () {
        this.visible = true;
    };
    LineSprite.prototype.makeInvisible = function () {
        this.visible = false;
    };
    return LineSprite;
}());



/***/ }),

/***/ "./src/game_engine/physics_component.ts":
/*!**********************************************!*\
  !*** ./src/game_engine/physics_component.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PhysicsComponent: () => (/* binding */ PhysicsComponent),
/* harmony export */   ReplayablePhysicsComponent: () => (/* binding */ ReplayablePhysicsComponent)
/* harmony export */ });
var PhysicsComponent = /** @class */ (function () {
    function PhysicsComponent(transform) {
        this.transform = transform;
    }
    PhysicsComponent.prototype.move = function (timeDelta) {
        // timeDelta is number of milliseconds since last move
        // if the computer is busy the time delta will be larger
        // in this case the PhysicsObject should move farther in this frame
        var timeScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        this.transform.pos[0] += this.transform.vel[0] * timeScale + (this.transform.acc[0] * (Math.pow(timeScale, 2))) / 2;
        this.transform.pos[1] += this.transform.vel[1] * timeScale + (this.transform.acc[1] * (Math.pow(timeScale, 2))) / 2;
        this.transform.pos[2] += this.transform.vel[2] * timeScale + (this.transform.acc[2] * (Math.pow(timeScale, 2))) / 2;
        this.transform.vel[0] += this.transform.acc[0] * timeScale;
        this.transform.vel[1] += this.transform.acc[1] * timeScale;
        this.transform.vel[2] += this.transform.acc[2] * timeScale;
        this.transform.angle += this.transform.aVel * timeScale + this.transform.aAcc * (Math.pow(timeScale, 2)) / 2;
        this.transform.aVel += this.transform.aAcc * timeScale;
        this.transform.acc = [0, 0, 0];
        this.transform.aAcc = 0;
    };
    return PhysicsComponent;
}());

var ReplayablePhysicsComponent = /** @class */ (function () {
    function ReplayablePhysicsComponent(transform) {
        this.isAccelerating = false;
        this.isTurning = false;
        this.movementTangentAngle = null;
        // This will need to be carefully updated
        // since it kind of implies things
        this.restSpeed = null;
        this.transform = transform;
        this.accelerationInformation = {};
        this.turnInformation = {};
        this.instructionsCompleted = [];
    }
    ReplayablePhysicsComponent.prototype.startSimpleArchRotation = function (turnParams) {
    };
    // to reverse time, I can replay the commands in reverse. in game time is the same
    // and have them in the opposite direction
    // game object will have to provide the rotation point.
    // this makes sense since only it will know what that should be depending on game feel
    // the command to rotate will start with accelerating/decelerating to tangent speed
    // then startArchRotation is called
    ReplayablePhysicsComponent.prototype.startArchRotation = function (turnParams) {
        var rotationPoint = turnParams.rotationPoint, turnRadius = turnParams.turnRadius, isTurningRight = turnParams.isTurningRight, tangentSpeed = turnParams.tangentSpeed, startAngle = turnParams.startAngle, endAngle = turnParams.endAngle, gameTimeArchStarted = turnParams.gameTimeArchStarted, pointWhereArchStarted = turnParams.pointWhereArchStarted, nextInstruction = turnParams.nextInstruction, currentGameTime = turnParams.currentGameTime;
        if (this.isAccelerating) {
            console.log('interrupting Acceleration to Turn');
        }
        if (this.isTurning) {
            console.log('interrupting Turn to change Turn');
        }
        if (this.isTurning) {
            return this.interruptTurn({
                rotationPoint: rotationPoint,
                turnRadius: turnRadius,
                isTurningRight: isTurningRight,
                tangentSpeed: tangentSpeed,
                startAngle: startAngle,
                endAngle: endAngle,
                gameTimeArchStarted: gameTimeArchStarted,
                pointWhereArchStarted: pointWhereArchStarted,
            });
        }
        // will have a precise time and location when the arch started while playing back controls
        // in that case we'll have to piece wise connect the arch and previous section
        console.log('input for startArchRotation', {
            rotationPoint: rotationPoint,
            tangentSpeed: tangentSpeed,
            endAngle: endAngle,
            gameTimeArchStarted: gameTimeArchStarted,
            pointWhereArchStarted: pointWhereArchStarted,
        });
        // isRotating should have been made false by the interruption of the rotation
        this.isAccelerating = false;
        this.isTurning = true;
        if (isTurningRight && startAngle > endAngle) {
            endAngle = endAngle + Math.PI * 2;
        }
        else if (!isTurningRight && endAngle > startAngle) {
            startAngle = startAngle + Math.PI * 2;
        }
        var angleDifference = endAngle - startAngle;
        // when replaying an action, we'll need a catchup time function which will be like the move function
        // we'd run the move function for the previous action up to the time of the new action start
        // then run the new action's move function for the rest of the time
        this.turnInformation.startingPoint = pointWhereArchStarted;
        this.turnInformation.turnRadius = turnRadius;
        var rotationDirection = isTurningRight ? 1 : -1;
        this.turnInformation.rotationDirection = rotationDirection;
        this.transform.archAngleVelocity = tangentSpeed / this.turnInformation.turnRadius * rotationDirection;
        this.turnInformation.tangentSpeed = tangentSpeed;
        this.turnInformation.rotationPoint = [rotationPoint[0], rotationPoint[1]];
        this.turnInformation.endAngleFromRotationPointIfUninterrupted = endAngle;
        this.turnInformation.gameTimeWhenTurnEnds = gameTimeArchStarted + Math.abs((angleDifference) / this.transform.archAngleVelocity);
        this.turnInformation.gameTimeWhenTurnStarted = gameTimeArchStarted;
        this.turnInformation.startAngle = startAngle;
        this.turnInformation.nextInstruction = nextInstruction;
        this.turnInformation.endPoint = [
            rotationPoint[0] + this.turnInformation.turnRadius * Math.cos(endAngle - Math.PI / 2) * rotationDirection,
            rotationPoint[1] + this.turnInformation.turnRadius * Math.sin(endAngle - Math.PI / 2) * rotationDirection
        ];
        if (currentGameTime) {
            // is this necessary? does it mean we're moving twice in the same frame?
            // or is this just for replaying commands?
            // or would that even matter if it was just for replaying commands? 
            this.move(currentGameTime - gameTimeArchStarted, currentGameTime);
        }
        console.log('colected turn information', this.turnInformation);
    };
    ReplayablePhysicsComponent.prototype.interruptTurn = function (interruptTurnParams) {
        var rotationPoint = interruptTurnParams.rotationPoint, turnRadius = interruptTurnParams.turnRadius, isTurningRight = interruptTurnParams.isTurningRight, tangentSpeed = interruptTurnParams.tangentSpeed, startAngle = interruptTurnParams.startAngle, endAngle = interruptTurnParams.endAngle, gameTimeArchStarted = interruptTurnParams.gameTimeArchStarted, pointWhereArchStarted = interruptTurnParams.pointWhereArchStarted;
    };
    ReplayablePhysicsComponent.prototype.startAcceleration = function (accelerationParams) {
        var acceleration = accelerationParams.acceleration, endSpeed = accelerationParams.endSpeed, gameTimeAccelerationStarted = accelerationParams.gameTimeAccelerationStarted, currentGameTime = accelerationParams.currentGameTime, onStartDirection = accelerationParams.onStartDirection, nextInstruction = accelerationParams.nextInstruction;
        console.log('startAccelerationInstruction', accelerationParams);
        if (this.isAccelerating) {
            console.log('interrupting Acceleration to change Acceleration');
        }
        if (this.isTurning) {
            console.log('interrupting Turn to Accelerate instead');
        }
        // isRotating should have been made false by the interruption of the rotation
        this.isTurning = false;
        this.isAccelerating = true;
        var isDecelerating = acceleration < 0;
        var currentSpeed = null;
        var velocityAngle = null;
        if (onStartDirection) { // only on start
            currentSpeed = 0;
            velocityAngle = onStartDirection;
        }
        else {
            currentSpeed = Math.sqrt(Math.pow(this.transform.vel[0], 2) + Math.pow(this.transform.vel[1], 2));
            velocityAngle = Math.atan2(this.transform.vel[1], this.transform.vel[0]);
        }
        var timeUntilAccelerationEnds = (endSpeed - currentSpeed) / acceleration;
        var gameTimeWhenAccelerationEnds = timeUntilAccelerationEnds + gameTimeAccelerationStarted;
        var accelerationDistanceIfUninterrupted = currentSpeed * timeUntilAccelerationEnds + 0.5 * acceleration * Math.pow(timeUntilAccelerationEnds, 2);
        var accelerationEndPositionIfUninterrupted = [
            this.transform.pos[0] + Math.cos(velocityAngle) * accelerationDistanceIfUninterrupted,
            this.transform.pos[1] + Math.sin(velocityAngle) * accelerationDistanceIfUninterrupted
        ];
        var endVelocityIfUninterrupted = [
            Math.cos(velocityAngle) * endSpeed,
            Math.sin(velocityAngle) * endSpeed
        ];
        // I don't think I want external forces to be applied for replayable physics components
        this.transform.acc[0] = Math.cos(velocityAngle) * acceleration;
        this.transform.acc[1] = Math.sin(velocityAngle) * acceleration;
        var endSpeedIfUninterrupted = endSpeed;
        // okay, I think all I have to do, is detect when an instruction will have to be updated,
        // or ended early with another added.
        // so all I have to do for now is allow the current instruction to be overwritten
        // until I'm at the point where I need to keep track of all the instructions
        // ... direction as in positive or negative.... 
        var accelerationSameDirection = this.accelerationInformation.acceleration > 0 && acceleration > 0 || this.accelerationInformation.acceleration < 0 && acceleration < 0;
        // if it's the opposite direction, then end early and start a next instruction
        if (!accelerationSameDirection && onStartDirection === null) {
            var previousInstructionToEnd = this.duplicateAccelerationInstruction();
            // I should end the current on, then:
            // I should probably call myself here: this.startAcceleration
            // end instruction, the same as "usual".. once I've made what usually happens
            // Update To Slower/Faster Speed 
            // case 1: 
            // accelerating to max speed after a tight turn, 
            // accelerating still, but now to a slower speed for a less tight turn
            // case 2:
            // accelerating to turn speed, but now accelerating to max speed
            // because the turn is canceled
            // case 3:
            // decelerating for tight turn, but now I'm decelerating 
            // to a shallow turn with faster speed
            // case 4:
            // decelerating for shallow turn, but now I'm decelerating to a tighter turn 
            // slower speed
            // **********************
            // Update acceleration direction
            // case 1: turning deceleration canceled, now accelerating
            // case 2: acceleration to max speed canceled, new decelerating
            // case 3: accelerating to turn speed canceled, turning tighter so decelerating now
            // I need to update the endtime for the acceleration
            // if it was decelerating but is now accelerating, 
            // then we also need to add a new instruction for slowing down
        }
        // if interrupting in the same direction, 
        // we're just updating the end speed
        // the start time of the acceleration seems to be required to be handled for replay somewhere else
        this.accelerationInformation = {
            acceleration: acceleration,
            nextInstruction: nextInstruction,
            isDecelerating: isDecelerating,
            gameTimeWhenAccelerationEnds: gameTimeWhenAccelerationEnds,
            accelerationEndPositionIfUninterrupted: accelerationEndPositionIfUninterrupted,
            endVelocityIfUninterrupted: endVelocityIfUninterrupted,
            endSpeedIfUninterrupted: endSpeedIfUninterrupted
        };
        console.log({ accelerationInformationCollected: this.accelerationInformation, isAccelerating: this.isAccelerating, currentGameTime: currentGameTime });
        if (currentGameTime) {
            this.move(currentGameTime - gameTimeAccelerationStarted, currentGameTime);
        }
    };
    ReplayablePhysicsComponent.prototype.duplicateAccelerationInstruction = function () {
        var _a, _b, _c, _d;
        var duplicatedAccelerationInstruction = {
            isDecelerating: this.accelerationInformation.isDecelerating,
            accelerationEndPositionIfUninterrupted: [
                (_a = this.accelerationInformation) === null || _a === void 0 ? void 0 : _a.accelerationEndPositionIfUninterrupted[0],
                (_b = this.accelerationInformation) === null || _b === void 0 ? void 0 : _b.accelerationEndPositionIfUninterrupted[1],
            ],
            endVelocityIfUninterrupted: [
                (_c = this.accelerationInformation) === null || _c === void 0 ? void 0 : _c.endVelocityIfUninterrupted[0],
                (_d = this.accelerationInformation) === null || _d === void 0 ? void 0 : _d.endVelocityIfUninterrupted[1]
            ],
            gameTimeWhenAccelerationEnds: this.accelerationInformation.gameTimeWhenAccelerationEnds,
            endSpeedIfUninterrupted: this.accelerationInformation.endSpeedIfUninterrupted,
            nextInstruction: this.accelerationInformation.nextInstruction,
            acceleration: this.accelerationInformation.acceleration
        };
        return duplicatedAccelerationInstruction;
    };
    ReplayablePhysicsComponent.prototype.move = function (timeDelta, gameTime) {
        // const timeScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        var originalPosition = [this.transform.pos[0], this.transform.pos[1]];
        if (this.isAccelerating) {
            var _a = this.accelerationInformation, endVelocityIfUninterrupted = _a.endVelocityIfUninterrupted, gameTimeWhenAccelerationEnds = _a.gameTimeWhenAccelerationEnds, accelerationEndPositionIfUninterrupted = _a.accelerationEndPositionIfUninterrupted, endSpeedIfUninterrupted = _a.endSpeedIfUninterrupted, nextInstruction = _a.nextInstruction;
            // if the game time is after the acceleration should have finished
            if (gameTime >= gameTimeWhenAccelerationEnds) {
                // if the game time is after the acceleration should have finished
                console.log('Acceleration ended', {
                    currentPosition: this.transform.pos,
                    settingPosition: this.accelerationInformation.accelerationEndPositionIfUninterrupted,
                    gameTimeWhenAccelerationEnds: this.accelerationInformation.gameTimeWhenAccelerationEnds,
                    gameTime: gameTime
                });
                this.instructionsCompleted.push("".concat(this.accelerationInformation.isDecelerating ? 'negative' : 'positive', " acceleration completed"));
                console.log(this.instructionsCompleted);
                var timeSinceAccelerationEnded = gameTime - gameTimeWhenAccelerationEnds;
                this.restSpeed = endSpeedIfUninterrupted;
                if (nextInstruction) {
                    // finish rotation and then:
                    this.isAccelerating = false;
                    this.transform.vel[0] = endVelocityIfUninterrupted[0];
                    this.transform.vel[1] = endVelocityIfUninterrupted[1];
                    this.transform.pos[0] = accelerationEndPositionIfUninterrupted[0];
                    this.transform.pos[1] = accelerationEndPositionIfUninterrupted[1];
                    this.transform.acc[0] = 0;
                    this.transform.acc[1] = 0;
                    this.accelerationInformation = {};
                    this.applyNextInstruction(nextInstruction, gameTime, gameTimeWhenAccelerationEnds);
                }
                else {
                    this.isAccelerating = false;
                    this.transform.vel[0] = endVelocityIfUninterrupted[0];
                    this.transform.vel[1] = endVelocityIfUninterrupted[1];
                    this.transform.pos[0] = accelerationEndPositionIfUninterrupted[0] + timeSinceAccelerationEnded * this.transform.vel[0];
                    this.transform.pos[1] = accelerationEndPositionIfUninterrupted[1] + timeSinceAccelerationEnded * this.transform.vel[1];
                    this.transform.acc[0] = 0;
                    this.transform.acc[1] = 0;
                    this.accelerationInformation = {};
                }
            }
            else {
                // apply the acceleration
                this.transform.pos[0] += this.transform.vel[0] * timeDelta + (this.transform.acc[0] * (timeDelta * timeDelta)) / 2;
                this.transform.pos[1] += this.transform.vel[1] * timeDelta + (this.transform.acc[1] * (timeDelta * timeDelta)) / 2;
                this.transform.vel[0] += this.transform.acc[0] * timeDelta;
                this.transform.vel[1] += this.transform.acc[1] * timeDelta;
                // this.transform.pos[0] += this.transform.vel[0] * timeScale + (this.transform.acc[0] * (timeScale * timeScale)) / 2;
                // this.transform.pos[1] += this.transform.vel[1] * timeScale + (this.transform.acc[1] * (timeScale * timeScale)) / 2;
                // this.transform.vel[0] += this.transform.acc[0] * timeScale;
                // this.transform.vel[1] += this.transform.acc[1] * timeScale;
            }
        }
        else if (this.isTurning) {
            var _b = this.turnInformation, endAngleFromRotationPointIfUninterrupted = _b.endAngleFromRotationPointIfUninterrupted, tangentSpeed = _b.tangentSpeed, rotationPoint = _b.rotationPoint, turnRadius = _b.turnRadius, endPoint = _b.endPoint, gameTimeWhenTurnEnds = _b.gameTimeWhenTurnEnds, nextInstruction = _b.nextInstruction;
            // great... at the end of the rotation it accelerates to max speed
            // so when I piece together the rotation + straight I have to account for that
            // I just need to find the time that the rotation ended vs the current time
            // if rotation, rotate around the rotation point
            // using archAngleVelocity
            // in reverse, I'll also have to know the time that the acceleration ended
            // to apply it in reverse
            if (gameTime > gameTimeWhenTurnEnds) {
                this.transform.pos[0] = endPoint[0];
                this.transform.pos[1] = endPoint[1];
                var timeSinceTurnEnded = gameTime - gameTimeWhenTurnEnds;
                console.log('Turning ended');
                this.instructionsCompleted.push("Turn Completed. Direction: ".concat(this.turnInformation.rotationDirection > 0 ? 'Right' : 'Left'));
                console.log(this.instructionsCompleted);
                // this.movementTangentAngle = endAngleFromRotationPointIfUninterrupted;
                var endVelocityIfUninterrupted = [
                    tangentSpeed * Math.cos(endAngleFromRotationPointIfUninterrupted),
                    tangentSpeed * Math.sin(endAngleFromRotationPointIfUninterrupted)
                ];
                this.isTurning = false;
                this.transform.vel[0] = endVelocityIfUninterrupted[0];
                this.transform.vel[1] = endVelocityIfUninterrupted[1];
                // then we need to do the next instruction, which will be a straight acceleration
                // for the aurora
                // if no next instruction given, then maintain the current speed
                if (nextInstruction) {
                    // finish rotation and then:
                    this.applyNextInstruction(nextInstruction, gameTime, gameTimeWhenTurnEnds);
                }
                else {
                    this.transform.pos[0] += timeSinceTurnEnded * this.transform.vel[0];
                    this.transform.pos[1] += timeSinceTurnEnded * this.transform.vel[1];
                    this.restSpeed = tangentSpeed;
                    this.turnInformation = {};
                }
            }
            else {
                // I'll need starting game time, and current game time. Then 
                // I think I need to apply the movement based on where it should be at what game time,
                // instead of incrementing
                var timeSinceTurnStarted = (gameTime - this.turnInformation.gameTimeWhenTurnStarted);
                var archAngleVelocity = this.transform.archAngleVelocity;
                var newArchAngle = this.turnInformation.startAngle - Math.PI / 2 + archAngleVelocity * timeSinceTurnStarted;
                // likely the issue:
                this.transform.pos[0] = rotationPoint[0] + this.turnInformation.rotationDirection * turnRadius * Math.cos(newArchAngle);
                this.transform.pos[1] = rotationPoint[1] + this.turnInformation.rotationDirection * turnRadius * Math.sin(newArchAngle);
            }
        }
        else {
            // no acceleration, so just moving
            this.transform.pos[0] += this.transform.vel[0] * timeDelta;
            this.transform.pos[1] += this.transform.vel[1] * timeDelta;
            // this.transform.pos[0] += this.transform.vel[0] * timeScale;
            // this.transform.pos[1] += this.transform.vel[1] * timeScale;
        }
        this.movementTangentAngle = (Math.atan2(this.transform.pos[1] - originalPosition[1], this.transform.pos[0] - originalPosition[0]) + Math.PI * 2) % (Math.PI * 2);
    };
    ReplayablePhysicsComponent.prototype.applyNextInstruction = function (nextInstruction, currentGameTime, gameTimeItStarts) {
        if (nextInstruction.type === 'accelerate') {
            this.startAcceleration({
                acceleration: nextInstruction.acceleration,
                endSpeed: nextInstruction.endSpeed,
                currentGameTime: currentGameTime,
                gameTimeAccelerationStarted: gameTimeItStarts
            });
        }
        if (nextInstruction.type === 'turn') {
            var turnRadius = nextInstruction.turnRadius, isTurningRight = nextInstruction.isTurningRight, tangentSpeed = nextInstruction.tangentSpeed, endAngle = nextInstruction.endAngle, startAngle = nextInstruction.startAngle, followupInstruction = nextInstruction.nextInstruction;
            var currentPosition = [this.transform.pos[0], this.transform.pos[1]];
            var pointWhereArchStarted = [currentPosition[0], currentPosition[1]];
            var normalAngle = isTurningRight ? startAngle + Math.PI / 2 : startAngle - Math.PI / 2;
            var rotationPoint = [
                pointWhereArchStarted[0] + turnRadius * Math.cos(normalAngle),
                pointWhereArchStarted[1] + turnRadius * Math.sin(normalAngle)
            ];
            this.startArchRotation({
                turnRadius: turnRadius,
                isTurningRight: isTurningRight,
                tangentSpeed: tangentSpeed,
                startAngle: startAngle,
                endAngle: endAngle,
                pointWhereArchStarted: pointWhereArchStarted, // try to create this later
                rotationPoint: rotationPoint, // try to create this later
                gameTimeArchStarted: gameTimeItStarts, // try to create this later
                currentGameTime: currentGameTime,
                nextInstruction: followupInstruction
            });
        }
    };
    return ReplayablePhysicsComponent;
}());

var NORMAL_FRAME_TIME_DELTA = 1000 / 60;


/***/ }),

/***/ "./src/game_engine/sound.ts":
/*!**********************************!*\
  !*** ./src/game_engine/sound.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sound: () => (/* binding */ Sound)
/* harmony export */ });
// finally I think I found an optimizing thing
// I need to load all the sounds at the start of the game
// then play the individual sound
// instead of creating new sounds each time
// to have overlapping sounds, I'll need to pre-create a bunch of them and play them in a loop large enough to handle how many overlaps I might have
// I'll have the game script load up the sounds in to the game engine, then the game engine will grab the next one from each array
var Sound = /** @class */ (function () {
    function Sound(url, volume) {
        this.url = url;
        this.volume = volume || 1;
        // this.sound = ({
        //     volume: 0,
        //     play: () => {},
        // }) as unknown as HTMLAudioElement;
        this.sound = new Audio(this.url);
        this.sound.volume = volume;
        this.isPlaying = false;
    }
    Sound.prototype.play = function () {
        // if (this.sound) {
        //   this.sound.play()
        // } else {
        // whoops, forgot to fix this part that's actually important
        // this needs to be fixed lol
        // if(!this.isPlaying || this.sound.ended) this.sound.play();
        this.sound.play();
        this.isPlaying = true;
        // }
    };
    Sound.prototype.toggleMute = function () {
        if (this.sound) {
            this.muted ? this.unmute() : this.mute();
        }
    };
    Sound.prototype.unmute = function () {
        if (this.sound) {
            this.muted = false;
            this.sound.volume = this.volume;
        }
    };
    Sound.prototype.mute = function () {
        if (this.sound) {
            this.muted = true;
            this.sound.volume = 0;
        }
    };
    Sound.prototype.pause = function () {
        if (this.sound) {
            this.sound.pause();
        }
    };
    Sound.prototype.unPause = function () {
        if (this.sound) {
            this.sound.play();
        }
    };
    return Sound;
}());



/***/ }),

/***/ "./src/game_engine/transform.ts":
/*!**************************************!*\
  !*** ./src/game_engine/transform.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Transform: () => (/* binding */ Transform)
/* harmony export */ });
var Transform = /** @class */ (function () {
    function Transform(cameraTransform, pos, vel, acc, angle, aVel, aAcc, parentTransform) {
        if (cameraTransform === void 0) { cameraTransform = null; }
        if (pos === void 0) { pos = [0, 0, 0]; }
        if (vel === void 0) { vel = [0, 0, 0]; }
        if (acc === void 0) { acc = [0, 0, 0]; }
        if (angle === void 0) { angle = 0; }
        if (aVel === void 0) { aVel = 0; }
        if (aAcc === void 0) { aAcc = 0; }
        if (parentTransform === void 0) { parentTransform = null; }
        this.archAngleVelocity = null;
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
    Transform.prototype.getRenderPosition = function () {
        // takes in the camera position and the object's position
        // returns the render position (position projected on to the field)
        //Yp = -Zc(Ys - Yc)/(-Zc + Zs)
        //Xp = -Zc(Xs - Xc)/(-Zc + Zs)
    };
    // call up the tree of parent transforms until null
    // performing the transformation each step for the absolute
    Transform.prototype.absoluteAngle = function () {
        if (this.parentTransform == null) {
            return this.angle;
        }
        else {
            return this.angleAdd(this.angle, this.parentTransform.absoluteAngle());
        }
    };
    // might have to make a more obvious function name
    // if the return type wrong. Like getScreenPosition
    Transform.prototype.absolutePosition = function () {
        var absPos = [0, 0];
        if (this.parentTransform == null) {
            if (this.pos[2] !== 0 && !isNaN(this.pos[2])) {
                var Xc = this.cameraTransform.pos[0];
                var Yc = this.cameraTransform.pos[1];
                var Zc = this.cameraTransform.pos[2];
                var Xs = this.pos[0];
                var Ys = this.pos[1];
                var Zs = this.pos[2];
                var Yp = Yc + (Ys - Yc) / (Zs - Zc) * (0 - Zc);
                var Xp = Xc + (Xs - Xc) / (Zs - Zc) * (0 - Zc);
                absPos = [Xp, Yp];
            }
            else {
                absPos = [this.pos[0], this.pos[1]];
            }
            return absPos;
        }
        else {
            return this.vectorAdd([this.pos[0], this.pos[1]], this.parentTransform.absolutePosition());
        }
    };
    Transform.prototype.absoluteLength = function (length) {
        // doesn't care about line orientation
        // center of the line is current position, or adjusted by relative position
        // assuming camera is on top of the line
        if (this.cameraTransform) {
            var linePosition = this.vectorAdd([0, 0, 0], this.pos);
            var Zc = this.cameraTransform.pos[2];
            var pointOne = length / 2;
            var pointTwo = -length / 2;
            var Zs = linePosition[2];
            var absPointOne = (pointOne) / (Zs - Zc) * (0 - Zc);
            var absPointTwo = (pointTwo) / (Zs - Zc) * (0 - Zc);
            return absPointOne - absPointTwo;
        }
        return length;
    };
    Transform.prototype.absoluteVelocity = function () {
        var absVel = [];
        if (this.parentTransform == null) {
            absVel = this.vel;
            return absVel;
        }
        else {
            return this.vectorAdd(this.vel, this.parentTransform.absoluteVelocity());
        }
    };
    Transform.prototype.absoluteAcceleration = function () {
        var absAcc = [];
        if (this.parentTransform == null) {
            absAcc = this.acc;
            return absAcc;
        }
        else {
            return this.vectorAdd(this.acc, this.parentTransform.absoluteAcceleration());
        }
    };
    Transform.prototype.vectorAdd = function (vector1, vector2) {
        return vector1.length === 3 && vector2.length === 3 ?
            [vector1[0] + vector2[0], vector1[1] + vector2[1], vector1[2] + vector2[2]] :
            [vector1[0] + vector2[0], vector1[1] + vector2[1]];
    };
    Transform.prototype.angleAdd = function (angle1, angle2) {
        return (angle1 + angle2) % (2 * Math.PI);
    };
    return Transform;
}());



/***/ }),

/***/ "./src/game_engine/util.ts":
/*!*********************************!*\
  !*** ./src/game_engine/util.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VectorMath: () => (/* binding */ VectorMath),
/* harmony export */   getNumberFromRange: () => (/* binding */ getNumberFromRange)
/* harmony export */ });
// Normalize the length of the vector to 1, maintaining direction.
function dir(vec) {
    if (vec[0] === 0 && vec[1] === 0)
        return [0, 0];
    var normalized = norm(vec);
    return scale(vec, 1 / normalized);
}
function dir3(vec) {
    if (vec[0] === 0 && vec[1] === 0 && vec[2] === 0)
        return [0, 0, 0];
    var normalized = norm(vec);
    return scale(vec, 1 / normalized);
}
function vectorCartesian(angle, scale) {
    var vector = [0, 0];
    vector = [scale * Math.cos(angle), scale * Math.sin(angle)];
    return vector;
}
function vector3Cartesian(angle, // angle is [plane, out of plane]
scale) {
    return [
        scale * Math.cos(angle[0]) * Math.cos(angle[1]),
        scale * Math.sin(angle[0]) * Math.cos(angle[1]),
        scale * Math.sin(angle[1])
    ];
}
function vector3Add(vec1, vec2) {
    return [vec1[0] + vec2[0], vec1[1] + vec2[1], vec1[2] + vec2[2]];
}
// Find distance between two points.
function dist(pos1, pos2) {
    return Math.sqrt(Math.pow((pos1[0] - pos2[0]), 2) + Math.pow((pos1[1] - pos2[1]), 2) + Math.pow((pos1[2] || 0 - pos2[2] || 0), 2));
}
// Find the length of the vector.
function norm(vec) {
    return dist([0, 0, 0], [vec[0], vec[1], vec[2] || 0]);
}
// Return a randomly oriented vector with the given length.
function randomVec(length) {
    var deg = 2 * Math.PI * Math.random();
    return scale([Math.sin(deg), Math.cos(deg)], length);
}
function angleBetweenVectors2(vector1, vector2) {
}
function scale(vec, m) {
    if (vec.length === 3) {
        return [vec[0] * m, vec[1] * m, vec[2] * m];
    }
    return [vec[0] * m, vec[1] * m];
}
var VectorMath = {
    dir: dir,
    dir3: dir3,
    vectorCartesian: vectorCartesian,
    vector3Cartesian: vector3Cartesian,
    vector3Add: vector3Add,
    dist: dist,
    norm: norm,
    randomVec: randomVec,
    scale: scale,
};
var getNumberFromRange = function (baseNumber, range) { return ((baseNumber - range / 2 + Math.random() * range)); };


/***/ }),

/***/ "./src/game_objects/Bullet/bullet.ts":
/*!*******************************************!*\
  !*** ./src/game_objects/Bullet/bullet.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bullet: () => (/* binding */ Bullet)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _particles_bullet_wall_explosion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../particles/bullet_wall_explosion */ "./src/game_objects/particles/bullet_wall_explosion.ts");
/* harmony import */ var _bullet_sprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bullet_sprite */ "./src/game_objects/Bullet/bullet_sprite.js");
/* harmony import */ var _particles_particle_explosion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../particles/particle_explosion */ "./src/game_objects/particles/particle_explosion.ts");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../game_engine/util */ "./src/game_engine/util.ts");
/* harmony import */ var _enemies_Singularity_singularity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../enemies/Singularity/singularity */ "./src/game_objects/enemies/Singularity/singularity.ts");
/* harmony import */ var _GEOWarsScript__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../GEOWarsScript */ "./src/GEOWarsScript.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet(engine, pos, // we ignore the third one here
    vel, bulletNumber, powerUpSide, powerLevel) {
        var _this = _super.call(this, engine) || this;
        _this.ID = bulletNumber;
        _this.transform.pos[0] = pos[0];
        _this.transform.pos[1] = pos[1];
        _this.transform.pos[2] = 0;
        _this.transform.vel[0] = vel[0];
        _this.transform.vel[1] = vel[1];
        _this.transform.vel[2] = 0;
        _this.length = 12;
        _this.radius = _this.length / 4;
        _this.wrap = false;
        _this.addExplosionCollider();
        _this.addPhysicsComponent();
        _this.addLineSprite(new _bullet_sprite__WEBPACK_IMPORTED_MODULE_2__.BulletSprite(_this.transform));
        _this.exploded = false;
        _this.lifeTime = 4000;
        _this.aliveTime = 0;
        _this.powerUpSide = powerUpSide;
        _this.bending = true;
        _this.bendTime = 0;
        _this.timeToBend = 1000;
        _this.powerLevel = powerLevel || 1;
        if (!powerUpSide) {
            _this.bending = false;
        }
        return _this;
    }
    Bullet.prototype.addExplosionCollider = function () {
        var subscribers = [
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
    };
    Bullet.prototype.update = function (deltaTime) {
        this.aliveTime += deltaTime;
        if (this.aliveTime > this.lifeTime) {
            this.remove();
        }
        if (this.bending) {
            this.bend(deltaTime);
        }
        if (_GEOWarsScript__WEBPACK_IMPORTED_MODULE_6__.GEOWarsScript.isOutOfBounds(this.transform.absolutePosition(), this.radius) &&
            !this.exploded) {
            this.exploded = true;
            new _particles_bullet_wall_explosion__WEBPACK_IMPORTED_MODULE_1__.BulletWallExplosion(this.gameEngine, this.transform.pos);
            this.remove();
        }
    };
    Bullet.prototype.animate = function () {
    };
    Bullet.prototype.bend = function (deltaTime) {
        this.bendTime += deltaTime;
        if (this.bendTime > this.timeToBend) {
            this.bending = false;
        }
        else {
            var speed = _game_engine_util__WEBPACK_IMPORTED_MODULE_4__.VectorMath.norm(this.transform.vel);
            var velDir = Math.atan2(this.transform.vel[1], this.transform.vel[0]);
            var bendSpeed = void 0;
            if (this.powerLevel > 2) {
                // maybe I control the speed with trigger pressure
                bendSpeed = this.powerUpSide === 'left' ? -0.0098 * deltaTime : 0.0098 * deltaTime; // (pi/32) / 1000 radians per milisecond
            }
            else {
                bendSpeed = this.powerUpSide === 'left' ? -0.000098 * deltaTime : 0.000098 * deltaTime; // (pi/32) / 1000 radians per milisecond
            }
            this.transform.vel[0] = Math.cos(velDir + bendSpeed) * speed;
            this.transform.vel[1] = Math.sin(velDir + bendSpeed) * speed;
        }
        // take speed, take velocity direction, change direction with bend speed, apply speed to that direction 
    };
    Bullet.prototype.onCollision = function (collider, type) {
        if (type === "bulletHit") {
            if (collider.gameObject instanceof _enemies_Singularity_singularity__WEBPACK_IMPORTED_MODULE_5__.Singularity) {
                collider.gameObject.bulletHit();
                this.remove();
            }
            else {
                var hitObjectTransform = collider.gameObject.transform;
                var pos = hitObjectTransform.absolutePosition();
                new _particles_particle_explosion__WEBPACK_IMPORTED_MODULE_3__.ParticleExplosion(this.gameEngine, pos);
                // only scorable things are included in the subscriptions..
                // not sure how to get typescript to agree with that yet
                // feels like a pain and a waste of time for now
                this.gameEngine.gameScript.tallyScore(collider.gameObject);
                collider.gameObject.remove();
                this.remove();
            }
        }
    };
    Bullet.RADIUS = 3;
    Bullet.SPEED = 7;
    return Bullet;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));



/***/ }),

/***/ "./src/game_objects/ClockworkGames/Bed.ts":
/*!************************************************!*\
  !*** ./src/game_objects/ClockworkGames/Bed.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bed: () => (/* binding */ Bed),
/* harmony export */   BedSprite: () => (/* binding */ BedSprite),
/* harmony export */   bedSpinAnimator: () => (/* binding */ bedSpinAnimator),
/* harmony export */   createBedSpinAnimation: () => (/* binding */ createBedSpinAnimation)
/* harmony export */ });
/* harmony import */ var _game_engine_EntityState_Animate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/EntityState/Animate */ "./src/game_engine/EntityState/Animate.ts");
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Bed = /** @class */ (function (_super) {
    __extends(Bed, _super);
    function Bed(engine, pos, entity) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos = pos;
        _this.transform.angle = 0;
        _this.width = 70 * 8 / 6;
        _this.height = _this.width * 6 / 4;
        _this.entity = entity;
        var _a = [_this.height, _this.width], h = _a[0], w = _a[1];
        _this.spriteParameters = {
            width: {
                size: w,
                originalSize: w
            },
            height: {
                size: h,
                originalSize: h
            },
            bed: {
                topLeft: {
                    x: -w / 2,
                    y: -h / 2,
                },
                cornerRadius: 10,
                topRight: {
                    x: w / 2,
                    y: -h / 2,
                },
                bottomRight: {
                    x: w / 2,
                    y: h / 2,
                },
                bottomLeft: {
                    x: -w / 2,
                    y: h / 2
                }
            },
            covers: {
                yOffset: {
                    size: 0,
                    originalSize: 0,
                    min: function () { return (0); },
                    max: function () { return (2.5 / 12 * h); },
                    checkSet: {
                        max: function () {
                            var max = _this.spriteParameters.covers.yOffset.max();
                            if (_this.spriteParameters.covers.yOffset.size > max) {
                                _this.spriteParameters.covers.yOffset.size = max;
                                return true;
                            }
                        },
                        min: function () {
                            var min = _this.spriteParameters.covers.yOffset.min();
                            if (_this.spriteParameters.covers.yOffset.size <= min) {
                                _this.spriteParameters.covers.yOffset.size = min;
                                return true;
                            }
                        }
                    },
                    changeSize: function (difference) {
                        _this.spriteParameters.covers.yOffset.size += difference;
                        return _this.spriteParameters.covers.yOffset.checkSet.max() || _this.spriteParameters.covers.yOffset.checkSet.min();
                    }
                },
                topLeft: {
                    x: -w / 2,
                    y: h / 6,
                },
                topRight: {
                    x: w / 2,
                    y: h / 6
                },
                bottomRight: {
                    x: w / 2,
                    y: -9 / 16 * h
                },
                bottomLeft: {
                    x: -w / 2,
                    y: -9 / 16 * h
                },
                height: 3.50 / 6 * h
            }
        };
        _this.addLineSprite(new BedSprite(_this.transform, _this.spriteParameters));
        return _this;
    }
    Bed.prototype.update = function () {
        this.animate();
    };
    Bed.prototype.animate = function () {
        // const time = deltaTime / NORMAL_FRAME_TIME_DELTA / 5;
        // const bodySpinAngle = this.entity.spriteParameters.bodyAngle.size;
        // const percentageCovered = bodySpinAngle / Math.PI;
        // this.spriteParameters.covers.yOffset.size = -percentageCovered * this.spriteParameters.covers.yOffset.max();
    };
    Bed.prototype.exist = function () {
        this.addCollider("General", this, 5);
    };
    return Bed;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__.GameObject));

var bedSpinAnimator = function (dT, animationState, spriteParameters) {
    var bodySpinAngle = animationState.size;
    var percentageCovered = bodySpinAngle / Math.PI;
    spriteParameters.covers.yOffset.size = -percentageCovered * spriteParameters.covers.yOffset.max();
    return false;
};
var createBedSpinAnimation = function (bed, entity) {
    return new _game_engine_EntityState_Animate__WEBPACK_IMPORTED_MODULE_0__.Animation('BedSpin', entity.spriteParameters.bodyAngle, bedSpinAnimator, function () { return null; });
};
var BedSprite = /** @class */ (function (_super) {
    __extends(BedSprite, _super);
    function BedSprite(transform, spriteParameters) {
        var _this = _super.call(this, transform) || this;
        _this.spriteParameters = spriteParameters;
        _this.spawningScale = 1;
        _this.transform = transform;
        _this.color = "#FFFFFF";
        return _this;
    }
    BedSprite.prototype.draw = function (ctx) {
        var pos = this.transform.absolutePosition();
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.angle);
        this.drawBed(ctx);
        ctx.restore();
    };
    BedSprite.prototype.drawBed = function (ctx) {
        var bed = this.spriteParameters.bed;
        var covers = this.spriteParameters.covers;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.roundRect(bed.topLeft.x, bed.topLeft.y, this.spriteParameters.width.size, this.spriteParameters.height.size, [bed.cornerRadius, bed.cornerRadius, 0, 0]);
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fillRect(covers.topLeft.x, covers.topLeft.y + covers.yOffset.size, this.spriteParameters.width.size, this.spriteParameters.covers.height);
    };
    return BedSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_2__.LineSprite));

// const NORMAL_FRAME_TIME_DELTA = 1000 / 60;


/***/ }),

/***/ "./src/game_objects/ClockworkGames/Entity/Entity.ts":
/*!**********************************************************!*\
  !*** ./src/game_objects/ClockworkGames/Entity/Entity.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Entity: () => (/* binding */ Entity),
/* harmony export */   EntitySprite: () => (/* binding */ EntitySprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_engine/util */ "./src/game_engine/util.ts");
/* harmony import */ var _EntityAnimationStates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EntityAnimationStates */ "./src/game_objects/ClockworkGames/Entity/EntityAnimationStates.ts");
/* harmony import */ var _EntityActivityStates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EntityActivityStates */ "./src/game_objects/ClockworkGames/Entity/EntityActivityStates.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var Entity = /** @class */ (function (_super) {
    __extends(Entity, _super);
    function Entity(engine, pos) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos = pos;
        _this.transform.angle = Math.PI;
        _this.moveToSpeed = 2.5;
        _this.treeChopLocation = [0, 85];
        _this.moveToAcceleration = 0.125 / 6;
        _this.squeezing = true;
        _this.closing = true;
        _this.activitiesQueue = [];
        _this.addPhysicsComponent();
        _this.currentBed;
        _this.currentAnimation = null;
        // this.previousUniqueActivity = {};
        // this.activitiesByGoals = {};
        _this.spriteParameters = {
            getDrawCoordinates: function () {
                return {
                    // TODO: add control flow for which side the arm is on and how to get start and end coordinate when on that side
                    // TODO: label these with the numbers they correspond to in the sprite doc
                    rightArmEnd: _this.spriteParameters.arms.right.endPosition.getCoordinate(),
                    leftArmEnd: _this.spriteParameters.arms.left.endPosition.getCoordinate(),
                    rightArmStart: [
                        _this.spriteParameters.arms.right.position.x.size,
                        _this.spriteParameters.arms.right.position.y.getSize()
                    ],
                    leftArmStart: [
                        _this.spriteParameters.arms.left.position.x.size,
                        _this.spriteParameters.arms.left.position.y.getSize()
                    ],
                    curveTopRight: _this.spriteParameters.curves.right.top.getCoordinate(),
                    curvePointTopRight: _this.spriteParameters.curves.right.topCurvePoint.getCoordinate(),
                    curvePointBottomRight: _this.spriteParameters.curves.right.bottomCurvePoint.getCoordinate(),
                    curveBottomRight: _this.spriteParameters.curves.right.bottom.getCoordinate(),
                    curveBottomLeft: _this.spriteParameters.curves.left.bottom.getCoordinate(),
                    curvePointBottomLeft: _this.spriteParameters.curves.left.bottomCurvePoint.getCoordinate(),
                    curvePointTopLeft: _this.spriteParameters.curves.left.topCurvePoint.getCoordinate(),
                    curveTopLeft: _this.spriteParameters.curves.left.top.getCoordinate(),
                    rightEyePosition: [
                        _this.spriteParameters.eye.right.position.x.size,
                        _this.spriteParameters.eye.right.position.y.size
                    ],
                    rightEyeRadius: [
                        _this.spriteParameters.eye.right.radius.x.size,
                        _this.spriteParameters.eye.right.radius.y.size
                    ],
                    leftEyePosition: [
                        _this.spriteParameters.eye.left.position.x.size,
                        _this.spriteParameters.eye.left.position.y.size
                    ],
                    leftEyeRadius: [
                        _this.spriteParameters.eye.left.radius.x.size,
                        _this.spriteParameters.eye.left.radius.y.size
                    ],
                    bodyAngle: _this.spriteParameters.bodyAngle.size,
                    lineThickness: _this.spriteParameters.lineThickness
                };
            },
            armLength: Entity.baseParameters.armLength,
            lineThickness: Entity.baseParameters.lineThickness,
            // need x/y position offset from actual position for animation purposes
            // or at least y
            // it would mess with collision detection though... not sure how to fix that
            // hmm
            // okay I think I got it
            // I'll change the transform directly,
            // while keeping track of that change within the animation 
            // that way it can reset when the animation is done...
            bodyAngle: {
                size: 0,
                originalSize: 0,
                changeSize: function (angleChange) {
                    _this.spriteParameters.bodyAngle.size += angleChange;
                    var twoPi = 2 * Math.PI;
                    if (_this.spriteParameters.bodyAngle.size > twoPi) {
                        _this.spriteParameters.bodyAngle.size - twoPi;
                    }
                    else if (_this.spriteParameters.bodyAngle.size < -twoPi) {
                        _this.spriteParameters.bodyAngle.size + twoPi;
                    }
                }
            },
            // I'll need to make similar objects for width and height
            width: {
                size: Entity.baseParameters.width,
                originalSize: Entity.baseParameters.width,
                max: function () { return (300); },
                min: function () { return (_this.spriteParameters.eye.left.radius.x.size +
                    _this.spriteParameters.eye.right.radius.x.size +
                    _this.spriteParameters.eye.width.getSize()); },
                checkSet: {
                    max: function () {
                        var max = _this.spriteParameters.width.max();
                        if (_this.spriteParameters.width.size > max) {
                            _this.spriteParameters.width.size = max;
                            return true;
                        }
                    },
                    min: function () {
                        var min = _this.spriteParameters.width.min();
                        if (_this.spriteParameters.width.size < min) {
                            _this.spriteParameters.width.size = min;
                            return true;
                        }
                    }
                },
                changeSize: function (widthDifference) {
                    _this.spriteParameters.width.size += widthDifference;
                    return _this.spriteParameters.width.checkSet.max() || _this.spriteParameters.width.checkSet.min();
                }
            },
            height: {
                size: Entity.baseParameters.height, // when you change height, you need to change the y position of the arms too
                originalSize: Entity.baseParameters.height,
                max: function () { return (150); },
                min: function () { return (_this.spriteParameters.eye.left.radius.y.size > _this.spriteParameters.eye.right.radius.y.size ?
                    _this.spriteParameters.eye.left.radius.y.size :
                    _this.spriteParameters.eye.right.radius.y.size); },
                checkSet: {
                    max: function () {
                        var max = _this.spriteParameters.height.max();
                        if (_this.spriteParameters.height.size > max) {
                            _this.spriteParameters.height.size = max;
                            return true;
                        }
                    },
                    min: function () {
                        var min = _this.spriteParameters.height.min();
                        if (_this.spriteParameters.height.size < min) {
                            _this.spriteParameters.height.size = min;
                            return true;
                        }
                    }
                },
                changeSize: function (heightDifference) {
                    _this.spriteParameters.height.size += heightDifference;
                    var isOutOfRange = _this.spriteParameters.height.checkSet.max() || _this.spriteParameters.height.checkSet.min();
                    // this.spriteParameters.arms.left.position.y.setSize();
                    // this.spriteParameters.arms.right.position.y.setSize();
                    return isOutOfRange;
                }
            },
            // why didn't I label these sheesh
            curves: {
                left: {
                    top: {
                        getCoordinate: function () { return ([
                            -_this.spriteParameters.width.size / 3,
                            _this.spriteParameters.height.size / 2
                        ]); }
                    }, // 15
                    topCurvePoint: {
                        getCoordinate: function () { return ([
                            -5 / 9 * _this.spriteParameters.width.size,
                            1 / 3 * _this.spriteParameters.height.size
                        ]); }
                    }, // 14
                    bottomCurvePoint: {
                        getCoordinate: function () { return ([
                            -5 / 9 * _this.spriteParameters.width.size,
                            -1 / 3 * _this.spriteParameters.height.size
                        ]); }
                    }, // 6
                    bottom: {
                        getCoordinate: function () { return ([
                            -_this.spriteParameters.width.size / 3,
                            -_this.spriteParameters.height.size / 2
                        ]); }
                    }
                },
                right: {
                    top: {
                        getCoordinate: function () { return ([
                            _this.spriteParameters.width.size / 3,
                            _this.spriteParameters.height.size / 2
                        ]); }
                    },
                    topCurvePoint: {
                        getCoordinate: function () { return ([
                            5 / 9 * _this.spriteParameters.width.size,
                            1 / 3 * _this.spriteParameters.height.size
                        ]); }
                    },
                    bottomCurvePoint: {
                        getCoordinate: function () { return ([
                            5 / 9 * _this.spriteParameters.width.size,
                            -1 / 3 * _this.spriteParameters.height.size
                        ]); }
                    },
                    bottom: {
                        getCoordinate: function () { return ([
                            _this.spriteParameters.width.size / 3,
                            -_this.spriteParameters.height.size / 2
                        ]); }
                    }
                }
            },
            // range of motion might be a good 
            // property to track
            arms: {
                left: {
                    length: {
                        originalLength: 40,
                        size: 20 * 2, // TODO
                        max: function () { return (150); },
                        min: function () { return (0); },
                        checkSet: {
                            max: function () {
                                var max = _this.spriteParameters.arms.left.length.max();
                                if (_this.spriteParameters.arms.left.length.size > max) {
                                    _this.spriteParameters.arms.left.length.size = max;
                                    return true;
                                }
                            },
                            min: function () {
                                var min = _this.spriteParameters.arms.left.length.min();
                                if (_this.spriteParameters.arms.left.length.size < min) {
                                    _this.spriteParameters.arms.left.length.size = min;
                                    return true;
                                }
                            }
                        },
                        changeLength: function (lengthDifference) {
                            _this.spriteParameters.arms.left.length.size += lengthDifference;
                            return _this.spriteParameters.arms.left.length.checkSet.max() || _this.spriteParameters.arms.left.length.checkSet.min();
                        }
                    },
                    position: {
                        x: {
                            size: -Entity.baseParameters.width / 2 / 2, // width / 2 / 2
                            originalSize: -Entity.baseParameters.width / 2 / 2,
                            max: function () { return (_this.spriteParameters.width.size / 3); },
                            min: function () { return (-_this.spriteParameters.width.size / 3); },
                            checkSet: {
                                max: function () {
                                    var max = _this.spriteParameters.arms.left.position.x.max();
                                    if (_this.spriteParameters.arms.left.position.x.size > max) {
                                        _this.spriteParameters.arms.left.position.x.size = max;
                                        return true;
                                    }
                                },
                                min: function () {
                                    var min = _this.spriteParameters.arms.left.position.x.min();
                                    if (_this.spriteParameters.arms.left.position.x.size < min) {
                                        _this.spriteParameters.arms.left.position.x.size = min;
                                        return true;
                                    }
                                }
                            },
                            changeSize: function (sizeDifference) {
                                _this.spriteParameters.arms.left.position.x.size += sizeDifference;
                                return _this.spriteParameters.arms.left.position.x.checkSet.max() || _this.spriteParameters.arms.left.position.x.checkSet.min();
                            }
                        },
                        y: {
                            // size: this.height / 2, 
                            // originalSize: this.height / 2, 
                            // setSize: () => {spriteParameters.arms.left.position.y.size = spriteParameters.height.size / 2;}
                            getSize: function () {
                                if (_this.spriteParameters.arms.right.sidePosition.side === 'TOP') {
                                    return _this.spriteParameters.height.size / 2;
                                }
                                else if (_this.spriteParameters.arms.right.sidePosition.side === 'BOTTOM') {
                                    return -_this.spriteParameters.height.size / 2;
                                    // WIP
                                }
                                else if (_this.spriteParameters.arms.right.sidePosition.side === 'LEFT') {
                                    return -_this.spriteParameters.height.size / 2;
                                }
                                else if (_this.spriteParameters.arms.right.sidePosition.side === 'RIGHT') {
                                    return -_this.spriteParameters.height.size / 2;
                                }
                            },
                            originalSize: 0,
                            // setSize: () => {this.spriteParameters.arms.left.position.y.size = 0;}
                        },
                    },
                    sidePosition: {
                        side: 'TOP',
                        changeSide: function (nextSide) {
                            _this.spriteParameters.arms.left.sidePosition.side = nextSide;
                        },
                        sideAngle: {
                            size: 0,
                            originalSize: 0,
                            max: function () { return _this.spriteParameters.arms.left.sidePosition.side === "RIGHT" ? Math.PI : Math.PI * 2; },
                            min: function () { return _this.spriteParameters.arms.left.sidePosition.side === "RIGHT" ? 0 : Math.PI; },
                            checkSet: {
                                max: function () {
                                    var max = _this.spriteParameters.arms.right.sidePosition.sideAngle.max();
                                    if (_this.spriteParameters.arms.right.sidePosition.sideAngle.size > max) {
                                        _this.spriteParameters.arms.right.sidePosition.sideAngle.size = _this.spriteParameters.arms.left.sidePosition.side === "RIGHT" ? Math.PI : 0;
                                        return true;
                                    }
                                },
                                min: function () {
                                    var min = _this.spriteParameters.arms.right.sidePosition.sideAngle.min();
                                    if (_this.spriteParameters.arms.right.sidePosition.sideAngle.size < min) {
                                        _this.spriteParameters.arms.right.sidePosition.sideAngle.size = _this.spriteParameters.arms.left.sidePosition.side === "RIGHT" ? 0 : Math.PI;
                                        return true;
                                    }
                                }
                            },
                            changeAngle: function (angleDifference) {
                                _this.spriteParameters.arms.right.sidePosition.sideAngle.size += angleDifference;
                                return _this.spriteParameters.arms.right.sidePosition.sideAngle.checkSet.max() || _this.spriteParameters.arms.right.sidePosition.sideAngle.checkSet.min();
                            }
                        },
                        startPoint: {
                            // only for RIGHT and LEFT
                            getCoordinate: function () {
                                if (_this.spriteParameters.arms.right.sidePosition.side === 'LEFT') {
                                    return [-_this.spriteParameters.width.size / 3, 0];
                                }
                                else if (_this.spriteParameters.arms.right.sidePosition.side === 'RIGHT') {
                                    return [_this.spriteParameters.width.size / 3, 0];
                                }
                                else {
                                    console.error('side must be LEFT or RIGHT at this point');
                                }
                            }
                        },
                        endPoint: {
                            // this has to be in progress here... woof
                            getCoordinate: function () {
                                if (_this.spriteParameters.arms.right.sidePosition.side === 'LEFT') {
                                    return [
                                        -_this.spriteParameters.width.size / 3,
                                        0
                                    ];
                                }
                                else if (_this.spriteParameters.arms.right.sidePosition.side === 'RIGHT') {
                                    return [
                                        _this.spriteParameters.width.size / 3,
                                        0
                                    ];
                                }
                                else {
                                    console.error('side must be LEFT or RIGHT at this point');
                                }
                            }
                        },
                        length: {
                            originalLength: 40,
                            size: 20 * 2, // TODO
                            max: function () { return (150); },
                            min: function () { return (0); },
                            checkSet: {
                                max: function () {
                                    var max = _this.spriteParameters.arms.left.sidePosition.length.max();
                                    if (_this.spriteParameters.arms.left.sidePosition.length.size > max) {
                                        _this.spriteParameters.arms.left.sidePosition.length.size = max;
                                        return true;
                                    }
                                },
                                min: function () {
                                    var min = _this.spriteParameters.arms.left.sidePosition.length.min();
                                    if (_this.spriteParameters.arms.left.sidePosition.length.size < min) {
                                        _this.spriteParameters.arms.left.sidePosition.length.size = min;
                                        return true;
                                    }
                                }
                            },
                            changeLength: function (lengthDifference) {
                                _this.spriteParameters.arms.left.length.size += lengthDifference;
                                return _this.spriteParameters.arms.left.length.checkSet.max() || _this.spriteParameters.arms.left.length.checkSet.min();
                            }
                        },
                    },
                    angle: {
                        size: Math.PI / 2,
                        originalSize: Math.PI / 2,
                        max: function () { return Math.PI; },
                        min: function () { return 0; },
                        checkSet: {
                            max: function () {
                                var max = _this.spriteParameters.arms.left.angle.max();
                                if (_this.spriteParameters.arms.left.angle.size > max) {
                                    _this.spriteParameters.arms.left.angle.size = max;
                                    return true;
                                }
                            },
                            min: function () {
                                var min = _this.spriteParameters.arms.left.angle.min();
                                if (_this.spriteParameters.arms.left.angle.size < min) {
                                    _this.spriteParameters.arms.left.angle.size = min;
                                    return true;
                                }
                            }
                        },
                        changeAngle: function (angleDifference) {
                            _this.spriteParameters.arms.left.angle.size += angleDifference;
                            return _this.spriteParameters.arms.left.angle.checkSet.max() || _this.spriteParameters.arms.left.angle.checkSet.min();
                        }
                    },
                    endPosition: {
                        getCoordinate: function () {
                            if (_this.spriteParameters.arms.left.sidePosition.side === 'TOP') {
                                return [
                                    _this.spriteParameters.arms.left.position.x.size + Math.cos(_this.spriteParameters.arms.left.angle.size) * (_this.spriteParameters.arms.left.length.size + _this.spriteParameters.height.size / 2),
                                    _this.spriteParameters.arms.left.position.y.getSize() + Math.sin(_this.spriteParameters.arms.left.angle.size) * (_this.spriteParameters.arms.left.length.size)
                                ];
                            }
                            else if (_this.spriteParameters.arms.left.sidePosition.side === 'BOTTOM') {
                                return [
                                    _this.spriteParameters.arms.left.position.x.size + Math.cos(_this.spriteParameters.arms.left.angle.size) * (_this.spriteParameters.arms.left.length.size + _this.spriteParameters.height.size / 2),
                                    _this.spriteParameters.arms.left.position.y.getSize() + Math.sin(_this.spriteParameters.arms.left.angle.size) * (_this.spriteParameters.arms.left.length.size)
                                ];
                                // WIP
                            }
                            else if (_this.spriteParameters.arms.left.sidePosition.side === 'LEFT') {
                                return [
                                    _this.spriteParameters.arms.left.position.x.size + Math.cos(_this.spriteParameters.arms.left.angle.size) * (_this.spriteParameters.arms.left.length.size + _this.spriteParameters.height.size / 2),
                                    -_this.spriteParameters.arms.left.position.y.getSize() - Math.sin(_this.spriteParameters.arms.left.angle.size) * (_this.spriteParameters.arms.left.length.size + _this.spriteParameters.height.size / 2)
                                ];
                            }
                            else if (_this.spriteParameters.arms.left.sidePosition.side === 'RIGHT') {
                                return [
                                    _this.spriteParameters.arms.left.position.x.size + Math.cos(_this.spriteParameters.arms.left.angle.size) * (_this.spriteParameters.arms.left.length.size + _this.spriteParameters.height.size / 2),
                                    _this.spriteParameters.arms.left.position.y.getSize() + Math.sin(_this.spriteParameters.arms.left.angle.size) * (_this.spriteParameters.arms.left.length.size + _this.spriteParameters.height.size / 2)
                                ];
                            }
                        }
                    }
                },
                right: {
                    length: {
                        originalLength: Entity.baseParameters.armLength,
                        size: Entity.baseParameters.armLength,
                        max: function () { return (150); },
                        min: function () { return (0); },
                        checkSet: {
                            max: function () {
                                var max = _this.spriteParameters.arms.right.length.max();
                                if (_this.spriteParameters.arms.right.length.size > max) {
                                    _this.spriteParameters.arms.right.length.size = max;
                                    return true;
                                }
                            },
                            min: function () {
                                var min = _this.spriteParameters.arms.right.length.min();
                                if (_this.spriteParameters.arms.right.length.size < min) {
                                    _this.spriteParameters.arms.right.length.size = min;
                                    return true;
                                }
                            }
                        },
                        changeLength: function (lengthDifference) {
                            _this.spriteParameters.arms.right.length.size += lengthDifference;
                            return (_this.spriteParameters.arms.right.length.checkSet.max() || _this.spriteParameters.arms.right.length.checkSet.min());
                        }
                    },
                    // start position for TOP and BOTTOM
                    position: {
                        x: {
                            size: Entity.baseParameters.width / 2 / 2,
                            originalSize: Entity.baseParameters.width / 2 / 2,
                            max: function () { return (_this.spriteParameters.width.size / 3); },
                            min: function () { return (-_this.spriteParameters.width.size / 3); },
                            checkSet: {
                                max: function () {
                                    var max = _this.spriteParameters.arms.right.position.x.max();
                                    if (_this.spriteParameters.arms.right.position.x.size > max) {
                                        _this.spriteParameters.arms.right.position.x.size = max;
                                        return true;
                                    }
                                },
                                min: function () {
                                    var min = _this.spriteParameters.arms.right.position.x.min();
                                    if (_this.spriteParameters.arms.right.position.x.size < min) {
                                        _this.spriteParameters.arms.right.position.x.size = min;
                                        return true;
                                    }
                                }
                            },
                            changeSize: function (sizeDifference) {
                                _this.spriteParameters.arms.right.position.x.size += sizeDifference;
                                return (_this.spriteParameters.arms.right.position.x.checkSet.max() || _this.spriteParameters.arms.right.position.x.checkSet.min());
                            }
                        },
                        y: {
                            getSize: function () {
                                if (_this.spriteParameters.arms.right.sidePosition.side === 'TOP') {
                                    return _this.spriteParameters.height.size / 2;
                                }
                                else if (_this.spriteParameters.arms.right.sidePosition.side === 'BOTTOM') {
                                    return -_this.spriteParameters.height.size / 2;
                                    // WIP
                                    // the arm now pivots about point 16/17
                                }
                                else if (_this.spriteParameters.arms.right.sidePosition.side === 'LEFT') {
                                    return _this.spriteParameters.height.size / 2;
                                }
                                else if (_this.spriteParameters.arms.right.sidePosition.side === 'RIGHT') {
                                    return _this.spriteParameters.height.size / 2;
                                }
                            },
                            originalSize: 0,
                            // setSize: () => {this.spriteParameters.arms.right.position.y.size = 0;}
                        },
                    },
                    sidePosition: {
                        side: "TOP",
                        changeSide: function (nextSide) {
                            _this.spriteParameters.arms.left.sidePosition.side = nextSide;
                        },
                        sideAngle: {
                            size: 0,
                            originalSize: 0,
                            max: function () { return Math.PI; },
                            min: function () { return 0; },
                            checkSet: {
                                max: function () {
                                    var max = _this.spriteParameters.arms.right.sidePosition.sideAngle.max();
                                    if (_this.spriteParameters.arms.right.sidePosition.sideAngle.size > max) {
                                        _this.spriteParameters.arms.right.sidePosition.sideAngle.size = max;
                                        return true;
                                    }
                                },
                                min: function () {
                                    var min = _this.spriteParameters.arms.right.sidePosition.sideAngle.min();
                                    if (_this.spriteParameters.arms.right.sidePosition.sideAngle.size < min) {
                                        _this.spriteParameters.arms.right.sidePosition.sideAngle.size = min;
                                        return true;
                                    }
                                }
                            },
                            changeAngle: function (angleDifference) {
                                _this.spriteParameters.arms.right.sidePosition.sideAngle.size += angleDifference;
                                return _this.spriteParameters.arms.right.sidePosition.sideAngle.checkSet.max() || _this.spriteParameters.arms.right.sidePosition.sideAngle.checkSet.min();
                            }
                        },
                        startPoint: {
                            // only for RIGHT and LEFT
                            getCoordinate: function () {
                                if (_this.spriteParameters.arms.right.sidePosition.side === 'LEFT') {
                                    return [-_this.spriteParameters.width.size / 3, 0];
                                }
                                else if (_this.spriteParameters.arms.right.sidePosition.side === 'RIGHT') {
                                    return [_this.spriteParameters.width.size / 3, 0];
                                }
                                else {
                                    console.error('side must be LEFT or RIGHT at this point');
                                }
                            }
                        },
                        endPoint: {
                            getCoordinate: function () {
                                if (_this.spriteParameters.arms.right.sidePosition.side === 'LEFT') {
                                    return [
                                        -_this.spriteParameters.width.size / 3,
                                        0
                                    ];
                                }
                                else if (_this.spriteParameters.arms.right.sidePosition.side === 'RIGHT') {
                                    return [
                                        _this.spriteParameters.width.size / 3,
                                        0
                                    ];
                                }
                                else {
                                    console.error('side must be LEFT or RIGHT at this point');
                                }
                            }
                        },
                        length: {
                            originalLength: 40,
                            size: 20 * 2, // TODO
                            max: function () { return (150); },
                            min: function () { return (0); },
                            checkSet: {
                                max: function () {
                                    var max = _this.spriteParameters.arms.right.sidePosition.length.max();
                                    if (_this.spriteParameters.arms.right.sidePosition.length.size > max) {
                                        _this.spriteParameters.arms.right.sidePosition.length.size = max;
                                        return true;
                                    }
                                },
                                min: function () {
                                    var min = _this.spriteParameters.arms.right.sidePosition.length.min();
                                    if (_this.spriteParameters.arms.right.sidePosition.length.size < min) {
                                        _this.spriteParameters.arms.right.sidePosition.length.size = min;
                                        return true;
                                    }
                                }
                            },
                            changeLength: function (lengthDifference) {
                                _this.spriteParameters.arms.right.length.size += lengthDifference;
                                return _this.spriteParameters.arms.right.length.checkSet.max() || _this.spriteParameters.arms.right.length.checkSet.min();
                            }
                        },
                    },
                    angle: {
                        size: Math.PI / 2,
                        originalSize: Math.PI / 2,
                        max: function () { return Math.PI; },
                        min: function () { return 0; },
                        checkSet: {
                            max: function () {
                                var max = _this.spriteParameters.arms.right.angle.max();
                                if (_this.spriteParameters.arms.right.angle.size > max) {
                                    _this.spriteParameters.arms.right.angle.size = max;
                                    return true;
                                }
                            },
                            min: function () {
                                var min = _this.spriteParameters.arms.right.angle.min();
                                if (_this.spriteParameters.arms.right.angle.size < min) {
                                    _this.spriteParameters.arms.right.angle.size = min;
                                    return true;
                                }
                            }
                        },
                        changeAngle: function (angleDifference) {
                            _this.spriteParameters.arms.right.angle.size += angleDifference;
                            return _this.spriteParameters.arms.right.angle.checkSet.max() || _this.spriteParameters.arms.right.angle.checkSet.min();
                        }
                    },
                    endPosition: {
                        getCoordinate: function () {
                            if (_this.spriteParameters.arms.right.sidePosition.side === 'TOP') {
                                return [
                                    _this.spriteParameters.arms.right.position.x.size + Math.cos(_this.spriteParameters.arms.right.angle.size) * (_this.spriteParameters.arms.right.length.size + _this.spriteParameters.height.size / 2),
                                    _this.spriteParameters.arms.right.position.y.getSize() + Math.sin(_this.spriteParameters.arms.right.angle.size) * (_this.spriteParameters.arms.right.length.size)
                                ];
                            }
                            else if (_this.spriteParameters.arms.right.sidePosition.side === 'BOTTOM') {
                                return [
                                    _this.spriteParameters.arms.right.position.x.size + Math.cos(_this.spriteParameters.arms.right.angle.size) * (_this.spriteParameters.arms.right.length.size + _this.spriteParameters.height.size / 2),
                                    _this.spriteParameters.arms.right.position.y.getSize() + Math.sin(_this.spriteParameters.arms.right.angle.size) * (_this.spriteParameters.arms.right.length.size)
                                ];
                                // WIP
                            }
                            else if (_this.spriteParameters.arms.right.sidePosition.side === 'LEFT') {
                                return [
                                    _this.spriteParameters.arms.right.position.x.size + Math.cos(_this.spriteParameters.arms.right.angle.size) * (_this.spriteParameters.arms.right.length.size + _this.spriteParameters.height.size / 2),
                                    _this.spriteParameters.arms.right.position.y.getSize() - Math.sin(_this.spriteParameters.arms.right.angle.size) * (_this.spriteParameters.arms.right.length.size + _this.spriteParameters.height.size / 2)
                                ];
                            }
                            else if (_this.spriteParameters.arms.right.sidePosition.side === 'RIGHT') {
                                return [
                                    _this.spriteParameters.arms.right.position.x.size + Math.cos(_this.spriteParameters.arms.right.angle.size) * (_this.spriteParameters.arms.right.length.size + _this.spriteParameters.height.size / 2),
                                    _this.spriteParameters.arms.right.position.y.getSize() - Math.sin(_this.spriteParameters.arms.right.angle.size) * (_this.spriteParameters.arms.right.length.size + _this.spriteParameters.height.size / 2)
                                ];
                            }
                        }
                    }
                },
            },
            eye: {
                width: {
                    getSize: function () { return (_this.spriteParameters.eye.right.position.x.size - _this.spriteParameters.eye.left.position.x.size); },
                    max: function () { return (_this.spriteParameters.width.size - _this.spriteParameters.eye.left.radius.x.size - _this.spriteParameters.eye.right.radius.x.size); },
                    min: function () { return (_this.spriteParameters.eye.left.radius.x.size + _this.spriteParameters.eye.right.radius.x.size); },
                    changeSize: function (widthDifference) {
                        // changes by half the size difference per arm
                        var currentWidth = _this.spriteParameters.eye.width.getSize();
                        var newWidth = currentWidth - widthDifference;
                        var realWidthDifference = widthDifference;
                        var outOfBounds = false;
                        if (newWidth < _this.spriteParameters.eye.width.min()) {
                            outOfBounds = true;
                            realWidthDifference = currentWidth - _this.spriteParameters.eye.width.min();
                        }
                        if (newWidth > _this.spriteParameters.eye.width.max()) {
                            outOfBounds = true;
                            realWidthDifference = _this.spriteParameters.eye.width.max() - currentWidth;
                        }
                        var leftEyeOutOfRange = _this.spriteParameters.eye.left.position.x.changeSize(-realWidthDifference / 2);
                        var rightEyeOutOfRange = _this.spriteParameters.eye.right.position.x.changeSize(realWidthDifference / 2);
                        return (leftEyeOutOfRange && rightEyeOutOfRange) || outOfBounds;
                    }
                },
                height: {
                    size: 1 / 6 * Entity.baseParameters.height,
                    originalSize: 1 / 6 * Entity.baseParameters.height,
                    max: function () { return (_this.spriteParameters.eye.left.radius.y.size > _this.spriteParameters.eye.right.radius.y.size ?
                        _this.spriteParameters.height.size / 2 - _this.spriteParameters.eye.right.radius.y.size :
                        _this.spriteParameters.height.size / 2 - _this.spriteParameters.eye.left.radius.y.size); },
                    min: function () { return (_this.spriteParameters.eye.left.radius.y.size > _this.spriteParameters.eye.right.radius.y.size ?
                        -_this.spriteParameters.height.size / 2 + _this.spriteParameters.eye.right.radius.y.size :
                        -_this.spriteParameters.height.size / 2 + _this.spriteParameters.eye.left.radius.y.size); },
                    checkSet: {
                        max: function () {
                            var max = _this.spriteParameters.eye.height.max();
                            if (_this.spriteParameters.eye.height.size > max) {
                                _this.spriteParameters.eye.height.size = max;
                                return true;
                            }
                        },
                        min: function () {
                            var min = _this.spriteParameters.eye.height.min();
                            if (_this.spriteParameters.eye.height.size < min) {
                                _this.spriteParameters.eye.height.size = min;
                                return true;
                            }
                        },
                    },
                    changeSize: function (heightDifference) {
                        var currentSize = _this.spriteParameters.eye.height.size;
                        _this.spriteParameters.eye.height.size += heightDifference;
                        var isOutOfRange = _this.spriteParameters.eye.height.checkSet.max() || _this.spriteParameters.eye.height.checkSet.min();
                        var actualDifference = currentSize - _this.spriteParameters.eye.height.size;
                        var leftEyeOutOfRange = _this.spriteParameters.eye.left.position.y.changeSize(actualDifference / 2);
                        var rightEyeOutOFRange = _this.spriteParameters.eye.right.position.y.changeSize(actualDifference / 2);
                        return (leftEyeOutOfRange && rightEyeOutOFRange) || isOutOfRange;
                    }
                },
                left: {
                    position: {
                        x: {
                            size: -5 / 36 * Entity.baseParameters.width,
                            originalSize: -5 / 36 * Entity.baseParameters.width,
                            //furthest right
                            max: function () { return (_this.spriteParameters.width.size / 2 - _this.spriteParameters.eye.left.radius.x.size - 2 * _this.spriteParameters.eye.right.radius.x.size); },
                            min: function () { return (-_this.spriteParameters.width.size / 2 + _this.spriteParameters.eye.left.radius.x.size); },
                            checkSet: {
                                max: function () {
                                    var max = _this.spriteParameters.eye.left.position.x.max();
                                    if (_this.spriteParameters.eye.left.position.x.size > max) {
                                        _this.spriteParameters.eye.left.position.x.size = max;
                                        return true;
                                    }
                                },
                                min: function () {
                                    var min = _this.spriteParameters.eye.left.position.x.min();
                                    if (_this.spriteParameters.eye.left.position.x.size < min) {
                                        _this.spriteParameters.eye.left.position.x.size = min;
                                        return true;
                                    }
                                },
                            },
                            changeSize: function (sizeDifference) {
                                _this.spriteParameters.eye.left.position.x.size += sizeDifference;
                                return _this.spriteParameters.eye.left.position.x.checkSet.max() || _this.spriteParameters.eye.left.position.x.checkSet.min();
                            }
                        },
                        y: {
                            size: Entity.baseParameters.height / 8,
                            originalSize: Entity.baseParameters.height / 8,
                            max: function () { return (_this.spriteParameters.height.size / 2 - _this.spriteParameters.eye.left.radius.y.size); },
                            min: function () { return (-_this.spriteParameters.height.size / 2 + _this.spriteParameters.eye.left.radius.y.size); },
                            checkSet: {
                                max: function () {
                                    var max = _this.spriteParameters.eye.left.position.y.max();
                                    if (_this.spriteParameters.eye.left.position.y.size > max) {
                                        _this.spriteParameters.eye.left.position.y.size = max;
                                        return true;
                                    }
                                },
                                min: function () {
                                    var min = _this.spriteParameters.eye.left.position.y.min();
                                    if (_this.spriteParameters.eye.left.position.y.size < min) {
                                        _this.spriteParameters.eye.left.position.y.size = min;
                                        return true;
                                    }
                                }
                            },
                            changeSize: function (sizeDifference) {
                                _this.spriteParameters.eye.left.position.y.size += sizeDifference;
                                return _this.spriteParameters.eye.left.position.y.checkSet.max() || _this.spriteParameters.eye.left.position.y.checkSet.min();
                            }
                        }
                    },
                    radius: {
                        x: {
                            size: Entity.baseParameters.height / 8,
                            originalSize: Entity.baseParameters.height / 8,
                            max: function () { return (_this.spriteParameters.width.size / 2 - _this.spriteParameters.eye.right.radius.x.size * 2); },
                            min: function () { return 1; },
                            checkSet: {
                                max: function () {
                                    var max = _this.spriteParameters.eye.left.radius.x.max();
                                    if (_this.spriteParameters.eye.left.radius.x.size > max) {
                                        _this.spriteParameters.eye.left.radius.x.size = max;
                                        return true;
                                    }
                                },
                                min: function () {
                                    var min = _this.spriteParameters.eye.left.radius.x.min();
                                    if (_this.spriteParameters.eye.left.radius.x.size < min) {
                                        _this.spriteParameters.eye.left.radius.x.size = min;
                                        return true;
                                    }
                                }
                            },
                            changeSize: function (sizeDifference) {
                                _this.spriteParameters.eye.left.radius.x.size += sizeDifference;
                                return _this.spriteParameters.eye.left.radius.x.checkSet.max() || _this.spriteParameters.eye.left.radius.x.checkSet.min();
                            }
                        },
                        y: {
                            size: Entity.baseParameters.height / 8,
                            originalSize: Entity.baseParameters.height / 8,
                            max: function () { return (_this.spriteParameters.height.size / 2); },
                            min: function () { return 1; },
                            checkSet: {
                                max: function () {
                                    var max = _this.spriteParameters.eye.left.radius.y.max();
                                    if (_this.spriteParameters.eye.left.radius.y.size > max) {
                                        _this.spriteParameters.eye.left.radius.y.size = max;
                                        return true;
                                    }
                                },
                                min: function () {
                                    var min = _this.spriteParameters.eye.left.radius.y.min();
                                    if (_this.spriteParameters.eye.left.radius.y.size < min) {
                                        _this.spriteParameters.eye.left.radius.y.size = min;
                                        return true;
                                    }
                                }
                            },
                            changeSize: function (sizeDifference) {
                                _this.spriteParameters.eye.left.radius.y.size += sizeDifference;
                                return _this.spriteParameters.eye.left.radius.y.checkSet.max() || _this.spriteParameters.eye.left.radius.y.checkSet.min();
                            }
                        }
                    }
                },
                right: {
                    position: {
                        x: {
                            size: 5 / 36 * Entity.baseParameters.width,
                            originalSize: 5 / 36 * Entity.baseParameters.width,
                            //furthest right
                            max: function () { return (_this.spriteParameters.width.size / 2 - _this.spriteParameters.eye.right.radius.x.size); },
                            min: function () { return (-_this.spriteParameters.width.size / 2 + _this.spriteParameters.eye.left.radius.x.size * 2 + 2 * _this.spriteParameters.eye.right.radius.x.size); },
                            checkSet: {
                                max: function () {
                                    var max = _this.spriteParameters.eye.right.position.x.max();
                                    if (_this.spriteParameters.eye.right.position.x.size > max) {
                                        _this.spriteParameters.eye.right.position.x.size = max;
                                        return true;
                                    }
                                },
                                min: function () {
                                    var min = _this.spriteParameters.eye.right.position.x.min();
                                    if (_this.spriteParameters.eye.right.position.x.size < min) {
                                        _this.spriteParameters.eye.right.position.x.size = min;
                                        return true;
                                    }
                                },
                            },
                            changeSize: function (sizeDifference) {
                                _this.spriteParameters.eye.right.position.x.size += sizeDifference;
                                return _this.spriteParameters.eye.right.position.x.checkSet.max() || _this.spriteParameters.eye.right.position.x.checkSet.min();
                            }
                        },
                        y: {
                            size: Entity.baseParameters.height / 8,
                            originalSize: Entity.baseParameters.height / 8,
                            max: function () { return (_this.spriteParameters.height.size / 2 - _this.spriteParameters.eye.right.radius.y.size); },
                            min: function () { return (-_this.spriteParameters.height.size / 2 + _this.spriteParameters.eye.right.radius.y.size); },
                            checkSet: {
                                max: function () {
                                    var max = _this.spriteParameters.eye.right.position.y.max();
                                    if (_this.spriteParameters.eye.right.position.y.size > max) {
                                        _this.spriteParameters.eye.right.position.y.size = max;
                                        return true;
                                    }
                                },
                                min: function () {
                                    var min = _this.spriteParameters.eye.right.position.y.min();
                                    if (_this.spriteParameters.eye.right.position.y.size < min) {
                                        _this.spriteParameters.eye.right.position.y.size = min;
                                        return true;
                                    }
                                }
                            },
                            changeSize: function (sizeDifference) {
                                _this.spriteParameters.eye.right.position.y.size += sizeDifference;
                                return _this.spriteParameters.eye.right.position.y.checkSet.max() || _this.spriteParameters.eye.right.position.y.checkSet.min();
                            }
                        }
                    },
                    radius: {
                        x: {
                            size: Entity.baseParameters.height / 8,
                            originalSize: Entity.baseParameters.height / 8,
                            max: function () { return (_this.spriteParameters.width.size / 2 - _this.spriteParameters.eye.left.radius.x.size * 2); },
                            min: function () { return 1; },
                            checkSet: {
                                max: function () {
                                    var max = _this.spriteParameters.eye.right.radius.x.max();
                                    if (_this.spriteParameters.eye.right.radius.x.size > max) {
                                        _this.spriteParameters.eye.right.radius.x.size = max;
                                        return true;
                                    }
                                },
                                min: function () {
                                    var min = _this.spriteParameters.eye.right.radius.x.min();
                                    if (_this.spriteParameters.eye.right.radius.x.size < min) {
                                        _this.spriteParameters.eye.right.radius.x.size = min;
                                        return true;
                                    }
                                }
                            },
                            changeSize: function (sizeDifference) {
                                _this.spriteParameters.eye.right.radius.x.size += sizeDifference;
                                return _this.spriteParameters.eye.right.radius.x.checkSet.max() || _this.spriteParameters.eye.right.radius.x.checkSet.min();
                            }
                        },
                        y: {
                            size: Entity.baseParameters.height / 8,
                            originalSize: Entity.baseParameters.height / 8,
                            max: function () { return (_this.spriteParameters.height.size / 2); },
                            min: function () { return 1; },
                            checkSet: {
                                max: function () {
                                    var max = _this.spriteParameters.eye.right.radius.y.max();
                                    if (_this.spriteParameters.eye.right.radius.y.size > max) {
                                        _this.spriteParameters.eye.right.radius.y.size = max;
                                        return true;
                                    }
                                },
                                min: function () {
                                    var min = _this.spriteParameters.eye.right.radius.y.min();
                                    if (_this.spriteParameters.eye.right.radius.y.size < min) {
                                        _this.spriteParameters.eye.right.radius.y.size = min;
                                        return true;
                                    }
                                }
                            },
                            changeSize: function (sizeDifference) {
                                _this.spriteParameters.eye.right.radius.y.size += sizeDifference;
                                return _this.spriteParameters.eye.right.radius.y.checkSet.max() || _this.spriteParameters.eye.right.radius.y.checkSet.min();
                            }
                        }
                    }
                }
            }
        };
        _this.addLineSprite(new EntitySprite(_this.transform, _this.spriteParameters));
        _this.setPossibleActivitiesAndAnimations();
        return _this;
        // this.possibleAnimations.spinningForFun();
    }
    Entity.prototype.chopTree = function (tree) {
        this.possibleActivities.chopTree(tree);
    };
    Entity.prototype.holdTree = function (tree) {
        this.treeHeld = tree;
    };
    Entity.prototype.setPossibleActivitiesAndAnimations = function () {
        var _this = this;
        this.possibleAnimations = {
            moveTo: function () {
                _this.currentAnimation = (0,_EntityAnimationStates__WEBPACK_IMPORTED_MODULE_3__.createBobAnimation)(_this);
            },
            chopping: function (tree) {
                _this.currentAnimation = (0,_EntityAnimationStates__WEBPACK_IMPORTED_MODULE_3__.createChopAnimation)(_this, tree);
            },
            spinningForFun: function () {
                _this.currentAnimation = (0,_EntityAnimationStates__WEBPACK_IMPORTED_MODULE_3__.createSpinningAnimation)(_this);
            },
            none: function () {
                // standby animation at some point
                _this.currentAnimation = null;
            },
            goingToSleep: function (bed) {
                var bedSpinAnimation = (0,_EntityAnimationStates__WEBPACK_IMPORTED_MODULE_3__.createGoingToBedAnimation)(_this, bed);
            },
            sleeping: function () {
            }
        };
        this.possibleActivities = {
            moveTo: function (location) {
                var moveToActivity = (0,_EntityActivityStates__WEBPACK_IMPORTED_MODULE_4__.createMoveToActivity)(_this, location);
                _this.activitiesQueue.push(moveToActivity);
            },
            chopTree: function (tree) {
                var chopTreeActivity = (0,_EntityActivityStates__WEBPACK_IMPORTED_MODULE_4__.createChopTreeActivity)(_this, tree);
                _this.activitiesQueue.push(chopTreeActivity);
            },
            goToSleep: function (bed) {
                var goToSleepActivity = (0,_EntityActivityStates__WEBPACK_IMPORTED_MODULE_4__.createGoToSleepActivity)(_this, bed);
            }
            // sleep: (bed: Bed) => {
            //     this.activitiesQueue.push({
            //         name: "goToSleep",
            //         bed,
            //         subActivities: [
            //             {
            //                 name: "moveTo",
            //                 location: bed.transform.pos
            //             },
            //             {
            //                 name: "goToSleep",
            //                 bed
            //             },
            //             {
            //                 name: "wait",
            //                 time: 5000,
            //                 waitedTime: 0
            //             }
            //         ]
            //     });
            // },
            // wait: (time: number) => {
            //     const waitActivity = new Activity<WaitState>("wait",{time, waitedTime: 0});
            //     waitActivity.runActivity = (dT: number, activityState) => {
            //         activityState.waitedTime += dT;
            //         return activityState.time >= activityState.waitedTime;
            //     };
            //     this.activitiesQueue.push(waitActivity);
            // },
            // wakeUp: () => {
            // this.activitiesQueue.push({
            //     name: "wakeUp",
            // });
            // }
        };
    };
    Entity.prototype.animationEnded = function () {
    };
    Entity.prototype.animate = function (deltaTime) {
        var _a;
        (_a = this.currentAnimation) === null || _a === void 0 ? void 0 : _a.animate(deltaTime);
    };
    Entity.prototype.exist = function () {
        this.addCollider("General", this, 5);
    };
    Entity.prototype.checkArrived = function (pos) {
        return _game_engine_util__WEBPACK_IMPORTED_MODULE_2__.VectorMath.dist(pos, this.transform.pos) < 2;
    };
    Entity.prototype.doActivity = function (activity, dT) {
        return activity.doActivity(dT);
    };
    Entity.prototype.update = function (dT) {
        // this would be where an entity get's to decide
        // if it is adding something to the top of the activity queue
        // and if it is deleting something from the activity queue
        if (this.activitiesQueue.length) {
            if (this.doActivity(this.activitiesQueue[0], dT)) {
                this.activitiesQueue.shift();
            }
        }
        this.animate(dT);
    };
    Entity.baseParameters = {
        armLength: 40,
        lineThickness: 4,
        width: 70,
        height: 40
    };
    return Entity;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var EntitySprite = /** @class */ (function (_super) {
    __extends(EntitySprite, _super);
    function EntitySprite(transform, spriteParameters) {
        var _this = _super.call(this, transform) || this;
        _this.spriteParameters = spriteParameters;
        _this.spawningScale = 1;
        _this.color = "#5D3FD3";
        return _this;
    }
    EntitySprite.prototype.draw = function (ctx) {
        var pos = this.transform.absolutePosition();
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.angle);
        this.drawEntity(ctx, this.spriteParameters);
        ctx.restore();
    };
    EntitySprite.prototype.drawEntity = function (ctx, spriteParameters) {
        var _this = this;
        var _a = spriteParameters.getDrawCoordinates(), rightArmEnd = _a.rightArmEnd, leftArmEnd = _a.leftArmEnd, rightArmStart = _a.rightArmStart, leftArmStart = _a.leftArmStart, curveTopRight = _a.curveTopRight, curvePointTopRight = _a.curvePointTopRight, curvePointBottomRight = _a.curvePointBottomRight, curveBottomRight = _a.curveBottomRight, curveBottomLeft = _a.curveBottomLeft, curvePointBottomLeft = _a.curvePointBottomLeft, curvePointTopLeft = _a.curvePointTopLeft, curveTopLeft = _a.curveTopLeft, rightEyePosition = _a.rightEyePosition, rightEyeRadius = _a.rightEyeRadius, leftEyePosition = _a.leftEyePosition, leftEyeRadius = _a.leftEyeRadius, bodyAngle = _a.bodyAngle, lineThickness = _a.lineThickness;
        ctx.lineWidth = lineThickness;
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // Arms
        ctx.moveTo(rightArmEnd[0], rightArmEnd[1]); // 1
        ctx.lineTo(rightArmStart[0], rightArmStart[1]); // 2 
        ctx.moveTo(leftArmEnd[0], leftArmEnd[1]); // 11
        ctx.lineTo(leftArmStart[0], leftArmStart[1]); // 9
        ctx.stroke();
        var drawBody = function (ctx) {
            ctx.fillStyle = "#000000";
            // body independent rotation
            ctx.rotate(bodyAngle);
            ctx.beginPath();
            ctx.moveTo(curveTopLeft[0], curveTopLeft[1]); // 8
            // curve points
            ctx.lineTo(curveTopRight[0], curveTopRight[1]); // 3 to
            ctx.bezierCurveTo(curvePointTopRight[0], curvePointTopRight[1], curvePointBottomRight[0], curvePointBottomRight[1], curveBottomRight[0], // 5
            curveBottomRight[1] // 5
            );
            ctx.lineTo(curveBottomLeft[0], curveBottomLeft[1]); // 6 to 
            ctx.bezierCurveTo(curvePointBottomLeft[0], curvePointBottomLeft[1], curvePointTopLeft[0], curvePointTopLeft[1], curveTopLeft[0], // 8
            curveTopLeft[1] // 8
            );
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = _this.color;
            ctx.beginPath();
            ctx.moveTo(curveTopLeft[0], curveTopLeft[1]); // 8
            // curve points
            ctx.lineTo(curveTopRight[0], curveTopRight[1]); // 3 to
            ctx.bezierCurveTo(curvePointTopRight[0], curvePointTopRight[1], curvePointBottomRight[0], curvePointBottomRight[1], curveBottomRight[0], // 5
            curveBottomRight[1] // 5
            );
            ctx.lineTo(curveBottomLeft[0], curveBottomLeft[1]); // 6 to 
            ctx.bezierCurveTo(curvePointBottomLeft[0], curvePointBottomLeft[1], curvePointTopLeft[0], curvePointTopLeft[1], curveTopLeft[0], // 8
            curveTopLeft[1] // 8
            );
            ctx.stroke();
        };
        ctx.save();
        drawBody(ctx);
        ctx.restore();
        ctx.beginPath();
        ctx.ellipse(leftEyePosition[0], leftEyePosition[1], leftEyeRadius[0], leftEyeRadius[1], 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(rightEyePosition[0], rightEyePosition[1], rightEyeRadius[0], rightEyeRadius[1], 0, 0, 2 * Math.PI);
        ctx.fill();
    };
    return EntitySprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__.LineSprite));

// const NORMAL_FRAME_TIME_DELTA = 1000 / 60;


/***/ }),

/***/ "./src/game_objects/ClockworkGames/Entity/EntityActivityStates.ts":
/*!************************************************************************!*\
  !*** ./src/game_objects/ClockworkGames/Entity/EntityActivityStates.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createChopTreeActivity: () => (/* binding */ createChopTreeActivity),
/* harmony export */   createGoToSleepActivity: () => (/* binding */ createGoToSleepActivity),
/* harmony export */   createMoveToActivity: () => (/* binding */ createMoveToActivity)
/* harmony export */ });
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/util */ "./src/game_engine/util.ts");
/* harmony import */ var _game_engine_EntityState_Activity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/EntityState/Activity */ "./src/game_engine/EntityState/Activity.ts");


// okay, clearly the activity needs to control the animation otherwise it'll be hard to 
// control both and have activities defined outside of the object that's animating
var createMoveToActivity = function (entity, location) {
    var moveToData = {
        location: location,
        entityTransform: entity.transform,
        moveToSpeed: entity.moveToSpeed,
        moveToAcceleration: entity.moveToAcceleration
    };
    var onMoveToEnd = function (dT, activityState) {
        activityState.entityTransform.pos[0] = activityState.location[0];
        activityState.entityTransform.pos[1] = activityState.location[1];
        activityState.entityTransform.vel[0] = 0;
        activityState.entityTransform.vel[1] = 0;
        entity.currentAnimation.endAnimation();
        entity.possibleAnimations['none']();
    };
    var onMoveToStart = function (activityState) { return entity.possibleAnimations['moveTo'](); };
    var move = function (time, activityState) {
        if (_game_engine_util__WEBPACK_IMPORTED_MODULE_0__.VectorMath.dist(activityState.location, activityState.entityTransform.pos) < 2)
            return true;
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
        // knowing the acceleration, and current velocity, and final velocity of 0
        // I can come up with the distance where it should 
        // start decelerating
        // (Vf^2 - Vi^2) / 2a = D
        var speed = activityState.moveToSpeed;
        var pos = activityState.entityTransform.absolutePosition();
        var distanceRemaining = _game_engine_util__WEBPACK_IMPORTED_MODULE_0__.VectorMath.dist(pos, location);
        var decelerateDistance = Math.pow(activityState.entityTransform.vel[0], 2) / (2 * activityState.moveToAcceleration);
        if (distanceRemaining < decelerateDistance) {
            var accelerationDirection = Math.atan2(activityState.entityTransform.vel[1], activityState.entityTransform.vel[0]);
            activityState.entityTransform.acc[0] -= activityState.moveToAcceleration * Math.cos(accelerationDirection);
            activityState.entityTransform.acc[1] -= activityState.moveToAcceleration * Math.sin(accelerationDirection);
        }
        else {
            var deltaPosition = [location[0] - pos[0], location[1] - pos[1]];
            var chaseDirection = Math.atan2(deltaPosition[1], deltaPosition[0]);
            if (chaseDirection < 0) {
                chaseDirection = 2 * Math.PI + chaseDirection;
            }
            // console.log(chaseDirection / (2 * Math.PI) * 360)
            var Vm = [speed * Math.cos(chaseDirection), speed * Math.sin(chaseDirection)];
            var Vo = activityState.entityTransform.vel;
            var dV = [Vm[0] - Vo[0], Vm[1] - Vo[1]];
            var accelerationDirection = Math.atan2(dV[1], dV[0]);
            activityState.entityTransform.acc[0] += activityState.moveToAcceleration * Math.cos(accelerationDirection);
            activityState.entityTransform.acc[1] += activityState.moveToAcceleration * Math.sin(accelerationDirection);
        }
        return false;
    };
    return new _game_engine_EntityState_Activity__WEBPACK_IMPORTED_MODULE_1__.Activity('moveTo', moveToData, move, onMoveToStart, onMoveToEnd);
};
var createChopTreeActivity = function (entity, tree) {
    var chopTreeData = {
        tree: tree,
    };
    var chopLocation = [tree.transform.pos[0] + entity.treeChopLocation[0], tree.transform.pos[1] + entity.treeChopLocation[1]];
    var moveToActivity = createMoveToActivity(entity, chopLocation);
    var chop = function (time, activityState) {
        entity.possibleAnimations['chopping'](tree);
        return true;
    };
    var chopActivity = new _game_engine_EntityState_Activity__WEBPACK_IMPORTED_MODULE_1__.Activity('ChopTree', chopTreeData, chop, function () { return null; }, function () { return null; });
    var subActivities = [
        moveToActivity,
        chopActivity
    ];
    return new _game_engine_EntityState_Activity__WEBPACK_IMPORTED_MODULE_1__.ParentActivity('ChopTreeActivity', subActivities);
};
var createGoToSleepActivity = function (entity, bed) {
    var sleepLocation = [bed.transform.pos[0] + entity.sleepLocation[0], bed.transform.pos[1] + entity.sleepLocation[1]];
    var moveToActivity = createMoveToActivity(entity, sleepLocation);
    var setUpBed = function (time, activityState) {
        entity.possibleAnimations['goingToSleep'](bed);
    };
};


/***/ }),

/***/ "./src/game_objects/ClockworkGames/Entity/EntityAnimationStates.ts":
/*!*************************************************************************!*\
  !*** ./src/game_objects/ClockworkGames/Entity/EntityAnimationStates.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createArmDemoAnimation: () => (/* binding */ createArmDemoAnimation),
/* harmony export */   createBedEntitySpinAnimation: () => (/* binding */ createBedEntitySpinAnimation),
/* harmony export */   createBobAnimation: () => (/* binding */ createBobAnimation),
/* harmony export */   createChopAnimation: () => (/* binding */ createChopAnimation),
/* harmony export */   createCloseStrained: () => (/* binding */ createCloseStrained),
/* harmony export */   createGoingToBedAnimation: () => (/* binding */ createGoingToBedAnimation),
/* harmony export */   createOpenBounceAnimation: () => (/* binding */ createOpenBounceAnimation),
/* harmony export */   createPauseAnimation: () => (/* binding */ createPauseAnimation),
/* harmony export */   createSpin: () => (/* binding */ createSpin),
/* harmony export */   createSpinningAnimation: () => (/* binding */ createSpinningAnimation),
/* harmony export */   createSqueezeAnimation: () => (/* binding */ createSqueezeAnimation)
/* harmony export */ });
/* harmony import */ var _game_engine_EntityState_Animate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/EntityState/Animate */ "./src/game_engine/EntityState/Animate.ts");
/* harmony import */ var _Bed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Bed */ "./src/game_objects/ClockworkGames/Bed.ts");


var createPauseAnimation = function (entity, pauseTime) {
    var pause = function (dT, pauseState) {
        pauseState.timePaused += dT;
        if (pauseState.timePaused >= pauseState.maxPauseTime) {
            pauseState.timePaused = 0;
            return true;
        }
        return false;
    };
    return new _game_engine_EntityState_Animate__WEBPACK_IMPORTED_MODULE_0__.Animation('PauseFor', { timePaused: 0, maxPauseTime: pauseTime }, pause, function () { return null; });
};
// spin is absolute. Kind of assumes you know where the entity is already spin wise
// could make one that doesn't care but not needed yet?
// okay, now that I'm doing the bed spin I'm confused about what happens when
// the entity is spun 360 degrees... maybe changeSize needs to set it to currentAngle - 2*PI when 360 is hit
// but then the total angle change needs to be kept track in the animation state
var entitySpinAnimator = function (dT, animationState, spriteParameters) {
    var angleChange = dT * animationState.spinSpeed / 1000;
    if (animationState.spinAngle > 0) {
        animationState.totalSpun += angleChange;
        spriteParameters.bodyAngle.changeSize(angleChange);
        if (animationState.totalSpun > animationState.spinAngle) {
            spriteParameters.bodyAngle.changeSize(animationState.spinAngle - animationState.totalSpun);
            return true;
        }
        else {
            return false;
        }
    }
    else {
        animationState.totalSpun -= angleChange;
        spriteParameters.bodyAngle.changeSize(-angleChange);
        if (animationState.totalSpun < animationState.spinAngle) {
            spriteParameters.bodyAngle.changeSize(animationState.totalSpun - animationState.spinAngle);
            return true;
        }
        else {
            return false;
        }
    }
};
var createSpin = function (entity, spinAngle, spinSpeed) {
    return new _game_engine_EntityState_Animate__WEBPACK_IMPORTED_MODULE_0__.Animation('Spin', { totalSpun: 0, spinSpeed: spinSpeed, spinAngle: spinAngle }, entitySpinAnimator, function () { return null; }, entity.spriteParameters);
};
var createSpinningAnimation = function (entity) {
    var firstPause = createPauseAnimation(entity, 2000);
    var spinRight = createSpin(entity, Math.PI, 1);
    var spinLeft = createSpin(entity, -Math.PI, 1);
    var secondPause = createPauseAnimation(entity, 3000);
    var animations = [
        firstPause, spinRight, secondPause, spinLeft
    ];
    return new _game_engine_EntityState_Animate__WEBPACK_IMPORTED_MODULE_0__.ParentAnimation('SpinningAnimation', animations);
};
var createCloseStrained = function (entity) {
    var closeStrained = function (dT, animationState, spriteParameters) {
        var time = dT / 48;
        var animationScale = time > 3 ? 3 : time;
        // spin 90 degrees, pause, spin back 90 degrees, pause
        var squeezedWidth = spriteParameters.lineThickness;
        var openedWidth = spriteParameters.arms.right.position.x.max() - spriteParameters.arms.left.position.x.min();
        var currentSqueezeWidth = spriteParameters.arms.right.position.x.size -
            spriteParameters.arms.left.position.x.size;
        var animationPercentage = (openedWidth - currentSqueezeWidth - squeezedWidth) / openedWidth;
        var closeDelta = animationScale * (0.25 + 1.75 * (1 - animationPercentage));
        spriteParameters.arms.left.position.x.changeSize(closeDelta / 2);
        spriteParameters.arms.right.position.x.changeSize(-closeDelta / 2);
        spriteParameters.width.changeSize(-closeDelta / 4);
        spriteParameters.height.changeSize(closeDelta / 8);
        spriteParameters.eye.height.changeSize(closeDelta / 16);
        spriteParameters.eye.width.changeSize(closeDelta / 6);
        spriteParameters.eye.right.radius.x.changeSize(closeDelta / 16);
        spriteParameters.eye.right.radius.y.changeSize(-closeDelta / 16);
        spriteParameters.eye.left.radius.x.changeSize(closeDelta / 32);
        spriteParameters.eye.left.radius.y.changeSize(closeDelta / 32);
        if (currentSqueezeWidth < squeezedWidth) {
            var correctionChange = (currentSqueezeWidth - squeezedWidth) / 2;
            spriteParameters.arms.left.position.x.changeSize(-correctionChange);
            spriteParameters.arms.right.position.x.changeSize(correctionChange);
            return true;
        }
        return false;
    };
    return new _game_engine_EntityState_Animate__WEBPACK_IMPORTED_MODULE_0__.Animation('CloseStrained', {}, closeStrained, function () { return null; }, entity.spriteParameters);
};
var createOpenBounceAnimation = function (entity) {
    var openBounce = function (dT, animationState, spriteParameters) {
        var time = dT / 48;
        var animationScale = time > 3 ? 3 : time;
        var squeezedWidth = spriteParameters.lineThickness;
        var openedWidth = spriteParameters.arms.right.position.x.max() - spriteParameters.arms.left.position.x.min();
        var currentOpenWidth = spriteParameters.arms.right.position.x.size -
            spriteParameters.arms.left.position.x.size;
        var animationPercentage = (currentOpenWidth - squeezedWidth) / openedWidth;
        var openDelta = animationScale * (1 + 3 * animationPercentage);
        spriteParameters.arms.left.position.x.changeSize(-openDelta / 2);
        spriteParameters.arms.right.position.x.changeSize(openDelta / 2);
        spriteParameters.width.changeSize(openDelta / 4);
        spriteParameters.height.changeSize(-openDelta / 8);
        spriteParameters.eye.height.changeSize(-openDelta / 16);
        spriteParameters.eye.width.changeSize(-openDelta / 6);
        spriteParameters.eye.right.radius.x.changeSize(-openDelta / 16);
        spriteParameters.eye.right.radius.y.changeSize(openDelta / 16);
        spriteParameters.eye.left.radius.x.changeSize(-openDelta / 32);
        spriteParameters.eye.left.radius.y.changeSize(-openDelta / 32);
        if (currentOpenWidth >= openedWidth) {
            var correctionChange = (currentOpenWidth - openedWidth) / 2;
            spriteParameters.arms.left.position.x.changeSize(correctionChange);
            spriteParameters.arms.right.position.x.changeSize(-correctionChange);
            spriteParameters.width.size = spriteParameters.width.originalSize;
            spriteParameters.height.size = spriteParameters.height.originalSize;
            spriteParameters.eye.left.position.y.size = spriteParameters.eye.left.position.y.originalSize;
            spriteParameters.eye.right.position.y.size = spriteParameters.eye.right.position.y.originalSize;
            spriteParameters.eye.left.position.x.size = spriteParameters.eye.left.position.x.originalSize;
            spriteParameters.eye.right.position.x.size = spriteParameters.eye.right.position.x.originalSize;
            spriteParameters.eye.left.radius.x.size = spriteParameters.eye.left.radius.x.originalSize;
            spriteParameters.eye.left.radius.y.size = spriteParameters.eye.left.radius.y.originalSize;
            spriteParameters.eye.right.radius.x.size = spriteParameters.eye.right.radius.x.originalSize;
            spriteParameters.eye.right.radius.y.size = spriteParameters.eye.right.radius.y.originalSize;
            return true;
        }
        return false;
    };
    return new _game_engine_EntityState_Animate__WEBPACK_IMPORTED_MODULE_0__.Animation('OpenBounce', {}, openBounce, function () { return null; }, entity.spriteParameters);
};
var createSqueezeAnimation = function (entity) {
    var closeStrainedAnimation = createCloseStrained(entity);
    var openBounceAnimation = createOpenBounceAnimation(entity);
    var animations = [
        closeStrainedAnimation,
        openBounceAnimation
    ];
    return new _game_engine_EntityState_Animate__WEBPACK_IMPORTED_MODULE_0__.ParentAnimation('Squeeze', animations);
};
var createBedEntitySpinAnimation = function (entity, bed, spinAngle, spinSpeed) {
    var bedEntitySpinAnimator = function (dT, animationState, spriteParameters) {
        var spinResult = entitySpinAnimator(dT, { spinAngle: spinAngle, spinSpeed: spinSpeed, totalSpun: 0 }, spriteParameters.entity);
        (0,_Bed__WEBPACK_IMPORTED_MODULE_1__.bedSpinAnimator)(dT, spriteParameters.entity.bodyAngle, spriteParameters.bed);
        return spinResult;
    };
    var endBedSpinAnimation = function (animationState, spriteParameters) {
        return null;
    };
    return new _game_engine_EntityState_Animate__WEBPACK_IMPORTED_MODULE_0__.Animation('BedEntitySpin', { bed: bed, entity: entity }, bedEntitySpinAnimator, endBedSpinAnimation, { bed: bed.spriteParameters, entity: entity.spriteParameters });
};
var createGoingToBedAnimation = function (entity, bed) {
    var firstPause = createPauseAnimation(entity, 300);
    var secondPause = createPauseAnimation(entity, 500);
    var goingToSleepBedEntitySpinAnimation = createBedEntitySpinAnimation(entity, bed, 0.8, Math.PI);
    var wakingUpBedEntitySpinAnimation = createBedEntitySpinAnimation(entity, bed, -0.8, -Math.PI);
    var animations = [
        firstPause,
        goingToSleepBedEntitySpinAnimation,
        secondPause,
        wakingUpBedEntitySpinAnimation
    ];
    return new _game_engine_EntityState_Animate__WEBPACK_IMPORTED_MODULE_0__.ParentAnimation('GoingToBedAndWakingUpAnimation', animations);
};
var createBobAnimation = function (entity) {
    var bobAnimationState = {
        entityTransform: entity.transform,
        entity: entity,
        yOffset: 0,
        maxBob: 10,
        bobSpeed: entity.moveToSpeed / 100,
        bobDirection: 1,
        armBobbingSpeed: 0.8,
        animationProgress: 0
        // spot I can add more state if needed I guess
    };
    var bobAnimator = function (dT, animationState, spriteParameters) {
        // should probably split these into two separate animations. 
        // then I'll have control over how it behaves while bouncing up vs down
        if (bobAnimationState.entity.treeHeld) {
            return false;
        }
        var entityTransform = animationState.entityTransform;
        var yOffsetIncrement = dT * animationState.bobSpeed * animationState.bobDirection * (0.4 + (1 - animationState.animationProgress) * 0.8);
        var possibleNewOffset = animationState.yOffset + yOffsetIncrement;
        if (animationState.bobDirection === 1) {
            if (possibleNewOffset >= animationState.maxBob) {
                yOffsetIncrement = animationState.maxBob - animationState.yOffset;
                animationState.yOffset = animationState.maxBob;
                entityTransform.pos[1] += yOffsetIncrement;
                animationState.bobDirection = -1;
                animationState.animationProgress = 0;
                return false;
            }
            animationState.animationProgress = animationState.yOffset / animationState.maxBob;
            spriteParameters.arms.left.angle.changeAngle(dT * animationState.armBobbingSpeed / 1500 * (0.4 + (1 - animationState.animationProgress) * 0.8));
            spriteParameters.arms.right.angle.changeAngle(dT * animationState.armBobbingSpeed / 1500 * (0.4 + (1 - animationState.animationProgress) * 0.8));
            animationState.yOffset += yOffsetIncrement;
            entityTransform.pos[1] += yOffsetIncrement;
            return false;
        }
        else {
            if (possibleNewOffset <= 0) {
                yOffsetIncrement = -animationState.yOffset;
                animationState.yOffset = 0;
                entityTransform.pos[1] += yOffsetIncrement;
                animationState.bobDirection = 1;
                animationState.animationProgress = 0;
                return false;
            }
            animationState.animationProgress = (animationState.maxBob - animationState.yOffset) / animationState.maxBob;
            spriteParameters.arms.left.angle.changeAngle(dT * -animationState.armBobbingSpeed / 1500 * (0.4 + (1 - animationState.animationProgress) * 0.8));
            spriteParameters.arms.right.angle.changeAngle(dT * -animationState.armBobbingSpeed / 1500 * (0.4 + (1 - animationState.animationProgress) * 0.8));
            animationState.yOffset += yOffsetIncrement;
            entityTransform.pos[1] += yOffsetIncrement;
            return false;
        }
    };
    var endBobAnimation = function (animationState, spriteParameters) {
        // animationState.entityTransform.pos[1] -= animationState.yOffset;
        var resetLeftAngle = spriteParameters.arms.left.angle.originalSize - spriteParameters.arms.left.angle.size;
        spriteParameters.arms.left.angle.changeAngle(resetLeftAngle);
        var resetRightAngle = spriteParameters.arms.right.angle.originalSize - spriteParameters.arms.right.angle.size;
        spriteParameters.arms.right.angle.changeAngle(resetRightAngle);
        console.log({ resetLeftAngle: resetLeftAngle, resetRightAngle: resetRightAngle });
    };
    return new _game_engine_EntityState_Animate__WEBPACK_IMPORTED_MODULE_0__.Animation('Bob', bobAnimationState, bobAnimator, endBobAnimation, entity.spriteParameters);
};
var createChopAnimation = function (entity, tree) {
    var firstPause = createPauseAnimation(entity, 300);
    var secondPause = createPauseAnimation(entity, 300);
    var chopAnimationState = {
        // measured absolutely so that it looks like a chop even if the start angle is "wrong"
        chopEndAngle: Math.PI * 3.5 / 8,
        chopStartAngle: Math.PI / 2,
        chopCount: 0,
        maxChops: 4,
    };
    var chop = function (dT, animationState, spriteParameters) {
        // not accounting for when one arm is off from another. A real animation should account for that
        if (spriteParameters.arms.left.angle.size > animationState.chopEndAngle) {
            spriteParameters.arms.left.angle.changeAngle(-dT * 0.8 / 1500);
            spriteParameters.arms.right.angle.changeAngle(dT * 0.8 / 1500);
            return false;
        }
        animationState.chopCount += 1;
        tree.possibleAnimations.shakeTree();
        if (animationState.chopCount >= animationState.maxChops) {
            entity.currentAnimation = null;
            tree.chopper = entity;
            entity.holdTree(tree);
            entity.possibleActivities.moveTo([entity.transform.pos[0], entity.transform.pos[1] + 80]);
        }
        return true;
    };
    var chopBackswing = function (dT, animationState, spriteParameters) {
        if (spriteParameters.arms.left.angle.size < animationState.chopStartAngle) {
            spriteParameters.arms.left.angle.changeAngle(dT * 0.8 / 1500);
            spriteParameters.arms.right.angle.changeAngle(-dT * 0.8 / 1500);
            return false;
        }
        else {
            return true;
        }
    };
    var animations = [
        firstPause,
        new _game_engine_EntityState_Animate__WEBPACK_IMPORTED_MODULE_0__.Animation('Chop', chopAnimationState, chop, function () { return null; }, entity.spriteParameters),
        secondPause,
        new _game_engine_EntityState_Animate__WEBPACK_IMPORTED_MODULE_0__.Animation('ChopBackswing', chopAnimationState, chopBackswing, function () { return null; }, entity.spriteParameters)
    ];
    return new _game_engine_EntityState_Animate__WEBPACK_IMPORTED_MODULE_0__.ParentAnimation('Chop', animations);
};
var entityChopAnimator = function (dT, animationState) {
    // arms spin towards each other 
    animationState.arms.left.angle.changeAngle(dT * 0.8 / 1500);
};
// lets do a demo animation of the arm around the entity to show it works
var createArmDemoAnimation = function (entity) {
    var nextArmSideClockwise = function (leftOrRightArm) {
        var sideChangeMap = {
            RIGHT: "BOTTOM",
            BOTTOM: "LEFT",
            LEFT: "TOP",
            TOP: "RIGHT"
        };
        if (leftOrRightArm === 'left') {
            entity.spriteParameters.arms.left.sidePosition.side = sideChangeMap[entity.spriteParameters.arms.left.sidePosition.side];
        }
        else {
            entity.spriteParameters.arms.right.sidePosition.side = sideChangeMap[entity.spriteParameters.arms.right.sidePosition.side];
        }
    };
    var nextArmSideCounterClockwise = function (leftOrRightArm) {
        var sideChangeMap = {
            RIGHT: "TOP",
            BOTTOM: "RIGHT",
            LEFT: "BOTTOM",
            TOP: "LEFT"
        };
        if (leftOrRightArm === 'left') {
            entity.spriteParameters.arms.left.sidePosition.side = sideChangeMap[entity.spriteParameters.arms.left.sidePosition.side];
        }
        else {
            entity.spriteParameters.arms.right.sidePosition.side = sideChangeMap[entity.spriteParameters.arms.right.sidePosition.side];
        }
    };
    var armDemoAnimationState = {};
    var moveLeftArmClockwise = function (dT, animationState, spriteParameters) {
        // starts TOP close to the end
        // move right until limit
        // change side
        // move down until limit
        // change side
        // move left until limit
        // change side
        // move up until limit
        // change side
        // repeat
        var armMoveSpeed = 0.8 / 1500;
        if (spriteParameters.arms.left.sidePosition.side === 'TOP') {
            if (spriteParameters.arms.left.position.x.changeSize(dT * armMoveSpeed)) {
                // not sure if this is 0 or PI/2
                spriteParameters.arms.left.sidePosition.sideAngle.size = 0;
                nextArmSideCounterClockwise('left');
            }
        }
        else if (spriteParameters.arms.left.sidePosition.side === 'RIGHT') {
            if (spriteParameters.arms.left.sidePosition.sideAngle.changeAngle(dT * armMoveSpeed / spriteParameters.arms.left.sidePosition.length.size)) {
                spriteParameters.arms.left.angle.size = Math.PI;
                nextArmSideCounterClockwise('left');
            }
        }
        else if (spriteParameters.arms.left.sidePosition.side === 'BOTTOM') {
            if (spriteParameters.arms.left.position.x.changeSize(dT * -armMoveSpeed)) {
                nextArmSideClockwise('left');
            }
        }
        else if (spriteParameters.arms.left.sidePosition.side === 'LEFT') {
            if (spriteParameters.arms.left.sidePosition.sideAngle.changeAngle(dT * armMoveSpeed / spriteParameters.arms.left.sidePosition.length.size)) {
                spriteParameters.arms.left.angle.size = 0;
                nextArmSideCounterClockwise('left');
            }
        }
        return false;
    };
};


/***/ }),

/***/ "./src/game_objects/ClockworkGames/Machine.ts":
/*!****************************************************!*\
  !*** ./src/game_objects/ClockworkGames/Machine.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Machinery: () => (/* binding */ Machinery),
/* harmony export */   MachineryLineSprite: () => (/* binding */ MachineryLineSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
/* harmony import */ var _SawMachine_TreeGrip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SawMachine/TreeGrip */ "./src/game_objects/ClockworkGames/SawMachine/TreeGrip.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



// make a class function later
var getCoordinates = function (machineAngle, driverAngle, body, driverArm, coupler, rocker, couplerPointLength, couplePointHeight, mirrored) {
    var a = driverArm;
    var b = coupler;
    var c = rocker;
    var d = body;
    var theta_2 = driverAngle;
    var theta_1 = machineAngle;
    var A_x = a * Math.cos(theta_2);
    var A_y = a * Math.sin(theta_2);
    var S = (Math.pow(a, 2) - Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(d, 2)) / (2 * (A_x - d));
    var Q = 2 * A_y * (d - S) / (A_x - d);
    var R = Math.pow((d - S), 2) - Math.pow(c, 2);
    var P = Math.pow(A_y, 2) / (Math.pow((A_x - d), 2)) + 1;
    var B_y = (-Q - Math.sqrt(Math.pow(Q, 2) - 4 * P * R)) / (2 * P);
    var B_x = S - A_y * B_y / (A_x - d);
    var couplerAngle = Math.atan2(B_y - A_y, B_x - A_x);
    var coupler_x = A_x + couplerPointLength * Math.cos(couplerAngle) + couplePointHeight * Math.sin(couplerAngle);
    var coupler_y = A_y - couplePointHeight * Math.cos(couplerAngle) + couplerPointLength * Math.sin(couplerAngle);
    var mirrorFactor = mirrored ? -1 : 1;
    return {
        driverArmCoordinate: [mirrorFactor * A_x, A_y],
        rockerCoordinate: [mirrorFactor * B_x, B_y],
        couplerPoint: [mirrorFactor * coupler_x, coupler_y],
    };
};
var Machinery = /** @class */ (function (_super) {
    __extends(Machinery, _super);
    function Machinery(engine, pos, mirrored) {
        if (mirrored === void 0) { mirrored = false; }
        var _this = _super.call(this, engine) || this;
        _this.transform.pos = [pos[0] - 50, pos[1]];
        var scale = 0.2;
        _this.spriteParameters = {
            machineAngle: 0, // reference frame angle
            driverAngle: Math.PI / 3, // theta_2
            body: 478 * scale, // d 
            driverArm: 150 * scale,
            coupler: 222 * scale,
            rocker: 407 * scale,
            couplerPointLength: 372 * scale,
            couplerPointHeight: 200 * scale,
            mirrored: mirrored || false,
            get_AB_Coordinates: function () { return getCoordinates(_this.spriteParameters.machineAngle, _this.spriteParameters.driverAngle, _this.spriteParameters.body, _this.spriteParameters.driverArm, _this.spriteParameters.coupler, _this.spriteParameters.rocker, _this.spriteParameters.couplerPointLength, _this.spriteParameters.couplerPointHeight, _this.spriteParameters.mirrored); }
        };
        _this.addLineSprite(new MachineryLineSprite(_this.transform, _this.spriteParameters));
        var gripAngle = !mirrored ? Math.PI / 2 : 3 * Math.PI / 2;
        _this.treeGripper = new _SawMachine_TreeGrip__WEBPACK_IMPORTED_MODULE_2__.TreeGrip(engine, [0, 0], gripAngle);
        return _this;
    }
    Machinery.prototype.update = function (dT) {
        this.spriteParameters.driverAngle += dT * 0.001;
        this.spriteParameters.driverAngle = this.spriteParameters.driverAngle > 2 * Math.PI ? 0 : this.spriteParameters.driverAngle;
        // could cache last used value;
        var couplerPoint = this.spriteParameters.get_AB_Coordinates().couplerPoint;
        this.treeGripper.transform.pos = [this.transform.pos[0] + couplerPoint[0], this.transform.pos[1] + couplerPoint[1]];
    };
    Machinery.prototype.animate = function (dT) {
        this.spriteParameters.driverAngle += dT * 0.001;
    };
    return Machinery;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var MachineryLineSprite = /** @class */ (function (_super) {
    __extends(MachineryLineSprite, _super);
    function MachineryLineSprite(transform, spriteParameters) {
        var _this = _super.call(this, transform) || this;
        _this.spriteParameters = spriteParameters;
        return _this;
    }
    MachineryLineSprite.prototype.draw = function (ctx) {
        var pos = this.transform.absolutePosition();
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.spriteParameters.machineAngle);
        this.drawMachine(ctx);
        ctx.restore();
    };
    MachineryLineSprite.prototype.drawMachine = function (ctx) {
        var _a = this.spriteParameters.get_AB_Coordinates(), driverArmCoordinate = _a.driverArmCoordinate, rockerCoordinate = _a.rockerCoordinate, couplerPoint = _a.couplerPoint;
        var mirrorFactor = this.spriteParameters.mirrored ? -1 : 1;
        ctx.strokeStyle = "#5D3FD3";
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.lineTo(0, 0);
        ctx.lineTo.apply(ctx, driverArmCoordinate);
        ctx.lineTo.apply(ctx, rockerCoordinate);
        ctx.lineTo(mirrorFactor * this.spriteParameters.body, 0);
        // ctx.lineTo(0,0);
        ctx.stroke();
        ctx.strokeStyle = "#6D3FD3";
        ctx.beginPath();
        ctx.moveTo.apply(ctx, driverArmCoordinate);
        ctx.lineTo.apply(ctx, couplerPoint);
        ctx.lineTo.apply(ctx, rockerCoordinate);
        ctx.stroke();
    };
    return MachineryLineSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__.LineSprite));



/***/ }),

/***/ "./src/game_objects/ClockworkGames/Plate.ts":
/*!**************************************************!*\
  !*** ./src/game_objects/ClockworkGames/Plate.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Plate: () => (/* binding */ Plate),
/* harmony export */   PlateSprite: () => (/* binding */ PlateSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Plate = /** @class */ (function (_super) {
    __extends(Plate, _super);
    function Plate(engine, pos) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos = pos;
        _this.width = 75;
        _this.height = 75;
        _this.spriteParameters = {
            width: _this.width,
            height: _this.height,
            cornerRadius: 1 / 4 * _this.width
        };
        _this.addLineSprite(new PlateSprite(_this.transform, _this.spriteParameters));
        return _this;
    }
    Plate.prototype.update = function () { };
    Plate.prototype.animate = function () { };
    Plate.prototype.exist = function () {
        this.addCollider("General", this, 5);
    };
    return Plate;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var PlateSprite = /** @class */ (function (_super) {
    __extends(PlateSprite, _super);
    function PlateSprite(transform, spriteParameters) {
        var _this = _super.call(this, transform) || this;
        _this.spriteParameters = spriteParameters;
        _this.spawningScale = 1;
        _this.transform = transform;
        _this.bunColor = "#CD7F32";
        _this.crimsonRed = "#DC143C";
        _this.brightGreen = "#AAFF00";
        _this.creamWhite = "#FFFDD0";
        _this.fucia = "#FF00FF";
        _this.cyan = "#00FFFF";
        _this.indigo = "#00FFFF";
        return _this;
    }
    PlateSprite.prototype.draw = function (ctx) {
        var pos = this.transform.absolutePosition();
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.absoluteAngle());
        this.drawPlate(ctx, this.spriteParameters);
        ctx.restore();
    };
    PlateSprite.prototype.drawPlate = function (ctx, spriteParameters) {
        var w = spriteParameters.width, h = spriteParameters.height, r = spriteParameters.cornerRadius;
        // ctx.fillStyle = this.bunColor;
        ctx.strokeStyle = "#708090"; // slate grey
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(w / 2, h / 2 - r); // 1
        ctx.lineTo(w / 2, -h / 2 + r); // 2
        ctx.arcTo(w / 2, -h / 2, w / 2 - r, -h / 2, r); // 3
        ctx.lineTo(-w / 2 + r, -h / 2); // 4
        ctx.arcTo(-w / 2, -h / 2, -w / 2, -h / 2 + r, r); // 5
        ctx.lineTo(-w / 2, h / 2 - r); // 6
        ctx.arcTo(-w / 2, h / 2, -w / 2 + r, h / 2, r); // 7
        ctx.lineTo(w / 2 - r, h / 2); // 8
        ctx.arcTo(w / 2, h / 2, w / 2, h / 2 - r, r); // 1
        ctx.stroke();
        ctx.moveTo(w / 2, -h / 2 + r);
        ctx.bezierCurveTo(w / 2, -h / 2, w / 2, -h / 2, w / 2 - r, -h / 2);
        ctx.stroke();
        ctx.moveTo(-w / 2 + r, -h / 2);
        ctx.bezierCurveTo(-w / 2, -h / 2, -w / 2, -h / 2, -w / 2, -h / 2 + r);
        ctx.stroke();
        ctx.moveTo(-w / 2, h / 2 - r);
        ctx.bezierCurveTo(-w / 2, h / 2, -w / 2, h / 2, -w / 2 + r, h / 2);
        ctx.stroke();
        ctx.moveTo(w / 2 - r, h / 2);
        ctx.bezierCurveTo(w / 2, h / 2, w / 2, h / 2, w / 2, h / 2 - r);
        ctx.stroke();
    };
    return PlateSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__.LineSprite));



/***/ }),

/***/ "./src/game_objects/ClockworkGames/SawMachine/TreeGrip.ts":
/*!****************************************************************!*\
  !*** ./src/game_objects/ClockworkGames/SawMachine/TreeGrip.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TreeGrip: () => (/* binding */ TreeGrip),
/* harmony export */   TreeGripSprite: () => (/* binding */ TreeGripSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var TreeGrip = /** @class */ (function (_super) {
    __extends(TreeGrip, _super);
    function TreeGrip(engine, pos, angle) {
        if (angle === void 0) { angle = 0; }
        var _this = _super.call(this, engine) || this;
        _this.transform.pos = [pos[0], pos[1]];
        _this.transform.angle = angle;
        _this.spriteParameters = {
            w: 40,
            h: 30
        };
        _this.addLineSprite(new TreeGripSprite(_this.transform, _this.spriteParameters));
        return _this;
    }
    TreeGrip.prototype.animate = function () {
    };
    TreeGrip.prototype.update = function () {
    };
    return TreeGrip;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var TreeGripSprite = /** @class */ (function (_super) {
    __extends(TreeGripSprite, _super);
    function TreeGripSprite(transform, spriteParameters) {
        var _this = _super.call(this, transform) || this;
        _this.spriteParameters = spriteParameters;
        _this.color = "blue";
        _this.zoomScale = 0.4;
        return _this;
    }
    TreeGripSprite.prototype.draw = function (ctx) {
        var pos = this.transform.absolutePosition();
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.angle);
        this.drawNewFancyCurve(ctx);
        this.drawAxle(ctx);
        this.drawTeeth(ctx);
        ctx.restore();
    };
    TreeGripSprite.prototype.drawAxle = function (ctx) {
        var zoomScale = this.zoomScale;
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, 1 / 5 * this.spriteParameters.h * zoomScale, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = "#5D3FD3";
        ctx.fill();
        ctx.restore();
    };
    TreeGripSprite.prototype.drawNewFancyCurve = function (ctx) {
        ctx.save();
        var _a = this.spriteParameters, h = _a.h, w = _a.w;
        var h_scaled = h * this.zoomScale;
        var w_scaled = w * this.zoomScale;
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#D22B2B";
        ctx.beginPath();
        ctx.moveTo(-w_scaled / 2, -2 / 3 * h_scaled);
        ctx.bezierCurveTo(-w_scaled / 2, 2 / 3 * h_scaled, w_scaled / 2, 2 / 3 * h_scaled, w_scaled / 2, -2 / 3 * h_scaled);
        ctx.closePath();
        ctx.fillStyle = "#D22B2B";
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    };
    TreeGripSprite.prototype.drawTeeth = function (ctx) {
        var teethCount = 6;
        var zoomScale = this.zoomScale;
        var _a = this.spriteParameters, h = _a.h, w = _a.w;
        var h_scaled = h * zoomScale;
        var w_scaled = w * zoomScale;
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#D22B2B";
        ctx.beginPath();
        ctx.moveTo(-w_scaled / 2, 2 / 3 * -h_scaled);
        for (var i = 1; i <= teethCount * 2; i++) {
            var height = i % 2 === 0 ? -2 / 3 * h_scaled : -2 / 3 * h_scaled - h_scaled / 6;
            ctx.lineTo(-w_scaled / 2 + i * w_scaled / (teethCount * 2), height);
        }
        ctx.stroke();
        ctx.restore();
    };
    return TreeGripSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__.LineSprite));



/***/ }),

/***/ "./src/game_objects/Overlay/overlay.ts":
/*!*********************************************!*\
  !*** ./src/game_objects/Overlay/overlay.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Overlay: () => (/* binding */ Overlay),
/* harmony export */   OverlaySprite: () => (/* binding */ OverlaySprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_game_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/game_engine */ "./src/game_engine/game_engine.ts");
/* harmony import */ var _GEOWarsScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../GEOWarsScript */ "./src/GEOWarsScript.ts");
/* harmony import */ var _game_engine_transform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../game_engine/transform */ "./src/game_engine/transform.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../game_engine/color */ "./src/game_engine/color.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var Overlay = /** @class */ (function (_super) {
    __extends(Overlay, _super);
    function Overlay(engine, gameScript) {
        var _this = _super.call(this, engine) || this;
        _this.gameScript = gameScript;
        _this.transform.pos = [0, 0];
        _this.frameRateUpdateRate = 500;
        _this.currentFrameRateUpdateTime = 0;
        _this.currentFrameCount = 0;
        _this.frameRate = 0;
        _this.addLineSprite(new OverlaySprite(_GEOWarsScript__WEBPACK_IMPORTED_MODULE_2__.DIM_X, _GEOWarsScript__WEBPACK_IMPORTED_MODULE_2__.DIM_Y, engine));
        return _this;
    }
    Overlay.prototype.update = function (deltaTime) {
        this.lineSprite.score = this.gameScript.score;
        this.lineSprite.lives = this.gameScript.lives;
        this.updateFrameRate(deltaTime);
        this.lineSprite.frameRate = this.frameRate;
    };
    Overlay.prototype.updateFrameRate = function (deltaTime) {
        this.currentFrameRateUpdateTime += deltaTime;
        this.currentFrameCount += 1;
        if (this.currentFrameRateUpdateTime > this.frameRateUpdateRate) {
            this.currentFrameRateUpdateTime = 0;
            this.currentFrameCount = 0;
            this.frameRate = Math.floor(this.currentFrameCount / (this.frameRateUpdateRate / 1000));
        }
    };
    Overlay.prototype.animate = function () { };
    return Overlay;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var OverlaySprite = /** @class */ (function (_super) {
    __extends(OverlaySprite, _super);
    function OverlaySprite(DIM_X, DIM_Y, gameEngine) {
        var _this = _super.call(this, new _game_engine_transform__WEBPACK_IMPORTED_MODULE_3__.Transform()) || this;
        _this.gameEngine = gameEngine;
        _this.width = DIM_X;
        _this.height = DIM_Y;
        _this.score = 0;
        _this.lives = 0;
        _this.frameRate = 0;
        _this.fontSize = 20;
        _this.fontStyle = "Arial";
        _this.shadowColor = new _game_engine_color__WEBPACK_IMPORTED_MODULE_5__.Color("hsla", [202, 100, 70, 1]);
        _this.color = new _game_engine_color__WEBPACK_IMPORTED_MODULE_5__.Color("hsla", [202, 100, 70, 0.5]);
        return _this;
    }
    OverlaySprite.prototype.draw = function (ctx) {
        ctx.save();
        ctx.scale(1 / this.gameEngine.activeCamera.zoomScale, 1 / this.gameEngine.activeCamera.zoomScale);
        var zoomFactor = this.gameEngine instanceof _game_engine_game_engine__WEBPACK_IMPORTED_MODULE_1__.GameEngine ?
            this.gameEngine.activeCamera.zoomScale / this.gameEngine.activeCamera.defaultZoomScale :
            1;
        ctx.font = this.fontSize * 1.3 + "px " + this.fontStyle;
        ctx.fillStyle = this.color.evaluateColor();
        var displayText = "Score: " + this.score + "      " + "Lives: " + this.lives;
        // if(this.gameEngine.gameScript.testing) {
        //     displayText += "      " + "FPS: " + this.frameRate;
        // }
        ctx.fillText(displayText, (this.transform.cameraTransform.pos[0] - 350 / zoomFactor) * this.gameEngine.activeCamera.zoomScale, (this.transform.cameraTransform.pos[1] - 150 / zoomFactor) * this.gameEngine.activeCamera.zoomScale);
        ctx.restore();
    };
    return OverlaySprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_4__.LineSprite));



/***/ }),

/***/ "./src/game_objects/Ship/ship.ts":
/*!***************************************!*\
  !*** ./src/game_objects/Ship/ship.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ship: () => (/* binding */ Ship),
/* harmony export */   ShipSprite: () => (/* binding */ ShipSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _Bullet_bullet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Bullet/bullet */ "./src/game_objects/Bullet/bullet.ts");
/* harmony import */ var _game_engine_transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game_engine/transform */ "./src/game_engine/transform.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
/* harmony import */ var _game_engine_game_engine__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../game_engine/game_engine */ "./src/game_engine/game_engine.ts");
/* harmony import */ var _GEOWarsScript__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../GEOWarsScript */ "./src/GEOWarsScript.ts");
/* harmony import */ var _game_engine_camera__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../game_engine/camera */ "./src/game_engine/camera.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







var Ship = /** @class */ (function (_super) {
    __extends(Ship, _super);
    function Ship(engine, pos) {
        var _a;
        var _this = _super.call(this, engine) || this;
        _this.controlsDirection = [0, 0];
        _this.transform.pos = pos;
        _this.transform.pos[2] = 0;
        // I should add this to GameObject as this.addCamera
        _this.camera = new _game_engine_camera__WEBPACK_IMPORTED_MODULE_6__.Camera(engine, new _game_engine_transform__WEBPACK_IMPORTED_MODULE_2__.Transform(null, [pos[0], pos[1]]), "ShipCamera");
        _this.camera.zoomScale = 1.3;
        _this.camera.defaultZoomScale = 1.3;
        _this.previousVelocityCorrection = [0, 0];
        _this.setAsControllableGameObject();
        // when you add it as a focus controllable game object, 
        // I think you're forced to add functions to handle the different focussed input
        // like mouse position, left control stick input, right control stick input, etc.
        if (((_a = engine.activeCamera) === null || _a === void 0 ? void 0 : _a.name) !== "ShipCamera") {
            _this.makeFocussedGameObject();
        }
        _this.addPhysicsComponent();
        _this.addMousePosListener();
        // will need to differentiate between direct focus and not
        // this.addLeftControlStickListener();
        // this.addRightControlStickListener();
        _this.addStartButtonListener();
        _this.radius = 10;
        _this.addCollider("General", _this, _this.radius);
        _this.addCollider("ShipDeath", _this, _this.radius, ["BoxBox", "Singularity", "Weaver", "Grunt", "Arrow", "Pinwheel", "AlienShip"], ["General"]);
        _this.addLineSprite(new ShipSprite(_this.transform));
        _this.maxSpeed = 2.5; // 2.5
        _this.mousePos = [0, 0];
        _this.fireAngle = 0;
        _this.bulletTimeCheck = 0;
        _this.bulletInterval = 120;
        _this.controlsDirection = [0, 0];
        _this.powerLevel = 1;
        _this.bulletNumber = 0;
        _this.speed;
        _this.shipEngineAcceleration = 0.5; // 0.125
        _this.dontShoot = false;
        _this.keysPressed = [];
        _this.pauseKeyedUp = true;
        _this.spawning = true;
        _this.spawningTime = 0;
        _this.flashingTime = 0;
        _this.flashTime = 1000 / 8;
        _this.flashing = true;
        _this.flashIntervalTime = 0;
        _this.flashInterval = 250 - 1000 / 8;
        _this.spawnTime = 2500;
        _this.lineSprite.flashHide = true;
        _this.controllerInUse = false;
        _this.isLevelDesignerOpened = false;
        return _this;
        // 1/8 of a second flash every half second
    }
    Ship.prototype.animate = function () {
    };
    Ship.prototype.update = function (deltaTime) {
        // no idea where this shit will have to belong
        // brain currently melted
        if (this.gameEngine instanceof _game_engine_game_engine__WEBPACK_IMPORTED_MODULE_4__.GameEngine && this.gameEngine.isLevelDesignerOpened) {
            if (!this.isLevelDesignerOpened) {
                var _width = _GEOWarsScript__WEBPACK_IMPORTED_MODULE_5__.DIM_X;
                var _height = _GEOWarsScript__WEBPACK_IMPORTED_MODULE_5__.DIM_Y;
                var _zoomScale = this.gameEngine.activeCamera.zoomScale;
                var _yPosition = this.transform.pos[1];
                var _xPosition = this.transform.pos[0];
                console.log({ _width: _width, _height: _height, _zoomScale: _zoomScale, _xPosition: _xPosition, _yPosition: _yPosition });
                this.gameEngine.ctx.translate(((_xPosition * _zoomScale - _width / (2))), ((_yPosition * _zoomScale - _height / (2))));
                this.gameEngine.activeCamera.zoomScale = 1;
            }
            this.isLevelDesignerOpened = true;
            return;
        }
        else {
            this.isLevelDesignerOpened = false;
        }
        this.bulletTimeCheck += deltaTime;
        // game state stuff that doesn't belong in the ship #gamestate
        if (this.bulletTimeCheck >= this.bulletInterval && !this.spawning && !this.dontShoot) {
            this.bulletNumber += 1;
            this.bulletTimeCheck = 0;
            this.fireBullet();
        }
        if (this.spawning) {
            this.spawningTime += deltaTime;
            if (this.flashing) {
                this.flashingTime += deltaTime;
                if (this.flashingTime > this.flashTime) {
                    this.flashingTime = 0;
                    this.flashing = false;
                    this.lineSprite.flashHide = false;
                }
            }
            else {
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
        }
        else {
            if (this.isFocussedGameObject) {
                this.movementMechanics();
            }
            else {
                // slow to stop. This is wrong, but maybe an okay start?
                var Vo = this.transform.absoluteVelocity();
                var dV = [0 - Vo[0], 0 - Vo[1]];
                var alpha = Math.atan2(dV[1], dV[0]);
                this.transform.acc[0] += this.shipEngineAcceleration * Math.cos(alpha);
                this.transform.acc[1] += this.shipEngineAcceleration * Math.sin(alpha);
            }
        }
        // if ship is out of x bounds, maintain y speed, keep x at edge value
        this.updateZoomScale();
        var shipXPos = this.transform.pos[0];
        var shipYPos = this.transform.pos[1];
        this.camera.transform.pos[0] = shipXPos;
        this.camera.transform.pos[1] = shipYPos;
    };
    Ship.prototype.upgradeBullets = function () {
        if (this.powerLevel === 1)
            this.playSound(Ship.UPGRADE_BULLET_SOUND_URL);
        this.powerLevel = 3;
    };
    Ship.prototype.findSmallestDistanceToAWall = function () {
        var pos = this.transform.pos;
        var leftDistance = pos[0] - 0;
        var rightDistance = _GEOWarsScript__WEBPACK_IMPORTED_MODULE_5__.DIM_X - pos[0];
        var upDistance = pos[1] - 0;
        var downDistance = _GEOWarsScript__WEBPACK_IMPORTED_MODULE_5__.DIM_Y - pos[1];
        var distances = [leftDistance, rightDistance, upDistance, downDistance];
        return Math.min.apply(null, distances);
    };
    Ship.prototype.updateZoomScale = function () {
        var distanceToZoomChange = 100;
        var smallestZoomScale = 0.75; // of the origional zoomscale
        var smallest = this.findSmallestDistanceToAWall();
        if (smallest < distanceToZoomChange) {
            this.camera.zoomScale = this.camera.defaultZoomScale * (smallest / distanceToZoomChange * (1 - smallestZoomScale) + smallestZoomScale);
        }
        else {
            this.camera.zoomScale = this.camera.defaultZoomScale;
        }
        // this should also update the camera's Z position
    };
    // 
    Ship.prototype.calcControlsDirection = function () {
        var _this = this;
        this.controlsDirection = [0, 0];
        this.keysPressed.forEach(function (key) {
            _this.controlsDirection[0] += Ship.MOVES[key][0];
            _this.controlsDirection[1] += Ship.MOVES[key][1];
        });
    };
    Ship.prototype.movementMechanics = function () {
        // get dV
        //    mV => max speed in the direction of the controller
        //    Vo => current velocity
        //    dV~ =  mV - Vo
        // if dv~ > 0.2 (or something)
        //    a = ma~ 
        // TODO: uhhhh this is somehow causing absurd performance issues. especially when not moving
        // okay it's way better now but still a huge problem
        if (!this.controllerInUse) {
            this.calcControlsDirection();
        }
        var movementAngle = Math.atan2(this.controlsDirection[1], this.controlsDirection[0]);
        var Vo = this.transform.absoluteVelocity();
        var mV = [];
        if (this.controlsDirection[0] === 0 && this.controlsDirection[1] === 0) {
            mV = [0, 0];
            if (this.transform.vel[0] === 0 && this.transform.vel[1] === 0)
                return;
        }
        else {
            mV = [this.maxSpeed * Math.cos(movementAngle), this.maxSpeed * Math.sin(movementAngle)];
            this.transform.angle = movementAngle;
        }
        var dV = [mV[0] - Vo[0], mV[1] - Vo[1]];
        var alpha = Math.atan2(dV[1], dV[0]);
        var vC = this.previousVelocityCorrection;
        if (this.signsSwapped(dV[0], vC[0]) && this.signsSwapped(dV[1], vC[1])) {
            this.transform.vel[0] = 0;
            this.transform.vel[1] = 0;
        }
        else if (mV[0] === 0 && mV[1] === 0) {
            this.transform.acc[0] += this.shipEngineAcceleration / 4 * Math.cos(alpha);
            this.transform.acc[1] += this.shipEngineAcceleration / 4 * Math.sin(alpha);
        }
        else {
            this.transform.acc[0] += this.shipEngineAcceleration * Math.cos(alpha);
            this.transform.acc[1] += this.shipEngineAcceleration * Math.sin(alpha);
        }
    };
    Ship.prototype.signsSwapped = function (originalNumber, newNumber) {
        return originalNumber > 0 && newNumber < 0 || originalNumber < 0 && newNumber > 0;
    };
    Ship.prototype.isOutOfBounds = function () {
        return _GEOWarsScript__WEBPACK_IMPORTED_MODULE_5__.GEOWarsScript.isOutOfBounds(this.transform.pos, this.radius);
    };
    Ship.prototype.updateMousePos = function (mousePos) {
        // this is what happens when not focussed on. 
        // I can call a different function that targets the same spot
        // this.setFireAngle(mousePos);
    };
    Ship.prototype.updateFocussedMousePos = function (mousePos) {
        this.setFireAngle(mousePos);
    };
    Ship.prototype.updateRightControlStickInput = function (vector) {
        // if (Math.abs(vector[0]) + Math.abs(vector[1]) > 0.10) {
        //     this.dontShoot = false;
        //     this.fireAngle = Math.atan2(vector[1], vector[0]);
        // } else {
        //     this.dontShoot = true;
        // }
    };
    // updateLeftControlStickInput for when you're listening but not focussed... 
    Ship.prototype.updateRightControlFocussedStickInput = function (direction) {
        if (Math.abs(direction[0]) + Math.abs(direction[1]) > 0.10) {
            this.dontShoot = false;
            this.fireAngle = Math.atan2(direction[1], direction[0]);
        }
        else {
            this.dontShoot = true;
        }
    };
    Ship.prototype.updateLeftControlFocussedStickInput = function (key, down) {
        if (down === void 0) { down = true; }
        if (key === 'w' || key === 'a' || key === 's' || key === 'd') {
            // accelerates to V = [0,0] when not pressed
            if (down) {
                if (!this.keysPressed.includes(key)) {
                    this.keysPressed.push(key);
                }
                // this.controlsDirection[0] += unitVector[0]
                // this.controlsDirection[1] += unitVector[1]
            }
            else {
                if (this.keysPressed.includes(key)) {
                    var index = this.keysPressed.indexOf(key);
                    if (index !== -1)
                        this.keysPressed.splice(this.keysPressed.indexOf(key), 1);
                }
                // this.controlsDirection[0] -= unitVector[0]
                // this.controlsDirection[1] -= initVector[1]
            }
        }
        else {
            this.controllerInUse = true;
            if (Math.abs(key[0]) + Math.abs(key[1]) > 0.10) {
                this.controlsDirection = key;
            }
            else {
                this.controlsDirection = [0, 0];
            }
        }
    };
    // Refactor into game engine and game script
    Ship.prototype.updateStartButtonListener = function (pressed) {
        if (pressed) {
            if (this.pauseKeyedUp) {
                this.pauseKeyedUp = false;
                if (this.gameEngine.paused && !this.gameEngine.muted) {
                    this.gameEngine.gameScript.theme.play();
                }
                this.gameEngine.togglePause();
            }
        }
        else {
            this.pauseKeyedUp = true;
        }
    };
    Ship.prototype.wallGraze = function () {
        _GEOWarsScript__WEBPACK_IMPORTED_MODULE_5__.GEOWarsScript.wallGraze(this.transform, this.radius * 2);
    };
    Ship.prototype.onCollision = function (collider, type) {
        if (type === "ShipDeath") {
            this.gameEngine.gameScript.death();
            this.deathflash();
        }
    };
    Ship.prototype.deathflash = function () {
        this.spawning = true;
        this.flashing = true;
    };
    Ship.prototype.setFireAngle = function (mousePos) {
        if (mousePos === undefined) {
            mousePos = this.mousePos;
        }
        else {
            this.mousePos = mousePos;
        }
        var shipXPos = this.transform.pos[0];
        var shipYPos = this.transform.pos[1];
        var zoomScale = this.camera.zoomScale;
        var width = _GEOWarsScript__WEBPACK_IMPORTED_MODULE_5__.DIM_X;
        var height = _GEOWarsScript__WEBPACK_IMPORTED_MODULE_5__.DIM_Y;
        var mouseX = mousePos[0] / zoomScale + shipXPos - width / (2 * zoomScale);
        var mouseY = mousePos[1] / zoomScale + shipYPos - height / (2 * zoomScale);
        // SCALE NUMBER
        var dy = mouseY - this.transform.pos[1];
        var dx = mouseX - this.transform.pos[0];
        this.fireAngle = Math.atan2(dy, dx);
    };
    Ship.prototype.fireBullet = function () {
        this.playSound(Ship.BULLET_SOUND_URL);
        var shipvx = this.transform.vel[0];
        var shipvy = this.transform.vel[1];
        var relBulletVelX1 = _Bullet_bullet__WEBPACK_IMPORTED_MODULE_1__.Bullet.SPEED * Math.cos(this.fireAngle);
        var relBulletVelY1 = _Bullet_bullet__WEBPACK_IMPORTED_MODULE_1__.Bullet.SPEED * Math.sin(this.fireAngle);
        var bulletVel1 = [shipvx + relBulletVelX1, shipvy + relBulletVelY1];
        this.addChildGameObject(new _Bullet_bullet__WEBPACK_IMPORTED_MODULE_1__.Bullet(this.gameEngine, this.transform.pos, bulletVel1, this.bulletNumber, 'middle', this.powerLevel));
        if (this.powerLevel >= 2) {
            var relBulletVelX2 = (_Bullet_bullet__WEBPACK_IMPORTED_MODULE_1__.Bullet.SPEED - 0.5) * Math.cos(this.fireAngle + Math.PI / 32);
            var relBulletVelY2 = (_Bullet_bullet__WEBPACK_IMPORTED_MODULE_1__.Bullet.SPEED - 0.5) * Math.sin(this.fireAngle + Math.PI / 32);
            var relBulletVelX3 = (_Bullet_bullet__WEBPACK_IMPORTED_MODULE_1__.Bullet.SPEED - 0.5) * Math.cos(this.fireAngle - Math.PI / 32);
            var relBulletVelY3 = (_Bullet_bullet__WEBPACK_IMPORTED_MODULE_1__.Bullet.SPEED - 0.5) * Math.sin(this.fireAngle - Math.PI / 32);
            var bulletVel2 = [shipvx + relBulletVelX2, shipvy + relBulletVelY2];
            var bulletVel3 = [shipvx + relBulletVelX3, shipvy + relBulletVelY3];
            // doesn't support parent transformations... yet
            this.addChildGameObject(new _Bullet_bullet__WEBPACK_IMPORTED_MODULE_1__.Bullet(this.gameEngine, this.transform.pos, bulletVel2, this.bulletNumber, 'left', this.powerLevel));
            this.addChildGameObject(new _Bullet_bullet__WEBPACK_IMPORTED_MODULE_1__.Bullet(this.gameEngine, this.transform.pos, bulletVel3, this.bulletNumber, 'right', this.powerLevel));
        }
    };
    // implement threshold so it's not too sensitive
    Ship.prototype.relocate = function () {
        // this.GameScript.die();
        // this.transform.pos = this.game.randomPosition();
        // this.vel = [0, 0];
        // this.acc = [0, 0];
    };
    Ship.MOVES = {
        s: [0, 1],
        a: [-1, 0],
        w: [0, -1],
        d: [1, 0],
    };
    Ship.BULLET_SOUND_URL = "sounds/Fire_normal.wav";
    Ship.UPGRADE_BULLET_SOUND_URL = "sounds/Hi_Score_achieved.wav";
    return Ship;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var ShipSprite = /** @class */ (function (_super) {
    __extends(ShipSprite, _super);
    function ShipSprite(transform, spawningScale) {
        if (spawningScale === void 0) { spawningScale = 1; }
        var _this = _super.call(this, transform) || this;
        _this.spawningScale = spawningScale;
        _this.flashHide = false;
        return _this;
    }
    ShipSprite.prototype.draw = function (ctx) {
        if (!this.flashHide) {
            var pos = this.transform.pos;
            var shipWidth = 10;
            // const vel = this.transform.absoluteVelocity();
            // let movementDirection = Math.atan2(vel[0], -vel[1])
            ctx.save();
            ctx.beginPath();
            ctx.translate(pos[0], pos[1]);
            ctx.rotate(this.transform.angle + Math.PI / 4);
            ctx.translate(-shipWidth / 2, shipWidth / 2);
            ctx.strokeStyle = "#ffffff";
            var r = 255;
            var g = 255;
            var b = 255;
            var blurFactor = 0.5;
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
    };
    ShipSprite.prototype.drawShip = function (ctx, shipWidth) {
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
    };
    return ShipSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_3__.LineSprite));



/***/ }),

/***/ "./src/game_objects/StrikeTime/Airport/Airport.ts":
/*!********************************************************!*\
  !*** ./src/game_objects/StrikeTime/Airport/Airport.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Airport: () => (/* binding */ Airport),
/* harmony export */   AirportSprite: () => (/* binding */ AirportSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Airport = /** @class */ (function (_super) {
    __extends(Airport, _super);
    function Airport(engine, pos) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos = pos;
        _this.addReplayablePhysicsComponent();
        _this.addLineSprite(new AirportSprite(_this.transform));
        return _this;
    }
    Airport.prototype.update = function (deltaTime) {
        this.animate(deltaTime);
    };
    Airport.prototype.animate = function (timeDelta) {
    };
    return Airport;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var AirportSprite = /** @class */ (function (_super) {
    __extends(AirportSprite, _super);
    function AirportSprite(transform) {
        return _super.call(this, transform) || this;
    }
    AirportSprite.prototype.draw = function (ctx) {
        ctx.save();
        this.drawAirport(ctx);
        ctx.restore();
    };
    AirportSprite.prototype.drawAirport = function (ctx) {
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        var s = 3;
        var pos = this.transform.absolutePosition();
        ctx.translate(pos[0], pos[1]);
        // Piece 1: 
        ctx.beginPath();
        ctx.moveTo(-30 * s, -6 * s);
        ctx.lineTo(30 * s, -6 * s);
        ctx.stroke();
        // Piece 2: 
        ctx.beginPath();
        ctx.moveTo(-30 * s, 6 * s);
        ctx.lineTo(30 * s, 6 * s);
        ctx.stroke();
        // Piece 3: 
        ctx.beginPath();
        ctx.setLineDash([10, 20]);
        ctx.moveTo(-30 * s, 0 * s);
        ctx.lineTo(30 * s, 0 * s);
        ctx.stroke();
        ctx.setLineDash([]);
        // Piece 4: 
        ctx.beginPath();
        ctx.moveTo(6 * s, -6 * s);
        ctx.lineTo(6 * s, -18 * s);
        ctx.lineTo(3 * s, -20 * s);
        ctx.lineTo(3 * s, -24 * s);
        ctx.lineTo(6 * s, -27 * s);
        ctx.lineTo(12 * s, -27 * s);
        ctx.lineTo(15 * s, -24 * s);
        ctx.lineTo(15 * s, -20 * s);
        ctx.lineTo(12 * s, -18 * s);
        ctx.lineTo(12 * s, -6 * s);
        ctx.stroke();
        // Piece 5: 
        ctx.beginPath();
        ctx.moveTo(0 * s, -6 * s);
        ctx.lineTo(0 * s, -12 * s);
        ctx.bezierCurveTo(-1 * s, -15 * s, -5 * s, -15 * s, -6 * s, -12 * s);
        ctx.lineTo(-6 * s, -6 * s);
        ctx.stroke();
        // Piece 6: 
        ctx.beginPath();
        ctx.moveTo(-9 * s, -6 * s);
        ctx.lineTo(-9 * s, -12 * s);
        ctx.bezierCurveTo(-10 * s, -15 * s, -14 * s, -15 * s, -15 * s, -12 * s);
        ctx.lineTo(-15 * s, -6 * s);
        ctx.stroke();
        // Piece 7: 
        ctx.beginPath();
        ctx.moveTo(-18 * s, -6 * s);
        ctx.lineTo(-18 * s, -12 * s);
        ctx.bezierCurveTo(-19 * s, -15 * s, -23 * s, -15 * s, -24 * s, -12 * s);
        ctx.lineTo(-24 * s, -6 * s);
        ctx.stroke();
        // Piece 8: 
        ctx.beginPath();
        ctx.moveTo(18 * s, -6 * s);
        ctx.lineTo(18 * s, -12 * s);
        ctx.bezierCurveTo(19 * s, -15 * s, 23 * s, -15 * s, 24 * s, -12 * s);
        ctx.lineTo(24 * s, -6 * s);
        ctx.stroke();
    };
    return AirportSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__.LineSprite));



/***/ }),

/***/ "./src/game_objects/StrikeTime/Airport/EndingLine.ts":
/*!***********************************************************!*\
  !*** ./src/game_objects/StrikeTime/Airport/EndingLine.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EndingLine: () => (/* binding */ EndingLine),
/* harmony export */   EndingLineSprite: () => (/* binding */ EndingLineSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var EndingLine = /** @class */ (function (_super) {
    __extends(EndingLine, _super);
    function EndingLine(engine, xPosition) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos = [xPosition, 0];
        _this.endLineXPosition = xPosition;
        _this.addReplayablePhysicsComponent();
        _this.addLineSprite(new EndingLineSprite(_this.transform));
        return _this;
    }
    EndingLine.prototype.update = function (deltaTime) {
    };
    EndingLine.prototype.animate = function (timeDelta) {
    };
    return EndingLine;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var EndingLineSprite = /** @class */ (function (_super) {
    __extends(EndingLineSprite, _super);
    function EndingLineSprite(transform) {
        return _super.call(this, transform) || this;
    }
    EndingLineSprite.prototype.draw = function (ctx) {
        ctx.save();
        this.drawEndingLine(ctx);
        ctx.restore();
    };
    EndingLineSprite.prototype.drawEndingLine = function (ctx) {
        ctx.strokeStyle = "#63b2e3ff";
        ctx.lineWidth = 2;
        var pos = this.transform.absolutePosition();
        ctx.setLineDash([10, 20]);
        ctx.moveTo(pos[0], -20000);
        ctx.lineTo(pos[0], 20000);
        ctx.stroke();
        ctx.setLineDash([]);
    };
    return EndingLineSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__.LineSprite));



/***/ }),

/***/ "./src/game_objects/StrikeTime/Aurora/AirDecelerationParticles.ts":
/*!************************************************************************!*\
  !*** ./src/game_objects/StrikeTime/Aurora/AirDecelerationParticles.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AirDecelerationParticle: () => (/* binding */ AirDecelerationParticle),
/* harmony export */   AirDecelerationParticles: () => (/* binding */ AirDecelerationParticles)
/* harmony export */ });
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/color */ "./src/game_engine/color.ts");
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_engine/util */ "./src/game_engine/util.ts");
/* harmony import */ var _particles_particle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../particles/particle */ "./src/game_objects/particles/particle.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




/*
    |           |
   |    ^   |
  |  /     \
    /  |    \ |
  |/ _    _  \
         

*/
// random greys between 75 - 100 lightness
var AirDecelerationParticles = /** @class */ (function (_super) {
    __extends(AirDecelerationParticles, _super);
    // the position of the exhaust is the middle of the exhaust
    function AirDecelerationParticles(engine, transform, planeWidth, planeLength) {
        var _this = _super.call(this, engine) || this;
        _this.transform = transform;
        _this.lightnessRange = 25;
        _this.baseLightness = 87.5;
        _this.baseOpacity = 0.6;
        _this.opacityRange = 0.35;
        _this.isDecelerating = false;
        _this.planeWidth = planeWidth;
        _this.planeLength = planeLength;
        _this.currentTime = 0;
        _this.baseSpawnRate = 50;
        _this.randomSpawnRateFactor = 0;
        _this.randomSpawnRateRange = 20;
        return _this;
    }
    AirDecelerationParticles.prototype.animate = function () { };
    AirDecelerationParticles.prototype.update = function (deltaTime) {
        this.currentTime += deltaTime;
        if (this.currentTime > this.baseSpawnRate + this.randomSpawnRateFactor) {
            this.randomSpawnRateFactor = Math.random() * this.randomSpawnRateRange;
            this.currentTime = 0;
            var numberToCreate = 3;
            if (this.isDecelerating) {
                for (var i = 0; i < numberToCreate; i++) {
                    this.addAirDecelerationParticles();
                }
            }
        }
    };
    AirDecelerationParticles.prototype.addAirDecelerationParticles = function () {
        var angle = this.transform.angle;
        var planePosition = this.transform.pos;
        var w = this.planeWidth;
        var l = this.planeLength;
        var xPosition = (0,_game_engine_util__WEBPACK_IMPORTED_MODULE_2__.getNumberFromRange)(0, w * 2);
        var yPosition = (0,_game_engine_util__WEBPACK_IMPORTED_MODULE_2__.getNumberFromRange)(l * 4 / 5, l);
        var positionOnPlane = [
            xPosition,
            yPosition
        ];
        var airParticlePositionAngle = Math.atan2(positionOnPlane[1], positionOnPlane[0]) - Math.PI / 2;
        var airParticlePositionLength = Math.sqrt(Math.pow(positionOnPlane[0], 2) + Math.pow((positionOnPlane[1]), 2));
        var position = [
            planePosition[0] - airParticlePositionLength * Math.cos(angle + airParticlePositionAngle),
            planePosition[1] - airParticlePositionLength * Math.sin(angle + airParticlePositionAngle)
        ];
        // I wonder if they'd look better as red
        var opacity = (0,_game_engine_util__WEBPACK_IMPORTED_MODULE_2__.getNumberFromRange)(this.baseOpacity, this.opacityRange);
        var lightness = (0,_game_engine_util__WEBPACK_IMPORTED_MODULE_2__.getNumberFromRange)(this.baseLightness, this.lightnessRange);
        var color = new _game_engine_color__WEBPACK_IMPORTED_MODULE_0__.Color("hsla", [0, 50, lightness, opacity]);
        new AirDecelerationParticle(this.gameEngine, position, color, angle + Math.PI / 2);
    };
    return AirDecelerationParticles;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__.GameObject));

var AirDecelerationParticle = /** @class */ (function (_super) {
    __extends(AirDecelerationParticle, _super);
    function AirDecelerationParticle(engine, position, color, angle) {
        return _super.call(this, engine, position, null, color, null, -0.045 * 2, 0.01, angle) || this;
    }
    AirDecelerationParticle.prototype.update = function (deltaTime) {
        // this.lineSprite.rectLength -= 0.01 * deltaTime;
        this.lineSprite.color.a -= this.opacityDropSpeed * deltaTime;
        // this.lineSprite.hue < 0.06 ||
        if (this.lineSprite.color.a <= 0) {
            this.remove();
        }
    };
    return AirDecelerationParticle;
}(_particles_particle__WEBPACK_IMPORTED_MODULE_3__.Particle));



/***/ }),

/***/ "./src/game_objects/StrikeTime/Aurora/Aurora.ts":
/*!******************************************************!*\
  !*** ./src/game_objects/StrikeTime/Aurora/Aurora.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Aurora: () => (/* binding */ Aurora),
/* harmony export */   AuroraSprite: () => (/* binding */ AuroraSprite),
/* harmony export */   DeathAnimationLineObject: () => (/* binding */ DeathAnimationLineObject),
/* harmony export */   DeathAnimationSprite: () => (/* binding */ DeathAnimationSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
/* harmony import */ var _game_engine_transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_engine/transform */ "./src/game_engine/transform.ts");
/* harmony import */ var _game_engine_game_engine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../game_engine/game_engine */ "./src/game_engine/game_engine.ts");
/* harmony import */ var _game_engine_camera__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../game_engine/camera */ "./src/game_engine/camera.ts");
/* harmony import */ var _EngineExhaust__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EngineExhaust */ "./src/game_objects/StrikeTime/Aurora/EngineExhaust.ts");
/* harmony import */ var _AirDecelerationParticles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./AirDecelerationParticles */ "./src/game_objects/StrikeTime/Aurora/AirDecelerationParticles.ts");
/* harmony import */ var _Bombs_BombBasic__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Bombs/BombBasic */ "./src/game_objects/StrikeTime/Bombs/BombBasic.ts");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../game_engine/util */ "./src/game_engine/util.ts");
/* harmony import */ var _BombReticle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./BombReticle */ "./src/game_objects/StrikeTime/Aurora/BombReticle.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();










var Aurora = /** @class */ (function (_super) {
    __extends(Aurora, _super);
    function Aurora(engine, pos, angle) {
        if (angle === void 0) { angle = Math.random() * Math.PI * 2; }
        var _this = _super.call(this, engine) || this;
        _this.controlsDirection = [0, 0];
        _this.controlsAngle = null;
        _this.transform.pos = pos;
        _this.hits = 0;
        _this.hitsWhenDead = 3;
        _this.transform.angle = angle;
        _this.transform.vel = [0, 0];
        _this.radius = 30;
        _this.turnRadius = 60;
        _this.minSpeed = 1;
        _this.maxSpeed = 0.025 * 6;
        _this.controlsDirection = [0, 0];
        _this.bombTiming = {
            refreshTime: 0,
            reloadTime: 2000
        };
        _this.jetAcceleration = 0.0001;
        _this.jetDeceleration = -0.00035;
        _this.jetDeceleration = -0.0001;
        _this.controllerInUse = false;
        _this.gameEditorHasBeenOpened = false;
        _this.isTurning = false;
        _this.isAccelerating = false;
        // add this stuff to Super some day
        if (engine instanceof _game_engine_game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            _this.camera = new _game_engine_camera__WEBPACK_IMPORTED_MODULE_4__.Camera(engine, new _game_engine_transform__WEBPACK_IMPORTED_MODULE_2__.Transform(null, [pos[0], pos[1]]), "Aurora Camera");
        _this.setAsControllableGameObject();
        _this.makeFocussedGameObject();
        _this.addBKeyListener();
        _this.addBButtonListener();
        _this.addReplayablePhysicsComponent();
        _this.addLineSprite(new AuroraSprite(_this.transform));
        _this.leftExhaust = new _EngineExhaust__WEBPACK_IMPORTED_MODULE_5__.EngineExhaust(engine, _this.transform, [
            -_this.lineSprite.length / 8,
            17 / 18 * _this.lineSprite.length
        ], 5);
        _this.rightExhaust = new _EngineExhaust__WEBPACK_IMPORTED_MODULE_5__.EngineExhaust(engine, _this.transform, [
            _this.lineSprite.length / 8,
            17 / 18 * _this.lineSprite.length
        ], 5);
        _this.airDecelerationParticles = new _AirDecelerationParticles__WEBPACK_IMPORTED_MODULE_6__.AirDecelerationParticles(engine, _this.transform, _this.lineSprite.length / 2, _this.lineSprite.length);
        _this.bombReticle = new _BombReticle__WEBPACK_IMPORTED_MODULE_9__.BombReticle(engine, _this.transform, [0, 0], 90);
        _this.addCollider("General", _this, _this.radius);
        _this.addChildGameObject(_this.leftExhaust);
        _this.addChildGameObject(_this.rightExhaust);
        _this.addChildGameObject(_this.bombReticle);
        return _this;
    }
    Aurora.prototype.updateBButtonListener = function (pressed) {
        if (pressed && this.bombTiming.refreshTime > this.bombTiming.reloadTime) {
            // get the direction that we're going now
            // apply this speed in that direction
            var currentDirection = this.transform.angle;
            var bombSpeed = 0.05;
            var bombVelocity = _game_engine_util__WEBPACK_IMPORTED_MODULE_8__.VectorMath.vectorCartesian(currentDirection, bombSpeed);
            new _Bombs_BombBasic__WEBPACK_IMPORTED_MODULE_7__.BombBasic(this.gameEngine, [this.transform.pos[0], this.transform.pos[1]], bombVelocity);
            this.bombTiming.refreshTime = 0;
        }
    };
    Aurora.prototype.hit = function () {
        this.hits += 1;
        if (this.hits >= this.hitsWhenDead) {
            // will need to tell gameScript about the death, which will then inform the current level
            // the level will decide what to do about that
            this.createDeathAnimationLineObjects();
            this.remove();
            this.gameEngine.gameScript.loseLevel(); // controlled ship died()
            // create three objects for the death animation
        }
    };
    Aurora.prototype.updateBKeyListener = function (pressed) {
        if (pressed && this.bombTiming.refreshTime > this.bombTiming.reloadTime) {
            // get the direction that we're going now
            // apply this speed in that direction
            var currentDirection = this.transform.angle;
            var bombSpeed = 0.05;
            var bombVelocity = _game_engine_util__WEBPACK_IMPORTED_MODULE_8__.VectorMath.vectorCartesian(currentDirection, bombSpeed);
            new _Bombs_BombBasic__WEBPACK_IMPORTED_MODULE_7__.BombBasic(this.gameEngine, [this.transform.pos[0], this.transform.pos[1]], bombVelocity);
            this.bombTiming.refreshTime = 0;
        }
    };
    Aurora.prototype.animate = function (delta) {
        // console.log('whats going on here');
        var movementDirection = 0;
        if (this.transform.vel[0] === 0 && this.transform.vel[1] === 0) {
            movementDirection = this.transform.angle;
        }
        else {
            movementDirection = Math.atan2(this.transform.vel[0], -this.transform.vel[1]);
        }
        this.transform.angle = movementDirection;
    };
    Aurora.prototype.update = function (delta) {
        // console.log('updateCalled', `delta: ${delta}`);
        this.bombTiming.refreshTime += delta;
        this.bombTiming.refreshTime = this.bombTiming.refreshTime > this.bombTiming.reloadTime ? this.bombTiming.reloadTime + 1 : this.bombTiming.refreshTime;
        (this.bombTiming.refreshTime > this.bombTiming.reloadTime) ? this.bombReticle.setVisibility(true) : this.bombReticle.setVisibility(false);
        if (this.controlsAngle !== null) {
            // compare angle with controls angle
            // if angle is greater than 
            this.transform.angle;
        }
        if (this.replayablePhysicsComponent.movementTangentAngle !== null) {
            this.transform.angle = this.replayablePhysicsComponent.movementTangentAngle;
        }
        if (this.isFocussedGameObject) {
            this.movementMechanics();
        }
        var shipXPos = this.transform.pos[0];
        var shipYPos = this.transform.pos[1];
        this.camera.transform.pos[0] = shipXPos;
        this.camera.transform.pos[1] = shipYPos;
        // visuals (animation)
        if (this.replayablePhysicsComponent.isAccelerating) {
            if (this.replayablePhysicsComponent.accelerationInformation.isDecelerating) {
                this.leftExhaust.isDecelerating = true;
                this.rightExhaust.isDecelerating = true;
                this.leftExhaust.isAccelerating = false;
                this.rightExhaust.isAccelerating = false;
                this.airDecelerationParticles.isDecelerating = true;
            }
            else {
                this.airDecelerationParticles.isDecelerating = false;
                ;
                this.leftExhaust.isAccelerating = true;
                this.rightExhaust.isAccelerating = true;
            }
        }
        else {
            this.airDecelerationParticles.isDecelerating = false;
            this.leftExhaust.isAccelerating = false;
            this.rightExhaust.isAccelerating = false;
            this.leftExhaust.isDecelerating = false;
            this.rightExhaust.isDecelerating = false;
        }
        if (this.replayablePhysicsComponent.isTurning) {
            if (this.replayablePhysicsComponent.turnInformation.rotationDirection > 0) {
                this.leftExhaust.isAccelerating = true;
                this.rightExhaust.isAccelerating = false;
            }
            else {
                this.leftExhaust.isAccelerating = false;
                this.rightExhaust.isAccelerating = true;
            }
        }
    };
    Aurora.prototype.updateRightControlFocussedStickInput = function (direction) { };
    Aurora.prototype.updateFocussedMousePos = function (pos) { };
    Aurora.prototype.roundAngleTo16thsDegrees = function (radians) {
        return ((Math.round(radians / (2 * Math.PI) * 16) % 16) / 16) * 360;
    };
    Aurora.prototype.movementMechanics = function () {
        var _a, _b, _c, _d, _e, _f, _g;
        // It's taking too long to get this stuff right
        // so I'm going to simplify it and expand on it later
        // so, the new requirements for movement are:
        // 1: no grid system yet
        // 2. no reversible movements yet
        // 3: one turn radius at same speed as straight
        // 4. 1/16 * 2PI angles allowed
        // 5. only initiate turn when relative direction passes a small threshold (1/8th PI lets say)
        var turnThreshold = Math.PI / 8;
        // there might be a way to make it feel a little better if 
        // I allow changing the direction constantly
        // of if I don't immediately accelerate to max speed
        // to allow constant direction change, I'll need an "interupt" state where
        // the plane is still turning until it's facing one of the 16 directions. 
        // so it would be an interrupt instruction
        // but it's going to be a lot easier to make it feel nice if I have complete control
        // a crap... how would it work on mobile though
        // okay... maybe this would work for mobile, but it doesn't feel great with a controller
        // maybe with some added visuals I can get it to feel better
        // visuals like, a path showing you result of the current instruction
        // and the arrow of the direction you're pointing maybe
        // worth checking out.... but only after I get time reversal going and other stuff
        if (!(this.gameEngine instanceof _game_engine_game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine))
            return;
        // eventually we can go past this 
        // once we're able to interrupt turns
        if (this.replayablePhysicsComponent.isTurning)
            return;
        if (this.controlsAngle === null)
            return;
        var gameTime = this.gameEngine.gameScript.gameTime;
        if (this.transform.vel[0] === 0 && this.transform.vel[1] === 0) {
            console.log('Only the first acceleration');
            var controlsAngleRoundedRadians = ((Math.round((this.controlsAngle / (2 * Math.PI)) * 16) % 16) / 16) * 2 * Math.PI;
            this.replayablePhysicsComponent.startAcceleration({ acceleration: this.jetAcceleration, endSpeed: this.maxSpeed, gameTimeAccelerationStarted: gameTime, onStartDirection: controlsAngleRoundedRadians });
            return;
        }
        // get the controls angle and compare it to the current direction
        // get the absolute velocity and compare it to the max
        // that could be memoized
        // when it's not rotating, we can use transform.vel. Thankfully we always have to speed up or slow down before adjusting the turn angle
        // so this should be valid, but it might not work for other units
        var currentDirection = (Math.atan2(this.transform.vel[1], this.transform.vel[0]) + Math.PI * 2) % (Math.PI * 2);
        var currentDirectionRounded = this.roundAngleTo16thsDegrees(currentDirection);
        var controlsAngleRounded = this.roundAngleTo16thsDegrees(this.controlsAngle);
        // might be needed later
        // const endAngle = this.replayablePhysicsComponent.turnInformation.endAngleFromRotationPointIfUninterrupted;
        // this determines if we are inputting an acceleration
        // I don't think it will ever happen though since every turn will result in a straight acceleration automatically
        // oh! it could be slowing down, and we could be interrupting it!
        // on second thought, 
        if (currentDirectionRounded === controlsAngleRounded) {
            // check that we didn't already speed up to this speed
            // check that we are slowing down (before a turn) and want to interrupt it by going straight
            // to test: lower acceleration to make it easier to see, Have plane at max speed, tell it to turn tightly, 
            // then tell it to continue straight instead while it's slowing down
            // I need to update restSpeed more often... it's not going great at the moment
            // if(this.maxSpeed !== this.replayablePhysicsComponent.restSpeed && this.replayablePhysicsComponent.accelerationInformation.isDecelerating) {
            //     console.log('helloo')
            //     this.replayablePhysicsComponent.startAcceleration({acceleration: this.jetAcceleration, endSpeed: this.maxSpeed, gameTimeAccelerationStarted: gameTime})
            // }
            return;
        }
        // plane is still jumping when the turn angle changes while changing the deceleration to end at a different speed for a different turn
        //         || (endAngle > 2 * Math.PI && this.roundAngleTo16thsDegrees(endAngle - 2 * Math.PI) !== controlsAngleRounded) || 
        //         (this.roundAngleTo16thsDegrees(endAngle) !== controlsAngleRounded))
        // on second thought, I need to get the straight acceleration interrupt working first
        var angleDifference = controlsAngleRounded - currentDirectionRounded;
        var isTurningRight = !(angleDifference > 180 || (angleDifference < 0 && angleDifference > -180));
        // turning right means that the rotation point is to the right relative to the movement direction
        // always at a 90 degree angle
        var tangentAngle = this.replayablePhysicsComponent.movementTangentAngle;
        var turnRadius = this.turnRadius;
        var tangentSpeed = this.maxSpeed;
        // we'll want to use this later:
        // const {turnRadius, tangentSpeed} = this.getTurnRadiusAndSpeed(Math.abs(angleDifference));
        // check tangent speed with current speed,
        // then decelerate/accelerate
        // TODO can use controlsAngleRounded and convert to radians later... I think
        // const endAngle = ((Math.round((this.controlsAngle / (2 * Math.PI)) * 16) % 16) / 16) * 2 * Math.PI;
        var endAngle = controlsAngleRounded / 360 * 2 * Math.PI;
        // after a turn we want to accelerate to the max straight speed
        // for now we don't want the plane to slow down for turns
        // to keep things simple at first
        // const nextInstruction: NextInstructionAccelerate = { 
        //     type: 'accelerate',
        //     endSpeed: this.maxSpeed,
        //     acceleration: this.jetAcceleration
        // }
        // this was restSpeed before.. rest speed needs to die, I'm not sure what it's for exactly
        // I think it's to verify that the speed has been changed to a specific thing at some point in the past
        // 
        // if(this.replayablePhysicsComponent.restSpeed !== tangentSpeed) {
        // if we're already decelerating for a shallow turn, and the new angle is sharper requiring a slower speed,
        // then update the end speed of the deceleration, and the turn angle of the next instruction
        // if we're already accelerating for a less sharp turn, and the turn angle changes requiring a different speed, then update
        // the acceleration and the turn angle of the next instruction
        // if(
        //     this.replayablePhysicsComponent.accelerationInformation?.endSpeedIfUninterrupted && 
        //     this.replayablePhysicsComponent.accelerationInformation.endSpeedIfUninterrupted !== tangentSpeed
        // ) {
        //     console.log('speed change needed', {previousEndSpeed: this.replayablePhysicsComponent.accelerationInformation?.endSpeedIfUninterrupted, newEndSpeed: tangentSpeed})
        //     const acceleration = this.replayablePhysicsComponent.restSpeed > tangentSpeed ? this.jetDeceleration : this.jetAcceleration;
        //     const endSpeed = tangentSpeed;
        //     const followupInstruction: NextInstructionTurn  = {
        //         type: 'turn',
        //         tangentSpeed,
        //         turnRadius,
        //         isTurningRight,
        //         endAngle: endAngle,
        //         startAngle: tangentAngle,
        //         nextInstruction
        //     };
        //     // still need to apply what happens when interrupting
        //     this.replayablePhysicsComponent.startAcceleration({
        //         acceleration,
        //         endSpeed,
        //         gameTimeAccelerationStarted: gameTime, 
        //         nextInstruction: followupInstruction
        //     });
        // } 
        // if(this.replayablePhysicsComponent.isAccelerating) return;
        if (!this.replayablePhysicsComponent.isTurning) {
            // the tangent speed is the same so we should be waiting for the acceleration to finish
            // TODO: this presents a problem when a turn is possible at max speed because we could be accelerating to the max speed and we'd want 
            // to update the acceleration to include the next turn instruction if that's the case
            // needed for playback 
            var pointWhereArchStarted = [this.transform.pos[0], this.transform.pos[1]];
            var normalAngle = isTurningRight ? tangentAngle + Math.PI / 2 : tangentAngle - Math.PI / 2;
            var rotationPoint = [
                pointWhereArchStarted[0] + turnRadius * Math.cos(normalAngle),
                pointWhereArchStarted[1] + turnRadius * Math.sin(normalAngle)
            ];
            this.replayablePhysicsComponent.startArchRotation({
                turnRadius: turnRadius,
                isTurningRight: isTurningRight,
                tangentSpeed: tangentSpeed,
                startAngle: tangentAngle,
                endAngle: endAngle,
                pointWhereArchStarted: pointWhereArchStarted, // try to create this later
                rotationPoint: rotationPoint, // try to create this later
                gameTimeArchStarted: gameTime, // try to create this later
                // nextInstruction
            });
            return;
        }
        if (((_a = this.replayablePhysicsComponent.turnInformation) === null || _a === void 0 ? void 0 : _a.rotationDirection) !== undefined &&
            ((_b = this.replayablePhysicsComponent.turnInformation) === null || _b === void 0 ? void 0 : _b.rotationDirection) !== null &&
            isTurningRight === (((_c = this.replayablePhysicsComponent.turnInformation) === null || _c === void 0 ? void 0 : _c.rotationDirection) > 1) &&
            ((_d = this.replayablePhysicsComponent.turnInformation) === null || _d === void 0 ? void 0 : _d.endAngleFromRotationPointIfUninterrupted) &&
            controlsAngleRounded !== this.replayablePhysicsComponent.turnInformation.endAngleFromRotationPointIfUninterrupted) {
            // if it is turning, then start interrupting and change the end direction
            // if the controls direction is different from the end direction of the current turn
            // interrupt by altering the current turn to end at a different direction
            // let's try to ignore the fact that we want larger angled turns to be 
            // done at a slower speed
            // this should result in a shallow turn's angle being interrupted to what would normally 
            // call for a slowdown and then a tighter slower turn
            // but instead, the plane will continue at the shallow angle turn rate and complete it all the 
            // way to the new angle....
            // let's just see how that feels first before getting more complicated... though I think I'll have to
            // get more complicated and figure out how big of an angle discrepancy warrants slowing down to the tighter
            // turn speed
            // maybe it's just a matter of applying the same logic of turn direction. But the complicated bit will still be
            // ending the current turn at a new direction that is the next 1/16th of 2PI
            // Then accelerating to the right speed, and then finally, turning to the location
            // to change the end angle, I also need to change the end game time, and the end location of the turn.. which kinda sucks
            this.replayablePhysicsComponent.startArchRotation({
                turnRadius: this.replayablePhysicsComponent.turnInformation.turnRadius,
                isTurningRight: isTurningRight,
                tangentSpeed: this.replayablePhysicsComponent.turnInformation.tangentSpeed,
                startAngle: this.replayablePhysicsComponent.turnInformation.startAngle,
                endAngle: endAngle,
                pointWhereArchStarted: this.replayablePhysicsComponent.turnInformation.startingPoint,
                rotationPoint: this.replayablePhysicsComponent.turnInformation.rotationPoint,
                gameTimeArchStarted: this.replayablePhysicsComponent.turnInformation.gameTimeWhenTurnStarted,
                nextInstruction: this.replayablePhysicsComponent.turnInformation.nextInstruction
            });
        }
        else if (isTurningRight !== (((_e = this.replayablePhysicsComponent.turnInformation) === null || _e === void 0 ? void 0 : _e.rotationDirection) > 1) &&
            ((_f = this.replayablePhysicsComponent.turnInformation) === null || _f === void 0 ? void 0 : _f.endAngleFromRotationPointIfUninterrupted) &&
            controlsAngleRounded !== ((_g = this.replayablePhysicsComponent.turnInformation) === null || _g === void 0 ? void 0 : _g.endAngleFromRotationPointIfUninterrupted)) {
            // we want to update the final angle, the final location, and the next instruction
            // OH it's the same as before! except I need to determine the final angle
            // based on the next closest 16th of 2PI, and then I'm adding a new next instruction
            // not sure what happens with edge cases here. I might need a mod 16 too 
            console.log('WE SHOULD BE ENDING THE TURN SOON NOW FOR ANOTHER TURN');
            var currentDirectionRoundedToNext16th = ((Math.floor(currentDirection / (Math.PI * 2) * 16) % 16) / 16) * (Math.PI * 2);
            var accelerateToMaxSpeed = {
                type: 'accelerate',
                endSpeed: this.maxSpeed,
                acceleration: this.jetAcceleration
            };
            var followupInstruction = {
                type: 'turn',
                tangentSpeed: tangentSpeed,
                turnRadius: turnRadius,
                isTurningRight: isTurningRight,
                endAngle: endAngle,
                startAngle: tangentAngle,
                nextInstruction: accelerateToMaxSpeed
            };
            // this is where I would have the plane animation happen over time where it banks from one side to the other
            // instead this should execute instantly without changing anything 
            var nextInstruction = {
                type: 'accelerate',
                endSpeed: tangentSpeed,
                acceleration: this.jetAcceleration,
                nextInstruction: followupInstruction
            };
            this.replayablePhysicsComponent.startArchRotation({
                turnRadius: this.replayablePhysicsComponent.turnInformation.turnRadius,
                isTurningRight: isTurningRight,
                tangentSpeed: this.replayablePhysicsComponent.turnInformation.tangentSpeed,
                startAngle: this.replayablePhysicsComponent.turnInformation.startAngle,
                endAngle: currentDirectionRoundedToNext16th,
                pointWhereArchStarted: this.replayablePhysicsComponent.turnInformation.startingPoint,
                rotationPoint: this.replayablePhysicsComponent.turnInformation.rotationPoint,
                gameTimeArchStarted: this.replayablePhysicsComponent.turnInformation.gameTimeWhenTurnStarted,
                nextInstruction: nextInstruction
            });
        }
        // const angleDifference = controlsAngleRounded - currentDirectionRounded;
        // const turningRight = !(angleDifference > 180 || (angleDifference < 0 && angleDifference > -180));
        // const tangentAngle = this.replayablePhysicsComponent.movementTangentAngle / (2 * Math.PI) * 360;
        // const endAngleFromRotationPointIfUninterrupted = ((Math.round((this.controlsAngle / (2 * Math.PI)) * 16) % 16) / 16) * 360;
        // const normalAngle = turningRight ? tangentAngle/360 * Math.PI * 2 + Math.PI / 2 : tangentAngle/ 360 * Math.PI * 2 - Math.PI / 2 
        // const pointWhereArchStarted = [this.transform.pos[0], this.transform.pos[1]];
        // const turnRadius = 300;
        // const rotationPoint: [number, number] = [
        //     pointWhereArchStarted[0] + turnRadius * Math.cos(normalAngle),
        //     pointWhereArchStarted[1] + turnRadius * Math.sin(normalAngle) 
        // ]
        // console.log("Angles", {
        //     startX: pointWhereArchStarted[0],
        //     startY: pointWhereArchStarted[1],
        //     turnRadius,
        //     rotX: rotationPoint[0],
        //     rotY: rotationPoint[1]
        // });
        // if the rounded difference
    };
    Aurora.prototype.getTurnRadiusAndSpeed = function (angleChangeDegrees) {
        var tightestRadius = 100;
        var tangentSpeed = 0;
        var fastestTurnSpeed = this.maxSpeed * 4 / 5;
        var radii = [
            tightestRadius * 4,
            tightestRadius * 3,
            tightestRadius * 2,
            tightestRadius
        ];
        if (angleChangeDegrees >= 90) {
            tangentSpeed = Math.sqrt(radii[3] / radii[0]) * fastestTurnSpeed;
            return { turnRadius: tightestRadius, tangentSpeed: tangentSpeed };
        }
        else if (angleChangeDegrees >= 67.5) {
            tangentSpeed = Math.sqrt(radii[2] / radii[0]) * fastestTurnSpeed;
            return { turnRadius: radii[2], tangentSpeed: tangentSpeed };
        }
        else if (angleChangeDegrees >= 45) {
            tangentSpeed = Math.sqrt(radii[1] / radii[0]) * fastestTurnSpeed;
            return { turnRadius: radii[1], tangentSpeed: tangentSpeed };
        }
        else if (angleChangeDegrees >= 22.5) {
            tangentSpeed = fastestTurnSpeed;
            return { turnRadius: radii[0], tangentSpeed: tangentSpeed };
        }
    };
    Aurora.prototype.updateLeftControlFocussedStickInput = function (direction) {
        if (Math.abs(direction[0]) + Math.abs(direction[1]) > 0.20) {
            // round to nearest 1/16th of a circle
            var angle = (Math.atan2(direction[1], direction[0]) + Math.PI * 2) % (Math.PI * 2);
            var roundedAngle = ((Math.round((angle / (2 * Math.PI)) * 16) % 16) / 16) * 2 * Math.PI;
            this.controlsAngle = roundedAngle;
        }
        else {
            this.controlsAngle = null;
        }
    };
    // there's a maximum speed that you can go
    // you accelerate to it when moving straight
    // when you turn, the maximum speed drops depending on the turn angle
    // tightest turn has the minimum speed;
    // the turn radius is determine by the difference in angle moving, and angle pointing
    // smallest radius turn angle is when 90 degrees or greater difference
    // when the stick is not pointing anywhere, the angle is not applied and the ship 
    // updateMovement(deltaTime: number) {
    //     if(!this.controllerInUse) return;
    // }
    Aurora.prototype.createDeathAnimationLineObjects = function () {
        // All I need is the point positions of the lines to create the death animation object
        // I already have this when I use the sprite editor
        // so I should be able to output this function as well when creating a sprite
        var l = this.lineSprite.length;
        var w = this.lineSprite.length / 2;
        // get the first line position and angle relative to Aurora's 0,0
        /*
            line 1
            ctx.beginPath();
            ctx.moveTo(0,0) // point 1
            ctx.lineTo(-l, w/2) // point 2
            ctx.stroke();
        */
        var line1Point1 = [0, 0];
        var line1Point2 = [-l, -w / 2];
        new DeathAnimationLineObject(this.gameEngine, [this.transform.pos[0], this.transform.pos[1]], this.transform.angle, [line1Point1, line1Point2], "rgb(255, 255, 255)", 1.5);
        /*
            line 2
            ctx.beginPath();
            ctx.moveTo(-l, w/2); // point 1
            ctx.lineTo(-l, -w/2); // point 2
            ctx.stroke();
        */
        var line2Point1 = [-l, w / 2];
        var line2Point2 = [-l, -w / 2];
        new DeathAnimationLineObject(this.gameEngine, [this.transform.pos[0], this.transform.pos[1]], this.transform.angle, [line2Point1, line2Point2], "rgb(255, 255, 255)", 1.5);
        /*
             line 3
             ctx.beginPath();
             ctx.lineTo(-l, -w/2);
             ctx.lineTo(0, 0);
             ctx.stroke();
         */
        var line3Point1 = [-l, -w / 2];
        var line3Point2 = [0, 0];
        new DeathAnimationLineObject(this.gameEngine, [this.transform.pos[0], this.transform.pos[1]], this.transform.angle, [line3Point1, line3Point2], "rgb(255, 255, 255)", 1.5);
    };
    return Aurora;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var AuroraSprite = /** @class */ (function (_super) {
    __extends(AuroraSprite, _super);
    function AuroraSprite(transform) {
        var _this = _super.call(this, transform) || this;
        _this.length = 60;
        _this.acceleration = 0;
        _this.color = "rgb(255, 255, 255)";
        return _this;
    }
    AuroraSprite.prototype.draw = function (ctx) {
        if (!this.visible)
            return;
        var pos = this.transform.absolutePosition();
        var r = 255;
        var g = 255;
        var b = 50;
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.angle);
        this.drawAurora(ctx);
        ctx.restore();
    };
    AuroraSprite.prototype.drawAuroraOriginal = function (ctx) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        // hard coded to match in the death animation:
        var l = this.length;
        var w = this.length / 2;
        ctx.lineTo(-l, w / 2);
        ctx.lineTo(-l, -w / 2);
        ctx.lineTo(0, 0);
        ctx.stroke();
        // triangle should be split up in to three distinct parts
        // grab the center point of the line
        // create a function that draws the line by moving to center point, 
        // rotating, and then drawing from the start to finish of the line
        // then I can give the center point a random velocity
        // and a random rotation speed
        // the line points are relative to the transform of the parent object to start
        // The new transform will be the parent transform location + the center point location relative to the parent transform
        // also need the initial angle of the transform + the initial angle of the line
        /*
        ctx.beginPath();
        ctx.moveTo(0,0) // line 1 point 1
        ctx.lineTo(-l, w/2); // line 1 point 2
        ctx.stroke();

        line 2
        ctx.beginPath();
        ctx.moveTo(-l, w/2);
        ctx.lineTo(-l, -w/2);
        ctx.stroke();

        */
        // I need a way to locate the start and end point
        // for the next lines when creating an arc
        ctx.beginPath();
        ctx.arc(-13 / 18 * l, 0, 2 / 9 * w / 2, -Math.PI / 2, Math.PI / 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-13 / 18 * l, 2 / 9 * w / 2);
        ctx.lineTo(-13 / 18 * l - 2 / 9 * w / 2 * 0.5, 2 / 9 * w / 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-13 / 18 * l, -2 / 9 * w / 2);
        ctx.lineTo(-13 / 18 * l - 2 / 9 * w / 2 * 0.5, -2 / 9 * w / 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(-13 / 18 * l - 2 / 9 * w / 2 * 0.5, 0, 2 / 9 * w / 2, Math.PI / 2, 3 * Math.PI / 2);
        ctx.stroke();
    };
    AuroraSprite.prototype.drawAurora = function (ctx) {
        ctx.moveTo(0, 0);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        var s = 1.3;
        // Piece 1: 
        ctx.beginPath();
        ctx.moveTo(0 * s, 0 * s);
        ctx.lineTo(-48 * s, -12 * s);
        ctx.lineTo(-48 * s, 12 * s);
        ctx.lineTo(0 * s, 0 * s);
        ctx.stroke();
        // Piece 2: 
        ctx.beginPath();
        ctx.moveTo(-41 * s, 2 * s);
        ctx.lineTo(-39 * s, 2 * s);
        ctx.arc(-39 * s, 0 * s, 2 * s, 1.5707963267948966, -1.5707963267948966, true);
        ctx.lineTo(-41 * s, -2 * s);
        ctx.arc(-41 * s, 0 * s, 2 * s, -1.5707963267948966, 1.5707963267948966, true);
        ctx.stroke();
    };
    return AuroraSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__.LineSprite));

var DeathAnimationLineObject = /** @class */ (function (_super) {
    __extends(DeathAnimationLineObject, _super);
    function DeathAnimationLineObject(engine, objectPos, // position of the parent object
    objectAngle, // angle of the parent object
    linePointPositions, // relative to parent object origin
    color, width, speed) {
        var _this = _super.call(this, engine) || this;
        var linePoint1 = linePointPositions[0];
        var linePoint2 = linePointPositions[1];
        var length = Math.sqrt(Math.pow((linePoint2[0] - linePoint1[0]), 2) +
            Math.pow((linePoint2[1] - linePoint1[1]), 2));
        // its position is the average of these two
        var line1PositionOnPlane = [
            (linePoint1[0] + linePoint2[0]) / 2,
            (linePoint1[1] + linePoint2[1]) / 2
        ];
        var linePositionAngleRelativeToAurora = Math.atan2(line1PositionOnPlane[1], line1PositionOnPlane[0]) - Math.PI;
        var lineAngleRelativeToAurora = Math.atan2(linePoint2[1] - linePoint1[1], linePoint2[0] - linePoint1[0]) - Math.PI;
        var planeOriginToLine1CenterDistance = Math.sqrt(Math.pow(line1PositionOnPlane[0], 2) + Math.pow((line1PositionOnPlane[1]), 2));
        var lineMidpointPosition = [
            objectPos[0] - planeOriginToLine1CenterDistance * Math.cos(objectAngle + linePositionAngleRelativeToAurora),
            objectPos[1] - planeOriginToLine1CenterDistance * Math.sin(objectAngle + linePositionAngleRelativeToAurora)
        ];
        var lineAngle = lineAngleRelativeToAurora + objectAngle;
        _this.transform.pos = [lineMidpointPosition[0], lineMidpointPosition[1]];
        _this.transform.angle = lineAngle;
        // create a random velocity and random angular velocity
        var randomVelocity = _game_engine_util__WEBPACK_IMPORTED_MODULE_8__.VectorMath.vectorCartesian(2 * Math.random() * Math.PI, (3 + 2 * Math.random()) * 0.25);
        var randomAngularVelocity = (3 * 0.075 * Math.random()) * 0.25;
        _this.transform.vel[0] = randomVelocity[0];
        _this.transform.vel[1] = randomVelocity[1];
        _this.transform.aVel = randomAngularVelocity;
        _this.addLineSprite(new DeathAnimationSprite(_this.transform, length, width || 1.5, color));
        _this.addPhysicsComponent();
        return _this;
    }
    DeathAnimationLineObject.prototype.animate = function () { };
    DeathAnimationLineObject.prototype.update = function (deltaTime) { };
    return DeathAnimationLineObject;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

// export class DeathAnimationBezierObject extends GameObject {
//     constructor(
//         engine: GameEngine | AnimationView,
//         objectPos: [number, number],// position of the parent object
//         objectAngle: number, // angle of the parent object
//         bezierCurvePoints: {
//             startPos: [number, number],
//             endPos: [number, number],
//             controlPoint1: [number, number],
//             controlPoint2: [number, number]
//         }, // relative to parent object origin
//         color?: string,
//         width?: number,
//         speed?: number,
//     ) {
//         super(engine);
//         const linePoint1 = linePointPositions[0];
//         const linePoint2 = linePointPositions[1];
//         const length = Math.sqrt(
//             (linePoint2[0] - linePoint1[0])**2 + 
//             (linePoint2[1] - linePoint1[1])**2
//         )
//         // its position is the average of these two
//         const line1PositionOnPlane = [
//             (linePoint1[0] + linePoint2[0] )/ 2,
//             (linePoint1[1] + linePoint2[1]) / 2
//         ]
//         const linePositionAngleRelativeToAurora =  Math.atan2(line1PositionOnPlane[1], line1PositionOnPlane[0]) - Math.PI;
//         const lineAngleRelativeToAurora =  Math.atan2(linePoint2[1] - linePoint1[1], linePoint2[0] - linePoint1[0]) - Math.PI;
//         const planeOriginToLine1CenterDistance = Math.sqrt(line1PositionOnPlane[0]**2 + (line1PositionOnPlane[1])**2);
//         const lineMidpointPosition: [number, number] = [
//             objectPos[0] - planeOriginToLine1CenterDistance * Math.cos(objectAngle + linePositionAngleRelativeToAurora),
//             objectPos[1] - planeOriginToLine1CenterDistance * Math.sin(objectAngle + linePositionAngleRelativeToAurora)
//         ]
//         const lineAngle = lineAngleRelativeToAurora + objectAngle;
//         this.transform.pos = [lineMidpointPosition[0], lineMidpointPosition[1]];
//         this.transform.angle = lineAngle;
//         // create a random velocity and random angular velocity
//         const randomVelocity = VectorMath.vectorCartesian(2 * Math.random() * Math.PI, (3 + 2 * Math.random()) * 0.25);
//         const randomAngularVelocity = (3 * 0.075 * Math.random()) * 0.25;
//         this.transform.vel[0] = randomVelocity[0];
//         this.transform.vel[1] = randomVelocity[1];
//         this.transform.aVel = randomAngularVelocity;
//         this.addLineSprite(new DeathAnimationSprite(this.transform, length, width || 1.5, color));
//         this.addPhysicsComponent();
//     }
//     animate() {}
//     update(deltaTime: number) {}
// }
// export class DeathAnimationArcObject extends GameObject {
//     constructor(
//         engine: GameEngine | AnimationView,
//         objectPos: [number, number],// position of the parent object
//         objectAngle: number, // angle of the parent object
//         arcData: {
//             startPos: [number, number],
//             endPos: [number, number],
//             radius: [number, number]
//         }, // relative to parent object origin
//         color?: string,
//         width?: number,
//         speed?: number,
//     ) {
//         super(engine);
//         const linePoint1 = linePointPositions[0];
//         const linePoint2 = linePointPositions[1];
//         const length = Math.sqrt(
//             (linePoint2[0] - linePoint1[0])**2 + 
//             (linePoint2[1] - linePoint1[1])**2
//         )
//         // its position is the average of these two
//         const line1PositionOnPlane = [
//             (linePoint1[0] + linePoint2[0] )/ 2,
//             (linePoint1[1] + linePoint2[1]) / 2
//         ]
//         const linePositionAngleRelativeToAurora =  Math.atan2(line1PositionOnPlane[1], line1PositionOnPlane[0]) - Math.PI;
//         const lineAngleRelativeToAurora =  Math.atan2(linePoint2[1] - linePoint1[1], linePoint2[0] - linePoint1[0]) - Math.PI;
//         const planeOriginToLine1CenterDistance = Math.sqrt(line1PositionOnPlane[0]**2 + (line1PositionOnPlane[1])**2);
//         const lineMidpointPosition: [number, number] = [
//             objectPos[0] - planeOriginToLine1CenterDistance * Math.cos(objectAngle + linePositionAngleRelativeToAurora),
//             objectPos[1] - planeOriginToLine1CenterDistance * Math.sin(objectAngle + linePositionAngleRelativeToAurora)
//         ]
//         const lineAngle = lineAngleRelativeToAurora + objectAngle;
//         this.transform.pos = [lineMidpointPosition[0], lineMidpointPosition[1]];
//         this.transform.angle = lineAngle;
//         // create a random velocity and random angular velocity
//         const randomVelocity = VectorMath.vectorCartesian(2 * Math.random() * Math.PI, (3 + 2 * Math.random()) * 0.25);
//         const randomAngularVelocity = (3 * 0.075 * Math.random()) * 0.25;
//         this.transform.vel[0] = randomVelocity[0];
//         this.transform.vel[1] = randomVelocity[1];
//         this.transform.aVel = randomAngularVelocity;
//         this.addLineSprite(new DeathAnimationSprite(this.transform, length, width || 1.5, color));
//         this.addPhysicsComponent();
//     }
//     animate() {}
//     update(deltaTime: number) {}
// }
var DeathAnimationSprite = /** @class */ (function (_super) {
    __extends(DeathAnimationSprite, _super);
    function DeathAnimationSprite(transform, length, lineWidth, color) {
        // the color should be slightly less vibrant
        // and chosen by the parent object.. but for the future
        var _this = _super.call(this, transform) || this;
        _this.length = length;
        _this.color = color ? color : "rgb(255, 255, 255)";
        _this.lineWidth = lineWidth ? lineWidth : 1.5;
        return _this;
    }
    DeathAnimationSprite.prototype.draw = function (ctx) {
        // I'm given a midpoint and a length
        var pos = this.transform.absolutePosition();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.angle);
        ctx.beginPath();
        ctx.moveTo(-this.length / 2, 0);
        ctx.lineTo(this.length / 2, 0);
        ctx.stroke();
        ctx.restore();
    };
    return DeathAnimationSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__.LineSprite));



/***/ }),

/***/ "./src/game_objects/StrikeTime/Aurora/BombReticle.ts":
/*!***********************************************************!*\
  !*** ./src/game_objects/StrikeTime/Aurora/BombReticle.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BombReticle: () => (/* binding */ BombReticle),
/* harmony export */   BombReticleSprite: () => (/* binding */ BombReticleSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


// If I had two it could be interesting to have to account for that
// or maybe it would just be fucking annoying lol
/*
        X
        |
        |
        |
        ^
     /     \
    /       \
   / _    _  \

   X
   |
   |
   |
   |    ^
     /     \
    /       \
   / _    _  \

            X
            |
            |
            |
        ^   |
     /     \
    /       \
   / _    _  \

*/
var BombReticle = /** @class */ (function (_super) {
    __extends(BombReticle, _super);
    // the position of the reticle is from the origin of the plane
    function BombReticle(engine, transform, position, length) {
        var _this = _super.call(this, engine) || this;
        _this.transform = transform;
        _this.positionLength = Math.sqrt(Math.pow((position[0]), 2) + Math.pow((position[1]), 2));
        _this.positionAngle = (position[0] === position[1] && position[0] === 0) ? Math.PI / 2 : Math.atan2(position[1], position[0]);
        _this.reticlePosition = _this.getReticlePosition();
        _this.bombLandPosition = length;
        _this.addLineSprite(new BombReticleSprite(_this.transform, _this.reticlePosition, length));
        _this.length = length;
        return _this;
    }
    BombReticle.prototype.setVisibility = function (isVisible) {
        if (isVisible === void 0) { isVisible = true; }
        this.lineSprite.isVisible = isVisible;
    };
    BombReticle.prototype.getReticlePosition = function () {
        var angle = this.transform.angle;
        return [
            this.transform.pos[0] - this.positionLength * Math.cos(angle + this.positionAngle),
            this.transform.pos[1] - this.positionLength * Math.sin(angle + this.positionAngle)
        ];
    };
    BombReticle.prototype.animate = function () { };
    BombReticle.prototype.update = function (deltaTime) {
        var reticleLocation = this.getReticlePosition();
        this.reticlePosition[0] = reticleLocation[0];
        this.reticlePosition[1] = reticleLocation[1];
    };
    return BombReticle;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var BombReticleSprite = /** @class */ (function (_super) {
    __extends(BombReticleSprite, _super);
    // origin is where the reticle starts
    function BombReticleSprite(transform, reticlePosition, length) {
        var _this = _super.call(this, transform) || this;
        _this.length = length;
        _this.reticlePosition = reticlePosition;
        _this.isVisible = false;
        return _this;
    }
    BombReticleSprite.prototype.draw = function (ctx) {
        if (!this.isVisible)
            return;
        var pos = this.reticlePosition;
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.angle + -Math.PI / 2);
        this.drawReticle(ctx);
        ctx.restore();
        // draw dotted line from front of plane
    };
    BombReticleSprite.prototype.drawReticle = function (ctx) {
        ctx.beginPath();
        ctx.setLineDash([4, 10]);
        ctx.strokeStyle = '#FFFFFF';
        ctx.moveTo(0, 0);
        ctx.lineTo(0, this.length);
        ctx.stroke();
        ctx.translate(0, this.length);
        ctx.setLineDash([6, 2]);
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        ctx.stroke();
    };
    return BombReticleSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__.LineSprite));



/***/ }),

/***/ "./src/game_objects/StrikeTime/Aurora/EngineExhaust.ts":
/*!*************************************************************!*\
  !*** ./src/game_objects/StrikeTime/Aurora/EngineExhaust.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EngineExhaust: () => (/* binding */ EngineExhaust)
/* harmony export */ });
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/color */ "./src/game_engine/color.ts");
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_engine/util */ "./src/game_engine/util.ts");
/* harmony import */ var _particles_particle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../particles/particle */ "./src/game_objects/particles/particle.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




/*

        ^
     /     \
    /       \
   / _    _  \
    iii   iii
    iii   iii

*/
var EngineExhaust = /** @class */ (function (_super) {
    __extends(EngineExhaust, _super);
    // the position of the exhaust is the middle of the exhaust
    function EngineExhaust(engine, transform, position, width) {
        var _this = _super.call(this, engine) || this;
        _this.transform = transform;
        _this.noAccelerationHue = 50;
        _this.isAccelerating = false;
        _this.acceleratingHue = 300;
        _this.colorRange = 40;
        _this.baseOpacity = 0.6;
        _this.opacityRange = 0.35;
        _this.maxParticleCount = 20;
        _this.currentParticleCount = 0;
        _this.positionOnPlane = position;
        _this.width = width;
        _this.currentTime = 0;
        _this.exhaustRate = 100;
        _this.isDecelerating = false;
        return _this;
    }
    // every so often, make more particles
    EngineExhaust.prototype.animate = function () { };
    EngineExhaust.prototype.update = function (deltaTime) {
        this.currentTime += deltaTime;
        if (this.currentTime > this.exhaustRate) {
            this.currentTime = 0;
            var numberToCreate = 10;
            if (!this.isDecelerating) {
                for (var i = 0; i < numberToCreate; i++) {
                    this.addEngineExhaustParticle();
                }
            }
        }
    };
    EngineExhaust.prototype.addEngineExhaustParticle = function () {
        var linePosition = Math.random() * this.width - this.width / 2;
        var angle = this.transform.angle;
        // const position: [number, number] = [
        //     this.transform.pos[0] + (this.positionOnPlane[0] + linePosition) * Math.cos(angle - Math.PI),
        //     this.transform.pos[1] + -(this.positionOnPlane[1]) * Math.sin(angle)
        // ]
        // TODO: why am I doing this calculation each time: because it requires a random input along the length of the exhaust?
        var exhaustPositionAngle = Math.atan2(this.positionOnPlane[1], this.positionOnPlane[0] + linePosition) - Math.PI / 2;
        var exhaustPositionLength = Math.sqrt(Math.pow(this.positionOnPlane[0], 2) + Math.pow((this.positionOnPlane[1] + linePosition), 2));
        var position = [
            this.transform.pos[0] - exhaustPositionLength * Math.cos(angle + exhaustPositionAngle),
            this.transform.pos[1] - exhaustPositionLength * Math.sin(angle + exhaustPositionAngle)
        ];
        var initialSpeed = this.isAccelerating ? Math.random() * 1.5 + 6 : Math.random() * 0.5 + 1;
        var initialVelocity = [initialSpeed * Math.cos(angle + Math.PI), initialSpeed * Math.sin(angle + Math.PI)];
        var hue = this.isAccelerating ? (0,_game_engine_util__WEBPACK_IMPORTED_MODULE_2__.getNumberFromRange)(this.acceleratingHue, this.colorRange) : (0,_game_engine_util__WEBPACK_IMPORTED_MODULE_2__.getNumberFromRange)(this.noAccelerationHue, this.colorRange);
        var opacity = (0,_game_engine_util__WEBPACK_IMPORTED_MODULE_2__.getNumberFromRange)(this.baseOpacity, this.opacityRange);
        var color = new _game_engine_color__WEBPACK_IMPORTED_MODULE_0__.Color("hsla", [hue, 100, 50, opacity]);
        new _particles_particle__WEBPACK_IMPORTED_MODULE_3__.Particle(this.gameEngine, position, initialVelocity, color, null, 2, 0.005);
    };
    return EngineExhaust;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__.GameObject));



/***/ }),

/***/ "./src/game_objects/StrikeTime/B2Bomber/B2Bomber.ts":
/*!**********************************************************!*\
  !*** ./src/game_objects/StrikeTime/B2Bomber/B2Bomber.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B2Bomber: () => (/* binding */ B2Bomber),
/* harmony export */   B2BomberSprite: () => (/* binding */ B2BomberSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
/* harmony import */ var _game_engine_transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_engine/transform */ "./src/game_engine/transform.ts");
/* harmony import */ var _game_engine_game_engine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../game_engine/game_engine */ "./src/game_engine/game_engine.ts");
/* harmony import */ var _game_engine_camera__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../game_engine/camera */ "./src/game_engine/camera.ts");
/* harmony import */ var _Aurora_EngineExhaust__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Aurora/EngineExhaust */ "./src/game_objects/StrikeTime/Aurora/EngineExhaust.ts");
/* harmony import */ var _Aurora_AirDecelerationParticles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Aurora/AirDecelerationParticles */ "./src/game_objects/StrikeTime/Aurora/AirDecelerationParticles.ts");
/* harmony import */ var _Bombs_BombBasic__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Bombs/BombBasic */ "./src/game_objects/StrikeTime/Bombs/BombBasic.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();








var B2Bomber = /** @class */ (function (_super) {
    __extends(B2Bomber, _super);
    function B2Bomber(engine, pos, angle) {
        if (angle === void 0) { angle = Math.random() * Math.PI * 2; }
        var _this = _super.call(this, engine) || this;
        _this.controlsDirection = [0, 0];
        _this.controlsAngle = null;
        _this.transform.pos = pos;
        _this.transform.angle = angle;
        _this.transform.vel = [0, 0];
        _this.radius = 30;
        _this.minSpeed = 1;
        _this.maxSpeed = 0.025 * 6;
        _this.controlsDirection = [0, 0];
        _this.bombRefreshTime = 0;
        _this.jetAcceleration = 0.0001;
        _this.jetDeceleration = -0.00035;
        _this.jetDeceleration = -0.0001;
        _this.controllerInUse = false;
        _this.gameEditorHasBeenOpened = false;
        _this.isTurning = false;
        _this.isAccelerating = false;
        _this.camera = new _game_engine_camera__WEBPACK_IMPORTED_MODULE_4__.Camera(engine, new _game_engine_transform__WEBPACK_IMPORTED_MODULE_2__.Transform(null, [pos[0], pos[1]]), "Aurora Camera");
        _this.setAsControllableGameObject();
        _this.addBButtonListener();
        _this.addReplayablePhysicsComponent();
        _this.addLineSprite(new B2BomberSprite(_this.transform));
        _this.leftExhaust = new _Aurora_EngineExhaust__WEBPACK_IMPORTED_MODULE_5__.EngineExhaust(engine, _this.transform, [
            -_this.lineSprite.length / 8,
            17 / 18 * _this.lineSprite.length
        ], 5);
        _this.rightExhaust = new _Aurora_EngineExhaust__WEBPACK_IMPORTED_MODULE_5__.EngineExhaust(engine, _this.transform, [
            _this.lineSprite.length / 8,
            17 / 18 * _this.lineSprite.length
        ], 5);
        _this.airDecelerationParticles = new _Aurora_AirDecelerationParticles__WEBPACK_IMPORTED_MODULE_6__.AirDecelerationParticles(engine, _this.transform, _this.lineSprite.length / 2, _this.lineSprite.length);
        _this.addCollider("General", _this, _this.radius);
        return _this;
    }
    B2Bomber.prototype.updateBButtonListener = function (bButton) {
        if (bButton && this.bombRefreshTime > 2000) {
            new _Bombs_BombBasic__WEBPACK_IMPORTED_MODULE_7__.BombBasic(this.gameEngine, [this.transform.pos[0], this.transform.pos[1]], [0, 0.05]);
            this.bombRefreshTime = 0;
        }
    };
    B2Bomber.prototype.animate = function (delta) {
        var movementDirection = 0;
        if (this.transform.vel[0] === 0 && this.transform.vel[1] === 0) {
            movementDirection = this.transform.angle;
        }
        else {
            movementDirection = Math.atan2(this.transform.vel[0], -this.transform.vel[1]);
        }
        this.transform.angle = movementDirection;
    };
    B2Bomber.prototype.update = function (delta) {
        this.bombRefreshTime += delta;
        if (this.controlsAngle !== null) {
            // compare angle with controls angle
            // if angle is greater than 
            this.transform.angle;
        }
        if (this.replayablePhysicsComponent.movementTangentAngle !== null) {
            this.transform.angle = this.replayablePhysicsComponent.movementTangentAngle;
        }
        if (this.isFocussedGameObject) {
            this.movementMechanics();
        }
        var shipXPos = this.transform.pos[0];
        var shipYPos = this.transform.pos[1];
        this.camera.transform.pos[0] = shipXPos;
        this.camera.transform.pos[1] = shipYPos;
        // visuals (animation)
        if (this.replayablePhysicsComponent.isAccelerating) {
            if (this.replayablePhysicsComponent.accelerationInformation.isDecelerating) {
                this.leftExhaust.isDecelerating = true;
                this.rightExhaust.isDecelerating = true;
                this.leftExhaust.isAccelerating = false;
                this.rightExhaust.isAccelerating = false;
                this.airDecelerationParticles.isDecelerating = true;
            }
            else {
                this.airDecelerationParticles.isDecelerating = false;
                ;
                this.leftExhaust.isAccelerating = true;
                this.rightExhaust.isAccelerating = true;
            }
        }
        else {
            this.airDecelerationParticles.isDecelerating = false;
            this.leftExhaust.isAccelerating = false;
            this.rightExhaust.isAccelerating = false;
            this.leftExhaust.isDecelerating = false;
            this.rightExhaust.isDecelerating = false;
        }
        if (this.replayablePhysicsComponent.isTurning) {
            if (this.replayablePhysicsComponent.turnInformation.rotationDirection > 0) {
                this.leftExhaust.isAccelerating = true;
                this.rightExhaust.isAccelerating = false;
            }
            else {
                this.leftExhaust.isAccelerating = false;
                this.rightExhaust.isAccelerating = true;
            }
        }
    };
    B2Bomber.prototype.updateRightControlFocussedStickInput = function (direction) { };
    B2Bomber.prototype.updateFocussedMousePos = function (pos) { };
    B2Bomber.prototype.roundAngleTo16thsDegrees = function (radians) {
        return ((Math.round(radians / (2 * Math.PI) * 16) % 16) / 16) * 360;
    };
    B2Bomber.prototype.movementMechanics = function () {
        // there might be a way to make it feel a little better if 
        // I allow changing the direction constantly
        // of if I don't immediately accelerate to max speed
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        // to allow constant direction change, I'll need an "interupt" state where
        // the plane is still turning until it's facing one of the 16 directions. 
        // so it would be an interrupt instruction
        // but it's going to be a lot easier to make it feel nice if I have complete control
        // a crap... how would it work on mobile though
        // okay... maybe this would work for mobile, but it doesn't feel great with a controller
        // maybe with some added visuals I can get it to feel better
        // visuals like, a path showing you result of the current instruction
        // and the arrow of the direction you're pointing maybe
        // worth checking out.... but only after I get time reversal going and other stuff
        if (!(this.gameEngine instanceof _game_engine_game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine))
            return;
        // eventually we can go past this 
        // once we're able to interrupt turns
        if (this.replayablePhysicsComponent.isTurning)
            return;
        if (this.controlsAngle === null)
            return;
        var gameTime = this.gameEngine.gameScript.gameTime;
        if (this.transform.vel[0] === 0 && this.transform.vel[1] === 0) {
            console.log('Only the first acceleration');
            var controlsAngleRoundedRadians = ((Math.round((this.controlsAngle / (2 * Math.PI)) * 16) % 16) / 16) * 2 * Math.PI;
            this.replayablePhysicsComponent.startAcceleration({ acceleration: this.jetAcceleration, endSpeed: this.maxSpeed, gameTimeAccelerationStarted: gameTime, onStartDirection: controlsAngleRoundedRadians });
            return;
        }
        // get the controls angle and compare it to the current direction
        // get the absolute velocity and compare it to the max
        // that could be memoized
        // when it's not rotating, we can use transform.vel. Thankfully we always have to speed up or slow down before adjusting the turn angle
        // so this should be valid, but it might not work for other units
        var currentDirection = (Math.atan2(this.transform.vel[1], this.transform.vel[0]) + Math.PI * 2) % (Math.PI * 2);
        var currentDirectionRounded = this.roundAngleTo16thsDegrees(currentDirection);
        var controlsAngleRounded = this.roundAngleTo16thsDegrees(this.controlsAngle);
        // might be needed later
        // const endAngle = this.replayablePhysicsComponent.turnInformation.endAngleFromRotationPointIfUninterrupted;
        // this determines if we are inputting an acceleration
        // I don't think it will ever happen though since every turn will result in a straight acceleration automatically
        // oh! it could be slowing down, and we could be interrupting it!
        // on second thought, 
        if (currentDirectionRounded === controlsAngleRounded) {
            // check that we didn't already speed up to this speed
            // check that we are slowing down (before a turn) and want to interrupt it by going straight
            // to test: lower acceleration to make it easier to see, Have plane at max speed, tell it to turn tightly, 
            // then tell it to continue straight instead while it's slowing down
            // I need to update restSpeed more often... it's not going great at the moment
            if (this.maxSpeed !== this.replayablePhysicsComponent.restSpeed && this.replayablePhysicsComponent.accelerationInformation.isDecelerating) {
                console.log('helloo');
                this.replayablePhysicsComponent.startAcceleration({ acceleration: this.jetAcceleration, endSpeed: this.maxSpeed, gameTimeAccelerationStarted: gameTime });
            }
            return;
        }
        // plane is still jumping when the turn angle changes while changing the deceleration to end at a different speed for a different turn
        //         || (endAngle > 2 * Math.PI && this.roundAngleTo16thsDegrees(endAngle - 2 * Math.PI) !== controlsAngleRounded) || 
        //         (this.roundAngleTo16thsDegrees(endAngle) !== controlsAngleRounded))
        // on second thought, I need to get the straight acceleration interrupt working first
        var angleDifference = controlsAngleRounded - currentDirectionRounded;
        var isTurningRight = !(angleDifference > 180 || (angleDifference < 0 && angleDifference > -180));
        // turning right means that the rotation point is to the right relative to the movement direction
        // always at a 90 degree angle
        var tangentAngle = this.replayablePhysicsComponent.movementTangentAngle;
        // const tangentSpeed = 4/5 * this.maxSpeed;
        var _k = this.getTurnRadiusAndSpeed(Math.abs(angleDifference)), turnRadius = _k.turnRadius, tangentSpeed = _k.tangentSpeed;
        // check tangent speed with current speed,
        // then decelerate/accelerate
        var endAngle = ((Math.round((this.controlsAngle / (2 * Math.PI)) * 16) % 16) / 16) * 2 * Math.PI;
        var nextInstruction = {
            type: 'accelerate',
            endSpeed: this.maxSpeed,
            acceleration: this.jetAcceleration
        };
        // this was restSpeed before.. rest speed needs to die, I'm not sure what it's for exactly
        // I think it's to verify that the speed has been changed to a specific thing at some point in the past
        // 
        // if(this.replayablePhysicsComponent.restSpeed !== tangentSpeed) {
        // if we're already decelerating for a shallow turn, and the new angle is sharper requiring a slower speed,
        // then update the end speed of the deceleration, and the turn angle of the next instruction
        // if we're already accelerating for a less sharp turn, and the turn angle changes requiring a different speed, then update
        // the acceleration and the turn angle of the next instruction
        if (((_a = this.replayablePhysicsComponent.accelerationInformation) === null || _a === void 0 ? void 0 : _a.endSpeedIfUninterrupted) &&
            this.replayablePhysicsComponent.accelerationInformation.endSpeedIfUninterrupted !== tangentSpeed) {
            console.log('speed change needed', { previousEndSpeed: (_b = this.replayablePhysicsComponent.accelerationInformation) === null || _b === void 0 ? void 0 : _b.endSpeedIfUninterrupted, newEndSpeed: tangentSpeed });
            var acceleration = this.replayablePhysicsComponent.restSpeed > tangentSpeed ? this.jetDeceleration : this.jetAcceleration;
            var endSpeed = tangentSpeed;
            var followupInstruction = {
                type: 'turn',
                tangentSpeed: tangentSpeed,
                turnRadius: turnRadius,
                isTurningRight: isTurningRight,
                endAngle: endAngle,
                startAngle: tangentAngle,
                nextInstruction: nextInstruction
            };
            // still need to apply what happens when interrupting
            this.replayablePhysicsComponent.startAcceleration({
                acceleration: acceleration,
                endSpeed: endSpeed,
                gameTimeAccelerationStarted: gameTime,
                nextInstruction: followupInstruction
            });
        }
        if (this.replayablePhysicsComponent.isAccelerating)
            return;
        if (!this.replayablePhysicsComponent.isTurning) {
            // the tangent speed is the same so we should be waiting for the acceleration to finish
            // TODO: this presents a problem when a turn is possible at max speed because we could be accelerating to the max speed and we'd want 
            // to update the acceleration to include the next turn instruction if that's the case
            // needed for playback 
            var pointWhereArchStarted = [this.transform.pos[0], this.transform.pos[1]];
            var normalAngle = isTurningRight ? tangentAngle + Math.PI / 2 : tangentAngle - Math.PI / 2;
            var rotationPoint = [
                pointWhereArchStarted[0] + turnRadius * Math.cos(normalAngle),
                pointWhereArchStarted[1] + turnRadius * Math.sin(normalAngle)
            ];
            this.replayablePhysicsComponent.startArchRotation({
                turnRadius: turnRadius,
                isTurningRight: isTurningRight,
                tangentSpeed: tangentSpeed,
                startAngle: tangentAngle,
                endAngle: endAngle,
                pointWhereArchStarted: pointWhereArchStarted, // try to create this later
                rotationPoint: rotationPoint, // try to create this later
                gameTimeArchStarted: gameTime, // try to create this later
                nextInstruction: nextInstruction
            });
            return;
        }
        if (((_c = this.replayablePhysicsComponent.turnInformation) === null || _c === void 0 ? void 0 : _c.rotationDirection) !== undefined &&
            ((_d = this.replayablePhysicsComponent.turnInformation) === null || _d === void 0 ? void 0 : _d.rotationDirection) !== null &&
            isTurningRight === (((_e = this.replayablePhysicsComponent.turnInformation) === null || _e === void 0 ? void 0 : _e.rotationDirection) > 1) &&
            ((_f = this.replayablePhysicsComponent.turnInformation) === null || _f === void 0 ? void 0 : _f.endAngleFromRotationPointIfUninterrupted) &&
            controlsAngleRounded !== this.replayablePhysicsComponent.turnInformation.endAngleFromRotationPointIfUninterrupted) {
            // if it is turning, then start interrupting and change the end direction
            // if the controls direction is different from the end direction of the current turn
            // interrupt by altering the current turn to end at a different direction
            // let's try to ignore the fact that we want larger angled turns to be 
            // done at a slower speed
            // this should result in a shallow turn's angle being interrupted to what would normally 
            // call for a slowdown and then a tighter slower turn
            // but instead, the plane will continue at the shallow angle turn rate and complete it all the 
            // way to the new angle....
            // let's just see how that feels first before getting more complicated... though I think I'll have to
            // get more complicated and figure out how big of an angle discrepancy warrants slowing down to the tighter
            // turn speed
            // maybe it's just a matter of applying the same logic of turn direction. But the complicated bit will still be
            // ending the current turn at a new direction that is the next 1/16th of 2PI
            // Then accelerating to the right speed, and then finally, turning to the location
            // to change the end angle, I also need to change the end game time, and the end location of the turn.. which kinda sucks
            this.replayablePhysicsComponent.startArchRotation({
                turnRadius: this.replayablePhysicsComponent.turnInformation.turnRadius,
                isTurningRight: isTurningRight,
                tangentSpeed: this.replayablePhysicsComponent.turnInformation.tangentSpeed,
                startAngle: this.replayablePhysicsComponent.turnInformation.startAngle,
                endAngle: endAngle,
                pointWhereArchStarted: this.replayablePhysicsComponent.turnInformation.startingPoint,
                rotationPoint: this.replayablePhysicsComponent.turnInformation.rotationPoint,
                gameTimeArchStarted: this.replayablePhysicsComponent.turnInformation.gameTimeWhenTurnStarted,
                nextInstruction: this.replayablePhysicsComponent.turnInformation.nextInstruction
            });
        }
        else if (isTurningRight !== (((_g = this.replayablePhysicsComponent.turnInformation) === null || _g === void 0 ? void 0 : _g.rotationDirection) > 1) &&
            ((_h = this.replayablePhysicsComponent.turnInformation) === null || _h === void 0 ? void 0 : _h.endAngleFromRotationPointIfUninterrupted) &&
            controlsAngleRounded !== ((_j = this.replayablePhysicsComponent.turnInformation) === null || _j === void 0 ? void 0 : _j.endAngleFromRotationPointIfUninterrupted)) {
            // we want to update the final angle, the final location, and the next instruction
            // OH it's the same as before! except I need to determine the final angle
            // based on the next closest 16th of 2PI, and then I'm adding a new next instruction
            // not sure what happens with edge cases here. I might need a mod 16 too 
            console.log(' WE SHOULD BE ENDING THE TURN SOON NOW FOR ANOTHER TURN');
            var currentDirectionRoundedToNext16th = ((Math.floor(currentDirection / (Math.PI * 2) * 16) % 16) / 16) * (Math.PI * 2);
            var accelerateToMaxSpeed = {
                type: 'accelerate',
                endSpeed: this.maxSpeed,
                acceleration: this.jetAcceleration
            };
            var followupInstruction = {
                type: 'turn',
                tangentSpeed: tangentSpeed,
                turnRadius: turnRadius,
                isTurningRight: isTurningRight,
                endAngle: endAngle,
                startAngle: tangentAngle,
                nextInstruction: accelerateToMaxSpeed
            };
            // this is where I would have the plane animation happen over time where it banks from one side to the other
            // instead this should execute instantly without changing anything 
            var nextInstruction_1 = {
                type: 'accelerate',
                endSpeed: tangentSpeed,
                acceleration: this.jetAcceleration,
                nextInstruction: followupInstruction
            };
            this.replayablePhysicsComponent.startArchRotation({
                turnRadius: this.replayablePhysicsComponent.turnInformation.turnRadius,
                isTurningRight: isTurningRight,
                tangentSpeed: this.replayablePhysicsComponent.turnInformation.tangentSpeed,
                startAngle: this.replayablePhysicsComponent.turnInformation.startAngle,
                endAngle: currentDirectionRoundedToNext16th,
                pointWhereArchStarted: this.replayablePhysicsComponent.turnInformation.startingPoint,
                rotationPoint: this.replayablePhysicsComponent.turnInformation.rotationPoint,
                gameTimeArchStarted: this.replayablePhysicsComponent.turnInformation.gameTimeWhenTurnStarted,
                nextInstruction: nextInstruction_1
            });
        }
        // const angleDifference = controlsAngleRounded - currentDirectionRounded;
        // const turningRight = !(angleDifference > 180 || (angleDifference < 0 && angleDifference > -180));
        // const tangentAngle = this.replayablePhysicsComponent.movementTangentAngle / (2 * Math.PI) * 360;
        // const endAngleFromRotationPointIfUninterrupted = ((Math.round((this.controlsAngle / (2 * Math.PI)) * 16) % 16) / 16) * 360;
        // const normalAngle = turningRight ? tangentAngle/360 * Math.PI * 2 + Math.PI / 2 : tangentAngle/ 360 * Math.PI * 2 - Math.PI / 2 
        // const pointWhereArchStarted = [this.transform.pos[0], this.transform.pos[1]];
        // const turnRadius = 300;
        // const rotationPoint: [number, number] = [
        //     pointWhereArchStarted[0] + turnRadius * Math.cos(normalAngle),
        //     pointWhereArchStarted[1] + turnRadius * Math.sin(normalAngle) 
        // ]
        // console.log("Angles", {
        //     startX: pointWhereArchStarted[0],
        //     startY: pointWhereArchStarted[1],
        //     turnRadius,
        //     rotX: rotationPoint[0],
        //     rotY: rotationPoint[1]
        // });
        // if the rounded difference
    };
    B2Bomber.prototype.getTurnRadiusAndSpeed = function (angleChangeDegrees) {
        var tightestRadius = 100;
        var tangentSpeed = 0;
        var fastestTurnSpeed = this.maxSpeed * 4 / 5;
        var radii = [
            tightestRadius * 4,
            tightestRadius * 3,
            tightestRadius * 2,
            tightestRadius
        ];
        if (angleChangeDegrees >= 90) {
            tangentSpeed = Math.sqrt(radii[3] / radii[0]) * fastestTurnSpeed;
            return { turnRadius: tightestRadius, tangentSpeed: tangentSpeed };
        }
        else if (angleChangeDegrees >= 67.5) {
            tangentSpeed = Math.sqrt(radii[2] / radii[0]) * fastestTurnSpeed;
            return { turnRadius: radii[2], tangentSpeed: tangentSpeed };
        }
        else if (angleChangeDegrees >= 45) {
            tangentSpeed = Math.sqrt(radii[1] / radii[0]) * fastestTurnSpeed;
            return { turnRadius: radii[1], tangentSpeed: tangentSpeed };
        }
        else if (angleChangeDegrees >= 22.5) {
            tangentSpeed = fastestTurnSpeed;
            return { turnRadius: radii[0], tangentSpeed: tangentSpeed };
        }
    };
    B2Bomber.prototype.updateLeftControlFocussedStickInput = function (direction) {
        if (Math.abs(direction[0]) + Math.abs(direction[1]) > 0.20) {
            // round to nearest 1/16th of a circle
            var angle = (Math.atan2(direction[1], direction[0]) + Math.PI * 2) % (Math.PI * 2);
            var roundedAngle = ((Math.round((angle / (2 * Math.PI)) * 16) % 16) / 16) * 2 * Math.PI;
            this.controlsAngle = roundedAngle;
        }
        else {
            this.controlsAngle = null;
        }
    };
    return B2Bomber;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var B2BomberSprite = /** @class */ (function (_super) {
    __extends(B2BomberSprite, _super);
    function B2BomberSprite(transform) {
        var _this = _super.call(this, transform) || this;
        _this.length = 60;
        _this.acceleration = 0;
        _this.color = "rgb(255, 255, 255)";
        return _this;
    }
    B2BomberSprite.prototype.draw = function (ctx) {
        if (!this.visible)
            return;
        var pos = this.transform.absolutePosition();
        var r = 255;
        var g = 255;
        var b = 50;
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.angle);
        this.drawB2Bomber(ctx);
        ctx.restore();
    };
    B2BomberSprite.prototype.drawB2Bomber = function (ctx) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        var s = 1;
        ctx.moveTo(0 * s, 18 * s);
        ctx.beginPath();
        ctx.lineTo(51 * s, -12 * s);
        ctx.lineTo(36 * s, -12 * s);
        ctx.lineTo(27 * s, -6 * s);
        ctx.lineTo(21 * s, -12 * s);
        ctx.lineTo(-21 * s, -12 * s);
        ctx.lineTo(-27 * s, -6 * s);
        ctx.lineTo(-36 * s, -12 * s);
        ctx.lineTo(-51 * s, -12 * s);
        ctx.lineTo(0 * s, 18 * s);
        ctx.stroke();
        //Piece 2: 
        ctx.beginPath();
        ctx.moveTo(-3 * s, 6 * s);
        ctx.bezierCurveTo(-2 * s, 9 * s, 2 * s, 9 * s, 3 * s, 6 * s);
        ctx.bezierCurveTo(4 * s, -2 * s, -4 * s, -2 * s, -3 * s, 6 * s);
        ctx.stroke();
    };
    return B2BomberSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__.LineSprite));



/***/ }),

/***/ "./src/game_objects/StrikeTime/Bombs/BombBasic.ts":
/*!********************************************************!*\
  !*** ./src/game_objects/StrikeTime/Bombs/BombBasic.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BombBasic: () => (/* binding */ BombBasic),
/* harmony export */   BombSprite: () => (/* binding */ BombSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _particles_StrikeTimeParticleExplosion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../particles/StrikeTimeParticleExplosion */ "./src/game_objects/particles/StrikeTimeParticleExplosion.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var BombBasic = /** @class */ (function (_super) {
    __extends(BombBasic, _super);
    function BombBasic(engine, pos, vel) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos = pos;
        _this.transform.vel = vel;
        _this.explosionRadius = 20;
        _this.exist();
        _this.speed = 0.2;
        _this.bombTime = 0;
        _this.bombFuseTime = 2000;
        _this.spinSpeed = 0.05;
        _this.gameElementsInExplosionRange = [];
        _this.addReplayablePhysicsComponent();
        _this.addLineSprite(new BombSprite(_this.transform));
        return _this;
    }
    BombBasic.prototype.exist = function () {
        this.addCollider("General", this, this.radius);
        this.addCollider("BombBasicExplosion", this, this.explosionRadius, ["PatriotMissileSite", "Building1", "TargetBuilding"], ["General"]);
    };
    BombBasic.prototype.explode = function () {
        new _particles_StrikeTimeParticleExplosion__WEBPACK_IMPORTED_MODULE_1__.ParticleExplosion(this.gameEngine, [this.transform.pos[0], this.transform.pos[1]], 0.05);
        this.remove();
    };
    BombBasic.prototype.onCollision = function (collider, type) {
        if (type === "BombBasicExplosion") {
            this.gameElementsInExplosionRange.push(collider.gameObject);
        }
    };
    BombBasic.prototype.update = function (deltaTime) {
        this.animate(deltaTime);
        this.bombTime += deltaTime;
        if (this.bombTime >= this.bombFuseTime) {
            this.gameElementsInExplosionRange.forEach(function (gameElement) {
                gameElement === null || gameElement === void 0 ? void 0 : gameElement.hit(); // should check for destruction animation to start
            });
            this.explode();
            // should I add a collider now, or keep track of collided things
            // and tell it to explode now
        }
        this.gameElementsInExplosionRange = [];
    };
    BombBasic.prototype.animate = function (timeDelta) {
        var rotationSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        this.transform.angle = (this.transform.angle + this.spinSpeed * rotationSpeedScale) % (Math.PI * 2);
        this.lineSprite.w = 3 * easeOutQuart(this.bombTime / this.bombFuseTime + 0.01);
        // 3 is the original width
    };
    return BombBasic;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

// https://easings.net/#
function easeOutQuart(x) {
    return 0.5 * Math.pow((1 - x), 4) + 0.5;
}
var NORMAL_FRAME_TIME_DELTA = 1000 / 60;
var BombSprite = /** @class */ (function (_super) {
    __extends(BombSprite, _super);
    function BombSprite(transform) {
        var _this = _super.call(this, transform) || this;
        _this.w = 3;
        return _this;
    }
    BombSprite.prototype.draw = function (ctx) {
        ctx.save();
        this.drawBombBasic(ctx);
        ctx.restore();
    };
    BombSprite.prototype.drawBombBasic = function (ctx) {
        ctx.strokeStyle = "#32a8a8";
        ctx.lineWidth = 1;
        var w = this.w;
        var pos = this.transform.absolutePosition();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.angle);
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.moveTo(0, 3 * w); // 10
        ctx.lineTo(3 * w, 0); // 13
        ctx.lineTo(0, -3 * w); // 16
        ctx.lineTo(-3 * w, 0); // 19
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-3.5 * w, -2.5 * w); // 5
        ctx.lineTo(2.5 * w, 3.5 * w); // 6
        ctx.lineTo(3.5 * w, 2.5 * w); // 7
        ctx.lineTo(-2.5 * w, -3.5 * w); // 8
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-3.5 * w, 2.5 * w); // 1
        ctx.lineTo(-2.5 * w, 3.5 * w); // 2
        ctx.lineTo(3.5 * w, -2.5 * w); // 3
        ctx.lineTo(2.5 * w, -3.5 * w); // 4
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    };
    return BombSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_2__.LineSprite));



/***/ }),

/***/ "./src/game_objects/StrikeTime/Buildings/Building1.ts":
/*!************************************************************!*\
  !*** ./src/game_objects/StrikeTime/Buildings/Building1.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Building1: () => (/* binding */ Building1),
/* harmony export */   Building1Sprite: () => (/* binding */ Building1Sprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _particles_StrikeTimeParticleExplosion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../particles/StrikeTimeParticleExplosion */ "./src/game_objects/particles/StrikeTimeParticleExplosion.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Building1 = /** @class */ (function (_super) {
    __extends(Building1, _super);
    function Building1(engine, pos) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos = pos;
        _this.radius = 15;
        _this.lives = 1;
        _this.exist();
        _this.addLineSprite(new Building1Sprite(_this.transform));
        return _this;
    }
    Building1.prototype.exist = function () {
        this.addCollider("General", this, this.radius);
        // this doesn't actually move... so I don't think I need a physics component...
        // I can just animate it instead... but I'll have to have the animations be reversible
    };
    Building1.prototype.hit = function () {
        this.lives -= 1;
        var pos = this.transform.absolutePosition();
        if (this.lives <= 0) {
            new _particles_StrikeTimeParticleExplosion__WEBPACK_IMPORTED_MODULE_1__.ParticleExplosion(this.gameEngine, pos);
            this.remove();
        }
        // if not dead, I can have a different type of explosion
    };
    Building1.prototype.update = function (deltaTime) {
        this.animate(deltaTime);
    };
    Building1.prototype.animate = function (timeDelta) {
        // I should stick to no animation for now
        // for my own sanity
    };
    return Building1;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var NORMAL_FRAME_TIME_DELTA = 1000 / 60;
var Building1Sprite = /** @class */ (function (_super) {
    __extends(Building1Sprite, _super);
    function Building1Sprite(transform) {
        return _super.call(this, transform) || this;
    }
    Building1Sprite.prototype.draw = function (ctx) {
        ctx.save();
        this.drawBuilding1(ctx);
        ctx.restore();
    };
    Building1Sprite.prototype.drawBuilding1 = function (ctx) {
        ctx.strokeStyle = "#9de26fff";
        ctx.lineWidth = 1.5;
        var s = 1;
        var pos = this.transform.absolutePosition();
        ctx.translate(pos[0], pos[1]);
        // Piece 1: 
        ctx.beginPath();
        ctx.moveTo(0 * s, -12 * s);
        ctx.lineTo(-6 * s, -8 * s);
        ctx.lineTo(-6 * s, 0 * s);
        ctx.lineTo(6 * s, 0 * s);
        ctx.lineTo(6 * s, -8 * s);
        ctx.lineTo(12 * s, -11 * s);
        ctx.lineTo(12 * s, -3 * s);
        ctx.lineTo(6 * s, 0 * s);
        ctx.stroke();
        // Piece 2: 
        ctx.beginPath();
        ctx.moveTo(6 * s, -8 * s);
        ctx.lineTo(0 * s, -12 * s);
        ctx.lineTo(6 * s, -15 * s);
        ctx.lineTo(12 * s, -11 * s);
        ctx.stroke();
    };
    return Building1Sprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_2__.LineSprite));



/***/ }),

/***/ "./src/game_objects/StrikeTime/Buildings/TargetBuilding.ts":
/*!*****************************************************************!*\
  !*** ./src/game_objects/StrikeTime/Buildings/TargetBuilding.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TargetBuilding: () => (/* binding */ TargetBuilding),
/* harmony export */   TargetBuildingSprite: () => (/* binding */ TargetBuildingSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _particles_StrikeTimeParticleExplosion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../particles/StrikeTimeParticleExplosion */ "./src/game_objects/particles/StrikeTimeParticleExplosion.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var TargetBuilding = /** @class */ (function (_super) {
    __extends(TargetBuilding, _super);
    function TargetBuilding(engine, pos) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos = pos;
        _this.isAlive = true;
        _this.radius = 15;
        _this.lives = 1;
        _this.exist();
        _this.addLineSprite(new TargetBuildingSprite(_this.transform));
        return _this;
    }
    TargetBuilding.prototype.exist = function () {
        this.addCollider("General", this, this.radius);
        // this doesn't actually move... so I don't think I need a physics component...
        // I can just animate it instead... but I'll have to have the animations be reversible
    };
    TargetBuilding.prototype.hit = function () {
        this.lives -= 1;
        var pos = this.transform.absolutePosition();
        if (this.lives <= 0) {
            this.isAlive = false;
            new _particles_StrikeTimeParticleExplosion__WEBPACK_IMPORTED_MODULE_1__.ParticleExplosion(this.gameEngine, pos);
            this.remove();
        }
        // if not dead, I can have a different type of explosion
    };
    TargetBuilding.prototype.update = function (deltaTime) {
        this.animate(deltaTime);
    };
    TargetBuilding.prototype.animate = function (timeDelta) {
        // I should stick to no animation for now
        // for my own sanity
    };
    return TargetBuilding;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var NORMAL_FRAME_TIME_DELTA = 1000 / 60;
var TargetBuildingSprite = /** @class */ (function (_super) {
    __extends(TargetBuildingSprite, _super);
    function TargetBuildingSprite(transform) {
        return _super.call(this, transform) || this;
    }
    TargetBuildingSprite.prototype.draw = function (ctx) {
        ctx.save();
        this.drawTargetBuilding(ctx);
        ctx.restore();
    };
    TargetBuildingSprite.prototype.drawTargetBuilding = function (ctx) {
        ctx.strokeStyle = "#DAA520";
        ctx.lineWidth = 1.5;
        var s = 1;
        var pos = this.transform.absolutePosition();
        ctx.translate(pos[0], pos[1]);
        // Piece 1: 
        ctx.beginPath();
        ctx.moveTo(0 * s, -12 * s);
        ctx.lineTo(-6 * s, -8 * s);
        ctx.lineTo(-6 * s, 0 * s);
        ctx.lineTo(6 * s, 0 * s);
        ctx.lineTo(6 * s, -8 * s);
        ctx.lineTo(12 * s, -11 * s);
        ctx.lineTo(12 * s, -3 * s);
        ctx.lineTo(6 * s, 0 * s);
        ctx.stroke();
        // Piece 2: 
        ctx.beginPath();
        ctx.moveTo(6 * s, -8 * s);
        ctx.lineTo(0 * s, -12 * s);
        ctx.lineTo(6 * s, -15 * s);
        ctx.lineTo(12 * s, -11 * s);
        ctx.stroke();
    };
    return TargetBuildingSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_2__.LineSprite));



/***/ }),

/***/ "./src/game_objects/StrikeTime/Enemies/Missile.ts":
/*!********************************************************!*\
  !*** ./src/game_objects/StrikeTime/Enemies/Missile.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Missile: () => (/* binding */ Missile),
/* harmony export */   MissileSprite: () => (/* binding */ MissileSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
/* harmony import */ var _MissileExhaust__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MissileExhaust */ "./src/game_objects/StrikeTime/Enemies/MissileExhaust.ts");
/* harmony import */ var _particles_StrikeTimeParticleExplosion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../particles/StrikeTimeParticleExplosion */ "./src/game_objects/particles/StrikeTimeParticleExplosion.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var Missile = /** @class */ (function (_super) {
    __extends(Missile, _super);
    function Missile(engine, pos, vel, planeLockedOn) {
        var _this = _super.call(this, engine) || this;
        _this.lifespan = 5000;
        _this.timeAlive = 0;
        _this.fuelTime = 2200;
        _this.outOfFuel = false;
        _this.transform.pos = pos;
        _this.transform.vel = vel;
        _this.explodeRange = 3; // I could have it detect earlier and turn to face before within actual range. but this is a prototype so not now
        _this.radius = 10; // visual range, where it would be acceptable for something to be considering hitting it
        _this.exist();
        _this.lives = 1;
        _this.speed = 0.08;
        _this.planeLockedOnTransform = planeLockedOn;
        _this.addReplayablePhysicsComponent();
        _this.addLineSprite(new MissileSprite(_this.transform));
        _this.exhaust = new _MissileExhaust__WEBPACK_IMPORTED_MODULE_2__.MissileExhaust(engine, _this.transform, [
            -_this.lineSprite.w / 2,
            1.1 * _this.lineSprite.l
        ], _this.lineSprite.w);
        _this.addChildGameObject(_this.exhaust);
        return _this;
    }
    Missile.prototype.exist = function () {
        this.addCollider("General", this, this.radius);
        this.addCollider("ExplodeRange", this, this.explodeRange, ["Aurora"], ["General"]);
        // this doesn't actually move... so I don't think I need a physics component...
        // I can just animate it instead... but I'll have to have the animations be reversible
    };
    Missile.prototype.chase = function (timeDelta) {
        var speed = this.speed;
        var planePosition = this.planeLockedOnTransform.pos;
        var pos = this.transform.pos;
        var dy = planePosition[1] - pos[1];
        var dx = planePosition[0] - pos[0];
        var velocityScale = timeDelta * 0.8;
        var direction = Math.atan2(dy, dx);
        this.transform.pos[0] += speed * Math.cos(direction) * velocityScale;
        this.transform.pos[1] += speed * Math.sin(direction) * velocityScale;
        this.transform.acc[0] = 0.00007 * Math.cos(direction) * velocityScale;
        this.transform.acc[2] = 0.00007 * Math.sin(direction) * velocityScale;
        this.transform.vel[0] += this.transform.acc[0] * timeDelta;
        this.transform.vel[1] += this.transform.acc[1] * timeDelta;
    };
    Missile.prototype.onCollision = function (collider, type) {
        if (type === "ExplodeRange") {
            this.explode(collider);
        }
    };
    Missile.prototype.explode = function (collider) {
        console.log('Aurora Killed/Hit');
        (this, collider.gameObject).hit();
        // I should give them an initial velocity too so it looks more kinetic
        new _particles_StrikeTimeParticleExplosion__WEBPACK_IMPORTED_MODULE_3__.ParticleExplosion(this.gameEngine, [this.transform.pos[0], this.transform.pos[1]], 0.15);
        this.exhaust.remove();
        this.remove();
        // create missiles at the fire rate while still in range
        // will have to be done reversibly
    };
    Missile.prototype.hit = function () {
        this.lives -= 1;
        var pos = this.transform.absolutePosition();
        if (this.lives <= 0) {
            new _particles_StrikeTimeParticleExplosion__WEBPACK_IMPORTED_MODULE_3__.ParticleExplosion(this.gameEngine, pos);
            this.remove();
        }
        // if not dead, I can have a different type of explosion
    };
    Missile.prototype.update = function (deltaTime) {
        this.timeAlive += deltaTime;
        if (this.timeAlive > this.lifespan) {
            this.remove();
        }
        if (this.timeAlive > this.fuelTime) {
            this.outOfFuel = true;
            this.exhaust.remove();
        }
        this.animate(deltaTime);
        var originalPositionBeforeChase = [this.transform.pos[0], this.transform.pos[1]];
        if (!this.outOfFuel) {
            this.chase(deltaTime);
        }
        var movementDirection = 0;
        if (this.transform.vel[0] === 0 && this.transform.vel[1] === 0) {
            movementDirection = this.transform.angle;
        }
        else {
            if (!this.outOfFuel) {
                var positionDelta = [
                    this.transform.pos[0] - originalPositionBeforeChase[0],
                    this.transform.pos[1] - originalPositionBeforeChase[1]
                ];
                movementDirection = Math.atan2(positionDelta[0], -positionDelta[1]);
                this.lastMovementDirection = movementDirection;
            }
            else {
                movementDirection = this.lastMovementDirection;
            }
        }
        this.transform.angle = movementDirection - Math.PI / 2;
        // missile tracking will have to be reversible
        // honestly seems pretty shitty tough
    };
    Missile.prototype.animate = function (timeDelta) {
        // I should stick to no animation for now
        // for my own sanity
    };
    return Missile;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var NORMAL_FRAME_TIME_DELTA = 1000 / 60;
var MissileSprite = /** @class */ (function (_super) {
    __extends(MissileSprite, _super);
    function MissileSprite(transform) {
        var _this = _super.call(this, transform) || this;
        _this.l = 10;
        _this.w = 2;
        return _this;
    }
    MissileSprite.prototype.draw = function (ctx) {
        ctx.save();
        this.drawMissile(ctx);
        ctx.restore();
    };
    MissileSprite.prototype.drawMissile = function (ctx) {
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1;
        var l = this.l;
        var w = this.w;
        var n = w;
        var pos = this.transform.absolutePosition();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.angle);
        ctx.beginPath();
        ctx.moveTo(-l, -w / 2); // 4
        ctx.lineTo(0, -w / 2); // 5
        ctx.lineTo(n, 0); // 1
        ctx.lineTo(0, w / 2); // 2
        ctx.lineTo(-l, w / 2); // 3
        ctx.stroke();
    };
    return MissileSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__.LineSprite));



/***/ }),

/***/ "./src/game_objects/StrikeTime/Enemies/MissileExhaust.ts":
/*!***************************************************************!*\
  !*** ./src/game_objects/StrikeTime/Enemies/MissileExhaust.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MissileExhaust: () => (/* binding */ MissileExhaust)
/* harmony export */ });
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/color */ "./src/game_engine/color.ts");
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_engine/util */ "./src/game_engine/util.ts");
/* harmony import */ var _particles_particle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../particles/particle */ "./src/game_objects/particles/particle.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




/*
    ^
   | |
   | |
    
   |||
*/
var MissileExhaust = /** @class */ (function (_super) {
    __extends(MissileExhaust, _super);
    // the position of the exhaust is the middle of the exhaust
    function MissileExhaust(engine, transform, position, width) {
        var _this = _super.call(this, engine) || this;
        _this.transform = transform;
        _this.noAccelerationHue = 50;
        _this.isAccelerating = false;
        _this.acceleratingHue = 300;
        _this.colorRange = 40;
        _this.baseOpacity = 0.6;
        _this.opacityRange = 0.35;
        _this.maxParticleCount = 20;
        _this.currentParticleCount = 0;
        _this.positionOnMissile = position;
        _this.width = width;
        _this.currentTime = 0;
        _this.exhaustRate = 100;
        _this.isDecelerating = false;
        return _this;
    }
    // every so often, make more particles
    MissileExhaust.prototype.animate = function (deltaTime) {
    };
    MissileExhaust.prototype.update = function (deltaTime) {
        this.currentTime += deltaTime;
        if (this.currentTime > this.exhaustRate) {
            this.currentTime = 0;
            var numberToCreate = 10;
            if (!this.isDecelerating) {
                for (var i = 0; i < numberToCreate; i++) {
                    this.addMissileExhaustParticle();
                }
            }
        }
    };
    MissileExhaust.prototype.addMissileExhaustParticle = function () {
        var linePosition = Math.random() * this.width - this.width / 2;
        var angle = this.transform.angle;
        // const position: [number, number] = [
        //     this.transform.pos[0] + (this.positionOnMissile[0] + linePosition) * Math.cos(angle - Math.PI),
        //     this.transform.pos[1] + -(this.positionOnMissile[1]) * Math.sin(angle)
        // ]
        var exhaustPositionAngle = Math.atan2(this.positionOnMissile[1], this.positionOnMissile[0] + linePosition) - Math.PI / 2;
        var exhaustPositionLength = Math.sqrt(Math.pow(this.positionOnMissile[0], 2) + Math.pow((this.positionOnMissile[1] + linePosition), 2));
        var position = [
            this.transform.pos[0] - exhaustPositionLength * Math.cos(angle + exhaustPositionAngle),
            this.transform.pos[1] - exhaustPositionLength * Math.sin(angle + exhaustPositionAngle)
        ];
        var initialSpeed = this.isAccelerating ? Math.random() * 1.5 + 6 : Math.random() * 0.5 + 1;
        var initialVelocity = [initialSpeed * Math.cos(angle + Math.PI), initialSpeed * Math.sin(angle + Math.PI)];
        var hue = this.isAccelerating ? (0,_game_engine_util__WEBPACK_IMPORTED_MODULE_2__.getNumberFromRange)(this.acceleratingHue, this.colorRange) : (0,_game_engine_util__WEBPACK_IMPORTED_MODULE_2__.getNumberFromRange)(this.noAccelerationHue, this.colorRange);
        var opacity = (0,_game_engine_util__WEBPACK_IMPORTED_MODULE_2__.getNumberFromRange)(this.baseOpacity, this.opacityRange);
        var color = new _game_engine_color__WEBPACK_IMPORTED_MODULE_0__.Color("hsla", [hue, 100, 50, opacity]);
        new _particles_particle__WEBPACK_IMPORTED_MODULE_3__.Particle(this.gameEngine, position, initialVelocity, color, null, 2, 0.005);
    };
    return MissileExhaust;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__.GameObject));



/***/ }),

/***/ "./src/game_objects/StrikeTime/Enemies/PatriotMissileSite.ts":
/*!*******************************************************************!*\
  !*** ./src/game_objects/StrikeTime/Enemies/PatriotMissileSite.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PatriotMissileSite: () => (/* binding */ PatriotMissileSite),
/* harmony export */   PatriotMissileSiteSprite: () => (/* binding */ PatriotMissileSiteSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _particles_StrikeTimeParticleExplosion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../particles/StrikeTimeParticleExplosion */ "./src/game_objects/particles/StrikeTimeParticleExplosion.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
/* harmony import */ var _Missile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Missile */ "./src/game_objects/StrikeTime/Enemies/Missile.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var PatriotMissileSite = /** @class */ (function (_super) {
    __extends(PatriotMissileSite, _super);
    function PatriotMissileSite(engine, pos) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos = pos;
        _this.launchRange = 180; // I could have it detect earlier and turn to face before within actual range. but this is a prototype so not now
        _this.radius = 15;
        _this.lives = 1;
        _this.missilesPerGroup = 3;
        _this.numberOfMissilesLaunched = 0;
        _this.isMissileLaunched = false;
        _this.isGroupLaunched = false;
        _this.reloadTime = 300;
        _this.groupReloadTime = 3000;
        _this.timeSinceLaunch = 0;
        _this.timeSinceGroupLaunch = 0;
        _this.exist();
        _this.addLineSprite(new PatriotMissileSiteSprite(_this.transform));
        return _this;
    }
    PatriotMissileSite.prototype.exist = function () {
        this.addCollider("General", this, this.radius);
        this.addCollider("LaunchRange", this, this.launchRange, ["Aurora"], ["General"]);
        // this doesn't actually move... so I don't think I need a physics component...
        // I can just animate it instead... but I'll have to have the animations be reversible
    };
    PatriotMissileSite.prototype.onCollision = function (collider, type) {
        if (type === "LaunchRange") {
            this.startLaunchSequence(collider);
        }
    };
    PatriotMissileSite.prototype.startLaunchSequence = function (airplaneDetected) {
        if (!this.isMissileLaunched) {
            console.log('launching');
            this.isMissileLaunched = true;
            this.numberOfMissilesLaunched += 1;
            if (this.numberOfMissilesLaunched >= 3) {
                this.isGroupLaunched = true;
            }
            var airplanePosition = airplaneDetected.gameObject.transform.pos;
            var ourPosition = this.transform.pos;
            var dy = airplanePosition[1] - ourPosition[1];
            var dx = airplanePosition[0] - ourPosition[0];
            var direction = Math.atan2(dy, dx);
            var missileSpeed = 0.1;
            var vel = [
                missileSpeed * Math.cos(direction),
                missileSpeed * Math.sin(direction)
            ];
            var launchedMissile = new _Missile__WEBPACK_IMPORTED_MODULE_3__.Missile(this.gameEngine, [this.transform.pos[0], this.transform.pos[1]], vel, airplaneDetected.gameObject.transform);
        }
        console.log('launch missile sequencing');
        // create missiles at the fire rate while still in range
        // will have to be done reversibly
    };
    PatriotMissileSite.prototype.hit = function () {
        this.lives -= 1;
        var pos = this.transform.absolutePosition();
        if (this.lives <= 0) {
            new _particles_StrikeTimeParticleExplosion__WEBPACK_IMPORTED_MODULE_1__.ParticleExplosion(this.gameEngine, pos);
            this.remove();
        }
        // if not dead, I can have a different type of explosion
    };
    PatriotMissileSite.prototype.update = function (deltaTime) {
        this.animate(deltaTime);
        if (this.isMissileLaunched && !this.isGroupLaunched) {
            this.timeSinceLaunch += deltaTime;
            if (this.timeSinceLaunch > this.reloadTime) {
                this.isMissileLaunched = false;
                this.timeSinceLaunch = 0;
            }
        }
        if (this.isGroupLaunched) {
            this.timeSinceGroupLaunch += deltaTime;
            if (this.timeSinceGroupLaunch > this.groupReloadTime) {
                this.isMissileLaunched = false;
                this.numberOfMissilesLaunched = 0;
                this.timeSinceLaunch = 0;
                this.isGroupLaunched = false;
                this.timeSinceGroupLaunch = 0;
            }
        }
    };
    PatriotMissileSite.prototype.animate = function (timeDelta) {
        // I should stick to no animation for now
        // for my own sanity
    };
    return PatriotMissileSite;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var NORMAL_FRAME_TIME_DELTA = 1000 / 60;
var PatriotMissileSiteSprite = /** @class */ (function (_super) {
    __extends(PatriotMissileSiteSprite, _super);
    function PatriotMissileSiteSprite(transform) {
        return _super.call(this, transform) || this;
    }
    PatriotMissileSiteSprite.prototype.draw = function (ctx) {
        ctx.save();
        this.drawPatriotMissileSite(ctx);
        ctx.restore();
    };
    PatriotMissileSiteSprite.prototype.drawPatriotMissileSite = function (ctx) {
        ctx.strokeStyle = "#339966";
        ctx.lineWidth = 1.5;
        var w = 5;
        var pos = this.transform.absolutePosition();
        ctx.translate(pos[0], pos[1]);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-1 / 2 * w, 4 * w); // 7
        ctx.lineTo(1 / 5 * w, 8 * w); // 6
        ctx.lineTo(3.5 * w, 7 * w); // 5
        ctx.rotate(-Math.atan(1 / 4));
        ctx.lineTo(4 * w, 4 * w); // 3
        ctx.lineTo(0, 4 * w); // 4
        ctx.stroke();
        ctx.rotate(Math.atan(1 / 4));
        ctx.lineTo(1 / 5 * w, 8 * w); // 6
        ctx.stroke();
        ctx.rotate(-Math.atan(1 / 4));
        ctx.beginPath();
        ctx.moveTo(0, 0); // 1
        ctx.lineTo(4 * w, 0); // 2
        ctx.lineTo(4 * w, 4 * w); // 3
        ctx.lineTo(0, 4 * w); // 4
        ctx.lineTo(0, 0); // 1
        ctx.stroke();
        ctx.beginPath(); // cross
        ctx.moveTo(2 * w, 0);
        ctx.lineTo(2 * w, 4 * w);
        ctx.stroke();
        ctx.beginPath(); // cross 
        ctx.moveTo(4 * w, 2 * w);
        ctx.lineTo(0, 2 * w);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0.5 * w, 0.5 * w);
        ctx.lineTo(1.5 * w, 0.5 * w);
        ctx.lineTo(1.5 * w, 1.5 * w);
        ctx.lineTo(0.5 * w, 1.5 * w);
        ctx.lineTo(0.5 * w, 0.5 * w);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(2.5 * w, 0.5 * w);
        ctx.lineTo(3.5 * w, 0.5 * w);
        ctx.lineTo(3.5 * w, 1.5 * w);
        ctx.lineTo(2.5 * w, 1.5 * w);
        ctx.lineTo(2.5 * w, 0.5 * w);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(2.5 * w, 2.5 * w);
        ctx.lineTo(3.5 * w, 2.5 * w);
        ctx.lineTo(3.5 * w, 3.5 * w);
        ctx.lineTo(2.5 * w, 3.5 * w);
        ctx.lineTo(2.5 * w, 2.5 * w);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0.5 * w, 2.5 * w); // 24
        ctx.lineTo(1.5 * w, 2.5 * w); // 25
        ctx.lineTo(1.5 * w, 3.5 * w); // 26
        ctx.lineTo(0.5 * w, 3.5 * w); // 27
        ctx.lineTo(0.5 * w, 2.5 * w); // 24
        ctx.stroke();
    };
    return PatriotMissileSiteSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_2__.LineSprite));



/***/ }),

/***/ "./src/game_objects/StrikeTime/Levels/Level.ts":
/*!*****************************************************!*\
  !*** ./src/game_objects/StrikeTime/Levels/Level.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Level: () => (/* binding */ Level)
/* harmony export */ });
var Level = /** @class */ (function () {
    function Level(gameEngine, gameScript) {
        this.gameScript = gameScript;
        this.engine = gameEngine;
    }
    return Level;
}());



/***/ }),

/***/ "./src/game_objects/StrikeTime/Levels/LevelPrototype.ts":
/*!**************************************************************!*\
  !*** ./src/game_objects/StrikeTime/Levels/LevelPrototype.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LevelPrototype: () => (/* binding */ LevelPrototype)
/* harmony export */ });
/* harmony import */ var _Airport_Airport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Airport/Airport */ "./src/game_objects/StrikeTime/Airport/Airport.ts");
/* harmony import */ var _Airport_EndingLine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Airport/EndingLine */ "./src/game_objects/StrikeTime/Airport/EndingLine.ts");
/* harmony import */ var _Aurora_Aurora__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Aurora/Aurora */ "./src/game_objects/StrikeTime/Aurora/Aurora.ts");
/* harmony import */ var _Buildings_Building1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Buildings/Building1 */ "./src/game_objects/StrikeTime/Buildings/Building1.ts");
/* harmony import */ var _Buildings_TargetBuilding__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Buildings/TargetBuilding */ "./src/game_objects/StrikeTime/Buildings/TargetBuilding.ts");
/* harmony import */ var _Level__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Level */ "./src/game_objects/StrikeTime/Levels/Level.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var LevelPrototype = /** @class */ (function (_super) {
    __extends(LevelPrototype, _super);
    function LevelPrototype(gameEngine, gameScript) {
        var _this = _super.call(this, gameEngine, gameScript) || this;
        _this.startPosition = [500, 300, 0];
        _this.endXPosition = 650;
        return _this;
    }
    LevelPrototype.prototype.createLevel = function () {
        new _Airport_Airport__WEBPACK_IMPORTED_MODULE_0__.Airport(this.engine, [this.startPosition[0], this.startPosition[1]]);
        this.endingLine = new _Airport_EndingLine__WEBPACK_IMPORTED_MODULE_1__.EndingLine(this.engine, this.endXPosition);
        this.controlledShip = new _Aurora_Aurora__WEBPACK_IMPORTED_MODULE_2__.Aurora(this.engine, [this.startPosition[0], this.startPosition[1]]);
        // in a wide circle around the buildings
        // buildings coordinate center: [24 * 2.5 + 2000, 300 + 2.5 * 20]
        // const center_x = 24 * 2.5 + 2000;
        // const center_y = 300 + 2.5 * 20;
        // const radiusOfDefenses = 500;
        // for(let i = 0; i < 10; i++) {
        //     const positionAngle = i * (2 * Math.PI)/10;
        //     const position: [number, number] = [
        //         center_x + radiusOfDefenses * Math.cos(positionAngle),
        //         center_y + radiusOfDefenses * Math.sin(positionAngle)
        //     ]
        //     new PatriotMissileSite(this.engine, [position[0], position[1]]);
        // }
        // buildings
        for (var yPosition = 0; yPosition < 5; yPosition++) {
            for (var xPosition = 0; xPosition < 5; xPosition++) {
                if (xPosition === 3 && yPosition === 3) {
                    this.targetBuilding = new _Buildings_TargetBuilding__WEBPACK_IMPORTED_MODULE_4__.TargetBuilding(this.engine, [2000 + xPosition * 24, 300 + yPosition * 20]);
                }
                else {
                    new _Buildings_Building1__WEBPACK_IMPORTED_MODULE_3__.Building1(this.engine, [2000 + xPosition * 24, 300 + yPosition * 20]);
                }
            }
        }
    };
    LevelPrototype.prototype.update = function (deltaTime) {
    };
    LevelPrototype.prototype.runWinCondition = function () {
        if (!this.targetBuilding.isAlive && this.controlledShip.transform.pos[0] <= this.endingLine.endLineXPosition - this.controlledShip.lineSprite.length) {
            console.log('YOU WIN');
            return true;
        }
        return false;
    };
    LevelPrototype.prototype.loseCondition = function () {
    };
    LevelPrototype.prototype.loseLevel = function () {
    };
    return LevelPrototype;
}(_Level__WEBPACK_IMPORTED_MODULE_5__.Level));



/***/ }),

/***/ "./src/game_objects/StrikeTime/Levels/LoadedLevel.ts":
/*!***********************************************************!*\
  !*** ./src/game_objects/StrikeTime/Levels/LoadedLevel.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoadedLevel: () => (/* binding */ LoadedLevel)
/* harmony export */ });
/* harmony import */ var _Airport_Airport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Airport/Airport */ "./src/game_objects/StrikeTime/Airport/Airport.ts");
/* harmony import */ var _Airport_EndingLine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Airport/EndingLine */ "./src/game_objects/StrikeTime/Airport/EndingLine.ts");
/* harmony import */ var _Aurora_Aurora__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Aurora/Aurora */ "./src/game_objects/StrikeTime/Aurora/Aurora.ts");
/* harmony import */ var _Buildings_Building1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Buildings/Building1 */ "./src/game_objects/StrikeTime/Buildings/Building1.ts");
/* harmony import */ var _Buildings_TargetBuilding__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Buildings/TargetBuilding */ "./src/game_objects/StrikeTime/Buildings/TargetBuilding.ts");
/* harmony import */ var _Level__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Level */ "./src/game_objects/StrikeTime/Levels/Level.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var LoadedLevel = /** @class */ (function (_super) {
    __extends(LoadedLevel, _super);
    function LoadedLevel(gameEngine, gameScript, serializedGame) {
        var _this = _super.call(this, gameEngine, gameScript) || this;
        _this.serializedGame = serializedGame;
        _this.startPosition = [500, 300, 0];
        _this.endXPosition = 650;
        return _this;
    }
    LoadedLevel.prototype.createLevel = function () {
        this.gameScript.loadLevelContents(this.serializedGame);
        new _Airport_Airport__WEBPACK_IMPORTED_MODULE_0__.Airport(this.engine, [this.startPosition[0], this.startPosition[1]]);
        this.endingLine = new _Airport_EndingLine__WEBPACK_IMPORTED_MODULE_1__.EndingLine(this.engine, this.endXPosition);
        this.controlledShip = new _Aurora_Aurora__WEBPACK_IMPORTED_MODULE_2__.Aurora(this.engine, [this.startPosition[0], this.startPosition[1]]);
        // in a wide circle around the buildings
        // buildings coordinate center: [24 * 2.5 + 2000, 300 + 2.5 * 20]
        // const center_x = 24 * 2.5 + 2000;
        // const center_y = 300 + 2.5 * 20;
        // const radiusOfDefenses = 500;
        // for(let i = 0; i < 10; i++) {
        //     const positionAngle = i * (2 * Math.PI)/10;
        //     const position: [number, number] = [
        //         center_x + radiusOfDefenses * Math.cos(positionAngle),
        //         center_y + radiusOfDefenses * Math.sin(positionAngle)
        //     ]
        //     new PatriotMissileSite(this.engine, [position[0], position[1]]);
        // }
        // buildings
        for (var yPosition = 0; yPosition < 5; yPosition++) {
            for (var xPosition = 0; xPosition < 5; xPosition++) {
                if (xPosition === 3 && yPosition === 3) {
                    this.targetBuilding = new _Buildings_TargetBuilding__WEBPACK_IMPORTED_MODULE_4__.TargetBuilding(this.engine, [2000 + xPosition * 24, 300 + yPosition * 20]);
                }
                else {
                    new _Buildings_Building1__WEBPACK_IMPORTED_MODULE_3__.Building1(this.engine, [2000 + xPosition * 24, 300 + yPosition * 20]);
                }
            }
        }
    };
    LoadedLevel.prototype.update = function (deltaTime) {
    };
    LoadedLevel.prototype.runWinCondition = function () {
        if (!this.targetBuilding.isAlive && this.controlledShip.transform.pos[0] <= this.endingLine.endLineXPosition - this.controlledShip.lineSprite.length) {
            console.log('YOU WIN');
            return true;
        }
        return false;
    };
    LoadedLevel.prototype.loseLevel = function () {
    };
    return LoadedLevel;
}(_Level__WEBPACK_IMPORTED_MODULE_5__.Level));



/***/ }),

/***/ "./src/game_objects/StrikeTime/index.ts":
/*!**********************************************!*\
  !*** ./src/game_objects/StrikeTime/index.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Airport: () => (/* reexport safe */ _Airport_Airport__WEBPACK_IMPORTED_MODULE_0__.Airport),
/* harmony export */   Aurora: () => (/* reexport safe */ _Aurora_Aurora__WEBPACK_IMPORTED_MODULE_2__.Aurora),
/* harmony export */   B2Bomber: () => (/* reexport safe */ _B2Bomber_B2Bomber__WEBPACK_IMPORTED_MODULE_3__.B2Bomber),
/* harmony export */   BombBasic: () => (/* reexport safe */ _Bombs_BombBasic__WEBPACK_IMPORTED_MODULE_4__.BombBasic),
/* harmony export */   Building1: () => (/* reexport safe */ _Buildings_Building1__WEBPACK_IMPORTED_MODULE_5__.Building1),
/* harmony export */   EndingLine: () => (/* reexport safe */ _Airport_EndingLine__WEBPACK_IMPORTED_MODULE_1__.EndingLine),
/* harmony export */   LevelPrototype: () => (/* reexport safe */ _Levels_LevelPrototype__WEBPACK_IMPORTED_MODULE_9__.LevelPrototype),
/* harmony export */   Missile: () => (/* reexport safe */ _Enemies_Missile__WEBPACK_IMPORTED_MODULE_7__.Missile),
/* harmony export */   PatriotMissileSite: () => (/* reexport safe */ _Enemies_PatriotMissileSite__WEBPACK_IMPORTED_MODULE_8__.PatriotMissileSite),
/* harmony export */   TargetBuilding: () => (/* reexport safe */ _Buildings_TargetBuilding__WEBPACK_IMPORTED_MODULE_6__.TargetBuilding)
/* harmony export */ });
/* harmony import */ var _Airport_Airport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Airport/Airport */ "./src/game_objects/StrikeTime/Airport/Airport.ts");
/* harmony import */ var _Airport_EndingLine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Airport/EndingLine */ "./src/game_objects/StrikeTime/Airport/EndingLine.ts");
/* harmony import */ var _Aurora_Aurora__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Aurora/Aurora */ "./src/game_objects/StrikeTime/Aurora/Aurora.ts");
/* harmony import */ var _B2Bomber_B2Bomber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./B2Bomber/B2Bomber */ "./src/game_objects/StrikeTime/B2Bomber/B2Bomber.ts");
/* harmony import */ var _Bombs_BombBasic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Bombs/BombBasic */ "./src/game_objects/StrikeTime/Bombs/BombBasic.ts");
/* harmony import */ var _Buildings_Building1__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Buildings/Building1 */ "./src/game_objects/StrikeTime/Buildings/Building1.ts");
/* harmony import */ var _Buildings_TargetBuilding__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Buildings/TargetBuilding */ "./src/game_objects/StrikeTime/Buildings/TargetBuilding.ts");
/* harmony import */ var _Enemies_Missile__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Enemies/Missile */ "./src/game_objects/StrikeTime/Enemies/Missile.ts");
/* harmony import */ var _Enemies_PatriotMissileSite__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Enemies/PatriotMissileSite */ "./src/game_objects/StrikeTime/Enemies/PatriotMissileSite.ts");
/* harmony import */ var _Levels_LevelPrototype__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Levels/LevelPrototype */ "./src/game_objects/StrikeTime/Levels/LevelPrototype.ts");












/***/ }),

/***/ "./src/game_objects/Tree/Tree.ts":
/*!***************************************!*\
  !*** ./src/game_objects/Tree/Tree.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tree: () => (/* binding */ Tree),
/* harmony export */   TreeSprite: () => (/* binding */ TreeSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game_engine/util */ "./src/game_engine/util.ts");
/* harmony import */ var _TreeAnimationStates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TreeAnimationStates */ "./src/game_objects/Tree/TreeAnimationStates.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var Tree = /** @class */ (function (_super) {
    __extends(Tree, _super);
    function Tree(engine, pos, yourEntity) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos = pos;
        _this.transform.angle = 0;
        _this.yourEntity = yourEntity;
        _this.clickRadius = 50;
        _this.chopper = null;
        _this.demoAnimationTime = 3000;
        _this.demoAnimationTimeCompleted = 0;
        _this.interactions = {
            chopTree: {
                startingCondition: {
                    interactionLocation: {
                        getLocation: function () { return (_this.transform.absolutePosition()); }
                    },
                    interactionOrientation: Math.PI * 2 * 3 / 4
                }
            }
        };
        var w = Tree.baseParameters.w;
        var h = Tree.baseParameters.h;
        _this.spriteParameters = {
            tip: {
                getCoordinates: function () { return [0, -Tree.baseParameters.h / 2]; } // 1
            },
            tipWithoutBranches: {
                left: {
                    getCoordinates: function () { return [-1 / 30 * w, -Tree.baseParameters.h / 2]; } // 16
                },
                right: {
                    getCoordinates: function () { return [1 / 30 * w, -Tree.baseParameters.h / 2]; } // 17
                }
            },
            branchlessOne: {
                left: {
                    getCoordinates: function () { return [-1 / 30 * w, -Tree.baseParameters.h / 4]; } // 18
                },
                right: {
                    getCoordinates: function () { return [1 / 30 * w, -Tree.baseParameters.h / 4]; } // 19
                }
            },
            branchlessTwo: {
                left: {
                    getCoordinates: function () { return [-1 / 30 * w, 0]; } // 21
                },
                right: {
                    getCoordinates: function () { return [1 / 30 * w, 0]; } // 22
                }
            },
            branchState: 3,
            trunkShakeOffset: {
                size: 0,
                originalSize: 0,
                max: function () { return (1 / 30 * w); },
                min: function () { return (-1 / 30 * w); },
                checkSet: {
                    max: function () {
                        var max = _this.spriteParameters.trunkShakeOffset.max();
                        if (_this.spriteParameters.trunkShakeOffset.size >= max) {
                            _this.spriteParameters.trunkShakeOffset.size = max;
                            return true;
                        }
                    },
                    min: function () {
                        var min = _this.spriteParameters.trunkShakeOffset.min();
                        if (_this.spriteParameters.trunkShakeOffset.size <= min) {
                            _this.spriteParameters.trunkShakeOffset.size = min;
                            return true;
                        }
                    },
                },
                changeSize: function (shakeDifference) {
                    _this.spriteParameters.trunkShakeOffset.size += shakeDifference;
                    return _this.spriteParameters.trunkShakeOffset.checkSet.max() || _this.spriteParameters.trunkShakeOffset.checkSet.min();
                }
            },
            right: {
                topBranch: {
                    getCoordinates: function () { return [3 / 10 * w, -h / 4]; } // 2
                },
                topCorner: {
                    getCoordinates: function () { return [1 / 5 * w, -h / 4]; } // 3
                },
                middleBranch: {
                    getCoordinates: function () { return [2 / 5 * w, 0]; } // 4
                },
                middleCorner: {
                    getCoordinates: function () { return [3 / 10 * w, 0]; } // 5
                },
                bottomBranch: {
                    getCoordinates: function () { return [1 / 2 * w, h / 4]; } // 6
                },
                bottomCorner: {
                    getCoordinates: function () { return [1 / 30 * w + _this.spriteParameters.trunkShakeOffset.size, h / 4]; } // 7
                },
                trunk: {
                    getCoordinates: function () { return [1 / 30 * w + _this.spriteParameters.trunkShakeOffset.size, h / 2]; } // 8
                }
            },
            left: {
                topBranch: {
                    getCoordinates: function () { return [-3 / 10 * w, -h / 4]; } // 15
                },
                topCorner: {
                    getCoordinates: function () { return [-1 / 5 * w, -h / 4]; } // 14
                },
                middleBranch: {
                    getCoordinates: function () { return [-2 / 5 * w, 0]; } // 13
                },
                middleCorner: {
                    getCoordinates: function () { return [-3 / 10 * w, 0]; } // 12
                },
                bottomBranch: {
                    getCoordinates: function () { return [-1 / 2 * w, h / 4]; } // 11
                },
                bottomCorner: {
                    getCoordinates: function () { return [-1 / 30 * w + _this.spriteParameters.trunkShakeOffset.size, h / 4]; } // 10 
                },
                trunk: {
                    getCoordinates: function () { return [-1 / 30 * w + _this.spriteParameters.trunkShakeOffset.size, h / 2]; } // 9
                }
            }
        };
        _this.addLineSprite(new TreeSprite(_this.transform, _this.spriteParameters));
        _this.setPossibleActivitiesAndAnimations();
        _this.addClickListener();
        return _this;
    }
    Tree.prototype.chopped = function (entity) {
        this.chopper = entity;
    };
    Tree.prototype.setPossibleActivitiesAndAnimations = function () {
        var _this = this;
        this.possibleAnimations = {
            shakeTree: function () {
                _this.currentAnimation = (0,_TreeAnimationStates__WEBPACK_IMPORTED_MODULE_3__.createShakeAnimation)(_this);
            }
        };
    };
    Tree.prototype.mouseClicked = function (mousePos) {
        var centerDist = _game_engine_util__WEBPACK_IMPORTED_MODULE_2__.VectorMath.dist([this.transform.pos[0], this.transform.pos[1]], mousePos);
        // console.log({
        //     centerDist,
        //     clickRadius: this.clickRadius,
        //     inRadius: centerDist < this.clickRadius
        // });
        if (centerDist < this.clickRadius) {
            // console.log('we clicked tree');
            this.onMouseClick(mousePos);
        }
    };
    Tree.prototype.onMouseClick = function (mousePos) {
        // console.log(mousePos);
        this.yourEntity.chopTree(this);
    };
    Tree.prototype.update = function (deltaTime) {
        var _a;
        (_a = this.currentAnimation) === null || _a === void 0 ? void 0 : _a.animate(deltaTime);
        if (this.chopper) {
            this.transform.pos = [this.chopper.transform.pos[0], this.chopper.transform.pos[1] - this.chopper.treeChopLocation[1]]; // tree hold location later
        }
        this.demoAnimationTimeCompleted += deltaTime;
        if (this.demoAnimationTimeCompleted > this.demoAnimationTime) {
            this.spriteParameters.branchState = this.spriteParameters.branchState - 1;
            if (this.spriteParameters.branchState < 0) {
                this.spriteParameters.branchState = 3;
            }
            this.demoAnimationTimeCompleted = 0;
        }
    };
    Tree.prototype.animate = function () { };
    Tree.prototype.exist = function () {
        this.addCollider("General", this, 5);
    };
    Tree.baseParameters = {
        w: 30 * 4,
        h: 4 / 5 * 30 * 4
    };
    return Tree;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var TreeSprite = /** @class */ (function (_super) {
    __extends(TreeSprite, _super);
    function TreeSprite(transform, spriteParameters) {
        var _this = _super.call(this, transform) || this;
        _this.spriteParameters = spriteParameters;
        _this.color = "green";
        _this.width = Tree.baseParameters.w;
        _this.height = Tree.baseParameters.h;
        return _this;
    }
    TreeSprite.prototype.draw = function (ctx) {
        var pos = this.transform.absolutePosition();
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        if (this.spriteParameters.branchState === 3) {
            this.drawTree(ctx);
        }
        else if (this.spriteParameters.branchState === 2) {
            this.drawTwoBranchTree(ctx);
        }
        else if (this.spriteParameters.branchState === 1) {
            this.drawOneBranchTree(ctx);
        }
        else if (this.spriteParameters.branchState === 0) {
            this.drawBranchlessTree(ctx);
        }
        ctx.restore();
    };
    TreeSprite.prototype.drawBranchlessTree = function (ctx) {
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "#E4D00A";
        ctx.beginPath();
        ctx.moveTo.apply(ctx, this.spriteParameters.tipWithoutBranches.left.getCoordinates()); // 16
        ctx.lineTo.apply(// 16
        ctx, this.spriteParameters.tipWithoutBranches.right.getCoordinates()); // 17
        ctx.lineTo.apply(// 17
        ctx, this.spriteParameters.right.trunk.getCoordinates()); // 8
        ctx.lineTo.apply(// 8
        ctx, this.spriteParameters.left.trunk.getCoordinates()); // 9
        ctx.lineTo.apply(// 9
        ctx, this.spriteParameters.tipWithoutBranches.left.getCoordinates()); // 16
        ctx.stroke();
    };
    TreeSprite.prototype.drawTwoBranchTree = function (ctx) {
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "#E4D00A";
        ctx.beginPath();
        ctx.moveTo.apply(ctx, this.spriteParameters.branchlessOne.left.getCoordinates()); // 19
        ctx.lineTo.apply(// 19
        ctx, this.spriteParameters.tipWithoutBranches.left.getCoordinates()); // 16
        ctx.lineTo.apply(// 16
        ctx, this.spriteParameters.tipWithoutBranches.right.getCoordinates()); // 17
        ctx.lineTo.apply(// 17
        ctx, this.spriteParameters.branchlessOne.right.getCoordinates()); // 18
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#097969";
        ctx.beginPath();
        ctx.moveTo.apply(ctx, this.spriteParameters.branchlessOne.right.getCoordinates()); // 18
        ctx.lineTo.apply(// 18
        ctx, this.spriteParameters.right.topCorner.getCoordinates()); // 3
        ctx.lineTo.apply(// 3
        ctx, this.spriteParameters.right.middleBranch.getCoordinates()); // 4
        ctx.lineTo.apply(// 4
        ctx, this.spriteParameters.right.middleCorner.getCoordinates()); // 5
        ctx.lineTo.apply(// 5
        ctx, this.spriteParameters.right.bottomBranch.getCoordinates()); // 6
        ctx.lineTo.apply(// 6
        ctx, this.spriteParameters.right.bottomCorner.getCoordinates()); // 7
        ctx.stroke();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "#E4D00A";
        ctx.beginPath();
        ctx.moveTo.apply(ctx, this.spriteParameters.right.bottomCorner.getCoordinates()); // 7
        ctx.lineTo.apply(// 7
        ctx, this.spriteParameters.right.trunk.getCoordinates()); // 8
        ctx.lineTo.apply(// 8
        ctx, this.spriteParameters.left.trunk.getCoordinates()); // 9
        ctx.lineTo.apply(// 9
        ctx, this.spriteParameters.left.bottomCorner.getCoordinates()); // 10
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#097969";
        ctx.beginPath();
        ctx.moveTo.apply(ctx, this.spriteParameters.left.bottomCorner.getCoordinates()); // 10
        ctx.lineTo.apply(// 10
        ctx, this.spriteParameters.left.bottomBranch.getCoordinates()); // 11
        ctx.lineTo.apply(// 11
        ctx, this.spriteParameters.left.middleCorner.getCoordinates()); // 12
        ctx.lineTo.apply(// 12
        ctx, this.spriteParameters.left.middleBranch.getCoordinates()); // 13
        ctx.lineTo.apply(// 13
        ctx, this.spriteParameters.left.topCorner.getCoordinates()); // 14
        ctx.lineTo.apply(// 14
        ctx, this.spriteParameters.branchlessOne.left.getCoordinates()); // 19
        ctx.stroke();
    };
    TreeSprite.prototype.drawOneBranchTree = function (ctx) {
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "#E4D00A";
        ctx.beginPath();
        ctx.moveTo.apply(ctx, this.spriteParameters.branchlessTwo.left.getCoordinates()); // 21
        ctx.lineTo.apply(// 21
        ctx, this.spriteParameters.tipWithoutBranches.left.getCoordinates()); // 16
        ctx.lineTo.apply(// 16
        ctx, this.spriteParameters.tipWithoutBranches.right.getCoordinates()); // 17
        ctx.lineTo.apply(// 17
        ctx, this.spriteParameters.branchlessTwo.right.getCoordinates()); // 20
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#097969";
        ctx.beginPath();
        ctx.moveTo.apply(ctx, this.spriteParameters.branchlessTwo.right.getCoordinates()); // 20
        ctx.lineTo.apply(// 20
        ctx, this.spriteParameters.right.middleCorner.getCoordinates()); // 5
        ctx.lineTo.apply(// 5
        ctx, this.spriteParameters.right.bottomBranch.getCoordinates()); // 6
        ctx.lineTo.apply(// 6
        ctx, this.spriteParameters.right.bottomCorner.getCoordinates()); // 7
        ctx.stroke();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "#E4D00A";
        ctx.beginPath();
        ctx.moveTo.apply(ctx, this.spriteParameters.right.bottomCorner.getCoordinates()); // 7
        ctx.lineTo.apply(// 7
        ctx, this.spriteParameters.right.trunk.getCoordinates()); // 8
        ctx.lineTo.apply(// 8
        ctx, this.spriteParameters.left.trunk.getCoordinates()); // 9
        ctx.lineTo.apply(// 9
        ctx, this.spriteParameters.left.bottomCorner.getCoordinates()); // 10
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#097969";
        ctx.beginPath();
        ctx.moveTo.apply(ctx, this.spriteParameters.left.bottomCorner.getCoordinates()); // 10
        ctx.lineTo.apply(// 10
        ctx, this.spriteParameters.left.bottomBranch.getCoordinates()); // 11
        ctx.lineTo.apply(// 11
        ctx, this.spriteParameters.left.middleCorner.getCoordinates()); // 12
        ctx.lineTo.apply(// 12
        ctx, this.spriteParameters.branchlessTwo.left.getCoordinates()); // 21
        ctx.stroke();
    };
    TreeSprite.prototype.drawTree = function (ctx) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#097969";
        ctx.beginPath();
        ctx.moveTo.apply(ctx, this.spriteParameters.tip.getCoordinates()); // 1
        ctx.lineTo.apply(// 1
        ctx, this.spriteParameters.right.topBranch.getCoordinates()); // 2
        ctx.lineTo.apply(// 2
        ctx, this.spriteParameters.right.topCorner.getCoordinates()); // 3
        ctx.lineTo.apply(// 3
        ctx, this.spriteParameters.right.middleBranch.getCoordinates()); // 4
        ctx.lineTo.apply(// 4
        ctx, this.spriteParameters.right.middleCorner.getCoordinates()); // 5
        ctx.lineTo.apply(// 5
        ctx, this.spriteParameters.right.bottomBranch.getCoordinates()); // 6
        ctx.lineTo.apply(// 6
        ctx, this.spriteParameters.right.bottomCorner.getCoordinates()); // 7
        ctx.stroke();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "#E4D00A";
        ctx.beginPath();
        ctx.moveTo.apply(ctx, this.spriteParameters.right.bottomCorner.getCoordinates()); // 7
        ctx.lineTo.apply(// 7
        ctx, this.spriteParameters.right.trunk.getCoordinates()); // 8
        ctx.lineTo.apply(// 8
        ctx, this.spriteParameters.left.trunk.getCoordinates()); // 9
        ctx.lineTo.apply(// 9
        ctx, this.spriteParameters.left.bottomCorner.getCoordinates()); // 10
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#097969";
        ctx.beginPath();
        ctx.moveTo.apply(ctx, this.spriteParameters.left.bottomCorner.getCoordinates()); // 10
        ctx.lineTo.apply(// 10
        ctx, this.spriteParameters.left.bottomBranch.getCoordinates()); // 11
        ctx.lineTo.apply(// 11
        ctx, this.spriteParameters.left.middleCorner.getCoordinates()); // 12
        ctx.lineTo.apply(// 12
        ctx, this.spriteParameters.left.middleBranch.getCoordinates()); // 13
        ctx.lineTo.apply(// 13
        ctx, this.spriteParameters.left.topCorner.getCoordinates()); // 14
        ctx.lineTo.apply(// 14
        ctx, this.spriteParameters.left.topBranch.getCoordinates()); // 15
        ctx.lineTo.apply(// 15
        ctx, this.spriteParameters.tip.getCoordinates()); // 1
        ctx.stroke();
    };
    return TreeSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__.LineSprite));



/***/ }),

/***/ "./src/game_objects/Tree/TreeAnimationStates.ts":
/*!******************************************************!*\
  !*** ./src/game_objects/Tree/TreeAnimationStates.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createShakeAnimation: () => (/* binding */ createShakeAnimation)
/* harmony export */ });
/* harmony import */ var _game_engine_EntityState_Animate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/EntityState/Animate */ "./src/game_engine/EntityState/Animate.ts");

var createShakeLeftAnimation = function (tree) {
    var shakeRight = function (dT) {
        var offset = -dT / 10;
        return tree.spriteParameters.trunkShakeOffset.changeSize(offset);
    };
    return new _game_engine_EntityState_Animate__WEBPACK_IMPORTED_MODULE_0__.Animation('ShakeRight', { tree: tree }, shakeRight, function () { return null; });
};
var createShakeRightAnimation = function (tree) {
    var shakeRight = function (dT) {
        var offset = dT / 10;
        return tree.spriteParameters.trunkShakeOffset.changeSize(offset);
    };
    return new _game_engine_EntityState_Animate__WEBPACK_IMPORTED_MODULE_0__.Animation('ShakeRight', {}, shakeRight, function () { return null; });
};
var createShakeCenterAnimation = function (tree) {
    var shakeCenter = function (dT) {
        var offset = -dT / 10;
        tree.spriteParameters.trunkShakeOffset.size += offset;
        if (tree.spriteParameters.trunkShakeOffset.size <= 0) {
            tree.spriteParameters.trunkShakeOffset.size = 0;
            return true;
        }
        return false;
    };
    var onShakeAnimationEnd = function () {
        tree.currentAnimation = null;
    };
    return new _game_engine_EntityState_Animate__WEBPACK_IMPORTED_MODULE_0__.Animation('ShakeCenter', { tree: tree }, shakeCenter, onShakeAnimationEnd);
};
var createShakeAnimation = function (tree) {
    var shakeLeft = createShakeLeftAnimation(tree);
    var shakeRight = createShakeRightAnimation(tree);
    var shakeCenter = createShakeCenterAnimation(tree);
    var animations = [
        shakeLeft,
        shakeRight,
        shakeCenter
    ];
    return new _game_engine_EntityState_Animate__WEBPACK_IMPORTED_MODULE_0__.ParentAnimation('TreeShakeAnimation', animations);
};


/***/ }),

/***/ "./src/game_objects/enemies/Arrow/arrow.ts":
/*!*************************************************!*\
  !*** ./src/game_objects/enemies/Arrow/arrow.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Arrow: () => (/* binding */ Arrow)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/util */ "./src/game_engine/util.ts");
/* harmony import */ var _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../particles/enemy_spawn */ "./src/game_objects/particles/enemy_spawn.ts");
/* harmony import */ var _arrow_sprite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./arrow_sprite */ "./src/game_objects/enemies/Arrow/arrow_sprite.ts");
/* harmony import */ var _GEOWarsScript__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../GEOWarsScript */ "./src/GEOWarsScript.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var Arrow = /** @class */ (function (_super) {
    __extends(Arrow, _super);
    function Arrow(engine, pos, angle) {
        if (angle === void 0) { angle = Math.random() * Math.PI * 2; }
        var _this = _super.call(this, engine) || this;
        _this.transform.pos = pos;
        _this.transform.angle = angle;
        _this.speed = 3;
        _this.points = 50;
        _this.transform.vel = _game_engine_util__WEBPACK_IMPORTED_MODULE_1__.VectorMath.vectorCartesian(_this.transform.angle, _this.speed);
        _this.radius = 6;
        _this.playSound(Arrow.SPAWN_SOUND_URL);
        _this.addLineSprite(new _arrow_sprite__WEBPACK_IMPORTED_MODULE_3__.ArrowSprite(_this.transform));
        _this.addChildGameObject(new _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_2__.EnemySpawn(_this.gameEngine, _this));
        _this.exists = false;
        _this.time = 0;
        return _this;
    }
    Arrow.prototype.exist = function () {
        // leaving off subscriptions means that things will subscribe to it
        this.addCollider("General", this, this.radius);
        // now it will move
        this.addPhysicsComponent();
        this.exists = true;
    };
    Arrow.prototype.animate = function (delta) {
        this.time += delta;
        var cycleSpeedScale = delta / NORMAL_FRAME_TIME_DELTA;
        var cycleSpeed = 0.004;
        // const widthRotate = Math.sin(this.time * cycleSpeedScale * cycleSpeed);
        var twoFullRotationCheck = this.time * cycleSpeedScale * cycleSpeed;
        if (twoFullRotationCheck >= Math.PI * 2 * 4) {
            this.time = 0;
        }
        this.lineSprite.yRotation = this.time * cycleSpeedScale * cycleSpeed;
        this.lineSprite.widthScaleForRotation = Math.sin(this.time * cycleSpeedScale * cycleSpeed);
        this.lineSprite.zScaleForRotation = Math.sin(this.time * cycleSpeedScale * cycleSpeed + Math.PI / 2);
    };
    Arrow.prototype.update = function (delta) {
        // ADD TO UPDATE FOR THE OBJECTS
        this.animate(delta);
        var pos = this.transform.absolutePosition();
        if (_GEOWarsScript__WEBPACK_IMPORTED_MODULE_4__.GEOWarsScript.isOutOfBounds(pos, this.radius)) {
            _GEOWarsScript__WEBPACK_IMPORTED_MODULE_4__.GEOWarsScript.redirect(this.transform);
        }
    };
    Arrow.SPAWN_SOUND_URL = "sounds/Enemy_spawn_purple.wav";
    return Arrow;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var NORMAL_FRAME_TIME_DELTA = 1000 / 60;


/***/ }),

/***/ "./src/game_objects/enemies/Arrow/arrow_sprite.ts":
/*!********************************************************!*\
  !*** ./src/game_objects/enemies/Arrow/arrow_sprite.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArrowSprite: () => (/* binding */ ArrowSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ArrowSprite = /** @class */ (function (_super) {
    __extends(ArrowSprite, _super);
    function ArrowSprite(transform, spawningScale) {
        if (spawningScale === void 0) { spawningScale = 1; }
        var _this = _super.call(this, transform) || this;
        _this.spawningScale = spawningScale;
        _this.widthScaleForRotation = 1;
        _this.zScaleForRotation = 0;
        _this.yRotation = 0;
        return _this;
    }
    ArrowSprite.prototype.draw = function (ctx) {
        if (!this.visible)
            return;
        var pos = this.transform.absolutePosition();
        var spawningScale = this.spawningScale || 1;
        var shipLength = 10.5 * 2.2 * spawningScale;
        var shipWidth = 9 * 2.2 * spawningScale;
        var l = shipLength;
        var w = shipWidth * this.widthScaleForRotation;
        var z = shipWidth * this.zScaleForRotation;
        var movementDirection = 0;
        if (this.transform.vel[0] === 0 && this.transform.vel[1] === 0) {
            movementDirection = this.transform.angle;
        }
        else {
            movementDirection = Math.atan2(this.transform.vel[0], -this.transform.vel[1]);
        }
        var r = 255;
        var g = 255;
        var b = 50;
        ctx.save();
        ctx.beginPath();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(movementDirection + 1 * Math.PI);
        // ctx.strokeStyle = "#f2ff00"; // look up rgb and put here
        // ctx.lineWidth = 2 / 2;
        ctx.shadowColor = "rgb(255,255,255)";
        ctx.shadowBlur = 1.5;
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        var lineWidth = 2;
        var rightLineWidth = lineWidth + 2.5 * Math.sin(this.yRotation + Math.PI / 2);
        var leftLineWidth = lineWidth - 2.5 * Math.sin(this.yRotation + Math.PI / 2);
        var topLineWidth = lineWidth + 2.5 * Math.sin(this.yRotation);
        var bottomLineWidth = lineWidth - 2.5 * Math.sin(this.yRotation);
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
        this.drawArrow(ctx, l, w, z, rightLineWidth * 0.75, leftLineWidth * 0.75, topLineWidth * 0.75, bottomLineWidth * 0.75);
        this.drawArrow(ctx, l, w, z, rightLineWidth * 0.6, leftLineWidth * 0.6, topLineWidth * 0.6, bottomLineWidth * 0.6);
        this.drawArrow(ctx, l, w, z, rightLineWidth * 0.45, leftLineWidth * 0.45, topLineWidth * 0.45, bottomLineWidth * 0.45);
        this.drawArrow(ctx, l, w, z, rightLineWidth * 0.3, leftLineWidth * 0.3, topLineWidth * 0.3, bottomLineWidth * 0.3);
        ctx.strokeStyle = "rgb(255, 255, 255)";
        // this should be half the other line width for the effect, even after adding sin
        this.drawArrow(ctx, l, w, z, rightLineWidth * 0.15, leftLineWidth * 0.15, topLineWidth * 0.15, bottomLineWidth * 0.15);
        ctx.restore();
    };
    ArrowSprite.prototype.drawArrow = function (ctx, l, w, z, rightLineWidth, leftLineWidth, topLineWidth, bottomLineWidth) {
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
    };
    return ArrowSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__.LineSprite));

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

/***/ "./src/game_objects/enemies/BoxBox/boxbox.ts":
/*!***************************************************!*\
  !*** ./src/game_objects/enemies/BoxBox/boxbox.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BoxBox: () => (/* binding */ BoxBox)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _GEOWarsScript__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../GEOWarsScript */ "./src/GEOWarsScript.ts");
/* harmony import */ var _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../particles/enemy_spawn */ "./src/game_objects/particles/enemy_spawn.ts");
/* harmony import */ var _boxbox_sprite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./boxbox_sprite */ "./src/game_objects/enemies/BoxBox/boxbox_sprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};




var BoxBox = /** @class */ (function (_super) {
    __extends(BoxBox, _super);
    function BoxBox(engine, pos) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos = pos;
        _this.radius = 10;
        _this.points = 20;
        // this.addPhysicsComponent()
        // there's only two versions of this coordinate object
        // 1. bottom left, top right
        // 2. top left, bottom right
        // the axis of rotation determines the length of the line for the _ coordinates
        _this.projectedDrawCoordinates = {
            BottomSquareBL: __spreadArray([], BoxBox.drawCoordinatesBottomLeft.BottomSquareBL, true),
            BottomSquareBR: __spreadArray([], BoxBox.drawCoordinatesBottomLeft.BottomSquareBR, true),
            BottomSquareTL: __spreadArray([], BoxBox.drawCoordinatesBottomLeft.BottomSquareTL, true),
            BottomSquareTR: __spreadArray([], BoxBox.drawCoordinatesBottomLeft.BottomSquareTR, true),
            TopSquareBL: __spreadArray([], BoxBox.drawCoordinatesBottomLeft.TopSquareBL, true),
            TopSquareBR: __spreadArray([], BoxBox.drawCoordinatesBottomLeft.TopSquareBR, true),
            TopSquareTL: __spreadArray([], BoxBox.drawCoordinatesBottomLeft.TopSquareTL, true),
            TopSquareTR: __spreadArray([], BoxBox.drawCoordinatesBottomLeft.TopSquareTR, true),
            _BottomSquareBL: __spreadArray([], BoxBox.drawCoordinatesBottomLeft._BottomSquareBL, true),
            _BottomSquareBR: __spreadArray([], BoxBox.drawCoordinatesBottomLeft._BottomSquareBR, true),
            _BottomSquareTL: __spreadArray([], BoxBox.drawCoordinatesBottomLeft._BottomSquareTL, true),
            _BottomSquareTR: __spreadArray([], BoxBox.drawCoordinatesBottomLeft._BottomSquareTR, true),
            _TopSquareBL: __spreadArray([], BoxBox.drawCoordinatesBottomLeft._TopSquareBL, true),
            _TopSquareBR: __spreadArray([], BoxBox.drawCoordinatesBottomLeft._TopSquareBR, true),
            _TopSquareTL: __spreadArray([], BoxBox.drawCoordinatesBottomLeft._TopSquareTL, true),
            _TopSquareTR: __spreadArray([], BoxBox.drawCoordinatesBottomLeft._TopSquareTR, true),
        };
        _this.rotationState = {
            animationState: "Paused",
            rotationDirection: "Left",
            coordinateShift: [3 / 4 * BoxBox.w, 0],
            rotationAngle: 0,
            stateTime: 0,
            shapeState: "TopLeft",
            positionShift: [0, 0],
            midPauseTime: 400,
            pauseTime: 1000,
        };
        _this.addLineSprite(new _boxbox_sprite__WEBPACK_IMPORTED_MODULE_3__.BoxBoxSprite(_this.transform, _this.rotationState, _this.projectedDrawCoordinates));
        _this.addChildGameObject(new _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_2__.EnemySpawn(_this.gameEngine, _this));
        _this.playSound(BoxBox.SPAWN_SOUND_URL);
        return _this;
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
    // switch to the other shape state
    // switch to the other rotation direction
    BoxBox.prototype.setupCompleteRotation = function () {
        var rotationDirection = this.rotationState.rotationDirection;
        var shapeState = this.rotationState.shapeState;
        this.rotationState.shapeState = shapeState === "TopLeft" ? "BottomLeft" : "TopLeft";
        if (rotationDirection === "Top") {
            this.setRotationDirectionProperties("Bottom");
        }
        else if (rotationDirection === "Bottom") {
            this.setRotationDirectionProperties("Top");
        }
        else if (rotationDirection === "Left") {
            this.setRotationDirectionProperties("Right");
        }
        else if (rotationDirection === "Right") {
            this.setRotationDirectionProperties("Left");
        }
    };
    // let's just do flat boxbox rotation for now
    // Bottom rotation first
    // rotate until 90 degrees, pause, then unrotate until 0 degrees
    BoxBox.prototype.animate = function (deltaTime) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14;
        var animationState = this.rotationState.animationState;
        var rotationAngle = this.rotationState.rotationAngle;
        var coordinateShift = this.rotationState.coordinateShift;
        // defined statically above this class
        var projectedDrawCoordinates = this.projectedDrawCoordinates;
        var midPauseTime = this.rotationState.midPauseTime;
        var pauseTime = this.rotationState.pauseTime;
        var originalAngle = rotationAngle;
        if (animationState === "Rotating") {
            this.rotationState.positionShift = [0, 0];
            if (rotationAngle < Math.PI / 2) {
                rotationAngle += Math.PI / 2 * deltaTime / 1000;
            }
            else {
                rotationAngle = Math.PI / 2;
                originalAngle = Math.PI / 2;
                this.rotationState.animationState = "MidPaused";
                // next rotation axis will be grabbed
            }
        }
        else if (animationState === "MidPaused") {
            this.rotationState.stateTime += deltaTime;
            // this.rotationState.positionShift[0] = this.rotationState.positionShift[0] * -1;
            // this.rotationState.positionShift[1] = this.rotationState.positionShift[1] * -1;
            if (this.rotationState.stateTime > midPauseTime) {
                this.rotationState.stateTime = 0;
                this.rotationState.animationState = "CompletingRotation";
                this.setupCompleteRotation();
            }
        }
        else if (animationState === "CompletingRotation") {
            // after the mid pause, we should continue the rotation
            if (rotationAngle > 0) {
                // this isn't general yet, since we can rotate up to 2 pi.. 
                // but that won't work since it could change to an orthogonal
                // direction of rotation
                rotationAngle -= Math.PI / 2 * deltaTime / 1000;
            }
            else {
                rotationAngle = 0;
                originalAngle = 0;
                this.rotationState.animationState = "Paused";
            }
        }
        else if (animationState === "Paused") {
            this.rotationState.stateTime += deltaTime;
            if (this.rotationState.stateTime > pauseTime) {
                this.rotationState.stateTime = 0;
                this.rotationState.animationState = "Rotating";
                this.startRotation();
            }
        }
        var rotationDirection = this.rotationState.rotationDirection;
        this.rotationState.rotationAngle = rotationAngle;
        // calculating the length and original angle once is faster than every frame
        // #optimization
        var w = BoxBox.boxWidth;
        var d = BoxBox.boxDepth;
        var positionChange = (Math.sqrt(Math.pow((3 / 2 * w), 2) + Math.pow(d, 2)) / 2) * Math.cos((originalAngle + Math.atan(d / (3 / 2 * w)))) -
            (Math.sqrt(Math.pow((3 / 2 * w), 2) + Math.pow(d, 2)) / 2) * Math.cos((rotationAngle + Math.atan(d / (3 / 2 * w))));
        var drawPositionChange = (3 / 2 * w) / 2 - (Math.sqrt(Math.pow((3 / 2 * w), 2) + Math.pow(d, 2)) / 2) * Math.cos((rotationAngle + Math.atan(d / (3 / 2 * w))));
        if (rotationDirection === "Top") { // because y is upside down
            this.transform.pos[1] -= positionChange;
            this.rotationState.positionShift[1] = -drawPositionChange;
        }
        else if (rotationDirection === "Bottom") {
            this.transform.pos[1] += positionChange;
            this.rotationState.positionShift[1] = drawPositionChange;
        }
        else if (rotationDirection === "Left") {
            this.transform.pos[0] -= positionChange;
            this.rotationState.positionShift[0] = -drawPositionChange;
        }
        else if (rotationDirection === "Right") {
            this.transform.pos[0] += positionChange;
            this.rotationState.positionShift[0] = drawPositionChange;
        }
        // depending on which rotation direction, the coordinate shift will be different
        // apply rotation angle to coordinates
        var projectedWidthScale = [1, 1];
        if (rotationDirection === "Top" || rotationDirection === "Bottom") {
            projectedWidthScale[1] = Math.cos(rotationAngle);
        }
        else if (rotationDirection === "Left" || rotationDirection === "Right") {
            projectedWidthScale[0] = Math.cos(rotationAngle);
        }
        // might be faster to do this as an array we map over and then draw with
        // I can use the hard coded values directly when not rotating
        // I think BottomLeft vs TopLeft will be no longer needed if we can continue to rotate past 90 degrees
        // except theres issues there since it can rotate in any direction after getting to 180 degrees
        // I think I'll have to then swap points to the reversed version
        var drawCoordinates = this.rotationState.shapeState === "BottomLeft" ? BoxBox.drawCoordinatesBottomLeft : BoxBox.drawCoordinatesTopLeft;
        var _15 = drawCoordinates.BottomSquareBL, x = _15[0], y = _15[1];
        var angleOffset = 0;
        projectedDrawCoordinates.BottomSquareBL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
        _a = drawCoordinates.BottomSquareBR, x = _a[0], y = _a[1];
        projectedDrawCoordinates.BottomSquareBR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
        _b = drawCoordinates.BottomSquareTL, x = _b[0], y = _b[1];
        projectedDrawCoordinates.BottomSquareTL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
        _c = drawCoordinates.BottomSquareTR, x = _c[0], y = _c[1];
        projectedDrawCoordinates.BottomSquareTR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
        _d = drawCoordinates.TopSquareBL, x = _d[0], y = _d[1];
        projectedDrawCoordinates.TopSquareBL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
        _e = drawCoordinates.TopSquareBR, x = _e[0], y = _e[1];
        projectedDrawCoordinates.TopSquareBR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
        _f = drawCoordinates.TopSquareTL, x = _f[0], y = _f[1];
        projectedDrawCoordinates.TopSquareTL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
        _g = drawCoordinates.TopSquareTR, x = _g[0], y = _g[1];
        projectedDrawCoordinates.TopSquareTR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
        if (rotationDirection === "Left") {
            var drawCoordinatesLeft = drawCoordinates.Left;
            // rotationAngle += Math.PI;
            // distances to axis of rotation, [x, y, angleOffset], y is the same, x requires pythag;
            _h = drawCoordinatesLeft._BottomSquareBL, x = _h[0], y = _h[1], angleOffset = _h[2];
            projectedDrawCoordinates._BottomSquareBL = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
            _j = drawCoordinatesLeft._BottomSquareBR, x = _j[0], y = _j[1], angleOffset = _j[2];
            projectedDrawCoordinates._BottomSquareBR = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
            _k = drawCoordinatesLeft._BottomSquareTL, x = _k[0], y = _k[1], angleOffset = _k[2];
            projectedDrawCoordinates._BottomSquareTL = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
            _l = drawCoordinatesLeft._BottomSquareTR, x = _l[0], y = _l[1], angleOffset = _l[2];
            projectedDrawCoordinates._BottomSquareTR = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
            _m = drawCoordinatesLeft._TopSquareBL, x = _m[0], y = _m[1], angleOffset = _m[2];
            projectedDrawCoordinates._TopSquareBL = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
            _o = drawCoordinatesLeft._TopSquareBR, x = _o[0], y = _o[1], angleOffset = _o[2];
            projectedDrawCoordinates._TopSquareBR = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
            _p = drawCoordinatesLeft._TopSquareTL, x = _p[0], y = _p[1], angleOffset = _p[2];
            projectedDrawCoordinates._TopSquareTL = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
            _q = drawCoordinatesLeft._TopSquareTR, x = _q[0], y = _q[1], angleOffset = _q[2];
            projectedDrawCoordinates._TopSquareTR = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
        }
        if (rotationDirection === "Right") {
            var drawCoordinatesRight = drawCoordinates.Right;
            rotationAngle += Math.PI;
            // distances to axis of rotation, [x, y, angleOffset], y is the same, x requires pythag;
            _r = drawCoordinatesRight._BottomSquareBL, x = _r[0], y = _r[1], angleOffset = _r[2];
            projectedDrawCoordinates._BottomSquareBL = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
            _s = drawCoordinatesRight._BottomSquareBR, x = _s[0], y = _s[1], angleOffset = _s[2];
            projectedDrawCoordinates._BottomSquareBR = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
            _t = drawCoordinatesRight._BottomSquareTL, x = _t[0], y = _t[1], angleOffset = _t[2];
            projectedDrawCoordinates._BottomSquareTL = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
            _u = drawCoordinatesRight._BottomSquareTR, x = _u[0], y = _u[1], angleOffset = _u[2];
            projectedDrawCoordinates._BottomSquareTR = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
            _v = drawCoordinatesRight._TopSquareBL, x = _v[0], y = _v[1], angleOffset = _v[2];
            projectedDrawCoordinates._TopSquareBL = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
            _w = drawCoordinatesRight._TopSquareBR, x = _w[0], y = _w[1], angleOffset = _w[2];
            projectedDrawCoordinates._TopSquareBR = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
            _x = drawCoordinatesRight._TopSquareTL, x = _x[0], y = _x[1], angleOffset = _x[2];
            projectedDrawCoordinates._TopSquareTL = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
            _y = drawCoordinatesRight._TopSquareTR, x = _y[0], y = _y[1], angleOffset = _y[2];
            projectedDrawCoordinates._TopSquareTR = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
        }
        if (rotationDirection === "Top") {
            var drawCoordinatesTop = drawCoordinates.Top;
            // rotationAngle += Math.PI;
            // distances to axis of rotation, [x, y, angleOffset], x is the same, y requires pythag;
            _z = drawCoordinatesTop._BottomSquareBL, x = _z[0], y = _z[1], angleOffset = _z[2];
            projectedDrawCoordinates._BottomSquareBL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
            _0 = drawCoordinatesTop._BottomSquareBR, x = _0[0], y = _0[1], angleOffset = _0[2];
            projectedDrawCoordinates._BottomSquareBR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
            _1 = drawCoordinatesTop._BottomSquareTL, x = _1[0], y = _1[1], angleOffset = _1[2];
            projectedDrawCoordinates._BottomSquareTL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
            _2 = drawCoordinatesTop._BottomSquareTR, x = _2[0], y = _2[1], angleOffset = _2[2];
            projectedDrawCoordinates._BottomSquareTR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
            _3 = drawCoordinatesTop._TopSquareBL, x = _3[0], y = _3[1], angleOffset = _3[2];
            projectedDrawCoordinates._TopSquareBL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
            _4 = drawCoordinatesTop._TopSquareBR, x = _4[0], y = _4[1], angleOffset = _4[2];
            projectedDrawCoordinates._TopSquareBR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
            _5 = drawCoordinatesTop._TopSquareTL, x = _5[0], y = _5[1], angleOffset = _5[2];
            projectedDrawCoordinates._TopSquareTL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
            _6 = drawCoordinatesTop._TopSquareTR, x = _6[0], y = _6[1], angleOffset = _6[2];
            projectedDrawCoordinates._TopSquareTR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
        }
        if (rotationDirection === "Bottom") {
            var drawCoordinatesBottom = drawCoordinates.Bottom;
            // rotationAngle += Math.PI;
            // distances to axis of rotation, [x, y, angleOffset], x is the same, y requires pythag;
            _7 = drawCoordinatesBottom._BottomSquareBL, x = _7[0], y = _7[1], angleOffset = _7[2];
            projectedDrawCoordinates._BottomSquareBL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
            _8 = drawCoordinatesBottom._BottomSquareBR, x = _8[0], y = _8[1], angleOffset = _8[2];
            projectedDrawCoordinates._BottomSquareBR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
            _9 = drawCoordinatesBottom._BottomSquareTL, x = _9[0], y = _9[1], angleOffset = _9[2];
            projectedDrawCoordinates._BottomSquareTL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
            _10 = drawCoordinatesBottom._BottomSquareTR, x = _10[0], y = _10[1], angleOffset = _10[2];
            projectedDrawCoordinates._BottomSquareTR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
            _11 = drawCoordinatesBottom._TopSquareBL, x = _11[0], y = _11[1], angleOffset = _11[2];
            projectedDrawCoordinates._TopSquareBL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
            _12 = drawCoordinatesBottom._TopSquareBR, x = _12[0], y = _12[1], angleOffset = _12[2];
            projectedDrawCoordinates._TopSquareBR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
            _13 = drawCoordinatesBottom._TopSquareTL, x = _13[0], y = _13[1], angleOffset = _13[2];
            projectedDrawCoordinates._TopSquareTL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
            _14 = drawCoordinatesBottom._TopSquareTR, x = _14[0], y = _14[1], angleOffset = _14[2];
            projectedDrawCoordinates._TopSquareTR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
        }
        // I do not need to consider the coordinate shift for the prime coordinates
        // I do for the non-primes because they are drawn from the center of the BoxBox, and are more general
    };
    BoxBox.prototype.setRotationDirectionProperties = function (rotationDirection) {
        var w = BoxBox.boxWidth;
        var coordinateShift = this.rotationState.coordinateShift;
        if (rotationDirection === "Top") {
            coordinateShift[0] = 0;
            coordinateShift[1] = 3 / 4 * w;
        }
        else if (rotationDirection === "Bottom") {
            coordinateShift[0] = 0;
            coordinateShift[1] = -3 / 4 * w;
        }
        else if (rotationDirection === "Left") {
            coordinateShift[0] = 3 / 4 * w;
            coordinateShift[1] = 0;
        }
        else if (rotationDirection === "Right") {
            coordinateShift[0] = -3 / 4 * w;
            coordinateShift[1] = 0;
        }
        this.rotationState.rotationDirection = rotationDirection;
    };
    BoxBox.prototype.startRotation = function () {
        // pick rotation direction
        // if (this.rotationState.rotationDirection === "Bottom") {
        //     this.rotationState.shapeState = this.rotationState.shapeState === "TopLeft" ? "BottomLeft" : "TopLeft";
        // }
        // const directionsMap = {Top: "Right", Right: "Bottom", Bottom: "Left", Left: "Top"};
        // pick random rotation direction 
        var rotationDirection = BoxBox.rotationDirections[Math.floor(Math.random() * BoxBox.rotationDirections.length)];
        // const rotationDirection = directionsMap[this.rotationState.rotationDirection];
        this.setRotationDirectionProperties(rotationDirection);
    };
    BoxBox.prototype.continueRotation = function () {
        // swap points, change coordinate shift
    };
    BoxBox.prototype.exist = function () {
        // leaving off subscriptions means that things will subscribe to it
        this.addCollider("General", this, this.radius);
        // now it will move
        this.addPhysicsComponent();
    };
    BoxBox.prototype.wallGraze = function () {
        _GEOWarsScript__WEBPACK_IMPORTED_MODULE_1__.GEOWarsScript.wallGraze(this.transform, this.radius);
    };
    BoxBox.prototype.update = function (delta) {
        this.animate(delta);
        if (_GEOWarsScript__WEBPACK_IMPORTED_MODULE_1__.GEOWarsScript.isOutOfBounds(this.transform.absolutePosition(), this.radius * 2)) {
            this.wallGraze();
        }
    };
    BoxBox.boxWidth = 13;
    BoxBox.boxDepth = BoxBox.boxWidth / 2.2;
    BoxBox.w = BoxBox.boxWidth;
    BoxBox.d = BoxBox.boxDepth;
    BoxBox.drawCoordinatesTopLeft = {
        // try making y negativified
        BottomSquareBL: [-3 / 4 * BoxBox.w, 3 / 4 * BoxBox.w],
        BottomSquareBR: [1 / 4 * BoxBox.w, 3 / 4 * BoxBox.w],
        BottomSquareTL: [-3 / 4 * BoxBox.w, -1 / 4 * BoxBox.w],
        BottomSquareTR: [1 / 4 * BoxBox.w, -1 / 4 * BoxBox.w],
        TopSquareBL: [-1 / 4 * BoxBox.w, 1 / 4 * BoxBox.w],
        TopSquareBR: [3 / 4 * BoxBox.w, 1 / 4 * BoxBox.w],
        TopSquareTL: [-1 / 4 * BoxBox.w, -3 / 4 * BoxBox.w],
        TopSquareTR: [3 / 4 * BoxBox.w, -3 / 4 * BoxBox.w],
        Left: {
            // take these distances to the axis of rotation, and then multiply them by cos(angle) of rotation
            _BottomSquareBL: [BoxBox.d, 3 / 4 * BoxBox.w, Math.PI / 2], // angle starts 90 degrees 
            _BottomSquareBR: [Math.sqrt(Math.pow(BoxBox.w, 2) + Math.pow(BoxBox.d, 2)), 3 / 4 * BoxBox.w, Math.atan(BoxBox.d / BoxBox.w)], // scaled length is distance from axis of rotation
            _BottomSquareTL: [BoxBox.d, -1 / 4 * BoxBox.w, Math.PI / 2],
            _BottomSquareTR: [Math.sqrt(Math.pow(BoxBox.w, 2) + Math.pow(BoxBox.d, 2)), -1 / 4 * BoxBox.w, Math.atan(BoxBox.d / BoxBox.w)],
            _TopSquareBL: [Math.sqrt(Math.pow((BoxBox.w / 2), 2) + Math.pow(BoxBox.d, 2)), 1 / 4 * BoxBox.w, Math.atan(BoxBox.d / (BoxBox.w / 2))],
            _TopSquareBR: [Math.sqrt(Math.pow((3 / 2 * BoxBox.w), 2) + Math.pow(BoxBox.d, 2)), 1 / 4 * BoxBox.w, Math.atan(BoxBox.d / (3 / 2 * BoxBox.w))],
            _TopSquareTL: [Math.sqrt(Math.pow((BoxBox.w / 2), 2) + Math.pow(BoxBox.d, 2)), -3 / 4 * BoxBox.w, Math.atan(BoxBox.d / (BoxBox.w / 2))],
            _TopSquareTR: [Math.sqrt(Math.pow((3 / 2 * BoxBox.w), 2) + Math.pow(BoxBox.d, 2)), -3 / 4 * BoxBox.w, Math.atan(BoxBox.d / (3 / 2 * BoxBox.w))]
        },
        Right: {
            _BottomSquareBL: [Math.sqrt(Math.pow((3 / 2 * BoxBox.w), 2) + Math.pow(BoxBox.d, 2)), 3 / 4 * BoxBox.w, Math.atan(BoxBox.d / (3 / 2 * BoxBox.w))], // angle starts 90 degrees 
            _BottomSquareBR: [Math.sqrt(Math.pow((BoxBox.w / 2), 2) + Math.pow(BoxBox.d, 2)), 3 / 4 * BoxBox.w, Math.atan(BoxBox.d / (BoxBox.w / 2))],
            _BottomSquareTL: [Math.sqrt(Math.pow((3 / 2 * BoxBox.w), 2) + Math.pow(BoxBox.d, 2)), -1 / 4 * BoxBox.w, Math.atan(BoxBox.d / (3 / 2 * BoxBox.w))],
            _BottomSquareTR: [Math.sqrt(Math.pow((BoxBox.w / 2), 2) + Math.pow(BoxBox.d, 2)), -1 / 4 * BoxBox.w, Math.atan(BoxBox.d / (BoxBox.w / 2))],
            _TopSquareBL: [Math.sqrt(Math.pow(BoxBox.w, 2) + Math.pow(BoxBox.d, 2)), 1 / 4 * BoxBox.w, Math.atan(BoxBox.d / BoxBox.w)],
            _TopSquareBR: [BoxBox.d, 1 / 4 * BoxBox.w, Math.PI / 2],
            _TopSquareTL: [Math.sqrt(Math.pow(BoxBox.w, 2) + Math.pow(BoxBox.d, 2)), -3 / 4 * BoxBox.w, Math.atan(BoxBox.d / BoxBox.w)],
            _TopSquareTR: [BoxBox.d, -3 / 4 * BoxBox.w, Math.PI / 2]
        },
        Top: {
            _BottomSquareBL: [-3 / 4 * BoxBox.w, BoxBox.d, -Math.PI / 2],
            _BottomSquareBR: [1 / 4 * BoxBox.w, BoxBox.d, -Math.PI / 2],
            _BottomSquareTL: [-3 / 4 * BoxBox.w, -Math.sqrt(Math.pow(BoxBox.w, 2) + Math.pow(BoxBox.d, 2)), Math.atan(BoxBox.d / BoxBox.w)],
            _BottomSquareTR: [1 / 4 * BoxBox.w, -Math.sqrt(Math.pow(BoxBox.w, 2) + Math.pow(BoxBox.d, 2)), Math.atan(BoxBox.d / BoxBox.w)],
            _TopSquareBL: [-1 / 4 * BoxBox.w, -Math.sqrt(Math.pow((BoxBox.w / 2), 2) + Math.pow(BoxBox.d, 2)), Math.atan(BoxBox.d / (BoxBox.w / 2))],
            _TopSquareBR: [3 / 4 * BoxBox.w, -Math.sqrt(Math.pow((BoxBox.w / 2), 2) + Math.pow(BoxBox.d, 2)), Math.atan(BoxBox.d / (BoxBox.w / 2))],
            _TopSquareTL: [-1 / 4 * BoxBox.w, -Math.sqrt(Math.pow((3 / 2 * BoxBox.w), 2) + Math.pow(BoxBox.d, 2)), Math.atan(BoxBox.d / (3 / 2 * BoxBox.w))],
            _TopSquareTR: [3 / 4 * BoxBox.w, -Math.sqrt(Math.pow((3 / 2 * BoxBox.w), 2) + Math.pow(BoxBox.d, 2)), Math.atan(BoxBox.d / (3 / 2 * BoxBox.w))],
        },
        Bottom: {
            // BL <=> TR, TL <=> BR
            _BottomSquareBL: [-3 / 4 * BoxBox.w, Math.sqrt(Math.pow((3 / 2 * BoxBox.w), 2) + Math.pow(BoxBox.d, 2)), Math.atan(BoxBox.d / (3 / 2 * BoxBox.w))],
            _BottomSquareBR: [1 / 4 * BoxBox.w, Math.sqrt(Math.pow((3 / 2 * BoxBox.w), 2) + Math.pow(BoxBox.d, 2)), Math.atan(BoxBox.d / (3 / 2 * BoxBox.w))],
            _BottomSquareTL: [-3 / 4 * BoxBox.w, Math.sqrt(Math.pow((BoxBox.w / 2), 2) + Math.pow(BoxBox.d, 2)), Math.atan(BoxBox.d / (BoxBox.w / 2))],
            _BottomSquareTR: [1 / 4 * BoxBox.w, Math.sqrt(Math.pow((BoxBox.w / 2), 2) + Math.pow(BoxBox.d, 2)), Math.atan(BoxBox.d / (BoxBox.w / 2))],
            _TopSquareBL: [-1 / 4 * BoxBox.w, Math.sqrt(Math.pow(BoxBox.w, 2) + Math.pow(BoxBox.d, 2)), Math.atan(BoxBox.d / BoxBox.w)],
            _TopSquareBR: [3 / 4 * BoxBox.w, Math.sqrt(Math.pow(BoxBox.w, 2) + Math.pow(BoxBox.d, 2)), Math.atan(BoxBox.d / BoxBox.w)],
            _TopSquareTL: [-1 / 4 * BoxBox.w, BoxBox.d, Math.PI / 2],
            _TopSquareTR: [3 / 4 * BoxBox.w, BoxBox.d, Math.PI / 2],
        },
        _BottomSquareBL: [-3 / 4 * BoxBox.w, 3 / 4 * BoxBox.w],
        _BottomSquareBR: [1 / 4 * BoxBox.w, 3 / 4 * BoxBox.w],
        _BottomSquareTL: [-3 / 4 * BoxBox.w, -1 / 4 * BoxBox.w],
        _BottomSquareTR: [1 / 4 * BoxBox.w, -1 / 4 * BoxBox.w],
        _TopSquareBL: [-1 / 4 * BoxBox.w, 1 / 4 * BoxBox.w],
        _TopSquareBR: [3 / 4 * BoxBox.w, 1 / 4 * BoxBox.w],
        _TopSquareTL: [-1 / 4 * BoxBox.w, -3 / 4 * BoxBox.w],
        _TopSquareTR: [3 / 4 * BoxBox.w, -3 / 4 * BoxBox.w],
    };
    BoxBox.drawCoordinatesBottomLeft = {
        // I think 
        // flip Y coordinates for this shape
        BottomSquareBL: [-3 / 4 * BoxBox.w, 1 / 4 * BoxBox.w],
        BottomSquareBR: [1 / 4 * BoxBox.w, 1 / 4 * BoxBox.w],
        BottomSquareTL: [-3 / 4 * BoxBox.w, -3 / 4 * BoxBox.w],
        BottomSquareTR: [1 / 4 * BoxBox.w, -3 / 4 * BoxBox.w],
        TopSquareBL: [-1 / 4 * BoxBox.w, 3 / 4 * BoxBox.w],
        TopSquareBR: [3 / 4 * BoxBox.w, 3 / 4 * BoxBox.w],
        TopSquareTL: [-1 / 4 * BoxBox.w, -1 / 4 * BoxBox.w],
        TopSquareTR: [3 / 4 * BoxBox.w, -1 / 4 * BoxBox.w],
        // top and bottom are correct
        // left and right are wrong
        Left: {
            // take these distances to the axis of rotation, and then multiply them by cos(angle) of rotation
            //BL <=> TL, BR <=> TR
            _BottomSquareBL: [BoxBox.d, 1 / 4 * BoxBox.w, Math.PI / 2],
            _BottomSquareBR: [Math.sqrt(Math.pow(BoxBox.w, 2) + Math.pow(BoxBox.d, 2)), 1 / 4 * BoxBox.w, Math.atan(BoxBox.d / BoxBox.w)],
            _BottomSquareTL: [BoxBox.d, -3 / 4 * BoxBox.w, Math.PI / 2],
            _BottomSquareTR: [Math.sqrt(Math.pow(BoxBox.w, 2) + Math.pow(BoxBox.d, 2)), -3 / 4 * BoxBox.w, Math.atan(BoxBox.d / BoxBox.w)],
            _TopSquareBL: [Math.sqrt(Math.pow((BoxBox.w / 2), 2) + Math.pow(BoxBox.d, 2)), 3 / 4 * BoxBox.w, Math.atan(BoxBox.d / (BoxBox.w / 2))],
            _TopSquareBR: [Math.sqrt(Math.pow((3 / 2 * BoxBox.w), 2) + Math.pow(BoxBox.d, 2)), 3 / 4 * BoxBox.w, Math.atan(BoxBox.d / (3 / 2 * BoxBox.w))],
            _TopSquareTL: [Math.sqrt(Math.pow((BoxBox.w / 2), 2) + Math.pow(BoxBox.d, 2)), -1 / 4 * BoxBox.w, Math.atan(BoxBox.d / (BoxBox.w / 2))],
            _TopSquareTR: [Math.sqrt(Math.pow((3 / 2 * BoxBox.w), 2) + Math.pow(BoxBox.d, 2)), -1 / 4 * BoxBox.w, Math.atan(BoxBox.d / (3 / 2 * BoxBox.w))],
        },
        Right: {
            _BottomSquareBL: [Math.sqrt(Math.pow((3 / 2 * BoxBox.w), 2) + Math.pow(BoxBox.d, 2)), 1 / 4 * BoxBox.w, Math.atan(BoxBox.d / (3 / 2 * BoxBox.w))], // angle starts 90 degrees 
            _BottomSquareBR: [Math.sqrt(Math.pow((BoxBox.w / 2), 2) + Math.pow(BoxBox.d, 2)), 1 / 4 * BoxBox.w, Math.atan(BoxBox.d / (BoxBox.w / 2))],
            _BottomSquareTL: [Math.sqrt(Math.pow((3 / 2 * BoxBox.w), 2) + Math.pow(BoxBox.d, 2)), -3 / 4 * BoxBox.w, Math.atan(BoxBox.d / (3 / 2 * BoxBox.w))],
            _BottomSquareTR: [Math.sqrt(Math.pow((BoxBox.w / 2), 2) + Math.pow(BoxBox.d, 2)), -3 / 4 * BoxBox.w, Math.atan(BoxBox.d / (BoxBox.w / 2))],
            _TopSquareBL: [Math.sqrt(Math.pow(BoxBox.w, 2) + Math.pow(BoxBox.d, 2)), 3 / 4 * BoxBox.w, Math.atan(BoxBox.d / BoxBox.w)],
            _TopSquareBR: [BoxBox.d, 3 / 4 * BoxBox.w, Math.PI / 2],
            _TopSquareTL: [Math.sqrt(Math.pow(BoxBox.w, 2) + Math.pow(BoxBox.d, 2)), -1 / 4 * BoxBox.w, Math.atan(BoxBox.d / BoxBox.w)],
            _TopSquareTR: [BoxBox.d, -1 / 4 * BoxBox.w, Math.PI / 2],
        },
        Top: {
            _BottomSquareBL: [-3 / 4 * BoxBox.w, -Math.sqrt(Math.pow((3 / 2 * BoxBox.w), 2) + Math.pow(BoxBox.d, 2)), Math.atan(BoxBox.d / (3 / 2 * BoxBox.w))], //[d,  -3/4 * w, Math.PI/2], // angle starts 90 degrees
            _BottomSquareBR: [1 / 4 * BoxBox.w, -Math.sqrt(Math.pow((3 / 2 * BoxBox.w), 2) + Math.pow(BoxBox.d, 2)), Math.atan(BoxBox.d / (3 / 2 * BoxBox.w))],
            _BottomSquareTL: [-3 / 4 * BoxBox.w, -Math.sqrt(Math.pow((BoxBox.w / 2), 2) + Math.pow(BoxBox.d, 2)), Math.atan(BoxBox.d / (BoxBox.w / 2))],
            _BottomSquareTR: [1 / 4 * BoxBox.w, -Math.sqrt(Math.pow((BoxBox.w / 2), 2) + Math.pow(BoxBox.d, 2)), Math.atan(BoxBox.d / (BoxBox.w / 2))],
            _TopSquareBL: [-1 / 4 * BoxBox.w, -Math.sqrt(Math.pow(BoxBox.w, 2) + Math.pow(BoxBox.d, 2)), Math.atan(BoxBox.d / BoxBox.w)],
            _TopSquareBR: [3 / 4 * BoxBox.w, -Math.sqrt(Math.pow(BoxBox.w, 2) + Math.pow(BoxBox.d, 2)), Math.atan(BoxBox.d / BoxBox.w)],
            _TopSquareTL: [-1 / 4 * BoxBox.w, -BoxBox.d, Math.PI / 2],
            _TopSquareTR: [3 / 4 * BoxBox.w, -BoxBox.d, Math.PI / 2]
        },
        Bottom: {
            _BottomSquareBL: [-3 / 4 * BoxBox.w, BoxBox.d, Math.PI / 2],
            _BottomSquareBR: [1 / 4 * BoxBox.w, BoxBox.d, Math.PI / 2],
            _BottomSquareTL: [-3 / 4 * BoxBox.w, Math.sqrt(Math.pow(BoxBox.w, 2) + Math.pow(BoxBox.d, 2)), Math.atan(BoxBox.d / BoxBox.w)],
            _BottomSquareTR: [1 / 4 * BoxBox.w, Math.sqrt(Math.pow(BoxBox.w, 2) + Math.pow(BoxBox.d, 2)), Math.atan(BoxBox.d / BoxBox.w)],
            _TopSquareBL: [-1 / 4 * BoxBox.w, Math.sqrt(Math.pow((BoxBox.w / 2), 2) + Math.pow(BoxBox.d, 2)), Math.atan(BoxBox.d / (BoxBox.w / 2))],
            _TopSquareBR: [3 / 4 * BoxBox.w, Math.sqrt(Math.pow((BoxBox.w / 2), 2) + Math.pow(BoxBox.d, 2)), Math.atan(BoxBox.d / (BoxBox.w / 2))],
            _TopSquareTL: [-1 / 4 * BoxBox.w, Math.sqrt(Math.pow((3 / 2 * BoxBox.w), 2) + Math.pow(BoxBox.d, 2)), Math.atan(BoxBox.d / (3 / 2 * BoxBox.w))],
            _TopSquareTR: [3 / 4 * BoxBox.w, Math.sqrt(Math.pow((3 / 2 * BoxBox.w), 2) + Math.pow(BoxBox.d, 2)), Math.atan(BoxBox.d / (3 / 2 * BoxBox.w))]
        },
        _BottomSquareBL: [-3 / 4 * BoxBox.w, 1 / 4 * BoxBox.w],
        _BottomSquareBR: [1 / 4 * BoxBox.w, 1 / 4 * BoxBox.w],
        _BottomSquareTL: [-3 / 4 * BoxBox.w, -3 / 4 * BoxBox.w],
        _BottomSquareTR: [1 / 4 * BoxBox.w, -3 / 4 * BoxBox.w],
        _TopSquareBL: [-1 / 4 * BoxBox.w, 3 / 4 * BoxBox.w],
        _TopSquareBR: [3 / 4 * BoxBox.w, 3 / 4 * BoxBox.w],
        _TopSquareTL: [-1 / 4 * BoxBox.w, -1 / 4 * BoxBox.w],
        _TopSquareTR: [3 / 4 * BoxBox.w, -1 / 4 * BoxBox.w],
    };
    BoxBox.animationStates = ["Paused", "Rotating", "MidPaused", "CompletingRotation"];
    BoxBox.rotationDirections = ["Bottom", "Top", "Left", "Right"];
    BoxBox.shapeStates = ["BottomLeft", "TopLeft"];
    BoxBox.SPAWN_SOUND_URL = "sounds/Enemy_spawn_blue.wav";
    return BoxBox;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));



/***/ }),

/***/ "./src/game_objects/enemies/BoxBox/boxbox_sprite.ts":
/*!**********************************************************!*\
  !*** ./src/game_objects/enemies/BoxBox/boxbox_sprite.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BoxBoxSprite: () => (/* binding */ BoxBoxSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var BoxBoxSprite = /** @class */ (function (_super) {
    __extends(BoxBoxSprite, _super);
    function BoxBoxSprite(transform, rotationState, projectedDrawCoordinates) {
        var _this = _super.call(this, transform) || this;
        _this.spawningScale = 1;
        _this.rotationState = rotationState;
        _this.spawning = false;
        _this.projectedDrawCoordinates = projectedDrawCoordinates;
        return _this;
    }
    BoxBoxSprite.prototype.draw = function (ctx) {
        if (!this.visible)
            return;
        var spawningScale = this.spawningScale || (this.spawningScale = 1);
        var pos = this.transform.absolutePosition();
        var boxWidth = 11 * spawningScale; // only used for spawning?
        // ctx.strokeStyle = "#F173BA";
        var r = 210;
        var g = 75;
        var b = 75;
        ctx.save();
        if (this.spawning === true) {
            var w = boxWidth * spawningScale;
            ctx.translate(pos[0], pos[1]);
            this.drawSpawningBoxBox(ctx, w);
            return;
        }
        ctx.translate(pos[0] - this.rotationState.positionShift[0] - this.rotationState.coordinateShift[0], pos[1] - this.rotationState.positionShift[1] - this.rotationState.coordinateShift[1]);
        var blurFactor = 0.2;
        ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
        ctx.shadowBlur = 10 * blurFactor;
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        ctx.lineWidth = 7.5 * blurFactor;
        this.drawBox1(ctx);
        this.drawBox2(ctx);
        ctx.lineWidth = 6 * blurFactor;
        this.drawBox1(ctx);
        this.drawBox2(ctx);
        ctx.lineWidth = 4.5;
        this.drawBox1(ctx);
        this.drawBox2(ctx);
        ctx.lineWidth = 3;
        this.drawBox1(ctx);
        this.drawBox2(ctx);
        ctx.strokeStyle = "rgb(255, 255, 255)";
        ctx.lineWidth = 1.5;
        this.drawBox1(ctx);
        this.drawBox2(ctx);
        ctx.restore();
    };
    BoxBoxSprite.prototype.drawSpawningBoxBox = function (ctx, w) {
        var r = 210;
        var g = 75;
        var b = 75;
        var blurFactor = 0.5;
        ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
        ctx.shadowBlur = 10 * blurFactor;
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        ctx.lineWidth = 7.5 * blurFactor;
        this.drawSpawningBox1(ctx, w);
        this.drawSpawningBox2(ctx, w);
        ctx.lineWidth = 6 * blurFactor;
        this.drawSpawningBox1(ctx, w);
        this.drawSpawningBox2(ctx, w);
        ctx.lineWidth = 4.5;
        this.drawSpawningBox1(ctx, w);
        this.drawSpawningBox2(ctx, w);
        ctx.lineWidth = 3;
        this.drawSpawningBox1(ctx, w);
        this.drawSpawningBox2(ctx, w);
        ctx.strokeStyle = "rgb(255, 255, 255)";
        ctx.lineWidth = 1.5;
        this.drawSpawningBox1(ctx, w);
        this.drawSpawningBox2(ctx, w);
        ctx.restore();
    };
    BoxBoxSprite.prototype.drawSpawningBox1 = function (ctx, w) {
        ctx.beginPath();
        ctx.moveTo(-w / 4, w / 4);
        ctx.lineTo(-w / 4, (-3 * w) / 4);
        ctx.lineTo((3 * w) / 4, (-3 * w) / 4);
        ctx.lineTo((3 * w) / 4, w / 4);
        ctx.closePath();
        ctx.stroke();
    };
    BoxBoxSprite.prototype.drawSpawningBox2 = function (ctx, w) {
        ctx.beginPath();
        ctx.moveTo(w / 4, -w / 4);
        ctx.lineTo(w / 4, (3 * w) / 4);
        ctx.lineTo((-3 * w) / 4, (3 * w) / 4);
        ctx.lineTo((-3 * w) / 4, -w / 4);
        ctx.closePath();
        ctx.stroke();
    };
    BoxBoxSprite.prototype.drawBox1 = function (ctx) {
        // need to rethink spawn scaling. 
        // I might have to bring back the original draw methods for spawn animation
        var projectedCoordinates = this.projectedDrawCoordinates;
        var point1 = projectedCoordinates.BottomSquareBL;
        var point2 = projectedCoordinates.BottomSquareBR;
        var point3 = projectedCoordinates.BottomSquareTR;
        var point4 = projectedCoordinates.BottomSquareTL;
        ctx.beginPath();
        ctx.moveTo(point1[0], point1[1]);
        ctx.lineTo(point2[0], point2[1]);
        ctx.lineTo(point3[0], point3[1]);
        ctx.lineTo(point4[0], point4[1]);
        ctx.closePath();
        ctx.stroke();
        var _point1 = projectedCoordinates._BottomSquareBL;
        var _point2 = projectedCoordinates._BottomSquareBR;
        var _point3 = projectedCoordinates._BottomSquareTR;
        var _point4 = projectedCoordinates._BottomSquareTL;
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
    };
    BoxBoxSprite.prototype.drawBox2 = function (ctx) {
        var projectedCoordinates = this.projectedDrawCoordinates;
        var point1 = projectedCoordinates.TopSquareBL;
        var point2 = projectedCoordinates.TopSquareBR;
        var point3 = projectedCoordinates.TopSquareTR;
        var point4 = projectedCoordinates.TopSquareTL;
        ctx.beginPath();
        ctx.moveTo(point1[0], point1[1]);
        ctx.lineTo(point2[0], point2[1]);
        ctx.lineTo(point3[0], point3[1]);
        ctx.lineTo(point4[0], point4[1]);
        ctx.closePath();
        ctx.stroke();
        var _point1 = projectedCoordinates._TopSquareBL;
        var _point2 = projectedCoordinates._TopSquareBR;
        var _point3 = projectedCoordinates._TopSquareTR;
        var _point4 = projectedCoordinates._TopSquareTL;
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
    };
    return BoxBoxSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__.LineSprite));



/***/ }),

/***/ "./src/game_objects/enemies/Grunt/grunt.ts":
/*!*************************************************!*\
  !*** ./src/game_objects/enemies/Grunt/grunt.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Grunt: () => (/* binding */ Grunt),
/* harmony export */   GruntSprite: () => (/* binding */ GruntSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/util */ "./src/game_engine/util.ts");
/* harmony import */ var _GEOWarsScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../GEOWarsScript */ "./src/GEOWarsScript.ts");
/* harmony import */ var _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../particles/enemy_spawn */ "./src/game_objects/particles/enemy_spawn.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var Grunt = /** @class */ (function (_super) {
    __extends(Grunt, _super);
    function Grunt(engine, pos, shipTransform) {
        var _this = _super.call(this, engine) || this;
        _this.radius = 5;
        _this.points = 70;
        _this.speed = 1.5;
        _this.bumpAcceleration = 1.5;
        _this.bumpDirectionInfluenced = false;
        _this.transform.pos = pos;
        _this.exists = false;
        _this.stretchDirection = -1;
        _this.shipTransform = shipTransform;
        _this.radius = 5;
        _this.points = 70;
        _this.speed = 1.5;
        _this.bumpAcceleration = 1.5;
        _this.bumpInfluencers = [];
        _this.bumpDirectionInfluenced = false;
        _this.playSound(Grunt.SPAWN_SOUND_URL);
        _this.addLineSprite(new GruntSprite(_this.transform));
        _this.addChildGameObject(new _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_3__.EnemySpawn(_this.gameEngine, _this));
        return _this;
    }
    Grunt.prototype.exist = function () {
        this.exists = true;
        // leaving off subscriptions means that things will subscribe to it
        this.addCollider("General", this, this.radius);
        this.addCollider("Bump", this, this.radius, ["Grunt", "Weaver"], ["General"]);
        // now it will move
        this.addPhysicsComponent();
    };
    Grunt.prototype.onCollision = function (collider, type) {
        if (type === "Bump" && collider.gameObject !== this) {
            this.acceptBumpDirection(collider.gameObject.transform.pos);
        }
    };
    Grunt.prototype.acceptBumpDirection = function (source) {
        this.bumpDirectionInfluenced = true;
        var dy = this.transform.pos[1] - source[1];
        var dx = this.transform.pos[0] - source[0];
        var unitVector = _game_engine_util__WEBPACK_IMPORTED_MODULE_1__.VectorMath.dir([dx, dy]);
        this.bumpInfluencers.push(unitVector);
        // first 1
    };
    Grunt.prototype.influenceDirection = function (influencers) {
        var directionVector = [0, 0];
        influencers.forEach(function (influencer) {
            var dx = directionVector[0] + influencer[0];
            var dy = directionVector[1] + influencer[1];
            var newVector = [dx, dy];
            directionVector = _game_engine_util__WEBPACK_IMPORTED_MODULE_1__.VectorMath.dir(newVector);
        });
        var influencedDirection = Math.atan2(directionVector[1], directionVector[0]);
        return influencedDirection;
    };
    // ADDING MOVEMENT MECHANICS FOR GRUNT
    Grunt.prototype.chase = function (timeDelta) {
        var speed = this.speed;
        var shipPos = this.shipTransform.pos;
        var pos = this.transform.pos;
        var dy = shipPos[1] - pos[1];
        var dx = shipPos[0] - pos[0];
        var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        var direction = Math.atan2(dy, dx);
        this.transform.pos[0] += speed * Math.cos(direction) * velocityScale;
        this.transform.pos[1] += speed * Math.sin(direction) * velocityScale;
    };
    Grunt.prototype.animate = function (timeDelta) {
        var cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        var cycleSpeed = 0.01;
        if (this.lineSprite.stretchScale_W < 0.7 || this.lineSprite.stretchScale_W > 1) {
            this.stretchDirection *= -1;
        }
        this.lineSprite.stretchScale_W = this.lineSprite.stretchScale_W + -this.stretchDirection * cycleSpeed * cycleSpeedScale;
        this.lineSprite.stretchScale_L = this.lineSprite.stretchScale_L + this.stretchDirection * cycleSpeed * cycleSpeedScale;
    };
    Grunt.prototype.update = function (timeDelta) {
        if (this.exists) {
            var bumpAcceleration = this.bumpAcceleration;
            this.animate(timeDelta);
            if (this.bumpDirectionInfluenced) {
                var direction = this.influenceDirection(this.bumpInfluencers);
                this.transform.acc[0] += bumpAcceleration * Math.cos(direction) / 100;
                this.transform.acc[1] += bumpAcceleration * Math.sin(direction) / 100;
            }
            this.chase(timeDelta);
            if (_GEOWarsScript__WEBPACK_IMPORTED_MODULE_2__.GEOWarsScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
                this.wallGraze();
            }
            this.bumpInfluencers = [];
            this.bumpDirectionInfluenced = false;
        }
    };
    Grunt.prototype.wallGraze = function () {
        _GEOWarsScript__WEBPACK_IMPORTED_MODULE_2__.GEOWarsScript.wallGraze(this.transform, this.radius);
    };
    Grunt.SPAWN_SOUND_URL = "sounds/Enemy_spawn_blue.wav";
    return Grunt;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var GruntSprite = /** @class */ (function (_super) {
    __extends(GruntSprite, _super);
    function GruntSprite(transform, spawningScale) {
        if (spawningScale === void 0) { spawningScale = 1; }
        var _this = _super.call(this, transform) || this;
        _this.spawningScale = spawningScale;
        _this.stretchScale_L = 1;
        _this.stretchScale_W = 0.7;
        return _this;
    }
    GruntSprite.prototype.draw = function (ctx) {
        if (!this.visible)
            return;
        var pos = this.transform.absolutePosition();
        var spawningScale = this.spawningScale;
        var shipLength = 10 * 2.2 * spawningScale * this.stretchScale_L;
        var shipWidth = 10 * 2.2 * spawningScale * this.stretchScale_W;
        var l = shipLength;
        var w = shipWidth;
        var r = 0;
        var g = 57;
        var b = 230;
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        var blurFactor = 0.5;
        ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
        ctx.shadowBlur = 10;
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        ctx.lineWidth = 7.5 * blurFactor;
        this.drawDiamond(ctx, l, w);
        ctx.lineWidth = 6; // * blurFactor;
        this.drawDiamond(ctx, l, w);
        ctx.lineWidth = 4.5; // * blurFactor;
        this.drawDiamond(ctx, l, w);
        ctx.lineWidth = 3; // * blurFactor;
        this.drawDiamond(ctx, l, w);
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = 1.5; // * blurFactor;
        this.drawDiamond(ctx, l, w);
        ctx.restore();
    };
    GruntSprite.prototype.drawDiamond = function (ctx, l, w) {
        ctx.beginPath();
        ctx.moveTo(0, -l / 2); //1
        ctx.lineTo(w / 2, 0); //2
        ctx.lineTo(0, l / 2); //3
        ctx.lineTo(-w / 2, -0); //4
        ctx.closePath();
        ctx.stroke();
    };
    return GruntSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_4__.LineSprite));

var NORMAL_FRAME_TIME_DELTA = 1000 / 60;


/***/ }),

/***/ "./src/game_objects/enemies/Pinwheel/pinwheel.ts":
/*!*******************************************************!*\
  !*** ./src/game_objects/enemies/Pinwheel/pinwheel.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Pinwheel: () => (/* binding */ Pinwheel),
/* harmony export */   PinwheelSprite: () => (/* binding */ PinwheelSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/util */ "./src/game_engine/util.ts");
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../particles/enemy_spawn */ "./src/game_objects/particles/enemy_spawn.ts");
/* harmony import */ var _GEOWarsScript__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../GEOWarsScript */ "./src/GEOWarsScript.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var Pinwheel = /** @class */ (function (_super) {
    __extends(Pinwheel, _super);
    function Pinwheel(engine, pos) {
        var _this = _super.call(this, engine) || this;
        _this.rotation_speed = 0.05;
        var speed = 1;
        _this.points = 20;
        _this.transform.pos = pos;
        _this.transform.vel = _game_engine_util__WEBPACK_IMPORTED_MODULE_0__.VectorMath.randomVec(speed);
        _this.playSound(Pinwheel.SPAWN_SOUND_URL);
        _this.addLineSprite(new PinwheelSprite(_this.transform));
        _this.addChildGameObject(new _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_2__.EnemySpawn(_this.gameEngine, _this));
        _this.radius = 5;
        return _this;
    }
    Pinwheel.prototype.exist = function () {
        // leaving off subscriptions means that things will subscribe to it
        this.addCollider("General", this, this.radius);
        // now it will move
        this.addPhysicsComponent();
    };
    Pinwheel.prototype.animate = function (deltaTime) {
        var rotationSpeedScale = deltaTime / NORMAL_FRAME_TIME_DELTA;
        this.transform.angle = (this.transform.angle + this.rotation_speed * rotationSpeedScale) % (Math.PI * 2);
    };
    Pinwheel.prototype.update = function (deltaTime) {
        this.animate(deltaTime);
        if (_GEOWarsScript__WEBPACK_IMPORTED_MODULE_3__.GEOWarsScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
            _GEOWarsScript__WEBPACK_IMPORTED_MODULE_3__.GEOWarsScript.bounce(this.transform, this.radius); // HARD CODED
        }
    };
    Pinwheel.SPAWN_SOUND_URL = "sounds/Enemy_spawn_blue.wav";
    return Pinwheel;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__.GameObject));

var NORMAL_FRAME_TIME_DELTA = 1000 / 60;
var PinwheelSprite = /** @class */ (function (_super) {
    __extends(PinwheelSprite, _super);
    function PinwheelSprite(transform, spawningScale) {
        if (spawningScale === void 0) { spawningScale = 1; }
        var _this = _super.call(this, transform) || this;
        _this.spawningScale = spawningScale;
        return _this;
    }
    PinwheelSprite.prototype.draw = function (ctx) {
        if (!this.visible)
            return;
        var spawningScale = this.spawningScale || 1;
        var pos = this.transform.absolutePosition();
        var angle = this.transform.absoluteAngle();
        var shipWidth = 18 * spawningScale;
        var s = shipWidth / 2;
        var r = 59;
        var g = 10;
        var b = 87;
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(angle);
        var blurFactor = 0.5;
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
    };
    PinwheelSprite.prototype.drawPinwheel = function (ctx, s) {
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
    };
    return PinwheelSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_4__.LineSprite));



/***/ }),

/***/ "./src/game_objects/enemies/RandomRandom.ts":
/*!**************************************************!*\
  !*** ./src/game_objects/enemies/RandomRandom.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RandomRandom: () => (/* binding */ RandomRandom),
/* harmony export */   RandomRandomSprite: () => (/* binding */ RandomRandomSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var RandomRandom = /** @class */ (function (_super) {
    __extends(RandomRandom, _super);
    function RandomRandom(engine, pos) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos = pos;
        _this.addLineSprite(new RandomRandomSprite(_this.transform));
        return _this;
    }
    RandomRandom.prototype.update = function () { };
    RandomRandom.prototype.animate = function () { };
    return RandomRandom;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var RandomRandomSprite = /** @class */ (function (_super) {
    __extends(RandomRandomSprite, _super);
    function RandomRandomSprite(transform) {
        var _this = _super.call(this, transform) || this;
        _this.widthHeight = [20, 20];
        _this.spawningScale = 1;
        return _this;
        // center is in the corning since I don't want to deal   
    }
    RandomRandomSprite.prototype.draw = function (ctx) {
        if (!this.visible)
            return;
        var pos = this.transform.absolutePosition();
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        this.drawRandomRandom(ctx);
        ctx.restore();
    };
    RandomRandomSprite.prototype.drawRandomRandom = function (ctx) {
        var h = this.widthHeight[1] * this.spawningScale;
        var w = this.widthHeight[0] * this.spawningScale;
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.moveTo(-w / 2, -h / 2);
        ctx.lineTo(w / 2, -h / 2);
        ctx.lineTo(w / 2, h / 2);
        ctx.lineTo(-w / 2, h / 2);
        ctx.closePath();
        ctx.stroke();
    };
    return RandomRandomSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__.LineSprite));



/***/ }),

/***/ "./src/game_objects/enemies/Singularity/alien_ship.ts":
/*!************************************************************!*\
  !*** ./src/game_objects/enemies/Singularity/alien_ship.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlienShip: () => (/* binding */ AlienShip),
/* harmony export */   AlienShipSprite: () => (/* binding */ AlienShipSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _GEOWarsScript__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../GEOWarsScript */ "./src/GEOWarsScript.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var AlienShip = /** @class */ (function (_super) {
    __extends(AlienShip, _super);
    function AlienShip(engine, pos, velocity) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos[0] = pos[0];
        _this.transform.pos[1] = pos[1];
        _this.transform.vel[0] = velocity[0];
        _this.transform.vel[1] = velocity[1];
        _this.radius = 4;
        _this.points = 120;
        _this.chaseSpeed = 3.5;
        _this.chaseAcceleration = 0.125 / 3;
        _this.addLineSprite(new AlienShipSprite(_this.transform));
        _this.addCollider("General", _this, _this.radius);
        _this.addPhysicsComponent();
        return _this;
    }
    AlienShip.prototype.exist = function () { };
    // change to acceleration
    AlienShip.prototype.animate = function () { };
    AlienShip.prototype.update = function () {
        // console.log(this.transform.pos)
        this.chase();
        if (_GEOWarsScript__WEBPACK_IMPORTED_MODULE_1__.GEOWarsScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
            this.bounce();
        }
    };
    AlienShip.prototype.bounce = function () {
        _GEOWarsScript__WEBPACK_IMPORTED_MODULE_1__.GEOWarsScript.bounce(this.transform, this.radius);
    };
    AlienShip.prototype.chase = function () {
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
        var speed = this.chaseSpeed;
        var shipPos = this.transform.cameraTransform.pos; // will need this to grab the camera's object in the future
        var pos = this.transform.absolutePosition();
        var deltaPosition = [shipPos[0] - pos[0], shipPos[1] - pos[1]];
        var chaseDirection = Math.atan2(deltaPosition[1], deltaPosition[0]);
        // Math.atan2 was giving me negative numbers.... when it shouldn't
        if (chaseDirection < 0) {
            chaseDirection = 2 * Math.PI + chaseDirection;
        }
        // console.log(chaseDirection / (2 * Math.PI) * 360)
        var Vm = [speed * Math.cos(chaseDirection), speed * Math.sin(chaseDirection)];
        var Vo = this.transform.vel;
        var dV = [Vm[0] - Vo[0], Vm[1] - Vo[1]];
        var accelerationDirection = Math.atan2(dV[1], dV[0]);
        this.transform.acc[0] += this.chaseAcceleration * Math.cos(accelerationDirection);
        this.transform.acc[1] += this.chaseAcceleration * Math.sin(accelerationDirection);
        // console.log(this.transform.acc)
    };
    return AlienShip;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));


var AlienShipSprite = /** @class */ (function (_super) {
    __extends(AlienShipSprite, _super);
    function AlienShipSprite(transform) {
        var _this = _super.call(this, transform) || this;
        _this.radius = 4;
        return _this;
    }
    AlienShipSprite.prototype.draw = function (ctx) {
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        var r = 180;
        var g = 180;
        var b = 255;
        ctx.save();
        // ctx.strokeStyle = "#4286f4";
        // ctx.lineWidth = 4;
        // const blurFactor = 0.5;
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
    };
    AlienShipSprite.prototype.drawAlienShip = function (ctx, radius) {
        ctx.beginPath();
        var pos = this.transform.absolutePosition();
        ctx.arc(pos[0], pos[1], radius, 0, 2 * Math.PI, true);
        ctx.stroke();
    };
    return AlienShipSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_2__.LineSprite));



/***/ }),

/***/ "./src/game_objects/enemies/Singularity/singularity.ts":
/*!*************************************************************!*\
  !*** ./src/game_objects/enemies/Singularity/singularity.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Singularity: () => (/* binding */ Singularity)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/util */ "./src/game_engine/util.ts");
/* harmony import */ var _particles_particle_explosion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../particles/particle_explosion */ "./src/game_objects/particles/particle_explosion.ts");
/* harmony import */ var _particles_singularity_hit_explosion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../particles/singularity_hit_explosion */ "./src/game_objects/particles/singularity_hit_explosion.ts");
/* harmony import */ var _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../particles/enemy_spawn */ "./src/game_objects/particles/enemy_spawn.ts");
/* harmony import */ var _singularity_sprite__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./singularity_sprite */ "./src/game_objects/enemies/Singularity/singularity_sprite.ts");
/* harmony import */ var _particles_singularity_particles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../particles/singularity_particles */ "./src/game_objects/particles/singularity_particles.ts");
/* harmony import */ var _alien_ship__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./alien_ship */ "./src/game_objects/enemies/Singularity/alien_ship.ts");
/* harmony import */ var _particles_Grid_grid_point__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../particles/Grid/grid_point */ "./src/game_objects/particles/Grid/grid_point.ts");
/* harmony import */ var _GEOWarsScript__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../GEOWarsScript */ "./src/GEOWarsScript.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();










var Singularity = /** @class */ (function (_super) {
    __extends(Singularity, _super);
    function Singularity(engine, pos) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos = pos;
        _this.transform.pos[2] = 0;
        _this.gravityWellSize = 1000;
        _this.gravityConstant = 1000 * 0.5;
        _this.radius = 15;
        _this.points = 100;
        _this.throbbingCycleSpeed = 0.002;
        _this.numberAbsorbed = 0;
        _this.alienSpawnAmount = 10;
        _this.alienSpawnSpeed = 1.5;
        _this.gravityPulsateScale = 1;
        // this.id = options.id
        _this.playSound(Singularity.SPAWN_SOUND_URL);
        _this.increasing = true;
        _this.addLineSprite(new _singularity_sprite__WEBPACK_IMPORTED_MODULE_5__.SingularitySprite(_this.transform));
        _this.addChildGameObject(new _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_4__.EnemySpawn(_this.gameEngine, _this));
        _this.lineSprite.throbbingScale = 1;
        _this.lives = 5;
        return _this;
    }
    Singularity.prototype.exist = function () {
        // leaving off subscriptions means that things will subscribe to it
        this.addCollider("General", this, this.radius);
        this.addCollider("GravityWell", this, this.gravityWellSize, ["Grunt", "Pinwheel", "Bullet", "BoxBox", "Arrow", "Singularity", "Weaver", "Particle", "SingularityParticle", "GridPoint"], ["General"]);
        this.addCollider("Absorb", this, this.radius, ["Grunt", "Pinwheel", "BoxBox", "Arrow", "Weaver"], ["General"]);
        // now it will move
        this.addPhysicsComponent();
        this.lineSprite.spawning = false;
        this.addChildGameObject(new _particles_singularity_particles__WEBPACK_IMPORTED_MODULE_6__.SingularityParticles(this.gameEngine, this.transform));
    };
    Singularity.prototype.onCollision = function (collider, type) {
        if (type === "GravityWell") {
            this.influenceAcceleration(collider.gameObject);
        }
        else if (type === "Absorb") {
            var hitObjectTransform = collider.gameObject.transform;
            var pos = hitObjectTransform.absolutePosition();
            // const vel = hitObjectTransform.vel;
            new _particles_particle_explosion__WEBPACK_IMPORTED_MODULE_2__.ParticleExplosion(this.gameEngine, pos);
            collider.gameObject.remove();
            this.throbbingCycleSpeed *= 1.2;
            this.numberAbsorbed += 1; // put back to 1 
        }
    };
    Singularity.prototype.bulletHit = function () {
        this.lives -= 1;
        var pos = this.transform.absolutePosition();
        if (this.lives <= 0) {
            new _particles_particle_explosion__WEBPACK_IMPORTED_MODULE_2__.ParticleExplosion(this.gameEngine, pos);
            this.gameEngine.gameScript.tallyScore(this);
            this.playSound(Singularity.DEATH_SOUND_URL);
            this.remove();
        }
        else {
            new _particles_singularity_hit_explosion__WEBPACK_IMPORTED_MODULE_3__.SingularityHitExplosion(this.gameEngine, pos);
            this.playSound(Singularity.GRAVITY_WELL_HIT_SOUND_URL);
            this.throbbingCycleSpeed /= 1.2;
            this.numberAbsorbed -= 1;
        }
    };
    Singularity.prototype.wallGraze = function () {
        _GEOWarsScript__WEBPACK_IMPORTED_MODULE_9__.GEOWarsScript.wallGraze(this.transform, this.radius);
    };
    Singularity.prototype.update = function (deltaTime) {
        if (_GEOWarsScript__WEBPACK_IMPORTED_MODULE_9__.GEOWarsScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
            this.wallGraze();
        }
        if (this.numberAbsorbed === 5) {
            // this.soundAlarm(deltaTime);
        }
        this.animate(deltaTime);
        if (this.numberAbsorbed >= 6) {
            this.openGate();
        }
    };
    // soundAlarm(deltaTime: number){
    // }
    Singularity.prototype.animate = function (timeDelta) {
        var cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        var cycleSpeed = this.throbbingCycleSpeed;
        // increase scale until 1.2, decrease until 0.8
        if (this.increasing) {
            this.lineSprite.throbbingScale += cycleSpeed * cycleSpeedScale;
            this.gravityPulsateScale += cycleSpeed * 2 * cycleSpeedScale;
            if (this.lineSprite.throbbingScale > 1.2) {
                this.increasing = !this.increasing;
            }
        }
        else {
            this.lineSprite.throbbingScale -= cycleSpeed * cycleSpeedScale;
            this.gravityPulsateScale -= cycleSpeed * 2 * cycleSpeedScale;
            if (this.lineSprite.throbbingScale < 0.8) {
                this.increasing = !this.increasing;
            }
        }
    };
    Singularity.prototype.influenceAcceleration = function (object) {
        var pos = this.transform.absolutePosition();
        if (object instanceof _particles_Grid_grid_point__WEBPACK_IMPORTED_MODULE_8__.GridPoint) {
            // let's try moving their original position in the z direction 
            // depending on strength of gravity influence
            var objectPos3D = [object.transform.pos[0], object.transform.pos[1], object.transform.pos[2]];
            var dVector = [pos[0] - objectPos3D[0], pos[1] - objectPos3D[1], -200 - objectPos3D[2]]; // -200 is the z position of the gravity well for the grid
            var dVectorZOrigin = [pos[0] - objectPos3D[0], pos[1] - objectPos3D[1], 0]; // -200 is the z position of the gravity well for the grid
            var r = _game_engine_util__WEBPACK_IMPORTED_MODULE_1__.VectorMath.dist([0, 0, 0], dVector);
            var rZOrigin = _game_engine_util__WEBPACK_IMPORTED_MODULE_1__.VectorMath.dist([0, 0, 0], dVectorZOrigin);
            if (r < 25)
                r = 25;
            if (rZOrigin < 25)
                rZOrigin = 25;
            // I think I can use both effects, but this one should be a lot smaller
            // and then tuning it would be harder
            // I really like the wave effect that happens with z acceleration being 25, and the spring -0.0025 + dampening -0.04
            // but Z's effect distends too far
            var unitVector3D = _game_engine_util__WEBPACK_IMPORTED_MODULE_1__.VectorMath.scale(dVector, 1 / r);
            var accContribution = [
                unitVector3D[0] * this.gravityConstant * 20 * this.gravityPulsateScale / (r * r),
                unitVector3D[1] * this.gravityConstant * 20 * this.gravityPulsateScale / (r * r),
                unitVector3D[2] * this.gravityConstant * 10 * this.gravityPulsateScale / (r * r)
            ];
            // *************
            // will need to multiply this a good amount
            // if(r < 25) r=25;
            var zContribution = this.gravityConstant * 20 * this.gravityPulsateScale / (Math.pow(rZOrigin, 2)) * 150;
            //// ************
            object.transform.acc[0] += accContribution[0];
            object.transform.acc[1] += accContribution[1];
            object.transform.acc[2] += accContribution[2];
            object.originalPosition[2] += zContribution;
        }
        else {
            var objectPos = object.transform.absolutePosition();
            var dVector2D = [pos[0] - objectPos[0], pos[1] - objectPos[1]];
            var r = _game_engine_util__WEBPACK_IMPORTED_MODULE_1__.VectorMath.dist([0, 0], dVector2D);
            if (!(r > this.gravityWellSize * 7 / 8 || r < this.radius * 2)) {
                var unitVector = _game_engine_util__WEBPACK_IMPORTED_MODULE_1__.VectorMath.scale(dVector2D, 1 / r);
                var accContribution = [
                    unitVector[0] * this.gravityConstant / (r * r),
                    unitVector[1] * this.gravityConstant / (r * r)
                ];
                object.transform.acc[0] += accContribution[0];
                object.transform.acc[1] += accContribution[1];
            }
        }
    };
    Singularity.prototype.openGate = function () {
        this.playSound(Singularity.OPEN_GATE_SOUND_URL);
        for (var i = 0; i < this.alienSpawnAmount; i++) {
            var angle = Math.random() * Math.PI * 2;
            var velocity = [this.alienSpawnSpeed * Math.cos(angle), this.alienSpawnSpeed * Math.sin(angle)];
            new _alien_ship__WEBPACK_IMPORTED_MODULE_7__.AlienShip(this.gameEngine, this.transform.pos, velocity);
        }
        this.remove();
    };
    Singularity.SPAWN_SOUND_URL = "sounds/Enemy_spawn_red.wav";
    Singularity.DEATH_SOUND_URL = "sounds/Gravity_well_die.wav";
    Singularity.GRAVITY_WELL_HIT_SOUND_URL = "sounds/Gravity_well_hit.wav";
    Singularity.OPEN_GATE_SOUND_URL = "sounds/Gravity_well_explode.wav";
    return Singularity;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var NORMAL_FRAME_TIME_DELTA = 1000 / 60;


/***/ }),

/***/ "./src/game_objects/enemies/Singularity/singularity_sprite.ts":
/*!********************************************************************!*\
  !*** ./src/game_objects/enemies/Singularity/singularity_sprite.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SingularitySprite: () => (/* binding */ SingularitySprite)
/* harmony export */ });
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var SingularitySprite = /** @class */ (function (_super) {
    __extends(SingularitySprite, _super);
    function SingularitySprite(transform, spawningScale) {
        if (spawningScale === void 0) { spawningScale = 1; }
        var _this = _super.call(this, transform) || this;
        _this.spawningScale = spawningScale;
        _this.throbbingScale = 1;
        _this.radius = 15;
        _this.spawning = false;
        return _this;
    }
    SingularitySprite.prototype.draw = function (ctx) {
        if (!this.visible)
            return;
        var spawningScale = this.spawningScale;
        if (!this.spawning) {
            spawningScale = this.throbbingScale;
        }
        ctx.strokeStyle = "#F173BA";
        var r = 95;
        var g = 45;
        var b = 73;
        ctx.save();
        // ctx.translate(pos[0], pos[1]);
        // ctx.strokeStyle = "#4286f4";
        // ctx.lineWidth = 4;
        // const blurFactor = 0.5;
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
    };
    SingularitySprite.prototype.drawSingularity = function (ctx, radius) {
        ctx.beginPath();
        var pos = this.transform.absolutePosition();
        ctx.arc(pos[0], pos[1], radius, 0, 2 * Math.PI, true);
        ctx.stroke();
    };
    return SingularitySprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__.LineSprite));



/***/ }),

/***/ "./src/game_objects/enemies/Weaver/weaver.ts":
/*!***************************************************!*\
  !*** ./src/game_objects/enemies/Weaver/weaver.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Weaver: () => (/* binding */ Weaver),
/* harmony export */   WeaverSprite: () => (/* binding */ WeaverSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/util */ "./src/game_engine/util.ts");
/* harmony import */ var _GEOWarsScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../GEOWarsScript */ "./src/GEOWarsScript.ts");
/* harmony import */ var _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../particles/enemy_spawn */ "./src/game_objects/particles/enemy_spawn.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var Weaver = /** @class */ (function (_super) {
    __extends(Weaver, _super);
    function Weaver(engine, pos, shipTransform) {
        var _this = _super.call(this, engine) || this;
        _this.BOX_SIZE = 10;
        _this.COLOR = "#3cff0b";
        _this.rotation_speed = 0.075;
        _this.transform.pos[0] = pos[0];
        _this.transform.pos[1] = pos[1];
        _this.speed = 3;
        _this.points = 80;
        _this.radius = 5;
        _this.weaverCloseHitBox = 30;
        _this.shipTransform = shipTransform;
        _this.bulletDirectionInfluenced = false;
        _this.bumpDirectionInfluenced = false;
        _this.bulletInfluencers = [];
        _this.bumpInfluencers = [];
        _this.bumpAcceleration = 1.5;
        _this.bulletDodgeSpeed = 4;
        _this.playSound(Weaver.SPAWN_SOUND_URL);
        _this.addLineSprite(new WeaverSprite(_this.transform));
        _this.addChildGameObject(new _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_3__.EnemySpawn(_this.gameEngine, _this));
        _this.exists = false;
        return _this;
    }
    Weaver.prototype.exist = function () {
        // leaving off subscriptions means that things will subscribe to it
        this.addCollider("General", this, this.radius);
        this.addCollider("BulletDodge", this, this.weaverCloseHitBox, ["Bullet"], ["General"]);
        this.addCollider("Bump", this, this.radius, ["Grunt", "Weaver"], ["General"]);
        // now it will move
        this.addPhysicsComponent();
        this.exists = true;
    };
    Weaver.prototype.onCollision = function (collider, type) {
        if (type === "BulletDodge") {
            this.acceptBulletDirection(collider.gameObject.transform.pos);
        }
        if (type === "Bump" && collider.gameObject !== this) {
            this.acceptBumpDirection(collider.gameObject.transform.pos);
        }
    };
    Weaver.prototype.acceptBumpDirection = function (source) {
        this.bumpDirectionInfluenced = true;
        var dy = this.transform.pos[1] - source[1];
        var dx = this.transform.pos[0] - source[0];
        var unitVector = _game_engine_util__WEBPACK_IMPORTED_MODULE_1__.VectorMath.dir([dx, dy]);
        this.bumpInfluencers.push(unitVector);
    };
    Weaver.prototype.influenceDirection = function (influencers) {
        var directionVector = [0, 0];
        influencers.forEach(function (influencer) {
            var dx = directionVector[0] + influencer[0];
            var dy = directionVector[1] + influencer[1];
            var newVector = [dx, dy];
            directionVector = _game_engine_util__WEBPACK_IMPORTED_MODULE_1__.VectorMath.dir(newVector);
        });
        var influencedDirection = Math.atan2(directionVector[1], directionVector[0]);
        return influencedDirection;
    };
    Weaver.prototype.acceptBulletDirection = function (source) {
        this.bulletDirectionInfluenced = true;
        var dy = this.transform.pos[1] - source[1];
        var dx = this.transform.pos[0] - source[0];
        var unitVector = _game_engine_util__WEBPACK_IMPORTED_MODULE_1__.VectorMath.dir([dx, dy]);
        this.bulletInfluencers.push(unitVector);
        // first 
    };
    Weaver.prototype.animate = function (timeDelta) {
        var rotationSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        this.transform.angle = (this.transform.angle + this.rotation_speed * rotationSpeedScale) % (Math.PI * 2);
    };
    Weaver.prototype.update = function (timeDelta) {
        if (this.exists) {
            var bumpAcceleration = this.bumpAcceleration;
            var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
            this.animate(timeDelta);
            if (this.bulletDirectionInfluenced) {
                var direction = this.influenceDirection(this.bulletInfluencers);
                this.transform.pos[0] += this.bulletDodgeSpeed * Math.cos(direction) * velocityScale;
                this.transform.pos[1] += this.bulletDodgeSpeed * Math.sin(direction) * velocityScale;
            }
            else {
                this.chase(timeDelta);
            }
            if (this.bumpDirectionInfluenced) {
                var direction = this.influenceDirection(this.bumpInfluencers);
                this.transform.acc[0] += bumpAcceleration * Math.cos(direction) / 100;
                this.transform.acc[1] += bumpAcceleration * Math.sin(direction) / 100;
            }
            this.bumpDirectionInfluenced = false;
            this.bulletDirectionInfluenced = false;
            this.bumpInfluencers = [];
            this.bulletInfluencers = [];
            if (_GEOWarsScript__WEBPACK_IMPORTED_MODULE_2__.GEOWarsScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
                this.wallGraze();
            }
        }
    };
    Weaver.prototype.wallGraze = function () {
        _GEOWarsScript__WEBPACK_IMPORTED_MODULE_2__.GEOWarsScript.wallGraze(this.transform, this.radius);
    };
    Weaver.prototype.chase = function (timeDelta) {
        var speed = 2;
        var shipPos = this.shipTransform.pos;
        var dy = shipPos[1] - this.transform.pos[1];
        var dx = shipPos[0] - this.transform.pos[0];
        var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        var direction = Math.atan2(dy, dx);
        this.transform.pos[0] += speed * Math.cos(direction) * velocityScale;
        this.transform.pos[1] += speed * Math.sin(direction) * velocityScale;
    };
    Weaver.SPAWN_SOUND_URL = "sounds/Enemy_spawn_green.wav";
    return Weaver;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var NORMAL_FRAME_TIME_DELTA = 1000 / 60;
var WeaverSprite = /** @class */ (function (_super) {
    __extends(WeaverSprite, _super);
    function WeaverSprite(transform, spawningScale) {
        if (spawningScale === void 0) { spawningScale = 1; }
        var _this = _super.call(this, transform) || this;
        _this.spawningScale = spawningScale;
        return _this;
    }
    WeaverSprite.prototype.draw = function (ctx) {
        if (!this.visible)
            return;
        // drawing this guy is taking waaay too much time.
        // I took out the blurr factor and it's way better.
        // doesn't look as nice, but it's a starting point
        var pos = this.transform.absolutePosition();
        var angle = this.transform.absoluteAngle();
        var spawningScale = this.spawningScale;
        // const shipLength = 10 * 2.2 * spawningScale;
        var shipWidth = 10 * 2.2 * spawningScale;
        var s = shipWidth / 2;
        var r = 24;
        var g = 255;
        var b = 4;
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(angle);
        // const blurFactor = 0.5;
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
    };
    WeaverSprite.prototype.drawWeaver = function (ctx, s) {
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
    };
    return WeaverSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_4__.LineSprite));



/***/ }),

/***/ "./src/game_objects/particles/Grid/grid.ts":
/*!*************************************************!*\
  !*** ./src/game_objects/particles/Grid/grid.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Grid: () => (/* binding */ Grid),
/* harmony export */   GridSprite: () => (/* binding */ GridSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _grid_point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grid_point */ "./src/game_objects/particles/Grid/grid_point.ts");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_engine/util */ "./src/game_engine/util.ts");
/* harmony import */ var _GEOWarsScript__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../GEOWarsScript */ "./src/GEOWarsScript.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../game_engine/color */ "./src/game_engine/color.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid(engine) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos = [0, 0];
        _this.arenaDimensions = [_GEOWarsScript__WEBPACK_IMPORTED_MODULE_3__.DIM_X, _GEOWarsScript__WEBPACK_IMPORTED_MODULE_3__.DIM_Y];
        _this.elasticity = 0.1; // force provided to pull particle back into place
        _this.dampening = 0.1; // force produced from velocity (allows things to eventuall fall to rest)
        _this.gridPoints = _this.createGridPoints();
        _this.addLineSprite(new GridSprite(_this.transform, _this.gridPoints));
        return _this;
        // this.addPhysicsComponent()
        // this.addCollider("General", this, this.radius)
    }
    Grid.prototype.Playerdies = function (location) {
        var _this = this;
        this.gridPoints.forEach(function (row) {
            row.forEach(function (gridPoint) {
                _this.deathPerterb(gridPoint, location);
            });
        });
    };
    Grid.prototype.Explosion = function (location) {
        var _this = this;
        this.gridPoints.forEach(function (row) {
            row.forEach(function (gridPoint) {
                _this.explosionPerterb(gridPoint, location);
            });
        });
    };
    Grid.prototype.explosionPerterb = function (gridPoint, location) {
        // pushes outward upon explosion. 1/r^2
        var pushConstant = 1250 / 2;
        var pos = location;
        var objectPos = gridPoint.transform.absolutePosition();
        var dy = pos[1] - objectPos[1];
        var dx = pos[0] - objectPos[0];
        var unitVector = _game_engine_util__WEBPACK_IMPORTED_MODULE_2__.VectorMath.dir([dx, dy]);
        var r = Math.sqrt(dy * dy + dx * dx);
        if (r < 15)
            r = 15; // I think I need a bit more dampening for this to work
        gridPoint.transform.vel[0] += -unitVector[0] * pushConstant / (r * r * 2);
        gridPoint.transform.vel[1] += -unitVector[1] * pushConstant / (r * r * 2);
        gridPoint.transform.vel[2] += +pushConstant * 5 / (r * r);
    };
    Grid.prototype.deathPerterb = function (gridPoint, location) {
        // pulls inward upon death. 1/r^2
        var pullConstant = 1250 * 5;
        var pos = location;
        var objectPos = gridPoint.transform.absolutePosition();
        var dy = pos[1] - objectPos[1];
        var dx = pos[0] - objectPos[0];
        var unitVector = _game_engine_util__WEBPACK_IMPORTED_MODULE_2__.VectorMath.dir([dx, dy]);
        var r = Math.sqrt(dy * dy + dx * dx);
        if (r < 20)
            r = 20; // I think I need a bit more dampening for this to work
        var velContribution = [
            unitVector[0] * pullConstant / (r),
            unitVector[1] * pullConstant / (r)
        ];
        // const velContribution = [
        //     0,0, pullConstant * 50 / (r ** 2)
        // ];
        gridPoint.transform.vel[0] = velContribution[0];
        gridPoint.transform.vel[1] = velContribution[1];
        // gridPoint.transform.vel[2] = velContribution[2];
    };
    Grid.prototype.createGridPoints = function () {
        var columnCount = 90; // 40
        var rowCount = 45; // 24
        var gridPoints = [];
        var gridRow = [];
        for (var yPosition = 0; yPosition <= this.arenaDimensions[1]; yPosition += this.arenaDimensions[1] / rowCount) {
            for (var xPosition = 0; xPosition <= this.arenaDimensions[0]; xPosition += this.arenaDimensions[0] / columnCount) {
                if ((xPosition === 0 && (yPosition === 0 || yPosition === this.arenaDimensions[1])) ||
                    (xPosition == this.arenaDimensions[0] && (yPosition === 0 || yPosition === this.arenaDimensions[1]))) {
                    continue;
                }
                var position = [xPosition, yPosition, 0];
                gridRow.push(new _grid_point__WEBPACK_IMPORTED_MODULE_1__.GridPoint(this.gameEngine, position));
            }
            gridPoints.push(gridRow.slice());
            gridRow = [];
        }
        return gridPoints;
    };
    Grid.prototype.animate = function () { };
    Grid.prototype.update = function () { };
    return Grid;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var GridSprite = /** @class */ (function (_super) {
    __extends(GridSprite, _super);
    function GridSprite(transform, gridPoints) {
        var _this = _super.call(this, transform) || this;
        _this.gridPoints = gridPoints;
        _this.color = new _game_engine_color__WEBPACK_IMPORTED_MODULE_5__.Color("hsla", [202, 100, 70, 0.2]);
        return _this;
    }
    GridSprite.prototype.draw = function (ctx) {
        var _this = this;
        ctx.save();
        ctx.strokeStyle = this.color.evaluateColor();
        ctx.lineWidth = 2;
        var firstGridPoint = this.gridPoints[0][0];
        if (isNaN(firstGridPoint.transform.absolutePosition()[0])) {
            console.log('position: ', firstGridPoint.transform.pos);
            console.log('cameraPosition: ', firstGridPoint.transform.cameraTransform.pos);
        }
        ;
        if (this.gridPoints[0][0].transform.cameraTransform !== this.transform.cameraTransform) {
            this.gridPoints.forEach(function (row) {
                row.forEach(function (point) {
                    point.transform.cameraTransform = _this.transform.cameraTransform;
                });
            });
        }
        this.drawRows(ctx);
        this.drawColumns(ctx);
        ctx.restore();
    };
    GridSprite.prototype.drawRows = function (ctx) {
        var gridPoints = this.gridPoints;
        for (var i = 1; i < gridPoints.length - 1; i++) {
            ctx.beginPath();
            var firstPosition = gridPoints[i][0].transform.absolutePosition();
            ctx.moveTo(firstPosition[0], firstPosition[1]);
            for (var j = 1; j < gridPoints[i].length; j++) {
                var nextPosition = gridPoints[i][j].transform.absolutePosition();
                ctx.lineTo(nextPosition[0], nextPosition[1]);
            }
            ctx.stroke();
        }
    };
    GridSprite.prototype.drawColumns = function (ctx) {
        var gridPoints = this.gridPoints;
        ctx.beginPath();
        for (var j = 1; j < gridPoints[1].length - 1; j++) {
            ctx.beginPath();
            for (var i = 0; i < gridPoints.length; i++) {
                var nextPosition = [];
                if (i === 0 || i === 0) {
                    nextPosition = gridPoints[i][j - 1].transform.absolutePosition();
                    ctx.moveTo(nextPosition[0], nextPosition[1]);
                }
                else {
                    if (i === gridPoints.length - 1) {
                        nextPosition = gridPoints[i][j - 1].transform.absolutePosition();
                    }
                    else {
                        nextPosition = gridPoints[i][j].transform.absolutePosition();
                    }
                    ctx.lineTo(nextPosition[0], nextPosition[1]);
                }
            }
            ctx.stroke();
        }
    };
    return GridSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_4__.LineSprite));



/***/ }),

/***/ "./src/game_objects/particles/Grid/grid_point.ts":
/*!*******************************************************!*\
  !*** ./src/game_objects/particles/Grid/grid_point.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GridPoint: () => (/* binding */ GridPoint)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var GridPoint = /** @class */ (function (_super) {
    __extends(GridPoint, _super);
    function GridPoint(engine, pos) {
        var _this = _super.call(this, engine) || this;
        _this.originalPosition = [0, 0, 0];
        _this.originalPosition[0] = pos[0];
        _this.originalPosition[1] = pos[1];
        _this.originalPosition[2] = pos[2];
        _this.transform.pos = pos;
        _this.radius = 2;
        _this.elasticity = -0.0025; // force provided to pull particle back into place
        _this.dampening = -0.04; // force produced from velocity (allows things to eventually fall to rest)
        _this.addPhysicsComponent();
        _this.addCollider("General", _this, _this.radius);
        return _this;
    }
    // let's try moving their original position in the z direction 
    // depending on strength of gravity influence
    GridPoint.prototype.update = function () {
        this.transform.acc[0] += this.transform.vel[0] * this.dampening + (this.transform.pos[0] - this.originalPosition[0]) * this.elasticity;
        this.transform.acc[1] += this.transform.vel[1] * this.dampening + (this.transform.pos[1] - this.originalPosition[1]) * this.elasticity;
        this.transform.acc[2] += this.transform.vel[2] * this.dampening + (this.transform.pos[2] - this.originalPosition[2]) * this.elasticity;
        this.originalPosition[2] = 0;
    };
    GridPoint.prototype.animate = function () { };
    return GridPoint;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));



/***/ }),

/***/ "./src/game_objects/particles/Singularity_Particle/singularity_particle.ts":
/*!*********************************************************************************!*\
  !*** ./src/game_objects/particles/Singularity_Particle/singularity_particle.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SingularityParticle: () => (/* binding */ SingularityParticle)
/* harmony export */ });
/* harmony import */ var _GEOWarsScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../GEOWarsScript */ "./src/GEOWarsScript.ts");
/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../particle */ "./src/game_objects/particles/particle.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var SingularityParticle = /** @class */ (function (_super) {
    __extends(SingularityParticle, _super);
    function SingularityParticle(engine, pos, vel, color) {
        var _this = _super.call(this, engine, pos, 0, color) || this;
        _this.transform.vel[0] = vel[0];
        _this.transform.vel[1] = vel[1];
        _this.transform.vel[2] = 0;
        _this.color = color;
        _this.addCollider("General", _this, _this.radius);
        _this.checkBounds();
        return _this;
    }
    SingularityParticle.prototype.update = function () {
        this.lineSprite.rectLength -= 0.25;
        this.lineSprite.color.a -= 0.01;
        if (this.lineSprite.color.a < 0.06 || this.lineSprite.rectLength < 0.25) {
            this.parentObject.currentParticleCount -= 1;
            this.remove();
        }
        // acc is influenced by singularities, then changed to usual acc
        this.movementAngle = [Math.atan2(this.transform.vel[1], this.transform.vel[0]), null];
        this.transform.acc = [0, 0, 0];
        this.checkBounds();
    };
    SingularityParticle.prototype.checkBounds = function () {
        if (_GEOWarsScript__WEBPACK_IMPORTED_MODULE_0__.GEOWarsScript.isOutOfBounds(this.transform.absolutePosition(), -0.5)) {
            this.remove();
        }
    };
    return SingularityParticle;
}(_particle__WEBPACK_IMPORTED_MODULE_1__.GEOParticle));



/***/ }),

/***/ "./src/game_objects/particles/StrikeTimeParticleExplosion.ts":
/*!*******************************************************************!*\
  !*** ./src/game_objects/particles/StrikeTimeParticleExplosion.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ParticleExplosion: () => (/* binding */ ParticleExplosion)
/* harmony export */ });
/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./particle */ "./src/game_objects/particles/particle.ts");
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game_engine/color */ "./src/game_engine/color.ts");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../game_engine/util */ "./src/game_engine/util.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var ParticleExplosion = /** @class */ (function (_super) {
    __extends(ParticleExplosion, _super);
    function ParticleExplosion(engine, pos, size) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos[0] = pos[0];
        _this.transform.pos[1] = pos[1];
        var startingH = (_this.gameEngine.gameScript.explosionColorWheel + Math.random() * 60) % 360;
        var opacity = Math.random() * 0.35 + 0.6;
        _this.currentColor = new _game_engine_color__WEBPACK_IMPORTED_MODULE_2__.Color("hsla", [startingH, 100, 50, opacity]);
        if (engine.graphicQuality === 1) {
            // console.log("best")
            _this.particleNum = 120; // was 80
        }
        else if (engine.graphicQuality === 2) {
            // console.log("medium")
            _this.particleNum = 40;
        }
        else {
            // console.log("potato")
            _this.particleNum = 20;
        }
        _this.playSound(ParticleExplosion.EXPLOSION_SOUND_URL);
        _this.createExplosionParticles(size);
        return _this;
    }
    ParticleExplosion.prototype.createExplosionParticles = function (size) {
        if (size === void 0) { size = 1; }
        for (var i = 0; i < this.particleNum; i++) {
            var speed = (Math.random() * 4 + 15) * size;
            var colorVarienceDelta = 40;
            var colorVarience = colorVarienceDelta * Math.random() - colorVarienceDelta / 2;
            var color = this.currentColor.dup();
            color.a = Math.random() * 0.15 + 0.80;
            color.h = (color.h + colorVarience) % 360;
            var x = this.transform.absolutePosition()[0];
            var y = this.transform.absolutePosition()[1];
            var z = 0;
            var movementAngle = this.createMovementAngle();
            var vel = _game_engine_util__WEBPACK_IMPORTED_MODULE_3__.VectorMath.vector3Cartesian(movementAngle, speed);
            this.addChildGameObject(new _particle__WEBPACK_IMPORTED_MODULE_0__.Particle(this.gameEngine, [x, y, z], vel, color, null, size));
        }
    };
    ParticleExplosion.prototype.update = function () {
        if (this.childObjects.length === 0) {
            this.remove();
        }
    };
    ParticleExplosion.prototype.animate = function () { };
    ParticleExplosion.prototype.createMovementAngle = function () {
        return [(Math.random() * Math.PI * 2), Math.random() * Math.PI * 2];
    };
    ParticleExplosion.EXPLOSION_SOUND_URL = "sounds/Enemy_explode.wave";
    return ParticleExplosion;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__.GameObject));



/***/ }),

/***/ "./src/game_objects/particles/bullet_wall_explosion.ts":
/*!*************************************************************!*\
  !*** ./src/game_objects/particles/bullet_wall_explosion.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BulletWallExplosion: () => (/* binding */ BulletWallExplosion)
/* harmony export */ });
/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./particle */ "./src/game_objects/particles/particle.ts");
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game_engine/color */ "./src/game_engine/color.ts");
/* harmony import */ var _GEOWarsScript__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../GEOWarsScript */ "./src/GEOWarsScript.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var BulletWallExplosion = /** @class */ (function (_super) {
    __extends(BulletWallExplosion, _super);
    function BulletWallExplosion(engine, pos) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos[0] = pos[0];
        _this.transform.pos[1] = pos[1];
        var startingH = (_this.gameEngine.gameScript.explosionColorWheel + 180 + Math.random() * 60) % 360;
        var opacity = Math.random() * 0.35 + 0.6;
        _this.currentColor = new _game_engine_color__WEBPACK_IMPORTED_MODULE_2__.Color("hsla", [startingH, 100, 50, opacity]);
        _this.particleNum = 20;
        _this.wallHit = _this.whichWall();
        _this.playSound(BulletWallExplosion.BULLET_WALL_HIT_SOUND_URL);
        _this.createParticles();
        return _this;
    }
    BulletWallExplosion.prototype.whichWall = function () {
        var pos = this.transform.pos;
        var max = [_GEOWarsScript__WEBPACK_IMPORTED_MODULE_3__.DIM_X, _GEOWarsScript__WEBPACK_IMPORTED_MODULE_3__.DIM_Y];
        if (pos[0] <= 0) {
            return "LEFT";
        }
        else if (pos[0] >= max[0]) {
            return "RIGHT";
        }
        else if (pos[1] <= 0) {
            return "TOP";
        }
        else if (pos[1] >= max[1]) {
            return "BOTTOM";
        }
    };
    BulletWallExplosion.prototype.createParticles = function () {
        for (var i = 0; i < this.particleNum; i++) {
            var colorVarienceDelta = 30;
            var speed = 1 + Math.random() * 3;
            var colorVarience = colorVarienceDelta * Math.random() - colorVarienceDelta / 2;
            var color = this.currentColor.dup();
            color.a = Math.random() * 0.35 + 0.6;
            color.h = (color.h + colorVarience) % 360;
            var x = this.transform.absolutePosition()[0];
            var y = this.transform.absolutePosition()[1];
            var z = 0;
            this.addChildGameObject(new _particle__WEBPACK_IMPORTED_MODULE_0__.GEOParticle(this.gameEngine, [x, y, z], speed, color, this.wallHit));
        }
    };
    BulletWallExplosion.prototype.animate = function () { };
    BulletWallExplosion.prototype.update = function () {
        if (this.childObjects.length === 0) {
            this.remove();
        }
    };
    BulletWallExplosion.BULLET_WALL_HIT_SOUND_URL = "sounds/bullet_hitwall.wav";
    return BulletWallExplosion;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__.GameObject));



/***/ }),

/***/ "./src/game_objects/particles/enemy_spawn.ts":
/*!***************************************************!*\
  !*** ./src/game_objects/particles/enemy_spawn.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EnemySpawn: () => (/* binding */ EnemySpawn)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var EnemySpawn = /** @class */ (function (_super) {
    __extends(EnemySpawn, _super);
    function EnemySpawn(engine, parentObject) {
        var _this = _super.call(this, engine) || this;
        _this.initialSpawningScale = 1.5;
        _this.lifeTime = 1000;
        _this.existTime = 0;
        parentObject.lineSprite.spawning = true;
        return _this;
        // this.gameEngine.queueSound(this.parentObject.spawnSound)
    }
    EnemySpawn.prototype.animate = function (timeDelta) {
        this.update(timeDelta);
    };
    EnemySpawn.prototype.update = function (timeDelta) {
        this.existTime += timeDelta;
        if (this.existTime >= this.lifeTime) {
            this.parentObject.lineSprite.spawningScale = 1;
            this.parentObject.exist();
            this.parentObject.lineSprite.spawning = false;
            this.remove();
        }
        var cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        var cycleSpeed = 0.1;
        this.parentObject.lineSprite.spawningScale -= cycleSpeed * cycleSpeedScale;
        if (this.parentObject.lineSprite.spawningScale < 0.7) {
            this.parentObject.lineSprite.spawningScale = this.initialSpawningScale;
        }
    };
    return EnemySpawn;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var NORMAL_FRAME_TIME_DELTA = 1000 / 60;


/***/ }),

/***/ "./src/game_objects/particles/particle.ts":
/*!************************************************!*\
  !*** ./src/game_objects/particles/particle.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GEOParticle: () => (/* binding */ GEOParticle),
/* harmony export */   Particle: () => (/* binding */ Particle),
/* harmony export */   ParticleSprite: () => (/* binding */ ParticleSprite),
/* harmony export */   StationaryParticleSprite: () => (/* binding */ StationaryParticleSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/util */ "./src/game_engine/util.ts");
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _GEOWarsScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../GEOWarsScript */ "./src/GEOWarsScript.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
/* harmony import */ var _game_engine_game_engine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../game_engine/game_engine */ "./src/game_engine/game_engine.ts");
// direction of the particle is the direction of the velocity vector
// the direction of the 
// the particle dies when the hue reaches 0 
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// random movement angle created
// initial speed (scale)
// vel = VectorMath.vectorCartesian(angle, scale)
//
// 
// because the particle is drawn the correct way now, 
// from position out, the particle's center is located 
// far from the center of the particle



// will need to generalize the particle... unless I already have
var Particle = /** @class */ (function (_super) {
    __extends(Particle, _super);
    function Particle(engine, pos, initialVelocity, color, removeCallback, dampening, opacityDropSpeed, direction) {
        var _this = _super.call(this, engine) || this;
        if (initialVelocity === null) {
            _this.transform.vel[0] = 0;
            _this.transform.vel[1] = 0;
            _this.transform.vel[2] = 0;
            _this.transform.angle = direction;
        }
        else {
            _this.transform.vel[0] = initialVelocity[0];
            _this.transform.vel[1] = initialVelocity[1];
            _this.transform.vel[2] = initialVelocity[2] || 0;
        }
        _this.transform.pos[0] = pos[0];
        _this.transform.pos[1] = pos[1];
        _this.transform.pos[2] = pos[2] || 0;
        _this.removeCallback = removeCallback || (removeCallback = function () { });
        _this.opacityDropSpeed = opacityDropSpeed || 0.0005;
        // explosion paralax
        if (engine instanceof _game_engine_game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine) {
            _this.transform.cameraTransform = engine.activeCamera.transform;
        }
        _this.color = color;
        _this.radius = 3;
        _this.transform.acc = [0, 0, 0];
        if (initialVelocity === null) {
            _this.addLineSprite(new StationaryParticleSprite(_this.transform, _this.color));
        }
        else {
            _this.addLineSprite(new ParticleSprite(_this.transform, _this.color));
        }
        _this.addPhysicsComponent();
        _this.dampening = dampening * -0.045 || -0.045;
        return _this;
    }
    Particle.prototype.update = function (deltaTime) {
        // this.lineSprite.rectLength -= 0.01 * deltaTime;
        this.lineSprite.color.a -= this.opacityDropSpeed * deltaTime;
        // this.lineSprite.hue < 0.06 ||
        if (this.lineSprite.rectLength < 0.25 || ((Math.abs(this.transform.vel[0]) + Math.abs(this.transform.vel[1]) + Math.abs(this.transform.vel[2])) < 0.15)) {
            this.removeCallback();
            this.remove();
        }
        this.transform.acc[0] += this.transform.vel[0] * this.dampening;
        this.transform.acc[1] += this.transform.vel[1] * this.dampening;
        this.transform.acc[2] += this.transform.vel[2] * this.dampening;
    };
    Particle.prototype.animate = function () {
    };
    return Particle;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__.GameObject));

var GEOParticle = /** @class */ (function (_super) {
    __extends(GEOParticle, _super);
    function GEOParticle(engine, pos, initialSpeed, color, wallHit) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos[0] = pos[0];
        _this.transform.pos[1] = pos[1];
        _this.transform.pos[2] = pos[2] || 0;
        // explosion paralax
        if (engine instanceof _game_engine_game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine) {
            _this.transform.cameraTransform = engine.activeCamera.transform;
        }
        _this.color = color;
        _this.movementAngle = _this.createMovementAngle(wallHit); // [plane, out of plane]
        _this.transform.movementAngle = _this.movementAngle;
        _this.transform.vel = _game_engine_util__WEBPACK_IMPORTED_MODULE_0__.VectorMath.vector3Cartesian(_this.movementAngle, initialSpeed);
        _this.radius = 3;
        _this.explosionDeceleration = -0.004; // in the direction the particle is moving
        _this.transform.acc = _game_engine_util__WEBPACK_IMPORTED_MODULE_0__.VectorMath.vector3Cartesian(_this.movementAngle, -_this.explosionDeceleration);
        _this.addLineSprite(new ParticleSprite(_this.transform, _this.color));
        _this.addPhysicsComponent();
        _this.dampening = -0.045;
        return _this;
        // this.addCollider("General", this, this.radius)
    }
    GEOParticle.prototype.createMovementAngle = function (wallHit) {
        if (!wallHit) {
            return [(Math.random() * Math.PI * 2), Math.random() * Math.PI * 2];
        }
        else {
            if (wallHit === "BOTTOM") {
                // need to give second angle still
                return [Math.random() * Math.PI + Math.PI, Math.random() * Math.PI * 2];
            }
            else if (wallHit === "RIGHT") {
                return [Math.random() * Math.PI + Math.PI / 2, Math.random() * Math.PI * 2];
            }
            else if (wallHit === "TOP") {
                return [Math.random() * Math.PI, Math.random() * Math.PI * 2];
            }
            else if (wallHit === "LEFT") {
                return [Math.random() * Math.PI + 3 * Math.PI / 2, Math.random() * Math.PI * 2];
            }
        }
    };
    GEOParticle.prototype.animate = function () {
    };
    GEOParticle.prototype.update = function (deltaTime) {
        // this.lineSprite.rectLength -= 0.01 * deltaTime;
        this.lineSprite.color.a -= 0.0005 * deltaTime;
        // this.lineSprite.hue < 0.06 ||
        if (this.lineSprite.rectLength < 0.25 || ((Math.abs(this.transform.vel[0]) + Math.abs(this.transform.vel[1]) + Math.abs(this.transform.vel[2])) < 0.15)) {
            this.remove();
        }
        this.checkBounds();
        // acc is influenced by singularities, then changed to usual acc
        this.movementAngle = [Math.atan2(this.transform.vel[1], this.transform.vel[0]), Math.atan2(this.transform.vel[2], Math.sqrt(Math.pow(this.transform.vel[0], 2) + Math.pow(this.transform.vel[1], 2)) / this.transform.vel[2])];
        // this.transform.acc = VectorMath.vector3Cartesian(this.movementAngle, -this.explosionDeceleration);
        this.transform.acc[0] += this.transform.vel[0] * this.dampening;
        this.transform.acc[1] += this.transform.vel[1] * this.dampening;
        this.transform.acc[2] += this.transform.vel[2] * this.dampening;
    };
    GEOParticle.prototype.checkBounds = function () {
        if (_GEOWarsScript__WEBPACK_IMPORTED_MODULE_2__.GEOWarsScript.isOutOfBounds(this.transform.absolutePosition(), -0.5)) {
            this.remove();
        }
    };
    return GEOParticle;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__.GameObject));



// import { 
//     VectorMath
// } from "../../../game_engine/util";
var ParticleSprite = /** @class */ (function (_super) {
    __extends(ParticleSprite, _super);
    function ParticleSprite(transform, color) {
        var _this = _super.call(this, transform) || this;
        _this.rectLength = 15;
        _this.rectWidth = 2;
        _this.color = color;
        return _this;
        // test
    }
    ParticleSprite.prototype.drawTwoDimensionNoParallax = function (ctx) {
        var pos = this.transform.absolutePosition();
        var vel = this.transform.absoluteVelocity();
        // const l = this.rectLength;
        var w = this.rectWidth;
        var movementDirection = Math.atan2(vel[0], -vel[1]);
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(movementDirection - Math.PI);
        ctx.beginPath();
        ctx.strokeStyle = this.color.evaluateColor();
        ctx.lineWidth = w;
        ctx.moveTo(0, 0); //1
        // ctx.lineTo(0, l * Math.cos(this.transform.movementAngle[1])); //2
        ctx.beginPath();
        var r = 1;
        ctx.arc(0, 0, r, 0, 2 * Math.PI, true);
        ctx.fill();
        // 
        ctx.closePath();
        // ctx.stroke();
        ctx.restore();
    };
    ParticleSprite.prototype.draw = function (ctx) {
        var pos = this.transform.absolutePosition();
        var r = this.transform.absoluteLength(3);
        var vel = this.transform.absoluteVelocity();
        // const l = this.rectLength;
        // const w = this.transform.absoluteLength(this.rectWidth);
        var movementDirection = Math.atan2(vel[0], -vel[1]);
        // calculate x, y, z of second point of line
        // use same calc, then add to current pos to get second point
        // const point2Position = VectorMath.vector3Add(this.transform.pos, VectorMath.vector3Cartesian(this.transform.movementAngle, l));
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
        ctx.strokeStyle = this.color.evaluateColor();
        ctx.fillStyle = this.color.evaluateColor();
        // the length and width should be closer as the particle gets closer to the camera
        ctx.fillRect(0, 0, r, r * 3);
        // ctx.beginPath();
        // ctx.arc(0, 0, r, 0, 2 * Math.PI, true);
        // ctx.fill();
        // ctx.strokeStyle = this.color.evaluateColor();
        // ctx.lineWidth = w;
        // ctx.moveTo(Xp1, Yp1); //1
        // ctx.lineTo(Xp2, Yp2); //2
        // ctx.stroke();
        ctx.restore();
    };
    return ParticleSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_4__.LineSprite));

var StationaryParticleSprite = /** @class */ (function (_super) {
    __extends(StationaryParticleSprite, _super);
    function StationaryParticleSprite(transform, color) {
        var _this = _super.call(this, transform) || this;
        _this.rectLength = 15;
        _this.rectWidth = 2;
        _this.color = color;
        return _this;
    }
    StationaryParticleSprite.prototype.draw = function (ctx) {
        var pos = this.transform.absolutePosition();
        var r = this.transform.absoluteLength(3);
        var movementDirection = this.transform.angle;
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(movementDirection - Math.PI);
        ctx.strokeStyle = this.color.evaluateColor();
        ctx.fillStyle = this.color.evaluateColor();
        ctx.fillRect(0, 0, r, r * 3);
        ctx.restore();
    };
    return StationaryParticleSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_4__.LineSprite));



/***/ }),

/***/ "./src/game_objects/particles/particle_explosion.ts":
/*!**********************************************************!*\
  !*** ./src/game_objects/particles/particle_explosion.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ParticleExplosion: () => (/* binding */ ParticleExplosion)
/* harmony export */ });
/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./particle */ "./src/game_objects/particles/particle.ts");
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game_engine/color */ "./src/game_engine/color.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var ParticleExplosion = /** @class */ (function (_super) {
    __extends(ParticleExplosion, _super);
    function ParticleExplosion(engine, pos) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos[0] = pos[0];
        _this.transform.pos[1] = pos[1];
        var startingH = (_this.gameEngine.gameScript.explosionColorWheel + Math.random() * 60) % 360;
        var opacity = Math.random() * 0.35 + 0.6;
        _this.currentColor = new _game_engine_color__WEBPACK_IMPORTED_MODULE_2__.Color("hsla", [startingH, 100, 50, opacity]);
        if (engine.graphicQuality === 1) {
            // console.log("best")
            _this.particleNum = 120; // was 80
        }
        else if (engine.graphicQuality === 2) {
            // console.log("medium")
            _this.particleNum = 40;
        }
        else {
            // console.log("potato")
            _this.particleNum = 20;
        }
        _this.playSound(ParticleExplosion.EXPLOSION_SOUND_URL);
        _this.createExplosionParticles();
        engine.gameScript.grid.Explosion(pos);
        return _this;
    }
    ParticleExplosion.prototype.createExplosionParticles = function () {
        for (var i = 0; i < this.particleNum; i++) {
            var speed = Math.random() * 4 + 15;
            var colorVarienceDelta = 40;
            var colorVarience = colorVarienceDelta * Math.random() - colorVarienceDelta / 2;
            var color = this.currentColor.dup();
            color.a = Math.random() * 0.15 + 0.80;
            color.h = (color.h + colorVarience) % 360;
            var x = this.transform.absolutePosition()[0];
            var y = this.transform.absolutePosition()[1];
            var z = 0;
            this.addChildGameObject(new _particle__WEBPACK_IMPORTED_MODULE_0__.GEOParticle(this.gameEngine, [x, y, z], speed, color));
        }
    };
    ParticleExplosion.prototype.update = function () {
        if (this.childObjects.length === 0) {
            this.remove();
        }
    };
    ParticleExplosion.prototype.animate = function () { };
    ParticleExplosion.EXPLOSION_SOUND_URL = "sounds/Enemy_explode.wav";
    return ParticleExplosion;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__.GameObject));



/***/ }),

/***/ "./src/game_objects/particles/ship_explosion.ts":
/*!******************************************************!*\
  !*** ./src/game_objects/particles/ship_explosion.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShipExplosion: () => (/* binding */ ShipExplosion)
/* harmony export */ });
/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./particle */ "./src/game_objects/particles/particle.ts");
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game_engine/color */ "./src/game_engine/color.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var ShipExplosion = /** @class */ (function (_super) {
    __extends(ShipExplosion, _super);
    function ShipExplosion(engine, pos) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos[0] = pos[0];
        _this.transform.pos[1] = pos[1];
        var startingH = (_this.gameEngine.gameScript.explosionColorWheel + Math.random() * 60) % 360;
        var opacity = Math.random() * 0.35 + 0.6;
        _this.currentColor = new _game_engine_color__WEBPACK_IMPORTED_MODULE_2__.Color("hsla", [startingH, 100, 50, opacity]);
        _this.particleNum = 400;
        _this.playSound(ShipExplosion.EXPLOSION_SOUND_URL);
        _this.createExplosionParticles();
        return _this;
    }
    // create explosion lines that pop out of here
    // they dissipate over time
    // they should depend on the object that's destroyed to
    // that means I should have a death animation for each
    ShipExplosion.prototype.createExplosionParticles = function () {
        for (var i = 0; i < this.particleNum; i++) {
            var speed = Math.random() * 10 + 4;
            1;
            // const colorVarienceDelta = 30;
            // const colorVarience = colorVarienceDelta * Math.random() - colorVarienceDelta / 2;
            var color = this.currentColor.dup();
            // color.a = Math.random() * 0.35 + 0.6
            // color.h = (color.h + colorVarience) % 360
            this.addChildGameObject(new _particle__WEBPACK_IMPORTED_MODULE_0__.GEOParticle(this.gameEngine, this.transform.absolutePosition(), speed, color));
        }
    };
    ShipExplosion.prototype.update = function () {
        if (this.childObjects.length === 0) {
            this.remove();
        }
    };
    ShipExplosion.prototype.animate = function () { };
    ShipExplosion.EXPLOSION_SOUND_URL = "sounds/Enemy_explode.wav";
    return ShipExplosion;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__.GameObject));



/***/ }),

/***/ "./src/game_objects/particles/singularity_explosion.ts":
/*!*************************************************************!*\
  !*** ./src/game_objects/particles/singularity_explosion.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SingularityParticleExplosion: () => (/* binding */ SingularityParticleExplosion)
/* harmony export */ });
/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./particle */ "./src/game_objects/particles/particle.ts");
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game_engine/color */ "./src/game_engine/color.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var SingularityParticleExplosion = /** @class */ (function (_super) {
    __extends(SingularityParticleExplosion, _super);
    function SingularityParticleExplosion(engine, pos) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos[0] = pos[0];
        _this.transform.pos[1] = pos[1];
        var startingH = (_this.gameEngine.gameScript.explosionColorWheel + Math.random() * 60) % 360;
        var opacity = Math.random() * 0.35 + 0.6;
        _this.currentColor = new _game_engine_color__WEBPACK_IMPORTED_MODULE_2__.Color("hsla", [startingH, 100, 50, opacity]);
        if (engine.graphicQuality === 1) {
            // console.log("best")
            _this.particleNum = 80;
        }
        else if (engine.graphicQuality === 2) {
            // console.log("medium")
            _this.particleNum = 40;
        }
        else {
            // console.log("potato")
            _this.particleNum = 20;
        }
        _this.playSound(SingularityParticleExplosion.EXPLOSION_SOUND_URL);
        _this.createExplosionParticles();
        return _this;
    }
    SingularityParticleExplosion.prototype.createExplosionParticles = function () {
        for (var i = 0; i < this.particleNum; i++) {
            var speed = Math.random() * 3 + 4;
            var colorVarienceDelta = 30;
            var colorVarience = colorVarienceDelta * Math.random() - colorVarienceDelta / 2;
            var color = this.currentColor.dup();
            color.a = Math.random() * 0.35 + 0.6;
            color.h = (color.h + colorVarience) % 360;
            this.addChildGameObject(new _particle__WEBPACK_IMPORTED_MODULE_0__.GEOParticle(this.gameEngine, this.transform.absolutePosition(), speed, color));
        }
    };
    SingularityParticleExplosion.prototype.update = function () {
        if (this.childObjects.length === 0) {
            this.remove();
        }
    };
    SingularityParticleExplosion.prototype.animate = function () { };
    SingularityParticleExplosion.EXPLOSION_SOUND_URL = "sounds/Enemy_explode.wav";
    return SingularityParticleExplosion;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__.GameObject));



/***/ }),

/***/ "./src/game_objects/particles/singularity_hit_explosion.ts":
/*!*****************************************************************!*\
  !*** ./src/game_objects/particles/singularity_hit_explosion.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SingularityHitExplosion: () => (/* binding */ SingularityHitExplosion)
/* harmony export */ });
/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./particle */ "./src/game_objects/particles/particle.ts");
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game_engine/color */ "./src/game_engine/color.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var SingularityHitExplosion = /** @class */ (function (_super) {
    __extends(SingularityHitExplosion, _super);
    function SingularityHitExplosion(engine, pos) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos[0] = pos[0];
        _this.transform.pos[1] = pos[1];
        var startingH = (_this.gameEngine.gameScript.explosionColorWheel + Math.random() * 60 + 180) % 360;
        var opacity = Math.random() * 0.35 + 0.3;
        _this.currentColor = new _game_engine_color__WEBPACK_IMPORTED_MODULE_2__.Color("hsla", [startingH, 100, 50, opacity]);
        if (engine.graphicQuality === 1) {
            // console.log("best")
            _this.particleNum = 50;
        }
        else if (engine.graphicQuality === 2) {
            // console.log("medium")
            _this.particleNum = 30;
        }
        else {
            // console.log("potato")
            _this.particleNum = 15;
        }
        // find singularity hit sound
        _this.playSound(SingularityHitExplosion.EXPLOSION_SOUND_URL);
        _this.createExplosionParticles();
        return _this;
    }
    SingularityHitExplosion.prototype.createExplosionParticles = function () {
        for (var i = 0; i < this.particleNum; i++) {
            // adjust speed
            var speed = Math.random() * 3 + 2.5;
            var colorVarienceDelta = 30;
            var colorVarience = colorVarienceDelta * Math.random() - colorVarienceDelta / 2;
            var color = this.currentColor.dup();
            color.a = Math.random() * 0.35 + 0.6;
            color.h = (color.h + colorVarience) % 360;
            this.addChildGameObject(new _particle__WEBPACK_IMPORTED_MODULE_0__.GEOParticle(this.gameEngine, this.transform.absolutePosition(), speed, color));
        }
    };
    SingularityHitExplosion.prototype.update = function () {
        if (this.childObjects.length === 0) {
            this.remove();
        }
    };
    SingularityHitExplosion.prototype.animate = function () { };
    SingularityHitExplosion.EXPLOSION_SOUND_URL = "sounds/Enemy_explode.wav";
    return SingularityHitExplosion;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__.GameObject));



/***/ }),

/***/ "./src/game_objects/particles/singularity_particles.ts":
/*!*************************************************************!*\
  !*** ./src/game_objects/particles/singularity_particles.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SingularityParticles: () => (/* binding */ SingularityParticles)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _Singularity_Particle_singularity_particle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Singularity_Particle/singularity_particle */ "./src/game_objects/particles/Singularity_Particle/singularity_particle.ts");
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game_engine/color */ "./src/game_engine/color.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

// import { Util } from "../../game_engine/util";


var SingularityParticles = /** @class */ (function (_super) {
    __extends(SingularityParticles, _super);
    function SingularityParticles(engine, transform) {
        var _this = _super.call(this, engine) || this;
        _this.transform = transform;
        var startingH = Math.random() * 360;
        var opacity = Math.random() * 0.35 + 0.6;
        _this.frequencyParticleCreation = 10;
        _this.particleCreationTime = 0;
        _this.currentColor = new _game_engine_color__WEBPACK_IMPORTED_MODULE_2__.Color("hsla", [startingH, 100, 50, opacity]);
        _this.particleNum = 80;
        _this.currentParticleCount = 0;
        _this.createSingularityParticles();
        return _this;
    }
    SingularityParticles.prototype.createSingularityParticles = function () {
        for (var i = 0; i < this.particleNum; i++) {
            this.addSingularityParticle();
            this.currentParticleCount++;
        }
    };
    SingularityParticles.prototype.addSingularityParticle = function () {
        var L = 70;
        // const length = 0;
        var baseSpeed = 3;
        var distanceVarienceDelta = 15;
        var colorVarienceDelta = 10;
        var angleVarienceDelta = Math.PI / 4;
        var speedVarienceDelta = 2;
        var distanceVarience = distanceVarienceDelta * Math.random() - distanceVarienceDelta / 2;
        var colorVarience = colorVarienceDelta * Math.random() - colorVarienceDelta / 2;
        var angleVarience = angleVarienceDelta * Math.random() - angleVarienceDelta / 2;
        var speedVarience = speedVarienceDelta * Math.random() - speedVarienceDelta / 2;
        var r = L + distanceVarience;
        var theta = Math.random() * 2 * Math.PI;
        var alpha = theta + Math.PI / 2 + angleVarience;
        var speed = baseSpeed + speedVarience;
        var pos = [r * Math.cos(theta) + this.transform.pos[0], r * Math.sin(theta) + this.transform.pos[1]];
        var vel = [speed * Math.cos(alpha) + this.transform.vel[0], speed * Math.sin(alpha) + this.transform.vel[1]];
        var color = this.currentColor.dup();
        color.a = Math.random() * 0.19 + 0.8;
        color.h = (color.h + colorVarience) % 360;
        this.addChildGameObject(new _Singularity_Particle_singularity_particle__WEBPACK_IMPORTED_MODULE_1__.SingularityParticle(this.gameEngine, pos, vel, color));
    };
    SingularityParticles.prototype.changeCurrentColor = function () {
        this.currentColor.h += 1 / 2;
        this.currentColor.h = this.currentColor.h % 360;
    };
    SingularityParticles.prototype.update = function (timeDelta) {
        this.particleCreationTime += timeDelta;
        if (this.particleCreationTime > this.frequencyParticleCreation) {
            this.particleCreationTime = 0;
            if (this.currentParticleCount < 60) {
                this.addSingularityParticle();
            }
        }
        this.changeCurrentColor();
    };
    SingularityParticles.prototype.animate = function () { };
    return SingularityParticles;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));



/***/ }),

/***/ "./src/game_objects/particles/star.ts":
/*!********************************************!*\
  !*** ./src/game_objects/particles/star.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Star: () => (/* binding */ Star),
/* harmony export */   StarSprite: () => (/* binding */ StarSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Star = /** @class */ (function (_super) {
    __extends(Star, _super);
    function Star(engine, pos) {
        if (pos === void 0) { pos = [0, 0, 0]; }
        var _this = _super.call(this, engine) || this;
        _this.transform.pos[0] = pos[0];
        _this.transform.pos[1] = pos[1];
        _this.transform.pos[2] = pos[2];
        _this.addLineSprite(new StarSprite(_this.transform));
        return _this;
        // add random good colors
    }
    Star.prototype.update = function () { };
    Star.prototype.animate = function () { };
    return Star;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var StarSprite = /** @class */ (function (_super) {
    __extends(StarSprite, _super);
    function StarSprite(transform) {
        var _this = _super.call(this, transform) || this;
        _this.radius = Math.random() * 2 + 0.25; // 1 - 3
        return _this;
    }
    StarSprite.prototype.draw = function (ctx) {
        var pos = this.transform.absolutePosition();
        var radius = this.transform.absoluteLength(this.radius);
        // const r = 255;
        // const g = 255;
        // const b = 255;
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.strokeStyle = "rgb(255, 255, 255)";
        ctx.fillStyle = "rgb(255, 255, 255)";
        this.drawStar(ctx, radius, pos);
        ctx.restore();
    };
    StarSprite.prototype.drawStar = function (ctx, radius, pos) {
        var r = radius;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(pos[0], pos[1], r, 0, 2 * Math.PI, true);
        ctx.fill();
    };
    return StarSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__.LineSprite));



/***/ }),

/***/ "./src/game_objects/walls.ts":
/*!***********************************!*\
  !*** ./src/game_objects/walls.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Walls: () => (/* binding */ Walls),
/* harmony export */   WallsSprite: () => (/* binding */ WallsSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _GEOWarsScript__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../GEOWarsScript */ "./src/GEOWarsScript.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../game_engine/color */ "./src/game_engine/color.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Walls = /** @class */ (function (_super) {
    __extends(Walls, _super);
    function Walls(engine) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos = [0, 0];
        _this.addLineSprite(new WallsSprite(_this.transform, _GEOWarsScript__WEBPACK_IMPORTED_MODULE_1__.DIM_X, _GEOWarsScript__WEBPACK_IMPORTED_MODULE_1__.DIM_Y));
        return _this;
    }
    Walls.prototype.update = function () {
    };
    Walls.prototype.animate = function () { };
    return Walls;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));



var WallsSprite = /** @class */ (function (_super) {
    __extends(WallsSprite, _super);
    function WallsSprite(transform, DIM_X, DIM_Y) {
        var _this = _super.call(this, transform) || this;
        _this.width = DIM_X;
        _this.height = DIM_Y;
        _this.shadowColor = new _game_engine_color__WEBPACK_IMPORTED_MODULE_3__.Color("hsla", [202, 100, 70, 1]);
        _this.color = new _game_engine_color__WEBPACK_IMPORTED_MODULE_3__.Color("hsla", [202, 100, 70, 0.2]);
        return _this;
    }
    WallsSprite.prototype.draw = function (ctx) {
        var w = this.width;
        var h = this.height;
        var pos = this.transform.absolutePosition();
        ctx.save();
        ctx.beginPath();
        ctx.translate(pos[0], pos[1]);
        var blurFactor = 0.5;
        ctx.shadowColor = this.shadowColor.evaluateColor();
        ctx.shadowBlur = 10;
        ctx.strokeStyle = this.color.evaluateColor();
        ctx.lineWidth = 7.5 * blurFactor * 2;
        this.drawWalls(ctx, w, h);
        ctx.lineWidth = 6 * 2; // * blurFactor;
        this.drawWalls(ctx, w, h);
        ctx.lineWidth = 4.5 * 2; // * blurFactor;
        this.drawWalls(ctx, w, h);
        ctx.lineWidth = 3 * 2; // * blurFactor;
        this.drawWalls(ctx, w, h);
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = 1.5 * 2; // * blurFactor;
        this.drawWalls(ctx, w, h);
        ctx.restore();
    };
    WallsSprite.prototype.drawWalls = function (ctx, w, h) {
        var offset = 6;
        ctx.beginPath;
        ctx.moveTo(-offset, -offset);
        ctx.lineTo(w + offset, -offset);
        ctx.lineTo(w + offset, h + offset); //3
        ctx.lineTo(0 - offset, h + offset);
        ctx.closePath();
        ctx.stroke();
    };
    return WallsSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_2__.LineSprite));



/***/ }),

/***/ "./src/game_view.ts":
/*!**************************!*\
  !*** ./src/game_view.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameView: () => (/* binding */ GameView)
/* harmony export */ });
/* harmony import */ var _SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpriteEditorScript */ "./src/SpriteEditorScript.ts");
/* harmony import */ var _game_engine_SpriteEditor_SpriteEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_engine/SpriteEditor/SpriteEditor */ "./src/game_engine/SpriteEditor/SpriteEditor.ts");
/* harmony import */ var _GEOWarsScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GEOWarsScript */ "./src/GEOWarsScript.ts");
/* harmony import */ var _StrikeTimeScript__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StrikeTimeScript */ "./src/StrikeTimeScript.ts");




var GameView = /** @class */ (function () {
    function GameView(engine, ctx, canvasEl, geoLevelDesigner, strikeTimeLevelDesigner, animationViewGEO, animationViewStrikeTime) {
        this.ctx = ctx;
        this.engine = engine;
        // this.ship = this.game.addShip(); belongs in game script
        this.canvasEl = canvasEl;
        this.geoLevelDesigner = geoLevelDesigner;
        this.strikeTimeLevelDesigner = strikeTimeLevelDesigner;
        this.animationViewGEO = animationViewGEO;
        this.animationViewStrikeTime = animationViewStrikeTime;
        this.bindKeyboardKeys = this.bindKeyboardKeys.bind(this);
        this.initialUnmute = true;
        this.gameStarted = false;
        this.modelClosed = false;
        this.isLevelDesignerOpened = false;
        this.levelDesignLoaded = true;
        this.lastTime = 0;
        this.animate = this.animate.bind(this);
    }
    GameView.prototype.bindKeyboardKeys = function () {
        window.addEventListener("keydown", this.createKeyEvent(true), true);
        window.addEventListener("keyup", this.createKeyEvent(false), true);
    };
    // TODO move game specific logic
    // TODO this is somehow supposed to handle both mouse and controller inputs
    // but I only see it being use as a string at the moment
    GameView.prototype.updateMovementDirection = function (move, down) {
        if (!this.isLevelDesignerOpened) {
            // check this function
            // have this be the controlled gameObject instead
            this.engine.updateLeftControlStickListeners(move, down);
        }
    };
    /*
    if true, change movement direction to the direction
    if false, remove movement direction if it's the
    same as the current movement direction
  */
    GameView.prototype.createKeyEvent = function (down) {
        var _this = this;
        return function (e) {
            // if (e.key === "p"){
            //   this.engine.togglePause()
            // }
            if (e.key === "m" && _this.initialUnmute) {
                if (!_this.engine.spriteCreatorOpened) {
                    _this.initialUnmute = false;
                    _this.engine.gameScript.theme.play();
                }
            }
            if (e.key === "m" && down) {
                if (!_this.engine.spriteCreatorOpened) {
                    _this.engine.toggleMute();
                    if (_this.engine.muted) {
                        _this.engine.gameScript.theme.mute();
                    }
                    else {
                        _this.engine.gameScript.theme.unmute();
                    }
                }
            }
            if (e.key === 'a' || e.key === 's' || e.key === 'w' || e.key === 'd') {
                var unitVector = GameView.MOVES[e.key];
                if (unitVector) {
                    _this.updateMovementDirection(e.key, down);
                }
            }
            if (e.key === 'f') {
                // TODO hacked in a way to change focus,
                // will need to update 
                _this.engine.updateFKeyListener(down);
                _this.engine.updateFKeyListeners(down);
            }
            if (e.key === 'l') {
                _this.engine.updateLKeyListeners(down);
            }
            if (e.key === 'k') {
                _this.engine.updateKKeyListeners(down);
            }
            if (e.key === 'j') {
                _this.engine.updateJKeyListeners(down);
            }
            if (e.key === 's') {
                _this.engine.updateSKeyListeners(down);
            }
            if (e.key === 'c') {
                _this.engine.updateCKeyListeners(down);
            }
            if (e.key === 'o') {
                _this.engine.updateOKeyListeners(down);
            }
            if (e.key === 'b') {
                _this.engine.updateBKeyListeners(down);
            }
            if (e.key === 'm') {
                _this.engine.updateMKeyListeners(down);
            }
            if (e.key === "p") {
                _this.engine.updateStartButtonListeners(down);
            }
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                _this.engine.updateLeftArrowListeners(down);
            }
            if (e.key === "ArrowUp") {
                e.preventDefault();
                _this.engine.updateUpArrowListeners(down);
            }
            if (e.key === "ArrowRight") {
                e.preventDefault();
                _this.engine.updateRightArrowListeners(down);
            }
            if (e.key === "ArrowDown") {
                e.preventDefault();
                _this.engine.updateDownArrowListeners(down);
            }
        };
    };
    GameView.prototype.bindKeyHandlers = function () {
        // Object.keys(this.MOVES).forEach((k) => {
        //   const move = this.MOVES[k];
        //   key(k, () => {
        //     this.engine.gameScript.ship.updateLeftControlStickInput(move);
        //   });
        // });
        var _this = this;
        // key("m", () => {
        //   engine.muted = !engine.muted;
        //   if (engine.muted) {
        //     this.theme.pause();
        //   } else {
        //     this.theme.play();
        //   }
        // })
        window.addEventListener("mousemove", function (e) {
            // const x = { x: e.layerX }; // TODO mouse position layerX vs offsetX
            // const y = { y: e.layerY }; // TODO mouse position
            // TODO test with firefox 
            var mousePos = [e.offsetX, e.offsetY]; // TODO mouse position layerX vs offsetX
            _this.engine.updateMousePos(mousePos, e);
            // I need to add the listener in each level designer instead of throwing it here randomly
            // this.levelDesigner.updateMouseMoveEvent(e);
            // ship.setFireAngle(mousePos); add to game script event listener thing
        });
        window.addEventListener("click", function (e) {
            _this.engine.mouseClicked(e);
        });
        window.addEventListener("mousedown", function (e) {
            _this.engine.mouseDown(e);
        });
        window.addEventListener("mouseup", function (e) {
            _this.engine.mouseUnClicked(e);
        });
        window.addEventListener("dblclick", function (e) {
            _this.engine.mouseDoubleClicked(e);
        });
    };
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
    GameView.prototype.start = function () {
        var _this = this;
        this.lastTime = 0;
        this.bindKeyHandlers();
        // Get the modal
        var modal = document.getElementById("myModal");
        var strikeTimeLevelCreator = document.getElementById("StrikeTimeLevelEditor");
        var geoWarsLevelCreator = document.getElementById('GEOWarsLevelEditor');
        var levelEditorCanvas = document.getElementById('LevelEditorCanvas');
        geoWarsLevelCreator.style.display = 'none';
        strikeTimeLevelCreator.style.display = 'none';
        levelEditorCanvas.style.display = 'none';
        // from the first modal menu:
        var startStrikeTimeModal = document.getElementById("startStrikeTime");
        var startGEOWarsButtonModal = document.getElementById("startGEOWars");
        var levelEditorButton = document.getElementById("LevelEditorModal");
        var strikeTimeLevelEditor = document.getElementById("StrikeTimeEditorStart");
        var createSprite = document.getElementById("SpriteEditor");
        // load a level either for level editor or for starting the game
        // will have to put something in the input text to know which game it is
        var loadGameDesignButtonModal = document.getElementById("loadGameDesignModal");
        // this is from the menu inside the game editor itself:
        var startGEOWarsButtonFromLevelEditor = document.getElementById("startGEOWarsGameFromLevelEditor");
        var startStrikeTimeButtonInLevelEditor = document.getElementById("startStrikeTimeGame");
        // get the text from element: loadGameDesignInputModal
        startGEOWarsButtonFromLevelEditor.onclick = function (e) {
            e.stopPropagation();
            _this.gameStarted = true;
            var geoWarsScript = new _GEOWarsScript__WEBPACK_IMPORTED_MODULE_2__.GEOWarsScript(_this.engine);
            _this.engine.addGameScript(geoWarsScript);
            _this.bindKeyboardKeys();
            _this.geoLevelDesigner.startGame(geoWarsScript);
            // requestAnimationFrame(this.animate);
            modal.style.display = "none";
        };
        startStrikeTimeButtonInLevelEditor.onclick = function (e) {
            e.stopPropagation();
            _this.gameStarted = true;
            var strikeTimeScript = new _StrikeTimeScript__WEBPACK_IMPORTED_MODULE_3__.StrikeTimeScript(_this.engine);
            _this.engine.addGameScript(strikeTimeScript);
            _this.bindKeyboardKeys();
            _this.strikeTimeLevelDesigner.startGame(strikeTimeScript);
            // requestAnimationFrame(this.animate);
            modal.style.display = "none";
        };
        startGEOWarsButtonModal.onclick = function (e) {
            e.stopPropagation();
            _this.gameStarted = true;
            var geoWarsScript = new _GEOWarsScript__WEBPACK_IMPORTED_MODULE_2__.GEOWarsScript(_this.engine);
            _this.engine.addGameScript(geoWarsScript);
            _this.bindKeyboardKeys();
            if (_this.levelDesignLoaded) {
                _this.geoLevelDesigner.startGame(geoWarsScript);
            }
            requestAnimationFrame(_this.animate);
            modal.style.display = "none";
        };
        startStrikeTimeModal.onclick = function (e) {
            e.stopPropagation();
            _this.gameStarted = true;
            _this.bindKeyboardKeys();
            var strikeTimeScript = new _StrikeTimeScript__WEBPACK_IMPORTED_MODULE_3__.StrikeTimeScript(_this.engine);
            _this.engine.addGameScript(strikeTimeScript);
            if (_this.levelDesignLoaded) {
                _this.strikeTimeLevelDesigner.startGame(strikeTimeScript);
            }
            requestAnimationFrame(_this.animate);
            modal.style.display = "none";
        };
        levelEditorButton.onclick = function (e) {
            e.stopPropagation();
            _this.gameStarted = true;
            _this.isLevelDesignerOpened = true;
            _this.openedLevelEditor = _this.geoLevelDesigner;
            _this.openedLevelEditor.openLevelDesigner();
            _this.bindKeyboardKeys();
            requestAnimationFrame(_this.animate);
            modal.style.display = "none";
            geoWarsLevelCreator.style.display = "flex";
            strikeTimeLevelCreator.style.display = "none";
            levelEditorCanvas.style.display = "flex";
            _this.modelClosed = true;
            setTimeout(function () {
                _this.openedLevelEditor.isLevelDesignerOpened = true;
                _this.engine.isLevelDesignerOpened = true;
                _this.engine.addGameScript(_this.openedLevelEditor);
            }, 50);
        };
        strikeTimeLevelEditor.onclick = function (e) {
            e.stopPropagation();
            _this.gameStarted = true;
            _this.isLevelDesignerOpened = true;
            _this.strikeTimeLevelDesigner.openLevelDesigner();
            _this.openedLevelEditor = _this.strikeTimeLevelDesigner;
            _this.bindKeyboardKeys();
            requestAnimationFrame(_this.animate);
            modal.style.display = "none";
            geoWarsLevelCreator.style.display = "none";
            strikeTimeLevelCreator.style.display = "flex";
            levelEditorCanvas.style.display = 'flex';
            _this.modelClosed = true;
            setTimeout(function () {
                _this.engine.isLevelDesignerOpened = true;
                _this.engine.addGameScript(_this.strikeTimeLevelDesigner);
            }, 50);
        };
        createSprite.onclick = function (e) {
            e.stopPropagation();
            _this.spriteCreatorOpened = true;
            _this.bindKeyboardKeys();
            requestAnimationFrame(_this.animate);
            modal.style.display = "none";
            _this.modelClosed = true;
            var gameScript = new _SpriteEditorScript__WEBPACK_IMPORTED_MODULE_0__.SpriteEditorScript(_this.engine);
            _this.engine.addGameScript(gameScript);
            new _game_engine_SpriteEditor_SpriteEditor__WEBPACK_IMPORTED_MODULE_1__.SpriteEditor(_this.engine);
        };
        // TODO: will need to split this up into one or the other 
        loadGameDesignButtonModal.onclick = function (e) {
            e.stopPropagation();
            var json = document.getElementById("loadGameDesignInputModal").value;
            if (json.includes('GEOWars'))
                _this.geoLevelDesigner.loadGameDesign(json);
            if (json.includes('StrikeTime'))
                _this.strikeTimeLevelDesigner.loadGameDesign(json);
            _this.levelDesignLoaded = true;
        };
        // loadGameDesignButtonModal.onclick = (e) => {
        //     e.stopPropagation();
        //     const json = (document.getElementById("loadGameDesignInputModal") as HTMLInputElement).value;
        //     // will need two different buttons I think for accepting a loading string
        //     this.levelDesigner.loadGameDesign(json);
        //     this.levelDesignLoaded = true;
        // };
    };
    GameView.prototype.animate = function (time) {
        var _a;
        var timeDelta = time - this.lastTime;
        // console.log(`animate time delta: ${timeDelta}`, `time: ${time}`, `lastTime: ${this.lastTime}`)
        this.engine.tick(timeDelta);
        (_a = this.openedLevelEditor) === null || _a === void 0 ? void 0 : _a.animate(timeDelta);
        this.animationViewGEO.animate(timeDelta);
        this.animationViewStrikeTime.animate(timeDelta);
        this.lastTime = time;
        // every call to animate requests causes another call to animate
        requestAnimationFrame(this.animate);
    };
    GameView.MOVES = {
        s: [0, 1],
        a: [-1, 0],
        w: [0, -1],
        d: [1, 0],
    };
    return GameView;
}());

// const KEYMAP = {
//     87: "W",
//     82: "R",
//     90: "Z",
//     88: "X",
//     67: "C",
//     70: "F",
//     83: "S",
//     69: "E",
//     65: "D",
//     68: "A",
// };
// GameView.MOVES = {
//     s: [0, 1],
//     a: [-1, 0],
//     w: [0, -1],
//     d: [1, 0],
// };


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
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");


class BulletSprite extends _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__.LineSprite {
    constructor(transform, spawningScale = 1) {
        super(transform);
        this.spawningScale = spawningScale;
        this.length = 12;
    }

    draw(ctx) {
        const l = this.length;
        const pos = this.transform.pos;
        const vel = this.transform.vel;

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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/GEOWars.ts ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_view */ "./src/game_view.ts");
/* harmony import */ var _game_engine_game_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_engine/game_engine */ "./src/game_engine/game_engine.ts");
/* harmony import */ var _game_engine_Levels_GEOLevelDesigner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game_engine/Levels/GEOLevelDesigner */ "./src/game_engine/Levels/GEOLevelDesigner.ts");
/* harmony import */ var _AnimationView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AnimationView */ "./src/AnimationView.ts");
/* harmony import */ var _game_engine_Levels_StrikeTimeLevelDesigner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game_engine/Levels/StrikeTimeLevelDesigner */ "./src/game_engine/Levels/StrikeTimeLevelDesigner.ts");





document.addEventListener("DOMContentLoaded", function () {
    var canvasEl = document.getElementsByTagName("canvas")[0];
    canvasEl.width = 1000; // this is the start canvas, can be changed later by a specific game
    canvasEl.height = 600; // though I'm not sure what happens when you resize a rendered canvas
    var ctx = canvasEl.getContext("2d", { alpha: false });
    var gameEngine = new _game_engine_game_engine__WEBPACK_IMPORTED_MODULE_1__.GameEngine(ctx);
    var animationWindowGEO = document.getElementsByTagName("canvas")[1].getContext("2d");
    var animationWindowStrikeTime = document.getElementById("animationTestBoxStrikeTime").querySelector("canvas").getContext("2d");
    var levelEditorCanvas = document.getElementById("LevelEditorCanvas").querySelector("canvas");
    var levelEditorCtx = levelEditorCanvas.getContext("2d");
    var animationView = new _AnimationView__WEBPACK_IMPORTED_MODULE_3__.AnimationView(animationWindowGEO);
    var animationViewStrikeTime = new _AnimationView__WEBPACK_IMPORTED_MODULE_3__.AnimationView(animationWindowStrikeTime);
    var levelDesigner = new _game_engine_Levels_GEOLevelDesigner__WEBPACK_IMPORTED_MODULE_2__.GEOLevelDesigner(gameEngine, animationView, levelEditorCtx);
    var strikeTimeLevelDesigner = new _game_engine_Levels_StrikeTimeLevelDesigner__WEBPACK_IMPORTED_MODULE_4__.StrikeTimeLevelDesigner(gameEngine, animationViewStrikeTime, levelEditorCtx);
    gameEngine.levelDesigner = levelDesigner;
    window.addEventListener('focus', function () {
        gameEngine.focusUnPause();
        animationView.focusUnPause();
    });
    window.addEventListener('blur', function () {
        gameEngine.focusPause();
        animationView.focusPause();
    });
    new _game_view__WEBPACK_IMPORTED_MODULE_0__.GameView(gameEngine, ctx, canvasEl, levelDesigner, strikeTimeLevelDesigner, animationView, animationViewStrikeTime).start();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map