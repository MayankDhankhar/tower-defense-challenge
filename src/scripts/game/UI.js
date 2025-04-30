import * as PIXI from "pixi.js";
import { App } from "../system/App";
import { gsap } from "gsap";

export class UI {
    constructor(player, enemies) {
        this.player = player;
        this.enemies = enemies;
        this.container = new PIXI.Container();
        this.config = App.config.ui;
        this.create();
        this.update();
    }

    createCoinsIcon() {
        this.coins = App.sprite("coin");
        this.coins.anchor.set(0.5);
        this.coins.scale.set(0.8);
        this.coins.x = this.config.coinsIcon.x;
        this.coins.y = this.config.coinsIcon.y;
        this.container.addChild(this.coins);
    }

    createLivesIcon() {
        this.lives = App.sprite("heart");
        this.lives.anchor.set(0.5);
        this.lives.scale.set(0.75);
        this.lives.x = this.config.livesIcon.x;
        this.lives.y = this.config.livesIcon.y;
        this.container.addChild(this.lives);
    }

    createCoinsText() {
        this.coinsText = new PIXI.Text({text: this.player.coins.toString(), style: {fill: 0xffffff}});
        this.coinsText.x = this.config.coinsText.x;
        this.coinsText.y = this.config.coinsText.y;
        this.container.addChild(this.coinsText);
    }
    createLivesText() {
        this.livesText = new PIXI.Text({text: this.player.lives.toString(), style: {fill: 0xffffff}});
        this.livesText.x = this.config.livesText.x;
        this.livesText.y = this.config.livesText.y;
        this.container.addChild(this.livesText);
    }

    createCurrentWaveText() {
        this.currentWave = new PIXI.Text({text: `${this.config.waveInfoText.text} ${this.enemies.index}`, style: {fill: 0xffffff}});
        this.currentWave.x = this.config.waveInfoText.x;
        this.currentWave.y = this.config.waveInfoText.y;
        this.container.addChild(this.currentWave);
    }

    createButtons() {
        this.playPauseButton = this.createButton({x: 0, y: 135}, "PAUSE", this.onPlayPauseButtonPressed, this, "play_Pause_Button_Text");    
        this.speed2xToggleButton = this.createButton({x: 0, y: 175}, "2x FPS", this.on2xToggleButtonPressed, this, "2x_FPS_Button_Text");  
        this.startWaveButton = this.createButton({x: 0, y: 215}, "START", this.onStartWaveButtonPressed, this, "start_Wave_Button_Text", true);    
    }

    createButton(pos, text, callback, callbackContext, pixiTextName = "", once = false, color = 0xDE3249) {
        const buttonGraphic = new PIXI.Graphics();
        buttonGraphic.fill(color);
        buttonGraphic.roundRect(0, 0, 100, 40, 10);
        buttonGraphic.fill();

        const buttonText = new PIXI.Text({text, style: {
            fontFamily: 'Arial',
            fontSize: 25,
            fill: 0xFFFFFF,
            align: 'center'
        }});
        if (pixiTextName) {
            buttonText.name = pixiTextName;
        }
        buttonText.anchor.set(0.5);
        buttonText.position.set(50, 20);
        const buttonContainer = new PIXI.Container();
        buttonContainer.addChild(buttonGraphic);
        buttonContainer.addChild(buttonText);
        buttonContainer.scale.set(0.8);
        buttonContainer.position.set(pos.x, pos.y);
        buttonContainer.interactive = true;
        buttonContainer.cursor = 'pointer';
        if (once) {
            buttonContainer.once('pointerdown', callback, callbackContext);
        } else {
            buttonContainer.on('pointerdown', callback, callbackContext);
        }
        this.container.addChild(buttonContainer);
        return buttonContainer;
    }

    onPlayPauseButtonPressed() {
        const buttonText = this.playPauseButton.getChildByName("play_Pause_Button_Text");
        if (App.pauseExecution) {
            App.pauseExecution = false;
            buttonText.text = "PAUSE";
            PIXI.Ticker.shared.start();
            gsap.globalTimeline.play();
        } else {
            App.pauseExecution = true;
            buttonText.text = "PLAY";
            PIXI.Ticker.shared.stop();
            gsap.globalTimeline.pause();
        }
    }

    on2xToggleButtonPressed() {
        const currentTimeScale = gsap.globalTimeline.timeScale();
        const fps_2x_Text = this.speed2xToggleButton.getChildByName("2x_FPS_Button_Text");
        if (currentTimeScale == 1) {
            gsap.globalTimeline.timeScale(2);
            fps_2x_Text.text = "1x FPS";
        } else {
            gsap.globalTimeline.timeScale(1);
            fps_2x_Text.text = "2x FPS";
        }
    }

    onStartWaveButtonPressed() {
        App.pauseInitialWave = false;
        const buttonText = this.startWaveButton.getChildByName("start_Wave_Button_Text");
        buttonText.text = "DONE";
        this.enemies.units.forEach(enemy => {
            enemy.playTween();
        });
    }

    create() {
        this.createCoinsIcon();
        this.createCoinsText();
        this.createLivesIcon();
        this.createLivesText();
        this.createCurrentWaveText();
        this.createButtons();
    }

    update() {
        if (!App.pauseExecution) {
           this.coinsText.text = this.player.coins.toString();
           this.livesText.text = this.player.lives.toString();
           this.currentWave.text = `${this.config.waveInfoText.text} ${this.enemies.index}`;
        }
    }
}