import {Bonus} from "../../entities/base/bonus/bonus.ts";
import {BoundBox} from "../BoundBox.ts";

interface BonusFactory {
    createBonus(moveBounds: BoundBox): Bonus;
}

export type {
    BonusFactory,
}
