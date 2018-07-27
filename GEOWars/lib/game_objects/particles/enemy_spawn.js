const GameObject = require("../game_engine/game_object")

class EnemySpawn extends GameObject{
  constructor(){
    this.initialSpawningScale = 1.5;
    this.spawningScale = 1.5;
    this.lifeTime = 1000;
    this.existTime = 0;
    if (!this.game.muted){
      this.gameEngine.queueSound(this.parentObject.spawnSound)
    }
  }

  update(timeDelta) {
    
    this.existTime += timeDelta;
    if (this.existTime >= this.lifeTime){
      this.parentObject.exist()
      this.remove()
    }

    let cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let cycleSpeed = 0.1;
    
    if (this.spawningScale < 0.7){
      this.spawningScale = this.initialSpawningScale;
    } else {
      this.spawningScale -= cycleSpeed * cycleSpeedScale;
    }
  }

  // draw (ctx) {
  //   let pos = this.pos;
  //   this.parent.draw(ctx, this.spawningScale)
  // }

}
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
module.exports = EnemySpawn;