// a single enemy, and location
import { type GameEngine } from "../../game_engine";
import { GameScript } from "../../../game_script";

export type EnemyType = 'BoxBox' | 'Arrow' | 'Grunt' | 'Pinwheel' | 'Weaver' | 'Singularity' | 'AlienShip' | 'RANDOM';

export function isEnemyType(value: string): value is EnemyType {
    return ['BoxBox', 'Arrow', 'Grunt', 'Pinwheel', 'Weaver', 'Singularity', 'RANDOM'].includes(value);
}

export type SpawnSerialized = {
    type: EnemyType;  
    location?: [number, number] | 'RANDOM';
    possibleSpawns?: EnemyType[];
    numberToGenerate?: number;
    angle?: number;
}

export class Spawn { 
    type: SpawnSerialized['type'];
    location: SpawnSerialized['location'];
    gameEngine: GameEngine;
    possibleSpawns: EnemyType[];
    numberToGenerate: number;
    angle: number;
    constructor(spawnData: SpawnSerialized, gameEngine: GameEngine) { // spawn: {type, location: [x,y]} 
        this.type = spawnData.type;
        this.location = spawnData.location;
        this.gameEngine = gameEngine;
        this.numberToGenerate = spawnData.numberToGenerate;
        //  spawn: {
        //     type: 'RANDOM',
        //     location: 'RANDOM',
        //     possibleSpawns: ['Weaver', 'Grunt']
        //     angle: 'PI/3'
        // }
    }

    // start with known positions entered first, 
    // then we can easily add random and the buttons needed for that

    // these random functions should be in the Event class I think

    randomPosition(): [number, number] {
        return [
            GameScript.DIM_X * 0.95 * Math.random(),
            GameScript.DIM_Y * 0.90 * Math.random(),
        ];
    }

    randomMob() {
        return this.possibleSpawns[Math.floor(Math.random() * this.possibleSpawns.length) % this.possibleSpawns.length];
    }

    spawnEvent(numberFactor: number, isShipRelative: boolean) {
        const numberToGenerate = Math.trunc(this.numberToGenerate * numberFactor) || 1;

        for(let i = 0; i < numberToGenerate; i++) {
            let mobToSpawn = this.type;
            let location: [number, number];
            if(mobToSpawn === 'RANDOM') {
                mobToSpawn = this.randomMob();
            }
            if(this.location === 'RANDOM') {
                location = this.randomPosition();
            } else {
                location = [Number(this.location[0]), Number(this.location[1])];
                if(isShipRelative) {
                    location[0] += this.gameEngine.gameScript.ship.transform.pos[0] - GameScript.DIM_X / 2; // TODO Camera?
                    location[1] += this.gameEngine.gameScript.ship.transform.pos[1] - GameScript.DIM_Y / 2; // TODO Camera?

                    // check if off edge of map
                    if(location[0] > GameScript.DIM_X  - 100) {
                        location[0] = GameScript.DIM_X - 100;
                    } else if(location[0] < 100) {
                        location[0] = 100;
                    }
                    
                    if( location[1] > GameScript.DIM_Y - 100)  {
                        location[1] = GameScript.DIM_Y - 100;
                    } else if(location[1] < 0 + 100) {
                        location[1] = 0 + 100;
                    }
                }
            }
            this.gameEngine.gameScript.enemyCreatorMap[mobToSpawn](location);
        }
    }

    serialize(): {type: "Spawn", spawnData: SpawnSerialized} {
        return {
            type: "Spawn",
            spawnData: {
                type: this.type,
                angle: this.angle,
                location: this.location,
                possibleSpawns: this.possibleSpawns,
                numberToGenerate: this.numberToGenerate,
            },
        };
    }
}