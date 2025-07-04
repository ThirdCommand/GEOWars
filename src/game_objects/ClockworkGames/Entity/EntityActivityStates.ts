import { Transform } from "../../../game_engine/transform";
import { Tree } from "../../Tree/Tree";
import { Entity } from "./Entity";
import {VectorMath} from "../../../game_engine/util";
import { Activity, ParentActivity } from "../../../game_engine/EntityState/Activity";
import { ParentAnimation } from "../../../game_engine/EntityState/Animate";
import { Bed } from "../Bed";

export type MoveToData = {
    location: [number, number];
    entityTransform: Transform;
    moveToSpeed: number;
    moveToAcceleration: number;
}

export type ChopTreeData = {
    tree: Tree;
}

export type WaitState = {
    time: number,
    waitedTime: number
}

export type ActivityStates = MoveToData | ChopTreeData | WaitState



// okay, clearly the activity needs to control the animation otherwise it'll be hard to 
// control both and have activities defined outside of the object that's animating
export const createMoveToActivity = (entity: Entity, location: [number, number]) => {
    const moveToData: MoveToData = {
        location, 
        entityTransform: entity.transform, 
        moveToSpeed: entity.moveToSpeed, 
        moveToAcceleration: entity.moveToAcceleration
    };
    const onMoveToEnd = (dT: number, activityState: MoveToData) => {
        activityState.entityTransform.pos[0] = activityState.location[0];
        activityState.entityTransform.pos[1] = activityState.location[1];
        activityState.entityTransform.vel[0] = 0;
        activityState.entityTransform.vel[1] = 0;
        entity.currentAnimation.endAnimation();
        entity.possibleAnimations['none']()
    };
    const onMoveToStart = (activityState: MoveToData) => entity.possibleAnimations['moveTo']();
    const move = (time: number, activityState: MoveToData) => {
        if(VectorMath.dist(activityState.location, activityState.entityTransform.pos) < 2) return true;
        // take current velocity
        // find ideal velocity using max speed, current position, and ship position
        // get unit vector of current position - ship position
        // take difference
        // apply acceleration in that direction
    
        // get dV
        //    mV => max speed in the direction it should be moving
        //    Vo => current velocity
        //    dV =  mV - Vo
        //    alpha = dV angle

        // knowing the acceleration, and current velocity, and final velocity of 0
        // I can come up with the distance where it should 
        // start decelerating

        // (Vf^2 - Vi^2) / 2a = D

        const speed = activityState.moveToSpeed;

        const pos = activityState.entityTransform.absolutePosition();

        const distanceRemaining = VectorMath.dist(pos, location);
        const decelerateDistance = activityState.entityTransform.vel[0] ** 2 / (2 * activityState.moveToAcceleration);
        if(distanceRemaining < decelerateDistance) {
            const accelerationDirection = Math.atan2(activityState.entityTransform.vel[1], activityState.entityTransform.vel[0]);
            activityState.entityTransform.acc[0] -= activityState.moveToAcceleration * Math.cos(accelerationDirection);
            activityState.entityTransform.acc[1] -= activityState.moveToAcceleration * Math.sin(accelerationDirection);

        } else {
            const deltaPosition = [location[0] - pos[0], location[1] - pos[1]];

            let chaseDirection = Math.atan2(deltaPosition[1], deltaPosition[0]);

            if (chaseDirection < 0) {
                chaseDirection = 2 * Math.PI + chaseDirection;
            }
            // console.log(chaseDirection / (2 * Math.PI) * 360)
            const Vm = [speed * Math.cos(chaseDirection), speed * Math.sin(chaseDirection)];
            const Vo = activityState.entityTransform.vel;

            const dV = [Vm[0] - Vo[0], Vm[1] - Vo[1]];


            const accelerationDirection = Math.atan2(dV[1], dV[0]);
            activityState.entityTransform.acc[0] += activityState.moveToAcceleration * Math.cos(accelerationDirection);
            activityState.entityTransform.acc[1] += activityState.moveToAcceleration * Math.sin(accelerationDirection);

        
        }
        return false;
    };
    return new Activity<MoveToData>('moveTo', moveToData, move, onMoveToStart, onMoveToEnd);
};

export const createChopTreeActivity = (entity: Entity, tree: Tree) => {
    const chopTreeData: ChopTreeData = {
        tree, 
    };

    const chopLocation: [number, number] = [tree.transform.pos[0] + entity.treeChopLocation[0], tree.transform.pos[1] + entity.treeChopLocation[1]];
    const moveToActivity = createMoveToActivity(entity, chopLocation);
    const chop = (time: number, activityState: ChopTreeData) => {
        entity.possibleAnimations['chopping'](tree);
        return true;
    };
    const chopActivity = new Activity<ChopTreeData>('ChopTree', chopTreeData, chop, () => null, () => null);
    const subActivities = [
        moveToActivity,
        chopActivity
    ];
    return new ParentActivity('ChopTreeActivity', subActivities);
};

export const createGoToSleepActivity = (entity: Entity, bed: Bed) => {
    const sleepLocation: [number, number] = [bed.transform.pos[0] + entity.sleepLocation[0], bed.transform.pos[1] + entity.sleepLocation[1]];
    const moveToActivity = createMoveToActivity(entity, sleepLocation);

    const setUpBed = (time: number, activityState: ChopTreeData) => {
        entity.possibleAnimations['goingToSleep'](bed);
    }
}