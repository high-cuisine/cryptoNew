import { BaseRenderComponent } from "./BaseRenderComponent.ts";
import {Size2D} from "../helpers/Size2D.ts";
import {BaseObject} from "../objects/BaseObject.ts";
import {Vector2D} from "../helpers/Vector2D.ts";
import {TransformComponent} from "./TransformComponent.ts";

class SpriteComponent<ObjType extends BaseObject = BaseObject> extends BaseRenderComponent<ObjType> {
    protected _sprite: HTMLImageElement;
    protected _frameSize: Size2D;
    protected _offset: Vector2D = new Vector2D(0, 0);

    constructor(
        object: ObjType,
        spriteSrc: string,
        frameSize?: Size2D,
    ) {
        super(object);

        this._sprite = new Image();
        this._sprite.src = spriteSrc;

        const transformComponent = this.object.getComponent(TransformComponent);

        this._frameSize = frameSize || transformComponent.size;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const transformComponent = this.object.getComponent(TransformComponent);
        if (!transformComponent) {
            console.warn("SpriteComponent requires TransformComponent to be present on the GameObject");
            return;
        }

        ctx.save();
        ctx.translate(transformComponent.position.x, transformComponent.position.y);
        ctx.rotate(transformComponent.rotation);
        ctx.scale(transformComponent.scale, transformComponent.scale);
        ctx.drawImage(
            this._sprite,
            this.offset.x, this.offset.y,
            this._frameSize.width, this._frameSize.height,
            -transformComponent.size.width / 2, -transformComponent.size.height / 2,
            transformComponent.size.width, transformComponent.size.height
        );
        ctx.restore();
    }

    get sprite(): HTMLImageElement {
        return this._sprite;
    }

    get frameSize(): Size2D {
        return this._frameSize;
    }

    set frameSize(size: Size2D) {
        this._frameSize = size;
    }

    get offset(): Vector2D {
        return this._offset;
    }

    set offset(offset: Vector2D) {
        this._offset = offset;
    }

    teardown() {}
}

export { SpriteComponent };