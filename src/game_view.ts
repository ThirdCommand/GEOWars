import { type AnimationView } from "./AnimationView";
import { type LevelDesigner } from "./game_engine/Levels/levelDesigner";
import { type GameEngine } from "./game_engine/game_engine";
import {type DirectionKey} from "./game_objects/Ship/ship";


export class GameView { engine: GameEngine;
    ctx: CanvasRenderingContext2D;
    lastTime: number;
    animationView: AnimationView;
    levelDesigner: LevelDesigner;

    gameEditorOpened: boolean;
    initialUnmute: boolean;
    gameStarted: boolean;
    modelClosed: boolean;
    levelDesignLoaded: boolean;
    canvasEl: HTMLCanvasElement;

    static MOVES = {
        s: [0, 1],
        a: [-1, 0],
        w: [0, -1],
        d: [1, 0],
    };

    constructor(
        engine: GameEngine, 
        ctx: CanvasRenderingContext2D, 
        canvasEl: HTMLCanvasElement, 
        levelDesigner: LevelDesigner, 
        animationView: AnimationView,
    ) {
        this.ctx = ctx;
        this.engine = engine;
        // this.ship = this.game.addShip(); belongs in game script
        this.canvasEl = canvasEl;
       
        this.levelDesigner = levelDesigner;
        this.animationView = animationView;
        this.bindKeyboardKeys = this.bindKeyboardKeys.bind(this);
        this.initialUnmute = true;
        this.gameStarted = false;
        this.modelClosed = false;
        this.gameEditorOpened = false;
        this.levelDesignLoaded = true;
        this.lastTime = 0;
        this.animate = this.animate.bind(this);
    }

    bindKeyboardKeys() {
        window.addEventListener("keydown", this.createKeyEvent(true), true);
        window.addEventListener("keyup", this.createKeyEvent(false), true);
    }

    // TODO move game specific logic
    // TODO this is somehow supposed to handle both mouse and controller inputs
    // but I only see it being use as a string at the moment

    updateMovementDirection(move: DirectionKey, down: boolean) {
        if (!this.gameEditorOpened) {
            // check this function
            this.engine.gameScript.ship.updateLeftControlStickInput(move, down);
        }
    }

    /*
    if true, change movement direction to the direction
    if false, remove movement direction if it's the 
    same as the current movement direction
  */

    createKeyEvent(down: boolean) {
        return (e: KeyboardEvent) => {
            // if (e.key === "p"){
            //   this.engine.togglePause()
            // }
            if (e.key === "m" && this.initialUnmute) {
                this.initialUnmute = false;
                this.engine.gameScript.theme.play();
            }

            if (e.key === "m" && down) {
                this.engine.toggleMute();
                if (this.engine.muted) {
                    this.engine.gameScript.theme.mute();
                } else {
                    this.engine.gameScript.theme.unmute();
                }
            }
            if(e.key === 'a' || e.key === 's' || e.key === 'w' || e.key === 'd') {
                const unitVector = GameView.MOVES[e.key];
                if (unitVector) {
                    this.updateMovementDirection(e.key, down);
                }
            }
            
            if (e.key === "p") {
                this.engine.updateStartButtonListeners(down);
            }
        };
    }

