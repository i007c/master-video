export interface Options {
    loop?: boolean
    masterClass?: string
    iconsColor?: string
    playIconColor?: string
    volumeIconColor?: string
    fullscreenIconColor?: string
    bufferColor?: string
    timeLine?: {
        rail?: string
        track?: string
        thumb?: string
    }
    volume?: {
        rail?: string
        track?: string
        thumb?: string
    }
}

export type Source = string | SourceObject[]

interface SourceObject {
    lable: string
    source: string
}

export * from './menu'
