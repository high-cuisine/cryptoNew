import {DEFAULT_GAME_CONFIG, IGameConfig} from "./Config.ts";
import {SceneManager} from "../scene/manager.ts";
import {Scene} from "../scene/Scene.ts";

class Game {
    private config: IGameConfig;

    private canvas: HTMLCanvasElement;

    private sceneManager: SceneManager;

    private _isRunning: boolean = false;

    constructor(config: IGameConfig) {
        this.config = {
            ...DEFAULT_GAME_CONFIG,
            ...config,
        };

        this.canvas = config.canvas;

        this.sceneManager = new SceneManager();
    }

    start(): void {
        if (this._isRunning) {
            console.warn('Game already running');
            return;
        }

        this._isRunning = true;

        let previous = performance.now();
        let lag = 0.0;
        const MS_PER_UPDATE = 1000 / this.config.performance.maxFPS;

        const loop = () => {
            if (!this._isRunning) return; // Выходим из цикла, если игра остановлена

            const current = performance.now();
            lag += current - previous;
            previous = current;

            while (lag >= MS_PER_UPDATE) {
                this.sceneManager.updatePhysics(MS_PER_UPDATE / 1000);
                this.sceneManager.update(MS_PER_UPDATE / 1000);
                lag -= MS_PER_UPDATE;
            }

            this.sceneManager.render(lag / MS_PER_UPDATE);

            requestAnimationFrame(loop);
        };

        requestAnimationFrame(loop);
    }

    stop(): void {
        this._isRunning = false;
    }

    loadScene(sceneKey: Scene["_key"]): void {
        if (!this.sceneManager.activeScene) {
            this.sceneManager.start(sceneKey);
        }
        else {
            this.sceneManager.switch(sceneKey);
        }
    }

    initialize(): void {
        this.resizeCanvas(this.config.sizes.width, this.config.sizes.height, this.config.sizes.applyCSSSizes);
    }

    resizeCanvas(width: number, height: number, applyCSSSizes: boolean = false): void {
        this.canvas.width = width;
        this.canvas.height = height;

        this.canvas.getContext('2d').transform(1, 0, 0, 1, 0, 0);

        if (applyCSSSizes) {
            this.canvas.style.width = `${width}px`;
            this.canvas.style.height = `${height}px`;
        }

        this.config.sizes.width = width;
        this.config.sizes.height = height;
    }

    get isRunning(): boolean {
        return this._isRunning;
    }
}

export {
    Game,
}
