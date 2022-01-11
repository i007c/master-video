import React, { ReactElement } from 'react'
import BaseComponent from './BaseComponent'

import './sass/timeline.scss'

type TimeLineElement = HTMLDivElement

interface BufferType {
    left: string
    right: string
}

interface TimeLineState {
    isHover: boolean
    isMouseDown: boolean
    percentage: number
    timeline?: TimeLineElement
    buffers: BufferType[]
    buffertimer?: ReturnType<typeof setInterval>
}

export class TimeLine extends BaseComponent<{}, TimeLineState> {
    override state: TimeLineState = {
        isHover: false,
        isMouseDown: false,
        percentage: 0,
        buffers: [],
    }

    private TimeLineRef(node: TimeLineElement) {
        this.setState({ timeline: node })
    }

    // mouse
    private HandleMouseDownBind = this.HandleMouseDown.bind(this)
    private HandleMouseMoveBind = this.HandleMouseMove.bind(this)
    private HandleMouseUpBind = this.HandleMouseUp.bind(this)

    // touch
    private HandleTouchStartBind = this.HandleTouchStart.bind(this)
    private HandleTouchMoveBind = this.HandleTouchMove.bind(this)
    private HandleTouchEndBind = this.HandleTouchEnd.bind(this)

    private HandleTimeBind = this.HandleTime.bind(this)

    private HandlePercentage(percentage: number) {
        // if (this.video.readyState !== 4) return
        percentage = percentage * 100

        if (percentage > 100) percentage = 100
        else if (percentage < 0) percentage = 0

        this.setState({ percentage: percentage })

        let time = (this.video.duration / 100) * percentage
        this.video.currentTime = time
        this.video.dispatchEvent(new Event('timeupdate'))
    }

    private HandleTime() {
        let time = this.video.currentTime * (100 / this.video.duration)
        if (isNaN(time)) this.setState({ percentage: 0 })
        else this.setState({ percentage: time })
    }

    private HandleMouseDown(e: React.MouseEvent<TimeLineElement, MouseEvent>) {
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

    // touchs
    private HandleTouchStart(e: React.TouchEvent<TimeLineElement>) {
        if (e.touches.length <= 0 || !e.touches[0]) return

        this.setState({ isMouseDown: true })

        const { left, width } = e.currentTarget.getBoundingClientRect()
        this.HandlePercentage((e.touches[0].clientX - left) / width)

        document.addEventListener('touchmove', this.HandleTouchMoveBind)
        document.addEventListener('touchend', this.HandleTouchEndBind)
    }

    public HandleTouchMove(e: TouchEvent) {
        if (!this.state.timeline) return

        if (e.touches.length <= 0 || !e.touches[0]) return

        const { left, width } = this.state.timeline.getBoundingClientRect()
        this.HandlePercentage((e.touches[0].clientX - left) / width)
    }

    private HandleTouchEnd() {
        document.removeEventListener('touchmove', this.HandleTouchMoveBind)
        document.removeEventListener('touchend', this.HandleTouchEndBind)
        this.setState({ isMouseDown: false })
    }

    // Buffer
    private DrawBuffer(buffered: TimeRanges) {
        if (!this.state.timeline || !(this.video.duration > 0)) return

        const inc = 100 / this.video.duration

        let bb: BufferType[] = []

        for (let i = 0; i < buffered.length; i++) {
            const StartX = buffered.start(i) * inc
            const EndX = 100 - buffered.end(i) * inc

            bb.push({ left: `${StartX}%`, right: `${EndX}%` })
        }

        this.setState({ buffers: bb })
    }

    override componentDidMount() {
        this.video.addEventListener('timeupdate', this.HandleTimeBind)
        const BufferTimer = setInterval(
            () => this.DrawBuffer(this.video.buffered),
            1000
        )
        this.setState({ buffertimer: BufferTimer })
    }
    override componentWillUnmount() {
        this.video.removeEventListener('timeupdate', this.HandleTimeBind)

        document.removeEventListener('mousemove', this.HandleMouseMoveBind)
        document.removeEventListener('mouseup', this.HandleMouseUpBind)

        if (this.state.buffertimer) clearInterval(this.state.buffertimer)
    }

    override render(): ReactElement {
        return (
            <div
                className='timeline-range'
                onMouseEnter={() => this.setState({ isHover: true })}
                onMouseLeave={() => this.setState({ isHover: false })}
                onMouseDown={this.HandleMouseDownBind}
                onTouchStart={this.HandleTouchStartBind}
                ref={this.TimeLineRef.bind(this)}
            >
                <span className='range'>
                    <span
                        className='rail'
                        style={{
                            backgroundColor:
                                this.options?.timeLine?.rail || '#fff4',
                        }}
                    >
                        <span
                            className='track'
                            style={{
                                width: `${this.state.percentage}%`,
                                backgroundColor:
                                    this.options?.timeLine?.track ||
                                    'currentcolor',
                            }}
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
                            backgroundColor:
                                this.options?.timeLine?.thumb || 'currentcolor',
                        }}
                    ></span>

                    <div
                        className='buffer-container'
                        style={{ color: this.options?.bufferColor || '#fff6' }}
                    >
                        {this.state.buffers.map(({ left, right }, index) => (
                            <div
                                className='buffer'
                                key={index}
                                style={{ left: left, right: right }}
                            ></div>
                        ))}
                    </div>
                </span>
            </div>
        )
    }
}

export default TimeLine
