import {BaseObject} from "../objects/BaseObject.ts";
import {Layer} from "../objects/Layer.ts";

class GUIObject extends BaseObject {
    constructor() {
        super(Layer.GUI);
    }
}

export {
    GUIObject,
}
