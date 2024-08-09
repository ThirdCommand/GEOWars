import { UIElement } from "../../UI_Element";
import { LineSprite } from "../../line_sprite";
import { Transform } from "../../transform";
import { LevelDesigner } from "../levelDesigner";
import { type Scene, UpdateAble, type SceneObject } from "./Scene";
// loop, wait, 

// maybe I should have a loop beginner and a loop ender repeater thingy
// like in music

export type LoopValues = {
    loopIdx?: number;
    loopId?: number;
    repeatTimes: number;
}

// maybe when the game sequence comes across the beginning of a loop it will store that loop
// and then when it comes across the end of the loop it will check if the loop is done
// if it is it will move on, if not it will go back to the beginning of the loop
export class LoopEnd implements UpdateAble {
    // can only loop if start and end of loop are in the same scene
    loopData: LoopValues;
    type: string;
    parentScene: Scene;
    startingLoopValues: LoopValues;

    constructor(
        loop: LoopValues, 
        parentScene: Scene
    ) {
        this.type === "LoopEnd";
        this.parentScene = parentScene; // scene the loop is in
        
        this.startingLoopValues = {
            loopIdx: loop.loopIdx || 0, // could probably default to 0. this is how many times it's looped
            // during the level edit process, whenever a loop is added
            // it will increment the loopId. This way beginning loops and end loops will always 
            // have matching loopIds without collision
            loopId: parentScene.getLoopId(),
            repeatTimes: loop.repeatTimes
        };
        this.loopData = { // {loopIdx, loopId, repeatTimes}
            loopIdx: this.startingLoopValues.loopIdx,
            loopId: this.startingLoopValues.loopId,
            repeatTimes: this.startingLoopValues.repeatTimes
        }; 
    }

    update() {
        if(this.loopData.loopIdx >= this.loopData.repeatTimes) { // 3: 0, 1, 2
            this.endLoop();
        } else {
            this.loopData.loopIdx++;
            this.parentScene.goToLoopId(this.loopData.loopId);
                
        }
    }

    resetToStartingValues() {
        this.loopData =  {
            loopIdx: this.startingLoopValues.loopIdx,
            loopId: this.startingLoopValues.loopId,
            repeatTimes: this.startingLoopValues.repeatTimes
        };
    }


    endLoop() {
        this.resetToStartingValues();
        this.parentScene.nextElement();
    }
}

export class LoopBeginning {
    parentScene: Scene;
    type: string;
    loopId: number;
    constructor(parentScene: Scene) {
        this.type = "LoopBeginning";
        this.parentScene = parentScene;
        this.loopId = this.parentScene.createLoopId();
    }
    update() {
        this.parentScene.nextElement();
        // this means the next step will be delayed by a frame waiting
        // for the next update call
    }
    resetToStartingValues() {}
}


export type LoopBeginningSerialized = {
    type: "LoopBeginning";
}

// UIElement
export class LoopBeginningObject extends UIElement {
    UILineSprite: LoopBeginningObjectSprite;
    endLoopObject: LoopEndObject | undefined;
    constructor(levelDesigner: LevelDesigner, position: [number, number], parentScene: SceneObject) {
        super(levelDesigner, position, parentScene);
        this.widthHeight = [10, 40];
        this.clickRadius = 5;
        this.addMouseClickListener();
        this.addUIElementSprite(new LoopBeginningObjectSprite(this.transform, this.widthHeight));
        this.endLoopObject = undefined;
    }

    onMouseDoubleClick(mousePos: [number, number]): void {
        console.log('notImplemented',mousePos);
    }

    moveLeft() {
        this.levelDesigner.moveLeft(this);
    }

    moveRight() {
        this.levelDesigner.moveRight(this);
    }

    // copy() {
    // not sure how to create a new loop id if I'm copying a loop
    //     return this.levelDesigner.addToClipBoard(new LoopBeginningObject(this.levelDesigner, this.serialize()));
    // }

    copyLineSpriteForDragging() {
        const draggingSpriteTransform = new Transform(null, [this.transform.pos[0], this.transform.pos[1]]);
        return new LoopBeginningObjectSprite(draggingSpriteTransform, this.widthHeight);
    }
    

