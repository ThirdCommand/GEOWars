import { UIElement } from "../../UI_Element";
import { UILineSprite } from "../../UI_line_sprite";
import { Transform } from "../../transform";

import {EnemyPlacer, spriteMap} from "../LevelDesign/EnemyPlacer";
import {Spawn} from "./Spawn";

// maybe this is what is created from the serialized version
export class Event {
    constructor(spawns, parentScene, isShipRelative, gameEngine) { 
        // not sure what the type is for spawns here
        this.type = 'Event';
        this.parentScene = parentScene;
        this.numberFactor = 1;
        this.isShipRelative = isShipRelative;
        // I think I'll have to create the spawns from the serialized data given here
        this.spawns = spawns.map((spawn) => new Spawn(spawn, gameEngine)); // this is different than the single spawn thing I have in the mock data
        // okay now I'm thoroughly confused. I think I have a plain javascript object as spawns, and also
    }

    update() {
        this.spawnEverything();
        this.endEvent();
    }

    spawnEverything() {
        this.spawns.forEach((spawn) => {
            spawn.spawnEvent(this.numberFactor, this.isShipRelative);
        });
    }
    
    endEvent() {
        this.parentScene.nextElement();
    }

    resetToStartingValues() {
        this.numberFactor = 1;
    }
}

// this is what is created by the UI
// but it will also have to be created by the serialized data
export class EventObject extends UIElement {
    constructor(levelDesigner, eventToLoad, position, parentScene) {
        super(levelDesigner, position, parentScene);
        this.spawns = [];
        this.enemyPlacers = [];
        this.selectedSpawns = [];
        this.spawnSprites = {Pinwheel: 0, BoxBox: 0, Arrow: 0, Grunt: 0, Weaver: 0, Singularity: 0, AlienShip: 0, RANDOM: 0};
        this.widthHeight = [80, 40];
        this.clickRadius = 20;
        this.addMouseClickListener();
        this.isShipRelative = false;
        
        if(eventToLoad) {
            eventToLoad.spawns.forEach((spawn) => this.addSpawn({spawn}));
            this.isShipRelative = eventToLoad.isShipRelative;
        }
        this.addUIElementSprite(new EventObjectSprite(this.UITransform, this.spawnSprites, this.widthHeight));
        this.levelDesigner.eventLoadShipRelative(this.isShipRelative);
    }

    addAnotherEnemy(type) {
        this.levelDesigner.addAnotherEnemy(type);
    }

    addSpawnToEvent(spawn, enemyPlacer) {
        this.addSpawn(new Spawn(spawn, this.engine));
        if(enemyPlacer) this.addEnemyPlacer(enemyPlacer);
        this.levelDesigner.enemyPlaced(spawn);
    }

    removePlacer(enemyPlacer) {
        this.spawns = this.spawns.filter((spawn) => spawn !== enemyPlacer.spawn);
        this.enemyPlacers = this.enemyPlacers.filter((placer) => placer !== enemyPlacer);
    }

    // copy and paste should be supported
    copy() {
        return this.levelDesigner.addToClipBoard(new EventObject(this.levelDesigner, this.serialize()));
    }

    copySelectedSpawns() {
        // I imagine shift click and then copy, and past
    }

    copyLineSpriteForDragging() {
        const draggingSpriteTransform = new Transform(null, [this.UITransform.pos[0], this.UITransform.pos[1]]);
        return new EventObjectSprite(draggingSpriteTransform, this.spawnSprites, this.widthHeight);
    }

    // this shit needs work
    deleteSelectedSpawns() {
        this.selectedSpawns.forEach((spawn) => {
            this.deleteSpawn(spawn);
        });
    }

    deleteYourShit() {
        this.spawns = [];
        this.enemyPlacers.forEach((placer) => (placer.remove()));
        this.enemyPlacers = [];
    }

    deleteSelectedEnemyPlacers() {
    }

    makeCoordinatesShipRelative() {
        this.isShipRelative = true;
    }

    makeCoordinatesArenaRelative() {
        this.isShipRelative = false;
    }

    loadSpawns() {
        this.spawns.forEach((spawn) => {
            // pretty sure this is a serialized spawn....
            const enemyPlacer = new EnemyPlacer(this.levelDesigner.engine, spawn, this.levelDesigner, true);
            enemyPlacer.addMouseClickListener();
            this.enemyPlacers.push(enemyPlacer);
        });
    }

    // copied into engine's clipboard
    pasteCopiedSpawns(spawns) {
        spawns.forEach((spawn) => (this.addSpawn(spawn)));
    }

    serialize() {  
        return {
            type: 'Event',
            spawns: this.spawns,
            isShipRelative: this.isShipRelative
        };
    }

    loadEvent(event) {
        event.spawns.forEach((spawn) => this.addSpawn({spawn}));
    }

    addSpawn(spawn) {
        this.spawns.push(spawn.spawn);
        this.spawnSprites[spawn.spawn.type] += 1;
    }

    enemyPlacerClicked(enemyPlacer) {
        this.levelDesigner.enemyPlacerClicked(enemyPlacer);
    }

