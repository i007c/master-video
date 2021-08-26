import React, { RefObject, useEffect, useState } from 'react'

// style
import './sass/controls.scss'

// default icons
import { Pause, Play, Volume } from './icons'

type ControlsProps = {
    video: RefObject<HTMLVideoElement>
}

const Controls = ({ video }: ControlsProps) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [volumeValue, setVolVal] = useState(0)

    useEffect(() => {
        if (video.current) {
            video.current.onended = (): void => {
                setIsPlaying(false)
            }
            video.current.onvolumechange = () => {
                if (!video.current) return;

                if (video.current.muted) {
                    setVolVal(0)
                } else {
                    setVolVal(video.current.volume * 100)
                }
            }
            
            setVolVal(video.current.volume * 100)
        }
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

    const Togglemute = (): void => {
        if (!video.current) return
        video.current.muted = !video.current.muted
    }

    return (
        <div className='controls-container'>
            <div className='controls'>
                <div
                    className='icon play-pause-btn'
                    onClick={() => TogglePlay()}
                >
                    {isPlaying ? <Pause /> : <Play />}
                </div>
                <div className='icon volume-btn' onClick={() => Togglemute()}>
                    <Volume percentage={volumeValue} />
                </div>
            </div>
        </div>
    )
}

export default Controls
