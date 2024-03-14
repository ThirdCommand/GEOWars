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

// I should collect placed enemies

export class LevelDesigner {
    constructor(engine, animationView, levelDesignerCtx, animationWindow) {
        this.DIM_X = 1000;
        this.DIM_Y = 600;
        this.BG_COLOR = "#000000";
        this.engine = engine;
        this.animationView = animationView;
        this.levelDesignerCtx = levelDesignerCtx;
        this.animationWindow = animationWindow;

        this.UIElements = [];
        this.UIElementSprites = [];

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


        // this.walls = this.createWalls();
        // this.grid = this.createGrid();
        this.palletModal = this.getPalletModal();
        this.currentEvent;
        this.selectedScene;
        this.selectedTime;

        // scene can be selected, while also selecting other elements like event
        // or time or loop. But only one at a time

        // I'm running into an issue here
        // there's the three different versions of game sequence
        // there's the display one that shows while creating
        // there's the serialized representation of it
        // there's the one that's loaded from the serialized version
        // I think it makes sense to combine the display and loaded versions 

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
            console.log("make event clicked");
            this.makeEvent();
            // this.gameEditorOpened = !this.gameEditorOpened;
            // this.engine.gameEditorOpened = this.gameEditorOpened;
        };
        addScene.onclick = (e) => {
            e.stopPropagation();
            console.log("make Scene clicked");
            this.makeScene();

            // this.gameEditorOpened = !this.gameEditorOpened;
            // this.engine.gameEditorOpened = this.gameEditorOpened;
        };
        sceneNameSubmit.onclick = (e) => {
            e.stopPropagation();
            const name = document.getElementById("sceneName").value;
            this.makeScene(name);
            console.log("scene name submitted: ", name);
        };
        addTime.onclick = (e) => {
            e.stopPropagation();
            const time = document.getElementById("Time").value;
            this.makeTime(time);
            console.log("timeSubmitted: ", time);
        };

        // this.levelDesignerCtx.addEventListener("dblclick", (e) => {
        //     e.stopPropagation();
        //     console.log("double clicked");
        //     const pos = [e.offsetX, e.offsetY];
        //     this.mouseDoubleClicked(pos);
        // });
    }

    makeTime(time) {
        const newElementPosition = this.getNewDrawPosition(this.UIElementSprites);
        const timeObject = new TimeObject(this, {waitTime: time}, newElementPosition);
        this.selectedTime = timeObject;
    }

    mouseDoubleClicked(pos) {
        console.log(pos);
    }

    makeEvent() {
        // should provide this the current scene to know which array of elements to use
        const newElementPosition = this.getNewDrawPosition(this.UIElementSprites);
        const event = new EventObject(this, null, newElementPosition);
        this.currentEvent?.unSelected();
        this.currentEvent = event;
    }

    getNewDrawPosition(UIElements) {
        const lastElement = UIElements[UIElements.length - 1];
        const lastXPosition = lastElement?.UITransform?.pos[0] || 0;
        const lastWidth = lastElement?.widthHeight[0] || 0;
  
        return [lastXPosition + lastWidth + 4, 4];
    }

    makeScene(name) {
        // this should add a box inside either the game sequence as a whole,
        // or inside the current scene
        const newElementPosition = this.getNewDrawPosition(this.UIElementSprites);
        // sprites are made and added automatically
        const newScene  = new SceneObject(this, {name}, newElementPosition);
    }

    eventSelected(event) {
        this.currentEvent?.unSelected();
        this.currentEvent = event;
    }

    enemyPlacerClicked(enemyPlacer) {
        this.animationView.clear();
        this.animationView.addEnemy(enemyPlacer.type);
        this.animationView.enemySelected(enemyPlacer.spawn);
    }

    sceneDoubleClicked(scene) {
        console.log("scene double clicked: ", scene);
        // should move this into scene object
        this.selectedScene.UILineSprite.selected = false;
        this.selectedScene = scene;
        scene.UILineSprite.selected = true;
    }

    sceneSelected(scene) {
        this.selectedScene?.unSelected();
        this.selectedScene = scene;
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
        this.currentEvent?.addSpawn(new Spawn(this.engine, spawn));
        this.currentEvent?.addEnemyPlacer(enemyPlacer);
    }

    addNewEvent() {}

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

    animate(time) {
        const timeDelta = time - this.lastTime;
        this.lastTime = time;

        // it might be cool to animate the tiny enemies in the spawn card
        // this.animateGameObjects(timeDelta);

        this.clearCanvas();
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
        this.ctx.clearRect(0, 0, this.levelDesignerCtx.width, this.levelDesignerCtx.height);
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, this.levelDesignerCtx.width, this.levelDesignerCtx.height);
    }

    clear() {
        const removeList = [...this.gameObjects];
        removeList.forEach((gameObject) => {
            this.remove(gameObject);
        });
        this.overlayTextCleared = true;
    }

    renderLineSprites(ctx) {
        // this might have to be rendered considering parent tree
        // start with scene, recursively render each piece
        // and the scene isn't completed until each child piece is rendered
        // otherwise you don't know where to complete the end of the sprite

        // to optimize (if needed later) I could render just what is visible during the frame
        // maybe I could do the math to see what appears in the frame and only render that
        // but I don't think it's necessary for now

        ctx.save();
        ctx.scale(this.zoomScale, this.zoomScale);
        this.lineSprites.forEach((sprite) => {
            sprite.draw(ctx);
        });
        ctx.restore();
    }

    renderUILineSprites(ctx) {
        // this is the equation for new positions. 
        // grab the last element in the array
        // take its position, and width
        // add a gap
        // and place the next one there 
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

    removeUIElement(UIElement) {
        if(UIElement.UIElementLineSprite) {
            this.UIElementSprites.splice(
                this.UIElementSprites.indexOf(UIElement.UIElementLineSprite),
                1
            );
        }
        this.UIElements.splice(this.UIElements.indexOf(UIElement), 1);
    }

    addUIElementSprite(UILineSprite) {
        this.UIElementSprites.push(UILineSprite);
    }

    addUIElement(UIElement) {
        this.UIElements.push(UIElement);
    }

    addLineSprite(lineSprite) {
        this.lineSprites.push(lineSprite);
    }

}
