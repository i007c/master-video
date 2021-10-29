import React, { PureComponent, ReactElement } from 'react'

import { PlayerContext } from '../context'

import './sass/controls.scss'

interface ControlsProps {}

interface ControlsState {}

export class Controls extends PureComponent<ControlsProps, ControlsState> {
    override state: ControlsState = {}
    // context setup
    static override contextType = PlayerContext
    declare context: React.ContextType<typeof PlayerContext>

    private video = this.context.video

    override componentDidMount() {
        console.log(this.video)
    }

    override render(): ReactElement {
        return <div className='controls-container'>Controls</div>
    }
}

export default Controls
