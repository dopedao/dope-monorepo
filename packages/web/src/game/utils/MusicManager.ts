import EventHandler, { Events } from "game/handlers/events/EventHandler";
import { chakraToastStyle } from "game/scenes/UI";
import { Howl } from "howler";

export interface Song {
    name: string;
    song: Howl;
}

export default class MusicManager {
    private _songs: Song[];

    private _upcomingSong?: Song;
    private _currentSong?: Song;
    private _lastSong?: Song;

    public shuffleNext: boolean = false;

    get upcomingSong() {
        return this._upcomingSong;
    }

    get songs() {
        return this._songs;
    }

    get currentSong() {
        return this._currentSong;
    }

    get lastSong() {
        return this._lastSong;
    }

    constructor(songs: Song[], shuffleNext: boolean = false) {
        this._songs = songs;
        this.shuffleNext = shuffleNext;
    }

    private _randomSong(condition?: (song: Song) => boolean) {
        let randomSong = this._songs[Math.floor(Math.random() * Object.keys(this._songs).length)];
        while (condition && !condition(randomSong))
            randomSong = this._songs[Math.floor(Math.random() * Object.keys(this._songs).length)];

        return randomSong;
    }

    // takes song to play otherwise shuffles
    shuffle(song?: Song | number, shuffleNext: boolean = this.shuffleNext, notification: boolean = true) {
        this._lastSong = this._currentSong;
        if (this.currentSong) {
            this.currentSong.song.off('end');
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

        this._currentSong = song ?? this.upcomingSong ?? this._randomSong((s) => s !== this._lastSong);
        this._currentSong.song.play();
        this._upcomingSong = undefined;

        // show what's playing a bit after the song has started playing
        if (notification)
            setTimeout(() => {
                EventHandler.emitter().emit(Events.SHOW_NOTIFICAION, {
                    ...chakraToastStyle,
                    title: 'Chiptune',
                    description: `Playing ${this._currentSong!.name}`,
                });
            }, 5000);
        
        if (shuffleNext)
            this._upcomingSong = this._randomSong((s) => s !== this._currentSong);

        this._currentSong.song.on('end', () => {
            if (this.currentSong?.song.loop()) return;
            this.shuffle();
        });
    }

    stopPlaying() {
        if (this._currentSong) {
            this.currentSong?.song.off('end');
            this._currentSong.song.stop();
            this._currentSong = undefined;
        }

        this._songs.forEach(song => {
            song.song.off('end');
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

        this._songs[song].song.off('end');
        this._songs[song].song.stop();
        this._songs.splice(song, 1);
    }

    pause() {
        if (this._currentSong)
            this._currentSong.song.pause();
    }

    resume() {
        if (this._currentSong)
            this._currentSong.song.play();
    }
} 