import { createHustlerAnimations } from 'game/anims/HustlerAnimations';
import HustlerAnimator from 'game/anims/HustlerAnimator';
import { Base, Categories, CharacterCategories, SpritesMap } from 'game/constants/Sprites';
import HustlerModel from 'game/gfx/models/HustlerModel';
import SkewQuad from 'game/gfx/pipelines/SkewQuadPipeline';
import EventHandler, { Events } from 'game/handlers/events/EventHandler';
import UIScene from 'game/scenes/UI';
import PathNavigator from 'game/world/PathNavigator';
import PF from 'pathfinding';
import { Animations, Types } from 'phaser';
import BBCodeText from 'phaser3-rex-plugins/plugins/bbcodetext';

export enum Direction {
  North = '_back',
  South = '_front',
  West = '_left',
  East = '_right',
  None = '',
}

export default class Hustler extends Phaser.Physics.Matter.Sprite {
  public static readonly DEFAULT_VELOCITY: number = 4;
  public static readonly DEFAULT_MASS: number = 70;

  // the direction the player is currently moving in
  // Direction.None if not moving
  private _moveDirection: Direction = Direction.None;
  // the last direction of the player
  // cant be None
  private _lastDirection: Direction = Direction.None;

  // level identifier of the map
  private _currentMap!: string;

  // hustler id optimism (for spritesheet, name, etc.)
  private _hustlerId?: string;
  // shadow object
  private _shadow?: Phaser.GameObjects.Ellipse;
  // private _shadow?: Phaser.GameObjects.Sprite;

  // private _model: HustlerModel;

  private _animator: HustlerAnimator;
  private _navigator: PathNavigator;

  private _hitboxSensor: MatterJS.BodyType;
  private _hoverText?: BBCodeText;

  get shadow() { return this._shadow; }

  get hoverText() {
    return this._hoverText;
  }

  get hustlerId() {
    return this._hustlerId;
  }

  get currentMap() {
    return this._currentMap;
  }
  set currentMap(value: string) {
    this._currentMap = value;
  }

  // get model() { return this._model; }
  get animator() {
    return this._animator;
  }
  get navigator() {
    return this._navigator;
  }

  get lastDirection() {
    return this._lastDirection;
  }

  get moveDirection() {
    return this._moveDirection;
  }
  set moveDirection(dir: Direction) {
    this._moveDirection = dir;

    if (dir === Direction.None) return;
    this._lastDirection = dir;
  }

  get collider() {
    return this.body;
  }
  get hitboxSensor() {
    return this._hitboxSensor;
  }

  constructor(
    world: Phaser.Physics.Matter.World,
    x: number,
    y: number,
    hustlerId?: string,
    name?: string,
    frame?: string | number,
  ) {
    super(world, x, y, 'male_base', frame);

    if (hustlerId) {
      const key = 'hustler_' + hustlerId;

      if (!this.scene.textures.exists(key)) {
        this.scene.load.spritesheet(
          key,
          `https://api.dopewars.gg/hustlers/${hustlerId}/sprites/composite.png`,
          { frameWidth: 60, frameHeight: 60 },
        );
        this.setDisplaySize(60, 60);
        this.scene.load.once('filecomplete-spritesheet-' + key, () => {
          createHustlerAnimations(this.scene, key);
          this.setTexture(key);
          this.setActive(true);
          this.setVisible(true);
        });
        this.scene.load.start();
        this.setActive(false);
        this.setVisible(false);
      } else {
        this.setTexture(key);
      }
    }

    this.name = name ?? 'Hustler';
    this._hustlerId = hustlerId;

    // this._model = model;
    // this._model.hustler = this;

    // add to the scene, to be drawn
    world.scene.add.existing(this);

    // TODO: Implement skewed shadow
    // this._shadow = this.scene.add.sprite(0, 0, this.texture.key); // shadow is made from the same sprite that casts it
    // this._shadow.flipY = true;
    // this._shadow.setOrigin(0.5, 0.3);
    // this._shadow.setDepth(this.depth);
    // let scaleY = 0.6;
    // this._shadow.y = this._shadow.y + (this._shadow.height * (1 - scaleY)) / 2;
    // this._shadow.scaleY = scaleY;
    // this._shadow.tint = 0x000000;
    // this._shadow.alpha = 0.5;
    // this._shadow.setPipeline('skewQuad');
    // console.log(this._shadow.pipeline);
    // this._shadow.pipeline.set1f("inHorizontalSkew", 2); // set the desired left/right skew factor

    this._shadow = this.scene.add.ellipse(
      this.x,
      this.y,
      (this.displayWidth / 2) * 0.76,
      this.displayHeight * 0.2,
      0x000000,
      0.35,
    ).setOrigin(0.5, -0.35).setVisible(this.visible);

    // create main body
    const { Body, Bodies } = (Phaser.Physics.Matter as any).Matter;
    const colliderBody = Bodies.rectangle(0, 0, (this.displayWidth / 2) * 0.46, this.displayHeight * 0.35, {
      label: 'collider',
      collisionFilter: {
        group: -69,
      },
      chamfer: { radius: 7.2 },
    } as MatterJS.BodyType);

    this._hitboxSensor = this.scene.matter.add.rectangle(
      this.x,
      this.y - this.displayHeight / 5,
      (this.displayWidth / 2) * 0.6,
      this.displayHeight * 0.8,
      {
        label: 'hitboxSensor',
        isSensor: true,
        gameObject: this,
        // collisionFilter: {
        //     group: -69
        // },
      } as MatterJS.BodyType,
    );

    // this.setPipeline('Light2D');

    this.setExistingBody(colliderBody);
    this.setPosition(x, y);
    this.setDepth(60);

    // offset the hustler texture from the body
    this.setOrigin(0.5, 0.75);
    this.setScale(0.9);

    // prevent angular momentum from rotating our body
    this.setFixedRotation();

    // display name on hover
    const uiScene = this.scene.scene.get('UIScene') as UIScene;
    this.setInteractive({ useHandCursor: true });
    this.on('pointerover', () => {
      // if this hustler is of instance player
      const isPlayer = (this as any).controller !== undefined;

      this._hoverText = uiScene.rexUI.add.BBCodeText(0, 0, `[stroke=black]${this.name}[/stroke]`, {
        fontFamily: 'Dope',
        fontSize: '18px',
        color: isPlayer ? '#ffffff' : '#9fff9f',
        // fixedWidth: this.displayWidth * 2,
        // stroke: '#000000',
        // strokeThickness: 5,
      });
      this._hoverText.setScale(this.scene.cameras.main.zoom / 3);
      this._hoverText.alpha = 0.8;

      (this.scene.plugins.get('rexOutlinePipeline') as any).add(this, {
        thickness: 2,
      });
      (this.scene.plugins.get('rexOutlinePipeline') as any).add(this.hoverText, {
        outlineColor: 0x000000,
        thickness: 2,
      });
    });
    this.on('pointerout', () => {
      this._hoverText?.destroy();
      this._hoverText = undefined;

      (this.scene.plugins.get('rexOutlinePipeline') as any).remove(this);
    });

    // create navigator
    this._navigator = new PathNavigator(
      this,
      new PF.AStarFinder({
        // heuristic: PF.Heuristic.chebyshev,
        allowDiagonal: true,
        dontCrossCorners: true,
      } as any),
    );
    // handle animations
    this._animator = new HustlerAnimator(this);
  }

