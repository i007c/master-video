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
    TabName: 'main' | 'speed' | 'quality' | 'cc'
    SSNode: HTMLDivElement | null
}

const SpeedTab = [
    { label: '0.5', value: 0.5 },
    { label: '0.75', value: 0.75 },
    { label: '1', value: 1.0 },
    { label: '1.5', value: 1.5 },
    { label: '1.6', value: 1.6 },
    { label: '1.7', value: 1.7 },
    { label: '1.8', value: 1.8 },
    { label: '1.9', value: 1.9 },
    { label: '2.0', value: 2.1 },
    { label: '2.1', value: 2.1 },
]

const SubtitleTab = [{ label: 'English', value: 'en' }]

const QualityTab = [{ label: '720p', value: '720p' }]

export class Settings extends PureComponent<SettingsProps, SettingsState> {
    override state: SettingsState = {
        showSettings: false,
        TabName: 'main',
        SSNode: null,
    }

    private video = this.props.video

    private ToggleSettings() {
        this.setState({ showSettings: !this.state.showSettings })
        this.ChangeTab('main')
    }

    private SettingsSlideNode = (node: HTMLDivElement) => {
        this.setState({ SSNode: node })
    }

    private ChangeTab(tab: 'main' | 'speed' | 'quality' | 'cc') {
        if (!this.state.SSNode) return

        this.state.SSNode.style.transform = `translateX(${
            tab === 'main' ? 0 : -this.state.SSNode.offsetWidth
        }px)`
        this.setState({ TabName: tab })
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

    override render(): ReactElement {
        return (
            <div className={this.props.className + ' controler-section'}>
                <div className={'icon'} onClick={() => this.ToggleSettings()}>
                    <Tool />
                </div>
                {this.state.showSettings && (
                    <div className='settings-list'>
                        <div
                            className='settings-slide'
                            ref={this.SettingsSlideNode}
                        >
                            <div className='main-list'>
                                {this.state.TabName === 'main' && (
                                    <ul>
                                        <li
                                            className='item'
                                            onClick={() =>
                                                this.ChangeTab('speed')
                                            }
                                        >
                                            Speed
                                        </li>
                                        <li
                                            className='item'
                                            onClick={() =>
                                                this.ChangeTab('quality')
                                            }
                                        >
                                            Quality
                                        </li>
                                        <li
                                            className='item'
                                            onClick={() => this.ChangeTab('cc')}
                                        >
                                            Subtitles/CC
                                        </li>
                                    </ul>
                                )}
                            </div>
                            <div
                                className='side-list'
                                style={
                                    this.state.TabName === 'main'
                                        ? { maxHeight: 0 }
                                        : {}
                                }
                            >
                                <div
                                    className='back-btn'
                                    onClick={() => this.ChangeTab('main')}
                                >
                                    Back
                                </div>

                                {this.state.TabName === 'speed' && (
                                    <ul>
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
                                )}
                                {this.state.TabName === 'quality' && (
                                    <ul>
                                        {QualityTab.map((item, index) => (
                                            <li
                                                key={index}
                                                className='item'
                                                onClick={() =>
                                                    this.ChangeQuality(
                                                        item.value
                                                    )
                                                }
                                            >
                                                {item.label}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {this.state.TabName === 'cc' && (
                                    <ul>
                                        {SubtitleTab.map((item, index) => (
                                            <li
                                                key={index}
                                                className='item'
                                                onClick={() =>
                                                    this.ChangeSubtitle(
                                                        item.value
                                                    )
                                                }
                                            >
                                                {item.label}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Settings
