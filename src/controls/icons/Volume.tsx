import React, { ReactElement } from 'react'
import BaseComponent from '../BaseComponent'

interface VolumeProps {}

interface VolumeState {
    percentage: number
    muted: boolean
}

export class Volume extends BaseComponent<VolumeProps, VolumeState> {
    override state: VolumeState = {
        percentage: 100,
        muted: false,
    }

    override componentDidMount() {
        this.video.addEventListener('canplay', this.UpdateVolumeBind)
        this.video.addEventListener('volumechange', this.UpdateVolumeBind)
    }
    override componentWillUnmount() {
        this.video.removeEventListener('canplay', this.UpdateVolumeBind)
        this.video.removeEventListener('volumechange', this.UpdateVolumeBind)
    }

    private UpdateVolumeBind = this.UpdateVolume.bind(this)
    private UpdateVolume() {
        this.setState({
            percentage: Math.round(this.video.volume * 100),
            muted: this.video.muted,
        })
    }

    UP_PATH = (
        <path d='M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z' />
    )
    MUTE_PATH = (
        <path d='M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z' />
    )
    OFF_PATH = (<path d='M 3 9 v 6 h 4 l 5 5 V 4 l -5 5 H 3 z' />)
    DOWN_PATH = (
        <path d='M 16.5 12 A 4.5 4.5 0 0 0 14 7.97 v 8.05 c 1.48 -0.73 2.5 -2.25 2.5 -4.02 z M 3 9 v 6 h 4 l 5 5 V 4 L 7 9 H 3 z' />
    )

    private GetPath() {
        if (this.state.muted) {
            return this.MUTE_PATH
        } else if (this.state.percentage <= 10) {
            return this.OFF_PATH
        } else if (this.state.percentage <= 45) {
            return this.DOWN_PATH
        } else {
            return this.UP_PATH
        }
    }

    override render(): ReactElement {
        return (
            <svg
                fill={
                    this.options?.volumeIconColor ||
                    this.options?.iconsColor ||
                    'currentColor'
                }
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path fill='none' d='M0 0h24v24H0z'></path>
                {this.GetPath()}
            </svg>
        )
    }
}

export default Volume
