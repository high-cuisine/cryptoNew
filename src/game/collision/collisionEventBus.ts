import {CollisionEventType} from "./CollisionEventType.ts";
import {CollisionEventData} from "./CollisionEventData.ts";
import {BaseObject} from "../objects/BaseObject.ts";


export type subscriptionCallback = (data: CollisionEventData) => void;

type CollisionSubscribers = {
    [objectId: BaseObject["id"]]: {
        [key in CollisionEventType]?: subscriptionCallback;
    },
};


class CollisionEventBus {
    private static instance: CollisionEventBus;
    private subscribers: CollisionSubscribers = {};

    private constructor() {}

    public static getInstance(): CollisionEventBus {
        if (!CollisionEventBus.instance) {
            CollisionEventBus.instance = new CollisionEventBus();
        }
        return CollisionEventBus.instance;
    }

    public subscribe(event: CollisionEventType, objectId: BaseObject["id"], callback: subscriptionCallback): void {
        if (!this.subscribers[objectId]) {
            this.subscribers[objectId] = {
                [event]: callback,
            };
        }
        this.subscribers[objectId][event] = callback;
    }

    public unsubscribe(event: CollisionEventType, objectId: BaseObject["id"]): void {
        if (!this.subscribers[objectId]) return;
        if (!this.subscribers[objectId][event]) return;

        this.subscribers[objectId][event] = undefined;
    }

    public emit(data: CollisionEventData): void {
        const selfData = data;
        const otherData = {...data, self: data.other, other: data.self};

        if (this.subscribers[data.self.id]) {
            if (this.subscribers[data.self.id][data.type]) {
                this.subscribers[data.self.id][data.type](selfData);
            }
        }
        if (this.subscribers[data.other.id]) {
            if (this.subscribers[data.other.id][data.type]) {
                this.subscribers[data.other.id][data.type](otherData);
            }
        }
    }
}

export {
    CollisionEventBus,
};