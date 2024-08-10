import {Node} from "../node/node";

abstract class Component {
    abstract onAttach(node: Node): void;
}

export {
    Component,
}
