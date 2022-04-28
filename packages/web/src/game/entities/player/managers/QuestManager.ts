import Player from 'game/entities/player/Player';
import EventHandler, { Events } from 'game/handlers/events/EventHandler';
import ItemQuest from 'game/entities/player/quests/ItemQuest';
import PointQuest from 'game/entities/player/quests/PointQuest';
import Quest from 'game/entities/player/quests/Quest';

export default class QuestManager {
  private _player: Player;
  private _quests: Array<Quest> = new Array();

  get player() {
    return this._player;
  }
  get quests() {
    return this._quests;
  }

  constructor(player: Player, quests?: Array<Quest>) {
    this._player = player;

    if (quests) this._quests = quests;
  }

  add(quest: Quest) {
    // if there's already a quest with the same name, cancel add quest
    if (this._quests.find(q => q.name === quest.name)) return;
    this._quests.push(quest);

    EventHandler.emitter().emit(Events.PLAYER_QUEST_NEW, quest);

    // if quest is set as active by default, fire up the onstart event of the quest
    if (quest.isActive) quest.onStart();
  }

  remove(quest: Quest) {
    // if indexof is -1, it will remove the last element
    if (this._quests.indexOf(quest) === -1) return;

    quest.onStop();
    this._quests.splice(this._quests.indexOf(quest), 1);
  }

  // will call the quest oncomplete method (will fire up the quest complete event)
  // and remove the quest from the quests array
  complete(quest: Quest) {
    quest.onComplete();

    this.remove(quest);
  }
}
