class Vector2D {
    constructor(private _x: number, public _y: number) {}

    add(otherVector: Vector2D): Vector2D {
        return new Vector2D(this._x + otherVector._x, this._y + otherVector._y);
    }

    subtract(otherVector: Vector2D): Vector2D {
        return new Vector2D(this._x - otherVector._x, this._y - otherVector._y);
    }

    multiply(scalar: number): Vector2D {
        return new Vector2D(this._x * scalar, this._y * scalar);
    }

    divide(scalar: number): Vector2D {
        if (scalar === 0) {
            throw new Error("Cannot divide by zero.");
        }
        return new Vector2D(this._x / scalar, this._y / scalar);
    }

    magnitude(): number {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }

    normalize(): Vector2D {
        const mag = this.magnitude();
        if (mag === 0) {
            return new Vector2D(0, 0);
        }
        return this.divide(mag);
    }

    dotProduct(otherVector: Vector2D): number {
        return this._x * otherVector._x + this._y * otherVector._y;
    }

    // Для 2D векторного произведения возвращаем скаляр (z-компонента 3D вектора)
    crossProduct(otherVector: Vector2D): number {
        return this._x * otherVector._y - this._y * otherVector._x;
    }

    distanceTo(otherVector: Vector2D): number {
        const dx = this._x - otherVector._x;
        const dy = this._y - otherVector._y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    angleBetween(otherVector: Vector2D): number {
        const dot = this.dotProduct(otherVector);
        const mag1 = this.magnitude();
        const mag2 = otherVector.magnitude();
        return Math.acos(dot / (mag1 * mag2));
    }

    clone(): Vector2D {
        return new Vector2D(this.x, this.y);
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }
}

export {
    Vector2D
};