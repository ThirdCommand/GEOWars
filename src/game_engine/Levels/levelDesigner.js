import { Walls } from "../../game_objects/Walls/walls";
import { Overlay } from "../../game_objects/Overlay/overlay";
import { Grid } from "../../game_objects/particles/Grid/grid";
import { EnemyPlacer } from "./LevelDesign/EnemyPlacer";
import { GameScript } from "../../game_script";
import { Transform } from "../transform";
import { SceneObject } from "./DesignElements/scene";
import { Spawn } from "./DesignElements/Spawn";

import { EventObject } from "./DesignElements/Event";
import { TimeObject } from "./DesignElements/Time";
import { LoopBeginningObject, LoopEndObject } from "./DesignElements/Loop";

// I should collect placed enemies

export class LevelDesigner {
    constructor(engine, animationView, levelDesignerCtx, animationWindow, serializedGame) {
        this.serializedGame = serializedGame;
        this.UIElementSprites = [];

        // duck typing for scene
        this.gameElements = []; // top level list of game elements
        this.expandedScene = this; // starts as this
        this.UITransform = {pos: [0,0]};

        this.widthHeight = [0,0];

        this.DIM_X = 1200;
        this.DIM_Y = 300;
        this.BG_COLOR = "#000000";
        this.engine = engine;
        this.animationView = animationView;
        this.levelDesignerCtx = levelDesignerCtx;

        this.animationWindow = animationWindow;
        this.UIActionsToRun = [];

        this.ctx = levelDesignerCtx;
        this.gameObjects = [];
        this.lineSprites = [];
        this.zoomScale = 1;
        this.ship = {
            transform: {
                pos: [],
            },
        };
        this.lastTime = 0;
        this.animate = this.animate.bind(this);
        this.overlayText = {
            Location: [0, 0],
            Time: 0,
            Type: "",
            StartingAngle: 0,
        };
        this.overlayTextCleared = true;

        this.palletModal = this.getPalletModal();

        // can be scene, time, event, or loop
        this.selectedGameElement;
 

        // main game array is the main list of sequence objects
        this.mainGameArray = [];

        this.gameEditorOpened = false;
        

        const addArrowButton = document.getElementById("Arrow");
        const addGruntButton = document.getElementById("Grunt");
        const addBoxBox = document.getElementById("BoxBox");
        const addPinwheel = document.getElementById("Pinwheel");
        const addWeaver = document.getElementById("Weaver");
        const addSingularity = document.getElementById("Singularity");
        const makeGame = document.getElementById("LevelEditor");
        const makeEvent = document.getElementById("MakeEvent");
        const addScene = document.getElementById("MakeScene");
        const addTime = document.getElementById("TimeSubmit");
        const addLoop = document.getElementById("LoopSubmit");
        const moveLeft = document.getElementById("MoveLeft");
        const moveRight = document.getElementById("MoveRight");

        const sceneNameSubmit = document.getElementById("sceneNameSubmit");
       
        addGruntButton.onclick = (e) => {
            e.stopPropagation();
            const type = "Grunt";
            this.addEnemy(type);
            this.animationView.clear();
            this.animationView.addEnemy(type);
        };

        addArrowButton.onclick = (e) => {
            e.stopPropagation();
            const type = "Arrow";
            this.addEnemy(type);
            this.animationView.clear();
            this.animationView.addEnemy(type);
        };
        addBoxBox.onclick = (e) => {
            e.stopPropagation();
            const type = "BoxBox";
            this.addEnemy(type);
            this.animationView.clear();
            this.animationView.addEnemy(type);
        };
        addPinwheel.onclick = (e) => {
            e.stopPropagation();
            const type = "Pinwheel";
            this.addEnemy(type);
            this.animationView.clear();
            this.animationView.addEnemy(type);
        };
        addWeaver.onclick = (e) => {
            e.stopPropagation();
            const type = "Weaver";
            this.addEnemy(type);
            this.animationView.clear();
            this.animationView.addEnemy(type);
        };
        addSingularity.onclick = (e) => {
            e.stopPropagation();
            const type = "Singularity";
            this.addEnemy(type);
            this.animationView.clear();
            this.animationView.addEnemy(type);
        };
        makeGame.onclick = (e) => {
            e.stopPropagation();
            console.log("game editor opened clicked");
            this.gameEditorOpened = !this.gameEditorOpened;
            this.engine.gameEditorOpened = this.gameEditorOpened;
            // change text to save or something. accidental click seems bad though
        };
        makeEvent.onclick = (e) => {
            e.stopPropagation();
            this.UIActionsToRun.push(() => this.makeEvent());
        };
        addScene.onclick = (e) => {
            e.stopPropagation();
            this.UIActionsToRun.push(() => this.makeScene());
        };

        sceneNameSubmit.onclick = (e) => {
            e.stopPropagation();
            const name = document.getElementById("sceneName").value;
            this.UIActionsToRun.push(() => this.makeScene(name));
        };
        addTime.onclick = (e) => {
            e.stopPropagation();
            const time = document.getElementById("Time").value;
            this.UIActionsToRun.push(() => this.makeTime(time));
        };
        // should add a loop next to the currently selected element
        // once I have elements nested under scenes, I'm not sure how this will work
        // maybe it will make one next to the selected scene if nothing else is selected
        addLoop.onclick = (e) => {
            e.stopPropagation();
            const loop = {
                repeatTimes: Number(document.getElementById("Repeats").value),
                loopIdx: Number(document.getElementById("StartingIndex").value),
            };
            this.UIActionsToRun.push(() => this.makeLoop(loop));
        };
        moveLeft.onclick = (e) => {
            e.stopPropagation();
            this.UIActionsToRun.push(
                () => this.moveLeft(this.selectedGameElement)
            );
        };
        moveRight.onclick = (e) => {
            e.stopPropagation();
            // add action to queue for engine to process
            this.UIActionsToRun.push(
                () => this.moveRight(this.selectedGameElement)
            );
        };


        // this.levelDesignerCtx.addEventListener("dblclick", (e) => {
        //     e.stopPropagation();
        //     console.log("double clicked");
        //     const pos = [e.offsetX, e.offsetY];
        //     this.mouseDoubleClicked(pos);
        // });
    }

