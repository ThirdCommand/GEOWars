import { GameObject } from "../../../game_engine/game_object";
import { LineSprite, Spawnable } from "../../../game_engine/line_sprite";
import { Transform } from "../../../game_engine/transform";
import { GameEngine } from "../../../game_engine/game_engine";
import { Camera } from "../../../game_engine/camera";
import {TurnInformation} from "../../../game_engine/physics_component"
import { EngineExhaust } from "./EngineExhaust";
import { AirDecelerationParticles } from "./AirDecelerationParticles";
import { BombBasic } from "../Bombs/BombBasic";
import { VectorMath } from "../../../game_engine/util";
import { BombReticle } from "./BombReticle";
import { StrikeTimeScript } from "../../../StrikeTimeScript";
import { AnimationView } from "../../../AnimationView";
import { ArcData } from "../../../game_engine/SpriteEditor/Point";
import { DotGizmo, LineGizmo, ArcGizmo } from "../../particles/Gizmo";

type ControlAction = {
    type: 'Bomb';
    time: number;
    completed: Boolean;
}

type ActiveCooldown = {
    time: number;
    cooldownTime: number;
    type: string;
    isCoolingDown: Boolean;
}

export class Aurora extends GameObject {
    lineSprite: AuroraSprite;
    turnEndTime: number | null;
    radius: number;
    hits: number;
    hitsWhenDead: number;
    turnRadius: number;
    minSpeed: number;
    maxSpeed: number;
    controlsDirection: [number, number] = [0,0];
    controlsAngle: number | null = null;
    jetAcceleration: number;
    jetDeceleration: number;
    controllerInUse: boolean;
    gameEditorHasBeenOpened: boolean;
    isTurning: boolean;
    isAccelerating: boolean;
    leftExhaust: EngineExhaust;
    rightExhaust: EngineExhaust;
    airDecelerationParticles: AirDecelerationParticles;
    bombReticle: BombReticle;
    bombCooldown: ActiveCooldown;
    destructedColor: string;
    destructionLineWidth: number;
    JKeyPressed: boolean;
    buttonActions: ControlAction[];
    previousControlsDirection: number;

    controlsDirectionGizmo: LineGizmo;
    startPointGizmo: DotGizmo;
    rotationPointGizmo: DotGizmo;
    endPointGizmo: DotGizmo;
    turnArcGizmo: ArcGizmo;

   

    constructor(
        engine: GameEngine | AnimationView,
        pos: [number, number],
        angle = Math.random() * Math.PI * 2
    ) {
        super(engine);
        this.transform.pos = pos;
        this.hits = 0;
        this.hitsWhenDead = 1000;
        this.transform.angle = angle;
        this.transform.vel = [0, 0];
        this.destructedColor = "rgb(255, 255, 255)";
        this.destructionLineWidth = 1.5;

        this.controlsDirectionGizmo = new LineGizmo(engine, [this.transform.pos[0], this.transform.pos[1]], [this.transform.pos[0], this.transform.pos[1]], "#272af3ff");
        this.endPointGizmo = new DotGizmo(this.gameEngine, [this.transform.pos[0], this.transform.pos[1]], 2, '#1d26a5ff');
        this.rotationPointGizmo = new DotGizmo(this.gameEngine, [this.transform.pos[0], this.transform.pos[1]], 1, '#FFFFFF');
        this.startPointGizmo = new DotGizmo(this.gameEngine, [this.transform.pos[0], this.transform.pos[1]], 4, '#ac2929ff');
        // new LineGizmo(this.gameEngine, [this.transform.pos[0], this.transform.pos[1]], [rotationPoint[0], rotationPoint[1]])
        this.turnArcGizmo = new ArcGizmo(this.gameEngine, [this.transform.pos[0], this.transform.pos[1]], 1, 0, 0, true);

        this.radius = 30;
        this.turnRadius = 60;
        this.minSpeed = 1;
        this.maxSpeed = 0.025 * 6;
        this.controlsDirection = [0,0];
        this.buttonActions = [];

        this.bombCooldown = {
            cooldownTime: 2000,
            isCoolingDown: false,
            time: 0,
            type: 'Bomb',
        };

        this.JKeyPressed = false;

        this.jetAcceleration =  0.0001;
        this.jetDeceleration = -0.00035;
        this.jetDeceleration = -0.0001;
        this.controllerInUse = false;
        this.gameEditorHasBeenOpened = false;

        this.isTurning = false;
        this.isAccelerating = false;
        // add this stuff to Super some day
        if(engine instanceof GameEngine) this.camera = new Camera(engine, new Transform(null, [pos[0], pos[1]]), "Aurora Camera");
        
        this.setAsControllableGameObject();
        this.makeFocussedGameObject();

        this.addBButtonListener();
        this.addJKeyListener();
        this.addReplayablePhysicsComponent();
        this.addLineSprite(new AuroraSprite(this.transform));

        this.leftExhaust = new EngineExhaust(engine, this.transform, [
            -this.lineSprite.length/8,
            17/18* this.lineSprite.length
        ], 5);

        this.rightExhaust = new EngineExhaust(engine, this.transform, [
            this.lineSprite.length/8,
            17/18* this.lineSprite.length
        ], 5);
        this.airDecelerationParticles = new AirDecelerationParticles(engine, this.transform, this.lineSprite.length / 2, this.lineSprite.length);
        this.bombReticle = new BombReticle(engine, this.transform, [0, 0], 90);
        this.addCollider("General", this, this.radius);

        this.addChildGameObject(this.leftExhaust);
        this.addChildGameObject(this.rightExhaust);
        this.addChildGameObject(this.bombReticle);

    }

