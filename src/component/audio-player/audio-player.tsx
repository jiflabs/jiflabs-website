"use client";

import {DefaultStrings} from "@/lang/lang";
import {
    faPause,
    faPlay,
    faVolumeHigh,
    faVolumeLow,
    faVolumeOff,
    faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useRef, useState} from "react";

import styles from "./audio-player.module.scss";

type Props = {
    src: string,
}

function formatSeconds(x: number | undefined): string {
    if (x === undefined)
        return "0:00";
    const minutes = Math.floor(x / 60);
    const seconds = Math.floor(x % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default function AudioPlayer({src}: Props) {
    const audioRef = useRef<HTMLAudioElement>(null);

    const mod = (consumer: (audio: HTMLAudioElement) => void) => {
        if (audioRef.current)
            consumer(audioRef.current);
    };

    const [paused, setPaused] = useState(true);
    const [time, setTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>();
    const [volume, setVolume] = useState(100);
    const [preVolume, setPreVolume] = useState(0);
    const [muted, setMuted] = useState(false);

    useEffect(() => {
        mod(audio => {
            audio.preload = "metadata";
            audio.load();
        });
    }, [audioRef]);

    return (
        <div title="audio player">
            <audio ref={audioRef}
                   src={src}
                   preload="none"
                   onPlay={() => setPaused(false)}
                   onPause={() => setPaused(true)}
                   onDurationChange={event => setDuration(event.currentTarget.duration)}
                   onVolumeChange={event => setVolume(event.currentTarget.volume * 100)}
                   onTimeUpdate={event => setTime(event.currentTarget.currentTime)}
                   onEnded={event => event.currentTarget.currentTime = 0}>
                {DefaultStrings.unsupported.audio}
            </audio>
            <div className={styles.player}>
                <button onClick={() => mod(audio => paused ? audio.play() : audio.pause())}
                        title="play | pause">
                    <span>play | pause</span>
                    <FontAwesomeIcon icon={paused ? faPlay : faPause} size="lg"/>
                </button>
                <label>
                    <span>playback position control</span>
                    <input className={styles.playback}
                           type="range"
                           min={0}
                           max={duration}
                           value={time}
                           onChange={event => mod(audio => audio.currentTime = event.currentTarget.valueAsNumber)}
                           title="playback position control"/>
                </label>
                <span>{formatSeconds(time)} / {formatSeconds(duration)}</span>
                <button onClick={() => mod(audio => {
                    if (muted) {
                        audio.volume = preVolume / 100;
                        setMuted(false);
                    } else {
                        audio.volume = 0;
                        setPreVolume(volume);
                        setMuted(true);
                    }
                })} title="mute | unmute">
                    <span>mute | unmute</span>
                    <FontAwesomeIcon icon={
                        muted
                            ? faVolumeXmark
                            : volume < 20
                                ? faVolumeOff
                                : volume < 70
                                    ? faVolumeLow
                                    : faVolumeHigh
                    } size="lg"/>
                </button>
                <label>
                    <span>volume control</span>
                    <input className={styles.volume}
                           type="range"
                           min={0}
                           max={100}
                           step={1}
                           value={volume}
                           onChange={event => mod(audio => {
                               audio.volume = event.currentTarget.valueAsNumber / 100;
                               setMuted(false);
                           })}
                           title="volume control"/>
                </label>
            </div>
        </div>
    );
}
