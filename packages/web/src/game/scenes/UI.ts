import Citizen from 'game/entities/citizen/Citizen';
import Conversation from 'game/entities/citizen/Conversation';
import Player from 'game/entities/player/Player';
import EventHandler, { Events } from 'game/handlers/events/EventHandler';
import Item from 'game/entities/player/inventory/Item';
import Quest from 'game/entities/player/quests/Quest';
import ChatType from 'game/ui/react/components/ChatType';
import InventoryComponent from 'game/ui/react/components/InventoryComponent';
import DialogueTextBox from 'game/ui/rex/DialogueTextBox';
import { getBBcodeText, getBuiltInText } from 'game/ui/rex/RexUtils';
import { Scene } from 'phaser';
import { ComponentManager } from 'phaser3-react/src/manager';
import Toast from 'phaser3-rex-plugins/templates/ui/toast/Toast';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import { createStandaloneToast, UseToastOptions } from '@chakra-ui/react';
import { ToastOptions } from 'react-hot-toast/dist/core/types';
import GameScene from './Game';
import NetworkHandler from 'game/handlers/network/NetworkHandler';
import { NetworkEvents, UniversalEventNames } from 'game/handlers/network/types';
import Hustler from 'game/entities/Hustler';
import { toast } from '@chakra-ui/react';
import ConnectionLostWindow from 'game/ui/react/components/ConnectionLostWindow';

interface Interaction {
  citizen: Citizen;
  textBox: DialogueTextBox;
  maxDistance: number;
}

