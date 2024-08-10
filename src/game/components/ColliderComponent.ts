import {BaseComponent} from "./BaseComponent.ts";
import {CollisionEventData} from "../collision/CollisionEventData.ts";
import {BaseObject} from "../objects/BaseObject.ts";
import {TransformComponent} from "./TransformComponent.ts";
import {CollisionEventBus} from "../collision/collisionEventBus.ts";
import {CollisionEventType} from "../collision/CollisionEventType.ts";

class ColliderComponent<ObjType extends BaseObject = BaseObject> extends BaseComponent<ObjType> {
    private onCollisionEnterHandler: (eventData: CollisionEventData<ObjType>) => void;
    private onCollisionStayHandler: (eventData: CollisionEventData<ObjType>) => void;
    private onCollisionExitHandler: (eventData: CollisionEventData<ObjType>) => void;

    constructor(object: ObjType) {
        if (!object.getComponent(TransformComponent)) throw new Error("Collider component requires TransformComponent");

        super(object);

        this.onCollisionEnterHandler = this.collisionHandlerWrapper.bind(this);
        this.onCollisionStayHandler = this.collisionHandlerWrapper.bind(this);
        this.onCollisionExitHandler = this.collisionHandlerWrapper.bind(this);

        CollisionEventBus.getInstance().subscribe(CollisionEventType.Enter, this.object.id, this.onCollisionEnterHandler);
        CollisionEventBus.getInstance().subscribe(CollisionEventType.Stay, this.object.id, this.onCollisionStayHandler);
        CollisionEventBus.getInstance().subscribe(CollisionEventType.Exit, this.object.id, this.onCollisionExitHandler);
    }

    update(dt: number) {}

    private collisionHandlerWrapper(eventData: CollisionEventData<ObjType>): void {
        if (!eventData.other.getComponent(ColliderComponent)) {
            return;
        }

        const transform1 = eventData.self.getComponent(TransformComponent);
        const transform2 = eventData.other.getComponent(TransformComponent);

        if (!transform1 || !transform2) {
            console.warn("Both objects must have TransformComponent to resolve collision.");
            return;
        }

        switch (eventData.type) {
            case CollisionEventType.Enter:
                this.onCollisionEnter(eventData);
                break;
            case CollisionEventType.Stay:
                this.onCollisionStay(eventData);
                break;
            case CollisionEventType.Exit:
                this.onCollisionExit(eventData);
                break;
            default:
                console.warn('Unhandled collision type: ', eventData.type);
                break;
        }
    }

    onCollisionEnter(eventData: CollisionEventData<ObjType>): void {}
    onCollisionStay(eventData: CollisionEventData<ObjType>): void {}
    onCollisionExit(eventData: CollisionEventData<ObjType>): void {}

    teardown() {
        CollisionEventBus.getInstance().unsubscribe(CollisionEventType.Enter, this.object.id);
        CollisionEventBus.getInstance().unsubscribe(CollisionEventType.Stay, this.object.id);
        CollisionEventBus.getInstance().unsubscribe(CollisionEventType.Exit, this.object.id);
    }
}

export {
    ColliderComponent,
}
