import { CollisionEventType } from "./CollisionEventType.ts";
import {BaseObject} from "../objects/BaseObject.ts";

interface CollisionEventData<ObjType extends BaseObject = BaseObject> {
    type: CollisionEventType;
    self: ObjType;
    other: ObjType;
}

export type {
    CollisionEventData,
};
