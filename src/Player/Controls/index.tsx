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
    MouseOver: boolean
    timer: NodeJS.Timeout | null
    passdTime: number
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
        MouseOver: false,
        timer: null,
        passdTime: 0,
    }

    private video = this.props.video
    private Container = this.props.videoContainer

    private HandlePauseBind = this.HandlePause.bind(this)
    private HandlePlayBind = this.HandlePlay.bind(this)

    private HandlePause() {
        this.setState({ isPause: true })
    }

    private HandlePlay() {
        this.setState({ isPause: false })
    }

    override componentDidMount() {
        this.video.addEventListener('pause', this.HandlePauseBind)
        this.video.addEventListener('play', this.HandlePlayBind)

        this.Container.addEventListener('mousemove', () => {
            if (this.state.timer) {
                clearTimeout(this.state.timer)
                this.setState({timer: null, passdTime: 0, showControls: true})
            }
            let x = () => {
                
                // console.log(this.state);
                
                let t = setTimeout(x, 1000)

                this.setState({timer: t, passdTime: this.state.passdTime + 1})
            }

            x()
        })
        this.Container.addEventListener('mouseenter', () => {
            this.setState({
                showControls: true,
                MouseOver: true,
            })

            let x = () => {
                
                // console.log(this.state);
                
                let t = setTimeout(x, 1000)

                this.setState({timer: t, passdTime: this.state.passdTime + 1})
            }

            x()
        })

        this.Container.addEventListener('mouseleave',() => {
            
            if (this.state.timer) {
                clearTimeout(this.state.timer)
                this.setState({timer: null, passdTime: 0, showControls:false, MouseOver:false})
            } else {
                this.setState({showControls:false, MouseOver:false})
            }
        })
    }

    override componentWillUnmount() {
        this.video.removeEventListener('pause', this.HandlePauseBind)
        this.video.removeEventListener('play', this.HandlePlayBind)
    }

    override componentDidUpdate() {
        if (this.state.passdTime > 5) {
            if (this.state.timer) {
                clearTimeout(this.state.timer)
                this.setState({timer: null, passdTime: 0, showControls:false})
            }
        }
    }

    override render(): ReactElement {
        return (
            <div className='controls-container' style={!this.state.showControls ? {transform: 'translateY(1500px)'} : {}}>
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
