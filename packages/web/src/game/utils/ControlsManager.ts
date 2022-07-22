import EventEmitter from "events";

export interface PlayerKeys {
    up: number;
    down: number;
    left: number;
    right: number;

    interact: number;
    inventory: number;
}

// export enum KeyType {
//     SETTINGS_KEY = "settings_key",
//     PLAYER_KEYS = "player_keys",
//     CHAT_KEY = "chat_key",
// }

export enum ControlsEvents {
    PLAYER_KEYS_UPDATED = 'PLAYER_KEYS_UPDATED',
    SETTINGS_KEY_UPDATED = 'SETTINGS_KEY_UPDATED',
    CHAT_KEY_UPDATED = 'CHAT_KEY_UPDATED',
}

export default class ControlsManager {
    private static instance: ControlsManager;

    private _emitter: EventEmitter;

    private _playerKeys: PlayerKeys;
    private _settingsKey: number;
    private _chatKey: number;

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

    set settingsKey(key: number) {
        this._settingsKey = key;
        localStorage.setItem('settingsKey', this._settingsKey.toString());
        this._emitter.emit(ControlsEvents.SETTINGS_KEY_UPDATED, this._settingsKey);
    }

    set chatKey(key: number) {
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

    // onKey(key: number, event: ANY, input: Phaser.Input.Keyboard.KeyboardPlugin, callback: (e: Phaser.Input.Keyboard.Key) => void) {
    //     // individual keys
    //     if (key === this._settingsKey) {
    //         let inputKey = input.addKey(this._settingsKey);
    //         inputKey.on(Phaser.Input.Keyboard.Events.UP, callback);

    //         this.emitter.on(ControlsEvents.SETTINGS_KEY_UPDATED, (key: number) => {
    //             input.removeKey(inputKey);
    //             inputKey = input.addKey(key);
    //             inputKey.on(Phaser.Input.Keyboard.Events.UP, callback);
    //         });

    //         return;
    //     } else if (key === this._chatKey) {
    //         let inputKey = input.addKey(this._chatKey);
    //         inputKey.on(Phaser.Input.Keyboard.Events.UP, callback);

    //         this.emitter.on(ControlsEvents.CHAT_KEY_UPDATED, (key: number) => {
    //             input.removeKey(inputKey);
    //             inputKey = input.addKey(key);
    //             inputKey.on(Phaser.Input.Keyboard.Events.UP, callback);
    //         });

    //         return;
    //     }


    //     // check player keys
    //     for (const k of Object.keys(this._playerKeys)) {
    //         if ((this._playerKeys as any)[k] === key) {
    //             let inputKey = input.addKey(key);
    //             inputKey.on(Phaser.Input.Keyboard.Events.UP, callback);

    //             this.emitter.on(ControlsEvents.PLAYER_KEYS_UPDATED, (key: number) => {
    //                 input.removeKey(inputKey);
    //                 inputKey = input.addKey(key);
    //                 inputKey.on(Phaser.Input.Keyboard.Events.UP, callback);
    //             });

    //             return;
    //         }
    //     }
    // }

    setKey(key: number, value: number) {
        // individual keys
        if (key === this._settingsKey) {
            this.settingsKey = value;
            this.emitter.emit(ControlsEvents.SETTINGS_KEY_UPDATED, this.settingsKey);
            return;
        } else if (key === this._chatKey) {
            this.chatKey = value;
            this.emitter.emit(ControlsEvents.CHAT_KEY_UPDATED, this.chatKey);
            return;
        }


        // check player keys
        for (const k of Object.keys(this._playerKeys)) {
            if ((this._playerKeys as any)[k] === key) {
                (this._playerKeys as any)[k] = value;
                this._emitter.emit(ControlsEvents.PLAYER_KEYS_UPDATED, this._playerKeys);
                localStorage.setItem('playerKeys', JSON.stringify(this._playerKeys));
                return;
            }
        }
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