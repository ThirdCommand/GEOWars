
export class Sound {
    constructor(url, volume = 1, muted = false){
        this.url = url;
        this.volume = volume;
        this.muted = muted;
    }

    play() {
    // if (this.sound) {
    //   this.sound.play()
    // } else {
        this.sound = new Audio(this.url);
        this.sound.volume = this.volume;
        this.sound.play();
    // }
    }
    toggleMute(){
        if(this.sound){
            this.muted ? this.unmute() : this.mute();
        }
    }

    unmute(){
        if(this.sound){
            this.muted = false; 
            this.sound.volume = this.volume;
        }
    }

    mute(){
        if(this.sound){
            this.muted = true;
            this.sound.volume = 0;
        }
    }

    pause(){
        if(this.sound){
            this.sound.pause();
        } 
    }
    unPause(){
        if (this.sound) {
            this.sound.play();
        }
    }
}
