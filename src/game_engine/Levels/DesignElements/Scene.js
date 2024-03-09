import { UILineSprite } from "../../UI_line_sprite";
import { UIElement } from "../../UI_Element";

export class Scene {
    constructor(gameSequence, name) {
        this.name = name;
    }
}

// this might just be the display object
export class SceneObject extends UIElement {
    constructor(engine, name, position) {
        super(engine, position);
        // this will need to know its position
        // right now I'm just throwing it up without 
        // it keeping track of where it is
        // so when the level editor creates it, it should give it its position too maybe
        this.elements = [];
        this.levelDesigner = engine;
        this.widthHeight = [40,40];
    
        this.addUIElementSprite(new SceneSprite(name, this.UITransform, this.widthHeight));

        this.clickRadius = 20;
        this.addMouseClickListener();
        this.addMouseDoubleClickListener();
    }

    clicked() {
        console.log('scene clicked');
    }

    serialize() {
        return this.scene;
    }

    onMouseClick(mousePos) {
        this.gameEngine.sceneSelected(this);
        this.UILineSprite.selected = true;
    }

    unSelected() {
        this.UILineSprite.selected = false;
    }
    onMouseDoubleClicked(mousePos) {
        console.log('yay mouse double clicked here');
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

