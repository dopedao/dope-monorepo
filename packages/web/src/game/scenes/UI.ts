import Citizen from "game/entities/citizen/Citizen";
import Conversation from "game/entities/citizen/Conversation";
import Player from "game/entities/Player";
import EventHandler, { Events } from "game/handlers/EventHandler";
import DialogueTextBox from "game/ui/rex/DialogueTextBox";
import { createTextBox } from "game/ui/rex/RexUtils";
import SpeechBubbleTextBox from "game/ui/rex/SpeechBubbleTextBox";
import { Scene } from "phaser";
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import GameScene from "./Game";

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
                (this.player.scene as GameScene).canUseMouse = false;
                this.player.scene.input.keyboard.enabled = false;
                new DialogueTextBox(this, 500, 500, 65,)
                    .start(conv.text, 50)
                    .on('destroy', () => {
                        // re-enable inputs
                        (this.player.scene as GameScene).canUseMouse = true;
                        this.player.scene.input.keyboard.enabled = true;

                        // TODO: Move somewhere else, maybe in the Citizen class?
                        EventHandler.emitter().emit(Events.PLAYER_INTERACT_NPC_COMPLETE, npc);

                        // call conversation oncomplete
                        if (conv.onComplete)
                            conv.onComplete();
                    });



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
            }
        });
    }
}
  