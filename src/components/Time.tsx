import React, { PureComponent, ReactElement } from 'react'

import { MainContext } from '../context'

import { TimeProps } from '../interfaces'

interface TimeState {
    TimeData: string
}

class TimeClass extends PureComponent<TimeProps, TimeState> {
    // context setup
    static override contextType = MainContext
    declare context: React.ContextType<typeof MainContext>

    private video = this.context.video

    override state: TimeState = {
        TimeData: '0:00',
    }

    private TimeConvert(seconds: number): string {
        let h = Math.floor(seconds / 3600)
        let m = Math.floor((seconds % 3600) / 60)
        let s = Math.floor((seconds % 3600) % 60)

        let SC = (t: number): string => {
            if (t === 0) return '00'
            else if (t < 10) return '0' + t
            else return t.toString()
        }

        let MHC = (t: number): string => {
            if (t === 0) return '0'
            else if (t < 10) return '0' + t
            else return t.toString()
        }

        return h === 0 ? `${MHC(m)}:${SC(s)}` : `${MHC(h)}:${MHC(m)}:${SC(s)}`
    }

    private UpdateTimeBind = this.UpdateTime.bind(this)
    private UpdateTime() {
        let time = 0
        if (this.props.type === 'left')
            time = this.video.currentTime - this.video.duration
        else if (this.props.type === 'played') time = this.video.currentTime

        let formatedTime = this.TimeConvert(Math.abs(time))

        if (typeof this.props.timeCall === 'function')
            this.props.timeCall(formatedTime)

        this.setState({
            TimeData: formatedTime,
        })
    }

    override componentDidMount() {
        this.video.addEventListener('timeupdate', this.UpdateTimeBind)
    }

    override componentWillUnmount() {
        this.video.removeEventListener('timeupdate', this.UpdateTimeBind)
    }

    override render(): ReactElement {
        return <>{this.state.TimeData}</>
    }
}

export const Time = (props: TimeProps) => {
    return <TimeClass {...props} />
}
