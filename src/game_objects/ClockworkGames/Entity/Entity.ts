import {GameObject} from "../../../game_engine/game_object";
import {LineSprite} from "../../../game_engine/line_sprite";
import {VectorMath} from "../../../game_engine/util";
import {Animation, ParentAnimation } from "../../../game_engine/EntityState/Animate";
import {Activity, ParentActivity} from "../../../game_engine/EntityState/Activity";
import { type GameEngine } from "../../../game_engine/game_engine";

import {type Bed} from "../Bed";
import { type Transform } from "../../../game_engine/transform";
import { type AnimationView } from "../../../AnimationView";
import { Tree } from "../Tree";
import { createBobAnimation } from "./EntityAnimationStates";

type BaseParameters = {
    armLength: 40;
    lineThickness: 4;
    width: 70;
    height: 40;
}

type MoveToData = {
    location: [number, number];
    entityTransform: Transform;
    moveToSpeed: number;
    moveToAcceleration: number;
}

type ChopTreeData = {
    tree: Tree;
}

type WaitState = {
    time: number,
    waitedTime: number
}

export class Entity extends GameObject{
    static baseParameters: BaseParameters = {
        armLength: 40,
        lineThickness: 4,
        width: 70,
        height: 40
    };

    currentAnimation: ParentAnimation | Animation<object>;


    moveToSpeed: number;
    moveToAcceleration: number;

    treeChopLocation: [0, 15];


    squeezing: boolean;
    closing: boolean;
    activitiesQueue: (Activity<MoveToData | WaitState | ChopTreeData> | ParentActivity)[];
    currentBed: Bed;

    spriteParameters: EntitySpriteParameters;
    possibleActivities: {
        moveTo: (location: [number, number]) => void,
        chopTree: (tree: Tree) => void,

    };
    possibleAnimations: {
        moveTo: () => void
        chopping: () => void
    };


