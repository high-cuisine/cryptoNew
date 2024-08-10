import { InputEventBus } from "./inputEventBus";
import {InputEventTypes} from "./types.ts";
import {Vector2D} from "../helpers/Vector2D.ts";

class InputManager {
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.initListeners();
    }

    private initListeners(): void {
        this.canvas.addEventListener('pointerdown', this.handlePointerDown.bind(this));
        this.canvas.addEventListener('pointerup', this.handlePointerUp.bind(this));
    }

    private handlePointerDown(event: PointerEvent): void {
        if (!event.defaultPrevented) event.preventDefault();

        const canvasRect = this.canvas.getBoundingClientRect();
        const x = event.clientX - canvasRect.left;
        const y = event.clientY - canvasRect.top;

        InputEventBus.getInstance().emit(InputEventTypes.PointerDown, new Vector2D(x, y));
    }

    private handlePointerUp(event: PointerEvent): void {
        if (!event.defaultPrevented) event.preventDefault();

        const canvasRect = this.canvas.getBoundingClientRect();
        const x = event.clientX - canvasRect.left;
        const y = event.clientY - canvasRect.top;

        InputEventBus.getInstance().emit(InputEventTypes.PointerUp, new Vector2D(x, y));
    }
}

export { InputManager };
