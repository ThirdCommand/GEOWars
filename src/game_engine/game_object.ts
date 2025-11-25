// import { Util } from "./util";
// import { Sound } from "./sound";

import { Transform } from "./transform";
import { PhysicsComponent, ReplayablePhysicsComponent } from "./physics_component";
import { type LineSprite } from "./line_sprite";
import { Collider } from "./collider";
import { Sound } from "./sound";
import { GameEngine } from "./game_engine";
import { AnimationView } from "../AnimationView";
import { Camera } from "./camera";

interface controllable {
    updateXButtonListener: (pressed: boolean) => void;
    updateRightControlStickInput: (direction: [number, number]) => void;
    updateLeftControlStickInput: (direction: [number, number] | string, pressed: boolean | null) => void; // will accept WASD or controller left stick input
    updateStartButtonListener: (pressed: boolean) => void;
    updateMousePos: (mousePos: [number, number]) => void;
}


export abstract class GameObject implements controllable{
    gameEngine: GameEngine | AnimationView;
    camera: Camera | null;
    transform: Transform;
    childObjects: Array<GameObject> | null;
    parentObject: GameObject | null;
    physicsComponent: PhysicsComponent | null;
    lineSprite: LineSprite | null;
    colliders: Array<Collider>;
    isControllable: boolean = false;
    isFocussedGameObject: boolean = false;

    replayablePhysicsComponent: ReplayablePhysicsComponent | null = null;

    constructor(engine: GameEngine | AnimationView) {
        this.gameEngine = engine;
        this.gameEngine.addGameObject(this);
        this.transform = new Transform();
        this.childObjects = [];
        this.physicsComponent = null;
        this.lineSprite = null;
        this.parentObject = null;
        this.colliders = [];
    }

    abstract animate(dT: number): void 

    addPhysicsComponent() {
        this.physicsComponent = new PhysicsComponent(this.transform);
        this.gameEngine.addPhysicsComponent(this.physicsComponent);
    }

    addReplayablePhysicsComponent() {
        this.replayablePhysicsComponent = new ReplayablePhysicsComponent(this.transform);
        this.gameEngine.addReplayablePhysicsComponent(this.replayablePhysicsComponent);
    }

    setAsControllableGameObject() {
        if(this.gameEngine instanceof GameEngine) {
            this.isControllable = true;
            this.gameEngine.addControllableGameObject(this);
        }
    }

    makeFocussedGameObject(){
        if(this.gameEngine instanceof GameEngine) {
            this.isFocussedGameObject = true;
            this.gameEngine.focusControllableGameObject(this);
        }
    }
 
    addLineSprite(lineSprite: LineSprite) {
        this.lineSprite = lineSprite;
        this.gameEngine.addLineSprite(this.lineSprite);
    }

    addMousePosListener() {
        if(this.gameEngine instanceof GameEngine)
            this.gameEngine.addMouseListener(this);
    }

    removeMousePosListener() {
        if(this.gameEngine instanceof GameEngine)
            this.gameEngine.removeMouseListener(this);
    }

    addLeftControlStickListener(isControllableGameObject: boolean = true) {
        if(this.gameEngine instanceof GameEngine)
            this.gameEngine.addLeftControlStickListener(this);
    }

    addLeftControlStickFocussedListener() {
        // only listens when focussed on
        if(this.gameEngine instanceof GameEngine)
            this.gameEngine.addLeftControlStickFocussedListener(this);
    }

    addRightControlStickListener() {
        if(this.gameEngine instanceof GameEngine)
            this.gameEngine.addRightControlStickListener(this);
    }

    addXButtonListener() {
        if(this.gameEngine instanceof GameEngine)
            this.gameEngine.addXButtonListener(this);
    }

    addBButtonListener() {
        if(this.gameEngine instanceof GameEngine)
            this.gameEngine.addBButtonListener(this);
    }

    addLKeyListener() {
        if(this.gameEngine instanceof GameEngine)
            this.gameEngine.addLKeyListener(this)
    }
    addKKeyListener() {
        if(this.gameEngine instanceof GameEngine)
            this.gameEngine.addKKeyListener(this)
    }
    addCKeyListener() {
          if(this.gameEngine instanceof GameEngine)
            this.gameEngine.addCKeyListener(this)
    }
    addOKeyListener() {
          if(this.gameEngine instanceof GameEngine)
            this.gameEngine.addOKeyListener(this)
    }
    addBKeyListener() {
          if(this.gameEngine instanceof GameEngine)
            this.gameEngine.addBKeyListener(this)
    }
    addMKeyListener() {
          if(this.gameEngine instanceof GameEngine)
            this.gameEngine.addMKeyListener(this)
    }
    addJKeyListener() {
        if(this.gameEngine instanceof GameEngine)
            this.gameEngine.addJKeyListener(this)
    }
    addFKeyListener() {
        if(this.gameEngine instanceof GameEngine)
            this.gameEngine.addFKeyListener(this)
    }
    addSKeyListener() {
        if(this.gameEngine instanceof GameEngine)
            this.gameEngine.addSKeyListener(this)
    }



