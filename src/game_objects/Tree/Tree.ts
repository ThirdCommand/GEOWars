import { AnimationView } from "../../AnimationView";
import { GameEngine } from "../../game_engine/game_engine";
import { GameObject } from "../../game_engine/game_object";
import { LineSprite } from "../../game_engine/line_sprite";
import { type Transform } from "../../game_engine/transform";
import {Animation, ParentAnimation } from "../../game_engine/EntityState/Animate";
import { VectorMath } from "../../game_engine/util";
import { Entity } from "../ClockworkGames/Entity/Entity";
import { createShakeAnimation } from "./TreeAnimationStates";

type BaseParameters = {
    w: number,
    h: number
}

interface PossibleAnimations {
    [key: string]: () => Animation<object>;
}
export class Tree extends GameObject {
    lineSprite: TreeSprite;
    interactions: {
        chopTree: {
            startingCondition: {
                interactionLocation: {
                    getLocation(): [number, number, number?]
                },
                interactionOrientation: number;
            }
        }
    };

    possibleAnimations: {
        shakeTree: () => void;
    }

    spriteParameters: TreeSpriteParameters;

    currentAnimation: ParentAnimation | Animation<object> | null;
    static baseParameters: BaseParameters = {
        w: 30 * 4,
        h: 4/5 * 30 * 4
    };
    chopper: Entity;
    clickRadius: number;
    yourEntity: Entity;
    demoAnimationTime: number;
    demoAnimationTimeCompleted: number;
    constructor(engine: GameEngine | AnimationView, pos: [number, number], yourEntity: Entity) {
        super(engine);
        this.transform.pos = pos;
        this.transform.angle = 0;
        this.yourEntity = yourEntity;
        this.clickRadius = 50;
        this.chopper = null;

        this.demoAnimationTime = 3000;
        this.demoAnimationTimeCompleted = 0;

        this.interactions = {
            chopTree: {
                startingCondition: {
                    interactionLocation: {
                        getLocation: () => (this.transform.absolutePosition())
                    },
                    interactionOrientation: Math.PI * 2 * 3 / 4
                }
            }
        };

        const w = Tree.baseParameters.w;
        const h = Tree.baseParameters.h;
        this.spriteParameters = {
            tip: { 
                getCoordinates: () => [0, -Tree.baseParameters.h/2] // 1
            },
            tipWithoutBranches: {
                left: {
                    getCoordinates: () => [-1/30 * w, -Tree.baseParameters.h/2] // 16
                },
                right: {
                    getCoordinates: () => [1/30 * w, -Tree.baseParameters.h/2] // 17
                }
            },
            branchlessOne: {
                left: {
                    getCoordinates: () => [-1/30 * w, -Tree.baseParameters.h/4] // 18
                },
                right: {
                    getCoordinates: () => [1/30 * w, -Tree.baseParameters.h/4] // 19
                }
            },
            branchlessTwo: {
                left: {
                    getCoordinates: () => [-1/30 * w, 0]  // 21
                },
                right: {
                    getCoordinates: () => [1/30 * w, 0] // 22
                }
            },
            branchState: 3,
            trunkShakeOffset: {
                size: 0,
                originalSize: 0,
                max: () => (1/30 * w),
                min: () => (-1/30 * w),
                checkSet: {
                    max: () => {
                        const max = this.spriteParameters.trunkShakeOffset.max();
                        if(this.spriteParameters.trunkShakeOffset.size >= max) {
                            this.spriteParameters.trunkShakeOffset.size = max;
                            return true;
                        }
                    },
                    min: () => {
                        const min = this.spriteParameters.trunkShakeOffset.min();
                        if(this.spriteParameters.trunkShakeOffset.size <= min) {
                            this.spriteParameters.trunkShakeOffset.size = min;
                            return true;
                        }
                    },
                },
                changeSize: (shakeDifference: number) => {
                    this.spriteParameters.trunkShakeOffset.size += shakeDifference;
                    return this.spriteParameters.trunkShakeOffset.checkSet.max() || this.spriteParameters.trunkShakeOffset.checkSet.min();
                }
            },
            right: {
                topBranch: {
                    getCoordinates: () => [3/10 * w, -h/4] // 2
                },
                topCorner: {
                    getCoordinates: () => [1/5 * w, -h/4] // 3
                },
                middleBranch: {
                    getCoordinates: () => [2/5 * w, 0] // 4
                },
                middleCorner: {
                    getCoordinates: () => [3/10 * w, 0] // 5
                },
                bottomBranch: {
                    getCoordinates: () => [1/2 * w, h/4] // 6
                },
                
                bottomCorner: { // top of trunk
                    getCoordinates: () => [1/30 * w + this.spriteParameters.trunkShakeOffset.size, h/4] // 7
                },
                trunk : {
                    getCoordinates: () => [1/30 * w + this.spriteParameters.trunkShakeOffset.size, h/2] // 8
                }
            },
            left: {
                topBranch: {
                    getCoordinates: () => [-3/10 * w, -h/4] // 15
                },
                topCorner: {
                    getCoordinates: () => [-1/5 * w, -h/4] // 14
                },
                middleBranch: {
                    getCoordinates: () => [-2/5 * w, 0] // 13
                },
                middleCorner: {
                    getCoordinates: () => [-3/10 * w, 0] // 12
                },
                bottomBranch: {
                    getCoordinates: () => [-1/2 * w, h/4] // 11
                },
                bottomCorner: { // top of trunk
                    getCoordinates: () => [-1/30 * w + this.spriteParameters.trunkShakeOffset.size, h/4] // 10 
                },
                trunk: {
                    getCoordinates: () => [-1/30 * w + this.spriteParameters.trunkShakeOffset.size, h/2] // 9
                }
            }
        };
        this.addLineSprite(new TreeSprite(this.transform, this.spriteParameters));
        this.setPossibleActivitiesAndAnimations();
        this.addClickListener();

    }

