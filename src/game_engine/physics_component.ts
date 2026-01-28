import { type Transform } from "./transform";
export class PhysicsComponent {
    transform: Transform;
    isTimeReversing: boolean;

    constructor(transform: Transform) {
        this.transform = transform;
        this.isTimeReversing = false;
    }

    reverseTime() {
        this.isTimeReversing = !this.isTimeReversing;
    }



    move(timeDelta: number): void {
        // timeDelta is number of milliseconds since last move
        // if the computer is busy the time delta will be larger
        // in this case the PhysicsObject should move farther in this frame

        // Floating point error bar results in differences between replaying forward, backward, and forward again.
        // This might be okay
        const timeScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        
        const accelerationSign = timeDelta > 0 ? 1 : -1;
        this.transform.pos[0] += this.transform.vel[0] * timeScale + accelerationSign * (this.transform.acc[0] * (timeScale ** 2)) / 2;
        this.transform.pos[1] += this.transform.vel[1] * timeScale + accelerationSign * (this.transform.acc[1] * (timeScale ** 2)) / 2;
        this.transform.pos[2] += this.transform.vel[2] * timeScale + accelerationSign * (this.transform.acc[2] * (timeScale ** 2)) / 2;
        
        this.transform.vel[0] += this.transform.acc[0] * timeScale;
        this.transform.vel[1] += this.transform.acc[1] * timeScale;
        this.transform.vel[2] += this.transform.acc[2] * timeScale;

        this.transform.angle += this.transform.aVel * timeScale + accelerationSign * this.transform.aAcc * (timeScale**2)/2;
        this.transform.aVel += this.transform.aAcc * timeScale;

        this.transform.acc = [0, 0, 0];
        this.transform.aAcc = 0;
       
    }
}

// reversibleAction
// 1. no action yet, waiting for instructions
//      every time increment, ask parent component if a new action is started
// 2. parent component detected action, so when asked it provides it to us
//      if straight, the action will have a direction, start time/location. reversed direction, reversed end time/location
//      if turn, the action will have start direction, end direction, start time/location. reversed start/end direction + time/location
//      every time increment it will ask if the current action is interrupted. 
//          if straight, an end time/location will be added, and reverse start time/location added
//          if turn, end time/location/angle will be updated, plus their reverses
//      if turn completes without interruption
//          parent is asked for next instruction. if none, the default instruction of straight at the end angle will be created


type ActionType = 'Straight' | 'Turn';
interface DoAction { 
    (timeDelta: number, gameTime: number, action: Action): Boolean; // true if completed
}

type ActionData = TurnInformation | AccelerationInformation | WaitInformation | StraightInformation;

type Action = {
    type: ActionType;
    actionData: ActionData;
    reversedData: ActionData;
}

type TurnInformation = {
    rotationPoint?: [number, number]; 
    startingPoint?: [number, number];
    turnRadius?: number;
    endPoint?: [number, number];
    endAngle?: number;
    gameTimeWhenTurnEnds?: number;
    nextInstruction?: NextInstructionAccelerate;
    tangentSpeed?: number;
    startAngle?: number;
    gameTimeWhenTurnStarted?: number;
    rotationDirection?: 1 | -1;
}

type AccelerationInformation = {
    isDecelerating?: boolean;
    accelerationEndPositionIfUninterrupted?: [number, number],
    endVelocityIfUninterrupted?: [number, number],
    gameTimeWhenAccelerationEnds?: number,
    endSpeedIfUninterrupted?: number,
    nextInstruction?: NextInstructionTurn;
    acceleration?: number;
}

type WaitInformation = {
    startTime?: number;
    endTime?: number;
}

type StraightInformation = {
    velocity?: [number, number];
    startTime?: number;
    endTime?: number;
    startLocation: [number, number];
    endLocation: [number, number];
}

export class ReplayablePhysicsComponent {
    transform: Transform;
    gameTime: number;
    instructionsCompleted: string[];
    reversibleActions: Action[];
    turnInformation: {
        rotationPoint?: [number, number] 
        startingPoint?: [number, number]
        turnRadius?: number
        endPoint?: [number, number]
        endAngle?: number
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
        acceleration?: number;
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
        this.instructionsCompleted = [];

    }

