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
        this.setState({
            Menus: [...this.state.Menus, SpeedMenu],
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
