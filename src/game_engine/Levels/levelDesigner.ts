import {SceneObject, SerializedGameElement, type GameElementObject, SceneSerialized} from "./DesignElements/Scene";
import {Operand, OperationObject} from "./DesignElements/Operation";
import {TimeObject} from "./DesignElements/Time";
import {type LineSprite} from "../line_sprite";
import {type UIElement} from "../UI_Element";
import {type GameScript, type GameEngine} from "../game_engine";
import {type EnemyPlacer} from "./LevelDesign/EnemyPlacer";
import {EventObject, EventSerialized} from "./DesignElements/Event";
import { AnimationView } from "../../AnimationView";
import { GameObject } from "../game_object";
import { LoopBeginningObject, LoopEndObject, LoopValues } from "./DesignElements/Loop";
import { Overlay } from "../../game_objects/Overlay/overlay";
import { GameElementObjectType, Spawn, SpawnSerialized } from "./DesignElements/Spawn";
import { type Sound } from "../sound";

// export interface LevelDesigner extends GameScript {
//     UIElementMouseFollower: GameElementObject;
//     isLevelDesignerOpened: boolean;
//     engine: GameEngine
//     timeSelected: (time: TimeObject) => void;
//     sceneSelected: (sceneObject: SceneObject) => void;
//     expandScene: (sceneObject: SceneObject) => void;
//     openLevelDesigner: () => void;
//     unExpandScene: (sceneObject: SceneObject) => void;
//     operationSelected: (operation: OperationObject) => void;
//     moveLeft: (gameElement: GameElementObject) => void;
//     moveRight: (gameElement: GameElementObject) => void;
//     loopSelected: (gameElement: GameElementObject) => void;
//     addUIElement: (gameElement: GameElementObject) => void;
//     addUIElementSprite: (lineSprite: LineSprite) => void;
//     addMouseClickListener: (uiElement: UIElement) => void;
//     addMouseDoubleClickListener: (uiElement: UIElement) => void;
//     removeMouseClickListener: (uiElement: UIElement) => void;
//     removeMouseDoubleClickListener: (uiElement: UIElement) => void;
//     removeUIElementSprite: (lineSprite: LineSprite) => void;
    
//     eventLoadShipRelative: (isShipRelative: boolean) => void;
    
//     // make more generic in the future
//     addingAnotherEnemy: (gameObjectPlacer: EnemyPlacer) => void;
//     enemyPlacerClicked: (gameObjectPlacer: EnemyPlacer) => void;
//     eventSelected: (event: EventObject) => void;
//     eventUnselected: () => void;
//     // what this do?
//     updateAnimationViewAngle: (angle: number) => void;
//     animate: (timeDelta: number) => void;
//     loadGameElements: (serializedGameElements: SerializedGameElement[], sceneObject: SceneObject) => GameElementObject[];
//     downClick: () => void;
//     unClicked: () => void;
//     updateMouseMoveEvent: (e: MouseEvent) => void;
// }



// I can make a new type that adds more fields as needed for genericizing
export abstract class LevelDesigner implements GameScript{
    serializedGame: SceneSerialized;

    UIElementMouseFollower: GameElementObject;
    UIElementSprites: LineSprite[];
    currentMousePos: [number, number];

    // duck typing for scene
    baseScene: SceneObject; // top level scene containing all the game elements
    expandedScenes: SceneObject[];

    widthHeight: [number, number];

    loopBeginningObjectStackForLoading: LoopBeginningObject[];

    DIM_X = 1200;
    DIM_Y = 300;
    BG_COLOR = "#000000";
    engine: GameEngine;
    animationView: AnimationView;
    levelDesignerCtx: CanvasRenderingContext2D;
    score: 0;
    lives: 99;

    UIActionsToRun: Array<() => void>;
    // TODO: not sure what this is for
    ctx: CanvasRenderingContext2D;

    gameObjects: GameObject[];
    lineSprites: LineSprite[];
    zoomScale: number;

