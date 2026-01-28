
type ColorType =  "rgb" | "rgba" | "hsl" | "hsla"



export class Color {

    static GetColorRange(baseHue: number, hueRange: number): number {
        return baseHue - hueRange / 2 + hueRange * Math.random();
    }

    r: number;
    g: number;
    b: number;
    a: number;
    h: number;
    s: number;
    l: number;

    static COLOR_TYPES = ["rgb", "rgba", "hsl", "hsla"];

    colorType: ColorType;
    constructor(colorType: ColorType, colorNumbers: [number, number, number, number?]){

        if (!Color.COLOR_TYPES.includes(colorType)) {
            new Error("Color Object given unsupported color type");
        }

        this.colorType = colorType;

        this.extractColorInfo(colorType, colorNumbers);
    }

    dup(): Color {
        let dupColors: [number, number, number, number?];
        const dupColorType = this.colorType;
        if (this.colorType === "rgb") {
            dupColors = [this.r, this.g, this.b];
        } else if (this.colorType === "rgba") {
            dupColors = [this.r, this.g, this.b, this.a];
        } else if (this.colorType === "hsl") {
            dupColors  = [this.h, this.s, this.l];
        } else if (this.colorType === "hsla") {
            dupColors = [this.h, this.s, this.l, this.a];
        }
        const newColor = new Color(dupColorType, dupColors);
        return newColor;
    }

    serializeColor(): [ColorType, [number, number, number, number?]] {
        let dupColors: [number, number, number, number?];
        const dupColorType = this.colorType;
        if (this.colorType === "rgb") {
            dupColors = [this.r, this.g, this.b];
        } else if (this.colorType === "rgba") {
            dupColors = [this.r, this.g, this.b, this.a];
        } else if (this.colorType === "hsl") {
            dupColors  = [this.h, this.s, this.l];
        } else if (this.colorType === "hsla") {
            dupColors = [this.h, this.s, this.l, this.a];
        }
        return [dupColorType, dupColors];
    }

    extractColorInfo(colorType: ColorType, colorNumbers: [number, number, number, number?]){
        if (this.colorType === "rgb"){
            this.r = colorNumbers[0];
            this.g = colorNumbers[1];
            this.b = colorNumbers[2];
        } else if (this.colorType === "rgba"){
            this.r = colorNumbers[0];
            this.g = colorNumbers[1];
            this.b = colorNumbers[2];
            this.a = colorNumbers[3];
        } else if (this.colorType === "hsl"){
            this.h = colorNumbers[0];
            this.s = colorNumbers[1];
            this.l = colorNumbers[2];
        } else if (this.colorType === "hsla"){
            this.h = colorNumbers[0];
            this.s = colorNumbers[1];
            this.l = colorNumbers[2];
            this.a = colorNumbers[3];
        } 
    }

    evaluateColor(){
        if (this.colorType === "rgb"){
            return `rbg(${this.r},${this.g},${this.b},)`;
        } else if (this.colorType === "rgba"){
            return `rbg(${this.r},${this.g},${this.b},${this.a})`;
        } else if (this.colorType === "hsl"){
            return `hsl(${this.h},${this.s}%,${this.l}%`;
        } else if (this.colorType === "hsla") {
            return `hsla(${this.h}, ${this.s}%, ${this.l}%, ${this.a}`;
        }
    }
}