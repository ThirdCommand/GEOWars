import { UIElement } from "../../UI_Element";
import { Transform } from "../../transform";

import {EnemyPlacer} from "../LevelDesign/EnemyPlacer";
import {GEOEnemyType, GameElementObjectType, Spawn, StrikeTimeLevelGameObjectType, type SpawnSerialized} from "./Spawn";

import {type UpdateAble, type Scene, type SceneObject } from "./Scene";
import { type LevelDesigner } from "../LevelDesigner";
import { type GameEngine } from "../../game_engine";
import { LineSprite } from "../../line_sprite";

import { BoxBoxSprite } from "../../../game_objects/enemies/BoxBox/boxbox_sprite";
import { ArrowSprite } from "../../../game_objects/enemies/Arrow/arrow_sprite";
import { GruntSprite } from "../../../game_objects/enemies/Grunt/grunt";
import { PinwheelSprite } from "../../../game_objects/enemies/Pinwheel/pinwheel";
import { WeaverSprite } from "../../../game_objects/enemies/Weaver/weaver";
import { SingularitySprite } from "../../../game_objects/enemies/Singularity/singularity_sprite";
import { RandomRandomSprite } from "../../../game_objects/enemies/RandomRandom";
import {AlienShipSprite } from "../../../game_objects/enemies/Singularity/alien_ship";
import { AuroraSprite } from "../../../game_objects/StrikeTime/Aurora/Aurora";
import { Building1Sprite } from "../../../game_objects/StrikeTime/Buildings/Building1";
import { TargetBuildingSprite } from "../../../game_objects/StrikeTime/Buildings/TargetBuilding";
import { PatriotMissileSiteSprite } from "../../../game_objects/StrikeTime/Enemies/PatriotMissileSite";

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

    Aurora: (transform: Transform) => new AuroraSprite(transform),
    Building: (transform: Transform) => new Building1Sprite(transform),
    TargetBuilding: (transform: Transform) => new TargetBuildingSprite(transform),   
    PatriotSite: (transform: Transform) => new PatriotMissileSiteSprite(transform),

    RANDOM: (transform: Transform) => new RandomRandomSprite(transform),
};



// maybe this is what is created from the serialized version
export class Event implements UpdateAble{
    spawns: Spawn[];
    type: string;
    parentScene: Scene;
    numberFactor: number;
    isShipRelative: boolean;
    constructor(spawns: SpawnSerialized[], parentScene: Scene, isShipRelative: boolean, gameEngine: GameEngine) { 
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

export type EventSerialized = {
    type: 'Event';
    spawns: SpawnSerialized[];
    isShipRelative: boolean;
}

// this is what is created by the UI
// but it will also have to be created by the serialized data
export class EventObject extends UIElement {
    spawns: Spawn[];
    selectedSpawns: Spawn[];
    spawnSprites: SpawnSpriteMap;
    enemyPlacers: EnemyPlacer[];
    isShipRelative: boolean;
    UILineSprite: GEOEventObjectSprite;
    draggingLineSprite: GEOEventObjectSprite;
    constructor(levelDesigner: LevelDesigner, eventToLoad?: EventSerialized, position?: [number, number], parentScene?: SceneObject) {
        super(levelDesigner, position, parentScene);
        this.spawns = [];
        this.enemyPlacers = [];
        this.selectedSpawns = [];
        // TODO: make this more automatically extendable
        this.spawnSprites = new Map();
        this.widthHeight = [80, 40];
        this.clickRadius = 20;
        this.addMouseClickListener();
        this.isShipRelative = false;
        
        if(eventToLoad) {
            eventToLoad.spawns.forEach((spawn) => this.addSpawn(spawn));
            this.isShipRelative = eventToLoad.isShipRelative;
        }
        this.addUIElementSprite(new GEOEventObjectSprite(this.transform, this.spawnSprites, this.widthHeight));
        this.levelDesigner.eventLoadShipRelative(this.isShipRelative);
    }

    enemyPlaced(spawn: SpawnSerialized, enemyPlacer: EnemyPlacer) {
        this.addSpawn(new Spawn(spawn, this.levelDesigner.engine));
        this.addEnemyPlacer(enemyPlacer);
        this.levelDesigner.addingAnotherEnemy(this.createEnemyPlacer(spawn.type));
    }

    removePlacer(enemyPlacer: EnemyPlacer) {
        this.spawns = this.spawns.filter((spawn) => spawn !== enemyPlacer.serializedSpawn);
        this.enemyPlacers = this.enemyPlacers.filter((placer) => placer !== enemyPlacer);
    }

    // copy and paste should be supported
    // see scene for description on how to do it
    // copy() {
    //     return this.levelDesigner.addToClipBoard(new EventObject(this.levelDesigner, this.serialize()));
    // }

    copySelectedSpawns() {
        // I imagine shift click and then copy, and past
    }

    copyLineSpriteForDragging() {
        const draggingSpriteTransform = new Transform(null, [this.transform.pos[0], this.transform.pos[1]]);

        return new GEOEventObjectSprite(draggingSpriteTransform, this.spawnSprites, this.widthHeight);
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
            const enemyPlacer = new EnemyPlacer(this.levelDesigner.engine, spawn, this, true);
            enemyPlacer.addMouseClickListener();
            this.enemyPlacers.push(enemyPlacer);
        });
    }

