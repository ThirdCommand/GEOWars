import { Animation, ParentAnimation } from "../../game_engine/EntityState/Animate";
import {Tree, type TreeSpriteParameters} from "./Tree";


type ShakeStates = [
"ShakeLeft",
"ShakeRight",
"ShakeCenter"
];
type TreeShakeAnimationState = {
    tree: Tree
}
const createShakeLeftAnimation = (tree: Tree) => {
    const shakeRight = (dT: number): boolean => {
        const offset = -dT / 10;
        return tree.spriteParameters.trunkShakeOffset.changeSize(offset);
    }
    return new Animation<{}>('ShakeRight', {tree}, shakeRight, () => null)
}
const createShakeRightAnimation = (tree: Tree) => {
    const shakeRight = (dT: number): boolean => {
        const offset = dT / 10;
        return tree.spriteParameters.trunkShakeOffset.changeSize(offset);
    }
    return new Animation<{}>('ShakeRight', {}, shakeRight, () => null)
}
const createShakeCenterAnimation = (tree: Tree) => {
    const shakeCenter = (dT: number): boolean => {
        const offset = -dT / 10;
        tree.spriteParameters.trunkShakeOffset.size += offset;
        if(tree.spriteParameters.trunkShakeOffset.size <= 0) {
            tree.spriteParameters.trunkShakeOffset.size = 0;
            return true;
        }
        return false;
        
    } 
    const onShakeAnimationEnd = () => {
        tree.currentAnimation = null;
    }
    return new Animation('ShakeCenter', {tree}, shakeCenter, onShakeAnimationEnd)
}

export const createShakeAnimation = (tree: Tree) => {
    const shakeLeft = createShakeLeftAnimation(tree);
    const shakeRight = createShakeRightAnimation(tree);
    const shakeCenter = createShakeCenterAnimation(tree);
    const animations = [
        shakeLeft,
        shakeRight,
        shakeCenter
    ]
    return new ParentAnimation('TreeShakeAnimation', animations)
}