class Sound {
  constructor(url, volume = 1){
    this.url = url;
    this.volume = volume;
  }
  play() {
    this.sound = new Audio(this.url);
    this.sound.volume = this.volume;
    this.sound.play();
  }
}

module.exports = Sound;