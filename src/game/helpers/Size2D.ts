class Size2D {
    protected _width: number;
    protected _height: number;

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        if (value < 0) throw new Error("width cant be < 0");

        this._width = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        if (value < 0) throw new Error("height cant be < 0");

        this._height = value;
    }
}

export {
    Size2D,
}
