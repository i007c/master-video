import React, { useState, RefObject, useEffect } from 'react'

// import icons
import { Pause as PauseIcon, Play as PlayIcon } from '../components/icons'

interface PlayProps {
    video: RefObject<HTMLVideoElement>;
    className?: string;
}

const Play = ({ video, className }: PlayProps) => {
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        if (!video.current) return

        video.current.addEventListener('ended', () => {
            setIsPlaying(false);
        })
    }, [video])

    const TogglePlay = (): void => {
        if (!video.current) return

        if (video.current.paused) {
            video.current.play()
            setIsPlaying(true)
        } else {
            video.current.pause()
            setIsPlaying(false)
        }
    }

    return (
        <div
            className={className}
            onClick={() => TogglePlay()}
        >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </div>
    )
}

export default Play
