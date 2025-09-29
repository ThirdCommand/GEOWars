import { GameScript } from "../game_script";
import {type GameObject } from "./game_object";
import { type LineSprite } from "./line_sprite";
import { ReplayablePhysicsComponent, type PhysicsComponent } from "./physics_component";
import {type Collider} from "./collider";
import { type Sound } from "./sound";
import { type LevelDesigner } from "./Levels/levelDesigner";
import { Camera } from "./camera";
import { Transform } from "./transform";
import { DrawingGridSprite } from "./SpriteEditor/DrawingGridSprite";
import { PlacingPoint } from "./SpriteEditor/Point";

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
    updateLeftControlStickInput(direction: [number, number] | string, pressed: boolean | null): void
}
interface RightControlStickListenable {
    updateRightControlStickInput(direction: [number, number]): void
}
interface XButtonListenable {
    updateXButtonListener(pressed: boolean): void
}
interface LKeyListenable {
    updateLKeyListener(pressed: boolean): void
}
interface KKeyListenable {
    updateKKeyListener(pressed: boolean): void
}
interface BKeyListenable {
    updateBKeyListener(pressed: boolean): void
}
interface MKeyListenable {
    updateMKeyListener(pressed: boolean): void
}
interface JKeyListenable {
    updateJKeyListener(pressed: boolean): void
}
interface OKeyListenable {
    updateOKeyListener(pressed: boolean): void
}
interface CKeyListenable {
    updateCKeyListener(pressed: boolean): void
}
interface SKeyListenable {
    updateSKeyListener(pressed: boolean): void
}
interface BButtonListenable {
    updateBButtonListener(pressed: boolean): void
}
interface AButtonListenable {
    updateAButtonListener(pressed: boolean): void
}
interface StartButtonListenable {
    updateStartButtonListener(pressed: boolean): void
}




export class GameEngine {
    placingPoint: PlacingPoint;
    ctx: CanvasRenderingContext2D;
    buttonState: {
        aButtonPressed: boolean;
        xButtonPressed: boolean;
        startButtonPressed: boolean;
        bButtonPressed: boolean;
    }
    isControllerConnected: boolean = false;
    cameras: Camera[];
    activeCamera: Camera;
    controlledGameObject: GameObject | null;
    controllableGameObjects: GameObject[]; 
    gameObjects: GameObject[];
    physicsComponents: PhysicsComponent[];
    replayablePhysicsComponents: ReplayablePhysicsComponent[] = [];
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
    mouseFocussedListeners: mousePositionListenable[]; 

    gameClickListeners: ClickListenable[]; 
    gameClickListenersToAdd: ClickListenable[]; 
    gameClickListenersToRemove: ClickListenable[]; 

    gameDoubleClickListeners: DoubleClickListenable[]; 
    gameDoubleClickListenersToAdd: DoubleClickListenable[]; 
    gameDoubleClickListenersToRemove: DoubleClickListenable[]; 

    levelDesignerClickListeners: ClickListenable[]; 
    levelDesignerDoubleClickListeners: DoubleClickListenable[]; 

    leftControlStickListeners: LeftControlStickListenable[]; 
    leftControlStickFocussedListeners: LeftControlStickListenable[]; 
    rightControlStickListeners: RightControlStickListenable[]; 
    lKeyListeners: LKeyListenable[];
    kKeyListeners: KKeyListenable[];
    bKeyListeners: BKeyListenable[];
    mKeyListeners: MKeyListenable[];
    jKeyListeners: JKeyListenable[];
    oKeyListeners: OKeyListenable[];
    cKeyListeners: CKeyListenable[];
    sKeyListeners: SKeyListenable[];
    xButtonListeners: XButtonListenable[]; 
    bButtonListeners: BButtonListenable[]; 
    aButtonListeners: AButtonListenable[]; 
    startButtonListeners: StartButtonListenable[]; 

    spriteCreatorOpened: boolean;

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

