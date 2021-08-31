import React, { PureComponent } from 'react'

// icons
import { Volume as VolumeIcon } from '../components/icons'

// range
import Range from '../../Range'

interface VolumeProps {
    video: HTMLVideoElement
    className?: string
}

interface VolumeState {
    videoVolume: number
    volumeMuted: boolean
    showRange: boolean
    isMouseHovering: boolean
    isMouseHolding: boolean
}

export class Volume extends PureComponent<VolumeProps, VolumeState> {
    override state: VolumeState = {
        videoVolume: 100,
        volumeMuted: false,
        showRange: false,
        isMouseHovering: false,
        isMouseHolding: false,
    }

    private video = this.props.video

    private Togglemute(): void {
        this.video.muted = !this.video.muted
        this.setState({ volumeMuted: this.video.muted })
    }

    private ChangeVolume(p: number) {
        this.video.muted = false
        this.setState({ volumeMuted: false })

        this.video.volume = p / 100
    }

    override componentDidMount() {
        this.video.addEventListener('canplay', () => {
            this.setState({
                videoVolume: this.video.volume * 100,
            })
        })

        this.video.addEventListener('volumechange', () => {
            this.setState({
                videoVolume: this.video.volume * 100,
            })
        })
    }

    override componentDidUpdate() {
        let show = false
        if (this.state.isMouseHovering) show = true
        else {
            if (this.state.isMouseHolding) show = true
            else show = false
        }
        this.setState({ showRange: show })
    }

    override render() {
        return (
            <div
                className={this.props.className}
                style={this.state.showRange ? {} : { width: 35 }}
                onMouseEnter={() => this.setState({ isMouseHovering: true })}
                onMouseLeave={() => this.setState({ isMouseHovering: false })}
            >
                <VolumeIcon
                    percentage={this.state.videoVolume}
                    onClick={() => this.Togglemute()}
                    muted={this.state.volumeMuted}
                />

                <Range
                    defaultValue={this.state.videoVolume}
                    onChange={p => this.ChangeVolume(p)}
                    onHold={h => this.setState({ isMouseHolding: h })}
                    style={{ width: 100, minWidth: 100, marginLeft: 15 }}
                />
            </div>
        )
    }
}

export default Volume
