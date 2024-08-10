import {BaseObject} from "../../objects/BaseObject.ts";
import {Layer} from "../../objects/Layer.ts";
import {TransformComponent} from "../../components/TransformComponent.ts";
import {Vector2D} from "../../helpers/Vector2D.ts";
import {Size2D} from "../../helpers/Size2D.ts";
import {ShapeRenderComponent, ShapeType} from "../../components/ShapeRenderComponent.ts";
import {ColorRGB, ColorRGBA} from "../../helpers/Color.ts";
import {BoxColliderComponent} from "../../components/BoxColliderComponent.ts";

class StaticPlatform extends BaseObject {
    constructor(
        initialPosition: Vector2D,
        initialSize: Size2D,
        color: ColorRGB | ColorRGBA = ColorRGB.fromCSS('white'),
        initialRotation = 0,
        initialScale = 1,
    ) {
        super(Layer.Object);

        this.components.push(new TransformComponent(this, initialPosition, initialSize, new Vector2D(0, 0), initialRotation, initialScale));
        this.components.push(new ShapeRenderComponent(this, ShapeType.Rectangle, color, 0, color));
        this.components.push(new BoxColliderComponent(this));
    }
}

export {
    StaticPlatform,
}