    constructor(engine: GameEngine | AnimationView, pos: [number, number, number?]) {
        super(engine);
        this.transform.pos = pos;
        this.transform.angle = Math.PI;

        this.moveToSpeed = 2.5;
        this.moveToAcceleration = 0.125 / 6;

        this.squeezing = true;
        this.closing = true;

        this.activitiesQueue = [];
        this.addPhysicsComponent();
        this.currentBed;

        this.currentAnimation = null;

        // I need to figure out shared animations
        // and how to reference a real bed since I don't want to 
        // craft how a user or entity would find and tell the entity or itself to use it
        // yet

        // this array will have to be created
        // all-righty, this should be constructed the same way
        // as the scene generator and rootScene
        // each activity type with its own object
        // and update being the function that they all have

        // then that means creation of the objects will be the same
        // and a pre loaded creation method will need to be made

        // this.previousUniqueActivity = {};
        // this.activitiesByGoals = {};
        this.spriteParameters = {

            armLength: Entity.baseParameters.armLength,
            lineThickness: Entity.baseParameters.lineThickness,
            // need x/y position offset from actual position for animation purposes
            // or at least y
            // it would mess with collision detection though... not sure how to fix that
            // hmm
            // okay I think I got it
            // I'll change the transform directly,
            // while keeping track of that change within the animation 
            // that way it can reset when the animation is done...
            bodyAngle: {
                size: 0,
                originalSize: 0,
                changeSize: (angleChange) => {
                    this.spriteParameters.bodyAngle.size += angleChange;
                    const twoPi = 2 * Math.PI;
                    if(this.spriteParameters.bodyAngle.size > twoPi) {
                        this.spriteParameters.bodyAngle.size - twoPi;
                    } else if (this.spriteParameters.bodyAngle.size < -twoPi) {
                        this.spriteParameters.bodyAngle.size + twoPi;
                    }
                }
            },
            // I'll need to make similar objects for width and height
            width: {
                size: Entity.baseParameters.width,
                originalSize: Entity.baseParameters.width,
                max: () => (300),
                min: () => (
                    this.spriteParameters.eye.left.radius.x.size + 
                    this.spriteParameters.eye.right.radius.x.size + 
                    this.spriteParameters.eye.width.getSize()
                ),
                checkSet: {
                    max: () => {
                        const max = this.spriteParameters.width.max();
                        if( this.spriteParameters.width.size > max) {
                            this.spriteParameters.width.size = max;
                            return true;
                        }
                    },
                    min: () => {
                        const min = this.spriteParameters.width.min();
                        if( this.spriteParameters.width.size < min) {
                            this.spriteParameters.width.size = min;
                            return true;
                        }
                    }
                },
                changeSize: (widthDifference: number) => {
                    this.spriteParameters.width.size += widthDifference;
                    return  this.spriteParameters.width.checkSet.max() || this.spriteParameters.width.checkSet.min();
                }
            },
            height: {
                size: Entity.baseParameters.height, // when you change height, you need to change the y position of the arms too
                originalSize: Entity.baseParameters.height,
                max: () => (150),
                min: () => (
                    this.spriteParameters.eye.left.radius.y.size > this.spriteParameters.eye.right.radius.y.size ? 
                        this.spriteParameters.eye.left.radius.y.size :
                        this.spriteParameters.eye.right.radius.y.size
                ),
                checkSet: {
                    max: () => {
                        const max = this.spriteParameters.height.max();
                        if( this.spriteParameters.height.size > max) {
                            this.spriteParameters.height.size = max;
                            return true;
                        }
                    },
                    min: () => {
                        const min = this.spriteParameters.height.min();
                        if( this.spriteParameters.height.size < min) {
                            this.spriteParameters.height.size = min;
                            return true;
                        }
                    }
                },
                changeSize: (heightDifference: number) => {
                    this.spriteParameters.height.size += heightDifference;
                    const isOutOfRange = this.spriteParameters.height.checkSet.max() || this.spriteParameters.height.checkSet.min();
                    // this.spriteParameters.arms.left.position.y.setSize();
                    // this.spriteParameters.arms.right.position.y.setSize();
                    return isOutOfRange;
                }
            },
            curves: {
                left: {
                    top: {
                        getCoordinate: () => ([
                            -this.spriteParameters.width.size / 3,
                            this.spriteParameters.height.size / 2
                        ])
                    },
                    topCurvePoint: {
                        getCoordinate: () => ([
                            -5/9 * this.spriteParameters.width.size,
                            1/3 * this.spriteParameters.height.size
                        ])
                    },
                    bottomCurvePoint: {
                        getCoordinate: () => ([
                            -5/9 * this.spriteParameters.width.size,
                            -1/3 * this.spriteParameters.height.size
                        ])
                    },
                    bottom: {
                        getCoordinate: () => ([
                            -this.spriteParameters.width.size / 3,
                            -this.spriteParameters.height.size / 2
                        ])
                    }
                },
                right: {
                    top: {
                        getCoordinate: () => ([
                            this.spriteParameters.width.size / 3,
                            this.spriteParameters.height.size / 2
                        ])
                    },
                    topCurvePoint: {
                        getCoordinate: () => ([
                            5/9 * this.spriteParameters.width.size,
                            1/3 * this.spriteParameters.height.size
                        ])
                    },
                    bottomCurvePoint: {
                        getCoordinate: () => ([
                            5/9 * this.spriteParameters.width.size,
                            -1/3 * this.spriteParameters.height.size
                        ])
                    },
                    bottom: {
                        getCoordinate: () => ([
                            this.spriteParameters.width.size / 3,
                            -this.spriteParameters.height.size / 2
                        ])
                    }
                }
            },
            // range of motion might be a good 
            // property to track
            arms: {
                left: {
                    length: {
                        originalLength: 40,
                        size: 20 * 2, // TODO
                        max: () => (150),
                        min: () => (0),
                        checkSet: {
                            max: () => {
                                const max = this.spriteParameters.arms.left.length.max();
                                if( this.spriteParameters.arms.left.length.size > max) {
                                    this.spriteParameters.arms.left.length.size = max;
                                    return true;
                                }
                            },
                            min: () => {
                                const min = this.spriteParameters.arms.left.length.min();
                                if( this.spriteParameters.arms.left.length.size < min) {
                                    this.spriteParameters.arms.left.length.size = min;
                                    return true;
                                }
                            }
                        },
                        changeLength: (lengthDifference: number) => {
                            this.spriteParameters.arms.left.length.size += lengthDifference;
                            return this.spriteParameters.arms.left.length.checkSet.max() || this.spriteParameters.arms.left.length.checkSet.min();
                        }
                    },
                    position: {
                        x: {
                            size: -Entity.baseParameters.width / 2 / 2, // width / 2 / 2
                            originalSize: -Entity.baseParameters.width / 2 / 2,
                            max: () => (this.spriteParameters.width.size / 2 / 2 - this.spriteParameters.lineThickness * 1.5),
                            min: () => (-this.spriteParameters.width.size / 2 / 2),
                            checkSet: {
                                max: () => {
                                    const max = this.spriteParameters.arms.left.position.x.max();
                                    if( this.spriteParameters.arms.left.position.x.size > max) {
                                        this.spriteParameters.arms.left.position.x.size = max;
                                        return true;
                                    }
                                }, 
                                min: () => {
                                    const min = this.spriteParameters.arms.left.position.x.min();
                                    if( this.spriteParameters.arms.left.position.x.size < min) {
                                        this.spriteParameters.arms.left.position.x.size = min;
                                        return true;
                                    }
                                }
                            },
                            changeSize: (sizeDifference: number) => {
                                this.spriteParameters.arms.left.position.x.size += sizeDifference;
                                return this.spriteParameters.arms.left.position.x.checkSet.max() || this.spriteParameters.arms.left.position.x.checkSet.min();
                            }
                        },
                        y: {
                            // size: this.height / 2, 
                            // originalSize: this.height / 2, 
                            // setSize: () => {spriteParameters.arms.left.position.y.size = spriteParameters.height.size / 2;}
                            size: 0, 
                            originalSize: 0, 
                            // setSize: () => {this.spriteParameters.arms.left.position.y.size = 0;}
                        }
                    },
                    angle: {
                        size: Math.PI / 2,
                        originalSize: Math.PI / 2,
                        max: () => Math.PI,
                        min: () => 0,
                        checkSet: {
                            max: () => {
                                const max = this.spriteParameters.arms.left.angle.max();
                                if( this.spriteParameters.arms.left.angle.size > max) {
                                    this.spriteParameters.arms.left.angle.size = max;
                                    return true;
                                }
                            },
                            min: () => {
                                const min = this.spriteParameters.arms.left.angle.min();
                                if( this.spriteParameters.arms.left.angle.size < min) {
                                    this.spriteParameters.arms.left.angle.size = min;
                                    return true;
                                }
                            }
                        },
                        changeAngle: (angleDifference: number) => {
                            this.spriteParameters.arms.left.angle.size += angleDifference;
                            return this.spriteParameters.arms.left.angle.checkSet.max() || this.spriteParameters.arms.left.angle.checkSet.min();
                        }
                    },
                    endPosition: {
                        getCoordinate: () => [
                            this.spriteParameters.arms.left.position.x.size + Math.cos(this.spriteParameters.arms.left.angle.size) * (this.spriteParameters.arms.left.length.size + this.spriteParameters.height.size / 2),
                            this.spriteParameters.arms.left.position.y.size + Math.sin(this.spriteParameters.arms.left.angle.size) * (this.spriteParameters.arms.left.length.size + this.spriteParameters.height.size / 2)
                        ]
                    }
                },
                right: {
                    length: {
                        originalLength: Entity.baseParameters.armLength,
                        size: Entity.baseParameters.armLength,
                        max: () => (150),
                        min: () => (0),
                        checkSet: {
                            max: () => {
                                const max = this.spriteParameters.arms.right.length.max();
                                if( this.spriteParameters.arms.right.length.size > max) {
                                    this.spriteParameters.arms.right.length.size = max;
                                    return true;
                                }
                            },
                            min: () => {
                                const min = this.spriteParameters.arms.right.length.min();
                                if( this.spriteParameters.arms.right.length.size < min) {
                                    this.spriteParameters.arms.right.length.size = min;
                                    return true;
                                }
                            }
                        },
                        changeLength: (lengthDifference: number) => {
                            this.spriteParameters.arms.right.length.size += lengthDifference;
                            return (this.spriteParameters.arms.right.length.checkSet.max() || this.spriteParameters.arms.right.length.checkSet.min());
                        }
                    },
                    position: {
                        x: {
                            size: Entity.baseParameters.width / 2 / 2, 
                            originalSize: Entity.baseParameters.width / 2 / 2,
                            max: () => (this.spriteParameters.width.size / 2 / 2),
                            min: () => (-this.spriteParameters.width.size / 2 / 2 + this.spriteParameters.lineThickness * 1.5),
                            checkSet: {
                                max: () => {
                                    const max = this.spriteParameters.arms.right.position.x.max();
                                    if( this.spriteParameters.arms.right.position.x.size > max) {
                                        this.spriteParameters.arms.right.position.x.size = max;
                                        return true;
                                    }
                                }, 
                                min: () => {
                                    const min = this.spriteParameters.arms.right.position.x.min();
                                    if( this.spriteParameters.arms.right.position.x.size < min) {
                                        this.spriteParameters.arms.right.position.x.size = min;
                                        return true;
                                    }
                                }
                            },
                            changeSize: (sizeDifference: number) => {
                                this.spriteParameters.arms.right.position.x.size += sizeDifference;
                                return (this.spriteParameters.arms.right.position.x.checkSet.max() || this.spriteParameters.arms.right.position.x.checkSet.min());
                            }
                        },
                        y: {
                            size: 0, 
                            originalSize: 0, 
                            // setSize: () => {this.spriteParameters.arms.right.position.y.size = 0;}
                        }
                    },
                    angle: {
                        size: Math.PI / 2,
                        originalSize: Math.PI / 2,
                        max: () => Math.PI,
                        min: () => 0,
                        checkSet: {
                            max: () => {
                                const max = this.spriteParameters.arms.right.angle.max();
                                if( this.spriteParameters.arms.right.angle.size > max) {
                                    this.spriteParameters.arms.right.angle.size = max;
                                    return true;
                                }
                            },
                            min: () => {
                                const min = this.spriteParameters.arms.right.angle.min();
                                if( this.spriteParameters.arms.right.angle.size < min) {
                                    this.spriteParameters.arms.right.angle.size = min;
                                    return true;
                                }
                            }
                        },
                        changeAngle: (angleDifference: number) => {
                            this.spriteParameters.arms.right.angle.size += angleDifference;
                            return this.spriteParameters.arms.right.angle.checkSet.max() || this.spriteParameters.arms.right.angle.checkSet.min();
                        }
                    },
                    endPosition: {
                        getCoordinate: () => [
                            this.spriteParameters.arms.right.position.x.size + Math.cos(this.spriteParameters.arms.right.angle.size) * (this.spriteParameters.arms.right.length.size + this.spriteParameters.height.size / 2),
                            this.spriteParameters.arms.right.position.y.size + Math.sin(this.spriteParameters.arms.right.angle.size) * (this.spriteParameters.arms.right.length.size + this.spriteParameters.height.size / 2)
                        ]
                    }
                },
                
            },
            eye: {
                width: {
                    getSize: () => (this.spriteParameters.eye.right.position.x.size - this.spriteParameters.eye.left.position.x.size),
                    max: () => (this.spriteParameters.width.size - this.spriteParameters.eye.left.radius.x.size - this.spriteParameters.eye.right.radius.x.size),
                    min: () => (this.spriteParameters.eye.left.radius.x.size + this.spriteParameters.eye.right.radius.x.size),
                    changeSize: (widthDifference: number) => {
                        // changes by half the size difference per arm
                        const currentWidth = this.spriteParameters.eye.width.getSize();
                        const newWidth = currentWidth - widthDifference;
                        let realWidthDifference = widthDifference;
                        let outOfBounds = false;
                        if(newWidth < this.spriteParameters.eye.width.min()) {
                            outOfBounds = true;
                            realWidthDifference = currentWidth - this.spriteParameters.eye.width.min();
                        }
                        if(newWidth > this.spriteParameters.eye.width.max()) {
                            outOfBounds = true;
                            realWidthDifference = this.spriteParameters.eye.width.max() - currentWidth;
                        }
        
                        const leftEyeOutOfRange = this.spriteParameters.eye.left.position.x.changeSize(-realWidthDifference/2);
                        const rightEyeOutOfRange = this.spriteParameters.eye.right.position.x.changeSize(realWidthDifference/2);
                        
                        return (leftEyeOutOfRange && rightEyeOutOfRange) || outOfBounds;
                    }
                },
                height: {
                    size: 1/6 * Entity.baseParameters.height,
                    originalSize: 1/6 *  Entity.baseParameters.height,
                    max: () => ( 
                        this.spriteParameters.eye.left.radius.y.size > this.spriteParameters.eye.right.radius.y.size ? 
                            this.spriteParameters.height.size / 2 - this.spriteParameters.eye.right.radius.y.size :
                            this.spriteParameters.height.size / 2 - this.spriteParameters.eye.left.radius.y.size
                    ), 
                    min: () => (
                        this.spriteParameters.eye.left.radius.y.size > this.spriteParameters.eye.right.radius.y.size ? 
                            -this.spriteParameters.height.size / 2 + this.spriteParameters.eye.right.radius.y.size :
                            -this.spriteParameters.height.size / 2 + this.spriteParameters.eye.left.radius.y.size
                    ),
                    checkSet: {
                        max: () => {
                            const max = this.spriteParameters.eye.height.max();
                            if( this.spriteParameters.eye.height.size > max) {
                                this.spriteParameters.eye.height.size = max;
                                return true;
                            }
                        },
                        min: () => {
                            const min = this.spriteParameters.eye.height.min();
                            if( this.spriteParameters.eye.height.size < min) {
                                this.spriteParameters.eye.height.size = min;
                                return true;
                            }
                        },
                    },
                    changeSize: (heightDifference: number) => {
                        const currentSize = this.spriteParameters.eye.height.size;
                        this.spriteParameters.eye.height.size += heightDifference;
                        const isOutOfRange = this.spriteParameters.eye.height.checkSet.max() || this.spriteParameters.eye.height.checkSet.min();
                        const actualDifference = currentSize - this.spriteParameters.eye.height.size;
        
                        const leftEyeOutOfRange = this.spriteParameters.eye.left.position.y.changeSize(actualDifference/2);
                        const rightEyeOutOFRange = this.spriteParameters.eye.right.position.y.changeSize(actualDifference/2);
                        
                        return (leftEyeOutOfRange && rightEyeOutOFRange) || isOutOfRange;
                    }
                },
                left: {
                    position: {
                        x: {
                            size: -5 / 36 * Entity.baseParameters.width,
                            originalSize: -5 / 36 * Entity.baseParameters.width,
                            //furthest right
                            max: () => (this.spriteParameters.width.size / 2 - this.spriteParameters.eye.left.radius.x.size - 2 * this.spriteParameters.eye.right.radius.x.size),
                            min: () => (-this.spriteParameters.width.size / 2 + this.spriteParameters.eye.left.radius.x.size),
                            checkSet: {
                                max: () => {
                                    const max = this.spriteParameters.eye.left.position.x.max();
                                    if( this.spriteParameters.eye.left.position.x.size > max) {
                                        this.spriteParameters.eye.left.position.x.size = max;
                                        return true;
                                    }
                                },
                                min: () => {
                                    const min = this.spriteParameters.eye.left.position.x.min();
                                    if( this.spriteParameters.eye.left.position.x.size < min) {
                                        this.spriteParameters.eye.left.position.x.size = min;
                                        return true;
                                    }
                                },
                            },
                            changeSize: (sizeDifference: number) => {
                                this.spriteParameters.eye.left.position.x.size += sizeDifference;
                                return this.spriteParameters.eye.left.position.x.checkSet.max() || this.spriteParameters.eye.left.position.x.checkSet.min();
                            }
                        },
                        y: {
                            size: Entity.baseParameters.height / 8,
                            originalSize: Entity.baseParameters.height / 8,
                            max: () => (this.spriteParameters.height.size / 2 - this.spriteParameters.eye.left.radius.y.size),
                            min: () => (-this.spriteParameters.height.size / 2 + this.spriteParameters.eye.left.radius.y.size),
                            checkSet: {
                                max: () => {
                                    const max = this.spriteParameters.eye.left.position.y.max();
                                    if( this.spriteParameters.eye.left.position.y.size > max) {
                                        this.spriteParameters.eye.left.position.y.size = max;
                                        return true;
                                    }
                                },
                                min: () => {
                                    const min = this.spriteParameters.eye.left.position.y.min();
                                    if( this.spriteParameters.eye.left.position.y.size < min) {
                                        this.spriteParameters.eye.left.position.y.size = min;
                                        return true;
                                    }
                                }
                            },
                            changeSize: (sizeDifference: number) => {
                                this.spriteParameters.eye.left.position.y.size += sizeDifference;
                                return this.spriteParameters.eye.left.position.y.checkSet.max() || this.spriteParameters.eye.left.position.y.checkSet.min();
                            }
                        }
                    },
                    radius: {
                        x: {
                            size: Entity.baseParameters.height / 8,
                            originalSize: Entity.baseParameters.height / 8,
                            max: () => (this.spriteParameters.width.size / 2 - this.spriteParameters.eye.right.radius.x.size * 2),
                            min: () => 1,
                            checkSet: {
                                max: () => {
                                    const max = this.spriteParameters.eye.left.radius.x.max();
                                    if( this.spriteParameters.eye.left.radius.x.size > max) {
                                        this.spriteParameters.eye.left.radius.x.size = max;
                                        return true;
                                    }
                                },
                                min: () => {
                                    const min = this.spriteParameters.eye.left.radius.x.min();
                                    if( this.spriteParameters.eye.left.radius.x.size < min) {
                                        this.spriteParameters.eye.left.radius.x.size = min;
                                        return true;
                                    }
                                }
                            },
                            changeSize: (sizeDifference: number) => {
                                this.spriteParameters.eye.left.radius.x.size += sizeDifference;
                                return this.spriteParameters.eye.left.radius.x.checkSet.max() || this.spriteParameters.eye.left.radius.x.checkSet.min();
                            }
                        },
                        y: {
                            size: Entity.baseParameters.height / 8,
                            originalSize: Entity.baseParameters.height / 8,
                            max: () => (this.spriteParameters.height.size / 2),
                            min: () => 1,
                            checkSet: {
                                max: () => {
                                    const max = this.spriteParameters.eye.left.radius.y.max();
                                    if( this.spriteParameters.eye.left.radius.y.size > max) {
                                        this.spriteParameters.eye.left.radius.y.size = max;
                                        return true;
                                    }
                                },
                                min: () => {
                                    const min = this.spriteParameters.eye.left.radius.y.min();
                                    if( this.spriteParameters.eye.left.radius.y.size < min) {
                                        this.spriteParameters.eye.left.radius.y.size = min;
                                        return true;
                                    }
                                }
                            },
                            changeSize: (sizeDifference: number) => {
                                this.spriteParameters.eye.left.radius.y.size += sizeDifference;
                                return this.spriteParameters.eye.left.radius.y.checkSet.max() || this.spriteParameters.eye.left.radius.y.checkSet.min();
                            }
                        }
                    }
                },
                right: {
                    position: {
                        x: {
                            size: 5 / 36 * Entity.baseParameters.width,
                            originalSize: 5 / 36 * Entity.baseParameters.width,
                            //furthest right
                            max: () => (this.spriteParameters.width.size / 2 - this.spriteParameters.eye.right.radius.x.size),
                            min: () => (-this.spriteParameters.width.size / 2 + this.spriteParameters.eye.left.radius.x.size * 2 + 2 * this.spriteParameters.eye.right.radius.x.size),
                            checkSet: {
                                max: () => {
                                    const max = this.spriteParameters.eye.right.position.x.max();
                                    if( this.spriteParameters.eye.right.position.x.size > max) {
                                        this.spriteParameters.eye.right.position.x.size = max;
                                        return true;
                                    }
                                },
                                min: () => {
                                    const min = this.spriteParameters.eye.right.position.x.min();
                                    if( this.spriteParameters.eye.right.position.x.size < min) {
                                        this.spriteParameters.eye.right.position.x.size = min;
                                        return true;
                                    }
                                },
                            },
                            changeSize: (sizeDifference: number) => {
                                this.spriteParameters.eye.right.position.x.size += sizeDifference;
                                return this.spriteParameters.eye.right.position.x.checkSet.max() || this.spriteParameters.eye.right.position.x.checkSet.min();
                            }
                        },
                        y: {
                            size: Entity.baseParameters.height / 8,
                            originalSize: Entity.baseParameters.height / 8,
                            max: () => (this.spriteParameters.height.size / 2 - this.spriteParameters.eye.right.radius.y.size),
                            min: () => (-this.spriteParameters.height.size / 2 + this.spriteParameters.eye.right.radius.y.size),
                            checkSet: {
                                max: () => {
                                    const max = this.spriteParameters.eye.right.position.y.max();
                                    if( this.spriteParameters.eye.right.position.y.size > max) {
                                        this.spriteParameters.eye.right.position.y.size = max;
                                        return true;
                                    }
                                },
                                min: () => {
                                    const min = this.spriteParameters.eye.right.position.y.min();
                                    if( this.spriteParameters.eye.right.position.y.size < min) {
                                        this.spriteParameters.eye.right.position.y.size = min;
                                        return true;
                                    }
                                }
                            },
                            changeSize: (sizeDifference: number) => {
                                this.spriteParameters.eye.right.position.y.size += sizeDifference;
                                return this.spriteParameters.eye.right.position.y.checkSet.max() || this.spriteParameters.eye.right.position.y.checkSet.min();
                            }
                        }
                    },
                    radius: {
                        x: {
                            size: Entity.baseParameters.height / 8,
                            originalSize: Entity.baseParameters.height / 8,
                            max: () => (this.spriteParameters.width.size / 2 - this.spriteParameters.eye.left.radius.x.size * 2),
                            min: () => 1,
                            checkSet: {
                                max: () => {
                                    const max = this.spriteParameters.eye.right.radius.x.max();
                                    if( this.spriteParameters.eye.right.radius.x.size > max) {
                                        this.spriteParameters.eye.right.radius.x.size = max;
                                        return true;
                                    }
                                },
                                min: () => {
                                    const min = this.spriteParameters.eye.right.radius.x.min();
                                    if( this.spriteParameters.eye.right.radius.x.size < min) {
                                        this.spriteParameters.eye.right.radius.x.size = min;
                                        return true;
                                    }
                                }
                            },
                            changeSize: (sizeDifference: number) => {
                                this.spriteParameters.eye.right.radius.x.size += sizeDifference;
                                return this.spriteParameters.eye.right.radius.x.checkSet.max() || this.spriteParameters.eye.right.radius.x.checkSet.min();
                            }
                        },
                        y: {
                            size: Entity.baseParameters.height / 8,
                            originalSize: Entity.baseParameters.height / 8,
                            max: () => (this.spriteParameters.height.size / 2),
                            min: () => 1,
                            checkSet: {
                                max: () => {
                                    const max = this.spriteParameters.eye.right.radius.y.max();
                                    if( this.spriteParameters.eye.right.radius.y.size > max) {
                                        this.spriteParameters.eye.right.radius.y.size = max;
                                        return true;
                                    }
                                },
                                min: () => {
                                    const min = this.spriteParameters.eye.right.radius.y.min();
                                    if( this.spriteParameters.eye.right.radius.y.size < min) {
                                        this.spriteParameters.eye.right.radius.y.size = min;
                                        return true;
                                    }
                                }
                            },
                            changeSize: (sizeDifference: number) => {
                                this.spriteParameters.eye.right.radius.y.size += sizeDifference;
                                return this.spriteParameters.eye.right.radius.y.checkSet.max() || this.spriteParameters.eye.right.radius.y.checkSet.min();
                            }
                        }
                    }
                }
            }
        };
        this.setPossibleActivitiesAndAnimations();

        this.possibleActivities.moveTo([700,400]);



        this.addLineSprite(new EntitySprite(this.transform, this.spriteParameters));
    }

