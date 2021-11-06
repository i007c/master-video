import React, { ReactElement } from 'react'
import BaseComponent from '../BaseComponent'

interface PlayState {
    isPlaying: boolean
}

export class Play extends BaseComponent<{}, PlayState> {
    override state: PlayState = {
        isPlaying: false,
    }

    override componentDidMount() {
        this.video.addEventListener('pause', () =>
            this.setState({ isPlaying: !this.video.paused })
        )
        this.video.addEventListener('play', () =>
            this.setState({ isPlaying: !this.video.paused })
        )
        this.video.addEventListener('canplay', () =>
            this.setState({ isPlaying: !this.video.paused })
        )
    }

    override render(): ReactElement {
        return (
            <svg
                fill={
                    this.options?.playIconColor ||
                    this.options?.iconsColor ||
                    'currentColor'
                }
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path fill='none' d='M0 0h24v24H0z'></path>
                {this.state.isPlaying ? (
                    <path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z'></path>
                ) : (
                    <path d='M8 5v14l11-7z'></path>
                )}
            </svg>

            //
        )
    }
}

export default Play
