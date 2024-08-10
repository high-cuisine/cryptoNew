import { BaseComponent } from "../components/BaseComponent.ts";
import { BaseObject } from "../objects/BaseObject.ts";
import { TransformComponent } from "../components/TransformComponent.ts";
import { Size2D } from "../helpers/Size2D.ts";
import { Vector2D } from "../helpers/Vector2D.ts";

class CollisionComponent extends BaseComponent<BaseObject> {
    private size: Size2D;

    constructor(parent: BaseObject, size: Size2D) {
        super(parent);
        this.size = size;
    }

    update(dt: number): void {
        // Логика обновления, если нужно
    }

    checkCollision(otherObject: BaseObject): boolean {
        const transform = this.parent.getComponent(TransformComponent);
        const otherTransform = otherObject.getComponent(TransformComponent);

        if (transform && otherTransform) {
            const thisPos = transform.position;
            const otherPos = otherTransform.position;

            return (
                thisPos.x < otherPos.x + otherTransform.size.width &&
                thisPos.x + this.size.width > otherPos.x &&
                thisPos.y < otherPos.y + otherTransform.size.height &&
                thisPos.y + this.size.height > otherPos.y
            );
        }

        return false;
    }
}

export { CollisionComponent };
