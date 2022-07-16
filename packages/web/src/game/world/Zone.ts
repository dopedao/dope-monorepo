import Hustler from 'game/entities/Hustler';
import EventHandler from 'game/handlers/events/EventHandler';

export default class Zone {
  private _body: MatterJS.BodyType;

  private scene: Phaser.Scene;
  private objects?: Array<Phaser.GameObjects.GameObject>;

  private _inside: boolean = false;

  // callbacks
  private onEnter?: () => void;
  private onExit?: () => void;

  get body() {
    return this._body;
  }
  get inside() {
    return this._inside;
  }

  constructor(
    body: MatterJS.BodyType,
    scene: Phaser.Scene,
    objects?: Array<Phaser.GameObjects.GameObject>,
    onEnter?: () => void,
    onExit?: () => void,
  ) {
    this._body = body;

    // set the body as being a sensor so that it doesn't collide with anything
    this.body.isSensor = true;

    this.scene = scene;
    this.objects = objects;

    this.onEnter = onEnter;
    this.onExit = onExit;
  }

  overlap(other: Array<MatterJS.BodyType>) {
    return this.scene.matter.overlap(this.body, other);
  }

  destroy() {
    this.scene.matter.world.remove(this.body);
  }

  update() {
    if (!this.objects) return;

    if (!this.inside && this.scene.matter.overlap(this.body, this.objects)) {
      if (this.onEnter) this.onEnter();
      this._inside = true;
    } else if (this.inside && !this.scene.matter.overlap(this.body, this.objects)) {
      if (this.onExit) this.onExit();
      this._inside = false;
    }
  }
}
