import { UILineSprite } from "../../UI_line_sprite";
import { UIElement } from "../../UI_Element";

// there will have to be an ancestor scene that holds all the scenes and stuffs
export class Scene {
    constructor(parentScene, name, gameElements, currentElementIndex) {
        this.parentScene = parentScene;
        this.name = name || "";
        this.gameElements = gameElements || [];
        this.currentElementIndex = currentElementIndex || 0;
        this.loopId = 0;
        this.loopsToClose = [];
    }
    /*
    stack works I believe
    1 2 2 1 3 4 4 3
    [ [ ] ] [ [ ] ]
    */
    createLoopId() {
        this.loopId++;
        this.loopsToClose.push(this.loopId);
        return this.loopId;
    }
    getLoopId() {
        return this.loopsToClose.pop();  
    }


    update(dT) {
        this.gameElements[this.currentElementIndex].update(dT);
    }

    nextElement() {
        if(this.currentElementIndex < this.gameElements.length - 1) {
            this.currentElementIndex++;
        } else {
            this.currentElementIndex = 0;
            this.parentScene.nextElement();
        }
    }

    goToLoopId(loopId) {
        this.gameElements.forEach((element, idx) => {
            if(element.loopId === loopId) {
                this.currentElementIndex = idx;
            }
        });
    }
}

export class SceneObject extends UIElement {
    constructor(levelDesigner, name, parentScene, position) {
        super(levelDesigner, position, parentScene);
        // i'll have to create the game elements from the serialized data
        this.gameElements = [];
        
        this.expanded = false;
        this.widthHeight = [40,40];
        this.name = name || "Scene";
        this.addUIElementSprite(new SceneSprite(name, this.UITransform, this.widthHeight));
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

    copy() {
        return this.levelDesigner.addToClipBoard(new SceneObject(this.levelDesigner, this.serialize()));
    }

    loadGameElements(gameElements) {
        this.gameElements = this.levelDesigner.loadGameElements(gameElements, false, this);
    }

    serialize() {
        return {
            type: 'Scene',
            name: this.name,
            gameElements: this.gameElements.map((element) => element.serialize()),
        };
    }

    onMouseClick() {
        this.levelDesigner.sceneSelected(this);
        this.UILineSprite.selected = true;
    }
    onMouseDoubleClicked() {
        this.expanded ? this.unExpandScene() : this.expandScene();
        
    }

    selected() {
        this.UILineSprite.selected = true;
    }

    unSelected() {
        this.UILineSprite.selected = false;
    }

}

export class SceneSprite extends UILineSprite {
    constructor(name, UITransform, widthHeight) {
        super(UITransform);
        this.name = name;
        this.widthHeight = widthHeight;
        this.selected = false;
        this.expanded = false;
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

