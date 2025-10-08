import { AnimationView } from "../../../AnimationView";
import {type GameEngine } from "../../../game_engine/game_engine";
import {GameObject} from "../../../game_engine/game_object";
import {Sound} from "../../../game_engine/sound";
import { GEOWarsScript, Scorable } from "../../../GEOWarsScript";
import {EnemySpawn} from "../../particles/enemy_spawn";
import {BoxBoxSprite} from "./boxbox_sprite";


// there's only two versions of this coordate object
// 1. bottom left, top right
// 2. top left, bottom right

export type RotationState = {
    animationState: typeof BoxBox.animationStates[number];
    rotationDirection: typeof BoxBox.rotationDirections[number];
    shapeState: typeof BoxBox.shapeStates[number];
    coordinateShift: [number, number];
    rotationAngle: number;
    stateTime: number;
    positionShift: [number, number];
    midPauseTime: number;
    pauseTime: number;
}

type DrawCoordinatesTopLeft = {
    BottomSquareBL: [number, number];
    BottomSquareBR: [number, number];
    BottomSquareTL: [number, number];
    BottomSquareTR: [number, number];
    TopSquareBL: [number, number];
    TopSquareBR: [number, number];
    TopSquareTL: [number, number];
    TopSquareTR: [number, number];
    Left: { // distances to axis of rotation, [x, y, angleOffset], y is the same, x requires pythag;
        // take these distances to the axis of rotation, and then multiply them by cos(angle) of rotation
        _BottomSquareBL: [number, number, number];
        _BottomSquareBR: [number, number, number];
        _BottomSquareTL: [number, number, number];
        _BottomSquareTR: [number, number, number];
        _TopSquareBL: [number, number, number];
        _TopSquareBR: [number, number, number];
        _TopSquareTL: [number, number, number];
        _TopSquareTR: [number, number, number];
    },
    Right: {
        _BottomSquareBL: [number, number, number];
        _BottomSquareBR: [number, number, number];
        _BottomSquareTL: [number, number, number];
        _BottomSquareTR: [number, number, number];
        _TopSquareBL: [number, number, number];
        _TopSquareBR: [number, number, number];
        _TopSquareTL: [number, number, number];
        _TopSquareTR: [number, number, number];
    },
    Top: { // X stays the same, Y scales
        _BottomSquareBL: [number, number, number];
        _BottomSquareBR: [number, number, number];
        _BottomSquareTL: [number, number, number];
        _BottomSquareTR: [number, number, number];
        _TopSquareBL: [number, number, number];
        _TopSquareBR: [number, number, number];
        _TopSquareTL: [number, number, number];
        _TopSquareTR: [number, number, number];
    },
    Bottom: { // X stays the same, Y scales
        // BL <=> TR, TL <=> BR
        _BottomSquareBL: [number, number, number];
        _BottomSquareBR: [number, number, number];
        _BottomSquareTL: [number, number, number];
        _BottomSquareTR: [number, number, number];
        _TopSquareBL: [number, number, number];
        _TopSquareBR: [number, number, number];
        _TopSquareTL: [number, number, number];
        _TopSquareTR: [number, number, number];
    },
    _BottomSquareBL: [number, number];
    _BottomSquareBR: [number, number];
    _BottomSquareTL: [number, number];
    _BottomSquareTR: [number, number];
    _TopSquareBL: [number, number];
    _TopSquareBR: [number, number];
    _TopSquareTL: [number, number];
    _TopSquareTR: [number, number];
};

type DrawCoordinatesBottomLeft = {
    BottomSquareBL: [number, number];
    BottomSquareBR: [number, number];
    BottomSquareTL: [number, number];
    BottomSquareTR: [number, number];
    TopSquareBL: [number, number];
    TopSquareBR: [number, number];
    TopSquareTL: [number, number];
    TopSquareTR: [number, number];
    Left: { // distances to axis of rotation, [x, y, angleOffset], y is the same, x requires pythag;
        // take these distances to the axis of rotation, and then multiply them by cos(angle) of rotation
        _BottomSquareBL: [number, number, number];
        _BottomSquareBR: [number, number, number];
        _BottomSquareTL: [number, number, number];
        _BottomSquareTR: [number, number, number];
        _TopSquareBL: [number, number, number];
        _TopSquareBR: [number, number, number];
        _TopSquareTL: [number, number, number];
        _TopSquareTR: [number, number, number];
    },
    Right: {
        _BottomSquareBL: [number, number, number];
        _BottomSquareBR: [number, number, number];
        _BottomSquareTL: [number, number, number];
        _BottomSquareTR: [number, number, number];
        _TopSquareBL: [number, number, number];
        _TopSquareBR: [number, number, number];
        _TopSquareTL: [number, number, number];
        _TopSquareTR: [number, number, number];
    },
    Top: { // X stays the same, Y scales
        _BottomSquareBL: [number, number, number];
        _BottomSquareBR: [number, number, number];
        _BottomSquareTL: [number, number, number];
        _BottomSquareTR: [number, number, number];
        _TopSquareBL: [number, number, number];
        _TopSquareBR: [number, number, number];
        _TopSquareTL: [number, number, number];
        _TopSquareTR: [number, number, number];
    },
    Bottom: { // X stays the same, Y scales
        // BL <=> TR, TL <=> BR
        _BottomSquareBL: [number, number, number];
        _BottomSquareBR: [number, number, number];
        _BottomSquareTL: [number, number, number];
        _BottomSquareTR: [number, number, number];
        _TopSquareBL: [number, number, number];
        _TopSquareBR: [number, number, number];
        _TopSquareTL: [number, number, number];
        _TopSquareTR: [number, number, number];
    },
    _BottomSquareBL: [number, number];
    _BottomSquareBR: [number, number];
    _BottomSquareTL: [number, number];
    _BottomSquareTR: [number, number];
    _TopSquareBL: [number, number];
    _TopSquareBR: [number, number];
    _TopSquareTL: [number, number];
    _TopSquareTR: [number, number];
}


