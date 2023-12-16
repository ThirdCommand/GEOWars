import { GameScript } from "../game_script";

export class GameEngine {
    constructor(ctx) {
        this.ctx = ctx;
        this.gameObjects = [];
        this.physicsComponents = [];
        this.lineSprites = [];
        this.soundsToPlay = {};
        this.colliders = {};
        this.subscribers = [];
        this.muted = true;
        this.mouseListeners = [];
        this.clickListeners = [];
        this.leftControlStickListeners = [];
        this.rightControlStickListeners = [];
        this.xButtonListeners = [];
        this.startButtonListeners = [];
        this.gameScript = new GameScript(this);
        this.toRemoveQueue = [];
        this.paused = false;
        this.currentCamera = null;
        this.defaultZoomScale = 1.3;
        this.zoomScale = 1.3;
        this.graphicQuality = 1;
        this.setupController();
        this.setupPerformance();
        window.engine = this;
        this.gameEditorOpened = false;
        this.frameCountForPerformance = 0;
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

    updateGraphicSetting(delta) {
        if (delta > 50) {
            // console.log("worst")
            this.graphicQuality = 3;
        } else if (delta > 25) {
            this.graphicQuality = 2;
        } else {
            this.graphicQuality = 1;
        }
    }

    tick(delta) {
    // debugger
        this.updateGraphicSetting(delta);
        if (this.paused) {
            this.updateControlListeners();
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
        this.clearCanvas();
        this.renderLineSprites(this.ctx);
        const beforeScriptUpdate = performance.now();
        const renderTime = beforeScriptUpdate - beforeRender;
        this.updateControlListeners();
        if (!this.gameEditorOpened) {
            this.updateGameScript(delta);
        }
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
    }

    collectPerformanceData(
        delta,
        collisionTime,
        physicsCalcTime,
        updateTime,
        renderTime,
        scriptTime
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
                collisionTime: (this.collisionTime) / this.frameCountForPerformance,
                physicsCalcTime: (this.physicsCalcTime) / this.frameCountForPerformance,
                updateTime: (this.updateTime) / this.frameCountForPerformance,
                renderTime: (this.renderTime) / this.frameCountForPerformance,
                scriptTime: (this.scriptTime) / this.frameCountForPerformance,
                frameRate: this.frameCountForPerformance / (this.timePassed / 1000)
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

    clearCanvas() {
        this.ctx.clearRect(
            -this.gameScript.DIM_X,
            -this.gameScript.DIM_Y,
            this.gameScript.DIM_X * this.zoomScale * 4,
            this.gameScript.DIM_Y * this.zoomScale * 4
        );
        this.ctx.fillStyle = this.gameScript.BG_COLOR;
        this.ctx.fillRect(
            -this.gameScript.DIM_X,
            -this.gameScript.DIM_Y,
            this.gameScript.DIM_X * this.zoomScale * 4,
            this.gameScript.DIM_Y * this.zoomScale * 4
        );
    }

    addLeftControlStickListener(object) {
        this.leftControlStickListeners.push(object);
    }

    addRightControlStickListener(object) {
        this.rightControlStickListeners.push(object);
    }

    addxButtonListener(object) {
        this.xButtonListeners.push(object);
    }

    addStartButtonListener(object) {
        this.startButtonListeners.push(object);
    }

    addClickListener(object) {
        this.clickListeners.push(object);
    }

    mouseClicked(position) {
        this.clickListeners.forEach((object) => {
            object.mouseClicked(position);
        });
    }

    removeClickListener(object) {
        this.clickListeners.splice(this.clickListeners.indexOf(object), 1);
    }

    updateLeftControlStickListeners(unitVector) {
        this.leftControlStickListeners.forEach((listener) => {
            listener.updateLeftControlStickInput(unitVector);
        });
    }

    updateRightControlStickListeners(unitVector) {
        this.rightControlStickListeners.forEach((listener) => {
            listener.updateRightControlStickInput(unitVector);
        });
    }

    updatexButtonListeners(xButton) {
        this.xButtonListeners.forEach((listener) => {
            listener.updatexButtonListener(xButton);
        });
    }

    updateStartButtonListeners(startButton, down) {
    // console.log([startButton, down])
        this.startButtonListeners.forEach((listener) => {
            listener.updateStartButtonListener(startButton, down);
        });
    }
    // called by game view
    updateMousePos(mousePos) {
        this.mouseListeners.forEach((object) => {
            object.updateMousePos(mousePos);
        });
    }

    removeMouseListener(object) {
        this.mouseListeners.splice(this.mouseListeners.indexOf(object), 1);
    }

    updateControlListeners() {
        navigator.getGamepads();
        if (this.controller) {
            const leftAxis = [window.controller.axes[0], window.controller.axes[1]];
            const rightAxis = [window.controller.axes[2], window.controller.axes[3]];
            const xButton = [window.controller.buttons[0].pressed];
            const startButton = [window.controller.buttons[9].pressed];
            this.updatexButtonListeners(xButton);
            this.updateLeftControlStickListeners(leftAxis);
            this.updateRightControlStickListeners(rightAxis);
            this.updateStartButtonListeners(startButton);
        }
    }

    movePhysicsComponents(delta) {
        this.physicsComponents.forEach((component) => {
            component.move(delta);
        });
    }

    addCollider(collider) {
        if (collider.subscriptions) {
            this.subscribers.push(collider);
        }
        const colliders = this.colliders;
        // collider: object absolute transform
        // collider {"objectType": "Bullet", "type": "general", "subscriptions": ["BoxBox", "Arrow"], "subscribedColliderTypes": ["General"]}
        // colliders {"Singularity": {"General": [collider, collider], "GravityWell": [collider, collider]}}
        if (!colliders[collider.objectType]) {
            const collidersSameTypeAndObject = {};
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
        this.stillCanDie = false;
        // console.log(this.subscribers)
        subscribers.forEach((subscriber) => {
            if (subscriber.type === "ShipDeath") {
                this.stillCanDie = true;
                // console.log("CAN DIE")
            }
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
        if (!this.stillCanDie) {
            // console.log(this.gameScript.ship.collider)
            this.gameScript.ship.addCollider(
                "General",
                this.gameScript.ship,
                this.gameScript.ship.radius
            );
            this.gameScript.ship.addCollider(
                "ShipDeath",
                this.gameScript.ship,
                this.gameScript.ship.radius,
                ["BoxBox", "Singularity", "Weaver", "Grunt", "Arrow", "Pinwheel"],
                ["General"]
            );
        }
    }

    updateGameObjects(delta) {
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

    renderLineSprites(ctx) {
        // ctx.scale = gameEngine.currentCamera.zoomScale
        this.ctx.save();

        // this belongs in the camera #camera
        this.ctx.scale(this.zoomScale, this.zoomScale);
        this.lineSprites.forEach((sprite) => {
            sprite.draw(ctx);
        });
        this.ctx.restore();
    // ctx.scale(1,1)
    }

    addMouseListener(object) {
        console.log("hello, game engine");
        this.mouseListeners.push(object);
    }

    updateGameScript(delta) {
        this.gameScript.update(delta);
    }

    addGameObject(object) {
        this.gameObjects.push(object);
    }

    addPhysicsComponent(physicsComponent) {
        this.physicsComponents.push(physicsComponent);
    }

    addLineSprite(lineSprite) {
        this.lineSprites.push(lineSprite);
    }

    queueSound(sound) {
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

    remove(gameObject) {
        if (gameObject.physicsComponent) {
            this.physicsComponents.splice(
                this.physicsComponents.indexOf(gameObject.physicsComponent),
                1
            );
        }
        if (gameObject.lineSprite) {
            this.lineSprites.splice(
                this.lineSprites.indexOf(gameObject.lineSprite),
                1
            );
        }
        this.removeColliders(gameObject.colliders);

        this.gameObjects.splice(this.gameObjects.indexOf(gameObject), 1);
    }

    removeColliders(colliders) {
        colliders.forEach((collider) => {
            if (collider.subscriptions) {
                this.subscribers.splice(this.subscribers.indexOf(collider), 1);
            }

            const objectAndColliderTypeList =
        this.colliders[collider.objectType][collider.type];
            objectAndColliderTypeList.splice(
                objectAndColliderTypeList.indexOf(collider),
                1
            );
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
