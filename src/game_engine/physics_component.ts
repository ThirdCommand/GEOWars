import { type Transform } from "./transform";
export class PhysicsComponent {
    transform: Transform;

    constructor(transform: Transform) {
        this.transform = transform;
    }



    move(timeDelta: number): void {
    // timeDelta is number of milliseconds since last move
    // if the computer is busy the time delta will be larger
    // in this case the PhysicsObject should move farther in this frame
        const timeScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        this.transform.pos[0] += this.transform.vel[0] * timeScale + (this.transform.acc[0] * (timeScale * timeScale)) / 2;
        this.transform.pos[1] += this.transform.vel[1] * timeScale + (this.transform.acc[1] * (timeScale * timeScale)) / 2;
        this.transform.pos[2] += this.transform.vel[2] * timeScale + (this.transform.acc[2] * (timeScale * timeScale)) / 2;
        
        this.transform.vel[0] += this.transform.acc[0] * timeScale;
        this.transform.vel[1] += this.transform.acc[1] * timeScale;
        this.transform.vel[2] += this.transform.acc[2] * timeScale;

        this.transform.angle += this.transform.aVel;
        this.transform.aVel += this.transform.aAcc;

        this.transform.acc = [0, 0, 0];
        this.transform.aAcc = 0;
       
    }
}

export class ReplayablePhysicsComponent {
    transform: Transform;
    gameTime: number;
    turnInformation: {
        rotationPoint?: [number, number] 
        startingPoint?: [number, number]
        turnRadius?: number
        endPoint?: [number, number]
        endAngleFromRotationPointIfUninterrupted?: number
        gameTimeWhenTurnEnds?: number
        nextInstruction?: NextInstructionAccelerate
        tangentSpeed?: number
        startAngle?: number
        gameTimeWhenTurnStarted?: number
        rotationDirection?: 1 | -1
    }
    accelerationInformation: {
        isDecelerating?: boolean;
        accelerationEndPositionIfUninterrupted?: [number, number],
        endVelocityIfUninterrupted?: [number, number],
        gameTimeWhenAccelerationEnds?: number,
        endSpeedIfUninterrupted?: number,
        nextInstruction?: NextInstructionTurn;
    }
    
    isAccelerating: boolean = false;
    isTurning: boolean = false;

    movementTangentAngle: number | null = null;

    // This will need to be carefully updated
    // since it kind of implies things
    restSpeed: number | null = null;

    constructor(transform: Transform) {
        this.transform = transform;
        this.accelerationInformation = {};
        this.turnInformation = {};

    }

    // to reverse time, I can replay the commands in reverse. in game time is the same
    // and have them in the opposite direction

    // game object will have to provide the rotation point.
    // this makes sense since only it will know what that should be depending on game feel

    // the command to rotate will start with accelerating/decelerating to tangent speed
    // then startArchRotation is called