    lastTime: 0;

    overlayText = {
        Location: [0, 0],
        Time: 0,
        Type: "",
        StartingAngle: 0,
    };

    overlayTextCleared = true;
    clickedDown: boolean;

    // palletModal = getPalletModal();

    // can be scene, time, event, or loop
    selectedGameElement: GameElementObject;

    // TODO: genericize this in the future
    currentEnemyPlacer: EnemyPlacer;

    isLevelDesignerOpened = false;

    shipRelative: HTMLInputElement;
    constructor(
        engine: GameEngine, 
        animationView: AnimationView, 
        levelDesignerCtx: CanvasRenderingContext2D, 
        serializedGame?: SceneSerialized
    ) {
        this.engine = engine;
        this.animationView = animationView;

        // I think I need one for the animation window too
        this.ctx = this.engine.ctx;
        this.levelDesignerCtx = levelDesignerCtx;

        this.serializedGame = serializedGame;
        this.UIElementSprites = [];

        // duck typing for scene
        this.expandedScenes = [];
        // this is added to expanded Scenes off the bat. Check addUIElement
        this.baseScene = new SceneObject(this, 'main'); // top level list of game elements


        this.widthHeight = [0,0];

        this.loopBeginningObjectStackForLoading = [];

        
        this.animationView = animationView;
        this.levelDesignerCtx = levelDesignerCtx;

        this.UIActionsToRun = [];



        this.gameObjects = [];
        this.lineSprites = [];

        // might not need this:
        this.zoomScale = 1;
        

        this.lastTime = 0;
        this.animate = this.animate.bind(this);
        this.overlayText = {
            Location: [0, 0],
            Time: 0,
            Type: "",
            StartingAngle: 0,
        };
        this.overlayTextCleared = true;

        // can be scene, time, event, or loo
        this.selectedGameElement;

        this.currentEnemyPlacer;
    

        this.isLevelDesignerOpened = false;
        

    }

    startGame(gameScript: GameScript) {console.log('this should be overrided')}

    openLevelDesigner(){console.log('overwrite openLevelDesigner')}

    makeTime(time: number, parentScene = this.expandedScenes[this.expandedScenes.length - 1]) {
        const newElementPosition = this.getNewDrawPosition();
        const timeObject = new TimeObject(this, time, newElementPosition, parentScene);
        this.selectedGameElement = timeObject;
        return timeObject;
    }

    makeOperation(operand: Operand, parentScene = this.expandedScenes[this.expandedScenes.length - 1]) {
        const newElementPosition = this.getNewDrawPosition();
        const operationObject = new OperationObject(this, operand, newElementPosition, parentScene);
        operationObject.onMouseClick();
        this.selectedGameElement = operationObject;
        return operationObject;
    }

    mouseDoubleClicked(pos: [number, number]) {
        console.log(pos);
    }

    expandScene(scene: SceneObject) {
        this.selectedGameElement?.unSelected();
        this.selectedGameElement = undefined;

        const parentIndex = this.expandedScenes.indexOf(scene.parentScene);
        if(parentIndex !== -1) this.expandedScenes[parentIndex + 1]?.unExpandScene();

        scene.gameElementObjects.forEach((element) => {
            element.parentSceneExpanded();
            this.addUIElementSprite(element.UILineSprite);
        });
        
        this.expandedScenes.push(scene);
    }

    unExpandScene(scene: SceneObject) {
        const expandedIndex = this.expandedScenes.indexOf(scene);
        if(expandedIndex === 0) return console.log("can't unexpand the base scene");
        if(expandedIndex === -1) return console.log("scene not expanded");

        scene.expanded = false;
        scene.UILineSprite.expanded = false;
        
        const bottomExpandedScene = this.expandedScenes.pop();
        this.removeExpandedElements(bottomExpandedScene);
        bottomExpandedScene.expanded = false;
        bottomExpandedScene.UILineSprite.expanded = false;
        if(scene !== bottomExpandedScene) bottomExpandedScene.parentScene.unExpandScene();
    }

