import { GameObject } from "../../../game_engine/game_object";
import { LineSprite, Spawnable } from "../../../game_engine/line_sprite";
import { Transform } from "../../../game_engine/transform";
import { GameEngine } from "../../../game_engine/game_engine";
import { Camera } from "../../../game_engine/camera";
import {NextInstructionTurn} from "../../../game_engine/physics_component"
import { EngineExhaust } from "./EngineExhaust";
import { AirDecelerationParticles } from "./AirDecelerationParticles";

export class Aurora extends GameObject {
    lineSprite: AuroraSprite;
    radius: number;
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
    leftExhaust: EngineExhaust
    rightExhaust: EngineExhaust
    airDecelerationParticles: AirDecelerationParticles;

    constructor(
        engine: GameEngine,
        pos: [number, number],
        angle = Math.random() * Math.PI * 2
    ) {
        super(engine);
        this.transform.pos = pos;
        this.transform.angle = angle;
        this.transform.vel = [0, 0];

        this.radius = 40;
        this.minSpeed = 1;
        this.maxSpeed = 0.025 * 6;
        this.controlsDirection = [0,0];

        this.jetAcceleration =  0.0001;
        this.jetDeceleration = -0.00035;
        this.controllerInUse = false;
        this.gameEditorHasBeenOpened = false;

        this.isTurning = false;
        this.isAccelerating = false;

        this.camera = new Camera(engine, new Transform(null, [pos[0], pos[1]]), "Aurora Camera");
        this.setAsControllableGameObject();
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
    }

    animate(delta: number) {
        let movementDirection = 0;
        if(this.transform.vel[0] === 0 && this.transform.vel[1] === 0) {
            movementDirection = this.transform.angle;
        } else {
            movementDirection = Math.atan2(
                this.transform.vel[0],
                -this.transform.vel[1]
            );
        }
        this.transform.angle = movementDirection;
    }
    update(delta: number) {

        if(this.controlsAngle !== null) {
            // compare angle with controls angle
            // if angle is greater than 
            this.transform.angle
        }

        if(this.replayablePhysicsComponent.movementTangentAngle !== null) {
            this.transform.angle = this.replayablePhysicsComponent.movementTangentAngle;
        }

        if(this.isFocussedGameObject) {
            this.movementMechanics();
        }

        const shipXPos = this.transform.pos[0];
        const shipYPos = this.transform.pos[1];
        this.camera.transform.pos[0] = shipXPos;
        this.camera.transform.pos[1] = shipYPos;

        if(this.replayablePhysicsComponent.isAccelerating) {
            if(this.replayablePhysicsComponent.accelerationInformation.isDecelerating) {
                this.leftExhaust.isDecelerating = true;
                this.rightExhaust.isDecelerating = true;
                this.leftExhaust.isAccelerating = false;
                this.rightExhaust.isAccelerating = false;
                this.airDecelerationParticles.isDecelerating = true;
            } else {
                this.airDecelerationParticles.isDecelerating = false;;
                this.leftExhaust.isAccelerating = true;
                this.rightExhaust.isAccelerating = true;
            }
            
        } else {
            this.airDecelerationParticles.isDecelerating = false;

            this.leftExhaust.isAccelerating = false;
            this.rightExhaust.isAccelerating = false;
            this.leftExhaust.isDecelerating = false;
                this.rightExhaust.isDecelerating = false;
        }

        if(this.replayablePhysicsComponent.isTurning) {
            if(this.replayablePhysicsComponent.turnInformation.rotationDirection > 0) {
                this.leftExhaust.isAccelerating = true;
                this.rightExhaust.isAccelerating = false;
            } else {
                this.leftExhaust.isAccelerating = false;
                this.rightExhaust.isAccelerating = true;
            }
        }


    }

    updateRightControlFocussedStickInput(direction: [number, number]): void {}
    updateFocussedMousePos(pos: [number, number]): void {}

    roundAngleTo16thsDegrees(radians: number) {
        return ((Math.round(radians / (2 * Math.PI) * 16) % 16) / 16) * 360
    }