    startArchRotation(turnParams: {
        rotationPoint: [number, number], 
        turnRadius: number, 
        isTurningRight: boolean, 
        tangentSpeed: number, 
        currentGameTime?: number,
        startAngle: number, 
        endAngle: number, 
        gameTimeArchStarted: number,  
        pointWhereArchStarted: [number, number] | null,
        nextInstruction?: NextInstructionAccelerate
    }) {
        let {
            rotationPoint,
            turnRadius,
            isTurningRight,
            tangentSpeed,
            startAngle,
            endAngle,
            gameTimeArchStarted,
            pointWhereArchStarted,
            nextInstruction,
            currentGameTime
        } = turnParams;

        if(this.isTurning) {
            return this.interruptTurn({
                rotationPoint,
                turnRadius,
                isTurningRight,
                tangentSpeed,
                startAngle,
                endAngle,
                gameTimeArchStarted,
                pointWhereArchStarted,
            });
        }
        // will have a precise time and location when the arch started while playing back controls
        // in that case we'll have to piece wise connect the arch and previous section
        console.log('input for startArchRotation', {
            rotationPoint,
            tangentSpeed,
            endAngle,
            gameTimeArchStarted,
            pointWhereArchStarted,
        })

         // isRotating should have been made false by the interruption of the rotation
        this.isAccelerating = false;
        this.isTurning = true;

        if(isTurningRight && startAngle > endAngle) {
            endAngle = endAngle + Math.PI * 2
        } else if (!isTurningRight && endAngle > startAngle) {
            startAngle = startAngle + Math.PI * 2
        }

        const angleDifference = endAngle - startAngle;

        // when replaying an action, we'll need a catchup time function which will be like the move function
        // we'd run the move function for the previous action up to the time of the new action start
        // then run the new action's move function for the rest of the time
        
        this.turnInformation.startingPoint = pointWhereArchStarted;
        this.turnInformation.turnRadius = turnRadius;
        const rotationDirection = isTurningRight ? 1 : -1;
        this.turnInformation.rotationDirection = rotationDirection;
        this.transform.archAngleVelocity = tangentSpeed / this.turnInformation.turnRadius * rotationDirection;
        this.turnInformation.tangentSpeed = tangentSpeed;
        this.turnInformation.rotationPoint = [rotationPoint[0], rotationPoint[1]];
        this.turnInformation.endAngleFromRotationPointIfUninterrupted = endAngle;
        this.turnInformation.gameTimeWhenTurnEnds = gameTimeArchStarted + Math.abs((angleDifference) / this.transform.archAngleVelocity);
        this.turnInformation.gameTimeWhenTurnStarted = gameTimeArchStarted;
        this.turnInformation.startAngle = startAngle;
        this.turnInformation.nextInstruction = nextInstruction

        this.turnInformation.endPoint = [
            rotationPoint[0] + this.turnInformation.turnRadius * Math.cos(endAngle - Math.PI/2) * rotationDirection,
            rotationPoint[1] + this.turnInformation.turnRadius * Math.sin(endAngle - Math.PI/2) * rotationDirection
        ]

        if(currentGameTime) {
            this.move(currentGameTime - gameTimeArchStarted, currentGameTime);
        }
        console.log('colected turn information',this.turnInformation);
    }

    interruptTurn(interruptTurnParams: {
        rotationPoint: [number, number], 
        turnRadius: number, 
        isTurningRight: boolean, 
        tangentSpeed: number, 
        startAngle: number, 
        endAngle: number, 
        gameTimeArchStarted: number,  
        pointWhereArchStarted: [number, number] | null,
    }) {
        const {
            rotationPoint,
            turnRadius,
            isTurningRight,
            tangentSpeed,
            startAngle,
            endAngle,
            gameTimeArchStarted,
            pointWhereArchStarted,
        } = interruptTurnParams;
    }

    startAcceleration(accelerationParams: {
        acceleration: number,
        endSpeed: number, 
        gameTimeAccelerationStarted: number, 
        currentGameTime?: number | null, 
        direction?: number | null,
        nextInstruction?: NextInstructionTurn
    }) {
       
        // what if acceleration is negative
        // I don't think I want external forces to be applied for replayable physics components
        const {
            acceleration, 
            endSpeed, 
            gameTimeAccelerationStarted, 
            currentGameTime,
            direction,
            nextInstruction
        } = accelerationParams;

        this.accelerationInformation.isDecelerating = acceleration < 0;
        
        let currentSpeed = null;
        let velocityAngle = null;
        if(direction) {
            currentSpeed = 0;
            velocityAngle = direction;
        } else {
            currentSpeed = Math.sqrt(this.transform.vel[0]**2 + this.transform.vel[1]**2);
            velocityAngle = Math.atan2(this.transform.vel[1], this.transform.vel[0]);
        }

        // isRotating should have been made false by the interruption of the rotation
        this.isTurning = false;
        this.isAccelerating = true;

        this.accelerationInformation.nextInstruction = nextInstruction;
        
        const timeUntilAccelerationEnds = (endSpeed - currentSpeed) / acceleration;
        this.accelerationInformation.gameTimeWhenAccelerationEnds = timeUntilAccelerationEnds + gameTimeAccelerationStarted;
        const accelerationDistanceIfUninterrupted = currentSpeed * timeUntilAccelerationEnds + 0.5 * acceleration * timeUntilAccelerationEnds ** 2;
        this.accelerationInformation.accelerationEndPositionIfUninterrupted = [
            this.transform.pos[0] + Math.cos(velocityAngle) * accelerationDistanceIfUninterrupted,
            this.transform.pos[1] + Math.sin(velocityAngle) * accelerationDistanceIfUninterrupted
        ]
        this.accelerationInformation.endVelocityIfUninterrupted = [
            Math.cos(velocityAngle) * endSpeed,
            Math.sin(velocityAngle) * endSpeed
        ]
        // I don't think I want external forces to be applied for replayable physics components
        this.transform.acc[0] = Math.cos(velocityAngle) * acceleration;
        this.transform.acc[1] = Math.sin(velocityAngle) * acceleration;
        this.accelerationInformation.endSpeedIfUninterrupted = endSpeed;
        if(currentGameTime) {
            this.move(currentGameTime - gameTimeAccelerationStarted, currentGameTime);
        }
    }

