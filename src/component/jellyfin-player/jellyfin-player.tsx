export default function JellyfinPlayer() {

    return (
        <video controls
               src={`${process.env.JELLYFIN_ENDPOINT}/Videos/2f98ce25b1d6fce514d263c5961ea54f/main.m3u8?api_key=${process.env.JELLYFIN_SECRET}`}>
        </video>
    );
}
