import { StateManager } from "../stateManager";
import {BaseObject} from "../objects/BaseObject.ts";
import {Layer} from "../objects/Layer.ts";
import {CollisionManager} from "../collision/CollisionManager.ts";

abstract class GameState {
    protected stateManager: StateManager;
    protected _gameObjects: BaseObject[] = [];
    protected collisionManager: CollisionManager;

    constructor(stateManager: StateManager) { // Добавляем stateManager в конструктор
        this.stateManager = stateManager;
    }

    enter(canvas: HTMLCanvasElement): void {
        this.collisionManager = CollisionManager.getInstance(canvas.width, canvas.height);
    }

    update(dt: number, canvas: HTMLCanvasElement): void {
        for (let layer = 0; layer < Layer.GUI; layer++) {
            this._gameObjects.filter(gameObject => gameObject.layer === layer).forEach((object) => {
                object.update(dt);
            })
        }

        this.collisionManager.update(dt, this.gameObjects);
    }
    render(dt: number, canvas: HTMLCanvasElement): void {
        const context = canvas.getContext('2d');

        for (let layer = 0; layer <= Layer.GUI; layer++) {
            this._gameObjects.filter(gameObject => gameObject.layer === layer).forEach((object) => {
                context.save();
                object.render(context);
                context.restore();
            })
        }
    }
    exit(): void {
        this._gameObjects.forEach((gameObject) => {
            gameObject.teardown();
        })

        this.collisionManager.clearObjects();
    }

    get gameObjects(): BaseObject[] {
        return this._gameObjects;
    }

    protected set gameObjects(gameObjects: BaseObject[]) {
        this._gameObjects = gameObjects;
    }
}

export { GameState };