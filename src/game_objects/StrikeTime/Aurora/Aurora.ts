import { GameObject } from "../../../game_engine/game_object";
import { LineSprite, Spawnable } from "../../../game_engine/line_sprite";
import { Transform } from "../../../game_engine/transform";
import { GameEngine } from "../../../game_engine/game_engine";
import { Camera } from "../../../game_engine/camera";
import {NextInstructionAccelerate, NextInstructionTurn} from "../../../game_engine/physics_component"
import { EngineExhaust } from "./EngineExhaust";
import { AirDecelerationParticles } from "./AirDecelerationParticles";
import { BombBasic } from "../Bombs/BombBasic";
import { VectorMath } from "../../../game_engine/util";
import { BombReticle } from "./BombReticle";
import { StrikeTimeScript } from "../../../StrikeTimeScript";
import { AnimationView } from "../../../AnimationView";

export class Aurora extends GameObject {
    lineSprite: AuroraSprite;
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
    leftExhaust: EngineExhaust
    rightExhaust: EngineExhaust
    airDecelerationParticles: AirDecelerationParticles;
    bombReticle: BombReticle;
    bombTiming: {
        refreshTime: number;
        reloadTime: number;
    }
   

    constructor(
        engine: GameEngine | AnimationView,
        pos: [number, number],
        angle = Math.random() * Math.PI * 2
    ) {
        super(engine);
        this.transform.pos = pos;
        this.hits = 0;
        this.hitsWhenDead = 3;
        this.transform.angle = angle;
        this.transform.vel = [0, 0];

        this.radius = 30;
        this.turnRadius = 60;
        this.minSpeed = 1;
        this.maxSpeed = 0.025 * 6;
        this.controlsDirection = [0,0];

        this.bombTiming = {
            refreshTime: 0,
            reloadTime: 2000
        }

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
        this.addBKeyListener();
        this.addBButtonListener();
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
    }

