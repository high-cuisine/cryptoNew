import { BaseObject } from "../../objects/BaseObject.ts";
import { Layer } from "../../objects/Layer.ts";
import { TransformComponent } from "../../components/TransformComponent.ts";
import { Vector2D } from "../../helpers/Vector2D.ts";
import { Size2D } from "../../helpers/Size2D.ts";
import { ImageRenderComponent } from "../../components/ImageRenderComponent.ts";

class MainPlatform extends BaseObject {
    constructor(
        initialPosition: Vector2D,
        initialSize: Size2D,
        initialRotation = 0,
        initialScale = 1,
    ) {
        super(Layer.Background); // Измените слой на Background

        this.components.push(new TransformComponent(this, initialPosition, initialSize, new Vector2D(0, 0), initialRotation, initialScale));
        this.components.push(new ImageRenderComponent(this, "MainPlatform"));
        
        // Убираем BoxColliderComponent, чтобы объект был проницаемым
        // this.components.push(new BoxColliderComponent(this));
    }
}

export {
    MainPlatform,
}
