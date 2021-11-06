import React, { PureComponent, ReactElement } from 'react'

import { PlayerContext } from './context'

import Controls from './controls'

import './sass/player.scss'

import { Options } from './@types'
export * from './@types'

interface PlayerProps {
    source: string
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
                    src={this.props.source}
                    ref={this.videoRef}
                    loop={this.opt?.loop}
                ></video>
                {this.state.videoNode && this.state.masterNode && (
                    <PlayerContext.Provider
                        value={{
                            video: this.state.videoNode,
                            master: this.state.masterNode,
                            options: this.props.options,
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
