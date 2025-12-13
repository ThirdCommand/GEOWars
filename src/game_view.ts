import { type AnimationView } from "./AnimationView";
import { SpriteEditorScript } from "./SpriteEditorScript";
import { GEOLevelDesigner } from "./game_engine/Levels/GEOLevelDesigner";
import { type LevelDesigner } from "./game_engine/Levels/LevelDesigner";
import { SpriteEditor } from "./game_engine/SpriteEditor/SpriteEditor";
import { type GameEngine } from "./game_engine/game_engine";
import {type DirectionKey} from "./game_objects/Ship/ship";
import { GEOWarsScript } from "./GEOWarsScript";
import { StrikeTimeScript } from "./StrikeTimeScript";
import { StrikeTimeLevelDesigner } from "./game_engine/Levels/StrikeTimeLevelDesigner";


export class GameView { 
    engine: GameEngine;
    ctx: CanvasRenderingContext2D;
    lastTime: number;
    animationViewGEO: AnimationView;
    animationViewStrikeTime: AnimationView;
    geoLevelDesigner: GEOLevelDesigner;
    strikeTimeLevelDesigner: StrikeTimeLevelDesigner;

    isLevelDesignerOpened: boolean;
    initialUnmute: boolean;
    gameStarted: boolean;
    spriteCreatorOpened: boolean;
    modelClosed: boolean;
    levelDesignLoaded: boolean;
    canvasEl: HTMLCanvasElement;

