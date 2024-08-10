import { GameState } from "./gameState";
import { StateManager } from "../stateManager";
import { LoadingState } from "./loadingState";
import {Label} from "../gui/Label.ts";
import {Vector2D} from "../helpers/Vector2D.ts";
import {Size2D} from "../helpers/Size2D.ts";
import {ColorRGBA} from "../helpers/Color.ts";
import {AssetManager} from "../helpers/assets/manager.ts";
import {IS_SAFARI} from "../../helpers/constants.ts";

class InitState extends GameState {
    constructor(stateManager: StateManager) {
        super(stateManager);
    }

    enter(canvas: HTMLCanvasElement): void {
        super.enter(canvas);

        if (!IS_SAFARI) {
            AssetManager.getInstance().loadResources([
                {key: "MainPlatform", type: "image", src: "assets/sprites/MainPlatform.png", cache: true},
                {key: "Ball", type: "image", src: "assets/sprites/Ball.png", cache: true},
                {key: "Coin", type: "image", src: "assets/sprites/Coin.png", cache: true},
                {key: "Heart", type: "image", src: "assets/sprites/Heart.png", cache: true},
                {key: "Dice", type: "image", src: "assets/sprites/Dice.png", cache: true},
                {key: "MainBackground", type: "image", src: "assets/sprites/MainBackground.svg", cache: true},
            ])
        }
        else {
            AssetManager.getInstance().loadResources([
                {key: "HeartFlat", type: "image", src: "assets/sprites/HeartIcon.svg", cache: true},
                {key: "MainPlatform", type: "image", src: "assets/sprites/MainPlatform.svg", cache: true},
                {key: "Ball", type: "image", src: "assets/sprites/Ball.svg", cache: true},
                {key: "Coin", type: "image", src: "assets/sprites/Coin.svg", cache: true},
                {key: "Heart", type: "image", src: "assets/sprites/Heart.svg", cache: true},
                {key: "Dice", type: "image", src: "assets/sprites/Dice.svg", cache: true},
                {key: "MainBackground", type: "image", src: "assets/sprites/MainBackground.svg", cache: true},
            ])
        }

        this.gameObjects = [
            new Label(() => `Инициализация (${AssetManager.getInstance().progress}%)`, new Vector2D(canvas.width / 2 - 100, canvas.height / 2 - 25), new Size2D(200, 50), 24, 'monospace', new ColorRGBA(255, 255, 255, 255))
        ]
    }

    update(dt: number, canvas: HTMLCanvasElement): void {
        super.update(dt, canvas);

        if (AssetManager.getInstance().progress >= 100) {
            this.stateManager.changeState(LoadingState);
        }
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

export { InitState };
