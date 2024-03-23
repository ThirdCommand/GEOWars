// a single enemy, and location
export class Spawn { 
    constructor(gameEngine, spawn) { // spawn: {type, location: [x,y]} 
        this.spawn = spawn;
        this.gameEngine = gameEngine;
    }

    // start with known positions entered first, 
    // then we can easily add random and the buttons needed for that

    // these random functions should be in the Event class I think

    randomPosition() {
        return [
            this.DIM_X * 0.70 * Math.random(),
            this.DIM_Y * 0.70 * Math.random(),
        ];
    }

    randomMob(possibleSpawns) {
        return possibleSpawns[Math.floor(Math.random() * possibleSpawns.length) % possibleSpawns.length];
    }

    spawnEvent() {
        for(let i = 0; i < this.spawn.numberToGenerate; i++) {
            let mobToSpawn = this.spawn.type;
            let location = this.spawn.location;
            if(this.spawn.type === 'RANDOM') {
                mobToSpawn = this.randomMob(this.spawn.possibleSpawns);
            } 
            if(this.spawn.location === 'RANDOM') {
                location = this.randomPosition();
            }
            this.gameEngine.enemyCreatorList[mobToSpawn](location);
        }
    }

    serialize() {
        return {
            type: "Spawn",
            spawn: this.spawn
        };
    }
}