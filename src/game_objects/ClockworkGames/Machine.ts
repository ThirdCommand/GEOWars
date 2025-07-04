import { AnimationView } from "../../AnimationView";
import { GameEngine } from "../../game_engine/game_engine";
import { GameObject } from "../../game_engine/game_object";
import { LineSprite } from "../../game_engine/line_sprite";
import { Transform } from "../../game_engine/transform";
import { TreeGrip } from "./SawMachine/TreeGrip";

type calculatedMachineCoordinates = {
    driverArmCoordinate: [number, number],
    rockerCoordinate: [number, number],
    couplerPoint: [number, number]
}

// make a class function later
const getCoordinates = (
    machineAngle: number, 
    driverAngle: number, 
    body: number,
    driverArm: number,
    coupler: number,
    rocker: number,
    couplerPointLength: number,
    couplePointHeight: number,
    mirrored: boolean
): calculatedMachineCoordinates => {
    const a = driverArm;
    const b = coupler;
    const c = rocker;
    const d = body;
    const theta_2 = driverAngle;
    const theta_1 = machineAngle;

    const A_x = a * Math.cos(theta_2);
    const A_y = a * Math.sin(theta_2);
    const S = (a ** 2 - b ** 2 + c ** 2 - d ** 2) / (2 * (A_x - d));
    const Q = 2 * A_y * (d - S) / (A_x - d);
    const R = (d - S) ** 2 - c ** 2;
    const P = A_y ** 2 / ((A_x - d) ** 2) + 1;
    const B_y = (-Q - Math.sqrt(Q ** 2 - 4 * P * R)) / (2 * P);
    const B_x = S - A_y * B_y / (A_x - d);



    const couplerAngle = Math.atan2(
        B_y - A_y,
        B_x - A_x 
    )

    const coupler_x = A_x + couplerPointLength * Math.cos(couplerAngle) + couplePointHeight * Math.sin(couplerAngle);
    const coupler_y = A_y - couplePointHeight * Math.cos(couplerAngle) + couplerPointLength * Math.sin(couplerAngle);
    const mirrorFactor = mirrored ? -1 : 1;
    return {
        driverArmCoordinate: [mirrorFactor * A_x, A_y],
        rockerCoordinate: [mirrorFactor * B_x, B_y],
        couplerPoint: [mirrorFactor * coupler_x, coupler_y],
    };
}

export type MachinerySpriteParameters = {
    machineAngle: number;
    driverAngle: number;
    body: number;
    driverArm: number;
    coupler: number;
    rocker: number;
    couplerPointLength: number,
    couplerPointHeight: number,
    get_AB_Coordinates: () => calculatedMachineCoordinates,
    mirrored: boolean,
}

export class Machinery extends GameObject {
    spriteParameters: MachinerySpriteParameters;

    treeGripper: TreeGrip;
    constructor (engine: GameEngine | AnimationView, pos: [number, number], mirrored: boolean) {
        super(engine);
        this.transform.pos = [pos[0] - 50, pos[1]]
        const scale = 0.2

        this.spriteParameters = {
            machineAngle: 0, // reference frame angle
            driverAngle: Math.PI/3, // theta_2
            body: 478 * scale, // d 
            driverArm: 150 * scale,
            coupler: 222 * scale,
            rocker: 407 * scale,
            couplerPointLength: 372 * scale,
            couplerPointHeight: 200 * scale,
            mirrored: mirrored || false,
            get_AB_Coordinates:  () => getCoordinates(this.spriteParameters.machineAngle, this.spriteParameters.driverAngle, this.spriteParameters.body, this.spriteParameters.driverArm, this.spriteParameters.coupler, this.spriteParameters.rocker, this.spriteParameters.couplerPointLength,  this.spriteParameters.couplerPointHeight, this.spriteParameters.mirrored)
        };
        this.addLineSprite(new MachineryLineSprite(this.transform, this.spriteParameters));
        const gripAngle = !mirrored ?  Math.PI / 2 : 3 * Math.PI/2;
        this.treeGripper = new TreeGrip(engine,[0,0], gripAngle);
    }

    update(dT: number) {
        this.spriteParameters.driverAngle += dT * 0.001;
        this.spriteParameters.driverAngle = this.spriteParameters.driverAngle > 2 * Math.PI ? 0 : this.spriteParameters.driverAngle
        // could cache last used value;
        const couplerPoint = this.spriteParameters.get_AB_Coordinates().couplerPoint;
        this.treeGripper.transform.pos = [this.transform.pos[0] + couplerPoint[0],this.transform.pos[1] + couplerPoint[1]];

    }

    animate(dT: number) {
        this.spriteParameters.driverAngle += dT * 0.001;
    }

}

export class MachineryLineSprite extends LineSprite {
    spriteParameters: MachinerySpriteParameters;
    constructor(transform: Transform, spriteParameters: MachinerySpriteParameters) {
        super(transform);
        this.spriteParameters = spriteParameters;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const pos = this.transform.absolutePosition();
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.spriteParameters.machineAngle);
        
        this.drawMachine(ctx);
        ctx.restore();
    }

    drawMachine(ctx: CanvasRenderingContext2D) {
        const {driverArmCoordinate, rockerCoordinate, couplerPoint} = this.spriteParameters.get_AB_Coordinates();
        const mirrorFactor = this.spriteParameters.mirrored ? -1 : 1;
        ctx.strokeStyle = "#5D3FD3"
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.lineTo(0,0);
        ctx.lineTo(...driverArmCoordinate);
        ctx.lineTo(...rockerCoordinate);
        ctx.lineTo(mirrorFactor * this.spriteParameters.body,0);
        // ctx.lineTo(0,0);
        ctx.stroke();

        ctx.strokeStyle = "#6D3FD3"
        ctx.beginPath();
        ctx.moveTo(...driverArmCoordinate);
        ctx.lineTo(...couplerPoint);
        ctx.lineTo(...rockerCoordinate);
        ctx.stroke();
    }

}