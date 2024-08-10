class GameManager {
    private static instance: GameManager;
    private _lives: number = 3;
    private _lastLifeRecoveryTime: number = Date.now(); // Время последнего восстановления жизни

    private constructor() {}

    static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    get lives(): number {
        return this._lives;
    }

    loseLife(): void {
        this._lives--;
        if (this._lives < 0) {
            this._lives = 0; // Не допускаем отрицательное количество жизней
        }
    }

    gainLife(): void {
        this._lives++;
    }

    update(dt: number): void {
        // Восстановление жизней (каждые 5 минут)
        const LIFE_RECOVERY_INTERVAL = 5 * 60 * 1000; // 5 минут в миллисекундах
        if (Date.now() - this._lastLifeRecoveryTime >= LIFE_RECOVERY_INTERVAL) {
            this.gainLife();
            this._lastLifeRecoveryTime = Date.now();
        }
    }
}

export { GameManager };