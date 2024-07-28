export interface Animatable {
    animationEnded: () => void;
    animate: (deltaTime: number) => void;
    spriteParameters: object;
}

export class Animation {
    animationStates: AnimationState[];
    parentAnimation?: Animation;
    object: Animatable;
    stateIndex: number;
    // I should handle an array of objects or something
    constructor(object?: Animatable) {
        this.object = object;
        this.stateIndex = 0;
    }

    animate(dT: number) {
        this.animationStates[this.stateIndex]?.animate(dT);
    }

    nextAnimationState() {
        if(this.stateIndex < this.animationStates.length - 1) {
            this.stateIndex++;
        } else {
            this.stateIndex = 0;
            if(this.parentAnimation) {
                this.parentAnimation.nextAnimationState();
            } else {
                this.object.animationEnded();
            }
        }
    }
    
}

export class AnimationState {
    animate: (dT: number) => void;

}