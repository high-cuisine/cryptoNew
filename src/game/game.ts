import {StateManager} from "./stateManager";
import { InitState } from "./states/initState";
import {InputManager} from "./input/inputManager.ts";

export const DEBUG: boolean = false;

class Game {
    private canvas: HTMLCanvasElement;
    private stateManager: StateManager;
    private inputManager: InputManager;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.stateManager = new StateManager();
        this.inputManager = new InputManager(this.canvas);
    }

    public start(): void {
        this.stateManager.initState(new InitState(this.stateManager), this.canvas); // Передаем canvas
        this.stateManager.start();
    }

    public teardown(): void {
        this.stateManager.dropState();
    }
}

export {
    Game,
}