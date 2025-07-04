import {GameObject} from "../../../game_engine/game_object";
import {LineSprite} from "../../../game_engine/line_sprite";
import {VectorMath} from "../../../game_engine/util";
import {Animation, ParentAnimation } from "../../../game_engine/EntityState/Animate";
import {Activity, ParentActivity} from "../../../game_engine/EntityState/Activity";
import { type GameEngine } from "../../../game_engine/game_engine";

import {type Bed} from "../Bed";
import { type Transform } from "../../../game_engine/transform";
import { type AnimationView } from "../../../AnimationView";
import { Tree } from "../../Tree/Tree";
import { createBobAnimation, createGoingToBedAnimation, createChopAnimation, createSpinningAnimation } from "./EntityAnimationStates";
import { ActivityStates, createChopTreeActivity, createMoveToActivity, createGoToSleepActivity} from "./EntityActivityStates";

type BaseParameters = {
    armLength: 40;
    lineThickness: 4;
    width: 70;
    height: 40;
}

export class Entity extends GameObject{
    static baseParameters: BaseParameters = {
        armLength: 40,
        lineThickness: 4,
        width: 70,
        height: 40
    };
    sleepLocation: [number, number];

    currentAnimation: ParentAnimation | Animation<object> | null;


    moveToSpeed: number;
    moveToAcceleration: number;

    
    treeHeld: Tree;

    squeezing: boolean;
    closing: boolean;
    activitiesQueue: (Activity<ActivityStates> | ParentActivity)[];
    currentBed: Bed;

    treeChopLocation: [number, number];

    spriteParameters: EntitySpriteParameters;
    possibleActivities: {
        moveTo: (location: [number, number]) => void,
        chopTree: (tree: Tree) => void,
        goToSleep: (bed: Bed) => void
    };
    possibleAnimations: {
        moveTo: () => void
        chopping: (tree: Tree) => void
        spinningForFun: () => void
        none: () => void
        goingToSleep: (bed: Bed) => void
        sleeping: () => void
    };


