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
/* harmony import */ var _game_objects_ClockworkGames_Tree__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./game_objects/ClockworkGames/Tree */ "./src/game_objects/ClockworkGames/Tree.ts");
/* harmony import */ var _game_objects_enemies_RandomRandom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./game_objects/enemies/RandomRandom */ "./src/game_objects/enemies/RandomRandom.ts");
/* harmony import */ var _game_objects_ClockworkGames_Entity_Entity__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./game_objects/ClockworkGames/Entity/Entity */ "./src/game_objects/ClockworkGames/Entity/Entity.ts");
/* harmony import */ var _game_objects_ClockworkGames_Bed__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./game_objects/ClockworkGames/Bed */ "./src/game_objects/ClockworkGames/Bed.ts");
/* harmony import */ var _game_objects_ClockworkGames_Plate__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./game_objects/ClockworkGames/Plate */ "./src/game_objects/ClockworkGames/Plate.ts");
/* harmony import */ var _game_engine_transform__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./game_engine/transform */ "./src/game_engine/transform.ts");
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
        this.zoomScale = 1;
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
        this.addEnemy("LeftSandwich");
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
            AlienShip: function (pos) { return new _game_objects_enemies_Singularity_alien_ship__WEBPACK_IMPORTED_MODULE_6__.AlienShip(_this, pos, [0, 0], _this.ship.transform); },
            RANDOM: function (pos) { return new _game_objects_enemies_RandomRandom__WEBPACK_IMPORTED_MODULE_8__.RandomRandom(_this, pos); },
            Tree: function (pos) { return new _game_objects_ClockworkGames_Tree__WEBPACK_IMPORTED_MODULE_7__.Tree(_this, pos); },
            Entity: function (pos) { return new _game_objects_ClockworkGames_Entity_Entity__WEBPACK_IMPORTED_MODULE_9__.Entity(_this, pos); },
            Bed: function (pos) { return new _game_objects_ClockworkGames_Bed__WEBPACK_IMPORTED_MODULE_10__.Bed(_this, pos, new _game_objects_ClockworkGames_Entity_Entity__WEBPACK_IMPORTED_MODULE_9__.Entity(_this, pos)); },
            LeftSandwich: function () {
                // new LeftSandwich(this, [100,80]);
                // new RightSandwich(this, [130,80]);
                // new LeftSandwich(this, [110,107]);
                // new RightSandwich(this, [140,107]);
                // new Plate(this, [120, 95]);
                var entity = new _game_objects_ClockworkGames_Entity_Entity__WEBPACK_IMPORTED_MODULE_9__.Entity(_this, [100, 90]);
                new _game_objects_ClockworkGames_Bed__WEBPACK_IMPORTED_MODULE_10__.Bed(_this, [100, 100], entity);
            },
            Plate: function (pos) { return new _game_objects_ClockworkGames_Plate__WEBPACK_IMPORTED_MODULE_11__.Plate(_this, pos); }
        };
        enemyMap[type]([100, 100]);
    };
    return AnimationView;
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
/* harmony export */   EventObjectSprite: () => (/* binding */ EventObjectSprite)
/* harmony export */ });
/* harmony import */ var _UI_Element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../UI_Element */ "./src/game_engine/UI_Element.ts");
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../transform */ "./src/game_engine/transform.ts");
/* harmony import */ var _LevelDesign_EnemyPlacer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../LevelDesign/EnemyPlacer */ "./src/game_engine/Levels/LevelDesign/EnemyPlacer.ts");
/* harmony import */ var _Spawn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Spawn */ "./src/game_engine/Levels/DesignElements/Spawn.ts");
/* harmony import */ var _line_sprite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../line_sprite */ "./src/game_engine/line_sprite.ts");
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
        _this.spawnSprites = { Pinwheel: 0, BoxBox: 0, Arrow: 0, Grunt: 0, Weaver: 0, Singularity: 0, AlienShip: 0, RANDOM: 0 };
        _this.widthHeight = [80, 40];
        _this.clickRadius = 20;
        _this.addMouseClickListener();
        _this.isShipRelative = false;
        if (eventToLoad) {
            eventToLoad.spawns.forEach(function (spawn) { return _this.addSpawn({ spawnData: spawn }); });
            _this.isShipRelative = eventToLoad.isShipRelative;
        }
        _this.addUIElementSprite(new EventObjectSprite(_this.transform, _this.spawnSprites, _this.widthHeight));
        _this.levelDesigner.eventLoadShipRelative(_this.isShipRelative);
        return _this;
    }
    EventObject.prototype.enemyPlaced = function (spawn, enemyPlacer) {
        this.addSpawn(new _Spawn__WEBPACK_IMPORTED_MODULE_3__.Spawn(spawn, this.engine));
        this.addEnemyPlacer(enemyPlacer);
        this.levelDesigner.addingAnotherEnemy(this.createEnemyPlacer(spawn.type));
    };
    EventObject.prototype.removePlacer = function (enemyPlacer) {
        this.spawns = this.spawns.filter(function (spawn) { return spawn !== enemyPlacer.spawn; });
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
        return new EventObjectSprite(draggingSpriteTransform, this.spawnSprites, this.widthHeight);
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
            // pretty sure this is a serialized spawn....
            var enemyPlacer = new _LevelDesign_EnemyPlacer__WEBPACK_IMPORTED_MODULE_2__.EnemyPlacer(_this.levelDesigner.engine, spawn, _this, true);
            enemyPlacer.addMouseClickListener();
            _this.enemyPlacers.push(enemyPlacer);
        });
    };
    // copied into engine's clipboard
    EventObject.prototype.pasteCopiedSpawns = function (spawns) {
        var _this = this;
        spawns.forEach(function (spawn) { return (_this.addSpawn(spawn)); });
    };
    EventObject.prototype.serialize = function () {
        return {
            type: 'Event',
            spawns: this.spawns,
            isShipRelative: this.isShipRelative
        };
    };
    EventObject.prototype.loadEvent = function (event) {
        var _this = this;
        event.spawns.forEach(function (spawn) { return _this.addSpawn({ spawn: spawn }); });
    };
    EventObject.prototype.addSpawn = function (spawn) {
        this.spawns.push(spawn.spawn);
        this.spawnSprites[spawn.spawn.type] += 1;
    };
    EventObject.prototype.enemyPlacerClicked = function (enemyPlacer) {
        this.levelDesigner.enemyPlacerClicked(enemyPlacer);
    };
    EventObject.prototype.addRandomRandom = function (spawn) {
        var randomRandomAdded = this.spawns.find(function (spawny) { return spawny.type === 'RANDOM'; });
        if (randomRandomAdded) {
            randomRandomAdded.possibleSpawns = spawn.spawn.possibleSpawns;
            randomRandomAdded.numberToGenerate = spawn.spawn.numberToGenerate;
            var enemyPlacer = this.enemyPlacers.find(function (enemyPlacer) { return (enemyPlacer.type === 'RANDOM'); });
            enemyPlacer.spawn.numberToGenerate = spawn.spawn.numberToGenerate;
            enemyPlacer.spawn.possibleSpawns = spawn.spawn.possibleSpawns;
        }
        else {
            var enemyPlacer = new _LevelDesign_EnemyPlacer__WEBPACK_IMPORTED_MODULE_2__.EnemyPlacer(this.levelDesigner.engine, {
                location: 'RANDOM',
                type: 'RANDOM',
                numberToGenerate: spawn.spawn.numberToGenerate,
                possibleSpawns: spawn.spawn.possibleSpawns
            }, this.levelDesigner, true);
            this.addSpawn(spawn);
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
            this.spawnSprites[spawn.type] -= 1;
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

var EventObjectSprite = /** @class */ (function (_super) {
    __extends(EventObjectSprite, _super);
    function EventObjectSprite(transform, spawnSprites, widthHeight) {
        var _this = _super.call(this, transform) || this;
        _this.selected = true;
        _this.expanded = true;
        _this.spawnSprites = spawnSprites;
        _this.widthHeight = widthHeight;
        // change the sprites to have spawning scale be 0.5
        Object.keys(EventObjectSprite.spawnSpriteCreator).forEach(function (key) {
            EventObjectSprite.spawnSpriteCreator[key].spawningScale = 0.5;
        });
        return _this;
    }
    EventObjectSprite.prototype.draw = function (ctx) {
        var pos = this.transform.pos;
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        this.drawFunction(ctx);
        ctx.restore();
    };
    EventObjectSprite.prototype.drawFunction = function (ctx) {
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
        var BoxBoxSprite = EventObjectSprite.spawnSpriteCreator['BoxBox'];
        var ArrowSprite = EventObjectSprite.spawnSpriteCreator['Arrow'];
        var GruntSprite = EventObjectSprite.spawnSpriteCreator['Grunt'];
        var PinwheelSprite = EventObjectSprite.spawnSpriteCreator['Pinwheel'];
        var WeaverSprite = EventObjectSprite.spawnSpriteCreator['Weaver'];
        var SingularitySprite = EventObjectSprite.spawnSpriteCreator['Singularity'];
        var RandomRandomSprite = EventObjectSprite.spawnSpriteCreator['RANDOM'];
        this.spawnSprites.BoxBox > 0 ? BoxBoxSprite.makeVisible() : BoxBoxSprite.makeInvisible();
        this.spawnSprites.Arrow > 0 ? ArrowSprite.makeVisible() : ArrowSprite.makeInvisible();
        this.spawnSprites.Grunt > 0 ? GruntSprite.makeVisible() : GruntSprite.makeInvisible();
        this.spawnSprites.Pinwheel > 0 ? PinwheelSprite.makeVisible() : PinwheelSprite.makeInvisible();
        this.spawnSprites.Weaver > 0 ? WeaverSprite.makeVisible() : WeaverSprite.makeInvisible();
        this.spawnSprites.Singularity > 0 ? SingularitySprite.makeVisible() : SingularitySprite.makeInvisible();
        this.spawnSprites.RANDOM > 0 ? RandomRandomSprite.makeVisible() : RandomRandomSprite.makeInvisible();
        BoxBoxSprite.draw(ctx);
        ArrowSprite.draw(ctx);
        GruntSprite.draw(ctx);
        PinwheelSprite.draw(ctx);
        WeaverSprite.draw(ctx);
        SingularitySprite.draw(ctx);
        RandomRandomSprite.draw(ctx);
    };
    EventObjectSprite.firstPosition = [10, 10];
    EventObjectSprite.secondPosition = [30, 10];
    EventObjectSprite.thirdPosition = [50, 10];
    EventObjectSprite.fourthPosition = [10, 30];
    EventObjectSprite.fifthPosition = [30, 30];
    EventObjectSprite.sixthPosition = [50, 30];
    EventObjectSprite.seventhPosition = [70, 10];
    EventObjectSprite.spawnSpriteCreator = {
        BoxBox: _LevelDesign_EnemyPlacer__WEBPACK_IMPORTED_MODULE_2__.spriteMap['BoxBox'](new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform(null, EventObjectSprite.firstPosition)),
        Arrow: _LevelDesign_EnemyPlacer__WEBPACK_IMPORTED_MODULE_2__.spriteMap['Arrow'](new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform(null, EventObjectSprite.secondPosition)),
        Grunt: _LevelDesign_EnemyPlacer__WEBPACK_IMPORTED_MODULE_2__.spriteMap['Grunt'](new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform(null, EventObjectSprite.thirdPosition)),
        Pinwheel: _LevelDesign_EnemyPlacer__WEBPACK_IMPORTED_MODULE_2__.spriteMap['Pinwheel'](new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform(null, EventObjectSprite.fourthPosition)),
        Weaver: _LevelDesign_EnemyPlacer__WEBPACK_IMPORTED_MODULE_2__.spriteMap['Weaver'](new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform(null, EventObjectSprite.fifthPosition)),
        Singularity: _LevelDesign_EnemyPlacer__WEBPACK_IMPORTED_MODULE_2__.spriteMap['Singularity'](new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform(null, EventObjectSprite.sixthPosition)),
        RANDOM: _LevelDesign_EnemyPlacer__WEBPACK_IMPORTED_MODULE_2__.spriteMap['RANDOM'](new _transform__WEBPACK_IMPORTED_MODULE_1__.Transform(null, EventObjectSprite.seventhPosition)),
    };
    return EventObjectSprite;
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
    function LoopBeginningObject(levelDesigner, loop, position, parentScene) {
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
    function Scene(parentScene, name, gameElements, currentElementIndex) {
        this.parentScene = parentScene;
        this.type = "Scene";
        this.name = name || "";
        this.gameElements = gameElements || [];
        this.currentElementIndex = currentElementIndex || 0;
        this.maxLoopId = 0;
        this.loopsToClose = [];
    }
    Scene.prototype.update = function (dT) {
        this.gameElements[this.currentElementIndex].update(dT);
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
            this.currentElementIndex = 0;
            this.parentScene.nextElement();
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
        this.expanded = false;
        this.UILineSprite.expanded = false;
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
            gameElements: this.gameElementObjects.map(function (element) { return element.serialize(); }),
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
/* harmony export */   Spawn: () => (/* binding */ Spawn)
/* harmony export */ });
/* harmony import */ var _game_script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_script */ "./src/game_script.ts");

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
            _game_script__WEBPACK_IMPORTED_MODULE_0__.GameScript.DIM_X * 0.95 * Math.random(),
            _game_script__WEBPACK_IMPORTED_MODULE_0__.GameScript.DIM_Y * 0.90 * Math.random(),
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
                    location_1[0] += this.gameEngine.gameScript.ship.transform.pos[0] - _game_script__WEBPACK_IMPORTED_MODULE_0__.GameScript.DIM_X / 2; // TODO Camera?
                    location_1[1] += this.gameEngine.gameScript.ship.transform.pos[1] - _game_script__WEBPACK_IMPORTED_MODULE_0__.GameScript.DIM_Y / 2; // TODO Camera?
                    // check if off edge of map
                    if (location_1[0] > _game_script__WEBPACK_IMPORTED_MODULE_0__.GameScript.DIM_X - 100) {
                        location_1[0] = _game_script__WEBPACK_IMPORTED_MODULE_0__.GameScript.DIM_X - 100;
                    }
                    else if (location_1[0] < 100) {
                        location_1[0] = 100;
                    }
                    if (location_1[1] > _game_script__WEBPACK_IMPORTED_MODULE_0__.GameScript.DIM_Y - 100) {
                        location_1[1] = _game_script__WEBPACK_IMPORTED_MODULE_0__.GameScript.DIM_Y - 100;
                    }
                    else if (location_1[1] < 0 + 100) {
                        location_1[1] = 0 + 100;
                    }
                }
            }
            this.gameEngine.gameScript.enemyCreatorMap[mobToSpawn](location_1);
        }
    };
    Spawn.prototype.serialize = function () {
        return {
            type: "Spawn",
            spawnData: {
                type: this.type,
                angle: this.angle,
                location: this.location,
                possibleSpawns: this.possibleSpawns,
                numberToGenerate: this.numberToGenerate,
            },
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

/***/ "./src/game_engine/Levels/LevelDesign/EnemyPlacer.ts":
/*!***********************************************************!*\
  !*** ./src/game_engine/Levels/LevelDesign/EnemyPlacer.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EnemyPlacer: () => (/* binding */ EnemyPlacer),
/* harmony export */   spriteMap: () => (/* binding */ spriteMap)
/* harmony export */ });
/* harmony import */ var _game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _PlacingAnimation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PlacingAnimation */ "./src/game_engine/Levels/LevelDesign/PlacingAnimation.ts");
/* harmony import */ var _game_objects_enemies_BoxBox_boxbox_sprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_objects/enemies/BoxBox/boxbox_sprite */ "./src/game_objects/enemies/BoxBox/boxbox_sprite.ts");
/* harmony import */ var _game_objects_enemies_Arrow_arrow_sprite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../game_objects/enemies/Arrow/arrow_sprite */ "./src/game_objects/enemies/Arrow/arrow_sprite.ts");
/* harmony import */ var _game_objects_enemies_Grunt_grunt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../game_objects/enemies/Grunt/grunt */ "./src/game_objects/enemies/Grunt/grunt.ts");
/* harmony import */ var _game_objects_enemies_Pinwheel_pinwheel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../game_objects/enemies/Pinwheel/pinwheel */ "./src/game_objects/enemies/Pinwheel/pinwheel.ts");
/* harmony import */ var _game_objects_enemies_Weaver_weaver__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../game_objects/enemies/Weaver/weaver */ "./src/game_objects/enemies/Weaver/weaver.ts");
/* harmony import */ var _game_objects_enemies_Singularity_singularity_sprite__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../game_objects/enemies/Singularity/singularity_sprite */ "./src/game_objects/enemies/Singularity/singularity_sprite.ts");
/* harmony import */ var _game_objects_enemies_RandomRandom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../game_objects/enemies/RandomRandom */ "./src/game_objects/enemies/RandomRandom.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../util */ "./src/game_engine/util.ts");
/* harmony import */ var _game_script__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../game_script */ "./src/game_script.ts");
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