export class BoxBox extends GameObject implements Scorable {
    static boxWidth: number = 13;
    static boxDepth: number = BoxBox.boxWidth / 2.2;

    static w: number = BoxBox.boxWidth;
    static d: number = BoxBox.boxDepth;



    static drawCoordinatesTopLeft: DrawCoordinatesTopLeft = {
        // try making y negativified
    
        BottomSquareBL: [-3/4 * BoxBox.w, 3/4 * BoxBox.w],
        BottomSquareBR: [1/4 * BoxBox.w, 3/4 * BoxBox.w],
        BottomSquareTL: [-3/4 * BoxBox.w, -1/4 * BoxBox.w],
        BottomSquareTR: [1/4 * BoxBox.w, -1/4 * BoxBox.w],
        TopSquareBL: [-1/4 * BoxBox.w, 1/4 * BoxBox.w],
        TopSquareBR: [3/4 * BoxBox.w, 1/4 * BoxBox.w],
        TopSquareTL: [-1/4 * BoxBox.w, -3/4 * BoxBox.w],
        TopSquareTR: [3/4 * BoxBox.w, -3/4 * BoxBox.w],
        Left: { // distances to axis of rotation, [x, y, angleOffset], y is the same, x requires pythag;
            // take these distances to the axis of rotation, and then multiply them by cos(angle) of rotation
            _BottomSquareBL: [BoxBox.d,  3/4 * BoxBox.w, Math.PI/2], // angle starts 90 degrees 
            _BottomSquareBR: [Math.sqrt(BoxBox.w**2 + BoxBox.d**2), 3/4 * BoxBox.w, Math.atan(BoxBox.d/BoxBox.w)], // scaled length is distance from axis of rotation
            _BottomSquareTL: [BoxBox.d, -1/4 * BoxBox.w, Math.PI/2],
            _BottomSquareTR: [Math.sqrt(BoxBox.w**2 + BoxBox.d**2), -1/4 * BoxBox.w, Math.atan(BoxBox.d/BoxBox.w)],
            _TopSquareBL: [Math.sqrt((BoxBox.w / 2)**2 + BoxBox.d**2), 1/4 * BoxBox.w, Math.atan(BoxBox.d/(BoxBox.w/2))],
            _TopSquareBR: [Math.sqrt((3/2 * BoxBox.w)**2 + BoxBox.d**2), 1/4 * BoxBox.w, Math.atan(BoxBox.d/(3/2 * BoxBox.w))],
            _TopSquareTL: [Math.sqrt((BoxBox.w / 2)**2 + BoxBox.d**2), -3/4 * BoxBox.w, Math.atan(BoxBox.d/(BoxBox.w/2))],
            _TopSquareTR: [Math.sqrt((3/2 * BoxBox.w)**2 + BoxBox.d**2), -3/4 * BoxBox.w, Math.atan(BoxBox.d/(3/2 * BoxBox.w))]
        },
        Right: {
            _BottomSquareBL: [Math.sqrt((3/2 * BoxBox.w)**2 + BoxBox.d**2), 3/4 * BoxBox.w, Math.atan(BoxBox.d/(3/2 * BoxBox.w))], // angle starts 90 degrees 
            _BottomSquareBR: [Math.sqrt((BoxBox.w / 2)**2 + BoxBox.d**2), 3/4 * BoxBox.w, Math.atan(BoxBox.d/(BoxBox.w/2))],
            _BottomSquareTL: [Math.sqrt((3/2 * BoxBox.w)**2 + BoxBox.d**2), -1/4 * BoxBox.w, Math.atan(BoxBox.d/(3/2 * BoxBox.w))],
            _BottomSquareTR: [Math.sqrt((BoxBox.w / 2)**2 + BoxBox.d**2), -1/4 * BoxBox.w, Math.atan(BoxBox.d/(BoxBox.w/2))],
            _TopSquareBL: [Math.sqrt(BoxBox.w**2 + BoxBox.d**2), 1/4 * BoxBox.w, Math.atan(BoxBox.d/BoxBox.w)],
            _TopSquareBR: [BoxBox.d, 1/4 * BoxBox.w, Math.PI/2], 
            _TopSquareTL: [Math.sqrt(BoxBox.w**2 + BoxBox.d**2), -3/4 * BoxBox.w, Math.atan(BoxBox.d/BoxBox.w)],
            _TopSquareTR: [BoxBox.d, -3/4 * BoxBox.w, Math.PI/2] 
        },
        Top: { // X stays the same, Y scales
            _BottomSquareBL: [-3/4 * BoxBox.w, BoxBox.d, -Math.PI/2],
            _BottomSquareBR: [1/4 * BoxBox.w, BoxBox.d, -Math.PI/2],
            _BottomSquareTL: [-3/4 * BoxBox.w, -Math.sqrt(BoxBox.w**2 + BoxBox.d**2), Math.atan(BoxBox.d/ BoxBox.w)],
            _BottomSquareTR: [1/4 * BoxBox.w, -Math.sqrt(BoxBox.w**2 + BoxBox.d**2), Math.atan(BoxBox.d/ BoxBox.w)],
            _TopSquareBL: [-1/4 * BoxBox.w, -Math.sqrt((BoxBox.w / 2)**2 + BoxBox.d**2), Math.atan(BoxBox.d/(BoxBox.w/2))],
            _TopSquareBR: [3/4 * BoxBox.w, -Math.sqrt((BoxBox.w / 2)**2 + BoxBox.d**2), Math.atan(BoxBox.d/(BoxBox.w/2))],
            _TopSquareTL: [-1/4 * BoxBox.w, -Math.sqrt((3/2 * BoxBox.w)**2 + BoxBox.d**2),  Math.atan(BoxBox.d/(3/2 * BoxBox.w))],
            _TopSquareTR: [3/4 * BoxBox.w, -Math.sqrt((3/2 * BoxBox.w)**2 + BoxBox.d**2),  Math.atan(BoxBox.d/(3/2 * BoxBox.w))],
        },
        Bottom: { // X stays the same, Y scales
            // BL <=> TR, TL <=> BR
            _BottomSquareBL: [-3/4 * BoxBox.w, Math.sqrt((3/2 * BoxBox.w)**2 + BoxBox.d**2),  Math.atan(BoxBox.d/(3/2 * BoxBox.w))],
            _BottomSquareBR: [1/4 * BoxBox.w, Math.sqrt((3/2 * BoxBox.w)**2 + BoxBox.d**2),  Math.atan(BoxBox.d/(3/2 * BoxBox.w))],
            _BottomSquareTL: [-3/4 * BoxBox.w, Math.sqrt((BoxBox.w / 2)**2 + BoxBox.d**2), Math.atan(BoxBox.d/(BoxBox.w/2))],
            _BottomSquareTR: [1/4 * BoxBox.w, Math.sqrt((BoxBox.w / 2)**2 + BoxBox.d**2), Math.atan(BoxBox.d/(BoxBox.w/2))],
            _TopSquareBL: [-1/4 * BoxBox.w, Math.sqrt(BoxBox.w**2 + BoxBox.d**2), Math.atan(BoxBox.d/ BoxBox.w)],
            _TopSquareBR: [3/4 * BoxBox.w, Math.sqrt(BoxBox.w**2 + BoxBox.d**2), Math.atan(BoxBox.d/ BoxBox.w)],
            _TopSquareTL: [-1/4 * BoxBox.w, BoxBox.d, Math.PI/2],
            _TopSquareTR: [3/4 * BoxBox.w, BoxBox.d, Math.PI/2],
        },
        _BottomSquareBL: [-3/4 * BoxBox.w, 3/4 * BoxBox.w],
        _BottomSquareBR: [1/4 * BoxBox.w, 3/4 * BoxBox.w],
        _BottomSquareTL: [-3/4 * BoxBox.w, -1/4 * BoxBox.w],
        _BottomSquareTR: [1/4 * BoxBox.w, -1/4 * BoxBox.w],
        _TopSquareBL: [-1/4 * BoxBox.w, 1/4 * BoxBox.w],
        _TopSquareBR: [3/4 * BoxBox.w, 1/4 * BoxBox.w],
        _TopSquareTL: [-1/4 * BoxBox.w, -3/4 * BoxBox.w],
        _TopSquareTR: [3/4 * BoxBox.w, -3/4 * BoxBox.w],
    };

