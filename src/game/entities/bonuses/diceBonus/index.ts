import {Bonus} from "../../base/bonus/bonus.ts";
import {BoundBox} from "../../../helpers/BoundBox.ts";
import {Size2D} from "../../../helpers/Size2D.ts";
import {ImageRenderComponent} from "../../../components/ImageRenderComponent.ts";


class DiceBonus extends Bonus {
    constructor(
        moveBounds: BoundBox,
    ) {
        super(moveBounds, new Size2D(40, 40), 100, 180);
        this.components.push(new ImageRenderComponent(this, "Dice"));
    }
    apply() {
        super.apply();

   
    }
}

export {
    DiceBonus,
}
