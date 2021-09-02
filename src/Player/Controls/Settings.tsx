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
    point: StructureObject[]
}

interface StructureObject {
    label: string
    func?: (value: string | number) => void
    options?: StructureObject[]
    value?: string | number
}

// interface OptionsObject {
//     label: string
//     value?: number | string
//     func?: () => void
// }

const back = { label: 'Back', func: () => {} }

const Structure: StructureObject[] = [
    {
        label: 'SpeedX',
        func: () => {},
        options: [
            back,
            { label: '0.5', value: 0.5 },
            { label: '0.75', value: 0.75 },
            { label: '1', value: 1.0 },
            { label: '1.5', value: 1.5 },
        ],
    },
    {
        label: 'Quality',
        func: () => {},
        options: [back, { label: '720p', value: '720p' }],
    },
    {
        label: 'Subtitles/CC',
        func: () => {},
        options: [{ label: 'en', value: 'en' }],
    },
]

export class Settings extends PureComponent<SettingsProps, SettingsState> {
    override state: SettingsState = {
        showSettings: true,
        point: Structure,
    }

    // private video = this.props.video

    private ToggleSettings() {
        this.setState({ showSettings: !this.state.showSettings })
    }

    private ChangePoint(point: StructureObject[] | undefined) {
        if (!point) return
        
        this.setState({ point: point })
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
                        <ul>
                            {this.state.point.map((item, index) => (
                                <li
                                    key={index}
                                    className='item'
                                    onClick={() => this.ChangePoint(item.options)}
                                >
                                    {item.label}
                                </li>
                            ))}

                            {/* <li className='item'>Quality</li>
                            <li className='item'>Subtitles/CC</li> */}
                        </ul>
                    </div>
                )}
            </div>
        )
    }
}

export default Settings