    // copied into engine's clipboard
    // pasteCopiedSpawns(spawns) {
    //     spawns.forEach((spawn) => (this.addSpawn(spawn)));
    // }

    serialize(): EventSerialized {  
        return {
            type: 'Event',
            spawns: this.spawns.map((spawn) => spawn.serialize()),
            isShipRelative: this.isShipRelative
        };
    }

    // loadEvent(event) {
    //     event.spawns.forEach((spawn) => this.addSpawn({spawn}));
    // }

    addSpawn(spawnSerialized: SpawnSerialized) {
        this.spawns.push(new Spawn(spawnSerialized, this.levelDesigner.engine));
        const currentNumber = this.spawnSprites.get(spawnSerialized.type)
        currentNumber ? this.spawnSprites.set(spawnSerialized.type, 1) : this.spawnSprites.set(spawnSerialized.type,  currentNumber + 1);
    }

    enemyPlacerClicked(enemyPlacer: EnemyPlacer) {
        this.levelDesigner.enemyPlacerClicked(enemyPlacer);
    }

    addRandomRandom(serializedSpawn: SpawnSerialized) {
        const randomRandomAdded = this.spawns.find((spawny) => spawny.type === 'RANDOM');
        if(randomRandomAdded) {
            randomRandomAdded.possibleSpawns = serializedSpawn.possibleSpawns;
            randomRandomAdded.numberToGenerate = serializedSpawn.numberToGenerate;
            const enemyPlacer = this.enemyPlacers.find((enemyPlacer) => (enemyPlacer.type === 'RANDOM'));
            enemyPlacer.serializedSpawn.numberToGenerate = serializedSpawn.numberToGenerate;
            enemyPlacer.serializedSpawn.possibleSpawns = serializedSpawn.possibleSpawns;
        } else {
            const enemyPlacer = new EnemyPlacer(
                this.levelDesigner.engine, 
                {
                    location: 'RANDOM', 
                    type: 'RANDOM', 
                    numberToGenerate: serializedSpawn.numberToGenerate, 
                    possibleSpawns: serializedSpawn.possibleSpawns
                },
                this,
                true
            );
            this.addSpawn(serializedSpawn);
            this.addEnemyPlacer(enemyPlacer);
        }
    }

    createEnemyPlacer(type: GameElementObjectType) {
        return new EnemyPlacer(this.levelDesigner.engine, {type}, this);
    }

    addEnemyPlacer(enemyPlacer: EnemyPlacer) {
        this.enemyPlacers.push(enemyPlacer);
    }

    deleteSpawn(spawn: Spawn) {
        const index = this.spawns.indexOf(spawn);
        if(index !== -1)  {
            this.spawns.splice(index, 1);
            const currentNumber = this.spawnSprites.get(spawn.type);
            this.spawnSprites.set(spawn.type, currentNumber - 1);
        }
    }

    deleteEnemyPlacer(enemyPlacer: EnemyPlacer) {
        const index = this.enemyPlacers.indexOf(enemyPlacer);
        if(index !== -1) {
            this.enemyPlacers.splice(index, 1);
        }
    }

