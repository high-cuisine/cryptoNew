import {Bonus} from "../../base/bonus/bonus.ts";
import {BoundBox} from "../../../helpers/BoundBox.ts";
import {Size2D} from "../../../helpers/Size2D.ts";
import {ScoreManager} from "../../../scoreManager.ts";
import {ImageRenderComponent} from "../../../components/ImageRenderComponent.ts";

class CoinBonus extends Bonus {
    protected readonly increment = 10;

    constructor(
        moveBounds: BoundBox,
    ) {
        super(moveBounds, new Size2D(40, 40), 100, 180);
        this.components.push(new ImageRenderComponent(this, "Coin"));
    }

    apply() {
        super.apply();

        ScoreManager.getInstance().increment(this.increment);
    }
}

export {
    CoinBonus,
}
