import { Entity, type EntitySpriteParameters } from "./Entity";
import {Animation, ParentAnimation} from "../../../game_engine/EntityState/Animate";
import { Bed, BedSpriteParameters, bedSpinAnimator } from "../Bed";
import { Tree } from "../../Tree/Tree";

type PauseForAnimationState = {
    timePaused: number;
    maxPauseTime: number;
}

export const createPauseAnimation = (entity: Entity, pauseTime: number) => {
    const pause = (dT: number, pauseState: PauseForAnimationState): boolean => {
        pauseState.timePaused += dT;
        if(pauseState.timePaused >= pauseState.maxPauseTime) {
            pauseState.timePaused = 0;
            return true;
        }
        return false;
    };
    return new Animation<PauseForAnimationState>('PauseFor', {timePaused: 0, maxPauseTime: pauseTime}, pause, () => null);
};

type SpinState = {
    spinSpeed: number;
    spinAngle: number;
    totalSpun: number;
}
// spin is absolute. Kind of assumes you know where the entity is already spin wise
// could make one that doesn't care but not needed yet?
// okay, now that I'm doing the bed spin I'm confused about what happens when
// the entity is spun 360 degrees... maybe changeSize needs to set it to currentAngle - 2*PI when 360 is hit
// but then the total angle change needs to be kept track in the animation state
const entitySpinAnimator = (dT: number, animationState: SpinState, spriteParameters: EntitySpriteParameters): boolean => {
    const angleChange = dT * animationState.spinSpeed / 1000;
    if(animationState.spinAngle > 0) {
        animationState.totalSpun += angleChange;
        spriteParameters.bodyAngle.changeSize(angleChange);
        if(animationState.totalSpun > animationState.spinAngle) {
            spriteParameters.bodyAngle.changeSize(animationState.spinAngle - animationState.totalSpun);
            return true;
        } else {
            return false;
        }
    } else {
        animationState.totalSpun -= angleChange;
        spriteParameters.bodyAngle.changeSize(-angleChange);
        if(animationState.totalSpun < animationState.spinAngle) {
            spriteParameters.bodyAngle.changeSize(animationState.totalSpun - animationState.spinAngle);
            return true;
        } else {
            return false;
        }
    }
};

export const createSpin = (entity: Entity, spinAngle: number, spinSpeed: number) => {
    return new Animation<SpinState, EntitySpriteParameters>('Spin', {totalSpun: 0, spinSpeed, spinAngle}, entitySpinAnimator, () => null, entity.spriteParameters);
};

export const createSpinningAnimation = (entity: Entity) => {
    const firstPause = createPauseAnimation(entity, 2000);
    const spinRight = createSpin(entity, Math.PI, 1);
    const spinLeft = createSpin(entity, -Math.PI, 1);
    const secondPause = createPauseAnimation(entity, 3000);
    const animations = [
        firstPause, spinRight, secondPause, spinLeft
    ];
    return new ParentAnimation(
        'SpinningAnimation', animations
    );
};

export const createCloseStrained = (entity: Entity) => {
    const closeStrained = (dT: number, animationState: object, spriteParameters: EntitySpriteParameters): boolean => {
        const time = dT / 48;
            
        const animationScale = time > 3 ? 3 : time;
        // spin 90 degrees, pause, spin back 90 degrees, pause

        const squeezedWidth = spriteParameters.lineThickness;
        const openedWidth = spriteParameters.arms.right.position.x.max() - spriteParameters.arms.left.position.x.min();

        const currentSqueezeWidth = spriteParameters.arms.right.position.x.size - 
        spriteParameters.arms.left.position.x.size;
            
        

        const animationPercentage = (openedWidth - currentSqueezeWidth - squeezedWidth) / openedWidth;

        const closeDelta = animationScale * ( 0.25 + 1.75 * (1 - animationPercentage));

        spriteParameters.arms.left.position.x.changeSize(closeDelta/2);
        spriteParameters.arms.right.position.x.changeSize(-closeDelta/2);

        spriteParameters.width.changeSize(-closeDelta / 4);
        spriteParameters.height.changeSize(closeDelta / 8);
        spriteParameters.eye.height.changeSize(closeDelta / 16);
        spriteParameters.eye.width.changeSize(closeDelta / 6);
        spriteParameters.eye.right.radius.x.changeSize(closeDelta / 16);
        spriteParameters.eye.right.radius.y.changeSize(-closeDelta / 16);
        spriteParameters.eye.left.radius.x.changeSize(closeDelta / 32);
        spriteParameters.eye.left.radius.y.changeSize(closeDelta / 32);

        if(currentSqueezeWidth < squeezedWidth) {
            const correctionChange = (currentSqueezeWidth - squeezedWidth) / 2;
            spriteParameters.arms.left.position.x.changeSize(-correctionChange);
            spriteParameters.arms.right.position.x.changeSize(correctionChange);
            return true;
        }
        return false;
    };
    return new Animation<object, EntitySpriteParameters>('CloseStrained', {}, closeStrained, () => null, entity.spriteParameters);
};