// should add Alien too
var spriteMap = {
    BoxBox: function (transform) {
        var _BoxBoxSprite = new _game_objects_enemies_BoxBox_boxbox_sprite__WEBPACK_IMPORTED_MODULE_2__.BoxBoxSprite(transform);
        _BoxBoxSprite.spawning = true;
        return _BoxBoxSprite;
    },
    Arrow: function (transform) { return new _game_objects_enemies_Arrow_arrow_sprite__WEBPACK_IMPORTED_MODULE_3__.ArrowSprite(transform); },
    Grunt: function (transform) { return new _game_objects_enemies_Grunt_grunt__WEBPACK_IMPORTED_MODULE_4__.GruntSprite(transform); },
    Pinwheel: function (transform) { return new _game_objects_enemies_Pinwheel_pinwheel__WEBPACK_IMPORTED_MODULE_5__.PinwheelSprite(transform); },
    Weaver: function (transform) { return new _game_objects_enemies_Weaver_weaver__WEBPACK_IMPORTED_MODULE_6__.WeaverSprite(transform); },
    Singularity: function (transform) { return new _game_objects_enemies_Singularity_singularity_sprite__WEBPACK_IMPORTED_MODULE_7__.SingularitySprite(transform); },
    RANDOM: function (transform) { return new _game_objects_enemies_RandomRandom__WEBPACK_IMPORTED_MODULE_8__.RandomRandomSprite(transform); },
};
// if trying to spawn multiple things on top of each other, I should only grab the first placer that is found in the click colission
var getClickRadius = {
    BoxBox: 10,
    Arrow: 10,
    Grunt: 10,
    Pinwheel: 10,
    Weaver: 10,
    Singularity: 10,
    RANDOM: 10,
};
var EnemyPlacer = /** @class */ (function (_super) {
    __extends(EnemyPlacer, _super);
    function EnemyPlacer(engine, spawnData, event, isLoadingEvent) {
        var _this = _super.call(this, engine) || this;
        var type = spawnData.type, location = spawnData.location, numberToGenerate = spawnData.numberToGenerate, possibleSpawns = spawnData.possibleSpawns, angle = spawnData.angle;
        _this.addLineSprite(spriteMap[type](_this.transform));
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
            _this.addChildGameObject(new _PlacingAnimation__WEBPACK_IMPORTED_MODULE_1__.PlacingAnimation(_this.gameEngine));
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
    EnemyPlacer.prototype.update = function () {
    };
    EnemyPlacer.prototype.setCoordinates = function (x, y, angle) {
        var radiansAngle = angle * Math.PI / 180;
        this.transform.pos[0] = x || this.transform.pos[0];
        this.transform.pos[1] = y || this.transform.pos[1];
        this.transform.angle = radiansAngle || this.transform.angle;
        this.serializedSpawn.angle = radiansAngle || this.serializedSpawn.angle;
        this.event.levelDesigner.updateAnimationViewAngle(radiansAngle);
    };
    EnemyPlacer.prototype.setRandomCoordinates = function () {
        this.transform.pos[0] = _game_script__WEBPACK_IMPORTED_MODULE_10__.GameScript.DIM_X * 0.85 * Math.random();
        this.transform.pos[1] = _game_script__WEBPACK_IMPORTED_MODULE_10__.GameScript.DIM_Y * 0.85 * Math.random();
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
        this.gameEngine.addClickListener(this);
    };
    EnemyPlacer.prototype.mouseClicked = function (mousePos) {
        var centerDist = _util__WEBPACK_IMPORTED_MODULE_9__.VectorMath.dist(this.transform.pos, mousePos);
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
    // parentObject:
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
        this.removeMouseListeners();
        this.parentObject.place();
        this.remove();
    };
    PlacingAnimation.prototype.updateMousePos = function (mousePos) {
        this.parentObject.transform.pos[0] = mousePos[0];
        this.parentObject.transform.pos[1] = mousePos[1];
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
    return PlacingAnimation;
}(_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var NORMAL_FRAME_TIME_DELTA = 1000 / 60;


/***/ }),

/***/ "./src/game_engine/Levels/levelDesigner.ts":
/*!*************************************************!*\
  !*** ./src/game_engine/Levels/levelDesigner.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LevelDesigner: () => (/* binding */ LevelDesigner)
/* harmony export */ });
/* harmony import */ var _game_objects_Walls_walls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_objects/Walls/walls */ "./src/game_objects/Walls/walls.ts");
/* harmony import */ var _game_objects_Overlay_overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_objects/Overlay/overlay */ "./src/game_objects/Overlay/overlay.ts");
/* harmony import */ var _game_objects_particles_Grid_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game_objects/particles/Grid/grid */ "./src/game_objects/particles/Grid/grid.ts");
/* harmony import */ var _game_script__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../game_script */ "./src/game_script.ts");
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../transform */ "./src/game_engine/transform.ts");
/* harmony import */ var _DesignElements_Scene__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DesignElements/Scene */ "./src/game_engine/Levels/DesignElements/Scene.ts");
/* harmony import */ var _DesignElements_Spawn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DesignElements/Spawn */ "./src/game_engine/Levels/DesignElements/Spawn.ts");
/* harmony import */ var _DesignElements_Event__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DesignElements/Event */ "./src/game_engine/Levels/DesignElements/Event.ts");
/* harmony import */ var _DesignElements_Time__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DesignElements/Time */ "./src/game_engine/Levels/DesignElements/Time.ts");
/* harmony import */ var _DesignElements_Loop__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./DesignElements/Loop */ "./src/game_engine/Levels/DesignElements/Loop.ts");
/* harmony import */ var _DesignElements_Operation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./DesignElements/Operation */ "./src/game_engine/Levels/DesignElements/Operation.ts");
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};



// import { EnemyPlacer } from "./LevelDesign/EnemyPlacer";








