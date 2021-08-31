import React, { PureComponent, ReactElement } from 'react'

// components
import Range from '../../../Range'

// style
import './sass/timeline.scss'

interface TimeLineProps {
    video: HTMLVideoElement
}

interface TimeLineState {
    currentTime: number
    duration: number
}

export class TimeLine extends PureComponent<TimeLineProps, TimeLineState> {
    override state: TimeLineState = {
        currentTime: 0,
        duration: 0,
    }

    private video = this.props.video

    private HandleTimeLine(percentage: number) {
        console.log(percentage)
        this.video.currentTime = (this.state.duration / 100) * percentage
    }

    override componentDidMount() {
        this.video.addEventListener('loadeddata', () => {
            this.setState({
                currentTime: this.video.currentTime,
                duration: this.video.duration
            })
        })

        this.video.addEventListener('timeupdate', () => {
            this.setState({currentTime: this.video.currentTime})
        })
    }

    override render(): ReactElement {
        return (
            <div className='timeline'>
                <Range
                    defaultValue={this.video.currentTime}
                    onChange={this.HandleTimeLine.bind(this)}
                    style={{ width: '100%', minWidth: '100%' }}
                    value={this.video.currentTime * (100 / this.video.duration)}
                />
            </div>
        )
    }
}

export default TimeLine
