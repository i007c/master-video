import { createContext } from 'react'

export interface SourceObject {
    url: string
    label: string
}

export interface PlayerContextType {
    video: HTMLVideoElement
    Container: HTMLDivElement
    Sources: [SourceObject, ...SourceObject[]]
    timelineColor?: string
}


export const PlayerContext = createContext<PlayerContextType>({} as PlayerContextType)
