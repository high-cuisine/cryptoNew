import {BaseComponent} from "./BaseComponent.ts";
import {BaseObject} from "../objects/BaseObject.ts";

class TelegramVibrationComponent extends BaseComponent<BaseObject> {
    constructor(object: BaseObject) {
        super(object);
    }

    vibrate(style: "light" | "medium" | "heavy" | "rigid" | "soft"): void {
        if (window?.Telegram?.WebApp) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
        } else {
            console.warn("Telegram API is not supported.");
        }
    }

    update(dt: number): void {}
    teardown(): void {}
}

export {
    TelegramVibrationComponent,
};