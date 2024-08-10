import {BaseComponent} from "../../components/BaseComponent.ts";
import {Player} from "./player.ts";
import {PlayerTransformComponent} from "./transform.ts";

class PlayerScaleAnimation extends BaseComponent<Player> {
    protected readonly animationDuration: number = 0.5;
    protected animationElapsedTime: number = 0;

    protected readonly initialScale: number = 3;
    protected readonly targetScale: number = 1;

    constructor(object: Player) {
        super(object);

        const transformComponent = this.object.getComponent(PlayerTransformComponent);

        transformComponent.scale = this.initialScale;
    }

    update(dt: number) {
        const transformComponent = this.object.getComponent(PlayerTransformComponent);

        if (this.animationElapsedTime >= this.animationDuration) {
            if (transformComponent.scale !== this.targetScale) {
                transformComponent.scale = this.targetScale;
            }
            return;
        }

        this.animationElapsedTime += dt;

        // Вычисляем прогресс анимации (от 0 до 1)
        const progress = this.animationElapsedTime / this.animationDuration;

        const nextScaleValue = this.initialScale + (this.targetScale - this.initialScale) * progress;

        // Линейная интерполяция между initialScale и targetScale
        transformComponent.scale = parseFloat(nextScaleValue.toFixed(2));
    }

    public teardown(): void {}
}

export {
    PlayerScaleAnimation,
}
