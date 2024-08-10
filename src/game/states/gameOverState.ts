import { GameState } from "./gameState";
import { StateManager } from "../stateManager";
import { LoadingState } from "./loadingState";
import {Label} from "../gui/Label.ts";
import {Vector2D} from "../helpers/Vector2D.ts";
import {Size2D} from "../helpers/Size2D.ts";
import {Button} from "../gui/Button.ts";
import {ColorRGB} from "../helpers/Color.ts";

class GameOverState extends GameState {
    constructor(stateManager: StateManager) {
        super(stateManager);
    }

    enter(canvas: HTMLCanvasElement): void {
        super.enter(canvas);

        this.gameObjects = [
            new Label('Игра окончена', new Vector2D(canvas.width / 2 - 75, canvas.height / 2 - 100), new Size2D(150, 50), 20, 'monospace', ColorRGB.fromCSS('white')),
            new Button('В меню', new Vector2D(canvas.width / 2 - 75, canvas.height / 2), new Size2D(150, 50), this.goToNextState.bind(this), undefined, 20, 'monospace', ColorRGB.fromCSS('green'))
        ]
    }

    update(dt: number, canvas: HTMLCanvasElement): void {
        super.update(dt, canvas);
    }

    render(dt: number, canvas: HTMLCanvasElement): void {
        const context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);

        super.render(dt, canvas);
    }

    exit(): void {
        super.exit();
    }

    private goToNextState(): void {
        this.stateManager.changeState(LoadingState);
    }
}

export { GameOverState };