// I should collect placed enemies
// for a tracker I can highlight the current game element
// just like selecting it... but maybe the same color for 
// all of them 
var LevelDesigner = /** @class */ (function () {
    function LevelDesigner(engine, animationView, levelDesignerCtx, animationWindow, serializedGame) {
        var _this = this;
        this.expandedScenes = [this];
        this.transform = new _transform__WEBPACK_IMPORTED_MODULE_4__.Transform();
        this.widthHeight = [0, 0];
        this.loopBeginningObjectStackForLoading = [];
        this.DIM_X = 1200;
        this.DIM_Y = 300;
        this.BG_COLOR = "#000000";
        this.engine = engine;
        this.animationView = animationView;
        this.levelDesignerCtx = levelDesignerCtx;
        this.animationWindow = animationWindow;
        this.UIActionsToRun = [];
        this.gameObjects = [];
        this.lineSprites = [];
        this.zoomScale = 1;
        this.ship = {
            transform: {
                pos: [],
            },
        };
        this.lastTime = 0;
        this.animate = animate.bind(this);
        this.overlayText = {
            Location: [0, 0],
            Time: 0,
            Type: "",
            StartingAngle: 0,
        };
        this.overlayTextCleared = true;
        this.palletModal = getPalletModal();
        // main game array is the main list of sequence objects
        this.mainGameArray = [];
        this.gameEditorOpened = false;
        this.serializedGame = serializedGame;
        this.UIElementSprites = [];
        // duck typing for scene
        this.gameElements = []; // top level list of game elements
        this.expandedScenes = [this];
        this.transform = { pos: [0, 0] };
        this.widthHeight = [0, 0];
        this.loopBeginningObjectStackForLoading = [];
        this.engine = engine;
        this.animationView = animationView;
        this.levelDesignerCtx = levelDesignerCtx;
        this.animationWindow = animationWindow;
        this.UIActionsToRun = [];
        this.ctx = levelDesignerCtx;
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
        this.overlayText = {
            Location: [0, 0],
            Time: 0,
            Type: "",
            StartingAngle: 0,
        };
        this.overlayTextCleared = true;
        this.palletModal = this.getPalletModal();
        // can be scene, time, event, or loop
        this.selectedGameElement;
        this.currentEnemyPlacer;
        // main game array is the main list of sequence objects
        this.mainGameArray = [];
        this.gameEditorOpened = false;
        var addArrowButton = document.getElementById("Arrow");
        var addGruntButton = document.getElementById("Grunt");
        var addBoxBox = document.getElementById("BoxBox");
        var addPinwheel = document.getElementById("Pinwheel");
        var addWeaver = document.getElementById("Weaver");
        var addSingularity = document.getElementById("Singularity");
        var makeGame = document.getElementById("LevelEditor");
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
        var loadGameDesign = document.getElementById("loadGameDesign");
        var startGame = document.getElementById("startGame");
        shipRelative.onclick = function (e) {
            e.stopPropagation();
            var value = e.target.value;
            console.log(value);
            if (value === "on") {
                e.target.value = "off";
                _this.makeCoordinatesShipRelative();
            }
            else {
                e.target.value = "on";
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
            var numberToGenerate = document.getElementById('numberToGenerate').value;
            var newSpawn = {
                location: 'RANDOM',
                type: 'RANDOM',
                possibleSpawns: selectedEnemies,
                numberToGenerate: numberToGenerate,
            };
            _this.addRandomRandomSpawnToEvent(newSpawn);
        };
        addGruntButton.onclick = function (e) {
            e.stopPropagation();
            var type = "Grunt";
            _this.addEnemyButton(type);
        };
        addArrowButton.onclick = function (e) {
            e.stopPropagation();
            var type = "Arrow";
            _this.addEnemyButton(type);
        };
        addBoxBox.onclick = function (e) {
            e.stopPropagation();
            var type = "BoxBox";
            _this.addEnemyButton(type);
        };
        addPinwheel.onclick = function (e) {
            e.stopPropagation();
            var type = "Pinwheel";
            _this.addEnemyButton(type);
        };
        addWeaver.onclick = function (e) {
            e.stopPropagation();
            var type = "Weaver";
            _this.addEnemyButton(type);
        };
        addSingularity.onclick = function (e) {
            e.stopPropagation();
            var type = "Singularity";
            _this.addEnemyButton(type);
        };
        // makeGame.onclick = (e) => {
        //     e.stopPropagation();
        //     console.log("game editor opened clicked");
        //     this.gameEditorOpened = !this.gameEditorOpened;
        //     this.engine.gameEditorOpened = this.gameEditorOpened;
        // };
        makeEventObject.onclick = function (e) {
            e.stopPropagation();
            _this.UIActionsToRun.push(function () { return _this.makeEventObject(); });
        };
        saveGameDesign.onclick = function (e) {
            e.stopPropagation();
            _this.saveGameDesign();
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
            _this.UIActionsToRun.push(function () { return _this.makeTime(time); });
        };
        addOperation.onclick = function (e) {
            e.stopPropagation();
            var operationType = document.getElementById("OperationType").value;
            var operationValue = document.getElementById("OperationFactor").value;
            var operand = {
                type: operationType,
                factor: operationValue,
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
        window.addEventListener("scroll", function (e) {
            // get the current mouse position to know if it is within the 
            // level editor
            // then move the level editor up or down 
        });
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
        startGame.onclick = function (e) {
            e.stopPropagation();
            // serialize game, send to game script
            _this.startGame();
        };
        // this.levelDesignerCtx.addEventListener("dblclick", (e) => {
        //     e.stopPropagation();
        //     console.log("double clicked");
        //     const pos = [e.offsetX, e.offsetY];
        //     this.mouseDoubleClicked(pos);
        // });
    }
    LevelDesigner.prototype.addToClipBoard = function (uiElement) {
    };
    LevelDesigner.prototype.startGame = function () {
        this.serializedGame = {
            gameName: "Game",
            gameElements: this.gameElements.map(function (element) { return element.serialize(); }),
        };
        var serializedGame = JSON.stringify(this.serializedGame);
        // I should unselect whatever is selected.
        // events being the main issue since they have things
        // on the game 
        this.engine.gameScript.startGame(serializedGame);
        this.engine.gameEditorOpened = false;
    };
    LevelDesigner.prototype.makeTime = function (time, parentScene) {
        if (parentScene === void 0) { parentScene = this.expandedScenes[this.expandedScenes.length - 1]; }
        var newElementPosition = this.getNewDrawPosition();
        var timeObject = new _DesignElements_Time__WEBPACK_IMPORTED_MODULE_8__.TimeObject(this, { waitTime: time }, newElementPosition, parentScene);
        this.selectedGameElement = timeObject;
        return timeObject;
    };
    LevelDesigner.prototype.makeOperation = function (operand, parentScene) {
        if (parentScene === void 0) { parentScene = this.expandedScenes[this.expandedScenes.length - 1]; }
        var newElementPosition = this.getNewDrawPosition();
        var operationObject = new _DesignElements_Operation__WEBPACK_IMPORTED_MODULE_10__.OperationObject(this, operand, newElementPosition, parentScene);
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
        (_b = this.expandedScenes[parentIndex + 1]) === null || _b === void 0 ? void 0 : _b.unExpandScene();
        scene.gameElements.forEach(function (element) {
            element.parentSceneExpanded();
            _this.addUIElementSprite(element.UILineSprite);
        });
        this.expandedScenes.push(scene);
    };
    LevelDesigner.prototype.unExpandScene = function (scene) {
        if (this.expandedScenes.length === 1)
            return console.log("can't unexpand the base scene");
        if (this.expandedScenes.indexOf(scene) === -1)
            return console.log("scene not expanded");
        var bottomExpandedScene = this.expandedScenes.pop();
        this.removeExpandedElements(bottomExpandedScene);
        bottomExpandedScene.expanded = false;
        bottomExpandedScene.UILineSprite.expanded = false;
        if (scene !== bottomExpandedScene)
            bottomExpandedScene.parentScene.unExpandScene();
    };
    LevelDesigner.prototype.mouseMoveEvent = function (e) {
        if (e.target.classList[0] === "level-editor-canvas") {
            this.currentMousePos = [e.offsetX, e.offsetY];
            if (this.UIElementMouseFollower) {
                var moveToPosition = [e.offsetX - this.draggingLineSprite.widthHeight[0] / 2, e.offsetY - this.draggingLineSprite.widthHeight[1] / 2];
                this.draggingLineSprite.transform.pos = __spreadArray([], moveToPosition, true);
                // check if the element is overlapping with another element
                var bottomExpandedScene = this.expandedScenes[this.expandedScenes.length - 1];
                var draggedElementSceneIndex = bottomExpandedScene.gameElements.indexOf(this.UIElementMouseFollower);
                if (draggedElementSceneIndex === -1)
                    return;
                var leftElementIndex = draggedElementSceneIndex - 1;
                var rightElementIndex = draggedElementSceneIndex + 1;
                var draggedElementXPosition = this.draggingLineSprite.transform.pos[0];
                var draggedElementWidth = this.draggingLineSprite.widthHeight[0];
                // check left element:
                var moved = false;
                if (leftElementIndex >= 0) {
                    var leftElement = bottomExpandedScene.gameElements[leftElementIndex];
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
                if (rightElementIndex < bottomExpandedScene.gameElements.length && moved === false) {
                    var rightElement = bottomExpandedScene.gameElements[rightElementIndex];
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
        var expandedElements = bottomExpandedScene.gameElements;
        bottomExpandedScene.gameElements = [];
        expandedElements.forEach(function (element) {
            var newPos = _this.getNewDrawPosition();
            element.transform.pos = newPos;
            bottomExpandedScene.gameElements.push(element);
        });
    };
    LevelDesigner.prototype.makeLoop = function (loop, parentScene) {
        if (parentScene === void 0) { parentScene = this.expandedScenes[this.expandedScenes.length - 1]; }
        var beginningObject = new _DesignElements_Loop__WEBPACK_IMPORTED_MODULE_9__.LoopBeginningObject(this, undefined, this.getNewDrawPosition(), parentScene);
        var endObject = new _DesignElements_Loop__WEBPACK_IMPORTED_MODULE_9__.LoopEndObject(this, loop, this.getNewDrawPosition(), parentScene);
        beginningObject.endLoopObject = endObject;
        endObject.beginningLoopObject = beginningObject;
    };
    LevelDesigner.prototype.makeLoopBeginning = function (loop, parentScene) {
        var loopBeginning = new _DesignElements_Loop__WEBPACK_IMPORTED_MODULE_9__.LoopBeginningObject(this, undefined, this.getNewDrawPosition(), parentScene);
        this.loopBeginningObjectStackForLoading.push(loopBeginning);
        return loopBeginning;
    };
    LevelDesigner.prototype.makeLoopEnding = function (loop, parentScene) {
        var loopEndObject = new _DesignElements_Loop__WEBPACK_IMPORTED_MODULE_9__.LoopEndObject(this, loop, this.getNewDrawPosition(), parentScene);
        var matchingBeginning = this.loopBeginningObjectStackForLoading.pop();
        matchingBeginning.endLoopObject = loopEndObject;
        loopEndObject.beginningLoopObject = matchingBeginning;
        return loopEndObject;
    };
    LevelDesigner.prototype.moveLeft = function (UIElement) {
        var gameElements = this.expandedScenes[this.expandedScenes.length - 1].gameElements;
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
        var gameElements = this.expandedScenes[this.expandedScenes.length - 1].gameElements;
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
    LevelDesigner.prototype.saveGameDesign = function () {
        var gameElements = this.gameElements.map(function (element) { return element.serialize(); });
        this.serializedGame = {
            gameName: "Game",
            gameElements: gameElements,
        };
        console.log(JSON.stringify(this.serializedGame));
    };
    LevelDesigner.prototype.loadGameDesign = function (json) {
        var serializedGame = JSON.parse(json);
        this.serializedGame = serializedGame;
        this.gameElements = this.loadGameElements(serializedGame.gameElements);
    };
    LevelDesigner.prototype.loadGameElements = function (serializedGameElements, parentScene) {
        var _this = this;
        if (parentScene === void 0) { parentScene = this; }
        return serializedGameElements.map(function (serializedElement) {
            if (serializedElement.type === "Scene") {
                var newScene = _this.makeSceneObject(serializedElement.name, parentScene);
                _this.expandedScenes.push(newScene);
                newScene.gameElements = _this.loadGameElements(serializedElement.gameElements, newScene) || [];
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
                return _this.makeLoopBeginning(serializedElement, parentScene);
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
        var event = new _DesignElements_Event__WEBPACK_IMPORTED_MODULE_7__.EventObject(this, eventToLoad, newElementPosition, parentScene);
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
        var expandedElements = bottomExpandedScene.gameElements;
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
        return (new _DesignElements_Scene__WEBPACK_IMPORTED_MODULE_5__.SceneObject(this, name, parentScene, newElementPosition));
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
        this.shipRelative.checked = event.isShipRelative;
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
    LevelDesigner.prototype.getPalletModal = function () {
        var modal = document.getElementById("pallet");
        // add functions to buttons of the pallet
    };
    // enemyPlaced(spawn) {
    //     this.animationView.enemyPlaced(spawn);
    // }
    LevelDesigner.prototype.escapePressed = function () {
        var _a;
        if (!this.currentEnemyPlacer.placed) {
            (_a = this.currentEnemyPlacer) === null || _a === void 0 ? void 0 : _a.remove();
        }
        this.animationView.clear();
        this.currentEnemyPlacer = undefined;
    };
    LevelDesigner.prototype.addEnemyButton = function (type) {
        var _a;
        this.animationView.clear();
        this.animationView.addEnemy(type);
        (_a = this.currentEnemyPlacer) === null || _a === void 0 ? void 0 : _a.remove();
        if (this.selectedGameElement.enemyPlacers) {
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
            this.UIElementMouseFollower = undefined;
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
    LevelDesigner.prototype.addRandomRandomSpawnToEvent = function (spawn) {
        var _a;
        if (this.selectedGameElement.enemyPlacers) {
            (_a = this.selectedGameElement) === null || _a === void 0 ? void 0 : _a.addRandomRandom(new _DesignElements_Spawn__WEBPACK_IMPORTED_MODULE_6__.Spawn(spawn, this.engine));
        }
    };
    LevelDesigner.prototype.update = function (deltaTime) {
    };
    LevelDesigner.prototype.createWalls = function () {
        return new _game_objects_Walls_walls__WEBPACK_IMPORTED_MODULE_0__.Walls(this.engine, this);
    };
    LevelDesigner.prototype.createGrid = function (cameraTransform) {
        return new _game_objects_particles_Grid_grid__WEBPACK_IMPORTED_MODULE_2__.Grid(this.engine, this, new _transform__WEBPACK_IMPORTED_MODULE_4__.Transform());
    };
    LevelDesigner.prototype.createOverlay = function () {
        return new _game_objects_Overlay_overlay__WEBPACK_IMPORTED_MODULE_1__.Overlay(this.engine, this, this.ship.transform);
    };
    LevelDesigner.prototype.isOutOfBounds = function (pos, radius) {
        var max = [_game_script__WEBPACK_IMPORTED_MODULE_3__.GameScript.DIM_X - radius, _game_script__WEBPACK_IMPORTED_MODULE_3__.GameScript.DIM_Y - radius];
        if (radius) {
            return (pos[0] <= radius ||
                pos[0] >= max[0] ||
                pos[1] <= radius ||
                pos[1] >= max[1]);
        }
        else {
            return (pos[0] < 0 ||
                pos[1] < 0 ||
                pos[0] > _game_script__WEBPACK_IMPORTED_MODULE_3__.GameScript.DIM_X ||
                pos[1] > _game_script__WEBPACK_IMPORTED_MODULE_3__.GameScript.DIM_Y);
        }
    };
    LevelDesigner.prototype.runUIActions = function () {
        this.UIActionsToRun.forEach(function (action) { return action(); });
        this.UIActionsToRun = [];
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
    LevelDesigner.prototype.animateGameObjects = function (delta) {
        // this.gameObjects.forEach((object) => {
        //     object.animate(delta);
        // });
    };
    LevelDesigner.prototype.clearCanvas = function () {
        this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
    };
    LevelDesigner.prototype.clear = function () {
        var _this = this;
        var removeList = __spreadArray([], this.gameObjects, true);
        removeList.forEach(function (gameObject) {
            _this.remove(gameObject);
        });
        this.overlayTextCleared = true;
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
    LevelDesigner.prototype.queueSound = function () {
    };
    LevelDesigner.prototype.addCollider = function () { };
    LevelDesigner.prototype.addPhysicsComponent = function () { };
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
        var UIElements = expandedScene.gameElements;
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
        var index = this.gameElements.indexOf(element);
        if (index !== -1)
            this.gameElements.splice(index, 1);
    };
    LevelDesigner.prototype.addUIElementSprite = function (UILineSprite) {
        this.UIElementSprites.push(UILineSprite);
    };
    LevelDesigner.prototype.addUIElement = function (UIElement) {
        var bottomExpandedScene = this.expandedScenes[this.expandedScenes.length - 1];
        bottomExpandedScene.gameElements.push(UIElement);
    };
    LevelDesigner.prototype.addLineSprite = function (lineSprite) {
        this.lineSprites.push(lineSprite);
    };
    LevelDesigner.prototype.makeCoordinatesShipRelative = function () {
        var _a;
        (_a = this.selectedGameElement) === null || _a === void 0 ? void 0 : _a.makeCoordinatesShipRelative();
    };
    LevelDesigner.prototype.eventLoadShipRelative = function (isRelative) {
        this.shipRelative.checked = isRelative;
        console.log('loading ship', this.shipRelative);
    };
    LevelDesigner.prototype.makeCoordinatesArenaRelative = function () {
        var _a;
        (_a = this.selectedGameElement) === null || _a === void 0 ? void 0 : _a.makeCoordinatesArenaRelative();
    };
    return LevelDesigner;
}());



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
        this.levelDesigner.UIElementMouseFollower = null;
        this.levelDesigner.removeUIElementSprite(this.levelDesigner.draggingLineSprite);
        this.levelDesigner.draggingLineSprite = null;
        // send to ghost position
    };
    UIElement.prototype.followMouse = function () {
        this.levelDesigner.UIElementMouseFollower = this;
        this.levelDesigner.draggingLineSprite = this.copyLineSpriteForDragging();
        this.levelDesigner.addUIElementSprite(this.levelDesigner.draggingLineSprite);
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
/* harmony import */ var _game_script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game_script */ "./src/game_script.ts");

var GameEngine = /** @class */ (function () {
    function GameEngine(ctx) {
        this.ctx = ctx;
        window.engine = this;
        this.gameObjects = [];
        this.physicsComponents = [];
        this.lineSprites = [];
        this.soundsToPlay = {};
        this.colliders = {};
        this.subscribers = [];
        this.muted = true;
        this.mouseListeners = [];
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
        this.xButtonListeners = [];
        this.startButtonListeners = [];
        this.gameScript = new _game_script__WEBPACK_IMPORTED_MODULE_0__.GameScript(this);
        // this.toRemoveQueue = [];
        this.paused = false;
        // this.currentCamera = null;
        this.defaultZoomScale = 1.3;
        this.zoomScale = 1.3;
        this.graphicQuality = 1;
        this.setupController();
        this.setupPerformance();
        this.gameEditorOpened = false;
        this.frameCountForPerformance = 0;
        this.levelDesigner = null;
        this.stillCanDie = false;
    }
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
            window.engine.controller = e.gamepad;
            // Gamepad connected
            console.log("Gamepad connected", e.gamepad);
        });
        window.addEventListener("gamepaddisconnected", function (e) {
            // Gamepad disconnected
            window.engine.controller = null;
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
        if (this.paused) {
            this.updateControlListeners();
            return;
        }
        // console.log(delta)
        // if(delta > 125){
        //   delta = 125
        // }
        var beforeCollisionTime = performance.now();
        this.checkCollisions();
        var beforePhysicsCalcs = performance.now();
        var collisionTime = beforePhysicsCalcs - beforeCollisionTime;
        this.movePhysicsComponents(delta);
        var beforeUpdate = performance.now();
        var physicsCalcTime = beforeUpdate - beforePhysicsCalcs;
        this.updateGameObjects(delta);
        var beforeRender = performance.now();
        var updateTime = beforeRender - beforeUpdate;
        this.clearCanvas();
        this.renderLineSprites(this.ctx);
        var beforeScriptUpdate = performance.now();
        var renderTime = beforeScriptUpdate - beforeRender;
        this.updateControlListeners();
        if (!this.gameEditorOpened) {
            this.updateGameScript(delta);
        }
        var scriptTime = performance.now() - beforeScriptUpdate;
        this.playSounds();
        this.collectPerformanceData(delta, collisionTime, physicsCalcTime, updateTime, renderTime, scriptTime);
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
    GameEngine.prototype.clearCanvas = function () {
        this.ctx.clearRect(-_game_script__WEBPACK_IMPORTED_MODULE_0__.GameScript.DIM_X, -_game_script__WEBPACK_IMPORTED_MODULE_0__.GameScript.DIM_Y, _game_script__WEBPACK_IMPORTED_MODULE_0__.GameScript.DIM_X * this.zoomScale * 4, _game_script__WEBPACK_IMPORTED_MODULE_0__.GameScript.DIM_Y * this.zoomScale * 4);
        this.ctx.fillStyle = _game_script__WEBPACK_IMPORTED_MODULE_0__.GameScript.BG_COLOR;
        this.ctx.fillRect(-_game_script__WEBPACK_IMPORTED_MODULE_0__.GameScript.DIM_X, -_game_script__WEBPACK_IMPORTED_MODULE_0__.GameScript.DIM_Y, _game_script__WEBPACK_IMPORTED_MODULE_0__.GameScript.DIM_X * this.zoomScale * 4, _game_script__WEBPACK_IMPORTED_MODULE_0__.GameScript.DIM_Y * this.zoomScale * 4);
    };
    GameEngine.prototype.addLeftControlStickListener = function (object) {
        this.leftControlStickListeners.push(object);
    };
    GameEngine.prototype.addRightControlStickListener = function (object) {
        this.rightControlStickListeners.push(object);
    };
    GameEngine.prototype.addXButtonListener = function (object) {
        this.xButtonListeners.push(object);
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
    GameEngine.prototype.updateLeftControlStickListeners = function (unitVector) {
        this.leftControlStickListeners.forEach(function (listener) {
            listener.updateLeftControlStickInput(unitVector);
        });
    };
    GameEngine.prototype.updateRightControlStickListeners = function (unitVector) {
        this.rightControlStickListeners.forEach(function (listener) {
            listener.updateRightControlStickInput(unitVector);
        });
    };
    GameEngine.prototype.updateXButtonListeners = function (xButton) {
        this.xButtonListeners.forEach(function (listener) {
            listener.updateXButtonListener(xButton);
        });
    };
    GameEngine.prototype.updateStartButtonListeners = function (pressed) {
        // console.log([startButton, down])
        this.startButtonListeners.forEach(function (listener) {
            listener.updateStartButtonListener(pressed);
        });
    };
    // called by game view
    GameEngine.prototype.updateMousePos = function (mousePos) {
        this.mouseListeners.forEach(function (object) {
            object.updateMousePos(mousePos);
        });
    };
    GameEngine.prototype.removeMouseListener = function (object) {
        var index = this.mouseListeners.indexOf(object);
        if (index !== -1)
            this.mouseListeners.splice(index, 1);
    };
    GameEngine.prototype.updateControlListeners = function () {
        navigator.getGamepads();
        if (this.controller) {
            var leftAxis = [window.controller.axes[0], window.controller.axes[1]];
            var rightAxis = [window.controller.axes[2], window.controller.axes[3]];
            var xButton = window.controller.buttons[0].pressed;
            var startButton = window.controller.buttons[9].pressed;
            this.updateXButtonListeners(xButton);
            this.updateLeftControlStickListeners(leftAxis);
            this.updateRightControlStickListeners(rightAxis);
            this.updateStartButtonListeners(startButton);
        }
    };
    GameEngine.prototype.movePhysicsComponents = function (delta) {
        this.physicsComponents.forEach(function (component) {
            component.move(delta);
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
        var _this = this;
        // collider {
        //   "objectType": "Bullet",
        //   "type": "general",
        //   "subscriptions": ["BoxBox", "Arrow"],
        //   "subscribedColliderTypes": ["general"]
        // }
        var subscribers = this.subscribers;
        var colliders = this.colliders;
        this.stillCanDie = false;
        // console.log(this.subscribers)
        subscribers.forEach(function (subscriber) {
            if (subscriber.type === "ShipDeath") { // gameScript stuff
                _this.stillCanDie = true;
                // console.log("CAN DIE")
            }
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
        if (!this.stillCanDie) {
            // console.log(this.gameScript.ship.collider)
            this.gameScript.ship.addCollider("General", this.gameScript.ship, this.gameScript.ship.radius, null, null);
            this.gameScript.ship.addCollider("ShipDeath", this.gameScript.ship, this.gameScript.ship.radius, ["BoxBox", "Singularity", "Weaver", "Grunt", "Arrow", "Pinwheel"], ["General"]);
        }
    };
    GameEngine.prototype.updateGameObjects = function (delta) {
        this.gameObjects.forEach(function (object) {
            object.update(delta);
        });
    };
    GameEngine.prototype.toggleMute = function () {
        this.muted = !this.muted;
    };
    GameEngine.prototype.playSounds = function () {
        Object.values(this.soundsToPlay).forEach(function (sound) {
            sound.play();
        });
        this.soundsToPlay = {};
    };
    GameEngine.prototype.renderLineSprites = function (ctx) {
        // ctx.scale = gameEngine.currentCamera.zoomScale
        this.ctx.save();
        // this belongs in the camera #camera
        this.ctx.scale(this.zoomScale, this.zoomScale);
        this.lineSprites.forEach(function (sprite) {
            sprite.draw(ctx);
        });
        this.ctx.restore();
        // ctx.scale(1,1)
    };
    GameEngine.prototype.addMouseListener = function (object) {
        this.mouseListeners.push(object);
    };
    GameEngine.prototype.updateGameScript = function (delta) {
        this.gameScript.update(delta);
    };
    GameEngine.prototype.addGameObject = function (object) {
        this.gameObjects.push(object);
    };
    GameEngine.prototype.addPhysicsComponent = function (physicsComponent) {
        this.physicsComponents.push(physicsComponent);
    };
    GameEngine.prototype.addLineSprite = function (lineSprite) {
        this.lineSprites.push(lineSprite);
    };
    GameEngine.prototype.queueSound = function (sound) {
        if (!this.muted) {
            this.soundsToPlay[sound.url] = sound;
        }
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
    GameObject.prototype.addLeftControlStickListener = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.addLeftControlStickListener(this);
    };
    GameObject.prototype.addRightControlStickListener = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.addRightControlStickListener(this);
    };
    GameObject.prototype.addXButtonListener = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.addXButtonListener(this);
    };
    GameObject.prototype.addStartButtonListener = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.addStartButtonListener(this);
    };
    GameObject.prototype.updateRightControlStickInput = function (direction) { return console.log(direction, 'overwright updateRightControlStickInput'); }; // TODO include object name
    GameObject.prototype.updateLeftControlStickInput = function (direction) { return console.log(direction, 'overwrite updateLeftControlStickInput'); }; // TODO include object name
    GameObject.prototype.updateXButtonListener = function (pressed) { return console.log(pressed, "overwright updateXButtonListener"); }; // TODO include object name
    GameObject.prototype.updateStartButtonListener = function (pressed) { return console.log(pressed, 'overwright updateStartButtonListener'); }; // TODO include object name
    GameObject.prototype.updateMousePos = function (mousePos) { return console.log(mousePos, 'overwrite updateMousePos'); }; // TODO include object name
    GameObject.prototype.addClickListener = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.addClickListener(this);
    };
    GameObject.prototype.removeClickListener = function () {
        if (this.gameEngine instanceof _game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine)
            this.gameEngine.removeClickListener(this);
    };
    GameObject.prototype.mouseClicked = function (mousePos) { return console.log(mousePos, 'overwright mouseClicked'); }; // TODO include object name
    GameObject.prototype.mouseDowned = function (mousePos) { return console.log(mousePos, 'overwright mouseDowned'); }; // TODO include object name
    GameObject.prototype.mouseDoubleClicked = function (mousePos) { return console.log(mousePos, 'overwright mouseDoubleClicked'); }; // TODO include object name
    GameObject.prototype.addCollider = function (type, gameObject, radius, subscriptionTypes, subscriptions) {
        // game engine checks every collider with it's subscription types
        var newCollider = new _collider__WEBPACK_IMPORTED_MODULE_2__.Collider(type, gameObject, radius, subscriptionTypes, subscriptions);
        this.colliders.push(newCollider);
        this.gameEngine.addCollider(newCollider);
    };
    GameObject.prototype.playSound = function (sound) {
        this.gameEngine.queueSound(sound);
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
    // remove is the issue
    // i need a remove queue!!!
    // ... I think
    GameObject.prototype.remove = function () {
        this.childObjects.forEach(function (obj) {
            obj.remove();
        });
        if (this.parentObject) {
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
/* harmony export */   PhysicsComponent: () => (/* binding */ PhysicsComponent)
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
    };
    return PhysicsComponent;
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
var Sound = /** @class */ (function () {
    function Sound(url, volume, muted) {
        if (volume === void 0) { volume = 1; }
        if (muted === void 0) { muted = false; }
        this.url = url;
        this.volume = volume;
        this.muted = muted;
    }
    Sound.prototype.play = function () {
        // if (this.sound) {
        //   this.sound.play()
        // } else {
        this.sound = new Audio(this.url);
        this.sound.volume = this.volume;
        this.sound.play();
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
            if (this.cameraTransform) {
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
        var linePosition = this.vectorAdd([0, 0, 0], this.pos);
        var Zc = this.cameraTransform.pos[2];
        var pointOne = length / 2;
        var pointTwo = -length / 2;
        var Zs = linePosition[2];
        var absPointOne = (pointOne) / (Zs - Zc) * (0 - Zc);
        var absPointTwo = (pointTwo) / (Zs - Zc) * (0 - Zc);
        return absPointOne - absPointTwo;
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
/* harmony export */   VectorMath: () => (/* binding */ VectorMath)
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
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/sound */ "./src/game_engine/sound.ts");
/* harmony import */ var _particles_bullet_wall_explosion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../particles/bullet_wall_explosion */ "./src/game_objects/particles/bullet_wall_explosion.ts");
/* harmony import */ var _bullet_sprite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bullet_sprite */ "./src/game_objects/Bullet/bullet_sprite.js");
/* harmony import */ var _particles_particle_explosion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../particles/particle_explosion */ "./src/game_objects/particles/particle_explosion.ts");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../game_engine/util */ "./src/game_engine/util.ts");
/* harmony import */ var _enemies_Singularity_singularity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../enemies/Singularity/singularity */ "./src/game_objects/enemies/Singularity/singularity.ts");
/* harmony import */ var _game_script__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../game_script */ "./src/game_script.ts");
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
        _this.wallhit = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__.Sound("sounds/bullet_hitwall.wav", 1);
        _this.addExplosionCollider();
        _this.addPhysicsComponent();
        _this.addLineSprite(new _bullet_sprite__WEBPACK_IMPORTED_MODULE_3__.BulletSprite(_this.transform));
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
        if (_game_script__WEBPACK_IMPORTED_MODULE_7__.GameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius) &&
            !this.exploded) {
            this.exploded = true;
            new _particles_bullet_wall_explosion__WEBPACK_IMPORTED_MODULE_2__.BulletWallExplosion(this.gameEngine, this.transform.pos);
            this.gameEngine.queueSound(this.wallhit);
            this.remove();
        }
    };
    Bullet.prototype.bend = function (deltaTime) {
        this.bendTime += deltaTime;
        if (this.bendTime > this.timeToBend) {
            this.bending = false;
        }
        else {
            var speed = _game_engine_util__WEBPACK_IMPORTED_MODULE_5__.VectorMath.norm(this.transform.vel);
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
            if (collider.gameObject instanceof _enemies_Singularity_singularity__WEBPACK_IMPORTED_MODULE_6__.Singularity) {
                collider.gameObject.bulletHit();
                this.remove();
            }
            else {
                var hitObjectTransform = collider.gameObject.transform;
                var pos = hitObjectTransform.absolutePosition();
                new _particles_particle_explosion__WEBPACK_IMPORTED_MODULE_4__.ParticleExplosion(this.gameEngine, pos);
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
/* harmony export */   BedSprite: () => (/* binding */ BedSprite)
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
        var bodySpinAngle = this.entity.spriteParameters.bodyAngle.size;
        var percentageCovered = bodySpinAngle / Math.PI;
        this.spriteParameters.covers.yOffset.size = -percentageCovered * this.spriteParameters.covers.yOffset.max();
    };
    Bed.prototype.exist = function () {
        this.addCollider("General", this, 5);
    };
    return Bed;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

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
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__.LineSprite));

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
        _this.possibleActivities = {
            moveTo: function (location) {
                _this.activitiesQueue.push({
                    name: "moveTo",
                    location: location
                });
            },
            sleep: function (bed) {
                _this.activitiesQueue.push({
                    name: "goToSleep",
                    bed: bed,
                    subActivities: [
                        {
                            name: "moveTo",
                            location: bed.transform.pos
                        },
                        {
                            name: "goToSleep",
                            bed: bed
                        },
                        {
                            name: "wait",
                            time: 5000,
                            waitedTime: 0
                        }
                    ]
                });
            },
            wait: function (time) {
                _this.activitiesQueue.push({
                    name: "wait",
                    time: time,
                    waitedTime: 0
                });
            },
            wakeUp: function () {
                _this.activitiesQueue.push({
                    name: "wakeUp",
                });
            }
        };
        _this.transform.pos = pos;
        _this.transform.angle = Math.PI;
        _this.moveToSpeed = 2;
        _this.moveToAcceleration = 0.125 / 6;
        _this.squeezing = true;
        _this.closing = true;
        _this.activitiesQueue = [];
        _this.addPhysicsComponent();
        _this.currentBed;
        _this.currentAnimation = null;
        // I need to figure out shared animations
        // and how to reference a real bed since I don't want to 
        // craft how a user or entity would find and tell the entity or itself to use it
        // yet
        // this array will have to be created
        // all-righty, this should be constructed the same way
        // as the scene generator and rootScene
        // each activity type with its own object
        // and update being the function that they all have
        // then that means creation of the objects will be the same
        // and a pre loaded creation method will need to be made
        // this.previousUniqueActivity = {};
        // this.activitiesByGoals = {};
        _this.possibleActivities.moveTo([700, 500]);
        _this.spriteParameters = {
            armLength: Entity.baseParameters.armLength,
            lineThickness: Entity.baseParameters.lineThickness,
            bodyAngle: {
                size: 0,
                originalSize: 0,
                changeSize: function (_a) {
                    var _b = _a.min, min = _b === void 0 ? undefined : _b, _c = _a.max, max = _c === void 0 ? undefined : _c, angleChange = _a.angleChange;
                    _this.spriteParameters.bodyAngle.size += angleChange;
                    if (min !== undefined) {
                        if (_this.spriteParameters.bodyAngle.size < min) {
                            _this.spriteParameters.bodyAngle.size = min;
                            return true;
                        }
                    }
                    if (max !== undefined) {
                        if (_this.spriteParameters.bodyAngle.size > max) {
                            _this.spriteParameters.bodyAngle.size = max;
                            return true;
                        }
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
            curves: {
                left: {
                    top: {
                        getCoordinate: function () { return ([
                            -_this.spriteParameters.width.size / 3,
                            _this.spriteParameters.height.size / 2
                        ]); }
                    },
                    topCurvePoint: {
                        getCoordinate: function () { return ([
                            -5 / 9 * _this.spriteParameters.width.size,
                            1 / 3 * _this.spriteParameters.height.size
                        ]); }
                    },
                    bottomCurvePoint: {
                        getCoordinate: function () { return ([
                            -5 / 9 * _this.spriteParameters.width.size,
                            -1 / 3 * _this.spriteParameters.height.size
                        ]); }
                    },
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
                            max: function () { return (_this.spriteParameters.width.size / 2 / 2 - _this.spriteParameters.lineThickness * 1.5); },
                            min: function () { return (-_this.spriteParameters.width.size / 2 / 2); },
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
                            size: 0,
                            originalSize: 0,
                            // setSize: () => {this.spriteParameters.arms.left.position.y.size = 0;}
                        }
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
                        getCoordinate: function () { return [
                            _this.spriteParameters.arms.left.position.x.size + Math.cos(_this.spriteParameters.arms.left.angle.size) * (_this.spriteParameters.arms.left.length.size + _this.spriteParameters.height.size / 2),
                            _this.spriteParameters.arms.left.position.y.size + Math.sin(_this.spriteParameters.arms.left.angle.size) * (_this.spriteParameters.arms.left.length.size + _this.spriteParameters.height.size / 2)
                        ]; }
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
                    position: {
                        x: {
                            size: Entity.baseParameters.width / 2 / 2,
                            originalSize: Entity.baseParameters.width / 2 / 2,
                            max: function () { return (_this.spriteParameters.width.size / 2 / 2); },
                            min: function () { return (-_this.spriteParameters.width.size / 2 / 2 + _this.spriteParameters.lineThickness * 1.5); },
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
                            size: 0,
                            originalSize: 0,
                            // setSize: () => {this.spriteParameters.arms.right.position.y.size = 0;}
                        }
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
                        getCoordinate: function () { return [
                            _this.spriteParameters.arms.right.position.x.size + Math.cos(_this.spriteParameters.arms.right.angle.size) * (_this.spriteParameters.arms.right.length.size + _this.spriteParameters.height.size / 2),
                            _this.spriteParameters.arms.right.position.y.size + Math.sin(_this.spriteParameters.arms.right.angle.size) * (_this.spriteParameters.arms.right.length.size + _this.spriteParameters.height.size / 2)
                        ]; }
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
        return _this;
    }
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
    Entity.prototype.doActivity = function (activity) {
        if (activity.subActivities) {
            this.doActivity(activity.subActivities[0]);
        }
        else if (activity.name === "moveTo") {
            if (this.checkArrived(activity.location)) {
                this.transform.pos[0] = activity.location[0];
                this.transform.pos[1] = activity.location[1];
                this.transform.vel[0] = 0;
                this.transform.vel[1] = 0;
                this.activitiesQueue.shift();
            }
            else {
                this.moveTowards(activity.location);
            }
        }
        else if (activity.name === "interact") {
            this.doActivity(activity);
        }
    };
    Entity.prototype.moveTowards = function (location) {
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
        var speed = this.moveToSpeed;
        var pos = this.transform.absolutePosition();
        var distanceRemaining = _game_engine_util__WEBPACK_IMPORTED_MODULE_2__.VectorMath.dist(pos, location);
        var decelerateDistance = Math.pow(this.transform.vel[0], 2) / (2 * this.moveToAcceleration);
        if (distanceRemaining < decelerateDistance) {
            var accelerationDirection = Math.atan2(this.transform.vel[1], this.transform.vel[0]);
            this.transform.acc[0] -= this.moveToAcceleration * Math.cos(accelerationDirection);
            this.transform.acc[1] -= this.moveToAcceleration * Math.sin(accelerationDirection);
        }
        else {
            var deltaPosition = [location[0] - pos[0], location[1] - pos[1]];
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
            this.transform.acc[0] += this.moveToAcceleration * Math.cos(accelerationDirection);
            this.transform.acc[1] += this.moveToAcceleration * Math.sin(accelerationDirection);
            // console.log(this.transform.acc)
        }
    };
    Entity.prototype.update = function (dT) {
        // this would be where an entity get's to decide
        // if it is adding something to the top of the activity queue
        // and if it is deleting something from the activity queue
        if (this.activitiesQueue.length) {
            this.doActivity(this.activitiesQueue[0]);
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
        var rightArmEnd = spriteParameters.arms.right.endPosition.getCoordinate();
        var rightArmPosition = [
            spriteParameters.arms.right.position.x.size,
            spriteParameters.arms.right.position.y.size
        ];
        var leftArmEnd = spriteParameters.arms.left.endPosition.getCoordinate();
        var leftArmPosition = [
            spriteParameters.arms.left.position.x.size,
            spriteParameters.arms.left.position.y.size
        ];
        var curveTopRight = spriteParameters.curves.right.top.getCoordinate();
        var curvePointTopRight = spriteParameters.curves.right.topCurvePoint.getCoordinate();
        var curvePointBottomRight = spriteParameters.curves.right.bottomCurvePoint.getCoordinate();
        var curveBottomRight = spriteParameters.curves.right.bottom.getCoordinate();
        var curveBottomLeft = spriteParameters.curves.left.bottom.getCoordinate();
        var curvePointBottomLeft = spriteParameters.curves.left.bottomCurvePoint.getCoordinate();
        var curvePointTopLeft = spriteParameters.curves.left.topCurvePoint.getCoordinate();
        var curveTopLeft = spriteParameters.curves.left.top.getCoordinate();
        var rightEyePosition = [
            spriteParameters.eye.right.position.x.size,
            spriteParameters.eye.right.position.y.size
        ];
        var rightEyeRadius = [
            spriteParameters.eye.right.radius.x.size,
            spriteParameters.eye.right.radius.y.size
        ];
        var leftEyePosition = [
            spriteParameters.eye.left.position.x.size,
            spriteParameters.eye.left.position.y.size
        ];
        var leftEyeRadius = [
            spriteParameters.eye.left.radius.x.size,
            spriteParameters.eye.left.radius.y.size
        ];
        var bodyAngle = spriteParameters.bodyAngle.size;
        ctx.lineWidth = spriteParameters.lineThickness;
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // Arms
        ctx.moveTo(rightArmEnd[0], rightArmEnd[1]); // 1
        ctx.lineTo(rightArmPosition[0], rightArmPosition[1]); // 2 
        ctx.moveTo(leftArmEnd[0], leftArmEnd[1]); // 11
        ctx.lineTo(leftArmPosition[0], leftArmPosition[1]); // 9
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

/***/ "./src/game_objects/ClockworkGames/Sandwich.ts":
/*!*****************************************************!*\
  !*** ./src/game_objects/ClockworkGames/Sandwich.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LeftSandwich: () => (/* binding */ LeftSandwich),
/* harmony export */   LeftSandwichSprite: () => (/* binding */ LeftSandwichSprite),
/* harmony export */   RightSandwich: () => (/* binding */ RightSandwich),
/* harmony export */   RightSandwichSprite: () => (/* binding */ RightSandwichSprite)
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


var LeftSandwich = /** @class */ (function (_super) {
    __extends(LeftSandwich, _super);
    function LeftSandwich(engine, pos) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos = pos;
        _this.width = 25;
        _this.height = -22;
        _this.animationStates = {
            squishing: true,
            waiting: false,
            waitTime: 0,
            timeToWait: 3000,
        };
        _this.spriteParameters = {
            width: _this.width,
            height: _this.height,
        };
        _this.addLineSprite(new LeftSandwichSprite(_this.transform, _this.spriteParameters));
        return _this;
    }
    LeftSandwich.prototype.update = function () { };
    LeftSandwich.prototype.animate = function (deltaTime) {
        var time = deltaTime / NORMAL_FRAME_TIME_DELTA / 2;
        if (this.animationStates.waiting) {
            this.animationStates.waitTime += deltaTime;
            if (this.animationStates.waitTime >= this.animationStates.timeToWait) {
                this.animationStates.waiting = false;
                this.animationStates.waitTime = 0;
            }
        }
        else {
            if (this.animationStates.squishing) {
                this.spriteParameters.width -= time;
                this.spriteParameters.height -= time;
            }
            else {
                this.spriteParameters.width += time;
                this.spriteParameters.height += time;
            }
            if (this.spriteParameters.width <= this.width * 0.8) {
                this.animationStates.squishing = false;
            }
            if (this.spriteParameters.width >= this.width) {
                this.animationStates.squishing = true;
                this.animationStates.waiting = true;
                this.spriteParameters.width = this.width;
                this.spriteParameters.height = this.height;
            }
        }
    };
    LeftSandwich.prototype.exist = function () {
        this.addCollider("General", this, 5);
    };
    return LeftSandwich;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var LeftSandwichSprite = /** @class */ (function (_super) {
    __extends(LeftSandwichSprite, _super);
    function LeftSandwichSprite(transform, spriteParameters) {
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
    LeftSandwichSprite.prototype.draw = function (ctx) {
        var pos = this.transform.absolutePosition();
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.absoluteAngle());
        this.drawLeftSandwich(ctx);
        ctx.restore();
    };
    LeftSandwichSprite.prototype.drawLeftSandwich = function (ctx) {
        var _a = this.spriteParameters, width = _a.width, height = _a.height;
        ctx.fillStyle = this.bunColor;
        ctx.strokeStyle = this.bunColor;
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(width / 2, height / 2 - 2 / 9 * height);
        ctx.lineTo(width / 2, height / 2);
        //rounded corners on the left side, square on the right
        ctx.lineTo(-width / 2 + 2 / 9 * width, height / 2);
        var curvePointTopLeftTop = [-width / 2 + 1 / 9 * width, height / 2];
        var curvePointTopLeftBottom = [-width / 2, height / 2 - 1 / 9 * height];
        ctx.bezierCurveTo(curvePointTopLeftTop[0], curvePointTopLeftTop[1], curvePointTopLeftBottom[0], curvePointTopLeftBottom[1], -width / 2, height / 2 - 2 / 9 * height);
        ctx.moveTo(-width / 2, -height / 2 + 2 / 9 * height);
        var curvePointBottomLeftTop = [-width / 2, -height / 2 + 1 / 9 * height];
        var curvePointBottomLeftBottom = [-width / 2 + 1 / 9 * width, -height / 2];
        ctx.bezierCurveTo(curvePointBottomLeftTop[0], curvePointBottomLeftTop[1], curvePointBottomLeftBottom[0], curvePointBottomLeftBottom[1], -width / 2 + 2 / 9 * width, -height / 2);
        ctx.lineTo(width / 2, -height / 2);
        ctx.lineTo(width / 2, -height / 2 + 2 / 9 * height);
        ctx.stroke();
        ctx.lineWidth = 0.75;
        ctx.moveTo(width / 2, height / 2 - 2 / 9 * height);
        ctx.lineTo(-width / 2, height / 2 - 2 / 9 * height);
        ctx.stroke();
        ctx.moveTo(width / 2, -height / 2 + 2 / 9 * height);
        ctx.lineTo(-width / 2, -height / 2 + 2 / 9 * height);
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.crimsonRed;
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2 - 3 / 9 * height);
        ctx.lineTo(-width / 2, height / 2 - 3 / 9 * height);
        ctx.stroke();
        ctx.strokeStyle = this.brightGreen;
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2 - 4 / 9 * height);
        ctx.lineTo(-width / 2, height / 2 - 4 / 9 * height);
        ctx.stroke();
        ctx.strokeStyle = this.fucia;
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2 - 5 / 9 * height);
        ctx.lineTo(-width / 2, height / 2 - 5 / 9 * height);
        ctx.stroke();
        ctx.strokeStyle = this.cyan;
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2 - 6 / 9 * height);
        ctx.lineTo(-width / 2, height / 2 - 6 / 9 * height);
        ctx.stroke();
    };
    return LeftSandwichSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__.LineSprite));

var RightSandwich = /** @class */ (function (_super) {
    __extends(RightSandwich, _super);
    function RightSandwich(engine, pos) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos = pos;
        _this.width = 25;
        _this.height = -22;
        _this.animationStates = {
            squishing: true,
            waiting: false,
            waitTime: 0,
            timeToWait: 3000,
        };
        _this.spriteParameters = {
            width: _this.width,
            height: _this.height,
        };
        _this.addLineSprite(new RightSandwichSprite(_this.transform, _this.spriteParameters));
        return _this;
    }
    RightSandwich.prototype.update = function () { };
    RightSandwich.prototype.animate = function (deltaTime) {
        var time = deltaTime / NORMAL_FRAME_TIME_DELTA / 2;
        if (this.animationStates.waiting) {
            this.animationStates.waitTime += deltaTime;
            if (this.animationStates.waitTime >= this.animationStates.timeToWait) {
                this.animationStates.waiting = false;
                this.animationStates.waitTime = 0;
            }
        }
        else {
            if (this.animationStates.squishing) {
                this.spriteParameters.width -= time;
                this.spriteParameters.height -= time;
            }
            else {
                this.spriteParameters.width += time;
                this.spriteParameters.height += time;
            }
            if (this.spriteParameters.width <= this.width * 0.8) {
                this.animationStates.squishing = false;
            }
            if (this.spriteParameters.width >= this.width) {
                this.animationStates.squishing = true;
                this.animationStates.waiting = true;
                this.spriteParameters.width = this.width;
                this.spriteParameters.height = this.height;
            }
        }
    };
    RightSandwich.prototype.exist = function () {
        this.addCollider("General", this, 5);
    };
    return RightSandwich;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var RightSandwichSprite = /** @class */ (function (_super) {
    __extends(RightSandwichSprite, _super);
    function RightSandwichSprite(transform, spriteParameters) {
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
    RightSandwichSprite.prototype.draw = function (ctx) {
        var pos = this.transform.absolutePosition();
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.absoluteAngle());
        this.drawRightSandwich(ctx);
        ctx.restore();
    };
    RightSandwichSprite.prototype.drawRightSandwich = function (ctx) {
        var _a = this.spriteParameters, width = _a.width, height = _a.height;
        ctx.fillStyle = this.bunColor;
        ctx.strokeStyle = this.bunColor;
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(-width / 2, height / 2 - 2 / 9 * height);
        ctx.lineTo(-width / 2, height / 2);
        //rounded corners on the left side, square on the right
        ctx.lineTo(width / 2 + 2 / 9 * -width, height / 2);
        var curvePointTopLeftTop = [width / 2 + 1 / 9 * -width, height / 2];
        var curvePointTopLeftBottom = [width / 2, height / 2 - 1 / 9 * height];
        ctx.bezierCurveTo(curvePointTopLeftTop[0], curvePointTopLeftTop[1], curvePointTopLeftBottom[0], curvePointTopLeftBottom[1], width / 2, height / 2 - 2 / 9 * height);
        ctx.moveTo(width / 2, -height / 2 + 2 / 9 * height);
        var curvePointBottomLeftTop = [width / 2, -height / 2 + 1 / 9 * height];
        var curvePointBottomLeftBottom = [width / 2 + 1 / 9 * -width, -height / 2];
        ctx.bezierCurveTo(curvePointBottomLeftTop[0], curvePointBottomLeftTop[1], curvePointBottomLeftBottom[0], curvePointBottomLeftBottom[1], width / 2 + 2 / 9 * -width, -height / 2);
        ctx.lineTo(-width / 2, -height / 2);
        ctx.lineTo(-width / 2, -height / 2 + 2 / 9 * height);
        ctx.stroke();
        ctx.lineWidth = 0.75;
        ctx.moveTo(-width / 2, height / 2 - 2 / 9 * height);
        ctx.lineTo(width / 2, height / 2 - 2 / 9 * height);
        ctx.stroke();
        ctx.moveTo(-width / 2, -height / 2 + 2 / 9 * height);
        ctx.lineTo(width / 2, -height / 2 + 2 / 9 * height);
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.crimsonRed;
        ctx.beginPath();
        ctx.moveTo(-width / 2, height / 2 - 3 / 9 * height);
        ctx.lineTo(width / 2, height / 2 - 3 / 9 * height);
        ctx.stroke();
        ctx.strokeStyle = this.brightGreen;
        ctx.beginPath();
        ctx.moveTo(-width / 2, height / 2 - 4 / 9 * height);
        ctx.lineTo(width / 2, height / 2 - 4 / 9 * height);
        ctx.stroke();
        ctx.strokeStyle = this.fucia;
        ctx.beginPath();
        ctx.moveTo(-width / 2, height / 2 - 5 / 9 * height);
        ctx.lineTo(width / 2, height / 2 - 5 / 9 * height);
        ctx.stroke();
        ctx.strokeStyle = this.cyan;
        ctx.beginPath();
        ctx.moveTo(-width / 2, height / 2 - 6 / 9 * height);
        ctx.lineTo(width / 2, height / 2 - 6 / 9 * height);
        ctx.stroke();
    };
    return RightSandwichSprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_1__.LineSprite));

var NORMAL_FRAME_TIME_DELTA = 1000 / 60;


/***/ }),

/***/ "./src/game_objects/ClockworkGames/Tree.ts":
/*!*************************************************!*\
  !*** ./src/game_objects/ClockworkGames/Tree.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tree: () => (/* binding */ Tree),
/* harmony export */   TreeSprite: () => (/* binding */ TreeSprite)
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


var Tree = /** @class */ (function (_super) {
    __extends(Tree, _super);
    function Tree(engine, pos) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos = pos;
        _this.transform.angle = 0;
        _this.addLineSprite(new TreeSprite(_this.transform));
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
        return _this;
    }
    Tree.prototype.update = function () { };
    Tree.prototype.exist = function () {
        this.addCollider("General", this, 5);
    };
    return Tree;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var TreeSprite = /** @class */ (function (_super) {
    __extends(TreeSprite, _super);
    function TreeSprite(transform, spawningScale) {
        if (spawningScale === void 0) { spawningScale = 1; }
        var _this = _super.call(this, transform) || this;
        _this.spawningScale = spawningScale;
        _this.transform = transform;
        _this.color = "green";
        _this.width = 30;
        _this.height = 4 / 5 * _this.width;
        return _this;
    }
    TreeSprite.prototype.draw = function (ctx) {
        var pos = this.transform.absolutePosition();
        var w = this.width * this.spawningScale;
        var h = this.height * this.spawningScale;
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        this.drawTree(ctx, h, w);
        ctx.restore();
    };
    TreeSprite.prototype.drawTree = function (ctx, h, w) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#097969";
        ctx.beginPath();
        ctx.moveTo(0, -h / 2); // 1
        ctx.lineTo(3 / 10 * w, -h / 4); // 2
        ctx.lineTo(1 / 5 * w, -h / 4); // 3
        ctx.lineTo(2 / 5 * w, 0); // 4
        ctx.lineTo(3 / 10 * w, 0); // 5
        ctx.lineTo(1 / 2 * w, h / 4); // 6
        ctx.lineTo(1 / 30 * w, h / 4); // 7
        ctx.stroke();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "#E4D00A";
        ctx.beginPath();
        ctx.moveTo(1 / 30 * w, h / 4);
        ctx.lineTo(1 / 30 * w, h / 2); // 8
        ctx.lineTo(-1 / 30 * w, h / 2); // 9
        ctx.lineTo(-1 / 30 * w, h / 4); // 10
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#097969";
        ctx.beginPath();
        ctx.moveTo(-1 / 30 * w, h / 4);
        ctx.lineTo(-1 / 2 * w, h / 4); // 11
        ctx.lineTo(-3 / 10 * w, 0); // 12
        ctx.lineTo(-2 / 5 * w, 0); // 13
        ctx.lineTo(-1 / 5 * w, -h / 4); // 14
        ctx.lineTo(-3 / 10 * w, -h / 4); // 15
        ctx.lineTo(0, -h / 2); // 1
        ctx.stroke();
    };
    return TreeSprite;
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
/* harmony import */ var _game_script__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game_script */ "./src/game_script.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../game_engine/color */ "./src/game_engine/color.ts");
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
    function Overlay(engine, gameScript, shipTransform) {
        var _this = _super.call(this, engine) || this;
        _this.gameScript = gameScript;
        _this.shipTransform = shipTransform;
        _this.transform.pos = [0, 0];
        _this.frameRateUpdateRate = 500;
        _this.currentFrameRateUpdateTime = 0;
        _this.currentFrameCount = 0;
        _this.frameRate = 0;
        _this.addLineSprite(new OverlaySprite(_this.shipTransform, _game_script__WEBPACK_IMPORTED_MODULE_2__.GameScript.DIM_X, _game_script__WEBPACK_IMPORTED_MODULE_2__.GameScript.DIM_Y, _this.gameEngine));
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
    return Overlay;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var OverlaySprite = /** @class */ (function (_super) {
    __extends(OverlaySprite, _super);
    function OverlaySprite(transform, DIM_X, DIM_Y, gameEngine) {
        var _this = _super.call(this, transform) || this;
        _this.gameEngine = gameEngine;
        _this.transform = transform;
        _this.width = DIM_X;
        _this.height = DIM_Y;
        _this.score = 0;
        _this.lives = 0;
        _this.frameRate = 0;
        _this.fontSize = 20;
        _this.fontStyle = "Arial";
        _this.shadowColor = new _game_engine_color__WEBPACK_IMPORTED_MODULE_4__.Color("hsla", [202, 100, 70, 1]);
        _this.color = new _game_engine_color__WEBPACK_IMPORTED_MODULE_4__.Color("hsla", [202, 100, 70, 0.5]);
        return _this;
    }
    OverlaySprite.prototype.draw = function (ctx) {
        ctx.save();
        ctx.scale(1 / this.gameEngine.zoomScale, 1 / this.gameEngine.zoomScale);
        var zoomFactor = this.gameEngine instanceof _game_engine_game_engine__WEBPACK_IMPORTED_MODULE_1__.GameEngine ?
            this.gameEngine.zoomScale / this.gameEngine.defaultZoomScale :
            1;
        ctx.font = this.fontSize * 1.3 + "px " + this.fontStyle;
        ctx.fillStyle = this.color.evaluateColor();
        var displayText = "Score: " + this.score + "      " + "Lives: " + this.lives;
        // if(this.gameEngine.gameScript.testing) {
        //     displayText += "      " + "FPS: " + this.frameRate;
        // }
        ctx.fillText(displayText, (this.transform.pos[0] - 350 / zoomFactor) * this.gameEngine.zoomScale, (this.transform.pos[1] - 150 / zoomFactor) * this.gameEngine.zoomScale);
        ctx.restore();
    };
    return OverlaySprite;
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_3__.LineSprite));



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
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/sound */ "./src/game_engine/sound.ts");
/* harmony import */ var _Bullet_bullet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Bullet/bullet */ "./src/game_objects/Bullet/bullet.ts");
/* harmony import */ var _game_engine_transform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../game_engine/transform */ "./src/game_engine/transform.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
/* harmony import */ var _game_engine_game_engine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../game_engine/game_engine */ "./src/game_engine/game_engine.ts");
/* harmony import */ var _game_script__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../game_script */ "./src/game_script.ts");
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
    function Ship(engine, pos, initialCameraZPos) {
        var _this = _super.call(this, engine) || this;
        _this.controlsDirection = [0, 0];
        _this.transform.pos = pos;
        _this.transform.pos[2] = 0;
        _this.cameraTransform = new _game_engine_transform__WEBPACK_IMPORTED_MODULE_3__.Transform();
        _this.cameraTransform.pos = [pos[0], pos[1], initialCameraZPos];
        _this.addPhysicsComponent();
        _this.addMousePosListener();
        _this.addLeftControlStickListener();
        _this.addRightControlStickListener();
        _this.addStartButtonListener();
        _this.radius = 10;
        _this.addCollider("General", _this, _this.radius);
        _this.addCollider("ShipDeath", _this, _this.radius, ["BoxBox", "Singularity", "Weaver", "Grunt", "Arrow", "Pinwheel", "AlienShip"], ["General"]);
        _this.addLineSprite(new ShipSprite(_this.transform));
        _this.maxSpeed = 2.5; // 2.5
        _this.mousePos = [0, 0];
        _this.fireAngle = 0;
        _this.bulletSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__.Sound("sounds/Fire_normal.wav", 0.2);
        _this.upgradeBulletsSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__.Sound("sounds/Hi_Score_achieved.wav");
        _this.bulletTimeCheck = 0;
        _this.bulletInterval = 120;
        _this.controlsDirection = [0, 0];
        _this.powerLevel = 1;
        _this.bulletNumber = 0;
        _this.controlsPointing = true;
        _this.speed;
        _this.shipEngineAcceleration = 0.5; // 0.125
        _this.dontShoot = false;
        _this.keysPressed = [];
        _this.pauseKeyedUp = true;
        _this.zooming = true;
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
        _this.gameEditorHasBeenOpened = false;
        return _this;
        // 1/8 of a second flash every half second
    }
    Ship.prototype.update = function (deltaTime) {
        if (this.gameEngine instanceof _game_engine_game_engine__WEBPACK_IMPORTED_MODULE_5__.GameEngine && this.gameEngine.gameEditorOpened) {
            if (!this.gameEditorHasBeenOpened) {
                var _width = _game_script__WEBPACK_IMPORTED_MODULE_6__.GameScript.DIM_X;
                var _height = _game_script__WEBPACK_IMPORTED_MODULE_6__.GameScript.DIM_Y;
                var _zoomScale = this.gameEngine.zoomScale;
                var _yPosition = this.transform.pos[1];
                var _xPosition = this.transform.pos[0];
                console.log({ _width: _width, _height: _height, _zoomScale: _zoomScale, _xPosition: _xPosition, _yPosition: _yPosition });
                this.gameEngine.ctx.translate(((_xPosition * _zoomScale - _width / (2))), ((_yPosition * _zoomScale - _height / (2))));
                this.gameEngine.zoomScale = 1;
            }
            this.gameEditorHasBeenOpened = true;
            return;
        }
        else {
            this.gameEditorHasBeenOpened = false;
        }
        this.bulletTimeCheck += deltaTime;
        // game state stuff that doesn't belong in the ship #gamestate
        if (this.bulletTimeCheck >= this.bulletInterval && !this.spawning && this.controlsPointing && !this.dontShoot) {
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
            this.movementMechanics();
        }
        // if ship is out of x bounds, maintain y speed, keep x at edge value
        this.updateZoomScale();
        // stuff that belongs in camera #camera
        this.gameEngine.ctx.restore();
        this.gameEngine.ctx.save();
        var shipXPos = this.transform.pos[0];
        var shipYPos = this.transform.pos[1];
        var zoomScale = this.gameEngine.zoomScale;
        var width = _game_script__WEBPACK_IMPORTED_MODULE_6__.GameScript.DIM_X;
        var height = _game_script__WEBPACK_IMPORTED_MODULE_6__.GameScript.DIM_Y;
        this.cameraTransform.pos[0] = shipXPos;
        this.cameraTransform.pos[1] = shipYPos;
        // this.cameraTransform.pos[2] = based on zoomScale
        this.gameEngine.ctx.translate(-shipXPos * zoomScale + width / 2, -shipYPos * zoomScale + height / 2);
    };
    Ship.prototype.upgradeBullets = function () {
        this.powerLevel += 1;
        this.playSound(this.upgradeBulletsSound);
    };
    Ship.prototype.findSmallestDistanceToAWall = function () {
        var pos = this.transform.pos;
        var leftDistance = pos[0] - 0;
        var rightDistance = _game_script__WEBPACK_IMPORTED_MODULE_6__.GameScript.DIM_X - pos[0];
        var upDistance = pos[1] - 0;
        var downDistance = _game_script__WEBPACK_IMPORTED_MODULE_6__.GameScript.DIM_Y - pos[1];
        var distances = [leftDistance, rightDistance, upDistance, downDistance];
        return Math.min.apply(null, distances);
    };
    Ship.prototype.updateZoomScale = function () {
        var distanceToZoomChange = 100;
        var smallestZoomScale = 0.75; // of the origional zoomscale
        var smallest = this.findSmallestDistanceToAWall();
        if (smallest < distanceToZoomChange) {
            if (this.gameEngine instanceof _game_engine_game_engine__WEBPACK_IMPORTED_MODULE_5__.GameEngine)
                this.gameEngine.zoomScale = this.gameEngine.defaultZoomScale * (smallest / distanceToZoomChange * (1 - smallestZoomScale) + smallestZoomScale);
        }
        else {
            if (this.gameEngine instanceof _game_engine_game_engine__WEBPACK_IMPORTED_MODULE_5__.GameEngine)
                this.gameEngine.zoomScale = this.gameEngine.defaultZoomScale;
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
        if (!this.controllerInUse) {
            this.calcControlsDirection();
        }
        var movementAngle = Math.atan2(this.controlsDirection[1], this.controlsDirection[0]);
        var Vo = this.transform.absoluteVelocity();
        var mV = [];
        if (this.controlsDirection[0] == 0 && this.controlsDirection[1] == 0) {
            mV = [0, 0];
        }
        else {
            mV = [this.maxSpeed * Math.cos(movementAngle), this.maxSpeed * Math.sin(movementAngle)];
            this.transform.angle = movementAngle;
        }
        var dV = [mV[0] - Vo[0], mV[1] - Vo[1]];
        var alpha = Math.atan2(dV[1], dV[0]);
        this.transform.acc[0] += this.shipEngineAcceleration * Math.cos(alpha);
        this.transform.acc[1] += this.shipEngineAcceleration * Math.sin(alpha);
    };
    Ship.prototype.isOutOfBounds = function () {
        return _game_script__WEBPACK_IMPORTED_MODULE_6__.GameScript.isOutOfBounds(this.transform.pos, this.radius);
    };
    Ship.prototype.updateMousePos = function (mousePos) {
        this.setFireAngle(mousePos);
    };
    Ship.prototype.updateRightControlStickInput = function (vector) {
        if (Math.abs(vector[0]) + Math.abs(vector[1]) > 0.10) {
            this.dontShoot = false;
            this.fireAngle = Math.atan2(vector[1], vector[0]);
        }
        else {
            this.dontShoot = true;
        }
    };
    Ship.prototype.updateLeftControlStickInput = function (key, down) {
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
        _game_script__WEBPACK_IMPORTED_MODULE_6__.GameScript.wallGraze(this.transform, this.radius * 2);
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
        var zoomScale = this.gameEngine.zoomScale;
        var width = _game_script__WEBPACK_IMPORTED_MODULE_6__.GameScript.DIM_X;
        var height = _game_script__WEBPACK_IMPORTED_MODULE_6__.GameScript.DIM_Y;
        var mouseX = mousePos[0] / zoomScale + shipXPos - width / (2 * zoomScale);
        var mouseY = mousePos[1] / zoomScale + shipYPos - height / (2 * zoomScale);
        // SCALE NUMBER
        var dy = mouseY - this.transform.pos[1];
        var dx = mouseX - this.transform.pos[0];
        this.fireAngle = Math.atan2(dy, dx);
    };
    Ship.prototype.fireBullet = function () {
        this.gameEngine.queueSound(this.bulletSound);
        var shipvx = this.transform.vel[0];
        var shipvy = this.transform.vel[1];
        var relBulletVelX1 = _Bullet_bullet__WEBPACK_IMPORTED_MODULE_2__.Bullet.SPEED * Math.cos(this.fireAngle);
        var relBulletVelY1 = _Bullet_bullet__WEBPACK_IMPORTED_MODULE_2__.Bullet.SPEED * Math.sin(this.fireAngle);
        var bulletVel1 = [shipvx + relBulletVelX1, shipvy + relBulletVelY1];
        this.addChildGameObject(new _Bullet_bullet__WEBPACK_IMPORTED_MODULE_2__.Bullet(this.gameEngine, this.transform.pos, bulletVel1, this.bulletNumber, 'middle', this.powerLevel));
        if (this.powerLevel >= 2) {
            var relBulletVelX2 = (_Bullet_bullet__WEBPACK_IMPORTED_MODULE_2__.Bullet.SPEED - 0.5) * Math.cos(this.fireAngle + Math.PI / 32);
            var relBulletVelY2 = (_Bullet_bullet__WEBPACK_IMPORTED_MODULE_2__.Bullet.SPEED - 0.5) * Math.sin(this.fireAngle + Math.PI / 32);
            var relBulletVelX3 = (_Bullet_bullet__WEBPACK_IMPORTED_MODULE_2__.Bullet.SPEED - 0.5) * Math.cos(this.fireAngle - Math.PI / 32);
            var relBulletVelY3 = (_Bullet_bullet__WEBPACK_IMPORTED_MODULE_2__.Bullet.SPEED - 0.5) * Math.sin(this.fireAngle - Math.PI / 32);
            var bulletVel2 = [shipvx + relBulletVelX2, shipvy + relBulletVelY2];
            var bulletVel3 = [shipvx + relBulletVelX3, shipvy + relBulletVelY3];
            // doesn't support parent transformations... yet
            this.addChildGameObject(new _Bullet_bullet__WEBPACK_IMPORTED_MODULE_2__.Bullet(this.gameEngine, this.transform.pos, bulletVel2, this.bulletNumber, 'left', this.powerLevel));
            this.addChildGameObject(new _Bullet_bullet__WEBPACK_IMPORTED_MODULE_2__.Bullet(this.gameEngine, this.transform.pos, bulletVel3, this.bulletNumber, 'right', this.powerLevel));
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
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_4__.LineSprite));



/***/ }),

/***/ "./src/game_objects/Walls/walls.ts":
/*!*****************************************!*\
  !*** ./src/game_objects/Walls/walls.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Walls: () => (/* binding */ Walls)
/* harmony export */ });
/* harmony import */ var _walls_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./walls_sprite */ "./src/game_objects/Walls/walls_sprite.ts");
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_script__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game_script */ "./src/game_script.ts");
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
        _this.addLineSprite(new _walls_sprite__WEBPACK_IMPORTED_MODULE_0__.WallsSprite(_this.transform, _game_script__WEBPACK_IMPORTED_MODULE_2__.GameScript.DIM_X, _game_script__WEBPACK_IMPORTED_MODULE_2__.GameScript.DIM_Y));
        return _this;
    }
    Walls.prototype.update = function () {
    };
    return Walls;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__.GameObject));



/***/ }),

/***/ "./src/game_objects/Walls/walls_sprite.ts":
/*!************************************************!*\
  !*** ./src/game_objects/Walls/walls_sprite.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WallsSprite: () => (/* binding */ WallsSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/color */ "./src/game_engine/color.ts");
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


var WallsSprite = /** @class */ (function (_super) {
    __extends(WallsSprite, _super);
    function WallsSprite(transform, DIM_X, DIM_Y) {
        var _this = _super.call(this, transform) || this;
        _this.width = DIM_X;
        _this.height = DIM_Y;
        _this.shadowColor = new _game_engine_color__WEBPACK_IMPORTED_MODULE_1__.Color("hsla", [202, 100, 70, 1]);
        _this.color = new _game_engine_color__WEBPACK_IMPORTED_MODULE_1__.Color("hsla", [202, 100, 70, 0.2]);
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
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_0__.LineSprite));



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
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_engine/sound */ "./src/game_engine/sound.ts");
/* harmony import */ var _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../particles/enemy_spawn */ "./src/game_objects/particles/enemy_spawn.ts");
/* harmony import */ var _arrow_sprite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./arrow_sprite */ "./src/game_objects/enemies/Arrow/arrow_sprite.ts");
/* harmony import */ var _game_script__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../game_script */ "./src/game_script.ts");
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
        _this.spawnSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_2__.Sound("sounds/Enemy_spawn_purple.wav", 0.5);
        _this.playSound(_this.spawnSound);
        _this.addLineSprite(new _arrow_sprite__WEBPACK_IMPORTED_MODULE_4__.ArrowSprite(_this.transform));
        _this.addChildGameObject(new _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_3__.EnemySpawn(_this.gameEngine));
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
        if (_game_script__WEBPACK_IMPORTED_MODULE_5__.GameScript.isOutOfBounds(pos, this.radius)) {
            _game_script__WEBPACK_IMPORTED_MODULE_5__.GameScript.redirect(this.transform);
        }
    };
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
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/sound */ "./src/game_engine/sound.ts");
/* harmony import */ var _game_script__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_script */ "./src/game_script.ts");
/* harmony import */ var _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../particles/enemy_spawn */ "./src/game_objects/particles/enemy_spawn.ts");
/* harmony import */ var _boxbox_sprite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./boxbox_sprite */ "./src/game_objects/enemies/BoxBox/boxbox_sprite.ts");
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
        _this.spawnSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__.Sound("sounds/Enemy_spawn_blue.wav", 0.5);
        _this.transform.pos = pos;
        _this.radius = 10;
        _this.points = 20;
        // this.addPhysicsComponent()
        // there's only two versions of this coordinate object
        // 1. bottom left, top right
        // 2. top left, bottom right
        // the axis of rotation determines the length of the line for the _ coordinates
        _this.rotationState = {
            animationState: "Paused",
            rotationDirection: "Left",
            coordinateShift: [3 / 4 * BoxBox.w, 0],
            rotationAngle: 0,
            stateTime: 0,
            shapeState: "TopLeft",
            positionShift: [0, 0],
            midPauseTime: 10,
            pauseTime: 1000,
        };
        _this.addLineSprite(new _boxbox_sprite__WEBPACK_IMPORTED_MODULE_4__.BoxBoxSprite(_this.transform, _this.rotationState));
        _this.addChildGameObject(new _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_3__.EnemySpawn(_this.gameEngine));
        _this.playSound(_this.spawnSound);
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
        var projectedDrawCoordinates = BoxBox.projectedDrawCoordinates;
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
        var _15 = drawCoordinates.BottomSquareBL, x = _15[0], y = _15[1], angleOffset = _15[2];
        projectedDrawCoordinates.BottomSquareBL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
        _a = drawCoordinates.BottomSquareBR, x = _a[0], y = _a[1], angleOffset = _a[2];
        projectedDrawCoordinates.BottomSquareBR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
        _b = drawCoordinates.BottomSquareTL, x = _b[0], y = _b[1], angleOffset = _b[2];
        projectedDrawCoordinates.BottomSquareTL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
        _c = drawCoordinates.BottomSquareTR, x = _c[0], y = _c[1], angleOffset = _c[2];
        projectedDrawCoordinates.BottomSquareTR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
        _d = drawCoordinates.TopSquareBL, x = _d[0], y = _d[1], angleOffset = _d[2];
        projectedDrawCoordinates.TopSquareBL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
        _e = drawCoordinates.TopSquareBR, x = _e[0], y = _e[1], angleOffset = _e[2];
        projectedDrawCoordinates.TopSquareBR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
        _f = drawCoordinates.TopSquareTL, x = _f[0], y = _f[1], angleOffset = _f[2];
        projectedDrawCoordinates.TopSquareTL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
        _g = drawCoordinates.TopSquareTR, x = _g[0], y = _g[1], angleOffset = _g[2];
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
        _game_script__WEBPACK_IMPORTED_MODULE_2__.GameScript.wallGraze(this.transform, this.radius);
    };
    BoxBox.prototype.update = function (delta) {
        this.animate(delta);
        if (_game_script__WEBPACK_IMPORTED_MODULE_2__.GameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius * 2)) {
            this.wallGraze();
        }
    };
    BoxBox.boxWidth = 13;
    BoxBox.boxDepth = BoxBox.boxWidth / 3;
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
    BoxBox.projectedDrawCoordinates = {
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
    BoxBox.animationStates = ["Paused", "Rotating", "MidPaused", "CompletingRotation"];
    BoxBox.rotationDirections = ["Bottom", "Top", "Left", "Right"];
    BoxBox.shapeStates = ["BottomLeft", "TopLeft"];
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
/* harmony import */ var _boxbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./boxbox */ "./src/game_objects/enemies/BoxBox/boxbox.ts");
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
    function BoxBoxSprite(transform, rotationState) {
        var _this = _super.call(this, transform) || this;
        _this.spawningScale = 1;
        _this.rotationState = rotationState;
        _this.spawning = false;
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
        var blurFactor = 0.5;
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
        var projectedCoordinates = _boxbox__WEBPACK_IMPORTED_MODULE_1__.BoxBox.projectedDrawCoordinates;
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
        var projectedCoordinates = _boxbox__WEBPACK_IMPORTED_MODULE_1__.BoxBox.projectedDrawCoordinates;
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
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/sound */ "./src/game_engine/sound.ts");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_engine/util */ "./src/game_engine/util.ts");
/* harmony import */ var _game_script__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../game_script */ "./src/game_script.ts");
/* harmony import */ var _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../particles/enemy_spawn */ "./src/game_objects/particles/enemy_spawn.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
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
        _this.spawnSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__.Sound("sounds/Enemy_spawn_blue.wav", 0.5);
        _this.playSound(_this.spawnSound);
        _this.addLineSprite(new GruntSprite(_this.transform));
        _this.addChildGameObject(new _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_4__.EnemySpawn(_this.gameEngine));
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
        var unitVector = _game_engine_util__WEBPACK_IMPORTED_MODULE_2__.VectorMath.dir([dx, dy]);
        this.bumpInfluencers.push(unitVector);
        // first 1
    };
    Grunt.prototype.influenceDirection = function (influencers) {
        var directionVector = [0, 0];
        influencers.forEach(function (influencer) {
            var dx = directionVector[0] + influencer[0];
            var dy = directionVector[1] + influencer[1];
            var newVector = [dx, dy];
            directionVector = _game_engine_util__WEBPACK_IMPORTED_MODULE_2__.VectorMath.dir(newVector);
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
            if (_game_script__WEBPACK_IMPORTED_MODULE_3__.GameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
                this.wallGraze();
            }
            this.bumpInfluencers = [];
            this.bumpDirectionInfluenced = false;
        }
    };
    Grunt.prototype.wallGraze = function () {
        _game_script__WEBPACK_IMPORTED_MODULE_3__.GameScript.wallGraze(this.transform, this.radius);
    };
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
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_5__.LineSprite));

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
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_engine/sound */ "./src/game_engine/sound.ts");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/util */ "./src/game_engine/util.ts");
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../particles/enemy_spawn */ "./src/game_objects/particles/enemy_spawn.ts");
/* harmony import */ var _game_script__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../game_script */ "./src/game_script.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
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
        _this.transform.vel = _game_engine_util__WEBPACK_IMPORTED_MODULE_1__.VectorMath.randomVec(speed);
        _this.spawnSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_0__.Sound("sounds/Enemy_spawn_blue.wav", 0.5);
        _this.playSound(_this.spawnSound);
        _this.addLineSprite(new PinwheelSprite(_this.transform));
        _this.addChildGameObject(new _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_3__.EnemySpawn(_this.gameEngine));
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
        if (_game_script__WEBPACK_IMPORTED_MODULE_4__.GameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
            _game_script__WEBPACK_IMPORTED_MODULE_4__.GameScript.bounce(this.transform, this.radius); // HARD CODED
        }
    };
    return Pinwheel;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_2__.GameObject));

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
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_5__.LineSprite));



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
/* harmony import */ var _game_script__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_script */ "./src/game_script.ts");
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


