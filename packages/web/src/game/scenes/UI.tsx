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
import { GameObjects, Scene } from 'phaser';
import { ComponentManager } from 'phaser3-react/src/manager';
import Toast from 'phaser3-rex-plugins/templates/ui/toast/Toast';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import { ChakraProvider, createStandaloneToast, RenderProps, Spinner, UseToastOptions } from '@chakra-ui/react';
import { ToastOptions } from 'react-hot-toast/dist/core/types';
import GameScene from './Game';
import NetworkHandler from 'game/handlers/network/NetworkHandler';
import { DataTypes, NetworkEvents, UniversalEventNames } from 'game/handlers/network/types';
import Hustler from 'game/entities/Hustler';
import { toast } from '@chakra-ui/react';
import ConnectionLostWindow from 'game/ui/react/components/ConnectionLostWindow';
import VirtualJoyStickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin';
import VirtualJoyStick from 'phaser3-rex-plugins/plugins/virtualjoystick';
import theme from 'ui/styles/theme';
import React from 'react';
import { ToastBar } from 'react-hot-toast'; 
import Palette from 'game/constants/Palette';

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

  public joyStick!: VirtualJoyStick;

  public toaster!: ComponentManager;
  public toast = createStandaloneToast(theme);

  // loading component, undefined if not visible
  private loadingSpinner?: ComponentManager;
  // react component for inputing message content
  public sendMessageInput?: ComponentManager;
  // player precedent messages
  public precedentMessages: string[] = new Array();

  public player!: Player;
  public inventoryComponent?: ComponentManager;
  public currentInteraction?: Interaction;

  // max 3 toasts
  private chatMessageBoxes: Map<Hustler, Array<Toast>> = new Map();

  // hustler name: messages
  private messagesStore: Array<DataTypes[NetworkEvents.SERVER_PLAYER_CHAT_MESSAGE]> = new Array();

  constructor() {
    super({
      key: 'UIScene',
    });
  }

  init(data: { player: Player }) {
    this.player = data.player;
  }

  toggleLoading(loading: boolean) {
    console.log(loading && !this.loadingSpinner);
    if (loading && !this.loadingSpinner)
      this.loadingSpinner = this.add.reactDom(() => <ChakraProvider theme={theme}>
        <Spinner size="xl" color="white" style={{
          position: 'absolute',
          bottom: '5%',
          right: '5%',
          boxShadow: '0px 0px 60px black',
        }} />
      </ChakraProvider>);
    else if (!loading && this.loadingSpinner) {
      this.loadingSpinner.destroy();
      this.loadingSpinner = undefined;
    }
  }

  create(): void {
    // TODO: find alternative
    this.input.setGlobalTopOnly(false);
    this.joyStick = (this.plugins.get('rexVirtualJoystick') as VirtualJoyStickPlugin).add(this, {
      x: this.sys.game.canvas.width / 2,
      y: this.sys.game.canvas.height / 2,
      radius: this.sys.game.canvas.width / 3,
    });
    this.joyStick.base.removeFromDisplayList();
    this.joyStick.thumb.removeFromDisplayList();
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

    const offsetSpacing = 2;
    const playerCamera = this.player.scene.cameras.main;
    this.chatMessageBoxes.forEach((chatToasts, hustler) => {
      if (!hustler.active) {
        chatToasts.forEach((toast) => toast.destroy());
        this.chatMessageBoxes.delete(hustler);
        return;
      }

      let offsetHeight = 0;
      for (let i = chatToasts.length - 1; i >= 0; i--) {
        const chatToast = chatToasts[i];
        offsetHeight += (chatToast.displayHeight) + offsetSpacing;

        let x = (hustler.x - playerCamera.worldView.x) * playerCamera.zoom;
        let y = (hustler.y - playerCamera.worldView.y) * playerCamera.zoom;

        y -= this.player.displayHeight * (playerCamera.zoom / 2);
        y -= offsetHeight;

        if (hustler.hoverText)
          y -= hustler.hoverText.displayHeight * 2;

        chatToast.setPosition(x, y);
        if (chatToast.scale !== playerCamera.zoom / 3)
          chatToast.setScale(playerCamera.zoom / 3);
      }
    });
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

    NetworkHandler.getInstance().on(NetworkEvents.ERROR, (data: DataTypes[NetworkEvents.ERROR]) => {
      this.toast({
        ...chakraToastStyle,
        title: 'Error ' + data.code,
        description: data.message,
        status: 'error',
      })
    });
  }

  private _handleInputs() {
    const chatKey = this.input.keyboard.addKey('T');

    const openChatInput = () => {
      if (
        this.sendMessageInput ||
        this.player.busy
      )
        return;

      this.player.busy = true;
      // prevent player from moving
      this.player.scene.input.keyboard.enabled = false;
      // prevent phaser from "blocking" some keys (for typing in chat)
      this.player.scene.input.keyboard.disableGlobalCapture();

      this.sendMessageInput = this.add.reactDom(ChatType, {
        precedentMessages: this.precedentMessages,
        messagesStore: this.messagesStore,
        chatMessageBoxes: this.chatMessageBoxes.get(this.player),
      });

      this.sendMessageInput.events.on('chat_submit', (text: string) => {
        // NOTE: trim on ui comp?
        text = text.trim();

        // reset to default
        this.player.scene.input.keyboard.enabled = true;
        this.player.scene.input.keyboard.enableGlobalCapture();
        this.sendMessageInput?.destroy();
        this.sendMessageInput = undefined;
        this.player.busy = false;

        if (text.length > 0) {
          // TODO: kinda heavy. maybe just push to end of array and reverse it?
          this.precedentMessages.unshift(text);
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
    // re-position joystick when window is resized (center)
    this.scale.on(Phaser.Scale.Events.RESIZE, (size: Phaser.Structs.Size) => {
      this.joyStick.setPosition(size.width / 2, size.height / 2);
      // TODO: resize radius
    })

    EventHandler.emitter().on(Events.CHAT_MESSAGE, (hustler: Hustler, text: string, timestamp?: number) => {      
      const messageData: DataTypes[NetworkEvents.SERVER_PLAYER_CHAT_MESSAGE] = {
        author: hustler.name,
        message: text,
        timestamp: timestamp ?? Date.now(),
      };
      // add to store
      this.messagesStore.push(messageData);
      // if chattype component is open, dispatch event to update it
      if (this.sendMessageInput) this.sendMessageInput.events.emit('chat_message', messageData);

      
      // display message IG 
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

      // const icon = this.rexUI.add.label({
      //   orientation: 'y',
      //   icon: this.add.image(0, 0, citizen.texture.key, citizen.texture.key + '_icon').setScale(3),
      //   text: getBBcodeText(this, 0, 0, 0, 0, '10px')
      //   .setText(citizen.name)
      //   .setXOffset(-10)
      //   // .setOrigin(-0.5, 0.5)
      //   .setColor(Palette.COLOR_DARK)
      // });
      const icon = this.add.image(0, 0, citizen.texture.key, citizen.texture.key + '_icon').setScale(3);
      icon.setOrigin(0, -0.5);
      // icon.layout();
      const textBox = new DialogueTextBox(this, 500, 500, 65, icon);
      let text = conv.texts[0];
      if (!text) return;

      textBox.start(text.text, text.typingSpeed ?? 50, text.choices)
        .on('complete', (selectedChoice: number) => {
          if (text.onEnd)
            text.onEnd!(text, conv, selectedChoice);

          conv.texts.shift();
          if (conv.texts.length === 0) {
            textBox.destroy();
            this.currentInteraction = undefined;

            // TODO: Move somewhere else, maybe in the Citizen class?
            citizen.onInteractionFinish();
            EventHandler.emitter().emit(Events.PLAYER_CITIZEN_INTERACT_FINISH, citizen, false);

            citizen.conversations.shift();
            // TODO: move else where
            NetworkHandler.getInstance().sendMessage(UniversalEventNames.PLAYER_UPDATE_CITIZEN_STATE, {
              id: citizen.getData('id'),
              incConversations: true 
            });

            if (conv.onFinish) conv.onFinish();

            return;
          }

          // TODO: Fire up end text event and move somewhere else, maybe in network handler?
          NetworkHandler.getInstance().sendMessage(UniversalEventNames.PLAYER_UPDATE_CITIZEN_STATE, {
            id: citizen.getData('id'),
            incTexts: true 
          });

          text = conv.texts[0];
          textBox.start(text!.text, text!.typingSpeed ?? 50, text.choices);
        })

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
