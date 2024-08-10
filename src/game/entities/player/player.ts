import {BaseObject} from "../../objects/BaseObject.ts";
import {Layer} from "../../objects/Layer.ts";
import {Vector2D} from "../../helpers/Vector2D.ts";
import {Size2D} from "../../helpers/Size2D.ts";
import {PlayerColliderComponent} from "./collider.ts";
import {PlayerTransformComponent} from "./transform.ts";
import {PlayerTrailRenderComponent} from "./trail.ts";
import {PlayerScaleAnimation} from "./scaleAnimation.ts";
import {PlayerJumpComponent} from "./jump.ts";
import {ImageRenderComponent} from "../../components/ImageRenderComponent.ts";
import {TelegramVibrationComponent} from "../../components/TelegramVibrationComponent.ts";

class Player extends BaseObject {
    constructor(initialPosition: Vector2D, initialSize: Size2D) {
        super(Layer.Object);

        this.components.push(new PlayerTransformComponent(this, initialPosition, initialSize, new Vector2D(0, 0)));
        this.components.push(new PlayerTrailRenderComponent(this));
        this.components.push(new ImageRenderComponent(this, "Ball"));
        this.components.push(new PlayerColliderComponent(this));
        this.components.push(new PlayerScaleAnimation(this));
        this.components.push(new TelegramVibrationComponent(this));
    }

    public enableControls() {
        if (!this.controlsEnabled) {
            this.addComponent(new PlayerJumpComponent(this));
        }
    }

    public disableControls() {
        if (!this.controlsEnabled) return;

        this.getComponent(PlayerJumpComponent).teardown();
        this.removeComponent(PlayerJumpComponent);
    }

    get controlsEnabled(): boolean {
        return this.getComponent(PlayerJumpComponent) !== undefined;
    }
}

export {
    Player,
}
