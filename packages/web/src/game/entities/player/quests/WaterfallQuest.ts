import Citizen from "../../citizen/Citizen";
import EventHandler, { Events } from "../../../handlers/events/EventHandler";
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
        const event = this._events.shift();
        const nextEvent = this._events?.[0];
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