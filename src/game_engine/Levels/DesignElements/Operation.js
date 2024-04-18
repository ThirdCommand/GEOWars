import { UIElement } from "../../UI_Element";
import { UILineSprite } from "../../UI_line_sprite";
import { Transform } from "../../transform";

export class Operation {
    constructor(operand, parentScene, gameEngine, gameScript) {
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

    applyNumberFactor(element) {
        if(element.type === "Event") {
            element.numberFactor *= this.operand.factor;
        }
        if(element.type === "Scene") {
            element.gameElements.forEach((element) => {
                this.applyNumberFactor(element);
            });
        }
    }

    applyTimeFactor(element) {
        if(element.type === "Time") {
            element.applyNewTimeFactor(this.operand.factor);
        }
        if(element.type === "Scene") {
            element.gameElements.forEach((element) => {
                this.applyTimeFactor(element);
            });
        }
    }

    applyResetToStartingValues(element) {
        if(element.type === "Scene") {
            element.gameElements.forEach((element) => {
                this.applyResetToStartingValues(element);
            });
        }
        if(element.type === "Time" || element.type === "Event" || element.type === "LoopEnd" || element.type === "LoopBeginning" || element.type === "Operation") {
            element.resetToStartingValues();
        }
    }

    resetToStartingValues() {
        
    }
}

export class OperationObject extends UIElement {
    constructor(levelDesigner, operationToLoad, position, parentScene) {
        super(levelDesigner, position, parentScene);
        this.operand = operationToLoad;
        this.widthHeight = [50, 40];
        this.clickRadius = 20;
        this.addMouseClickListener();
        this.addUIElementSprite(new OperationObjectSprite(this.UITransform, this.widthHeight, this.operand));
    }

    unSelected() {
        this.UILineSprite.selected = false;
    }

    copy() {
        return this.levelDesigner.addToClipBoard(new OperationObject(this.levelDesigner, this.serialize()));
    }

    copyLineSpriteForDragging() {
        const draggingSpriteTransform = new Transform(null, [this.UITransform.pos[0], this.UITransform.pos[1]]);
        return new OperationObjectSprite(draggingSpriteTransform, this.widthHeight, this.operand);
    }

    serialize() {
        return {
            type: "Operation",
            operand: {
                type: this.operand.type,
                factor: this.operand.factor
            }
        };
    }

    changeOperation(newOperand) {
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

export class OperationObjectSprite extends UILineSprite {
    constructor(UITransform, widthHeight, operand) {
        super(UITransform);
        this.operand = operand;
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
        
        ctx.fillStyle = "tomato";
        if(this.selected) ctx.fillStyle = "#419ef0";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.font = "10px Arial";
        ctx.fillText(this.operand.type, 2, h/2);
        ctx.fillText(this.operand.factor, 2, 4 * h / 4);
    }
}