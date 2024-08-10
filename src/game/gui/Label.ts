import { Vector2D } from "../helpers/Vector2D.ts";
import { Size2D } from "../helpers/Size2D.ts";
import {Anchor, TransformComponent} from "../components/TransformComponent.ts";
import { TextRenderComponent } from "../components/TextRenderComponent.ts";
import {ColorRGB, ColorRGBA} from "../helpers/Color.ts";
import {GUIObject} from "./GUIObject.ts";

class Label extends GUIObject {
    constructor(
        text: string | (() => string),
        position: Vector2D,
        size: Size2D,
        fontSize: number = 20,
        font: string = "monospace",
        color: ColorRGB | ColorRGBA = new ColorRGB(0, 0, 0),
        initialRotation: number = 0,
        initialScale: number = 1,
        anchor: Anchor = Anchor.TopLeft,
    ) {
        super();

        this.components = [
            new TransformComponent(this, position, size, new Vector2D(0, 0), initialRotation, initialScale, anchor),
            new TextRenderComponent(this, text, fontSize, font, color),
        ]
    }
}

export { Label };
