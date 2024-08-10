import {Bonus} from "../../base/bonus/bonus.ts";
import {BoundBox} from "../../../helpers/BoundBox.ts";
import {Size2D} from "../../../helpers/Size2D.ts";
import {GameManager} from "../../../gameManager.ts";
import {ImageRenderComponent} from "../../../components/ImageRenderComponent.ts";

class HeartBonus extends Bonus {
    constructor(
        moveBounds: BoundBox,
    ) {
        super(moveBounds, new Size2D(40, 40), 100, 150);
        this.components.push(new ImageRenderComponent(this, "Heart"));
    }

    apply() {
        super.apply();

        GameManager.getInstance().gainLife();
    }
}

export {
    HeartBonus,
}