    static drawCoordinatesBottomLeft: DrawCoordinatesBottomLeft = {
        // I think 
        // flip Y coordinates for this shape
    
    
        BottomSquareBL: [-3/4 * BoxBox.w, 1/4 * BoxBox.w],
        BottomSquareBR: [1/4 * BoxBox.w, 1/4 * BoxBox.w],
        BottomSquareTL: [-3/4 * BoxBox.w, -3/4 * BoxBox.w],
        BottomSquareTR: [1/4 * BoxBox.w, -3/4 * BoxBox.w],
        TopSquareBL: [-1/4 * BoxBox.w, 3/4 * BoxBox.w],
        TopSquareBR: [3/4 * BoxBox.w, 3/4 * BoxBox.w],
        TopSquareTL: [-1/4 * BoxBox.w, -1/4 * BoxBox.w],
        TopSquareTR: [3/4 * BoxBox.w, -1/4 * BoxBox.w],
    
        // top and bottom are correct
        // left and right are wrong
       
        Left: { // distances to axis of rotation, [x, y, angleOffset], y is the same, x requires pythag;
            // take these distances to the axis of rotation, and then multiply them by cos(angle) of rotation
            //BL <=> TL, BR <=> TR
            _BottomSquareBL: [BoxBox.d, 1/4 * BoxBox.w, Math.PI/2],
            _BottomSquareBR:  [Math.sqrt(BoxBox.w**2 + BoxBox.d**2), 1/4 * BoxBox.w, Math.atan(BoxBox.d/BoxBox.w)],
            _BottomSquareTL: [BoxBox.d,  -3/4 * BoxBox.w, Math.PI/2], 
            _BottomSquareTR: [Math.sqrt(BoxBox.w**2 + BoxBox.d**2), -3/4 * BoxBox.w, Math.atan(BoxBox.d/BoxBox.w)],
            _TopSquareBL: [Math.sqrt((BoxBox.w / 2)**2 + BoxBox.d**2), 3/4 * BoxBox.w, Math.atan(BoxBox.d/(BoxBox.w/2))],
            _TopSquareBR: [Math.sqrt((3/2 * BoxBox.w)**2 + BoxBox.d**2), 3/4 * BoxBox.w, Math.atan(BoxBox.d/(3/2 * BoxBox.w))],
            _TopSquareTL: [Math.sqrt((BoxBox.w / 2)**2 + BoxBox.d**2), -1/4 * BoxBox.w, Math.atan(BoxBox.d/(BoxBox.w/2))],
            _TopSquareTR: [Math.sqrt((3/2 * BoxBox.w)**2 + BoxBox.d**2), -1/4 * BoxBox.w, Math.atan(BoxBox.d/(3/2 * BoxBox.w))],
        },
        Right: { // BL <=> TL, BR <=> TR
            _BottomSquareBL: [Math.sqrt((3/2 * BoxBox.w)**2 + BoxBox.d**2), 1/4 * BoxBox.w, Math.atan(BoxBox.d/(3/2 * BoxBox.w))],// angle starts 90 degrees 
            _BottomSquareBR: [Math.sqrt((BoxBox.w / 2)**2 + BoxBox.d**2), 1/4 * BoxBox.w, Math.atan(BoxBox.d/(BoxBox.w/2))],
            _BottomSquareTL: [Math.sqrt((3/2 * BoxBox.w)**2 + BoxBox.d**2), -3/4 * BoxBox.w, Math.atan(BoxBox.d/(3/2 * BoxBox.w))], 
            _BottomSquareTR: [Math.sqrt((BoxBox.w / 2)**2 + BoxBox.d**2), -3/4 * BoxBox.w, Math.atan(BoxBox.d/(BoxBox.w/2))],
            _TopSquareBL: [Math.sqrt(BoxBox.w**2 + BoxBox.d**2), 3/4 * BoxBox.w, Math.atan(BoxBox.d/BoxBox.w)],
            _TopSquareBR: [BoxBox.d, 3/4 * BoxBox.w, Math.PI/2],
            _TopSquareTL: [Math.sqrt(BoxBox.w**2 + BoxBox.d**2), -1/4 * BoxBox.w, Math.atan(BoxBox.d/BoxBox.w)],
            _TopSquareTR:  [BoxBox.d, -1/4 * BoxBox.w, Math.PI/2], 
        },
        Top: { // X stays the same, Y scales 
            _BottomSquareBL: [-3/4 * BoxBox.w, -Math.sqrt((3/2 * BoxBox.w)**2 + BoxBox.d**2),  Math.atan(BoxBox.d/(3/2 * BoxBox.w))],//[d,  -3/4 * w, Math.PI/2], // angle starts 90 degrees
            _BottomSquareBR: [1/4 * BoxBox.w, -Math.sqrt((3/2 * BoxBox.w)**2 + BoxBox.d**2),  Math.atan(BoxBox.d/(3/2 * BoxBox.w))],
            _BottomSquareTL: [-3/4 * BoxBox.w, -Math.sqrt((BoxBox.w / 2)**2 + BoxBox.d**2), Math.atan(BoxBox.d/(BoxBox.w/2))],
            _BottomSquareTR: [1/4 * BoxBox.w, -Math.sqrt((BoxBox.w / 2)**2 + BoxBox.d**2), Math.atan(BoxBox.d/(BoxBox.w/2))],
            _TopSquareBL: [-1/4 * BoxBox.w, -Math.sqrt(BoxBox.w**2 + BoxBox.d**2), Math.atan(BoxBox.d/BoxBox.w)],
            _TopSquareBR: [3/4 * BoxBox.w, -Math.sqrt(BoxBox.w**2 + BoxBox.d**2), Math.atan(BoxBox.d/ BoxBox.w)],
            _TopSquareTL: [-1/4 * BoxBox.w, -BoxBox.d, Math.PI/2],
            _TopSquareTR: [3/4 * BoxBox.w, -BoxBox.d, Math.PI/2]
        },
        Bottom: { // X stays the same, Y scales
            _BottomSquareBL: [-3/4 * BoxBox.w, BoxBox.d, Math.PI/2],
            _BottomSquareBR: [1/4 * BoxBox.w, BoxBox.d, Math.PI/2],
            _BottomSquareTL: [-3/4 * BoxBox.w, Math.sqrt(BoxBox.w**2 + BoxBox.d**2), Math.atan(BoxBox.d/ BoxBox.w)],
            _BottomSquareTR: [1/4 * BoxBox.w, Math.sqrt(BoxBox.w**2 + BoxBox.d**2), Math.atan(BoxBox.d/ BoxBox.w)],
            _TopSquareBL: [-1/4 * BoxBox.w, Math.sqrt((BoxBox.w / 2)**2 + BoxBox.d**2), Math.atan(BoxBox.d/(BoxBox.w/2))],
            _TopSquareBR: [3/4 * BoxBox.w, Math.sqrt((BoxBox.w / 2)**2 + BoxBox.d**2), Math.atan(BoxBox.d/(BoxBox.w/2))],
            _TopSquareTL: [-1/4 * BoxBox.w, Math.sqrt((3/2 * BoxBox.w)**2 + BoxBox.d**2),  Math.atan(BoxBox.d/(3/2 * BoxBox.w))],
            _TopSquareTR: [3/4 * BoxBox.w,  Math.sqrt((3/2 * BoxBox.w)**2 + BoxBox.d**2),  Math.atan(BoxBox.d/(3/2 * BoxBox.w))]
        },
        _BottomSquareBL: [-3/4 * BoxBox.w, 1/4 * BoxBox.w],
        _BottomSquareBR: [1/4 * BoxBox.w, 1/4 * BoxBox.w],
        _BottomSquareTL: [-3/4 * BoxBox.w, -3/4 * BoxBox.w],
        _BottomSquareTR: [1/4 * BoxBox.w, -3/4 * BoxBox.w],
        _TopSquareBL: [-1/4 * BoxBox.w, 3/4 * BoxBox.w],
        _TopSquareBR: [3/4 * BoxBox.w, 3/4 * BoxBox.w],
        _TopSquareTL: [-1/4 * BoxBox.w, -1/4 * BoxBox.w],
        _TopSquareTR: [3/4 * BoxBox.w, -1/4 * BoxBox.w],
    };
    projectedDrawCoordinates: {
        BottomSquareBL: [number, number],
        BottomSquareBR: [number, number],
        BottomSquareTL: [number, number],
        BottomSquareTR: [number, number],
        TopSquareBL: [number, number],
        TopSquareBR: [number, number],
        TopSquareTL: [number, number],
        TopSquareTR: [number, number],
        _BottomSquareBL: [number, number],
        _BottomSquareBR: [number, number],
        _BottomSquareTL: [number, number],
        _BottomSquareTR: [number, number],
        _TopSquareBL: [number, number],
        _TopSquareBR: [number, number],
        _TopSquareTL: [number, number],
        _TopSquareTR: [number, number]
    };

