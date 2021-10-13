import React, { PureComponent, ReactElement } from 'react'

import { MainContext } from './context'

import { OverlayProps, TogglePlay, ToggleMute } from './interfaces'

import { Time } from './components'

interface OMProps {
    Overlay: (props: OverlayProps) => JSX.Element
}

interface OMState {
    isPlaying: boolean
    isMuted: boolean
    volume: number
}

export class OM extends PureComponent<OMProps, OMState> {
    override state: OMState = {
        isPlaying: false,
        isMuted: false,
        volume: 0,
    }
    // context setup
    static override contextType = MainContext
    declare context: React.ContextType<typeof MainContext>

    private Overlay = this.props.Overlay
    private video = this.context.video

    TogglePlay(type?: TogglePlay) {
        if (type === 'play') this.video.play()
        else if (type === 'pause') this.video.pause()
        else this.video.paused ? this.video.play() : this.video.pause()

        this.setState({ isPlaying: !this.video.paused })
    }

    ToggleMute(type?: ToggleMute) {
        if (type === 'mute') this.video.muted = true
        else if (type === 'unmute') this.video.muted = false
        else this.video.muted = !this.video.muted

        this.setState({ isMuted: this.video.muted })
    }

    ChangeVolume(volume?: number) {
        const volumeError = new Error('Volume must be between 0 and 100')
        if (!volume && volume !== 0) this.video.volume = 1
        else {
            if (volume < 0 || volume > 100) throw volumeError
            this.video.volume = volume / 100
        }

        this.setState({ volume: Math.round(this.video.volume * 100) })
    }

    override componentDidMount() {
        this.setState({
            isPlaying: !this.video.paused,
            isMuted: this.video.muted,
            volume: Math.round(this.video.volume * 100),
        })
    }

    override render(): ReactElement {
        return (
            <this.Overlay
                TogglePlay={this.TogglePlay.bind(this)}
                ToggleMute={this.ToggleMute.bind(this)}
                ChangeVolume={this.ChangeVolume.bind(this)}
                Time={Time}
                isPlaying={this.state.isPlaying}
                isMuted={this.state.isMuted}
                volume={this.state.volume}
            />
        )
    }
}

export default OM
