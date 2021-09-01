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

export class FullScreen extends PureComponent<FullScreenProps, FullScreenState> {

    override state: FullScreenState = {
        isFull: false
    }

    private Container = this.props.Container

    private ToggleFullScreen() {
        console.log(this.Container)
    }

    override render():ReactElement {
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