    static animationStates = ["Paused", "Rotating", "MidPaused", "CompletingRotation"] as const;
    static rotationDirections = ["Bottom", "Top", "Left", "Right"] as const;
    static shapeStates = ["BottomLeft", "TopLeft"] as const;


    spawnSound: Sound;
    radius: number;
    points: number;
    boxDepth: number;

    rotationState: RotationState;
    lineSprite: BoxBoxSprite;


    constructor(engine: GameEngine | AnimationView, pos: [number, number]) {
        super(engine);
        this.spawnSound = new Sound("sounds/Enemy_spawn_blue.wav", 0.5, engine.muted);
        this.transform.pos = pos;
        this.radius = 10;
        this.points = 20;
        // this.addPhysicsComponent()
        

        // there's only two versions of this coordinate object
        // 1. bottom left, top right
        // 2. top left, bottom right

        // the axis of rotation determines the length of the line for the _ coordinates
        this.projectedDrawCoordinates = {
            BottomSquareBL: [...BoxBox.drawCoordinatesBottomLeft.BottomSquareBL],
            BottomSquareBR: [...BoxBox.drawCoordinatesBottomLeft.BottomSquareBR],
            BottomSquareTL: [...BoxBox.drawCoordinatesBottomLeft.BottomSquareTL],
            BottomSquareTR: [...BoxBox.drawCoordinatesBottomLeft.BottomSquareTR],
            TopSquareBL: [...BoxBox.drawCoordinatesBottomLeft.TopSquareBL],
            TopSquareBR: [...BoxBox.drawCoordinatesBottomLeft.TopSquareBR],
            TopSquareTL: [...BoxBox.drawCoordinatesBottomLeft.TopSquareTL],
            TopSquareTR: [...BoxBox.drawCoordinatesBottomLeft.TopSquareTR],
            _BottomSquareBL: [...BoxBox.drawCoordinatesBottomLeft._BottomSquareBL],
            _BottomSquareBR: [...BoxBox.drawCoordinatesBottomLeft._BottomSquareBR],
            _BottomSquareTL: [...BoxBox.drawCoordinatesBottomLeft._BottomSquareTL],
            _BottomSquareTR: [...BoxBox.drawCoordinatesBottomLeft._BottomSquareTR],
            _TopSquareBL: [...BoxBox.drawCoordinatesBottomLeft._TopSquareBL],
            _TopSquareBR: [...BoxBox.drawCoordinatesBottomLeft._TopSquareBR],
            _TopSquareTL: [...BoxBox.drawCoordinatesBottomLeft._TopSquareTL],
            _TopSquareTR: [...BoxBox.drawCoordinatesBottomLeft._TopSquareTR],
        };
        this.rotationState = {
            animationState: "Paused",
            rotationDirection: "Left",
            coordinateShift: [3/4 * BoxBox.w, 0],
            rotationAngle: 0,
            stateTime: 0,
            shapeState: "TopLeft",
            positionShift: [0,0],
            midPauseTime: 400,
            pauseTime: 1000,
        };
        this.addLineSprite(new BoxBoxSprite(this.transform, this.rotationState, this.projectedDrawCoordinates));
        this.addChildGameObject(new EnemySpawn(this.gameEngine));
        this.playSound(this.spawnSound);
    }

