import React, { RefObject, useEffect, useState } from 'react'

// style
import './sass/controls.scss'

// default icons
import { Pause, Play, Volume } from './icons'

// range
import Range from '../../Range'

interface ControlsProps {
    video: RefObject<HTMLVideoElement>
}

interface DcTimeType {
    duration: number
    currentTime: number
}

const Controls = ({ video }: ControlsProps) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [volumeValue, setVolVal] = useState(0)
    const [dcTime, setDcTime] = useState<DcTimeType>({
        duration: 0,
        currentTime: 0,
    })

    useEffect(() => {
        if (!video.current) return

        video.current.oncanplay = () => {
            if (!video.current) return

            setDcTime({
                duration: Math.floor(video.current.duration),
                currentTime: Math.floor(video.current.currentTime),
            })
        }

        video.current.ontimeupdate = () => {
            if (!video.current) return

            setDcTime({
                duration: Math.floor(video.current.duration),
                currentTime: Math.floor(video.current.currentTime),
            })
        }

        video.current.onended = (): void => {
            setIsPlaying(false)
        }
        video.current.onvolumechange = () => {
            if (!video.current) return

            if (video.current.muted) {
                setVolVal(0)
            } else {
                setVolVal(video.current.volume * 100)
            }
        }

        setVolVal(video.current.volume * 100)
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

    const ChangeVolume = (p: number) => {
        if (!video.current) return

        video.current.volume = p / 100
    }

    return (
        <div className='controls-container'>
            <div className='controls'>
                <div
                    className='controler-section icon play-pause'
                    onClick={() => TogglePlay()}
                >
                    {isPlaying ? <Pause /> : <Play />}
                </div>
                <div className='controler-section icon volume'>
                    <Volume
                        percentage={volumeValue}
                        onClick={() => Togglemute()}
                    />
                    <Range
                        defaultValue={video.current ? video.current.volume * 100 : 70}
                        onChange={p => ChangeVolume(p)}
                    />
                </div>
                <div className='controler-section dc-time'>
                    <span>
                        {dcTime.currentTime} / {dcTime.duration}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Controls
