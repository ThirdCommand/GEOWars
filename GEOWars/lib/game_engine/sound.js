
class Sound {
  constructor(url, volume = 1, muted = false){
    this.url = url;
    this.volume = volume;
    this.muted = muted;
  }

  play() {
    this.sound = new Audio(this.url);
    this.sound.volume = this.volume;
    this.sound.play();
  }
  toggleMute(){
    this.muted ? this.unmute() : this.mute()
  }

  unmute(){
    this.muted = false 
    this.sound.volume = this.volume
  }

  mute(){
    this.muted = true
    this.sound.volume = 0
  }

  pause(){
    this.sound.pause()
  }
}

module.exports = Sound;