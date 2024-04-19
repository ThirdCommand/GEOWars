import { Sound } from "./game_engine/sound";
import { Ship } from "./game_objects/ship/ship";
import { Walls } from "./game_objects/Walls/walls";
import { Overlay } from "./game_objects/Overlay/overlay";
import { Grid } from "./game_objects/particles/Grid/grid";
import { BoxBox } from "./game_objects/enemies/BoxBox/boxbox";
import { Pinwheel } from "./game_objects/enemies/Pinwheel/pinwheel";
import { Arrow } from "./game_objects/enemies/Arrow/arrow";
import { Grunt } from "./game_objects/enemies/Grunt/grunt";
import { Weaver } from "./game_objects/enemies/Weaver/weaver";
import { Singularity } from "./game_objects/enemies/Singularity/singularity";
import { AlienShip } from "./game_objects/enemies/Singularity/alien_ship";
import { ParticleExplosion } from "./game_objects/particles/particle_explosion";
import { ShipExplosion } from "./game_objects/particles/ship_explosion";
import {Star} from "./game_objects/particles/star";

import { Scene } from "./game_engine/Levels/DesignElements/Scene";
import { Event } from "./game_engine/Levels/DesignElements/Event";
import { Time } from "./game_engine/Levels/DesignElements/Time";
import { LoopBeginning, LoopEnd } from "./game_engine/Levels/DesignElements/Loop";
import {Operation} from "./game_engine/Levels/DesignElements/Operation";

export class GameScript {
    constructor(engine) {
        this.serializedGame = "";
        this.theme = new Sound("sounds/Geometry_OST.mp3", 1);
        this.gameOverSound = new Sound("sounds/Game_over.wav");
        this.gameStartSound = new Sound("sounds/Game_start.wav");
        this.shipDeathSound = new Sound("sounds/Ship_explode.wav");
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
        // this.deathSound = new Audio("sounds/Enemy_explode.wav")
        // this.deathSound.volume = 0.5;

        this.intervalTiming = 1;
        this.intervalTime = 0;
        this.hugeSequenceTime = 0;
        this.sequenceCount = 0; // START GAME HERE
        this.lives = 3;
        this.soundsToPlay = {};
        this.scoreMultiplier = 1;

        this.spawnthing = false;
        this.explosionColorWheel = 0;

        this.playFromRootScene = false;
    }

    nextElement() {
        this.rootScene.currentElementIndex = 0;
    }

    startGame(serializedGame) {
        this.serializedGame = serializedGame;
        const game = JSON.parse(serializedGame);
        this.rootScene = new Scene(this, "Root");
        this.rootScene.gameElements = this.loadGameElements(game.gameElements, this.rootScene);
        this.playFromRootScene = true;
        this.intervalTime = 0;
        this.ship.transform.pos = [this.startPosition[0], this.startPosition[1], this.startPosition[2]];
    }

    // will need to duck type what happens when the scene is done and the game is over

    loadGameElements(gameElements, parentScene) {
        return gameElements.map((element) => {
            if(element.type === "Scene") {
                const newScene = new Scene(parentScene, element.name);
                newScene.gameElements = this.loadGameElements(element.gameElements, newScene) || [];
                return newScene;
            } else if(element.type === "Event") {
                return new Event(element.spawns, parentScene, element.isShipRelative ,this.engine);
            } else if(element.type === "Time") {
                return new Time(parentScene, element.waitTime, parentScene);
            } else if(element.type === "LoopBeginning") {
                return new LoopBeginning(parentScene);
            } else if (element.type === "LoopEnd") {
                return new LoopEnd({loopIdx: element.loopIdx || 0, repeatTimes: element.repeatTimes}, parentScene);
            } else if (element.type === "Operation") {
                return new Operation(element.operand, parentScene, this.engine, this);
            }
        });
    }

