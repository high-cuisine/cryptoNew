import {BonusFactory} from "./bonusFactory.ts";
import {CoinBonusFactory, DiceBonusFactory, HeartBonusFactory} from "./factories.ts";

interface BonusSpawnerConfig {
    spawnInterval: number; // в миллисекундах
    bonuses: {
        [key: string]: {
            weight: number;
            maxCount?: number;
            factory: (new () => BonusFactory);
        };
    };
}

const DEFAULT_BONUS_SPAWNER_CONFIG: BonusSpawnerConfig = {
    spawnInterval: 2000,
    bonuses: {
        coin: { weight: 50, factory: CoinBonusFactory },
        heart: { weight: 20, maxCount: 2, factory: HeartBonusFactory },
        dice: { weight: 20, maxCount: 1, factory: DiceBonusFactory },
    },
};


export {
    DEFAULT_BONUS_SPAWNER_CONFIG
};

export type {
    BonusSpawnerConfig
};
