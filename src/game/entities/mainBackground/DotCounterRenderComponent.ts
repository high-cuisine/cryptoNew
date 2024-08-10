import {BaseRenderComponent} from "../../components/BaseRenderComponent.ts";
import {DotCounter} from "./dotCounter.ts";
import {Vector2D} from "../../helpers/Vector2D.ts";
import {AssetManager} from "../../helpers/assets/manager.ts";
import {Size2D} from "../../helpers/Size2D.ts";

class DotCounterRenderComponent<ObjType extends DotCounter = DotCounter> extends BaseRenderComponent<ObjType> {
    private totalTime: number;
    private currentTime: (() => number);
    private centerPos: Vector2D;
    private radius: number;
    private totalDots: number = 30;

    constructor(
        object: ObjType,
        totalTime: number,
        currentTime: (() => number),
        centerPos: Vector2D,
        backgroundSize: Size2D,
        backgroundKey: string,
    ) {
        super(object);

        this.totalTime = totalTime;
        this.currentTime = currentTime;
        this.centerPos = centerPos;

        const image = AssetManager.getInstance().getResource(backgroundKey);

        const maxWidth = backgroundSize.width;
        const maxHeight = backgroundSize.height;

        // 2. Вычисляем коэффициент масштабирования
        const scaleX = maxWidth / image.width;
        const scaleY = maxHeight / image.height;
        const scale = Math.min(scaleX, scaleY);

        // 3. Вычисляем новые размеры изображения
        const newWidth = image.width * scale;

        this.radius = newWidth / 2 * 0.595;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        const currentTime = this.currentTime();

        const dotsCount = Math.floor(this.totalDots * (currentTime / this.totalTime));

        const angleBetweenDots = 360 / this.totalDots;

        ctx.save();

        ctx.fillStyle = "white";
        ctx.globalAlpha = 0.45;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "white";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        for (let i = 0; i < dotsCount; i++) {
            const currentAngle = (i * angleBetweenDots) - 90;

            const currentAngleInRadians = currentAngle * Math.PI / 180;

            const position = new Vector2D(this.centerPos.x + this.radius * Math.cos(currentAngleInRadians), this.centerPos.y + this.radius * Math.sin(currentAngleInRadians));

            ctx.save();

            ctx.translate(position.x, position.y);

            ctx.beginPath();
            ctx.arc(0, 0, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();

            ctx.restore();
        }

        ctx.restore();
    }

    public teardown(): void {}
}

export {
    DotCounterRenderComponent,
}
