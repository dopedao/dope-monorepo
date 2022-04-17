import HustlerModel from 'game/gfx/models/HustlerModel';
import Hustler from '../Hustler';
import Player from '../player/Player';
import Conversation from './Conversation';

export interface PathPoint {
  position: Phaser.Math.Vector2;
  // time to wait before going to the next point (ms)
  wait?: number;

  onMoved?: (hustler: Hustler) => void;
}

interface PathPointSnapshot extends PathPoint {
  // time when the point was reached
  timestamp: number;
}

export default class Citizen extends Hustler {
  readonly description?: string;
  conversations: Conversation[] = new Array();

  private busy: boolean = false;

  // TODO: move everything path related to navigator?

  // the path that the citizen is currently following
  path: Array<PathPoint> = new Array();
  // repeat path
  repeatPath: boolean;

  // should continue following the path
  // if false, the citizen will not follow its path and move until its true
  shouldFollowPath: boolean;
  // should we set back follow path to true 
  // after an interaction has finished?
  // if shouldFollowPath is defaulted to false, it wont be set to true once an interaction is over
  private shouldSetFollowPath: boolean = false;

  // last point has gone through
  lastPoint?: PathPointSnapshot;

  constructor(
    world: Phaser.Physics.Matter.World,
    x: number,
    y: number,
    currentMap: string,
    hustlerId?: string,
    name?: string,
    description?: string,
    conversations?: Conversation[] | Conversation,
    path?: Array<PathPoint>,
    repeatPath: boolean = false,
    shouldFollowPath: boolean = true,
  ) {
    super(world, x, y, hustlerId, name);

    this.description = description;

    if (currentMap) this.currentMap = currentMap;
    if (conversations) this.conversations = conversations instanceof Array ? conversations : [ conversations ];
    if (path) this.path = path;
    
    this.repeatPath = repeatPath;
    this.shouldFollowPath = shouldFollowPath;
  }

  // called when npc enters in an interaction
  onInteraction(player: Player) {
    if (this.shouldFollowPath)
      this.shouldSetFollowPath = true;

    this.shouldFollowPath = false;
    this.navigator.cancel();
    this.lookAt(player.x, player.y);
    this.busy = true;
  }

  // called when the interaction is over
  onInteractionFinish() {
    // delay before npc starts following his path again
    const delay = 5000;
    setTimeout(() => {
      if (this.busy || !this.shouldSetFollowPath) return;

      this.shouldFollowPath = true;
      this.shouldSetFollowPath = false;
    }, delay);
    this.busy = false;
  }

  update() {
    super.update();

    // if the citizen has no target currently, check if he has a next point and move to it
    // or, if lastPointTimestamp & wait are set, check if the time has passed and move to the next point
    // TODO: check for path lenght in if instead of shifting and checking if undefined?
    if (this.shouldFollowPath && !this.navigator.target) (() => {
      // stall until delta time reaches the wait time
      if (this.lastPoint?.wait) {
        const timePassed = Date.now() - this.lastPoint.timestamp;
        if (timePassed < this.lastPoint.wait) return;
      }

      const nextPoint = this.path.shift();
      if (!nextPoint) return;
    
      this.navigator.moveTo(nextPoint.position.x, nextPoint.position.y, () => {
        if (nextPoint.onMoved) nextPoint.onMoved(this);
        this.lastPoint = {
          ...nextPoint,
          timestamp: Date.now(),
        };
      });

      // if repeatpath is enabled, we push our shifted point (first point in this case) back to the end of the path
      if (this.repeatPath) this.path.push(nextPoint);
    })();
  }
}
