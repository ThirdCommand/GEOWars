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
        if(eventToLoad) {
            this.spawns = [eventToLoad.spawns];
        }
    }

    //copy and paste should be supported

    copy() {
        return new EventObject(this.engine, this.serialize());
    }

    serialize() {  
        return {
            spawns: this.spawns.map((spawn) => spawn.serialize())
        };
    }

    addSpawn(spawn) {
        this.spawns.push(spawn);
    }

    deleteSpawn(spawn) {
        this.spawns.splice(this.spawns.indexOf(spawn), 1);
    }

    update(timeDelta) {
        this.event.update(timeDelta);
    }
}

export class EventObjectSprite extends LineSprite {
    constructor(transform, engine) {
        super(transform, engine);
    }

    draw(ctx) {
        // rectangle for now
        // include list of other spawn objects and spawn them
    }
}

