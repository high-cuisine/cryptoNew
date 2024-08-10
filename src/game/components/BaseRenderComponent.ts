import {BaseComponent} from "./BaseComponent.ts";
import {BaseObject} from "../objects/BaseObject.ts";

abstract class BaseRenderComponent<ObjType extends BaseObject = BaseObject> extends BaseComponent<ObjType> {
    protected _order: number = 0;

    public abstract draw(ctx: CanvasRenderingContext2D): void;

    update(dt: number): void {
        throw new Error("RenderComponent can`t use update method");
    }

    get order(): number {
        return this._order;
    }

    set order(value: number) {
        if (value < 0) throw new Error("order must be > 0");

        this._order = value;
    }
}

export {
    BaseRenderComponent,
}
