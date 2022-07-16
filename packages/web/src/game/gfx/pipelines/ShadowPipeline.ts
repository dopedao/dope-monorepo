import shadowShader from "../shaders/Shadow.shader";

export default class ShadowPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    constructor(game: Phaser.Game) {
        super({
            game: game,
            renderTarget: true,
            fragShader: shadowShader.fragment,  // GLSL shader
        });
    }

    onPreRender() {
        // set uniforms
    }

    onDraw() {

    }
}