import { Walls } from "../../game_objects/Walls/walls";
import { Overlay } from "../../game_objects/Overlay/overlay";
import { Grid } from "../../game_objects/particles/Grid/grid";
import { EnemyPlacer } from "./LevelDesign/EnemyPlacer";
import { GameScript } from "../../game_script";
import { Transform } from "../transform";
import { SceneObject } from "./DesignElements/Scene";
import { Spawn } from "./DesignElements/Spawn";

import { EventObject } from "./DesignElements/Event";
import { TimeObject } from "./DesignElements/Time";
import { LoopBeginningObject, LoopEndObject } from "./DesignElements/Loop";
import { OperationObject } from "./DesignElements/Operation";

// I should collect placed enemies


// for a tracker I can highlight the current game element
// just like selecting it... but maybe the same color for 
// all of them 
export class LevelDesigner {
    constructor(engine, animationView, levelDesignerCtx, animationWindow, serializedGame) {
        this.serializedGame = serializedGame;
        this.UIElementSprites = [];

        // duck typing for scene
        this.gameElements = []; // top level list of game elements
        this.expandedScenes = [this];
        this.UITransform = {pos: [0,0]};

        this.widthHeight = [0,0];

        this.loopBeginningObjectStackForLoading = [];

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

        this.currentEnemyPlacer;
 

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
        const addTime = document.getElementById("TimeSubmit");
        const addLoop = document.getElementById("LoopSubmit");
        const addOperation = document.getElementById("OperationSubmit");
        const sceneNameSubmit = document.getElementById("sceneNameSubmit");
        const shipRelative = document.getElementById("shipRelative");
        this.shipRelative = shipRelative;
        const setCoordinate = document.getElementById("changeCoordinates");
        const setRandomCoordinates = document.getElementById("setRandomCoordinates");

        const randomSpawnCoordinate = document.getElementById("randomSpawnCoordinate");


        const saveGameDesign = document.getElementById("saveGameDesign");

        const loadGameDesign = document.getElementById("loadGameDesign");

        const startGame = document.getElementById("startGame");

        shipRelative.onclick = (e) => {
            e.stopPropagation();
            const value = e.target.value;
            console.log(value);
            if(value === "on") {
                e.target.value = "off";
                this.makeCoordinatesShipRelative();
            } else {
                e.target.value = "on";
                this.makeCoordinatesArenaRelative();
            }

        };

        setCoordinate.onclick = (e) => {
            e.stopPropagation();
            const x = Number(document.getElementById("xCoordinate").value);
            const y = Number(document.getElementById("yCoordinate").value);
            const angle = Number(document.getElementById("angle").value);
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

            const selectedEnemies = Array.from(document.getElementById('possibleSpawns').selectedOptions).map(({ value }) => value);
            const numberToGenerate = document.getElementById('numberToGenerate').value;

            const newSpawn = {
                location: 'RANDOM',
                type: 'RANDOM',
                possibleSpawns: selectedEnemies,
                numberToGenerate: numberToGenerate,
            };
            
            this.addRandomRandomSpawnToEvent(newSpawn);
        };
       
        addGruntButton.onclick = (e) => {
            e.stopPropagation();
            const type = "Grunt";
            this.addEnemy(type);
            
        };

        addArrowButton.onclick = (e) => {
            e.stopPropagation();
            const type = "Arrow";
            this.addEnemy(type);
        };
        addBoxBox.onclick = (e) => {
            e.stopPropagation();
            const type = "BoxBox";
            this.addEnemy(type);
        };
        addPinwheel.onclick = (e) => {
            e.stopPropagation();
            const type = "Pinwheel";
            this.addEnemy(type);
        };
        addWeaver.onclick = (e) => {
            e.stopPropagation();
            const type = "Weaver";
            this.addEnemy(type);
        };
        addSingularity.onclick = (e) => {
            e.stopPropagation();
            const type = "Singularity";
            this.addEnemy(type);
        };
        // makeGame.onclick = (e) => {
        //     e.stopPropagation();
        //     console.log("game editor opened clicked");
        //     this.gameEditorOpened = !this.gameEditorOpened;
        //     this.engine.gameEditorOpened = this.gameEditorOpened;
        // };
        makeEvent.onclick = (e) => {
            e.stopPropagation();
            this.UIActionsToRun.push(() => this.makeEvent());
        };

        saveGameDesign.onclick = (e) => {  
            e.stopPropagation();
            this.saveGameDesign();
        };

        sceneNameSubmit.onclick = (e) => {
            e.stopPropagation();
            const name = document.getElementById("sceneName").value;
            this.UIActionsToRun.push(() => this.makeScene(name));
        };
        // loadGameDesign.onclick = (e) => {
        //     e.stopPropagation();
        //     const json = document.getElementById("loadGameDesignInput").value;
        //     this.loadGameDesign(json);
        // };
        addTime.onclick = (e) => {
            e.stopPropagation();
            const time = document.getElementById("Time").value;
            this.UIActionsToRun.push(() => this.makeTime(time));
        };
        addOperation.onclick = (e) => {
            e.stopPropagation(); 
            const operationType = document.getElementById("OperationType").value;
            const operationValue = document.getElementById("OperationFactor").value;
            const operand = {
                type: operationType,
                factor: operationValue,
            };
            this.UIActionsToRun.push(() => this.makeOperation(operand));
        };


        // should add a loop next to the currently selected element
        // once I have elements nested under scenes, I'm not sure how this will work
        // maybe it will make one next to the selected scene if nothing else is selected
        addLoop.onclick = (e) => {
            e.stopPropagation();
            const loop = {
                repeatTimes: Number(document.getElementById("Repeats").value),
                // loopIdx: Number(document.getElementById("StartingIndex").value),
            };
            this.UIActionsToRun.push(() => this.makeLoop(loop));
        };

        window.addEventListener("scroll", (e) => {
            // get the current mouse position to know if it is within the 
            // level editor
            // then move the level editor up or down 
        });

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
            // serialize game, send to game script
            this.startGame();
        };