    updateMouseMoveEvent(e: MouseEvent) {
        if (e.target instanceof HTMLElement && e.target.classList[0] === "level-editor-canvas") {
            
            this.currentMousePos = [e.offsetX, e.offsetY];
            if(this.UIElementMouseFollower) {

                const moveToPosition: [number, number] = [
                    e.offsetX - this.UIElementMouseFollower.draggingLineSprite.widthHeight[0] / 2, 
                    e.offsetY -  this.UIElementMouseFollower.draggingLineSprite.widthHeight[1] / 2
                ];

                this.UIElementMouseFollower.draggingLineSprite.transform.pos = [...moveToPosition];
                // check if the element is overlapping with another element
                const bottomExpandedScene = this.expandedScenes[this.expandedScenes.length - 1];

                const draggedElementSceneIndex = bottomExpandedScene.gameElementObjects.indexOf(this.UIElementMouseFollower);
                if(draggedElementSceneIndex === -1) return;


                const leftElementIndex = draggedElementSceneIndex - 1;
                const rightElementIndex = draggedElementSceneIndex + 1;

                const draggedElementXPosition =  this.UIElementMouseFollower.draggingLineSprite.transform.pos[0];
                const draggedElementWidth =  this.UIElementMouseFollower.draggingLineSprite.widthHeight[0];

                // check left element:
                let moved = false;
                if(leftElementIndex >= 0) {
                    const leftElement = bottomExpandedScene.gameElementObjects[leftElementIndex];
                    const leftElementWidth = leftElement.widthHeight[0];
                    const leftElementX = leftElement.transform.pos[0];
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
                if( rightElementIndex < bottomExpandedScene.gameElementObjects.length && moved === false) {
                    const rightElement = bottomExpandedScene.gameElementObjects[rightElementIndex];
                    const rightElementWidth = rightElement.widthHeight[0];
                    const rightElementX = rightElement.transform.pos[0];
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
        const expandedElements = bottomExpandedScene.gameElementObjects;
        bottomExpandedScene.gameElementObjects = [];

        expandedElements.forEach((element) => {
            const newPos = this.getNewDrawPosition();
            element.transform.pos = newPos;
            bottomExpandedScene.gameElementObjects.push(element);
        });
    }

    makeLoop(loop: LoopValues, parentScene = this.expandedScenes[this.expandedScenes.length - 1]) {
        const beginningObject = new LoopBeginningObject(this, this.getNewDrawPosition(), parentScene);
        const endObject = new LoopEndObject(this, loop, this.getNewDrawPosition(), parentScene);
        beginningObject.endLoopObject = endObject;
        endObject.beginningLoopObject = beginningObject;
    }

    makeLoopBeginning(parentScene: SceneObject) {
        const loopBeginning = new LoopBeginningObject(this, this.getNewDrawPosition(), parentScene);
        this.loopBeginningObjectStackForLoading.push(loopBeginning);
        return loopBeginning;
    }

    makeLoopEnding(loop: LoopValues, parentScene: SceneObject) {
        const loopEndObject = new LoopEndObject(this, loop, this.getNewDrawPosition(), parentScene);
        const matchingBeginning = this.loopBeginningObjectStackForLoading.pop();
        matchingBeginning.endLoopObject = loopEndObject;
        loopEndObject.beginningLoopObject = matchingBeginning;
        return loopEndObject;
    }

    moveLeft(UIElement: GameElementObject) {
        const gameElements = this.expandedScenes[this.expandedScenes.length - 1].gameElementObjects;
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

    moveRight(UIElement: GameElementObject) {
        const gameElements = this.expandedScenes[this.expandedScenes.length - 1].gameElementObjects;
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

        const serializedGameElements = this.baseScene.gameElementObjects.map(
            (element) => element.serialize() 
        );

        // TODO
        // I should name it after the game itself, that way both games can load this way
        // might as well add a level name too
        this.serializedGame = {
            type: "Scene",
            name: "Game",
            serializedGameElements,
        };
        console.log(JSON.stringify(this.serializedGame));
    }

    

    loadGameDesign(json: string) {
        const serializedGame = JSON.parse(json);
        this.serializedGame = serializedGame;
        this.baseScene = new SceneObject(this, 'main');
        this.expandedScenes = [this.baseScene];
        this.baseScene.gameElementObjects = this.loadGameElements(serializedGame.serializedGameElements, this.baseScene);
    }

    loadGameElements(serializedGameElements: SerializedGameElement[], parentScene: SceneObject): GameElementObject[] {
        return serializedGameElements.map((serializedElement) => {
            if(serializedElement.type === "Scene") {
                // might be broken, not sure if should be visible or not
                const newScene = this.makeSceneObject(serializedElement.name, true, parentScene);
                this.expandedScenes.push(newScene);
                newScene.gameElementObjects = this.loadGameElements(serializedElement.serializedGameElements, newScene) || [];
                newScene.unExpandScene();
                return newScene;
            } else if(serializedElement.type === "Event") {
                return this.makeEventObject(serializedElement, parentScene);
            } else if(serializedElement.type === "Time") {
                return this.makeTime(serializedElement.waitTime, parentScene);
            } else if(serializedElement.type === "LoopBeginning") {
                return this.makeLoopBeginning(parentScene);
            } else if (serializedElement.type === "LoopEnd") {
                return this.makeLoopEnding(serializedElement, parentScene);
            } else if (serializedElement.type === "Operation") {
                return this.makeOperation(serializedElement.operand, parentScene);
            }
        });
    }

    makeEventObject(eventToLoad?: EventSerialized, parentScene: SceneObject = this.expandedScenes[this.expandedScenes.length - 1]): EventObject {
        // should provide this the current scene to know which array of elements to use
        const newElementPosition = this.getNewDrawPosition();
        
        const event = new EventObject(this, eventToLoad, newElementPosition, parentScene);
        this.selectedGameElement?.unSelected();
        this.selectedGameElement = event;
        return event;
    }
    
    swapAdjacentPositions(leftUIElement: UIElement, rightUIElement: UIElement) {
        const newLeftX = leftUIElement?.transform?.pos[0] || 0;
        const newRightX = newLeftX + rightUIElement?.widthHeight[0] + 4;
        leftUIElement.transform.pos[0] = newRightX;
        rightUIElement.transform.pos[0] = newLeftX;
    }

    getNewDrawPosition(): [number, number] {
        const bottomExpandedScene = this.expandedScenes[this.expandedScenes.length - 1];
        const expandedElements = bottomExpandedScene.gameElementObjects;
        const lastElement = expandedElements[expandedElements.length - 1];
        const lastXPosition = lastElement?.transform?.pos[0] || 0;
        const lastYPosition = lastElement?.transform?.pos[1] || bottomExpandedScene.widthHeight[1] + bottomExpandedScene.transform.pos[1] + 4;
        const lastWidth = lastElement?.widthHeight[0] || 0;
    
        return [lastXPosition + lastWidth + 4, lastYPosition];
    }

    makeSceneObject(name: string, visible = true, parentScene = this.expandedScenes[this.expandedScenes.length - 1]) {
        // this should add a box inside either the game sequence as a whole,
        // or inside the current scene
        let newElementPosition;
        if(visible) {
            newElementPosition = this.getNewDrawPosition();
        }
        
        // sprites are made and added automatically
        return(new SceneObject(this, name, parentScene, newElementPosition));
    }

    loopSelected(loop: GameElementObject) {
        this.selectedGameElement?.unSelected();
        this.selectedGameElement = loop;
    }

    timeSelected(time: TimeObject) {
        this.selectedGameElement?.unSelected();
        this.selectedGameElement = time;
    }

    operationSelected(operation: OperationObject) {
        this.selectedGameElement?.unSelected();
        this.selectedGameElement = operation;
    }

    eventSelected(event: EventObject) {
        this.selectedGameElement?.unSelected();
        this.selectedGameElement = event;
        this.shipRelative.value = event.isShipRelative.toString();
    }

    eventUnselected() {
        this.currentEnemyPlacer?.remove();
        this.currentEnemyPlacer = undefined;
    }

    enemyPlacerClicked(enemyPlacer: EnemyPlacer) {
        this.animationView.enemyPlacerSelected(enemyPlacer);
        this.currentEnemyPlacer = enemyPlacer;
    }

    sceneDoubleClicked(scene: SceneObject) {
        // this should open the array of elements in the scene
        console.log("scene double clicked: ", scene);
        // should move this into scene object
        // this.selectedScene.UILineSprite.selected = false;
        // this.selectedScene = scene;
        // scene.UILineSprite.selected = true;
    }

    sceneSelected(scene: SceneObject) {
        this.selectedGameElement?.unSelected();
        this.selectedGameElement = scene;
    }

    // getPalletModal() {
    //     const modal = document.getElementById("pallet");
    //     // add functions to buttons of the pallet
    // }

    // enemyPlaced(spawn) {
    //     this.animationView.enemyPlaced(spawn);
    // }

    escapePressed() {
        if(this.currentEnemyPlacer && !this.currentEnemyPlacer.isPlaced) {
            this.currentEnemyPlacer?.remove();
        }
        this.UIElementSprites.forEach((sprite) => (sprite as GameElementObject['UILineSprite']).selected = false);
        
        this.animationView.clear();
        this.currentEnemyPlacer = undefined;
    }

    addLevelGameObject(type: GameElementObjectType) {
        this.animationView.clear();
        this.animationView.addEnemy(type);

        this.currentEnemyPlacer?.remove();
        if(this.selectedGameElement instanceof EventObject) {
            this.currentEnemyPlacer = this.selectedGameElement.createEnemyPlacer(type);
        } else {
            throw Error('event should be selected to add an enemy');
        }
    }

    updateAnimationViewAngle(radiansAngle: number) {
        this.animationView.gameObjects[0].transform.angle = radiansAngle;
    }

    addingAnotherEnemy(enemyPlacer: EnemyPlacer) {
        this.currentEnemyPlacer = enemyPlacer;
    }

    // might be redundent and useless TODO
    downClick() {
        this.clickedDown = true;
    }

    unClicked() {
        if(this.UIElementMouseFollower) {
            this.UIElementMouseFollower.elementLetGo();
            this.removeUIElementSprite(this.UIElementMouseFollower.draggingLineSprite);
            this.UIElementMouseFollower = null;
        }
        this.clickedDown = false;
    }

    addMouseClickListener(object: UIElement) {
        this.engine.addLevelDesignerClickListener(object);
    }
    addMouseDoubleClickListener(object: UIElement) {
        this.engine.addLevelDesignerDoubleClickListener(object);
    }

    removeMouseClickListener(object: UIElement) {
        this.engine.removeLevelDesignerClickListener(object);
    }
    removeMouseDoubleClickListener(object: UIElement) {
        this.engine.removeLevelDesignerDoubleClickListener(object);
    }
    

    createOverlay() {
        return new Overlay(this.engine, this);
    }

    animate(timeDelta: number) {
        // it might be cool to animate the tiny enemies in the spawn card
        // this.animateGameObjects(timeDelta);

        this.clearCanvas();
        this.runUIActions();
        this.renderLineSprites(this.levelDesignerCtx);
        this.renderUILineSprites(this.levelDesignerCtx);
        this.renderOverlayText();
    }

    animateGameObjects() {
        // this.gameObjects.forEach((object) => {
        //     object.animate(delta);
        // });
    }

    // addToClipBoard(uiElement: UIElement) {

    // }

    clearCanvas() {
        this.levelDesignerCtx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
        this.levelDesignerCtx.fillStyle = "#000000";
        this.levelDesignerCtx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
    }

    clear() {
        const removeList = [...this.gameObjects];
        removeList.forEach((gameObject) => {
            this.remove(gameObject);
        });
        this.overlayTextCleared = true;
    }

    runUIActions() {
        this.UIActionsToRun.forEach((action) => action());
        this.UIActionsToRun = [];
    }

    renderLineSprites(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.scale(this.zoomScale, this.zoomScale);
        this.lineSprites.forEach((sprite) => {
            sprite.draw(ctx);
        });
        ctx.restore();
    }

    renderUILineSprites(ctx: CanvasRenderingContext2D) {
        ctx.save();
        this.UIElementSprites.forEach((sprite) => {
            sprite.draw(ctx);
        });
        ctx.restore();
    }

    addGameObject(gameObject: GameObject) {
        this.gameObjects.push(gameObject);
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

    remove(gameObject: GameObject) {
        if (gameObject.lineSprite) {
            const lineSpriteIndex = this.lineSprites.indexOf(gameObject.lineSprite);
            if (lineSpriteIndex > -1) this.lineSprites.splice(lineSpriteIndex, 1); 
        }
        const index = this.gameObjects.indexOf(gameObject);
        if (index !== -1) this.gameObjects.splice(index, 1);
    }

    removeExpandedElements(expandedScene: SceneObject) {
        const UIElements = expandedScene.gameElementObjects;
        UIElements.forEach((UIElement) => {
            UIElement.parentSceneUnexpanded();
            if(UIElement.UILineSprite) {
                const index = this.UIElementSprites.indexOf(UIElement.UILineSprite);
                if(index !== -1) this.UIElementSprites.splice(index, 1);
            }
        });
    }

    removeUIElementSprite(UILineSprite: LineSprite) {
        const index = this.UIElementSprites.indexOf(UILineSprite);
        if (index !== -1) this.UIElementSprites.splice(index, 1);
    }

    removeUIElement(element: GameElementObject) {
        const index = this.baseScene.gameElementObjects.indexOf(element);
        if (index !== -1) this.baseScene.gameElementObjects.splice(index, 1);
    }

    addUIElementSprite(UILineSprite: LineSprite) {
        this.UIElementSprites.push(UILineSprite);
    }

    addUIElement(UIElement: GameElementObject) {
        const bottomExpandedScene = this.expandedScenes[this.expandedScenes.length - 1];
        if(!bottomExpandedScene && UIElement instanceof SceneObject) {
            setTimeout(() => UIElement.expandScene());
            // this.expandedScenes.push(UIElement);
        } else {
            bottomExpandedScene.gameElementObjects.push(UIElement);
        }
    }

    addLineSprite(lineSprite: LineSprite) {
        this.lineSprites.push(lineSprite);
    }

    makeCoordinatesShipRelative() {
        if(this.selectedGameElement instanceof EventObject)
            this.selectedGameElement.makeCoordinatesShipRelative();
    }

    eventLoadShipRelative(isRelative: boolean) {
        if(this.shipRelative) {
            this.shipRelative.checked = isRelative;
        }
    }
            
    makeCoordinatesArenaRelative() {
        if(this.selectedGameElement instanceof EventObject)
            this.selectedGameElement?.makeCoordinatesArenaRelative();
    }

    // this needs to be generalized. GEOWars adds a spawner, striketime doesn't
    addRandomRandomSpawnToEvent(spawnData: SpawnSerialized) {
        if(this.selectedGameElement instanceof EventObject) {
            this.selectedGameElement?.addRandomRandom(new Spawn(spawnData, this.engine));
        }
    }

    onPause: () => {};
    onUnPause: () => {}; 
    gameTime: 0; 
    theme: Sound;
    update(deltaTime: number) {};

}