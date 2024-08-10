import {BonusFactory} from "./bonusFactory.ts";
import {BoundBox} from "../BoundBox.ts";
import {Bonus} from "../../entities/base/bonus/bonus.ts";
import {CoinBonus} from "../../entities/bonuses/coinBonus";
import {HeartBonus} from "../../entities/bonuses/heartBonus";
import {DiceBonus} from "../../entities/bonuses/diceBonus";

class CoinBonusFactory implements BonusFactory {
    createBonus(moveBounds: BoundBox): Bonus {
        return new CoinBonus(moveBounds);
    }
}

class HeartBonusFactory implements BonusFactory {
    createBonus(moveBounds: BoundBox): Bonus {
        return new HeartBonus(moveBounds);
    }
}

class DiceBonusFactory implements BonusFactory {
    createBonus(moveBounds: BoundBox): Bonus {
        return new DiceBonus(moveBounds);
    }
}

export {
    CoinBonusFactory,
    HeartBonusFactory,
    DiceBonusFactory,
}