export const createOpenBounceAnimation = (entity: Entity) => {
    const openBounce = (dT: number, animationState: object, spriteParameters: EntitySpriteParameters): boolean => {
        const time = dT / 48;
            
        const animationScale = time > 3 ? 3 : time;
        const squeezedWidth = spriteParameters.lineThickness;
        const openedWidth = spriteParameters.arms.right.position.x.max() - spriteParameters.arms.left.position.x.min();
        const currentOpenWidth = spriteParameters.arms.right.position.x.size - 
        spriteParameters.arms.left.position.x.size;
            
        const animationPercentage = (currentOpenWidth - squeezedWidth) / openedWidth;

        const openDelta = animationScale * (1 + 3 * animationPercentage);

        spriteParameters.arms.left.position.x.changeSize(-openDelta/2);
        spriteParameters.arms.right.position.x.changeSize(openDelta/2);
       
        spriteParameters.width.changeSize(openDelta / 4);
        spriteParameters.height.changeSize(-openDelta / 8);
        spriteParameters.eye.height.changeSize(-openDelta / 16);
        spriteParameters.eye.width.changeSize(-openDelta / 6);
        spriteParameters.eye.right.radius.x.changeSize(-openDelta / 16);
        spriteParameters.eye.right.radius.y.changeSize(openDelta / 16);
        spriteParameters.eye.left.radius.x.changeSize(-openDelta / 32);
        spriteParameters.eye.left.radius.y.changeSize(-openDelta / 32);

        if(currentOpenWidth >= openedWidth) {
            const correctionChange = (currentOpenWidth - openedWidth) / 2;
            spriteParameters.arms.left.position.x.changeSize(correctionChange);
            spriteParameters.arms.right.position.x.changeSize(-correctionChange);
            
            spriteParameters.width.size = spriteParameters.width.originalSize;
            spriteParameters.height.size = spriteParameters.height.originalSize;
            spriteParameters.eye.left.position.y.size = spriteParameters.eye.left.position.y.originalSize;
            spriteParameters.eye.right.position.y.size = spriteParameters.eye.right.position.y.originalSize;
            spriteParameters.eye.left.position.x.size = spriteParameters.eye.left.position.x.originalSize;
            spriteParameters.eye.right.position.x.size = spriteParameters.eye.right.position.x.originalSize;
            spriteParameters.eye.left.radius.x.size = spriteParameters.eye.left.radius.x.originalSize;
            spriteParameters.eye.left.radius.y.size = spriteParameters.eye.left.radius.y.originalSize;
            spriteParameters.eye.right.radius.x.size = spriteParameters.eye.right.radius.x.originalSize;
            spriteParameters.eye.right.radius.y.size = spriteParameters.eye.right.radius.y.originalSize;
            return true;
        }
        return false;

    };

    return new Animation<object, EntitySpriteParameters>('OpenBounce', {}, openBounce, () => null, entity.spriteParameters);
};

