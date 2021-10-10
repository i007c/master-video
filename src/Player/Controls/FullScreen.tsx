import React, { PureComponent, ReactElement } from 'react'

// icons
import { Maximize, Minimize } from '../components/icons'

interface FullScreenProps {
    Container: HTMLDivElement
    className?: string
}

interface FullScreenState {
    isFull: boolean
}

export class FullScreen extends PureComponent<
    FullScreenProps,
    FullScreenState
> {
    override state: FullScreenState = {
        isFull: false,
    }

    private Container = this.props.Container

    private ToggleFullScreen() {
        if (!document.fullscreenEnabled) return

        if (document.fullscreenElement === this.Container) {
            document.exitFullscreen()
        } else {
            this.Container.requestFullscreen()
        }
    }

    override componentDidMount() {
        document.addEventListener('fullscreenchange', () => {
            if (document.fullscreenElement === this.Container) {
                this.setState({ isFull: true })
            } else {
                this.setState({ isFull: false })
            }
        })

        document.addEventListener('keydown', e => {
            if (e.altKey || e.ctrlKey || e.shiftKey) return
            if (e.code === 'KeyF') {
                this.ToggleFullScreen()
            }
        })
    }

    override render(): ReactElement {
        return (
            <div
                className={this.props.className}
                onClick={() => this.ToggleFullScreen()}
            >
                {this.state.isFull ? <Minimize /> : <Maximize />}
            </div>
        )
    }
}

export default FullScreen
