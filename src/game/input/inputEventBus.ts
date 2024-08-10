import {InputEventTypes} from "./types.ts";
import {Vector2D} from "../helpers/Vector2D.ts";


export type subscriptionCallback = (position: Vector2D) => void;


class InputEventBus {
    private static instance: InputEventBus;
    private subscribers: { [key in InputEventTypes]?: subscriptionCallback[] } = {};

    private constructor() {}

    public static getInstance(): InputEventBus {
        if (!InputEventBus.instance) {
            InputEventBus.instance = new InputEventBus();
        }
        return InputEventBus.instance;
    }

    public subscribe(event: InputEventTypes, callback: subscriptionCallback): void {
        if (!this.subscribers[event]) {
            this.subscribers[event] = [];
        }
        this.subscribers[event].push(callback);
    }

    public unsubscribe(event: InputEventTypes, callback: subscriptionCallback): void {
        if (this.subscribers[event]) {
            this.subscribers[event] = this.subscribers[event].filter(subscriber => subscriber !== callback);
        }
    }

    public emit(event: InputEventTypes, position: Vector2D): void {
        if (this.subscribers[event]) {
            this.subscribers[event].forEach(callback => callback(position));
        }
    }
}

export {
    InputEventBus,
};