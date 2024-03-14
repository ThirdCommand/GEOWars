import { UIElement } from "../../UI_Element";
import { UILineSprite } from "../../UI_line_sprite";
import { Transform } from "../../transform";

import {EnemyPlacer, spriteMap} from "../LevelDesign/EnemyPlacer";

// maybe this is what is created from the serialized version
export class Event {
    constructor(gameSequence, spawns) {
        this.gameSequence = gameSequence;
        this.spawns = spawns; // this is different than the single spawn thing I have in the mock data
    }

    // should find way to handle groups told to spawn at random locations

    update() {
        this.spawnEverything();
        this.endEvent();
    }
    spawnEverything() {
        this.spawns.forEach((spawn) => {
            spawn.spawnEvent();
        });
    }
    endEvent() {
        this.gameSequence.nextSequence();
    }
}

// maybe this is what is created by the UI
// but it will also have to be created by the serialized data
export class EventObject extends UIElement {
    constructor(levelDesigner, eventToLoad, position) {
        super(levelDesigner, position);
        this.spawns = [];
        this.enemyPlacers = [];
        this.selectedSpawns = [];
        this.spawnSprites = {Pinwheel: 0, BoxBox: 0, Arrow: 0, Grunt: 0, Weaver: 0, Singularity: 0, AlienShip: 0};
        this.widthHeight = [80, 40];
        this.clickRadius = 20;
        this.addMouseClickListener();

        if(eventToLoad) {
            eventToLoad.spawns.forEach((spawn) => this.addSpawn(spawn));
        }
        this.addUIElementSprite(new EventObjectSprite(this.UITransform, this.spawnSprites, this.widthHeight));
    }

    // copy and paste should be supported
    copy() {
        return this.levelDesigner.addToClipBoard(new EventObject(this.levelDesigner, this.serialize()));
    }

    copySelectedSpawns() {
        // I imagine shift click and then copy, and past
    }

    deleteSelectedSpawns() {

    }

    loadSpawns() {
        this.spawns.forEach((spawn) => {
            this.enemyPlacers.push(new EnemyPlacer(this.levelDesigner.engine, spawn.type, this.levelDesigner, true, spawn.location));
        });
    }

    // copied into engine's clipboard
    pasteCopiedSpawns(spawns) {
        spawns.forEach((spawn) => (this.addSpawn(spawn)));
    }

    serialize() {  
        return {
            type: 'Event',
            spawns: this.spawns.map((spawn) => spawn.serialize())
        };
    }

    addSpawn(spawn) {
        console.log('adding spawn', spawn.spawn);
        this.spawns.push(spawn.spawn);
        this.spawnSprites[spawn.spawn.type] += 1;
    }

    addEnemyPlacer(enemyPlacer) {
        this.enemyPlacers.push(enemyPlacer);
    }

    deleteSpawn(spawn) {
        this.spawns.splice(this.spawns.indexOf(spawn), 1);
        this.spawnSprites[spawn.type] -= 1;
    }

    onMouseClick(mousePos) {
        console.log('event object mouse click');
        this.levelDesigner.eventSelected(this);
        this.loadSpawns();
        this.UILineSprite.selected = true;
    }

    unSelected() {
        this.enemyPlacers.forEach((enemyPlacer) => enemyPlacer.eventUnselected());
        this.UILineSprite.selected = false;
    }
    onMouseDoubleClicked(mousePos) {
        console.log('yay mouse double clicked here');
    }

    update() {
    }
}

export class EventObjectSprite extends UILineSprite {
    constructor(UITransform, spawnSprites, widthHeight) {
        super(UITransform);
        this.spawnSprites = spawnSprites;
        this.widthHeight = widthHeight;

        this.firstPosition = [10,10];
        this.secondPosition = [30,10];
        this.thirdPosition = [50,10];

        this.fourthPosition = [10,30];
        this.fifthPosition = [30,30];
        this.sixthPosition = [50,30];

        this.spawnSpriteMap = {
            BoxBox: spriteMap['BoxBox'](new Transform(null, this.firstPosition)),
            Arrow: spriteMap['Arrow'](new Transform(null, this.secondPosition)),
            Grunt: spriteMap['Grunt'](new Transform(null, this.thirdPosition)),

            Pinwheel: spriteMap['Pinwheel'](new Transform(null, this.fourthPosition)),
            Weaver: spriteMap['Weaver'](new Transform(null, this.fifthPosition)),
            Singularity: spriteMap['Singularity'](new Transform(null, this.sixthPosition)),
        };

        // change the sprites to have spawning scale be 0.5
        Object.keys(this.spawnSpriteMap).forEach((key) => {
            this.spawnSpriteMap[key].spawningScale = 0.5;
        });
    }



    draw(ctx) {
        const pos = this.UITransform.pos;
        ctx.save();
        ctx.translate(pos[0], pos[1]);

        this.drawFunction(ctx);
        ctx.restore();
    }

    drawFunction(ctx) {
        const h = this.widthHeight[1];
        const w = this.widthHeight[0];

        ctx.fillStyle = "#000000";

        if(this.selected) ctx.fillStyle = "#419ef0";
        ctx.rect(0, 0, w, h);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#FFFFFF";
        ctx.stroke();

        // should add Alien too
        // BoxBox, then Pinwheel, then Grunt, then Arrow, then Weaver, then Singularity

        // BoxBox location: 5,5
        // Grunt location: 10,5
        // Arrow location: 15,5
        const BoxBoxSprite = this.spawnSpriteMap['BoxBox'];
        const ArrowSprite = this.spawnSpriteMap['Arrow'];
        const GruntSprite = this.spawnSpriteMap['Grunt'];

        const PinwheelSprite = this.spawnSpriteMap['Pinwheel'];
        const WeaverSprite = this.spawnSpriteMap['Weaver'];
        const SingularitySprite = this.spawnSpriteMap['Singularity'];

        this.spawnSprites.BoxBox > 0 ? BoxBoxSprite.makeVisible() : BoxBoxSprite.makeInvisible();
        this.spawnSprites.Arrow > 0 ? ArrowSprite.makeVisible() : ArrowSprite.makeInvisible();
        this.spawnSprites.Grunt > 0 ? GruntSprite.makeVisible() : GruntSprite.makeInvisible();

        this.spawnSprites.Pinwheel > 0 ? PinwheelSprite.makeVisible() : PinwheelSprite.makeInvisible();
        this.spawnSprites.Weaver > 0 ? WeaverSprite.makeVisible() : WeaverSprite.makeInvisible();
        this.spawnSprites.Singularity > 0 ? SingularitySprite.makeVisible() : SingularitySprite.makeInvisible();

        BoxBoxSprite.draw(ctx);
        ArrowSprite.draw(ctx);
        GruntSprite.draw(ctx);

        PinwheelSprite.draw(ctx);
        WeaverSprite.draw(ctx);
        SingularitySprite.draw(ctx);
    }
}

