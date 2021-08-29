import React, { PureComponent, ReactElement, RefObject } from 'react'

// import icons
import { Pause as PauseIcon, Play as PlayIcon } from '../components/icons'

interface PlayProps {
    video: RefObject<HTMLVideoElement>
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
        if (!this.video.current) return

        this.video.current.addEventListener('ended', () => {
            this.setState({ isPlaying: false })
        })
    }

    private TogglePlay(): void {
        if (!this.video.current) return

        if (this.video.current.paused) {
            this.video.current.play()
            this.setState({ isPlaying: true })
        } else {
            this.video.current.pause()
            this.setState({ isPlaying: false })
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
