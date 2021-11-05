import React, { PureComponent, ReactElement } from 'react'

import { PlayerContext } from './context'

import Controls from './controls'

import './sass/player.scss'

interface PlayerProps {
    source: string
}

interface PlayerState {
    videoNode?: HTMLVideoElement
    masterNode?: HTMLDivElement
}

export class Player extends PureComponent<PlayerProps, PlayerState> {
    override state: PlayerState = {}
    private videoRef = (node: HTMLVideoElement) => {
        this.setState({ videoNode: node })
    }

    private MasterRef = (node: HTMLDivElement) => {
        this.setState({ masterNode: node })
    }

    override render(): ReactElement {
        return (
            <div className='master-video' ref={this.MasterRef}>
                <video src={this.props.source} ref={this.videoRef}></video>
                {this.state.videoNode && this.state.masterNode && (
                    <PlayerContext.Provider
                        value={{
                            video: this.state.videoNode,
                            master: this.state.masterNode,
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
