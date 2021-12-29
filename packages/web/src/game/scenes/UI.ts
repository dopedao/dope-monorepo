import Citizen from "game/entities/citizen/Citizen";
import Conversation from "game/entities/citizen/Conversation";
import Player from "game/entities/Player";
import EventHandler, { Events } from "game/handlers/EventHandler";
import { createTextBox } from "game/ui/rex/TextBox";
import { Scene } from "phaser";
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';

export default class UIScene extends Scene {
    public rexUI!: RexUIPlugin;

    public player!: Player;

    constructor() {
      super({
        key: 'UIScene'
      });
    }
  
    init(data: { player: Player })
    {
        this.player = data.player;
    }
  
    create(): void {
        this._handleEvents();
    }

    private _handleEvents()
    {
        EventHandler.emitter().on(Events.PLAYER_INTERACT_NPC, (npc: Citizen) => {
            // open textbox
            const conv: Conversation | undefined = npc.conversations.shift();
            
            if (conv)
            {
                // disable inputs
                this.player.scene.input.keyboard.enabled = false;
                createTextBox(this, {
                    wrapWidth: 500,
                    fixedWidth: 500,
                    fixedHeight: 65,
                }).start(conv.text, 50).on('destroy', () => {
                    // re-enable inputs
                    this.player.scene.input.keyboard.enabled = true;
                    EventHandler
                    EventHandler.emitter().emit(Events.PLAYER_INTERACT_NPC_COMPLETE, npc);

                    // call conversation oncomplete
                    if (conv.onComplete)
                        conv.onComplete();
                });
            }
        });
    }
}
  