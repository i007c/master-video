import React, { RefObject, useEffect, useState, useRef } from 'react'

// style
import './sass/controls.scss'

// default icons
import { Pause, Play, Volume } from './icons'

interface ControlsProps {
    video: RefObject<HTMLVideoElement>
}

interface DcTimeType {
    duration: number
    currentTime: number
}

const Controls = ({ video }: ControlsProps) => {
    const volumeControl = useRef<HTMLDivElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [volumeValue, setVolVal] = useState(0)
    const [isHolding, setIsHolding] = useState(false)
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
                    <div
                        ref={volumeControl}
                        className='volume-control'
                        onMouseDown={(e) =>
                            {
                                if (!video.current) return;
                                e.preventDefault()
                                
                                // const { width, height, bottom, left } = e.currentTarget.getBoundingClientRect()
                                const { left, width } = e.currentTarget.getBoundingClientRect()
                                // console.log(e.currentTarget.getBoundingClientRect())
                                
                                // console.log();
                                video.current.volume = (e.clientX - left) / width
                                setIsHolding(true)

                                document.onmousemove = me => {
                                    if (!video.current || !volumeControl.current) return;
                                    me.preventDefault()

                                    const { left, width } = volumeControl.current.getBoundingClientRect()
                                    let p: number = (me.clientX - left) / width

                                    if (p > 1) {
                                        p = 1
                                    } else if (p < 0) {
                                        p = 0
                                    }

                                    video.current.volume = p

                                }

                                document.onmouseup = () => {
                                    document.onmousemove = null
                                    setIsHolding(false)
                                }
                                 
                            }
                        }
                    >
                        <span className='root'>
                            <span className='rail'></span>
                            <span
                                className='track'
                                style={video.current ? { width: `${video.current.volume * 100}%` } : {}}
                            ></span>
                            <span
                                className={'thumb' + (isHolding ? ' hold' : '')}
                                style={video.current ? { left: `${video.current.volume * 100}%` } : {}}
                                onMouseDown={() => console.log('d')}
                            ></span>
                        </span>
                    </div>
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
