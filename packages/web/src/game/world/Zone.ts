import Hustler from "game/entities/Hustler";
import EventHandler from "game/handlers/EventHandler";

export default class Zone
{
    private body: MatterJS.BodyType;
    private scene: Phaser.Scene;
    private objects?: Array<Phaser.GameObjects.GameObject>;

    private inside: boolean = false;

    // callbacks
    private onEnter?: () => void;
    private onExit?: () => void;

    constructor(body: MatterJS.BodyType, scene: Phaser.Scene, objects?: Array<Phaser.GameObjects.GameObject>, onEnter?: () => void, onExit?: () => void)
    {
        this.body = body;

        // set the body as being a sensor so that it doesn't collide with anything
        this.body.isSensor = true;

        this.scene = scene;
        this.objects = objects;

        this.onEnter = onEnter;
        this.onExit = onExit;
    }

    update()
    {
        if (!this.inside && this.scene.matter.overlap(this.body, this.objects))
        {
            if (this.onEnter)
                this.onEnter();
            this.inside = true;
        }
        else if (this.inside && !this.scene.matter.overlap(this.body, this.objects))
        {
            if (this.onExit)
                this.onExit();
            this.inside = false;
        }
    }
}