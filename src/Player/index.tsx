import React, { ReactElement, PureComponent } from 'react'

// contexts
import { PlayerContext } from '../Contexts/Player.Context'

// components
import Controls from './Controls'

// style
import './sass/player.scss'

interface SourceObject {
    url: string
    label: string
}

export interface Options {
    source: [SourceObject, ...SourceObject[]]
    loop?: boolean
    controls?: boolean
    style?: {
        className?: string
        timelineColor?: string
    }
}

interface PlayerProps {
    options: Options
}

interface PlayerState {
    videoElement: HTMLVideoElement | null
    videoContainer: HTMLDivElement | null
}

// context

class Player extends PureComponent<PlayerProps, PlayerState> {
    override state: PlayerState = {
        videoElement: null,
        videoContainer: null,
    }

    private opt = this.props.options

    private source = this.opt.source

    private videoElement = (node: HTMLVideoElement) => {
        this.setState({ videoElement: node })
    }

    private videoContainer = (node: HTMLDivElement) => {
        this.setState({ videoContainer: node })
    }

    private TogglePlay(): void {
        if (!this.state.videoElement) return

        if (this.state.videoElement.paused) {
            this.state.videoElement.play()
        } else {
            this.state.videoElement.pause()
        }
    }

    override render(): ReactElement {
        return (
            <div
                ref={this.videoContainer}
                role='master-video'
                className={
                    'master-video' +
                    (this.opt.style && this.opt.style.className
                        ? ' ' + this.opt.style.className
                        : '')
                }
            >
                <div className='video-player'>
                    <div
                        className='play-section'
                        onClick={() => this.TogglePlay()}
                    ></div>
                    <video ref={this.videoElement} loop={this.opt.loop}>
                        <source src={this.source[0].url} />
                    </video>
                    {this.opt.controls &&
                        this.state.videoElement &&
                        this.state.videoContainer && (
                            <PlayerContext.Provider
                                value={{
                                    video: this.state.videoElement,
                                    Container: this.state.videoContainer,
                                    Sources: this.source,
                                    ...(this.opt.style && {
                                        timelineColor:
                                            this.opt.style.timelineColor,
                                    }),
                                }}
                            >
                                <Controls />
                            </PlayerContext.Provider>
                        )}
                </div>
            </div>
        )
    }
}

export default Player
