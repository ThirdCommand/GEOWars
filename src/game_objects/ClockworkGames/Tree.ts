import { AnimationView } from "../../AnimationView";
import { GameEngine } from "../../game_engine/game_engine";
import { GameObject } from "../../game_engine/game_object";
import { LineSprite } from "../../game_engine/line_sprite";
import { type Transform } from "../../game_engine/transform";
import {Animation, ParentAnimation } from "../../game_engine/EntityState/Animate";
import { VectorMath } from "../../game_engine/util";
import { Entity } from "./Entity/Entity";

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

    clickRadius: 5;

    possibleAnimations: PossibleAnimations;

    spriteParameters: TreeSpriteParameters;

    currentAnimation: ParentAnimation | Animation<object>;
    static baseParameters: BaseParameters = {
        w: 30,
        h: 4/5 * 30
    };
    yourEntity: Entity;
    constructor(engine: GameEngine | AnimationView, pos: [number, number], yourEntity: Entity) {
        super(engine);
        this.transform.pos = pos;
        this.transform.angle = 0;
        this.yourEntity = yourEntity;

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
                getCoordinates: () => [0, -Tree.baseParameters.h/2]
            },
            right: {
                topBranch: {
                    getCoordinates: () => [3/10 * w, -h/4]
                },
                topCorner: {
                    getCoordinates: () => [1/5 * w, -h/4]
                },
                middleBranch: {
                    getCoordinates: () => [2/5 * w, 0]
                },
                middleCorner: {
                    getCoordinates: () => [3/10 * w, 0]
                },
                bottomBranch: {
                    getCoordinates: () => [1/2 * w, h/4]
                },
                bottomCorner: {
                    getCoordinates: () => [1/30 * w, h/4]
                },
                trunk : {
                    getCoordinates: () => [1/30 * w, h/2]
                }
            },
            left: {
                topBranch: {
                    getCoordinates: () => [-3/10 * w, -h/4]
                },
                topCorner: {
                    getCoordinates: () => [-1/5 * w, -h/4]
                },
                middleBranch: {
                    getCoordinates: () => [-2/5 * w, 0]
                },
                middleCorner: {
                    getCoordinates: () => [-3/10 * w, 0]
                },
                bottomBranch: {
                    getCoordinates: () => [-1/2 * w, h/4]
                },
                bottomCorner: {
                    getCoordinates: () => [-1/30 * w, h/4]
                },
                trunk: {
                    getCoordinates: () => [-1/30 * w, h/2]
                }
            }
        };
        this.addLineSprite(new TreeSprite(this.transform, this.spriteParameters));
        this.setPossibleActivitiesAndAnimations();

    }
    
    setPossibleActivitiesAndAnimations() {
        this.possibleAnimations = {
            // could pass in chopper here
            chopping: (chopper) => {
                
                const choppingAnimationState = {

                };
            }
        };
    }


    mouseClicked(mousePos: [number, number]) {
        const centerDist = VectorMath.dist(
            [this.transform.pos[0], this.transform.pos[1]],
            mousePos
        );
        if (centerDist < this.clickRadius) {
            this.onMouseClick(mousePos);
        }
    }

    onMouseClick(mousePos: [number, number]) {
        this.yourEntity.chopTree(this);
    }

    update(deltaTime: number) {
        this.currentAnimation?.animate(deltaTime);
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
        this.transform = transform;
        this.color = "green";
        this.width = Tree.baseParameters.w;
        this.height = Tree.baseParameters.h;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const pos = this.transform.absolutePosition();
        
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        
        this.drawTree(ctx);
        ctx.restore();
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