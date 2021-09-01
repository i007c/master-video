import React, { PureComponent, ReactElement } from 'react'

// style
import './sass/controls.scss'

// components
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
    isPause: boolean
    showControls: boolean
    MouseOnControls: boolean
    MouseOnVideo: boolean
    timer: NodeJS.Timeout | null
    passdTime: number
}

class Controls extends PureComponent<ControlsProps, ControlsState> {
    override state: ControlsState = {
        isPause: true,
        showControls: true,
        MouseOnControls: false,
        MouseOnVideo: false,
        timer: null,
        passdTime: 0,
    }

    private video = this.props.video
    private Container = this.props.videoContainer

    private HandlePauseBind = this.HandlePause.bind(this)
    private HandlePlayBind = this.HandlePlay.bind(this)
    private HandleMaouseMoveBind = this.HandleMaouseMove.bind(this)

    private HandlePause() {
        this.setState({ isPause: true })
    }

    private HandlePlay() {
        this.setState({ isPause: false })
    }

    private HandleMaouseMove() {
        if (this.state.timer) {
            clearTimeout(this.state.timer)
            this.setState({
                showControls: true,
                timer: null,
            })
        } else {
            this.setState({
                showControls: true,
            })
        }
    }

    override componentDidMount() {
        this.video.addEventListener('pause', this.HandlePauseBind)
        this.video.addEventListener('play', this.HandlePlayBind)

        this.Container.addEventListener('mousemove', this.HandleMaouseMoveBind)

        this.Container.addEventListener('mouseenter', () => {
            this.setState({
                MouseOnVideo: true,
            })
        })

        this.Container.addEventListener('mouseleave', () => {
            if (this.state.timer) {
                clearTimeout(this.state.timer)
                this.setState({
                    MouseOnVideo: false,
                    timer: null,
                })
            } else {
                this.setState({
                    MouseOnVideo: false,
                })
            }
        })
    }

    override componentWillUnmount() {
        this.video.removeEventListener('pause', this.HandlePauseBind)
        this.video.removeEventListener('play', this.HandlePlayBind)
    }

    override componentDidUpdate() {
        if (!this.state.showControls) {
            this.Container.style.cursor = 'none'
        } else {
            this.Container.style.cursor = ''
        }
        if (
            this.state.MouseOnVideo &&
            !this.state.MouseOnControls &&
            !this.state.isPause
        ) {
            if (this.state.showControls && !this.state.timer) {
                let t = setTimeout(() => {
                    if (
                        this.state.MouseOnVideo &&
                        !this.state.MouseOnControls &&
                        !this.state.isPause
                    ) {
                        this.setState({ showControls: false, timer: null })
                    } else {
                        this.setState({ showControls: true, timer: null })
                    }
                }, 10000)

                this.setState({ timer: t })
            }
        } else {
            this.setState({ showControls: true })
        }
    }

    override render(): ReactElement {
        return (
            <div
                className='controls-container'
                style={
                    !this.state.showControls
                        ? { transform: 'translateY(1500px)' }
                        : {}
                }
            >
                <TimeLine video={this.video} />

                <div
                    className='controls'
                    onMouseEnter={() =>
                        this.setState({ MouseOnControls: true })
                    }
                    onMouseLeave={() =>
                        this.setState({ MouseOnControls: false })
                    }
                >
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

                        <Settings video={this.video} className='controler-section icon settings' />
                    </div>
                </div>
            </div>
        )
    }
}

export default Controls
