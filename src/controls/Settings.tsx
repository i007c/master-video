import React, { ReactElement } from 'react'
import BaseComponent from './BaseComponent'

// menu
import Menu from '../Menu'
import { MenuType, MenuOption } from 'src'

// icons
import SettingsIcon from './icons/settings'

// style
import './sass/settings.scss'

// config
import { DefaultSpeeds } from './config/settings'

interface SettingsProps {}

interface SettingsState {
    active?: boolean
    Menus: MenuType
}

export class Settings extends BaseComponent<SettingsProps, SettingsState> {
    override state: SettingsState = {
        Menus: [],
    }

    private ChangeQuality(q: string) {
        const CurrentTime = this.video.currentTime
        const Paused = this.video.paused
        const speed = this.video.playbackRate
        this.video.src = q
        this.video.load()
        this.video.currentTime = CurrentTime
        this.video.playbackRate = speed
        if (!Paused) this.video.play()
    }

    override componentDidMount() {
        const SpeedMenu: MenuOption = {
            label: 'Speed',
            menu: [
                ...DefaultSpeeds.map(({ label, value }) => {
                    return {
                        label: label,
                        action: () => (this.video.playbackRate = value),
                    }
                }),
            ],
        }
        let opts = [SpeedMenu]
        if (typeof this.source === 'object') {
            const QualityMenu: MenuOption = {
                label: 'Quality',
                menu: [
                    ...this.source.map(({ lable, source }) => {
                        return {
                            label: lable,
                            action: () => this.ChangeQuality(source),
                        }
                    }),
                ],
            }

            opts.push(QualityMenu)
        }

        this.setState({
            Menus: [...this.state.Menus, ...opts],
        })
    }

    override render(): ReactElement {
        return (
            <div className='master-btn settings'>
                <div
                    className='icon'
                    onClick={() =>
                        this.setState({ active: !this.state.active })
                    }
                >
                    <SettingsIcon active={this.state.active} />
                </div>
                {this.state.active && <Menu menu={this.state.Menus} />}
            </div>
        )
    }
}

export default Settings
