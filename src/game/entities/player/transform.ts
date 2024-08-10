import {Anchor, TransformComponent} from "../../components/TransformComponent.ts";
import {Vector2D} from "../../helpers/Vector2D.ts";
import {Size2D} from "../../helpers/Size2D.ts";
import {Player} from "./player.ts";

class PlayerTransformComponent extends TransformComponent<Player> {
    protected gravity: number = 18.81;

    constructor(
        object: Player,
        position: Vector2D,
        size: Size2D,
        velocity: Vector2D,
        initialRotation = 0,
        initialScale = 1,
    ) {
        super(object, position, size, velocity, initialRotation, initialScale, Anchor.Center);
    }

    update(dt: number) {
        this.velocity = this.velocity.add(new Vector2D(0, this.gravity));

        super.update(dt);
    }
}

export {
    PlayerTransformComponent,
}
