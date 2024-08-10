import {ColliderComponent} from "../../../components/ColliderComponent.ts";
import {Bonus} from "./bonus.ts";
import {CollisionEventData} from "../../../collision/CollisionEventData.ts";
import {PlayerColliderComponent} from "../../player/collider.ts";

class BonusColliderComponent extends ColliderComponent<Bonus> {
    constructor(
        object: Bonus,
    ) {
        super(object);
    }

    onCollisionEnter(eventData: CollisionEventData<Bonus>) {
        if (this.object.applied) return;
        if (!eventData.other.getComponent(PlayerColliderComponent)) return;

        super.onCollisionEnter(eventData);

        this.object.apply();
    }
}


export {
    BonusColliderComponent,
}
