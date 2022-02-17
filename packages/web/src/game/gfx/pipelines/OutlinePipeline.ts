import outlineShader from "../shaders/Outline.shader";

export default class OutlinePipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    constructor(game: Phaser.Game) {
        super({
            name: "outline",
            game: game,
            renderTarget: true,
            fragShader: outlineShader.fragment,
        });
    }

    onPreRender() {
        // set uniforms
        this.set2f("uTextureSize", this.width, this.height);
    }

    onDraw() {

    }
}