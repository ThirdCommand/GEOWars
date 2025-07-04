import { BoxBox } from "./game_objects/enemies/BoxBox/boxbox";
import { Pinwheel } from "./game_objects/enemies/Pinwheel/pinwheel";
import { Arrow } from "./game_objects/enemies/Arrow/arrow";
import { Grunt } from "./game_objects/enemies/Grunt/grunt";
import { Weaver } from "./game_objects/enemies/Weaver/weaver";
import { Singularity } from "./game_objects/enemies/Singularity/singularity";
import { AlienShip } from "./game_objects/enemies/Singularity/alien_ship";
import { Tree } from "./game_objects/Tree/Tree";
import { RandomRandom } from "./game_objects/enemies/RandomRandom";
import { Entity } from "./game_objects/ClockworkGames/Entity/Entity";
import {Bed} from "./game_objects/ClockworkGames/Bed";
// import {LeftSandwich, RightSandwich} from "./game_objects/ClockworkGames/Sandwich";
import {Plate} from "./game_objects/ClockworkGames/Plate";
import { type GameObject } from "./game_engine/game_object";
import { type LineSprite } from "./game_engine/line_sprite";
import { type EnemyPlacer } from "./game_engine/Levels/LevelDesign/EnemyPlacer";
import { type SpawnSerialized } from "./game_engine/Levels/DesignElements/Spawn";
import { Transform } from "./game_engine/transform";
import { Machinery } from "./game_objects/ClockworkGames/Machine";
import { TreeGrip } from "./game_objects/ClockworkGames/SawMachine/TreeGrip";
import { Camera } from "./game_engine/camera";


export class AnimationView {
    ctx: CanvasRenderingContext2D;
    gameObjects: GameObject[];
    lineSprites: LineSprite[];
    zoomScale: number;
    ship: {
        transform: Transform
    };
    lastTime: number;

    gameScript: {
        tallyScore(): void;
        ship: {
            transform: Transform
            cameraTransform: Transform
        };
        explosionColorWheel: number;
        grid: {
            Explosion(pos: [number, number, number?]): void;
        }
        theme: {
            play(): void;
        }
        death(): void;
    };
    focusPaused: boolean;
    

    overlayText: {
        Location: string;
        Time: number;
        Type: string;
        StartingAngle: number;
        RandomCount?: number;
        RandomSelection?: string;
        
    };
    overlayTextCleared: boolean;
    graphicQuality: number;
    paused: boolean;
    muted: boolean;
    activeCamera: Camera;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.graphicQuality = 1;
        this.gameObjects = [];
        this.lineSprites = [];
        this.paused = false;
        this.focusPaused = false;
        this.muted = false;
        this.gameScript = {
            tallyScore: () => {},
            ship: {
                transform: new Transform(),
                cameraTransform: new Transform()
            },
            explosionColorWheel: 0,
            grid: {
                Explosion: () => {}
            },
            theme: {
                play: () => {}
            },
            death: () => {}
        };
        this.zoomScale = 2;
        this.ship = {
            transform: new Transform()
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
        this.addEnemy("Grabber");
    }

    enemyPlacerSelected(enemyPlacer: EnemyPlacer) {
        this.clear();
        this.addEnemy(enemyPlacer.type);
        this.addOverlayText(enemyPlacer.serializedSpawn);
    }

