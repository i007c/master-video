export function togglePlay(video: HTMLVideoElement) {
    if (video.paused) video.play()
    else video.pause()
}

export function toggleFullScreen(element: HTMLElement) {
    if (!document.fullscreenEnabled) return

    if (document.fullscreenElement === element) {
        document.exitFullscreen()
    } else {
        element.requestFullscreen()
    }
}