export const createSqueezeAnimation = (entity: Entity) => {
    const closeStrainedAnimation = createCloseStrained(entity);
    const openBounceAnimation = createOpenBounceAnimation(entity);
    const animations = [
        closeStrainedAnimation,
        openBounceAnimation
    ];

    return new ParentAnimation('Squeeze', animations);
};


// export const sleepingAnimation = {
//     stateIndex: 0,
//     states: ["breathingIn", "breathingOut", "pause"],
//     animate: (deltaTime) => {
//         const {stateIndex,states} = this.sleepingAnimation;
//         const currentState = states[stateIndex];

//         if(currentState === "breathingIn") {
//         } else if (currentState === "breathingOut") {
//         } else if (currentState === "pause") {
//         }
//     }
// };

type BedEntitySpinAnimationState =  {bed: Bed; entity: Entity};
type BedEntitySpinSpriteParameters = {bed: BedSpriteParameters, entity: EntitySpriteParameters};
export const createBedEntitySpinAnimation = (
    entity: Entity, 
    bed: Bed, spinAngle: number, 
    spinSpeed: number
) => {
    const bedEntitySpinAnimator = (
        dT: number, 
        animationState: BedEntitySpinAnimationState, 
        spriteParameters: BedEntitySpinSpriteParameters
    ) => {
        const spinResult = entitySpinAnimator(
            dT, 
            {spinAngle, spinSpeed, totalSpun: 0}, 
            spriteParameters.entity
        );
        bedSpinAnimator(dT,spriteParameters.entity.bodyAngle, spriteParameters.bed);
        return spinResult;
    };
    const endBedSpinAnimation = (
        animationState: BedEntitySpinAnimationState, 
        spriteParameters: BedEntitySpinSpriteParameters
    ): null  => {
        return null;
    };
    return new Animation<BedEntitySpinAnimationState, BedEntitySpinSpriteParameters>(
        'BedEntitySpin', 
        {bed, entity}, 
        bedEntitySpinAnimator,
        endBedSpinAnimation,
        {bed: bed.spriteParameters, entity: entity.spriteParameters}
    );
    
};

export const createGoingToBedAnimation = (entity: Entity, bed: Bed) => {
    const firstPause = createPauseAnimation(entity, 300);
    const secondPause = createPauseAnimation(entity, 500);
    const goingToSleepBedEntitySpinAnimation = createBedEntitySpinAnimation(entity, bed, 0.8, Math.PI);
    const wakingUpBedEntitySpinAnimation = createBedEntitySpinAnimation(entity, bed, -0.8, -Math.PI);
    const animations = [
        firstPause,
        goingToSleepBedEntitySpinAnimation,
        secondPause,
        wakingUpBedEntitySpinAnimation
    ];
    return new ParentAnimation('GoingToBedAndWakingUpAnimation',animations);
};  


