import { Entity, type EntitySpriteParameters } from "./Entity";
import {Animation} from "../../../game_engine/EntityState/Animate";

export class SpinAnimation extends Animation {
    constructor(entity: Entity) {
        super(entity);
        this.animationStates = [
            new PauseFor(300, this),
            new Spin({spinAngle: Math.PI, spinSpeed: 0.8}, entity.spriteParameters, this),
            new PauseFor(300, this),
            new Spin({spinAngle: Math.PI, spinSpeed: -0.8}, entity.spriteParameters, this),
        ];
    }
}

class PauseFor extends Animation {
    timePaused: 0;
    maxPauseTime: number;
    parentAnimation: Animation;
    constructor(pauseTime: number, parentAnimation: Animation) {
        super();
        this.maxPauseTime = pauseTime;
        this.parentAnimation = parentAnimation;
    }
    override animate(dT: number) {
        this.timePaused += dT;
        if(this.timePaused >= this.maxPauseTime) {
            this.timePaused = 0;
            this.parentAnimation.nextAnimationState();
        }
    }
}

class Spin extends Animation {
    spinSpeed: number;
    spinAngle: number;
    spriteParameters: EntitySpriteParameters;
    constructor({spinAngle, spinSpeed}: {spinAngle: number, spinSpeed: number}, spriteParameters: EntitySpriteParameters, parentAnimation: Animation) {
        super();
        this.spinAngle = spinAngle;
        this.spinSpeed = spinSpeed;
        this.parentAnimation = parentAnimation;
        this.spriteParameters = spriteParameters;
    }
    override animate(deltaTime: number) {
        const angleChange = deltaTime * this.spinSpeed;
        if(this.spriteParameters.bodyAngle.changeSize({angleChange, max: this.spinAngle})) {
            this.nextAnimationState();
        }
    } 
}

export class SqueezeAnimation extends Animation {
    spriteParameters: EntitySpriteParameters;
    constructor(entity: Entity) {
        super(entity);

        this.animationStates = [
            new CloseStrained(entity.spriteParameters, this),
            new OpenBounce(entity.spriteParameters, this)
        ];
    }
}

class CloseStrained extends Animation {
    spriteParameters: EntitySpriteParameters;
    constructor(spriteParameters: EntitySpriteParameters, parentAnimation: Animation) {
        super();
        this.spriteParameters = spriteParameters;
        this.parentAnimation = parentAnimation;
    }

    getCurrentSqueezedWidth(){
        return this.spriteParameters.arms.right.position.x.size - 
        this.spriteParameters.arms.left.position.x.size;
    }

    animate(deltaTime: number) {
        const time = deltaTime / 48;
            
        const animationScale = time > 3 ? 3 : time;
        // spin 90 degrees, pause, spin back 90 degrees, pause

        const squeezedWidth = this.spriteParameters.lineThickness;
        const openedWidth = this.spriteParameters.arms.right.position.x.max() - this.spriteParameters.arms.left.position.x.min();
        const currentSqueezeWidth = this.getCurrentSqueezedWidth();
            
        

        const animationPercentage = (openedWidth - currentSqueezeWidth - squeezedWidth) / openedWidth;

        const closeDelta = animationScale * ( 0.25 + 1.75 * (1 - animationPercentage));

        this.spriteParameters.arms.left.position.x.changeSize(closeDelta/2);
        this.spriteParameters.arms.right.position.x.changeSize(-closeDelta/2);

        this.spriteParameters.width.changeSize(-closeDelta / 4);
        this.spriteParameters.height.changeSize(closeDelta / 8);
        this.spriteParameters.eye.height.changeSize(closeDelta / 16);
        this.spriteParameters.eye.width.changeSize(closeDelta / 6);
        this.spriteParameters.eye.right.radius.x.changeSize(closeDelta / 16);
        this.spriteParameters.eye.right.radius.y.changeSize(-closeDelta / 16);
        this.spriteParameters.eye.left.radius.x.changeSize(closeDelta / 32);
        this.spriteParameters.eye.left.radius.y.changeSize(closeDelta / 32);

        if(currentSqueezeWidth < squeezedWidth) {
            const correctionChange = (currentSqueezeWidth - squeezedWidth) / 2;
            this.spriteParameters.arms.left.position.x.changeSize(-correctionChange);
            this.spriteParameters.arms.right.position.x.changeSize(correctionChange);
            this.nextAnimationState();
        }

    }
}

