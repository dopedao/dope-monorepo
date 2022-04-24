import EventHandler, { Events } from "game/handlers/events/EventHandler";
import { chakraToastStyle } from "game/scenes/UI";

export interface Song {
    name: string;
    song: Phaser.Sound.WebAudioSound;
}

export default class MusicManager {
    private _songs: Song[];
    private _currentSong?: Song;
    private _lastSong?: Song;

    get songs() {
        return this._songs;
    }

    get currentSong() {
        return this._currentSong;
    }

    get lastSong() {
        return this._lastSong;
    }

    constructor(songs: Song[]) {
        this._songs = songs;
    }

    // takes song to play otherwise shuffles
    shuffle(song?: Song | number, notification: boolean = true) {
        this._lastSong = this._currentSong;
        if (this.currentSong) {
            this.currentSong.song.stop();
            this._currentSong = undefined;
        }

        if (typeof song === 'number') {
            if (song < 0 || song >= this._songs.length) {
                console.warn(`MusicManager: song index ${song} out of range`);
                return;
            }

            song = this._songs[song];
        }

        let randomSong = song ?? this._songs[Math.floor(Math.random() * Object.keys(this._songs).length)];
        while (randomSong === this.lastSong)
            randomSong = this._songs[Math.floor(Math.random() * Object.keys(this._songs).length)];

        this._currentSong = randomSong;
        randomSong.song.play();

        // show what's playing a bit after the song has started playing
        if (notification)
            setTimeout(() => {
                EventHandler.emitter().emit(Events.SHOW_NOTIFICAION, {
                    ...chakraToastStyle,
                    title: 'Chiptune',
                    description: `Playing ${randomSong.name}`,
                });
            }, 5000);
        
        randomSong.song.once('complete', () => {
            this.shuffle();
        });
    }

    stopPlaying() {
        if (this._currentSong) {
            this._currentSong.song.stop();
            this._currentSong = undefined;
        }

        this._songs.forEach(song => {
            song.song.removeListener('complete');
        });
    }

    addSong(song: Song) {
        this._songs.push(song);
    }

    removeSong(song: Song | number) {
        if (typeof song === 'object') {
            song = this._songs.indexOf(song);
        }

        if (song < 0 || song >= this._songs.length) {
            console.warn(`MusicManager: song index ${song} out of range`);
            return;
        }

        this._songs.splice(song, 1);
    }

    pause() {
        if (this._currentSong)
            this._currentSong.song.pause();
    }

    resume() {
        if (this._currentSong)
            this._currentSong.song.resume();
    }
} 