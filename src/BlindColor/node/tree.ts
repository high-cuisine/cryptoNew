import {Node} from "./node";

interface INodeTree extends WeakMap<Node, INodeTree>{
    keys: () => Node[],
}

class NodeTree extends WeakMap<Node, INodeTree> implements INodeTree {
    protected _keys: Node[];

    add(key: Node): this {
        if (this._keys.includes(key)) {
            throw new Error(`Node ${key.id} already in tree`);
        }

        this._keys.push(key);

        return super.set(key, new NodeTree());
    }

    set(key: Node, value: INodeTree): this {
        if (this._keys.includes(key)) {
            throw new Error(`Node ${key.id} already in tree`);
        }

        this._keys.push(key);

        return super.set(key, value);
    }

    delete(key: Node): boolean {
        const keyIndex = this._keys.findIndex(node => node === key);

        if (keyIndex !== -1) this._keys.splice(keyIndex, 1);

        return super.delete(key);
    }

    keys(): Node[] {
        return this._keys;
    }
}

export {
    NodeTree,
}