    constructor(engine: GameEngine | AnimationView, pos: [number, number, number?]) {
        super(engine);
        this.transform.pos = pos;
        this.transform.angle = Math.PI;

        this.moveToSpeed = 2.5;
        this.treeChopLocation = [0, 85];
        this.moveToAcceleration = 0.125 / 6;

        this.squeezing = true;
        this.closing = true;

        this.activitiesQueue = [];
        this.addPhysicsComponent();
        this.currentBed;

        this.currentAnimation = null;

        // this.previousUniqueActivity = {};
        // this.activitiesByGoals = {};
        this.spriteParameters = {

            getDrawCoordinates: () => {
                return {
                    // TODO: add control flow for which side the arm is on and how to get start and end coordinate when on that side
                    // TODO: label these with the numbers they correspond to in the sprite doc
                    rightArmEnd: this.spriteParameters.arms.right.endPosition.getCoordinate(),
                    leftArmEnd: this.spriteParameters.arms.left.endPosition.getCoordinate(),
                    rightArmStart: [
                        this.spriteParameters.arms.right.position.x.size
                        , 
                        this.spriteParameters.arms.right.position.y.getSize()
                    ],
                    leftArmStart: [
                        this.spriteParameters.arms.left.position.x.size
                        , 
                        this.spriteParameters.arms.left.position.y.getSize()

                    ],

                    curveTopRight: this.spriteParameters.curves.right.top.getCoordinate(),
                    curvePointTopRight: this.spriteParameters.curves.right.topCurvePoint.getCoordinate(),
                    curvePointBottomRight: this.spriteParameters.curves.right.bottomCurvePoint.getCoordinate(),
                    curveBottomRight: this.spriteParameters.curves.right.bottom.getCoordinate(),

                    curveBottomLeft: this.spriteParameters.curves.left.bottom.getCoordinate(),
                    curvePointBottomLeft: this.spriteParameters.curves.left.bottomCurvePoint.getCoordinate(),
                    curvePointTopLeft: this.spriteParameters.curves.left.topCurvePoint.getCoordinate(),
                    curveTopLeft: this.spriteParameters.curves.left.top.getCoordinate(),

                    rightEyePosition: [
                        this.spriteParameters.eye.right.position.x.size,
                        this.spriteParameters.eye.right.position.y.size
                    ],

                    rightEyeRadius: [
                        this.spriteParameters.eye.right.radius.x.size,
                        this.spriteParameters.eye.right.radius.y.size
                    ],

                    leftEyePosition: [
                        this.spriteParameters.eye.left.position.x.size,
                        this.spriteParameters.eye.left.position.y.size
                    ],
                    leftEyeRadius: [
                        this.spriteParameters.eye.left.radius.x.size,
                        this.spriteParameters.eye.left.radius.y.size
                    ],

                    bodyAngle: this.spriteParameters.bodyAngle.size,

                    lineThickness: this.spriteParameters.lineThickness

                }
            },

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
            // why didn't I label these sheesh
            curves: {
                left: {
                    top: { // 8
                        getCoordinate: () => ([ 
                            -this.spriteParameters.width.size / 3,
                            this.spriteParameters.height.size / 2
                        ])
                    }, // 15
                    topCurvePoint: {
                        getCoordinate: () => ([
                            -5/9 * this.spriteParameters.width.size,
                            1/3 * this.spriteParameters.height.size
                        ])
                    }, // 14
                    bottomCurvePoint: {
                        getCoordinate: () => ([
                            -5/9 * this.spriteParameters.width.size,
                            -1/3 * this.spriteParameters.height.size
                        ])
                    }, // 6
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
                            max: () => (this.spriteParameters.width.size / 3),
                            min: () => (-this.spriteParameters.width.size / 3),
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
                            getSize: () => {
                                if(this.spriteParameters.arms.right.sidePosition.side === 'TOP') {
                                    return this.spriteParameters.height.size / 2;
                                } else if (this.spriteParameters.arms.right.sidePosition.side === 'BOTTOM') {
                                    return -this.spriteParameters.height.size / 2;
                                // WIP
                                } else if (this.spriteParameters.arms.right.sidePosition.side === 'LEFT') {
                                    return -this.spriteParameters.height.size / 2;
                                } else if (this.spriteParameters.arms.right.sidePosition.side === 'RIGHT') {
                                    return -this.spriteParameters.height.size / 2;
                                }
                            }, 
                            originalSize: 0, 
                            // setSize: () => {this.spriteParameters.arms.left.position.y.size = 0;}
                        },
                    },
                    sidePosition: {
                        side: 'TOP',
                        changeSide: (nextSide) => {
                            this.spriteParameters.arms.left.sidePosition.side = nextSide;
                        },
                        sideAngle: {
                            size: 0,
                            originalSize: 0,
                            max: () => this.spriteParameters.arms.left.sidePosition.side === "RIGHT" ?  Math.PI : Math.PI * 2,
                            min: () => this.spriteParameters.arms.left.sidePosition.side === "RIGHT" ?  0 : Math.PI,
                            checkSet: {
                                max: () => {
                                    const max = this.spriteParameters.arms.right.sidePosition.sideAngle.max();
                                    if (this.spriteParameters.arms.right.sidePosition.sideAngle.size > max) {
                                        this.spriteParameters.arms.right.sidePosition.sideAngle.size = this.spriteParameters.arms.left.sidePosition.side === "RIGHT" ?  Math.PI : 0;
                                        return true;
                                    }
                                },
                                min: () => {
                                    const min = this.spriteParameters.arms.right.sidePosition.sideAngle.min();
                                    if (this.spriteParameters.arms.right.sidePosition.sideAngle.size < min) {
                                        this.spriteParameters.arms.right.sidePosition.sideAngle.size = this.spriteParameters.arms.left.sidePosition.side === "RIGHT" ? 0 : Math.PI;
                                        return true;
                                    }
                                }
                            },
                            changeAngle: (angleDifference: number) => {
                                this.spriteParameters.arms.right.sidePosition.sideAngle.size += angleDifference;
                                return this.spriteParameters.arms.right.sidePosition.sideAngle.checkSet.max() || this.spriteParameters.arms.right.sidePosition.sideAngle.checkSet.min();
                            }
                        },
                        startPoint: {
                            // only for RIGHT and LEFT
                            getCoordinate: () => {
                                if (this.spriteParameters.arms.right.sidePosition.side === 'LEFT') {
                                    return [-this.spriteParameters.width.size / 3, 0];
                                } else if (this.spriteParameters.arms.right.sidePosition.side === 'RIGHT') {
                                    return [this.spriteParameters.width.size / 3, 0];
                                } else {
                                    console.error('side must be LEFT or RIGHT at this point')
                                }
                            }
                        },
                        endPoint: {
                            // this has to be in progress here... woof
                            getCoordinate: () => {
                                if (this.spriteParameters.arms.right.sidePosition.side === 'LEFT') {
                                    return [
                                        -this.spriteParameters.width.size / 3,
                                        0
                                    ];
                                } else if (this.spriteParameters.arms.right.sidePosition.side === 'RIGHT') {
                                    return [
                                        this.spriteParameters.width.size / 3,
                                        0
                                    ];
                                } else {
                                    console.error('side must be LEFT or RIGHT at this point')
                                }
                            }
                        },
                        length: {
                            originalLength: 40,
                            size: 20 * 2, // TODO
                            max: () => (150),
                            min: () => (0),
                            checkSet: {
                                max: () => {
                                    const max = this.spriteParameters.arms.left.sidePosition.length.max();
                                    if( this.spriteParameters.arms.left.sidePosition.length.size > max) {
                                        this.spriteParameters.arms.left.sidePosition.length.size = max;
                                        return true;
                                    }
                                },
                                min: () => {
                                    const min = this.spriteParameters.arms.left.sidePosition.length.min();
                                    if( this.spriteParameters.arms.left.sidePosition.length.size < min) {
                                        this.spriteParameters.arms.left.sidePosition.length.size = min;
                                        return true;
                                    }
                                }
                            },
                            changeLength: (lengthDifference: number) => {
                                this.spriteParameters.arms.left.length.size += lengthDifference;
                                return this.spriteParameters.arms.left.length.checkSet.max() || this.spriteParameters.arms.left.length.checkSet.min();
                            }
                        },
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
                        getCoordinate: () => {
                            if(this.spriteParameters.arms.left.sidePosition.side === 'TOP') {
                                return [
                                    this.spriteParameters.arms.left.position.x.size + Math.cos(this.spriteParameters.arms.left.angle.size) * (this.spriteParameters.arms.left.length.size + this.spriteParameters.height.size / 2),
                                    this.spriteParameters.arms.left.position.y.getSize() + Math.sin(this.spriteParameters.arms.left.angle.size) * (this.spriteParameters.arms.left.length.size)
                                ]
                            } else if (this.spriteParameters.arms.left.sidePosition.side === 'BOTTOM') {
                                return [
                                    this.spriteParameters.arms.left.position.x.size + Math.cos(this.spriteParameters.arms.left.angle.size) * (this.spriteParameters.arms.left.length.size + this.spriteParameters.height.size / 2),
                                    this.spriteParameters.arms.left.position.y.getSize() + Math.sin(this.spriteParameters.arms.left.angle.size) * (this.spriteParameters.arms.left.length.size)
                                ]
                            // WIP
                            } else if (this.spriteParameters.arms.left.sidePosition.side === 'LEFT') {
                                return [
                                    this.spriteParameters.arms.left.position.x.size + Math.cos(this.spriteParameters.arms.left.angle.size) * (this.spriteParameters.arms.left.length.size + this.spriteParameters.height.size / 2),
                                    -this.spriteParameters.arms.left.position.y.getSize() - Math.sin(this.spriteParameters.arms.left.angle.size) * (this.spriteParameters.arms.left.length.size + this.spriteParameters.height.size / 2)
                                ]
                            } else if (this.spriteParameters.arms.left.sidePosition.side === 'RIGHT') {
                                return [
                                    this.spriteParameters.arms.left.position.x.size + Math.cos(this.spriteParameters.arms.left.angle.size) * (this.spriteParameters.arms.left.length.size + this.spriteParameters.height.size / 2),
                                    this.spriteParameters.arms.left.position.y.getSize() + Math.sin(this.spriteParameters.arms.left.angle.size) * (this.spriteParameters.arms.left.length.size + this.spriteParameters.height.size / 2)
                                ]
                            }
                        }
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
                    // start position for TOP and BOTTOM
                    position: {
                        x: {
                            size: Entity.baseParameters.width / 2 / 2, 
                            originalSize: Entity.baseParameters.width / 2 / 2,
                            max: () => (this.spriteParameters.width.size / 3),
                            min: () => (-this.spriteParameters.width.size / 3),
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
                            getSize: () => {
                                if(this.spriteParameters.arms.right.sidePosition.side === 'TOP') {
                                    return this.spriteParameters.height.size / 2;
                                } else if (this.spriteParameters.arms.right.sidePosition.side === 'BOTTOM') {
                                    return -this.spriteParameters.height.size / 2;
                                // WIP
                                // the arm now pivots about point 16/17
                                } else if (this.spriteParameters.arms.right.sidePosition.side === 'LEFT') {
                                    return this.spriteParameters.height.size / 2;
                                } else if (this.spriteParameters.arms.right.sidePosition.side === 'RIGHT') {
                                    return this.spriteParameters.height.size / 2;
                                }
                            }, 
                            originalSize: 0, 
                            // setSize: () => {this.spriteParameters.arms.right.position.y.size = 0;}
                        },
                    },
                    sidePosition: {
                        side: "TOP",
                        changeSide: (nextSide) => {
                            this.spriteParameters.arms.left.sidePosition.side = nextSide;

                        },
                        sideAngle: {
                            size: 0,
                            originalSize: 0,
                            max: () => Math.PI,
                            min: () => 0,
                            checkSet: {
                                max: () => {
                                    const max = this.spriteParameters.arms.right.sidePosition.sideAngle.max();
                                    if (this.spriteParameters.arms.right.sidePosition.sideAngle.size > max) {
                                        this.spriteParameters.arms.right.sidePosition.sideAngle.size = max;
                                        return true;
                                    }
                                },
                                min: () => {
                                    const min = this.spriteParameters.arms.right.sidePosition.sideAngle.min();
                                    if (this.spriteParameters.arms.right.sidePosition.sideAngle.size < min) {
                                        this.spriteParameters.arms.right.sidePosition.sideAngle.size = min;
                                        return true;
                                    }
                                }
                            },
                            changeAngle: (angleDifference: number) => {
                                this.spriteParameters.arms.right.sidePosition.sideAngle.size += angleDifference;
                                return this.spriteParameters.arms.right.sidePosition.sideAngle.checkSet.max() || this.spriteParameters.arms.right.sidePosition.sideAngle.checkSet.min();
                            }
                        },
                        startPoint: {
                            // only for RIGHT and LEFT
                            getCoordinate: () => {
                                if (this.spriteParameters.arms.right.sidePosition.side === 'LEFT') {
                                    return [-this.spriteParameters.width.size / 3, 0];
                                } else if (this.spriteParameters.arms.right.sidePosition.side === 'RIGHT') {
                                    return [this.spriteParameters.width.size / 3, 0];
                                } else {
                                    console.error('side must be LEFT or RIGHT at this point')
                                }
                            }
                        },
                        endPoint: {
                            getCoordinate: () => {
                                if (this.spriteParameters.arms.right.sidePosition.side === 'LEFT') {
                                    return [
                                        -this.spriteParameters.width.size / 3,
                                        0
                                    ];
                                } else if (this.spriteParameters.arms.right.sidePosition.side === 'RIGHT') {
                                    return [
                                        this.spriteParameters.width.size / 3,
                                        0
                                    ];
                                } else {
                                    console.error('side must be LEFT or RIGHT at this point')
                                }
                            }
                        },
                        length: {
                            originalLength: 40,
                            size: 20 * 2, // TODO
                            max: () => (150),
                            min: () => (0),
                            checkSet: {
                                max: () => {
                                    const max = this.spriteParameters.arms.right.sidePosition.length.max();
                                    if( this.spriteParameters.arms.right.sidePosition.length.size > max) {
                                        this.spriteParameters.arms.right.sidePosition.length.size = max;
                                        return true;
                                    }
                                },
                                min: () => {
                                    const min = this.spriteParameters.arms.right.sidePosition.length.min();
                                    if( this.spriteParameters.arms.right.sidePosition.length.size < min) {
                                        this.spriteParameters.arms.right.sidePosition.length.size = min;
                                        return true;
                                    }
                                }
                            },
                            changeLength: (lengthDifference: number) => {
                                this.spriteParameters.arms.right.length.size += lengthDifference;
                                return this.spriteParameters.arms.right.length.checkSet.max() || this.spriteParameters.arms.right.length.checkSet.min();
                            }
                        },
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
                        getCoordinate: () => {
                            if(this.spriteParameters.arms.right.sidePosition.side === 'TOP') {
                                return [
                                    this.spriteParameters.arms.right.position.x.size + Math.cos(this.spriteParameters.arms.right.angle.size) * (this.spriteParameters.arms.right.length.size + this.spriteParameters.height.size / 2),
                                    this.spriteParameters.arms.right.position.y.getSize() + Math.sin(this.spriteParameters.arms.right.angle.size) * (this.spriteParameters.arms.right.length.size)
                                ]
                            } else if (this.spriteParameters.arms.right.sidePosition.side === 'BOTTOM') {
                                return [
                                    this.spriteParameters.arms.right.position.x.size + Math.cos(this.spriteParameters.arms.right.angle.size) * (this.spriteParameters.arms.right.length.size + this.spriteParameters.height.size / 2),
                                    this.spriteParameters.arms.right.position.y.getSize() + Math.sin(this.spriteParameters.arms.right.angle.size) * (this.spriteParameters.arms.right.length.size)
                                ]
                            // WIP
                            } else if (this.spriteParameters.arms.right.sidePosition.side === 'LEFT') {
                                return [
                                    this.spriteParameters.arms.right.position.x.size + Math.cos(this.spriteParameters.arms.right.angle.size) * (this.spriteParameters.arms.right.length.size + this.spriteParameters.height.size / 2),
                                    this.spriteParameters.arms.right.position.y.getSize() - Math.sin(this.spriteParameters.arms.right.angle.size) * (this.spriteParameters.arms.right.length.size + this.spriteParameters.height.size / 2)
                                ]
                            } else if (this.spriteParameters.arms.right.sidePosition.side === 'RIGHT') {
                                return [
                                    this.spriteParameters.arms.right.position.x.size + Math.cos(this.spriteParameters.arms.right.angle.size) * (this.spriteParameters.arms.right.length.size + this.spriteParameters.height.size / 2),
                                    this.spriteParameters.arms.right.position.y.getSize() - Math.sin(this.spriteParameters.arms.right.angle.size) * (this.spriteParameters.arms.right.length.size + this.spriteParameters.height.size / 2)
                                ]
                            }
                        }
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
        this.addLineSprite(new EntitySprite(this.transform, this.spriteParameters));
        
        this.setPossibleActivitiesAndAnimations();
        // this.possibleAnimations.spinningForFun();
    }

    chopTree(tree: Tree) {
        this.possibleActivities.chopTree(tree);
    }

    holdTree(tree: Tree) {
        this.treeHeld = tree;
    }

    setPossibleActivitiesAndAnimations() {
        this.possibleAnimations = {
            moveTo: () => {
                this.currentAnimation = createBobAnimation(this);
            },
            chopping: (tree: Tree) => {
                this.currentAnimation = createChopAnimation(this, tree);
            },
            spinningForFun: () => {
                this.currentAnimation = createSpinningAnimation(this);
            },
            none: () => {
                // standby animation at some point
                this.currentAnimation = null;
            },
            goingToSleep: (bed: Bed) => {
                const bedSpinAnimation = createGoingToBedAnimation(this, bed)
            },
            sleeping: () => {
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
            },
            goToSleep: (bed: Bed) => {
                const goToSleepActivity = createGoToSleepActivity(this, bed);
                
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
        return activity.doActivity(dT);
    }

    update(dT: number) {
        // this would be where an entity get's to decide
        // if it is adding something to the top of the activity queue
        // and if it is deleting something from the activity queue
        if(this.activitiesQueue.length) {
            if(this.doActivity(this.activitiesQueue[0], dT)) {
                this.activitiesQueue.shift();
            }
        }
        this.animate(dT);
    }
}

export type EntitySpriteParameters = {
    armLength: typeof Entity.baseParameters.armLength;
    lineThickness: typeof Entity.baseParameters.lineThickness;

    getDrawCoordinates: () => {
        rightArmEnd: [number, number];
        leftArmEnd: [number, number];
        rightArmStart: [number, number];
        leftArmStart: [number, number];

        curveTopRight: [number, number];
        curvePointTopRight: [number, number];
        curvePointBottomRight: [number, number];
        curveBottomRight: [number, number];

        curveBottomLeft: [number, number];
        curvePointBottomLeft: [number, number];
        curvePointTopLeft: [number, number];
        curveTopLeft: [number, number];

        rightEyePosition: [number, number];
        rightEyeRadius: [number, number];

        leftEyePosition: [number, number];
        leftEyeRadius: [number, number];

        bodyAngle: number;

        lineThickness: number;
    };

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
                    getSize: () => (number),
                    originalSize: number,
                }
            },
            sidePosition: {
                side: 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT';
                changeSide: (side: 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT') => void;
                sideAngle: {
                    size: number;
                    originalSize: number;
                    max: () => number;
                    min: () => number;
                    checkSet: {
                        max: () => boolean;
                        min: () => boolean;
                    },
                    changeAngle: (angleDifference: number) => boolean;
                }
                startPoint: {
                    getCoordinate: () => [number, number];
                }
                endPoint: {
                    getCoordinate: () => [number, number];
                }
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
            }
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
                    getSize: () => (number),
                    originalSize: number,
                },
            },
            sidePosition: {
                side: 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT';
                changeSide: (side: 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT') => void;
                sideAngle: {
                    size: number;
                    originalSize: number;
                    max: () => number;
                    min: () => number;
                    checkSet: {
                        max: () => boolean;
                        min: () => boolean;
                    },
                    changeAngle: (angleDifference: number) => boolean;
                }
                startPoint: {
                    getCoordinate: () => [number, number];
                }
                endPoint: {
                    getCoordinate: () => [number, number];
                }
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
            }
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
         const {
            rightArmEnd,
            leftArmEnd,
            rightArmStart,
            leftArmStart,
            curveTopRight,
            curvePointTopRight,
            curvePointBottomRight,
            curveBottomRight,
            curveBottomLeft,
            curvePointBottomLeft,
            curvePointTopLeft,
            curveTopLeft,
            rightEyePosition,
            rightEyeRadius,
            leftEyePosition,
            leftEyeRadius,
            bodyAngle,
            lineThickness,
        } = spriteParameters.getDrawCoordinates();

        ctx.lineWidth = lineThickness;
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;


        ctx.beginPath();
        // Arms
        ctx.moveTo(rightArmEnd[0], rightArmEnd[1]); // 1
        ctx.lineTo(rightArmStart[0], rightArmStart[1]); // 2 

        ctx.moveTo(leftArmEnd[0], leftArmEnd[1]); // 11
        ctx.lineTo(leftArmStart[0], leftArmStart[1]); // 9
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




// const NORMAL_FRAME_TIME_DELTA = 1000 / 60;