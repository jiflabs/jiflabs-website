import AudioPlayer from "@/component/audio-player/audio-player";
import {Main} from "@/component/container/container";
import JellyfinPlayer from "@/component/jellyfin-player/jellyfin-player";

export default async function Page() {
    return (
        <Main>
            <h1>Test</h1>
            <AudioPlayer src="/test-audio-track.mp3"/>
            <JellyfinPlayer/>
        </Main>
    );
}