        // this.levelDesignerCtx.addEventListener("dblclick", (e) => {
        //     e.stopPropagation();
        //     console.log("double clicked");
        //     const pos = [e.offsetX, e.offsetY];
        //     this.mouseDoubleClicked(pos);
        // });
    }

    startGame() {
        this.serializedGame = {
            gameName: "Game",
            gameElements: this.gameElements.map(
                (element) => element.serialize()
            ),
        };
        const serializedGame = JSON.stringify(this.serializedGame);
        // I should unselect whatever is selected.
        // events being the main issue since they have things
        // on the game 
        this.engine.gameScript.startGame(serializedGame);
        this.engine.gameEditorOpened = false;
    }

    makeTime(time, parentScene = this.expandedScenes[this.expandedScenes.length - 1]) {
        const newElementPosition = this.getNewDrawPosition();
        const timeObject = new TimeObject(this, {waitTime: time}, newElementPosition, parentScene);
        this.selectedGameElement = timeObject;
        return timeObject;
    }

    makeOperation(operand, parentScene = this.expandedScenes[this.expandedScenes.length - 1]) {
        const newElementPosition = this.getNewDrawPosition();
        const operationObject = new OperationObject(this, operand, newElementPosition, parentScene);
        operationObject.onMouseClick();
        this.selectedGameElement = operationObject;
        return operationObject;
    }

    mouseDoubleClicked(pos) {
        console.log(pos);
    }

    expandScene(scene) {
        this.selectedGameElement?.unSelected();
        this.selectedGameElement = undefined;

        const parentIndex = this.expandedScenes.indexOf(scene.parentScene);

        this.expandedScenes[parentIndex + 1]?.unExpandScene();

        scene.gameElements.forEach((element) => {
            element.parentSceneExpanded();
            this.addUIElementSprite(element.UILineSprite);
        });
        
        this.expandedScenes.push(scene);
    }

    unExpandScene(scene) {
        if(this.expandedScenes.length === 1) return console.log("can't unexpand the base scene");
        if(this.expandedScenes.indexOf(scene) === -1) return console.log("scene not expanded");
        const bottomExpandedScene = this.expandedScenes.pop();
        this.removeExpandedElements(bottomExpandedScene);
        bottomExpandedScene.expanded = false;
        bottomExpandedScene.UILineSprite.expanded = false;
        if(scene !== bottomExpandedScene) bottomExpandedScene.parentScene.unExpandScene();
    }

    mouseMoveEvent(e) {
        if (e.target.classList[0] === "level-editor-canvas") {
            
            this.currentMousePos = [e.offsetX, e.offsetY];
            if(this.UIElementMouseFollower) {

                const moveToPosition = [e.offsetX - this.draggingLineSprite.widthHeight[0] / 2, e.offsetY - this.draggingLineSprite.widthHeight[1] / 2];
                this.draggingLineSprite.UITransform.pos = [...moveToPosition];
                // check if the element is overlapping with another element
                const bottomExpandedScene = this.expandedScenes[this.expandedScenes.length - 1];

                const draggedElementSceneIndex = bottomExpandedScene.gameElements.indexOf(this.UIElementMouseFollower);
                if(draggedElementSceneIndex === -1) return;


                const leftElementIndex = draggedElementSceneIndex - 1;
                const rightElementIndex = draggedElementSceneIndex + 1;

                const draggedElementXPosition = this.draggingLineSprite.UITransform.pos[0];
                const draggedElementWidth = this.draggingLineSprite.widthHeight[0];

                // check left element:
                let moved = false;
                if(leftElementIndex >= 0) {
                    const leftElement = bottomExpandedScene.gameElements[leftElementIndex];
                    const leftElementWidth = leftElement.widthHeight[0];
                    const leftElementX = leftElement.UITransform.pos[0];
                    const leftElementMiddlePosition = leftElementX + leftElementWidth / 2;

                    
                    if (
                        draggedElementXPosition < leftElementMiddlePosition &&
                        draggedElementXPosition + draggedElementWidth > leftElementMiddlePosition
                    ) {
                        this.moveLeft(this.UIElementMouseFollower);
                        moved = true;
                        // swap position of ghost element and 
                    }
                        
                    
                }

                // check right:
                if( rightElementIndex < bottomExpandedScene.gameElements.length && moved === false) {
                    const rightElement = bottomExpandedScene.gameElements[rightElementIndex];
                    const rightElementWidth = rightElement.widthHeight[0];
                    const rightElementX = rightElement.UITransform.pos[0];
                    const rightElementMiddlePosition = rightElementX + rightElementWidth / 2;

                    
                    if (
                        draggedElementXPosition < rightElementMiddlePosition &&
                        draggedElementXPosition + draggedElementWidth > rightElementMiddlePosition
                    ) {
                        this.moveRight(this.UIElementMouseFollower);
                        // swap position of ghost element and 
                    }
                }
                
            }
        } else {
            this.currentMousePos = undefined;
        }
    }

    getExpandedScenePosition() {
        // expands into next row
    }

    leftJustifyGameElements() {
        const bottomExpandedScene = this.expandedScenes[this.expandedScenes.length - 1];
        const expandedElements = bottomExpandedScene.gameElements;
        bottomExpandedScene.gameElements = [];

        expandedElements.forEach((element) => {
            const newPos = this.getNewDrawPosition();
            element.UITransform.pos = newPos;
            bottomExpandedScene.gameElements.push(element);
        });
    }

    makeLoop(loop, parentScene = this.expandedScenes[this.expandedScenes.length - 1]) {
        const beginningObject = new LoopBeginningObject(this, undefined, this.getNewDrawPosition(), parentScene);
        const endObject = new LoopEndObject(this, loop, this.getNewDrawPosition(), parentScene);
        beginningObject.endLoopObject = endObject;
        endObject.beginningLoopObject = beginningObject;
    }

    makeLoopBeginning(loop, parentScene) {
        const loopBeginning = new LoopBeginningObject(this, undefined, this.getNewDrawPosition(), parentScene);
        this.loopBeginningObjectStackForLoading.push(loopBeginning);
        return loopBeginning;
    }

    makeLoopEnding(loop, parentScene) {
        const loopEndObject = new LoopEndObject(this, loop, this.getNewDrawPosition(), parentScene);
        const matchingBeginning = this.loopBeginningObjectStackForLoading.pop();
        matchingBeginning.endLoopObject = loopEndObject;
        loopEndObject.beginningLoopObject = matchingBeginning;
        return loopEndObject;
    }

    moveLeft(UIElement) {
        const gameElements = this.expandedScenes[this.expandedScenes.length - 1].gameElements;
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
        const gameElements = this.expandedScenes[this.expandedScenes.length - 1].gameElements;
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

    saveGameDesign() {

        const gameElements = this.gameElements.map(
            (element) => element.serialize() 
        );

        this.serializedGame = {
            gameName: "Game",
            gameElements,
        };
        console.log(JSON.stringify(this.serializedGame));
    }

    

    loadGameDesign(json) {
        const serializedGame = JSON.parse(json);
        this.serializedGame = serializedGame;
        this.gameElements = this.loadGameElements(serializedGame.gameElements);
    }

    loadGameElements(gameElements, parentScene = this) {
        return gameElements.map((element) => {
            if(element.type === "Scene") {
                const newScene = this.makeScene(element.name, parentScene);
                this.expandedScenes.push(newScene);
                newScene.gameElements = this.loadGameElements(element.gameElements, newScene) || [];
                newScene.unExpandScene();
                return newScene;
            } else if(element.type === "Event") {
                return this.makeEvent(element, parentScene);
            } else if(element.type === "Time") {
                return this.makeTime(element.waitTime, parentScene);
            } else if(element.type === "LoopBeginning") {
                return this.makeLoopBeginning(element, parentScene);
            } else if (element.type === "LoopEnd") {
                return this.makeLoopEnding(element, parentScene);
            } else if (element.type === "Operation") {
                return this.makeOperation(element.operand, parentScene);
            }
        });
    }

    makeEvent(eventToLoad, parentScene = this.expandedScenes[this.expandedScenes.length - 1]) {
        // should provide this the current scene to know which array of elements to use
        const newElementPosition = this.getNewDrawPosition();
        
        const event = new EventObject(this, eventToLoad, newElementPosition, parentScene);
        this.selectedGameElement?.unSelected();
        this.selectedGameElement = event;
        return event;
    }
    
    swapAdjacentPositions(leftUIElement, rightUIElement) {
        const newLeftX = leftUIElement?.UITransform?.pos[0] || 0;
        const newRightX = newLeftX + rightUIElement?.widthHeight[0] + 4;
        leftUIElement.UITransform.pos[0] = newRightX;
        rightUIElement.UITransform.pos[0] = newLeftX;
    }

    getNewDrawPosition() {
        const bottomExpandedScene = this.expandedScenes[this.expandedScenes.length - 1];
        const expandedElements = bottomExpandedScene.gameElements;
        const lastElement = expandedElements[expandedElements.length - 1];
        const lastXPosition = lastElement?.UITransform?.pos[0] || 0;
        const lastYPosition = lastElement?.UITransform?.pos[1] || bottomExpandedScene.widthHeight[1] + bottomExpandedScene.UITransform.pos[1] + 4;
        const lastWidth = lastElement?.widthHeight[0] || 0;
  
        return [lastXPosition + lastWidth + 4, lastYPosition];
    }

    makeScene(name, visible = true, parentScene = this.expandedScenes[this.expandedScenes.length - 1]) {
        // this should add a box inside either the game sequence as a whole,
        // or inside the current scene
        let newElementPosition;
        if(visible) {
            newElementPosition = this.getNewDrawPosition();
        }
        
        // sprites are made and added automatically
        return(new SceneObject(this, name, parentScene, newElementPosition));
    }

    loopSelected(loop) {
        this.selectedGameElement?.unSelected();
        this.selectedGameElement = loop;
    }

    timeSelected(time) {
        this.selectedGameElement?.unSelected();
        this.selectedGameElement = time;
    }

    operationSelected(operation) {
        this.selectedGameElement?.unSelected();
        this.selectedGameElement = operation;
    }

    eventSelected(event) {
        this.selectedGameElement?.unSelected();
        this.selectedGameElement = event;
        this.shipRelative.checked = event.isShipRelative;
    }

    eventUnselected() {
        this.currentEnemyPlacer?.remove();
        this.currentEnemyPlacer = undefined;
    }

    enemyPlacerClicked(enemyPlacer) {
        this.animationView.clear();
        this.animationView.addEnemy(enemyPlacer.type);
        this.animationView.enemySelected(enemyPlacer.spawn);
        this.currentEnemyPlacer = enemyPlacer;
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

    escapePressed() {
        // I want this to stop placing an enemy
        // or if there's nothing placing, then clear the animation view
        // 
        this.currentEnemyPlacer?.remove();
        this.animationView.clear();
        this.currentEnemyPlacer = undefined;
    }

    addEnemy(type) {
        this.animationView.clear();
        this.animationView.addEnemy(type);

        this.currentEnemyPlacer?.remove();
        if(this.selectedGameElement.enemyPlacers) {
            this.currentEnemyPlacer = this.selectedGameElement.createEnemyPlacer(type);
        } else {
            throw Error('event should be selected to add an enemy');
        }
    }

    addAnotherEnemy(type) {
        if(this.selectedGameElement.enemyPlacers) {
            this.currentEnemyPlacer = this.selectedGameElement.createEnemyPlacer(type);
        } else {
            throw Error('event should be selected to add another enemy');
        }
    }

    // might be redundent and useless TODO
    downClick() {
        this.clickedDown = true;
    }

    unClicked() {
        if(this.UIElementMouseFollower) {
            this.UIElementMouseFollower.elementLetGo();
            this.UIElementMouseFollower = undefined;
        }
        this.clickedDown = false;
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

    addRandomRandomSpawnToEvent(spawn, ) {
        if(this.selectedGameElement.enemyPlacers) {
            this.selectedGameElement?.addRandomRandom(new Spawn(spawn, this.engine));
        }
    }

    addSpawnToEvent(spawn, enemyPlacer) {
        if(this.selectedGameElement.enemyPlacers) {
            this.selectedGameElement?.addSpawn(new Spawn(spawn, this.engine));
            if(enemyPlacer) this.selectedGameElement?.addEnemyPlacer(enemyPlacer);
        }
        this.enemyPlaced(spawn);
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
            const lineSpriteIndex = this.lineSprites.indexOf(gameObject.lineSprite);
            if (lineSpriteIndex > -1) this.lineSprites.splice(lineSpriteIndex, 1); 
        }
        const index = this.gameObjects.indexOf(gameObject);
        if (index !== -1) this.gameObjects.splice(index, 1);
    }

    removeExpandedElements(expandedScene) {
        const UIElements = expandedScene.gameElements;
        UIElements.forEach((UIElement) => {
            UIElement.parentSceneUnexpanded();
            if(UIElement.UILineSprite) {
                const index = this.UIElementSprites.indexOf(UIElement.UILineSprite);
                if(index !== -1) this.UIElementSprites.splice(index, 1);
            }
        });
    }

    removeUIElementSprite(UILineSprite) {
        const index = this.UIElementSprites.indexOf(UILineSprite);
        if (index !== -1) this.UIElementSprites.splice(index, 1);
    }

    removeUIElement(element) {
        const index = this.gameElements.indexOf(element);
        if (index !== -1) this.gameElements.splice(index, 1);
    }

    addUIElementSprite(UILineSprite) {
        this.UIElementSprites.push(UILineSprite);
    }

    addUIElement(UIElement) {
        const bottomExpandedScene = this.expandedScenes[this.expandedScenes.length - 1];
        bottomExpandedScene.gameElements.push(UIElement);
    }

    addLineSprite(lineSprite) {
        this.lineSprites.push(lineSprite);
    }

    makeCoordinatesShipRelative() {
        this.selectedGameElement?.makeCoordinatesShipRelative();
    }

    eventLoadShipRelative(isRelative) {
        this.shipRelative.checked = isRelative;
        console.log('loading ship',this.shipRelative);
    }
            
    makeCoordinatesArenaRelative() {
        this.selectedGameElement?.makeCoordinatesArenaRelative();
    }

}
