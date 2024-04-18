import { Transform } from "./transform";
import { Util } from "./util";

export class UIElement {
    constructor(levelDesigner, position, parentScene) {
        this.parentScene = parentScene;
        this.UITransform = new Transform(null, position);
        this.levelDesigner = levelDesigner; // this is level designer not the game engine
        this.levelDesigner.addUIElement(this);
        this.inExpandedScene = true;
    }
    addUIElementSprite(UILineSprite) {
        this.UILineSprite = UILineSprite;
        this.levelDesigner.addUIElementSprite(UILineSprite);
    }
    addMouseClickListener() {
        this.levelDesigner.addMouseClickListener(this);
    }
    addMouseDoubleClickListener() {
        this.levelDesigner.addMouseDoubleClickListener(this);
    }

    removeMouseClickListener() {
        this.levelDesigner.removeMouseClickListener(this);
    }
    removeMouseDoubleClickListener() {
        this.levelDesigner.removeMouseDoubleClickListener(this);
    }

    parentSceneUnexpanded() {
        this.inExpandedScene = false;
        this.removeMouseClickListener();
        this.removeMouseDoubleClickListener();
    }

    parentSceneExpanded () {
        this.inExpandedScene = true;
        this.addMouseClickListener();
        this.addMouseDoubleClickListener();
    }

    mouseDoubleClicked(mousePos) {
        if(!this.inExpandedScene) return;
        const centerPosition = [
            this.UITransform.pos[0] + this.widthHeight[0] / 2,
            this.UITransform.pos[1] + this.widthHeight[1] / 2
        ];
        const centerDist = Util.dist(
            centerPosition,
            mousePos
        );
        if (centerDist < this.clickRadius) {
            this.onMouseDoubleClicked(mousePos);
        }
    }

    mouseClicked(mousePos) {
        if(!this.inExpandedScene) return;
        const centerPosition = [
            this.UITransform.pos[0] + this.widthHeight[0] / 2,
            this.UITransform.pos[1] + this.widthHeight[1] / 2
        ];
        const centerDist = Util.dist(
            centerPosition,
            mousePos
        );
        if (centerDist < this.clickRadius) {
            this.onMouseClick(mousePos);
        }
    }

    mouseDowned(mousePos) {
        if(!this.inExpandedScene) return;
        const centerPosition = [
            this.UITransform.pos[0] + this.widthHeight[0] / 2,
            this.UITransform.pos[1] + this.widthHeight[1] / 2
        ];
        const centerDist = Util.dist(
            centerPosition,
            mousePos
        );
        if (centerDist < this.clickRadius) {
            this.draggingElement = true;
            this.followMouse();
        }
    }

    copyLineSpriteForDragging() {
        // Abstract
    }

    elementLetGo() {
        this.draggingElement = false;
        this.levelDesigner.UIElementMouseFollower = null;
        this.levelDesigner.removeUIElementSprite(this.levelDesigner.draggingLineSprite);
        this.levelDesigner.draggingLineSprite = null;
        // send to ghost position
    }

    onMouseDoubleClick(mousePos) {

    }

    onMouseClick(mousePos) {

    }

    followMouse() {
        this.levelDesigner.UIElementMouseFollower = this;
        this.levelDesigner.draggingLineSprite = this.copyLineSpriteForDragging();
        this.levelDesigner.addUIElementSprite(this.levelDesigner.draggingLineSprite);
    }

    delete() {
        this.removeMouseClickListener();
        this.removeMouseDoubleClickListener();
        this.levelDesigner.removeUIElementSprite(this.UILineSprite);
        this.parentScene.removeUIElement(this);
        this.deleteYourShit();
    }

    deleteYourShit() {
        // Abstract for event I guess
    }



}