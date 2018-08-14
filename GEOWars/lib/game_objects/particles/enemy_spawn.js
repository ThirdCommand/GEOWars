const GameObject = require("../../game_engine/game_object")

class EnemySpawn extends GameObject{
  constructor(engine){
    super(engine)
    this.initialSpawningScale = 1.5;
    // this.spawningScale = 1.5;
    this.lifeTime = 1000;
    this.existTime = 0;
    // this.gameEngine.queueSound(this.parentObject.spawnSound)
  }

  update(timeDelta) {
    this.existTime += timeDelta;
    if (this.existTime >= this.lifeTime){
      
      this.parentObject.exist()
      this.parentObject.lineSprite.spawningScale = 1;
      this.remove()
    }

    let cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let cycleSpeed = 0.1;
    
    if (this.parentObject.lineSprite.spawningScale < 0.7){
      this.parentObject.lineSprite.spawningScale = this.initialSpawningScale;
    } else {
      this.parentObject.lineSprite.spawningScale -= cycleSpeed * cycleSpeedScale;
    }
  }
}
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
module.exports = EnemySpawn;