    controller: any | null;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        window.engine = this;
        this.buttonState = {
            aButtonPressed: false,
            xButtonPressed: false,
            bButtonPressed: false,
            startButtonPressed: false,
        };
        this.defaultZoomScale = 1.3;
        this.zoomScale = 1.3;
        this.lineSprites = [];
        this.cameras = [];
        this.activeCamera = new Camera(this, new Transform(), 'first camera');
        this.controllableGameObjects = [];
        this.controlledGameObject = null;
        this.gameObjects = [];
        this.physicsComponents = [];
        this.soundsToPlay = {};
        this.colliders = {};
        this.subscribers = [];
        this.muted = true;
        this.mouseListeners = [];
        this.mouseFocussedListeners = [];

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
        this.lKeyListeners = [];
        this.kKeyListeners = [];
        this.bKeyListeners = [];
        this.mKeyListeners = [];
        this.jKeyListeners = [];
        this.oKeyListeners = [];
        this.cKeyListeners = [];
        this.sKeyListeners = [];
        this.xButtonListeners = [];
        this.bButtonListeners = [];
        this.aButtonListeners = [];
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
        this.spriteCreatorOpened = false;
    }

    startSpriteCreator() {
        this.spriteCreatorOpened = true;
        this.gameObjects = [];
        this.lineSprites = [];
        this.activeCamera.zoomScale = 1;
        this.addSpriteEditorOverlay();
    }

    addSpriteEditorOverlay() {
        this.addLineSprite(new DrawingGridSprite(new Transform()));
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
            window.engine.isControllerConnected = true;
            // Gamepad connected
            // console.log("Gamepad connected", e.gamepad);
        });

        window.addEventListener("gamepaddisconnected", function (e) {
            // Gamepad disconnected
            window.engine.isControllerConnected = false;
            // console.log("Gamepad disconnected", e.gamepad);
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
            this.checkCollisions();
            this.updateGameObjects(delta);
            this.renderLineSprites(this.ctx);

            this.addClickListenersAfterTick();
            this.addDoubleClickListenersAfterTick();
            this.removeClickListenersAfterTick();
            this.removeDoubleClickListenerAfterTick();
            return;
        }

        if(this.spriteCreatorOpened) {
            this.checkCollisions();
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
        this.moveReplayablePhysicsComponents(delta, this.gameScript.gameTime);
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
        this.leftControlStickListeners.push(object);
    }

    addLeftControlStickFocussedListener(object: LeftControlStickListenable) {
        this.leftControlStickFocussedListeners.push(object);
    }

    addLKeyListener(object: LKeyListenable) {
        this.lKeyListeners.push(object);
    }

    addKKeyListener(object: KKeyListenable) {
        this.kKeyListeners.push(object)
    }
    addOKeyListener(object: OKeyListenable) {
        this.oKeyListeners.push(object)
    }
    addCKeyListener(object: CKeyListenable) {
        this.cKeyListeners.push(object)
    }

    addJKeyListener(object: JKeyListenable) {
        this.jKeyListeners.push(object)
    }
    addBKeyListener(object: BKeyListenable) {
        this.bKeyListeners.push(object)
    }
    addMKeyListener(object: MKeyListenable) {
        this.mKeyListeners.push(object)
    }
    addSKeyListener(object: SKeyListenable) {
        this.sKeyListeners.push(object)
    }

    addRightControlStickListener(object: RightControlStickListenable) {
        this.rightControlStickListeners.push(object);
    }


    addXButtonListener(object: XButtonListenable) {
        this.xButtonListeners.push(object);
    }

    addBButtonListener(object: BButtonListenable) {
        this.bButtonListeners.push(object);
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
    // this belongs in the ship. we should call the listeners here, including the ship
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

    updateLeftControlStickListeners(unitVector: [number, number] | string, down: boolean | null) {
        this.leftControlStickListeners.forEach((listener) => {
            listener.updateLeftControlStickInput(unitVector, down);
        });
        this.controlledGameObject.updateLeftControlFocussedStickInput(unitVector, down);
    }

    updateLKeyListeners(down: boolean) {
        this.lKeyListeners.forEach((listener) => {
            listener.updateLKeyListener(down);
        })
    }

    updateKKeyListeners(down: boolean) {
        this.kKeyListeners.forEach((listener) => {
            listener.updateKKeyListener(down);
        })
    }

    updateBKeyListeners(down: boolean) {
        this.bKeyListeners.forEach((listener) => {
            listener.updateBKeyListener(down);
        })
    }
    updateMKeyListeners(down: boolean) {
        this.mKeyListeners.forEach((listener) => {
            listener.updateMKeyListener(down);
        })
    }

    updateSKeyListeners(down: boolean) {
        this.sKeyListeners.forEach((listener) => {
            listener.updateSKeyListener(down);
        })
    }
    updateJKeyListeners(down: boolean) {
        this.jKeyListeners.forEach((listener) => {
            listener.updateJKeyListener(down);
        })
    }
    updateOKeyListeners(down: boolean) {
        this.oKeyListeners.forEach((listener) => {
            listener.updateOKeyListener(down);
        })
    }
    updateCKeyListeners(down: boolean) {
        this.cKeyListeners.forEach((listener) => {
            listener.updateCKeyListener(down);
        })
    }

    updateRightControlStickListeners(unitVector: [number, number]) {
        this.rightControlStickListeners.forEach((listener) => {
            listener.updateRightControlStickInput(unitVector);
        }); 
        this.controlledGameObject.updateRightControlFocussedStickInput(unitVector);
    }

    updateXButtonListeners(xButton: boolean) {
        this.xButtonListeners.forEach((listener) => {
            listener.updateXButtonListener(xButton);
        });
    }

    updateBButtonListeners(bButton: boolean) {
        console.log('B button pressed');
        this.bButtonListeners.forEach((listener) => {
            listener.updateBButtonListener(bButton);
        });
    }

    updateAButtonListeners(aButton: boolean) { 
        this.aButtonListeners.forEach((listener) => {
            listener.updateAButtonListener(aButton);
        });
        this.updateFKeyListener(aButton); // TODO this is a hacky way to do this
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
        // I need to check if it's supposed to be directly controlled, or just listening 
        this.mouseListeners.forEach((object) => {
            object.updateMousePos(mousePos);
        });
        this.controlledGameObject?.updateFocussedMousePos(mousePos);
    }

    removeMouseListener(object: GameObject) {
        const index = this.mouseListeners.indexOf(object);
        if(index !== -1) this.mouseListeners.splice(index, 1);
    }

    updateControlListeners() {
        this.controller = navigator.getGamepads()[0];
        // should only update button listeners when the state changes. 
        // I should keep track of the state of the buttons
        if (this.isControllerConnected) {
            const leftAxis: [number, number] = [this.controller.axes[0], this.controller.axes[1]];
            const rightAxis: [number, number] = [this.controller.axes[2], this.controller.axes[3]];
            const aButton: boolean = this.controller.buttons[0].pressed;
            const bButton: boolean = this.controller.buttons[3].pressed;
            console.log(this.controller.buttons);
            // const xButton: boolean = this.controller.buttons[0].pressed;
            if(this.buttonState.aButtonPressed !== aButton) {
                this.buttonState.aButtonPressed = aButton;
                this.updateAButtonListeners(aButton);
            }
            
            if(this.buttonState.bButtonPressed !== bButton) {
                this.buttonState.bButtonPressed = bButton;
                this.updateBButtonListeners(bButton);
            }
            
            const startButton: boolean = this.controller.buttons[9].pressed;

            // this.updateStartButtonListeners(aButton);
            // this.updateXButtonListeners(xButton);
            
            this.updateLeftControlStickListeners(leftAxis, null);
            this.updateRightControlStickListeners(rightAxis);
            this.updateStartButtonListeners(startButton);
        }
    }

    movePhysicsComponents(delta: number) {
        this.physicsComponents.forEach((component) => {
            component.move(delta);
        });
    }

    moveReplayablePhysicsComponents(delta: number, gameTime: number) {
        this.replayablePhysicsComponents.forEach((component) => {
            component.move(delta, gameTime);
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
        this.lineSprites.forEach((sprite) => {
            sprite.transform.cameraTransform = camera.transform;
        });
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

    addReplayablePhysicsComponent(replayablePhysicsComponent: ReplayablePhysicsComponent) {
        this.replayablePhysicsComponents.push(replayablePhysicsComponent);
    } 

    addPhysicsComponent(physicsComponent: PhysicsComponent) {
        this.physicsComponents.push(physicsComponent);
    }

    addLineSprite(lineSprite: LineSprite) {
        lineSprite.transform.cameraTransform = this.activeCamera.transform;
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
