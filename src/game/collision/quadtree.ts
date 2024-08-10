import {BaseObject} from "../objects/BaseObject.ts";
import {BoundBox} from "../helpers/BoundBox.ts";
import {Vector2D} from "../helpers/Vector2D.ts";
import {Size2D} from "../helpers/Size2D.ts";

class Quadtree {
    private capacity: number;
    private boundary: BoundBox;
    private objects: {object: BaseObject, boundBox: BoundBox}[] = [];
    private divided: boolean = false;
    private northWest: Quadtree | null = null;
    private northEast: Quadtree | null = null;
    private southWest: Quadtree | null = null;
    private southEast: Quadtree | null = null;

    constructor(boundary: BoundBox, capacity: number = 4) {
        this.boundary = boundary;
        this.capacity = capacity;
    }

    insert(object: BaseObject, boundBox: BoundBox): boolean {
        if (!this.boundary.intersects(boundBox)) return false;

        if (this.objects.length < this.capacity) {
            this.objects.push({ object, boundBox });
            return true;
        }

        if (!this.divided) {
            this.subdivide();
        }

        return (
            this.northWest!.insert(object, boundBox) ||
            this.northEast!.insert(object, boundBox) ||
            this.southWest!.insert(object, boundBox) ||
            this.southEast!.insert(object, boundBox)
        );
    }

    remove(object: BaseObject): void {
        const index = this.objects.findIndex(o => o.object === object);
        if (index !== -1) {
            this.objects.splice(index, 1);
        }

        if (this.divided) {
            this.northWest!.remove(object);
            this.northEast!.remove(object);
            this.southWest!.remove(object);
            this.southEast!.remove(object);
        }
    }

    retrieve(boundBox: BoundBox): BaseObject[] {
        let foundObjects: BaseObject[] = [];
        if (!this.boundary.intersects(boundBox)) return foundObjects;

        foundObjects = foundObjects.concat(
            this.objects.filter(o => o.boundBox.intersects(boundBox)).map(o => o.object)
        );

        if (this.divided) {
            foundObjects = foundObjects.concat(this.northWest!.retrieve(boundBox));
            foundObjects = foundObjects.concat(this.northEast!.retrieve(boundBox));
            foundObjects = foundObjects.concat(this.southWest!.retrieve(boundBox));
            foundObjects = foundObjects.concat(this.southEast!.retrieve(boundBox));
        }

        return foundObjects;
    }

    clear(): void {
        this.objects = [];
        this.divided = false;
        this.northWest = null;
        this.northEast = null;
        this.southWest = null;
        this.southEast = null;
    }

    private subdivide(): void {
        const x = this.boundary.x;
        const y = this.boundary.y;
        const w = this.boundary.width / 2;
        const h = this.boundary.height / 2;

        this.northWest = new Quadtree(new BoundBox(new Vector2D(x, y), new Size2D(w, h)), this.capacity);
        this.northEast = new Quadtree(new BoundBox(new Vector2D(x + w, y), new Size2D(w, h)), this.capacity);
        this.southWest = new Quadtree(new BoundBox(new Vector2D(x, y + h), new Size2D(w, h)), this.capacity);
        this.southEast = new Quadtree(
            new BoundBox(new Vector2D(x + w, y + h), new Size2D(w, h)),
            this.capacity
        );

        this.divided = true;
    }
}

export {
    Quadtree,
};