// import { Sound } from "../../../game_engine/sound";
// import { Util } from "../../../game_engine/util";
var AlienShip = /** @class */ (function (_super) {
    __extends(AlienShip, _super);
    function AlienShip(engine, pos, velocity, shipTransform) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos[0] = pos[0];
        _this.transform.pos[1] = pos[1];
        _this.transform.vel[0] = velocity[0];
        _this.transform.vel[1] = velocity[1];
        _this.shipTransform = shipTransform;
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
    AlienShip.prototype.update = function () {
        // console.log(this.transform.pos)
        this.chase();
        if (_game_script__WEBPACK_IMPORTED_MODULE_1__.GameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
            this.bounce();
        }
    };
    AlienShip.prototype.bounce = function () {
        _game_script__WEBPACK_IMPORTED_MODULE_1__.GameScript.bounce(this.transform, this.radius);
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
        var shipPos = this.shipTransform.absolutePosition();
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
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/sound */ "./src/game_engine/sound.ts");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_engine/util */ "./src/game_engine/util.ts");
/* harmony import */ var _particles_particle_explosion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../particles/particle_explosion */ "./src/game_objects/particles/particle_explosion.ts");
/* harmony import */ var _particles_singularity_hit_explosion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../particles/singularity_hit_explosion */ "./src/game_objects/particles/singularity_hit_explosion.ts");
/* harmony import */ var _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../particles/enemy_spawn */ "./src/game_objects/particles/enemy_spawn.ts");
/* harmony import */ var _singularity_sprite__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./singularity_sprite */ "./src/game_objects/enemies/Singularity/singularity_sprite.ts");
/* harmony import */ var _particles_singularity_particles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../particles/singularity_particles */ "./src/game_objects/particles/singularity_particles.ts");
/* harmony import */ var _alien_ship__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./alien_ship */ "./src/game_objects/enemies/Singularity/alien_ship.ts");
/* harmony import */ var _particles_Grid_grid_point__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../particles/Grid/grid_point */ "./src/game_objects/particles/Grid/grid_point.ts");
/* harmony import */ var _game_script__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../game_script */ "./src/game_script.ts");
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
        _this.deathSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__.Sound("sounds/Gravity_well_die.wav");
        _this.gravityWellHitSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__.Sound("sounds/Gravity_well_hit.wav", 0.5);
        _this.openGateSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__.Sound("sounds/Gravity_well_explode.wav");
        // this.id = options.id
        _this.spawnSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__.Sound("sounds/Enemy_spawn_red.wav", 1);
        _this.playSound(_this.spawnSound);
        _this.increasing = true;
        _this.addLineSprite(new _singularity_sprite__WEBPACK_IMPORTED_MODULE_6__.SingularitySprite(_this.transform));
        _this.addChildGameObject(new _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_5__.EnemySpawn(_this.gameEngine));
        _this.lineSprite.throbbingScale = 1;
        _this.lives = 5;
        return _this;
    }
    Singularity.prototype.exist = function () {
        // leaving off subscriptions means that things will subscribe to it
        this.addCollider("General", this, this.radius);
        this.addCollider("GravityWell", this, this.gravityWellSize, ["Grunt", "Pinwheel", "Bullet", "Ship", "BoxBox", "Arrow", "Singularity", "Weaver", "Particle", "SingularityParticle", "GridPoint"], ["General"]);
        this.addCollider("Absorb", this, this.radius, ["Grunt", "Pinwheel", "BoxBox", "Arrow", "Weaver"], ["General"]);
        // now it will move
        this.addPhysicsComponent();
        this.lineSprite.spawning = false;
        this.addChildGameObject(new _particles_singularity_particles__WEBPACK_IMPORTED_MODULE_7__.SingularityParticles(this.gameEngine, this.transform));
    };
    Singularity.prototype.onCollision = function (collider, type) {
        if (type === "GravityWell") {
            this.influenceAcceleration(collider.gameObject);
        }
        else if (type === "Absorb") {
            var hitObjectTransform = collider.gameObject.transform;
            var pos = hitObjectTransform.absolutePosition();
            // const vel = hitObjectTransform.vel;
            new _particles_particle_explosion__WEBPACK_IMPORTED_MODULE_3__.ParticleExplosion(this.gameEngine, pos);
            collider.gameObject.remove();
            this.throbbingCycleSpeed *= 1.2;
            this.numberAbsorbed += 1; // put back to 1 
        }
    };
    Singularity.prototype.bulletHit = function () {
        this.lives -= 1;
        var pos = this.transform.absolutePosition();
        if (this.lives <= 0) {
            new _particles_particle_explosion__WEBPACK_IMPORTED_MODULE_3__.ParticleExplosion(this.gameEngine, pos);
            this.gameEngine.gameScript.tallyScore(this);
            this.playSound(this.deathSound);
            this.remove();
        }
        else {
            new _particles_singularity_hit_explosion__WEBPACK_IMPORTED_MODULE_4__.SingularityHitExplosion(this.gameEngine, pos);
            this.playSound(this.gravityWellHitSound);
            this.throbbingCycleSpeed /= 1.2;
            this.numberAbsorbed -= 1;
        }
    };
    Singularity.prototype.wallGraze = function () {
        _game_script__WEBPACK_IMPORTED_MODULE_10__.GameScript.wallGraze(this.transform, this.radius);
    };
    Singularity.prototype.update = function (deltaTime) {
        if (_game_script__WEBPACK_IMPORTED_MODULE_10__.GameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
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
        if (object instanceof _particles_Grid_grid_point__WEBPACK_IMPORTED_MODULE_9__.GridPoint) {
            // let's try moving their original position in the z direction 
            // depending on strength of gravity influence
            var objectPos3D = [object.transform.pos[0], object.transform.pos[1], object.transform.pos[2]];
            var dVector = [pos[0] - objectPos3D[0], pos[1] - objectPos3D[1], -200 - objectPos3D[2]]; // -200 is the z position of the gravity well for the grid
            var dVectorZOrigin = [pos[0] - objectPos3D[0], pos[1] - objectPos3D[1], 0]; // -200 is the z position of the gravity well for the grid
            var r = _game_engine_util__WEBPACK_IMPORTED_MODULE_2__.VectorMath.dist([0, 0, 0], dVector);
            var rZOrigin = _game_engine_util__WEBPACK_IMPORTED_MODULE_2__.VectorMath.dist([0, 0, 0], dVectorZOrigin);
            if (r < 25)
                r = 25;
            if (rZOrigin < 25)
                rZOrigin = 25;
            // I think I can use both effects, but this one should be a lot smaller
            // and then tuning it would be harder
            // I really like the wave effect that happens with z acceleration being 25, and the spring -0.0025 + dampening -0.04
            // but Z's effect distends too far
            var unitVector3D = _game_engine_util__WEBPACK_IMPORTED_MODULE_2__.VectorMath.scale(dVector, 1 / r);
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
            var r = _game_engine_util__WEBPACK_IMPORTED_MODULE_2__.VectorMath.dist([0, 0], dVector2D);
            if (!(r > this.gravityWellSize * 7 / 8 || r < this.radius * 2)) {
                var unitVector = _game_engine_util__WEBPACK_IMPORTED_MODULE_2__.VectorMath.scale(dVector2D, 1 / r);
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
        this.playSound(this.openGateSound);
        for (var i = 0; i < this.alienSpawnAmount; i++) {
            var angle = Math.random() * Math.PI * 2;
            var velocity = [this.alienSpawnSpeed * Math.cos(angle), this.alienSpawnSpeed * Math.sin(angle)];
            new _alien_ship__WEBPACK_IMPORTED_MODULE_8__.AlienShip(this.gameEngine, this.transform.pos, velocity, this.gameEngine.gameScript.ship.transform);
        }
        this.remove();
    };
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
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../game_engine/sound */ "./src/game_engine/sound.ts");
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../game_engine/util */ "./src/game_engine/util.ts");
/* harmony import */ var _game_script__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../game_script */ "./src/game_script.ts");
/* harmony import */ var _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../particles/enemy_spawn */ "./src/game_objects/particles/enemy_spawn.ts");
/* harmony import */ var _game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../game_engine/line_sprite */ "./src/game_engine/line_sprite.ts");
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
        _this.spawnSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_1__.Sound("sounds/Enemy_spawn_green.wav", 0.5);
        _this.playSound(_this.spawnSound);
        _this.addLineSprite(new WeaverSprite(_this.transform));
        _this.addChildGameObject(new _particles_enemy_spawn__WEBPACK_IMPORTED_MODULE_4__.EnemySpawn(_this.gameEngine));
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
        var unitVector = _game_engine_util__WEBPACK_IMPORTED_MODULE_2__.VectorMath.dir([dx, dy]);
        this.bumpInfluencers.push(unitVector);
    };
    Weaver.prototype.influenceDirection = function (influencers) {
        var directionVector = [0, 0];
        influencers.forEach(function (influencer) {
            var dx = directionVector[0] + influencer[0];
            var dy = directionVector[1] + influencer[1];
            var newVector = [dx, dy];
            directionVector = _game_engine_util__WEBPACK_IMPORTED_MODULE_2__.VectorMath.dir(newVector);
        });
        var influencedDirection = Math.atan2(directionVector[1], directionVector[0]);
        return influencedDirection;
    };
    Weaver.prototype.acceptBulletDirection = function (source) {
        this.bulletDirectionInfluenced = true;
        var dy = this.transform.pos[1] - source[1];
        var dx = this.transform.pos[0] - source[0];
        var unitVector = _game_engine_util__WEBPACK_IMPORTED_MODULE_2__.VectorMath.dir([dx, dy]);
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
            if (_game_script__WEBPACK_IMPORTED_MODULE_3__.GameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
                this.wallGraze();
            }
        }
    };
    Weaver.prototype.wallGraze = function () {
        _game_script__WEBPACK_IMPORTED_MODULE_3__.GameScript.wallGraze(this.transform, this.radius);
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
}(_game_engine_line_sprite__WEBPACK_IMPORTED_MODULE_5__.LineSprite));



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
/* harmony import */ var _game_script__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../game_script */ "./src/game_script.ts");
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
    function Grid(engine, gameScript, cameraTransform) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos = [0, 0];
        _this.arenaDimensions = [_game_script__WEBPACK_IMPORTED_MODULE_3__.GameScript.DIM_X, _game_script__WEBPACK_IMPORTED_MODULE_3__.GameScript.DIM_Y];
        _this.elasticity = 0.1; // force provided to pull particle back into place
        _this.dampening = 0.1; // force produced from velocity (allows things to eventuall fall to rest)
        _this.gridPoints = _this.createGridPoints(cameraTransform);
        _this.addLineSprite(new GridSprite(_this.transform, _this.gridPoints, cameraTransform));
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
    Grid.prototype.createGridPoints = function (cameraTransform) {
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
                gridRow.push(new _grid_point__WEBPACK_IMPORTED_MODULE_1__.GridPoint(this.gameEngine, position, cameraTransform));
            }
            gridPoints.push(gridRow.slice());
            gridRow = [];
        }
        return gridPoints;
    };
    Grid.prototype.update = function () {
    };
    return Grid;
}(_game_engine_game_object__WEBPACK_IMPORTED_MODULE_0__.GameObject));

