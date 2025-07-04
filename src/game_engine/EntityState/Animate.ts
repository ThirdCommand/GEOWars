
// I could contain two entity sprite parameters and or transforms in one animation
// that could be nice
export class Animation<AnimationState, SpriteParameters = object> {
    name: string;
    animationState: AnimationState;
    parentAnimation?: ParentAnimation;
    spriteParameters?: SpriteParameters;
    onAnimationEnd:  (animationState: AnimationState, spriteParameters: SpriteParameters) => void;
    runAnimation: (dT: number, animationState: AnimationState, spriteParameters: SpriteParameters) => boolean;;
    constructor(
        name: string, 
        animationState: AnimationState, 
        animator: (dT: number, animationState: AnimationState, spriteParameters: SpriteParameters) => boolean, 
        onAnimationEnd: ( animationState: AnimationState, spriteParameters: SpriteParameters) => void,
        spriteParameters?: SpriteParameters, 
        parentAnimation?: ParentAnimation
    ) {
        this.name = name;
        this.spriteParameters = spriteParameters;
        this.parentAnimation = parentAnimation;
        this.animationState = animationState;
        this.runAnimation = animator;
        this.onAnimationEnd = onAnimationEnd;
    }
    animate(dT: number): boolean {
        if(this.runAnimation(dT, this.animationState, this.spriteParameters)) {
            this.endAnimation();
            return true;
        } 
        return false;
    }
    endAnimation() {
        this.onAnimationEnd(this.animationState, this.spriteParameters);
    }

    // I should add a function for ending animations early
    // so that things can be reset correctly mid animation
}

// Last animation decides whether to clear out the current animation with onAnimationEnd
// has to be done in onAnimationEnd otherwise the parent animation will loop
export class ParentAnimation {
    name: string;
    isLoop: boolean;
    parentAnimation?: ParentAnimation;
    animations: Array<Animation<object> | ParentAnimation>;
    currentAnimationIndex: number;
    animationInterrupted: boolean;
    animationState: object;

    constructor(name: string, animations: Array<ParentAnimation | Animation<object>>, parentAnimation?: ParentAnimation, currentAnimationIndex?: number) {
        this.name = name;
        this.parentAnimation = parentAnimation;
        this.animations = animations || [];
        this.currentAnimationIndex = currentAnimationIndex || 0;
        this.animationInterrupted = false;
    }

    endAnimation() {
        this.animations[this.currentAnimationIndex].endAnimation();
    }

    interruptAnimation() {
        this.animationInterrupted = true;
    }

    animate(dT: number) {
        const currentAnimation = this.animations[this.currentAnimationIndex];
        if(this.animationInterrupted) {
            this.endAnimation();
            return true;
        }
        const currentAnimationStateComplete = currentAnimation.animate(dT);
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
