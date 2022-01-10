import React, { ReactElement } from 'react'
import BaseComponent from './BaseComponent'

// menu
import Menu from '../Menu'
import { MenuType, MenuOption } from '../types'

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

type EA = Array<unknown>
const equals = (a: EA, b: EA): boolean =>
    JSON.stringify(a) === JSON.stringify(b)

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

    private GetSpeedMenu(): MenuOption {
        return {
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
    }

    private GetQualityMenu(): MenuOption | null {
        if (typeof this.context.source === 'object') {
            return {
                label: 'Quality',
                menu: [
                    ...this.context.source.map(({ lable, source }) => {
                        return {
                            label: lable,
                            action: () => {
                                this.ChangeQuality(source)
                                this.setState({ active: false })
                            },
                        }
                    }),
                ],
            }
        }
        return null
    }

    private UpdateMenus() {
        let opts = [this.GetSpeedMenu()]

        const quality = this.GetQualityMenu()
        if (quality) opts.push(quality)

        if (!equals(opts, this.state.Menus)) {
            this.setState({
                Menus: opts,
                active: false,
            })
        }
    }

    override componentDidUpdate() {
        this.UpdateMenus()
    }

    override componentDidMount() {
        this.UpdateMenus()
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
