import { Transform } from "../transform";
import {SceneSerialized } from "./DesignElements/Scene";
import { GEOEnemyType, isEnemyType, StrikeTimeLevelGameObjectType } from "./DesignElements/Spawn";
import { EnemyPlacer } from "./LevelDesign/EnemyPlacer";

import { GameEngine } from "../game_engine";
import { type AnimationView } from "../../AnimationView";
import { DIM_X, DIM_Y } from "../../StrikeTimeScript";
import { LevelDesigner } from "./LevelDesigner";
import { StrikeTimeScript } from "../../StrikeTimeScript";

// I should collect placed enemies


// check if array of enemyType
export function isEnemyTypeArray(value: string[]): value is GEOEnemyType[] {
    return !value.some((type) => (!isEnemyType(type)));
}

// Perhaps level designer should be an extension of game script with connection to the
// timeline UI and the animation window

// for a tracker I can highlight the current game element
// just like selecting it... but maybe the same color for 
// all of them 
export class StrikeTimeLevelDesigner extends LevelDesigner {
    transform: Transform;

    constructor(
        engine: GameEngine, 
        animationView: AnimationView, 
        levelDesignerCtx: CanvasRenderingContext2D, 
        serializedGame?: SceneSerialized
    ) {
        super(
            engine,
            animationView,
            levelDesignerCtx, 
            serializedGame
        )

        this.transform = new Transform();
    }

    openLevelDesigner() {
        this.engine.activeCamera.transform.pos[0] = DIM_X / 2;
        this.engine.activeCamera.transform.pos[1] = DIM_Y / 2;
        this.addArrowListeners()
        this.engine.addMouseEventListener(this);
        this.isLevelDesignerOpened = true;
        
        const makeEventObject = document.getElementById("MakeStrikeEvent");
        const addTime = document.getElementById("TimeSubmitStrikeTime");
        const addLoop = document.getElementById("LoopSubmitStrikeTime");
        const addOperation = document.getElementById("OperationSubmitStrikeTime");
        const sceneNameSubmit = document.getElementById("sceneNameSubmitStrikeTime");
        const shipRelative = document.getElementById("shipRelative") as HTMLInputElement;
        this.shipRelative = shipRelative;
        const setCoordinate = document.getElementById("changeStrikeTimeCoordinates");

        const addAuroraButton = document.getElementById("Aurora");
        const addPatriotSite = document.getElementById("PatriotSite");
        const addBuilding = document.getElementById("Building");
        const addTargetBuilding = document.getElementById("TargetBuilding");
        const addAirport = document.getElementById("Airport");

        addAuroraButton.onclick = (e) => {
            e.stopPropagation();
            const type = "Aurora";
            this.addLevelGameObject(type);
        };

        addPatriotSite.onclick = (e) => {
            e.stopPropagation();
            const type = "PatriotMissileSite";
            this.addLevelGameObject(type);
        };

        addBuilding.onclick = (e) => {
            e.stopPropagation();
            const type = "Building1";
            this.addLevelGameObject(type);
        };

        addTargetBuilding.onclick = (e) => {
            e.stopPropagation();
            const type = "TargetBuilding";
            this.addLevelGameObject(type);
        };

        addAirport.onclick = (e) => {
            e.stopPropagation();
            const type = "Airport";
            this.addLevelGameObject(type);
        };

        const saveGameDesign = document.getElementById("saveGameDesignStrikeTime");

        // const loadGameDesign = document.getElementById("loadGameDesign");

        // we deal with this in the GameView right now because this doesn't have access to the game script
        // const startGame = document.getElementById("startStrikeTimeGame");

        shipRelative.onclick = (e) => {
            e.stopPropagation();
            const value = shipRelative.value;
            console.log(value);
            if(value === "on") {
                shipRelative.value = "off";
                this.makeCoordinatesShipRelative();
            } else {
                shipRelative.value = "on";
                this.makeCoordinatesArenaRelative();
            }

        };
        // new BoxBox(this.engine, [300,150]);

        setCoordinate.onclick = (e) => {
            e.stopPropagation();
            const x = Number((document.getElementById("xCoordinateStrikeTime") as HTMLInputElement).value);
            const y = Number((document.getElementById("yCoordinateStrikeTime") as HTMLInputElement).value);
            const angle = Number((document.getElementById("angleStrikeTime") as HTMLInputElement).value);
            console.log({x, y, angle});
            this.currentEnemyPlacer?.setCoordinates(x, y, angle);
        };
       
        // makeGame.onclick = (e) => {
        //     e.stopPropagation();
        //     console.log("game editor opened clicked");
        //     this.isLevelDesignerOpened = !this.isLevelDesignerOpened;
        //     this.engine.isLevelDesignerOpened = this.isLevelDesignerOpened;
        // };
        
        makeEventObject.onclick = (e) => {
            e.stopPropagation();
            this.UIActionsToRun.push(() => this.makeEventObject());
        };

        saveGameDesign.onclick = (e) => {  
            e.stopPropagation();
            // will need text box for this in the future
            this.saveGameDesign('StrikeTime', '01');
        };

        sceneNameSubmit.onclick = (e) => {
            e.stopPropagation();
            const name = (document.getElementById("sceneName") as HTMLInputElement).value;
            this.UIActionsToRun.push(() => this.makeSceneObject(name));
        };

        // loadGameDesign.onclick = (e) => {
        //     e.stopPropagation();
        //     const json = document.getElementById("loadGameDesignInput").value;
        //     this.loadGameDesign(json);
        // };

        addTime.onclick = (e) => {
            e.stopPropagation();
            const time = (document.getElementById("Time") as HTMLInputElement).value;
            this.UIActionsToRun.push(() => this.makeTime(Number(time)));
        };
        addOperation.onclick = (e) => {
            e.stopPropagation(); 
            const operationType = (document.getElementById("OperationType") as HTMLInputElement).value;
            const operationValue = (document.getElementById("OperationFactor") as HTMLInputElement).value;
            const operand = {
                type: operationType,
                factor: Number(operationValue),
            };
            this.UIActionsToRun.push(() => this.makeOperation(operand));
        };


        // should add a loop next to the currently selected element
        // once I have elements nested under scenes, I'm not sure how this will work
        // maybe it will make one next to the selected scene if nothing else is selected
        addLoop.onclick = (e) => {
            e.stopPropagation();
            const loop = {
                repeatTimes: Number((document.getElementById("Repeats") as HTMLInputElement).value),
                // loopIdx: Number(document.getElementById("StartingIndex").value),
            };
            this.UIActionsToRun.push(() => this.makeLoop(loop));
        };

        // window.addEventListener("scroll", (e) => {
        //     // get the current mouse position to know if it is within the 
        //     // level editor
        //     // then move the level editor up or down 
        // });

        window.addEventListener("keydown", (e) => {
            e.stopPropagation();
            if(e.key === "Escape") {
                this.escapePressed();
            }
            if(e.key === "Backspace") {
                if(this.currentMousePos) {
                    this.selectedGameElement?.delete();
                    this.leftJustifyGameElements();
                } else if(this.currentEnemyPlacer) {
                    this.currentEnemyPlacer.removeFromEvent();
                    this.animationView.clear();
                }
            }
        });

    }

