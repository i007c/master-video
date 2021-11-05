export function togglePlay(video: HTMLVideoElement) {
    if (video.paused) video.play()
    else video.pause()
}
