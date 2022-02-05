import Citizen from 'game/entities/citizen/Citizen';
import Player from 'game/entities/player/Player';
import QuestManager from 'game/managers/QuestManager';
import Zone from 'game/world/Zone';
import Quest from './Quest';

export default class PointQuest extends Quest {
  // point/area to go to
  private _zone: Zone;

  get zone() {
    return this._zone;
  }

  constructor(
    questManager: QuestManager,
    questReferer: Citizen,
    zone: Zone,
    name: string,
    description: string,
    start?: () => void,
    complete?: () => void,
    isActive?: boolean,
  ) {
    super(questManager, questReferer, name, description, start, complete, isActive);

    this._zone = zone;
  }

  onStart() {
    super.onStart();

    // on collide with player sensorHitbox, set this quest as completed
    this.zone.body.setOnCollideWith(
      this.questManager.player.hitboxSensor as MatterJS.BodyType,
      () => this.questManager.completeQuest(this),
    );
  }

  onComplete() {
    super.onComplete();

    // unsubscribe from event when quest is completed
    this.zone.body.setOnCollideWith(
      this.questManager.player.hitboxSensor as MatterJS.BodyType,
      () => undefined,
    );
  }
}
