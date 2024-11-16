
// I could contain two entity sprite parameters and or transforms in one animation
// that could be nice
export class Animation<AnimationState, SpriteParameters = object> {
    name: string;
    animationState: AnimationState;
    parentAnimation?: ParentAnimation;
    spriteParameters?: SpriteParameters;
    runAnimation: (dT: number, animationState: AnimationState, spriteParameters: SpriteParameters) => boolean;
    endAnimation: (animationState: AnimationState) => true;
    constructor(name: string, animationState: AnimationState, animator: (dT: number, animationState: AnimationState, spriteParameters: SpriteParameters) => boolean, spriteParameters?: SpriteParameters, parentAnimation?: ParentAnimation) {
        this.name = name;
        this.spriteParameters = spriteParameters;
        this.parentAnimation = parentAnimation;
        this.animationState = animationState;
        this.runAnimation = animator;
    }
    animate(dT: number): boolean {
        return this.runAnimation(dT, this.animationState, this.spriteParameters) ? this.endAnimation(this.animationState) : false;
    }

    // I should add a function for ending animations early
    // so that things can be reset correctly mid animation
}

export class ParentAnimation {
    name: string;
    parentAnimation?: ParentAnimation;
    animations: Array<Animation<object> | ParentAnimation>;
    currentAnimationIndex: number;

    constructor(name: string, animations: Array<ParentAnimation | Animation<object>>, parentAnimation?: ParentAnimation, currentAnimationIndex?: number) {
        this.name = name;
        this.parentAnimation = parentAnimation;
        this.animations = animations || [];
        this.currentAnimationIndex = currentAnimationIndex || 0;
    }

    animate(dT: number) {
        const currentAnimationStateComplete = this.animations[this.currentAnimationIndex]?.animate(dT) || true;
        if(currentAnimationStateComplete) {
            if(this.currentAnimationIndex < this.animations.length - 1) {
                this.currentAnimationIndex++;
                return false;
            } else {
                this.currentAnimationIndex = 0;
                return true;
            }
        }
        return false;
    }
}