    // the radius will have to change as it spins
    // maybe I should store relative coordinates of each point, and update them here
    // I can make the further away line smaller width too

    // I only care about the projected x and y coordinates as it rotates
    // it will rotate a random direction, then pause

    // directions it can rotate: Top, Bottom, Left, Right
    // Bottom means x shift will be 0, y shift will be - 3/4 * w
    // Top means x shift will be 0, y shift will be 3/4 * w
    // Left means x shift will be - 3/4 * w, y shift will be 0
    // Right means x shift will be 3/4 * w, y shift will be 0

    // coordinates: BottomSquareBL, BottomSquareBR, BottomSquareTL, BottomSquareTR, TopSquareBL, TopSquareBR, TopSquareTL, TopSquareTR
    // zCoordinates: _BottomSquareBL, _BottomSquareBR, _BottomSquareTL, _BottomSquareTR, _TopSquareBL, _TopSquareBR, _TopSquareTL, _TopSquareTR

    // rotating next to the edge of the map is complicated... let's worry about it later

    // tells the sprite which state it's in
    // rotating, midPaused, completingRotation, paused

    // lines parallel to the axis of rotation will be the same length
    // coordinate perpendicular to the axis of rotation will be cosine of the angle of rotation

    // switch to the other shape state
    // switch to the other rotation direction
    setupCompleteRotation() {
        const rotationDirection = this.rotationState.rotationDirection;
        const shapeState = this.rotationState.shapeState;
        this.rotationState.shapeState = shapeState === "TopLeft" ? "BottomLeft" : "TopLeft";    
        if(rotationDirection === "Top") {
            this.setRotationDirectionProperties("Bottom");
        } else if(rotationDirection === "Bottom") {
            this.setRotationDirectionProperties("Top");
        } else if(rotationDirection === "Left") {
            this.setRotationDirectionProperties("Right");
        } else if(rotationDirection === "Right") {
            this.setRotationDirectionProperties("Left");
        }
    }

