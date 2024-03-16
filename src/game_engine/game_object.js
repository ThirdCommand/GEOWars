import { Util } from "./util";
import { Sound } from "./sound";

import { Transform } from "./transform";
import { PhysicsComponent } from "./physics_component";
import { LineSprite } from "./line_sprite";
import { Collider } from "./collider";

export class GameObject {
    constructor(engine) {
        this.gameEngine = engine;
        this.gameEngine.addGameObject(this);
        this.transform = new Transform();
        this.childObjects = [];
        this.physicsComponent = null;
        this.lineSprite = null;
        this.parentObject = null;
        this.colliders = [];
    }

    animate() {
    // put animation stuffs here
    }

    addPhysicsComponent() {
        this.physicsComponent = new PhysicsComponent(this.transform);
        this.gameEngine.addPhysicsComponent(this.physicsComponent);
    }

    addLineSprite(lineSprite) {
        this.lineSprite = lineSprite;
        this.gameEngine.addLineSprite(this.lineSprite);
    }

    addMousePosListener() {
        this.gameEngine.addMouseListener(this);
    }

    removeMousePosListener() {
        this.gameEngine.removeMouseListener(this);
    }

    addLeftControlStickListener() {
        this.gameEngine.addLeftControlStickListener(this);
    }

    addRightControlStickListener() {
        this.gameEngine.addRightControlStickListener(this);
    }

    addxButtonListener() {
        this.gameEngine.addxButtonListener(this);
    }

    addStartButtonListener() {
        this.gameEngine.addStartButtonListener(this);
    }

    updateRightControlStickInput(direction) {}

    updateLeftControlStickInput(direction) {}

    updatexButtonListener() {}

    updateStartButtonListener() {}

    updateMousePos(mousePos) {}

    addClickListener() {
        this.gameEngine.addClickListener(this);
    }

    removeClickListener() {
        this.gameEngine.removeClickListener(this);
    }

    mouseClicked(mousePos) {}

    mouseDoubleClicked(mousePos) {}

    addCollider(type, gameObject, radius, subscriptionTypes, subscriptions) {
    // game engine checks every collider with it's subscription types
        const newCollider = new Collider(
            type,
            gameObject,
            radius,
            subscriptionTypes,
            subscriptions
        );
        this.colliders.push(newCollider);
        this.gameEngine.addCollider(newCollider);
    }

    playSound(sound) {
        this.gameEngine.queueSound(sound);
    }

    // relative motion needs to be fixed... FOR ANOTHER TIME
    addChildGameObject(obj, relative) {
        this.childObjects.push(obj);
        if (relative) {
            obj.transform.parentTransform = this.transform;
        }
        obj.parentObject = this;
    }

    update(deltaTime) {
    // overwritten by child class for update scripts
    }

    onCollision(collider, type) {
    // overwritten by child class for handler
    }

    // remove is the issue
    // i need a remove queue!!!
    // ... I think
    remove() {
        this.childObjects.forEach((obj) => {
            obj.remove();
        });
        if (this.parentObject) {
            this.parentObject.childObjects.splice(
                this.parentObject.childObjects.indexOf(this),
                1
            );
        }
        this.gameEngine.remove(this);
    }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
