import {Button, onPointerDownHandler, onPointerUpHandler} from "./Button.ts";
import {Vector2D} from "../helpers/Vector2D.ts";
import {Size2D} from "../helpers/Size2D.ts";
import {ColorRGB, ColorRGBA} from "../helpers/Color.ts";
import {Anchor, TransformComponent} from "../components/TransformComponent.ts";
import {ImageRenderComponent} from "../components/ImageRenderComponent.ts";

class PlayButton extends Button {
    constructor(label: string, position: Vector2D, size: Size2D, onPointerUp: onPointerUpHandler = () => {}, onPointerDown: onPointerDownHandler = () => {}, fontSize: number = 20, font: string = 'monospace', fontColor: ColorRGB | ColorRGBA = ColorRGB.fromCSS('black'), initialRotation: number = 0, initialScale: number = 1) {
        super(label, position, size, onPointerUp, onPointerDown, fontSize, font, fontColor, initialRotation, initialScale);

        this.components.unshift(new ImageRenderComponent(this, "Ball"));
        this.getComponent(TransformComponent).anchor = Anchor.Center;
    }
}

export {
    PlayButton,
}
