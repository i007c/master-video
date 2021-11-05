import React, { PureComponent, ReactElement } from 'react'

import { PlayerContext } from '../context'

// utils
import { togglePlay, toggleFullScreen } from '../utils'
import TimeConvert from '../utils/TimeConvert'

// components
import CTime from './CTime'
import FullScreen from './icons/FullScreen'
import TimeLine from './TimeLine'
// icons
import Play from './icons/Play'
import Volume from './icons/Volume'

import './sass/controls.scss'

interface ControlsProps {}

interface ControlsState {
    isPlaying: boolean
    isFullScreen: boolean
    isMuted: boolean
    volume: number
    duration: string
}

const defaultState: ControlsState = {
    isPlaying: false,
    isFullScreen: false,
    isMuted: false,
    volume: 1.0,
    duration: '0:00',
}

export class Controls extends PureComponent<ControlsProps, ControlsState> {
    override state = defaultState
    // context setup
    static override contextType = PlayerContext
    declare context: React.ContextType<typeof PlayerContext>

    private video = this.context.video
    private master = this.context.master

    override componentDidMount() {
        this.video.addEventListener('canplay', () =>
            this.setState({ duration: TimeConvert(this.video.duration) })
        )
    }

    override render(): ReactElement {
        return (
            <div className='controls-container'>
                <div
                    className='toggle-play'
                    onClick={() => togglePlay(this.video)}
                ></div>
                <div className='controls'>
                    <div
                        className='btn play-pause'
                        onClick={() => togglePlay(this.video)}
                    >
                        <Play />
                    </div>
                    <div className='timestamp'>
                        <CTime /> / {this.state.duration}
                    </div>
                    <div className='timeline'>
                        <TimeLine />
                    </div>
                    <div
                        className='btn volume'
                        onClick={() => (this.video.muted = !this.video.muted)}
                    >
                        <Volume />
                    </div>
                    <div
                        className='btn fullscreen'
                        onClick={() => toggleFullScreen(this.master)}
                    >
                        <FullScreen />
                    </div>
                </div>
            </div>
        )
    }
}

export default Controls
