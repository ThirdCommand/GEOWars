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
} from "./scene";

// I should collect palced enemies

export class LevelDesigner {
    constructor(engine, animationView) {
        this.DIM_X = 1000;
        this.DIM_Y = 600;
        this.BG_COLOR = "#000000";
        this.engine = engine;
        this.animationView = animationView;
        // this.walls = this.createWalls();
        // this.grid = this.createGrid();
        this.palletModal = this.getPalletModal();
        this.gameEditorOpened = false;

        const addArrowButton = document.getElementById("Arrow");
        const addBoxBox = document.getElementById("BoxBox");
        const addPinwheel = document.getElementById("Pinwheel");
        const addWeaver = document.getElementById("Weaver");
        const addSingularity = document.getElementById("Singularity");
        const makeGame = document.getElementById("LevelEditor");
        this.gameSequenceDisplay = new GameSequenceDisplay();

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

        console.log({
            addSingularity,
            makeGame,
        });
    }

    levelDesigner(time) {
        const timeDelta = time - this.lastTime;
        this.engine;
    }

    getPalletModal() {
        const modal = document.getElementById("pallet");

    // add functions to buttons of the pallet
    }

    addEnemy(type) {
        new EnemyPlacer(this.engine, type, this);
    }

    addSpawnToEvent(spawn) {
        new Spawn(this.engine, spawn);
    }

    addNewEvent() {}

    update(deltaTime) {}

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
