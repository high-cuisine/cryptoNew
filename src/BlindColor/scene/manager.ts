import {Scene} from "./Scene.ts";
import {NodeManager} from "../node/manager.ts";

class SceneManager {
    private scenes: Scene[] = [];
    private _activeScene?: Scene;
    private _nodeManager: NodeManager;

    constructor(...scenes: Scene[]) {
        this.add(...scenes);
    }

    set nodeManager(nodeManager: NodeManager) {
        this._nodeManager = nodeManager;
    }

    get(key: Scene["_key"]): Scene | undefined {
        return this.scenes.find(scene => scene.key === key);
    }

    add(...scenes: Scene[]): void {
        this.scenes.push(...scenes);
    }

    pop(key: Scene["key"]): Scene | undefined {
        if (key === this.activeScene?.key) {
            throw new Error("Active scene cannot be popped");
        }

        const scene = this.get(key);

        this.scenes.splice(this.scenes.indexOf(scene), 1);

        return scene;
    }

    start(key: Scene["key"]): void {
        if (this.activeScene) {
            console.warn(`There is already running scene (${this.activeScene.key}). Use "switch" to start another scene`);

            return;
        }

        const scene = this.get(key);

        if (!scene) {
            throw new Error(`Scene "${key}" not found`);
        }

        this.activeScene = scene;
    }

    switch(key: Scene["key"]): void {
        if (this.activeScene.key === key) {
            console.warn(`Scene ${key} already running`);

            return;
        }

        const scene = this.get(key);

        if (!scene) {
            throw new Error(`Scene "${key}" not found`);
        }

        this.activeScene.destroy();

        this.activeScene = scene;
    }

    get activeScene(): Scene | undefined {
        return this._activeScene;
    }

    private set activeScene(scene: Scene) {
        this._activeScene = scene;
    }
}

export {
    SceneManager,
}
