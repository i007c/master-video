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
    ctrl?: HTMLDivElement
    showTime: boolean
    ctrlObserver?: ResizeObserver
}

const defaultState: ControlsState = {
    isPlaying: false,
    isFullScreen: false,
    isMuted: false,
    volume: 1.0,
    duration: '0:00',
    showTime: true,
}

export class Controls extends BaseComponent<ControlsProps, ControlsState> {
    override state = defaultState

    override componentDidMount() {
        this.video.addEventListener('canplay', () =>
            this.setState({ duration: TimeConvert(this.video.duration) })
        )
    }

    private HandleSizeBind = this.HandleSize.bind(this)

    private CTRLRef(node: HTMLDivElement) {
        this.setState({ ctrl: node })
        this.HandleSizeBind()
    }

    override componentDidUpdate() {
        if (!this.state.ctrl || this.state.ctrlObserver) return

        let cro = new ResizeObserver(this.HandleSizeBind)
        cro.observe(this.state.ctrl)
        this.setState({ ctrlObserver: cro })
    }

    private HandleSize() {
        if (!this.state.ctrl) return

        if (this.state.ctrl.offsetWidth < 400) {
            this.setState({ showTime: false })
        } else {
            this.setState({ showTime: true })
        }
    }

    override render(): ReactElement {
        return (
            <div className='controls-container'>
                <div
                    className='toggle-play'
                    onClick={() => togglePlay(this.video)}
                ></div>
                <div className='controls' ref={this.CTRLRef.bind(this)}>
                    <div
                        className='btn play-pause'
                        onClick={() => togglePlay(this.video)}
                    >
                        <Play />
                    </div>
                    {this.state.showTime && (
                        <div className='timestamp'>
                            <CTime /> / {this.state.duration}
                        </div>
                    )}
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