    makeTime(time) {
        const newElementPosition = this.getNewDrawPosition();
        const timeObject = new TimeObject(this, {waitTime: time}, newElementPosition);
        this.selectedGameElement = timeObject;
    }

    mouseDoubleClicked(pos) {
        console.log(pos);
    }

    expandScene(scene) {
        this.selectedGameElement?.unSelected();
        this.selectedGameElement = undefined;
        // if the scene is in the same scene as the currently expanded scene
        if(this.expandedScene.parentScene === scene.parentScene) {
            this.expandedScene.unExpandScene();
        }
        this.expandedScene = scene;

        // I'll have to do something about the click listeners
        // I could add a check that the scene it is in is expanded
        scene.gameElements.forEach((element) => {
            element.parentSceneExpanded();
            this.addUIElementSprite(element.UILineSprite);
        });
    }

    // will eventually want stack of expanded scenes
    // that way I can unexpand all the way back to the double clicked scene
    unExpandScene(scene) {
        if(this.expandedScene === scene) {
            this.removeExpandedElements();
            this.expandedScene = scene.parentScene;
        }
    }


    getExpandedScenePosition() {
        // expands into next row
        

    }

    makeLoop(loop) {
        new LoopBeginningObject(this, undefined, this.getNewDrawPosition());
        new LoopEndObject(this, loop, this.getNewDrawPosition());
    }

    moveLeft(UIElement) {
        const gameElements = this.expandedScene.gameElements;
        for(let i = 0; i < gameElements.length; i++) {
            const element = gameElements[i];
            if(element === UIElement) {
                if(i === 0) return;
                const temp = gameElements[i - 1];
                gameElements[i - 1] = UIElement;
                gameElements[i] = temp;
                this.swapAdjacentPositions(temp, UIElement);
            }
        }
    }