    addStartButtonListener() {
        if(this.gameEngine instanceof GameEngine)
            this.gameEngine.addStartButtonListener(this);
    }
    updateKKeyListener(pressed: boolean) { console.log('overwrite updateKKeyListener');}
    updateFKeyListener(pressed: boolean) { console.log('overwrite updateFKeyListener');}
    updateCKeyListener(pressed: boolean) { console.log('overwrite updateCKeyListener');}
    updateOKeyListener(pressed: boolean) { console.log('overwrite updateOKeyListener');}
    updateJKeyListener(pressed: boolean) { console.log('overwrite updateJKeyListener');}
    updateSKeyListener(pressed: boolean) { console.log('overwrite updateSKeyListener');}
    updateLKeyListener(pressed: boolean) { console.log('overwrite updateLKeyListener');}
    updateBKeyListener(pressed: boolean) { console.log('overwrite updateBKeyListener');}
    updateMKeyListener(pressed: boolean) { console.log('overwrite updateMKeyListener');}
    
    updateBButtonListener(pressed: boolean) { console.log('overwrite updateBButtonListener for functionality'); }

    updateRightControlFocussedStickInput(direction: [number, number]) {console.log(direction, 'overwrite updateRightControlFocussedStickInput');} // TODO include object name

    updateLeftControlFocussedStickInput(direction: [number, number] | string, pressed: boolean | null) {console.log(direction, pressed, 'overwrite updateLeftControlFocussedStickInput');} // TODO include object name;

    updateRightControlStickInput(direction: [number, number]){return console.log(direction, 'overwrite updateRightControlStickInput');} // TODO include object name

    updateLeftControlStickInput(direction: [number, number] | string, pressed: boolean | null){return console.log(direction,pressed,  'overwrite updateLeftControlStickInput');} // TODO include object name

    updateXButtonListener(pressed: boolean){return console.log(pressed, `overwrite updateXButtonListener`);} // TODO include object name

    updateStartButtonListener(pressed: boolean) {return console.log(pressed, 'overwrite updateStartButtonListener');} // TODO include object name

    updateMousePos(mousePos: [number, number]){ return console.log(mousePos, 'overwrite updateMousePos');} // TODO include object name

    updateFocussedMousePos(mousePos: [number, number]){ return console.log(mousePos, 'overwrite updateFocussedMousePos');} // TODO include object name

    addClickListener() {
        if(this.gameEngine instanceof GameEngine) 
            this.gameEngine.addClickListener(this);
    }

    removeClickListener() {
        if(this.gameEngine instanceof GameEngine)
            this.gameEngine.removeClickListener(this);
    }

    mouseClicked(mousePos: [number, number]){return console.log(mousePos, 'overwrite mouseClicked'); }// TODO include object name
    mouseDowned(mousePos: [number, number]){return console.log(mousePos, 'overwrite mouseDowned'); }// TODO include object name
    mouseDoubleClicked(mousePos: [number, number]){return console.log(mousePos, 'overwrite mouseDoubleClicked'); }// TODO include object name

    addCollider(type: string, gameObject: GameObject, radius: number): void;
    addCollider(type: string, gameObject: GameObject, radius: number, subscriptionTypes: string[], subscriptions: string[]): void;
    addCollider(
        type: string, 
        gameObject: GameObject, 
        radius: number, 
        subscriptionTypes?: string[], 
        subscriptions?: string[]
    ) {
    // game engine checks every collider with it's subscription types
        const newCollider = new Collider(
            type,
            gameObject,
            radius,
            subscriptionTypes,
            subscriptions
        );
        this.colliders.push(newCollider);
        this.gameEngine.addCollider(newCollider);
    }

    playSound(soundURL: string) {
        this.gameEngine.queueSound(soundURL);
    }

    // relative motion needs to be fixed... FOR ANOTHER TIME
    addChildGameObject(obj: GameObject) {
        this.childObjects.push(obj);
        // if (relative) {
        //     obj.transform.parentTransform = this.transform;
        // }
        obj.parentObject = this;
    }

    abstract update(deltaTime: number): void

    onCollision?(collider: Collider, type: string): void

    removeMouseListeners() {
        if(this.gameEngine instanceof GameEngine) {
            this.gameEngine.removeMouseListener(this);
            this.gameEngine.removeClickListener(this);
            this.gameEngine.removeDoubleClickListener(this);
        }
    }

    remove(singularRemove=true) {
        this.childObjects.forEach((obj) => {
            obj.remove(false);
        });
        if (singularRemove && this.parentObject) {
            const index = this.parentObject.childObjects.indexOf(this);
            if(index !== -1) this.parentObject.childObjects.splice(index, 1);
        }
        this.gameEngine.remove(this);
    }
}
