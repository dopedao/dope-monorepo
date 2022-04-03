import EventEmitter from "events";

export type KeyIndicator = number;

export interface PlayerKeys {
    up: number;
    down: number;
    left: number;
    right: number;

    interact: number;
    inventory: number;
}

export enum ControlsEvents {
    PLAYER_KEYS_UPDATED = 'PLAYER_KEYS_UPDATED',
    SETTINGS_KEY_UPDATED = 'SETTINGS_KEY_UPDATED',
    CHAT_KEY_UPDATED = 'CHAT_KEY_UPDATED',
}

export default class ControlsManager {
    private static instance: ControlsManager;

    private _emitter: EventEmitter;

    private _playerKeys: PlayerKeys;
    private _settingsKey: KeyIndicator;
    private _chatKey: KeyIndicator;

    get emitter() {
        return this._emitter;
    }

    get playerKeys() {
        return this._playerKeys;
    }

    get settingsKey() {
        return this._settingsKey;
    }

    get chatKey() {
        return this._chatKey;
    }
    
    set playerKeys(keys: PlayerKeys) {
        this._playerKeys = keys;
        localStorage.setItem('playerKeys', JSON.stringify(this._playerKeys));
        this._emitter.emit(ControlsEvents.PLAYER_KEYS_UPDATED, this._playerKeys);
    }

    set settingsKey(key: KeyIndicator) {
        this._settingsKey = key;
        localStorage.setItem('settingsKey', this._settingsKey.toString());
        this._emitter.emit(ControlsEvents.SETTINGS_KEY_UPDATED, this._settingsKey);
    }

    set chatKey(key: KeyIndicator) {
        this._chatKey = key;
        localStorage.setItem('chatKey', this._chatKey.toString());
        this._emitter.emit(ControlsEvents.CHAT_KEY_UPDATED, this._chatKey);
    }

    constructor() {
        this._emitter = new EventEmitter();

        const playerKeys = localStorage.getItem('playerKeys');
        const settingsKey = localStorage.getItem('settingsKey');
        const chatKey = localStorage.getItem('chatKey');

        this._playerKeys = playerKeys ? JSON.parse(playerKeys) : {
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,

            interact: Phaser.Input.Keyboard.KeyCodes.E,
            inventory: Phaser.Input.Keyboard.KeyCodes.I,
        };

        this._settingsKey = settingsKey ? Number.parseInt(settingsKey) : Phaser.Input.Keyboard.KeyCodes.ESC;
        this._chatKey = chatKey ? Number.parseInt(chatKey) : Phaser.Input.Keyboard.KeyCodes.T;
    }

    // save keys to local storage
    save() {
        localStorage.setItem('playerKeys', JSON.stringify(this._playerKeys));
        localStorage.setItem('settingsKey', this._settingsKey.toString());
        localStorage.setItem('chatKey', this._chatKey.toString());
    }

    static getInstance() {
        if (!ControlsManager.instance) 
            ControlsManager.instance = new ControlsManager();

        return ControlsManager.instance;
    }
}