import {Node} from "./node.ts";

class RootNode extends Node {
    protected override readonly _id: string = "root";

    constructor() {
        super("root");
    }
}

export {
    RootNode,
}
