import React, { PureComponent, ReactElement } from 'react'

// components
import Range from '../../../Range'

// context
import { PlayerContext } from '../../../Contexts/Player.Context'

// style
import './sass/timeline.scss'

interface TimeLineProps {
    video: HTMLVideoElement
}

interface TimeLineState {
    currentTime: number
    duration: number
    isHolding: boolean
}

export class TimeLine extends PureComponent<TimeLineProps, TimeLineState> {
    override state: TimeLineState = {
        currentTime: 0,
        duration: 0,
        isHolding: false,
    }

    // context setup
    static override contextType = PlayerContext
    declare context: React.ContextType<typeof PlayerContext>

    private video = this.context.video

    private HandleTimeLine(percentage: number) {
        let floorTime = Math.floor((this.state.duration / 100) * percentage)
        if (Math.floor(this.video.currentTime) !== floorTime) {
            this.video.currentTime = floorTime
        }
    }

    private get PTime() {
        let t = this.video.currentTime * (100 / this.video.duration)
        if (isNaN(t)) return 0
        else return t
    }

    override componentDidMount() {
        this.video.addEventListener('loadeddata', () => {
            this.setState({
                currentTime: this.video.currentTime,
                duration: this.video.duration,
            })
        })

        this.video.addEventListener('timeupdate', () => {
            if (!this.state.isHolding) {
                this.setState({ currentTime: this.video.currentTime })
            }
        })
    }

    override render(): ReactElement {
        return (
            <div
                className='timeline'
                style={
                    this.context.timelineColor
                        ? { color: this.context.timelineColor }
                        : {}
                }
            >
                <Range
                    defaultValue={this.video.currentTime}
                    onChange={this.HandleTimeLine.bind(this)}
                    onHold={hold => this.setState({ isHolding: hold })}
                    style={{ width: '100%', minWidth: '100%' }}
                    value={this.PTime}
                />
            </div>
        )
    }
}

export default TimeLine