    moveRight(UIElement) {
        const gameElements = this.expandedScene.gameElements;
        for(let i = 0; i < gameElements.length; i++) {
            const currentElement = gameElements[i];
            if(currentElement === UIElement) {
                if(i === gameElements.length - 1) return;
                const temp = gameElements[i + 1];
                gameElements[i + 1] = UIElement;
                gameElements[i] = temp;
                this.swapAdjacentPositions(UIElement, temp);
                return;
            }
        }
    }

    makeEvent() {
        // should provide this the current scene to know which array of elements to use
        const newElementPosition = this.getNewDrawPosition();
        const event = new EventObject(this, null, newElementPosition);
        this.selectedGameElement?.unSelected();
        this.selectedGameElement = event;
    }
    
    swapAdjacentPositions(leftUIElement, rightUIElement) {
        const newLeftX = leftUIElement?.UITransform?.pos[0] || 0;
        const newRightX = newLeftX + rightUIElement?.widthHeight[0] + 4;
        leftUIElement.UITransform.pos[0] = newRightX;
        rightUIElement.UITransform.pos[0] = newLeftX;
        
        console.log(this.expandedScene.gameElements.map((element) => element.UITransform.pos[0]));
    }

    getNewDrawPosition() {
        const expandedElements = this.expandedScene.gameElements;
        const lastElement = expandedElements[expandedElements.length - 1];
        const lastXPosition = lastElement?.UITransform?.pos[0] || 0;
        const lastYPosition = lastElement?.UITransform?.pos[1] || this.expandedScene.widthHeight[1] + this.expandedScene.UITransform.pos[1] + 4;
        const lastWidth = lastElement?.widthHeight[0] || 0;
  
        return [lastXPosition + lastWidth + 4, lastYPosition];
    }

    makeScene(name) {
        // this should add a box inside either the game sequence as a whole,
        // or inside the current scene
        const newElementPosition = this.getNewDrawPosition();
        // sprites are made and added automatically
        const newScene  = new SceneObject(this, {name}, this.expandedScene, newElementPosition);
    }

    loopSelected(loop) {
        this.selectedGameElement?.unSelected();
        this.selectedGameElement = loop;
    }

    timeSelected(time) {
        this.selectedGameElement?.unSelected();
        this.selectedGameElement = time;
    }

    eventSelected(event) {
        this.selectedGameElement?.unSelected();
        this.selectedGameElement = event;
    }

    enemyPlacerClicked(enemyPlacer) {
        this.animationView.clear();
        this.animationView.addEnemy(enemyPlacer.type);
        this.animationView.enemySelected(enemyPlacer.spawn);
    }

    sceneDoubleClicked(scene) {
        // this should open the array of elements in the scene
        console.log("scene double clicked: ", scene);
        // should move this into scene object
        // this.selectedScene.UILineSprite.selected = false;
        // this.selectedScene = scene;
        // scene.UILineSprite.selected = true;
    }

    sceneSelected(scene) {
        this.selectedGameElement?.unSelected();
        this.selectedGameElement = scene;
    }

    getPalletModal() {
        const modal = document.getElementById("pallet");
    // add functions to buttons of the pallet
    }

    enemyPlaced(spawn) {
        this.animationView.enemySelected(spawn);
    }

    addEnemy(type) {
        new EnemyPlacer(this.engine, type, this);
        
        // add this to the list of spawns for 
        // the event that is being constructed
    }

    addMouseClickListener(object) {
        this.engine.addLevelDesignerClickListener(object);
    }
    addMouseDoubleClickListener(object) {
        this.engine.addLevelDesignerDoubleClickListener(object);
    }

    removeMouseClickListener(object) {
        this.engine.removeLevelDesignerClickListener(object);
    }
    removeMouseDoubleClickListener(object) {
        this.engine.removeLevelDesignerDoubleClickListener(object);
    }

    addSpawnToEvent(spawn, enemyPlacer) {
        if(this.selectedGameElement.enemyPlacers) {
            this.selectedGameElement?.addSpawn(new Spawn(this.engine, spawn));
            this.selectedGameElement?.addEnemyPlacer(enemyPlacer);
        }
    }

