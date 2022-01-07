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
}

interface PlayerState {
    videoNode?: HTMLVideoElement
    masterNode?: HTMLDivElement
}

export class Player extends PureComponent<PlayerProps, PlayerState> {
    override state: PlayerState = {}
    private opt = this.props.options

    private videoRef = (node: HTMLVideoElement) => {
        this.setState({ videoNode: node })
    }

    private MasterRef = (node: HTMLDivElement) => {
        this.setState({ masterNode: node })
    }

    override render(): ReactElement {
        return (
            <div
                className={`master-video ${this.opt?.masterClass || ''}`}
                ref={this.MasterRef}
            >
                <video
                    src={GetSource(this.props.source)}
                    ref={this.videoRef}
                    loop={this.opt?.loop}
                ></video>
                {this.state.videoNode && this.state.masterNode && (
                    <PlayerContext.Provider
                        value={{
                            video: this.state.videoNode,
                            master: this.state.masterNode,
                            options: this.props.options,
                            source: this.props.source,
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
