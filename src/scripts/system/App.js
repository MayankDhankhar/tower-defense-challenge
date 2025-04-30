import * as PIXI from "pixi.js";
import { Sprite, Application } from 'pixi.js';
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { Loader } from "./Loader";
import { ScenesManager } from "./ScenesManager";
import { EventEmitter } from "events";

class GameApplication extends EventEmitter {

    gameWidth = 960;
    gameHeight = 540;
    pauseExecution = false;
    pauseInitialWave = true;

    async run(config) {
        gsap.registerPlugin(PixiPlugin);
        PixiPlugin.registerPIXI(PIXI);

        this.config = config;

        this.app = new Application();
        await this.app.init({ width: this.gameWidth, height: this.gameHeight});
        document.body.appendChild(this.app.canvas);

        this.scenes = new ScenesManager();
        this.app.stage.interactive = true;
        this.app.stage.addChild(this.scenes.container);

        window.addEventListener('resize', () => this.resizeHandler(), false);
        this.resizeHandler();

        this.loader = new Loader();
        this.loader.preload().then(assets => this.start(assets));

    }

    resizeHandler() {
        const scaleFactor = Math.min(
          window.innerWidth / this.gameWidth,
          window.innerHeight / this.gameHeight
        );
        const newWidth = Math.ceil(this.gameWidth * scaleFactor);
        const newHeight = Math.ceil(this.gameHeight * scaleFactor);
        
        this.app.canvas.style.width = `${newWidth}px`;
        this.app.canvas.style.height = `${newHeight}px`;
      
        this.app.renderer.resize(newWidth, newHeight);
        this.app.stage.scale.set(scaleFactor);
      };

    sprite(key) {
        return new Sprite(this.assets[key]);
    }

    start(assets) {
        this.assets = assets;
        this.scenes.start("Game");
    }
}

export const App = new GameApplication();
