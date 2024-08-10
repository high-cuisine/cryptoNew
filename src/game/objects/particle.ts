import {BaseObject} from "./BaseObject.ts";
import {Layer} from "./Layer.ts";
import {ParticleLifecycleComponent} from "../components/particle/ParticleLifecycleComponent.ts";

class Particle extends BaseObject {
    constructor() {
        super(Layer.Particle);
    }

    get isDead(): boolean {
        if (this.getComponent(ParticleLifecycleComponent)) {
            return this.getComponent(ParticleLifecycleComponent).isDead;
        }
        return true;
    }
}

export {
    Particle,
}
