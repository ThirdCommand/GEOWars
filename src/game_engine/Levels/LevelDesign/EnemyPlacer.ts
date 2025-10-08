// while placing, could do spawning animation over mouse position
// once placed, draw it at the placed location
// store the location

// maybe I need a nested canvas for the pallet

// load spawn event
// save spawn event
// create spawn event
import { GameObject } from "../../game_object";

import { PlacingAnimation } from "./PlacingAnimation";
import { BoxBoxSprite } from "../../../game_objects/enemies/BoxBox/boxbox_sprite";
import { ArrowSprite } from "../../../game_objects/enemies/Arrow/arrow_sprite";
import { GruntSprite } from "../../../game_objects/enemies/Grunt/grunt";
import { PinwheelSprite } from "../../../game_objects/enemies/Pinwheel/pinwheel";
import { WeaverSprite } from "../../../game_objects/enemies/Weaver/weaver";
import { SingularitySprite } from "../../../game_objects/enemies/Singularity/singularity_sprite";
import { RandomRandomSprite } from "../../../game_objects/enemies/RandomRandom";
import { VectorMath } from "../../util";
import { type Transform } from "../../transform";
import { type GameEngine } from "../../game_engine";
import { type EventObject } from "../DesignElements/Event";
import { EnemyType, type SpawnSerialized } from "../DesignElements/Spawn";
import { DIM_X, DIM_Y } from "../../../GEOWarsScript";
import {AlienShipSprite } from "../../../game_objects/enemies/Singularity/alien_ship";

// should add Alien too
export const spriteMap = {
    BoxBox: (transform: Transform) => {
        const _BoxBoxSprite = new BoxBoxSprite(transform);
        _BoxBoxSprite.spawning = true;
        return _BoxBoxSprite;
    },
    Arrow: (transform: Transform) => new ArrowSprite(transform),
    Grunt: (transform: Transform) => new GruntSprite(transform),
    Pinwheel: (transform: Transform) => new PinwheelSprite(transform),
    Weaver: (transform: Transform) => new WeaverSprite(transform),
    AlienShip: (transform: Transform) => new AlienShipSprite(transform),
    Singularity: (transform: Transform) => new SingularitySprite(transform),
    RANDOM: (transform: Transform) => new RandomRandomSprite(transform),
};

// if trying to spawn multiple things on top of each other, I should only grab the first placer that is found in the click colission
const getClickRadius = {
    BoxBox: 10,
    Arrow: 10,
    Grunt: 10,
    Pinwheel: 10,
    Weaver: 10,
    Singularity: 10,
    RANDOM: 10,
    AlienShip: 10,
};

export class EnemyPlacer extends GameObject {
    isPlaced: boolean;
    event: EventObject;
    serializedSpawn: SpawnSerialized;
    clickRadius: number;
    type: EnemyType;
    constructor(engine: GameEngine, spawnData: SpawnSerialized, event: EventObject, isLoadingEvent: boolean = false) {
        super(engine);
        const {type, location, numberToGenerate, possibleSpawns, angle} = spawnData;
        this.addLineSprite(spriteMap[type](this.transform));
        this.event = event;
        this.clickRadius = getClickRadius[type];
        this.type = type;
        this.isPlaced = false;
        
        if(isLoadingEvent) {
            this.isPlaced = true;
            if(location === "RANDOM") {
                this.transform.pos[0] = 500;
                this.transform.pos[1] = 500;
                this.serializedSpawn = {type: "RANDOM", location: "RANDOM", numberToGenerate, possibleSpawns};
                this.addMouseClickListener();
            } else {
                this.transform.pos[0] = location[0];
                this.transform.pos[1] = location[1];
                this.transform.angle = angle;
                this.serializedSpawn = spawnData;
            }   
        } else {
            this.addChildGameObject(new PlacingAnimation(this.gameEngine));
        }
    }

    place() {
        if(this.isPlaced) return;
        this.serializedSpawn = {
            type: this.type, 
            location: [
                this.transform.pos[0], 
                this.transform.pos[1]
            ]
        };
        // this.lineSprite.spawningScale = 1; dont think this does anything
        this.isPlaced = true;
        this.event.enemyPlaced(this.serializedSpawn, this);

        this.removeMousePosListener();
        this.addMouseClickListener();
    }

    animate() {}

    update() {}

    setCoordinates(x: number, y: number, angle: number) {
        const radiansAngle = angle * Math.PI / 180;
        this.transform.pos[0] = x || this.transform.pos[0];
        this.transform.pos[1] = y || this.transform.pos[1];
        this.transform.angle = radiansAngle || this.transform.angle;
        this.serializedSpawn.angle = radiansAngle || this.serializedSpawn.angle;
        this.event.levelDesigner.updateAnimationViewAngle(radiansAngle);
    }

    setRandomCoordinates() { 
        this.transform.pos[0] = DIM_X * 0.85 * Math.random();
        this.transform.pos[1] = DIM_Y * 0.85 * Math.random();
        this.transform.angle = Math.random() * Math.PI * 2;
        this.serializedSpawn.angle = this.transform.angle;
    }

    eventUnselected() {
        this.remove();
    }

    removeFromEvent() {
        if(this.event) {
            this.event.removePlacer(this);
        }
        this.remove();
    }

    addMouseClickListener() {
        this.addClickListener();
    }

    mouseClicked(mousePos: [number, number]) {
        const centerDist = VectorMath.dist(
            this.transform.pos,
            mousePos
        );
        if (centerDist < this.clickRadius) {
            this.onMouseClick();
        }
    }

    onMouseClick() {
        this.event.enemyPlacerClicked(this);
    }

}

