import React, { PureComponent, ReactElement } from 'react'

// context
import { PlayerContext } from '../../Contexts/Player.Context'

// icons
import { Tool } from '../components/icons'

// components
import { Menu, MenuObject } from '../../Menu'

// style
import './sass/settings.scss'

interface SettingsProps {
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

    // context setup
    static override contextType = PlayerContext
    declare context: React.ContextType<typeof PlayerContext>

    private video = this.context.video

    private ToggleSettings() {
        this.setState({ showSettings: !this.state.showSettings })
    }

    private ChangeSpeed(value: number) {
        this.video.playbackRate = value
    }

    private ChangeSource(value: string) {
        let sourcethisElement = this.video.querySelector('source')
        if (!sourcethisElement) return

        let oldTime = this.video.currentTime

        sourcethisElement.src = value
        this.video.load()
        this.video.currentTime = oldTime
        this.video.play()
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

    override componentDidMount() {
        if (this.context.Sources.length > 1) {
            this.MenuList.push({
                label: 'Sources',
                job: this.context.Sources.map(item => {
                    return {
                        label: item.label,
                        job: () => this.ChangeSource(item.url),
                    }
                }),
            })
        }

        document.addEventListener('click', e => {
            e.preventDefault()

            if (e.target)
                if (
                    !(e.target as HTMLElement).closest('.settings') &&
                    !(e.target as HTMLElement).closest('.menu-item') &&
                    !(e.target as HTMLElement).closest('.back-btn')
                )
                    this.setState({ showSettings: false })
        })

        document.addEventListener('keydown', e => {
            if (e.altKey || e.ctrlKey || e.shiftKey) return

            if (e.code === 'KeyS') {
                this.setState({ showSettings: !this.state.showSettings })
            }

            if (e.code === 'Escape') {
                this.setState({ showSettings: false })
            }
        })
    }

    override render(): ReactElement {
        return (
            <div className={this.props.className + ' controler-section'}>
                <div className='icon' onClick={() => this.ToggleSettings()}>
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
