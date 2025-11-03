// a single enemy, and location
import { type GameEngine } from "../../game_engine";
import { DIM_X, DIM_Y, GEOWarsScript } from "../../../GEOWarsScript";
import { StrikeTimeScript } from "../../../StrikeTimeScript";

export type GameElementObjectType = StrikeTimeLevelGameObjectType | GEOEnemyType
export type GEOEnemyType = 'BoxBox' | 'Arrow' | 'Grunt' | 'Pinwheel' | 'Weaver' | 'Singularity' | 'AlienShip' | 'RANDOM';
export type StrikeTimeLevelGameObjectType = 'Aurora' | 'PatriotSite' | 'Building' | 'TargetBuilding' | 'RANDOM';

export function isEnemyType(value: string): value is GEOEnemyType {
    return ['BoxBox', 'Arrow', 'Grunt', 'Pinwheel', 'Weaver', 'Singularity', 'RANDOM'].includes(value);
}

export type SpawnSerialized = {
    type: GameElementObjectType;  
    location?: [number, number] | 'RANDOM';
    possibleSpawns?: GameElementObjectType[];
    numberToGenerate?: number;
    angle?: number;
}

export class Spawn { 
    type: SpawnSerialized['type'];
    location: SpawnSerialized['location'];
    gameEngine: GameEngine;
    possibleSpawns: GameElementObjectType[];
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
            DIM_X * 0.95 * Math.random(),
            DIM_Y * 0.90 * Math.random(),
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
                    location[0] += this.gameEngine.activeCamera.transform.pos[0] - DIM_X / 2;
                    location[1] += this.gameEngine.activeCamera.transform.pos[1] - DIM_Y / 2;

                    // check if off edge of map
                    if(location[0] > DIM_X  - 100) {
                        location[0] = DIM_X - 100;
                    } else if(location[0] < 100) {
                        location[0] = 100;
                    }
                    
                    if( location[1] > DIM_Y - 100)  {
                        location[1] = DIM_Y - 100;
                    } else if(location[1] < 0 + 100) {
                        location[1] = 0 + 100;
                    }
                }
            }
            // TODO: maybe get this to work without casting
            // but likely not worth the effort
            if(this.gameEngine.gameScript instanceof GEOWarsScript) this.gameEngine.gameScript.gameObjectCreatorMap.get(mobToSpawn as GEOEnemyType)(location);
            if(this.gameEngine.gameScript instanceof StrikeTimeScript) this.gameEngine.gameScript.gameObjectCreatorMap.get(mobToSpawn as StrikeTimeLevelGameObjectType)(location);
        }
    }

    serialize(): SpawnSerialized {
        return {
            type: this.type,
            angle: this.angle,
            location: this.location,
            possibleSpawns: this.possibleSpawns,
            numberToGenerate: this.numberToGenerate,
        };
    }
}