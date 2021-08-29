import React, { ReactElement, PureComponent, createRef } from 'react'

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

interface PlayerProps {
    options: Options
}

interface PlayerState {}

class Player extends PureComponent<PlayerProps, PlayerState> {
    private videoElement = createRef<HTMLVideoElement>()

    override componentDidMount() {}

    override render(): ReactElement {
        return (
            <div
                role='master-video'
                className={
                    'video-player-container' +
                    (this.props.options.style &&
                    this.props.options.style.className
                        ? ' ' + this.props.options.style.className
                        : '')
                }
            >
                <div className='video-player'>
                    <video
                        ref={this.videoElement}
                        loop={this.props.options.loop}
                    >
                        <source src={this.props.options.source} />
                    </video>
                    {this.props.options.controls && (
                        <Controls video={this.videoElement} />
                    )}
                </div>
            </div>
        )
    }
}

export default Player
