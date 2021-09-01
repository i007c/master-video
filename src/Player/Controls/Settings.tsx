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
    
}

export class Settings extends PureComponent<SettingsProps, SettingsState> {

    override state: SettingsState = {
        
    }

    private video = this.props.video

    private ToggleSettings() {
        console.log(this.video)
    }

    override render():ReactElement {
        return (
            <div
                className={this.props.className}
                onClick={() => this.ToggleSettings()}
            >
                <Tool />
            </div>
        )
    }

}

export default Settings
