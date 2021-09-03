import React, { PureComponent, ReactElement } from 'react'

// icons
import { Tool } from '../components/icons'

// style
import './sass/settings.scss'

interface SettingsProps {
    video: HTMLVideoElement
    className?: string
}

interface SettingsState {
    showSettings: boolean
    TabIndex: number
}

const SpeedTab = [
    { label: '0.5', value: 0.5 },
    { label: '0.75', value: 0.75 },
    { label: '1', value: 1.0 },
    { label: '1.5', value: 1.5 },
]

const SubtitleTab = [{ label: 'English', value: 'en' }]

const QualityTab = [{ label: '720p', value: '720p' }]

export class Settings extends PureComponent<SettingsProps, SettingsState> {
    override state: SettingsState = {
        showSettings: true,
        TabIndex: 0,
    }

    private video = this.props.video

    private ToggleSettings() {
        this.setState({ showSettings: !this.state.showSettings })
    }

    private ChangeTab(tab: 0 | 1 | 2 | 3) {
        let ss = document.querySelector<HTMLDivElement>('.settings-slide')

        if (ss) {
            ss.style.transform = `translateX(${tab * -196}px)`
            this.setState({ TabIndex: tab })
        }
    }

    private ChangeSpeed(value: number) {
        this.video.playbackRate = value
    }

    private ChangeQuality(value: string) {
        console.log(value)
    }

    private ChangeSubtitle(value: string) {
        console.log(value)
    }

    override componentDidUpdate() {
        const playSection =
            document.querySelector<HTMLDivElement>('.play-section')
        if (!playSection) return

        if (this.state.showSettings) {
            playSection.style.zIndex = '0'
        } else {
            playSection.style.zIndex = ''
        }
    }

    private Back = (
        <li className='item' onClick={() => this.ChangeTab(0)}>
            Back
        </li>
    )

    override render(): ReactElement {
        return (
            <div className={this.props.className + ' controler-section'}>
                <div className={'icon'} onClick={() => this.ToggleSettings()}>
                    <Tool />
                </div>
                {this.state.showSettings && (
                    <div className='settings-list'>
                        <div className='settings-slide'>
                            <ul
                                style={
                                    this.state.TabIndex === 0
                                        ? {}
                                        : { height: 0 }
                                }
                            >
                                <li
                                    className='item'
                                    onClick={() => this.ChangeTab(1)}
                                >
                                    Speed
                                </li>
                                <li
                                    className='item'
                                    onClick={() => this.ChangeTab(2)}
                                >
                                    Quality
                                </li>
                                <li
                                    className='item'
                                    onClick={() => this.ChangeTab(3)}
                                >
                                    Subtitles/CC
                                </li>
                            </ul>
                            <ul
                                style={
                                    this.state.TabIndex === 1
                                        ? {}
                                        : { height: 0 }
                                }
                            >
                                {this.Back}
                                {SpeedTab.map((item, index) => (
                                    <li
                                        key={index}
                                        className='item'
                                        onClick={() =>
                                            this.ChangeSpeed(item.value)
                                        }
                                    >
                                        {item.label}
                                    </li>
                                ))}
                            </ul>
                            <ul
                                style={
                                    this.state.TabIndex === 2
                                        ? {}
                                        : { height: 0 }
                                }
                            >
                                {this.Back}
                                {QualityTab.map((item, index) => (
                                    <li
                                        key={index}
                                        className='item'
                                        onClick={() =>
                                            this.ChangeQuality(item.value)
                                        }
                                    >
                                        {item.label}
                                    </li>
                                ))}
                            </ul>
                            <ul
                                style={
                                    this.state.TabIndex === 3
                                        ? {}
                                        : { height: 0 }
                                }
                            >
                                {this.Back}
                                {SubtitleTab.map((item, index) => (
                                    <li
                                        key={index}
                                        className='item'
                                        onClick={() =>
                                            this.ChangeSubtitle(item.value)
                                        }
                                    >
                                        {item.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Settings
