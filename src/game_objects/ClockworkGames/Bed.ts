import { type AnimationView } from "../../AnimationView";
import { Animation } from "../../game_engine/EntityState/Animate";
import { type GameEngine } from "../../game_engine/game_engine";
import {GameObject} from "../../game_engine/game_object";
import {LineSprite} from "../../game_engine/line_sprite";
import { type Transform } from "../../game_engine/transform";
import { EntitySpriteParameters, type Entity } from "./Entity/Entity";

export type BedSpriteParameters = {
    width: {
        size: number;
        originalSize: number;
    },
    height: {
        size: number;
        originalSize: number;
    },
    bed: {
        topLeft: { // 1
            x: number;
            y: number;
        },
        cornerRadius: number;
        topRight: { // 2
            x: number;
            y: number;
        }, 
        bottomRight: { // 3
            x: number;
            y: number;
        },
        bottomLeft: { // 4
            x: number;
            y: number;
        }
    },

    covers: {
        yOffset: {
            size: number,
            originalSize: number,
            min(): number;
            max(): number;
            checkSet: {
                max(): boolean;
                min(): boolean;
            };
            changeSize(difference: number): void;
        },
        topLeft: {
            x: number;
            y: number;
        },
        topRight: {
            x: number;
            y: number;
        },
        bottomRight: {
            x: number;
            y: number;
        },
        bottomLeft: {
            x: number;
            y: number;
        },
        height: number;
    }
};

export class Bed extends GameObject {
    width: number;
    height: number;
    entity: Entity;
    spriteParameters: BedSpriteParameters;
    constructor(engine: GameEngine | AnimationView, pos: [number, number, number?], entity?: Entity) {
        super(engine);
        this.transform.pos = pos;
        this.transform.angle = 0;
        this.width =  70 * 8/6;
        this.height = this.width * 6/4;
        
        this.entity = entity;

        const [h, w]= [this.height, this.width];
        
        this.spriteParameters = {
            width: {
                size: w,
                originalSize: w
            },
            height: {
                size: h,
                originalSize: h
            },
            bed: {
                topLeft: { // 1
                    x: -w / 2,
                    y: -h / 2,
                },
                cornerRadius: 10,
                topRight: { // 2
                    x: w / 2,
                    y: -h / 2,
                }, 
                bottomRight: { // 3
                    x: w / 2,
                    y: h / 2,
                },
                bottomLeft: { // 4
                    x: -w / 2,
                    y: h / 2
                }
            },

            covers: {
                yOffset: {
                    size: 0,
                    originalSize: 0,
                    min: () => (0),
                    max: () => (2.5 / 12 * h),
                    checkSet: {
                        max: () => {
                            const max = this.spriteParameters.covers.yOffset.max();
                            if(this.spriteParameters.covers.yOffset.size > max){
                                this.spriteParameters.covers.yOffset.size = max;
                                return true;
                            }
                        },
                        min: () => {
                            const min = this.spriteParameters.covers.yOffset.min();
                            if(this.spriteParameters.covers.yOffset.size <= min){
                                this.spriteParameters.covers.yOffset.size = min;
                                return true;
                            }
                        }
                    },
                    changeSize: (difference) => {
                        this.spriteParameters.covers.yOffset.size += difference;
                        return this.spriteParameters.covers.yOffset.checkSet.max() || this.spriteParameters.covers.yOffset.checkSet.min();
                    }
                },
                topLeft: {
                    x: -w / 2,
                    y:  h / 6,
                },
                topRight: {
                    x: w / 2,
                    y: h / 6
                },
                bottomRight: {
                    x: w / 2,
                    y: -9 / 16 * h
                },
                bottomLeft: {
                    x: -w / 2,
                    y: -9 / 16 * h
                },
                height: 3.50 / 6 * h
            }
        };

        this.addLineSprite(new BedSprite(this.transform,this.spriteParameters));
    }

    update() {
        this.animate();
    }

    animate() {
        // const time = deltaTime / NORMAL_FRAME_TIME_DELTA / 5;

        const bodySpinAngle = this.entity.spriteParameters.bodyAngle.size;

        const percentageCovered = bodySpinAngle / Math.PI;

        this.spriteParameters.covers.yOffset.size = -percentageCovered * this.spriteParameters.covers.yOffset.max();

    } 

    exist() {
        this.addCollider("General", this, 5);
    }
}

export const bedSpinAnimator = (
    dT: number, 
    animationState: EntitySpriteParameters["bodyAngle"], 
    spriteParameters: BedSpriteParameters
): false => {
    const bodySpinAngle = animationState.size;

    const percentageCovered = bodySpinAngle / Math.PI;

    spriteParameters.covers.yOffset.size = -percentageCovered * spriteParameters.covers.yOffset.max();
    return false;
};

export const createBedSpinAnimation = (bed: Bed, entity: Entity) => {
    
    return new Animation<EntitySpriteParameters["bodyAngle"], BedSpriteParameters>(
        'BedSpin', entity.spriteParameters.bodyAngle, bedSpinAnimator,
    );
};

export class BedSprite extends LineSprite {
    color: string;
    spriteParameters: BedSpriteParameters;
    constructor(transform: Transform, spriteParameters: BedSpriteParameters) {
        super(transform);
        this.spriteParameters = spriteParameters;
        this.spawningScale = 1;
        this.transform = transform;
        this.color = "#FFFFFF";
    }

    draw(ctx: CanvasRenderingContext2D) {
        const pos = this.transform.absolutePosition();

        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.angle);

        this.drawBed(ctx);
        ctx.restore();
    }

    drawBed(ctx: CanvasRenderingContext2D) {
        const bed = this.spriteParameters.bed;
        const covers = this.spriteParameters.covers;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.roundRect(bed.topLeft.x, bed.topLeft.y, this.spriteParameters.width.size, this.spriteParameters.height.size, [bed.cornerRadius, bed.cornerRadius, 0, 0]);
        ctx.stroke();

        ctx.fillStyle = this.color;
        ctx.fillRect(covers.topLeft.x, covers.topLeft.y + covers.yOffset.size, this.spriteParameters.width.size, this.spriteParameters.covers.height);
    }
}



// const NORMAL_FRAME_TIME_DELTA = 1000 / 60;