    serialize(): LoopBeginningSerialized {
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

    deleteYourShit() {
        const endObject = this.endLoopObject;
        this.endLoopObject = undefined;
        endObject?.delete();
    }
}

export type LoopEndSerialized = {
    type: "LoopEnd"
    loopIdx: number;
    repeatTimes: number;
}

export class LoopEndObject extends UIElement {
    UILineSprite: LoopEndingObjectSprite;
    loopData: LoopValues;
    beginningLoopObject: LoopBeginningObject | undefined;
    constructor(levelDesigner: LevelDesigner, loop: LoopValues, position: [number, number], parentScene: SceneObject) {
        super(levelDesigner, position, parentScene);
        this.loopData = loop;
        this.widthHeight = [30, 40];
        this.clickRadius = 15;
        this.addMouseClickListener();
        this.addUIElementSprite(new LoopEndingObjectSprite(this.transform, this.widthHeight, this.loopData.repeatTimes));
        this.beginningLoopObject = undefined;
    }

    onMouseDoubleClick(mousePos: [number, number]): void {
        console.log('notImplemented',mousePos);
    }

    // maybe I can have a button that moves it left or right for now
    // until I get drag and drop going

    changeRepeatTimes(newRepeatTimes: number) {
        this.loopData.repeatTimes = newRepeatTimes;
    }

    // not sure what this was about.. it's not used though
    // changeStartingRepeatIndex(newRepeatIndex: number) {
    //     this.loopData.repeatIndex = newRepeatIndex;
    // }

    // copy() {
    /// ohhhhh we don't care about the ids yet since they are 
    // made in runtime
    // okay maybe we do because we might want to have matching colors
    // another time
    //     return this.levelDesigner.addToClipBoard(new LoopEndObject(this.levelDesigner, this.serialize()));
    // }

    copyLineSpriteForDragging() {
        const draggingSpriteTransform = new Transform(null, [this.transform.pos[0], this.transform.pos[1]]);
        return new LoopEndingObjectSprite(draggingSpriteTransform, this.widthHeight, this.loopData.repeatTimes);
    }
    

    serialize(): LoopEndSerialized {
        return {
            type: "LoopEnd",
            loopIdx: this.loopData.loopIdx,
            repeatTimes: this.loopData.repeatTimes
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

    deleteYourShit() {
        const beginningObject = this.beginningLoopObject;
        this.beginningLoopObject = undefined;
        beginningObject?.delete();
    }
}

export class LoopBeginningObjectSprite extends LineSprite {
    selected: boolean;
    widthHeight: [number, number];
    constructor(transform: Transform, widthHeight: [number, number]) {
        super(transform);
        this.selected = false;
        this.widthHeight = widthHeight;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const pos = this.transform.pos;
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        this.drawFunction(ctx);
        ctx.restore();
    }

    drawFunction(ctx: CanvasRenderingContext2D) {
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


export class LoopEndingObjectSprite extends LineSprite {
    widthHeight: [number, number];
    repeatTimes: number;
    selected: boolean;
    constructor(transform: Transform, widthHeight: [number, number], repeatTimes: number) {
        super(transform);
        this.widthHeight = widthHeight;
        this.repeatTimes = repeatTimes;
        this.selected = false;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const pos = this.transform.pos;
        ctx.save();
        
        ctx.translate(pos[0], pos[1]);
        this.drawFunction(ctx);
    
        ctx.restore();
    }

    drawFunction(ctx: CanvasRenderingContext2D) {
        const h = this.widthHeight[1];
        const w = this.widthHeight[0];

        ctx.fillStyle = "#FFD700";
        ctx.fillRect(0, 0, w, h);

        ctx.lineWidth = this.selected ? 3 : 1;
        ctx.strokeStyle = "#FFFFFF";
        ctx.strokeRect(0,0, w, h);

        ctx.fillStyle = "#000000";
        ctx.font = "10px Arial";
        ctx.fillText(String(this.repeatTimes), 2, this.widthHeight[1]/2);
    }

}