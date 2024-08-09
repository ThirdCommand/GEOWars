import { Sound } from "./game_engine/sound";
import { Ship } from "./game_objects/Ship/ship";
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

import {Scene, SerializedGameElement } from "./game_engine/Levels/DesignElements/Scene";
import { Event } from "./game_engine/Levels/DesignElements/Event";
import { Time } from "./game_engine/Levels/DesignElements/Time";
import { LoopBeginning, LoopEnd } from "./game_engine/Levels/DesignElements/Loop";
import {Operation} from "./game_engine/Levels/DesignElements/Operation";

import { Entity } from "./game_objects/ClockworkGames/Entity/Entity";
import {Bed} from "./game_objects/ClockworkGames/Bed";
import {LeftSandwich, RightSandwich} from "./game_objects/ClockworkGames/Sandwich";
import {Plate} from "./game_objects/ClockworkGames/Plate";
import {Tree} from "./game_objects/ClockworkGames/Tree";
import { type GameEngine } from "./game_engine/game_engine";
import { type GameObject } from "./game_engine/game_object";
import { Transform } from "./game_engine/transform";

type EnemyCreator = (pos: [number, number, number] | [number, number], angle?: number) => GameObject;

// type Enemies = 'BoxBox' | 'Pinwheel' | 'Arrow' | 'Grunt' | 'Weaver' | 'Singularity' | 'AlienShip';

type EnemyCreatorMap = {
    [key: string]: EnemyCreator
};

export interface Scorable {
    points: number;
}

export class GameScript {
    serializedGame: string;
    theme: Sound;
    gameOverSound: Sound;
    gameStartSound: Sound;
    shipDeathSound: Sound;

    static DIM_X: number = 1000;
    static DIM_Y: number = 600;

    static BG_COLOR: string = '#000000';

    gameTime: number;
    score: number;
    engine: GameEngine;
    arrowAdded: boolean;
    startPosition: [number, number, number];
    initialCameraZPos: number;
    ship: Ship;
    
    walls: Walls;
    grid: Grid;
    overlay: Overlay;
    enemyCreatorMap: EnemyCreatorMap;
    sequenceTypes: {[key: string]: () => void};
    deathPausedTime: number;
    deathPaused: boolean;
    deathPauseTime: number;
    displayEndScore: number;

    intervalTiming: number;
    intervalTime: number;
    hugeSequenceTime: number;
    sequenceCount: number; // START GAME HERE
    lives: number;

    scoreMultiplier: number;

    spawnthing: boolean;
    explosionColorWheel: number;

    playFromRootScene: boolean;
    rootScene: Scene;

