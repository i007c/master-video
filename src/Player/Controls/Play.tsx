import React, { PureComponent, ReactElement } from 'react'

// import icons
import { Pause as PauseIcon, Play as PlayIcon } from '../components/icons'

interface PlayProps {
    video: HTMLVideoElement
    className?: string
}

interface PlayState {
    isPlaying: boolean
}

class Play extends PureComponent<PlayProps, PlayState> {
    private video = this.props.video

    override state: PlayState = {
        isPlaying: false,
    }

    override componentDidMount() {
        this.video.addEventListener('ended', () => {
            this.setState({ isPlaying: false })
        })

        this.video.addEventListener('play', () => {
            this.setState({ isPlaying: true })
        })

        this.video.addEventListener('pause', () => {
            this.setState({ isPlaying: false })
        })

        this.video.addEventListener('loadeddata', () => {
            this.setState({ isPlaying: !this.video.paused })
        })

        document.addEventListener('keydown', e => {
            if (
                (e.code === 'KeyP' || e.code === 'Space') &&
                !e.altKey &&
                !e.ctrlKey &&
                !e.shiftKey
            ) {
                this.TogglePlay()
            }
        })
    }

    private TogglePlay(): void {
        if (this.video.paused) {
            this.video.play()
        } else {
            this.video.pause()
        }
    }

    override render(): ReactElement {
        return (
            <div
                className={this.props.className}
                onClick={() => this.TogglePlay()}
            >
                {this.state.isPlaying ? <PauseIcon /> : <PlayIcon />}
            </div>
        )
    }
}

export default Play