    chopTree(tree: Tree) {
        this.possibleActivities.moveTo([tree.transform.pos[0],tree.transform.pos[1]]);
        this.possibleActivities.chopTree(tree);
    }

    setPossibleActivitiesAndAnimations() {
        this.possibleAnimations = {
            moveTo: () => {
                this.currentAnimation = createBobAnimation(this);
            },
            chopping: () => {

            }
        };

        this.possibleActivities = {
            moveTo: (location: [number, number]) => {
                const moveToActivity = createMoveToActivity(this, location);
                this.activitiesQueue.push(moveToActivity);
            },
            chopTree: (tree: Tree) => {
                const chopTreeActivity = createChopTreeActivity(this, tree);
                this.activitiesQueue.push(chopTreeActivity);
            }
            // sleep: (bed: Bed) => {
            //     this.activitiesQueue.push({
            //         name: "goToSleep",
            //         bed,
            //         subActivities: [
            //             {
            //                 name: "moveTo",
            //                 location: bed.transform.pos
            //             },
            //             {
            //                 name: "goToSleep",
            //                 bed
            //             },
            //             {
            //                 name: "wait",
            //                 time: 5000,
            //                 waitedTime: 0
            //             }
            //         ]

            //     });
            // },
            // wait: (time: number) => {
            
            //     const waitActivity = new Activity<WaitState>("wait",{time, waitedTime: 0});
            //     waitActivity.runActivity = (dT: number, activityState) => {
            //         activityState.waitedTime += dT;
            //         return activityState.time >= activityState.waitedTime;
            //     };
            //     this.activitiesQueue.push(waitActivity);
            // },
            // wakeUp: () => {
            // this.activitiesQueue.push({
            //     name: "wakeUp",
            // });
            // }
        };
    }

