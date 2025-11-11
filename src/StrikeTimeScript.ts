import { Sound } from "./game_engine/sound";
import { ParticleExplosion } from "./game_objects/particles/StrikeTimeParticleExplosion";
import { ShipExplosion } from "./game_objects/particles/ship_explosion";

import {Scene, SerializedGameElement } from "./game_engine/Levels/DesignElements/Scene";
import { Event } from "./game_engine/Levels/DesignElements/Event";
import { Time } from "./game_engine/Levels/DesignElements/Time";
import { LoopBeginning, LoopEnd } from "./game_engine/Levels/DesignElements/Loop";
import {Operation} from "./game_engine/Levels/DesignElements/Operation";

import { type GameEngine } from "./game_engine/game_engine";
import { type GameObject } from "./game_engine/game_object";
import { Aurora } from "./game_objects/StrikeTime/Aurora/Aurora";
import { PatriotMissileSite } from "./game_objects/StrikeTime/Enemies/PatriotMissileSite";
import { Building1 } from "./game_objects/StrikeTime/Buildings/Building1";
import { GEOWarsScript } from "./GEOWarsScript";
import { Airport } from "./game_objects/StrikeTime/Airport/Airport";
import { TargetBuilding } from "./game_objects/StrikeTime/Buildings/TargetBuilding";
import { Level } from "./game_objects/StrikeTime/Levels/Level";
import { LevelPrototype } from "./game_objects/StrikeTime/Levels/LevelPrototype";
import { StrikeTimeLevelGameObjectType } from "./game_engine/Levels/DesignElements/Spawn";

type EnemyCreator = (pos: [number, number, number] | [number, number], angle?: number) => GameObject;

// type Enemies = 'BoxBox' | 'Pinwheel' | 'Arrow' | 'Grunt' | 'Weaver' | 'Singularity' | 'AlienShip';

export const  DIM_X = 1000;
export const  DIM_Y = 600;

type EnemyCreatorMap = Map<StrikeTimeLevelGameObjectType, EnemyCreator>;

export interface Scorable {
    points: number;
}

export class StrikeTimeScript {
    serializedGame: string;
    theme: Sound;

    static BG_COLOR: string = '#000000';

    gameTime: number;
    engine: GameEngine;
    startPosition: [number, number, number];
    initialCameraZPos: number;
    currentLevel: Level | null;
    
    gameObjectCreatorMap: EnemyCreatorMap;

    explosionColorWheel: number;

    playFromRootScene: boolean;
    rootScene: Scene;
    score: number;

    constructor(engine: GameEngine) {
        this.serializedGame = "";
       
        this.gameTime = 0;
        this.engine = engine;
        this.startPosition = [500, 300, 0];
        this.initialCameraZPos = -1000;
        this.score = 0;

        this.theme = new Sound("", 1);
        
        this.gameObjectCreatorMap = this.createEnemyCreators();


        this.explosionColorWheel = 0;

        // not sure if this is a loaded level or a hardcoded one
        this.playFromRootScene = false;
    }

    nextElement() {
       // add loops if you want it to repeat, but it seems kind of silly for this game
       // this.rootScene.currentElementIndex = 0;
    }

    loadSounds() {
        // const types = 'BoxBox' | 'Pinwheel' | 'Arrow' | 'Grunt' | 'Weaver' | 'Singularity' | 'AlienShip';
        const particleExplosionSoundMagazine = this.loadSoundMagazine(ParticleExplosion.EXPLOSION_SOUND_URL, 0.2);
    }

    loadSoundMagazine(url: string, volume: number) {
        const sounds = [];
        for(let i=0;i<10;i++) {
            sounds.push(new Sound(url, volume))
        }
        return sounds
    }

