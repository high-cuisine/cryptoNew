import {BaseObject} from "../objects/BaseObject.ts";

abstract class BaseComponent<ObjType extends BaseObject = BaseObject> {
    constructor(protected object: ObjType) {}

    public abstract update(dt: number): void;
    public abstract teardown(): void;
}

export { BaseComponent };
