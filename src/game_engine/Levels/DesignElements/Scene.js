import { UILineSprite } from "../../UI_line_sprite";
import { UIElement } from "../../UI_Element";

// there will have to be an ancestor scene that holds all the scenes and stuffs
export class Scene {
    constructor(parentScene, name, gameElements, currentElementIndex) {
        this.parentScene = parentScene;
        this.name = name || "";
        this.gameElements = gameElements || [];
        this.currentElementIndex = currentElementIndex || 0;
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
}

export class SceneObject extends UIElement {
    constructor(levelDesigner, sceneInfo, position) {
        super(levelDesigner, position);
        // i'll have to create the game elements from the serialized data
        this.gameElements = sceneInfo?.gameElements || [];
        this.widthHeight = [40,40];
    
        this.addUIElementSprite(new SceneSprite(sceneInfo?.name, this.UITransform, this.widthHeight));

        this.clickRadius = 20;
        this.addMouseClickListener();
        this.addMouseDoubleClickListener();
    }

    copy() {
        return this.levelDesigner.addToClipBoard(new SceneObject(this.levelDesigner, this.serialize()));
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
        console.log('yay mouse double clicked here');
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
        ctx.fillStyle = "#FFFFFF";
        if(this.selected) ctx.fillStyle = "#419ef0";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.font = "10px Arial";
        ctx.fillText(this.name, 2, h/2);
    }
}