    bindKeyHandlers() {
        // Object.keys(this.MOVES).forEach((k) => {
        //   const move = this.MOVES[k];
        //   key(k, () => {
        //     this.engine.gameScript.ship.updateLeftControlStickInput(move);
        //   });
        // });

        // key("m", () => {
        //   engine.muted = !engine.muted;
        //   if (engine.muted) {
        //     this.theme.pause();
        //   } else {
        //     this.theme.play();
        //   }
        // })

        window.addEventListener("mousemove", (e: MouseEvent) => {
            // const x = { x: e.layerX }; // TODO mouse position layerX vs offsetX
            // const y = { y: e.layerY }; // TODO mouse position
            // TODO test with firefox 
            const mousePos: [number, number] = [e.offsetX, e.offsetY]; // TODO mouse position layerX vs offsetX
            this.engine.updateMousePos(mousePos);
            this.levelDesigner.mouseMoveEvent(e);
            // ship.setFireAngle(mousePos); add to game script event listener thing
        });

        window.addEventListener("click", (e) => {
            this.engine.mouseClicked(e);
        });

        window.addEventListener("mousedown", (e) => {
            this.engine.mouseDown(e);
        });

        window.addEventListener("mouseup", (e) => {
            this.engine.mouseUnClicked(e);
        });

        window.addEventListener("dblclick", (e) => {
            this.engine.mouseDoubleClicked(e);
        });

        // function preventDefault(e) {
        //   e = e || window.event;
        //   if (e.preventDefault)
        //     e.preventDefault();
        //   e.returnValue = false;
        // }

        // function disableScroll() {
        //   if (window.addEventListener) // older FF
        //     window.addEventListener('DOMMouseScroll', preventDefault, false);
        //   // window.onwheel = preventDefault; // modern standard
        //   // window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        //   // window.ontouchmove = preventDefault; // mobile
        //   // document.onkeydown = preventDefaultForScrollKeys;
        // }

    // if (window.addEventListener) // older FF
    //   window.addEventListener('DOMMouseScroll', preventDefault, false);
    // window.onwheel = preventDefault; // modern standard
    // window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    // window.ontouchmove = preventDefault; // mobile
    }

    start() {
        this.lastTime = 0;
        this.bindKeyHandlers();

        // Get the modal
        const modal = document.getElementById("myModal");

        // Get the button that opens the modal
        // var btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        // const xclose = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        // xclose.onclick = (e) => {
        //     e.stopPropagation();
        //     modal.style.display = "none";
        //     this.modelClosed = true;
        // };

        // When the user clicks anywhere outside of the modal, close it
        //  window.addEventListener('click', (e) => {
        // window.onclick = (event) => {
        //     if (this.modelClosed && !this.gameStarted) {
        //         this.gameStarted = true;
        //         this.bindKeyboardKeys();
        //         requestAnimationFrame(this.animate);
        //     }
        //     if (event.target == modal) {
        //         this.modelClosed = true;
        //         modal.style.display = "none";
        //     }
        // };

        // add listeners to buttons on the modal
        // have them do the same things they do now.. 
        // but without the strange order that's required 
        // for starting the game after loading one, or starting the default one
        const startButtonModal = document.getElementById("startGameModal");
        // open the level editor
        const levelEditorButton = document.getElementById("LevelEditorModal");
        
        // load a level either for level editor or for starting the game
        const loadGameDesignButtonModal = document.getElementById("loadGameDesignModal");
        // get the text from element: loadGameDesignInputModal

        startButtonModal.onclick = (e) => {
            e.stopPropagation();
            this.gameStarted = true;
            this.bindKeyboardKeys();
            if(this.levelDesignLoaded){
                this.levelDesigner.startGame();
            }
            requestAnimationFrame(this.animate);
            modal.style.display = "none";
        };

        levelEditorButton.onclick = (e) => {
            e.stopPropagation();
            this.gameStarted = true;
            this.gameEditorOpened = true;
            this.bindKeyboardKeys();
            requestAnimationFrame(this.animate);
            modal.style.display = "none";
            this.modelClosed = true;
            setTimeout(() => {
                this.levelDesigner.gameEditorOpened = true;
                this.engine.gameEditorOpened = true;
            },50);
        };

        loadGameDesignButtonModal.onclick = (e) => {
            e.stopPropagation();
            const json = (document.getElementById("loadGameDesignInputModal") as HTMLInputElement).value;
            this.levelDesigner.loadGameDesign(json);
            this.levelDesignLoaded = true;
        };

    }

    animate(time: number) {
        const timeDelta = time - this.lastTime;
        this.engine.tick(timeDelta);
        this.levelDesigner.animate();
        this.animationView.animate(timeDelta);
        this.lastTime = time;
        // every call to animate requests causes another call to animate
        requestAnimationFrame(this.animate);
    }
}

// const KEYMAP = {
//     87: "W",
//     82: "R",
//     90: "Z",
//     88: "X",
//     67: "C",
//     70: "F",
//     83: "S",
//     69: "E",
//     65: "D",
//     68: "A",
// };

// GameView.MOVES = {
//     s: [0, 1],
//     a: [-1, 0],
//     w: [0, -1],
//     d: [1, 0],
// };
