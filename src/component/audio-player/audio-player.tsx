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
import {KeyboardEventHandler, useEffect, useRef, useState} from "react";

import styles from "./audio-player.module.scss";

type SeekEvent<T, C> = {
    target: T,
    currentTarget: C,
    key?: string,
}

type SeekEventHandler<T, C> = (event: SeekEvent<T, C>) => void

function formatSeconds(x: number | undefined): string {
    if (x === undefined)
        return "0:00";
    const minutes = Math.floor(x / 60);
    const seconds = Math.floor(x % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default function AudioPlayer({src}: { src: string }) {
    const audioRef = useRef<HTMLAudioElement>(null);

    const mod = (consumer: (audio: HTMLAudioElement) => void) => {
        if (audioRef.current)
            consumer(audioRef.current);
    };

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
    }, [audioRef]);

    const togglePause = () => mod(audio => paused ? audio.play() : audio.pause());
    const toggleMute = () => mod(audio => {
        if (muted) {
            audio.volume = (preVolume ?? 100) / 100;
            setMuted(false);
        } else {
            audio.volume = 0;
            setPreVolume(volume ?? 0);
            setMuted(true);
        }
    });

    const handleControlsBegin: KeyboardEventHandler<HTMLDivElement> = (event) => {
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
                mod(audio => audio.volume = Math.max(muted ? preVolume! / 100 : audio.volume - 0.1, 0));
                setMuted(false);
                break;
            case "ArrowUp":
                event.preventDefault();
                mod(audio => audio.volume = Math.min(muted ? preVolume! / 100 : audio.volume + 0.1, 1));
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
    };

    const handleControlsEnd: KeyboardEventHandler<HTMLDivElement> = (event) => {
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
    };

    const handleSeekBegin: SeekEventHandler<EventTarget, EventTarget & HTMLInputElement> = (
        {
            target,
            currentTarget,
            key,
        },
    ) => {
        if (target === currentTarget && (key === undefined || key === "ArrowUp" || key === "ArrowDown" || key === "ArrowLeft" || key === "ArrowRight"))
            mod(audio => audio.pause());
    };

    const handleSeekEnd: SeekEventHandler<EventTarget, EventTarget & HTMLInputElement> = (
        {
            target,
            currentTarget,
            key,
        },
    ) => {
        if (target === currentTarget && (key === undefined || key === "ArrowUp" || key === "ArrowDown" || key === "ArrowLeft" || key === "ArrowRight"))
            mod(audio => audio.play());
    };

    return (
        <div title="Audio-Player">
            <audio ref={audioRef}
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
                        <span>{paused ? "Fortsetzen" : "Pausieren"}</span>
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
                        <span>{muted ? "Lautschalten" : "Stummschalten"}</span>
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
                               step={10}
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
