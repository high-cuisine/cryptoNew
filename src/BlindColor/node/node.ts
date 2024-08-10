import {Component} from "../components/component.ts";
import {NodeTree} from "./tree.ts";

class Node {
    protected _id: string;
    public parent: Node | null = null;
    public children: NodeTree = new NodeTree();
    public components: Component[] = [];

    constructor(id: string) {
        this._id = id;
    }

    get id(): string {
        return this._id;
    }

    addChild(node: Node): void {
        node.parent = this;
        this.children.add(node);
    }

    removeChild(node: Node): void {
        this.children.delete(node);

        node.parent = null;
    }

    addComponent(component: Component): void {
        this.components.push(component);
        component.onAttach(this);
    }

    getComponent<T extends Component>(componentType: { new(...args: unknown[]): T }): T | undefined {
        return this.components.find(component => component instanceof componentType) as T;
    }

    removeComponent<T extends Component>(componentType: { new(...args: unknown[]): T }): void {
        const index = this.components.findIndex(component => component instanceof componentType);
        if (index !== -1) {
            this.components.splice(index, 1);
        }
    }
    update(dt: number): void {
        // ... (обновление свойств узла)

        // Обновление компонентов
        for (const component of this.components) {
            if (component.enabled) { // Добавляем проверку enabled
                component.update(dt);
            }
        }
    }
}

export {
    Node,
}

export type {
    NodeTree,
}
