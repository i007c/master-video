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
import Play, { BigPlay } from './icons/Play'
import Loading from './icons/Loading'

import './sass/controls.scss'
import Settings from './Settings'

interface ControlsProps {}

interface ControlsState {
    isPlaying: boolean
    isLoading: boolean
    duration: string
    ctrl?: HTMLDivElement
    showTime: boolean
    ctrlObserver?: ResizeObserver
}

const defaultState: ControlsState = {
    isPlaying: false,
    isLoading: true,
    duration: '0:00',
    showTime: true,
}

export class Controls extends BaseComponent<ControlsProps, ControlsState> {
    override state = defaultState

    private CanPlayEventBind = this.CanPlayEvent.bind(this)
    private PlayStatusBind = this.PlayStatus.bind(this)

    private LoadStartBind = this.LoadStart.bind(this)

    private KeyBind = this.KeyEvent.bind(this)

    private LoadStart() {
        if (this.video.readyState === 4) this.setState({ isLoading: false })
        else this.setState({ isLoading: true })
    }

    private CanPlayEvent() {
        this.setState({ duration: TimeConvert(this.video.duration) })
    }

    private PlayStatus() {
        this.setState({ isPlaying: !this.video.paused })
    }

    private GetVolumeValue(a?: number): number {
        if (a && a < 1 && a > -1) {
            const b = this.video.volume + a
            if (b < 0) {
                this.video.volume = 0
            } else if (b > 1) {
                this.video.volume = 1
            } else {
                this.video.volume = b
            }
        }

        return this.video.volume
    }

    private KeyEvent(e: KeyboardEvent) {
        switch (e.code) {
            case 'Space':
                e.preventDefault()
                return togglePlay(this.video)

            case 'KeyP':
                e.preventDefault()
                return togglePlay(this.video)

            case 'KeyF':
                e.preventDefault()
                return toggleFullScreen(this.master)

            case 'KeyM':
                e.preventDefault()
                return (this.video.muted = !this.video.muted)

            case 'ArrowRight':
                e.preventDefault()
                return (this.video.currentTime += 5)

            case 'ArrowLeft':
                e.preventDefault()
                return (this.video.currentTime -= 5)

            case 'ArrowUp':
                e.preventDefault()
                if (this.video.volume === 1) return
                else return this.GetVolumeValue(0.1)

            case 'ArrowDown':
                e.preventDefault()
                if (this.video.volume === 0) return
                else return this.GetVolumeValue(-0.1)

            default:
                return
        }
    }

    override componentDidMount() {
        this.video.addEventListener('canplay', this.CanPlayEventBind)
        this.video.addEventListener('play', this.PlayStatusBind)
        this.video.addEventListener('pause', this.PlayStatusBind)
        // loading
        this.video.addEventListener('loadstart', this.LoadStartBind)
        this.video.addEventListener('canplay', this.LoadStartBind)
        this.video.addEventListener('progress', this.LoadStartBind)
        this.video.addEventListener('loadeddata', this.LoadStartBind)
        this.video.addEventListener('play', this.LoadStartBind)

        document.addEventListener('keydown', this.KeyBind)
    }

    override componentWillUnmount() {
        this.video.removeEventListener('canplay', this.CanPlayEventBind)
        this.video.removeEventListener('play', this.PlayStatusBind)
        this.video.removeEventListener('pause', this.PlayStatusBind)
        // loading
        this.video.removeEventListener('loadstart', this.LoadStartBind)
        this.video.removeEventListener('canplay', this.LoadStartBind)
        this.video.removeEventListener('loadeddata', this.LoadStartBind)
        this.video.removeEventListener('loadeddata', this.LoadStartBind)
        this.video.removeEventListener('play', this.LoadStartBind)

        document.removeEventListener('keydown', this.KeyBind)
        if (this.state.ctrlObserver) {
            this.state.ctrlObserver.disconnect()
        }
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
                >
                    {!this.state.isPlaying && !this.state.isLoading && (
                        <BigPlay />
                    )}
                    {this.state.isLoading && (
                        <div className='loading'>
                            <Loading />
                        </div>
                    )}
                </div>
                <div className='controls' ref={this.CTRLRef.bind(this)}>
                    <div
                        className='master-btn play-pause'
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
                    <Settings />
                    <div
                        className='master-btn fullscreen'
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
