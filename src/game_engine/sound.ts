// finally I think I found an optimizing thing
// I need to load all the sounds at the start of the game
// then play the individual sound
// instead of creating new sounds each time

// to have overlapping sounds, I'll need to pre-create a bunch of them and play them in a loop large enough to handle how many overlaps I might have
// I'll have the game script load up the sounds in to the game engine, then the game engine will grab the next one from each array

export class Sound {
    url: string;
    volume: number;
    muted: boolean; // this is for background sounds not handled by gameEngine yets
    sound: HTMLAudioElement;
    isPlaying: boolean;

    constructor(url: string, volume?: number){
        this.url = url;
        this.volume = volume || 1;
        this.sound = new Audio(this.url);
        this.isPlaying = false;
    }

    play() {
    // if (this.sound) {
    //   this.sound.play()
    // } else {
        // whoops, forgot to fix this part that's actually important
        
        this.sound.volume = this.volume;
        // this needs to be fixed lol
        if(!this.isPlaying || this.sound.ended) this.sound.play();
        this.sound.play();
        this.isPlaying = true;
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
