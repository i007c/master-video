import React, { ReactElement } from 'react'
import BaseComponent from './BaseComponent'

// utils
import { togglePlay, toggleFullScreen } from '../utils'
import TimeConvert from '../utils/TimeConvert'

// components
import CTime from './CTime'
import FullScreen from './icons/FullScreen'
import TimeLine from './TimeLine'
import Volume from './Volume'
// icons
import Play from './icons/Play'

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

export class Controls extends BaseComponent<ControlsProps, ControlsState> {
    override state = defaultState

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
                    <Volume />
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
