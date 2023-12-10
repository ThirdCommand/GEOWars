import { GameObject } from "../../game_engine/game_object";

export class EnemySpawn extends GameObject{
    constructor(engine){
        super(engine);
        this.initialSpawningScale = 1.5;
        this.lifeTime = 1000;
        this.existTime = 0;
        // this.gameEngine.queueSound(this.parentObject.spawnSound)
    }

    update(timeDelta) {
        this.existTime += timeDelta;
        this.parentObject.lineSprite.spawning = true;
        if (this.existTime >= this.lifeTime){
            this.parentObject.lineSprite.spawningScale = 1;
            this.parentObject.exist();
            this.parentObject.lineSprite.spawning = false;
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