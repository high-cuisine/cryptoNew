class ColorRGB {
    protected _r: number;
    protected _g: number;
    protected _b: number;

    constructor(r: number, g: number, b: number) {
        this._r = this.normalizeChannelValue(r);
        this._g = this.normalizeChannelValue(g);
        this._b = this.normalizeChannelValue(b);
    }

    static fromHex(hex: string): ColorRGB {
        // Убираем '#' в начале, если он есть
        hex = hex.replace(/^#/, '');

        // Проверяем корректность формата (3 или 6 символов)
        if (hex.length !== 3 && hex.length !== 6) {
            throw new Error("Invalid HEX color format.");
        }

        // Парсим значения R, G, B
        const r = parseInt(hex.substring(0, 2), 16) || 0;
        const g = parseInt(hex.substring(2, 4), 16) || 0;
        const b = parseInt(hex.substring(4, 6), 16) || 0;

        return new ColorRGB(r, g, b);
    }

    static fromCSS(cssColor: string): ColorRGB {
        // Создаем временный элемент для получения цвета из CSS
        const tempElement = document.createElement('div');
        tempElement.style.color = cssColor;
        document.body.appendChild(tempElement);

        // Получаем вычисленный цвет
        const computedStyle = getComputedStyle(tempElement);
        const rgbString = computedStyle.color;

        // Удаляем временный элемент
        document.body.removeChild(tempElement);

        // Парсим RGB значения из строки
        const rgbValues = rgbString.match(/\d+/g)?.map(Number) || [0, 0, 0];
        return new ColorRGB(rgbValues[0], rgbValues[1], rgbValues[2]);
    }

    static mix(A: ColorRGB, B: ColorRGB, ratio = 0.5): ColorRGB {
        const r = Math.round(A._r * ratio + B._r * (1 - ratio));
        const g = Math.round(A._g * ratio + B._g * (1 - ratio));
        const b = Math.round(A._b * ratio + B._b * (1 - ratio));

        return new ColorRGB(r, g, b);
    }

    protected normalizeChannelValue(value: number) {
        if (value < 0) return 0;
        if (value > 255) return 255;

        return value;
    }

    toHex(): string {
        const rHex = this._r.toString(16).padStart(2, '0');
        const gHex = this._g.toString(16).padStart(2, '0');
        const bHex = this._b.toString(16).padStart(2, '0');

        return `#${rHex}${gHex}${bHex}`;
    }

    get r(): number {
        return this._r;
    }

    set r(value: number) {
        this._r = this.normalizeChannelValue(value);
    }

    get g(): number {
        return this._g;
    }

    set g(value: number) {
        this._g = this.normalizeChannelValue(value);
    }

    get b(): number {
        return this._b;
    }

    set b(value: number) {
        this._b = this.normalizeChannelValue(value);
    }
}

class ColorRGBA extends ColorRGB {
    protected _a: number;

    constructor(r: number, g: number, b: number, a: number) {
        super(r, g, b);
        this._a = this.normalizeChannelValue(a);
    }

    static fromHex(hex: string): ColorRGBA {
        // Убираем '#' в начале, если он есть
        hex = hex.replace(/^#/, '');

        // Проверяем корректность формата (4 или 8 символов)
        if (hex.length !== 4 && hex.length !== 8) {
            throw new Error("Invalid HEX color format.");
        }

        // Парсим значения R, G, B, A
        const r = parseInt(hex.substring(0, 2), 16) || 0;
        const g = parseInt(hex.substring(2, 4), 16) || 0;
        const b = parseInt(hex.substring(4, 6), 16) || 0;
        const a = parseInt(hex.substring(6, 8), 16) || 255; // Альфа по умолчанию 255

        return new ColorRGBA(r, g, b, a);
    }

    static fromCSS(cssColor: string): ColorRGBA {
        const rgbColor = super.fromCSS(cssColor);
        return new ColorRGBA(rgbColor.r, rgbColor.g, rgbColor.b, 255);
    }

    static mix(A: ColorRGBA, B: ColorRGBA, ratio = 0.5): ColorRGBA {
        const r = Math.round(A._r * ratio + B._r * (1 - ratio));
        const g = Math.round(A._g * ratio + B._g * (1 - ratio));
        const b = Math.round(A._b * ratio + B._b * (1 - ratio));
        const a = Math.round(A._a * ratio + B._a * (1 - ratio));

        return new ColorRGBA(r, g, b, a);
    }

    toHex(): string {
        const rHex = this._r.toString(16).padStart(2, '0');
        const gHex = this._g.toString(16).padStart(2, '0');
        const bHex = this._b.toString(16).padStart(2, '0');
        const aHex = this._a.toString(16).padStart(2, '0');
        return `#${rHex}${gHex}${bHex}${aHex}`;
    }

    get a(): number {
        return this._a;
    }

    set a(value: number) {
        this._a = this.normalizeChannelValue(value);
    }
}

export {
    ColorRGB,
    ColorRGBA,
}
