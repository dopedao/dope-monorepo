import Citizen from 'game/entities/citizen/Citizen';
import EventHandler, { Events } from 'game/handlers/EventHandler';
import QuestManager from 'game/managers/QuestManager';

export default class Quest {
  protected questManager: QuestManager;

  readonly name: string;
  readonly description: string;
  protected _isActive: boolean = true;
  protected questReferer: Citizen;

  private startCallback?: () => void;
  private completeCallback?: () => void;

  get isActive() {
    return this._isActive;
  }
  set isActive(value: boolean) {
    this._isActive = value;
    this.onStart ? this.onStart() : {};
  }

  constructor(
    questManager: QuestManager,
    questReferer: Citizen,
    name: string,
    description: string,
    start?: () => void,
    complete?: () => void,
    isActive?: boolean,
  ) {
    this.questManager = questManager;
    this.questReferer = questReferer;

    this.name = name;
    this.description = description;

    this.startCallback = start;
    this.completeCallback = complete;

    if (isActive) this.isActive = isActive;
  }

  onStart() {
    EventHandler.emitter().emit(Events.PLAYER_QUEST_START, this);

    if (this.startCallback) this.startCallback();
  }

  onComplete() {
    EventHandler.emitter().emit(Events.PLAYER_QUEST_COMPLETE, this);

    if (this.completeCallback) this.completeCallback();
  }
}
