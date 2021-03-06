import React, { PureComponent } from 'react'

// context
import { PlayerContext } from '../context'

export default class BaseComponent<P = {}, S = {}> extends PureComponent<P, S> {
    // context setup
    static override contextType = PlayerContext
    declare context: React.ContextType<typeof PlayerContext>

    public video = this.context.video
    public master = this.context.master
    public options = this.context.options
    public source = this.context.source
}
