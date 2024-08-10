class ScoreManager {
    private static instance: ScoreManager;
    private _score: number = 0;

    private constructor() {} // Приватный конструктор

    static getInstance(): ScoreManager {
        if (!ScoreManager.instance) {
            ScoreManager.instance = new ScoreManager();
        }
        return ScoreManager.instance;
    }

    get score(): number {
        return this._score;
    }

    reset(): void {
        this._score = 0;
    }

    increment(amount: number = 1): void {
        this._score += amount;
    }

    // Placeholder для сохранения результата на сервере
    async saveScore(): Promise<void> {
        console.log("Saving score to server...");
        // ... (реализация сохранения на сервере)
    }
}

export { ScoreManager };
