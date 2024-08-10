import { BaseRenderComponent } from "./BaseRenderComponent.ts";
import { TransformComponent } from "./TransformComponent.ts";
import {BaseObject} from "../objects/BaseObject.ts";
import {AssetManager} from "../helpers/assets/manager.ts";

class ImageRenderComponent<ObjType extends BaseObject = BaseObject> extends BaseRenderComponent<ObjType> {
    private _image: HTMLImageElement | HTMLCanvasElement;

    constructor(object: ObjType, imageKey: string) {
        super(object);
        if (AssetManager.getInstance().hasCached(imageKey)) {
            this._image = AssetManager.getInstance().getCachedImage(imageKey);
        }
        else {
            this._image = AssetManager.getInstance().getResource(imageKey);
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const transformComponent = this.object.getComponent(TransformComponent);
        if (!transformComponent) {
            console.warn(
                "ImageRenderComponent requires TransformComponent to be present on the GameObject"
            );
            return;
        }

        if (!this._image) {
            return;
        }

        ctx.save();
        ctx.translate(transformComponent.boundBox.x, transformComponent.boundBox.y);
        ctx.rotate(transformComponent.rotation);
        ctx.scale(transformComponent.scale, transformComponent.scale);
        ctx.drawImage(
            this._image,
            0,
            0,
            transformComponent.size.width,
            transformComponent.size.height
        );
        ctx.restore();
    }

    teardown() {}
}

export { ImageRenderComponent };