    addRandomRandom(spawn) {
        const randomRandomAdded = this.spawns.find((spawny) => spawny.type === 'RANDOM');
        if(randomRandomAdded) {
            randomRandomAdded.possibleSpawns = spawn.spawn.possibleSpawns;
            randomRandomAdded.numberToGenerate = spawn.spawn.numberToGenerate;
            const enemyPlacer = this.enemyPlacers.find((enemyPlacer) => (enemyPlacer.type === 'RANDOM'));
            enemyPlacer.spawn.numberToGenerate = spawn.spawn.numberToGenerate;
            enemyPlacer.spawn.possibleSpawns = spawn.spawn.possibleSpawns;
        } else {
            this.spawns.push(spawn.spawn);
            const enemyPlacer = new EnemyPlacer(
                this.levelDesigner.engine, 
                {
                    location: 'RANDOM', 
                    type: 'RANDOM', 
                    numberToGenerate: spawn.spawn.numberToGenerate, 
                    possibleSpawns: spawn.spawn.possibleSpawns
                }, 
                this.levelDesigner, 
                true
            );
            this.spawnSprites[spawn.spawn.type] += 1;
            this.addEnemyPlacer(enemyPlacer);
        }
    }

    createEnemyPlacer(type) {
        return new EnemyPlacer(this.levelDesigner.engine, {type}, this);
    }

    addEnemyPlacer(enemyPlacer) {
        this.enemyPlacers.push(enemyPlacer);
    }

    deleteSpawn(spawn) {
        const index = this.spawns.indexOf(spawn);
        if(index !== -1)  {
            this.spawns.splice(index, 1);
            this.spawnSprites[spawn.type] -= 1;
        }
    }

    deleteEnemyPlacer(enemyPlacer) {
        const index = this.enemyPlacers.indexOf(enemyPlacer);
        if(index !== -1) {
            this.enemyPlacers.splice(index, 1);
        }
    }

    onMouseClick(mousePos) {
        console.log('event object mouse click');
        this.levelDesigner.eventSelected(this);
        this.loadSpawns();
        this.UILineSprite.selected = true;
    }

    unSelected() {
        this.enemyPlacers.forEach((enemyPlacer) => enemyPlacer.eventUnselected());
        this.levelDesigner.eventUnselected();
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
        this.selected = true;
        this.expanded = true;
        this.spawnSprites = spawnSprites;
        this.widthHeight = widthHeight;

        this.firstPosition = [10,10];
        this.secondPosition = [30,10];
        this.thirdPosition = [50,10];

        this.fourthPosition = [10,30];
        this.fifthPosition = [30,30];
        this.sixthPosition = [50,30];

        this.seventhPosition = [70,10];

        this.spawnSpriteMap = {
            BoxBox: spriteMap['BoxBox'](new Transform(null, this.firstPosition)),
            Arrow: spriteMap['Arrow'](new Transform(null, this.secondPosition)),
            Grunt: spriteMap['Grunt'](new Transform(null, this.thirdPosition)),

            Pinwheel: spriteMap['Pinwheel'](new Transform(null, this.fourthPosition)),
            Weaver: spriteMap['Weaver'](new Transform(null, this.fifthPosition)),
            Singularity: spriteMap['Singularity'](new Transform(null, this.sixthPosition)),
            RANDOM: spriteMap['RANDOM'](new Transform(null, this.seventhPosition)),
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

        ctx.fillRect(0, 0, w, h);

        ctx.lineWidth = this.selected ? 3 : 1;
        ctx.strokeStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(w,0);
        ctx.lineTo(w,h);
        ctx.lineTo(0,h);
        ctx.closePath();
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
        const RandomRandomSprite = this.spawnSpriteMap['RANDOM'];

        this.spawnSprites.BoxBox > 0 ? BoxBoxSprite.makeVisible() : BoxBoxSprite.makeInvisible();
        this.spawnSprites.Arrow > 0 ? ArrowSprite.makeVisible() : ArrowSprite.makeInvisible();
        this.spawnSprites.Grunt > 0 ? GruntSprite.makeVisible() : GruntSprite.makeInvisible();

        this.spawnSprites.Pinwheel > 0 ? PinwheelSprite.makeVisible() : PinwheelSprite.makeInvisible();
        this.spawnSprites.Weaver > 0 ? WeaverSprite.makeVisible() : WeaverSprite.makeInvisible();
        this.spawnSprites.Singularity > 0 ? SingularitySprite.makeVisible() : SingularitySprite.makeInvisible();

        this.spawnSprites.RANDOM > 0 ? RandomRandomSprite.makeVisible() : RandomRandomSprite.makeInvisible();


        BoxBoxSprite.draw(ctx);
        ArrowSprite.draw(ctx);
        GruntSprite.draw(ctx);

        PinwheelSprite.draw(ctx);
        WeaverSprite.draw(ctx);
        SingularitySprite.draw(ctx);

        RandomRandomSprite.draw(ctx);
    }
}