    move(timeDelta: number, gameTime: number): void {
        // const timeScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        const originalPosition = [this.transform.pos[0], this.transform.pos[1]];

        if(this.isAccelerating) {
            const {endVelocityIfUninterrupted, gameTimeWhenAccelerationEnds, accelerationEndPositionIfUninterrupted, endSpeedIfUninterrupted, nextInstruction} = this.accelerationInformation;
            // if the game time is after the acceleration should have finished
            if (gameTime >= gameTimeWhenAccelerationEnds) {
                // if the game time is after the acceleration should have finished
                console.log('Acceleration ended', {
                    currentPosition: this.transform.pos, 
                    settingPosition: this.accelerationInformation.accelerationEndPositionIfUninterrupted, 
                    gameTimeWhenAccelerationEnds: this.accelerationInformation.gameTimeWhenAccelerationEnds, 
                    gameTime: gameTime}
                );
                const timeSinceAccelerationEnded = gameTime - gameTimeWhenAccelerationEnds;
                if(nextInstruction) {
                    // finish rotation and then:
                    this.isAccelerating = false;
                    this.transform.vel[0] = endVelocityIfUninterrupted[0];
                    this.transform.vel[1] = endVelocityIfUninterrupted[1];
                    this.transform.pos[0] = accelerationEndPositionIfUninterrupted[0]
                    this.transform.pos[1] = accelerationEndPositionIfUninterrupted[1]
                    this.transform.acc[0] = 0;
                    this.transform.acc[1] = 0;
                    this.accelerationInformation = {};
                    this.restSpeed = endSpeedIfUninterrupted;
                    this.applyNextInstruction(nextInstruction, gameTime, gameTimeWhenAccelerationEnds);
                } else {
                   
                    this.isAccelerating = false;
                    this.transform.vel[0] = endVelocityIfUninterrupted[0];
                    this.transform.vel[1] = endVelocityIfUninterrupted[1];
                    this.transform.pos[0] = accelerationEndPositionIfUninterrupted[0] + timeSinceAccelerationEnded * this.transform.vel[0];
                    this.transform.pos[1] = accelerationEndPositionIfUninterrupted[1] + timeSinceAccelerationEnded * this.transform.vel[1];
                    this.transform.acc[0] = 0;
                    this.transform.acc[1] = 0;
                    this.accelerationInformation = {};
                    this.restSpeed = endSpeedIfUninterrupted;
                }
                
            } else {
                // apply the acceleration
                this.transform.pos[0] += this.transform.vel[0] * timeDelta + (this.transform.acc[0] * (timeDelta * timeDelta)) / 2;
                this.transform.pos[1] += this.transform.vel[1] * timeDelta + (this.transform.acc[1] * (timeDelta * timeDelta)) / 2;
                this.transform.vel[0] += this.transform.acc[0] * timeDelta;
                this.transform.vel[1] += this.transform.acc[1] * timeDelta;
                // this.transform.pos[0] += this.transform.vel[0] * timeScale + (this.transform.acc[0] * (timeScale * timeScale)) / 2;
                // this.transform.pos[1] += this.transform.vel[1] * timeScale + (this.transform.acc[1] * (timeScale * timeScale)) / 2;
                // this.transform.vel[0] += this.transform.acc[0] * timeScale;
                // this.transform.vel[1] += this.transform.acc[1] * timeScale;
            }

        } else if (this.isTurning) {
            const {endAngleFromRotationPointIfUninterrupted, tangentSpeed, rotationPoint, turnRadius, endPoint, gameTimeWhenTurnEnds, nextInstruction} = this.turnInformation;
            // great... at the end of the rotation it accelerates to max speed
            // so when I piece together the rotation + straight I have to account for that
            // I just need to find the time that the rotation ended vs the current time
            // if rotation, rotate around the rotation point
            // using archAngleVelocity

            // in reverse, I'll also have to know the time that the acceleration ended
            // to apply it in reverse
            if(gameTime > gameTimeWhenTurnEnds) {
                this.transform.pos[0] = endPoint[0];
                this.transform.pos[1] = endPoint[1];
                const timeSinceTurnEnded = gameTime - gameTimeWhenTurnEnds;
                console.log('Turning ended');

                this.movementTangentAngle = endAngleFromRotationPointIfUninterrupted;
                    
                const endVelocityIfUninterrupted = [
                    tangentSpeed * Math.cos(endAngleFromRotationPointIfUninterrupted),
                    tangentSpeed * Math.sin(endAngleFromRotationPointIfUninterrupted)
                ]

                this.isTurning = false;
                this.transform.vel[0] = endVelocityIfUninterrupted[0];
                this.transform.vel[1] = endVelocityIfUninterrupted[1];
                // then we need to do the next instruction, which will be a straight acceleration
                // for the aurora
                // if no next instruction given, then maintain the current speed
                if(nextInstruction) {
                    // finish rotation and then:

                    this.applyNextInstruction(nextInstruction, gameTime, gameTimeWhenTurnEnds);
                } else {
                    
                    this.transform.pos[0] += timeSinceTurnEnded * this.transform.vel[0];
                    this.transform.pos[1] += timeSinceTurnEnded * this.transform.vel[1];

                    this.restSpeed = tangentSpeed;

                    this.turnInformation = {};
                    
                }
            } else {
                // I'll need starting game time, and current game time. Then 

                // I think I need to apply the movement based on where it should be at what game time,
                // instead of incrementing
                const timeSinceTurnStarted = (gameTime - this.turnInformation.gameTimeWhenTurnStarted);
                const archAngleVelocity = this.transform.archAngleVelocity;
                const newArchAngle = this.turnInformation.startAngle - Math.PI/2 + archAngleVelocity * timeSinceTurnStarted;
                // likely the issue:
                this.transform.pos[0] = rotationPoint[0] + this.turnInformation.rotationDirection * turnRadius * Math.cos(newArchAngle);
                this.transform.pos[1] = rotationPoint[1] + this.turnInformation.rotationDirection * turnRadius * Math.sin(newArchAngle);
                console.log('speed?',this.transform.archAngleVelocity);
            }
            
        } else {
            // no acceleration, so just moving
            
            this.transform.pos[0] += this.transform.vel[0] * timeDelta;
            this.transform.pos[1] += this.transform.vel[1] * timeDelta;
            // this.transform.pos[0] += this.transform.vel[0] * timeScale;
            // this.transform.pos[1] += this.transform.vel[1] * timeScale;
        }
        this.movementTangentAngle = (Math.atan2(
            this.transform.pos[1] - originalPosition[1],
            this.transform.pos[0] - originalPosition[0]
        ) + Math.PI * 2) % (Math.PI * 2);
        
    }
    applyNextInstruction(nextInstruction: NextInstructionAccelerate | NextInstructionTurn, currentGameTime: number, gameTimeItStarts: number) {
        if(nextInstruction.type === 'accelerate') {
            this.startAcceleration({
                acceleration: nextInstruction.acceleration, 
                endSpeed: nextInstruction.endSpeed,
                currentGameTime,
                gameTimeAccelerationStarted: gameTimeItStarts
            });
        }
        if(nextInstruction.type === 'turn') {
            const {turnRadius, isTurningRight, tangentSpeed, endAngle, startAngle, nextInstruction: followupInstruction} = nextInstruction;
            const currentPosition = [this.transform.pos[0], this.transform.pos[1]];
            const pointWhereArchStarted: [number, number] = [currentPosition[0], currentPosition[1]];
            const normalAngle = isTurningRight ? startAngle + Math.PI / 2 : startAngle - Math.PI / 2 
            const rotationPoint: [number, number] = [
                pointWhereArchStarted[0] + turnRadius * Math.cos(normalAngle),
                pointWhereArchStarted[1] + turnRadius * Math.sin(normalAngle) 
            ]
            this.startArchRotation({
                turnRadius, 
                isTurningRight, 
                tangentSpeed, 
                startAngle, 
                endAngle, 
                pointWhereArchStarted, // try to create this later
                rotationPoint, // try to create this later
                gameTimeArchStarted: gameTimeItStarts, // try to create this later
                currentGameTime: currentGameTime,
                nextInstruction: followupInstruction
            })
        }

    }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

export type NextInstructionAccelerate = {
    type: 'accelerate',
    endSpeed: number,
    acceleration: number,
    nextInstruction?: NextInstructionTurn
}

export type NextInstructionTurn = {
    type: 'turn',
    tangentSpeed: number,
    turnRadius: number,
    isTurningRight: boolean,
    endAngle: number,
    startAngle: number,
    nextInstruction: NextInstructionAccelerate
}