    constructor(engine: GameEngine) {
        this.serializedGame = "";
        this.theme = new Sound("sounds/Geometry_OST.mp3", 1);
        this.gameOverSound = new Sound("sounds/Game_over.wav");
        this.gameStartSound = new Sound("sounds/Game_start.wav");
        this.shipDeathSound = new Sound("sounds/Ship_explode.wav");
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

    nextElement() {
        this.rootScene.currentElementIndex = 0;
    }

    startGame(serializedGame: string) {
        this.serializedGame = serializedGame;
        const game = JSON.parse(serializedGame);
        this.rootScene = new Scene('root');
        this.rootScene.gameElements = this.loadGameElements(game.gameElements, this.rootScene);
        this.playFromRootScene = false; // clockwork content
        this.intervalTime = 0;
        // clockwork content
        this.loadClockworkContent();
        this.ship.transform.pos = [this.startPosition[0], this.startPosition[1], this.startPosition[2]];
    }

    loadClockworkContent() {
        new LeftSandwich(this.engine, [100,80]);
        new RightSandwich(this.engine, [130,80]);
        new LeftSandwich(this.engine, [110,107]);
        new RightSandwich(this.engine, [140,107]);
        new Plate(this.engine, [120, 95]);
        const entity = new Entity(this.engine, [200, 390]);
        new Bed(this.engine, [200, 400], entity);
        new Tree(this.engine, [600, 300]);
        new Tree(this.engine, [625, 300]);
        new Tree(this.engine, [650, 300]);
        new Tree(this.engine, [675, 300]);
        new Tree(this.engine, [700, 300]);
        new Tree(this.engine, [725, 300]);
    }

    // will need to duck type what happens when the scene is done and the game is over

    
    loadGameElements(serializedGameElements: SerializedGameElement[], parentScene: Scene) {
        return serializedGameElements.map((element) => {
            if(element.type === "Scene") {
                const newScene = new Scene(element.name, parentScene);
                newScene.gameElements = this.loadGameElements(element.serializedGameElements, newScene) || [];
                return newScene;
            } else if(element.type === "Event") {
                return new Event(element.spawns, parentScene, element.isShipRelative ,this.engine);
            } else if(element.type === "Time") {
                return new Time(parentScene, element.waitTime);
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
            const X = (runoffFactor * Math.random() - runoffFactor/2) * GameScript.DIM_X; // based on zoom scale and eventually camera position
            const Y = (runoffFactor * Math.random() - runoffFactor/2) * GameScript.DIM_Y;
            // const Z = -this.initialCameraZPos * 0.25 + -this.initialCameraZPos * 2 * Math.random();
            const Z = -this.initialCameraZPos * (0.5 + 2* Math.random());
            new Star(this.engine, [X, Y, Z], this.ship.cameraTransform);
        }
    }

    updateXButtonListener(pressed: boolean) {
        if (pressed) {
            if (this.engine.paused) {
                const modal = document.getElementById("endModal");

                modal.style.display = "none";
                this.engine.paused = false;
                if (!this.engine.muted) {
                    this.engine.gameScript.theme.play();
                }
            }
        }
    }

    update(deltaTime: number) {
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
            // this.spawnSequence(deltaTime); clockwork content
        }
        this.changeExplosionColor();
    }

    changeExplosionColor() {
        this.explosionColorWheel += 1 / 2;
        this.explosionColorWheel = this.explosionColorWheel % 360;
    }

    tallyScore(gameObject: Scorable) {
        this.score += gameObject.points * this.scoreMultiplier;
        // if (this.score) {
        // }
    }

    resetGame() {
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
        const modal = document.getElementById("endModal");
        modal.style.display = "block";
        const scoreDisplay = document.getElementById("score");
        scoreDisplay.innerHTML = `score: ${this.displayEndScore}`;

        // Get the button that opens the modal
        // var btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        const xclose = document.getElementsByClassName("endClose")[0] as HTMLElement;

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

        const closeModalWithClick = (e: MouseEvent) => {
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
        this.grid.Playerdies(this.ship.transform.pos);
        if (this.lives === 0) {
            try {
                this.theme.pause();
            } catch (err) {
                console.log('theme failed to play');
            }
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
        const removeList: GameObject[] = [];
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
                new ShipExplosion(this.engine, pos);
            } else if (object.constructor.name === "Bullet") {
                removeList.push(object);
            } else if (typesToRemove.includes(object.constructor.name)) {
                const objectTransform = object.transform;
                const pos = objectTransform.absolutePosition();
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
        } catch (error) {
            console.log('failed to pause theme music');
        }

        const modal = document.getElementById("pauseModal");
        modal.style.display = "block";
    }

    onUnPause() {
        try {
            this.theme.unPause();
        } catch (error) {
            console.log('failed to unpause theme music');
        }

        const modal = document.getElementById("pauseModal");
        modal.style.display = "none";
    }

    randomArrowDirection() {
        const angles = [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2];
        return angles[Math.floor(Math.random() * angles.length) % angles.length];
    }

    createEnemyCreators(): EnemyCreatorMap { // might be able to make this static? you provide the game engine yourself?
        const engine = this.engine;
        return {
            BoxBox: (pos: [number, number]) => new BoxBox(engine, pos),
            Pinwheel: (pos: [number, number]) => new Pinwheel(engine, pos),
            Arrow: (pos: [number, number], angle: number) => new Arrow(engine, pos, angle),
            Grunt: (pos: [number, number]) => new Grunt(engine, pos, this.ship.transform),
            Weaver: (pos: [number, number]) => new Weaver(engine, pos, this.ship.transform),
            Singularity: (pos: [number, number]) => new Singularity(engine, pos),
            AlienShip: (pos: [number, number]) =>
                new AlienShip(engine, pos, [0, 0], this.ship.transform),
        };
    }

    randomSpawnEnemy() {
        const pos = this.randomPosition();
        const enemyCreators = Object.values(this.enemyCreatorMap);
        enemyCreators[
            Math.floor(Math.random() * enemyCreators.length) % enemyCreators.length
        ](pos);
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
                    this.enemyCreatorMap["BoxBox"](pos);
                });
            },
            Singularity: () => {
                this.enemyCreatorMap["Singularity"]([700, 300]);
            },
            EasyGroups: () => {
                const randomPositions = [];
                for (let i = 0; i < 5; i++) {
                    const pos = this.randomPosition();
                    randomPositions.push(pos);
                }
                randomPositions.forEach((pos) => {
                    const possibleSpawns = ["BoxBox", "Pinwheel"]; //, "Singularity"]
                    this.enemyCreatorMap[
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
                    this.enemyCreatorMap[
                        possibleSpawns[
                            Math.floor(Math.random() * possibleSpawns.length) %
                possibleSpawns.length
                        ]
                    ](pos);
                });
            },
            ArrowsAttack: () => {
                const somePositions: Array<[number, number]> = [
                    [200, 300],
                    [1000, 300],
                    [600, 100],
                ];
                const pos: [number, number] =
                    somePositions[
                        Math.floor(Math.random() * somePositions.length) %
                        somePositions.length
                    ];
                for (let i = 0; i < 5; i++) {
                    pos[1] += i * 80;
                    this.enemyCreatorMap["Arrow"](pos);
                }
            },
            GruntGroups: () => {
                const randomPos = this.randomPosition(50);
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        this.enemyCreatorMap["Grunt"]([
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
                        this.enemyCreatorMap["Weaver"]([
                            i * 40 + randomPos[0],
                            j * 40 + randomPos[1] - 50,
                        ]);
                    }
                }
            },
        };
    }

