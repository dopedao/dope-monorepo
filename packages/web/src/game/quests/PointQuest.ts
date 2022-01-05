import Zone from "game/world/Zone";
import Quest from "./Quest";

export default class PointQuest extends Quest {
    // point/area to go to 
    private _zone: Zone;

    get zone() { return this._zone; }

    constructor(zone: Zone, name: string, description: string, start?: () => void, complete?: () => void, isActive?: boolean) {
        super(name, description, start, complete, isActive);

        this._zone = zone;
    }

}
