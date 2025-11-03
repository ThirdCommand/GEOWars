import { Walls } from "../../game_objects/walls";
// import { Grid } from "../../game_objects/particles/Grid/grid";
import { EnemyPlacer } from "./LevelDesign/EnemyPlacer";

import { Transform } from "../transform";
import {SceneSerialized } from "./DesignElements/Scene";
import { GEOEnemyType, SpawnSerialized, isEnemyType } from "./DesignElements/Spawn";

import { GameEngine } from "../game_engine";
import { type AnimationView } from "../../AnimationView";
import { DIM_X, DIM_Y, GEOWarsScript } from "../../GEOWarsScript";
import { LevelDesigner } from "./LevelDesigner";

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
export class GEOLevelDesigner extends LevelDesigner {

    transform = new Transform();
    ship: {
        transform: Transform
    };
    lastTime: 0;

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

        // might not need the ship now that I'm using cameras
        this.ship = {
            transform: new Transform()
        };
        this.lastTime = 0;

    }
    
    openLevelDesigner() {
        this.engine.addMouseEventListener(this);
        this.engine.activeCamera.transform.pos[0] = DIM_X / 2;
        this.engine.activeCamera.transform.pos[1] = DIM_Y / 2;


        const addArrowButton = document.getElementById("Arrow");
        const addGruntButton = document.getElementById("Grunt");
        const addBoxBox = document.getElementById("BoxBox");
        const addPinwheel = document.getElementById("Pinwheel");
        const addWeaver = document.getElementById("Weaver");
        const addSingularity = document.getElementById("Singularity");
        // const makeGame = document.getElementById("LevelEditor");
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
       
        addGruntButton.onclick = (e) => {
            e.stopPropagation();
            const type = "Grunt";
            this.addLevelGameObject(type);
        };

        addArrowButton.onclick = (e) => {
            e.stopPropagation();
            const type = "Arrow";
            this.addLevelGameObject(type);
        };
        addBoxBox.onclick = (e) => {
            e.stopPropagation();
            const type = "BoxBox";
            this.addLevelGameObject(type);
        };
        addPinwheel.onclick = (e) => {
            e.stopPropagation();
            const type = "Pinwheel";
            this.addLevelGameObject(type);
        };
        addWeaver.onclick = (e) => {
            e.stopPropagation();
            const type = "Weaver";
            this.addLevelGameObject(type);
        };
        addSingularity.onclick = (e) => {
            e.stopPropagation();
            const type = "Singularity";
            this.addLevelGameObject(type);
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


        // this.levelDesignerCtx.addEventListener("dblclick", (e) => {
        //     e.stopPropagation();
        //     console.log("double clicked");
        //     const pos = [e.offsetX, e.offsetY];
        //     this.mouseDoubleClicked(pos);
        // });
    }

    // addToClipBoard(uiElement: UIElement) {

    // }

    startGame(GEOWarsScript: GEOWarsScript) {
        this.serializedGame = {
            type: 'Scene',
            name: "Game",
            serializedGameElements: this.baseScene.gameElementObjects.map(
                (element) => element.serialize() // set up proper return here
            ),
        };
        this.clearLevelDesignElements();
        const serializedGameString = JSON.stringify(this.serializedGame);
        // I should unselect whatever is selected.
        // events being the main issue since they have things
        // on the game 
        this.clear();
        GEOWarsScript.startGame(serializedGameString);
        this.engine.isLevelDesignerOpened = false;
    }

    clearLevelDesignElements() {
        this.engine.gameObjects.filter((object) => object instanceof EnemyPlacer).forEach((enemyPlacer) => enemyPlacer.remove());
    }


    queueSound() {}

    addCollider() {}

    addPhysicsComponent() {}

    isOutOfBounds(pos: [number, number], radius: number) {
        const max = [DIM_X - radius, DIM_Y - radius];
        
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
                pos[0] > DIM_X ||
                pos[1] > DIM_Y
            );
        }
    }

    createWalls() {
        return new Walls(this.engine);
    }

}
