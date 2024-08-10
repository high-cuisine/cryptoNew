import { BaseComponent } from "./BaseComponent.ts";
import {Vector2D} from "../helpers/Vector2D.ts";
import {BaseObject} from "../objects/BaseObject.ts";

class PositionComponent<ObjType extends BaseObject = BaseObject> extends BaseComponent<ObjType> {
    protected _position: Vector2D;
    protected _velocity: Vector2D;
    protected _rotation: number;

    constructor(
        object: ObjType,
        position: Vector2D,
        velocity: Vector2D,
        initialRotation: number = 0,
    ) {
        super(object);
        this._position = position;
        this._velocity = velocity;
        this._rotation = initialRotation;
    }

    update(dt: number): void {
        this.position = this.position.add(this.velocity.multiply(dt));
    }

    get position(): Vector2D {
        return this._position;
    }

    set position(position: Vector2D) {
        this._position = position;
    }

    get velocity(): Vector2D {
        return this._velocity;
    }

    set velocity(velocity: Vector2D) {
        this._velocity = velocity;
    }

    get rotation(): number {
        return this._rotation;
    }

    set rotation(value: number) {
        this._rotation = (Math.abs(value) % 360) * Math.sign(value);
    }

    teardown() {}
}

export { PositionComponent };