var GridSprite = /** @class */ (function (_super) {
    __extends(GridSprite, _super);
    function GridSprite(transform, gridPoints, cameraTransform) {
        var _this = _super.call(this, transform) || this;
        _this.gridPoints = gridPoints;
        _this.cameraTransform = cameraTransform;
        _this.color = new _game_engine_color__WEBPACK_IMPORTED_MODULE_5__.Color("hsla", [202, 100, 70, 0.2]);
        return _this;
    }
    GridSprite.prototype.draw = function (ctx) {
        ctx.save();
        ctx.strokeStyle = this.color.evaluateColor();
        ctx.lineWidth = 2;
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
    function GridPoint(engine, pos, cameraTransform) {
        var _this = _super.call(this, engine) || this;
        _this.originalPosition[0] = pos[0];
        _this.originalPosition[1] = pos[1];
        _this.originalPosition[2] = pos[2];
        _this.transform.pos = pos;
        _this.transform.cameraTransform = cameraTransform;
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
/* harmony import */ var _game_script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../game_script */ "./src/game_script.ts");
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
        if (_game_script__WEBPACK_IMPORTED_MODULE_0__.GameScript.isOutOfBounds(this.transform.absolutePosition(), -0.5)) {
            this.remove();
        }
    };
    return SingularityParticle;
}(_particle__WEBPACK_IMPORTED_MODULE_1__.Particle));



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
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game_engine/sound */ "./src/game_engine/sound.ts");
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../game_engine/color */ "./src/game_engine/color.ts");
/* harmony import */ var _game_script__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../game_script */ "./src/game_script.ts");
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
        _this.currentColor = new _game_engine_color__WEBPACK_IMPORTED_MODULE_3__.Color("hsla", [startingH, 100, 50, opacity]);
        _this.particleNum = 20;
        var bulletWallHit = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_2__.Sound("sounds/bullet_hitwall.wav", 0.1);
        _this.wallHit = _this.whichWall();
        _this.playSound(bulletWallHit);
        _this.createParticles();
        return _this;
    }
    BulletWallExplosion.prototype.whichWall = function () {
        var pos = this.transform.pos;
        var max = [_game_script__WEBPACK_IMPORTED_MODULE_4__.GameScript.DIM_X, _game_script__WEBPACK_IMPORTED_MODULE_4__.GameScript.DIM_Y];
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
            this.addChildGameObject(new _particle__WEBPACK_IMPORTED_MODULE_0__.Particle(this.gameEngine, [x, y, z], speed, color, this.wallHit));
        }
    };
    BulletWallExplosion.prototype.update = function () {
        if (this.childObjects.length === 0) {
            this.remove();
        }
    };
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
    function EnemySpawn(engine) {
        var _this = _super.call(this, engine) || this;
        _this.initialSpawningScale = 1.5;
        _this.lifeTime = 1000;
        _this.existTime = 0;
        return _this;
        // this.gameEngine.queueSound(this.parentObject.spawnSound)
    }
    EnemySpawn.prototype.update = function (timeDelta) {
        this.existTime += timeDelta;
        this.parentObject.lineSprite.spawning = true;
        if (this.existTime >= this.lifeTime) {
            this.parentObject.lineSprite.spawningScale = 1;
            this.parentObject.exist();
            this.parentObject.lineSprite.spawning = false;
            this.remove();
        }
        var cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        var cycleSpeed = 0.1;
        if (this.parentObject.lineSprite.spawningScale < 0.7) {
            this.parentObject.lineSprite.spawningScale = this.initialSpawningScale;
        }
        else {
            this.parentObject.lineSprite.spawningScale -= cycleSpeed * cycleSpeedScale;
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
/* harmony export */   Particle: () => (/* binding */ Particle),
/* harmony export */   ParticleSprite: () => (/* binding */ ParticleSprite)
/* harmony export */ });
/* harmony import */ var _game_engine_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game_engine/util */ "./src/game_engine/util.ts");
/* harmony import */ var _game_engine_game_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game_engine/game_object */ "./src/game_engine/game_object.ts");
/* harmony import */ var _game_script__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game_script */ "./src/game_script.ts");
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