    movementMechanics() {
        // there might be a way to make it feel a little better if 
        // I allow changing the direction constantly
        // of if I don't immediately accelerate to max speed

        // to allow constant direction change, I'll need an "interupt" state where
        // the plane is still turning until it's facing one of the 16 directions. 
        // so it would be an interrupt instruction

        // but it's going to be a lot easier to make it feel nice if I have complete control

        // a crap... how would it work on mobile though
        // okay... maybe this would work for mobile, but it doesn't feel great with a controller
        // maybe with some added visuals I can get it to feel better
        // visuals like, a path showing you result of the current instruction
        // and the arrow of the direction you're pointing maybe
        // worth checking out.... but only after I get time reversal going and other stuff

        // if(!this.controllerInUse){
        //     return;
        // }

        if(this.replayablePhysicsComponent.isAccelerating) {
            return;
        }

        if(this.controlsAngle === null) {
            return;
        }

        // we have a direction to move in
        if(this.gameEngine instanceof GameEngine){
            const gameTime = this.gameEngine.gameScript.gameTime;
            if(this.transform.vel[0] === 0 && this.transform.vel[1] === 0) {
                console.log('Only the first acceleration')
                const controlsAngleRoundedRadians = ((Math.round((this.controlsAngle / (2 * Math.PI)) * 16) % 16) / 16) * 2 * Math.PI;
                this.replayablePhysicsComponent.startAcceleration({acceleration: this.jetAcceleration, endSpeed: this.maxSpeed, gameTimeAccelerationStarted: gameTime, direction: controlsAngleRoundedRadians})
            } else {
                // get the controls angle and compare it to the current direction
                // get the absolute velocity and compare it to the max
                // that could be memoized
                // when it's not rotating, we can use transform.vel. Thankfully we always have to speed up or slow down before adjusting the turn angle
                // so this should be valid, but it might not work for other units

                const currentDirection = (Math.atan2(this.transform.vel[1], this.transform.vel[0]) + Math.PI * 2) % (Math.PI * 2);
                const currentDirectionRounded = this.roundAngleTo16thsDegrees(currentDirection);
                const controlsAngleRounded =  this.roundAngleTo16thsDegrees(this.controlsAngle);

                // might be needed later
                const endAngle = this.replayablePhysicsComponent.turnInformation.endAngleFromRotationPointIfUninterrupted;

                // this determines if we are inputting an acceleration
                // I don't think it will ever happen though since every turn will result in a straight acceleration automatically
                // oh! it could be slowing down, and we could be interrupting it!
                if(currentDirectionRounded === controlsAngleRounded) {
                    // check that we didn't already speed up to this speed
                    if(this.maxSpeed !== this.replayablePhysicsComponent.restSpeed) {
                        this.replayablePhysicsComponent.startAcceleration({acceleration: this.jetAcceleration, endSpeed: this.maxSpeed, gameTimeAccelerationStarted: gameTime})
                    }
                } else if ( 
                    // if it's turning already, make sure the controls direction is different from the end turn direction before interrupting the turn
                    // also have to account for the 2PI that's added when turning right and the start angle is greater than the end angle
                    !this.replayablePhysicsComponent.isAccelerating &&
                        !this.replayablePhysicsComponent.isTurning 
                ) {

                    // I need to add the case where we are already accelerating
                    // and the case where we are already turning. We should be able to interrupt both of these


                    //         || (endAngle > 2 * Math.PI && this.roundAngleTo16thsDegrees(endAngle - 2 * Math.PI) !== controlsAngleRounded) || 
                    //         (this.roundAngleTo16thsDegrees(endAngle) !== controlsAngleRounded))
                    // on second thought, I need to get the straight acceleration interrupt working first
                    // and likely, the callback/next operation working as well

                    // ^ I have no idea what this is talking about :) 
                    
                    const angleDifference = controlsAngleRounded - currentDirectionRounded;
                    const isTurningRight = !(angleDifference > 180 || (angleDifference < 0 && angleDifference > -180));
                    // turning right means that the rotation point is to the right relative to the movement direction
                    // always at a 90 degree angle
                    const tangentAngle = this.replayablePhysicsComponent.movementTangentAngle;

                    // const tangentSpeed = 4/5 * this.maxSpeed;
                    const {turnRadius, tangentSpeed} = this.getTurnRadiusAndSpeed(Math.abs(angleDifference));

                    // check tangent speed with current speed,
                    // then decelerate/accelerate

                    const endAngle = ((Math.round((this.controlsAngle / (2 * Math.PI)) * 16) % 16) / 16) * 2 * Math.PI;
                    const nextInstruction = { 
                        type: 'accelerate' as 'accelerate',
                        endSpeed: this.maxSpeed,
                        acceleration: this.jetAcceleration
                    }

                    if(this.replayablePhysicsComponent.restSpeed !== tangentSpeed) {
                        const acceleration = this.replayablePhysicsComponent.restSpeed > tangentSpeed ? this.jetDeceleration : this.jetAcceleration;
                        const endSpeed = tangentSpeed;
                        const followupInstruction: NextInstructionTurn  = {
                            type: 'turn',
                            tangentSpeed,
                            turnRadius,
                            isTurningRight,
                            endAngle,
                            startAngle: tangentAngle,
                            nextInstruction
                        };

                        this.replayablePhysicsComponent.startAcceleration({
                            acceleration,
                            endSpeed,
                            gameTimeAccelerationStarted: gameTime,
                            nextInstruction: followupInstruction
                        });
                    } else {
                        // needed for playback 
                        const pointWhereArchStarted: [number, number] = [this.transform.pos[0], this.transform.pos[1]];
                        const normalAngle = isTurningRight ? tangentAngle + Math.PI / 2 : tangentAngle - Math.PI / 2 
                        const rotationPoint: [number, number] = [
                            pointWhereArchStarted[0] + turnRadius * Math.cos(normalAngle),
                            pointWhereArchStarted[1] + turnRadius * Math.sin(normalAngle) 
                        ];

                        // console.log("Angle Difference", {startAngle: tangentAngle * 360 / (2 * Math.PI), endAngle: endAngle * 360 / (2 * Math.PI), Difference: endAngle* 360 / (2 * Math.PI) - tangentAngle * 360 / (2 * Math.PI)})
                        
                        // I need this to be able to be called later with a nextInstruction
                        this.replayablePhysicsComponent.startArchRotation({
                            turnRadius, 
                            isTurningRight: isTurningRight, 
                            tangentSpeed, 
                            startAngle: tangentAngle, 
                            endAngle, 
                            pointWhereArchStarted, // try to create this later
                            rotationPoint, // try to create this later
                            gameTimeArchStarted: gameTime, // try to create this later
                            nextInstruction
                        });
                    }
                } else if(false) {
                    // if it is turning, then start interrupting and change the direction
                }
               
                // const angleDifference = controlsAngleRounded - currentDirectionRounded;
                // const turningRight = !(angleDifference > 180 || (angleDifference < 0 && angleDifference > -180));
                // const tangentAngle = this.replayablePhysicsComponent.movementTangentAngle / (2 * Math.PI) * 360;
                // const endAngleFromRotationPointIfUninterrupted = ((Math.round((this.controlsAngle / (2 * Math.PI)) * 16) % 16) / 16) * 360;
                // const normalAngle = turningRight ? tangentAngle/360 * Math.PI * 2 + Math.PI / 2 : tangentAngle/ 360 * Math.PI * 2 - Math.PI / 2 
                // const pointWhereArchStarted = [this.transform.pos[0], this.transform.pos[1]];
                // const turnRadius = 300;
                // const rotationPoint: [number, number] = [
                //     pointWhereArchStarted[0] + turnRadius * Math.cos(normalAngle),
                //     pointWhereArchStarted[1] + turnRadius * Math.sin(normalAngle) 
                // ]
                // console.log("Angles", {
                //     startX: pointWhereArchStarted[0],
                //     startY: pointWhereArchStarted[1],
                //     turnRadius,
                //     rotX: rotationPoint[0],
                //     rotY: rotationPoint[1]
                // });
               
                // if the rounded difference
                
            }
        }
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

        if (Math.abs(direction[0]) + Math.abs(direction[1]) > 0.20) {
            // round to nearest 1/16th of a circle
            
            const angle = (Math.atan2(direction[1], direction[0]) + Math.PI * 2) % (Math.PI * 2);
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
        this.drawAurora(ctx);
        ctx.restore();
    }

    drawAurora(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.moveTo(0,0);
        
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        const l = this.length;
        const w = this.length/2

        ctx.lineTo(-l, w/2);
        ctx.lineTo(-l, -w/2);
        ctx.lineTo(0, 0);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(-13/18 * l, 0, 2/9 * w/2, -Math.PI/2, Math.PI/2);
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

}