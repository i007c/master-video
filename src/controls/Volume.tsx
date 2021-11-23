import React, { ReactElement } from 'react'
import BaseComponent from './BaseComponent'

import VolumeIcon from './icons/Volume'

import './sass/volume.scss'

import { VolumeThumb } from '../utils'

interface VolumeProps {}

interface VolumeState {
    showRange: boolean
    isHover: boolean
    isMouseDown: boolean
    isIconHover: boolean
    percentage: number
    timeline?: HTMLSpanElement
}

export class Volume extends BaseComponent<VolumeProps, VolumeState> {
    override state: VolumeState = {
        showRange: false,
        isHover: false,
        isMouseDown: false,
        percentage: 0,
        isIconHover: false,
    }

    private TimeLineRef(node: HTMLSpanElement) {
        this.setState({ timeline: node })
    }

    private HandleMouseMoveBind = this.HandleMouseMove.bind(this)
    private HandleMouseDownBind = this.HandleMouseDown.bind(this)
    private HandleMouseUpBind = this.HandleMouseUp.bind(this)
    private HandleVolumeBind = this.HandleVolume.bind(this)

    private HandlePercentage(percentage: number) {
        percentage = percentage * 100

        if (percentage > 100) percentage = 100
        else if (percentage < 0) percentage = 0

        this.setState({ percentage: percentage })

        let vol = percentage / 100
        this.video.volume = vol
    }

    private HandleVolume() {
        let vol = this.video.volume * 100
        if (isNaN(vol)) this.setState({ percentage: 0 })
        else this.setState({ percentage: vol })
    }

    private HandleMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.preventDefault()

        this.setState({ isMouseDown: true })

        const { bottom, height } = e.currentTarget.getBoundingClientRect()
        this.HandlePercentage((bottom - e.clientY) / height)

        document.addEventListener('mousemove', this.HandleMouseMoveBind)
        document.addEventListener('mouseup', this.HandleMouseUpBind)
    }

    public HandleMouseMove(e: MouseEvent) {
        if (!this.state.timeline) return

        e.preventDefault()

        const { bottom, height } = this.state.timeline.getBoundingClientRect()
        this.HandlePercentage((bottom - e.clientY) / height)
    }

    private HandleMouseUp() {
        document.removeEventListener('mousemove', this.HandleMouseMoveBind)
        document.removeEventListener('mouseup', this.HandleMouseUpBind)

        if (!this.state.isHover && !this.state.isIconHover) {
            this.setState({ showRange: false, isMouseDown: false })
        } else {
            this.setState({ isMouseDown: false })
        }
    }

    override componentDidMount() {
        this.video.addEventListener('canplay', this.HandleVolumeBind)
        this.video.addEventListener('volumechange', this.HandleVolumeBind)
    }
    override componentWillUnmount() {
        this.video.removeEventListener('canplay', this.HandleVolumeBind)
        this.video.removeEventListener('volumechange', this.HandleVolumeBind)

        document.removeEventListener('mousemove', this.HandleMouseMoveBind)
        document.removeEventListener('mouseup', this.HandleMouseUpBind)
    }

    override render(): ReactElement {
        return (
            <div
                className='btn volume'
                onMouseEnter={() =>
                    this.setState({ showRange: true, isIconHover: true })
                }
                onMouseLeave={() => {
                    this.setState({ isIconHover: false })
                    setTimeout(() => {
                        if (
                            !this.state.isHover &&
                            !this.state.isMouseDown &&
                            !this.state.isIconHover
                        )
                            this.setState({ showRange: false })
                    }, 200)
                }}
            >
                <div
                    className='icon-container'
                    onClick={() => (this.video.muted = !this.video.muted)}
                >
                    <VolumeIcon />
                </div>
                {this.state.showRange && (
                    <div className='range-container'>
                        <div
                            className='volume-range'
                            onMouseEnter={() =>
                                this.setState({ isHover: true })
                            }
                            onMouseLeave={() =>
                                this.setState({ isHover: false })
                            }
                        >
                            <span
                                className='range'
                                onMouseDown={this.HandleMouseDownBind}
                                ref={this.TimeLineRef.bind(this)}
                            >
                                <span
                                    className='rail'
                                    style={{
                                        backgroundColor:
                                            this.options?.volume?.rail ||
                                            '#777',
                                    }}
                                >
                                    <span
                                        className='track'
                                        style={{
                                            height: `${this.state.percentage}%`,
                                            backgroundColor:
                                                this.options?.volume?.track ||
                                                'currentcolor',
                                        }}
                                    ></span>
                                </span>
                                <span
                                    className={`thumb ${
                                        this.state.isHover ||
                                        this.state.isMouseDown
                                            ? 'hold'
                                            : ''
                                    }`}
                                    style={{
                                        bottom: `${VolumeThumb(
                                            this.state.percentage
                                        )}%`,
                                        backgroundColor:
                                            this.options?.volume?.thumb ||
                                            'currentcolor',
                                    }}
                                ></span>
                            </span>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Volume
