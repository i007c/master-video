import { createContext } from 'react'

export interface MainContextType {
    video: HTMLVideoElement
}

export const MainContext = createContext<MainContextType>({} as MainContextType)
