import { GameState } from "./states/gameState";
import {GameManager} from "./gameManager.ts";

const MS_PER_UPDATE: number = 1000 / 60;

class StateManager {
    private currentState: GameState;
    private canvas: HTMLCanvasElement;

    constructor() {
    }

    public initState(initialState: GameState, canvas: HTMLCanvasElement) {
        this.canvas = canvas; // Добавляем canvas в StateManager
        this.currentState = initialState;
    }

    public start(): void {
        if (!this.currentState) {
            throw "Invalid state";
        }

        this.currentState.enter(this.canvas);

        this.gameLoop();
    }

    public changeState<T extends GameState>(newState: new (stateManager: StateManager) => T): void {
        if (this.currentState) {
            this.currentState.exit();
        }

        this.currentState = new newState(this);
        this.currentState.enter(this.canvas); // Передаем canvas в enter
    }

    public dropState(): void {
        if (this.currentState) {
            this.currentState.exit();
            this.currentState = undefined;
        }
    }

    private gameLoop(): void {
        let previous = performance.now();
        let lag = 0.0;

        const loop = () => {
            if (!this.currentState) {
                requestAnimationFrame(loop.bind(this));
                return;
            }

            const current = performance.now();
            lag += current - previous;
            previous = current;

            const gameManager = GameManager.getInstance();

            while (lag >= MS_PER_UPDATE) {
                gameManager.update(MS_PER_UPDATE / 1000);
                this.currentState.update(MS_PER_UPDATE / 1000, this.canvas);
                lag -= MS_PER_UPDATE;
            }

            this.currentState.render(lag / MS_PER_UPDATE, this.canvas);

            requestAnimationFrame(loop.bind(this));
        }

        requestAnimationFrame(loop.bind(this));
    }
}

export { StateManager };