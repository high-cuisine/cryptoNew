type Resources = HTMLImageElement;
type resourceTypes = "image";


class AssetManager {
    private static instance: AssetManager;
    private resources: { [key: string]: Resources } = {};
    private cachedResources: {[key: string]: OffscreenCanvas} = {};
    private totalResources: number = 0;
    private loadedResources: number = 0;
    private loadingProgress: number = 0;

    private constructor() {}

    static getInstance(): AssetManager {
        if (!AssetManager.instance) {
            AssetManager.instance = new AssetManager();
        }
        return AssetManager.instance;
    }

    get progress(): number {
        return this.loadingProgress;
    }

    loadResources(resourceDefinitions: { key: string; type: resourceTypes; src: string, cache?: boolean }[]): Promise<void | Resources> {
        this.totalResources = resourceDefinitions.length;
        this.loadedResources = 0;
        this.loadingProgress = 0;

        const promises: Promise<void | Resources>[] = [];
        for (const resourceDef of resourceDefinitions) {
            let promise: Promise<void | Resources>;

            switch (resourceDef.type) {
                case "image":
                    promise = this.loadImage(resourceDef.key, resourceDef.src, resourceDef?.cache);
                    break;
                default:
                    console.warn(`Unknown resource type: ${resourceDef.type}`);
                    promise = Promise.resolve();
                    break;
            }

            promises.push(promise);
        }

        return Promise.all(promises).then(() => {
            this.loadingProgress = 100;
        });
    }

    private loadImage(key: string, src: string, cache: boolean = false): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                this.resources[key] = image;
                this.loadedResources++;
                this.loadingProgress = Math.round((this.loadedResources / this.totalResources) * 100);

                if (cache) {
                    const canvas: OffscreenCanvas = new OffscreenCanvas(image.width, image.height);
                    const context = canvas.getContext('2d');

                    context.drawImage(image, 0, 0);

                    this.cachedResources[key] = canvas;
                }
                resolve(image);
            };
            image.onerror = reject;
            image.src = src + "?t=" + Date.now();
        });
    }

    getResource(key: string): Resources {
        if (!this.resources[key]) {
            console.warn(`Resource not found: ${key}`);
            return null;
        }
        return this.resources[key];
    }

    hasCached(key: string): boolean {
        return Object.hasOwn(this.cachedResources, key);
    }

    getCachedImage(key: string): OffscreenCanvas {
        if (!(this.getResource(key) instanceof HTMLImageElement)) {
            console.warn('Can`t use non-image element in canvas');
            return null;
        }
        return this.cachedResources[key];
    }
}

export {
    AssetManager
};