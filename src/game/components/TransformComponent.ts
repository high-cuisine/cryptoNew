import { PositionComponent } from "./PositionComponent.ts";
import { Size2D } from "../helpers/Size2D.ts";
import {BaseObject} from "../objects/BaseObject.ts";
import {Vector2D} from "../helpers/Vector2D.ts";
import {BoundBox} from "../helpers/BoundBox.ts";

enum Anchor {
    TopLeft,
    Top,
    TopRight,
    Left,
    Center,
    Right,
    BottomLeft,
    Bottom,
    BottomRight,
}

class TransformComponent<ObjType extends BaseObject = BaseObject> extends PositionComponent<ObjType> {
    protected _size: Size2D;
    protected _scale: number;
    protected _anchor: Anchor;

    constructor(
        object: ObjType,
        position: Vector2D,
        size: Size2D,
        velocity: Vector2D,
        initialRotation = 0,
        initialScale = 1,
        anchor: Anchor = Anchor.TopLeft,
    ) {
        super(object, position, velocity, initialRotation);
        this._scale = initialScale;
        this._size = size;
        this._anchor = anchor;
    }

    get scale(): number {
        return this._scale;
    }

    set scale(scale: number) {
        this._scale = scale;
    }

    get size(): Size2D {
        return this._size;
    }

    set size(size: Size2D) {
        this._size = size;
    }

    get boundBox(): BoundBox {
        return new BoundBox(this.getTopLeftPosition(), this.getScaledSize());
    }

    set boundBox(boundBox: BoundBox) {
        this.position = this.getPositionFromTopLeft(boundBox.position);
        this.size = boundBox.size;
    }

    translate(vector: Vector2D): void {
        this.position = this.position.add(vector);
    }

    rotate(angle: number): void {
        this.rotation += angle;
    }

    get anchor(): Anchor {
        return this._anchor;
    }

    set anchor(anchor: Anchor) {
        this._anchor = anchor;
    }

    // Вспомогательные методы для расчета позиции
    private getTopLeftPosition(): Vector2D {
        const scaledSize = this.getScaledSize(); // Размер с учетом scale
        let x = this.position.x;
        let y = this.position.y;

        switch (this.anchor) {
            case Anchor.Top:
                x -= scaledSize.width / 2;
                break;
            case Anchor.TopRight:
                x -= scaledSize.width;
                break;
            case Anchor.Left:
                y -= scaledSize.height / 2;
                break;
            case Anchor.Center:
                x -= scaledSize.width / 2;
                y -= scaledSize.height / 2;
                break;
            case Anchor.Right:
                x -= scaledSize.width;
                y -= scaledSize.height / 2;
                break;
            case Anchor.BottomLeft:
                y -= scaledSize.height;
                break;
            case Anchor.Bottom:
                x -= scaledSize.width / 2;
                y -= scaledSize.height;
                break;
            case Anchor.BottomRight:
                x -= scaledSize.width;
                y -= scaledSize.height;
                break;
        }

        return new Vector2D(x, y);
    }

    private getPositionFromTopLeft(topLeft: Vector2D): Vector2D {
        const scaledSize = this.getScaledSize(); // Размер с учетом scale
        let x = topLeft.x;
        let y = topLeft.y;

        switch (this.anchor) {
            case Anchor.Top:
                x += scaledSize.width / 2;
                break;
            case Anchor.TopRight:
                x += scaledSize.width;
                break;
            case Anchor.Left:
                y += scaledSize.height / 2;
                break;
            case Anchor.Center:
                x += scaledSize.width / 2;
                y += scaledSize.height / 2;
                break;
            case Anchor.Right:
                x += scaledSize.width;
                y += scaledSize.height / 2;
                break;
            case Anchor.BottomLeft:
                y += scaledSize.height;
                break;
            case Anchor.Bottom:
                x += scaledSize.width / 2;
                y += scaledSize.height;
                break;
            case Anchor.BottomRight:
                x += scaledSize.width;
                y += scaledSize.height;
                break;
        }

        return new Vector2D(x, y);
    }

    // Метод для получения размера с учетом scale
    public getScaledSize(): Size2D {
        return new Size2D(this._size.width * this._scale, this._size.height * this._scale);
    }

    teardown() {}
}

export {
    TransformComponent,
    Anchor,
};