    animationEnded() {

    }

    animate(deltaTime: number) {
        this.currentAnimation?.animate(deltaTime);
    }

    exist() {
        this.addCollider("General", this, 5);
    }

    checkArrived(pos: [number, number, number?]) {
        return VectorMath.dist(pos,this.transform.pos) < 2;
    }

    doActivity(activity: Activity<object> | ParentActivity, dT: number) {
        activity.doActivity(dT);
    }

    update(dT: number) {
        // this would be where an entity get's to decide
        // if it is adding something to the top of the activity queue
        // and if it is deleting something from the activity queue
        if(this.activitiesQueue.length) {
            this.doActivity(this.activitiesQueue[0], dT);
        }
        this.animate(dT);
    }
}

export type EntitySpriteParameters = {
    armLength: typeof Entity.baseParameters.armLength;
    lineThickness: typeof Entity.baseParameters.lineThickness;

    bodyAngle: {
        size: number;
        originalSize: 0;
        changeSize: (angleChange: number) => void
    }
    width: {
        size: number;
        originalSize: typeof Entity.baseParameters.width,
        max: () => number,
        min: () => number,
        checkSet: {
            max: () => boolean;
            min: () => boolean;
        },
        changeSize: (widthDifference: number) => boolean;
    },
    height: {
        size: number;
        originalSize: typeof Entity.baseParameters.height,
        max: () => number,
        min: () => number,
        checkSet: {
            max: () => boolean;
            min: () => boolean;
        },
        changeSize: (heightDifference: number) => boolean;
    },
    curves: {
        left: {
            top: {
                getCoordinate: () => [number,number]
            },
            topCurvePoint: {
                getCoordinate: () => [number,number]
            },
            bottomCurvePoint: {
                getCoordinate: () => [number,number]
            },
            bottom: {
                getCoordinate: () => [number,number]
            }
        },
        right: {
            top: {
                getCoordinate: () => [number,number]
            },
            topCurvePoint: {
                getCoordinate: () => [number,number]
            },
            bottomCurvePoint: {
                getCoordinate: () => [number,number]
            },
            bottom: {
                getCoordinate: () => [number,number]
            }
        }
    },
    arms: {
        left: {
            length: {
                originalLength: typeof Entity.baseParameters.armLength;
                size: number;
                max: () => number;
                min: () => number;
                checkSet: {
                    max: () => boolean;
                    min: () => boolean;
                },
                changeLength: (lengthDifference: number) => boolean;
            },
            position: {
                x: {
                    size: number;
                    originalSize: number,
                    max: () => number,
                    min: () => number,
                    checkSet: {
                        max: () => boolean;
                        min: () => boolean;
                    }
                    changeSize: (sizeDifference: number) => boolean;
                },
                y: {
                    size: number,
                    originalSize: number,
                }
            },
            angle: {
                size: number,
                originalSize: number,
                max: () => number,
                min: () => number,
                checkSet: {
                    max: () => boolean,
                    min: () => boolean
                },
                changeAngle: (angleDifference: number) => boolean;
            },
            endPosition: {
                getCoordinate: () => [number, number];
            }
        },
        right: {
            length: {
                originalLength: typeof Entity.baseParameters.armLength;
                size: number;
                max: () => number;
                min: () => number;
                checkSet: {
                    max: () => boolean;
                    min: () => boolean;
                },
                changeLength: (lengthDifference: number) => boolean;
            },
            position: {
                x: {
                    size: number;
                    originalSize: number,
                    max: () => number,
                    min: () => number,
                    checkSet: {
                        max: () => boolean;
                        min: () => boolean;
                    }
                    changeSize: (sizeDifference: number) => boolean;
                },
                y: {
                    size: number,
                    originalSize: number,
                }
            },
            angle: {
                size: number,
                originalSize: number,
                max: () => number,
                min: () => number,
                checkSet: {
                    max: () => boolean,
                    min: () => boolean
                },
                changeAngle: (angleDifference: number) => boolean;
            },
            endPosition: {
                getCoordinate: () => [number, number];
            }
        }
    },
    eye: {
        width: {
            getSize: () => number;
            max: () => number;
            min: () => number;
            changeSize: (widthDifference: number) => boolean;
        },
        height: {
            size: number;
            originalSize: number;
            max: () => number;
            min: () => number;
            checkSet: {
                max: () => boolean;
                min: () => boolean;
            },
            changeSize: (heightDifference: number) => boolean
        },
        left: {
            position: {
                x: {
                    size: number,
                    originalSize: number,
                    max: () => number,
                    min: () => number,
                    checkSet: {
                        max: () => boolean,
                        min: () => boolean
                    },
                    changeSize: (sizeDifference: number) => boolean;
                },
                y: {
                    size: number,
                    originalSize: number,
                    max: () => number,
                    min: () => number,
                    checkSet: {
                        max: () => boolean,
                        min: () => boolean
                    },
                    changeSize: (sizeDifference: number) => boolean;
                },
            },
            radius: {
                x: {
                    size: number,
                    originalSize: number,
                    max: () => number,
                    min: () => number,
                    checkSet: {
                        max: () => boolean,
                        min: () => boolean
                    },
                    changeSize: (sizeDifference: number) => boolean;
                },
                y: {
                    size: number,
                    originalSize: number,
                    max: () => number,
                    min: () => number,
                    checkSet: {
                        max: () => boolean,
                        min: () => boolean
                    },
                    changeSize: (sizeDifference: number) => boolean;
                },
            }
        },
        right: {
            position: {
                x: {
                    size: number,
                    originalSize: number,
                    max: () => number,
                    min: () => number,
                    checkSet: {
                        max: () => boolean,
                        min: () => boolean
                    },
                    changeSize: (sizeDifference: number) => boolean;
                },
                y: {
                    size: number,
                    originalSize: number,
                    max: () => number,
                    min: () => number,
                    checkSet: {
                        max: () => boolean,
                        min: () => boolean
                    },
                    changeSize: (sizeDifference: number) => boolean;
                },
            },
            radius: {
                x: {
                    size: number,
                    originalSize: number,
                    max: () => number,
                    min: () => number,
                    checkSet: {
                        max: () => boolean,
                        min: () => boolean
                    },
                    changeSize: (sizeDifference: number) => boolean;
                },
                y: {
                    size: number,
                    originalSize: number,
                    max: () => number,
                    min: () => number,
                    checkSet: {
                        max: () => boolean,
                        min: () => boolean
                    },
                    changeSize: (sizeDifference: number) => boolean;
                },
            }
        }
    }



}



