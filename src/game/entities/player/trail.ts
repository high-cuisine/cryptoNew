import {BaseRenderComponent} from "../../components/BaseRenderComponent.ts";
import {Player} from "./player.ts";
import {PlayerTransformComponent} from "./transform.ts";
import {Vector2D} from "../../helpers/Vector2D.ts";

class PlayerTrailRenderComponent extends BaseRenderComponent {
    protected trailAlpha: number = 0;
    protected readonly maxTrailLength: number = 100;
    protected readonly trailThresholdSpeed: number = 500;
    protected readonly trailFadeSpeed: number = 0.01;

    protected targetTrailLength?: number = 0;
    protected currentTrailLength?: number = 0;

    protected readonly maxSpeed = 1000;

    constructor(object: Player) {
        super(object);


    }

    draw(ctx: CanvasRenderingContext2D) {
        const transformComponent = this.object.getComponent(PlayerTransformComponent);

        const playerRadius = Math.min(transformComponent.size.width, transformComponent.size.height) / 2;

        //  Плавное появление/исчезание шлейфа
        if (Math.abs(transformComponent.velocity.y) > this.trailThresholdSpeed) {
            this.trailAlpha = Math.min(this.trailAlpha + this.trailFadeSpeed, 0.5);
        } else {
            this.trailAlpha = Math.max(this.trailAlpha - this.trailFadeSpeed, 0);
        }

        //  Не рисуем трейл, если он невидим
        if (this.trailAlpha <= 0) {
            return;
        }

        //  Расчет угла движения
        const angle = Math.atan2(transformComponent.velocity.y, transformComponent.velocity.x);

        //  Радиус дуги основания трейла (пропорционален скорости)
        const baseRadius = playerRadius * Math.min(Math.abs(transformComponent.velocity.y) / this.maxSpeed, 1);

        //  Точки основания трейла (дуга окружности)
        const numBasePoints = 16; //  Количество точек для отрисовки дуги
        const basePoints: Vector2D[] = [];
        for (let i = 0; i <= numBasePoints; i++) {
            const t = i / numBasePoints;

            // Изменяем логику расчета baseAngle
            let baseAngle = angle + Math.PI / 2 - t * Math.PI;
            if (transformComponent.velocity.y > 0) {
                baseAngle -= Math.PI; // Сдвигаем угол на π при движении вниз
            }

            basePoints.push(new Vector2D(
                transformComponent.position.x - baseRadius * Math.cos(baseAngle) * transformComponent.scale,
                transformComponent.position.y - baseRadius * Math.sin(baseAngle) * transformComponent.scale
            ));
        }

        const trailLength = Math.min(Math.abs(transformComponent.velocity.y) / this.maxSpeed * this.maxTrailLength, this.maxTrailLength);
        this.targetTrailLength = trailLength; //  Сохраняем целевую длину трейла

        //  Плавное изменение длины трейла с помощью линейной интерполяции
        this.currentTrailLength += (this.targetTrailLength - this.currentTrailLength) * 0.95; //  Интерполяция с коэффициентом 0.1

        //  Вершина трейла
        const tipPoint = {
            x: transformComponent.position.x - this.currentTrailLength * Math.cos(angle),  //  Используем this.currentTrailLength
            y: transformComponent.position.y - this.currentTrailLength * Math.sin(angle)   //  Используем this.currentTrailLength
        };

        //  Рисуем трейл
        ctx.fillStyle = `rgba(255, 255, 255, ${this.trailAlpha})`; //  Белый цвет с изменяемой прозрачностью
        ctx.beginPath();
        ctx.moveTo(basePoints[0].x, basePoints[0].y);
        //  Кривые Безье для вогнутых сторон
        for (let i = 1; i < basePoints.length; i++) {
            const cp1 = {
                x: (basePoints[i - 1].x + basePoints[i].x) / 2,
                y: (basePoints[i - 1].y + basePoints[i].y) / 2 - trailLength / 4  //  Контрольная точка для вогнутости
            };
            ctx.quadraticCurveTo(cp1.x, cp1.y, basePoints[i].x, basePoints[i].y);
        }
        //  Соединяем с вершиной
        ctx.lineTo(tipPoint.x, tipPoint.y);
        ctx.closePath();
        ctx.fill();
    }

    teardown(): void {}
}

export {
    PlayerTrailRenderComponent,
}
