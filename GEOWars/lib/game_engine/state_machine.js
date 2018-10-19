const GameObject = require("./game_object")

class StateMachine extends GameObject {
    constructor(engine, {}) {
        super(engine)
        this.stateIndex = options.stateIndex || {i: 0 }
        this.parentState = options.parentState, waitTime = 0, stateQueue = [], event, timesDo = 1, endCondition = true
        this.stateIndex = stateIndex
        this.parentIndex = parentIndex
        this.stateTime = 0

        this.waitTime = waitTime
        this.stateQueue = stateQueue
        this.event = event
        this.timesDo = timesDo
        this.endCondition = endCondition 
        // if not null, it will repeat until the condition is met\
        // but it will meet the repeatcondition first. 
        // end condition returns a bool. default true

        // there is no "break" condition yet

        this.repeatCount = 1 // do something 3 times. 1 index not 0 index

        // first it waits,
        // then it runs through state queue
        // then it runs the event
        //      state queue and event can be empty, 
        //        which means the state was just for waiting
        // then it checks the repeat condition

        // event is something that runs in one frame

    }

    addChilState(state){
        state.parentIndex = this
    }

    // state queue is now done
    onCompletion(){
        this.event()
                // 1 index not 0
        if(this.repeatCount <= this.timesDo){
            this.stateIndex.i = 0;
            this.currentTime = 0;
        } else if(!this.endCondition) {
            this.stateIndex.i = 0;
            this.currentTime = 0;
        } else {
            this.parentIndex += 1
            this.remove()
        }
    }

    // instances vs inheritance
    // instance is built from the ground up, 
    // starting with the lowest level of the sequence
    // inheritance is built from the top down, 
    // allowing each custom class to build thier individual statequeues
    // inheritance gives access to all of the gameobject functions
    // instances are simpler, everything is fed through the constuctor
    // User gets to choose?

    // singularity
    // EasyGroups <-- childState
        // wait: 2500 * timeScale (user can provide timescale functionality)
        // event: spawnEasyGroups 
        // endCondition: x4 // repeats until end condition met
        // parentIndex
    // waitState <--childState
    // EasyGroupsArrows 
        // wait: 2500 * timeScale (user can provide timescale functionality)
        // event: spawnEasyGroupsArrows
        // endCondition: x4 // repeats until end condition met
    // event
    // wait
    // event
    // 

    event(){
        this.eventCondition()
    }
    //spawner
        //easy wave
            //

    updateState(intervalTime){
        if(this.stateIndex > this.stateQueue.length){
            this.onCompletion()
        } else {
            this.stateTime += intervalTime
            if(intervalTime > this.waitTime){
                this.stateQueue[this.stateIndex.i].updateState(intervalTime)
            }
        }
    }

    remove() {
        this.childObjects.forEach((obj) => {
            obj.remove()
        })
        if (this.parentObject) {
            this.parentObject.childObjects.splice(this.parentObject.childObjects.indexOf(this), 1)
        }
        this.stateQueue.forEach((obj) => {
            obj.remove()
        })
        
        this.gameEngine.remove(this);
    }

}
module.exports = StateMachine;