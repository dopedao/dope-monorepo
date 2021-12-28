import Citizen from "game/entities/Citizen";
import Player from "game/entities/Player";
import EventHandler, { Events } from "game/handlers/EventHandler";
import { createTextBox } from "game/ui/rex/TextBox";
import { Scene } from "phaser";
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';

export default class UIScene extends Scene {
    public rexUI!: RexUIPlugin;
    public eventHandler!: EventHandler;

    public player!: Player;

    constructor() {
      super({
        key: 'UIScene'
      });
    }
  
    init(data: {player: Player, eventHandler: EventHandler})
    {
        this.player = data.player;
        this.eventHandler = data.eventHandler;
        console.log("UIScene init");
    }
  
    create(): void {
        console.log('haha');
        this._handleEvents();
    }

    private _handleEvents()
    {
        this.eventHandler.emitter.on(Events.PLAYER_INTERACT_NPC, (npc: Citizen) => {
            // open textbox
            createTextBox(this, {
                wrapWidth: 500,
                fixedWidth: 500,
                fixedHeight: 65,
            }).start(`I don't know what to write so I'm just typing what goes through my head to show you how the dialog text boxes look 
Also did you know that I can talk in french too so lets do that
Bon à partir de maintenant je vais parler en français car je n'ai aucune idée de quoi écrire`, 50);
        });
    }
}
  