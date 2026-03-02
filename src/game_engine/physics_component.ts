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

        this.transform.angle = ((this.transform.angle + this.transform.aVel * timeScale + accelerationSign * this.transform.aAcc * (timeScale**2)/2) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2)
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


type ActionType = 'Straight' | 'Turn' | 'Wait';
interface DoAction { 
    (timeDelta: number, gameTime: number, action: Action, reversiblePhysicsComponent: ReplayablePhysicsComponent): number | null; // remaining time if completed 
}

interface Interrupt {
    (thisAction: Action, gameTime: number, transform: Transform): void;
}

type ActionData = TurnInformation | AccelerationInformation | WaitInformation | StraightInformation;

type Action = {
    type: ActionType;
    actionData: ActionData;
    doAction: DoAction;
    doReversedAction: DoAction;
    isInterruptAble: boolean;
    interrupt: Interrupt;
}

export type TurnInformation = {
    startTime?: number;
    endTime?: number;
    startPoint?: [number, number];
    endPoint?: [number, number];
    startAngle?: number;
    endAngle?: number;
    turnRadius?: number;
    rotationPoint?: [number, number]; 
    tangentSpeed?: number;
    rotationDirection?: 1 | -1;
}

export type StraightInformation = {
    velocity?: [number, number];
    startTime?: number;
    endTime?: number;
    startPoint: [number, number];
    endPoint: [number, number];
}

export type AccelerationInformation = {
    isDecelerating?: boolean;
    accelerationEndPositionIfUninterrupted?: [number, number],
    endVelocityIfUninterrupted?: [number, number],
    gameTimeWhenAccelerationEnds?: number,
    endSpeedIfUninterrupted?: number,
    acceleration?: number;
}

export type WaitInformation = {
    startTime?: number;
    endTime?: number;
}

export type TurnActionParams = {
    rotationPoint: [number, number], 
    turnRadius: number, 
    endPoint: [number,number],
    isTurningRight: boolean, 
    tangentSpeed: number, 
    startAngle: number, 
    endAngle: number, 
    gameTimeArchStarted: number,  
    pointWhereArchStarted: [number, number] | null,
}

const doStraight: DoAction = (timeDelta, gameTime, action, reversiblePhysicsComponent): number | null => {
    // will need a rewrite if I ever want other things to influence 
    // parent component's position... like wind or something
    // same with turns
    const actionData = action.actionData as StraightInformation;
    const {velocity, startTime, endTime, startPoint, endPoint} = actionData;
    const transform = reversiblePhysicsComponent.transform;
    if (!endTime) {
        transform.vel = [velocity[0], velocity[1]];
        transform.pos[0] += transform.vel[0] * timeDelta;
        transform.pos[1] += transform.vel[1] * timeDelta;
        return null;
    } 

    if(endTime > gameTime) {
        const carry = gameTime - endTime;
        transform.pos[0] = endPoint[0];
        transform.pos[1] = endPoint[1];
        return carry;
    } else {
        transform.vel = [velocity[0], velocity[1]];
        transform.pos[0] += transform.vel[0] * timeDelta;
        transform.pos[1] += transform.vel[1] * timeDelta;
        return null;
    }
}

const doStraightReversed: DoAction = (timeDelta, gameTime, action, reversiblePhysicsComponent): number | null => {
    const actionData = action.actionData as StraightInformation;
    const {velocity, startTime, endTime, startPoint, endPoint} = actionData;
    const transform = reversiblePhysicsComponent.transform;

    if(startTime > gameTime) {
        const carry = gameTime - startTime;
        transform.pos[0] = startPoint[0];
        transform.pos[1] = startPoint[1];
        return carry;
    } else {
        transform.vel = [velocity[0], velocity[1]];
        transform.pos[0] += transform.vel[0] * timeDelta;
        transform.pos[1] += transform.vel[1] * timeDelta;
        return null;
    }
}

const doWait: DoAction = (timeDelta, gameTime, action, reversiblePhysicsComponent): number | null => {
    const actionData = action.actionData as WaitInformation;
    const {startTime, endTime} = actionData;
    if(!endTime) return null;
    if(gameTime > endTime) {
        return gameTime - endTime;
    }
    return null;
}

