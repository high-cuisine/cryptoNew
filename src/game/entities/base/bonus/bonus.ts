import {BaseObject} from "../../../objects/BaseObject.ts";
import {Layer} from "../../../objects/Layer.ts";
import {BonusTransformComponent} from "./transform.ts";
import {BoundBox} from "../../../helpers/BoundBox.ts";
import {Size2D} from "../../../helpers/Size2D.ts";
import {BonusColliderComponent} from "./collider.ts";
import {BonusAnimationComponent} from "./animation.ts";

class Bonus extends BaseObject {
    protected _applied: boolean = false;
    protected _shouldBeRemoved: boolean = false;

    constructor(moveBounds: BoundBox, size: Size2D, minXVelocity: number = 100, maxXVelocity = 250) {
        super(Layer.Object);

        this.components.push(new BonusTransformComponent(this, moveBounds, size, minXVelocity, maxXVelocity));
        this.components.push(new BonusColliderComponent(this));
    }

    update(dt: number) {
        if (this.shouldBeRemoved) return;

        super.update(dt);
    }

    render(ctx: CanvasRenderingContext2D) {
        if (this.shouldBeRemoved) return;

        super.render(ctx);
    }

    apply(): void {
        if (this._applied) return;

        this._applied = true;

        const animationComponent = new BonusAnimationComponent(this);
        this.components.push(animationComponent);
    }

    get applied(): boolean {
        return this._applied;
    }

    get shouldBeRemoved(): boolean {
        return this._shouldBeRemoved;
    }

    set shouldBeRemoved(value: boolean) {
        if (this._shouldBeRemoved) return;

        this._shouldBeRemoved = value;
    }
}

export {
    Bonus,
}
