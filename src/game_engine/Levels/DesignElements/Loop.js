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
    constructor(loop, parentScene) {
        this.parentScene = parentScene; // scene the loop is in
        
        this.startingLoopValues = {
            loopIdx: loop.loopIdx, // could probably default to 0. this is how many times it's looped
            // during the level edit process, whenever a loop is added
            // it will increment the loopId. This way beginning loops and end loops will always 
            // have matching loopIds without collision
            loopId: parentScene.getLoopId(),
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
    constructor(levelDesigner, loop, position, parentScene) {
        super(levelDesigner, position, parentScene);
        this.widthHeight = [10, 40];
        this.clickRadius = 5;
        this.addMouseClickListener();
        this.addUIElementSprite(new LoopBeginningObjectSprite(this.UITransform, this.widthHeight));
    }

    moveLeft() {
        this.levelDesigner.moveLeft(this);
    }

    moveRight() {
        this.levelDesigner.moveRight(this);
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

    onMouseClick() {
        console.log('loop beginning clicked');
        this.levelDesigner.loopSelected(this);
        this.UILineSprite.selected = true;
    }
    unSelected() {
        this.UILineSprite.selected = false;
    }
}

export class LoopEndObject extends UIElement {
    constructor(levelDesigner, loop, position, parentScene) {
        super(levelDesigner, position, parentScene);
        this.loop = loop;
        this.widthHeight = [30, 40];
        this.clickRadius = 15;
        this.addMouseClickListener();
        this.addUIElementSprite(new LoopEndingObjectSprite(this.UITransform, this.widthHeight, this.loop.repeatTimes));
    }

    // maybe I can have a button that moves it left or right for now
    // until I get drag and drop going

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
    onMouseClick() {
        console.log('loop end clicked');
        this.levelDesigner.loopSelected(this);
        this.UILineSprite.selected = true;
    }
    unSelected() {
        this.UILineSprite.selected = false;
    }
}


export class LoopBeginningObjectSprite extends UILineSprite {
    constructor(UITransform, widthHeight) {
        super(UITransform);
        this.selected = false;
        this.widthHeight = widthHeight;
    }

    draw(ctx) {
        const pos = this.UITransform.pos;
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        this.drawFunction(ctx);
        ctx.restore();
    }

    drawFunction(ctx) {
        const h = this.widthHeight[1];
        const w = this.widthHeight[0];

        ctx.fillStyle = "#FFD700";
        ctx.fillRect(0, 0, w, h);

        const lineWidth = this.selected ? 3 : 1;

        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = "#FFFFFF";
        ctx.strokeRect(0 + lineWidth / 2, 0 + lineWidth / 2, w - lineWidth / 2, h - lineWidth / 2);
    }

}


export class LoopEndingObjectSprite extends UILineSprite {
    constructor(UITransform, widthHeight, repeatTimes) {
        super(UITransform);
        this.widthHeight = widthHeight;
        this.repeatTimes = repeatTimes;
        this.selected = false;
    }

    draw(ctx) {
        const pos = this.UITransform.pos;
        ctx.save();
        
        ctx.translate(pos[0], pos[1]);
        this.drawFunction(ctx);
    
        ctx.restore();
    }

    drawFunction(ctx) {
        const h = this.widthHeight[1];
        const w = this.widthHeight[0];

        ctx.fillStyle = "#FFD700";
        ctx.fillRect(0, 0, w, h);

        ctx.lineWidth = this.selected ? 3 : 1;
        ctx.strokeStyle = "#FFFFFF";
        ctx.strokeRect(0,0, w, h);

        ctx.fillStyle = "#000000";
        ctx.font = "10px Arial";
        ctx.fillText(this.repeatTimes, 2, this.widthHeight[1]/2);
    }

}