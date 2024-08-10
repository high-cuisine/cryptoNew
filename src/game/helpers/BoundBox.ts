import {Vector2D} from "./Vector2D.ts";
import {Size2D} from "./Size2D.ts";

class BoundBox {
    protected _position: Vector2D;
    protected _size: Size2D;

    constructor(position: Vector2D, size: Size2D) {
        this._position = position;
        this._size = size;
    }

    get position(): Vector2D {
        return this._position;
    }

    set position(position: Vector2D) {
        this._position = position;
    }

    get size(): Size2D {
        return this._size;
    }

    set size(size: Size2D) {
        this._size = size;
    }

    get x(): number {
        return this.position.x;
    }

    set x(value: number) {
        this.position.x = value;
    }

    get y(): number {
        return this.position.y;
    }

    set y(value: number) {
        this.position.y = value;
    }

    get width(): number {
        return this.size.width;
    }

    set width(value: number) {
        this.size.width = value;
    }

    get height(): number {
        return this.size.height;
    }

    set height(value: number) {
        this.size.height = value;
    }

    intersects(other: BoundBox): boolean {
        return (Math.abs((this.x + this.width/2) - (other.x + other.width/2)) * 2 < (this.width + other.width)) &&
            (Math.abs((this.y + this.height/2) - (other.y + other.height/2)) * 2 < (this.height + other.height));
    }

    containsPoint(point: Vector2D): boolean {
        return (
            point.x >= this.x &&
            point.x <= this.x + this.width &&
            point.y >= this.y &&
            point.y <= this.y + this.height
        );
    }
}

export {
    BoundBox,
}
