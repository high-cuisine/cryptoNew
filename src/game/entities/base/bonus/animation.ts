import {BaseComponent} from "../../../components/BaseComponent.ts";
import {Bonus} from "./bonus.ts";
import {BonusTransformComponent} from "./transform.ts";

class BonusAnimationComponent extends BaseComponent<Bonus> {
    protected readonly animationDuration: number = 0.1;
    protected animationElapsedTime: number = 0;

    constructor(
        object: Bonus,
    ) {
        super(object);
    }

    public update(dt: number): void {
        const transformComponent = this.object.getComponent(BonusTransformComponent);

        if (this.animationElapsedTime >= this.animationDuration) {
            this.object.shouldBeRemoved = true;
            return;
        }

        this.animationElapsedTime += dt;

        // Вычисляем прогресс анимации (от 0 до 1)
        const progress = this.animationElapsedTime / this.animationDuration;

        transformComponent.scale = 1 - progress;
    }

    public teardown(): void {}
}


export {
    BonusAnimationComponent,
}