const doWaitReverse: DoAction = (timeDelta, gameTime, action, reversiblePhysicsComponent): number | null => {
    const actionData = action.actionData as WaitInformation;
    const {startTime, endTime} = actionData;
    if(gameTime < startTime) {
        return gameTime - startTime;
    }
    return null;
}

const interruptStraight = (thisAction: Action, gameTime: number, transform: Transform) => {
    const actionData = thisAction.actionData as StraightInformation;
    // new action being added after interrupt call is completed
    // interrupts if new instruction called
    // or if starting to reverse a straight action that has no end time yet
    actionData.endTime = gameTime;
    actionData.endPoint = [transform.pos[0], transform.pos[1]];
}

const interruptWait = (thisAction: Action, gameTime: number) => {
    const actionData = thisAction.actionData as WaitInformation
    actionData.endTime = gameTime;
}


const doTurn: DoAction = (timeDelta, gameTime, action, reversiblePhysicsComponent): number | null => {
    const turnActionData: TurnInformation = action.actionData as TurnInformation;
    const isTimeReversed = timeDelta < 0;
    const {
        startTime,
        endTime,
        // startPoint,
        endPoint,
        startAngle,
        endAngle, 
        turnRadius, 
        rotationPoint,
        tangentSpeed,
        rotationDirection,
    } = turnActionData;

    // not sure I need to deal with this here. just return the remaining time if true
    // and let move pick the next action
    let timeSinceTurnEnded = null;
    if(gameTime > endTime) {
        reversiblePhysicsComponent.transform.pos[0] = endPoint[0];
        reversiblePhysicsComponent.transform.pos[1] = endPoint[1];
        timeSinceTurnEnded = gameTime - endTime;
            
        const endTangentAngle = rotationDirection === 1 ? 
            ((endAngle + 3 * Math.PI/2) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) :
            ((endAngle - 1 * Math.PI/2) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        // this should be the end tangent angle instead of endAngle
        const endVelocityIfUninterrupted = [
            tangentSpeed * Math.cos(endTangentAngle),
            tangentSpeed * Math.sin(endTangentAngle)
        ]

        reversiblePhysicsComponent.transform.vel[0] = endVelocityIfUninterrupted[0];
        reversiblePhysicsComponent.transform.vel[1] = endVelocityIfUninterrupted[1];

    } else {
        const timeSinceTurnStarted = (gameTime - startTime);
        const archAngleVelocity = reversiblePhysicsComponent.transform.archAngleVelocity;
        const newArchAngle = rotationDirection === 1 ? 
            modAngle(startAngle + -rotationDirection * archAngleVelocity * timeSinceTurnStarted) :
            modAngle(startAngle + rotationDirection * archAngleVelocity * timeSinceTurnStarted)

        reversiblePhysicsComponent.transform.pos[0] = rotationPoint[0] + turnRadius * Math.cos(newArchAngle);
        reversiblePhysicsComponent.transform.pos[1] = rotationPoint[1] + turnRadius * Math.sin(newArchAngle);
    }

    return timeSinceTurnEnded;
}
const doTurnReversed: DoAction = (timeDelta, gameTime, action, reversiblePhysicsComponent): number | null => {
    const turnActionData: TurnInformation = action.actionData as TurnInformation;
    const {
        startTime,
        endTime,
        startPoint,
        endPoint,
        startAngle,
        endAngle, 
        turnRadius, 
        rotationPoint,
        tangentSpeed,
        rotationDirection,
    } = turnActionData;

    // not sure I need to deal with this here. just return the remaining time if true
    // and let move pick the next action
    let timeUntilTurnStarts = null;
    if(gameTime < startTime) {
        reversiblePhysicsComponent.transform.pos[0] = startPoint[0];
        reversiblePhysicsComponent.transform.pos[1] = startPoint[1];
        timeUntilTurnStarts = gameTime - startTime; // should be negative
            
        const endVelocityIfUninterrupted = [
            tangentSpeed * Math.cos(startAngle + Math.PI),
            tangentSpeed * Math.sin(startAngle + Math.PI)
        ]

        reversiblePhysicsComponent.transform.vel[0] = endVelocityIfUninterrupted[0];
        reversiblePhysicsComponent.transform.vel[1] = endVelocityIfUninterrupted[1];

    } else {
        const timeSinceTurnEnded = (gameTime - endTime);
        const archAngleVelocity = reversiblePhysicsComponent.transform.archAngleVelocity;
        // there's got to be a bug here but I'm having trouble wrapping my head around it
        const newArchAngle = rotationDirection === 1 ?
            modAngle(startAngle + Math.PI/2 + archAngleVelocity * timeSinceTurnEnded) : 
            modAngle(0)

        reversiblePhysicsComponent.transform.pos[0] = rotationPoint[0] + turnRadius * Math.cos(newArchAngle);
        reversiblePhysicsComponent.transform.pos[1] = rotationPoint[1] + turnRadius * Math.sin(newArchAngle);
    }

    return timeUntilTurnStarts;
}

const modAngle = (angle: number) => ((angle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2)

type StraightActionParams = {
    velocity: [number, number]
}

export class ReplayablePhysicsComponent {
    transform: Transform;
    gameTime: number;
    instructionsCompleted: string[];
    reversibleActions: Action[];
    currentActionIdx: number;
    interruptData: {
        type: ActionType,
        actionParams: StraightActionParams | TurnActionParams,
    } | null;

    movementTangentAngle: number | null = null;

    restSpeed: number | null = null;

    constructor(transform: Transform) {
        this.transform = transform;
        this.instructionsCompleted = [];
        this.reversibleActions = [];
        this.currentActionIdx = null;
    }

    getCurrentAction(): Action | null {
        return this.reversibleActions.length ? this.reversibleActions[this.currentActionIdx] : null;
    }

    startNextAction() {
        if(this.currentActionIdx === null) {
            this.currentActionIdx = 0;
        } else {
            if(this.currentActionIdx >= this.reversibleActions.length - 1) {
                console.error('missmatch')
            }
            this.currentActionIdx += 1;
        }
    }

    startPreviousAction() {
        if(this.currentActionIdx === 0) return;
        this.currentActionIdx -= 1;
    }

    createArchRotationAction(turnParams: TurnActionParams): Action {
        let {
            rotationPoint,
            turnRadius,
            isTurningRight,
            tangentSpeed,
            startAngle,
            endAngle,
            endPoint,
            gameTimeArchStarted,
            pointWhereArchStarted,
        } = turnParams;


        // if(isTurningRight && startAngle > endAngle) {
        // endAngle = endAngle + Math.PI * 2
        // } else if (!isTurningRight && endAngle > startAngle) {
        // startAngle = startAngle + Math.PI * 2
        // }

        // // this means it's crossing over 0 clockwise
        // if(isTurningRight && startAngle < endAngle) {
        //     startAngle = startAngle + Math.PI * 2
        // // this means it's crossing over 0 counterclockwise
        // } else if (!isTurningRight && startAngle > endAngle) {
        //     endAngle = endAngle + Math.PI * 2
        // }
        //         if(isTurningRight && startAngle < endAngle) {
        //     startAngle = startAngle + Math.PI * 2
        // // this means it's crossing over 0 counterclockwise
        // } else if (!isTurningRight && startAngle > endAngle) {
        //     endAngle = endAngle + Math.PI * 2
        // }

        const angleDifference = endAngle - startAngle;

        // ah... this might be this way because y is flipped for rendering... so annoying
        const rotationDirection =  isTurningRight ? -1 : 1;
        this.transform.archAngleVelocity = tangentSpeed / turnRadius * rotationDirection;


        const turnActionData: TurnInformation = {
            startTime: gameTimeArchStarted,
            endTime: gameTimeArchStarted + Math.round(
                Math.abs(angleDifference / this.transform.archAngleVelocity)/20
            ) * 20,
            startPoint: [pointWhereArchStarted[0], pointWhereArchStarted[1]],
            endPoint: [endPoint[0], endPoint[1]],
            startAngle,
            endAngle,
            turnRadius,
            rotationDirection,
            tangentSpeed,
            rotationPoint: [rotationPoint[0], rotationPoint[1]],
        }

        return ({
            type: 'Turn',
            actionData: turnActionData,
            doAction: doTurn,
            doReversedAction: doTurnReversed,
            isInterruptAble: true,
            interrupt: () => {},
        });
    }

    createStraightAction(straightParams: {
        velocity: [number, number], 
        startTime: number,
        endTime?: number,
        startPoint: [number, number] | null,
        endPoint?: [number, number],
    }): Action {
        const {
            velocity,
            startTime,
            endTime,
            startPoint,
            endPoint
        } = straightParams;

        const actionData: StraightInformation = {
            velocity,
            startTime,
            endTime,
            startPoint,
            endPoint,
        };
        
        const straightAction: Action = {
            type: 'Straight',
            actionData,
            doAction: doStraight,
            doReversedAction: doStraightReversed,
            isInterruptAble: true,
            interrupt: interruptStraight,
        }
        return straightAction;
    } 

    createWaitAction(startTime: number): Action {
        const waitData = {
            startTime
        }
        return ({
            type: 'Wait',
            actionData: waitData,
            isInterruptAble: true,
            interrupt: interruptWait,
            doAction: doWait,
            doReversedAction: doWaitReverse
        })
    }

    doAction(timeDelta: number, gameTime: number): number | null {
        const currentAction = this.getCurrentAction();
        if (!currentAction) return null;
        let remainderTime = null;
        if(timeDelta > 0 && currentAction) {
            remainderTime = currentAction.doAction(timeDelta, gameTime, currentAction, this);
        } else {
            remainderTime = currentAction.doReversedAction(timeDelta, gameTime, currentAction, this);
        }

        if(typeof remainderTime === 'number') {
            if(timeDelta < 0 && this.currentActionIdx === 0) return null; // before beginning of time I guess?
            if(timeDelta < 0) {
                this.startPreviousAction();
                return this.doAction(remainderTime, gameTime)
            } 
            if(this.currentActionIdx === this.reversibleActions.length - 1) {
                
                const newAction = this.createStraightAction({
                    velocity: [this.transform.vel[0], this.transform.vel[1]],
                    startPoint: [this.transform.pos[0], this.transform.pos[1]],
                    startTime: gameTime,
                });

                this.reversibleActions.push(newAction)
            } 
            this.startNextAction()
            const nextAction = this.getCurrentAction();
            
            if(nextAction) {
                this.doAction(remainderTime, gameTime);
            } else {
                return remainderTime;
            }
        } else {
            return null;
        }
    }

    move(timeDelta: number, gameTime: number): void {
        const originalPosition = [this.transform.pos[0], this.transform.pos[1]];

        const currentAction = this.getCurrentAction(); // returns null if no actions
        let newAction = null;
        this.interruptData;

        if (currentAction === null || currentAction === undefined) {
            if(timeDelta < 0) return;
            if(this.transform.vel[0] === 0 && this.transform.vel[1] === 0) {
                if(this.interruptData) {
                    // basically has to be straight
                    if(this.interruptData.type === 'Straight') {
                        newAction = this.createStraightAction({
                            velocity: (this.interruptData.actionParams as StraightActionParams).velocity,
                            startTime: gameTime,
                            startPoint: [this.transform.pos[0], this.transform.pos[1]]
                        })
                        this.interruptData = null;
                    }
                } else {
                    // this is likely the only true case anyway
                    newAction = this.createWaitAction(gameTime); // wait instruction
                }
            } else {
                // likely doesn't apply
                newAction = this.createStraightAction({
                    velocity: [this.transform.vel[0], this.transform.vel[1]],
                    startPoint: [this.transform.pos[0], this.transform.pos[1]],
                    startTime: gameTime,
                });
            }
        } else if (this.interruptData && timeDelta >= 0) {
            // Only issue is when crossing over 0 angle, it kinda freaks out and change the turn direction
            // direction of plane is greater than or less than 0, and new input is the opposite
            if(currentAction.type === 'Turn') {
                // const currentEndAngle = (currentAction.actionData  as TurnInformation).endAngle
                // const currentEndDirection = roundAngleTo16thsDegrees(currentEndAngle);
                // const newEndAngle = (this.interruptData.actionParams as TurnActionParams).endAngle;
                // const newEndDirection = roundAngleTo16thsDegrees(newEndAngle);
                // // console.log('interrupting current turn?:', {
                // //     currentEndDirection,
                // //     newEndDirection,
                // //     endAngle: (currentAction.actionData  as TurnInformation).endAngle,
                // //     endTime: (currentAction.actionData  as TurnInformation).endTime,
                // //     endPoint: [(currentAction.actionData  as TurnInformation).endPoint[0], (currentAction.actionData  as TurnInformation).endPoint[1]],
                // // });

                // if(newEndDirection !== currentEndDirection) {
                //     // console.log('interruptingAnyway')
                //     const interruptRotationDirection = (this.interruptData.actionParams as TurnActionParams).isTurningRight ? 1 : -1
                //     const rotationPoint = (currentAction.actionData as TurnInformation).rotationPoint;
                //     const endAngle =  (this.interruptData.actionParams as TurnActionParams).endAngle;
                //     const startTime = (currentAction.actionData as TurnInformation).startTime;
                //     (currentAction.actionData as TurnInformation).endAngle = endAngle;
                //     const startAngle = (currentAction.actionData as TurnInformation).startAngle;
                //     const turnRadius = (currentAction.actionData as TurnInformation).turnRadius;

                //     const newAngleDifferenceWithOriginalStartAngle = endAngle - startAngle;

                //     (currentAction.actionData as TurnInformation).endTime = startTime + Math.round((Math.abs(newAngleDifferenceWithOriginalStartAngle /this.transform.archAngleVelocity))/20) * 20;
                //     (currentAction.actionData as TurnInformation).endPoint = [
                //         rotationPoint[0] + turnRadius * Math.cos((currentAction.actionData as TurnInformation).endAngle - Math.PI/2) * interruptRotationDirection,
                //         rotationPoint[1] + turnRadius * Math.sin((currentAction.actionData as TurnInformation).endAngle - Math.PI/2) * interruptRotationDirection
                //     ];
                //     // console.log('new turn action:', {
                //     //     endAngle: (currentAction.actionData  as TurnInformation).endAngle,
                //     //     endTime: (currentAction.actionData  as TurnInformation).endTime,
                //     //     endPoint: [(currentAction.actionData  as TurnInformation).endPoint[0], (currentAction.actionData  as TurnInformation).endPoint[1]]
                //     // });
                // }
                
                
            } else {
                currentAction.interrupt(currentAction, gameTime, this.transform);
                if(this.interruptData.type === 'Turn') {
                    // allow interruption if the turn end angle is 

                    // ah crap... the start and rotation points are wrong since we're off by 20ms
                    // I should have this be reactive instead of listening for something that happened last frame
                    const {rotationPoint, turnRadius, isTurningRight, tangentSpeed, startAngle, endAngle, pointWhereArchStarted, endPoint} = this.interruptData.actionParams as TurnActionParams
                    console.log('interrupting straight for a turn somehow', {endAngle, startAngle, gameTime})
                    newAction = this.createArchRotationAction(
                        {
                            rotationPoint, 
                            turnRadius, 
                            endPoint,
                            isTurningRight, 
                            tangentSpeed, 
                            startAngle, 
                            endAngle, 
                            pointWhereArchStarted,
                            gameTimeArchStarted: gameTime
                        }
                    )
                    
                } else if (this.interruptData.type === 'Straight') {
                    newAction = this.createStraightAction({
                        velocity: (this.interruptData.actionParams as StraightActionParams).velocity,
                        startTime: gameTime,
                        startPoint: [this.transform.pos[0], this.transform.pos[1]]
                    })
                }
                
            }
        }

        if(newAction) {
            this.reversibleActions.push(newAction);
            this.startNextAction();
        }
        

        this.doAction(timeDelta, gameTime)

        // add straight actions next
        // then add wait action
        // then create them in the cases where needed
        // then figure out asking the parent component for interruption
        // maybe every parentComponent update() it will call this with an interrupt to apply
        // if applicable? it could even ask this component if interrupting is allowed 
        // this state. if so, then it gives this component the interrupt command
        // it can ask the Action if it can be interrupted
        this.interruptData = null
        this.movementTangentAngle = (Math.atan2(
            this.transform.pos[1] - originalPosition[1],
            this.transform.pos[0] - originalPosition[0]
        ) + Math.PI * 2) % (Math.PI * 2);
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


 function roundAngleTo16thsDegrees(radians: number) {
        return ((Math.round(radians / (2 * Math.PI) * 16) % 16) / 16) * 360
}