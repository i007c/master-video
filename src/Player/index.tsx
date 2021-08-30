import React, { ReactElement, PureComponent } from 'react'

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

interface PlayerState {
    videoElement: HTMLVideoElement | null
    videoContainer: HTMLDivElement | null
}

class Player extends PureComponent<PlayerProps, PlayerState> {

    override state: PlayerState = {
        videoElement: null,
        videoContainer: null,
    }

    private videoElement = (node: HTMLVideoElement) => {
        this.setState({ videoElement: node })
    }

    private videoContainer = (node: HTMLDivElement) => {
        this.setState({ videoContainer: node })
    }

    override componentDidUpdate() {
        console.log(this.state)
    }

    override render(): ReactElement {
        return (
            <div
                ref={this.videoContainer}
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
                    {this.props.options.controls &&
                        this.state.videoElement &&
                        this.state.videoContainer && (
                            <Controls
                                video={this.state.videoElement}
                                videoContainer={this.state.videoContainer}
                            />
                        )}
                </div>
            </div>
        )
    }
}

export default Player
