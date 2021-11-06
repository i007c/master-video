import React, { ReactElement } from 'react'
import BaseComponent from './BaseComponent'

import './sass/timeline.scss'

interface TimeLineState {
    isHover: boolean
    isMouseDown: boolean
    percentage: number
    timeline?: HTMLSpanElement
}

export class TimeLine extends BaseComponent<{}, TimeLineState> {
    override state: TimeLineState = {
        isHover: false,
        isMouseDown: false,
        percentage: 0,
    }

    private TimeLineRef(node: HTMLSpanElement) {
        this.setState({ timeline: node })
    }

    private HandleMouseMoveBind = this.HandleMouseMove.bind(this)
    private HandleMouseUpBind = this.HandleMouseUp.bind(this)
    private HandleTimeBind = this.HandleTime.bind(this)

    private HandlePercentage(percentage: number) {
        percentage = percentage * 100

        if (percentage > 100) percentage = 100
        else if (percentage < 0) percentage = 0

        this.setState({ percentage: percentage })

        let time = (this.video.duration / 100) * percentage
        this.video.currentTime = time
    }

    private HandleTime() {
        let time = this.video.currentTime * (100 / this.video.duration)
        if (isNaN(time)) this.setState({ percentage: 0 })
        else this.setState({ percentage: time })
    }

    private HandleMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.preventDefault()

        this.setState({ isMouseDown: true })

        const { left, width } = e.currentTarget.getBoundingClientRect()
        this.HandlePercentage((e.clientX - left) / width)

        document.addEventListener('mousemove', this.HandleMouseMoveBind)
        document.addEventListener('mouseup', this.HandleMouseUpBind)
    }

    public HandleMouseMove(e: MouseEvent) {
        if (!this.state.timeline) return

        e.preventDefault()

        const { left, width } = this.state.timeline.getBoundingClientRect()
        this.HandlePercentage((e.clientX - left) / width)
    }

    private HandleMouseUp() {
        document.removeEventListener('mousemove', this.HandleMouseMoveBind)
        document.removeEventListener('mouseup', this.HandleMouseUpBind)
        this.setState({ isMouseDown: false })
    }

    override componentDidMount() {
        this.video.addEventListener('timeupdate', this.HandleTimeBind)
    }
    override componentWillUnmount() {
        this.video.removeEventListener('timeupdate', this.HandleTimeBind)
    }

    override render(): ReactElement {
        return (
            <div
                className='timeline-range'
                onMouseEnter={() => this.setState({ isHover: true })}
                onMouseLeave={() => this.setState({ isHover: false })}
            >
                <span
                    className='range'
                    onMouseDown={this.HandleMouseDown.bind(this)}
                    ref={this.TimeLineRef.bind(this)}
                >
                    <span className='rail'>
                        <span
                            className='track'
                            style={{ width: `${this.state.percentage}%` }}
                        ></span>
                    </span>

                    <span
                        className={`thumb ${
                            this.state.isHover || this.state.isMouseDown
                                ? 'hold'
                                : ''
                        }`}
                        style={{
                            left: `${this.state.percentage}%`,
                        }}
                    ></span>
                </span>
            </div>
        )
    }
}

export default TimeLine
