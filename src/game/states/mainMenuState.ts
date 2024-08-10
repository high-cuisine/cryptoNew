import {GameState} from "./gameState";
import {StateManager} from "../stateManager";
import {Vector2D} from "../helpers/Vector2D.ts";
import {Size2D} from "../helpers/Size2D.ts";
import {GameLoopState} from "./gameLoopState.ts";
import {GameManager} from "../gameManager.ts";
import {PlayButton} from "../gui/PlayButton.ts";
import {ColorRGB} from "../helpers/Color.ts";
import {IconLabel} from "../gui/IconLabel/IconLabel.ts";
import {IconPlacement} from "../components/IconComponent.ts";
import {parseInitData} from "@telegram-apps/sdk";
import {MainBackground} from "../entities/mainBackground";
import {DEBUG} from "../game.ts";

class MainMenuState extends GameState {
    constructor(stateManager: StateManager) {
        super(stateManager);
    }

    enter(canvas: HTMLCanvasElement): void {
        super.enter(canvas);

        this.gameObjects = [
            new MainBackground(new Vector2D(canvas.width / 2, canvas.height / 2 - 15), new Size2D(canvas.width, canvas.height)),
            new PlayButton('Play', new Vector2D(canvas.width / 2, canvas.height / 2), new Size2D(210, 210), this.goToNextState.bind(this), undefined, 64, "Inter", ColorRGB.fromHex("#111215")),
            new IconLabel(()=> `${GameManager.getInstance().lives}`, new Vector2D(canvas.width / 2, (canvas.height / 2) + 25), new Size2D(39, 39), "Heart", new Size2D(38, 33.67), IconPlacement.Left, new Vector2D(-5, -7), 30),
        ]

        if (window?.Telegram?.WebApp?.initData || DEBUG) {
            let name: string;

            if (DEBUG) {
                name = "Lorem Ipsum Dolor sit amet";
            }
            else {
                const data = parseInitData(window?.Telegram?.WebApp?.initData);

                name = `${data.user.firstName} ${data.user.lastName}`
            }
            this.gameObjects.unshift(new IconLabel(`${name}`, new Vector2D(10, 10), new Size2D(50, 30), "TimerIcon", new Size2D(26, 26), IconPlacement.Right, new Vector2D(2, -4), undefined, undefined, ColorRGB.fromCSS("white"), undefined, undefined, undefined, "left"))
        }

        canvas.setAttribute("data-fullscreen", "false");
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

    goToNextState(): void {
        const gameManager = GameManager.getInstance();

        if (gameManager.lives <= 0) return;

        gameManager.loseLife();

        this.stateManager.changeState(GameLoopState);
    }
}

export { MainMenuState };
