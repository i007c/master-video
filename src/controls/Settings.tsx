import React, { PureComponent, ReactElement } from 'react'

// menu
import Menu from '../Menu'
import { MenuType } from 'src'

// icons
import SettingsIcon from './icons/settings'

// style
import './sass/settings.scss'

const Menus: MenuType = [
    { label: 'label 1', action: () => console.log(1) },
    { label: 'label 2', action: () => console.log(2) },
    { label: 'label 3', action: () => console.log(3) },
    {
        label: 'label 4',
        action: () => console.log(4),
        menu: [
            { label: 'cool menu 1', action: () => console.log('4-1') },
            { label: 'cool menu 2', action: () => console.log('4-2') },
            { label: 'cool menu 3', action: () => console.log('4-3') },
        ],
    },
]

interface SettingsProps {}

interface SettingsState {
    active?: boolean
}

export class Settings extends PureComponent<SettingsProps, SettingsState> {
    override state: SettingsState = {}

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
                <Menu menu={Menus} />
            </div>
        )
    }
}

export default Settings
