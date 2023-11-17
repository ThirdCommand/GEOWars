const DIM_X = 1000;
const DIM_Y = 600;
const game = {
    flatOES: [
        {
            name: 'LevelOne-Start',
            __typename: 'Scene'
        },
        {
            name: 'EasySpawns-Start',
            __typename: 'Scene'
        },
        {
            spawns: [
                {
                    type: 'RANDOM', // if random, then possibleTypes exists
                    location: 'RANDOM', 
                    possibleTypes: ['BoxBox','Pinwheel','Arrow'], 
                    numberToGenerate: 10, // if there's a location it will be 1
                    angle: undefined // for arrows
                }
            ],
            __typename: 'Event'
        },
        {
            type: 'WAIT',
            time: 0,
            waitTime: 10,
            __typename: 'Operation'
        },
        {
            name: 'EasySpawns-End',
            __typename: 'Scene'
        },
        {
            type: 'LOOP',
            loop: {
                loopIdx: 0,
                sequenceIndexToLoopTo: 0,
                repeatTimes: 5
            },
            __typename: 'Operation'
        },
        {
            name: 'LevelOne-End',
            __typename: 'Scene'
        }
    ]
}

class GameSequenceDisplay {
    constructor(engine) {
        this.engine = engine;
        this.displaySequence = [];
    }
    

}

class GameSequence{
    constructor (engine, flatOES) {
        this.engine = engine;
        this.sequenceIdx = 0;
        this.flatOES = engine.flatOES;
    }

    loadGame() {

    }
    update(dT) {
        flatOES[sequenceIdx].update(dT);
    }

    nextSequence(i=1) {
        if(typeOf(flatOES[this.sequenceIdx + i]) === 'Scene') { // TODO fix class name
            this.nextSequence(++i);
        }
        this.sequenceIdx += i;
    }

    serialize() {

    }
}

class Scene {
    constructor(gameSequence, name) {
        this.name = name;
    }
}

// loop, wait, 
class Operation {
    constructor(gameSequence, {type,waitTime,loop}) {
        this.gameSequence = gameSequence
        this.type = type;
        this.waitTime = waitTime;
        this.time = 0;
        this.loop = loop; // {loopIdx, sequenceIndexToLoopTo, repeatTimes} // 
        this.startingValues = {
            type: type,
            time: 0,
            waitTime: waitTime,
            loop: {
                loopIdx: loop.loopIdx,
                sequenceIndexToLoopTo: sequenceIndexToLoopTo,
                repeatTimes: repeatTimes
            }
        }
    }

    update(dT) {
        if(this.type === "WAIT") {
            this.time += dT;
            if(this.time >= this.waitTime) {
                endOperation();
            }
        } else if (this.type === "LOOP") {
            if(this.loop.loopIdx >= this.loop.repeatTimes) { // 3: 0, 1, 2
                endOperation();
            } else {
                gameSequence.sequenceIndex = this.loop.sequenceIndexToLoopTo;
                
            }

        }
    }

    resetStartingValues() {
        this.type = this.startingValues.type
        this.time = 0,
        this.waitTime = this.startingValues.waitTime,
        this.loop =  {
            loopIdx: this.startingValues.loop.loopIdx,
            sequenceIndexToLoopTo: this.startingValues.sequenceIndexToLoopTo,
            repeatTimes: this.startingValues.repeatTimes
        }
    }

    endOperation() {
        this.resetStartingValues();
        this.gameSequence.nextSequence();
    }
}


class Event {
    constructor(gameSequence, spawns) {
        this.gameSequence = gameSequence
        this.spawns = spawns // this is different than the single spawn thing I have in the mock data
    }

    update(dT) {
        spawnEverything();
        endEvent();
    }

    spawnEverything() {
        this.spawns.forEach((spawn) => {
            spawn.spawnEvent();
        })
    }
    endEvent() {
        this.gameSequence.nextSequence();
    }
}

// a single enemy, and location
class Spawn { 
    constructor(gameEngine, spawn) { // spawn: {type, location: [x,y]} 
        this.spawn = spawn;
        this.gameEngine = gameEngine
    }

    randomPosition() {
        return [
            this.DIM_X * 0.70 * Math.random(),
            this.DIM_Y * 0.70 * Math.random(),
            // 500,300
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
                mobToSpawn = randomMob(this.spawn.possibleSpawns);
            } 
            if(this.spawn.location === 'RANDOM') {
                location = randomPosition();
            }
            this.gameEngine.enemyCreatorList[mobToSpawn](location)
        }
    }

    serialize() {

    }
}

module.exports = {Spawn,Event,Operation,Scene,GameSequence, GameSequenceDisplay};


// MOB randomly picked from chosen list
// location randomly picked