    // let's just do flat boxbox rotation for now
    // Bottom rotation first
    // rotate until 90 degrees, pause, then unrotate until 0 degrees
    animate(deltaTime: number) {
        const animationState = this.rotationState.animationState;
        let rotationAngle = this.rotationState.rotationAngle;
        
        const coordinateShift = this.rotationState.coordinateShift;
        // defined statically above this class
        const projectedDrawCoordinates = this.projectedDrawCoordinates;

        const midPauseTime = this.rotationState.midPauseTime;
        const pauseTime = this.rotationState.pauseTime;
        let originalAngle = rotationAngle;
        if(animationState === "Rotating") {
            this.rotationState.positionShift = [0,0];
            if(rotationAngle < Math.PI / 2) {
                rotationAngle += Math.PI / 2 * deltaTime / 1000;
            } else {
                rotationAngle = Math.PI / 2;
                originalAngle = Math.PI / 2;
                this.rotationState.animationState = "MidPaused";
                // next rotation axis will be grabbed
            }
        } else if (animationState === "MidPaused") {
            this.rotationState.stateTime += deltaTime;
            // this.rotationState.positionShift[0] = this.rotationState.positionShift[0] * -1;
            // this.rotationState.positionShift[1] = this.rotationState.positionShift[1] * -1;
            if(this.rotationState.stateTime > midPauseTime) {
                this.rotationState.stateTime = 0;
                this.rotationState.animationState = "CompletingRotation";
                this.setupCompleteRotation();
            }
        } else if(animationState === "CompletingRotation") {
            // after the mid pause, we should continue the rotation
            if(rotationAngle > 0) { 
                // this isn't general yet, since we can rotate up to 2 pi.. 
                // but that won't work since it could change to an orthogonal
                // direction of rotation
                rotationAngle -= Math.PI / 2 * deltaTime / 1000;
            } else {
                rotationAngle = 0;
                originalAngle = 0;
                this.rotationState.animationState = "Paused";
            }
        } else if(animationState === "Paused") {
            this.rotationState.stateTime += deltaTime;
            if(this.rotationState.stateTime > pauseTime) {
                this.rotationState.stateTime = 0;
                this.rotationState.animationState = "Rotating";
                this.startRotation();
            }
        }
        const rotationDirection = this.rotationState.rotationDirection;
        this.rotationState.rotationAngle = rotationAngle;

        // calculating the length and original angle once is faster than every frame
        // #optimization
        const w = BoxBox.boxWidth;
        const d = BoxBox.boxDepth;
        const positionChange = 
        (Math.sqrt((3/2 * w)**2 + d**2)/2) * Math.cos((originalAngle + Math.atan(d/ (3/2 * w)))) -
        (Math.sqrt((3/2 * w)**2 + d**2)/2) * Math.cos((rotationAngle + Math.atan(d/ (3/2 * w))));
        const drawPositionChange = (3/2 * w) / 2 - (Math.sqrt((3/2 * w)**2 + d**2)/2) * Math.cos((rotationAngle + Math.atan(d/ (3/2 * w))));

        if(rotationDirection === "Top") { // because y is upside down
            this.transform.pos[1] -= positionChange;
            this.rotationState.positionShift[1] = -drawPositionChange;
        } else if(rotationDirection === "Bottom") {
            this.transform.pos[1] += positionChange;
            this.rotationState.positionShift[1] = drawPositionChange;
        } else if(rotationDirection === "Left") {
            this.transform.pos[0] -= positionChange;
            this.rotationState.positionShift[0] = -drawPositionChange;
        } else if(rotationDirection === "Right") {
            this.transform.pos[0] += positionChange;
            this.rotationState.positionShift[0] = drawPositionChange;
        }


        // depending on which rotation direction, the coordinate shift will be different




        // apply rotation angle to coordinates
        const projectedWidthScale = [1, 1];
        if(rotationDirection === "Top"  || rotationDirection === "Bottom") { 
            projectedWidthScale[1] = Math.cos(rotationAngle);
        } else if (rotationDirection === "Left" || rotationDirection === "Right") {
            projectedWidthScale[0] = Math.cos(rotationAngle);
        }

        // might be faster to do this as an array we map over and then draw with
        // I can use the hard coded values directly when not rotating

        // I think BottomLeft vs TopLeft will be no longer needed if we can continue to rotate past 90 degrees
        // except theres issues there since it can rotate in any direction after getting to 180 degrees
        // I think I'll have to then swap points to the reversed version
        const drawCoordinates = this.rotationState.shapeState === "BottomLeft" ? BoxBox.drawCoordinatesBottomLeft : BoxBox.drawCoordinatesTopLeft;
        let [x, y] = drawCoordinates.BottomSquareBL;
        let angleOffset = 0;
        projectedDrawCoordinates.BottomSquareBL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
        [x, y] = drawCoordinates.BottomSquareBR;
        projectedDrawCoordinates.BottomSquareBR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
        [x, y] = drawCoordinates.BottomSquareTL;
        projectedDrawCoordinates.BottomSquareTL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
        [x, y] = drawCoordinates.BottomSquareTR;
        projectedDrawCoordinates.BottomSquareTR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
        [x, y] = drawCoordinates.TopSquareBL;
        projectedDrawCoordinates.TopSquareBL    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
        [x, y] = drawCoordinates.TopSquareBR;
        projectedDrawCoordinates.TopSquareBR    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
        [x, y] = drawCoordinates.TopSquareTL;
        projectedDrawCoordinates.TopSquareTL    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
        [x, y] = drawCoordinates.TopSquareTR;
        projectedDrawCoordinates.TopSquareTR    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];

