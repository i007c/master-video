import React, { PureComponent, ReactElement, RefObject } from 'react'

// style
import './sass/controls.scss'

// components
import Play from './Play'
import Volume from './Volume'

interface ControlsProps {
    video: RefObject<HTMLVideoElement>
}

interface ControlsState {
    videoTime: {
        duration: number
        currentTime: number
    }
}

class Controls extends PureComponent<ControlsProps, ControlsState> {
    override state: ControlsState = {
        videoTime: {
            duration: 0,
            currentTime: 0,
        },
    }

    private video = this.props.video

    override componentDidMount() {
        if (!this.video.current) return

        this.video.current.addEventListener('canplay', () => {
            if (!this.video.current) return

            this.setState({
                videoTime: {
                    duration: Math.floor(this.video.current.duration),
                    currentTime: Math.floor(this.video.current.currentTime),
                },
            })
        })

        this.video.current.addEventListener('timeupdate', () => {
            if (!this.video.current) return

            this.setState({
                videoTime: {
                    duration: Math.floor(this.video.current.duration),
                    currentTime: Math.floor(this.video.current.currentTime),
                },
            })
        })

    }

    

    public override render(): ReactElement {
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
                    
                    <div className='controler-section dc-time'>
                        <span>
                            {this.state.videoTime.currentTime} /
                            {this.state.videoTime.duration}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Controls
