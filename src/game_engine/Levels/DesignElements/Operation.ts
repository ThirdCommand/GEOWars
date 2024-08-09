import { type GameScript } from "../../../game_script";
import { UIElement } from "../../UI_Element";
import { type GameEngine } from "../../game_engine";
import { Transform } from "../../transform";
import {  Scene, type GameElement, type SceneObject } from "./Scene";
import { Event} from "./Event";
import { Time } from "./Time";
import { LoopBeginning, LoopEnd } from "./Loop";
import { type LevelDesigner } from "../levelDesigner";
import { LineSprite } from "../../line_sprite";

export type OperationSerialized = {
    type: "Operation";
    operand: Operand;
}

export type Operand = {
    type: string;
    factor: number;
}
export class Operation {
    type: 'Operation';
    operand: Operand;
    parentScene: Scene;
    gameEngine: GameEngine;
    gameScript: GameScript;
    constructor(operand: Operand, parentScene: Scene, gameEngine: GameEngine, gameScript: GameScript) {
        this.operand = operand;
        this.parentScene = parentScene;
        this.gameEngine = gameEngine;
        this.gameScript = gameScript;
    }

    update() {
        this.doOperation();
    }

    doOperation() {
        if(this.operand.type === "SceneTimeFactor") {
            this.parentScene.gameElements.forEach((element) => {
                this.applyTimeFactor(element);
            });
        } else if(this.operand.type === "SceneNumberFactor") {
            this.parentScene.gameElements.forEach((element) => {
                this.applyNumberFactor(element);
            });
        } else if (this.operand.type === "ResetToStartingValues") {
            this.parentScene.gameElements.forEach((element) => {
                this.applyResetToStartingValues(element);
            });
        } else if (this.operand.type === "UpgradeBullets") {
            this.gameScript.ship.upgradeBullets();
        }

        this.parentScene.nextElement();
    }

    applyNumberFactor(element:  GameElement) {
        if(element instanceof Event) {
            element.numberFactor *= this.operand.factor;
        }
        if(element instanceof Scene) {
            element.gameElements.forEach((element) => {
                this.applyNumberFactor(element);
            });
        }
    }

    applyTimeFactor(element: GameElement) {
        if(element instanceof Time) {
            element.applyNewTimeFactor(this.operand.factor);
        }
        if(element instanceof Scene) {
            element.gameElements.forEach((element) => {
                this.applyTimeFactor(element);
            });
        }
    }

    applyResetToStartingValues(element: GameElement) {
        if(element instanceof Scene) {
            element.gameElements.forEach((element) => {
                this.applyResetToStartingValues(element);
            });
        } 
        if(element instanceof Time || element instanceof Event || element instanceof LoopEnd || element instanceof LoopBeginning || element instanceof Operation) {
            element.resetToStartingValues();
        }
    }

    resetToStartingValues() {
        
    }
}

export class OperationObject extends UIElement {
    operand: Operand;
    widthHeight: [number, number];
    clickRadius: 20;
    UILineSprite: OperationObjectSprite;
    constructor(levelDesigner: LevelDesigner, operationToLoad: Operand, position: [number, number], parentScene: SceneObject) {
        super(levelDesigner, position, parentScene);
        this.operand = operationToLoad;
        this.widthHeight = [50, 40];
        this.clickRadius = 20;
        this.addMouseClickListener();
        this.addUIElementSprite(new OperationObjectSprite(this.transform, this.widthHeight, this.operand));
    }

    onMouseDoubleClick(mousePos: [number, number]): void {
        return console.log(mousePos,'implement operation object mouse double click');
    }

    unSelected() {
        this.UILineSprite.selected = false;
    }

    // should be serialized, and then created on paste. see Scene
    // copy() {
    //     return this.levelDesigner.addToClipBoard(new OperationObject(this.levelDesigner, this.serialize()));
    // }

    copyLineSpriteForDragging() {
        const draggingSpriteTransform = new Transform(null, [this.transform.pos[0], this.transform.pos[1]]);
        return new OperationObjectSprite(draggingSpriteTransform, this.widthHeight, this.operand);
    }

    serialize(): OperationSerialized {
        return {
            type: "Operation",
            operand: {
                type: this.operand.type,
                factor: this.operand.factor
            }
        };
    }

    changeOperation(newOperand: Operand) {
        this.operand = {
            type: newOperand.type,
            factor: newOperand.factor
        };
        this.UILineSprite.operand = this.operand;
    }

    onMouseClick() {
        this.levelDesigner.operationSelected(this);
        this.UILineSprite.selected = true;
    }
}

export class OperationObjectSprite extends LineSprite {
    operand: Operand;
    widthHeight: [number, number];
    selected: boolean;
    constructor(transform: Transform, widthHeight: [number, number], operand: Operand) {
        super(transform);
        this.operand = operand;
        this.widthHeight = widthHeight;
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
        
        ctx.fillStyle = "tomato";
        if(this.selected) ctx.fillStyle = "#419ef0";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.font = "10px Arial";
        ctx.fillText(this.operand.type, 2, h/2);
        ctx.fillText(String(this.operand.factor), 2, 4 * h / 4);
    }
}