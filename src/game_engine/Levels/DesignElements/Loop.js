import { UIElement } from "../../UI_Element";
import { UILineSprite } from "../../UI_line_sprite";

// loop, wait, 

// maybe I should have a loop beginner and a loop ender repeater thingy
// like in music

// maybe when the game sequence comes across the beginning of a loop it will store that loop
// and then when it comes across the end of the loop it will check if the loop is done
// if it is it will move on, if not it will go back to the beginning of the loop
export class LoopEnd {
    // can only loop if start and end of loop are in the same scene
    constructor(scene, loop) {
        this.scene = scene; // scene the loop is in
        
        this.startingLoopValues = {
            loopIdx: loop.loopIdx, // could probably default to 0. this is how many times it's looped
            // during the level edit process, whenever a loop is added
            // it will increment the loopId. This way beginning loops and end loops will always 
            // have matching loopIds without collision
            loopId: scene.getLoopId(),
            repeatTimes: loop.repeatTimes
        };
        this.loop = { // {loopIdx, loopId, repeatTimes}
            loopIdx: this.startingLoopValues.loopIdx,
            loopId: this.startingLoopValues.loopId,
            repeatTimes: this.startingLoopValues.repeatTimes
        }; 
    }

    update() {
        if(this.loop.loopIdx >= this.loop.repeatTimes) { // 3: 0, 1, 2
            this.endLoop();
        } else {
            this.loop.loopIdx++;
            this.scene.goToLoopId(this.loop.loopId);
                
        }
    }

    resetStartingValues() {
        this.loop =  {
            loopIdx: this.startingLoopValues.loopIdx,
            loopId: this.startingLoopValues.loopId,
            repeatTimes: this.startingLoopValues.repeatTimes
        };
    }

    endLoop() {
        this.resetStartingValues();
        this.scene.nextElement();
    }
}

export class LoopBeginning {
    constructor(scene) {
        this.scene = scene;
        this.loopId = this.scene.createLoopId();
    }
    update() {
        this.scene.nextElement();
        // this means the next step will be delayed by a frame waiting
        // for the next update call
    }
}

// UIElement
export class LoopBeginningObject extends UIElement {
    constructor(levelDesigner, operationToLoad, position) {
        super(levelDesigner, position);
        this.widthHeight = [10, 40];
        this.clickRadius = 5;
        this.addMouseClickListener();
        this.addUIElementSprite(new LoopBeginningObjectSprite(this.UITransform, this.widthHeight));
    }

    copy() {
        // not sure how to create a new loop id if I'm copying a loop
        return this.levelDesigner.addToClipBoard(new LoopBeginningObject(this.levelDesigner, this.serialize()));
    }

    serialize() {
        return {
            type: "LoopBeginning"
        };
    }
}

export class LoopEndObject extends UIElement {
    constructor(levelDesigner, loop, position) {
        super(levelDesigner, position);
        this.loop = loop;
        this.widthHeight = [30, 40];
        this.clickRadius = 20;
        this.addMouseClickListener();
        this.addUIElementSprite(new LoopEndingObjectSprite(this.UITransform, this.widthHeight));
    }

    changeRepeatTimes(newRepeatTimes) {
        this.loop.repeatTimes = newRepeatTimes;
    }

    changeStartingRepeatIndex(newRepeatIndex) {
        this.loop.repeatIndex = newRepeatIndex;
    }

    copy() {
        /// ohhhhh we don't care about the ids yet since they are 
        // made in runtime
        // okay maybe we do because we might want to have matching colors
        // another time
        return this.levelDesigner.addToClipBoard(new LoopEndObject(this.levelDesigner, this.serialize()));
    }

    serialize() {
        return {
            type: "LoopEnd",
            loopIdx: this.loop.loopIdx,
            repeatTimes: this.loop.repeatTimes
        };
    }
}


export class LoopBeginningObjectSprite extends UILineSprite {
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


export class LoopEndingObjectSprite extends UILineSprite {
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