export class EntitySprite extends LineSprite {
    color: string;
    spriteParameters: EntitySpriteParameters;
    transform: Transform;
    spawningScale: number;

    constructor(transform: Transform, spriteParameters: EntitySpriteParameters) {
        super(transform);
        this.spriteParameters = spriteParameters;
        this.spawningScale = 1;
        this.color = "#5D3FD3";
    }

    draw(ctx: CanvasRenderingContext2D) {
        const pos = this.transform.absolutePosition();

        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.angle);
        
        this.drawEntity(ctx, this.spriteParameters);
        ctx.restore();
    }

    drawEntity(ctx: CanvasRenderingContext2D, spriteParameters: EntitySpriteParameters) {
        const rightArmEnd = spriteParameters.arms.right.endPosition.getCoordinate();
        const rightArmPosition = [
            spriteParameters.arms.right.position.x.size,
            spriteParameters.arms.right.position.y.size
        ];

        const leftArmEnd = spriteParameters.arms.left.endPosition.getCoordinate();
        const leftArmPosition = [
            spriteParameters.arms.left.position.x.size,
            spriteParameters.arms.left.position.y.size
        ];

        const curveTopRight = spriteParameters.curves.right.top.getCoordinate();
        const curvePointTopRight = spriteParameters.curves.right.topCurvePoint.getCoordinate();
        const curvePointBottomRight = spriteParameters.curves.right.bottomCurvePoint.getCoordinate();
        const curveBottomRight = spriteParameters.curves.right.bottom.getCoordinate();

        const curveBottomLeft = spriteParameters.curves.left.bottom.getCoordinate();
        const curvePointBottomLeft = spriteParameters.curves.left.bottomCurvePoint.getCoordinate();
        const curvePointTopLeft = spriteParameters.curves.left.topCurvePoint.getCoordinate();
        const curveTopLeft = spriteParameters.curves.left.top.getCoordinate();

        const rightEyePosition = [
            spriteParameters.eye.right.position.x.size,
            spriteParameters.eye.right.position.y.size
        ];
        const rightEyeRadius = [
            spriteParameters.eye.right.radius.x.size,
            spriteParameters.eye.right.radius.y.size
        ];

        const leftEyePosition = [
            spriteParameters.eye.left.position.x.size,
            spriteParameters.eye.left.position.y.size
        ];
        const leftEyeRadius = [
            spriteParameters.eye.left.radius.x.size,
            spriteParameters.eye.left.radius.y.size
        ];

        const bodyAngle = spriteParameters.bodyAngle.size;

        ctx.lineWidth = spriteParameters.lineThickness;
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;


        ctx.beginPath();
        // Arms
        ctx.moveTo(rightArmEnd[0], rightArmEnd[1]); // 1
        ctx.lineTo(rightArmPosition[0], rightArmPosition[1]); // 2 

        ctx.moveTo(leftArmEnd[0], leftArmEnd[1]); // 11
        ctx.lineTo(leftArmPosition[0], leftArmPosition[1]); // 9
        ctx.stroke();


        const drawBody = (ctx: CanvasRenderingContext2D) => {
            ctx.fillStyle = "#000000";

            // body independent rotation
            ctx.rotate(bodyAngle);

            ctx.beginPath();
            ctx.moveTo(curveTopLeft[0], curveTopLeft[1]); // 8

            // curve points
            ctx.lineTo(curveTopRight[0], curveTopRight[1]); // 3 to
            ctx.bezierCurveTo(
                curvePointTopRight[0], 
                curvePointTopRight[1], 
                curvePointBottomRight[0], 
                curvePointBottomRight[1], 
                curveBottomRight[0], // 5
                curveBottomRight[1] // 5
            );
    
            ctx.lineTo(curveBottomLeft[0], curveBottomLeft[1]); // 6 to 
            ctx.bezierCurveTo(
                curvePointBottomLeft[0], 
                curvePointBottomLeft[1], 
                curvePointTopLeft[0], 
                curvePointTopLeft[1], 
                curveTopLeft[0],  // 8
                curveTopLeft[1]  // 8
            );
            ctx.closePath();

            ctx.fill();
            ctx.strokeStyle = this.color;

            ctx.beginPath();
            ctx.moveTo(curveTopLeft[0], curveTopLeft[1]); // 8
    
            // curve points
            ctx.lineTo(curveTopRight[0], curveTopRight[1]); // 3 to
    
            ctx.bezierCurveTo(
                curvePointTopRight[0], 
                curvePointTopRight[1], 
                curvePointBottomRight[0], 
                curvePointBottomRight[1], 
                curveBottomRight[0], // 5
                curveBottomRight[1] // 5
            );
    
            ctx.lineTo(curveBottomLeft[0], curveBottomLeft[1]); // 6 to 
            ctx.bezierCurveTo(
                curvePointBottomLeft[0], 
                curvePointBottomLeft[1], 
                curvePointTopLeft[0], 
                curvePointTopLeft[1], 
                curveTopLeft[0],  // 8
                curveTopLeft[1]  // 8
            );
           
            ctx.stroke();
        };

        ctx.save();
        drawBody(ctx);
        ctx.restore();

        ctx.beginPath();
        ctx.ellipse(
            leftEyePosition[0], 
            leftEyePosition[1], 
            leftEyeRadius[0], 
            leftEyeRadius[1], 
            0, 0, 2 * Math.PI
        );
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(
            rightEyePosition[0],
            rightEyePosition[1],
            rightEyeRadius[0],
            rightEyeRadius[1],
            0, 0, 2 * Math.PI);
        ctx.fill();


    }

    
    
}
// okay, clearly the activity needs to control the animation otherwise it'll be hard to 
// control both and have activities defined outside of the object that's animating
const createMoveToActivity = (entity: Entity, location: [number, number]) => {
    entity.possibleAnimations['moveTo']();
    const moveToData: MoveToData = {
        location, 
        entityTransform: entity.transform, 
        moveToSpeed: entity.moveToSpeed, 
        moveToAcceleration: entity.moveToAcceleration
    };
    const move = (time: number, activityState: MoveToData) => {
        if(VectorMath.dist(activityState.location, activityState.entityTransform.pos) < 2) {
            activityState.entityTransform.pos[0] = activityState.location[0];
            activityState.entityTransform.pos[1] = activityState.location[1];
            activityState.entityTransform.vel[0] = 0;
            activityState.entityTransform.vel[1] = 0;
            entity.currentAnimation = null;
            return true;
        } else {
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
        }
    };
    return new Activity<MoveToData>('moveTo', moveToData, move);
};

const createChopTreeActivity = (entity: Entity, tree: Tree) => {
    const chopTreeData: ChopTreeData = {
        tree, 
    };

    const chopLocation: [number, number] = [tree.transform.pos[0] + entity.treeChopLocation[0], tree.transform.pos[1] + entity.treeChopLocation[1]];
    const chopTreeActivity = new ParentActivity('ChopTreeActivity');
    const moveToActivity = createMoveToActivity(entity, chopLocation);
    const chop = (time: number, activityState: ChopTreeData) => {
        entity.possibleAnimations['chopping']();
        return true;
    };
    const chopActivity = new Activity<ChopTreeData>('ChopTree', chopTreeData, chop);

    

    chopTreeActivity.subActivities.push(moveToActivity, chopActivity);

    return chopTreeActivity;
};



// const NORMAL_FRAME_TIME_DELTA = 1000 / 60;