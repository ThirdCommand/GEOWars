class EnemySpawn{
  constructor(enemy, game){
    this.enemy = enemy;
    this.game = game;
    this.initialSpawningScale = 1.5;
    this.spawningScale = 1.5;
    this.lifeTime = 2000;
    this.existTime = 0;

  }
  move(timeDelta) {

    this.existTime += timeDelta;

    if (this.existTime >= this.lifeTime){
      this.spawn(this.enemy)
      this.game.remove(this)
    }

    let cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let cycleSpeed = 0.1;

    if (this.spawningScale < 0.7){
      this.spawningScale = this.initialSpawningScale
    } else {
      this.spawningScale -= cycleSpeed * cycleSpeedScale;
    }
  }

  draw (ctx) {

    let pos = this.pos
    this.enemy.draw(ctx, this.spawningScale)
  }

  spawn(enemy){
    this.game.add(enemy)
  }

  remove(){
    this.game.remove(this)
  }

}
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
module.exports = EnemySpawn;