var Particle = /** @class */ (function (_super) {
    __extends(Particle, _super);
    function Particle(engine, pos, initialSpeed, color, wallHit) {
        var _this = _super.call(this, engine) || this;
        _this.transform.pos[0] = pos[0];
        _this.transform.pos[1] = pos[1];
        _this.transform.pos[2] = pos[2];
        if (engine instanceof _game_engine_game_engine__WEBPACK_IMPORTED_MODULE_3__.GameEngine) {
            _this.transform.cameraTransform = engine.gameScript.ship.cameraTransform;
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
    Particle.prototype.createMovementAngle = function (wallHit) {
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
    Particle.prototype.update = function (deltaTime) {
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
    Particle.prototype.checkBounds = function () {
        if (_game_script__WEBPACK_IMPORTED_MODULE_2__.GameScript.isOutOfBounds(this.transform.absolutePosition(), -0.5)) {
            this.remove();
        }
    };
    return Particle;
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
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game_engine/sound */ "./src/game_engine/sound.ts");
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../game_engine/color */ "./src/game_engine/color.ts");
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
        _this.cameraTransform = engine.gameScript.ship.cameraTransform;
        var startingH = (_this.gameEngine.gameScript.explosionColorWheel + Math.random() * 60) % 360;
        var opacity = Math.random() * 0.35 + 0.6;
        _this.currentColor = new _game_engine_color__WEBPACK_IMPORTED_MODULE_3__.Color("hsla", [startingH, 100, 50, opacity]);
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
        var explosionSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_2__.Sound("sounds/Enemy_explode.wav", 0.2);
        _this.playSound(explosionSound);
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
            this.addChildGameObject(new _particle__WEBPACK_IMPORTED_MODULE_0__.Particle(this.gameEngine, [x, y, z], speed, color));
        }
    };
    ParticleExplosion.prototype.update = function () {
        if (this.childObjects.length === 0) {
            this.remove();
        }
    };
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
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game_engine/sound */ "./src/game_engine/sound.ts");
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../game_engine/color */ "./src/game_engine/color.ts");
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
        _this.currentColor = new _game_engine_color__WEBPACK_IMPORTED_MODULE_3__.Color("hsla", [startingH, 100, 50, opacity]);
        _this.particleNum = 400;
        var explosionSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_2__.Sound("sounds/Enemy_explode.wav", 0.2);
        _this.playSound(explosionSound);
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
            this.addChildGameObject(new _particle__WEBPACK_IMPORTED_MODULE_0__.Particle(this.gameEngine, this.transform.absolutePosition(), speed, color));
        }
    };
    ShipExplosion.prototype.update = function () {
        if (this.childObjects.length === 0) {
            this.remove();
        }
    };
    return ShipExplosion;
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
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game_engine/sound */ "./src/game_engine/sound.ts");
/* harmony import */ var _game_engine_color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../game_engine/color */ "./src/game_engine/color.ts");
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
        _this.currentColor = new _game_engine_color__WEBPACK_IMPORTED_MODULE_3__.Color("hsla", [startingH, 100, 50, opacity]);
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
        var explosionSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_2__.Sound("sounds/Enemy_explode.wav", 0.2);
        _this.playSound(explosionSound);
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
            this.addChildGameObject(new _particle__WEBPACK_IMPORTED_MODULE_0__.Particle(this.gameEngine, this.transform.absolutePosition(), speed, color));
        }
    };
    SingularityHitExplosion.prototype.update = function () {
        if (this.childObjects.length === 0) {
            this.remove();
        }
    };
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
        // let explosionSound = new Sound("sounds/Enemy_explode.wav", 0.2)
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
    function Star(engine, pos, cameraTransform) {
        if (pos === void 0) { pos = [0, 0, 0]; }
        var _this = _super.call(this, engine) || this;
        _this.transform.pos[0] = pos[0];
        _this.transform.pos[1] = pos[1];
        _this.transform.pos[2] = pos[2];
        _this.transform.cameraTransform = cameraTransform;
        _this.addLineSprite(new StarSprite(_this.transform));
        return _this;
        // add random good colors
    }
    Star.prototype.update = function () {
    };
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

