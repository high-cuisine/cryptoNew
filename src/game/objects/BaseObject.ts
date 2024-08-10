import {BaseComponent} from "../components/BaseComponent";
import {BaseRenderComponent} from "../components/BaseRenderComponent.ts";
import {Layer} from "./Layer.ts";
import {TransformComponent} from "../components/TransformComponent.ts";
import {uuid} from "../helpers/uuid.ts";
import {DEBUG} from "../game.ts";

class BaseObject {
    protected _layer: Layer;
    protected components: BaseComponent<BaseObject>[] = [];

    protected _id: string = uuid();

    constructor(layer: Layer = Layer.Object) {
        this._layer = layer;
    }

    get layer(): number {
        return this._layer;
    }

    get id(): string {
        return this._id;
    }

    public addComponent(component: BaseComponent<BaseObject>): void {
        this.components.push(component);
    }

    public getComponent<T extends BaseComponent<BaseObject>>(componentType: { new(...args: any[]): T }): T | undefined {
        return this.components.find(c => c instanceof componentType) as T | undefined;
    }

    public removeComponent<T extends BaseComponent<BaseObject>>(componentType: { new(...args: any[]): T }): void {
        const index = this.components.findIndex(c => c instanceof componentType);
        if (index !== -1) {
            this.components.splice(index, 1);
        }
    }

    update(dt: number): void {
        this.components.filter(component => component instanceof BaseComponent && !(component instanceof BaseRenderComponent)).forEach(component => component.update(dt));
    }

    render(ctx: CanvasRenderingContext2D): void {
        if (DEBUG) {
            const transform = this.getComponent(TransformComponent);

            if (transform) {
                const bounds = transform.boundBox;

                ctx.strokeStyle = "green";
                ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
            }
        }

        this.components.filter(component => component instanceof BaseRenderComponent).forEach(component => component.draw(ctx));
    }

    teardown(): void {
        this.components.forEach(component => {
            if (component.teardown) component.teardown();
        })
    }
}

export { BaseObject };