    onMouseClick() {
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

    onMouseDoubleClick() {
        console.log('yay mouse double clicked here');
    }

    update() {
    }
}

type SpawnSpriteMap = Map<GameElementObjectType, number>

type SpawnSpriteKey = "BoxBox" | "Arrow" | "Grunt" | "Pinwheel" | "Weaver" | "Singularity" | "RANDOM";



export class GEOEventObjectSprite extends LineSprite {
    selected: boolean;
    expanded: boolean;
    spawnSprites: SpawnSpriteMap;
    widthHeight: [number, number];

    static firstPosition: [number, number] = [10,10];
    static secondPosition: [number, number] = [30,10];
    static thirdPosition: [number, number] = [50,10];

    static fourthPosition: [number, number] = [10,30];
    static fifthPosition: [number, number] = [30,30];
    static sixthPosition: [number, number] = [50,30];

    static seventhPosition: [number, number] = [70,10];

    static spawnSpriteCreator = {
        BoxBox: spriteMap['BoxBox'](new Transform(null, GEOEventObjectSprite.firstPosition)),
        Arrow: spriteMap['Arrow'](new Transform(null, GEOEventObjectSprite.secondPosition)),
        Grunt: spriteMap['Grunt'](new Transform(null, GEOEventObjectSprite.thirdPosition)),

        Pinwheel: spriteMap['Pinwheel'](new Transform(null, GEOEventObjectSprite.fourthPosition)),
        Weaver: spriteMap['Weaver'](new Transform(null, GEOEventObjectSprite.fifthPosition)),
        Singularity: spriteMap['Singularity'](new Transform(null, GEOEventObjectSprite.sixthPosition)),
        RANDOM: spriteMap['RANDOM'](new Transform(null, GEOEventObjectSprite.seventhPosition)),
    };

    constructor(transform: Transform, spawnSprites: SpawnSpriteMap, widthHeight: [number, number]) {
        super(transform);
        this.selected = true;
        this.expanded = true;
        this.spawnSprites = spawnSprites;
        this.widthHeight = widthHeight;

        

        // change the sprites to have spawning scale be 0.5
        Object.keys(GEOEventObjectSprite.spawnSpriteCreator).forEach((key: SpawnSpriteKey) => {
            GEOEventObjectSprite.spawnSpriteCreator[key].spawningScale = 0.5;
        });
    }

    draw(ctx: CanvasRenderingContext2D) {
        const pos = this.transform.pos;
        ctx.save();
        ctx.translate(pos[0], pos[1]);

        this.drawFunction(ctx);
        ctx.restore();
    }

    drawFunction(ctx: CanvasRenderingContext2D) {
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
        const BoxBoxSprite = GEOEventObjectSprite.spawnSpriteCreator['BoxBox'];
        const ArrowSprite = GEOEventObjectSprite.spawnSpriteCreator['Arrow'];
        const GruntSprite = GEOEventObjectSprite.spawnSpriteCreator['Grunt'];

        const PinwheelSprite = GEOEventObjectSprite.spawnSpriteCreator['Pinwheel'];
        const WeaverSprite = GEOEventObjectSprite.spawnSpriteCreator['Weaver'];
        const SingularitySprite = GEOEventObjectSprite.spawnSpriteCreator['Singularity'];
        const RandomRandomSprite = GEOEventObjectSprite.spawnSpriteCreator['RANDOM'];

        this.spawnSprites.get('BoxBox') > 0 ? BoxBoxSprite.makeVisible() : BoxBoxSprite.makeInvisible();
       this.spawnSprites.get('Arrow') > 0 ? ArrowSprite.makeVisible() : ArrowSprite.makeInvisible();
        this.spawnSprites.get('Grunt') > 0 ? GruntSprite.makeVisible() : GruntSprite.makeInvisible();

        this.spawnSprites.get('Pinwheel') > 0 ? PinwheelSprite.makeVisible() : PinwheelSprite.makeInvisible();
        this.spawnSprites.get('Weaver') > 0 ? WeaverSprite.makeVisible() : WeaverSprite.makeInvisible();
        this.spawnSprites.get('Singularity') > 0 ? SingularitySprite.makeVisible() : SingularitySprite.makeInvisible();

        this.spawnSprites.get('RANDOM') > 0 ? RandomRandomSprite.makeVisible() : RandomRandomSprite.makeInvisible();


        BoxBoxSprite.draw(ctx);
        ArrowSprite.draw(ctx);
        GruntSprite.draw(ctx);

        PinwheelSprite.draw(ctx);
        WeaverSprite.draw(ctx);
        SingularitySprite.draw(ctx);

        RandomRandomSprite.draw(ctx);
    }
}

export class StrikeTimeEventObjectSprite extends LineSprite {
    selected: boolean;
    expanded: boolean;
    spawnSprites: SpawnSpriteMap;
    widthHeight: [number, number];

