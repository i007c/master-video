import { createContext } from 'react'

export interface PlayerContextType {
    video: HTMLVideoElement
    master: HTMLDivElement
}

export const PlayerContext = createContext<PlayerContextType>(
    {} as PlayerContextType
)
