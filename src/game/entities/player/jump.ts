import {BaseComponent} from "../../components/BaseComponent.ts";
import {Vector2D} from "../../helpers/Vector2D.ts";
import {ScoreManager} from "../../scoreManager.ts";
import {Player} from "./player.ts";
import {InputEventBus, subscriptionCallback} from "../../input/inputEventBus.ts";
import {InputEventTypes} from "../../input/types.ts";
import {PlayerTransformComponent} from "./transform.ts";
import {TelegramVibrationComponent} from "../../components/TelegramVibrationComponent.ts";

class PlayerJumpComponent extends BaseComponent<Player> {
    protected jumpForce: number = 200;

    protected jumpHandler: subscriptionCallback;

    constructor(
        object: Player
    ) {
        super(object);

        this.jumpHandler = this.jump.bind(this);

        InputEventBus.getInstance().subscribe(InputEventTypes.PointerUp, this.jumpHandler);
    }

    update(dt: number): void {}

    public jump(): void {
        const transformComponent = this.object.getComponent(PlayerTransformComponent);

        if (transformComponent.velocity.y > 0) {
            transformComponent.velocity.y = 0;
        }

        transformComponent.velocity = transformComponent.velocity.subtract(new Vector2D(0, this.jumpForce));

        ScoreManager.getInstance().increment();

        const vibrationComponent = this.object.getComponent(TelegramVibrationComponent);

        if (vibrationComponent) {
            vibrationComponent.vibrate("soft");
        }
    }

    teardown() {
        InputEventBus.getInstance().unsubscribe(InputEventTypes.PointerUp, this.jumpHandler);
    }
}

export {
    PlayerJumpComponent,
}
