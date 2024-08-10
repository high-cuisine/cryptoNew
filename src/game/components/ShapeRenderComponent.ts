import { BaseRenderComponent } from "./BaseRenderComponent.ts";
import { TransformComponent } from "./TransformComponent.ts";
import { ColorRGB, ColorRGBA } from "../helpers/Color.ts";
import {BaseObject} from "../objects/BaseObject.ts";

enum ShapeType {
    Rectangle,
    Circle,
}

class ShapeRenderComponent<ObjType extends BaseObject = BaseObject> extends BaseRenderComponent<ObjType> {
    constructor(
        object: ObjType,
        private shapeType: ShapeType,
        private color: ColorRGB | ColorRGBA = new ColorRGB(255, 255, 255),
        private lineWidth: number = 1,
        private strokeColor: ColorRGB | ColorRGBA = new ColorRGB(0, 0, 0)
    ) {
        super(object);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const transformComponent = this.object.getComponent(TransformComponent);
        if (!transformComponent) {
            console.warn(
                "ShapeRenderComponent requires TransformComponent to be present on the GameObject"
            );
            return;
        }

        ctx.save();

        ctx.translate(transformComponent.position.x, transformComponent.position.y);
        ctx.rotate(transformComponent.rotation);
        ctx.scale(transformComponent.scale, transformComponent.scale);

        ctx.fillStyle = this.color.toHex();
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeColor.toHex();

        switch (this.shapeType) {
            case ShapeType.Rectangle:
                this.drawRectangle(ctx, transformComponent);
                break;
            case ShapeType.Circle:
                this.drawCircle(ctx, transformComponent);
                break;
        }

        ctx.restore();
    }

    private drawRectangle(ctx: CanvasRenderingContext2D, transformComponent: TransformComponent<ObjType>): void {
        ctx.fillRect(
            0,
            0,
            transformComponent.size.width,
            transformComponent.size.height
        );
        ctx.strokeRect(
            0,
            0,
            transformComponent.size.width,
            transformComponent.size.height
        );
    }

    private drawCircle(ctx: CanvasRenderingContext2D, transformComponent: TransformComponent<ObjType>): void {
        const radius = Math.min(transformComponent.size.width, transformComponent.size.height) / 2;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    teardown() {}
}

export { ShapeRenderComponent, ShapeType };