import {BonusFactory} from "./bonusFactory.ts";
import {GameState} from "../../states/gameState.ts";
import {BoundBox} from "../BoundBox.ts";
import {Vector2D} from "../Vector2D.ts";
import {Size2D} from "../Size2D.ts";
import {BonusSpawnerConfig, DEFAULT_BONUS_SPAWNER_CONFIG} from "./spawnerConfig.ts";

class BonusSpawner {
    private spawnInterval: number;
    private spawnTimer: number = 0;
    private bonusFactories: { [key: string]: { factory: BonusFactory; weight: number, spawned: number, maxCount?: number } } = {};

    constructor(private gameState: GameState, config: BonusSpawnerConfig = DEFAULT_BONUS_SPAWNER_CONFIG) { // spawnInterval в секундах
        this.spawnInterval = config.spawnInterval;

        for (const [bonusName, bonusConfig] of Object.entries(config.bonuses)) {
            this.addBonusFactory(bonusName, new bonusConfig.factory(), bonusConfig.weight, bonusConfig.maxCount);
        }
    }

    addBonusFactory(name: string, factory: BonusFactory, weight: number, maxCount?: number): void {
        this.bonusFactories[name] = {factory, weight, spawned: 0, maxCount};
    }

    update(dt: number, canvas: HTMLCanvasElement): void {
        this.spawnTimer += dt * 1000;

        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnTimer = 0;
            this.spawnBonus(canvas);
        }
    }

    collectedCount(bonusName: string): number {
        return this.bonusFactories[bonusName].spawned;
    }

    resetCounter(): void {
        for (const bonusFactoriesKey in this.bonusFactories) {
            this.bonusFactories[bonusFactoriesKey].spawned = 0;
        }
    }

    private spawnBonus(canvas: HTMLCanvasElement): void {
        const bonusMoveBounds = new BoundBox(new Vector2D(0, 50), new Size2D(canvas.width, canvas.height - 50));
        const randomBonusName = this.getRandomBonusName();

        if (randomBonusName) {
            const bonusFactory = this.bonusFactories[randomBonusName].factory;
            const bonus = bonusFactory.createBonus(bonusMoveBounds);
            this.gameState.gameObjects.push(bonus);
            this.bonusFactories[randomBonusName].spawned += 1;
        }
    }

    private getRandomBonusName(): string | null {
        const bonusNames = Object.keys(this.bonusFactories);
        if (bonusNames.length === 0) {
            return null; // Нет зарегистрированных фабрик
        }

        // Взвешенная случайная выборка
        let totalWeight = 0;
        for (const name of bonusNames) {
            if (this.bonusFactories[name].maxCount !== undefined && this.bonusFactories[name]?.spawned >= this.bonusFactories[name].maxCount) continue;

            totalWeight += this.bonusFactories[name].weight;
        }

        let randomValue = Math.random() * totalWeight;
        for (const name of bonusNames) {
            randomValue -= this.bonusFactories[name].weight;
            if (randomValue <= 0) {
                return name;
            }
        }

        return null;
    }
}

export {
    BonusSpawner,
}
