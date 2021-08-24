import React, { ReactElement } from 'react'

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
    console.log(options)
    return (
        <div className='video-player-container'>
            <div
                className={
                    'video-player' +
                    (options.style?.className
                        ? ' ' + options.style.className
                        : '')
                }
            >
                <video
                    src={options.source}
                    controls={options.controls}
                    loop={options.loop}
                ></video>
            </div>
        </div>
    )
}

Player.defaultProps = defaultProps

export default Player
