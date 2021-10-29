import React, { PureComponent, ReactElement } from 'react'

import { PlayerContext } from './context'

import Controls from './controls'

import './sass/player.scss'

interface PlayerProps {
    source: string
}

interface PlayerState {
    videoNode?: HTMLVideoElement
}

export class Player extends PureComponent<PlayerProps, PlayerState> {
    override state: PlayerState = {}
    private videoRef = (node: HTMLVideoElement) => {
        this.setState({ videoNode: node })
    }

    override render(): ReactElement {
        return (
            <div className='master-video'>
                <video src={this.props.source} ref={this.videoRef}></video>
                {this.state.videoNode && (
                    <PlayerContext.Provider
                        value={{ video: this.state.videoNode }}
                    >
                        <Controls />
                    </PlayerContext.Provider>
                )}
            </div>
        )
    }
}

export default Player
