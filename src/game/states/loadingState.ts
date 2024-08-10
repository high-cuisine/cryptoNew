import { GameState } from "./gameState";
import { StateManager } from "../stateManager";
import {Label} from "../gui/Label.ts";
import {ColorRGBA} from "../helpers/Color.ts";
import {Vector2D} from "../helpers/Vector2D.ts";
import {Size2D} from "../helpers/Size2D.ts";
import {MainMenuState} from "./mainMenuState.ts";

class LoadingState extends GameState {
    constructor(stateManager: StateManager) {
        super(stateManager);
    }

    enter(canvas: HTMLCanvasElement): void {
        super.enter(canvas);

        this.gameObjects = [
            new Label(() => `Загрузка...`, new Vector2D(canvas.width / 2 - 100, canvas.height / 2 - 25), new Size2D(200, 50), 24, 'monospace', new ColorRGBA(255, 255, 255, 255))
        ]
    }

    update(dt: number, canvas: HTMLCanvasElement): void {
        super.update(dt, canvas);

        this.stateManager.changeState(MainMenuState);
    }

    render(dt: number, canvas: HTMLCanvasElement): void {
        const context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);

        super.render(dt, canvas);
    }

    exit(): void {
        super.exit();
    }
}

export { LoadingState };