/***/ "./src/game_script.ts":
/*!****************************!*\
  !*** ./src/game_script.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameScript: () => (/* binding */ GameScript)
/* harmony export */ });
/* harmony import */ var _game_engine_sound__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_engine/sound */ "./src/game_engine/sound.ts");
/* harmony import */ var _game_objects_Ship_ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_objects/Ship/ship */ "./src/game_objects/Ship/ship.ts");
/* harmony import */ var _game_objects_Walls_walls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game_objects/Walls/walls */ "./src/game_objects/Walls/walls.ts");
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
/* harmony import */ var _game_objects_particles_ship_explosion__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./game_objects/particles/ship_explosion */ "./src/game_objects/particles/ship_explosion.ts");
/* harmony import */ var _game_objects_particles_star__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./game_objects/particles/star */ "./src/game_objects/particles/star.ts");
/* harmony import */ var _game_engine_Levels_DesignElements_Scene__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./game_engine/Levels/DesignElements/Scene */ "./src/game_engine/Levels/DesignElements/Scene.ts");
/* harmony import */ var _game_engine_Levels_DesignElements_Event__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./game_engine/Levels/DesignElements/Event */ "./src/game_engine/Levels/DesignElements/Event.ts");
/* harmony import */ var _game_engine_Levels_DesignElements_Time__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./game_engine/Levels/DesignElements/Time */ "./src/game_engine/Levels/DesignElements/Time.ts");
/* harmony import */ var _game_engine_Levels_DesignElements_Loop__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./game_engine/Levels/DesignElements/Loop */ "./src/game_engine/Levels/DesignElements/Loop.ts");
/* harmony import */ var _game_engine_Levels_DesignElements_Operation__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./game_engine/Levels/DesignElements/Operation */ "./src/game_engine/Levels/DesignElements/Operation.ts");
/* harmony import */ var _game_objects_ClockworkGames_Entity_Entity__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./game_objects/ClockworkGames/Entity/Entity */ "./src/game_objects/ClockworkGames/Entity/Entity.ts");
/* harmony import */ var _game_objects_ClockworkGames_Bed__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./game_objects/ClockworkGames/Bed */ "./src/game_objects/ClockworkGames/Bed.ts");
/* harmony import */ var _game_objects_ClockworkGames_Sandwich__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./game_objects/ClockworkGames/Sandwich */ "./src/game_objects/ClockworkGames/Sandwich.ts");
/* harmony import */ var _game_objects_ClockworkGames_Plate__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./game_objects/ClockworkGames/Plate */ "./src/game_objects/ClockworkGames/Plate.ts");
/* harmony import */ var _game_objects_ClockworkGames_Tree__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./game_objects/ClockworkGames/Tree */ "./src/game_objects/ClockworkGames/Tree.ts");

























