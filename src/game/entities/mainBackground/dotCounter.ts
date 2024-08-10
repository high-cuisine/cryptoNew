import {BaseObject} from "../../objects/BaseObject.ts";
import {Layer} from "../../objects/Layer.ts";
import {DotCounterRenderComponent} from "./DotCounterRenderComponent.ts";
import {Vector2D} from "../../helpers/Vector2D.ts";
import {Size2D} from "../../helpers/Size2D.ts";

class DotCounter extends BaseObject {
    constructor(
        totalTime: number,
        currentTime: () => number,
        centerPos: Vector2D,
        backgroundSize: Size2D,
        backgroundKey: string,
    ) {
        super(Layer.Background);

        this.addComponent(new DotCounterRenderComponent(
            this, totalTime, currentTime, centerPos, backgroundSize, backgroundKey,
        ));
    }
}

export {
    DotCounter,
}