export const toastStyle: ToastOptions = {
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

export const chakraToastStyle: UseToastOptions = {
  isClosable: false,
  duration: 5000,
  status: 'info',
  position: 'bottom-right',
};

export default class UIScene extends Scene {
  public rexUI!: RexUIPlugin;
  public toaster!: ComponentManager;
  public toast = createStandaloneToast();

  // react component for inputing message content
  public sendMessageInput?: ComponentManager;
  // player precedent messages
  public precedentMessages: string[] = new Array();

  public player!: Player;
  public inventoryComponent?: ComponentManager;
  public currentInteraction?: Interaction;

  // max 3 toasts
  private chatMessageBoxes: Map<Hustler, Array<Toast>> = new Map();

  constructor() {
    super({
      key: 'UIScene',
    });
  }

  init(data: { player: Player }) {
    this.player = data.player;
  }

  create(): void {
    // this.toaster = this.add.reactDom(Toaster);
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

        EventHandler.emitter().emit(Events.PLAYER_CITIZEN_INTERACT_FINISH, citizen, true);
      }
    }

    // console.log(this.chatMessageBoxes.length);
    this.chatMessageBoxes.forEach((chatToasts, hustler) =>
      chatToasts.forEach((chatToast, i) =>
        chatToast.setPosition(
          (hustler.x - this.player.scene.cameras.main.worldView.x) *
            this.player.scene.cameras.main.zoom,
          (hustler.y - this.player.scene.cameras.main.worldView.y) *
            this.player.scene.cameras.main.zoom -
            hustler.displayHeight * 1.8 -
            chatToast.displayHeight * 1.2 * (chatToasts.length - 1 - i) -
            (hustler.hoverText ? hustler.hoverText.displayHeight * 1.2 : 0),
        ),
      ),
    );
  }

  private _handleEvents() {
    this._handleNetworkEvents();
    this._handleInputs();
    this._handleInteractions();
    this._handleQuests();
    this._handleMisc();
  }

  private _handleNetworkEvents() {
    if (NetworkHandler.getInstance().connected)
      this.toast({
        ...chakraToastStyle,
        title: 'Connection established',
        status: 'success',
      });

    NetworkHandler.getInstance().on(NetworkEvents.CONNECTED, () =>
      this.toast({
        ...chakraToastStyle,
        title: 'Connection established',
        status: 'success',
      }),
    );

    NetworkHandler.getInstance().on(NetworkEvents.DISCONNECTED, () => {
      this.toast({
        ...chakraToastStyle,
        title: 'Connection lost',
        status: 'error',
      });

      // display connection lost window
      // this.add.reactDom(ConnectionLostWindow);
    });
  }

  private _handleInputs() {
    const chatKey = this.input.keyboard.addKey('T');

    const openChatInput = () => {
      if (
        this.sendMessageInput ||
        this.player.busy ||
        (this.chatMessageBoxes.get(this.player)?.length ?? 0) > 2
      )
        return;

      // prevent player from moving
      this.player.scene.input.keyboard.enabled = false;
      // prevent phaser from "blocking" some keys (for typing in chat)
      this.player.scene.input.keyboard.disableGlobalCapture();

      this.sendMessageInput = this.add.reactDom(ChatType, {
        precedentMessages: this.precedentMessages,
      });

      this.sendMessageInput.events.on('chat_submit', (text: string) => {
        text = text.trim();

        if (text.length > 150) {
          this.toast({
            ...chakraToastStyle,
            title: 'Message too long',
            status: 'warning',
          });
          return;
        }

        // reset to default
        this.player.scene.input.keyboard.enabled = true;
        this.player.scene.input.keyboard.enableGlobalCapture();
        this.sendMessageInput?.destroy();
        this.sendMessageInput = undefined;

        if (text.length > 0) {
          this.precedentMessages.unshift(text);
          EventHandler.emitter().emit(Events.CHAT_MESSAGE, this.player, text);
          NetworkHandler.getInstance().sendMessage(UniversalEventNames.PLAYER_CHAT_MESSAGE, {
            message: text,
          });
        }
      });
    };

    chatKey.on(Phaser.Input.Keyboard.Events.UP, openChatInput);
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

  private _handleMisc() {
    EventHandler.emitter().on(Events.CHAT_MESSAGE, (hustler: Hustler, text: string) => {
      const messageDuration = {
        in: 500,
        hold: 3500 + text.length * 50,
        out: 500,
      };

      let chatToasts = this.chatMessageBoxes.get(hustler);
      if (!chatToasts) this.chatMessageBoxes.set(hustler, new Array());

      this.chatMessageBoxes.get(hustler)!.push(
        this.rexUI.add.toast({
          background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0xffffff, 0.4),
          text: getBBcodeText(this, 200, 0, 0, 10, '18px').setText(text),
          space: {
            left: 5,
            right: 5,
            top: 5,
            bottom: 5,
          },
          duration: messageDuration,
        }),
      );
      const chatMessage =
        this.chatMessageBoxes.get(hustler)![this.chatMessageBoxes.get(hustler)!.length - 1];
      // show message
      chatMessage.showMessage(text);

      // destroy game object after duration & remove from array
      // timeout for duration of message
      setTimeout(
        () => {
          chatMessage.destroy();
          // remove chat message toast from array
          this.chatMessageBoxes
            .get(hustler)
            ?.splice(this.chatMessageBoxes.get(hustler)!.indexOf(chatMessage), 1);
        },
        Object.values(messageDuration).reduce((a, b) => a + b, 0),
      );
    });
  }

  private _handleItemInteractions() {
    // handle player add itme into inventory
    EventHandler.emitter().on(Events.PLAYER_INVENTORY_ADD_ITEM, (item: Item, pickup?: boolean) => {
      this.toast({
        ...chakraToastStyle,
        title: pickup
          ? `You picked up ${item.name}`
          : `${item.name} has been added to your inventory`,
        status: 'info',
      });
    });
    // handle player remove item from inventory
    EventHandler.emitter().on(Events.PLAYER_INVENTORY_REMOVE_ITEM, (item: Item, drop?: boolean) => {
      this.toast({
        ...chakraToastStyle,
        title: drop ? `You dropped ${item.name}` : `${item.name} was removed from your inventory`,
        status: 'info',
      });
    });
  }

  private _handleNpcInteractions() {
    EventHandler.emitter().on(
      Events.PLAYER_CITIZEN_INTERACT_FINISH,
      (citizen: Citizen, cancelled: boolean) => {
        if (!cancelled) return;

        this.toast({
          ...chakraToastStyle,
          title: 'You ran away from the conversation!',
          status: 'info',
        });
      },
    );

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
          EventHandler.emitter().emit(Events.PLAYER_CITIZEN_INTERACT_FINISH, citizen, false);

          // if the conversation is not marked as complete, push it to the array again
          if (conv.onFinish) if (conv.onFinish()) citizen.conversations.shift();
        });
      this.currentInteraction = { citizen, textBox, maxDistance: 100 };

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
      this.toast({
        ...chakraToastStyle,
        title: `New quest: ${quest.name}`,
      });
    });
    EventHandler.emitter().on(Events.PLAYER_QUEST_COMPLETE, (quest: Quest) => {
      this.toast({
        ...chakraToastStyle,
        title: `Completed quest: ${quest.name}`,
      });
    });
  }
}
