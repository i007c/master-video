import { Source } from '../types'

export const GetSource = (source: Source): string => {
    if (typeof source === 'string') return source

    if (source[0]) return source[0].source
    else return ''
}