    startSimpleArchRotation(turnParams: {

    }) {

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
    }): number {
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

        if (this.isAccelerating) {
            // console.log('interrupting Acceleration to Turn');
        }

        if(this.isTurning) {
            // console.log('interrupting Turn to change Turn')
        }

        // if(this.isTurning) {
        //     return this.interruptTurn({
        //         rotationPoint,
        //         turnRadius,
        //         isTurningRight,
        //         tangentSpeed,
        //         startAngle,
        //         endAngle,
        //         gameTimeArchStarted,
        //         pointWhereArchStarted,
        //     });
        // }

        // will have a precise time and location when the arch started while playing back controls
        // in that case we'll have to piece wise connect the arch and previous section
        // console.log('input for startArchRotation', {
        //     rotationPoint,
        //     tangentSpeed,
        //     endAngle,
        //     gameTimeArchStarted,
        //     pointWhereArchStarted,
        // })

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
        this.turnInformation.endAngle = endAngle;
        this.turnInformation.gameTimeWhenTurnEnds = gameTimeArchStarted + Math.abs((angleDifference) / this.transform.archAngleVelocity);
        this.turnInformation.gameTimeWhenTurnStarted = gameTimeArchStarted;
        this.turnInformation.startAngle = startAngle;
        this.turnInformation.nextInstruction = nextInstruction

        this.turnInformation.endPoint = [
            rotationPoint[0] + this.turnInformation.turnRadius * Math.cos(endAngle - Math.PI/2) * rotationDirection,
            rotationPoint[1] + this.turnInformation.turnRadius * Math.sin(endAngle - Math.PI/2) * rotationDirection
        ]

        return this.turnInformation.gameTimeWhenTurnEnds;
        // console.log('collected turn information',this.turnInformation);
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
        onStartDirection?: number | null,
        nextInstruction?: NextInstructionTurn
    }) {
        const {
            acceleration, 
            endSpeed, 
            gameTimeAccelerationStarted, 
            currentGameTime,
            onStartDirection,
            nextInstruction,
        } = accelerationParams;
        // console.log('startAccelerationInstruction', accelerationParams)

        if (this.isAccelerating) {
            // console.log('interrupting Acceleration to change Acceleration');
        }

        if(this.isTurning) {
            // console.log('interrupting Turn to Accelerate instead')
        }

        // isRotating should have been made false by the interruption of the rotation
        this.isTurning = false;
        this.isAccelerating = true;

        const isDecelerating = acceleration < 0;
        
        let currentSpeed = null;
        let velocityAngle = null;

        if(onStartDirection) { // only on start
            currentSpeed = 0;
            velocityAngle = onStartDirection;
        } else {
            currentSpeed = Math.sqrt(this.transform.vel[0]**2 + this.transform.vel[1]**2);
            velocityAngle = Math.atan2(this.transform.vel[1], this.transform.vel[0]);
        }
        
        const timeUntilAccelerationEnds = (endSpeed - currentSpeed) / acceleration;
        const gameTimeWhenAccelerationEnds = timeUntilAccelerationEnds + gameTimeAccelerationStarted;
        const accelerationDistanceIfUninterrupted = currentSpeed * timeUntilAccelerationEnds + 0.5 * acceleration * timeUntilAccelerationEnds ** 2;
        const accelerationEndPositionIfUninterrupted: [number, number] = [
            this.transform.pos[0] + Math.cos(velocityAngle) * accelerationDistanceIfUninterrupted,
            this.transform.pos[1] + Math.sin(velocityAngle) * accelerationDistanceIfUninterrupted
        ]
        const endVelocityIfUninterrupted: [number, number] = [
            Math.cos(velocityAngle) * endSpeed,
            Math.sin(velocityAngle) * endSpeed
        ]
        // I don't think I want external forces to be applied for replayable physics components
        this.transform.acc[0] = Math.cos(velocityAngle) * acceleration;
        this.transform.acc[1] = Math.sin(velocityAngle) * acceleration;
        const endSpeedIfUninterrupted = endSpeed;

        // okay, I think all I have to do, is detect when an instruction will have to be updated,
        // or ended early with another added.
        // so all I have to do for now is allow the current instruction to be overwritten
        // until I'm at the point where I need to keep track of all the instructions

        // ... direction as in positive or negative.... 
        const accelerationSameDirection = this.accelerationInformation.acceleration > 0 && acceleration > 0 || this.accelerationInformation.acceleration < 0 && acceleration < 0;

        // if it's the opposite direction, then end early and start a next instruction
        if(!accelerationSameDirection && onStartDirection === null) {
            const previousInstructionToEnd = this.duplicateAccelerationInstruction();
            // I should end the current on, then:
            // I should probably call myself here: this.startAcceleration
            // end instruction, the same as "usual".. once I've made what usually happens


        // Update To Slower/Faster Speed 
        // case 1: 
        // accelerating to max speed after a tight turn, 
        // accelerating still, but now to a slower speed for a less tight turn

        // case 2:
        // accelerating to turn speed, but now accelerating to max speed
        // because the turn is canceled

        // case 3:
        // decelerating for tight turn, but now I'm decelerating 
        // to a shallow turn with faster speed

        // case 4:
        // decelerating for shallow turn, but now I'm decelerating to a tighter turn 
        // slower speed
        // **********************


        // Update acceleration direction
        // case 1: turning deceleration canceled, now accelerating
        // case 2: acceleration to max speed canceled, new decelerating
        // case 3: accelerating to turn speed canceled, turning tighter so decelerating now

        // I need to update the endtime for the acceleration
        // if it was decelerating but is now accelerating, 
        // then we also need to add a new instruction for slowing down
        }

        

        // if interrupting in the same direction, 
        // we're just updating the end speed
        // the start time of the acceleration seems to be required to be handled for replay somewhere else
        this.accelerationInformation = {
            acceleration,
            nextInstruction,
            isDecelerating,
            gameTimeWhenAccelerationEnds,
            accelerationEndPositionIfUninterrupted,
            endVelocityIfUninterrupted,
            endSpeedIfUninterrupted
        }
        // console.log({accelerationInformationCollected: this.accelerationInformation, isAccelerating: this.isAccelerating, currentGameTime})
        if(currentGameTime) {
            this.move(currentGameTime - gameTimeAccelerationStarted, currentGameTime);
        }
    }

    duplicateAccelerationInstruction(): typeof this.accelerationInformation {
       const  duplicatedAccelerationInstruction: typeof this.accelerationInformation = {
            isDecelerating: this.accelerationInformation.isDecelerating,
            accelerationEndPositionIfUninterrupted: [
                this.accelerationInformation?.accelerationEndPositionIfUninterrupted[0],
                this.accelerationInformation?.accelerationEndPositionIfUninterrupted[1],
            ],
            endVelocityIfUninterrupted: [
                this.accelerationInformation?.endVelocityIfUninterrupted[0],
                this.accelerationInformation?.endVelocityIfUninterrupted[1]
            ],
            gameTimeWhenAccelerationEnds: this.accelerationInformation.gameTimeWhenAccelerationEnds,
            endSpeedIfUninterrupted: this.accelerationInformation.endSpeedIfUninterrupted,
            nextInstruction: this.accelerationInformation.nextInstruction,
            acceleration: this.accelerationInformation.acceleration
        };
        return duplicatedAccelerationInstruction
    }

    move(timeDelta: number, gameTime: number): void {
        // const timeScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        const originalPosition = [this.transform.pos[0], this.transform.pos[1]];

        if(this.isAccelerating) {
            const {
                endVelocityIfUninterrupted, 
                gameTimeWhenAccelerationEnds, 
                accelerationEndPositionIfUninterrupted, 
                endSpeedIfUninterrupted,
                nextInstruction
            } = this.accelerationInformation;
            // if the game time is after the acceleration should have finished
            if (gameTime >= gameTimeWhenAccelerationEnds) {
                // if the game time is after the acceleration should have finished
                // console.log('Acceleration ended', {
                //     currentPosition: this.transform.pos, 
                //     settingPosition: this.accelerationInformation.accelerationEndPositionIfUninterrupted, 
                //     gameTimeWhenAccelerationEnds: this.accelerationInformation.gameTimeWhenAccelerationEnds, 
                //     gameTime: gameTime}
                // );
                this.instructionsCompleted.push(`${this.accelerationInformation.isDecelerating ? 'negative' : 'positive'} acceleration completed`)
                // console.log(this.instructionsCompleted);
                const timeSinceAccelerationEnded = gameTime - gameTimeWhenAccelerationEnds;
                this.restSpeed = endSpeedIfUninterrupted;
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
            const {endAngle, tangentSpeed, rotationPoint, turnRadius, endPoint, gameTimeWhenTurnEnds, nextInstruction} = this.turnInformation;
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
                // console.log('Turning ended');

                this.instructionsCompleted.push(`Turn Completed. Direction: ${this.turnInformation.rotationDirection > 0 ? 'Right' : 'Left'}`);
                // console.log(this.instructionsCompleted);

                // this.movementTangentAngle = endAngle;
                    
                const endVelocityIfUninterrupted = [
                    tangentSpeed * Math.cos(endAngle),
                    tangentSpeed * Math.sin(endAngle)
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
            ];
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