  // we override it to control wether or not we can call the play
  // animation method
  // play(key: string | Animations.Animation | Types.Animations.PlayAnimationConfig, ignoreIfPlaying?: boolean) {
  //   if (!this.active)
  //     return this;

  //   super.play(key, ignoreIfPlaying);
  //   return this;
  // }

  // text box on top of hustler
  // will not trigger a server request
  say(text: string, timestamp?: number, addToChat?: boolean) {
    EventHandler.emitter().emit(Events.CHAT_MESSAGE, this, text, timestamp, addToChat);
  }

  // sets correct sprite facing towards point
  lookAt(x: number, y: number) {
    const angle = Phaser.Math.Angle.Between(this.x, this.y, x, y);

    // see. https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Unit_circle_angles_color.svg/2048px-Unit_circle_angles_color.svg.png
    
    // north
    if (angle >= -(3 * Math.PI) / 4 && angle <= -Math.PI / 4) {
      this._lastDirection = Direction.North;
    }
    // west
    else if (angle >= (3 * Math.PI) / 4 || angle <= -(3 * Math.PI) / 4) {
      this._lastDirection = Direction.West;
    }
    // south
    else if (angle >= Math.PI / 4 && angle <= (3 * Math.PI) / 4) {
      this._lastDirection = Direction.South;
    }
    // east
    else if (angle >= -Math.PI / 4 || angle <= Math.PI / 4) {
      this._lastDirection = Direction.East;
    }
    
    
    this.play(this.texture.key + this._lastDirection);
    this.stop();

    return this;
  }

  // setOrigin(x: number, y?: number)
  // {
  //     super.setOrigin(x, y);
  //     this._model.setOrigin(x, y);
  //     return this;
  // }

  setVisible(value: boolean) {
    super.setVisible(value);
    this._shadow?.setVisible(value);
    // this._model.setVisible(value);
    return this;
  }

  setScale(x: number, y?: number) {
    super.setScale(x, y);
    this._shadow?.setScale(x, y);
    // update hitbox sensor scale
    (Phaser.Physics.Matter as any).Matter.Body.scale(this._hitboxSensor, x, y ?? x);
    // update model scale
    // this._model.setScale(x, y);
    return this;
  }

  setDepth(value: number) {
    super.setDepth(value);
    this._shadow?.setDepth(value - 1);
    // update model depth
    // this._model.setDepth(value);
    return this;
  }

  setPosition(x?: number, y?: number, z?: number, w?: number) {
    super.setPosition(x, y);
    this._shadow?.setPosition(x, y);
    // update model position
    // this._model?.updateSprites(true);

    return this;
  }

  destroyRuntime(fromScene?: boolean) {
    // this._model.destroyRuntime(fromScene);
    this._shadow?.destroy(fromScene);
    this._hoverText?.destroy(fromScene);
    this.scene.matter.world.remove(this._hitboxSensor);
    super.destroy(fromScene);
  }

  update() {
    // make hovertext follow us
    this._hoverText?.setPosition(
      (this.x - this.scene.cameras.main.worldView.x) * this.scene.cameras.main.zoom -
        this._hoverText.displayWidth / 2,
      (this.y - this.scene.cameras.main.worldView.y) * this.scene.cameras.main.zoom -
        (this.displayHeight / 1.3) * this.scene.cameras.main.zoom,
    );
    if (this._hoverText && this._hoverText.scale !== this.scene.cameras.main.zoom / 3)
      this._hoverText.setScale(this.scene.cameras.main.zoom / 3);

    this._shadow?.setPosition(this.x, this.y);

    // update animation frames
    this.animator.update();
    // path finding
    this.navigator.update();
    // update hitbox pos
    (Phaser.Physics.Matter as any).Matter.Body.setPosition(this.hitboxSensor, {
      x: this.x,
      y: this.y - this.displayHeight / 5,
    });
  }
}
