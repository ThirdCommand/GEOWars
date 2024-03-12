import { UILineSprite } from "../../UI_line_sprite";
import { UIElement } from "../../UI_Element";

export class Scene {
    constructor(gameSequence, name) {
        this.name = name;
    }
}

// this might just be the display object
export class SceneObject extends UIElement {
    constructor(levelDesigner, name, position) {
        super(levelDesigner, position);
        this.elements = [];
        this.widthHeight = [40,40];
    
        this.addUIElementSprite(new SceneSprite(name, this.UITransform, this.widthHeight));

        this.clickRadius = 20;
        this.addMouseClickListener();
        this.addMouseDoubleClickListener();
    }

    serialize() {
        return this.scene;
    }

    onMouseClick(mousePos) {
        this.levelDesigner.sceneSelected(this);
        this.UILineSprite.selected = true;
    }
    onMouseDoubleClicked(mousePos) {
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