    chopped(entity: Entity) {
        this.chopper = entity;
    }
    
    setPossibleActivitiesAndAnimations() {
        this.possibleAnimations = {
            shakeTree: () => {
                this.currentAnimation = createShakeAnimation(this);
            }
        };
    }


    mouseClicked(mousePos: [number, number]) {
        const centerDist = VectorMath.dist(
            [this.transform.pos[0], this.transform.pos[1]],
            mousePos
        );
        // console.log({
        //     centerDist,
        //     clickRadius: this.clickRadius,
        //     inRadius: centerDist < this.clickRadius
        // });
        if (centerDist < this.clickRadius) {
            // console.log('we clicked tree');
            this.onMouseClick(mousePos);
        }
    }

    onMouseClick(mousePos: [number, number]) {
        // console.log(mousePos);
        this.yourEntity.chopTree(this);
    }

    update(deltaTime: number) {
        this.currentAnimation?.animate(deltaTime);
        if(this.chopper) {
            this.transform.pos = [this.chopper.transform.pos[0], this.chopper.transform.pos[1] - this.chopper.treeChopLocation[1]]; // tree hold location later
        }
        this.demoAnimationTimeCompleted += deltaTime;
        if(this.demoAnimationTimeCompleted > this.demoAnimationTime) {
            this.spriteParameters.branchState =  this.spriteParameters.branchState - 1 as typeof this.spriteParameters.branchState;
            if (this.spriteParameters.branchState < 0) {
                this.spriteParameters.branchState = 3;
            }
            this.demoAnimationTimeCompleted = 0;
        }

    }
    animate() {}

    exist() {
        this.addCollider("General", this, 5);
    }
}

export type TreeSpriteParameters = {
    tip: { 
        getCoordinates: () => [number, number]
    }
    branchState: 3 | 2 | 1 | 0;
    tipWithoutBranches: {
        left: {
            getCoordinates: () => [number, number]
        },
        right: {
            getCoordinates: () => [number, number] 
        }
    }
    branchlessOne: {
        left: {
            getCoordinates: () => [number, number]
        },
        right: {
            getCoordinates: () => [number, number]
        }
    }
    branchlessTwo: {
        left: {
            getCoordinates: () => [number, number]
        },
        right: {
            getCoordinates: () => [number, number]
        }
    }
    trunkShakeOffset: {
        size: number;
        originalSize: 0,
        max: () => number,
        min: () => number,
        checkSet: {
            max: () => boolean;
            min: () => boolean;
        },
        changeSize: (difference: number) => boolean;
    }
    right: {
        topBranch: {
            getCoordinates: () => [number, number]
        }
        topCorner: {
            getCoordinates: () => [number, number]
        }
        middleBranch: {
            getCoordinates: () => [number, number]
        }
        middleCorner: {
            getCoordinates: () => [number, number]
        }
        bottomBranch: {
            getCoordinates: () => [number, number]
        }
        bottomCorner: {
            getCoordinates: () => [number, number]
        }
        trunk : {
            getCoordinates: () => [number, number]
        }
    }
    left: {
        topBranch: {
            getCoordinates: () => [number, number]
        }
        topCorner: {
            getCoordinates: () => [number, number]
        }
        middleBranch: {
            getCoordinates: () => [number, number]
        }
        middleCorner: {
            getCoordinates: () => [number, number]
        }
        bottomBranch: {
            getCoordinates: () => [number, number]
        }
        bottomCorner: {
            getCoordinates: () => [number, number]
        }
        trunk: {
            getCoordinates: () => [number, number]
        }
    }
}

