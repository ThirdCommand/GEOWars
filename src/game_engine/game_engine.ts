import { GameScript } from "../game_script";
import {type GameObject } from "./game_object";
import { type LineSprite } from "./line_sprite";
import { type PhysicsComponent } from "./physics_component";
import {type Collider} from "./collider";
import { type Sound } from "./sound";
import { type LevelDesigner } from "./Levels/levelDesigner";
import { Camera } from "./camera";
import { Transform } from "./transform";

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        controller: any;
        engine: GameEngine;
    }
}

type FocusableGameObject = GameObject & {
    isFocussedGameObject: boolean;
    camera: Camera;
}

interface mousePositionListenable {
    updateMousePos(mousePos: [number, number]): void
}

interface DoubleClickListenable {
    mouseDoubleClicked(mousePos: [number, number]): void
}
interface ClickListenable {
    mouseClicked(mousePos: [number, number]): void
    mouseDowned(mousePos: [number, number]): void
}

// Controller
interface LeftControlStickListenable {
    updateLeftControlStickInput(direction: [number, number], pressed: boolean | null): void
}
interface RightControlStickListenable {
    updateRightControlStickInput(direction: [number, number]): void
}
interface XButtonListenable {
    updateXButtonListener(pressed: boolean): void
}
interface StartButtonListenable {
    updateStartButtonListener(pressed: boolean): void
}




export class GameEngine {
    ctx: CanvasRenderingContext2D;
    cameras: Camera[];
    activeCamera: Camera;
    controlledGameObject: GameObject | null;
    controllableGameObjects: GameObject[]; 
    gameObjects: GameObject[];
    physicsComponents: PhysicsComponent[];
    lineSprites: LineSprite[];
    soundsToPlay: {[key: string]: Sound};
    colliders: {
        [key: string]: {
            [key: string]: Collider[]
        }
    };
    subscribers: Collider[];
    muted: boolean;
    mouseListeners: mousePositionListenable[]; 

    gameClickListeners: ClickListenable[]; 
    gameClickListenersToAdd: ClickListenable[]; 
    gameClickListenersToRemove: ClickListenable[]; 

    gameDoubleClickListeners: DoubleClickListenable[]; 
    gameDoubleClickListenersToAdd: DoubleClickListenable[]; 
    gameDoubleClickListenersToRemove: DoubleClickListenable[]; 

    levelDesignerClickListeners: ClickListenable[]; 
    levelDesignerDoubleClickListeners: DoubleClickListenable[]; 

    leftControlStickListeners: LeftControlStickListenable[]; 
    rightControlStickListeners: RightControlStickListenable[]; 
    xButtonListeners: XButtonListenable[]; 
    startButtonListeners: StartButtonListenable[]; 

    gameScript: GameScript;
    paused: boolean;
    focusPaused: boolean;

    defaultZoomScale: number; // TODO wtf is going on here
    zoomScale: number; // TODO wtf is going on here

    graphicQuality: number;
    frameCountForPerformance: number;
    collisionTime: number;
    physicsCalcTime: number;
    updateTime: number;
    renderTime: number;
    scriptTime: number;
    timePassed: number;

    gameEditorOpened: boolean;
    levelDesigner: LevelDesigner;

    controller: object | null;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        window.engine = this;
        this.defaultZoomScale = 1.3;
        this.zoomScale = 1.3;
        this.cameras = [];
        this.activeCamera = new Camera(this, new Transform(), 'first camera');
        this.controllableGameObjects = [];
        this.controlledGameObject = null;
        this.gameObjects = [];
        this.physicsComponents = [];
        this.lineSprites = [];
        this.soundsToPlay = {};
        this.colliders = {};
        this.subscribers = [];
        this.muted = true;
        this.mouseListeners = [];

        this.gameClickListeners = [];
        this.gameClickListenersToAdd = [];
        this.gameClickListenersToRemove = [];

        this.gameDoubleClickListeners = [];
        this.gameDoubleClickListenersToAdd = [];
        this.gameDoubleClickListenersToRemove = [];

        this.levelDesignerClickListeners = [];
        this.levelDesignerDoubleClickListeners = [];

        this.leftControlStickListeners = [];
        this.rightControlStickListeners = [];
        this.xButtonListeners = [];
        this.startButtonListeners = [];
        this.gameScript = new GameScript(this);
        // this.toRemoveQueue = [];
        this.paused = false;
        // this.currentCamera = null;
        
