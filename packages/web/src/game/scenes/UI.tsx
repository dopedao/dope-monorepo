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
import theme from 'ui/styles/theme';
import React from 'react';
import { ToastBar } from 'react-hot-toast'; 
import Palette from 'game/constants/Palette';
import Settings from 'game/ui/react/components/Settings';
import Debug from 'game/ui/react/components/Debug';
import VirtualJoyStick from 'phaser3-rex-plugins/plugins/virtualjoystick';
import VirtualJoyStickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin';
import ControlsManager, { ControlsEvents } from 'game/utils/ControlsManager';
import EventWelcome from 'game/ui/react/components/EventWelcome';
import { number } from 'starknet';
import { getConversation, Texts } from 'game/constants/Dialogues';

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

export const loadingSpinner = () => <ChakraProvider theme={theme}>
  <Spinner size="xl" color="white" style={{
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    boxShadow: '0px 0px 60px black',
  }} />
</ChakraProvider>;

export default class UIScene extends Scene {
  private hustlerData!: any;
  
  public rexUI!: RexUIPlugin;
  public joyStick!: VirtualJoyStick;

  public toaster!: ComponentManager;
  public toast = createStandaloneToast(theme);

  private _inputsEnabled: boolean = true;
  // react component for inputing message content
  public openedComponent?: ComponentManager;
  // player precedent messages
  public precedentMessages: string[] = new Array();

  public player!: Player;
  public inventoryComponent?: ComponentManager;
  public currentInteraction?: Interaction;

  // hustler name: messages
  private messagesStore: Array<DataTypes[NetworkEvents.SERVER_PLAYER_CHAT_MESSAGE]> = new Array();

  get inputsEnabled() {
    return this._inputsEnabled;
  }

  constructor() {
    super({
      key: 'UIScene',
    });
  }

  init(data: { player: Player, hustlerData: any }) {
    this.player = data.player;
    this.hustlerData = data.hustlerData;
  }

  create(): void {
    this._handleEvents();

    // pass input events even when captured by this scene (joystick -> pathfinder)
    this.input.setGlobalTopOnly(false);
    this.joyStick = (this.plugins.get('rexVirtualJoystick') as VirtualJoyStickPlugin).add(this, {
      x: this.sys.game.canvas.width / 2,
      y: this.sys.game.canvas.height / 2,
      radius: this.sys.game.canvas.width / 4,
    });
    this.joyStick.base.removeFromDisplayList();
    this.joyStick.thumb.removeFromDisplayList();

    // TODO: move somewhere else?
    // re-position joystick when window is resized (center)
    this.scale.on(Phaser.Scale.Events.RESIZE, (size: Phaser.Structs.Size) => {
      this.joyStick.setPosition(size.width / 2, size.height / 2);
      // TODO: resize radius
    });


    /* ** NIGHT EVENT **
    const inputs = this.toggleInputs(true);
    const welcomeScreen = this.add.reactDom(EventWelcome);
    welcomeScreen.events.on('game', () => {
      inputs();
      welcomeScreen.destroy();
    });

    // schedule messages
    const messages: {[key: number]: {
      message: string;
      duration: number;
    }} = {
      1650675600: {
        message: "Welcome to the Dope City Stress Test! Feel free to explore while listening to some Chiptunes or the mixtape. We will meet at the Jamingo at 9:15PM EST.",
        duration: 15
      },
      1650676200: {
        message: "Everyone please head over to the Jamingo!",
        duration: 5
      },
      1650676800: {
        message: "Okay guys! Can we get the CONTRIBUTORS in front of PERAMA’s ARCADE for a picture!\nEveryone, please gather for a group picture in front of JAMINGO",
        duration: 5
      },
      1650677100: {
        message: `
        Hey hustlers it's time to flex on twitter for our raffle to win some dope gear.
        - Check our twitter page and Retweet the raffle post.
        - Reply to raffle post with a screenshot of your OG hustler inside the map. Make sure to include your OG number!
        - Use hashtags in the post: #dopewars #oghustler
        We will pick 5 random winners at 9:45PM and announce shortly after. 
        The rest will be done in batches during the weekend. Entrants can win more than once.
        `,
        duration: 35
      }
    }

    Object.keys(messages).forEach((key: unknown) => {
      if (Date.now() > ((key as number * 1000) + (messages[key as number].duration * 60 * 1000)))
        return;

      const showMessage = () => {
        this.toast({
          ...chakraToastStyle,
          title: 'Announcement',
          description: messages[key as number].message,
          status: 'warning',
          duration: ((messages[key as number].duration * 60) * 1000 + (key as number * 1000)) - Date.now(),
        });
      }

      if ((key as number * 1000) < Date.now()) {
        showMessage();
        return;
      }
      setTimeout(showMessage, (key as number * 1000) - Date.now());
    });
    ** NIGHT EVENT ** */
  }