export class TreeSprite extends LineSprite {
    color: string;
    width: number;
    height: number;
    spriteParameters: TreeSpriteParameters;
    constructor(transform: Transform, spriteParameters: TreeSpriteParameters) {
        super(transform);
        this.spriteParameters = spriteParameters;
        this.color = "green";
        this.width = Tree.baseParameters.w;
        this.height = Tree.baseParameters.h;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const pos = this.transform.absolutePosition();
        
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        
        if(this.spriteParameters.branchState === 3) {
            this.drawTree(ctx);
        }
        else if(this.spriteParameters.branchState === 2) {
            this.drawTwoBranchTree(ctx);
        }
        else if (this.spriteParameters.branchState === 1) {
            this.drawOneBranchTree(ctx);
        } 
        else if (this.spriteParameters.branchState === 0) {
            this.drawBranchlessTree(ctx);
        }
       
        ctx.restore();
    }

    drawBranchlessTree(ctx: CanvasRenderingContext2D) {
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "#E4D00A";
        ctx.beginPath();
        ctx.moveTo(...this.spriteParameters.tipWithoutBranches.left.getCoordinates()); // 16
        ctx.lineTo(...this.spriteParameters.tipWithoutBranches.right.getCoordinates()); // 17
        ctx.lineTo(...this.spriteParameters.right.trunk.getCoordinates()); // 8
        ctx.lineTo(...this.spriteParameters.left.trunk.getCoordinates()); // 9
        ctx.lineTo(...this.spriteParameters.tipWithoutBranches.left.getCoordinates()); // 16
        ctx.stroke();
    }

    drawTwoBranchTree(ctx: CanvasRenderingContext2D) {
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "#E4D00A";
        ctx.beginPath();
        ctx.moveTo(...this.spriteParameters.branchlessOne.left.getCoordinates()); // 19
        ctx.lineTo(...this.spriteParameters.tipWithoutBranches.left.getCoordinates()); // 16
        ctx.lineTo(...this.spriteParameters.tipWithoutBranches.right.getCoordinates()); // 17
        ctx.lineTo(...this.spriteParameters.branchlessOne.right.getCoordinates()); // 18
        ctx.stroke();

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#097969";
        ctx.beginPath();
        ctx.moveTo(...this.spriteParameters.branchlessOne.right.getCoordinates()); // 18
        ctx.lineTo(...this.spriteParameters.right.topCorner.getCoordinates()); // 3
        ctx.lineTo(...this.spriteParameters.right.middleBranch.getCoordinates()); // 4
        ctx.lineTo(...this.spriteParameters.right.middleCorner.getCoordinates()); // 5
        ctx.lineTo(...this.spriteParameters.right.bottomBranch.getCoordinates()); // 6
        ctx.lineTo(...this.spriteParameters.right.bottomCorner.getCoordinates()); // 7
        ctx.stroke();

        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "#E4D00A";
        ctx.beginPath();
        ctx.moveTo(...this.spriteParameters.right.bottomCorner.getCoordinates()); // 7
        ctx.lineTo(...this.spriteParameters.right.trunk.getCoordinates()); // 8
        ctx.lineTo(...this.spriteParameters.left.trunk.getCoordinates()); // 9
        ctx.lineTo(...this.spriteParameters.left.bottomCorner.getCoordinates()); // 10
        ctx.stroke();

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#097969";
        ctx.beginPath();
        ctx.moveTo(...this.spriteParameters.left.bottomCorner.getCoordinates()); // 10
        ctx.lineTo(...this.spriteParameters.left.bottomBranch.getCoordinates()); // 11
        ctx.lineTo(...this.spriteParameters.left.middleCorner.getCoordinates()); // 12
        ctx.lineTo(...this.spriteParameters.left.middleBranch.getCoordinates()); // 13
        ctx.lineTo(...this.spriteParameters.left.topCorner.getCoordinates()); // 14
        ctx.lineTo(...this.spriteParameters.branchlessOne.left.getCoordinates()); // 19
        ctx.stroke();
    }