export const createBobAnimation = (entity: Entity) => {
    const bobAnimationState = {
        entityTransform: entity.transform,
        entity: entity,
        yOffset: 0,
        maxBob: 10,
        bobSpeed: entity.moveToSpeed/100,
        bobDirection: 1,
        armBobbingSpeed: 0.8,
        animationProgress: 0
        // spot I can add more state if needed I guess
    };
    const bobAnimator = (dT: number, animationState: typeof bobAnimationState, spriteParameters: EntitySpriteParameters): false => {
        // should probably split these into two separate animations. 
        // then I'll have control over how it behaves while bouncing up vs down
        if(bobAnimationState.entity.treeHeld) {
            return false;
        }
        const entityTransform = animationState.entityTransform;
        let yOffsetIncrement = dT * animationState.bobSpeed * animationState.bobDirection * (0.4 + (1 - animationState.animationProgress) * 0.8);
        
        const possibleNewOffset = animationState.yOffset + yOffsetIncrement;
        if(animationState.bobDirection === 1) {
            if(possibleNewOffset >= animationState.maxBob) {
                yOffsetIncrement = animationState.maxBob - animationState.yOffset;
                animationState.yOffset = animationState.maxBob;
                entityTransform.pos[1] += yOffsetIncrement;
                animationState.bobDirection = -1;
                animationState.animationProgress = 0;
                return false;
            } 
            animationState.animationProgress = animationState.yOffset / animationState.maxBob;
            spriteParameters.arms.left.angle.changeAngle(dT * animationState.armBobbingSpeed/1500 * (0.4 + (1 - animationState.animationProgress) * 0.8));
            spriteParameters.arms.right.angle.changeAngle(dT * animationState.armBobbingSpeed/1500 * (0.4 + (1 - animationState.animationProgress) * 0.8));
            animationState.yOffset += yOffsetIncrement;
            entityTransform.pos[1] += yOffsetIncrement;

            return false;
        } else {
            if(possibleNewOffset <= 0) {
                yOffsetIncrement = -animationState.yOffset;
                animationState.yOffset = 0;
                entityTransform.pos[1] += yOffsetIncrement;
                animationState.bobDirection = 1;
                animationState.animationProgress = 0;
                return false;
            } 
            animationState.animationProgress = (animationState.maxBob - animationState.yOffset )/ animationState.maxBob;
            spriteParameters.arms.left.angle.changeAngle(dT * -animationState.armBobbingSpeed/1500 * (0.4 + (1 - animationState.animationProgress) * 0.8));
            spriteParameters.arms.right.angle.changeAngle(dT * -animationState.armBobbingSpeed/1500  * (0.4 + (1 - animationState.animationProgress) * 0.8));
            animationState.yOffset += yOffsetIncrement;
            entityTransform.pos[1] += yOffsetIncrement;
            return false;
        }
        
        
    };
    const endBobAnimation = (animationState: typeof bobAnimationState, spriteParameters: EntitySpriteParameters) => {
        // animationState.entityTransform.pos[1] -= animationState.yOffset;
        const resetLeftAngle = spriteParameters.arms.left.angle.originalSize - spriteParameters.arms.left.angle.size;
        spriteParameters.arms.left.angle.changeAngle(resetLeftAngle);
        const resetRightAngle = spriteParameters.arms.right.angle.originalSize - spriteParameters.arms.right.angle.size;
        spriteParameters.arms.right.angle.changeAngle(resetRightAngle);
        console.log({resetLeftAngle, resetRightAngle});
    };
    return new Animation<typeof bobAnimationState, EntitySpriteParameters>('Bob', bobAnimationState, bobAnimator, endBobAnimation, entity.spriteParameters);
};

export const createChopAnimation = (entity: Entity, tree: Tree) => {
    const firstPause = createPauseAnimation(entity, 300);
    const secondPause = createPauseAnimation(entity, 300);
    const chopAnimationState = {
        // measured absolutely so that it looks like a chop even if the start angle is "wrong"
        chopEndAngle: Math.PI * 3.5/8,
        chopStartAngle: Math.PI/2,
        chopCount: 0,
        maxChops: 4,

    }
    const chop = (dT: number, animationState: typeof chopAnimationState, spriteParameters: EntitySpriteParameters): boolean => {
        // not accounting for when one arm is off from another. A real animation should account for that
        if(spriteParameters.arms.left.angle.size > animationState.chopEndAngle) {
            spriteParameters.arms.left.angle.changeAngle(-dT * 0.8/1500);
            spriteParameters.arms.right.angle.changeAngle(dT * 0.8/1500);
            return false
        }
        animationState.chopCount += 1;
        tree.possibleAnimations.shakeTree();
        if(animationState.chopCount >= animationState.maxChops) {
            entity.currentAnimation = null;
            tree.chopper = entity;
            entity.holdTree(tree);
            entity.possibleActivities.moveTo([entity.transform.pos[0], entity.transform.pos[1] + 80])
        }
        return true;
    };

    const chopBackswing = (dT: number, animationState: typeof chopAnimationState, spriteParameters: EntitySpriteParameters): boolean => {
        if(spriteParameters.arms.left.angle.size < animationState.chopStartAngle) {
            spriteParameters.arms.left.angle.changeAngle(dT * 0.8/1500);
            spriteParameters.arms.right.angle.changeAngle(-dT * 0.8/1500);
            return false;
        } else {
            return true;
        }
    };
    
    const animations = [
        firstPause,
        new Animation<typeof chopAnimationState, EntitySpriteParameters>(
            'Chop', 
            chopAnimationState, 
            chop, 
            () => null, 
            entity.spriteParameters
        ),
        secondPause,
        new Animation<typeof chopAnimationState, EntitySpriteParameters>('ChopBackswing', chopAnimationState, chopBackswing, () => null, entity.spriteParameters)
    ];
    return new ParentAnimation('Chop', animations);
};

