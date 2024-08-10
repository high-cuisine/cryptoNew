import {Vector2D} from "./Vector2D.ts";

function createTransformMatrix(position: Vector2D, rotation: number, scale: number, scaleOrigin: Vector2D): DOMMatrix {
    // 1. Создаем матрицу единичного преобразования
    const matrix = new DOMMatrix();

    // 2. Применяем масштабирование
    matrix.scaleSelf(scale, scale, undefined, scaleOrigin.x, scaleOrigin.y, undefined);

    // 3. Применяем поворот (переводим угол в радианы)
    matrix.rotateSelf(rotation * (Math.PI / 180));

    // 4. Применяем смещение
    matrix.translateSelf(position.x, position.y);

    return matrix;
}

export {
    createTransformMatrix,
}