    drawOneBranchTree(ctx: CanvasRenderingContext2D) {
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "#E4D00A";
        ctx.beginPath();
        ctx.moveTo(...this.spriteParameters.branchlessTwo.left.getCoordinates()); // 21
        ctx.lineTo(...this.spriteParameters.tipWithoutBranches.left.getCoordinates()); // 16
        ctx.lineTo(...this.spriteParameters.tipWithoutBranches.right.getCoordinates()); // 17
        ctx.lineTo(...this.spriteParameters.branchlessTwo.right.getCoordinates()); // 20
        ctx.stroke();

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#097969";
        ctx.beginPath();
        ctx.moveTo(...this.spriteParameters.branchlessTwo.right.getCoordinates()); // 20
        ctx.lineTo(...this.spriteParameters.right.middleCorner.getCoordinates()); // 5
        ctx.lineTo(...this.spriteParameters.right.bottomBranch.getCoordinates()); // 6
        ctx.lineTo(...this.spriteParameters.right.bottomCorner.getCoordinates()); // 7
        ctx.stroke();

        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "#E4D00A";
        ctx.beginPath();
        ctx.moveTo(...this.spriteParameters.right.bottomCorner.getCoordinates()); // 7
        ctx.lineTo(...this.spriteParameters.right.trunk.getCoordinates()); // 8
        ctx.lineTo(...this.spriteParameters.left.trunk.getCoordinates()); // 9
        ctx.lineTo(...this.spriteParameters.left.bottomCorner.getCoordinates()); // 10
        ctx.stroke();

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#097969";
        ctx.beginPath();
        ctx.moveTo(...this.spriteParameters.left.bottomCorner.getCoordinates()); // 10
        ctx.lineTo(...this.spriteParameters.left.bottomBranch.getCoordinates()); // 11
        ctx.lineTo(...this.spriteParameters.left.middleCorner.getCoordinates()); // 12
        ctx.lineTo(...this.spriteParameters.branchlessTwo.left.getCoordinates()); // 21
        ctx.stroke();
    }

    drawTree(ctx: CanvasRenderingContext2D) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#097969";
        ctx.beginPath();
        ctx.moveTo(...this.spriteParameters.tip.getCoordinates()); // 1
        ctx.lineTo(...this.spriteParameters.right.topBranch.getCoordinates()); // 2
        ctx.lineTo(...this.spriteParameters.right.topCorner.getCoordinates()); // 3
        ctx.lineTo(...this.spriteParameters.right.middleBranch.getCoordinates()); // 4
        ctx.lineTo(...this.spriteParameters.right.middleCorner.getCoordinates()); // 5
        ctx.lineTo(...this.spriteParameters.right.bottomBranch.getCoordinates()); // 6
        ctx.lineTo(...this.spriteParameters.right.bottomCorner.getCoordinates()); // 7
        ctx.stroke();

        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "#E4D00A";
        ctx.beginPath();
        ctx.moveTo(...this.spriteParameters.right.bottomCorner.getCoordinates()); // 7
        ctx.lineTo(...this.spriteParameters.right.trunk.getCoordinates()); // 8
        ctx.lineTo(...this.spriteParameters.left.trunk.getCoordinates()); // 9
        ctx.lineTo(...this.spriteParameters.left.bottomCorner.getCoordinates()); // 10
        ctx.stroke();

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#097969";
        ctx.beginPath();
        ctx.moveTo(...this.spriteParameters.left.bottomCorner.getCoordinates()); // 10
        ctx.lineTo(...this.spriteParameters.left.bottomBranch.getCoordinates()); // 11
        ctx.lineTo(...this.spriteParameters.left.middleCorner.getCoordinates()); // 12
        ctx.lineTo(...this.spriteParameters.left.middleBranch.getCoordinates()); // 13
        ctx.lineTo(...this.spriteParameters.left.topCorner.getCoordinates()); // 14
        ctx.lineTo(...this.spriteParameters.left.topBranch.getCoordinates()); // 15
        ctx.lineTo(...this.spriteParameters.tip.getCoordinates()); // 1
        ctx.stroke();

    }
}