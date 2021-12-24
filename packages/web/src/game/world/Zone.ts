import Hustler from "game/entities/Hustler";
import EventHandler from "game/handlers/EventHandler";

export default class Zone
{
    private body: MatterJS.BodyType;
    private scene: Phaser.Scene;
    private objects: Array<Phaser.GameObjects.GameObject>;

    private inside: boolean = false;

    // callbacks
    private onEnter: () => void;
    private onExit: () => void;

    constructor(body: MatterJS.BodyType, scene: Phaser.Scene, objects: Array<Phaser.GameObjects.GameObject>, onEnter: () => void, onExit: () => void)
    {
        this.body = body;
        this.scene = scene;
        this.objects = objects;

        this.onEnter = onEnter;
        this.onExit = onExit;

        // disable collision
        this.body.collisionFilter.mask = 0;
    }

    update()
    {
        if (!this.inside && this.scene.matter.overlap(this.body, this.objects))
        {
            this.onEnter();
            this.inside = true;
        }
        else if (this.inside && !this.scene.matter.overlap(this.body, this.objects))
        {
            this.onExit();
            this.inside = false;
        }
    }
}