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