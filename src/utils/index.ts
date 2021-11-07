export * from './player.functions'

export function VolumeThumb(p: number): number {
    if (p > 95) return 95
    else if (p < 5) return 5
    else return p
}
