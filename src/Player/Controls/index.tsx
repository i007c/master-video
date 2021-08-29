import React, { PureComponent, ReactElement, RefObject } from 'react'

// style
import './sass/controls.scss'

// components
import Play from './Play'
import Volume from './Volume'
import VideoTime from './VideoTime'

interface ControlsProps {
    video: RefObject<HTMLVideoElement>
}

interface ControlsState {}

class Controls extends PureComponent<ControlsProps, ControlsState> {
    private video = this.props.video

    override render(): ReactElement {
        return (
            <div className='controls-container'>
                <div className='controls'>
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
            </div>
        )
    }
}

export default Controls
