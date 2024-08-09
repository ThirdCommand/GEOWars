import { Transform } from "./transform";
import { VectorMath } from "./util";
import { type LevelDesigner } from "./Levels/levelDesigner";
import { SceneSerialized, type SceneObject, GameElementObject } from "./Levels/DesignElements/Scene";
import { LineSprite } from "./line_sprite";
import { EventSerialized } from "./Levels/DesignElements/Event";

export interface SerializeAble {
    serialize(): EventSerialized | SceneSerialized;
}

export abstract class UIElement {
    parentScene: SceneObject;
    transform: Transform;
    UILineSprite: LineSprite;
    levelDesigner: LevelDesigner;
    inExpandedScene: boolean;
    widthHeight: [number, number];
    clickRadius: number;
    draggingElement: boolean;

    constructor(levelDesigner: LevelDesigner, position: [number, number], parentScene: SceneObject) {
        this.parentScene = parentScene;
        this.transform = new Transform(null, position);
        this.levelDesigner = levelDesigner; // this is level designer not the game engine
        this.levelDesigner.addUIElement(this as unknown as GameElementObject);
        this.inExpandedScene = true;
    }

    addUIElementSprite(UILineSprite: LineSprite) {
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

    mouseDoubleClicked(mousePos: [number, number]) {
        if(!this.inExpandedScene) return;
        const centerPosition: [number, number] = [
            this.transform.pos[0] + this.widthHeight[0] / 2,
            this.transform.pos[1] + this.widthHeight[1] / 2
        ];
        const centerDist = VectorMath.dist(
            centerPosition,
            mousePos
        );
        if (centerDist < this.clickRadius) {
            this.onMouseDoubleClick(mousePos);
        }
    }

    mouseClicked(mousePos: [number, number]) {
        if(!this.inExpandedScene) return;
        const centerPosition: [number, number] = [
            this.transform.pos[0] + this.widthHeight[0] / 2,
            this.transform.pos[1] + this.widthHeight[1] / 2
        ];
        const centerDist = VectorMath.dist(
            centerPosition,
            mousePos
        );
        if (centerDist < this.clickRadius) {
            this.onMouseClick(mousePos);
        }
    }

    mouseDowned(mousePos: [number, number]) {
        if(!this.inExpandedScene) return;
        const centerPosition: [number, number] = [
            this.transform.pos[0] + this.widthHeight[0] / 2,
            this.transform.pos[1] + this.widthHeight[1] / 2
        ];
        const centerDist = VectorMath.dist(
            centerPosition,
            mousePos
        );
        if (centerDist < this.clickRadius) {
            this.draggingElement = true;
            this.followMouse();
        }
    }

    abstract copyLineSpriteForDragging(): LineSprite 

    elementLetGo() {
        this.draggingElement = false;
        this.levelDesigner.UIElementMouseFollower = null;
        this.levelDesigner.removeUIElementSprite(this.levelDesigner.draggingLineSprite);
        this.levelDesigner.draggingLineSprite = null;
        // send to ghost position
    }

    abstract onMouseDoubleClick(mousePos: [number, number]): void

    abstract onMouseClick(mousePos: [number, number]): void

    followMouse() {
        this.levelDesigner.UIElementMouseFollower = this as unknown as GameElementObject;
        this.levelDesigner.draggingLineSprite = this.copyLineSpriteForDragging();
        this.levelDesigner.addUIElementSprite(this.levelDesigner.draggingLineSprite);
    }

    delete() {
        this.removeMouseClickListener();
        this.removeMouseDoubleClickListener();
        this.levelDesigner.removeUIElementSprite(this.UILineSprite);
        this.parentScene.removeGameElement(this as unknown as GameElementObject);
        this.deleteYourShit();
    }

    deleteYourShit() {
        // Abstract for event I guess
    }
}