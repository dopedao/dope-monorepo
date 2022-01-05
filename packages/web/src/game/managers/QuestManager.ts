import Player from "game/entities/player/Player";
import EventHandler, { Events } from "game/handlers/EventHandler";
import PointQuest from "game/quests/PointQuest";
import Quest from "game/quests/Quest";

export default class QuestManager {
    private player: Player;
    private _quests: Array<Quest> = new Array();

    get quests() { return this._quests; }

    constructor(player: Player, quests?: Array<Quest>) {
        this.player = player;

        if (quests)
            this._quests = quests;
    }

    addQuest(quest: Quest) {
        // if there's already a quest with the same name, cancel add quest
        if (this._quests.find(q => q.name === quest.name)) return;

        this._quests.push(quest);
        if (quest.isActive && quest.onStart)
            quest.onStart();
        EventHandler.emitter().emit(Events.PLAYER_NEW_QUEST, quest);
    }

    removeQuest(quest: Quest) {
        // if indexof is -1, it will remove the last element
        if (this._quests.indexOf(quest) === -1) return;

        this._quests.splice(this._quests.indexOf(quest), 1);
    }

    completeQuest(quest: Quest) {
        if (quest.onComplete)
            quest.onComplete();
        EventHandler.emitter().emit(Events.PLAYER_COMPLETE_QUEST, quest);

        this.removeQuest(quest);
    }

    update()
    {
        this._quests.forEach(quest => {
            if (quest.isActive && quest instanceof PointQuest)
            {
                const pointQuest: PointQuest = quest as PointQuest;

                if (pointQuest.zone.overlap([this.player.body as MatterJS.BodyType]))
                {
                    this.completeQuest(quest);
                }
            }
        });
    }
}