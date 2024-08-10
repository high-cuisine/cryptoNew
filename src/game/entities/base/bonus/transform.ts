import {Anchor, TransformComponent} from "../../../components/TransformComponent.ts";
import {Vector2D} from "../../../helpers/Vector2D.ts";
import {Size2D} from "../../../helpers/Size2D.ts";
import {Bonus} from "./bonus.ts";
import {BoundBox} from "../../../helpers/BoundBox.ts";
import {getRandomInt} from "../../../helpers/random.ts";

class BonusTransformComponent extends TransformComponent<Bonus> {
    protected moveBounds: BoundBox;

    constructor(
        object: Bonus,
        moveBounds: BoundBox,
        size: Size2D,
        minXVelocity: number,
        maxXVelocity: number,
        initialRotation = 0,
        initialScale = 1,
    ) {
        const direction: number = Math.random() > 0.5 ? 1 : -1;

        const initialPos = new Vector2D(direction > 0 ? moveBounds.x : moveBounds.width, getRandomInt(moveBounds.y + size.height, moveBounds.height - size.height));
        const velocity = new Vector2D(getRandomInt(minXVelocity, maxXVelocity) * direction, 0);

        super(object, initialPos, size, velocity, initialRotation, initialScale, Anchor.Center);

        this.moveBounds = moveBounds;
    }

    update(dt: number) {
        super.update(dt);

        if (!this.boundBox.intersects(this.moveBounds)) {
            this.object.shouldBeRemoved = true;
        }
    }

    teardown() {}
}


export {
    BonusTransformComponent,
}