  update(time: number, delta: number): void {
    // TODO: do this elsewhere? in game scene?
    // if the player moves too far away from the "owner" of the current interaction
    // cancel it.
    if (this.currentInteraction?.textBox instanceof DialogueTextBox) {
      const playerPos = new Phaser.Math.Vector2(this.player.x, this.player.y);
      const citizen = this.currentInteraction.citizen;
      const citizenPos = new Phaser.Math.Vector2(
        this.currentInteraction.citizen.x,
        this.currentInteraction.citizen.y,
      );

      citizen.lookAt(playerPos.x, playerPos.y);
      this.player.scene.cameras.main.centerOn((this.player.x + citizenPos.x) / 2, (this.player.y + citizenPos.y) / 2);

      if (playerPos.distance(citizenPos) > this.currentInteraction.maxDistance) {
        // onInteractionFinish!!! not complete.
        this.currentInteraction.citizen.onInteractionFinish();
        this.currentInteraction.textBox.destroy();
        this.currentInteraction = undefined;

        EventHandler.emitter().emit(Events.PLAYER_CITIZEN_INTERACT_FINISH, citizen, true);
      }
    }
  }

  private _handleEvents() {
    this._handleNetworkEvents();
    this._handleInputs();
    this._handleInteractions();
    this._handleQuests();
    this._handleMisc();
    this._handleCommandResult();
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

  private _handleCommandResult() {
    NetworkHandler.getInstance().on(NetworkEvents.SERVER_PLAYER_CHAT_COMMAND_RESULT, (data: DataTypes[NetworkEvents.SERVER_PLAYER_CHAT_COMMAND_RESULT]) => {
      this.toast({
        ...chakraToastStyle,
        title: data.message,
        status: data.status as any
    })
  })
  }

  toggleInputs(enable?: boolean, mouse?: boolean) {
    enable = enable === undefined ? !this.inputsEnabled : enable;

    if (enable) {
      // prevent player from moving
      if (mouse) this.player.scene.input.mouse.enabled = true;
      this.player.scene.input.keyboard.enabled = true;
      if (mouse) this.input.mouse.enabled = true;
      this.input.keyboard.enabled = true;
      // prevent phaser from "blocking" some keys (for typing in chat)
      this.player.scene.input.keyboard.enableGlobalCapture();
      this.input.keyboard.enableGlobalCapture();
      this._inputsEnabled = true;
    } else {
      // prevent player from moving
      if (mouse) this.player.scene.input.mouse.enabled = false;
      this.player.scene.input.keyboard.enabled = false;
      if (mouse) this.input.mouse.enabled = false;
      this.input.keyboard.enabled = false;
      // prevent phaser from "blocking" some keys (for typing in chat)
      this.player.scene.input.keyboard.disableGlobalCapture();
      this.input.keyboard.disableGlobalCapture();
      this._inputsEnabled = false;
    }
  }

  private _handleInputs() {
    const openChatInput = () => {
      if (this.player.busy || this.openedComponent)
        return;

      this.player.busy = true;
      
      this.toggleInputs(false);
      this.openedComponent = this.add.reactDom(ChatType, {
        precedentMessages: this.precedentMessages,
        messagesStore: this.messagesStore,
        chatMessageBoxes: this.player.chatMessageBoxes,
      });
      this.openedComponent.events.on('enableInputs', () => this.toggleInputs(false));
      this.openedComponent.events.on('disableInputs', () => this.toggleInputs(true));

      this.openedComponent.events.on('chat_submit', (text: string) => {
        this.toggleInputs(true);
        this.openedComponent?.destroy();
        // prevent settings from being opened again
        setTimeout(() => {
          this.openedComponent = undefined;
        }, 200);
        this.player.busy = false;

        // NOTE: trim on ui comp?
        text = text.trim();

        if (text.length > 0) {
          
          // if it starts with / it's a command
          // and gets handled differently
          if (text[0] == '/') {
            const split = text.split(" ")
            const name = split[0].slice(1)
            const args = split.slice(1)

            const cmd = {
              name: name,
              args: args
            }

            NetworkHandler.getInstance().send(UniversalEventNames.PLAYER_CHAT_COMMAND, cmd)

          } else {
            // TODO: kinda heavy. maybe just push to end of array and reverse it?
            this.precedentMessages.unshift(text);
            NetworkHandler.getInstance().send(UniversalEventNames.PLAYER_CHAT_MESSAGE, {
              message: text,
            });
          }
        }
      });
    };

    const openSettings = (e: Phaser.Input.Keyboard.Key) => {
      if (this.openedComponent) return;

      this.openedComponent = this.add.reactDom(Settings, {
        game: this.player.scene,
      });

      this.toggleInputs(false, true);
      this.openedComponent.events.on('disconnect', () => {
        this.openedComponent?.events.emit('close');
        NetworkHandler.getInstance().disconnect();
        NetworkHandler.getInstance().authenticator.logout();
      });
      this.openedComponent.events.on('close', () => {
        this.toggleInputs(true, true);
        this.openedComponent?.destroy();
        // prevent settings from being opened again
        setTimeout(() => {
          this.openedComponent = undefined;
        }, 200);
      });
    };

    let chatKey = this.input.keyboard.addKey(ControlsManager.getInstance().chatKey);
    ControlsManager.getInstance().emitter.on(ControlsEvents.CHAT_KEY_UPDATED, (key: Phaser.Input.Keyboard.Key) => {
      this.input.keyboard.removeKey(chatKey);
      chatKey = this.input.keyboard.addKey(key);
      chatKey.on(Phaser.Input.Keyboard.Events.UP, openChatInput);
    });

    let settingsKey = this.input.keyboard.addKey(ControlsManager.getInstance().settingsKey);
    ControlsManager.getInstance().emitter.on(ControlsEvents.SETTINGS_KEY_UPDATED, (key: Phaser.Input.Keyboard.Key) => {
      this.input.keyboard.removeKey(settingsKey);
      settingsKey = this.input.keyboard.addKey(key);
      settingsKey.on(Phaser.Input.Keyboard.Events.UP, openSettings);
    });

    // TODO: check if debug
    if (process.env.NODE_ENV === 'development') {
      const gameScene = this.player.scene as GameScene;

      const key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
      key.on(Phaser.Input.Keyboard.Events.UP, () => {
        this.toggleInputs(false, true);
        
        const debug = this.add.reactDom(Debug, {
          player: this.player,
          lights: gameScene.lights,
          map: gameScene.mapHelper.loadedMaps[this.player.currentMap],
          hustlers: (gameScene as any).hustlers.concat((gameScene as any).citizens),
          itemEntities: (gameScene as any).itemEntities,
        });
        debug.events.on('close', () => {
          this.toggleInputs(true, true);

          debug.destroy();
        })
      });
    };

    // handle player inventory open
    // EventHandler.emitter().on(Events.PLAYER_INVENTORY_OPEN, () => {
    //   this.inventoryComponent = this.add.reactDom(InventoryComponent, {
    //     inventory: this.player.inventory,
    //     quests: this.player.questManager.quests,
    //   });
    // });
    // EventHandler.emitter().on(Events.PLAYER_INVENTORY_CLOSE, () => {
    //   this.inventoryComponent?.destroy();
    //   this.inventoryComponent = undefined;
    // });

    chatKey.on(Phaser.Input.Keyboard.Events.UP, openChatInput);
    settingsKey.on(Phaser.Input.Keyboard.Events.UP, openSettings);
  }

  private _handleInteractions() {
    this._handleNpcInteractions();
    this._handleItemInteractions();
  }

  private _handleMisc() {
    EventHandler.emitter().on(Events.SHOW_NOTIFICAION, (toast: UseToastOptions) => {
      this.toast(toast);
    });

    EventHandler.emitter().on(Events.CHAT_MESSAGE, (hustler: Hustler, text: string, timestamp?: number, color?: string, addToChat?: boolean) => {      
      if (addToChat) {
        const messageData: DataTypes[NetworkEvents.SERVER_PLAYER_CHAT_MESSAGE] = {
          author: hustler.name,
          message: text,
          timestamp: timestamp ?? Date.now(),
          color: color ?? "white",
        };
        // add to store
        this.messagesStore.push(messageData);
        // if chattype component is open, dispatch event to update it
        if (this.openedComponent) this.openedComponent.events.emit('chat_message', messageData);
      }
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
      let conv: Conversation = citizen.conversations[0];

      // const icon = this.rexUI.add.label({
      //   orientation: 'y',
      //   icon: this.add.image(0, 0, citizen.texture.key, citizen.texture.key + '_icon').setScale(3),
      //   text: getBBcodeText(this, 0, 0, 0, 0, '10px')
      //   .setText(citizen.name)
      //   .setXOffset(-10)
      //   // .setOrigin(-0.5, 0.5)
      //   .setColor(Palette.COLOR_DARK)
      // });
      let icon;
      if (citizen.hustlerId !== '') {
        icon = this.add.image(0, 0, citizen.texture.key, citizen.texture.key + '_icon').setScale(3);
        icon.setOrigin(0, -0.5);
      }
      // icon.layout();
      const textBox = new DialogueTextBox(this, 500, 500, 65, icon);
      let text = conv.texts[0];
      if (!text) return;

      textBox.start(text.text, text.typingSpeed ?? 50, text.choices ? Object.keys(text.choices) : undefined)
        .on('complete', (selectedChoice?: number) => {
          if (text.onEnd)
            text.onEnd!(citizen, conv, text, selectedChoice);

          conv.texts.shift();
          if (selectedChoice !== undefined) {
            const choiceConv = getConversation(text.choices![Object.keys(text.choices!)[selectedChoice]]);
            if (choiceConv) {
              const idx = citizen.conversations.indexOf(conv);

              citizen.conversations.splice(idx, 1, choiceConv);
              // add conversation just after the one for the choice 
              // if it has text still left
              if (conv.texts.length > 0) citizen.conversations.splice(idx + 1, 0, conv);

              conv = choiceConv;
            }
          }

          if (conv.texts.length === 0) {
            textBox.destroy();
            this.currentInteraction = undefined;

            // TODO: Move somewhere else, maybe in the Citizen class?
            citizen.onInteractionFinish();
            EventHandler.emitter().emit(Events.PLAYER_CITIZEN_INTERACT_FINISH, citizen, false);

            citizen.conversations.shift();
            // TODO: move else where
            // NetworkHandler.getInstance().send(UniversalEventNames.PLAYER_UPDATE_CITIZEN_STATE, {
            //   id: citizen.getData('id'),
            //   incConversations: true 
            // });

            if (conv.onFinish) conv.onFinish(citizen, conv);

            return;
          }

          text = conv.texts[0];
          // TODO: Fire up end text event and move somewhere else, maybe in network handler?
          if (NetworkHandler.getInstance().connected) {
            NetworkHandler.getInstance().send(
                UniversalEventNames.PLAYER_UPDATE_CITIZEN_STATE,
                {
                    citizen: citizen.getData('id'),
                    conversation: conv.id,
                    text: Texts[conv.id].findIndex(t => t.text === text.text),
                },
            );
          }

          textBox.start(text!.text, text!.typingSpeed ?? 50, text.choices ? Object.keys(text.choices) : undefined);
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
