import React, { ReactElement, useRef } from 'react'

// components
import Controls from './Controls'

// style
import './sass/player.scss'

export interface Options {
    source: string
    loop?: boolean
    controls?: boolean
    style?: {
        className?: string
    }
}

type PlayerProps = {
    options: Options
}

const defaultProps = {
    options: {
        source: '',
        loop: false,
        controls: false,
        style: {},
    },
}

const Player = ({ options }: PlayerProps): ReactElement => {
    const videoElement = useRef<HTMLVideoElement>(null)

    return (
        <div
            className={
                'video-player-container' +
                (options.style && options.style.className
                    ? ' ' + options.style.className
                    : '')
            }
        >
            <div className='video-player'>
                <video ref={videoElement} loop={options.loop}>
                    <source src={options.source} />
                </video>
                {options.controls && <Controls video={videoElement} />}
            </div>
        </div>
    )
}

Player.defaultProps = defaultProps

export default Player
