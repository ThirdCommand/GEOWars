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
};

// if trying to spawn multiple things on top of each other, I should only grab the first placer that is found in the click colission
const getClickRadius = {
    BoxBox: 10,
    Arrow: 10,
    Grunt: 10,
    Pinwheel: 10,
    Weaver: 10,
    Singularity: 10,
};

export class EnemyPlacer extends GameObject {
    constructor(engine, type, levelDesigner, loadingEvent, position) {
        super(engine);
        this.addLineSprite(spriteMap[type](this.transform));
        this.levelDesigner = levelDesigner;
        this.clickRadius = getClickRadius[type];
        this.type = type;
        

        if(!loadingEvent) {
            this.originalClickComplete = false;
            this.addChildGameObject(new PlacingAnimation(this.gameEngine));
        } else {
            this.transform.pos[0] = position[0];
            this.transform.pos[1] = position[1];
            this.originalClickComplete = true;
        }
        // click collider should be added after placed
    }

    place() {
        this.spawn = {type: this.type, location: this.transform.pos};
        const spawn = this.spawn;
        this.levelDesigner.addSpawnToEvent(spawn, this);
        this.levelDesigner.enemyPlaced(spawn);
        this.removeMousePosListener();
        this.addMouseClickListener();

    }

    eventUnselected() {
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
            this.levelDesigner.enemyPlacerClicked(this);
        } else {
            this.originalClickComplete = true;
        }
    }



}

