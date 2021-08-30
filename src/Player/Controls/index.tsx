import React, { PureComponent, ReactElement } from 'react'

// style
import './sass/controls.scss'

// components
import Play from './Play'
import Volume from './Volume'
import VideoTime from './VideoTime'

interface ControlsProps {
    video: HTMLVideoElement
    videoContainer: HTMLDivElement
}

interface ControlsState {
    isPause: boolean
    showControls: boolean
    timeout: NodeJS.Timeout | null
    timePassd: number
}

/*
var elem = document.getElementById("timer"), timeout, startTimer = function timer() {
    elem.textContent++;
    timeout = setTimeout(timer, 1000)
}
function resetTimer() {
    // here you reset the timer...
    clearTimeout(timeout);
    elem.textContent = -1;
    startTimer();
    //... and also you could start again some other action
}
document.addEventListener("mousemove", resetTimer);
document.addEventListener("keypress", resetTimer);
startTimer();
 */

class Controls extends PureComponent<ControlsProps, ControlsState> {
    override state: ControlsState = {
        isPause: true,
        showControls: true,
        timeout: null,
        timePassd: 0,
    }

    private video = this.props.video
    private Container = this.props.videoContainer

    private HandlePauseBind = this.HandlePause.bind(this)
    private HandlePlayBind = this.HandlePlay.bind(this)
    private StartTimer = this.Timer

    private HandlePause() {
        this.setState({ isPause: true })
    }

    private HandlePlay() {
        this.setState({ isPause: false })
    }

    private Timer() {
        this.setState({
            timePassd: this.state.timePassd + 1,
            timeout: setTimeout(this.Timer, 1000),
        })
    }

    private ResetTimer() {
        if (this.state.timeout) clearTimeout(this.state.timeout)

        this.setState({ timePassd: -1 })
        this.StartTimer()
    }

    override componentDidMount() {
            this.video.addEventListener('pause', this.HandlePauseBind)
            this.video.addEventListener('play', this.HandlePlayBind)

            this.Container.addEventListener('mousemove', () =>
                console.log('r')
            )
            
    }

    override componentWillUnmount() {

        this.ResetTimer()

        this.video.removeEventListener('pause', this.HandlePauseBind)
        this.video.removeEventListener('play', this.HandlePlayBind)
    }

    override componentDidUpdate() {
        console.log(this.state)
        // this.StartTimer()
    }

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
