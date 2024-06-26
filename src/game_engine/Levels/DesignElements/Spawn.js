// a single enemy, and location
export class Spawn { 
    constructor(spawn, gameEngine) { // spawn: {type, location: [x,y]} 
        this.spawn = spawn;
        //  spawn: {
        //     type: 'RANDOM',
        //     location: 'RANDOM',
        //     possibleSpawns: ['Weaver', 'Grunt']
        //     angle: 'PI/3'
        // }
        this.gameEngine = gameEngine;
    }

    // start with known positions entered first, 
    // then we can easily add random and the buttons needed for that

    // these random functions should be in the Event class I think

    randomPosition() {
        return [
            this.gameEngine.gameScript.DIM_X * 0.95 * Math.random(),
            this.gameEngine.gameScript.DIM_Y * 0.90 * Math.random(),
        ];
    }

    randomMob(possibleSpawns) {
        return possibleSpawns[Math.floor(Math.random() * possibleSpawns.length) % possibleSpawns.length];
    }

    spawnEvent(numberFactor, isShipRelative) {
        const numberToGenerate = Math.trunc(this.spawn.numberToGenerate * numberFactor) || 1;

        for(let i = 0; i < numberToGenerate; i++) {
            let mobToSpawn = this.spawn.type;
            let location;
            if(mobToSpawn === 'RANDOM') {
                mobToSpawn = this.randomMob(this.spawn.possibleSpawns);
            }
            if(this.spawn.location === 'RANDOM') {
                location = this.randomPosition();
            } else {
                location = [Number(this.spawn.location[0]), Number(this.spawn.location[1])];
                if(isShipRelative) {
                    location[0] += this.gameEngine.gameScript.ship.transform.pos[0] - this.gameEngine.gameScript.DIM_X / 2;
                    location[1] += this.gameEngine.gameScript.ship.transform.pos[1] - this.gameEngine.gameScript.DIM_Y / 2;

                    // check if off edge of map
                    if(location[0] > this.gameEngine.gameScript.DIM_X  - 100) {
                        location[0] = this.gameEngine.gameScript.DIM_X - 100;
                    } else if(location[0] < 100) {
                        location[0] = 100;
                    }
                    
                    if( location[1] > this.gameEngine.gameScript.DIM_Y - 100)  {
                        location[1] = this.gameEngine.gameScript.DIM_Y - 100;
                    } else if(location[1] < 0 + 100) {
                        location[1] = 0 + 100;
                    }
                }
            }
            this.gameEngine.gameScript.enemyCreatorList[mobToSpawn](location);
        }
    }

    // serialize() {
    //     return {
    //         type: "Spawn",
    //         spawn: this.spawn
    //     };
    // }
}