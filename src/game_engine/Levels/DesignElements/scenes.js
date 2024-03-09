const DIM_X = 1000;
const DIM_Y = 600;



// I don't think flat is necessary, and it actually makes it more complicated
// compiling it to flat is more complicated than just handling the nesting

// one difference is that flat would not have to be pre-loaded as objects at the beginning
// but I don't think there is any benefit to that in the end.

// the act of pre-loading is the reverse of compiling to flat when the level is saved
// so I'm not saving myself any complexity with flat.
// actually, I think it's more complex since I have to manipulate two different
// data structures in the end instead of one


// with flat, I can have the engine handle all of the game logic
// with nested, I have to have the objects themselves include the game logic

// FLAT
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
};

// Nested:

const scratch = {
    scenes: [
        {
            type: 'SCENE',
            name: 'FirsScene',
            elements: [
                {
                    type: 'EVENT',
                    name: 'FirstEvent',
                    spawns: [
                        {
                            type: 'RANDOM', // if random, then possibleTypes exists
                            location: 'RANDOM', 
                            possibleTypes: ['BoxBox','Pinwheel','Arrow'], 
                            numberToGenerate: 10, // if there's a location it will be 1
                            angle: undefined // for arrows
                        }
                    ],
                }
            ]
        }
    ]
};

const NestedGame = {
    scenes: [
        {
            name: 'LevelOne-Start',
            events: [
                {
                    name: 'EasySpawns-Start',
                    spawns: [
                        {
                            type: 'RANDOM', // if random, then possibleTypes exists
                            location: 'RANDOM', 
                            possibleTypes: ['BoxBox','Pinwheel','Arrow'], 
                            numberToGenerate: 10, // if there's a location it will be 1
                            angle: undefined // for arrows
                        }
                    ],
                    operations: [
                        {
                            type: 'WAIT',
                            time: 0,
                            waitTime: 10
                        }
                    ],
                    name: 'EasySpawns-End'
                }
            ]
        }
    
    ]
};


export class GameSequenceDisplay {
    constructor(engine) {
        this.engine = engine;
        this.displaySequence = [];
    }
    
}

export class GameSequence{
    constructor (engine, flatOES) {
        this.engine = engine;
        this.sequenceIdx = 0;
        this.flatOES = flatOES;
    }

    loadGame() {

    }
    update(dT) {
        this.flatOES[sequenceIdx].update(dT);
    }

    nextSequence(i=1) {
        if(typeof(this.flatOES[this.sequenceIdx + i]) === Scene) { // TODO fix class name
            this.nextSequence(++i);
        }
        this.sequenceIdx += i;
    }

    serialize() {

    }
}

export class Scene {
    constructor(gameSequence, name) {
        this.name = name;
    }
}

// loop, wait, 
export class Operation {
    // can only loop if start and end of loop are in the same scene
    constructor(gameSequence, {type, waitTime, loop}) {
        this.gameSequence = gameSequence;
        this.type = type;
        this.waitTime = waitTime;
        this.time = 0;
        this.loop = loop; // {loopIdx, sequenceIndexToLoopTo, repeatTimes} // 
        this.startingValues = {
            type: type,
            time: 0,
            waitTime: waitTime,
            loop: {
                loopIdx: loop.loopIdx, // could probably default to 0
                sequenceIndexToLoopTo: loop.sequenceIndexToLoopTo,
                repeatTimes: loop.repeatTimes
            }
        };
    }

    update(dT) {
        if(this.type === "WAIT") {
            this.time += dT;
            if(this.time >= this.waitTime) {
                this.endOperation();
            }
        } else if (this.type === "LOOP") {
            if(this.loop.loopIdx >= this.loop.repeatTimes) { // 3: 0, 1, 2
                this.endOperation();
            } else {
                this.gameSequence.sequenceIndex = this.loop.sequenceIndexToLoopTo;
                
            }

        }
    }

    resetStartingValues() {
        this.type = this.startingValues.type;
        this.time = 0,
        this.waitTime = this.startingValues.waitTime,
        this.loop =  {
            loopIdx: this.startingValues.loop.loopIdx,
            sequenceIndexToLoopTo: this.startingValues.sequenceIndexToLoopTo,
            repeatTimes: this.startingValues.repeatTimes
        };
    }

    endOperation() {
        this.resetStartingValues();
        this.gameSequence.nextSequence();
    }
}


export class Event {
    constructor(gameSequence, spawns) {
        this.gameSequence = gameSequence;
        this.spawns = spawns; // this is different than the single spawn thing I have in the mock data
    }

    // should find way to handle groups told to spawn at random locations

    update() {
        this.spawnEverything();
        this.endEvent();
    }
    spawnEverything() {
        this.spawns.forEach((spawn) => {
            spawn.spawnEvent();
        });
    }
    endEvent() {
        this.gameSequence.nextSequence();
    }
}

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

    }
}



// MOB randomly picked from chosen list
// location randomly picked