import React, { PureComponent, ReactElement } from 'react'

interface SettingsProps {}

interface SettingsState {}

export class Settings extends PureComponent<SettingsProps, SettingsState> {
    override state: SettingsState = {}

    override render(): ReactElement {
        return <div></div>
    }
}

export default Settings
