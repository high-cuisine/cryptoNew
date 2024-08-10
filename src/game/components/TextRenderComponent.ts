import { BaseRenderComponent } from "./BaseRenderComponent.ts";
import { TransformComponent } from "./TransformComponent.ts";
import { ColorRGB, ColorRGBA } from "../helpers/Color.ts";
import {BaseObject} from "../objects/BaseObject.ts";
import {BoundBox} from "../helpers/BoundBox.ts";
import {Vector2D} from "../helpers/Vector2D.ts";
import {Size2D} from "../helpers/Size2D.ts";
import {DEBUG} from "../game.ts";

class TextRenderComponent<ObjType extends BaseObject = BaseObject> extends BaseRenderComponent<ObjType> {
    private _textBounds: BoundBox = new BoundBox(new Vector2D(0, 0), new Size2D(0, 0));

    constructor(
        object: ObjType,
        protected text: string | (() => string),
        protected _fontSize: number = 20,
        protected font: string = "monospace",
        protected color: ColorRGB | ColorRGBA = new ColorRGB(0, 0, 0),
        protected textAlign: CanvasTextAlign = "center",
        protected textBaseline: CanvasTextBaseline = "middle"
    ) {
        super(object);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const transformComponent = this.object.getComponent(TransformComponent);
        if (!transformComponent) {
            console.warn("TextRenderComponent requires TransformComponent to be present on the GameObject");
            return;
        }

        ctx.save();

        ctx.font = `${this.fontSize}px ${this.font}`;
        ctx.fillStyle = this.color.toHex();
        ctx.textAlign = this.textAlign;
        ctx.textBaseline = this.textBaseline;

        ctx.translate(transformComponent.boundBox.x + (transformComponent.boundBox.width / 2), transformComponent.boundBox.y + (transformComponent.boundBox.height / 2));
        ctx.rotate(transformComponent.rotation);
        ctx.scale(transformComponent.scale, transformComponent.scale);

        let text;

        if (typeof this.text === 'function') {
            text = this.text();
        }
        else {
            text = this.text;
        }

        const textMeasurement = ctx.measureText(text);

        this._textBounds.x = transformComponent.boundBox.x + (transformComponent.boundBox.width / 2) - textMeasurement.actualBoundingBoxLeft;
        this._textBounds.y = transformComponent.boundBox.y + (transformComponent.boundBox.height / 2) - textMeasurement.actualBoundingBoxAscent;
        this._textBounds.width = textMeasurement.width;
        this._textBounds.height = Math.abs(textMeasurement.actualBoundingBoxAscent) + Math.abs(textMeasurement.actualBoundingBoxDescent);

        ctx.fillText(text, 0, 0);

        ctx.restore();

        if (DEBUG) {
            ctx.strokeStyle = "red";
            ctx.strokeRect(
                this.textBounds.x,
                this.textBounds.y,
                this.textBounds.width,
                this.textBounds.height,
            );
            ctx.restore();
        }
    }

    teardown() {}

    get textBounds(): BoundBox {
        return this._textBounds;
    }

    get fontSize(): number {
        return this._fontSize;
    }

    set fontSize(size: number) {
        if (size < 0) throw new Error("size cannot be < 0");

        this._fontSize = size;
    }
}

export { TextRenderComponent };
