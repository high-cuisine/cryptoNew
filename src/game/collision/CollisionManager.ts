import { BaseObject } from "../objects/BaseObject.ts";
import { BoundBox } from "../helpers/BoundBox.ts";
import { CollisionEventData } from "./CollisionEventData.ts";
import { CollisionEventType } from "./CollisionEventType.ts";
import {Vector2D} from "../helpers/Vector2D.ts";
import {Size2D} from "../helpers/Size2D.ts";
import {TransformComponent} from "../components/TransformComponent.ts";
import {CollisionEventBus} from "./collisionEventBus.ts";
import {Quadtree} from "./quadtree.ts";

class CollisionManager {
    private static instance: CollisionManager;
    private quadtree: Quadtree;

    private previousCollisions: { [key: string]: BaseObject[] } = {};

    private constructor(width: number, height: number) {
        this.quadtree = new Quadtree(new BoundBox(new Vector2D(0, 0), new Size2D(width, height)));
    }

    public static getInstance(width?: number, height?: number): CollisionManager {
        if (!CollisionManager.instance) {
            if (typeof width === "undefined" || typeof height === "undefined") {
                throw new Error("The first call to CollisionManager.getInstance must pass width and height");
            }

            CollisionManager.instance = new CollisionManager(width, height);
        }
        return CollisionManager.instance;
    }

    public addObject(object: BaseObject): void {
        const transformComponent = object.getComponent(TransformComponent);
        if (transformComponent) {
            this.quadtree.insert(object, transformComponent.boundBox);
        }
    }

    public removeObject(object: BaseObject): void {
        this.quadtree.remove(object);
    }

    public clearObjects(): void {
        this.quadtree.clear();
    }

    public update(dt: number, gameObjects: BaseObject[]): void {
        // 1. Очищаем quadtree
        this.clearObjects();

        // 2. Заново добавляем все объекты в quadtree
        gameObjects.forEach(object => this.addObject(object));

        const currentCollisions: { [key: string]: BaseObject[] } = {};

        // 3. Проверяем столкновения
        gameObjects.forEach(object1 => {
            const transform1 = object1.getComponent(TransformComponent);
            if (!transform1) return;

            const potentialCollisions = this.quadtree.retrieve(transform1.boundBox);

            potentialCollisions.forEach(object2 => {
                if (object1 === object2) return; // Игнорируем столкновения с самим собой

                const transform2 = object2.getComponent(TransformComponent);
                if (!transform2) return;

                const key = this.getCollisionKey(object1, object2);

                if (transform1.boundBox.intersects(transform2.boundBox)) {
                    // Enter
                    if (!this.previousCollisions[key]) {
                        this.emitCollisionEvent({
                            type: CollisionEventType.Enter,
                            self: object1,
                            other: object2,
                        });
                    }
                    else { // stay
                        this.emitCollisionEvent({
                            type: CollisionEventType.Stay,
                            self: object1,
                            other: object2,
                        });
                    }


                    // Записываем текущее столкновение
                    currentCollisions[key] = [object1, object2];
                }
            });
        });

        for (const key in this.previousCollisions) {
            if (!currentCollisions[key]) {
                this.emitCollisionEvent({
                    type: CollisionEventType.Exit,
                    self: this.previousCollisions[key][0],
                    other: this.previousCollisions[key][1],
                });
            }
        }

        // Обновляем previousCollisions
        this.previousCollisions = currentCollisions;
    }

    private getCollisionKey(object1: BaseObject, object2: BaseObject): string {
        // Создаем уникальный ключ для пары объектов (независимо от порядка)
        const id1 = object1.id; // Предполагаем, что у BaseObject есть свойство id
        const id2 = object2.id;
        return id1 < id2 ? `${id1}-${id2}` : `${id2}-${id1}`;
    }

    private emitCollisionEvent(eventData: CollisionEventData): void {
        CollisionEventBus.getInstance().emit(eventData);
    }
}

export {
    CollisionManager,
};
