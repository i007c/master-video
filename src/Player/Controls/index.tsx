import React, { PureComponent, ReactElement, RefObject } from 'react'

// style
import './sass/controls.scss'

// default icons
import { Volume } from '../components/icons'

// range
import Range from '../../Range'

// components
import Play from './Play'

interface ControlsProps {
    video: RefObject<HTMLVideoElement>
}

interface ControlsState {
    videoVolume: number
    videoTime: {
        duration: number
        currentTime: number
    }
}

class Controls extends PureComponent<ControlsProps, ControlsState> {
    override state: ControlsState = {
        videoVolume: 100,
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
                videoVolume: this.video.current.volume * 100,
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

        this.video.current.addEventListener('volumechange', () => {
            if (!this.video.current) return

            if (this.video.current.muted) {
                this.setState({
                    videoVolume: 0,
                })
            } else {
                this.setState({
                    videoVolume: this.video.current.volume * 100,
                })
            }
        })
    }

    private Togglemute(): void {
        if (!this.video.current) return
        this.video.current.muted = !this.video.current.muted
    }

    private ChangeVolume(p: number) {
        if (!this.video.current) return

        this.video.current.muted = false

        this.video.current.volume = p / 100
    }

    public override render(): ReactElement {
        return (
            <div className='controls-container'>
                <div className='controls'>
                    <Play
                        video={this.video}
                        className='controler-section icon play-pause'
                    />
                    <div className='controler-section icon volume'>
                        <Volume
                            percentage={this.state.videoVolume}
                            onClick={() => this.Togglemute()}
                        />
                        <Range
                            defaultValue={this.state.videoVolume}
                            onChange={p => this.ChangeVolume(p)}
                        />
                    </div>
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
