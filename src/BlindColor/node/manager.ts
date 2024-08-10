import {Node} from "./node.ts";
import {RootNode} from "./root.ts";


class NodeManager {
    public rootNode: RootNode | null = null;

    constructor() {}

    addNode(node: Node, parentNode?: Node): void {
        if (!parentNode && !this.rootNode) {
            this.rootNode = node as RootNode; // Если нет rootNode, то добавляемый узел становится rootNode
            return;
        }

        if (!parentNode) {
            parentNode = this.rootNode; // Добавляем к rootNode, если parentNode не указан
        }

        if (parentNode) {
            parentNode.addChild(node);
        } else {
            console.warn("Cannot add node without a parent. Root node not set.");
        }
    }

    removeNode(node: Node): void {
        if (node.parent) {
            node.parent.removeChild(node);
        } else {
            if (node === this.rootNode) {
                this.rootNode = null;
            } else {
                console.warn("Cannot remove node without a parent.");
            }
        }
    }

    getNodeById(id: string): Node | null {
        let foundNode: Node | null = null;

        const searchTree = (node: Node): void => {
            if (node.id === id) {
                foundNode = node;
                return;
            }

            for (const child of node.children.keys()) {
                searchTree(child);
                if (foundNode) {
                    return; // Прерываем поиск, если узел найден
                }
            }
        };

        if (this.rootNode) {
            searchTree(this.rootNode);
        }

        return foundNode;
    }
}

export {
    NodeManager,
}