    openedLevelEditor: LevelDesigner | null;

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
        geoLevelDesigner: GEOLevelDesigner,
        strikeTimeLevelDesigner: StrikeTimeLevelDesigner, 
        animationViewGEO: AnimationView,
        animationViewStrikeTime: AnimationView,

    ) {
        this.ctx = ctx;
        this.engine = engine;
        // this.ship = this.game.addShip(); belongs in game script
        this.canvasEl = canvasEl;
       
        this.geoLevelDesigner = geoLevelDesigner;
        this.strikeTimeLevelDesigner = strikeTimeLevelDesigner;

        this.animationViewGEO = animationViewGEO;
        this.animationViewStrikeTime = animationViewStrikeTime;
        this.bindKeyboardKeys = this.bindKeyboardKeys.bind(this);
        this.initialUnmute = true;
        this.gameStarted = false;
        this.modelClosed = false;
        this.isLevelDesignerOpened = false;
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
        if (!this.isLevelDesignerOpened) {
            // check this function
            // have this be the controlled gameObject instead
            this.engine.updateLeftControlStickListeners(move, down);
            
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
                if(!this.engine.spriteCreatorOpened) {
                    this.initialUnmute = false;
                    this.engine.gameScript.theme.play();
                }
            }

            if (e.key === "m" && down) {
                if(!this.engine.spriteCreatorOpened) {
                    this.engine.toggleMute();
                    if (this.engine.muted) {
                        this.engine.gameScript.theme.mute();
                    } else {
                        this.engine.gameScript.theme.unmute();
                    }
                }
            }
            if(e.key === 'a' || e.key === 's' || e.key === 'w' || e.key === 'd') {
                const unitVector = GameView.MOVES[e.key];
                if (unitVector) {
                    this.updateMovementDirection(e.key, down);
                }
            }
            if(e.key === 'e') {
                this.engine.updateEKeyListeners(down);
            }
            if(e.key === 'f') {
                // TODO hacked in a way to change focus,
                // will need to update 
                this.engine.updateFKeyListener(down);
                this.engine.updateFKeyListeners(down);
            }
            if(e.key === 'l') {
                this.engine.updateLKeyListeners(down);
            }
            if(e.key === 'k') {
                this.engine.updateKKeyListeners(down);
            }
            if(e.key === 'j') {
                this.engine.updateJKeyListeners(down);
            }
            if(e.key === 's') {
                this.engine.updateSKeyListeners(down);
            }
            if(e.key === 'c') {
                this.engine.updateCKeyListeners(down);
            }
            if(e.key === 'o') {
                this.engine.updateOKeyListeners(down);
            }
            if(e.key === 'b') {
                this.engine.updateBKeyListeners(down);
            }
            if(e.key === 'm') {
                this.engine.updateMKeyListeners(down);
            }
            
            if (e.key === "p") {
                this.engine.updateStartButtonListeners(down);
            }

            if (e.key === "ArrowLeft") {
                e.preventDefault()
                this.engine.updateLeftArrowListeners(down);
            }
            if (e.key === "ArrowUp") {
                e.preventDefault()
                this.engine.updateUpArrowListeners(down);
            }
            if (e.key === "ArrowRight") {
                e.preventDefault()
                this.engine.updateRightArrowListeners(down);
            }
            if (e.key === "ArrowDown") {
                e.preventDefault()
                this.engine.updateDownArrowListeners(down);
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
            this.engine.updateMousePos(mousePos, e);
            // I need to add the listener in each level designer instead of throwing it here randomly
            // this.levelDesigner.updateMouseMoveEvent(e);
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
    }

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

    start() {
        this.lastTime = 0;
        this.bindKeyHandlers();

        // Get the modal
        const modal = document.getElementById("myModal");
        const strikeTimeLevelCreator = document.getElementById("StrikeTimeLevelEditor");
        const geoWarsLevelCreator = document.getElementById('GEOWarsLevelEditor')
        const levelEditorCanvas = document.getElementById('LevelEditorCanvas')
        geoWarsLevelCreator.style.display = 'none';
        strikeTimeLevelCreator.style.display = 'none';
        levelEditorCanvas.style.display = 'none';

        // from the first modal menu:
        const startStrikeTimeModal = document.getElementById("startStrikeTime");
        const startGEOWarsButtonModal = document.getElementById("startGEOWars");
        const levelEditorButton = document.getElementById("LevelEditorModal");
        const strikeTimeLevelEditor = document.getElementById("StrikeTimeEditorStart");
        const createSprite = document.getElementById("SpriteEditor");
        // load a level either for level editor or for starting the game
        // will have to put something in the input text to know which game it is
        const loadGameDesignButtonModal = document.getElementById("loadGameDesignModal");

        // this is from the menu inside the game editor itself:
        const startGEOWarsButtonFromLevelEditor = document.getElementById("startGEOWarsGameFromLevelEditor");
        const startStrikeTimeButtonInLevelEditor = document.getElementById("startStrikeTimeGame");
       
        
        // get the text from element: loadGameDesignInputModal

        startGEOWarsButtonFromLevelEditor.onclick = (e) => {
            e.stopPropagation();
            this.gameStarted = true;
            const geoWarsScript = new GEOWarsScript(this.engine);
            this.engine.addGameScript(geoWarsScript);
            this.bindKeyboardKeys();
            this.geoLevelDesigner.startGame(geoWarsScript);
            // requestAnimationFrame(this.animate);
            modal.style.display = "none";
        };

        startStrikeTimeButtonInLevelEditor.onclick = (e) => {
            e.stopPropagation();
            this.gameStarted = true;
            const strikeTimeScript = new StrikeTimeScript(this.engine);
            this.engine.addGameScript(strikeTimeScript);
            this.bindKeyboardKeys();
            this.strikeTimeLevelDesigner.startGame(strikeTimeScript);
            // requestAnimationFrame(this.animate);
            modal.style.display = "none";
        };

        startGEOWarsButtonModal.onclick = (e) => {
            e.stopPropagation();
            this.gameStarted = true;
            const geoWarsScript = new GEOWarsScript(this.engine);
            this.engine.addGameScript(geoWarsScript);
            this.bindKeyboardKeys();
            if(this.levelDesignLoaded){
                this.geoLevelDesigner.startGame(geoWarsScript);
            }
            requestAnimationFrame(this.animate);
            modal.style.display = "none";
        }

        startStrikeTimeModal.onclick = (e) => {
            e.stopPropagation();
            this.gameStarted = true;
            this.bindKeyboardKeys();
            const strikeTimeScript = new StrikeTimeScript(this.engine);
            this.engine.addGameScript(strikeTimeScript);
            if(this.levelDesignLoaded){
                this.strikeTimeLevelDesigner.startGame(strikeTimeScript);
            }
            requestAnimationFrame(this.animate);
            modal.style.display = "none";
        };

        levelEditorButton.onclick = (e) => {
            e.stopPropagation();
            this.gameStarted = true;
            this.isLevelDesignerOpened = true;
            this.openedLevelEditor = this.geoLevelDesigner;
            this.openedLevelEditor.openLevelDesigner();
            this.bindKeyboardKeys();
            requestAnimationFrame(this.animate);
            modal.style.display = "none";
            geoWarsLevelCreator.style.display = "flex";
            strikeTimeLevelCreator.style.display = "none";
            levelEditorCanvas.style.display = "flex";
            this.modelClosed = true;
            setTimeout(() => {
                this.openedLevelEditor.isLevelDesignerOpened = true;
                this.engine.isLevelDesignerOpened = true;
                this.engine.addGameScript(this.openedLevelEditor);
            },50);
        };
        
        strikeTimeLevelEditor.onclick = (e) => {
            e.stopPropagation();
            this.gameStarted = true;
            this.isLevelDesignerOpened = true;
            this.strikeTimeLevelDesigner.openLevelDesigner();
            this.openedLevelEditor = this.strikeTimeLevelDesigner;
            this.bindKeyboardKeys();

            requestAnimationFrame(this.animate);

            modal.style.display = "none";
            geoWarsLevelCreator.style.display = "none";
            strikeTimeLevelCreator.style.display = "flex";
            levelEditorCanvas.style.display = 'flex';
            this.modelClosed = true;

            setTimeout(() => {
                this.engine.isLevelDesignerOpened = true;
                this.engine.addGameScript(this.strikeTimeLevelDesigner);
            },50);
        };

        createSprite.onclick = (e) => {
            e.stopPropagation();
            this.spriteCreatorOpened = true;
            this.bindKeyboardKeys();
            requestAnimationFrame(this.animate);
            modal.style.display = "none";
            this.modelClosed = true;
                const gameScript = new SpriteEditorScript(this.engine);
                this.engine.addGameScript(gameScript);
                new SpriteEditor(this.engine);
        };
        // TODO: will need to split this up into one or the other 
        loadGameDesignButtonModal.onclick = (e) => {
            e.stopPropagation();
            const json = (document.getElementById("loadGameDesignInputModal") as HTMLInputElement).value;

            if(json.includes('GEOWars')) this.geoLevelDesigner.loadGameDesign(json);
            if(json.includes('StrikeTime')) this.strikeTimeLevelDesigner.loadGameDesign(json);
            
            this.levelDesignLoaded = true;

        };
        // loadGameDesignButtonModal.onclick = (e) => {
        //     e.stopPropagation();
        //     const json = (document.getElementById("loadGameDesignInputModal") as HTMLInputElement).value;
        //     // will need two different buttons I think for accepting a loading string
        //     this.levelDesigner.loadGameDesign(json);
        //     this.levelDesignLoaded = true;
        // };
    }

    animate(time: number) {
        const timeDelta = time - this.lastTime;
        // console.log(`animate time delta: ${timeDelta}`, `time: ${time}`, `lastTime: ${this.lastTime}`)
        this.engine.tick(timeDelta);
        this.openedLevelEditor?.animate(timeDelta);
        this.animationViewGEO.animate(timeDelta);
        this.animationViewStrikeTime.animate(timeDelta);
        this.animationViewStrikeTime.update(timeDelta);
        // this.animationViewStrikeTime.updatePhysics(timeDelta);
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
