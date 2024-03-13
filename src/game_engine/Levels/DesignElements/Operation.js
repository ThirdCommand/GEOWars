import { UIElement } from "../../UI_Element";
import { UILineSprite } from "../../UI_line_sprite";

// loop, wait, 

// maybe I should have a loop beginner and a loop ender repeater thingy
// like in music
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

// UIElement
export class OperationObject extends UIElement {
    constructor(levelDesigner, operationToLoad, position) {
        super(levelDesigner, position);
        this.widthHeight = [80, 40];
        this.clickRadius = 20;
        this.addMouseClickListener();
        this.operation = new Operation(levelDesigner.gameSequence, operationToLoad);
        this.addUIElementSprite(new OperationObjectSprite(this.UITransform, this.widthHeight));
    }

    copy() {
        return this.levelDesigner.addToClipBoard(new OperationObject(this.levelDesigner, this.serialize()));
    }

    serialize() {
        return {
            type: this.operation.type,
            waitTime: this.operation.waitTime,
            loop: {
                loopIdx: this.operation.loop.loopIdx,
                sequenceIndexToLoopTo: this.operation.loop.sequenceIndexToLoopTo,
                repeatTimes: this.operation.loop.repeatTimes
            }
        };
    }
}


export class OperationObjectSprite extends UILineSprite {
    constructor(UITransform, widthHeight) {
        super(UITransform);
        this.widthHeight = widthHeight;
    }

    draw(ctx) {
        const pos = this.UITransform.pos;
        ctx.save();
        ctx.translate(pos[0], pos[1]);

        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fillRect(-this.widthHeight[0] / 2, -this.widthHeight[1] / 2, this.widthHeight[0], this.widthHeight[1]);
        ctx.restore();
    }
}