        if(rotationDirection === "Left") {
            const drawCoordinatesLeft = drawCoordinates.Left; 
            // rotationAngle += Math.PI;
            // distances to axis of rotation, [x, y, angleOffset], y is the same, x requires pythag;
            [x,y,angleOffset] = drawCoordinatesLeft._BottomSquareBL;
            projectedDrawCoordinates._BottomSquareBL = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
            [x, y, angleOffset] = drawCoordinatesLeft._BottomSquareBR;
            projectedDrawCoordinates._BottomSquareBR = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
            [x, y, angleOffset] = drawCoordinatesLeft._BottomSquareTL;
            projectedDrawCoordinates._BottomSquareTL = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
            [x, y, angleOffset] = drawCoordinatesLeft._BottomSquareTR;
            projectedDrawCoordinates._BottomSquareTR = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
            [x, y, angleOffset] = drawCoordinatesLeft._TopSquareBL;
            projectedDrawCoordinates._TopSquareBL    = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
            [x, y, angleOffset] = drawCoordinatesLeft._TopSquareBR;
            projectedDrawCoordinates._TopSquareBR    = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
            [x, y, angleOffset] = drawCoordinatesLeft._TopSquareTL;
            projectedDrawCoordinates._TopSquareTL    = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];

            [x, y, angleOffset] = drawCoordinatesLeft._TopSquareTR;
            projectedDrawCoordinates._TopSquareTR    = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
        }
        if(rotationDirection === "Right") {
            const drawCoordinatesRight = drawCoordinates.Right; 
            rotationAngle += Math.PI;
            // distances to axis of rotation, [x, y, angleOffset], y is the same, x requires pythag;
            [x, y, angleOffset] = drawCoordinatesRight._BottomSquareBL;
            projectedDrawCoordinates._BottomSquareBL = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
            [x, y, angleOffset] = drawCoordinatesRight._BottomSquareBR;
            projectedDrawCoordinates._BottomSquareBR = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
            [x, y, angleOffset] = drawCoordinatesRight._BottomSquareTL;
            projectedDrawCoordinates._BottomSquareTL = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
            [x, y, angleOffset] = drawCoordinatesRight._BottomSquareTR;
            projectedDrawCoordinates._BottomSquareTR = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
            [x, y, angleOffset] = drawCoordinatesRight._TopSquareBL;
            projectedDrawCoordinates._TopSquareBL    = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
            [x, y, angleOffset] = drawCoordinatesRight._TopSquareBR;
            projectedDrawCoordinates._TopSquareBR    = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
            [x, y, angleOffset] = drawCoordinatesRight._TopSquareTL;
            projectedDrawCoordinates._TopSquareTL    = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];

            [x, y, angleOffset] = drawCoordinatesRight._TopSquareTR;
            projectedDrawCoordinates._TopSquareTR    = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
        }
        if(rotationDirection === "Top") {
            const drawCoordinatesTop = drawCoordinates.Top; 
            // rotationAngle += Math.PI;
            // distances to axis of rotation, [x, y, angleOffset], x is the same, y requires pythag;
            [x,y,angleOffset] = drawCoordinatesTop._BottomSquareBL;
            projectedDrawCoordinates._BottomSquareBL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
            [x, y, angleOffset] = drawCoordinatesTop._BottomSquareBR;
            projectedDrawCoordinates._BottomSquareBR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
            [x, y, angleOffset] = drawCoordinatesTop._BottomSquareTL;
            projectedDrawCoordinates._BottomSquareTL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
            [x, y, angleOffset] = drawCoordinatesTop._BottomSquareTR;
            projectedDrawCoordinates._BottomSquareTR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
            [x, y, angleOffset] = drawCoordinatesTop._TopSquareBL;
            projectedDrawCoordinates._TopSquareBL    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
            [x, y, angleOffset] = drawCoordinatesTop._TopSquareBR;
            projectedDrawCoordinates._TopSquareBR    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
            [x, y, angleOffset] = drawCoordinatesTop._TopSquareTL;
            projectedDrawCoordinates._TopSquareTL    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];

            [x, y, angleOffset] = drawCoordinatesTop._TopSquareTR;
            projectedDrawCoordinates._TopSquareTR    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
        } 
        if(rotationDirection === "Bottom") {
            const drawCoordinatesBottom = drawCoordinates.Bottom; 
            // rotationAngle += Math.PI;
            // distances to axis of rotation, [x, y, angleOffset], x is the same, y requires pythag;
            [x,y,angleOffset] = drawCoordinatesBottom._BottomSquareBL;
            projectedDrawCoordinates._BottomSquareBL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
            [x, y, angleOffset] = drawCoordinatesBottom._BottomSquareBR;
            projectedDrawCoordinates._BottomSquareBR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
            [x, y, angleOffset] = drawCoordinatesBottom._BottomSquareTL;
            projectedDrawCoordinates._BottomSquareTL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
            [x, y, angleOffset] = drawCoordinatesBottom._BottomSquareTR;
            projectedDrawCoordinates._BottomSquareTR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
            [x, y, angleOffset] = drawCoordinatesBottom._TopSquareBL;
            projectedDrawCoordinates._TopSquareBL    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
            [x, y, angleOffset] = drawCoordinatesBottom._TopSquareBR;
            projectedDrawCoordinates._TopSquareBR    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
            [x, y, angleOffset] = drawCoordinatesBottom._TopSquareTL;
            projectedDrawCoordinates._TopSquareTL    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];

            [x, y, angleOffset] = drawCoordinatesBottom._TopSquareTR;
            projectedDrawCoordinates._TopSquareTR    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
        }
        // I do not need to consider the coordinate shift for the prime coordinates
        // I do for the non-primes because they are drawn from the center of the BoxBox, and are more general
    }
    
    setRotationDirectionProperties(rotationDirection: RotationState["rotationDirection"]) {
        const w = BoxBox.boxWidth;
        const coordinateShift = this.rotationState.coordinateShift;
        if(rotationDirection === "Top") {
            coordinateShift[0] = 0;
            coordinateShift[1] = 3/4 * w;
        } else if (rotationDirection === "Bottom") {
            coordinateShift[0] = 0;
            coordinateShift[1] = -3/4 * w;
        } else if (rotationDirection === "Left") {
            coordinateShift[0] = 3/4 * w;
            coordinateShift[1] = 0;
        } else if (rotationDirection === "Right") {
            coordinateShift[0] = -3/4 * w;
            coordinateShift[1] = 0;
        }
        this.rotationState.rotationDirection = rotationDirection;
    }

    startRotation() {
        // pick rotation direction
        // if (this.rotationState.rotationDirection === "Bottom") {
        //     this.rotationState.shapeState = this.rotationState.shapeState === "TopLeft" ? "BottomLeft" : "TopLeft";
        // }
        // const directionsMap = {Top: "Right", Right: "Bottom", Bottom: "Left", Left: "Top"};
        // pick random rotation direction 
        const rotationDirection = BoxBox.rotationDirections[Math.floor(Math.random() * BoxBox.rotationDirections.length)]; 
        // const rotationDirection = directionsMap[this.rotationState.rotationDirection];
        
        this.setRotationDirectionProperties(rotationDirection);
    }

    continueRotation() {
        // swap points, change coordinate shift
    }

    exist() {
    // leaving off subscriptions means that things will subscribe to it
        this.addCollider("General", this, this.radius);
        // now it will move
        this.addPhysicsComponent();
    }
 
    wallGraze(){
        GEOWarsScript.wallGraze(this.transform, this.radius);
    }


    update(delta: number){
        this.animate(delta);
        if (GEOWarsScript.isOutOfBounds(this.transform.absolutePosition(), this.radius * 2)) {
            this.wallGraze(); 
        }
    }
}
