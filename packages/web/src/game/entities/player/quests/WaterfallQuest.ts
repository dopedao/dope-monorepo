import Citizen from "game/entities/citizen/Citizen";
import EventHandler, { Events } from "game/handlers/events/EventHandler";
import QuestManager from "../managers/QuestManager";
import Quest from "./Quest";

export default class WaterfallQuest extends Quest {
    private _events: string[];

    constructor(
        name: string,
        description: string,
        events: Events[] | Events,
        questManager: QuestManager,
        questReferer?: Citizen,
        start?: (quest: Quest) => void,
        complete?: (quest: Quest) => void,
        isActive?: boolean,
        ) {
        super(name, description, questManager, questReferer, start, complete, isActive);

        this._events = events instanceof Array ? events : [events];
    }
    
    private _handleEvent() {
        const nextEvent = this._events.shift();
        if (!nextEvent) {
            this.questManager.complete(this);
            return;
        }

        // unsubscribe from events
        EventHandler.emitter().once(nextEvent, this._handleEvent, this);
    }

    onStart() {
        super.onStart();

        EventHandler.emitter().once(this._events[0], this._handleEvent, this);
    }
}