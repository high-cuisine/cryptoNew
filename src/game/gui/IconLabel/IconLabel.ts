import {Vector2D} from "../../helpers/Vector2D.ts";
import {Size2D} from "../../helpers/Size2D.ts";
import {Anchor, TransformComponent} from "../../components/TransformComponent.ts";
import {TextRenderComponent} from "../../components/TextRenderComponent.ts";
import {ColorRGB, ColorRGBA} from "../../helpers/Color.ts";
import {GUIObject} from "../GUIObject.ts";
import {IconComponent, IconPlacement} from "../../components/IconComponent.ts";

class IconLabel extends GUIObject {
    constructor(
        text: string | (() => string),
        position: Vector2D,
        size: Size2D,
        iconKey: string,
        iconSize: Size2D,
        iconPlacement: IconPlacement = IconPlacement.Left,
        iconOffset: Vector2D = new Vector2D(0, 0),
        fontSize: number = 20,
        font: string = "monospace",
        color: ColorRGB | ColorRGBA = new ColorRGB(0, 0, 0),
        initialRotation: number = 0,
        initialScale: number = 1,
        anchor: Anchor = Anchor.TopLeft,
        textAlign: CanvasTextAlign = "center",
        textBaseLine: CanvasTextBaseline = "middle",
    ) {
        super();

        this.components = [
            new TransformComponent(this, position, size, new Vector2D(0, 0), initialRotation, initialScale, anchor),
            new TextRenderComponent(this, text, fontSize, font, color, textAlign, textBaseLine),
            new IconComponent(this, iconKey, iconSize, iconPlacement, iconOffset)
        ]
    }
}

export {
    IconLabel
};
