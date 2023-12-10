import {GameObject} from "../../../game_engine/game_object";
import {Sound} from "../../../game_engine/sound";
import {EnemySpawn} from "../../particles/enemy_spawn";
import {BoxBoxSprite} from "./boxbox_sprite";

export class BoxBox extends GameObject {
    constructor(engine, pos) {
        super(engine);
        this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_blue.wav", 0.5);
        this.transform.pos = pos;
        this.radius = 10;
        this.points = 20;
        // this.addPhysicsComponent()
        this.projectedDrawCoordinatesBottomLeft = {};
        this.projectedDrawCoordinatesTopLeft = {};
        
        this.boxWidth = 10;
        this.boxDepth = this.boxWidth;

        // there's only two versions of this coordate object
        // 1. bottom left, top right
        // 2. top left, bottom right


        // bottom left:
        const w = this.boxWidth;
        const d = this.boxDepth;
        // the axis of rotation determines the length of the line for the _ coordinates
        const drawCoordinatesBottomLeft = {
            BottomSquareBL: [-3/4 * w,  -3/4 * w],
            BottomSquareBR: [1/4 * w, -3/4 * w],
            BottomSquareTL: [-3/4 * w, 1/4 * w],
            BottomSquareTR: [1/4 * w, 1/4 * w],
            TopSquareBL: [-1/4 * w, -1/4 * w],
            TopSquareBR: [3/4 * w, -1/4 * w],
            TopSquareTL: [-1/4 * w, 3/4 * w],
            TopSquareTR: [3/4 * w, 3/4 * w],
            Left: { // distances to axis of rotation, [x, y, angleOffset], y is the same, x requires pythag;
                // take these distances to the axis of rotation, and then multiply them by cos(angle) of rotation
                _BottomSquareBL: [d,  -3/4 * w, Math.PI/2], // angle starts 90 degrees 
                _BottomSquareBR: [Math.sqrt(w**2 + d**2), -3/4 * w, Math.atan(d/w)], // scaled length is distance from axis of rotation
                _BottomSquareTL: [d, 1/4 * w, Math.PI/2],
                _BottomSquareTR: [Math.sqrt(w**2 + d**2), 1/4 * w, Math.atan(d/w)],
                _TopSquareBL: [Math.sqrt((w / 2)**2 + d**2), -1/4 * w, Math.atan(d/(w/2))],
                _TopSquareBR: [Math.sqrt((3/2 * w)**2 + d**2), -1/4 * w, Math.atan(d/(3/2 * w))],
                _TopSquareTL: [Math.sqrt((w / 2)**2 + d**2), 3/4 * w, Math.atan(d/(w/2))],
                _TopSquareTR: [Math.sqrt((3/2 * w)**2 + d**2), 3/4 * w, Math.atan(d/(3/2 * w))]
            },
            Right: {
                _BottomSquareBL: [Math.sqrt((3/2 * w)**2 + d**2), -3/4 * w, Math.atan(d/(3/2 * w))], // angle starts 90 degrees 
                _BottomSquareBR: [Math.sqrt((w / 2)**2 + d**2), -3/4 * w, Math.atan(d/(w/2))],
                _BottomSquareTL: [Math.sqrt((3/2 * w)**2 + d**2), 1/4 * w, Math.atan(d/(3/2 * w))],
                _BottomSquareTR: [Math.sqrt((w / 2)**2 + d**2), 1/4 * w, Math.atan(d/(w/2))],
                _TopSquareBL: [Math.sqrt(w**2 + d**2), -1/4 * w, Math.atan(d/w)],
                _TopSquareBR: [d, -1/4 * w, Math.PI/2], 
                _TopSquareTL: [Math.sqrt(w**2 + d**2), 3/4 * w, Math.atan(d/w)],
                _TopSquareTR: [d, 3/4 * w, Math.PI/2] 
            },
            Top: { // X stays the same, Y scales
                _BottomSquareBL: [-3/4 * w, -Math.sqrt((3/2 * w)**2 + d**2),  Math.atan(d/(3/2 * w))],//[d,  -3/4 * w, Math.PI/2], // angle starts 90 degrees
                _BottomSquareBR: [1/4 * w, -Math.sqrt((3/2 * w)**2 + d**2),  Math.atan(d/(3/2 * w))],
                _BottomSquareTL: [-3/4 * w, -Math.sqrt((w / 2)**2 + d**2), Math.atan(d/(w/2))],
                _BottomSquareTR: [1/4 * w, -Math.sqrt((w / 2)**2 + d**2), Math.atan(d/(w/2))],
                _TopSquareBL: [-1/4 * w, -Math.sqrt(w**2 + d**2), Math.atan(d/ w)],
                _TopSquareBR: [3/4 * w, -Math.sqrt(w**2 + d**2), Math.atan(d/ w)],
                _TopSquareTL: [-1/4 * w, d, -Math.PI/2],
                _TopSquareTR: [3/4 * w, d, -Math.PI/2]
            },
            Bottom: { // X stays the same, Y scales
                _BottomSquareBL: [-3/4 * w, d, Math.PI/2],
                _BottomSquareBR: [1/4 * w, d, Math.PI/2],
                _BottomSquareTL: [-3/4 * w, -Math.sqrt(w**2 + d**2), Math.atan(d/ w)],
                _BottomSquareTR: [1/4 * w, -Math.sqrt(w**2 + d**2), Math.atan(d/ w)],
                _TopSquareBL: [-1/4 * w, -Math.sqrt((w / 2)**2 + d**2), Math.atan(d/(w/2))],
                _TopSquareBR: [3/4 * w, -Math.sqrt((w / 2)**2 + d**2), Math.atan(d/(w/2))],
                _TopSquareTL: [-1/4 * w, -Math.sqrt((3/2 * w)**2 + d**2),  Math.atan(d/(3/2 * w))],
                _TopSquareTR: [3/4 * w, -Math.sqrt((3/2 * w)**2 + d**2),  Math.atan(d/(3/2 * w))]
            },
            _BottomSquareBL: [-3/4 * w,  -3/4 * w], // angle starts 90 degrees 
            _BottomSquareBR: [1/4 * w, -3/4 * w], // scaled length is distance from axis of rotation
            _BottomSquareTL: [-3/4 * w, 1/4 * w],
            _BottomSquareTR: [1/4 * w, 1/4 * w],
            _TopSquareBL: [-1/4 * w, -1/4 * w],
            _TopSquareBR: [3/4 * w, -1/4 * w],
            _TopSquareTL: [-1/4 * w, 3/4 * w],
            _TopSquareTR: [3/4 * w, 3/4 * w],
        };
        const projectedDrawCoordinatesBottomLeft = {
            BottomSquareBL: [...drawCoordinatesBottomLeft.BottomSquareBL],
            BottomSquareBR: [...drawCoordinatesBottomLeft.BottomSquareBR],
            BottomSquareTL: [...drawCoordinatesBottomLeft.BottomSquareTL],
            BottomSquareTR: [...drawCoordinatesBottomLeft.BottomSquareTR],
            TopSquareBL: [...drawCoordinatesBottomLeft.TopSquareBL],
            TopSquareBR: [...drawCoordinatesBottomLeft.TopSquareBR],
            TopSquareTL: [...drawCoordinatesBottomLeft.TopSquareTL],
            TopSquareTR: [...drawCoordinatesBottomLeft.TopSquareTR],
            _BottomSquareBL: [...drawCoordinatesBottomLeft._BottomSquareBL],
            _BottomSquareBR: [...drawCoordinatesBottomLeft._BottomSquareBR],
            _BottomSquareTL: [...drawCoordinatesBottomLeft._BottomSquareTL],
            _BottomSquareTR: [...drawCoordinatesBottomLeft._BottomSquareTR],
            _TopSquareBL: [...drawCoordinatesBottomLeft._TopSquareBL],
            _TopSquareBR: [...drawCoordinatesBottomLeft._TopSquareBR],
            _TopSquareTL: [...drawCoordinatesBottomLeft._TopSquareTL],
            _TopSquareTR: [...drawCoordinatesBottomLeft._TopSquareTR],
        };
        
        const drawCoordinatesTopLeft = {
            // flip Y coordinates for this shape
            BottomSquareBL: [-1/4 * w, 3/4 * w],
            BottomSquareBR: [3/4 * w, 3/4 * w],
            BottomSquareTL: [-1/4 * w, -1/4 * w],
            BottomSquareTR: [3/4 * w, -1/4 * w],
            TopSquareBL: [-3/4 * w, 1/4 * w],
            TopSquareBR: [1/4 * w, 1/4 * w],
            TopSquareTL: [-3/4 * w, -3/4 * w],
            TopSquareTR: [1/4 * w, -3/4 * w],
            /*
            BottomSquareBL: [-3/4 * w,  -3/4 * w],
            BottomSquareBR: [1/4 * w, -3/4 * w],
            BottomSquareTL: [-3/4 * w, 1/4 * w],
            BottomSquareTR: [1/4 * w, 1/4 * w],
            TopSquareBL: [-1/4 * w, -1/4 * w],
            TopSquareBR: [3/4 * w, -1/4 * w],
            TopSquareTL: [-1/4 * w, 3/4 * w],
            TopSquareTR: [3/4 * w, 3/4 * w],
            */
           
            Left: { // distances to axis of rotation, [x, y, angleOffset], y is the same, x requires pythag;
                // take these distances to the axis of rotation, and then multiply them by cos(angle) of rotation
                _BottomSquareBL: [d,  3/4 * w, Math.PI/2], // angle starts 90 degrees 
                _BottomSquareBR: [Math.sqrt(w**2 + d**2), 3/4 * w, Math.atan(d/w)], // scaled length is distance from axis of rotation
                _BottomSquareTL: [d, -1/4 * w, Math.PI/2],
                _BottomSquareTR: [Math.sqrt(w**2 + d**2), -1/4 * w, Math.atan(d/w)],
                _TopSquareBL: [Math.sqrt((w / 2)**2 + d**2), 1/4 * w, Math.atan(d/(w/2))],
                _TopSquareBR: [Math.sqrt((3/2 * w)**2 + d**2), 1/4 * w, Math.atan(d/(3/2 * w))],
                _TopSquareTL: [Math.sqrt((w / 2)**2 + d**2), -3/4 * w, Math.atan(d/(w/2))],
                _TopSquareTR: [Math.sqrt((3/2 * w)**2 + d**2), -3/4 * w, Math.atan(d/(3/2 * w))]
            },
            Right: {
                _BottomSquareBL: [Math.sqrt((3/2 * w)**2 + d**2), 3/4 * w, Math.atan(d/(3/2 * w))], // angle starts 90 degrees 
                _BottomSquareBR: [Math.sqrt((w / 2)**2 + d**2), 3/4 * w, Math.atan(d/(w/2))],
                _BottomSquareTL: [Math.sqrt((3/2 * w)**2 + d**2), -1/4 * w, Math.atan(d/(3/2 * w))],
                _BottomSquareTR: [Math.sqrt((w / 2)**2 + d**2), -1/4 * w, Math.atan(d/(w/2))],
                _TopSquareBL: [Math.sqrt(w**2 + d**2), 1/4 * w, Math.atan(d/w)],
                _TopSquareBR: [d, 1/4 * w, Math.PI/2], 
                _TopSquareTL: [Math.sqrt(w**2 + d**2), -3/4 * w, Math.atan(d/w)],
                _TopSquareTR: [d, -3/4 * w, Math.PI/2] 
            },
            Top: { // X stays the same, Y scales
                _BottomSquareBL: [-3/4 * w, -Math.sqrt((3/2 * w)**2 + d**2),  Math.atan(d/(3/2 * w))],//[d,  -3/4 * w, Math.PI/2], // angle starts 90 degrees
                _BottomSquareBR: [1/4 * w, -Math.sqrt((3/2 * w)**2 + d**2),  Math.atan(d/(3/2 * w))],
                _BottomSquareTL: [-3/4 * w, -Math.sqrt((w / 2)**2 + d**2), Math.atan(d/(w/2))],
                _BottomSquareTR: [1/4 * w, -Math.sqrt((w / 2)**2 + d**2), Math.atan(d/(w/2))],
                _TopSquareBL: [-1/4 * w, -Math.sqrt(w**2 + d**2), Math.atan(d/w)],
                _TopSquareBR: [3/4 * w, -Math.sqrt(w**2 + d**2), Math.atan(d/ w)],
                _TopSquareTL: [-1/4 * w, -d, Math.PI/2],
                _TopSquareTR: [3/4 * w, -d, Math.PI/2]
            },
            Bottom: { // X stays the same, Y scales
                _BottomSquareBL: [-3/4 * w, d, Math.PI/2],
                _BottomSquareBR: [1/4 * w, d, Math.PI/2],
                _BottomSquareTL: [-3/4 * w, Math.sqrt(w**2 + d**2), Math.atan(d/ w)],
                _BottomSquareTR: [1/4 * w, Math.sqrt(w**2 + d**2), Math.atan(d/ w)],
                _TopSquareBL: [-1/4 * w, Math.sqrt((w / 2)**2 + d**2), Math.atan(d/(w/2))],
                _TopSquareBR: [3/4 * w, Math.sqrt((w / 2)**2 + d**2), Math.atan(d/(w/2))],
                _TopSquareTL: [-1/4 * w, Math.sqrt((3/2 * w)**2 + d**2),  Math.atan(d/(3/2 * w))],
                _TopSquareTR: [3/4 * w, Math.sqrt((3/2 * w)**2 + d**2),  Math.atan(d/(3/2 * w))]
            },
            _BottomSquareBL: [-1/4 * w, 3/4 * w], // angle starts + 90 degrees
            _BottomSquareBR: [3/4 * w, 3/4 * w],
            _BottomSquareTL: [-1/4 * w, -1/4 * w],
            _BottomSquareTR: [3/4 * w, -1/4 * w],
            _TopSquareBL: [-3/4 * w, 1/4 * w],
            _TopSquareBR: [1/4 * w, 1/4 * w],
            _TopSquareTL: [-3/4 * w, -3/4 * w],
            _TopSquareTR: [1/4 * w, -3/4 * w],
        };
        const projectedDrawCoordinatesTopLeft = {
            BottomSquareBL: [...drawCoordinatesTopLeft.BottomSquareBL],
            BottomSquareBR: [...drawCoordinatesTopLeft.BottomSquareBR],
            BottomSquareTL: [...drawCoordinatesTopLeft.BottomSquareTL],
            BottomSquareTR: [...drawCoordinatesTopLeft.BottomSquareTR],
            TopSquareBL: [...drawCoordinatesTopLeft.TopSquareBL],
            TopSquareBR: [...drawCoordinatesTopLeft.TopSquareBR],
            TopSquareTL: [...drawCoordinatesTopLeft.TopSquareTL],
            TopSquareTR: [...drawCoordinatesTopLeft.TopSquareTR],
            _BottomSquareBL: [...drawCoordinatesTopLeft._BottomSquareBL],
            _BottomSquareBR: [...drawCoordinatesTopLeft._BottomSquareBR],
            _BottomSquareTL: [...drawCoordinatesTopLeft._BottomSquareTL],
            _BottomSquareTR: [...drawCoordinatesTopLeft._BottomSquareTR],
            _TopSquareBL: [...drawCoordinatesTopLeft._TopSquareBL],
            _TopSquareBR: [...drawCoordinatesTopLeft._TopSquareBR],
            _TopSquareTL: [...drawCoordinatesTopLeft._TopSquareTL],
            _TopSquareTR: [...drawCoordinatesTopLeft._TopSquareTR],

        };
        // top right
        this.animationStates = ["Paused", "Rotating", "MidPaused", "CompletingRotation"];
        this.rotationDirections = ["Bottom", "Top",];// "Left", "Right"];
        this.shapeStates = ["BottomLeft", "TopLeft"];
        this.rotationState = {
            animationState: "Paused",
            rotationDirection: "Bottom",
            coordinateShift: [0,-3/4 * w],
            rotationAngle: 0,
            stateTime: 0,
            shapeState: "TopLeft",
            drawCoordinatesBottomLeft,
            drawCoordinatesTopLeft,
            projectedDrawCoordinatesBottomLeft,
            projectedDrawCoordinatesTopLeft,
            midPauseTime: 200,
            pauseTime: 1000,
        };
        this.addLineSprite(new BoxBoxSprite(this.transform, this.rotationState));
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

    // let's just do flat boxbox rotation for now
    // Bottom rotation first
    // rotate until 90 degrees, pause, then unrotate until 0 degrees
    animate(deltaTime) {
        const animationState = this.rotationState.animationState;
        let rotationAngle = this.rotationState.rotationAngle;
        const rotationDirection = this.rotationState.rotationDirection;
        const coordinateShift = this.rotationState.coordinateShift;
        const projectedDrawCoordinatesBottomLeft = this.rotationState.projectedDrawCoordinatesBottomLeft;
        const projectedDrawCoordinatesTopLeft = this.rotationState.projectedDrawCoordinatesTopLeft;
        const midPauseTime = this.rotationState.midPauseTime;
        const pauseTime = this.rotationState.pauseTime;
        if(animationState === "Rotating") {
            if(rotationAngle < Math.PI / 2) {
                rotationAngle += Math.PI / 2 * deltaTime / 1000;
            } else {
                rotationAngle = Math.PI / 2;
                this.rotationState.animationState = "MidPaused";
                // next rotation axis will be grabbed
            }
        } else if (animationState === "MidPaused") {
            this.rotationState.stateTime += deltaTime;
            if(this.rotationState.stateTime > midPauseTime) {
                this.rotationState.stateTime = 0;
                this.rotationState.animationState = "CompletingRotation";
            }
        } else if(animationState === "CompletingRotation") {
            // after the mid pause, we should continue the rotation
            if(rotationAngle < Math.PI) { // this isn't general yet, since we can rotate up to 2 pi.. but that won't work since it could change to an orthogonal direction of rotation
                rotationAngle += Math.PI / 2 * deltaTime / 1000;
            } else {
                rotationAngle = 0;
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
        this.rotationState.rotationAngle = rotationAngle;
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
        const drawCoordinates = this.rotationState.shapeState === "BottomLeft" ? this.rotationState.drawCoordinatesBottomLeft : this.rotationState.drawCoordinatesTopLeft;
        if(this.rotationState.shapeState === "BottomLeft" || this.rotationState.shapeState === "TopLeft") {
            let [x, y, angleOffset] = drawCoordinates.BottomSquareBL;
            projectedDrawCoordinatesBottomLeft.BottomSquareBL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
            [x, y, angleOffset] = drawCoordinates.BottomSquareBR;
            projectedDrawCoordinatesBottomLeft.BottomSquareBR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
            [x, y, angleOffset] = drawCoordinates.BottomSquareTL;
            projectedDrawCoordinatesBottomLeft.BottomSquareTL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
            [x, y, angleOffset] = drawCoordinates.BottomSquareTR;
            projectedDrawCoordinatesBottomLeft.BottomSquareTR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
            [x, y, angleOffset] = drawCoordinates.TopSquareBL;
            projectedDrawCoordinatesBottomLeft.TopSquareBL    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
            [x, y, angleOffset] = drawCoordinates.TopSquareBR;
            projectedDrawCoordinatesBottomLeft.TopSquareBR    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
            [x, y, angleOffset] = drawCoordinates.TopSquareTL;
            projectedDrawCoordinatesBottomLeft.TopSquareTL    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
            [x, y, angleOffset] = drawCoordinates.TopSquareTR;
            projectedDrawCoordinatesBottomLeft.TopSquareTR    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y + coordinateShift[1]) * projectedWidthScale[1]];
            if(rotationDirection === "Left") {
                const drawCoordinatesLeft = drawCoordinates.Left; 
                // rotationAngle += Math.PI;
                // distances to axis of rotation, [x, y, angleOffset], y is the same, x requires pythag;
                [x,y,angleOffset] = drawCoordinatesLeft._BottomSquareBL;
                projectedDrawCoordinatesBottomLeft._BottomSquareBL = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
                [x, y, angleOffset] = drawCoordinatesLeft._BottomSquareBR;
                projectedDrawCoordinatesBottomLeft._BottomSquareBR = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
                [x, y, angleOffset] = drawCoordinatesLeft._BottomSquareTL;
                projectedDrawCoordinatesBottomLeft._BottomSquareTL = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
                [x, y, angleOffset] = drawCoordinatesLeft._BottomSquareTR;
                projectedDrawCoordinatesBottomLeft._BottomSquareTR = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
                [x, y, angleOffset] = drawCoordinatesLeft._TopSquareBL;
                projectedDrawCoordinatesBottomLeft._TopSquareBL    = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
                [x, y, angleOffset] = drawCoordinatesLeft._TopSquareBR;
                projectedDrawCoordinatesBottomLeft._TopSquareBR    = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
                [x, y, angleOffset] = drawCoordinatesLeft._TopSquareTL;
                projectedDrawCoordinatesBottomLeft._TopSquareTL    = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];

                [x, y, angleOffset] = drawCoordinatesLeft._TopSquareTR;
                projectedDrawCoordinatesBottomLeft._TopSquareTR    = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
            }
            if(rotationDirection === "Right") {
                const drawCoordinatesRight = drawCoordinates.Right; 
                rotationAngle += Math.PI;
                // distances to axis of rotation, [x, y, angleOffset], y is the same, x requires pythag;
                [x, y, angleOffset] = drawCoordinatesRight._BottomSquareBL;
                projectedDrawCoordinatesBottomLeft._BottomSquareBL = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
                [x, y, angleOffset] = drawCoordinatesRight._BottomSquareBR;
                projectedDrawCoordinatesBottomLeft._BottomSquareBR = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
                [x, y, angleOffset] = drawCoordinatesRight._BottomSquareTL;
                projectedDrawCoordinatesBottomLeft._BottomSquareTL = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
                [x, y, angleOffset] = drawCoordinatesRight._BottomSquareTR;
                projectedDrawCoordinatesBottomLeft._BottomSquareTR = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
                [x, y, angleOffset] = drawCoordinatesRight._TopSquareBL;
                projectedDrawCoordinatesBottomLeft._TopSquareBL    = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
                [x, y, angleOffset] = drawCoordinatesRight._TopSquareBR;
                projectedDrawCoordinatesBottomLeft._TopSquareBR    = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
                
                [x, y, angleOffset] = drawCoordinatesRight._TopSquareTL;
                projectedDrawCoordinatesBottomLeft._TopSquareTL    = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];

                [x, y, angleOffset] = drawCoordinatesRight._TopSquareTR;
                projectedDrawCoordinatesBottomLeft._TopSquareTR    = [(x * Math.cos(angleOffset + rotationAngle)), (-y + coordinateShift[1]) * projectedWidthScale[1]];
            }
            if(rotationDirection === "Top") {
                const drawCoordinatesTop = drawCoordinates.Top; 
                // rotationAngle += Math.PI;
                // distances to axis of rotation, [x, y, angleOffset], x is the same, y requires pythag;
                [x,y,angleOffset] = drawCoordinatesTop._BottomSquareBL;
                projectedDrawCoordinatesBottomLeft._BottomSquareBL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
                [x, y, angleOffset] = drawCoordinatesTop._BottomSquareBR;
                projectedDrawCoordinatesBottomLeft._BottomSquareBR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
                [x, y, angleOffset] = drawCoordinatesTop._BottomSquareTL;
                projectedDrawCoordinatesBottomLeft._BottomSquareTL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
                [x, y, angleOffset] = drawCoordinatesTop._BottomSquareTR;
                projectedDrawCoordinatesBottomLeft._BottomSquareTR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
                [x, y, angleOffset] = drawCoordinatesTop._TopSquareBL;
                projectedDrawCoordinatesBottomLeft._TopSquareBL    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
                [x, y, angleOffset] = drawCoordinatesTop._TopSquareBR;
                projectedDrawCoordinatesBottomLeft._TopSquareBR    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
                [x, y, angleOffset] = drawCoordinatesTop._TopSquareTL;
                projectedDrawCoordinatesBottomLeft._TopSquareTL    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];

                [x, y, angleOffset] = drawCoordinatesTop._TopSquareTR;
                projectedDrawCoordinatesBottomLeft._TopSquareTR    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
            } 
            if(rotationDirection === "Bottom") {
                const drawCoordinatesBottom = drawCoordinates.Bottom; 
                // rotationAngle += Math.PI;
                // distances to axis of rotation, [x, y, angleOffset], x is the same, y requires pythag;
                [x,y,angleOffset] = drawCoordinatesBottom._BottomSquareBL;
                projectedDrawCoordinatesBottomLeft._BottomSquareBL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
                [x, y, angleOffset] = drawCoordinatesBottom._BottomSquareBR;
                projectedDrawCoordinatesBottomLeft._BottomSquareBR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
                [x, y, angleOffset] = drawCoordinatesBottom._BottomSquareTL;
                projectedDrawCoordinatesBottomLeft._BottomSquareTL = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
                [x, y, angleOffset] = drawCoordinatesBottom._BottomSquareTR;
                projectedDrawCoordinatesBottomLeft._BottomSquareTR = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
                [x, y, angleOffset] = drawCoordinatesBottom._TopSquareBL;
                projectedDrawCoordinatesBottomLeft._TopSquareBL    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
                [x, y, angleOffset] = drawCoordinatesBottom._TopSquareBR;
                projectedDrawCoordinatesBottomLeft._TopSquareBR    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
                
                [x, y, angleOffset] = drawCoordinatesBottom._TopSquareTL;
                projectedDrawCoordinatesBottomLeft._TopSquareTL    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];

