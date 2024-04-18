import { UIElement } from "../../UI_Element";
import { UILineSprite } from "../../UI_line_sprite";
import { Transform } from "../../transform";

// wait times
export class Time {
    constructor(parentScene, waitTime) {
        this.type = "Time";
        this.parentScene = parentScene;
        this.waitTime = waitTime;
        this.timeFactor = 1;
        this.time = 0;
        this.startingValues = {
            time: 0,
            waitTime: waitTime,
            timeFactor: 1,
        };
    }

    // I'll have to make sure pausing doesn't fuck this up
    update(dT) {
        // maybe I just check if it's paused?
        this.time += dT;
        if(this.time >= this.waitTime * this.timeFactor) {
            this.endOperation();
        }
    }

    applyNewTimeFactor(factor) {
        this.timeFactor *= factor;
    }

    resetToStartingValues() {
        this.time = this.startingValues.time;
        this.waitTime = this.startingValues.waitTime;
        this.timeFactor = this.startingValues.timeFactor;
    }

    endOperationReset() {
        this.time = this.startingValues.time;
        this.waitTime = this.startingValues.waitTime;
        // keep time factor
    }

    endOperation() {
        this.endOperationReset();
        
        // this will have to be the scene it's in I think
        this.parentScene.nextElement();
    }

}

// UIElement
export class TimeObject extends UIElement {
    constructor(levelDesigner, {waitTime}, position, parentScene) {
        super(levelDesigner, position, parentScene);
        this.waitTime = waitTime;
        this.widthHeight = [50, 40];
        this.clickRadius = 20;
        this.addMouseClickListener();
        this.addUIElementSprite(new TimeObjectSprite(this.UITransform, this.waitTime, this.widthHeight));
    }

    unSelected() {
        this.UILineSprite.selected = false;
    }

    copy() {
        return this.levelDesigner.addToClipBoard(new TimeObject(this.levelDesigner, this.serialize()));
    }

    copyLineSpriteForDragging() {
        const draggingSpriteTransform = new Transform(null, [this.UITransform.pos[0], this.UITransform.pos[1]]);
        return new TimeObjectSprite(draggingSpriteTransform, this.waitTime, this.widthHeight);
    }
    serialize() {
        return {
            type: "Time",
            waitTime: this.waitTime,
        };
    }

    changeTime(newTime) {
        this.waitTime = newTime;
        this.UILineSprite.waitTime = newTime;
    
    }
    onMouseClick() {
        this.levelDesigner.timeSelected(this);
        this.UILineSprite.selected = true;
    }
}


export class TimeObjectSprite extends UILineSprite {
    constructor(UITransform, waitTime, widthHeight) {
        super(UITransform);
        this.waitTime = waitTime;
        this.widthHeight = widthHeight;
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
        
        ctx.fillStyle = "#A020F0";
        if(this.selected) ctx.fillStyle = "#419ef0";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.font = "10px Arial";
        ctx.fillText(this.waitTime, 2, h/2);
    }
}