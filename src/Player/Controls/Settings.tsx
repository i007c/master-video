import React, { PureComponent, ReactElement } from 'react'

// icons
import { Tool } from '../components/icons'

// components
import { Menu, MenuObject } from '../../Menu'

// style
import './sass/settings.scss'

interface SettingsProps {
    video: HTMLVideoElement
    className?: string
}

interface SettingsState {
    showSettings: boolean
}

const DefaultSpeeds = [
    { label: '0.25', value: 0.25 },
    { label: '0.5', value: 0.5 },
    { label: '0.75', value: 0.75 },
    { label: 'Normal', value: 1.0 },
    { label: '1.25', value: 1.25 },
    { label: '1.5', value: 1.5 },
    { label: '1.75', value: 1.75 },
    { label: '2', value: 2.0 },
]

export class Settings extends PureComponent<SettingsProps, SettingsState> {
    override state: SettingsState = {
        showSettings: false,
    }

    private video = this.props.video

    private ToggleSettings() {
        this.setState({ showSettings: !this.state.showSettings })
    }

    private ChangeSpeed(value: number) {
        this.video.playbackRate = value
    }

    private MenuList: MenuObject[] = [
        {
            label: 'Speed',
            job: DefaultSpeeds.map(item => {
                return {
                    label: item.label,
                    job: () => this.ChangeSpeed(item.value),
                }
            }),
        },
        {
            label: 'Quality',
            job: [],
        },
    ]

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
                    <Menu
                        MenuList={this.MenuList}
                        style={{ bottom: 60, right: 60 }}
                    />
                )}
            </div>
        )
    }
}

export default Settings
