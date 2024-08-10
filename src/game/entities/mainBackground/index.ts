import {BaseObject} from "../../objects/BaseObject.ts";
import {Layer} from "../../objects/Layer.ts";
import {ImageRenderComponent} from "../../components/ImageRenderComponent.ts";
import {Anchor, TransformComponent} from "../../components/TransformComponent.ts";
import {Size2D} from "../../helpers/Size2D.ts";
import {Vector2D} from "../../helpers/Vector2D.ts";
import {AssetManager} from "../../helpers/assets/manager.ts";

class MainBackground extends BaseObject {
    constructor(
        position: Vector2D,
        size: Size2D,
    ) {
        super(Layer.Background);

        const image = AssetManager.getInstance().getResource("MainBackground");

        const maxWidth = size.width;
        const maxHeight = size.height;

        // 2. Вычисляем коэффициент масштабирования
        const scaleX = maxWidth / image.width;
        const scaleY = maxHeight / image.height;
        const scale = Math.min(scaleX, scaleY);

        // 3. Вычисляем новые размеры изображения
        const newWidth = image.width * scale;
        const newHeight = image.height * scale;

        this.components.unshift(
            new TransformComponent(this, position, new Size2D(newWidth, newHeight), new Vector2D(0, 0), undefined, undefined, Anchor.Center),
            new ImageRenderComponent(this, "MainBackground"),
        );
    }
}

export {
    MainBackground,
}
