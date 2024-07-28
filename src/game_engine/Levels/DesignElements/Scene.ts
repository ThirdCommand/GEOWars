import { UIElement, type SerializeAble } from "../../UI_Element";
import { Transform } from "../../transform";

import { EventObject, type Event, type EventSerialized} from "./Event";
import {type LoopEnd, LoopBeginning, LoopEndObject, LoopBeginningObject} from "./Loop";
import {OperationObject, type Operation} from "./Operation";
import { type LevelDesigner } from "../levelDesigner";
import { LineSprite } from "../../line_sprite";

export type GameElement = Event | Scene | LoopEnd | LoopBeginning | Operation

export type GameElementObject = EventObject | SceneObject | LoopEndObject | LoopBeginningObject | OperationObject;

export type SerializedGameElement = SceneSerialized | EventSerialized

export type SceneSerialized  = {
    type: 'Scene';
    name: string;
    gameElements: SerializedGameElement[]
}

export interface UpdateAble {
    update(dt: number): void;
}
// there will have to be an ancestor scene that holds all the scenes and stuffs
export class Scene implements UpdateAble {
    parentScene: Scene;
    type: string;
    name: string;
    gameElements: GameElement[];
    currentElementIndex: number;
    maxLoopId: number;
    loopsToClose: number[];

    constructor(
        parentScene: Scene, 
        name: string, 
        gameElements: GameElement[], 
        currentElementIndex: number
    ) {
        this.parentScene = parentScene;
        this.type = "Scene";
        this.name = name || "";
        this.gameElements = gameElements || [];
        this.currentElementIndex = currentElementIndex || 0;
        this.maxLoopId = 0;
        this.loopsToClose = [];
    }

    update(dT: number) {
        this.gameElements[this.currentElementIndex].update(dT);
    }
    /*
    stack works I believe
    1 2 2 1 3 4 4 3
    [ [ ] ] [ [ ] ]
    */
    createLoopId() {
        this.maxLoopId++;
        this.loopsToClose.push(this.maxLoopId);
        return this.maxLoopId;
    }
    getLoopId() {
        return this.loopsToClose.pop();  
    }

    goToLoopId(loopId: number) {
        this.gameElements.forEach((element, idx) => {
            if(element instanceof LoopBeginning && loopId === element.loopId) {
                this.currentElementIndex = idx;
            }
        });
    }

    nextElement() {
        if(this.currentElementIndex < this.gameElements.length - 1) {
            this.currentElementIndex++;
        } else {
            this.currentElementIndex = 0;
            this.parentScene.nextElement();
        }
    }

}

export class SceneObject extends UIElement implements SerializeAble {
    levelDesigner: LevelDesigner;
    gameElementObjects: UIElement[];
    expanded: boolean;
    name: string;
    UILineSprite: SceneSprite;
    constructor(levelDesigner: LevelDesigner, name: string, parentScene: SceneObject, position: [number, number]) {
        super(levelDesigner, position, parentScene);
        // i'll have to create the game elements from the serialized data
        this.gameElementObjects = [];
        
        this.expanded = false;
        this.widthHeight = [40,40];
        this.name = name || "Scene";
        this.addUIElementSprite(new SceneSprite(name, this.transform, this.widthHeight));
        this.clickRadius = 20;
        this.addMouseClickListener();
        this.addMouseDoubleClickListener();
    }

    expandScene() {
        this.expanded = true;
        this.UILineSprite.expanded = true;
        this.levelDesigner.expandScene(this);
    }

    unExpandScene() {
        this.expanded = false;
        this.UILineSprite.expanded = false;
        this.levelDesigner.unExpandScene(this);
    }

    copyLineSpriteForDragging() {
        const draggingSpriteTransform = new Transform(null, [this.transform.pos[0], this.transform.pos[1]]);
        return new SceneSprite(this.name, draggingSpriteTransform, this.widthHeight);
    }

    // copy() {
    // which scene will be the parent?
    // where will it be when you copy? same spot?
    // maybe I serialize it for copying, then on Paste I actually instantiate the new scene
    // where it belongs?
    //     return this.levelDesigner.addToClipBoard(new SceneObject(this.levelDesigner, ...this.serialize()));
    // }

    loadGameElements(serializedGameElements: SerializedGameElement[]) {
        this.gameElementObjects = this.levelDesigner.loadGameElements(serializedGameElements, this);
    }



    serialize(): SceneSerialized {
        return {
            type: "Scene",
            name: this.name,
            gameElements: this.gameElementObjects.map((element) => element.serialize()),
        };
    }

    onMouseClick() {
        this.levelDesigner.sceneSelected(this);
        this.UILineSprite.selected = true;
    }
    onMouseDoubleClick() {
        this.expanded ? this.unExpandScene() : this.expandScene();
        
    }

    selected() {
        this.UILineSprite.selected = true;
    }

    unSelected() {
        this.UILineSprite.selected = false;
    }

    deleteYourShit() {
        this.gameElementObjects.forEach((element) => {
            element.delete();
        });
    }

    removeGameElement(element: UIElement) {
        const index = this.gameElementObjects.indexOf(element);
        if(index !== -1) this.gameElementObjects.splice(index, 1);
    }

}

export class SceneSprite extends LineSprite {
    widthHeight: [number, number];
    name: string;
    selected: boolean;
    expanded: boolean;
    transform: Transform;
    constructor(name: string, transform: Transform, widthHeight: [number, number]) {
        super(transform);
        this.name = name;
        this.widthHeight = widthHeight;
        this.selected = false;
        this.expanded = false;
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
        ctx.fillStyle = "#d3d3d3";
        if(this.selected) ctx.fillStyle = "#419ef0";
        if(this.expanded) ctx.fillStyle = "#A020F0";
        // I can add lines to the top and sides to show that it's expanded
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.font = "10px Arial";
        ctx.fillText(this.name, 2, h/2);

        if(this.expanded) {
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#FFFFFF";
            ctx.beginPath();
            ctx.moveTo(0, h);
            ctx.lineTo(0, 0);
            ctx.lineTo(w, 0);
            ctx.lineTo(w, h);
            ctx.stroke();
        }
    }
}

