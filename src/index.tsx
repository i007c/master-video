import React, { PureComponent, ReactElement } from 'react'

import { PlayerContext } from './context'

import Controls from './controls'

// style
import './sass/player.scss'

// types
import { Options, Source } from './types'

// utils
import { GetSource } from './utils/data.functions'

interface PlayerProps {
    source: Source
    options?: Options
    poster?: string
}

interface PlayerState {
    videoNode?: HTMLVideoElement
    masterNode?: HTMLDivElement
    options?: Options
    source: Source
    poster?: string
}

export class Player extends PureComponent<PlayerProps, PlayerState> {
    override state: PlayerState = {
        source: this.props.source,
    }

    private videoRef = (node: HTMLVideoElement) => {
        this.setState({ videoNode: node })
    }

    private MasterRef = (node: HTMLDivElement) => {
        this.setState({ masterNode: node })
    }

    override componentDidMount() {
        this.setState({
            source: this.props.source,
            options: this.props.options,
            poster: this.props.poster,
        })
    }

    override componentDidUpdate() {
        this.setState({
            source: this.props.source,
            options: this.props.options,
            poster: this.props.poster,
        })
    }

    override render(): ReactElement {
        return (
            <div
                className={`master-video ${
                    this.state.options?.masterClass || ''
                }`}
                ref={this.MasterRef}
                tabIndex={0}
            >
                <video
                    src={GetSource(this.state.source)}
                    ref={this.videoRef}
                    loop={this.state.options?.loop}
                    poster={this.state.poster}
                ></video>
                {this.state.videoNode && this.state.masterNode && (
                    <PlayerContext.Provider
                        value={{
                            video: this.state.videoNode,
                            master: this.state.masterNode,
                            options: this.state.options,
                            source: this.state.source,
                        }}
                    >
                        <Controls />
                    </PlayerContext.Provider>
                )}
            </div>
        )
    }
}

export default Player
export * from './types'
