import React, { PureComponent, ReactElement } from 'react'

// style
import './sass/controls.scss'

// components

import HideMouse from './HideMouse'

import Play from './Play'
import Volume from './Volume'
import VideoTime from './VideoTime'

import TimeLine from './TimeLine'

import FullScreen from './FullScreen'
import Settings from './Settings'

interface ControlsProps {
    video: HTMLVideoElement
    videoContainer: HTMLDivElement
}

interface ControlsState {
    ControlsElement: HTMLDivElement | null
    ControlsContainerElement: HTMLDivElement | null
}

class Controls extends PureComponent<ControlsProps, ControlsState> {
    override state: ControlsState = {
        ControlsElement: null,
        ControlsContainerElement: null,
    }

    private video = this.props.video
    private Container = this.props.videoContainer

    private ControlsElement = (node: HTMLDivElement) => {
        this.setState({ ControlsElement: node })
    }

    private ControlsContainerElement = (node: HTMLDivElement) => {
        this.setState({ ControlsContainerElement: node })
    }

    override componentDidMount() {}

    override componentDidUpdate() {}

    override render(): ReactElement {
        return (
            <div
                className='controls-container'
                ref={this.ControlsContainerElement}
            >
                <TimeLine video={this.video} />
                {this.state.ControlsElement &&
                    this.state.ControlsContainerElement && (
                        <HideMouse
                            video={this.video}
                            Container={this.Container}
                            Controls={this.state.ControlsElement}
                            CCE={this.state.ControlsContainerElement}
                        />
                    )}

                <div className='controls' ref={this.ControlsElement}>
                    <div className='section'>
                        <Play
                            video={this.video}
                            className='controler-section icon play-pause'
                        />

                        <Volume
                            video={this.video}
                            className='controler-section icon volume'
                        />

                        <VideoTime
                            video={this.video}
                            className='controler-section dc-time'
                        />
                    </div>
                    <div className='section'>
                        <FullScreen
                            Container={this.Container}
                            className='controler-section icon fullscreen'
                        />

                        <Settings
                            video={this.video}
                            className='settings'
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Controls