    static firstPosition: [number, number] = [10,10];
    static secondPosition: [number, number] = [30,10];
    static thirdPosition: [number, number] = [50,10];

    static fourthPosition: [number, number] = [10,30];
    static fifthPosition: [number, number] = [30,30];
    static sixthPosition: [number, number] = [50,30];

    static seventhPosition: [number, number] = [70,10];

    static spawnSpriteCreator = {
        Aurora: spriteMap['Aurora'](new Transform(null, StrikeTimeEventObjectSprite.firstPosition)),
        Building: spriteMap['Building'](new Transform(null, StrikeTimeEventObjectSprite.secondPosition)),
        TargetBuilding: spriteMap['TargetBuilding'](new Transform(null, StrikeTimeEventObjectSprite.thirdPosition)),
        PatriotSite: spriteMap['PatriotSite'](new Transform(null, StrikeTimeEventObjectSprite.fourthPosition)),
        RANDOM: spriteMap['RANDOM'](new Transform(null, StrikeTimeEventObjectSprite.seventhPosition)),
    };

    constructor(transform: Transform, spawnSprites: SpawnSpriteMap, widthHeight: [number, number]) {
        super(transform);
        this.selected = true;
        this.expanded = true;
        this.spawnSprites = spawnSprites;
        this.widthHeight = widthHeight;

        

        // change the sprites to have spawning scale be 0.5
        Object.keys(GEOEventObjectSprite.spawnSpriteCreator).forEach((key: SpawnSpriteKey) => {
            GEOEventObjectSprite.spawnSpriteCreator[key].spawningScale = 0.5;
        });
    }

    draw(ctx: CanvasRenderingContext2D) {
        const pos = this.transform.pos;
        ctx.save();
        ctx.translate(pos[0], pos[1]);

        this.drawFunction(ctx);
        ctx.restore();
    }

    drawFunction(ctx: CanvasRenderingContext2D) {
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

        const AuroraSprite = StrikeTimeEventObjectSprite.spawnSpriteCreator['Aurora'];
        const BuildingSprite = StrikeTimeEventObjectSprite.spawnSpriteCreator['Building'];
        const TargetBuildingSprite = StrikeTimeEventObjectSprite.spawnSpriteCreator['TargetBuilding'];
        const PatriotSiteSprite = StrikeTimeEventObjectSprite.spawnSpriteCreator['PatriotSite'];
        const RandomRandomSprite = StrikeTimeEventObjectSprite.spawnSpriteCreator['RANDOM'];

        this.spawnSprites.get('Aurora') > 0 ? AuroraSprite.makeVisible() : AuroraSprite.makeInvisible();
        this.spawnSprites.get('Building') > 0 ? BuildingSprite.makeVisible() : BuildingSprite.makeInvisible();
        this.spawnSprites.get('TargetBuilding') > 0 ? TargetBuildingSprite.makeVisible() : TargetBuildingSprite.makeInvisible();

        this.spawnSprites.get('PatriotSite') > 0 ? PatriotSiteSprite.makeVisible() : PatriotSiteSprite.makeInvisible();
        this.spawnSprites.get('RANDOM') > 0 ? RandomRandomSprite.makeVisible() : RandomRandomSprite.makeInvisible();


        AuroraSprite.draw(ctx);
        BuildingSprite.draw(ctx);
        TargetBuildingSprite.draw(ctx);
        PatriotSiteSprite.draw(ctx);

        RandomRandomSprite.draw(ctx);
    }
}