                [x, y, angleOffset] = drawCoordinatesBottom._TopSquareTR;
                projectedDrawCoordinatesBottomLeft._TopSquareTR    = [(x + coordinateShift[0]) * projectedWidthScale[0], (-y * Math.cos(angleOffset + rotationAngle))];
            }
        } else {
            projectedDrawCoordinatesTopLeft.BottomSquareBL = [(drawCoordinates.BottomSquareBL[0] + coordinateShift[0]) * projectedWidthScale[0], (drawCoordinates.BottomSquareBL[1] + coordinateShift[1]) * projectedWidthScale[1]];
            projectedDrawCoordinatesTopLeft.BottomSquareBR = [(drawCoordinates.BottomSquareBR[0] + coordinateShift[0]) * projectedWidthScale[0], (drawCoordinates.BottomSquareBR[1] + coordinateShift[1]) * projectedWidthScale[1]];
            projectedDrawCoordinatesTopLeft.BottomSquareTL = [(drawCoordinates.BottomSquareTL[0] + coordinateShift[0]) * projectedWidthScale[0], (drawCoordinates.BottomSquareTL[1] + coordinateShift[1]) * projectedWidthScale[1]];
            projectedDrawCoordinatesTopLeft.BottomSquareTR = [(drawCoordinates.BottomSquareTR[0] + coordinateShift[0]) * projectedWidthScale[0], (drawCoordinates.BottomSquareTR[1] + coordinateShift[1]) * projectedWidthScale[1]];
            projectedDrawCoordinatesTopLeft.TopSquareBL = [(drawCoordinates.TopSquareBL[0] + coordinateShift[0]) * projectedWidthScale[0], (drawCoordinates.TopSquareBL[1] + coordinateShift[1]) * projectedWidthScale[1]];
            projectedDrawCoordinatesTopLeft.TopSquareBR = [(drawCoordinates.TopSquareBR[0] + coordinateShift[0]) * projectedWidthScale[0], (drawCoordinates.TopSquareBR[1] + coordinateShift[1]) * projectedWidthScale[1]];
            projectedDrawCoordinatesTopLeft.TopSquareTL = [(drawCoordinates.TopSquareTL[0] + coordinateShift[0]) * projectedWidthScale[0], (drawCoordinates.TopSquareTL[1] + coordinateShift[1]) * projectedWidthScale[1]];
            projectedDrawCoordinatesTopLeft.TopSquareTR = [(drawCoordinates.TopSquareTR[0] + coordinateShift[0]) * projectedWidthScale[0], (drawCoordinates.TopSquareTR[1] + coordinateShift[1]) * projectedWidthScale[1]];
        }
        // I do not need to consider the coordinate shift for the prime coordinates
        // I do for the non-primes because they are drawn from the center of the BoxBox, and are more general
    }

    startRotation() {
        // pick rotation direction
        const w = this.boxWidth;
        const coordinateShift = this.rotationState.coordinateShift;
        const rotationDirection = this.rotationDirections[Math.floor(Math.random() * this.rotationDirections.length)];
        this.rotationState.rotationDirection = rotationDirection;
        
        if(rotationDirection === "Top") {
            coordinateShift[0] = 0;
            coordinateShift[1] = 3/4 * w;
        } else if (rotationDirection === "Bottom") {
            coordinateShift[0] = 0;
            coordinateShift[1] =  -3/4 * w;
        } else if (rotationDirection === "Left") {
            coordinateShift[0] = 3/4 * w;
            coordinateShift[1] = 0;
        } else if (rotationDirection === "Right") {
            coordinateShift[0] = -3/4 * w;
            coordinateShift[1] = 0;
        }
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
        this.gameEngine.gameScript.wallGraze(this.transform, this.radius);
    }

    update(delta){
        this.animate(delta);
        if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius * 2)) {
            this.wallGraze(); 
        }
    }
}
