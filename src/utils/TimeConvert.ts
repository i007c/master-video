/**
 * @returns string of time like 0:00 or 1:04:28
 */
export default (seconds: number): string => {
    let h = Math.floor(seconds / 3600)
    let m = Math.floor((seconds % 3600) / 60)
    let s = Math.floor((seconds % 3600) % 60)

    let SC = (t: number): string => {
        if (t === 0) return '00'
        else if (t < 10) return '0' + t
        else return t.toString()
    }

    let MHC = (t: number): string => {
        if (t === 0) return '0'
        else if (t < 10) return '0' + t
        else return t.toString()
    }

    return h === 0 ? `${MHC(m)}:${SC(s)}` : `${MHC(h)}:${MHC(m)}:${SC(s)}`
}
