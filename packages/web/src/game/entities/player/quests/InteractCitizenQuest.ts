import Citizen from "game/entities/citizen/Citizen";
import EventHandler, { Events } from "game/handlers/events/EventHandler";
import QuestManager from "../managers/QuestManager";
import Quest from "./Quest";

export default class InteractCitizenQuest extends Quest {
    private _citizen: Citizen;

    get citizen() { return this._citizen; }
    
    constructor(
        name: string,
        description: string,
        citizen: Citizen,
        questManager: QuestManager,
        questReferer?: Citizen,
        start?: (quest: Quest) => void,
        complete?: (quest: Quest) => void,
        isActive?: boolean,
    ) {
        super(name, description, questManager, questReferer, start, complete, isActive);

        this._citizen = citizen;
    }

    private _handleCitizenEvent(citizen: Citizen, cancelled: boolean) {
        if (citizen === this.citizen && !cancelled) this.questManager.completeQuest(this);
    }

    onStart(): void {
        super.onStart();

        EventHandler.emitter().on(Events.PLAYER_CITIZEN_INTERACT_FINISH, this._handleCitizenEvent);
    }

    onComplete() {
        super.onComplete();
        
        // unsubscribe from events
        EventHandler.emitter().removeListener(
          Events.PLAYER_CITIZEN_INTERACT_FINISH,
          this._handleCitizenEvent,
        );
    }
}