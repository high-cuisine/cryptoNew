import {SceneManager} from "./manager.ts";
import {NodeManager} from "../node/manager.ts";

abstract class Scene {
    protected _key: string;
    protected sceneManager: SceneManager;
    protected nodeManager: NodeManager;

    protected constructor(key: string, sceneManager: SceneManager, nodeManager: NodeManager) {
        this._key = key;
        this.sceneManager = sceneManager;
        this.nodeManager = nodeManager;
    }

    abstract create(): void;

    abstract update(): void;

    abstract destroy(): void;

    get rootNode(): Node | undefined {
        return this.nodeManager.rootNode;
    }

    set rootNode(node: Node) {
        this.nodeManager.rootNode = node;
    }

    get key(): typeof this._key {
        return this._key;
    }
}

export {
    Scene,
}