    updateBButtonListener(pressed: boolean, playBack?: boolean) {
        console.log(this.replayablePhysicsComponent.reversibleActions);
        if(!this.isTimeReversed && pressed && !this.bombCooldown.isCoolingDown) {
            // get the direction that we're going now
            // apply this speed in that direction
            const currentDirection = this.transform.angle;
            const bombSpeed = 0.8;

            const bombVelocity = VectorMath.vectorCartesian(currentDirection, bombSpeed)
            new BombBasic(this.gameEngine, [this.transform.pos[0], this.transform.pos[1]], bombVelocity)
            this.bombCooldown.time = 0;
            this.bombCooldown.isCoolingDown = true;
            if (!playBack) {
                this.buttonActions.push({
                    type: 'Bomb',
                    time: this.gameEngine.gameScript.gameTime,
                    completed: true,
                });
            }
        }
    }
    hit() {
        this.hits += 1;
        if(this.hits >= this.hitsWhenDead) {
            // will need to tell gameScript about the death, which will then inform the current level
            // the level will decide what to do about that
            this.createDeathAnimationLineObjects();
            this.remove();
            (this.gameEngine.gameScript as StrikeTimeScript).loseLevel(); // controlled ship died()

            // create three objects for the death animation
        }
    }

    animate(delta: number) {
        // let movementDirection = 0;
        // if(this.transform.vel[0] === 0 && this.transform.vel[1] === 0) {
        //     movementDirection = this.transform.angle;
        // } else {
        //     movementDirection = Math.atan2(
        //         this.transform.vel[0],
        //         -this.transform.vel[1]
        //     );
        // }
        // this.transform.angle = movementDirection;
    }

    updateJKeyListener(pressed: boolean): void {
        if(pressed && !this.JKeyPressed) {
            console.log(this.replayablePhysicsComponent.reversibleActions);
            this.JKeyPressed = true;
            this.gameEngine.reverseTime()
        } else if(!pressed && this.JKeyPressed){
            this.JKeyPressed = false;
            this.gameEngine.reverseTime()
        }

        
    }
    update(delta: number, gameTime: number) {
        // console.log('updateCalled', `delta: ${delta}`);
        const shipXPos = this.transform.pos[0];
        const shipYPos = this.transform.pos[1];
        this.camera.transform.pos[0] = shipXPos;
        this.camera.transform.pos[1] = shipYPos;

        if(this.bombCooldown.isCoolingDown) {
            this.bombCooldown.time += delta;
            if(this.bombCooldown.time > this.bombCooldown.cooldownTime || this.bombCooldown.time < 0) {
                this.bombCooldown.time = 0;
                this.bombCooldown.isCoolingDown = false;
            }
        }

       !this.bombCooldown.isCoolingDown ? this.bombReticle.setVisibility(true) : this.bombReticle.setVisibility(false);

        this.buttonActions.forEach((buttonAction) => {
            if(delta > 0) {
                if(!buttonAction.completed && gameTime >= buttonAction.time) {
                    // I need to flip these back on as gameTime goes before their time when reversing
                    buttonAction.completed = true;
                    if(buttonAction.type === 'Bomb') {
                        this.updateBButtonListener(true, true);
                    }
                }
            } else {
                if(buttonAction.completed && buttonAction.time >= gameTime) {
                    buttonAction.completed = false;
                }
            }
        })

        if(this.replayablePhysicsComponent.movementTangentAngle !== null) {
            this.transform.angle = this.replayablePhysicsComponent.movementTangentAngle;
            if(this.isTimeReversed) this.transform.angle = ((this.transform.angle + Math.PI)%(2*Math.PI) + 2*Math.PI) % Math.PI*2;
        }

        if(this.isFocussedGameObject && !this.isTimeReversed) {
            this.movementMechanics();
        }



        // visuals (animation)
        const currentAction = this.replayablePhysicsComponent.getCurrentAction();
        // if(this.replayablePhysicsComponent.isAccelerating) {
        //     if(this.replayablePhysicsComponent.accelerationInformation.isDecelerating) {
        //         this.leftExhaust.isDecelerating = true;
        //         this.rightExhaust.isDecelerating = true;
        //         this.leftExhaust.isAccelerating = false;
        //         this.rightExhaust.isAccelerating = false;
        //         this.airDecelerationParticles.isDecelerating = true;
        //     } else {
        //         this.airDecelerationParticles.isDecelerating = false;;
        //         this.leftExhaust.isAccelerating = true;
        //         this.rightExhaust.isAccelerating = true;
        //     }
            
        // } else {
        //     this.airDecelerationParticles.isDecelerating = false;

        //     this.leftExhaust.isAccelerating = false;
        //     this.rightExhaust.isAccelerating = false;
        //     this.leftExhaust.isDecelerating = false;
        //         this.rightExhaust.isDecelerating = false;
        // }
        if(currentAction && currentAction.type === 'Turn') {
            if((currentAction.actionData as TurnInformation).rotationDirection > 0) {
                this.leftExhaust.isAccelerating = true;
                this.rightExhaust.isAccelerating = false;
            } else {
                this.leftExhaust.isAccelerating = false;
                this.rightExhaust.isAccelerating = true;
            }
        } else {
            this.leftExhaust.isAccelerating = false;
            this.rightExhaust.isAccelerating = false;
        }

    }

