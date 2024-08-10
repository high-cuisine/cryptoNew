import { CollisionEventData } from "../../collision/CollisionEventData.ts";
import {TransformComponent} from "../../components/TransformComponent.ts";
import {Vector2D} from "../../helpers/Vector2D.ts";
import {BoxColliderComponent} from "../../components/BoxColliderComponent.ts";
import {Bonus} from "../base/bonus/bonus.ts";
import {TelegramVibrationComponent} from "../../components/TelegramVibrationComponent.ts";

class PlayerColliderComponent extends BoxColliderComponent {
    onCollisionEnter(eventData: CollisionEventData): void {
        if (!eventData.other.getComponent(BoxColliderComponent)) return;

        const transform1 = eventData.self.getComponent(TransformComponent);
        const transform2 = eventData.other.getComponent(TransformComponent);

        const boundBox1 = transform1.boundBox;
        const boundBox2 = transform2.boundBox;

        // Вычисляем величину пересечения по осям X и Y
        const overlapY = Math.min(boundBox1.y + boundBox1.height, boundBox2.y + boundBox2.height) - Math.max(boundBox1.y, boundBox2.y);

        if (boundBox1.y < boundBox2.y) {
            // object1 выше object2
            transform1.translate(new Vector2D(0, -overlapY));
        } else {
            // object1 ниже object2
            transform1.translate(new Vector2D(0, overlapY));
        }

        transform1.velocity.y *= -0.45;

        if (eventData.other instanceof Bonus) {
            const vibrationComponent = this.object.getComponent(TelegramVibrationComponent);

            if (vibrationComponent) {
                vibrationComponent.vibrate("rigid");
            }
        }
    }
    onCollisionStay(eventData: CollisionEventData): void {
        if (!eventData.other.getComponent(BoxColliderComponent)) return;

        const transform1 = eventData.self.getComponent(TransformComponent);
        const transform2 = eventData.other.getComponent(TransformComponent);

        const boundBox1 = transform1.boundBox;
        const boundBox2 = transform2.boundBox;

        // Вычисляем величину пересечения по осям X и Y
        const overlapY = Math.min(boundBox1.y + boundBox1.height, boundBox2.y + boundBox2.height) - Math.max(boundBox1.y, boundBox2.y);

        if (boundBox1.y < boundBox2.y) {
            // object1 выше object2
            transform1.translate(new Vector2D(0, -overlapY));
        } else {
            // object1 ниже object2
            transform1.translate(new Vector2D(0, overlapY));
        }

        transform1.velocity = new Vector2D(0, 0);

        if (eventData.other instanceof Bonus) {
            const vibrationComponent = this.object.getComponent(TelegramVibrationComponent);

            if (vibrationComponent) {
                vibrationComponent.vibrate("rigid");
            }
        }
    }
    onCollisionExit(eventData: CollisionEventData): void {}
}

export {
    PlayerColliderComponent,
}
