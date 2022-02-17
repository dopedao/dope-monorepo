// eslint-disable-next-line import/no-anonymous-default-export
export default {
    vertex: undefined,
    fragment: `
        #ifdef GL_FRAGMENT_PRECISION_HIGH
        #define highmedp highp
        #else
        #define highmedp mediump
        #endif
        precision highmedp float;
    
        uniform vec2 uTextureSize;

        uniform sampler2D uMainSampler;
        varying vec2 outTexCoord;

        void main(void) 
        {
            vec4 texColor = texture2D(uMainSampler, outTexCoord);

            // "width & height" of one pixel in texture space
            vec2 onePixel = vec2(1.0, 1.0) / uTextureSize;
            float upAlpha = texture2D(uMainSampler, outTexCoord + vec2(0.0, onePixel.y)).a;
            float leftAlpha = texture2D(uMainSampler, outTexCoord + vec2(-onePixel.x, 0.0)).a;
            float downAlpha = texture2D(uMainSampler, outTexCoord + vec2(0.0, -onePixel.y)).a;
            float rightAlpha = texture2D(uMainSampler, outTexCoord + vec2(onePixel.x, 0.0)).a;

            // if our pixel is transparent & has at least one neighbouring not transparent pixel
            if (texColor.a == 0.0 && max(max(upAlpha, downAlpha), max(leftAlpha, rightAlpha)) == 1.0)
            {
                texColor = vec4(1.0, 1.0, 1.0, 1.0);
            }

            gl_FragColor = texColor;
        }
    `
}