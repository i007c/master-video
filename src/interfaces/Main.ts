import { FC } from 'react'

export type TogglePlay = 'play' | 'pause'
export type ToggleMute = 'mute' | 'unmute'

export interface TimeProps {
    type: 'left' | 'played'
    timeCall?: (time: string) => void
}

export interface OverlayProps {
    // functions
    TogglePlay: (type?: TogglePlay) => void
    ToggleMute: (type?: ToggleMute) => void
    ChangeVolume: (volume?: number) => void
    // jsx
    Time: FC<TimeProps> // (props: TimeProps) => JSX.Element
    // propertise
    isPlaying: boolean
    isMuted: boolean
    volume: number
    TimeValue: { percentage: number; currentTime: number; duration: number }
}

interface VideoSource {
    label: string
    url: string
}

export interface VideoOptions {
    loop?: boolean
    volume?: number
    speed?: number
    source: [VideoSource, ...VideoSource[]]
}
