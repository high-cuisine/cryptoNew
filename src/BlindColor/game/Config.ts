import {DeepPartial} from "../helpers/types/deepPartial.ts";

interface IGameConfig {
    canvas: HTMLCanvasElement,
    sizes: {
        width: number,
        height: number,
        applyCSSSizes?: boolean,
    },
    debug?: boolean,
    performance: {
        maxFPS: number,
    }
}

const DEFAULT_GAME_CONFIG: DeepPartial<IGameConfig> = {
    sizes: {
        applyCSSSizes: false,
    },
    debug: false,
    performance: {
        maxFPS: 60,
    }
}

export {
    DEFAULT_GAME_CONFIG,
}

export type {
    IGameConfig,
}