class OpenBounce extends Animation {

    spriteParameters: EntitySpriteParameters;
    constructor(spriteParameters: EntitySpriteParameters, parentAnimation: Animation) {
        super();
        this.spriteParameters = spriteParameters;
        this.parentAnimation = parentAnimation;
    }

    getCurrentOpenWidth(){
        return this.spriteParameters.arms.right.position.x.size - 
        this.spriteParameters.arms.left.position.x.size;
    }

    animate(deltaTime: number) {
        const time = deltaTime / 48;
            
        const animationScale = time > 3 ? 3 : time;
        const squeezedWidth = this.spriteParameters.lineThickness;
        const openedWidth = this.spriteParameters.arms.right.position.x.max() - this.spriteParameters.arms.left.position.x.min();
        const currentOpenWidth = this.getCurrentOpenWidth();
            
        const animationPercentage = (currentOpenWidth - squeezedWidth) / openedWidth;

        const openDelta = animationScale * (1 + 3 * animationPercentage);

        this.spriteParameters.arms.left.position.x.changeSize(-openDelta/2);
        this.spriteParameters.arms.right.position.x.changeSize(openDelta/2);
       
        this.spriteParameters.width.changeSize(openDelta / 4);
        this.spriteParameters.height.changeSize(-openDelta / 8);
        this.spriteParameters.eye.height.changeSize(-openDelta / 16);
        this.spriteParameters.eye.width.changeSize(-openDelta / 6);
        this.spriteParameters.eye.right.radius.x.changeSize(-openDelta / 16);
        this.spriteParameters.eye.right.radius.y.changeSize(openDelta / 16);
        this.spriteParameters.eye.left.radius.x.changeSize(-openDelta / 32);
        this.spriteParameters.eye.left.radius.y.changeSize(-openDelta / 32);

        if(currentOpenWidth >= openedWidth) {
            const correctionChange = (currentOpenWidth - openedWidth) / 2;
            this.spriteParameters.arms.left.position.x.changeSize(correctionChange);
            this.spriteParameters.arms.right.position.x.changeSize(-correctionChange);
            
            this.spriteParameters.width.size = this.spriteParameters.width.originalSize;
            this.spriteParameters.height.size = this.spriteParameters.height.originalSize;
            this.spriteParameters.eye.left.position.y.size = this.spriteParameters.eye.left.position.y.originalSize;
            this.spriteParameters.eye.right.position.y.size = this.spriteParameters.eye.right.position.y.originalSize;
            this.spriteParameters.eye.left.position.x.size = this.spriteParameters.eye.left.position.x.originalSize;
            this.spriteParameters.eye.right.position.x.size = this.spriteParameters.eye.right.position.x.originalSize;
            this.spriteParameters.eye.left.radius.x.size = this.spriteParameters.eye.left.radius.x.originalSize;
            this.spriteParameters.eye.left.radius.y.size = this.spriteParameters.eye.left.radius.y.originalSize;
            this.spriteParameters.eye.right.radius.x.size = this.spriteParameters.eye.right.radius.x.originalSize;
            this.spriteParameters.eye.right.radius.y.size = this.spriteParameters.eye.right.radius.y.originalSize;
            this.nextAnimationState();
        }

    }
   
}

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

export class GoingToBedAnimation extends Animation {
    spriteParameters: EntitySpriteParameters;
    constructor(entity: Entity) {
        super(entity);
        this.animationStates = [
            new PauseFor(300, this),
            new Spin({spinSpeed: 0.8, spinAngle: Math.PI}, entity.spriteParameters, this),
            new PauseFor(500, this)
        ];
    }
}