        this.graphicQuality = 1;
        this.setupController();
        this.setupPerformance();
        this.gameEditorOpened = false;
        this.frameCountForPerformance = 0;
        this.levelDesigner = null;
    }

    addControllableGameObject(gameObject: GameObject) {
        this.controllableGameObjects.push(gameObject);
    }

    focusControllableGameObject(gameObject: GameObject) {
        // will want to be able to control multiple at same time 
        // in the future
        if (this.controllableGameObjects.includes(gameObject)) {
            if(this.controlledGameObject) {
                this.controlledGameObject.isFocussedGameObject = false;
                this.controlledGameObject = null;
            }
            this.controlledGameObject = gameObject;
            gameObject.isFocussedGameObject = true;
            this.setActiveCamera(gameObject.camera);
        } else {
            console.error("GameObject is not controllable");
        }
    }

    setupPerformance() {
        this.frameCountForPerformance = 0;
        this.collisionTime = 0;
        this.physicsCalcTime = 0;
        this.updateTime = 0;
        this.renderTime = 0;
        this.scriptTime = 0;
        this.timePassed = 0;
    }

    setupController() {
        
        window.addEventListener("gamepadconnected", function (e) {
            window.controller = e.gamepad;
            window.engine.controller = e.gamepad;
            // Gamepad connected
            console.log("Gamepad connected", e.gamepad);
        });

        window.addEventListener("gamepaddisconnected", function (e) {
            // Gamepad disconnected
            window.engine.controller = null;
            console.log("Gamepad disconnected", e.gamepad);
        });
    }

    updateGraphicSetting(delta: number) {
        if (delta > 50) {
            // console.log("worst")
            this.graphicQuality = 3;
        } else if (delta > 25) {
            this.graphicQuality = 2;
        } else {
            this.graphicQuality = 1;
        }
    }

    tick(delta: number) {
        this.updateGraphicSetting(delta);
        if (this.paused || this.focusPaused) {
            this.updateControlListeners();
            return;
        }

        if(this.gameEditorOpened) {
            // this.checkCollisions();
            this.updateGameObjects(delta);
            this.renderLineSprites(this.ctx);

            this.addClickListenersAfterTick();
            this.addDoubleClickListenersAfterTick();
            this.removeClickListenersAfterTick();
            this.removeDoubleClickListenerAfterTick();
            return;
        }

        // console.log(delta)
        // if(delta > 125){
        //   delta = 125
        // }
        const beforeCollisionTime = performance.now();
        this.checkCollisions();
        const beforePhysicsCalcs = performance.now();
        const collisionTime = beforePhysicsCalcs - beforeCollisionTime;
        this.movePhysicsComponents(delta);
        const beforeUpdate = performance.now();
        const physicsCalcTime = beforeUpdate - beforePhysicsCalcs;
        this.updateGameObjects(delta);
        const beforeRender = performance.now();
        const updateTime = beforeRender - beforeUpdate;
        this.renderLineSprites(this.ctx);
        const beforeScriptUpdate = performance.now();
        const renderTime = beforeScriptUpdate - beforeRender;
        this.updateControlListeners();
        this.updateGameScript(delta);

        const scriptTime = performance.now() - beforeScriptUpdate;
        this.playSounds();

        this.collectPerformanceData(
            delta,
            collisionTime,
            physicsCalcTime,
            updateTime,
            renderTime,
            scriptTime,
        );

        this.addClickListenersAfterTick();
        this.addDoubleClickListenersAfterTick();
        this.removeClickListenersAfterTick();
        this.removeDoubleClickListenerAfterTick();
    }

    collectPerformanceData(
        delta: number,
        collisionTime: number,
        physicsCalcTime: number,
        updateTime: number,
        renderTime: number,
        scriptTime: number
    ) {
        this.frameCountForPerformance += 1;
        this.collisionTime += collisionTime;
        this.physicsCalcTime += physicsCalcTime;
        this.updateTime += updateTime;
        this.renderTime += renderTime;
        this.scriptTime += scriptTime;

        this.timePassed += delta;
        if (this.timePassed > 1000 * 60) {
            const timeData = {
                frameRate: this.frameCountForPerformance / (this.timePassed / 1000),
                collisionTime: (this.collisionTime) / this.frameCountForPerformance,
                physicsCalcTime: (this.physicsCalcTime) / this.frameCountForPerformance,
                updateTime: (this.updateTime) / this.frameCountForPerformance,
                renderTime: (this.renderTime) / this.frameCountForPerformance,
                scriptTime: (this.scriptTime) / this.frameCountForPerformance
            };
            console.log(timeData);

            this.setupPerformance();
        }
    }

    pause() {
        this.paused = true;
        this.gameScript.onPause();
    }

    unPause() {
        this.paused = false;
        this.gameScript.onUnPause();
    }

    togglePause() {
    // console.log("pausetoggle")
        this.paused ? this.unPause() : this.pause();
    }

    addLeftControlStickListener(object: LeftControlStickListenable) {
        this.leftControlStickListeners.push(object);
    }

    addRightControlStickListener(object: RightControlStickListenable) {
        this.rightControlStickListeners.push(object);
    }


    addXButtonListener(object: XButtonListenable) {
        this.xButtonListeners.push(object);
    }

    addStartButtonListener(object: StartButtonListenable) {
        this.startButtonListeners.push(object);
    }

    // ******** mouse stuff *******

    addClickListener(object: ClickListenable) {
        this.gameClickListenersToAdd.push(object);
    }

    addClickListenersAfterTick() {
        this.gameClickListenersToAdd.forEach((object) => {
            this.gameClickListeners.push(object);
        });
        this.gameClickListenersToAdd = [];
    }

    addDoubleClickListener(object: DoubleClickListenable) {
        this.gameDoubleClickListenersToAdd.push(object);
    }

    addDoubleClickListenersAfterTick() {
        this.gameDoubleClickListenersToAdd.forEach((object) => {
            this.gameDoubleClickListeners.push(object);
        });
        this.gameDoubleClickListenersToAdd = [];
    }



    addLevelDesignerClickListener(object: ClickListenable) {
        this.levelDesignerClickListeners.push(object);
    }

    addLevelDesignerDoubleClickListener(object: DoubleClickListenable) {
        this.levelDesignerDoubleClickListeners.push(object);
    }

    mouseDown(e: MouseEvent) {
        if (e.target instanceof HTMLElement) {
            if (e.target.classList[0] === "level-editor-canvas") {
                this.levelDesigner.downClick();
                this.levelDesignerClickListeners.forEach((object) => {
                    object.mouseDowned([e.offsetX, e.offsetY]);
                });
            } else if(e.target.classList[0] === "gameCanvas") {
                // const position = [e.layerX, e.layerY];
                // this.gameClickListeners.forEach((object) => {
                //     object.mouseClicked(position);
                // });
            }
        }
    }

    mouseClicked(e: MouseEvent) {
        if (e.target instanceof HTMLElement) {
            if (e.target.classList[0] === "level-editor-canvas") {
                this.levelDesignerClickListeners.forEach((object) => {
                    object.mouseClicked([e.offsetX, e.offsetY]);
                });
            } else if(e.target.classList[0] === "gameCanvas") {
                // const position = [e.layerX, e.layerY];
                const position: [number, number] = [e.offsetX, e.offsetY]; // TODO
                this.gameClickListeners.forEach((object) => {
                    object.mouseClicked(position);
                });
            }
        }
    }

    updateFKeyListener(pressed: boolean) {
        if(pressed) {
            // focus on next controllable game object
            if (this.controllableGameObjects.length > 0) {
                const currentIndex = this.controllableGameObjects.indexOf(this.controlledGameObject);
                const nextIndex = (currentIndex + 1) % this.controllableGameObjects.length;
                this.focusControllableGameObject(this.controllableGameObjects[nextIndex]);
            } else {
                console.log("No controllable game objects to focus on.");
            }
        }
    }

    mouseUnClicked(e: MouseEvent) { 
        if (e.target instanceof HTMLElement) {
            if (e.target.classList[0] === "level-editor-canvas") {
                this.levelDesigner.unClicked();
            }
        }
    }

    mouseDoubleClicked(e: MouseEvent) {
        if (e.target instanceof HTMLElement) {
            if (e.target.classList[0] === "level-editor-canvas") {
                this.levelDesignerDoubleClickListeners.forEach((object) => {
                    object.mouseDoubleClicked([e.offsetX, e.offsetY]);
                });
            } else if(e.target.classList[0] === "game-canvas") {
                const position: [number, number] = [e.offsetX, e.offsetY]; // TODO
                // const position: [number, number] = [e.layerX, e.layerY];
                this.gameDoubleClickListeners.forEach((object) => {
                    object.mouseDoubleClicked(position);
                });
            }
        }
    }

    removeClickListener(object: ClickListenable) {
        this.gameClickListenersToRemove.push(object);
    }

    removeClickListenersAfterTick() {
        this.gameClickListenersToRemove.forEach((object) => {
            const index = this.gameClickListeners.indexOf(object);
            if (index !== -1) this.gameClickListeners.splice(index, 1);
        });
        this.gameClickListenersToRemove = [];
    }

    removeDoubleClickListener(object: DoubleClickListenable) {
        this.gameDoubleClickListenersToRemove.push(object);
    }

    removeDoubleClickListenerAfterTick() {
        this.gameDoubleClickListenersToRemove.forEach((object) => {
            const index = this.gameDoubleClickListeners.indexOf(object);
            if (index !== -1) this.gameDoubleClickListeners.splice(index, 1);
        });
        this.gameDoubleClickListenersToRemove = [];
    }

    removeLevelDesignerClickListener(object: ClickListenable) {
        const index = this.levelDesignerClickListeners.indexOf(object);
        if (index !== -1) this.levelDesignerClickListeners.splice(index, 1);
    }

    removeLevelDesignerDoubleClickListener(object: DoubleClickListenable) {
        const index = this.levelDesignerDoubleClickListeners.indexOf(object);
        if (index !== -1) this.levelDesignerDoubleClickListeners.splice(index, 1);
    }

    // ******** end of mouse stuff *******

    updateLeftControlStickListeners(unitVector: [number, number]) {
        this.leftControlStickListeners.forEach((listener) => {
            listener.updateLeftControlStickInput(unitVector, null);
        });
    }

    updateRightControlStickListeners(unitVector: [number, number]) {
        this.rightControlStickListeners.forEach((listener) => {
            listener.updateRightControlStickInput(unitVector);
        });
    }

    updateXButtonListeners(xButton: boolean) {
        this.xButtonListeners.forEach((listener) => {
            listener.updateXButtonListener(xButton);
        });
    }



    updateStartButtonListeners(pressed: boolean) { // TODO
    // console.log([startButton, down])
        this.startButtonListeners.forEach((listener) => {
            listener.updateStartButtonListener(pressed);
        });
    }

    focusUnPause() {
        this.focusPaused = false;
    }

    focusPause() {
        this.focusPaused = true;
    }

    // called by game view
    updateMousePos(mousePos: [number, number]) {
        this.mouseListeners.forEach((object) => {
            object.updateMousePos(mousePos);
        });
    }

    removeMouseListener(object: GameObject) {
        const index = this.mouseListeners.indexOf(object);
        if(index !== -1) this.mouseListeners.splice(index, 1);
    }

    updateControlListeners() {
        navigator.getGamepads();
        if (this.controller) {
            const leftAxis: [number, number] = [window.controller.axes[0], window.controller.axes[1]];
            const rightAxis: [number, number] = [window.controller.axes[2], window.controller.axes[3]];
            const xButton: boolean = window.controller.buttons[0].pressed;
            const startButton: boolean = window.controller.buttons[9].pressed;
            this.updateXButtonListeners(xButton);
            this.updateLeftControlStickListeners(leftAxis);
            this.updateRightControlStickListeners(rightAxis);
            this.updateStartButtonListeners(startButton);
        }
    }

    movePhysicsComponents(delta: number) {
        this.physicsComponents.forEach((component) => {
            component.move(delta);
        });
    }

    addCollider(collider: Collider) {
        if (collider.subscriptions) {
            this.subscribers.push(collider);
        }
        const colliders = this.colliders;
        // collider: object absolute transform
        // collider {"objectType": "Bullet", "type": "general", "subscriptions": ["BoxBox", "Arrow"], "subscribedColliderTypes": ["General"]}
        // colliders {"Singularity": {"General": [collider, collider], "GravityWell": [collider, collider]}}
        if (!colliders[collider.objectType]) {
            const collidersSameTypeAndObject: {
                [key: string]: Collider[]
            } = {};
            collidersSameTypeAndObject[collider.type] = [collider];
            colliders[collider.objectType] = collidersSameTypeAndObject;
        } else {
            if (!colliders[collider.objectType][collider.type]) {
                colliders[collider.objectType][collider.type] = [collider];
            } else {
                colliders[collider.objectType][collider.type].push(collider);
            }
        }
    }

    // must be a way to only retrieve
    // the data for subscribed colliders once

    checkCollisions() {
    // colliders{
    // "Arrow": [collider, collider]
    // }

        // collider {
        //   "objectType": "Bullet",
        //   "type": "general",
        //   "subscriptions": ["BoxBox", "Arrow"],
        //   "subscribedColliderTypes": ["general"]
        // }
        const subscribers = this.subscribers;
        const colliders = this.colliders;
        
        // console.log(this.subscribers)
        subscribers.forEach((subscriber) => {
            subscriber.subscriptions.forEach((subscription) => {
                colliders[subscription] = colliders[subscription] || {};
                subscriber.subscribedColliderTypes.forEach((colliderType) => {
                    colliders[subscription][colliderType] =
                        colliders[subscription][colliderType] || [];
                    colliders[subscription][colliderType].forEach((subscribedCollider) => {
                        subscriber.collisionCheck(subscribedCollider);
                    });
                });
            });
        });
    }

    updateGameObjects(delta: number) {
        this.gameObjects.forEach((object) => {
            object.update(delta);
        });
    }

    toggleMute() {
        this.muted = !this.muted;
    }

    playSounds() {
        Object.values(this.soundsToPlay).forEach((sound) => {
            sound.play();
        });
        this.soundsToPlay = {};
    }

    addCamera(camera: Camera) {
        this.cameras.push(camera);
        if (this.cameras.length === 1) {
            camera.makeActiveCamera();
        }
    }

    setActiveCamera(camera: Camera) {
        if(this.activeCamera) this.activeCamera.isActive = false;
        camera.isActive = true;
        this.activeCamera = camera;
    }


    renderLineSprites(ctx: CanvasRenderingContext2D) {
        // ctx.scale = gameEngine.currentCamera.zoomScale
        this.activeCamera.clearView(ctx);
        this.ctx.save();
        this.activeCamera.setZoomScale(ctx);
        // this belongs in the camera #camera
        this.lineSprites.forEach((sprite) => {
            sprite.draw(ctx);
        });
        this.ctx.restore();
        this.activeCamera.update(ctx);
    // ctx.scale(1,1)
    }

    addMouseListener(object: GameObject) {
        this.mouseListeners.push(object);
    }

    updateGameScript(delta: number) {
        this.gameScript.update(delta);
    }

    addGameObject(object: GameObject) {
        this.gameObjects.push(object);
    }

    addPhysicsComponent(physicsComponent: PhysicsComponent) {
        this.physicsComponents.push(physicsComponent);
    }

    addLineSprite(lineSprite: LineSprite) {
        this.lineSprites.push(lineSprite);
    }

    queueSound(sound: Sound) {
        if (!this.muted) {
            this.soundsToPlay[sound.url] = sound;
        }
    }

    // remove(gameObject){
    //   this.toRemoveQueue.push(gameObject)
    // }

    // emptyRemoveQueue(){
    //   this.toRemoveQueue.forEach((gameObject) => {
    //     this.removeAction(gameObject)
    //   })
    // }

    remove(gameObject: GameObject) {
        if (gameObject.physicsComponent) {
            const physicsComponentIndex = this.physicsComponents.indexOf(gameObject.physicsComponent);
            if (physicsComponentIndex !== -1) this.physicsComponents.splice(physicsComponentIndex, 1);
        }

        if (gameObject.lineSprite) {
            const lineSpriteIndex = this.lineSprites.indexOf(gameObject.lineSprite);
            if(lineSpriteIndex !== -1) this.lineSprites.splice(lineSpriteIndex, 1);
        }
        this.removeMouseListeners(gameObject);
        this.removeColliders(gameObject.colliders);
        const gameObjectIndex = this.gameObjects.indexOf(gameObject);
        if (gameObjectIndex !== -1) this.gameObjects.splice(gameObjectIndex, 1);
    }

    removeMouseListeners(gameObject: GameObject) {
        this.removeMouseListener(gameObject);
        this.removeClickListener(gameObject);
        this.removeDoubleClickListener(gameObject);
    }

    removeColliders(colliders: Collider[]) {
        colliders.forEach((collider) => {
            if (collider.subscriptions) {
                const colliderSubscriptionsIndex = this.subscribers.indexOf(collider);
                if(colliderSubscriptionsIndex !== -1) this.subscribers.splice(colliderSubscriptionsIndex, 1);
            }

            const objectAndColliderTypeList =
            this.colliders[collider.objectType][collider.type];
            const colliderIndex = objectAndColliderTypeList.indexOf(collider);
            if(colliderIndex !== -1) objectAndColliderTypeList.splice(colliderIndex, 1);
        });
    }
}

// the idea:
// engine takes in collider with gameobject type as string
// this way subscriptions can be done via string names
// enemy is subscribed to bullets..
// each enemy will check every bullet
// convert gameobject type to string
// colliders can be added without subscriptions
// subscriptions are an array of strings stored with the collider
