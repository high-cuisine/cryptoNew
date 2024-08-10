import {GameState} from "./gameState";
import {StateManager} from "../stateManager";
import {GameOverState} from "./gameOverState";
import {Player} from "../entities/player/player.ts";
import {Vector2D} from "../helpers/Vector2D.ts";
import {Size2D} from "../helpers/Size2D.ts";
import {StaticPlatform} from "../entities/staticPlatform/staticPlatform.ts";
import {ColorRGB, ColorRGBA} from "../helpers/Color.ts";
import {Anchor} from "../components/TransformComponent.ts";
import {ScoreManager} from "../scoreManager.ts";
import {GameManager} from "../gameManager.ts";
import {Bonus} from "../entities/base/bonus/bonus.ts";
import {GUIObject} from "../gui/GUIObject.ts";
import {getRandomInt} from "../helpers/random.ts";
import {BonusSpawner} from "../helpers/bonus/spawner.ts";
import {MainPlatform} from "../entities/mainPlatform/mainPlatform.ts";
import {InvisibleObject} from "../entities/mainPlatform/InvisibleObject.ts";
import {IconLabel} from "../gui/IconLabel/IconLabel.ts";
import {IconPlacement} from "../components/IconComponent.ts";
import {MainBackground} from "../entities/mainBackground";
import {DotCounter} from "../entities/mainBackground/dotCounter.ts";

const gameLength: number = 30;
const readyTime: number = 2;

class GameLoopState extends GameState {
    private timer: number = gameLength; // Начальное значение таймера
    private readyTimer: number = readyTime;

    private bonusSpawner: BonusSpawner;

    private gameOver: boolean = false;

    private player: Player;

    constructor(stateManager: StateManager) {
        super(stateManager);
    }

    enter(canvas: HTMLCanvasElement): void {
        super.enter(canvas);

        ScoreManager.getInstance().reset();

        this.timer = gameLength;
        this.readyTimer = readyTime;
        this.gameOver = false;

        this.bonusSpawner = new BonusSpawner(this);
        this.bonusSpawner.resetCounter();

        this.player = new Player(new Vector2D(canvas.width / 2, canvas.height / 2), new Size2D(50, 50));
        this.player.disableControls();

        this.gameObjects = [
            this.player,
            new InvisibleObject(new Vector2D(0, canvas.height - 10), new Size2D(canvas.width, 50)),
            new MainBackground(new Vector2D(canvas.width / 2, canvas.height / 2 - 15), new Size2D(canvas.width, canvas.height)),
            new DotCounter(gameLength, () => gameLength - this.timer, new Vector2D(canvas.width / 2, canvas.height / 2), new Size2D(canvas.width, canvas.height), "MainBackground"),
            new StaticPlatform(new Vector2D(0, 0), new Size2D(canvas.width, 50), new ColorRGBA(0, 0, 0, 0)),
            new MainPlatform(new Vector2D(0, canvas.height - 50), new Size2D(canvas.width, 50)),
            new IconLabel(() => `${this.timer < 0 ? '0.0' : this.timer.toFixed(1)}`, new Vector2D((0.1375 * canvas.width), 0), new Size2D(100, 50), "Dice", new Size2D(39, 39), IconPlacement.Left, new Vector2D(-2, -5), 32, 'Inter', ColorRGB.fromCSS('white'), 0, 1, Anchor.TopLeft),
            new IconLabel(() => `${GameManager.getInstance().lives}`, new Vector2D((canvas.width / 2) + (0.0725 * canvas.width), 0), new Size2D(100, 50), "Heart", new Size2D(39, 39), IconPlacement.Left, new Vector2D(-2, -5), 32, 'Inter', ColorRGB.fromCSS('white'), 0, 1, Anchor.Top),
            new IconLabel(() => `${ScoreManager.getInstance().score}`, new Vector2D(canvas.width - (0.0625 * canvas.width), 0), new Size2D(100, 50), "Coin", new Size2D(39, 39), IconPlacement.Left, new Vector2D(-2, -5), 32, 'Inter', ColorRGB.fromCSS('white'), 0, 1, Anchor.TopRight),
        ]

        canvas.setAttribute("data-fullscreen", "true")
    }

    resetTime(): void {
        this.timer = gameLength;
        this.gameOver = false;
        this.readyTimer = readyTime;

        }

    update(dt: number, canvas: HTMLCanvasElement): void {
        super.update(dt, canvas);

        if (this.readyTimer > 0) {
            this.readyTimer -= dt;
            return;
        }

        if (this.timer > 0) {
            this.timer -= dt;
            this.gameLoop(dt, canvas);

            return;
        }

        if (!this.gameOver) {
            this.gameOver = true;

            this.gameObjects = this.gameObjects.filter(obj => !(obj instanceof Bonus));

            this.player.disableControls();

            if (this.bonusSpawner.collectedCount('dice')) {
                this.playDiceAnimation();
            }
            else {
                this.stateManager.changeState(GameOverState);
            }
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

    private gameLoop(dt: number, canvas: HTMLCanvasElement): void {
        if (!this.player.controlsEnabled) {
            this.player.enableControls();
        }

        this.bonusSpawner.update(dt, canvas);

        this.cleanUpBonuses();
    }

    private playDiceAnimation(): void {
        const scoreManager = ScoreManager.getInstance();

        const diceResult = getRandomInt(1, 6);

        const scoreIncrement = (scoreManager.score) * (diceResult - 1);

        scoreManager.increment(scoreIncrement);

        setTimeout(() => {
            this.stateManager.changeState(GameOverState);
        }, 3000);
    }

    protected cleanUpBonuses(): void {
        this.gameObjects = this.gameObjects.filter(obj => !(obj instanceof Bonus && obj.shouldBeRemoved));
    }
}

export { GameLoopState };
