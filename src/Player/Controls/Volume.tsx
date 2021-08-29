import React, { PureComponent, RefObject } from 'react'

// icons
import { Volume as VolumeIcon } from '../components/icons'

// range
import Range from '../../Range'

interface VolumeProps {
    video: RefObject<HTMLVideoElement>
    className?: string
}

interface VolumeState {
    videoVolume: number
}

export class Volume extends PureComponent<VolumeProps, VolumeState> {
    override state: VolumeState = {
        videoVolume: 100,
    }

    private video = this.props.video

    private Togglemute(): void {
        if (!this.video.current) return
        this.video.current.muted = !this.video.current.muted
    }

    private ChangeVolume(p: number) {
        if (!this.video.current) return

        this.video.current.muted = false

        this.video.current.volume = p / 100
    }

    override componentDidMount() {
        if (!this.video.current) return

        this.video.current.addEventListener('canplay', () => {
            if (!this.video.current) return

            this.setState({
                videoVolume: this.video.current.volume * 100,
            })
        })

        this.video.current.addEventListener('volumechange', () => {
            if (!this.video.current) return

            if (this.video.current.muted) {
                this.setState({
                    videoVolume: 0,
                })
            } else {
                this.setState({
                    videoVolume: this.video.current.volume * 100,
                })
            }
        })
    }

    override render() {
        return (
            <div className={this.props.className}>
                <VolumeIcon
                    percentage={this.state.videoVolume}
                    onClick={() => this.Togglemute()}
                />
                <Range
                    defaultValue={this.state.videoVolume}
                    onChange={p => this.ChangeVolume(p)}
                />
            </div>
        )
    }
}

export default Volume
