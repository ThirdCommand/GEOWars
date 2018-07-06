class Sound {
  constructor(url, volume = 1){
    this.url = url;
    this.volume = volume;
  }
  play() {
    this.sound = new Audio(url);
    this.sound.volume = volume;
    this.sound.play();
  }
}

module.exports = Sound;