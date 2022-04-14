import Citizen from 'game/entities/citizen/Citizen';
import EventHandler, { Events } from 'game/handlers/events/EventHandler';
import QuestManager from 'game/entities/player/managers/QuestManager';

export default class Quest {
  protected questManager: QuestManager;

  readonly name: string;
  readonly description: string;
  protected _isActive: boolean;
  protected questReferer?: Citizen;

  private startCallback?: (quest: Quest) => void;
  private completeCallback?: (quest: Quest) => void;

  get isActive() {
    return this._isActive;
  }
  set isActive(value: boolean) {
    this._isActive = value;
    value ? this.onStart() : this.onStop();
  }

  constructor(
    name: string,
    description: string,
    questManager: QuestManager,
    questReferer?: Citizen,
    start?: (quest: Quest) => void,
    complete?: (quest: Quest) => void,
    isActive: boolean = true,
  ) {
    this.questManager = questManager;
    this.questReferer = questReferer;

    this.name = name;
    this.description = description;

    this.startCallback = start;
    this.completeCallback = complete;

    this._isActive = isActive;
  }

  onStart() {
    EventHandler.emitter().emit(Events.PLAYER_QUEST_START, this);

    if (this.startCallback) this.startCallback(this);
  }

  onStop() {}

  onComplete() {
    // shift conversations
    // TODO: Move that elsewehre...
    // this.questReferer?.conversations.shift();
    EventHandler.emitter().emit(Events.PLAYER_QUEST_COMPLETE, this);

    if (this.completeCallback) this.completeCallback(this);
  }
}
