import { type AnimationView } from "../../AnimationView";
import { type GameEngine } from "../../game_engine/game_engine";
import { GameObject } from "../../game_engine/game_object";
import {type Arrow } from "../enemies/Arrow/arrow";
import {type BoxBox } from "../enemies/BoxBox/boxbox";
import {type Grunt } from "../enemies/Grunt/grunt";
import {type Pinwheel } from "../enemies/Pinwheel/pinwheel";
import {type AlienShip } from "../enemies/Singularity/alien_ship";
import {type Singularity } from "../enemies/Singularity/singularity";
import {type Weaver } from "../enemies/Weaver/weaver";

type EnemyType = Grunt | Pinwheel | BoxBox | Arrow | Singularity | Weaver | AlienShip;

export class EnemySpawn extends GameObject {
    initialSpawningScale: number;
    lifeTime: number;
    existTime: number;
    parentObject: EnemyType;
    constructor(engine: GameEngine | AnimationView, parentObject: EnemyType){
        super(engine);
        this.initialSpawningScale = 1.5;
        this.lifeTime = 1000;
        this.existTime = 0;
        parentObject.lineSprite.spawning = true;
       
        // this.gameEngine.queueSound(this.parentObject.spawnSound)
    }
    animate(timeDelta: number) {
        this.update(timeDelta);
    }

    update(timeDelta: number) {
        this.existTime += timeDelta;
        if (this.existTime >= this.lifeTime){
            this.parentObject.lineSprite.spawningScale = 1;
            this.parentObject.exist();
            this.parentObject.lineSprite.spawning = false;
            this.remove();
        }

        const cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        const cycleSpeed = 0.1;

        this.parentObject.lineSprite.spawningScale -= cycleSpeed * cycleSpeedScale;
    
        if (this.parentObject.lineSprite.spawningScale < 0.7){
            this.parentObject.lineSprite.spawningScale = this.initialSpawningScale;
        } 
    }
}
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;