var GameScript = /** @class */ (function () {
    function GameScript(engine) {
        this.serializedGame = "";
        this.theme = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_0__.Sound("sounds/Geometry_OST.mp3", 1);
        this.gameOverSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_0__.Sound("sounds/Game_over.wav");
        this.gameStartSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_0__.Sound("sounds/Game_start.wav");
        this.shipDeathSound = new _game_engine_sound__WEBPACK_IMPORTED_MODULE_0__.Sound("sounds/Ship_explode.wav");
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
        this.enemyCreatorMap = this.createEnemyCreators();
        this.engine.addXButtonListener(this);
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
    GameScript.prototype.nextElement = function () {
        this.rootScene.currentElementIndex = 0;
    };
    GameScript.prototype.startGame = function (serializedGame) {
        this.serializedGame = serializedGame;
        var game = JSON.parse(serializedGame);
        this.rootScene = new _game_engine_Levels_DesignElements_Scene__WEBPACK_IMPORTED_MODULE_15__.Scene(this, "Root");
        this.rootScene.gameElements = this.loadGameElements(game.gameElements, this.rootScene);
        this.playFromRootScene = false; // clockwork content
        this.intervalTime = 0;
        // clockwork content
        this.loadClockworkContent();
        this.ship.transform.pos = [this.startPosition[0], this.startPosition[1], this.startPosition[2]];
    };
    GameScript.prototype.loadClockworkContent = function () {
        new _game_objects_ClockworkGames_Sandwich__WEBPACK_IMPORTED_MODULE_22__.LeftSandwich(this.engine, [100, 80]);
        new _game_objects_ClockworkGames_Sandwich__WEBPACK_IMPORTED_MODULE_22__.RightSandwich(this.engine, [130, 80]);
        new _game_objects_ClockworkGames_Sandwich__WEBPACK_IMPORTED_MODULE_22__.LeftSandwich(this.engine, [110, 107]);
        new _game_objects_ClockworkGames_Sandwich__WEBPACK_IMPORTED_MODULE_22__.RightSandwich(this.engine, [140, 107]);
        new _game_objects_ClockworkGames_Plate__WEBPACK_IMPORTED_MODULE_23__.Plate(this.engine, [120, 95]);
        var entity = new _game_objects_ClockworkGames_Entity_Entity__WEBPACK_IMPORTED_MODULE_20__.Entity(this.engine, [200, 390]);
        new _game_objects_ClockworkGames_Bed__WEBPACK_IMPORTED_MODULE_21__.Bed(this.engine, [200, 400], entity);
        new _game_objects_ClockworkGames_Tree__WEBPACK_IMPORTED_MODULE_24__.Tree(this.engine, [600, 300]);
        new _game_objects_ClockworkGames_Tree__WEBPACK_IMPORTED_MODULE_24__.Tree(this.engine, [625, 300]);
        new _game_objects_ClockworkGames_Tree__WEBPACK_IMPORTED_MODULE_24__.Tree(this.engine, [650, 300]);
        new _game_objects_ClockworkGames_Tree__WEBPACK_IMPORTED_MODULE_24__.Tree(this.engine, [675, 300]);
        new _game_objects_ClockworkGames_Tree__WEBPACK_IMPORTED_MODULE_24__.Tree(this.engine, [700, 300]);
        new _game_objects_ClockworkGames_Tree__WEBPACK_IMPORTED_MODULE_24__.Tree(this.engine, [725, 300]);
    };
    // will need to duck type what happens when the scene is done and the game is over
    GameScript.prototype.loadGameElements = function (gameElements, parentScene) {
        var _this = this;
        return gameElements.map(function (element) {
            if (element.type === "Scene") {
                var newScene = new _game_engine_Levels_DesignElements_Scene__WEBPACK_IMPORTED_MODULE_15__.Scene(parentScene, element.name);
                newScene.gameElements = _this.loadGameElements(element.gameElements, newScene) || [];
                return newScene;
            }
            else if (element.type === "Event") {
                return new _game_engine_Levels_DesignElements_Event__WEBPACK_IMPORTED_MODULE_16__.Event(element.spawns, parentScene, element.isShipRelative, _this.engine);
            }
            else if (element.type === "Time") {
                return new _game_engine_Levels_DesignElements_Time__WEBPACK_IMPORTED_MODULE_17__.Time(parentScene, element.waitTime, parentScene);
            }
            else if (element.type === "LoopBeginning") {
                return new _game_engine_Levels_DesignElements_Loop__WEBPACK_IMPORTED_MODULE_18__.LoopBeginning(parentScene);
            }
            else if (element.type === "LoopEnd") {
                return new _game_engine_Levels_DesignElements_Loop__WEBPACK_IMPORTED_MODULE_18__.LoopEnd({ loopIdx: element.loopIdx || 0, repeatTimes: element.repeatTimes }, parentScene);
            }
            else if (element.type === "Operation") {
                return new _game_engine_Levels_DesignElements_Operation__WEBPACK_IMPORTED_MODULE_19__.Operation(element.operand, parentScene, _this.engine, _this);
            }
        });
    };
    GameScript.prototype.createStars = function () {
        var runoffFactor = 1.5;
        for (var i = 0; i < 900; i++) {
            var X = (runoffFactor * Math.random() - runoffFactor / 2) * GameScript.DIM_X; // based on zoom scale and eventually camera position
            var Y = (runoffFactor * Math.random() - runoffFactor / 2) * GameScript.DIM_Y;
            // const Z = -this.initialCameraZPos * 0.25 + -this.initialCameraZPos * 2 * Math.random();
            var Z = -this.initialCameraZPos * (0.5 + 2 * Math.random());
            new _game_objects_particles_star__WEBPACK_IMPORTED_MODULE_14__.Star(this.engine, [X, Y, Z], this.ship.cameraTransform);
        }
    };
    GameScript.prototype.updateXButtonListener = function (pressed) {
        if (pressed) {
            if (this.engine.paused) {
                var modal = document.getElementById("endModal");
                modal.style.display = "none";
                this.engine.paused = false;
                if (!this.engine.muted) {
                    this.engine.gameScript.theme.play();
                }
            }
        }
    };
    GameScript.prototype.update = function (deltaTime) {
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
            // this.spawnSequence(deltaTime); clockwork content
        }
        this.changeExplosionColor();
    };
    GameScript.prototype.changeExplosionColor = function () {
        this.explosionColorWheel += 1 / 2;
        this.explosionColorWheel = this.explosionColorWheel % 360;
    };
    GameScript.prototype.tallyScore = function (gameObject) {
        this.score += gameObject.points * this.scoreMultiplier;
        // if (this.score) {
        // }
    };
    GameScript.prototype.resetGame = function () {
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
                _this.engine.gameScript.theme.play();
                _this.engine.gameScript.gameStartSound.play();
            }
        };
        var closeModalWithClick = function (e) {
            if (e.target == modal) {
                _this.engine.paused = false;
                if (!_this.engine.muted) {
                    _this.engine.gameScript.theme.play();
                    _this.engine.gameScript.gameStartSound.play();
                }
                modal.style.display = "none";
                window.removeEventListener("click", closeModalWithClick, false);
            }
        };
        // When the user clicks anywhere outside of the modal, close it
        window.addEventListener("click", closeModalWithClick, false);
    };
    GameScript.prototype.death = function () {
        this.lives -= 1;
        this.deathPaused = true;
        this.explodeEverything();
        this.deathPauseTime = 4000;
        if (!this.engine.muted) {
            this.engine.gameScript.shipDeathSound.play();
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
                this.engine.gameScript.gameOverSound.play();
            }
            // this.playSound(this.gameOverSound)
            window.setTimeout(this.resetGame.bind(this), 2000);
        }
    };
    GameScript.prototype.gameOver = function () {
        // end the game here
    };
    GameScript.prototype.explodeEverything = function () {
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
                new _game_objects_particles_ship_explosion__WEBPACK_IMPORTED_MODULE_13__.ShipExplosion(_this.engine, pos);
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
    GameScript.prototype.onPause = function () {
        try {
            this.theme.pause();
        }
        catch (error) {
            console.log('failed to pause theme music');
        }
        var modal = document.getElementById("pauseModal");
        modal.style.display = "block";
    };
    GameScript.prototype.onUnPause = function () {
        try {
            this.theme.unPause();
        }
        catch (error) {
            console.log('failed to unpause theme music');
        }
        var modal = document.getElementById("pauseModal");
        modal.style.display = "none";
    };
    GameScript.prototype.randomArrowDirection = function () {
        var angles = [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2];
        return angles[Math.floor(Math.random() * angles.length) % angles.length];
    };
    GameScript.prototype.createEnemyCreators = function () {
        var _this = this;
        var engine = this.engine;
        return {
            BoxBox: function (pos) { return new _game_objects_enemies_BoxBox_boxbox__WEBPACK_IMPORTED_MODULE_5__.BoxBox(engine, pos); },
            Pinwheel: function (pos) { return new _game_objects_enemies_Pinwheel_pinwheel__WEBPACK_IMPORTED_MODULE_6__.Pinwheel(engine, pos); },
            Arrow: function (pos, angle) { return new _game_objects_enemies_Arrow_arrow__WEBPACK_IMPORTED_MODULE_7__.Arrow(engine, pos, angle); },
            Grunt: function (pos) { return new _game_objects_enemies_Grunt_grunt__WEBPACK_IMPORTED_MODULE_8__.Grunt(engine, pos, _this.ship.transform); },
            Weaver: function (pos) { return new _game_objects_enemies_Weaver_weaver__WEBPACK_IMPORTED_MODULE_9__.Weaver(engine, pos, _this.ship.transform); },
            Singularity: function (pos) { return new _game_objects_enemies_Singularity_singularity__WEBPACK_IMPORTED_MODULE_10__.Singularity(engine, pos); },
            AlienShip: function (pos) {
                return new _game_objects_enemies_Singularity_alien_ship__WEBPACK_IMPORTED_MODULE_11__.AlienShip(engine, pos, [0, 0], _this.ship.transform);
            },
        };
    };
    GameScript.prototype.randomSpawnEnemy = function () {
        var pos = this.randomPosition();
        var enemyCreators = Object.values(this.enemyCreatorMap);
        enemyCreators[Math.floor(Math.random() * enemyCreators.length) % enemyCreators.length](pos);
    };
    GameScript.prototype.addSequenceTypes = function () {
        var _this = this;
        return {
            BoxBoxesEverywhere: function () {
                var randomPositions = [];
                for (var i = 0; i < 50; i++) {
                    var pos = _this.randomPosition(10);
                    randomPositions.push(pos);
                }
                randomPositions.forEach(function (pos) {
                    _this.enemyCreatorMap["BoxBox"](pos);
                });
            },
            Singularity: function () {
                _this.enemyCreatorMap["Singularity"]([700, 300]);
            },
            EasyGroups: function () {
                var randomPositions = [];
                for (var i = 0; i < 5; i++) {
                    var pos = _this.randomPosition();
                    randomPositions.push(pos);
                }
                randomPositions.forEach(function (pos) {
                    var possibleSpawns = ["BoxBox", "Pinwheel"]; //, "Singularity"]
                    _this.enemyCreatorMap[possibleSpawns[Math.floor(Math.random() * possibleSpawns.length) %
                        possibleSpawns.length]](pos);
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
                    _this.enemyCreatorMap[possibleSpawns[Math.floor(Math.random() * possibleSpawns.length) %
                        possibleSpawns.length]](pos);
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
                    _this.enemyCreatorMap["Arrow"](pos);
                }
            },
            GruntGroups: function () {
                var randomPos = _this.randomPosition(50);
                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < 3; j++) {
                        _this.enemyCreatorMap["Grunt"]([
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
                        _this.enemyCreatorMap["Weaver"]([
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
    GameScript.prototype.randomPosition = function (radius) {
        if (!radius) {
            radius = 40;
        }
        return [
            (GameScript.DIM_X - radius * 4) * Math.random() + radius * 4,
            (GameScript.DIM_Y - radius * 4) * Math.random() + radius * 4,
            // 1000,600
        ];
    };
    GameScript.prototype.spawnSequence = function (delta) {
        var _this = this;
        this.intervalTime += delta;
        this.gameTime += delta;
        if (this.sequenceCount === 1) {
            this.enemyCreatorMap["Singularity"]([700, 300]);
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
        //       this.enemyCreatorMap["Weaver"]([i * 40 + randomPos[0], j * 40 + randomPos[1]])
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
                [GameScript.DIM_X - 40, 40],
                [40, GameScript.DIM_Y - 40],
                [GameScript.DIM_X - 40, GameScript.DIM_Y - 40],
            ];
            fourCorners.forEach(function (corner) {
                _this.enemyCreatorMap["Grunt"](corner);
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
            for (var i = 40; i < GameScript.DIM_X; i += 40) {
                arrowWallPositions.push([i, 50]);
            }
            arrowWallPositions.forEach(function (position) {
                _this.enemyCreatorMap["Arrow"](position, arrowDirection_1);
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
    GameScript.prototype.createShip = function () {
        return new _game_objects_Ship_ship__WEBPACK_IMPORTED_MODULE_1__.Ship(this.engine, this.startPosition, this.initialCameraZPos);
    };
    GameScript.prototype.createWalls = function () {
        return new _game_objects_Walls_walls__WEBPACK_IMPORTED_MODULE_2__.Walls(this.engine, this);
    };
    GameScript.prototype.createGrid = function (cameraTransform) {
        return new _game_objects_particles_Grid_grid__WEBPACK_IMPORTED_MODULE_4__.Grid(this.engine, this, cameraTransform);
    };
    GameScript.prototype.createOverlay = function () {
        return new _game_objects_Overlay_overlay__WEBPACK_IMPORTED_MODULE_3__.Overlay(this.engine, this, this.ship.transform);
    };
    GameScript.isOutOfBounds = function (pos, radius) {
        var max = [GameScript.DIM_X - radius, GameScript.DIM_Y - radius];
        if (radius) {
            return (pos[0] <= radius ||
                pos[0] >= max[0] ||
                pos[1] <= radius ||
                pos[1] >= max[1]);
        }
        else {
            return (pos[0] < 0 ||
                pos[1] < 0 ||
                pos[0] > GameScript.DIM_X ||
                pos[1] > GameScript.DIM_Y);
        }
    };
    // bounce(pos){
    //   return [
    //     Util.bounce(pos[0], GameScript.DIM_X), Util.bounce(pos[1], GameScript.DIM_Y)
    //   ];
    // }
    GameScript.bounce = function (transform, radius) {
        if (radius === void 0) { radius = 0; }
        var max = [GameScript.DIM_X - radius, GameScript.DIM_Y - radius];
        var pos = transform.absolutePosition();
        if (pos[0] <= radius || pos[0] >= max[0]) {
            transform.vel[0] = -transform.vel[0];
        }
        if (pos[1] <= radius || pos[1] >= max[1]) {
            transform.vel[1] = -transform.vel[1];
        }
    };
    GameScript.wallGraze = function (transform, radius) {
        if (radius === void 0) { radius = 0; }
        var max = [GameScript.DIM_X - radius, GameScript.DIM_Y - radius];
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
    GameScript.redirect = function (transform) {
        var max = [GameScript.DIM_X, GameScript.DIM_Y];
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
    GameScript.DIM_X = 1000;
    GameScript.DIM_Y = 600;
    GameScript.BG_COLOR = '#000000';
    return GameScript;
}());

// GameScript.BG_COLOR = "#000000";
// GameScript.DIM_X = 1000;
// GameScript.DIM_Y = 600;
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

/***/ "./src/game_view.ts":
/*!**************************!*\
  !*** ./src/game_view.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameView: () => (/* binding */ GameView)
/* harmony export */ });
var GameView = /** @class */ (function () {
    function GameView(engine, ctx, canvasEl, levelDesigner, animationView) {
        this.ctx = ctx;
        this.engine = engine;
        // this.ship = this.game.addShip(); belongs in game script
        this.canvasEl = canvasEl;
        this.levelDesigner = levelDesigner;
        this.animationView = animationView;
        this.bindKeyboardKeys = this.bindKeyboardKeys.bind(this);
        this.initialUnmute = true;
        this.gameStarted = false;
        this.modelClosed = false;
        this.gameEditorOpened = false;
        this.levelDesignLoaded = true;
        this.lastTime = 0;
        this.animate = this.animate.bind(this);
        this.MOVES = {
            s: [0, 1],
            a: [-1, 0],
            w: [0, -1],
            d: [1, 0],
        };
    }
    GameView.prototype.bindKeyboardKeys = function () {
        window.addEventListener("keydown", this.createKeyEvent(true), true);
        window.addEventListener("keyup", this.createKeyEvent(false), true);
    };
    // TODO move game specific logic
    // TODO this is somehow supposed to handle both mouse and controller inputs
    // but I only see it being use as a string at the moment
    GameView.prototype.updateMovementDirection = function (move, down) {
        if (!this.gameEditorOpened) {
            this.engine.gameScript.ship.updateLeftControlStickInput(move, down);
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
                _this.initialUnmute = false;
                _this.engine.gameScript.theme.play();
            }
            if (e.key === "m" && down) {
                _this.engine.toggleMute();
                if (_this.engine.muted) {
                    _this.engine.gameScript.theme.mute();
                }
                else {
                    _this.engine.gameScript.theme.unmute();
                }
            }
            var unitVector = _this.MOVES[e.key];
            if (unitVector) {
                _this.updateMovementDirection(e.key, down);
            }
            if (e.key === "p") {
                _this.engine.updateStartButtonListeners(down);
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
            _this.engine.updateMousePos(mousePos);
            _this.levelDesigner.mouseMoveEvent(e);
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
    };
    GameView.prototype.start = function () {
        var _this = this;
        this.lastTime = 0;
        this.bindKeyHandlers();
        // Get the modal
        var modal = document.getElementById("myModal");
        // Get the button that opens the modal
        // var btn = document.getElementById("myBtn");
        // Get the <span> element that closes the modal
        // const xclose = document.getElementsByClassName("close")[0];
        // When the user clicks on <span> (x), close the modal
        // xclose.onclick = (e) => {
        //     e.stopPropagation();
        //     modal.style.display = "none";
        //     this.modelClosed = true;
        // };
        // When the user clicks anywhere outside of the modal, close it
        //  window.addEventListener('click', (e) => {
        // window.onclick = (event) => {
        //     if (this.modelClosed && !this.gameStarted) {
        //         this.gameStarted = true;
        //         this.bindKeyboardKeys();
        //         requestAnimationFrame(this.animate);
        //     }
        //     if (event.target == modal) {
        //         this.modelClosed = true;
        //         modal.style.display = "none";
        //     }
        // };
        // add listeners to buttons on the modal
        // have them do the same things they do now.. 
        // but without the strange order that's required 
        // for starting the game after loading one, or starting the default one
        var startButtonModal = document.getElementById("startGameModal");
        // open the level editor
        var levelEditorButton = document.getElementById("LevelEditorModal");
        // load a level either for level editor or for starting the game
        var loadGameDesignButtonModal = document.getElementById("loadGameDesignModal");
        // get the text from element: loadGameDesignInputModal
        startButtonModal.onclick = function (e) {
            e.stopPropagation();
            _this.gameStarted = true;
            _this.bindKeyboardKeys();
            if (_this.levelDesignLoaded) {
                _this.levelDesigner.startGame();
            }
            requestAnimationFrame(_this.animate);
            modal.style.display = "none";
        };
        levelEditorButton.onclick = function (e) {
            e.stopPropagation();
            _this.gameStarted = true;
            _this.gameEditorOpened = true;
            _this.bindKeyboardKeys();
            requestAnimationFrame(_this.animate);
            modal.style.display = "none";
            _this.modelClosed = true;
            setTimeout(function () {
                _this.levelDesigner.gameEditorOpened = true;
                _this.engine.gameEditorOpened = true;
            }, 50);
        };
        loadGameDesignButtonModal.onclick = function (e) {
            e.stopPropagation();
            var json = document.getElementById("loadGameDesignInputModal").value;
            _this.levelDesigner.loadGameDesign(json);
            _this.levelDesignLoaded = true;
        };
    };
    GameView.prototype.animate = function (time) {
        var timeDelta = time - this.lastTime;
        this.engine.tick(timeDelta);
        this.levelDesigner.animate(timeDelta);
        this.animationView.animate(timeDelta);
        this.lastTime = time;
        // every call to animate requests causes another call to animate
        requestAnimationFrame(this.animate);
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/GEOWars.ts ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_script */ "./src/game_script.ts");
/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_view */ "./src/game_view.ts");
/* harmony import */ var _game_engine_game_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game_engine/game_engine */ "./src/game_engine/game_engine.ts");
/* harmony import */ var _game_engine_Levels_levelDesigner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game_engine/Levels/levelDesigner */ "./src/game_engine/Levels/levelDesigner.ts");
/* harmony import */ var _AnimationView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AnimationView */ "./src/AnimationView.ts");





document.addEventListener("DOMContentLoaded", function () {
    var canvasEl = document.getElementsByTagName("canvas")[0];
    canvasEl.width = _game_script__WEBPACK_IMPORTED_MODULE_0__.GameScript.DIM_X;
    canvasEl.height = _game_script__WEBPACK_IMPORTED_MODULE_0__.GameScript.DIM_Y;
    var ctx = canvasEl.getContext("2d");
    var gameEngine = new _game_engine_game_engine__WEBPACK_IMPORTED_MODULE_2__.GameEngine(ctx);
    var animationWindow = document.getElementsByTagName("canvas")[1].getContext("2d");
    var levelDesignerCanvas = document.getElementsByTagName("canvas")[2];
    var levelDesignerCtx = levelDesignerCanvas.getContext("2d");
    var animationView = new _AnimationView__WEBPACK_IMPORTED_MODULE_4__.AnimationView(animationWindow);
    var levelDesigner = new _game_engine_Levels_levelDesigner__WEBPACK_IMPORTED_MODULE_3__.LevelDesigner(gameEngine, animationView, levelDesignerCtx);
    gameEngine.levelDesigner = levelDesigner;
    var gameView = new _game_view__WEBPACK_IMPORTED_MODULE_1__.GameView(gameEngine, ctx, canvasEl, levelDesigner, animationView).start();
    levelDesigner.gameView = gameView;
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map