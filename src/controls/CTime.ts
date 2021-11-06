import BaseComponent from './BaseComponent'

import TimeConvert from '../utils/TimeConvert'

interface TimeStampState {
    time: string
}

export class TimeStamp extends BaseComponent<{}, TimeStampState> {
    override state: TimeStampState = {
        time: '',
    }
    private UpdateCTimeBind = this.UpdateCTime.bind(this)

    override componentDidMount() {
        this.video.addEventListener('canplay', this.UpdateCTimeBind)
        this.video.addEventListener('timeupdate', this.UpdateCTimeBind)
    }
    override componentWillUnmount() {
        this.video.removeEventListener('canplay', this.UpdateCTimeBind)
        this.video.removeEventListener('timeupdate', this.UpdateCTimeBind)
    }

    private UpdateCTime() {
        this.setState({ time: TimeConvert(this.video.currentTime) })
    }

    override render(): string {
        return this.state.time
    }
}

export default TimeStamp
