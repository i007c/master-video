import React, { PureComponent, ReactElement } from 'react'

import { MainContext } from './context'

import OverlayMaster from './OverlayMaster'

import { OverlayProps, VideoOptions } from './interfaces'

import './sass/main.scss'

interface MainProps {
    Overlay: (props: OverlayProps) => JSX.Element
    Options: VideoOptions
}

interface MainState {
    videoNode?: HTMLVideoElement
}

export class Main extends PureComponent<MainProps, MainState> {
    override state: MainState = {}

    private Options = this.props.Options

    private videoRef = (node: HTMLVideoElement) => {
        this.setState({ videoNode: node })
    }

    override render(): ReactElement {
        return (
            <div className='master-video'>
                <video
                    ref={this.videoRef}
                    loop={this.Options && Boolean(this.Options.loop)}
                    src={this.Options.source[0].url}
                ></video>
                <div className='overlay-container'>
                    {this.state.videoNode && (
                        <MainContext.Provider
                            value={{ video: this.state.videoNode }}
                        >
                            <OverlayMaster Overlay={this.props.Overlay} />
                        </MainContext.Provider>
                    )}
                </div>
            </div>
        )
    }
}

export default Main
