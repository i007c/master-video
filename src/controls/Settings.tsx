import React, { PureComponent, ReactElement } from 'react'

// icons
import SettingsIcon from './icons/settings'

// style
import './sass/settings.scss'

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
            </div>
        )
    }
}

export default Settings