    addArrowListeners() {
        this.engine.addLeftArrowListener(this);
        this.engine.addRightArrowListener(this);
        this.engine.addDownArrowListener(this);
        this.engine.addUpArrowListener(this);
    }

    updateLeftArrowListener(pressed: boolean) {
        this.engine.activeCamera.transform.pos[0] -= 15;
    }
    updateUpArrowListener(pressed: boolean) {
        this.engine.activeCamera.transform.pos[1] -= 15;
    }
    updateRightArrowListener(pressed: boolean) {
        this.engine.activeCamera.transform.pos[0] += 15;
    }
    updateDownArrowListener(pressed: boolean) {
        this.engine.activeCamera.transform.pos[1] += 15;
    }

    // there's two start buttons
    // one directly from the first modal
    // the second within the level editor

    startGame(strikeTimeGameScript: StrikeTimeScript) {

        this.serializedGame = {
            type: 'Scene',
            name: "Game",
            serializedGameElements: this.baseScene.gameElementObjects.map(
                (element) => element.serialize() 
            ),
        };
        this.clearLevelDesignElements();
        const serializedGameString = JSON.stringify(this.serializedGame);
        this.clear();
        // I should unselect whatever is selected.
        // events being the main issue since they have things
        // on the game 
        strikeTimeGameScript.startGame(serializedGameString);

        this.engine.isLevelDesignerOpened = false;
        
        const strikeTimeLevelCreator = document.getElementById("StrikeTimeLevelEditor");
        const geoWarsLevelCreator = document.getElementById('GEOWarsLevelEditor')
        const levelEditorCanvas = document.getElementById('LevelEditorCanvas')
        geoWarsLevelCreator.style.display = "none";
        strikeTimeLevelCreator.style.display = "none";
        levelEditorCanvas.style.display = "none";
    }

    clearLevelDesignElements() {
        this.engine.gameObjects.filter((object) => object instanceof EnemyPlacer).forEach((enemyPlacer) => enemyPlacer.remove());
    }

}
