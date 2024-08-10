import { AnimationView } from "../../AnimationView";
import { GameEngine } from "../../game_engine/game_engine";
import { GameObject } from "../../game_engine/game_object";
import { LineSprite } from "../../game_engine/line_sprite";
import { type Transform } from "../../game_engine/transform";

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
    constructor(engine: GameEngine | AnimationView, pos: [number, number]) {
        super(engine);
        this.transform.pos = pos;
        this.transform.angle = 0;
        this.addLineSprite(new TreeSprite(this.transform));
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
    }
    update() {}
    animate() {}

    exist() {
        this.addCollider("General", this, 5);
    }
}

export class TreeSprite extends LineSprite {
    color: string;
    width: number;
    height: number;
    constructor(transform: Transform, spawningScale = 1) {
        super(transform);
        this.spawningScale = spawningScale;
        this.transform = transform;
        this.color = "green";
        this.width = 30;
        this.height = 4/5 * this.width;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const pos = this.transform.absolutePosition();
        const w = this.width * this.spawningScale;
        const h = this.height * this.spawningScale;
        
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        
        this.drawTree(ctx, h, w);
        ctx.restore();
    }

    drawTree(ctx: CanvasRenderingContext2D, h: number, w: number) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#097969";
        ctx.beginPath();
        ctx.moveTo(0, -h/2); // 1
        ctx.lineTo(3/10 * w, -h/4); // 2
        ctx.lineTo(1/5 * w, -h/4); // 3
        ctx.lineTo(2/5 * w, 0); // 4
        ctx.lineTo(3/10 * w, 0); // 5
        ctx.lineTo(1/2 * w, h/4); // 6
        ctx.lineTo(1/30 * w, h/4); // 7
        ctx.stroke();

        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "#E4D00A";
        ctx.beginPath();
        ctx.moveTo(1/30 * w, h/4);
        ctx.lineTo(1/30 * w, h/2); // 8
        ctx.lineTo(-1/30 * w, h/2); // 9
        ctx.lineTo(-1/30 * w, h/4); // 10
        ctx.stroke();

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#097969";
        ctx.beginPath();
        ctx.moveTo(-1/30 * w, h/4);
        ctx.lineTo(-1/2 * w, h/4); // 11
        ctx.lineTo(-3/10 * w, 0); // 12
        ctx.lineTo(-2/5 * w, 0); // 13
        ctx.lineTo(-1/5 * w, -h/4); // 14
        ctx.lineTo(-3/10 * w, -h/4); // 15
        ctx.lineTo(0, -h/2); // 1
        ctx.stroke();
    }
}