    createStars() {
        const runoffFactor = 1.5;
        for(let i = 0; i < 900; i++) {
            const X = (runoffFactor * Math.random() - runoffFactor/2) * this.DIM_X; // based on zoom scale and eventually camera position
            const Y = (runoffFactor * Math.random() - runoffFactor/2) * this.DIM_Y;
            // const Z = -this.initialCameraZPos * 0.25 + -this.initialCameraZPos * 2 * Math.random();
            const Z = -this.initialCameraZPos * (0.5 + 2* Math.random());
            new Star(this.engine, [X, Y, Z], this.ship.cameraTransform);
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
        if (this.deathPaused) {
            this.deathPausedTime += deltaTime;
            if (this.deathPausedTime > this.deathPauseTime) {
                this.deathPausedTime = 0;
                this.deathPaused = false;
            } else {
                deltaTime = 0;
            }
        } 

        if(this.playFromRootScene) {
            this.rootScene.update(deltaTime);
        } else {
            this.spawnSequence(deltaTime);
        }
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
            // this.playSound(this.gameOverSound)
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
                new ShipExplosion(this.engine, pos, [0, 0]);
            } else if (object.constructor.name === "Bullet") {
                removeList.push(object);
            } else if (typesToRemove.includes(object.constructor.name)) {
                const objectTransform = object.transform;
                const pos = objectTransform.absolutePosition();
                const vel = objectTransform.absoluteVelocity();
                new ParticleExplosion(this.engine, pos);
                removeList.push(object);
            }
        });
        removeList.forEach((removeThis) => {
            removeThis.remove();
        });
    }

    // levelDesigner() {
    //     const modal = document.getElementById("levelDesignerModal");
    // }

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
            BoxBox: (pos, angle) => new BoxBox(engine, pos),
            Pinwheel: (pos, angle) => new Pinwheel(engine, pos),
            Arrow: (pos, angle) => new Arrow(engine, pos, angle),
            Grunt: (pos, angle) => new Grunt(engine, pos, this.ship.transform),
            Weaver: (pos, angle) => new Weaver(engine, pos, this.ship.transform),
            Singularity: (pos, angle) => new Singularity(engine, pos),
            AlienShip: (pos, angle) =>
                new AlienShip(engine, pos, [0, 0], this.ship.transform),
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
            BoxBoxesEverywhere: () => {
                const randomPositions = [];
                for (let i = 0; i < 50; i++) {
                    const pos = this.randomPosition(10);
                    randomPositions.push(pos);
                }
                randomPositions.forEach((pos) => {
                    this.enemyCreatorList["BoxBox"](pos);
                });
            },
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
                const randomPos = this.randomPosition(50);
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
                const randomPos = this.randomPosition(50);
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        this.enemyCreatorList["Weaver"]([
                            i * 40 + randomPos[0],
                            j * 40 + randomPos[1] - 50,
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

    randomPosition(radius) {
        if(!radius) {
            radius = 40;
        }
        return [
            (this.DIM_X - radius * 4) * Math.random() + radius * 4,
            (this.DIM_Y - radius * 4) * Math.random() + radius * 4,
            // 1000,600
        ];
    }

    spawnSequence(delta) {
        this.intervalTime += delta;

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

    // if (this.gameTime % 2000 === 0){
    //   this.spawned = false
    // }
    }

    createShip() {
        return new Ship(this.engine, this.startPosition, this.initialCameraZPos);
    }

    createWalls() {
        return new Walls(this.engine, this);
    }

    createGrid(cameraTransform) {
        return new Grid(this.engine, this, cameraTransform);
    }

    createOverlay() {
        return new Overlay(this.engine, this, this.ship.transform);
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



// 2D 
const performance2D = {
    collisionTime: 0.12846034227596656,
    frameRate: 117.86903385504282,
    physicsCalcTime: 0.2529761062793578,
    renderTime: 0.9149865687913138,
    scriptTime: 0.00835571889659564,
    updateTime: 0.1869786510739892,
};

// 3D
const performance3D = {
    collisionTime: 0.0705062137856271,
    frameRate: 54.9810552849427,
    physicsCalcTime: 0.16501970291499046,
    renderTime: 1.1280691114636254,
    scriptTime: 0.008426796002401008,
    updateTime: 0.177841770708579,
};
