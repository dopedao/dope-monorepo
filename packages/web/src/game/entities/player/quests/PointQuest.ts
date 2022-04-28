import Citizen from 'game/entities/citizen/Citizen';
import Player from 'game/entities/player/Player';
import QuestManager from 'game/entities/player/managers/QuestManager';
import Zone from 'game/world/Zone';
import Quest from './Quest';

export default class PointQuest extends Quest {
  // point/area to go to
  private _zone: Zone;

  get zone() {
    return this._zone;
  }

  constructor(
    name: string,
    description: string,
    zone: Zone,
    questManager: QuestManager,
    questReferer?: Citizen,
    start?: (quest: Quest) => void,
    complete?: (quest: Quest) => void,
    isActive?: boolean,
  ) {
    super(name, description, questManager, questReferer, start, complete, isActive);

    this._zone = zone;
  }

  onStart() {
    super.onStart();

    // on collide with player sensorHitbox, set this quest as completed
    this.zone.body.setOnCollideWith(
      this.questManager.player.hitboxSensor as MatterJS.BodyType,
      () => this.questManager.complete(this),
    );
  }

  onStop() {
    super.onStop();

    // remove on collide with player sensorHitbox
    this.zone.body.setOnCollideWith(
      this.questManager.player.hitboxSensor as MatterJS.BodyType,
      () => {},
    );
  }
}