    addOverlayText({type, location, numberToGenerate, possibleSpawns, angle}: SpawnSerialized) {
        possibleSpawns = possibleSpawns || [];
        this.overlayTextCleared = false;
        const locationText = 
            typeof location === 'string' ?
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
            RandomSelection: [...possibleSpawns].toString()
        };
    }

    animate(timeDelta: number) {
        if(this.paused || this.focusPaused) {
           return;
        }
        this.animateGameObjects(timeDelta);
        this.clearCanvas();
        this.renderLineSprites(this.ctx);
        this.renderOverlayText();
    }

    renderOverlayText() {
        if(this.overlayTextCleared) return;
        this.ctx.save();
        this.ctx.font = 18 + "px " + "Arial";
        this.ctx.fillStyle = "white";
        const typeText = "Type: " + this.overlayText.Type;
        const positionText = "Location: " + this.overlayText.Location;
        const angleText = "Starting Angle: " + Math.round(this.overlayText.StartingAngle * 360 / (2 * Math.PI));

        let randomCountText = "";
        let randomSelectionText = "";
        
        if(this.overlayText.RandomCount) {
            randomCountText = "Random Count: " + this.overlayText.RandomCount;
            randomSelectionText = "Random Selections: ";
        }
        
        this.ctx.fillText(
            typeText,
            10,
            20
        );
        this.ctx.fillText(
            positionText,
            10,
            38
        );
        this.ctx.fillText(
            angleText,
            10,
            56
        );
        if (randomCountText) {
            this.ctx.fillText(
                randomCountText,
                10,
                125
            );
            this.ctx.font = "7px Arial";
            this.ctx.fillText(
                randomSelectionText,
                10,
                143
            );
            for (let i = 0; i < this.overlayText.RandomSelection.length; i++) {
                this.ctx.fillText(
                    this.overlayText.RandomSelection[i].toString(),
                    10,
                    150 + i * 7
                );
            }
        }
        this.ctx.restore();
    }


    animateGameObjects(delta: number) {
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
        this.overlayTextCleared = true;
    }

    renderLineSprites(ctx: CanvasRenderingContext2D) {
    // ctx.scale = gameEngine.currentCamera.zoomScale
        this.ctx.save();

        this.ctx.scale(this.zoomScale, this.zoomScale);
        this.lineSprites.forEach((sprite) => {
            sprite.draw(ctx);
        });
        this.ctx.restore();
    // ctx.scale(1,1)
    }

    focusUnPause() {
        this.focusPaused = false;
    }

    focusPause() {
        this.focusPaused = true;
    }

    addGameObject(gameObject: GameObject) {
        this.gameObjects.push(gameObject);
    }

    queueSound() {
        
    }

    togglePause() {
        // console.log("pausetoggle")
        this.paused ? this.unPause() : this.pause();
    }

    pause() {
        this.paused = true;
        // this.gameScript.onPause();
    }

    unPause() {
        this.paused = false;
        // this.gameScript.onUnPause();
    }

    addCollider() {}

    addPhysicsComponent() {}

    remove(gameObject: GameObject) {
        if (gameObject.lineSprite) {
            const lineSpriteIndex = this.lineSprites.indexOf(gameObject.lineSprite);
            if (lineSpriteIndex !== -1) this.lineSprites.splice(lineSpriteIndex, 1);
        }
        const index = this.gameObjects.indexOf(gameObject);
        if (index !== -1) this.gameObjects.splice(index, 1);
    }

    addLineSprite(lineSprite: LineSprite) {
        this.lineSprites.push(lineSprite);
    }

    addEnemy(type: Types) {
        const enemyMap = {
            BoxBox: (pos: [number, number]) => new BoxBox(this, pos),
            Pinwheel: (pos: [number, number]) => new Pinwheel(this, pos),
            Arrow: (pos: [number, number], angle?: number) => new Arrow(this, pos, angle),
            Grunt: (pos: [number, number]) => new Grunt(this, pos, this.ship.transform),
            Weaver: (pos: [number, number]) => new Weaver(this, pos, this.ship.transform),
            Singularity: (pos: [number, number]) => new Singularity(this, pos),
            AlienShip: (pos: [number, number]) => new AlienShip(this, pos, [0, 0], this.ship.transform),
            RANDOM: (pos: [number, number]) => new RandomRandom(this, pos),
            Tree: (pos: [number, number]) => new Tree(this, pos, new Entity(this, pos)),
            Entity: (pos: [number, number]) => new Entity(this, pos),
            Bed: (pos: [number, number]) => new Bed(this, pos, new Entity(this, pos)),
            LeftSandwich: () => {
                // new LeftSandwich(this, [100,80]);
                // new RightSandwich(this, [130,80]);
                // new LeftSandwich(this, [110,107]);
                // new RightSandwich(this, [140,107]);
                // new Plate(this, [120, 95]);
                // const entity = new Entity(this, [100, 90]);
                // new Bed(this, [100, 100], entity);
                // new Tree(this, [100,100]);
            },
            Plate: (pos: [number, number]) => new Plate(this, pos),
            Machine: (pos: [number, number]) => new Machinery(this, pos),
            Grabber: (pos: [number, number]) => new TreeGrip(this, pos)
        };
        enemyMap[type]([100 / this.zoomScale, 100 / this.zoomScale]);
    }
}
export type Types = 
"BoxBox" | 
"Pinwheel" | 
"Arrow" | 
"Grunt" |
"Weaver" | 
"Singularity" | 
"AlienShip" | 
"RANDOM" |
"Tree" |
"Entity" | 
"Bed" | 
"LeftSandwich" | 
"Plate" | 
"Machine" |
"Grabber"