    updateBButtonListener(pressed: boolean) {
        if(pressed && this.bombTiming.refreshTime > this.bombTiming.reloadTime) {
            // get the direction that we're going now
            // apply this speed in that direction
            const currentDirection = this.transform.angle;
            const bombSpeed = 0.05;

            const bombVelocity = VectorMath.vectorCartesian(currentDirection, bombSpeed)
            new BombBasic(this.gameEngine,[this.transform.pos[0], this.transform.pos[1]], bombVelocity)
            this.bombTiming.refreshTime = 0;
        }
    }
    hit() {
        this.hits += 1;
        if(this.hits >= this.hitsWhenDead) {
            (this.gameEngine.gameScript as StrikeTimeScript).loseLevel();
        }
    }
    updateBKeyListener(pressed: boolean) {
        if(pressed && this.bombTiming.refreshTime > this.bombTiming.reloadTime) {
            // get the direction that we're going now
            // apply this speed in that direction
            const currentDirection = this.transform.angle;
            const bombSpeed = 0.05;

            const bombVelocity = VectorMath.vectorCartesian(currentDirection, bombSpeed)
            new BombBasic(this.gameEngine,[this.transform.pos[0], this.transform.pos[1]], bombVelocity)
            this.bombTiming.refreshTime = 0;
        }
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
        this.bombTiming.refreshTime += delta;
        this.bombTiming.refreshTime = this.bombTiming.refreshTime  > this.bombTiming.reloadTime ? this.bombTiming.reloadTime + 1 : this.bombTiming.refreshTime;
        (this.bombTiming.refreshTime > this.bombTiming.reloadTime) ? this.bombReticle.setVisibility(true) : this.bombReticle.setVisibility(false);
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

        // visuals (animation)
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
        // It's taking too long to get this stuff right
        // so I'm going to simplify it and expand on it later
        // so, the new requirements for movement are:
        // 1: no grid system yet
        // 2. no reversible movements yet
        // 3: one turn radius at same speed as straight
        // 4. 1/16 * 2PI angles allowed
        // 5. only initiate turn when relative direction passes a small threshold (1/8th PI lets say)
        const turnThreshold = Math.PI / 8;




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

        if(!(this.gameEngine instanceof GameEngine)) return;
        // eventually we can go past this 
        // once we're able to interrupt turns
        if(this.replayablePhysicsComponent.isTurning) return;
        if(this.controlsAngle === null) return;

        const gameTime = this.gameEngine.gameScript.gameTime;
        if(this.transform.vel[0] === 0 && this.transform.vel[1] === 0) {
            console.log('Only the first acceleration')
            const controlsAngleRoundedRadians = ((Math.round((this.controlsAngle / (2 * Math.PI)) * 16) % 16) / 16) * 2 * Math.PI;
            this.replayablePhysicsComponent.startAcceleration({acceleration: this.jetAcceleration, endSpeed: this.maxSpeed, gameTimeAccelerationStarted: gameTime, onStartDirection: controlsAngleRoundedRadians})
            return;
        }

        // get the controls angle and compare it to the current direction
        // get the absolute velocity and compare it to the max
        // that could be memoized
        // when it's not rotating, we can use transform.vel. Thankfully we always have to speed up or slow down before adjusting the turn angle
        // so this should be valid, but it might not work for other units

        const currentDirection = (Math.atan2(this.transform.vel[1], this.transform.vel[0]) + Math.PI * 2) % (Math.PI * 2);
        const currentDirectionRounded = this.roundAngleTo16thsDegrees(currentDirection);
        const controlsAngleRounded =  this.roundAngleTo16thsDegrees(this.controlsAngle);

        // might be needed later
        // const endAngle = this.replayablePhysicsComponent.turnInformation.endAngleFromRotationPointIfUninterrupted;

        // this determines if we are inputting an acceleration
        // I don't think it will ever happen though since every turn will result in a straight acceleration automatically
        // oh! it could be slowing down, and we could be interrupting it!

        // on second thought, 
        if(currentDirectionRounded === controlsAngleRounded) {
            // check that we didn't already speed up to this speed
            // check that we are slowing down (before a turn) and want to interrupt it by going straight

            // to test: lower acceleration to make it easier to see, Have plane at max speed, tell it to turn tightly, 
            // then tell it to continue straight instead while it's slowing down

            // I need to update restSpeed more often... it's not going great at the moment
            // if(this.maxSpeed !== this.replayablePhysicsComponent.restSpeed && this.replayablePhysicsComponent.accelerationInformation.isDecelerating) {
            //     console.log('helloo')
            //     this.replayablePhysicsComponent.startAcceleration({acceleration: this.jetAcceleration, endSpeed: this.maxSpeed, gameTimeAccelerationStarted: gameTime})
            // }
            return;
        } 

        // plane is still jumping when the turn angle changes while changing the deceleration to end at a different speed for a different turn

        //         || (endAngle > 2 * Math.PI && this.roundAngleTo16thsDegrees(endAngle - 2 * Math.PI) !== controlsAngleRounded) || 
        //         (this.roundAngleTo16thsDegrees(endAngle) !== controlsAngleRounded))
        // on second thought, I need to get the straight acceleration interrupt working first
        
        const angleDifference = controlsAngleRounded - currentDirectionRounded;
        const isTurningRight = !(angleDifference > 180 || (angleDifference < 0 && angleDifference > -180));
        // turning right means that the rotation point is to the right relative to the movement direction
        // always at a 90 degree angle
        const tangentAngle = this.replayablePhysicsComponent.movementTangentAngle;

        const turnRadius = this.turnRadius;

        const tangentSpeed = this.maxSpeed;

        // we'll want to use this later:
        // const {turnRadius, tangentSpeed} = this.getTurnRadiusAndSpeed(Math.abs(angleDifference));

        // check tangent speed with current speed,
        // then decelerate/accelerate

        // TODO can use controlsAngleRounded and convert to radians later... I think
        // const endAngle = ((Math.round((this.controlsAngle / (2 * Math.PI)) * 16) % 16) / 16) * 2 * Math.PI;
        const endAngle = controlsAngleRounded/360 * 2 * Math.PI;



        // after a turn we want to accelerate to the max straight speed
        // for now we don't want the plane to slow down for turns
        // to keep things simple at first

        // const nextInstruction: NextInstructionAccelerate = { 
        //     type: 'accelerate',
        //     endSpeed: this.maxSpeed,
        //     acceleration: this.jetAcceleration
        // }

        // this was restSpeed before.. rest speed needs to die, I'm not sure what it's for exactly
        // I think it's to verify that the speed has been changed to a specific thing at some point in the past
        // 
        // if(this.replayablePhysicsComponent.restSpeed !== tangentSpeed) {

        // if we're already decelerating for a shallow turn, and the new angle is sharper requiring a slower speed,
        // then update the end speed of the deceleration, and the turn angle of the next instruction
        // if we're already accelerating for a less sharp turn, and the turn angle changes requiring a different speed, then update
        // the acceleration and the turn angle of the next instruction
        // if(
        //     this.replayablePhysicsComponent.accelerationInformation?.endSpeedIfUninterrupted && 
        //     this.replayablePhysicsComponent.accelerationInformation.endSpeedIfUninterrupted !== tangentSpeed
        // ) {
        //     console.log('speed change needed', {previousEndSpeed: this.replayablePhysicsComponent.accelerationInformation?.endSpeedIfUninterrupted, newEndSpeed: tangentSpeed})
        //     const acceleration = this.replayablePhysicsComponent.restSpeed > tangentSpeed ? this.jetDeceleration : this.jetAcceleration;
        //     const endSpeed = tangentSpeed;
        //     const followupInstruction: NextInstructionTurn  = {
        //         type: 'turn',
        //         tangentSpeed,
        //         turnRadius,
        //         isTurningRight,
        //         endAngle: endAngle,
        //         startAngle: tangentAngle,
        //         nextInstruction
        //     };

        //     // still need to apply what happens when interrupting
        //     this.replayablePhysicsComponent.startAcceleration({
        //         acceleration,
        //         endSpeed,
        //         gameTimeAccelerationStarted: gameTime, 
        //         nextInstruction: followupInstruction
        //     });
        // } 

        // if(this.replayablePhysicsComponent.isAccelerating) return;
        
        if(!this.replayablePhysicsComponent.isTurning) { 
            // the tangent speed is the same so we should be waiting for the acceleration to finish
            // TODO: this presents a problem when a turn is possible at max speed because we could be accelerating to the max speed and we'd want 
            // to update the acceleration to include the next turn instruction if that's the case

            // needed for playback 
            const pointWhereArchStarted: [number, number] = [this.transform.pos[0], this.transform.pos[1]];
            const normalAngle = isTurningRight ? tangentAngle + Math.PI / 2 : tangentAngle - Math.PI / 2 
            const rotationPoint: [number, number] = [
                pointWhereArchStarted[0] + turnRadius * Math.cos(normalAngle),
                pointWhereArchStarted[1] + turnRadius * Math.sin(normalAngle) 
            ];

            this.replayablePhysicsComponent.startArchRotation({
                turnRadius, 
                isTurningRight: isTurningRight, 
                tangentSpeed, 
                startAngle: tangentAngle, 
                endAngle: endAngle, 
                pointWhereArchStarted, // try to create this later
                rotationPoint, // try to create this later
                gameTimeArchStarted: gameTime, // try to create this later
                // nextInstruction
            });
            return;
        } 
        
        if(this.replayablePhysicsComponent.turnInformation?.rotationDirection !== undefined && 
            this.replayablePhysicsComponent.turnInformation?.rotationDirection !== null &&
            isTurningRight === (this.replayablePhysicsComponent.turnInformation?.rotationDirection > 1) && 
            this.replayablePhysicsComponent.turnInformation?.endAngleFromRotationPointIfUninterrupted && 
            controlsAngleRounded !== this.replayablePhysicsComponent.turnInformation.endAngleFromRotationPointIfUninterrupted
        ) {
            // if it is turning, then start interrupting and change the end direction
            // if the controls direction is different from the end direction of the current turn

            // interrupt by altering the current turn to end at a different direction
            // let's try to ignore the fact that we want larger angled turns to be 
            // done at a slower speed

            // this should result in a shallow turn's angle being interrupted to what would normally 
            // call for a slowdown and then a tighter slower turn
            // but instead, the plane will continue at the shallow angle turn rate and complete it all the 
            // way to the new angle....
            // let's just see how that feels first before getting more complicated... though I think I'll have to
            // get more complicated and figure out how big of an angle discrepancy warrants slowing down to the tighter
            // turn speed

            // maybe it's just a matter of applying the same logic of turn direction. But the complicated bit will still be
            // ending the current turn at a new direction that is the next 1/16th of 2PI
            // Then accelerating to the right speed, and then finally, turning to the location

            // to change the end angle, I also need to change the end game time, and the end location of the turn.. which kinda sucks

            this.replayablePhysicsComponent.startArchRotation({
                turnRadius: this.replayablePhysicsComponent.turnInformation.turnRadius, 
                isTurningRight: isTurningRight, 
                tangentSpeed:  this.replayablePhysicsComponent.turnInformation.tangentSpeed, 
                startAngle: this.replayablePhysicsComponent.turnInformation.startAngle, 
                endAngle: endAngle, 
                pointWhereArchStarted: this.replayablePhysicsComponent.turnInformation.startingPoint,
                rotationPoint: this.replayablePhysicsComponent.turnInformation.rotationPoint,
                gameTimeArchStarted: this.replayablePhysicsComponent.turnInformation.gameTimeWhenTurnStarted, 
                nextInstruction: this.replayablePhysicsComponent.turnInformation.nextInstruction
            });
        } else if (
            isTurningRight !== (this.replayablePhysicsComponent.turnInformation?.rotationDirection > 1) && 
            this.replayablePhysicsComponent.turnInformation?.endAngleFromRotationPointIfUninterrupted &&
            controlsAngleRounded !== this.replayablePhysicsComponent.turnInformation?.endAngleFromRotationPointIfUninterrupted
        ) {
            // we want to update the final angle, the final location, and the next instruction
            // OH it's the same as before! except I need to determine the final angle
            // based on the next closest 16th of 2PI, and then I'm adding a new next instruction

            // not sure what happens with edge cases here. I might need a mod 16 too 
            console.log('WE SHOULD BE ENDING THE TURN SOON NOW FOR ANOTHER TURN')
            const currentDirectionRoundedToNext16th = ((Math.floor(currentDirection / (Math.PI * 2) * 16) % 16) / 16) * (Math.PI * 2);

            const accelerateToMaxSpeed: NextInstructionAccelerate = { 
                type: 'accelerate',
                endSpeed: this.maxSpeed,
                acceleration: this.jetAcceleration
            }

            const followupInstruction: NextInstructionTurn  = {
                type: 'turn',
                tangentSpeed,
                turnRadius,
                isTurningRight,
                endAngle,
                startAngle: tangentAngle,
                nextInstruction: accelerateToMaxSpeed
            };

            // this is where I would have the plane animation happen over time where it banks from one side to the other
            // instead this should execute instantly without changing anything 
            const nextInstruction: NextInstructionAccelerate = {  
                type: 'accelerate',
                endSpeed: tangentSpeed,
                acceleration: this.jetAcceleration,
                nextInstruction: followupInstruction
            }

            this.replayablePhysicsComponent.startArchRotation({
                turnRadius: this.replayablePhysicsComponent.turnInformation.turnRadius, 
                isTurningRight: isTurningRight, 
                tangentSpeed:  this.replayablePhysicsComponent.turnInformation.tangentSpeed, 
                startAngle: this.replayablePhysicsComponent.turnInformation.startAngle, 
                endAngle: currentDirectionRoundedToNext16th, 
                pointWhereArchStarted: this.replayablePhysicsComponent.turnInformation.startingPoint,
                rotationPoint: this.replayablePhysicsComponent.turnInformation.rotationPoint,
                gameTimeArchStarted: this.replayablePhysicsComponent.turnInformation.gameTimeWhenTurnStarted, 
                nextInstruction: nextInstruction
            });
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