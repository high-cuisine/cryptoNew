import { BaseComponent } from "./BaseComponent.ts";
import { SpriteComponent } from "./SpriteComponent.ts";
import {BaseObject} from "../objects/BaseObject.ts";
import {Vector2D} from "../helpers/Vector2D.ts";

interface AnimationFrame {
    x: number;
    y: number;
}

class AnimationComponent<ObjType extends BaseObject = BaseObject> extends BaseComponent<ObjType> {
    private currentFrame: number = 0;
    private frameTime: number = 0;
    private isPlaying: boolean = true;

    constructor(
        object: ObjType,
        private spriteComponent: SpriteComponent,
        private frames: AnimationFrame[],
        private speed: number = 10
    ) {
        super(object);
    }

    play() {
        this.isPlaying = true;
    }

    stop() {
        this.isPlaying = false;
    }

    gotoAndStop(frameIndex: number) {
        this.currentFrame = frameIndex;
        this.stop();
    }

    update(dt: number): void {
        if (!this.isPlaying) return;

        this.frameTime += dt * this.speed;
        if (this.frameTime >= 1) {
            this.frameTime = 0;
            this.currentFrame = (this.currentFrame + 1) % this.frames.length;
            this.updateSpriteFrame();
        }
    }

    private updateSpriteFrame() {
        const currentFrameData = this.frames[this.currentFrame];
        if (currentFrameData) {
            // предполагаем, что SpriteComponent имеет свойство offset для смещения кадра
            this.spriteComponent.offset = new Vector2D(currentFrameData.x, currentFrameData.y);
        }
    }

    teardown() {}
}

export { AnimationComponent };
