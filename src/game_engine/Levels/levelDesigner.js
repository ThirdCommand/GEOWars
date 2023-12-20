import { Walls } from "../../game_objects/Walls/walls";
import { Overlay } from "../../game_objects/Overlay/overlay";
import { Grid } from "../../game_objects/particles/Grid/grid";
import { EnemyPlacer } from "./LevelDesign/EnemyPlacer";
import { GameScript } from "../../game_script";
import { Transform } from "../transform";

import {
    Spawn,
    GameSequence,
    GameSequenceDisplay,
    Event,
    Operation,
    Scene,
} from "./DesignElements/scenes";
import { Collider } from "../collider";
import { GameObject } from "../game_object";

// I should collect placed enemies

export class LevelDesigner {
    constructor(engine, animationView, levelDesignerCtx) {
        this.DIM_X = 1000;
        this.DIM_Y = 600;
        this.BG_COLOR = "#000000";
        this.engine = engine;
        this.animationView = animationView;
        this.levelDesignerCtx = levelDesignerCtx;
        // this.walls = this.createWalls();
        // this.grid = this.createGrid();
        this.palletModal = this.getPalletModal();
        this.currentEvent;
        this.currentScene;
        // I'm running into an issue here
        // there's the three different versions of game sequence
        // there's the display one that shows while creating
        // there's the serialized representation of it
        // there's the one that's loaded from the serialized version
        // I think it makes sense to combine the display and loaded versions 
        this.gameSequence = new GameSequence();


        this.gameSequenceDisplay = new GameSequenceDisplay();

        this.gameEditorOpened = false;
        

        const addArrowButton = document.getElementById("Arrow");
        const addBoxBox = document.getElementById("BoxBox");
        const addPinwheel = document.getElementById("Pinwheel");
        const addWeaver = document.getElementById("Weaver");
        const addSingularity = document.getElementById("Singularity");
        const makeGame = document.getElementById("LevelEditor");
        const makeEvent = document.getElementById("MakeEvent");
        const addScene = document.getElementById("MakeScene");

        const sceneNameSubmit = document.getElementById("sceneNameSubmit");
       

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
    }

    // levelDesigner(time) {
    //     const timeDelta = time - this.lastTime;
    //     this.engine;
    // }

    mouseClicked(pos) {
        // check mouse position with click colliders
        const duckTypedMouseGameObject = {
            transform: {
                pos
            }
        };
        const mouseClickCollider = new Collider('MouseClicker',duckTypedMouseGameObject, 2, [], ["EnemyPlacer"]);
        this.engine?.subscribers.forEach((subscriber) => {
            console.log('checking subscriber: ', subscriber);
            if (subscriber.type === "Click") {
                subscriber.collisionCheck(mouseClickCollider);
            }
        });
    }

    makeEvent() {
        const event = new Event();
        this.currentEvent = event;
    }

    makeScene(name) {
        // this should add a box inside either the game sequence as a whole,
        // or inside the current scene
        const scene = new Scene(this.gameSequence, name);
        this.currentScene = scene;
        const ctx = this.levelDesignerCtx;
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        console.log({width, height});
        const sceneWidthOffset = 5;
        const sceneWidth = width - sceneWidthOffset;

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(sceneWidthOffset, 0, sceneWidth -sceneWidthOffset, height);
        ctx.stroke();
    }

    enemyPlacerClicked(enemyPlacer) {
        this.animationView.clear();
        this.animationView.addEnemy(enemyPlacer.type);
        this.animationView.enemySelected(enemyPlacer.spawn);
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

    addMouseClickListener(collider) {
        console.log("adding collider to engine: ", collider);
        // I might need to prefix all added colliders with LevelDesign or something
        this.engine.addCollider(collider);
    }

    addSpawnToEvent(spawn) {
        new Spawn(this.engine, spawn);
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
}
