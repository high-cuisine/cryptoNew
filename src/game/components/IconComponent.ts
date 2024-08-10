import {BaseRenderComponent} from "./BaseRenderComponent.ts";
import {TransformComponent} from "./TransformComponent.ts";
import {Vector2D} from "../helpers/Vector2D.ts";
import {Size2D} from "../helpers/Size2D.ts";
import {GUIObject} from "../gui/GUIObject.ts";
import {TextRenderComponent} from "./TextRenderComponent.ts";
import {BoundBox} from "../helpers/BoundBox.ts";
import {AssetManager} from "../helpers/assets/manager.ts";

enum IconPlacement {
    Left,
    Right,
}

class IconComponent<ObjType extends GUIObject = GUIObject> extends BaseRenderComponent<ObjType> {
    private _image: HTMLImageElement | HTMLCanvasElement;
    private iconBounds: BoundBox;

    constructor(
        object: ObjType,
        iconKey: string,
        private iconSize: Size2D,
        private placement: IconPlacement = IconPlacement.Left,
        private offset: Vector2D = new Vector2D(0, 0) // Смещение от текста
    ) {
        super(object);

        if (AssetManager.getInstance().hasCached(iconKey)) {
            this._image = AssetManager.getInstance().getCachedImage(iconKey);
        }
        else {
            this._image = AssetManager.getInstance().getResource(iconKey);
        }

        this.iconBounds = new BoundBox(new Vector2D(0, 0), iconSize);
    }

    protected calculateBounds(): void {
        const textComponent = this.object.getComponent(TextRenderComponent);
        const transformComponent = this.object.getComponent(TransformComponent);

        if (!textComponent) {
            if (!transformComponent) {
                console.warn('Either TextRenderComponent or TransformComponent must be presented in object');
                return;
            }

            switch (this.placement) {
                case IconPlacement.Left:
                    this.iconBounds.position = transformComponent.position.add(this.offset);
                    break;
                case IconPlacement.Right:
                    this.iconBounds.position = transformComponent.position.add(new Vector2D(transformComponent.size.width, 0)).subtract(new Vector2D(this.iconBounds.size.width, 0)).add(this.offset);
                    break;
            }
        }
        else {
            switch (this.placement) {
                case IconPlacement.Left:
                    this.iconBounds.position = textComponent.textBounds.position.subtract(new Vector2D(this.iconSize.width, 0)).add(this.offset);
                    break;
                case IconPlacement.Right:
                    this.iconBounds.position = textComponent.textBounds.position.add(new Vector2D(textComponent.textBounds.width, 0)).add(this.offset);
                    break;
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.calculateBounds();

        const transformComponent = this.object.getComponent(TransformComponent);

        if (!transformComponent) {
            console.warn("TransformComponent must be presented")
            return;
        }

        if (!this._image) {
            return;
        }

        ctx.save();
        ctx.translate(this.iconBounds.x, this.iconBounds.y);
        ctx.rotate(transformComponent.rotation);
        ctx.scale(transformComponent.scale, transformComponent.scale);
        ctx.drawImage(
            this._image,
            0,
            0,
            this.iconBounds.size.width,
            this.iconBounds.size.height
        );
        ctx.restore();
    }

    teardown() {}
}

export {IconComponent, IconPlacement};