    update(deltaTime) {

    }

    createWalls() {
        return new Walls(this.engine, this);
    }

    createGrid(cameraTransform) {
        return new Grid(this.engine, this, new Transform());
    }

    createOverlay() {
        return new Overlay(this.engine, this, this.ship.transform);
    }

    isOutOfBounds(pos, radius) {
        const max = [GameScript.DIM_X - radius, GameScript.DIM_Y - radius];
        if (radius) {
            return (
                pos[0] <= radius ||
        pos[0] >= max[0] ||
        pos[1] <= radius ||
        pos[1] >= max[1]
            );
        } else {
            return (
                pos[0] < 0 ||
        pos[1] < 0 ||
        pos[0] > GameScript.DIM_X ||
        pos[1] > GameScript.DIM_Y
            );
        }
    }

    runUIActions() {
        this.UIActionsToRun.forEach((action) => action());
        this.UIActionsToRun = [];
    }

    animate(timeDelta) {

        // it might be cool to animate the tiny enemies in the spawn card
        // this.animateGameObjects(timeDelta);

        this.clearCanvas();
        this.runUIActions();
        this.renderLineSprites(this.levelDesignerCtx);
        this.renderUILineSprites(this.levelDesignerCtx);
        this.renderOverlayText();
    }

    renderOverlayText() {
        // if(this.overlayTextCleared) return;
        // this.ctx.save();
        // this.ctx.font = 18 + "px " + "Arial";
        // this.ctx.fillStyle = "white";
        // const typeText = "Type: " + this.overlayText.Type;
        // const positionText = "Location: " + this.overlayText.Location;
        // this.ctx.fillText(
        //     typeText,
        //     10,
        //     20
        // );
        // this.ctx.fillText(
        //     positionText,
        //     10,
        //     38
        // );
        // this.ctx.restore();
    }


    animateGameObjects(delta) {
        // this.gameObjects.forEach((object) => {
        //     object.animate(delta);
        // });
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
    }

    clear() {
        const removeList = [...this.gameObjects];
        removeList.forEach((gameObject) => {
            this.remove(gameObject);
        });
        this.overlayTextCleared = true;
    }

    renderLineSprites(ctx) {
        ctx.save();
        ctx.scale(this.zoomScale, this.zoomScale);
        this.lineSprites.forEach((sprite) => {
            sprite.draw(ctx);
        });
        ctx.restore();
    }

    renderUILineSprites(ctx) {
        ctx.save();
        this.UIElementSprites.forEach((sprite) => {
            sprite.draw(ctx);
        });
        ctx.restore();
    }

    addGameObject(gameObject) {
        this.gameObjects.push(gameObject);
    }

    queueSound() {
        
    }

    addCollider() {}

    addPhysicsComponent() {}

    remove(gameObject) {
        if (gameObject.lineSprite) {
            this.lineSprites.splice(
                this.lineSprites.indexOf(gameObject.lineSprite),
                1
            );
        }

        this.gameObjects.splice(this.gameObjects.indexOf(gameObject), 1);
    }

    removeExpandedElements() {
        const UIElements = this.expandedScene.gameElements;
        UIElements.forEach((UIElement) => {
            UIElement.parentSceneUnexpanded();
            if(UIElement.UILineSprite) {
                this.UIElementSprites.splice(
                    this.UIElementSprites.indexOf(UIElement.UILineSprite),
                    1
                );
            }
        });
    }

    removeUIElement(UIElement) {
        if(UIElement.UILineSprite) {
            this.UIElementSprites.splice(
                this.UIElementSprites.indexOf(UIElement.UILineSprite),
                1
            );
        }
        this.expandedScene.gameElements.splice(this.expandedScene.gameElements.indexOf(UIElement), 1);
    }

    addUIElementSprite(UILineSprite) {
        this.UIElementSprites.push(UILineSprite);
    }

    addUIElement(UIElement) {
        this.expandedScene.gameElements.push(UIElement);
    }

    addLineSprite(lineSprite) {
        this.lineSprites.push(lineSprite);
    }

}
