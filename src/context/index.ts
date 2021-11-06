import { createContext } from 'react'

import { Options } from '../@types'

export interface PlayerContextType {
    video: HTMLVideoElement
    master: HTMLDivElement
    options?: Options
}

export const PlayerContext = createContext<PlayerContextType>(
    {} as PlayerContextType
)
