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
import { ArcData } from "../../../game_engine/SpriteEditor/Point";

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
    leftExhaust: EngineExhaust;
    rightExhaust: EngineExhaust;
    airDecelerationParticles: AirDecelerationParticles;
    bombReticle: BombReticle;
    bombTiming: {
        refreshTime: number;
        reloadTime: number;
    }
    destructedColor: string;
    destructionLineWidth: number;
   

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
        this.destructedColor = "rgb(255, 255, 255)";
        this.destructionLineWidth = 1.5;

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

        this.addChildGameObject(this.leftExhaust);
        this.addChildGameObject(this.rightExhaust);
        this.addChildGameObject(this.bombReticle);

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
            // will need to tell gameScript about the death, which will then inform the current level
            // the level will decide what to do about that
            this.createDeathAnimationLineObjects();
            this.remove();
            (this.gameEngine.gameScript as StrikeTimeScript).loseLevel(); // controlled ship died()

            // create three objects for the death animation
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
        // console.log('whats going on here');
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
        // console.log('updateCalled', `delta: ${delta}`);
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