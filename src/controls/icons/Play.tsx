import React, { FC, ReactElement } from 'react'
import BaseComponent from '../BaseComponent'

interface PlayState {
    isPlaying: boolean
}

export class Play extends BaseComponent<{}, PlayState> {
    override state: PlayState = {
        isPlaying: false,
    }

    private PausePlayBind = this.PausePlay.bind(this)
    private PausePlay() {
        this.setState({ isPlaying: !this.video.paused })
    }

    override componentDidMount() {
        this.video.addEventListener('pause', this.PausePlayBind)
        this.video.addEventListener('play', this.PausePlayBind)
        this.video.addEventListener('canplay', this.PausePlayBind)
    }
    override componentWillUnmount() {
        this.video.removeEventListener('pause', this.PausePlayBind)
        this.video.removeEventListener('play', this.PausePlayBind)
        this.video.removeEventListener('canplay', this.PausePlayBind)
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

export const BigPlay: FC = () => {
    return (
        <svg
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 448 512'
        >
            <path
                fill='currentColor'
                d='M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z'
            ></path>
        </svg>
    )
}
