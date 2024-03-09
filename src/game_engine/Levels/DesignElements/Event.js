import { GameObject } from "../../game_object";
import { LineSprite } from "../../line_sprite";

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
export class EventObject extends GameObject {
    constructor(engine, eventToLoad) {
        super(engine);
        this.spawns = [];
        this.selectedSpawns = [];
        this.spawnSprites = {Pinwheel: 0, BoxBox: 0, Arrow: 0, Grunt: 0, Weaver: 0, Singularity: 0, AlienShip: 0};
        if(eventToLoad) {
            eventToLoad.spawns.forEeach((spawn) => this.addSpawn(spawn));
        }
        this.addLineSprite(new EventObjectSprite(this.transform, this.engine, this.spawnSprites));
    }

    // copy and paste should be supported
    copy() {
        return this.engine.addToClipBoard(new EventObject(this.engine, this.serialize()));
    }

    copySelectedSpawns() {
        // I imagine shift click and then copy, and past
    }

    deleteSelectedSpawns() {

    }

    // copied into engine's clipboard
    pasteCopiedSpawns(spawns) {
        spawns.forEach((spawn) => (this.addSpawn(spawn)));
    }

    serialize() {  
        return {
            spawns: this.spawns.map((spawn) => spawn.serialize())
        };
    }

    addSpawn(spawn) {
        this.spawns.push(spawn);
        this.spawnSprites[spawn.type] += 1;
    }

    deleteSpawn(spawn) {
        this.spawns.splice(this.spawns.indexOf(spawn), 1);
        this.spawnSprites[spawn.type] -= 1;
    }

    update() {
    }
}

export class EventObjectSprite extends LineSprite {
    constructor(transform, engine, spawnSprites) {
        super(transform, engine);
        this.spawnSprites = spawnSprites;
    }

    draw(ctx) {
        // I'll need the position of the parent scene
        // or that's handled by the scene draw... hmm
        const sceneWidthOffset = 5;
        const sceneWidth = ctx.canvas.width - sceneWidthOffset;
        const height = ctx.canvas.height;
        const eventSpacings = 5;
        ctx.fillStyle = "#0000FF";
        ctx.fillRect(sceneWidthOffset + eventSpacings, 0, sceneWidth -(eventSpacings + sceneWidthOffset) , height);
        ctx.stroke();
        // rectangle for now
        // include list of other spawn objects and spawn them
    }
}

