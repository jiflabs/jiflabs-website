"use client";

import {
    faPause,
    faPlay,
    faVolumeHigh,
    faVolumeLow,
    faVolumeOff,
    faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {EventHandler, KeyboardEventHandler, SyntheticEvent, useCallback, useEffect, useState} from "react";

import styles from "./audio-player.module.scss";

interface SeekEvent<T> extends SyntheticEvent<T> {
    key?: string,
}

type SeekEventHandler = EventHandler<SeekEvent<HTMLInputElement>>;

function formatSeconds(x: number | undefined): string {
    if (x === undefined)
        return "-:--";

    const minutes = Math.floor(x / 60);
    const seconds = Math.floor(x % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

type Props = {
    src: string,
};

export default function AudioPlayer({src}: Readonly<Props>) {
    const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);

    const mod = useCallback((consumer: (audio: HTMLAudioElement) => void) => {
        if (audioRef !== null)
            consumer(audioRef);
    }, [audioRef]);

    const [paused, setPaused] = useState<boolean>();
    const [time, setTime] = useState<number>();
    const [duration, setDuration] = useState<number>();
    const [volume, setVolume] = useState<number>();
    const [preVolume, setPreVolume] = useState<number>();
    const [muted, setMuted] = useState<boolean>();

    useEffect(() => {
        mod(audio => {
            audio.preload = "metadata";
            audio.load();

            setPaused(audio.paused);
            setTime(Number.isNaN(audio.currentTime) ? undefined : audio.currentTime);
            setDuration(Number.isNaN(audio.duration) ? undefined : audio.duration);
            setVolume(Number.isNaN(audio.volume) ? undefined : audio.volume * 100);
            setPreVolume(0);
            setMuted(false);
        });
    }, [mod]);

    const togglePause = useCallback(() => {
        mod(audio => paused ? audio.play() : audio.pause());
    }, [mod, paused]);
    const toggleMute = useCallback(() => mod(audio => {
        if (muted) {
            audio.volume = (preVolume ?? 100) / 100;
            setMuted(false);
        } else {
            audio.volume = 0;
            setPreVolume(volume ?? 0);
            setMuted(true);
        }
    }), [mod, muted, setMuted, preVolume, setPreVolume, volume]);

    const handleControlsBegin: KeyboardEventHandler<HTMLDivElement> = useCallback(event => {
        if (event.target !== event.currentTarget)
            return;
        switch (event.key) {
            case " ":
                event.preventDefault();
                togglePause();
                break;
            case "m":
                event.preventDefault();
                toggleMute();
                break;
            case "ArrowDown":
                event.preventDefault();
                mod(audio => audio.volume = Math.max(muted ? preVolume! / 100 : audio.volume - 0.01, 0));
                setMuted(false);
                break;
            case "ArrowUp":
                event.preventDefault();
                mod(audio => audio.volume = Math.min(muted ? preVolume! / 100 : audio.volume + 0.01, 1));
                setMuted(false);
                break;
            case "ArrowLeft":
                event.preventDefault();
                mod(audio => {
                    audio.pause();
                    audio.currentTime = Math.max(audio.currentTime - 1, 0);
                });
                break;
            case "ArrowRight":
                event.preventDefault();
                mod(audio => {
                    audio.pause();
                    audio.currentTime = Math.min(audio.currentTime + 1, audio.duration);
                });
                break;
            case "PageUp":
                event.preventDefault();
                mod(audio => {
                    audio.pause();
                    audio.currentTime = Math.max(audio.currentTime - 10, 0);
                });
                break;
            case "PageDown":
                event.preventDefault();
                mod(audio => {
                    audio.pause();
                    audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
                });
                break;
            case "Home":
            case "End":
                event.preventDefault();
                mod(audio => {
                    audio.pause();
                    audio.currentTime = 0;
                });
                break;
        }
    }, [togglePause, toggleMute, mod, muted, setMuted, preVolume]);

    const handleControlsEnd: KeyboardEventHandler<HTMLDivElement> = useCallback(event => {
        if (event.target !== event.currentTarget)
            return;
        switch (event.key) {
            case "ArrowLeft":
            case "ArrowRight":
            case "PageUp":
            case "PageDown":
            case "Home":
                event.preventDefault();
                mod(audio => audio.play());
                break;
        }
    }, [mod]);

    const handleSeekBegin: SeekEventHandler = useCallback(event => {
        if (event.target !== event.currentTarget)
            return;
        switch (event.key) {
            case undefined:
            case "ArrowUp":
            case "ArrowDown":
            case "ArrowLeft":
            case "ArrowRight":
                event.preventDefault();
                mod(audio => audio.pause());
                break;
        }
    }, [mod]);

    const handleSeekEnd: SeekEventHandler = useCallback(event => {
        if (event.target !== event.currentTarget)
            return;
        switch (event.key) {
            case undefined:
            case "ArrowUp":
            case "ArrowDown":
            case "ArrowLeft":
            case "ArrowRight":
                event.preventDefault();
                mod(audio => audio.play());
                break;
        }
    }, [mod]);

    return (
        <div title="Audio-Player">
            <audio ref={setAudioRef}
                   src={src}
                   preload="none"
                   onPlay={() => setPaused(false)}
                   onPause={() => setPaused(true)}
                   onDurationChange={event => setDuration(event.currentTarget.duration)}
                   onVolumeChange={event => setVolume(event.currentTarget.volume * 100)}
                   onTimeUpdate={event => setTime(event.currentTarget.currentTime)}
                   onEnded={event => event.currentTarget.currentTime = 0}>
                Dieser Browser unterstützt keine Audiowiedergabe.
            </audio>
            <div className={styles.controls}
                 title="Player-Steuerung"
                 tabIndex={0}
                 onKeyDown={handleControlsBegin}
                 onKeyUp={handleControlsEnd}>
                <div className={styles.left}>
                    <button onClick={togglePause} title={paused ? "Fortsetzen" : "Pausieren"}>
                        <FontAwesomeIcon icon={paused ? faPlay : faPause} size="lg"/>
                    </button>
                    <label className={styles.playback}>
                        <span>Wiedergabeposition</span>
                        <input type="range"
                               min={0}
                               max={duration ?? 0}
                               value={time ?? 0}
                               onKeyDown={handleSeekBegin}
                               onKeyUp={handleSeekEnd}
                               onMouseDown={handleSeekBegin}
                               onMouseUp={handleSeekEnd}
                               onPointerDown={handleSeekBegin}
                               onPointerUp={handleSeekEnd}
                               onPointerCancel={handleSeekEnd}
                               onChange={event => mod(audio => audio.currentTime = event.currentTarget.valueAsNumber)}
                               title="Wiedergabeposition"/>
                    </label>
                    <span className={styles.time}>
                    <span title="Aktuelle Wiedergabeposition">
                        {formatSeconds(time)}
                    </span> / <span title="Wiedergabeendposition">
                        {formatSeconds(duration)}
                    </span>
                </span>
                </div>
                <div className={styles.right}>
                    <button onClick={toggleMute} title={muted ? "Lautschalten" : "Stummschalten"}>
                        <FontAwesomeIcon icon={
                            muted
                                ? faVolumeXmark
                                : (volume ?? 0) < 20
                                    ? faVolumeOff
                                    : (volume ?? 0) < 70
                                        ? faVolumeLow
                                        : faVolumeHigh
                        } size="lg"/>
                    </button>
                    <label className={styles.volume}>
                        <span>Volumen</span>
                        <input type="range"
                               min={0}
                               max={100}
                               step={1}
                               value={volume ?? 0}
                               onChange={event => mod(audio => {
                                   if (muted) {
                                       audio.volume = preVolume! / 100;
                                       setMuted(false);
                                   } else {
                                       audio.volume = event.currentTarget.valueAsNumber / 100;
                                   }
                               })}
                               title="Volumen"/>
                    </label>
                </div>
            </div>
        </div>
    );
}
