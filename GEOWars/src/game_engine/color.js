
class Color {
  constructor(colorSpec){
    this.colorType = Object.keys(colorSpec)[0]
    this.creationErrorCheck(colorSpec)
    this.extractColorInfo(colorSpec)
  }

  creationErrorCheck(colorSpec){
    if (Object.keys(colorSpec).length !== 1) {
      new Error("Color object accepts one color type")
    }
    if (!Color.COLOR_TYPES.includes(this.colorType)) {
      new Error("Color Object given unsupported color type")
    }
  }

  dup(){
    let dupSpec = {}
    if (this.colorType === "rgb") {
      dupSpec["rgb"]  = [this.r, this.g, this.b]
    } else if (this.colorType === "rgba") {
      dupSpec["rgba"] = [this.r, this.g, this.b, this.a]
    } else if (this.colorType === "hsl") {
      dupSpec["hsl"]  = [this.h, this.s, this.l]
    } else if (this.colorType === "hsla") {
      dupSpec["hsla"] = [this.h, this.s, this.l, this.a]
    }
    let newColor = new Color(dupSpec)
    return newColor
  }

  extractColorInfo(colorSpec){
    if (this.colorType === "rgb"){
      this.r = colorSpec[this.colorType][0]
      this.g = colorSpec[this.colorType][1]
      this.b = colorSpec[this.colorType][2]
    } else if (this.colorType === "rgba"){
      this.r = colorSpec[this.colorType][0]
      this.g = colorSpec[this.colorType][1]
      this.b = colorSpec[this.colorType][2]
      this.a = colorSpec[this.colorType][3]
    } else if (this.colorType === "hsl"){
      this.h = colorSpec[this.colorType][0]
      this.s = colorSpec[this.colorType][1]
      this.l = colorSpec[this.colorType][2]
    } else if (this.colorType === "hsla"){
      this.h = colorSpec[this.colorType][0]
      this.s = colorSpec[this.colorType][1]
      this.l = colorSpec[this.colorType][2]
      this.a = colorSpec[this.colorType][3]
    } 
    colorSpec[this.colorType]
  }

  evaluateColor(){
    if (this.colorType === "rgb"){
      return `rbg(${this.r},${this.g},${this.b},)`
    } else if (this.colorType === "rgba"){
      return `rbg(${this.r},${this.g},${this.b},${this.a})`
    } else if (this.colorType === "hsl"){
      return `hsl(${this.h},${this.s}%,${this.l}%`
    } else if (this.colorType === "hsla") {
      return `hsla(${this.h}, ${this.s}%, ${this.l}%, ${this.a}`
    }
  }
}
Color.COLOR_TYPES = ["rgb", "rgba", "hsl", "hsla"]

module.exports = Color;