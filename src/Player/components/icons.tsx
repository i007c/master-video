import React, { ReactElement } from 'react'

export const Play = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <polygon points='5 3 19 12 5 21 5 3'></polygon>
        </svg>
    )
}

export const Pause = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <rect x='5' y='4' width='5' height='16'></rect>
            <rect x='15' y='4' width='5' height='16'></rect>
        </svg>
    )
}

type VolumeProps = {
    percentage: number
    onClick: Function
    muted: boolean
}

export const Volume = ({
    percentage,
    onClick,
    muted,
}: VolumeProps): ReactElement => {
    let front: JSX.Element | null = null

    if (percentage <= 10) {
        front = null
    } else if (percentage <= 50) {
        front = <path d='M15.54 8.46a5 5 0 0 1 0 7.07'></path>
    } else {
        front = (
            <path d='M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07'></path>
        )
    }

    if (muted) {
        front = (
            <>
                <line x1='23' y1='9' x2='17' y2='15'></line>
                <line x1='17' y1='9' x2='23' y2='15'></line>
            </>
        )
    }

    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            onClick={() => onClick()}
        >
            {/* base */}
            <polygon points='11 5 6 9 2 9 2 15 6 15 11 19 11 5'></polygon>

            {front}
        </svg>
    )
}

Volume.defaultProps = {
    percentage: 0,
    onClick: () => {},
}

export const Maximize = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <path d='M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3'></path>
        </svg>
    )
}

export const Minimize = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <path d='M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3'></path>
        </svg>
    )
}
