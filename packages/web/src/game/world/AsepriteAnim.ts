export interface AsepriteAnimation {
    frames: Frames;
    meta:   Meta;
}

export interface Frames {
    [key: string]: AnimationFrame;
}

export interface AnimationFrame {
    frame:            Frame;
    rotated:          boolean;
    trimmed:          boolean;
    spriteSourceSize: Frame;
    sourceSize:       Size;
    duration:         number;
}

export interface Frame {
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface Size {
    w: number;
    h: number;
}

export interface Meta {
    app:       string;
    version:   string;
    image:     string;
    format:    string;
    size:      Size;
    scale:     string;
    frameTags: any[];
    layers:    Layer[];
    slices:    any[];
}

export interface Layer {
    name:      string;
    opacity:   number;
    blendMode: string;
}
