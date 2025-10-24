import {SceneObject, SerializedGameElement, type GameElementObject} from "./DesignElements/Scene";
import {type OperationObject} from "./DesignElements/Operation";
import {type TimeObject} from "./DesignElements/Time";
import {type LineSprite} from "../line_sprite";
import {type UIElement} from "../UI_Element";
import {type GameScript, type GameEngine} from "../game_engine";
import {type EnemyPlacer} from "./LevelDesign/EnemyPlacer";
import {type EventObject} from "./DesignElements/Event";

export interface LevelDesigner extends GameScript {
    timeSelected: (time: TimeObject) => void;
    sceneSelected: (sceneObject: SceneObject) => void;
    expandScene: (sceneObject: SceneObject) => void;
    openLevelDesigner: () => void;
    unExpandScene: (sceneObject: SceneObject) => void;
    operationSelected: (operation: OperationObject) => void;
    moveLeft: (gameElement: GameElementObject) => void;
    moveRight: (gameElement: GameElementObject) => void;
    loopSelected: (gameElement: GameElementObject) => void;
    addUIElement: (gameElement: GameElementObject) => void;
    addUIElementSprite: (lineSprite: LineSprite) => void;
    addMouseClickListener: (uiElement: UIElement) => void;
    addMouseDoubleClickListener: (uiElement: UIElement) => void;
    removeMouseClickListener: (uiElement: UIElement) => void;
    removeMouseDoubleClickListener: (uiElement: UIElement) => void;
    removeUIElementSprite: (lineSprite: LineSprite) => void;
    UIElementMouseFollower: GameElementObject;
    isLevelDesignerOpened: boolean;
    eventLoadShipRelative: (isShipRelative: boolean) => void;
    engine: GameEngine
    // make more generic in the future
    addingAnotherEnemy: (gameObjectPlacer: EnemyPlacer) => void;
    enemyPlacerClicked: (gameObjectPlacer: EnemyPlacer) => void;
    eventSelected: (event: EventObject) => void;
    eventUnselected: () => void;
    // what this do?
    updateAnimationViewAngle: (angle: number) => void;
    animate: (timeDelta: number) => void;
    loadGameElements: (serializedGameElements: SerializedGameElement[], sceneObject: SceneObject) => GameElementObject[];
    downClick: () => void;
    unClicked: () => void;
    updateMouseMoveEvent: (e: MouseEvent) => void;
}