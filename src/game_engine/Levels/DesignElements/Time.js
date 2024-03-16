import { UIElement } from "../../UI_Element";
import { UILineSprite } from "../../UI_line_sprite";

// wait times
export class Time {
    constructor(gameSequence, waitTime) {
        this.gameSequence = gameSequence;
        this.waitTime = waitTime;
        this.time = 0;
        this.startingValues = {
            time: 0,
            waitTime: waitTime,
        };
    }

    // I'll have to make sure pausing doesn't fuck this up
    update(dT) {
        // maybe I just check if it's paused?
        this.time += dT;
        if(this.time >= this.waitTime) {
            this.endOperation();
        }
    }

    resetStartingValues() {
        this.time = this.startingValues.time;
        this.waitTime = this.startingValues.waitTime;
    }

    endOperation() {
        this.resetStartingValues();
        
        // this will have to be the scene it's in I think
        this.gameSequence.nextSequence();
    }
}

// UIElement
export class TimeObject extends UIElement {
    constructor(levelDesigner, {waitTime}, position) {
        super(levelDesigner, position);
        this.waitTime = waitTime;
        this.widthHeight = [50, 40];
        this.clickRadius = 20;
        this.addMouseClickListener();
        this.timeConstruct = new Time(levelDesigner.gameSequence, waitTime);
        this.addUIElementSprite(new TimeObjectSprite(this.UITransform, this.waitTime, this.widthHeight));
    }

    unSelected() {
        this.UILineSprite.selected = false;
    }

    copy() {
        return this.levelDesigner.addToClipBoard(new TimeObject(this.levelDesigner, this.serialize()));
    }

    serialize() {
        return {
            waitTime: this.waitTime,
        };
    }

    changeTime(newTime) {
        this.waitTime = newTime;
        this.timeConstruct.waitTime = newTime;
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

        this.drawFunction(ctx, pos);
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