import { Vector2D } from "../helpers/Vector2D.ts";
import {InputEventTypes} from "../input/types.ts";
import {InputEventBus, subscriptionCallback} from "../input/inputEventBus.ts";
import {Size2D} from "../helpers/Size2D.ts";
import {TransformComponent} from "../components/TransformComponent.ts";
import {TextRenderComponent} from "../components/TextRenderComponent.ts";
import {ColorRGB, ColorRGBA} from "../helpers/Color.ts";
import {GUIObject} from "./GUIObject.ts";

export type onPointerDownHandler = subscriptionCallback;
export type onPointerUpHandler = subscriptionCallback;

class Button extends GUIObject {
    public label: string;
    protected onPointerUp: onPointerUpHandler;
    protected onPointerDown: onPointerDownHandler;
    protected pointerUpHandler: subscriptionCallback;
    protected pointerDownHandler: subscriptionCallback;

    constructor(label: string, position: Vector2D, size: Size2D, onPointerUp: onPointerUpHandler = () => {}, onPointerDown: onPointerUpHandler = () => {}, fontSize: number = 20, font: string = 'monospace', fontColor: ColorRGB | ColorRGBA = ColorRGB.fromCSS('black'), initialRotation: number = 0, initialScale: number = 1) {
        super();
        this.label = label;
        this.onPointerUp = onPointerUp;
        this.onPointerDown = onPointerDown;

        this.pointerUpHandler = this.handlePointerUp.bind(this);
        this.pointerDownHandler = this.handlePointerDown.bind(this);

        InputEventBus.getInstance().subscribe(InputEventTypes.PointerUp, this.pointerUpHandler)
        InputEventBus.getInstance().subscribe(InputEventTypes.PointerDown, this.pointerDownHandler)

        this.components = [
            new TransformComponent(this, position, size, new Vector2D(0 ,0), initialRotation, initialScale),
            new TextRenderComponent(this, this.label, fontSize, font, fontColor)
        ];
    }

    teardown() {
        InputEventBus.getInstance().unsubscribe(InputEventTypes.PointerUp, this.pointerUpHandler);
        InputEventBus.getInstance().unsubscribe(InputEventTypes.PointerDown, this.pointerDownHandler);

        super.teardown();
    }

    private handlePointerUp(position: Vector2D): void {
        if (this.isPointInside(position)) {
            this.onPointerUp(position);
        }
    }

    private handlePointerDown(position: Vector2D): void {
        if (this.isPointInside(position)) {
            this.onPointerDown(position);
        }
    }

    private isPointInside(point: Vector2D): boolean {
        const transformComponent = this.getComponent(TransformComponent);

        if (!transformComponent) {
            console.warn("For correct button work, you need to add TransformComponent");
            return false;
        }

        return transformComponent.boundBox.containsPoint(point);
    }
}

export { Button };