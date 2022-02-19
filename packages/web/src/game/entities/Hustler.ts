import { createHustlerAnimations } from 'game/anims/HustlerAnimations';
import HustlerAnimator from 'game/anims/HustlerAnimator';
import { Base, Categories, CharacterCategories, SpritesMap } from 'game/constants/Sprites';
import HustlerModel from 'game/gfx/models/HustlerModel';
import UIScene from 'game/scenes/UI';
import PathNavigator from 'game/world/PathNavigator';
import PF from 'pathfinding';
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
  private _shadow: Phaser.GameObjects.Ellipse;

  // private _model: HustlerModel;

  private _animator: HustlerAnimator;
  private _navigator: PathNavigator;

  private _hitboxSensor: MatterJS.BodyType;
  private _hoverText?: BBCodeText;

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
    frame?: number,
  ) {
    super(world, x, y, 'male_base', frame);

    if (hustlerId) {
      const key = 'hustler_' + hustlerId;

      if (!this.scene.textures.exists(key)) {
        this.scene.load.spritesheet(
          key,
          `https://api.dopewars.gg/hustlers/${hustlerId}/sprites/composite.png`,
          { frameWidth: 30, frameHeight: 60 },
        );
        this.scene.load.once('filecomplete-spritesheet-' + key, () => {
          createHustlerAnimations(this.scene.anims, key);
          this.setTexture(key);
        });
        this.scene.load.start();
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

    this._shadow = this.scene.add.ellipse(
      this.x,
      this.y + this.height / 5,
      this.width * 0.8,
      this.height / 5,
      0x000000,
      0.2,
    );

    // create main body
    const { Body, Bodies } = (Phaser.Physics.Matter as any).Matter;
    const colliderBody = Bodies.rectangle(0, 0, this.width * 0.48, this.height * 0.35, {
      label: 'collider',
      collisionFilter: {
        group: -69,
      },
      chamfer: { radius: 7.2 },
    } as MatterJS.BodyType);

    this._hitboxSensor = this.scene.matter.add.rectangle(
      this.x,
      this.y - this.displayHeight / 5,
      this.displayWidth * 0.6,
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

    this.setExistingBody(colliderBody);

    this.setPosition(x, y);

    this.setDepth(30);

    // offset the hustler texture from the body
    this.setOrigin(0.5, 0.65);
    // make it a bit bigger
    this.setScale(1);

    // prevent angular momentum from rotating our body
    this.setFixedRotation();

    // create sub sprites
    // this._model.createSprites();

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
        fixedWidth: this.displayWidth * 2,
        stroke: '#000000',
        strokeThickness: 5,
      });
      this._hoverText.alpha = 0.8;
    });
    this.on('pointerout', () => {
      this._hoverText?.destroy();
      this._hoverText = undefined;
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

  // sets correct sprite facing towards point
  lookAt(x: number, y: number) {
    const angle = Phaser.Math.Angle.Between(this.x, this.y, x, y);

    // east
    if (angle >= -Phaser.Math.TAU && angle <= Phaser.Math.TAU) {
      this._lastDirection = Direction.East;
    }
    // south
    else if (angle >= 0 && angle <= Math.PI) {
      this._lastDirection = Direction.South;
    }
    // north
    else if (angle <= 0 && angle >= -Math.PI) {
      this._lastDirection = Direction.North;
    }
    // west
    if (angle <= -Phaser.Math.TAU || angle >= Phaser.Math.PI2) {
      this._lastDirection = Direction.West;
    }

    this.play(this.texture.key + this._lastDirection);
    this.stop();
    // console.log(this.anims);
    // console.log(this.texture.key + this._lastDirection);
    // this.setFrame(this.texture.key + this._lastDirection);
  }

  // setOrigin(x: number, y?: number)
  // {
  //     super.setOrigin(x, y);
  //     this._model.setOrigin(x, y);
  //     return this;
  // }

  setVisible(value: boolean) {
    super.setVisible(value);
    this._shadow.setVisible(value);
    // this._model.setVisible(value);
    return this;
  }

  setScale(x: number, y?: number) {
    super.setScale(x, y);
    this._shadow.setScale(x, y);
    // update hitbox sensor scale
    (Phaser.Physics.Matter as any).Matter.Body.scale(this._hitboxSensor, x, y ?? x);
    // update model scale
    // this._model.setScale(x, y);
    return this;
  }

  setDepth(value: number) {
    super.setDepth(value);
    this._shadow.setDepth(value - 1);
    // update model depth
    // this._model.setDepth(value);
    return this;
  }

  setPosition(x?: number, y?: number, z?: number, w?: number) {
    super.setPosition(x, y);
    this._shadow?.setPosition(x, y ? y + this.height / 5 : undefined);
    // update model position
    // this._model?.updateSprites(true);

    return this;
  }

  destroyRuntime(fromScene?: boolean) {
    // this._model.destroyRuntime(fromScene);
    this._shadow.destroy(fromScene);
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

    this._shadow.setPosition(this.x, this.y + this.height / 5);

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
