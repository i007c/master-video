import React, { RefObject, useEffect, useState } from 'react'

// style
import './sass/controls.scss'

// default icons
import { Volume } from '../components/icons'

// range
import Range from '../../Range'

// components
import Play from './Play'

interface ControlsProps {
    video: RefObject<HTMLVideoElement>
}

interface DcTimeType {
    duration: number
    currentTime: number
}

const Controls = ({ video }: ControlsProps) => {
    const [volumeValue, setVolVal] = useState(100)
    const [dcTime, setDcTime] = useState<DcTimeType>({
        duration: 0,
        currentTime: 0,
    })

    useEffect(() => {
        if (!video.current) return


        video.current.addEventListener('canplay', () => {
            if (!video.current) return

            setDcTime({
                duration: Math.floor(video.current.duration),
                currentTime: Math.floor(video.current.currentTime),
            })

            setVolVal(video.current.volume * 100);

        })

        video.current.addEventListener('timeupdate', () => {
            if (!video.current) return

            setDcTime({
                duration: Math.floor(video.current.duration),
                currentTime: Math.floor(video.current.currentTime),
            })
        })


        video.current.addEventListener('volumechange', () => {
            if (!video.current) return

            if (video.current.muted) {
                setVolVal(0)
            } else {
                setVolVal(video.current.volume * 100)
            }
        })
    }, [video])

    

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
                <Play video={video} className='controler-section icon play-pause' />
                <div className='controler-section icon volume'>
                    <Volume
                        percentage={volumeValue}
                        onClick={() => Togglemute()}
                    />
                    <Range
                        defaultValue={volumeValue}
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
