import { createContext } from 'react'

export interface PlayerContextType {
    video: HTMLVideoElement
}

export const PlayerContext = createContext<PlayerContextType>(
    {} as PlayerContextType
)
