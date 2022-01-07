import { createContext } from 'react'

import { Options, Source } from '../@types'

export interface PlayerContextType {
    video: HTMLVideoElement
    master: HTMLDivElement
    options?: Options
    source: Source
}

export const PlayerContext = createContext<PlayerContextType>(
    {} as PlayerContextType
)