    updateRightControlFocussedStickInput(direction: [number, number]): void {}
    updateFocussedMousePos(pos: [number, number]): void {}

    roundAngleTo16thsDegrees(radians: number) {
        return ((Math.round(radians / (2 * Math.PI) * 16) % 16) / 16) * 360
    }

    movementMechanics() {
        // 1: one turn radius at same speed as straight
        // 2. 1/16 * 2PI angles allowed
        // 3. only initiate turn when relative direction passes a small threshold (1/8th PI lets say)
        const turnThreshold = Math.PI / 8;
        if(!(this.gameEngine instanceof GameEngine)) return;
        console.log(this.controlsAngle);

        if(this.controlsAngle === null) {
            this.replayablePhysicsComponent.interruptData = null;
            return;
        }

        this.controlsDirectionGizmo.transform.pos = [this.transform.pos[0], this.transform.pos[1]];
        this.controlsDirectionGizmo.lineSprite.endPos = [this.transform.pos[0] + 50 * Math.cos(this.controlsAngle), this.transform.pos[1] + 50 * Math.sin(this.controlsAngle)];

        const gameTime = this.gameEngine.gameScript.gameTime;
        if(this.transform.vel[0] === 0 && this.transform.vel[1] === 0) {
            console.log('Only the first acceleration')
            const controlsAngleRoundedRadians = ((Math.round((this.controlsAngle / (2 * Math.PI)) * 16) % 16) / 16) * 2 * Math.PI;
            const velocity: [number, number] = [this.maxSpeed * Math.cos(controlsAngleRoundedRadians), this.maxSpeed * Math.sin(controlsAngleRoundedRadians)];
            this.replayablePhysicsComponent.interruptData = {
                type: 'Straight',
                actionParams: {
                    velocity,
                }
            }
            return;
        }

        const currentDirection = this.replayablePhysicsComponent.movementTangentAngle;
        const currentDirectionRounded = this.roundAngleTo16thsDegrees(currentDirection);
        const controlsAngleRounded =  this.roundAngleTo16thsDegrees(this.controlsAngle);
        // if(this.previousControlsDirection != this.controlsAngle) {
        //     this.previousControlsDirection = this.controlsAngle;
        //     this.replayablePhysicsComponent.interruptData = null;
        //     return;
        // }
        // this.previousControlsDirection = this.controlsAngle;
        if(
            currentDirectionRounded === controlsAngleRounded || 
            !this.replayablePhysicsComponent.getCurrentAction()?.isInterruptAble || 
            controlsAngleRounded === this.roundAngleTo16thsDegrees((this.replayablePhysicsComponent.getCurrentAction()?.actionData as TurnInformation).endAngle)
        ) {
            this.replayablePhysicsComponent.interruptData = null;
            return;
        }
        
        let angleDifference = (controlsAngleRounded - currentDirectionRounded) > 0 ? 
            controlsAngleRounded - currentDirectionRounded : 
            controlsAngleRounded - currentDirectionRounded + 360;

        const isTurningRight = angleDifference < 180
        // turning right means that the rotation point is to the right relative to the movement direction
        // always at a 90 degree angle
        const tangentAngle = this.replayablePhysicsComponent.movementTangentAngle;
        const turnRadius = this.turnRadius;
        const tangentSpeed = this.maxSpeed;

         const endAngle = isTurningRight ? 
            (((controlsAngleRounded/360 * 2 * Math.PI) + Math.PI/2) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) :
            (((controlsAngleRounded/360 * 2 * Math.PI) + Math.PI/2) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);

        // needed for playback 
        const pointWhereArchStarted: [number, number] = [this.transform.pos[0], this.transform.pos[1]];

        const normalAngle = !isTurningRight ? 
            ((tangentAngle - Math.PI/2) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) :
            ((tangentAngle + Math.PI/2) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        // const normalAngle = tangentAngle - Math.PI / 2;
        const rotationPoint: [number, number] = [
            pointWhereArchStarted[0] + turnRadius * Math.cos(normalAngle),
            pointWhereArchStarted[1] + turnRadius * Math.sin(normalAngle) 
        ];

        console.log({rotationPoint, position: this.transform.pos})
        // const startAngle = isTurningRight ? 
        //     ((tangentAngle + Math.PI/2) % Math.PI * 2 + 2 * Math.PI) % (2 * Math.PI): 
        //     ((tangentAngle - Math.PI/2) % Math.PI * 2 + 2 * Math.PI) % (2 * Math.PI);
        const startAngle = isTurningRight ? 
            ((tangentAngle + 3 * Math.PI/2) % (Math.PI * 2) + 2 * Math.PI) % (2 * Math.PI): 
            ((tangentAngle - 3 * Math.PI/2) % (Math.PI * 2) + 2 * Math.PI) % (2 * Math.PI);
        const rotationDirection = isTurningRight ? -1 : 1;

        const endPoint: [number, number] = [
            rotationPoint[0] + turnRadius * Math.cos(endAngle) * rotationDirection,
            rotationPoint[1] + turnRadius * Math.sin(endAngle) * rotationDirection
        ]

       
        
        this.startPointGizmo.transform.pos = this.transform.pos;
        this.endPointGizmo.transform.pos = endPoint;
        this.rotationPointGizmo.transform.pos = rotationPoint;

        // new DotGizmo(this.gameEngine, [endPoint[0] / 2, endPoint[1] / 2], 2, '#1d26a5ff');

        // new DotGizmo(this.gameEngine, [rotationPoint[0]/2, rotationPoint[1]/2], 1, '#FFFFFF');
        // new DotGizmo(this.gameEngine, [this.transform.pos[0] / 2, this.transform.pos[1] / 2], 4, '#ac2929ff');
        // new LineGizmo(this.gameEngine, [this.transform.pos[0], this.transform.pos[1]], [rotationPoint[0], rotationPoint[1]])
        console.log({isTurningRight,startAngle})
        this.turnArcGizmo.lineSprite.radius = turnRadius;
        this.turnArcGizmo.lineSprite.startAngle = startAngle;
        this.turnArcGizmo.lineSprite.endAngle =  endAngle;
        this.turnArcGizmo.transform.pos = rotationPoint;
        this.turnArcGizmo.lineSprite.isTurningRight = isTurningRight;
        
        
        // create a gizmo to display and hopefully figure out wtf is going on
        // line in direction of movement coming from origin
        // line in direction of controls coming from origin
        // dot on the rotation point



        // when this turn ends, the next instruction is straight in the direction of the end angle
        this.replayablePhysicsComponent.interruptData = {
            type: 'Turn',
            actionParams: {
                turnRadius,
                isTurningRight: isTurningRight,
                tangentSpeed,
                startAngle,
                endAngle,
                endPoint,
                pointWhereArchStarted,
                rotationPoint,
                gameTimeArchStarted: gameTime,
            }
        }
        return;
    }

    getTurnRadiusAndSpeed(angleChangeDegrees: number): {turnRadius: number, tangentSpeed: number} {
        const tightestRadius = 100;
        let tangentSpeed = 0;
        const fastestTurnSpeed = this.maxSpeed * 4/5;
        const radii = [
            tightestRadius * 4,
            tightestRadius * 3,
            tightestRadius * 2,
            tightestRadius
        ]   
        if(angleChangeDegrees >= 90) {
            tangentSpeed = Math.sqrt(radii[3] / radii[0]) * fastestTurnSpeed
            return {turnRadius: tightestRadius, tangentSpeed }
        } else if(angleChangeDegrees >= 67.5) {
            tangentSpeed = Math.sqrt(radii[2] / radii[0]) * fastestTurnSpeed
            return {turnRadius:  radii[2], tangentSpeed}
        } else if(angleChangeDegrees >= 45) {
            tangentSpeed = Math.sqrt(radii[1] / radii[0]) * fastestTurnSpeed
            return {turnRadius:  radii[1], tangentSpeed}
        } else if(angleChangeDegrees >= 22.5) {
            tangentSpeed = fastestTurnSpeed
            return {turnRadius:  radii[0], tangentSpeed}
        }
    }

    updateLeftControlFocussedStickInput(direction: [number, number]) {

        if (Math.abs(direction[0]) + Math.abs(direction[1]) > 0.50) {
            // round to nearest 1/16th of a circle
            
            const angle = (Math.atan2(direction[1], direction[0]) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
            const roundedAngle = ((Math.round((angle / (2 * Math.PI)) * 16) % 16) / 16) * 2 * Math.PI;
            this.controlsAngle = roundedAngle;
        } else {
            this.controlsAngle = null;
        }
    } 

    // there's a maximum speed that you can go
    // you accelerate to it when moving straight
    // when you turn, the maximum speed drops depending on the turn angle
    // tightest turn has the minimum speed;

    // the turn radius is determine by the difference in angle moving, and angle pointing
    // smallest radius turn angle is when 90 degrees or greater difference

    // when the stick is not pointing anywhere, the angle is not applied and the ship 
    // updateMovement(deltaTime: number) {
    //     if(!this.controllerInUse) return;

    // }



// testing BezierCurve
    // createDeathAnimationLineObjectsWithBezier() {
    //     const s = 1;
    //     new DeathAnimationLineObject(
    //         this.gameEngine,
    //         this.transform,
    //         this.transform.angle,
    //         [
    //             [-18 * s, 12 * s],
    //             [12 * s, 12 * s]
    //         ],
    //         this.destructedColor,
    //         this.destructionLineWidth
    //     );
    //     new DeathAnimationLineObject(
    //         this.gameEngine,
    //         this.transform,
    //         this.transform.angle,
    //         [
    //             [26 * s, 4 * s],
    //             [12 * s, -6 * s]
    //         ],
    //         this.destructedColor,
    //         this.destructionLineWidth
    //     );
    //     new DeathAnimationLineObject(
    //         this.gameEngine,
    //         this.transform,
    //         this.transform.angle,
    //         [
    //             [-11 * s, -6 * s],
    //             [-18 * s, 12 * s]
    //         ],
    //         this.destructedColor,
    //         this.destructionLineWidth
    //     );
    //     new DeathAnimationBezierCurveObject(
    //         this.gameEngine,
    //         this.transform,
    //         this.transform.angle,
    //         {
    //             startPos: [12 * s, 12 * s],
    //             endPos: [26 * s, 4 * s],
    //             controlPoint1: [18 * s, 18 * s],
    //             controlPoint2: [28 * s, 12 * s],
    //         },
    //         this.destructedColor,
    //         this.destructionLineWidth
    //     )
    //     new DeathAnimationBezierCurveObject(
    //         this.gameEngine,
    //         this.transform,
    //         this.transform.angle,
    //         {
    //             startPos: [12 * s, -6 * s],
    //             endPos: [-11 * s, -6 * s],
    //             controlPoint1: [-8 * s, 2 * s],
    //             controlPoint2: [-2 * s, 3 * s],
    //         },
    //         this.destructedColor,
    //         this.destructionLineWidth
    //     )
    // }

    // createDeathAnimationLineObjectsOriginal() {
    //     // All I need is the point positions of the lines to create the death animation object
    //     // I already have this when I use the sprite editor
    //     // so I should be able to output this function as well when creating a sprite

    //     const l = this.lineSprite.length;
    //     const w = this.lineSprite.length / 2;

    //     // get the first line position and angle relative to Aurora's 0,0
    //     /*
    //         line 1
    //         ctx.beginPath();
    //         ctx.moveTo(0,0) // point 1
    //         ctx.lineTo(-l, w/2) // point 2
    //         ctx.stroke();
    //     */

    //     const line1Point1: [number, number] = [0, 0];
    //     const line1Point2: [number, number] = [-l, -w/2];

    //     new DeathAnimationLineObject(this.gameEngine, [this.transform.pos[0], this.transform.pos[1]], this.transform.angle, [line1Point1, line1Point2], "rgb(255, 255, 255)", 1.5);

    //     /*
    //         line 2
    //         ctx.beginPath();
    //         ctx.moveTo(-l, w/2); // point 1
    //         ctx.lineTo(-l, -w/2); // point 2
    //         ctx.stroke();
    //     */

    //     const line2Point1: [number, number] = [-l, w/2];
    //     const line2Point2: [number, number] = [-l, -w/2];

    //     new DeathAnimationLineObject(this.gameEngine, [this.transform.pos[0], this.transform.pos[1]], this.transform.angle, [line2Point1, line2Point2], "rgb(255, 255, 255)", 1.5);

    //    /*
    //         line 3
    //         ctx.beginPath();
    //         ctx.lineTo(-l, -w/2);
    //         ctx.lineTo(0, 0);
    //         ctx.stroke();
    //     */

    //     const line3Point1: [number, number] = [-l, -w/2];
    //     const line3Point2: [number, number] = [0,0];

    //     new DeathAnimationLineObject(this.gameEngine, [this.transform.pos[0], this.transform.pos[1]], this.transform.angle, [line3Point1, line3Point2], "rgb(255, 255, 255)", 1.5);

    // }
    createDeathAnimationLineObjects() {
        const s = 1.3;
        new DeathAnimationLineObject(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [0 * s, 0 * s],
                [-48 * s, -12 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        new DeathAnimationLineObject(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [-48 * s, -12 * s],
                [-48 * s, 12 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        new DeathAnimationLineObject(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [-48 * s, 12 * s],
                [0 * s, 0 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        new DeathAnimationLineObject(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [-41 * s, 2 * s],
                [-39 * s, 2 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        new DeathAnimationLineObject(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [-39 * s, -2 * s],
                [-41 * s, -2 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        new DeathAnimationArcObject(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            {
                startAngle: 1.5707963267948966,
                endAngle: -1.5707963267948966,
                startPos: [-39 * s, 2 * s],
                endPos: [-39 * s, -2 * s],
                centerPosition: [-39 * s, 0 * s],
                radius: 2 * s,
                counterClockwise: false
            },
            this.destructedColor,
            this.destructionLineWidth
        )
        new DeathAnimationArcObject(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            {
                startAngle: -1.5707963267948966,
                endAngle: 1.5707963267948966,
                startPos: [-41 * s, -2 * s],
                endPos: [-41 * s, 2 * s],
                centerPosition: [-41 * s, 0 * s],
                radius: 2 * s,
                counterClockwise: false
            },
            this.destructedColor,
            this.destructionLineWidth
        )
    }
}

export class AuroraSprite extends LineSprite {
    color: string;
    length: number;
    acceleration: number;

    constructor(transform: Transform) {
        super(transform);
        this.length = 60;
        this.acceleration = 0;
        this.color = "rgb(255, 255, 255)";
    }

    draw(ctx: CanvasRenderingContext2D) {
        if(!this.visible) return;
        const pos = this.transform.absolutePosition();

        const r = 255;
        const g = 255;
        const b = 50;

        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.angle);
        // this.drawPlane(ctx);
        this.drawAurora(ctx);
        ctx.restore();
    }

    drawAuroraOriginal(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.moveTo(0,0);
        
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;

        // hard coded to match in the death animation:
        const l = this.length;
        const w = this.length/2

        ctx.lineTo(-l, w/2);
        ctx.lineTo(-l, -w/2);
        ctx.lineTo(0, 0);
        ctx.stroke();

        // triangle should be split up in to three distinct parts
        // grab the center point of the line
        // create a function that draws the line by moving to center point, 
        // rotating, and then drawing from the start to finish of the line
        // then I can give the center point a random velocity
        // and a random rotation speed

        // the line points are relative to the transform of the parent object to start
        // The new transform will be the parent transform location + the center point location relative to the parent transform
        // also need the initial angle of the transform + the initial angle of the line

        /*
        ctx.beginPath();
        ctx.moveTo(0,0) // line 1 point 1
        ctx.lineTo(-l, w/2); // line 1 point 2
        ctx.stroke();

        line 2
        ctx.beginPath();
        ctx.moveTo(-l, w/2);
        ctx.lineTo(-l, -w/2);
        ctx.stroke();

        */

        // I need a way to locate the start and end point
        // for the next lines when creating an arc

        ctx.beginPath();
        ctx.arc(
            -13/18 * l, 
            0, 
            2/9 * w/2, 
            -Math.PI/2, 
            Math.PI/2
        );

        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-13/18 * l, 2/9 * w/2);
        ctx.lineTo(-13/18 * l -2/9 * w/2 * 0.5, 2/9 * w/2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-13/18 * l, -2/9 * w/2);
        ctx.lineTo(-13/18 * l -2/9 * w/2 * 0.5, -2/9 * w/2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(-13/18 * l -2/9 * w/2 * 0.5, 0, 2/9 * w/2, Math.PI/2, 3*Math.PI/2);
        ctx.stroke();

    }

    drawAurora(ctx: CanvasRenderingContext2D) { 
        ctx.moveTo(0,0);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        const s = 1.3;

        // Piece 1: 
        ctx.beginPath();
        ctx.moveTo(0 * s, 0 * s);
        ctx.lineTo(-48 * s, -12 * s);
        ctx.lineTo(-48 * s, 12 * s);
        ctx.lineTo(0 * s, 0 * s);
        ctx.stroke();
        // Piece 2: 
        ctx.beginPath();
        ctx.moveTo(-41 * s, 2 * s);
        ctx.lineTo(-39 * s, 2 * s);
        ctx.arc(-39 * s, 0 * s, 2 * s, 1.5707963267948966, -1.5707963267948966, true);
        ctx.lineTo(-41 * s, -2 * s);
        ctx.arc(-41 * s, 0 * s, 2 * s, -1.5707963267948966, 1.5707963267948966, true);
        ctx.stroke();
    }
    // remember to remove the transform stuff, and add the color to see it lol
    drawPlane(ctx: CanvasRenderingContext2D) { 
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        const s = 1;

        // Piece 1: 
        ctx.beginPath();
        ctx.moveTo(-18 * s, 12 * s);
        ctx.lineTo(12 * s, 12 * s);
        ctx.bezierCurveTo(
            18 * s, 18 * s,
            28 * s, 12 * s,
            26 * s, 4 * s
        );
        ctx.lineTo(12 * s, -6 * s);
        ctx.bezierCurveTo(
            -8 * s, 2 * s,
            -2 * s, 3 * s,
            -11 * s, -6 * s
        );
        ctx.lineTo(-18 * s, 12 * s);
        ctx.stroke();
    }

}

export class DeathAnimationLineObject extends GameObject {
    removeTime: number;
    timeAround: number;
    constructor(
        engine: GameEngine | AnimationView,
        objectTransform: Transform,// position of the parent object
        objectAngle: number, // angle of the parent object
        linePointPositions: [[number, number], [number, number]], // relative to parent object origin
        color?: string,
        width?: number,
        speed?: number,
    ) {
        super(engine);
        this.removeTime = 3000;
        this.timeAround = 0;
        const objectPos = [objectTransform.pos[0], objectTransform.pos[1]]

        const linePoint1 = linePointPositions[0];
        const linePoint2 = linePointPositions[1];

        const length = Math.sqrt(
            (linePoint2[0] - linePoint1[0])**2 + 
            (linePoint2[1] - linePoint1[1])**2
        )

        // its position is the average of these two
        const line1PositionOnPlane = [
            (linePoint1[0] + linePoint2[0] )/ 2,
            (linePoint1[1] + linePoint2[1]) / 2
        ]

        const linePositionAngleRelativeToAurora =  Math.atan2(line1PositionOnPlane[1], line1PositionOnPlane[0]) - Math.PI;
        const lineAngleRelativeToAurora =  Math.atan2(linePoint2[1] - linePoint1[1], linePoint2[0] - linePoint1[0]) - Math.PI;

        const planeOriginToLine1CenterDistance = Math.sqrt(line1PositionOnPlane[0]**2 + (line1PositionOnPlane[1])**2);

        const lineMidpointPosition: [number, number] = [
            objectPos[0] - planeOriginToLine1CenterDistance * Math.cos(objectAngle + linePositionAngleRelativeToAurora),
            objectPos[1] - planeOriginToLine1CenterDistance * Math.sin(objectAngle + linePositionAngleRelativeToAurora)
        ]

        const lineAngle = lineAngleRelativeToAurora + objectAngle;





        this.transform.pos = [lineMidpointPosition[0], lineMidpointPosition[1]];
        this.transform.angle = lineAngle;
        const velocityVariancePercentage = 0.1; // 10%
        const velocity = 0.05;
        const angularVelocityVariance = 0.1; // 10%
        const angularVelocity = 0.075 * 0.15

        // create a random velocity and random angular velocity
        const randomVelocity = VectorMath.vectorCartesian(
            2 * Math.random() * Math.PI, 
            velocity + (velocity * velocityVariancePercentage) * Math.random()
        );
        
        const newVelocity = [randomVelocity[0] + objectTransform.vel[0] * 8, randomVelocity[1] + objectTransform.vel[1] * 8];
        const randomAngularVelocity = (angularVelocity + (angularVelocity * angularVelocityVariance)) * Math.random();

        this.transform.vel[0] = newVelocity[0];
        this.transform.vel[1] = newVelocity[1];

        this.transform.aVel = randomAngularVelocity;
        this.addLineSprite(new DeathAnimationSprite(this.transform, length, width || 1.5, color));
        this.addPhysicsComponent();
    }

    animate() {}

    update(deltaTime: number) {
        this.timeAround += deltaTime;
        if(this.timeAround > this.removeTime) {
            this.remove();
        }

    }
}
export class DeathAnimationArcObject extends GameObject {
    timeAround: number;
    removeTime: number;
    constructor(
        engine: GameEngine | AnimationView,
        objectTransform: Transform,// position of the parent object
        objectAngle: number, // angle of the parent object
        arcData: {
            startPos: [number, number],
            endPos: [number, number],
            centerPosition: [number, number],
            radius: number,
            startAngle: number,
            endAngle: number,
            counterClockwise: boolean,
        }, // relative to parent object origin
        color?: string,
        width?: number,
        speed?: number,
    ) {
        super(engine);
        this.removeTime = 3000;
        this.timeAround = 0;
        const objectPos = [objectTransform.pos[0], objectTransform.pos[1]]
        const {centerPosition, radius, startAngle, endAngle, counterClockwise} = arcData;

        const arcCenterPositionAngleRelativeToObject =  Math.atan2(centerPosition[1], centerPosition[0]) - Math.PI;
        const startAngleRelativeToObject = startAngle;
        const endAngleRelativeToObject = endAngle;

        const objectOriginToCenterDistance = Math.sqrt(centerPosition[0]**2 + (centerPosition[1])**2);

        const newCenterPosition: [number, number] = [
            objectPos[0] - objectOriginToCenterDistance * Math.cos(objectAngle + arcCenterPositionAngleRelativeToObject),
            objectPos[1] - objectOriginToCenterDistance * Math.sin(objectAngle + arcCenterPositionAngleRelativeToObject)
        ]

        const newStartAngle = startAngleRelativeToObject + objectAngle;
        const newEndAngle = endAngleRelativeToObject + objectAngle;


        this.transform.pos = [newCenterPosition[0], newCenterPosition[1]];
        this.transform.angle = 0;

        // create a random velocity and random angular velocity
        const velocityVariancePercentage = 0.1; // 10%
        const velocity = 0.05;
        const angularVelocityVariance = 0.1; // 10%
        const angularVelocity = 0.075 * 0.15

        // create a random velocity and random angular velocity
        const randomVelocity = VectorMath.vectorCartesian(
            2 * Math.random() * Math.PI, 
            velocity + (velocity * velocityVariancePercentage) * Math.random()
        );
        
        const newVelocity = [randomVelocity[0] + objectTransform.vel[0] * 8, randomVelocity[1] + objectTransform.vel[1] * 8];
        const randomAngularVelocity = (angularVelocity + (angularVelocity * angularVelocityVariance)) * Math.random();

        this.transform.vel[0] = newVelocity[0];
        this.transform.vel[1] = newVelocity[1];

        this.transform.aVel = randomAngularVelocity;
        this.addLineSprite(new DeathAnimationArcSprite(
            this.transform, 
            {
                startAngle: newStartAngle, 
                endAngle: newEndAngle, 
                radius, 
                counterClockwise, 
                centerPosition: 
                    [0, 0]
                }, 
            width || 1.5, color
        ));
        this.addPhysicsComponent();
    }

    animate() {}

    update(deltaTime: number) {
        this.timeAround += deltaTime;
        if(this.timeAround > this.removeTime) {
            this.remove();
        }

    }
}
export class DeathAnimationBezierCurveObject extends GameObject {
    timeAround: number;
    removeTime: number;
    constructor(
        engine: GameEngine | AnimationView,
        objectTransform: Transform,// position of the parent object
        objectAngle: number, // angle of the parent object
        bezierCurveData: {
            startPos: [number, number],
            endPos: [number, number],
            controlPoint1: [number, number],
            controlPoint2: [number, number],
        }, // relative to parent object origin
        color?: string,
        width?: number,
        speed?: number,
    ) {
        super(engine);
        this.timeAround = 0;
        this.removeTime = 3000;
        const objectPos = [objectTransform.pos[0], objectTransform.pos[1]]
        const {
            startPos, 
            endPos, 
            controlPoint1, 
            controlPoint2
        } = bezierCurveData;

        const midPoint = [(startPos[0] + endPos[0]) / 2, (startPos[1] + endPos[1])/ 2];

        const [
            startPosNewO,
            endPosNewO,
            controlPoint1NewO,
            controlPoint2NewO
        ] = [
            startPos,endPos,controlPoint1,controlPoint2
        ].map<[number, number]>((point) => [point[0] - midPoint[0], point[1] - midPoint[1]]);

        const midPointAngleRelativeToObject =  Math.atan2(midPoint[1], midPoint[0]) - Math.PI;

        // const startPosAngleRelativeToNewOrigin =  Math.atan2(startPosNewO[1], startPosNewO[0]) - Math.PI;
        // const endPosAngleRelativeToObject =  Math.atan2(endPosNewO[1], endPosNewO[0]) - Math.PI;
        // const controlPoint1AngleRelativeToObject =  Math.atan2(controlPoint1NewO[1], controlPoint1NewO[0]) - Math.PI;
        // const controlPoint2AngleRelativeToObject =  Math.atan2(controlPoint2NewO[1], controlPoint2NewO[0]) - Math.PI;

        const midPointToNewOriginDistance = Math.sqrt(midPoint[0]**2 + (midPoint[1])**2);

        // const startPosToNewOriginDistance = Math.sqrt(startPosNewO[0]**2 + (startPosNewO[1])**2);
        // const endPosNewOriginDistance = Math.sqrt(endPosNewO[0]**2 + (endPosNewO[1])**2);
        // const controlPoint1NewOriginDistance = Math.sqrt(controlPoint1NewO[0]**2 + (controlPoint1NewO[1])**2);
        // const controlPoint2NewOriginDistance = Math.sqrt(controlPoint2NewO[0]**2 + (controlPoint2NewO[1])**2);

        const newOriginPosition: [number, number] = [
            objectPos[0] - midPointToNewOriginDistance * Math.cos(objectAngle + midPointAngleRelativeToObject),
            objectPos[1] - midPointToNewOriginDistance * Math.sin(objectAngle + midPointAngleRelativeToObject)
        ]


        this.transform.pos = [newOriginPosition[0], newOriginPosition[1]];
        this.transform.angle = 0;

        const velocityVariancePercentage = 0.1; // 10%
        const velocity = 0.05;
        const angularVelocityVariance = 0.1; // 10%
        const angularVelocity = 0.075 * 0.15

        // create a random velocity and random angular velocity
        const randomVelocity = VectorMath.vectorCartesian(
            2 * Math.random() * Math.PI, 
            velocity + (velocity * velocityVariancePercentage) * Math.random()
        );
        
        const newVelocity = [randomVelocity[0] + objectTransform.vel[0] * 8, randomVelocity[1] + objectTransform.vel[1] * 8];
        const randomAngularVelocity = (angularVelocity + (angularVelocity * angularVelocityVariance)) * Math.random();

        this.transform.vel[0] = newVelocity[0];
        this.transform.vel[1] = newVelocity[1];

        this.transform.aVel = randomAngularVelocity;
        this.addLineSprite(new DeathAnimationBezierCurveSprite(
            this.transform, 
            {
                startPos: startPosNewO,
                endPos: endPosNewO,
                controlPoint1: controlPoint1NewO,
                controlPoint2: controlPoint2NewO,
                
            }, 
            width || 1.5, color
        ));
        this.addPhysicsComponent();
    }
    animate(dT: number): void {}

    update(deltaTime: number) {
        this.timeAround += deltaTime;
        if(this.timeAround > this.removeTime) {
            this.remove();
        }

    }
}
export class DeathAnimationSprite extends LineSprite {
    length: number;
    color: string;
    lineWidth: number;
    
    constructor(transform: Transform, length: number, lineWidth?: number, color?: string) {
        // the color should be slightly less vibrant
        // and chosen by the parent object.. but for the future
        super(transform);
        this.length = length;
        this.color = color ? color : "rgb(255, 255, 255)";
        this.lineWidth = lineWidth ? lineWidth : 1.5;
    }
    draw(ctx: CanvasRenderingContext2D) {
        // I'm given a midpoint and a length

        const pos = this.transform.absolutePosition();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;

        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.angle);
        
        ctx.beginPath();
        ctx.moveTo(-this.length / 2, 0);
        ctx.lineTo(this.length / 2, 0);
        ctx.stroke();

        ctx.restore();
    }
}
export class DeathAnimationArcSprite extends LineSprite {
    length: number;
    color: string;
    lineWidth: number;
    arcData: {
        centerPosition: [number, number],
        radius: number,
        startAngle: number,
        endAngle: number,
        counterClockwise: boolean,
    };
    constructor(
        transform: Transform, 
        arcData: {
            centerPosition: [number, number],
            radius: number,
            startAngle: number,
            endAngle: number,
            counterClockwise: boolean,
        }, 
        lineWidth?: number, 
        color?: string
    ) {
        // the color should be slightly less vibrant
        // and chosen by the parent object.. but for the future
        super(transform);
        this.arcData = arcData;
        this.color = color ? color : "rgb(255, 255, 255)";
        this.lineWidth = lineWidth ? lineWidth : 1.5;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const {centerPosition, radius, startAngle, endAngle, counterClockwise} = this.arcData;

        const pos = this.transform.absolutePosition();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;

        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.angle);
        
        ctx.beginPath();
        ctx.arc(centerPosition[0], centerPosition[1], radius, startAngle, endAngle, counterClockwise);
        ctx.lineTo(this.length / 2, 0);
        ctx.stroke();

        ctx.restore();
    }
}
export class DeathAnimationBezierCurveSprite extends LineSprite {
    length: number;
    color: string;
    lineWidth: number;
    bezierCurveData: {
        startPos: [number, number],
        endPos: [number, number],
        controlPoint1: [number, number],
        controlPoint2: [number, number],
    };
    constructor(
        transform: Transform, 
        bezierCurveData: {
            startPos: [number, number],
            endPos: [number, number],
            controlPoint1: [number, number],
            controlPoint2: [number, number],
        }, 
        lineWidth?: number, 
        color?: string
    ) {
        // the color should be slightly less vibrant
        // and chosen by the parent object.. but for the future
        super(transform);
        this.bezierCurveData = bezierCurveData;
        this.color = color ? color : "rgb(255, 255, 255)";
        this.lineWidth = lineWidth ? lineWidth : 1.5;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const {
            startPos,
            endPos,
            controlPoint1,
            controlPoint2
        } = this.bezierCurveData;

        const pos = this.transform.absolutePosition();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;

        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.angle);
        
        ctx.beginPath();
        ctx.moveTo(startPos[0], startPos[1]);
        ctx.bezierCurveTo(
            controlPoint1[0], 
            controlPoint1[1], 
            controlPoint2[0], 
            controlPoint2[1], 
            endPos[0], 
            endPos[0]
        );
        ctx.stroke();

        ctx.restore();
    }
}