    startGame(serializedGame: string) {
        this.serializedGame = serializedGame;
        const game = JSON.parse(serializedGame);
        if(game?.serializedGameElements?.length > 0) {
            this.rootScene = new Scene('root');
            this.rootScene.gameElements = this.loadGameElements(game.serializedGameElements, this.rootScene);
            this.playFromRootScene = true; 
        }
        this.currentLevel = new LevelPrototype(this.engine, this);
        this.currentLevel.createLevel();
    }

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
                // TODO some of these are GEOWars specific but don't have to be
                // or maybe it should since operation could do things specific to the game
                return new Operation(element.operand, parentScene, this.engine, this as unknown as GEOWarsScript);
            }
        });
    }
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

    update(deltaTime: number) {
        // TODO: I think this will still be useful in the future
        // but I don't have my head wrapped around it yet
        this.gameTime += deltaTime;
        if(this.playFromRootScene) {
            this.rootScene.update(deltaTime);
        } 
        this.changeExplosionColor();
        if(this.currentLevel?.runWinCondition()) {
            this.winGame();
        }
    }

    changeExplosionColor() {
        this.explosionColorWheel += 1 / 2;
        this.explosionColorWheel = this.explosionColorWheel % 360;
    }

    tallyScore(gameObject: Scorable) {
        // might not be generic enough to keep here
        this.score += gameObject.points;
        // if (this.score) {
        // }
    }

    startLevelAgain() {
        this.currentLevel.createLevel();
    }

    loseLevel() {
        this.engine.paused = true;
        const modal = document.getElementById("endOfStrikeTimeModalLost");
        modal.style.display = "block";

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
                this.theme?.play();
            }
            this.explodeEverything();
            this.startLevelAgain();
        };

        const closeModalWithClick = (e: MouseEvent) => {
            if (e.target == modal) {
                this.engine.paused = false;
                if (!this.engine.muted) {
                    this.theme?.play();
                }
                modal.style.display = "none";
                window.removeEventListener("click", closeModalWithClick, false);
                this.explodeEverything();
                this.startLevelAgain();
            }
        };

        // When the user clicks anywhere outside of the modal, close it
        window.addEventListener("click", closeModalWithClick, false);
    }

    explodeEverything() {
        // should be defined by the level
        const removeList: GameObject[] = [];
        const typesToRemove = [
            "Aurora",
            "Airport",
            "EndingLine",
            "Building1",
            "TargetBuilding",
            "PatriotMissileSite",
        ];
        this.engine.gameObjects.forEach((object) => {
            if (typesToRemove.includes(object.constructor.name)) {
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

    winGame() {
        this.engine.paused = true;
        const modal = document.getElementById("endOfStrikeTimeModal");
        modal.style.display = "block";

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
                this.theme?.play();
            }
        };

        const closeModalWithClick = (e: MouseEvent) => {
            if (e.target == modal) {
                this.engine.paused = false;
                if (!this.engine.muted) {
                    this.theme?.play();
                }
                modal.style.display = "none";
                window.removeEventListener("click", closeModalWithClick, false);
            }
        };

        // When the user clicks anywhere outside of the modal, close it
        window.addEventListener("click", closeModalWithClick, false);
    }

    death() {
    }

    gameOver() {
    // end the game here
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

    randomDirection() {
        const angles = [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2];
        return angles[Math.floor(Math.random() * angles.length) % angles.length];
    }

   createEnemyCreators(): EnemyCreatorMap { // might be able to make this static? you provide the game engine yourself?
        const engine = this.engine;

        const gameObjectCreatorMap: EnemyCreatorMap = new Map();

        gameObjectCreatorMap.set('Aurora', (pos: [number, number]) => new Aurora(engine, pos))
        gameObjectCreatorMap.set('Building1', (pos: [number, number]) => new Building1(engine, pos))
        gameObjectCreatorMap.set('TargetBuilding', (pos: [number, number]) => new TargetBuilding(engine, pos))
        gameObjectCreatorMap.set('Airport', (pos: [number, number]) => new Airport(engine, pos))
        gameObjectCreatorMap.set('PatriotMissileSite', (pos: [number, number], angle: number) => new PatriotMissileSite(engine, pos))
        
        return gameObjectCreatorMap;
    }

    randomSpawnEnemy() {
        const pos = this.randomPosition();
        const enemyCreators = Array.from(this.gameObjectCreatorMap.values());
        enemyCreators[
            Math.floor(Math.random() * enemyCreators.length) % enemyCreators.length
        ](pos);
    }

    randomPosition(radius?: number): [number, number] {
        if(!radius) {
            radius = 40;
        }
        return [
            (DIM_X - radius * 4) * Math.random() + radius * 4,
            (DIM_Y - radius * 4) * Math.random() + radius * 4,
            // 1000,600
        ];
    }

    static isOutOfBounds(pos: [number, number, number?], radius: number) {
        const max = [DIM_X - radius, DIM_Y - radius];
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
        pos[0] > DIM_X ||
        pos[1] > DIM_Y
            );
        }
    }

}