const entityChopAnimator = (dT: number, animationState: EntitySpriteParameters) => {
    // arms spin towards each other 
    animationState.arms.left.angle.changeAngle(dT * 0.8/1500);
}

// lets do a demo animation of the arm around the entity to show it works

export const createArmDemoAnimation = (entity: Entity) => {

    const nextArmSideClockwise = (leftOrRightArm: 'left' | 'right') => {
        const sideChangeMap: {[key: string]: 'RIGHT' | 'BOTTOM' | 'LEFT' | 'TOP'} = {
            RIGHT: "BOTTOM",
            BOTTOM: "LEFT",
            LEFT: "TOP",
            TOP: "RIGHT"
        }

        if(leftOrRightArm === 'left') {
            entity.spriteParameters.arms.left.sidePosition.side = sideChangeMap[entity.spriteParameters.arms.left.sidePosition.side];
        }
        else {
            entity.spriteParameters.arms.right.sidePosition.side = sideChangeMap[entity.spriteParameters.arms.right.sidePosition.side];
        }
    }
    const nextArmSideCounterClockwise = (leftOrRightArm: 'left' | 'right') => {
        const sideChangeMap: {[key: string]: 'RIGHT' | 'BOTTOM' | 'LEFT' | 'TOP'} = {
            RIGHT: "TOP",
            BOTTOM: "RIGHT",
            LEFT: "BOTTOM",
            TOP: "LEFT"
        }

        if(leftOrRightArm === 'left') {
            entity.spriteParameters.arms.left.sidePosition.side = sideChangeMap[entity.spriteParameters.arms.left.sidePosition.side];
        }
        else {
            entity.spriteParameters.arms.right.sidePosition.side = sideChangeMap[entity.spriteParameters.arms.right.sidePosition.side];
        }
    }

    const armDemoAnimationState = {
    };

    const moveLeftArmClockwise = (dT: number, animationState: typeof armDemoAnimationState, spriteParameters: EntitySpriteParameters) => {
        // starts TOP close to the end
        // move right until limit
        // change side
        // move down until limit
        // change side
        // move left until limit
        // change side
        // move up until limit
        // change side
        // repeat
        const armMoveSpeed = 0.8/1500;
        if (spriteParameters.arms.left.sidePosition.side === 'TOP') {
            if (spriteParameters.arms.left.position.x.changeSize(dT * armMoveSpeed)) {
                // not sure if this is 0 or PI/2
                spriteParameters.arms.left.sidePosition.sideAngle.size = 0;
                nextArmSideCounterClockwise('left');
            }
        }
        else if(spriteParameters.arms.left.sidePosition.side === 'RIGHT') {
            if(spriteParameters.arms.left.sidePosition.sideAngle.changeAngle(dT * armMoveSpeed / spriteParameters.arms.left.sidePosition.length.size)) {
                spriteParameters.arms.left.angle.size = Math.PI;
                nextArmSideCounterClockwise('left');
            } 
        }
        else if(spriteParameters.arms.left.sidePosition.side === 'BOTTOM') {
            if(spriteParameters.arms.left.position.x.changeSize(dT * -armMoveSpeed)) {
                nextArmSideClockwise('left');
            }
        }
        else if(spriteParameters.arms.left.sidePosition.side === 'LEFT') {
            if(spriteParameters.arms.left.sidePosition.sideAngle.changeAngle(dT * armMoveSpeed / spriteParameters.arms.left.sidePosition.length.size)) {
                spriteParameters.arms.left.angle.size = 0;
                nextArmSideCounterClockwise('left');
            } 
        }
       
        return false;
    }



}

