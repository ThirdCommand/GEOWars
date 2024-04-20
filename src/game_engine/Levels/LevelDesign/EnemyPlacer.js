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
import { GruntSprite } from "../../../game_objects/enemies/Grunt/grunt_sprite";
import { PinwheelSprite } from "../../../game_objects/enemies/Pinwheel/pinwheel_sprite";
import { WeaverSprite } from "../../../game_objects/enemies/Weaver/weaver_sprite";
import { SingularitySprite } from "../../../game_objects/enemies/Singularity/singularity_sprite";
import { RandomRandomSprite } from "../../../game_objects/enemies/RandomRandom";
import { Util } from "../../util";

// should add Alien too
export const spriteMap = {
    BoxBox: (transform) => {
        const _BoxBoxSprite = new BoxBoxSprite(transform);
        _BoxBoxSprite.spawning = true;
        return _BoxBoxSprite;
    },
    Arrow: (transform) => new ArrowSprite(transform),
    Grunt: (transform) => new GruntSprite(transform),
    Pinwheel: (transform) => new PinwheelSprite(transform),
    Weaver: (transform) => new WeaverSprite(transform),
    Singularity: (transform) => new SingularitySprite(transform),
    RANDOM: (transform) => new RandomRandomSprite(transform),
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
};

export class EnemyPlacer extends GameObject {
    constructor(engine, spawn, event, loadingEvent) {
        super(engine);
        const {type, location, numberToGenerate, possibleSpawns, angle} = spawn;
        this.addLineSprite(spriteMap[type](this.transform));
        this.event = event;
        this.clickRadius = getClickRadius[type];
        this.type = type;
        
        if(loadingEvent) {
            if(location === "RANDOM") {
                this.transform.pos[0] = 500;
                this.transform.pos[1] = 500;
                this.spawn = {type: "RANDOM", location: "RANDOM", numberToGenerate, possibleSpawns};
                this.addMouseClickListener();
            } else {
                this.transform.pos[0] = location[0];
                this.transform.pos[1] = location[1];
                this.transform.angle = angle;
                this.spawn = spawn;
            }   
            this.originalClickComplete = true;
        } else {
            this.originalClickComplete = false;
            this.addChildGameObject(new PlacingAnimation(this.gameEngine));
        }
    }

    place() {
        this.spawn = {type: this.type, location: this.transform.pos};
        const spawn = this.spawn;
        this.event.addSpawnToEvent(spawn, this);
        this.removeMousePosListener();
        this.addMouseClickListener();
    }

    setCoordinates(x, y, angle) {
        const radiansAngle = angle * Math.PI / 180;
        this.transform.pos[0] = x || this.transform.pos[0];
        this.transform.pos[1] = y || this.transform.pos[1];
        this.transform.angle = radiansAngle || this.transform.angle;
        this.spawn.angle = radiansAngle || this.spawn.angle;
    }

    setRandomCoordinates() {
        this.transform.pos[0] = this.gameEngine.gameScript.DIM_X * 0.85 * Math.random();
        this.transform.pos[1] = this.gameEngine.gameScript.DIM_Y * 0.85 * Math.random();
        this.transform.angle = Math.random() * Math.PI * 2;
        this.spawn.angle = this.transform.angle;
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
        this.gameEngine.addClickListener(this);
    }


    mouseClicked(mousePos) {
        const centerDist = Util.dist(
            this.transform.pos,
            mousePos
        );
        if (centerDist < this.clickRadius) {
            this.onMouseClick(mousePos);
        }
    }

    onMouseClick(mousePos) {
        if (this.originalClickComplete) {
            this.event.enemyPlacerClicked(this);
        } else {
            this.originalClickComplete = true;
        }
    }



}

