import { Walls } from "../../game_objects/walls";
import { Overlay } from "../../game_objects/Overlay/overlay";
// import { Grid } from "../../game_objects/particles/Grid/grid";
// import { EnemyPlacer } from "./LevelDesign/EnemyPlacer";

import { Transform } from "../transform";
import {SceneObject, SerializedGameElement, GameElementObject, SceneSerialized } from "./DesignElements/Scene";
import { EnemyType, Spawn, SpawnSerialized, isEnemyType } from "./DesignElements/Spawn";

import { EventObject, EventSerialized} from "./DesignElements/Event";
import { TimeObject } from "./DesignElements/Time";
import { LoopBeginningObject, LoopEndObject, LoopValues} from "./DesignElements/Loop";
import { Operand, OperationObject } from "./DesignElements/Operation";
import { GameEngine, GameScript } from "../game_engine";
import { type UIElement } from "../UI_Element";
import { type LineSprite } from "../line_sprite";
import { type AnimationView } from "../../AnimationView";
import { GameObject } from "../game_object";
import { EnemyPlacer } from "./LevelDesign/EnemyPlacer";
import { DIM_X, DIM_Y, GEOWarsScript } from "../../GEOWarsScript";
import { Arrow } from "../../game_objects/enemies/Arrow/arrow";
import { BoxBox } from "../../game_objects/enemies/BoxBox/boxbox";
import { LevelDesigner } from "./LevelDesigner";
import { StrikeTimeScript } from "../../StrikeTimeScript";

// I should collect placed enemies


// check if array of enemyType
export function isEnemyTypeArray(value: string[]): value is EnemyType[] {
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
        this.addArrowListeners()
        this.engine.addMouseEventListener(this);
        this.isLevelDesignerOpened = true;

        const makeEventObject = document.getElementById("MakeEvent");
        const addTime = document.getElementById("TimeSubmit");
        const addLoop = document.getElementById("LoopSubmit");
        const addOperation = document.getElementById("OperationSubmit");
        const sceneNameSubmit = document.getElementById("sceneNameSubmit");
        const shipRelative = document.getElementById("shipRelative") as HTMLInputElement;
        this.shipRelative = shipRelative;
        const setCoordinate = document.getElementById("changeCoordinates");
        const setRandomCoordinates = document.getElementById("setRandomCoordinates");

        const randomSpawnCoordinate = document.getElementById("randomSpawnCoordinate");


        const saveGameDesign = document.getElementById("saveGameDesign");

        // const loadGameDesign = document.getElementById("loadGameDesign");

        const startGame = document.getElementById("startStrikeTimeGame");

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
        new BoxBox(this.engine, [300,150]);

        setCoordinate.onclick = (e) => {
            e.stopPropagation();
            const x = Number((document.getElementById("xCoordinate") as HTMLInputElement).value);
            const y = Number((document.getElementById("yCoordinate") as HTMLInputElement).value);
            const angle = Number((document.getElementById("angle") as HTMLInputElement).value);
            console.log({x, y, angle});
            this.currentEnemyPlacer?.setCoordinates(x, y, angle);
        };

        setRandomCoordinates.onclick = (e) => {
            e.stopPropagation();
            this.currentEnemyPlacer?.setRandomCoordinates();
        };

        randomSpawnCoordinate.onclick = (e) => {
            // should make it so you can only make one
            // this would allow me to find the spawn and change it's value here as well
            e.stopPropagation();
            this.currentEnemyPlacer?.type === "RANDOM";

            const selectedEnemies = Array.from((document.getElementById('possibleSpawns') as HTMLSelectElement).selectedOptions).map(({ value }) => value);
            if(isEnemyTypeArray(selectedEnemies)) {
                const numberToGenerate = (document.getElementById('numberToGenerate') as HTMLInputElement).value;

                const newSpawn: SpawnSerialized = {
                    location: 'RANDOM',
                    type: 'RANDOM',
                    possibleSpawns: selectedEnemies,
                    numberToGenerate: Number(numberToGenerate),
                };
            
                this.addRandomRandomSpawnToEvent(newSpawn);
            }
            
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
            this.saveGameDesign();
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


        startGame.onclick = (e) => {
            e.stopPropagation();
            // I'm not sure if this is correct
            // this.startGame(true);
        };
    }

    addArrowListeners() {
        this.engine.addLeftArrowListener(this);
        this.engine.addRightArrowListener(this);
        this.engine.addDownArrowListener(this);
        this.engine.addUpArrowListener(this);
    }

    updateLeftArrowListener(pressed: boolean) {
        this.engine.activeCamera.transform.pos[0] -= 5;
    }
    updateUpArrowListener(pressed: boolean) {
        this.engine.activeCamera.transform.pos[1] -= 5;
    }
    updateRightArrowListener(pressed: boolean) {
        this.engine.activeCamera.transform.pos[0] += 5;
    }
    updateDownArrowListener(pressed: boolean) {
        this.engine.activeCamera.transform.pos[1] += 5;
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
        const serializedGameString = JSON.stringify(this.serializedGame);
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

}