    // createSpawnStateMachine() {
    // let events = this.sequenceTypes
    // let stateIndex = {i: 0}
    // // these are the events
    // // times will be hard coded for each state in the queue
    // let spawnQueue = []
    // let singularityState = new StateMachine(this.engine, {stateIndex, event: events.Singularity})
    // let easyGroupsState = new StateMachine(this.engine, undefined)
    // }

    randomPosition(radius?: number): [number, number] {
        if(!radius) {
            radius = 40;
        }
        return [
            (GameScript.DIM_X - radius * 4) * Math.random() + radius * 4,
            (GameScript.DIM_Y - radius * 4) * Math.random() + radius * 4,
            // 1000,600
        ];
    }

    spawnSequence(delta: number) {
        this.intervalTime += delta;

        this.gameTime += delta;

        if (this.sequenceCount === 1) {
            this.enemyCreatorMap["Singularity"]([700, 300]);
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
        //       this.enemyCreatorMap["Weaver"]([i * 40 + randomPos[0], j * 40 + randomPos[1]])
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

            const fourCorners: Array<[number, number]> = [
                [40, 40],
                [GameScript.DIM_X - 40, 40],
                [40, GameScript.DIM_Y - 40],
                [GameScript.DIM_X - 40, GameScript.DIM_Y - 40],
            ];
            fourCorners.forEach((corner) => {
                this.enemyCreatorMap["Grunt"](corner);
            });
        } else if (
            this.intervalTime > 375 &&
        this.sequenceCount > 20 &&
        this.sequenceCount < 30 &&
        this.hugeSequenceTime % 2 === 1
        ) {
            this.intervalTime = 0;
            this.sequenceCount += 10;
            const arrowWallPositions: Array<[number, number]> = [];
            const arrowDirection = (Math.PI * 3) / 2 + Math.PI;
            for (let i = 40; i < GameScript.DIM_X; i += 40) {
                arrowWallPositions.push([i, 50]);
            }

            arrowWallPositions.forEach((position) => {
                this.enemyCreatorMap["Arrow"](position, arrowDirection);
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
        return new Walls(this.engine);
    }

    createGrid(cameraTransform: Transform) {
        return new Grid(this.engine, cameraTransform);
    }

    createOverlay() {
        return new Overlay(this.engine, this, this.ship.transform);
    }

    static isOutOfBounds(pos: [number, number, number?], radius: number) {
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

    // bounce(pos){
    //   return [
    //     Util.bounce(pos[0], GameScript.DIM_X), Util.bounce(pos[1], GameScript.DIM_Y)
    //   ];
    // }

    static bounce(transform: Transform, radius = 0) {
        const max = [GameScript.DIM_X - radius, GameScript.DIM_Y - radius];
        const pos = transform.absolutePosition();
        if (pos[0] <= radius || pos[0] >= max[0]) {
            transform.vel[0] = -transform.vel[0];
        }
        if (pos[1] <= radius || pos[1] >= max[1]) {
            transform.vel[1] = -transform.vel[1];
        }
    }

    static wallGraze(transform: Transform, radius = 0) {
        const max = [GameScript.DIM_X - radius, GameScript.DIM_Y - radius];
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

    static redirect(transform: Transform) {
        const max = [GameScript.DIM_X, GameScript.DIM_Y];
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
