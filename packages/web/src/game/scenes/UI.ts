import Citizen from 'game/entities/citizen/Citizen';
import Conversation from 'game/entities/citizen/Conversation';
import Player from 'game/entities/player/Player';
import EventHandler, { Events } from 'game/handlers/EventHandler';
import Item from 'game/inventory/Item';
import Quest from 'game/quests/Quest';
import InventoryComponent from 'game/ui/react/components/InventoryComponent';
import DialogueTextBox from 'game/ui/rex/DialogueTextBox';
import { Scene } from 'phaser';
import { ComponentManager } from 'phaser3-react/src/manager';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import toast, { Toaster } from 'react-hot-toast';
import { ToastOptions } from 'react-hot-toast/dist/core/types';
import GameScene from './Game';

interface Interaction {
  citizen: Citizen;
  textBox: DialogueTextBox;
  maxDistance: number;
}

const toastStyle: ToastOptions = {
  duration: 5000,
  icon: 'ℹ️',
  position: 'top-right',
  style: {
    borderRadius: '4px',
    backdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#fff',
  },
};

export default class UIScene extends Scene {
  public rexUI!: RexUIPlugin;
  public toaster!: ComponentManager;

  public player!: Player;
  public inventoryComponent?: ComponentManager;
  public currentInteraction?: Interaction;

  constructor() {
    super({
      key: 'UIScene',
    });
  }

  init(data: { player: Player }) {
    this.player = data.player;
  }

  create(): void {
    this.toaster = this.add.reactDom(Toaster);
    this._handleEvents();
  }

  update(time: number, delta: number): void {
    // if the player moves too far away from the "owner" of the current interaction
    // cancel it.
    if (this.currentInteraction?.textBox instanceof DialogueTextBox) {
      const playerPos = new Phaser.Math.Vector2(this.player.x, this.player.y);
      const citizen = this.currentInteraction.citizen;
      const citizenPos = new Phaser.Math.Vector2(
        this.currentInteraction.citizen.x,
        this.currentInteraction.citizen.y,
      );

      if (playerPos.distance(citizenPos) > this.currentInteraction.maxDistance) {
        // onInteractionFinish!!! not complete.
        this.currentInteraction.citizen.onInteractionFinish();
        this.currentInteraction.textBox.destroy();
        this.currentInteraction = undefined;

        EventHandler.emitter().emit(Events.PLAYER_CITIZEN_INTERACT_CANCEL, citizen);
      }
    }
  }

  private _handleEvents() {
    this._handleInteractions();
    this._handleQuests();
  }

  private _handleInteractions() {
    // handle player inventory open
    EventHandler.emitter().on(Events.PLAYER_INVENTORY_OPEN, () => {
      this.inventoryComponent = this.add.reactDom(InventoryComponent, {
        inventory: this.player.inventory,
        quests: this.player.questManager.quests,
      });
    });
    EventHandler.emitter().on(Events.PLAYER_INVENTORY_CLOSE, () => {
      this.inventoryComponent?.destroy();
      this.inventoryComponent = undefined;
    });

    this._handleNpcInteractions();
    this._handleItemInteractions();
  }

  private _handleItemInteractions() {
    // handle player add itme into inventory
    EventHandler.emitter().on(Events.PLAYER_INVENTORY_ADD_ITEM, (item: Item, pickup?: boolean) => {
      toast(
        pickup ? `You picked up ${item.name}` : `${item.name} has been added to your inventory`,
        {
          ...toastStyle,
          icon: '💠',
        },
      );
    });
    // handle player remove item from inventory
    EventHandler.emitter().on(Events.PLAYER_INVENTORY_REMOVE_ITEM, (item: Item, drop?: boolean) => {
      toast(drop ? `You dropped ${item.name}` : `${item.name} was removed from your inventory`, {
        ...toastStyle,
        icon: '💠',
        style: {
          ...toastStyle.style,
          backgroundColor: 'rgba(255, 0, 0, 0.6)',
        },
      });
    });
  }

  private _handleNpcInteractions() {
    EventHandler.emitter().on(Events.PLAYER_CITIZEN_INTERACT_CANCEL, (citizen: Citizen) => {
      toast('You ran away from the conversation!', {
        ...toastStyle,
        icon: '🚫',
        style: {
          ...toastStyle.style,
          backgroundColor: 'rgba(255, 0, 0, 0.6)',
        },
      });
    });

    EventHandler.emitter().on(Events.PLAYER_CITIZEN_INTERACT, (citizen: Citizen) => {
      if (citizen.conversations.length === 0) return;

      // get upcoming conversation
      const conv: Conversation = citizen.conversations[0];

      const textBox = new DialogueTextBox(this, 500, 500, 65)
        .start(conv.text, 50)
        // called only when the interaction is COMPLETE
        // will not be called if the gameobject is destroyed in any way
        .on('complete', () => {
          textBox.destroy();
          this.currentInteraction = undefined;

          // TODO: Move somewhere else, maybe in the Citizen class?
          citizen.onInteractionFinish();
          EventHandler.emitter().emit(Events.PLAYER_CITIZEN_INTERACT_COMPLETE, citizen);

          // if the conversation is not marked as complete, push it to the array again
          if (conv.onFinish) if (conv.onFinish()) citizen.conversations.shift();
        });
      this.currentInteraction = { citizen, textBox, maxDistance: 200 };

      // Chat bubbles
      // let pos = new Phaser.Math.Vector2(npc.x, npc.y - (npc.height / 1.2));
      // pos = this.cameras.main.worl
      // npc.x
      // new SpeechBubbleTextBox(this, pos.x, pos.y)
      //     .setScale(1)
      //     .start(conv.text, 50)
      //     .on('destroy', () => {
      //         // re-enable inputs
      //         (this.player.scene as GameScene).canUseMouse = true;
      //         this.player.scene.input.keyboard.enabled = true;
      //         // TODO: Move somewhere else, maybe in the Citizen class?
      //         EventHandler.emitter().emit(Events.PLAYER_INTERACT_NPC_COMPLETE, npc);
      //         // call conversation oncomplete
      //         if (conv.onComplete)
      //             conv.onComplete();
      //     });
    });
  }

  private _handleQuests() {
    const icon: string = '👾';
    // handle quest events
    EventHandler.emitter().on(Events.PLAYER_QUEST_NEW, (quest: Quest) => {
      // TODO: Add line break and quest description when escape sequences are supported
      toast(`New quest: ${quest.name}`, { ...toastStyle, icon: icon });
    });
    EventHandler.emitter().on(Events.PLAYER_QUEST_COMPLETE, (quest: Quest) => {
      toast(`Completed quest: ${quest.name}`, { ...toastStyle, icon: icon });
    });
  }
}
